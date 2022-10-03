// @allowJs: true
// @noEmit: true
// @module: commonjs

// @filename: moduleA/a.js
import {a} from "b";
a++;
import {c} from "c";
c++;

// @filename: node_modules/b.ts
var a = 10;

// @filename: node_modules/c.js
exports.a = 10;
c = 10;
