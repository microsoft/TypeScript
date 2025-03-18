//// [tests/cases/compiler/constEnumToStringWithComments.ts] ////

//// [constEnumToStringWithComments.ts]
const enum Foo {
    X = 100,
    Y = 0.5,
    Z = 2.,
    A = -1,
    B = -1.5,
    C = -1.
}

let x0 = Foo.X.toString();
let x1 = Foo["X"].toString();
let y0 = Foo.Y.toString();
let y1 = Foo["Y"].toString();
let z0 = Foo.Z.toString();
let z1 = Foo["Z"].toString();
let a0 = Foo.A.toString();
let a1 = Foo["A"].toString();
let b0 = Foo.B.toString();
let b1 = Foo["B"].toString();
let c0 = Foo.C.toString();
let c1 = Foo["C"].toString();


//// [constEnumToStringWithComments.js]
var Foo;
(function (Foo) {
    Foo[Foo["X"] = 100] = "X";
    Foo[Foo["Y"] = 0.5] = "Y";
    Foo[Foo["Z"] = 2] = "Z";
    Foo[Foo["A"] = -1] = "A";
    Foo[Foo["B"] = -1.5] = "B";
    Foo[Foo["C"] = -1] = "C";
})(Foo || (Foo = {}));
let x0 = Foo.X.toString();
let x1 = Foo["X"].toString();
let y0 = Foo.Y.toString();
let y1 = Foo["Y"].toString();
let z0 = Foo.Z.toString();
let z1 = Foo["Z"].toString();
let a0 = Foo.A.toString();
let a1 = Foo["A"].toString();
let b0 = Foo.B.toString();
let b1 = Foo["B"].toString();
let c0 = Foo.C.toString();
let c1 = Foo["C"].toString();
