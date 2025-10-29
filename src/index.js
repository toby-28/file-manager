import os from "os";
import readline from "readline";
import { handleNavigation } from "./commands/navigation.js";
import { handleFileOps } from "./commands/fileOps.js";
import { handleOSInfo } from "./commands/osInfo.js";
import { handleHash } from "./commands/hash.js";
import { handleCompress } from "./commands/compress.js";
import { printCWD } from "./utils/printCWD.js";
import { handleError } from "./utils/errorHandler.js";

const usernameArg = process.argv.find((arg) => arg.startsWith("--username="));
const username = usernameArg ? usernameArg.split("=")[1] : "Anonymous";
let currentDir = os.homedir();

console.log(`Welcome to the File Manager, ${username}!`);
printCWD(currentDir);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "> ",
});

rl.prompt();

rl.on("line", async (line) => {
  const input = line.trim();
  if (input === ".exit") {
    rl.close();
    return;
  }

  const [command, ...args] = input.split(" ");

  try {
    if (["up", "cd", "ls"].includes(command)) {
      const newDir = await handleNavigation(command, args, currentDir);
      if (newDir) currentDir = newDir;
    } else if (
      ["cat", "add", "rn", "cp", "mv", "rm", "mkdir"].includes(command)
    ) {
      await handleFileOps(command, args, currentDir);
    } else if (command === "os") {
      await handleOSInfo(args[0]);
    } else if (command === "hash") {
      await handleHash(args[0], currentDir);
    } else if (["compress", "decompress"].includes(command)) {
      await handleCompress(command, args, currentDir);
    } else {
      console.log("Invalid input");
    }
  } catch (err) {
    handleError(err);
  }

  printCWD(currentDir);
  rl.prompt();
});

rl.on("SIGINT", () => rl.close());
rl.on("close", () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
});
