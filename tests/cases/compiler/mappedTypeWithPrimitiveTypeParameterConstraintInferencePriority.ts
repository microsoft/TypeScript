// @strict: true
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/54000

function foo<T>(record: Record<string, T>, entity: T) {}

type StringArrayRecord = Record<string, string[]>;

function test() {
  const working: Record<string, string[]> = {};
  foo(working, []);

  const working2: StringArrayRecord = {};
  foo(working2, []);
}

// showcase the same behavior with index signature

function bar<T>(record: { [k: string]: T }, entity: T) {}

type StringArrayIndexSignature = { [k: string]: string[] };

function test2() {
  const working: { [k: string]: string[] } = {};
  bar(working, []);

  const working2: StringArrayIndexSignature = {};
  bar(working2, []);
}
