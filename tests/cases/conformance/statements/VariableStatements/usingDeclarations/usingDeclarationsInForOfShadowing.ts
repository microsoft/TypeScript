// @target: esnext,es2022,es2017,es2015,es5
// @module: esnext
// @lib: esnext
// @noTypesAndSymbols: true

class Foo {}

for (using foo of []) {
  const foo = new Foo();
}

for (using bar of []) {
  let bar = "test";
}

for (using baz of []) {
  var baz = 42;
}