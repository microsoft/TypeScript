// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54886

interface Dict_54886 {
  foo: 1;
  bar: 1;
}

type FF_54886 = "foo" extends "foo" | "bar" ? "foo" : never;
type C_54886 = Dict_54886[FF_54886]; // ok
