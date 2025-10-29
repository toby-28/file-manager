import fs from "fs/promises";
import path from "path";

export async function handleNavigation(command, args, currentDir) {
  switch (command) {
    case "up":
      return path.dirname(currentDir);
    case "cd":
      return await changeDir(args[0], currentDir);
    case "ls":
      await listDir(currentDir);
      return currentDir;
    default:
      return currentDir;
  }
}

async function changeDir(target, currentDir) {
  const newPath = path.resolve(currentDir, target);
  try {
    const stat = await fs.stat(newPath);
    if (stat.isDirectory()) return newPath;
    throw new Error();
  } catch {
    console.log("Operation failed");
    return currentDir;
  }
}

async function listDir(currentDir) {
  try {
    const items = await fs.readdir(currentDir, { withFileTypes: true });
    const folders = items
      .filter((i) => i.isDirectory())
      .map((i) => ({ Name: i.name, Type: "directory" }));
    const files = items
      .filter((i) => i.isFile())
      .map((i) => ({ Name: i.name, Type: "file" }));
    const sorted = [
      ...folders.sort((a, b) => a.Name.localeCompare(b.Name)),
      ...files.sort((a, b) => a.Name.localeCompare(b.Name)),
    ];
    console.table(sorted);
  } catch {
    console.log("Operation failed");
  }
}
