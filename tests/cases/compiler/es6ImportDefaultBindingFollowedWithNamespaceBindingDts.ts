// @module: commonjs
// @declaration: true

// @filename: server.ts
export class a { }

// @filename: client.ts
import defaultBinding, * as nameSpaceBinding  from "./server";
export var x = new nameSpaceBinding.a();