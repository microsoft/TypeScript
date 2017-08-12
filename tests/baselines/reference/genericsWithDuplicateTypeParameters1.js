//// [genericsWithDuplicateTypeParameters1.ts]
function f<x, x>() { }
function f2<X, X>(a: X, b: X): X { return null; }
class C<X, X> {
    public f<x, x>() {}
    public f2<X, X>(a: X, b: X): X { return null; }
}

interface I<X, X> {
    f<X, X>();
    f2<X, X>(a: X, b: X): X;
}

var m = {
    a: function f<X, X>() {},
    b: function f2<X, X>(a: X, b: X): X { return null; }
}

//// [genericsWithDuplicateTypeParameters1.js]
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
function f() { }
function f2(a, b) { return null; }
var C = (function () {
    function C() {
    }
    C.prototype.f = function () { };
    C.prototype.f2 = function (a, b) { return null; };
    __names(C.prototype, ["f", "f2"]);
    return C;
}());
var m = {
    a: function f() { },
    b: function f2(a, b) { return null; }
};
