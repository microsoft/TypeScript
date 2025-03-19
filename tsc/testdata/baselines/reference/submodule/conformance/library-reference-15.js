//// [tests/cases/conformance/references/library-reference-15.ts] ////

//// [index.d.ts]
declare var $: { foo(): void };

//// [index.d.ts]
declare var $2: { foo(): void };

//// [consumer.ts]
$.foo(); // should OK
$2.foo(); // should error

//// [consumer.js]
$.foo(); // should OK
$2.foo(); // should error
