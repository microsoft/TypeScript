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
var C = (function () {
    function C() {
    }
    return C;
}());
var M;
(function (M) {
    var D = (function () {
        function D() {
        }
        return D;
    }());
})(M || (M = {}));
