// @allowJs: true
// @checkJs: true
// @noEmit: true
// @Filename: indices.js
/** @type {Object.<string, number>} */
var o1;
/** @type {Object.<number, boolean>} */
var o2;
/** @type {Object.<boolean, string>} */
var o3;
/** @param {Object.<string, boolean>} o */
function f(o) {
    o.foo = 1; // error
    o.bar = false; // ok
}
