// @target: es5,es2015,es2017,es2022
// @module: esnext
// @lib: esnext

class Foo {}

// Error: using declaration shadowed by loop body declaration when downleveling
for (using foo of [{ [Symbol.dispose]() {} }]) {
  const foo = new Foo();
}

// OK: different names
for (using bar of [{ [Symbol.dispose]() {} }]) {
  const baz = new Foo();
}

// Error: using declaration shadowed by loop body declaration when downleveling  
for (using x of [{ [Symbol.dispose]() {} }]) {
  let x = 1;
}

// Error: using declaration shadowed by loop body declaration when downleveling
for (using y of [{ [Symbol.dispose]() {} }]) {
  var y = "test";
}