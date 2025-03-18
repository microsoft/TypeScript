//// [tests/cases/compiler/typeReferenceDirectives4.ts] ////

//// [ref.d.ts]
interface $ { x }

//// [index.d.ts]
declare let $: { x: number }


//// [app.ts]
/// <reference path="./ref.d.ts"/>
/// <reference types="lib" preserve="true" />

let x: $;
let y = () => x

//// [app.js]
let x;
let y = () => x;
