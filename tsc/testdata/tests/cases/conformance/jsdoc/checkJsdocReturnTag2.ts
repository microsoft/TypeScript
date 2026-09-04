// @target: es2015
// @allowJs: true
// @outDir: out

// @filename: returns.js
// @ts-check
/**
 * @returns {string} This comment is not currently exposed
 */
function f() {
    return 5;
}

/**
 * @returns {string | number} This comment is not currently exposed
 */
function f1() {
    return 5 || true;
}
