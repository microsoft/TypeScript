// @module: commonjs
// @moduleResolution: node

// @filename: ref.ts
var x = 1;

// @filename: a.ts
/// <reference path="ref.ts"/>
export var y;

// @filename: b.ts
import y = require("./a");