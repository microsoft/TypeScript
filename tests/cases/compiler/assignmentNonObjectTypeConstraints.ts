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
