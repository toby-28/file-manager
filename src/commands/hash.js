import crypto from "crypto";
import fs from "fs";
import path from "path";

export async function handleHash(filePath, currentDir) {
  const fullPath = path.resolve(currentDir, filePath);
  const hash = crypto.createHash("sha256");
  const stream = fs.createReadStream(fullPath);

  stream.on("error", () => console.log("Operation failed"));
  stream.on("data", (chunk) => hash.update(chunk));
  stream.on("end", () => console.log(hash.digest("hex")));
}
