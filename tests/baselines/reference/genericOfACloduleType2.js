//// [tests/cases/compiler/genericOfACloduleType2.ts] ////

//// [genericOfACloduleType2.ts]
class G<T>{ bar(x: T) { return x; } }
module M {
    export class C { foo() { } }
    export module C {
        export class X {
        }
    }

    var g1 = new G<C>();
    g1.bar(null).foo(); // no error
}

module N {
    var g2 = new G<M.C>()
}

//// [genericOfACloduleType2.js]
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
    g1.bar(null).foo(); // no error
})(M || (M = {}));
var N;
(function (N) {
    var g2 = new G();
})(N || (N = {}));
