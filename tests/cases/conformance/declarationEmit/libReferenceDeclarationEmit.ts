// @target: esnext
// @module: commonjs
// @lib: esnext
// @declaration: true
// @filename: file1.ts
/// <reference lib="dom" />
export declare const elem: HTMLElement;

// @filename: file2.ts
/// <reference lib="dom" />
export {}
declare const elem: HTMLElement;