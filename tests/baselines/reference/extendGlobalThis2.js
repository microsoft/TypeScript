//// [extendGlobalThis2.ts]
namespace globalThis {
    export function foo() { console.log("x"); }
}


//// [extendGlobalThis2.js]
var globalThis;
(function (globalThis) {
    function foo() { console.log("x"); }
    globalThis.foo = foo;
})(globalThis || (globalThis = {}));
