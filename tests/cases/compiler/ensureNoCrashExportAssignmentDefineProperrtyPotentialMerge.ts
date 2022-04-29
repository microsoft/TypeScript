// @allowJs: true
// @noEmit: true
// @checkJs: true
// @filename: namespacey.js
const A = {}
A.bar = class Q {}
module.exports = A;
// @filename: namespacer.js
const B = {}
B.NS = require("./namespacey");
Object.defineProperty(B, "NS", { value: "why though", writable: true });
module.exports = B;

// @filename: index.js
const _item = require("./namespacer");
module.exports = 12;
Object.defineProperty(module, "exports", { value: "oh no" });
