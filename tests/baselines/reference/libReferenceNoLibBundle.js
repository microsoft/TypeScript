//// [tests/cases/conformance/declarationEmit/libReferenceNoLibBundle.ts] ////

//// [fakelib.ts]
// Test that passing noLib disables <reference lib> resolution.

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


//// [bundle.js]
// Test that passing noLib disables <reference lib> resolution.
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.elem = void 0;
    exports.elem = { field: 'a' };
});


//// [bundle.d.ts]
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
declare module "file1" {
    export interface HTMLElement {
        field: string;
    }
    export const elem: HTMLElement;
}
