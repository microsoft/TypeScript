//// [genericCallWithFixedArguments.ts]
class A { foo() { } }
class B { bar() { }} 

function g<T, U>(x) { }
g<A, B>(7) // the parameter list is fixed, so this should not error
 


//// [genericCallWithFixedArguments.js]
var A = (function () {
    function A() {
    }
    var proto_1 = A.prototype;
    proto_1.foo = function () { };
    return A;
}());
var B = (function () {
    function B() {
    }
    var proto_2 = B.prototype;
    proto_2.bar = function () { };
    return B;
}());
function g(x) { }
g(7); // the parameter list is fixed, so this should not error
