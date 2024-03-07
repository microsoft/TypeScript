//// [tests/cases/conformance/declarationEmit/libReferenceDeclarationEmit.ts] ////

//// [file1.ts]
/// <reference lib="dom" />
export declare const elem: HTMLElement;

//// [file2.ts]
/// <reference lib="dom" />
export {}
declare const elem: HTMLElement;

//// [file1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference lib="dom" />
//// [file2.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [file1.d.ts]
export declare const elem: HTMLElement;
//// [file2.d.ts]
export {};


//// [DtsFileErrors]


file1.d.ts(1,28): error TS2304: Cannot find name 'HTMLElement'.


==== file1.d.ts (1 errors) ====
    export declare const elem: HTMLElement;
                               ~~~~~~~~~~~
!!! error TS2304: Cannot find name 'HTMLElement'.
    
==== file2.d.ts (0 errors) ====
    export {};
    