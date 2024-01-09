const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const cp = require("child_process");

const [exeArg, ...args] = process.argv.slice(2);

const doBuildSnapshot = process.env.BUILD_SNAPSHOT === "true";

function checksumFile(path) {
    // Benchmarking shows that sha1 is the fastest hash.
    // It is theoretically insecure, but we're just using it to detect file mismatches.
    const hash = crypto.createHash("sha1");
    const file = fs.readFileSync(path);
    hash.update(file);
    return hash.digest("hex");
}

function main() {
    const exe = path.resolve(exeArg);
    const exeHash = checksumFile(exe);
    const blobName = `${exe}.${process.version}.${exeHash}.blob`;
    // const blobName = `${exe}.${process.version}.blob`;

    if (doBuildSnapshot) {
        const tmpName = `${blobName}.tmp`;
        cp.execFileSync(process.execPath, ["--snapshot-blob", tmpName, "--build-snapshot", exe], { stdio: "ignore" });
        fs.renameSync(tmpName, blobName);
        return;
    }

    if (!fs.existsSync(blobName)) {
        cp.spawn(process.execPath, [__filename, exeArg], { detached: true, stdio: "ignore", env: { ...process.env, BUILD_SNAPSHOT: true } }).unref();
        require(exe);
        return;
    }

    try {
        cp.execFileSync(process.execPath, ["--snapshot-blob", blobName, "--", ...args], { stdio: "inherit" });
    }
    catch (e) {
        process.exitCode = e.status;
    }
}

main();
