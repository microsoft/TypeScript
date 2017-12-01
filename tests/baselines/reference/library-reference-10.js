//// [tests/cases/conformance/references/library-reference-10.ts] ////

//// [package.json]
// package.json in a primary reference can refer to another file

{
    "typings": "jquery.d.ts"
}

//// [jquery.d.ts]
declare var $: { foo(): void };


//// [consumer.ts]
/// <reference types="jquery" />
$.foo();


//// [consumer.js]
/// <reference types="jquery" />
$.foo();
