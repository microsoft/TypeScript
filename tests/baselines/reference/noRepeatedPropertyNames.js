//// [tests/cases/compiler/noRepeatedPropertyNames.ts] ////

//// [noRepeatedPropertyNames.ts]
// https://github.com/microsoft/TypeScript/issues/46815
const first = { a: 1, a: 2 };
class C {
    m() {
        const second = { a: 1, a: 2 };
        return second.a;
    }
}


//// [noRepeatedPropertyNames.js]
// https://github.com/microsoft/TypeScript/issues/46815
var first = { a: 1, a: 2 };
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.m = function () {
        var second = { a: 1, a: 2 };
        return second.a;
    };
    return C;
}());
