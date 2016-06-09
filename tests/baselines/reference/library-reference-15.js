//// [tests/cases/conformance/references/library-reference-15.ts] ////

//// [index.d.ts]

declare var $: { foo(): void };


//// [consumer.ts]
$.foo();


//// [consumer.js]
$.foo();
