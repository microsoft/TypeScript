//// [tests/cases/conformance/classes/classStaticBlock/classStaticBlock28.ts] ////

//// [classStaticBlock28.ts]
let foo: number;

class C {
    static {
        foo = 1
    }
}

console.log(foo)

//// [classStaticBlock28.js]
"use strict";
var foo;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function () {
    foo = 1;
})();
console.log(foo);
