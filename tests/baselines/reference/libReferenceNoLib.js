//// [tests/cases/conformance/declarationEmit/libReferenceNoLib.ts] ////

//// [fakelib.ts]
interface Object { }
interface Array<T> { }
interface String { }
interface Boolean { }
interface Number { }
interface Function { }
interface RegExp { }
interface IArguments { }


//// [file1.ts]
/// <reference lib="dom" />
export declare interface HTMLElement { field: string; }
export const elem: HTMLElement = { field: 'a' };


//// [fakelib.js]
//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elem = void 0;
/// <reference lib="dom" />
exports.elem = { field: 'a' };


//// [fakelib.d.ts]
interface Object {
}
interface Array<T> {
}
interface String {
}
interface Boolean {
}
interface Number {
}
interface Function {
}
interface RegExp {
}
interface IArguments {
}
//// [file1.d.ts]
export declare interface HTMLElement {
    field: string;
}
export declare const elem: HTMLElement;
