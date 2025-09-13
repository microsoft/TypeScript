//// [tests/cases/compiler/genericOfACloduleType1.ts] ////

//// [genericOfACloduleType1.ts]
class G<T>{ bar(x: T) { return x; } }
namespace M {
    export class C { foo() { } }
    export namespace C {
        export class X {
        }
    }
 
    var g1 = new G<C>();
    g1.bar(null).foo();
}
var g2 = new G<M.C>() // was: error Type reference cannot refer to container 'M.C'.

//// [genericOfACloduleType1.js]
var G = /** @class */ (function () {
    function G() {
    }
    G.prototype.bar = function (x) { return x; };
    return G;
}());
var M;
(function (M) {
    var C = /** @class */ (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        return C;
    }());
    M.C = C;
    (function (C) {
        var X = /** @class */ (function () {
            function X() {
            }
            return X;
        }());
        C.X = X;
    })(C = M.C || (M.C = {}));
    var g1 = new G();
    g1.bar(null).foo();
})(M || (M = {}));
var g2 = new G(); // was: error Type reference cannot refer to container 'M.C'.
