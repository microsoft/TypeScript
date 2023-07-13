//// [tests/cases/conformance/types/localTypes/localTypes5.ts] ////

//// [localTypes5.ts]
function foo<A>() {
    class X {
        m<B, C>() {
            return (function <D>() {
                class Y<E> {
                }
                return new Y<string>();
            })<Date>();
        }
    }
    var x = new X();
    return x.m<number, boolean>();
}
var x = foo<void>();


//// [localTypes5.js]
function foo() {
    var X = /** @class */ (function () {
        function X() {
        }
        X.prototype.m = function () {
            return (function () {
                var Y = /** @class */ (function () {
                    function Y() {
                    }
                    return Y;
                }());
                return new Y();
            })();
        };
        return X;
    }());
    var x = new X();
    return x.m();
}
var x = foo();
