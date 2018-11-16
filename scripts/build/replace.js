// @ts-check
const insert = require("gulp-insert");

/**
 * @param {string | RegExp} searchValue 
 * @param {string | ((...args: string[]) => string)} replacer 
 */
function replace(searchValue, replacer) {
    return insert.transform(content => content.replace(searchValue, /**@type {string}*/(replacer)));
}

module.exports = replace;