const cp = require("child_process");
const path = require("path");

const argv = process.argv.slice(2);

const args = [
    ...process.execArgv,
    path.join(__dirname, "node_modules", "hereby", "bin", "hereby.js"),
    ...argv,
];

const { status } = cp.spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(status ?? 1);
