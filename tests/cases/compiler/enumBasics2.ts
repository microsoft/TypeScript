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
