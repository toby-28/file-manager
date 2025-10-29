import fs from "fs";
import path from "path";
import zlib from "zlib";

export async function handleCompress(command, args, currentDir) {
  const [src, dest] = args.map((p) => path.resolve(currentDir, p));
  const readStream = fs.createReadStream(src);
  const writeStream = fs.createWriteStream(dest);
  const transform =
    command === "compress"
      ? zlib.createBrotliCompress()
      : zlib.createBrotliDecompress();

  readStream.on("error", () => console.log("Operation failed"));
  writeStream.on("error", () => console.log("Operation failed"));
  readStream.pipe(transform).pipe(writeStream);
}
