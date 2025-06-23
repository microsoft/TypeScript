// @target: esnext  
// @module: esnext
// @lib: esnext

class Foo {}

// OK: using declaration shadowed by loop body declaration, but not downleveling
for (using foo of [{ [Symbol.dispose]() {} }]) {
  const foo = new Foo();
}