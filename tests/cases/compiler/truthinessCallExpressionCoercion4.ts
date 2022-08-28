// @checkJs: true
// @allowJs: true
// @strict: true
// @noEmit: true
// @filename: a.js

function fn() {}

if (typeof module === 'object' && module.exports) {
    module.exports = fn;
}
