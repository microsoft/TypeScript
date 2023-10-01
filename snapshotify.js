const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const cp = require("child_process");

const [exeArg, ...args] = process.argv.slice(2);

const doBuildSnapshot = process.env.BUILD_SNAPSHOT === "true";

function checksumFile(hashName, path) {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(hashName);
        const stream = fs.createReadStream(path);
        stream.on("error", err => reject(err));
        stream.on("data", chunk => hash.update(chunk));
        stream.on("end", () => resolve(hash.digest("hex")));
    });
}

async function main() {
    const exe = path.resolve(exeArg);
    // const exeHash = await checksumFile("md5", exe);
    // const blobName = `${exe}.${exeHash}.blob`;
    const blobName = `${exe}.${process.version}.blob`;

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
