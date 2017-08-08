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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
function foo() {
    var X = (function () {
        function X() {
        }
        X.prototype.m = function () {
            return (function () {
                var Y = (function () {
                    function Y() {
                    }
                    return Y;
                }());
                return new Y();
            })();
        };
        __names(X.prototype, ["m"]);
        return X;
    }());
    var x = new X();
    return x.m();
}
var x = foo();
