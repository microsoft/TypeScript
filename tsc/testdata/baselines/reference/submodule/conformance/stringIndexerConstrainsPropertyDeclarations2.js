//// [tests/cases/conformance/types/objectTypeLiteral/indexSignatures/stringIndexerConstrainsPropertyDeclarations2.ts] ////

//// [stringIndexerConstrainsPropertyDeclarations2.ts]
// String indexer providing a constraint of a user defined type

class A {
    foo(): string { return ''; }
}

class B extends A {
    bar(): string { return ''; }
}

class Foo {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
}

interface Foo2 {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
}

var a: {
    [x: string]: A;
    a: A; // ok
    b: B; // ok
    c: number; // error
    d: string; // error
};

// error
var b: { [x: string]: A } = {
    a: A,
    b: B
}

//// [stringIndexerConstrainsPropertyDeclarations2.js]
class A {
    foo() { return ''; }
}
class B extends A {
    bar() { return ''; }
}
class Foo {
    a;
    b;
    c;
    d;
}
var a;
var b = {
    a: A,
    b: B
};
