// @target: esnext,es2022,es2017,es2015,es5
// @module: commonjs
// @lib: esnext
// @importHelpers: true
// @noTypesAndSymbols: true

// @filename: main.ts
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

// @filename: tslib.d.ts
export declare function __addDisposableResource<T>(env: any, value: T, async: boolean): T;
export declare function __disposeResources(env: any): void;
