//// [tests/cases/compiler/assignmentNonObjectTypeConstraints.ts] ////

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
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
})(E || (E = {}));
function foo(x) {
    var y = x; // Ok
}
foo(5);
foo(E.A);
class A {
    a;
}
class B {
    b;
}
function bar(x) {
    var y = x; // Ok
}
bar(new A);
bar(new B);
