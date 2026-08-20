// @target: esnext
// @module: commonjs
// @noLib: true
// @declaration: true
// Test that passing noLib disables <reference lib> resolution.

// @filename: fakelib.ts
interface Object { }
interface Array<T> { }
interface String { }
interface Boolean { }
interface Number { }
interface Function { }
interface RegExp { }
interface IArguments { }


// @filename: file1.ts
/// <reference lib="dom" />
export declare interface HTMLElement { field: string; }
export const elem: HTMLElement = { field: 'a' };
