// @target: es2015
// @strict: false
// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: paramTagNestedWithoutTopLevelObject.js

/**
 * @param {number} xyz.p
 */
function g(xyz) {
    return xyz.p;
}