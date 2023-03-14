import cp from "child_process";
import path from "path";
import url from "url";

const __filename = url.fileURLToPath(new URL(import.meta.url));
const __dirname = path.dirname(__filename);

const baseRepo = path.resolve(process.argv[3]);
const headRepo = path.resolve(__dirname, "..");

/** @type {{ size: number, unpackedSize: number; files: { path: string; size: number; }[]; }[]} */
const [before, after] = JSON.parse(cp.execFileSync("npm", ["pack", "--dry-run", "--json", baseRepo, headRepo], { encoding: "utf8" }));

/** @param {{ path: string; size: number; }[]} files */
function filesToMap(files) {
    return new Map(files.map(f => [f.path, f.size]));
}

const beforeFiles = filesToMap(before.files);
const afterFiles = filesToMap(after.files);

/**
 * @param {number} before
 * @param {number} after
 */
function failIfTooBig(before, after) {
    if (after > (before * 1.1)) {
        process.exitCode = 1;
    }
}

const units = ["B", "KiB", "MiB", "GiB"];
/**
 * @param {number} size
 */
function prettyPrintSize(size) {
    const sign = Math.sign(size);
    size = Math.abs(size);

    let i = 0;
    while (size > 1024) {
        i++;
        size /= 1024;
    }

    size *= sign;
    return `${size.toFixed(2)} ${units[i]}`;
}

/**
 * @param {number} before
 * @param {number} after
 */
function percentDiff(before, after) {
    const percent = (after - before) / before;
    return `${percent.toFixed(2)}%`;
}

/**
 * @param {string[]} header
 * @param {string[][]} data
 */
function logTable(header, data) {
    /** @type {string[]} */
    const lines = [];
    const spacer = new Array(header.length).fill("-").join(" | ").trim();

    /**
     * @param {string[]} row
     */
    function addRow(row, first = false) {
        if (!first) {
            lines.push(spacer);
        }
        lines.push(row.join(" | ").trim());
    }

    addRow(header, /*first*/ true);
    for (const row of data) {
        addRow(row);
    }

    console.log(lines.join("\n"));
}

console.log(`# Overall package size`);
console.log();

logTable(
    ["", "Before", "After", "Diff", "Diff (percent)"],
    [
        ["Packed", prettyPrintSize(before.size), prettyPrintSize(after.size), prettyPrintSize(after.size - before.size), percentDiff(before.size, after.size)],
        ["Unpacked", prettyPrintSize(before.unpackedSize), prettyPrintSize(after.unpackedSize), prettyPrintSize(after.unpackedSize - before.unpackedSize), percentDiff(before.unpackedSize, after.unpackedSize)],
    ]
);

failIfTooBig(before.size, after.size);
failIfTooBig(before.unpackedSize, after.unpackedSize);

console.log();


/** @type {Map<string, number>} */
const fileCounts = new Map();
const inBefore = -1;
const inAfter = 1;

/**
 * @param {Iterable<string>} paths
 * @param {-1 | 1} marker
 */
function addFiles(paths, marker) {
    for (const p in paths) {
        fileCounts.set(p, (fileCounts.get(p) ?? 0) + marker);
    }
}
addFiles(beforeFiles.keys(), inBefore);
addFiles(afterFiles.keys(), inAfter);

const allEntries = [...fileCounts.entries()];
const commonFiles = allEntries.filter(([, count]) => count === 0).map(([path]) => path);
const beforeOnly = allEntries.filter(([, count]) => count === inBefore).map(([path]) => path);
const afterOnly = allEntries.filter(([, count]) => count === inAfter).map(([path]) => path);


console.log(`# Common files`);
console.log();

const commonData = commonFiles.map(path => {
    const beforeSize = beforeFiles.get(path) ?? 0;
    const afterSize = afterFiles.get(path) ?? 0;
    return { path, beforeSize, afterSize };
})
    .filter(({ beforeSize, afterSize }) => beforeSize !== afterSize)
    .map(({ path, beforeSize, afterSize }) => {
        failIfTooBig(beforeSize, afterSize);
        return ["`" + path + "`", prettyPrintSize(beforeSize), prettyPrintSize(afterSize), prettyPrintSize(afterSize - beforeSize), percentDiff(beforeSize, afterSize)];
    });

if (commonData.length === 0) {
    console.log("No change.");
}
else {
    logTable(["File", "Before", "After", "Diff", "Diff (percent)"], commonData);
}
console.log();

if (afterOnly.length > 0) {
    console.log(`# New files`);
    console.log();
    logTable(
        ["File", "Size"],
        afterOnly.map(path => {
            const afterSize = afterFiles.get(path) ?? 0;
            return { path, afterSize };
        })
            .map(({ path, afterSize }) => {
                return ["`" + path + "`", prettyPrintSize(afterSize)];
            }),
    );
    console.log();
}


if (beforeOnly.length > 0) {
    console.log(`# Deleted files`);
    console.log();
    logTable(
        ["File", "Size"],
        beforeOnly.map(path => {
            const afterSize = afterFiles.get(path) ?? 0;
            return { path, afterSize };
        })
            .map(({ path, afterSize }) => {
                return ["`" + path + "`", prettyPrintSize(afterSize)];
            }),
    );
    console.log();
}
