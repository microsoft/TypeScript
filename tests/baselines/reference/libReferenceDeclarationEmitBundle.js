//// [tests/cases/conformance/declarationEmit/libReferenceDeclarationEmitBundle.ts] ////

//// [file1.ts]
/// <reference lib="dom" preserve="true" />
export declare const elem: HTMLElement;

//// [file2.ts]
/// <reference lib="dom" preserve="true" />
export {}
declare const elem: HTMLElement;

//// [bundle.js]
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference lib="dom" preserve="true" />
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});


//// [bundle.d.ts]
/// <reference lib="dom" preserve="true" />
/// <reference lib="dom" preserve="true" />
declare module "file1" {
    export const elem: HTMLElement;
}
declare module "file2" {
    export {};
}
