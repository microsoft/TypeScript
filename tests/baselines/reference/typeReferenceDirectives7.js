//// [tests/cases/compiler/typeReferenceDirectives7.ts] ////

//// [index.d.ts]
declare let $: { x: number }


//// [app.ts]
/// <reference types="lib"/>

export let $ = 1;

export let x: typeof $;
export let y = () => x

//// [app.js]
"use strict";
/// <reference types="lib"/>
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = exports.x = exports.$ = void 0;
exports.$ = 1;
var y = function () { return exports.x; };
exports.y = y;


//// [app.d.ts]
export declare let $: number;
export declare let x: typeof $;
export declare let y: () => number;
