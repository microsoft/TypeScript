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
var x0 = 100 /* Foo.X */.toString();
var x1 = 100 /* Foo["X"] */.toString();
var y0 = 0.5 /* Foo.Y */.toString();
var y1 = 0.5 /* Foo["Y"] */.toString();
var z0 = 2 /* Foo.Z */.toString();
var z1 = 2 /* Foo["Z"] */.toString();
var a0 = (-1 /* Foo.A */).toString();
var a1 = (-1 /* Foo["A"] */).toString();
var b0 = (-1.5 /* Foo.B */).toString();
var b1 = (-1.5 /* Foo["B"] */).toString();
var c0 = (-1 /* Foo.C */).toString();
var c1 = (-1 /* Foo["C"] */).toString();
