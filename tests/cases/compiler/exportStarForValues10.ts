// @module: system

// @filename: file0.ts
export var v = 1;

// @filename: file1.ts
export interface Foo { x }

// @filename: file2.ts
export * from "file0";
export * from "file1";
var x = 1;