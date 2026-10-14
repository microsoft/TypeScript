// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59271
// https://github.com/microsoft/TypeScript/issues/62552

function id<T>(x: T): T {
  return x
}

const Foo = id(class {
  static readonly foo = id(42) // ok
})

Foo.foo // 42

const Foo2 = id(class {
  static foo = id(42) // ok
})

Foo2.foo // number

const Foo3 = id(class {
  static readonly foo = [42];
});

const Foo4 = id(
  class A {
    static foo = {};
  },
);

Foo4.foo // {}

class Circular {
  static foo = Circular.foo; // error
}

const Circular2 = id(class C {
  static foo = C.foo; // error
});

const Circular3 = id(class {
  static foo = Circular3.foo; // error
});
