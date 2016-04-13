//// [tests/cases/conformance/references/library-reference-13.ts] ////

//// [index.d.ts]
declare var $: { foo(): void };


//// [consumer.ts]
$.foo();


//// [consumer.js]
$.foo();
