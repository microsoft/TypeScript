// @ts-check
const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");

/**
 * Find the size of a directory recursively.
 * Symbolic links can cause a loop.
 * @param {string} root
 * @returns {number} bytes
 */
function getDirSize(root) {
    const stats = lstatSync(root);

    if (!stats.isDirectory()) {
        return stats.size;
    }

    return readdirSync(root)
        .map(file => getDirSize(join(root, file)))
        .reduce((acc, num) => acc + num, 0);
}

module.exports = getDirSize;
