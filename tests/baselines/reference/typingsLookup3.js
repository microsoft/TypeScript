//// [tests/cases/conformance/typings/typingsLookup3.ts] ////

//// [index.d.ts]
declare var $: { x: any };

//// [a.ts]
/// <reference types="JqUeRy" />
$.x;


//// [a.js]
/// <reference types="JqUeRy" />
$.x;
