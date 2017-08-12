//// [classImplementsImportedInterface.ts]
module M1 {
    export interface I {
        foo();
    }
}

module M2 {
    import T = M1.I;
    class C implements T {
        foo() {}
    }
}

//// [classImplementsImportedInterface.js]
var M2;
(function (M2) {
    var C = (function () {
        function C() {
        }
        var proto_1 = C.prototype;
        proto_1.foo = function () { };
        return C;
    }());
})(M2 || (M2 = {}));
