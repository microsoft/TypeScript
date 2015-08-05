//// [constEnumToStringWithComments.ts]
const enum Foo {
    X = 100,
    Y = 0.5,
    Z = 2.
}

let x0 = Foo.X.toString();
let x1 = Foo["X"].toString();
let y0 = Foo.Y.toString();
let y1 = Foo["Y"].toString();
let z0 = Foo.Z.toString();
let z1 = Foo["Z"].toString();


//// [constEnumToStringWithComments.js]
var x0 = 100 /* X */ .toString();
var x1 = 100 /* "X" */ .toString();
var y0 = 0.5 /* Y */.toString();
var y1 = 0.5 /* "Y" */.toString();
var z0 = 2 /* Z */ .toString();
var z1 = 2 /* "Z" */ .toString();
