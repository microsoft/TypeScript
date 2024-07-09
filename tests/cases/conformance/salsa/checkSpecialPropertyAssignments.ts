// @noEmit: true
// @checkJs: true
// @allowJs: true
// @Filename: bug24252.js
var A = {};
A.B = class {
    m() {
        /** @type {string[]} */
        var x = [];
        /** @type {number[]} */
        var y;
        y = x;
    }
};
