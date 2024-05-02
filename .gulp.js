import cp from "child_process";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const argv = process.argv.slice(2);

const args = [
    ...process.execArgv,
    path.join(__dirname, "node_modules", "hereby", "bin", "hereby.js"),
    ...argv,
];

const { status } = cp.spawnSync(process.execPath, args, { stdio: "inherit" });
process.exit(status ?? 1);
