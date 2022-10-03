// @module: amd

// @filename: file1.ts
export interface Foo { x }

// @filename: file2.ts
export * from "file1"
export var x;