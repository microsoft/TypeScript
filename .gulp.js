const cp = require("child_process");
const path = require("path");
const chalk = require("chalk");

const argv = process.argv.slice(2);

// --tasks-simple is used by VS Code to infer a task list; try and keep that working.
if (!argv.includes("--tasks-simple")) {
    console.error(chalk.yellowBright("Warning: using gulp shim; please consider running hereby directly."));
}

const args = [
    ...process.execArgv,
    path.join(__dirname, "node_modules", "hereby", "bin", "hereby.js"),
    ...argv,
];

const { status } = cp.spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(status ?? 1);
