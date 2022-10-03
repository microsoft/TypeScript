//// [genericTypeAssertions5.ts]
interface A {
    foo(): string;
}

interface B extends A {
    bar(): number;
}

interface C extends A {
    baz(): number;
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

//// [genericTypeAssertions5.js]
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
