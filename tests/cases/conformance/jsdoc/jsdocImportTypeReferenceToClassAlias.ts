// @noEmit: true
// @allowJs: true
// @checkJs: true
// @Filename: mod1.js
class C {
    s() { }
}
module.exports.C = C

// @Filename: test.js
/** @typedef {import('./mod1').C} X */
/** @param {X} c */
function demo(c) {
    c.s
}
