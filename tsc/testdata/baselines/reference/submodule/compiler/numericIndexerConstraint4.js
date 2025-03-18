//// [tests/cases/compiler/numericIndexerConstraint4.ts] ////

//// [numericIndexerConstraint4.ts]
class A {
    foo: number;
}

class B extends A {
    bar: string;
}

var x: {
    [idx: number]: A;
} = { 0: new B() }


//// [numericIndexerConstraint4.js]
class A {
    foo;
}
class B extends A {
    bar;
}
var x = { 0: new B() };
