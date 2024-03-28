import fs = require("fs");
import path = require("path");
import cp = require("child_process");

let v8: typeof import("v8") | undefined;
try {
    if (!process.versions.bun) {
        v8 = require("v8");
    }
}
catch {
    // do nothing
}

const exe = path.join(__dirname, "tscReal.js");

if (!(v8 as any)?.startupSnapshot) {
    require(exe);
    throw new Error("unreachable");
}

const args = process.argv.slice(2);

const doBuildSnapshot = process.env.TYPESCRIPT_BUILD_SNAPSHOT === "true";

function checksumFile(path: string) {
    const crypto = require("crypto") as typeof import("crypto");
    // Benchmarking shows that sha1 is the fastest hash.
    // It is theoretically insecure, but we're just using it to detect file mismatches.
    // TODO(jakebailey): If sha1 is ever removed, this will fail; we should try catch
    // and fall back to something from crypto.getHashes() if it does.
    const hash = crypto.createHash("sha1");
    const file = fs.readFileSync(path);
    hash.update(file);
    return hash.digest("hex");
}

const exeHash = checksumFile(exe);
const blobName = `${exe}.${process.version}.${exeHash}.blob`;

if (doBuildSnapshot) {
    // Build and atomic rename.
    const tmpName = `${blobName}.${process.pid}.tmp`;
    cp.execFileSync(
        process.execPath,
        ["--snapshot-blob", tmpName, "--build-snapshot", exe],
        { stdio: "ignore" },
    );
    try {
        fs.renameSync(tmpName, blobName);
    }
    catch {
        // If the rename fails, it's because another process beat us to it.
    }
    process.exit(0);
}

if (!fs.existsSync(blobName)) {
    cp.spawn(
        process.execPath,
        [__filename],
        {
            detached: true,
            stdio: "ignore",
            env: { ...process.env, TYPESCRIPT_BUILD_SNAPSHOT: "true" },
        },
    ).unref();
    require(exe);
    throw new Error("unreachable");
}

try {
    cp.execFileSync(process.execPath, ["--snapshot-blob", blobName, "--", ...args], { stdio: "inherit" });
}
catch (e) {
    process.exitCode = e.status;
}
