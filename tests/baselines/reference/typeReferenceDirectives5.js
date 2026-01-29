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
export {};


//// [app.d.ts]
export interface A {
    x: typeof $;
}
