//// [tests/cases/compiler/errorRecoveryInClassDeclaration.ts] ////

//// [errorRecoveryInClassDeclaration.ts]
class C {
    public bar() {
        var v = foo(
            public blaz() {}
            );
    }
}

//// [errorRecoveryInClassDeclaration.js]
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var v = foo(public, blaz(), {});
    };
    return C;
}());
