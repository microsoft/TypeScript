// @module: amd

// @filename: file1.ts
export interface Foo { x }

// @filename: file2.ts
export interface A { x }
export * from "file1"
export * from "file3"
var x = 1;

// @filename: file3.ts
export interface B { x }
export * from "file2"
var x = 1;
