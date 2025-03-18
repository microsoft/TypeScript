//// [tests/cases/conformance/typings/typingsLookup1.ts] ////

//// [index.d.ts]
declare var $: { x: any };

//// [a.ts]
/// <reference types="jquery" />
$.x;


//// [a.js]
$.x;
