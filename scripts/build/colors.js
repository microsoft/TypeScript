// @ts-check
const chalk = /**@type {import("chalk").Chalk}*/(require("chalk").default || require("chalk"));

exports.useColors = process.stdout.isTTY;
for (const arg of process.argv) {
    if (arg === "--no-color") exports["useColors"] = false;
    else if (arg === "--color") exports["useColors"] = true;
}

/**
 * @param {string} message 
 * @param {import("chalk").Chalk} color 
 */
function addColor(message, color) {
    return exports.useColors ? color(message) : message;
}
exports.addColor = addColor;

/** @type {{[P in Exclude<keyof import("chalk").Chalk, "constructor" | "enabled" | "level">]: import("chalk").Chalk[P]}} */
exports.color = chalk;