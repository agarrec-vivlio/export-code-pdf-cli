
# 🚀 export-code-pdf-cli

[![npm](https://img.shields.io/npm/v/export-code-pdf-cli.svg?style=flat-square)](https://www.npmjs.com/package/export-code-pdf-cli)

![2024-10-03 21 44 53](https://github.com/user-attachments/assets/5423142a-aa33-44ab-939b-e7c36bf3623b)

## 📖 Description

CLI to export the content of code files matching a regular expression into a single PDF file. This project leverages Puppeteer to generate the PDF from code files and Ora to display progress spinners while processing.

**✨ Key Benefit**: Exporting all your project files into a PDF makes it easier to import the entire project into ChatGPT as a single PDF file, allowing you to ask questions or get help on the entire project at once.

## ⚡️ Installation

### Install Globally via npm:

To install the package globally using npm:

```bash
npm install -g export-code-pdf-cli
```

### Install Directly from GitHub (Without npm):

If you prefer to install directly from the GitHub repository without npm, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/agarrec-vivlio/export-code-pdf-cli.git
   ```

2. Navigate to the project directory:
   ```bash
   cd export-code-pdf-cli
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Link the package globally to make it available as a CLI:
   ```bash
   npm link
   ```

Now you can run the `export-code-pdf-cli` command globally from any terminal.

## 💻 Usage

```bash
export-code-pdf-cli -r '.*\.js$' -d ./src -o ./code-concat.pdf
```

- `-r, --regex` : Regular expression to filter files (default: `.*\.js$`).
- `-d, --directory` : Directory to scan for matching files.
- `-o, --output` : Output PDF file (default: `./output.pdf`).

## 🎯 Examples

1. Export all `.js` files from a directory to a PDF file:

```bash
export-code-pdf-cli -r '.*\.js$' -d ./src -o ./code.pdf
```

2. Export all `.py` files from the current directory to a PDF file:

```bash
export-code-pdf-cli -r '.*\.py$' -d . -o ./python-code.pdf
```

---

## 💡 Why Use This CLI?

- 📄 **Single PDF File**: Easily generate a single PDF containing your entire project.
- 🔍 **Regex Filtering**: Use regular expressions to target specific files or types in your project.
- 🛠 **Flexible Installation**: Install it globally with npm or directly from GitHub.
- 🤖 **AI Integration**: Ideal for importing into ChatGPT to help you with an entire project in one go!

