//// [tests/cases/compiler/enumBasics2.ts] ////

//// [enumBasics2.ts]
enum Foo {
  a = 2,
  b = 3,
  x = a.b,       // should error
  y = b.a,       // should error
  z = y.x * a.x, // should error
}

enum Bar {
  a = (1).valueOf(),   // ok
  b = Foo.a,           // ok
  c = Foo.a.valueOf(), // ok
  d = Foo.a.a,         // should error
}


//// [enumBasics2.js]
var Foo;
(function (Foo) {
    Foo[Foo["a"] = 2] = "a";
    Foo[Foo["b"] = 3] = "b";
    Foo["x"] = Foo.a.b;
    if (typeof Foo.x !== "string") Foo[Foo.x] = "x";
    Foo["y"] = Foo.b.a;
    if (typeof Foo.y !== "string") Foo[Foo.y] = "y";
    Foo["z"] = Foo.y.x * Foo.a.x;
    if (typeof Foo.z !== "string") Foo[Foo.z] = "z";
})(Foo || (Foo = {}));
var Bar;
(function (Bar) {
    Bar["a"] = (1).valueOf();
    if (typeof Bar.a !== "string") Bar[Bar.a] = "a";
    Bar["b"] = Foo.a;
    if (typeof Bar.b !== "string") Bar[Bar.b] = "b";
    Bar["c"] = Foo.a.valueOf();
    if (typeof Bar.c !== "string") Bar[Bar.c] = "c";
    Bar["d"] = Foo.a.a;
    if (typeof Bar.d !== "string") Bar[Bar.d] = "d";
})(Bar || (Bar = {}));
