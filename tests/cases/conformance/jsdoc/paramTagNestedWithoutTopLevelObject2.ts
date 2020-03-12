// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: paramTagNestedWithoutTopLevelObject2.js

/**
 * @param {object} xyz.bar
 * @param {number} xyz.bar.p
 */
function g(xyz) {
    return xyz.bar.p;
}