// @strict: true
// @lib: esnext
// @noEmit: true

const mySymbol = Symbol();
interface Foo {
  (): void;
  [mySymbol]: true;
}
const foo: Foo = () => {};
foo[mySymbol] = true;

interface Bar {
  (): void;
  test: true;
}
const t = "test" as const;
const bar: Bar = () => {};
bar[t] = true;