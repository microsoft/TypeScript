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
/// <reference path="./ref.d.ts"/>
/// <reference types="lib"/>
var x;
var y = function () { return x; };


//// [app.d.ts]
declare let x: $;
declare let y: () => $;
