//// [tests/cases/compiler/extendGlobalThis2.ts] ////

//// [extendGlobalThis2.ts]
namespace globalThis {
    export function foo() { console.log("x"); }
}


//// [extendGlobalThis2.js]
"use strict";
var globalThis;
(function (globalThis) {
    function foo() { console.log("x"); }
    globalThis.foo = foo;
})(globalThis || (globalThis = {}));
