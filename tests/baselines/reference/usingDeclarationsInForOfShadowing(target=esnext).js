//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInForOfShadowing.ts] ////

//// [usingDeclarationsInForOfShadowing.ts]
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

//// [usingDeclarationsInForOfShadowing.js]
class Foo {
}
for (using foo of []) {
    const foo = new Foo();
}
for (using bar of []) {
    let bar = "test";
}
for (using baz of []) {
    var baz = 42;
}
