//// [tests/cases/conformance/references/library-reference-12.ts] ////

//// [package.json]
// package.json in a secondary reference can refer to another file

{
    "types": "dist/jquery.d.ts"
}

//// [jquery.d.ts]
declare var $: { foo(): void };


//// [consumer.ts]
/// <reference types="jquery" />
$.foo();


//// [consumer.js]
/// <reference types="jquery" />
$.foo();
