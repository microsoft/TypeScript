import fs from "fs";

await fs.promises.mkdir("node_modules/gulp", { recursive: true });

await fs.promises.writeFile("node_modules/gulp/package.json", JSON.stringify({
    name: "gulp",
    version: "4.0.2",
    bin: "index.js",
}));

await fs.promises.writeFile("node_modules/gulp/index.js", `
const cp = require("child_process");
const path = require("path");
const chalk = require("chalk");

console.error(chalk.red("Warning: using gulp shim; please run hereby instead."));

const args = [
    ...process.execArgv,
    path.join(__dirname, "..", "hereby", "bin", "hereby.js"),
    ...process.argv.slice(2),
];

const { status } = cp.spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(status ?? 1);
`);
