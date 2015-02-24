// @module: amd
// @declaration: true

// @filename: server.ts
class a { }
export = a;

// @filename: client.ts
import defaultBinding, * as nameSpaceBinding from "server";
export var x = new defaultBinding();