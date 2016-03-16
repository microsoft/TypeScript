//// [tests/cases/conformance/references/library-reference-3.ts] ////

//// [index.d.ts]

// Secondary references are possible

declare var $: { foo(): void };

//// [consumer.ts]
/// <reference library="jquery" />
$.foo();


//// [consumer.js]
/// <reference library="jquery" />
$.foo();
