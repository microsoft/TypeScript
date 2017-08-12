//// [grammarAmbiguities1.ts]
class A { foo() { } }
class B { bar() { }}
function f(x) { return x; }
function g<T, U>(x) { return f(x); }
g<A, B>(7)

f(g<A, B>(7));
f(g < A, B > 7);
f(g < A, B > +(7));


//// [grammarAmbiguities1.js]
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
var A = (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    __names(A.prototype, ["foo"]);
    return A;
}());
var B = (function () {
    function B() {
    }
    B.prototype.bar = function () { };
    __names(B.prototype, ["bar"]);
    return B;
}());
function f(x) { return x; }
function g(x) { return f(x); }
g(7);
f(g(7));
f(g < A, B > 7);
f(g < A, B > +(7));
