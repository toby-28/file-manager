import fs from "fs/promises";
import fss from "fs";
import path from "path";

export async function handleFileOps(command, args, currentDir) {
  const fullPath = (p) => path.resolve(currentDir, p);

  switch (command) {
    case "cat":
      return fss
        .createReadStream(fullPath(args[0]), "utf-8")
        .pipe(process.stdout);
    case "add":
      return await fs.writeFile(fullPath(args[0]), "");
    case "mkdir":
      return await fs.mkdir(fullPath(args[0]));
    case "rn":
      return await fs.rename(
        fullPath(args[0]),
        path.join(path.dirname(fullPath(args[0])), args[1])
      );
    case "cp":
      return await copyFile(
        fullPath(args[0]),
        path.join(fullPath(args[1]), path.basename(args[0]))
      );
    case "mv":
      await copyFile(
        fullPath(args[0]),
        path.join(fullPath(args[1]), path.basename(args[0]))
      );
      return await fs.unlink(fullPath(args[0]));
    case "rm":
      return await fs.unlink(fullPath(args[0]));
    default:
      console.log("Invalid input");
  }
}

async function copyFile(src, dest) {
  return new Promise((resolve, reject) => {
    const readStream = fss.createReadStream(src);
    const writeStream = fss.createWriteStream(dest);
    readStream.on("error", () => reject("Operation failed"));
    writeStream.on("error", () => reject("Operation failed"));
    writeStream.on("finish", resolve);
    readStream.pipe(writeStream);
  });
}
