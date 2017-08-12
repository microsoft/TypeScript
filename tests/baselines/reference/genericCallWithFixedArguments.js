//// [genericCallWithFixedArguments.ts]
class A { foo() { } }
class B { bar() { }} 

function g<T, U>(x) { }
g<A, B>(7) // the parameter list is fixed, so this should not error
 


//// [genericCallWithFixedArguments.js]
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
function g(x) { }
g(7); // the parameter list is fixed, so this should not error
