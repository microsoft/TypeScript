// @ts-check
const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");

/**
 * Find the size of a directory recursively.
 * Symbolic links are counted once (same inode).
 * @param {string} root
 * @param {Set} seen
 * @returns {number} bytes
 */
function getDirSize(root, seen = new Set()) {
    const stats = lstatSync(root);

    if (seen.has(stats.ino)) {
        return 0;
    }

    seen.add(stats.ino);

    if (!stats.isDirectory()) {
        return stats.size;
    }

    return readdirSync(root)
        .map(file => getDirSize(join(root, file), seen))
        .reduce((acc, num) => acc + num, 0);
}

exports.getDirSize = getDirSize;
