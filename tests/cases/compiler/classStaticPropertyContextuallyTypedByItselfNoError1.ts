// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/59271

declare function returnInput<T>(input: T): T;

const a = returnInput(
  class A {
    static foo = {};
  },
);
