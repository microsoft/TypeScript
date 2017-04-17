//// [tests/cases/compiler/typeReferenceDirectives7.ts] ////

//// [index.d.ts]
// local value shadows global - no need to add type reference directive 
   
declare let $: { x: number }


//// [app.ts]
/// <reference types="lib"/>

export let $ = 1;

export let x: typeof $;
export let y = () => x

//// [app.js]
"use strict";
/// <reference types="lib"/>
exports.__esModule = true;
exports.$ = 1;
exports.y = function () { return exports.x; };


//// [app.d.ts]
export declare let $: number;
export declare let x: typeof $;
export declare let y: () => number;
