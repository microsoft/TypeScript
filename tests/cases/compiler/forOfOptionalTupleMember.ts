// @strict: true
// @target: es5, esnext
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54302

type Item = {
  value: string;
};

type Foo = [Item?];

declare const foo: Foo;

for (let item of foo) {
  item.value;
}
