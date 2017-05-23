//// [tests/cases/conformance/references/library-reference-14.ts] ////

//// [index.d.ts]
declare var $: { foo(): void };


//// [consumer.ts]
$.foo();


//// [consumer.js]
$.foo();
