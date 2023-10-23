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


/// [Declarations] ////



//// [/.src/enumBasics2.d.ts]
declare enum Foo {
    a = 2,
    b = 3,
    x,// should error
    y,// should error
    z
}
declare enum Bar {
    a,// ok
    b,// ok
    c,// ok
    d
}
/// [Errors] ////

enumBasics2.ts(4,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics2.ts(5,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics2.ts(6,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics2.ts(10,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics2.ts(11,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics2.ts(12,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
enumBasics2.ts(13,3): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.


==== enumBasics2.ts (7 errors) ====
    enum Foo {
      a = 2,
      b = 3,
      x = a.b,       // should error
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
      y = b.a,       // should error
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
      z = y.x * a.x, // should error
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    
    enum Bar {
      a = (1).valueOf(),   // ok
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
      b = Foo.a,           // ok
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
      c = Foo.a.valueOf(), // ok
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
      d = Foo.a.a,         // should error
      ~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
    }
    