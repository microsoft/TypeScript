// @strict: true

type Foo = Iterable<string> | Iterable<number>;
declare const foo: Foo;

const result = Array.from(foo);

type Expected = string[] | number[];
const check: Expected = result;
