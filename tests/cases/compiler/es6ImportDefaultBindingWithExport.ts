// @module: amd
// @declaration: true

// @filename: server.ts
var a = 10;
export = a;

// @filename: client.ts
export import defaultBinding from "server";
export var x = defaultBinding;
export import defaultBinding2 from "server"; // non referenced