// @module: amd

// @filename: file1.ts
export interface Foo { x }

// @filename: file2.ts
export interface A { x }
export * from "file1"
export var x = 1;

// @filename: file3.ts
export interface B { x }
export * from "file1"
export var x = 1;

// @filename: file4.ts
export interface C { x }
export * from "file2"
export * from "file3"
export var x = 1;

// @filename: file5.ts
export * from "file4"
export var x = 1;