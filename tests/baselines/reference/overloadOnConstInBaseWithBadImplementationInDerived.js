//// [tests/cases/compiler/overloadOnConstInBaseWithBadImplementationInDerived.ts] ////

//// [overloadOnConstInBaseWithBadImplementationInDerived.ts]
interface I {
    x1(a: number, callback: (x: 'hi') => number);
}

class C implements I {
    x1(a: number, callback: (x: 'hi') => number) { // error
    }
}

//// [overloadOnConstInBaseWithBadImplementationInDerived.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.x1 = function (a, callback) {
    };
    return C;
}());
