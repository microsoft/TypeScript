//// [tests/cases/conformance/declarationEmit/libReferenceDeclarationEmitBundle.ts] ////

//// [file1.ts]
/// <reference lib="dom" />
export declare const elem: HTMLElement;

//// [file2.ts]
/// <reference lib="dom" />
export {}
declare const elem: HTMLElement;

//// [bundle.js]
define("file1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <reference lib="dom" />
});
define("file2", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});


//// [bundle.d.ts]
declare module "file1" {
    export const elem: HTMLElement;
}
declare module "file2" {
    export {};
}


//// [DtsFileErrors]


bundle.d.ts(2,24): error TS2304: Cannot find name 'HTMLElement'.


==== bundle.d.ts (1 errors) ====
    declare module "file1" {
        export const elem: HTMLElement;
                           ~~~~~~~~~~~
!!! error TS2304: Cannot find name 'HTMLElement'.
    }
    declare module "file2" {
        export {};
    }
    