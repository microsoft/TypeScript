//// [assignmentNonObjectTypeConstraints.ts]
const enum E { A, B, C }

function foo<T extends number>(x: T) {
    var y: number = x;  // Ok
}

foo(5);
foo(E.A);

class A { a }
class B { b }

function bar<T extends A | B>(x: T) {
    var y: A | B = x;  // Ok
}

bar(new A);
bar(new B);


//// [assignmentNonObjectTypeConstraints.js]
function foo(x) {
    var y = x; // Ok
}
foo(5);
foo(0 /* A */);
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
function bar(x) {
    var y = x; // Ok
}
bar(new A);
bar(new B);
