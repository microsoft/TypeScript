//// [tests/cases/compiler/typeReferenceDirectives7.ts] ////

//// [index.d.ts]
declare let $: { x: number }


//// [app.ts]
/// <reference types="lib"/>

export let $ = 1;

export let x: typeof $;
export let y = () => x

//// [app.js]
/// <reference types="lib"/>
export let $ = 1;
export let x;
export let y = () => x;


//// [app.d.ts]
export declare let $: number;
export declare let x: typeof $;
export declare let y: () => number;
