//// [tests/cases/compiler/metadataOfUnion.ts] ////

//// [metadataOfUnion.ts]
function PropDeco(target: Object, propKey: string | symbol) { }

class A {
}

class B {
    @PropDeco
    x: "foo" | A;

    @PropDeco
    y: true | boolean;

    @PropDeco
    z: "foo" | boolean;
}

enum E {
    A,
    B,
    C,
    D
}

class D {
    @PropDeco
    a: E.A;

    @PropDeco
    b: E.B | E.C;

    @PropDeco
    c: E;

    @PropDeco
    d: E | number;
}

//// [metadataOfUnion.js]
function PropDeco(target, propKey) { }
class A {
}
class B {
    @PropDeco
    x;
    @PropDeco
    y;
    @PropDeco
    z;
}
var E;
(function (E) {
    E[E["A"] = 0] = "A";
    E[E["B"] = 1] = "B";
    E[E["C"] = 2] = "C";
    E[E["D"] = 3] = "D";
})(E || (E = {}));
class D {
    @PropDeco
    a;
    @PropDeco
    b;
    @PropDeco
    c;
    @PropDeco
    d;
}
