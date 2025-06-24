//// [tests/cases/conformance/statements/VariableStatements/usingDeclarations/usingDeclarationsInForOfShadowing.ts] ////

//// [main.ts]
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

//// [tslib.d.ts]
export declare function __addDisposableResource<T>(env: any, value: T, async: boolean): T;
export declare function __disposeResources(env: any): void;

//// [main.js]
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
