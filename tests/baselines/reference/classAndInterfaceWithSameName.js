//// [tests/cases/conformance/classes/classDeclarations/classAndInterfaceWithSameName.ts] ////

//// [classAndInterfaceWithSameName.ts]
class C { foo: string; }
interface C { foo: string; }

module M {
    class D {
        bar: string;
    }

    interface D {
        bar: string;
    }
}

//// [classAndInterfaceWithSameName.js]
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var M;
(function (M) {
    var D = /** @class */ (function () {
        function D() {
        }
        return D;
    }());
})(M || (M = {}));
