// @lib: es2020,dom
// @target: es2020
// @allowArbitraryExtensions: true,false
// @module: node18,nodenext
// @filename: package.json
{"type": "module"}
// @filename: dir/package.json
{"type": "commonjs"}
// @filename: dir/native.d.node.ts
export function doNativeThing(flag: string): unknown;
// @filename: main.ts
import mod = require("./dir/native.node");
mod.doNativeThing("good");
