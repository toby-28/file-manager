# 📁 File Manager CLI

A lightweight and modular Node.js CLI tool for managing files and directories. Supports basic operations like listing, reading, creating, renaming, and deleting files — all from the command line.

---

## 🚀 Features

- 📂 List files and folders
- 📄 Read file contents
- 📝 Create and write to files
- ✏️ Rename files
- ❌ Delete files
- 🧭 Navigate directories
- 🧱 Modular architecture for easy extension

---

## 📦 Tech Stack

- Node.js
- TypeScript
- `fs/promises`
- `readline` for CLI input

---

## 📁 Project Structure

```
file-manager/
├── src/               # CLI logic and file operations
│   └── index.ts       # Entry point
├── package.json       # Scripts and dependencies
├── README.md          # Project documentation
```

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/toby-28/file-manager.git
cd file-manager
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the CLI

```bash
npm start
```

Or directly:

```bash
ts-node src/index.ts
```

---

## 📌 Usage Examples

```bash
# List contents of current directory
> ls

# Read a file
> cat filename.txt

# Create a new file
> touch newfile.txt

# Rename a file
> rename old.txt new.txt

# Delete a file
> rm unwanted.txt
```

---

## 🧠 Design Philosophy

- Clean separation of concerns
- Extensible command parser
- Minimal dependencies
- Developer-friendly structure

---

## 📜 License

This project is for educational and personal use under the RS School curriculum.
