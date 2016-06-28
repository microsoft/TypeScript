//// [errorRecoveryInClassDeclaration.ts]
class C {
    public bar() {
        var v = foo(
            public blaz() {}
            );
    }
}

//// [errorRecoveryInClassDeclaration.js]
var C = (function () {
    function C() {
    }
    C.prototype.bar = function () {
        var v = foo(public, blaz(), {});
    };
    return C;
}());
