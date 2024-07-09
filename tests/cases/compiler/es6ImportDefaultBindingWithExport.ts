// @module: amd
// @declaration: true
// @target: ES5

// @filename: server.ts
var a = 10;
export default a;

// @filename: client.ts
export import defaultBinding from "server";
export var x = defaultBinding;
export import defaultBinding2 from "server"; // non referenced