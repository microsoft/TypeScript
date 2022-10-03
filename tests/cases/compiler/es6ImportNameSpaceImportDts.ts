// @module: commonjs
// @declaration: true

// @filename: server.ts
export class c { };  

// @filename: client.ts
import * as nameSpaceBinding from "./server";
export var x = new nameSpaceBinding.c();
import * as nameSpaceBinding2 from "./server"; // unreferenced