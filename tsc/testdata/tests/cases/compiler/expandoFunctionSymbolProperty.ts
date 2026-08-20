// @strict: true
// @target: esnext
// @declaration: true

// repro from https://github.com/microsoft/TypeScript/issues/54220

const symb = Symbol();

interface TestSymb {
  (): void;
  readonly [symb]: boolean;
}

export function test(): TestSymb {
  function inner() {}
  inner[symb] = true;
  return inner;
}
