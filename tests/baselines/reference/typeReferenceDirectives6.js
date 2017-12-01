//// [tests/cases/compiler/typeReferenceDirectives6.ts] ////

//// [ref.d.ts]
// $ comes from type declaration file - type reference directive should be added

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
/// <reference path="ref.d.ts" />
/// <reference types="lib" />
declare let x: $;
declare let y: () => $;
