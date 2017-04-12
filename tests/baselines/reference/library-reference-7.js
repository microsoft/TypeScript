//// [tests/cases/conformance/references/library-reference-7.ts] ////

//// [index.d.ts]
// Secondary references are possible

declare var $: { foo(): void };

//// [consumer.ts]
/// <reference types="jquery" />
$.foo();


//// [consumer.js]
/// <reference types="jquery" />
$.foo();
