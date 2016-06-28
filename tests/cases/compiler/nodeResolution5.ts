// @module: commonjs
// @moduleResolution: node

// @filename: node_modules/a.d.ts
declare module "a" {
    var x: number;
}

// @filename: b.ts
import y = require("a"); 
