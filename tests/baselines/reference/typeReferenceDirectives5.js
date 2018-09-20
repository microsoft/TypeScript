//// [tests/cases/compiler/typeReferenceDirectives5.ts] ////

//// [ref.d.ts]
export interface $ { x }

//// [index.d.ts]
declare let $: { x: number }

//// [app.ts]
/// <reference types="lib"/>
import {$} from "./ref";
export interface A {
    x: typeof $;
}

//// [app.js]
"use strict";
exports.__esModule = true;


//// [app.d.ts]
/// <reference types="lib" />
export interface A {
    x: typeof $;
}
