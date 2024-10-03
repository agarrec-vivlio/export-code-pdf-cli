#!/usr/bin/env node

const fs = require("fs-extra");
const path = require("path");
const puppeteer = require("puppeteer");
const { Command } = require("commander");

const program = new Command();

program
  .option("-r, --regex <regex>", "Regex to filter files (e.g., .*\\.js$)", ".*\\.js$")
  .option("-d, --directory <path>", "Directory to scan", ".")
  .option("-o, --output <output>", "Output PDF file path", "./output.pdf")
  .parse(process.argv);

const options = program.opts();
const fileRegex = new RegExp(options.regex);

// Function to recursively get all files matching the regex
async function getAllFilesRecursively(directory, spinner) {
  let filesInDirectory = await fs.readdir(directory);
  let files = [];

  for (let file of filesInDirectory) {
    const absolutePath = path.join(directory, file);
    const fileStats = await fs.stat(absolutePath);

    if (fileStats.isDirectory()) {
      const childFiles = await getAllFilesRecursively(absolutePath, spinner);
      files = files.concat(childFiles);
    } else if (fileRegex.test(file)) {
      files.push(absolutePath);
    }
  }

  spinner.text = `Files found: ${files.length}`;
  return files;
}

// Function to generate an HTML page with all the code
async function generateHtmlPage(filesContent) {
  return `
    <html>
    <head>
      <style>
        body {
          font-family: monospace;
          background-color: white;
          padding: 20px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        code {
          font-size: 12px;
          color: black;
        }
      </style>
    </head>
    <body>
      <pre><code>${filesContent}</code></pre>
    </body>
    </html>
  `;
}

// Function to retrieve and concatenate the content of all files
async function getAllFilesContent(files, spinner) {
  let filesContent = '';
  for (let file of files) {
    const code = await fs.readFile(file, "utf8");
    filesContent += `/* ${file} */\n\n${code}\n\n`;
  }
  spinner.text = `Reading content of ${files.length} files...`;
  return filesContent;
}

// Main function
(async () => {
  const ora = await import('ora'); // Dynamic import of Ora
  const spinner = ora.default('Initializing...').start();
  let browser;

  try {
    // Retrieve all code files matching the regex in the directory
    spinner.text = 'Searching for files...';
    const files = await getAllFilesRecursively(options.directory, spinner);

    // Retrieve and concatenate the content of all files
    spinner.text = 'Reading and concatenating files...';
    const filesContent = await getAllFilesContent(files, spinner);

    // Generate the HTML page with the concatenated content
    const htmlContent = await generateHtmlPage(filesContent);

    // Launch Puppeteer to generate the PDF
    spinner.text = 'Generating PDF...';
    browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Load the HTML content
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    // Generate the PDF
    await page.pdf({
      path: options.output,
      format: 'A4',
      printBackground: true,
    });

    spinner.succeed(`PDF successfully generated: ${options.output}`);
  } catch (error) {
    spinner.fail('Error during processing.');
    console.error("Error:", error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
})();
