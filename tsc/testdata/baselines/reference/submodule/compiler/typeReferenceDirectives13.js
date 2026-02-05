//// [tests/cases/compiler/typeReferenceDirectives13.ts] ////

//// [ref.d.ts]
export interface $ { x }

//// [index.d.ts]
declare let $: { x: number }

//// [app.ts]
/// <reference types="lib"/>
import {$} from "./ref";
export interface A {
    x: () => typeof $
}


//// [app.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [app.d.ts]
export interface A {
    x: () => typeof $;
}


//// [DtsFileErrors]


/app.d.ts(2,21): error TS2592: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery` and then add 'jquery' to the types field in your tsconfig.


==== /app.d.ts (1 errors) ====
    export interface A {
        x: () => typeof $;
                        ~
!!! error TS2592: Cannot find name '$'. Do you need to install type definitions for jQuery? Try `npm i --save-dev @types/jquery` and then add 'jquery' to the types field in your tsconfig.
    }
    
==== /ref.d.ts (0 errors) ====
    export interface $ { x }
    
==== /types/lib/index.d.ts (0 errors) ====
    declare let $: { x: number }
    