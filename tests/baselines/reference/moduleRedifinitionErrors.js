//// [tests/cases/compiler/moduleRedifinitionErrors.ts] ////

//// [moduleRedifinitionErrors.ts]
class A {
}
namespace A {
}


//// [moduleRedifinitionErrors.js]
"use strict";
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
