// @module: amd
// @declaration: true
// @target: ES5

// @filename: server.ts
var a = 10;
export default a;

// @filename: client.ts
export import defaultBinding, * as nameSpaceBinding  from "server";
export var x: number = defaultBinding;