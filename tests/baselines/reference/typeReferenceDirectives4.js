//// [tests/cases/compiler/typeReferenceDirectives4.ts] ////

//// [ref.d.ts]
// $ comes from d.ts file - no need to add type reference directive

interface $ { x }

//// [index.d.ts]
declare let $: { x: number }


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
declare let x: $;
declare let y: () => $;
