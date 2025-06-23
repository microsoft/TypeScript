//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInForOfShadowingESNext.ts] ////

//// [usingDeclarationsInForOfShadowingESNext.ts]
class Foo {}

// OK: using declaration shadowed by loop body declaration, but not downleveling
for (using foo of [{ [Symbol.dispose]() {} }]) {
  const foo = new Foo();
}

//// [usingDeclarationsInForOfShadowingESNext.js]
class Foo {
}
// OK: using declaration shadowed by loop body declaration, but not downleveling
for (using foo of [{ [Symbol.dispose]() { } }]) {
    const foo = new Foo();
}
