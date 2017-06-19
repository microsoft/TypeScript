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
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        return C;
    }());
})(M2 || (M2 = {}));
