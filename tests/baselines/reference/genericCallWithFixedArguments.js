//// [tests/cases/compiler/genericCallWithFixedArguments.ts] ////

//// [genericCallWithFixedArguments.ts]
class A { foo() { } }
class B { bar() { }} 

function g<T, U>(x) { }
g<A, B>(7) // the parameter list is fixed, so this should not error
 


//// [genericCallWithFixedArguments.js]
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.foo = function () { };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.bar = function () { };
    return B;
}());
function g(x) { }
g(7); // the parameter list is fixed, so this should not error
