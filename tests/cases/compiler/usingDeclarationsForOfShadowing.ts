// @target: es5,es2015,es2017,es2022,esnext
// @module: esnext
// @lib: esnext

class Foo {}

// Error when downleveling: using declaration shadowed by loop body declaration  
for (using foo of [{ [Symbol.dispose]() {} }]) {
  const foo = new Foo();
}

// OK: different names
for (using bar of [{ [Symbol.dispose]() {} }]) {
  const baz = new Foo();
}

// Error when downleveling: using declaration shadowed by loop body declaration  
for (using x of [{ [Symbol.dispose]() {} }]) {
  let x = 1;
}

// Error when downleveling: using declaration shadowed by loop body declaration
for (using y of [{ [Symbol.dispose]() {} }]) {
  var y = "test";
}