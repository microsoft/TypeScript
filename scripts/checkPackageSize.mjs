import assert from "assert";
import cp from "child_process";

const baseRepo = process.argv[2];
const headRepo = process.argv[3];

/** @type {Array<{ size: number, unpackedSize: number; files: Array<{ path: string; size: number; }>; }>} */
const [before, after] = JSON.parse(cp.execFileSync("npm", ["pack", "--dry-run", "--json", baseRepo, headRepo], { encoding: "utf8" }));

/** @param {{ path: string; size: number; }[]} files */
function filesToMap(files) {
    return new Map(files.map(f => [f.path, f.size]));
}

const beforeFileToSize = filesToMap(before.files);
const afterFileToSize = filesToMap(after.files);

/**
 * @param {number} before
 * @param {number} after
 */
function failIfTooBig(before, after) {
    if (after > (before * 1.1)) {
        process.exitCode = 1;
    }
}

/**
 * @param {number} value
 */
function sign(value) {
    return value > 0 ? "+" : "-";
}

const units = ["B", "KiB", "MiB", "GiB"];
/**
 * @param {number} size
 */
function prettyPrintSize(size) {
    assert(size >= 0);

    let i = 0;
    while (size > 1024) {
        i++;
        size /= 1024;
    }

    return `${size.toFixed(2)} ${units[i]}`;
}

/**
 * @param {number} before
 * @param {number} after
 */
function prettyPrintSizeDiff(before, after) {
    const diff = after - before;
    return sign(diff) + prettyPrintSize(Math.abs(diff));
}

/**
 * @param {number} before
 * @param {number} after
 */
function prettyPercentDiff(before, after) {
    const percent = 100 * (after - before) / before;
    return `${sign(percent)}${Math.abs(percent).toFixed(2)}%`;
}

/**
 * @param {string[]} header
 * @param {string[][]} data
 */
function logTable(header, data) {
    /** @type {string[]} */
    const lines = [];

    /**
     * @param {string[]} row
     */
    function addRow(row) {
        lines.push("| " + row.join(" | ") + " |");
    }

    addRow(header);
    addRow(new Array(header.length).fill("-"));
    for (const row of data) {
        addRow(row);
    }

    console.log(lines.join("\n"));
}

console.log(`# Package size report`);
console.log();

console.log(`## Overall package size`);
console.log();

if (before.size === after.size && before.unpackedSize === after.unpackedSize) {
    console.log("No change.");
}
else {
    logTable(
        ["", "Before", "After", "Diff", "Diff (percent)"],
        [
            [
                "Packed",
                prettyPrintSize(before.size),
                prettyPrintSize(after.size),
                prettyPrintSizeDiff(before.size, after.size),
                prettyPercentDiff(before.size, after.size),
            ],
            [
                "Unpacked",
                prettyPrintSize(before.unpackedSize),
                prettyPrintSize(after.unpackedSize),
                prettyPrintSizeDiff(before.unpackedSize, after.unpackedSize),
                prettyPercentDiff(before.unpackedSize, after.unpackedSize),
            ],
        ],
    );
}

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
    for (const p of paths) {
        fileCounts.set(p, (fileCounts.get(p) ?? 0) + marker);
    }
}
addFiles(beforeFileToSize.keys(), inBefore);
addFiles(afterFileToSize.keys(), inAfter);

const allEntries = [...fileCounts.entries()];
const commonFiles = allEntries.filter(([, count]) => count === 0).map(([path]) => path);
const beforeOnly = allEntries.filter(([, count]) => count === inBefore).map(([path]) => path);
const afterOnly = allEntries.filter(([, count]) => count === inAfter).map(([path]) => path);

const commonData = commonFiles.map(path => {
    const beforeSize = beforeFileToSize.get(path) ?? 0;
    const afterSize = afterFileToSize.get(path) ?? 0;
    return { path, beforeSize, afterSize };
})
    .filter(({ beforeSize, afterSize }) => beforeSize !== afterSize)
    .map(({ path, beforeSize, afterSize }) => {
        return [
            "`" + path + "`",
            prettyPrintSize(beforeSize),
            prettyPrintSize(afterSize),
            prettyPrintSizeDiff(beforeSize, afterSize),
            prettyPercentDiff(beforeSize, afterSize),
        ];
    });

if (commonData.length > 0) {
    console.log(`## Files`);
    console.log();
    logTable(["", "Before", "After", "Diff", "Diff (percent)"], commonData);
    console.log();
}

if (afterOnly.length > 0) {
    console.log(`## New files`);
    console.log();
    logTable(
        ["", "Size"],
        afterOnly.map(path => {
            const afterSize = afterFileToSize.get(path) ?? 0;
            return { path, afterSize };
        })
            .map(({ path, afterSize }) => {
                return ["`" + path + "`", prettyPrintSize(afterSize)];
            }),
    );
    console.log();
}

if (beforeOnly.length > 0) {
    console.log(`## Deleted files`);
    console.log();
    logTable(
        ["", "Size"],
        beforeOnly.map(path => {
            const afterSize = afterFileToSize.get(path) ?? 0;
            return { path, afterSize };
        })
            .map(({ path, afterSize }) => {
                return ["`" + path + "`", prettyPrintSize(afterSize)];
            }),
    );
    console.log();
}
