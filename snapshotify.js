const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const cp = require("child_process");

const [exeArg, ...args] = process.argv.slice(2);

const doBuildSnapshot = process.env.TYPESCRIPT_BUILD_SNAPSHOT === "true";

function checksumFile(path) {
    // Benchmarking shows that sha1 is the fastest hash.
    // It is theoretically insecure, but we're just using it to detect file mismatches.
    // TODO(jakebailey): If sha1 is ever removed, this will fail; we should try catch
    // and fall back to something from crypto.getHashes() if it does.
    const hash = crypto.createHash("sha1");
    const file = fs.readFileSync(path);
    hash.update(file);
    return hash.digest("hex");
}

const exe = path.resolve(exeArg);
const exeHash = checksumFile(exe);
const blobName = `${exe}.${process.version}.${exeHash}.blob`;
// const blobName = `${exe}.${process.version}.blob`;

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
    return;
}

if (!fs.existsSync(blobName)) {
    cp.spawn(
        process.execPath,
        [__filename, exeArg],
        {
            detached: true,
            stdio: "ignore",
            env: { ...process.env, TYPESCRIPT_BUILD_SNAPSHOT: true },
        },
    ).unref();
    require(exe);
    return;
}

try {
    cp.execFileSync(process.execPath, ["--snapshot-blob", blobName, "--", ...args], { stdio: "inherit" });
}
catch (e) {
    process.exitCode = e.status;
}
