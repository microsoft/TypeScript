//// [duplicateTypeParameters2.ts]
class A { public foo() { } }
class B { public bar() { } }

interface I<T extends A, T extends B> {}

//// [duplicateTypeParameters2.js]
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
