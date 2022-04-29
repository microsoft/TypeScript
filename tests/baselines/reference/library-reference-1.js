//// [tests/cases/conformance/references/library-reference-1.ts] ////

//// [index.d.ts]
// We can find typings in the ./types folder

declare var $: { foo(): void };


//// [consumer.ts]
/// <reference types="jquery" />
$.foo();


//// [consumer.js]
/// <reference types="jquery" />
$.foo();
