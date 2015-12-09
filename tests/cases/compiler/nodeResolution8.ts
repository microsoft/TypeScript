// @module: commonjs
// @moduleResolution: node

// @filename: node_modules/a/ref.ts
var x = 1;

// @filename: node_modules/a/index.d.ts
/// <reference path="ref.ts"/>
export declare var y;


// @filename: b.ts
import y = require("a");