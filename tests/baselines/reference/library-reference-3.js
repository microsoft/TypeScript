//// [tests/cases/conformance/references/library-reference-3.ts] ////

//// [index.d.ts]
declare var $: { foo(): void };

//// [consumer.ts]
/// <reference types="jquery" />
$.foo();


//// [consumer.js]
/// <reference types="jquery" />
$.foo();
