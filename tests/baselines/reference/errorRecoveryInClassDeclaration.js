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
    var proto_1 = C.prototype;
    proto_1.bar = function () {
        var v = foo(public, blaz(), {});
    };
    return C;
}());
