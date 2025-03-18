//// [tests/cases/compiler/typeReferenceDirectives6.ts] ////

//// [ref.d.ts]
declare let $: { x: number }
    
//// [index.d.ts]
interface $ { x }


//// [app.ts]
/// <reference path="./ref.d.ts"/>
/// <reference types="lib"/>

let x: $;
let y = () => x



//// [app.js]
let x;
let y = () => x;
