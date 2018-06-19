// @ts-check
const fs = require("fs");
const insert = require("gulp-insert");
const pass = require("./pass");

/**
 * @param {(() => string[] | undefined) | string[]} [prepends]
 * @returns {NodeJS.ReadWriteStream}
 */
function prepend(prepends) {
    if (typeof prepends === "function") prepends = prepends();
    return (prepends || []).reduce((stream, file) => stream.pipe(insert.prepend(fs.readFileSync(file))), pass());
}
module.exports = prepend;