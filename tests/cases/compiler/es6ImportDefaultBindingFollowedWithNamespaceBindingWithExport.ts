// @module: commonjs
// @declaration: true

// @filename: server.ts
export var a = 10;

// @filename: client.ts
export import defaultBinding, * as nameSpaceBinding  from "./server";
export var x: number = nameSpaceBinding.a;