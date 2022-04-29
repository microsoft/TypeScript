// @checkJs: true
// @allowJs: true
// @noEmit: true
// @strict: true
// @Filename: bug25618.js

/** @type {<T>(param?: T) => T | undefined} */
function typed(param) {
    return param;
}

var n = typed(1);

