// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: paramTagNestedWithoutTopLevelObject3.js

/**
 * @param {object} xyz
 * @param {number} xyz.bar.p
 */
function g(xyz) {
    return xyz.bar.p;
}