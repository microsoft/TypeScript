// @module: commonjs
// @moduleResolution: node

// @filename: node_modules/a/ref.d.ts
declare module "internal" {
	export var foo: void;
}

// @filename: node_modules/a/index.d.ts
/// <reference path="ref.d.ts"/>
export * from "internal";


// @filename: b.ts
import y = require("a");
import z = require("internal"); // should error