//// [tests/cases/conformance/references/library-reference-1.ts] ////

//// [index.d.ts]

// We can find typings in the ./typings folder

declare var $: { foo(): void };


//// [consumer.ts]
/// <reference library="jquery" />
$.foo();


//// [consumer.js]
/// <reference library="jquery" />
$.foo();
