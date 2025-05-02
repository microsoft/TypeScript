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
    Foo[Foo["x"] = Foo.a.b] = "x";
    Foo[Foo["y"] = Foo.b.a] = "y";
    Foo[Foo["z"] = Foo.y.x * Foo.a.x] = "z";
})(Foo || (Foo = {}));
var Bar;
(function (Bar) {
    Bar[Bar["a"] = (1).valueOf()] = "a";
    Bar[Bar["b"] = 2] = "b";
    Bar[Bar["c"] = Foo.a.valueOf()] = "c";
    Bar[Bar["d"] = Foo.a.a] = "d";
})(Bar || (Bar = {}));
