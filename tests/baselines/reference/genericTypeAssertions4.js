//// [tests/cases/compiler/genericTypeAssertions4.ts] ////

//// [genericTypeAssertions4.ts]
class A {
    foo() { return ""; }
}

class B extends A {
    bar() { return 1; }
}

class C extends A {
    baz() { return 1; }
}

var a: A;
var b: B;
var c: C;

function foo2<T extends A>(x: T) {
    var y = x;
    y = a; // error: cannot convert A to T
    y = b; // error: cannot convert B to T
    y = c; // error: cannot convert C to T
    y = <T>a;
    y = <T>b; // error: cannot convert B to T
    y = <T>c; // error: cannot convert C to T
}

//// [genericTypeAssertions4.js]
class A {
    foo() { return ""; }
}
class B extends A {
    bar() { return 1; }
}
class C extends A {
    baz() { return 1; }
}
var a;
var b;
var c;
function foo2(x) {
    var y = x;
    y = a; // error: cannot convert A to T
    y = b; // error: cannot convert B to T
    y = c; // error: cannot convert C to T
    y = a;
    y = b; // error: cannot convert B to T
    y = c; // error: cannot convert C to T
}
