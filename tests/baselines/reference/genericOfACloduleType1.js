//// [genericOfACloduleType1.ts]
class G<T>{ bar(x: T) { return x; } }
module M {
    export class C { foo() { } }
    export module C {
        export class X {
        }
    }
 
    var g1 = new G<C>();
    g1.bar(null).foo();
}
var g2 = new G<M.C>() // was: error Type reference cannot refer to container 'M.C'.

//// [genericOfACloduleType1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
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
var G = (function () {
    function G() {
    }
    G.prototype.bar = function (x) { return x; };
    __names(G.prototype, ["bar"]);
    return G;
}());
var M;
(function (M) {
    var C = (function () {
        function C() {
        }
        C.prototype.foo = function () { };
        __names(C.prototype, ["foo"]);
        return C;
    }());
    M.C = C;
    (function (C) {
        var X = (function () {
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
