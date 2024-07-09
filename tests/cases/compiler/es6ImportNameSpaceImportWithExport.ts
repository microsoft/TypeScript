// @module: amd
// @declaration: true

// @filename: server.ts
export var a = 10;

// @filename: client.ts
export import * as nameSpaceBinding from "server";
export var x = nameSpaceBinding.a;
export import * as nameSpaceBinding2 from "server"; // Not referenced imports
