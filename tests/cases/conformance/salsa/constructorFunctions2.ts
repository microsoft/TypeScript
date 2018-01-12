// @allowJs: true
// @checkJs: true
// @noEmit: true
// @module: commonjs
// @filename: node.d.ts
declare function require(id: string): any;
declare var module: any, exports: any;

// @filename: index.js
const A = require("./other");
const a = new A().id;

const B = function() { this.id = 1; }
const b = new B().id;

// @filename: other.js
function A() { this.id = 1; }
module.exports = A;