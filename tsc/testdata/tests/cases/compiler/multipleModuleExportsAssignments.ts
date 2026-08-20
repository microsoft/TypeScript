// @module: commonjs
// @declaration: true
// @checkJs: true
// @outDir: ./out
// @filename: x.js
if (!!true) {
    module.exports = { a: 1 };
}
else {
    module.exports = { b: "hello" };
}
// @filename: y.js
const x = require("./x");
const a = x.a;
const b = x.b;
