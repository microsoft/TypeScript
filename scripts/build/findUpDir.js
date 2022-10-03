const { join, resolve, dirname } = require("path");
const { existsSync } = require("fs");

// search directories upward to avoid hard-wired paths based on the
// build tree (same as src/harness/findUpDir.ts)

function findUpFile(name) {
    let dir = __dirname;
    while (true) {
        const fullPath = join(dir, name);
        if (existsSync(fullPath)) return fullPath;
        const up = resolve(dir, "..");
        if (up === dir) return name; // it'll fail anyway
        dir = up;
    }
}
exports.findUpFile = findUpFile;

const findUpRoot = () =>
    findUpRoot.cached || (findUpRoot.cached = dirname(findUpFile("Gulpfile.js")));
exports.findUpRoot = findUpRoot;
