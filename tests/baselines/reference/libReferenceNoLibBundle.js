//// [tests/cases/conformance/declarationEmit/libReferenceNoLibBundle.ts] ////

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


//// [bundle.js]
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.elem = void 0;
    /// <reference lib="dom" />
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
