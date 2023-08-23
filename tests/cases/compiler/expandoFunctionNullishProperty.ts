// @strict: true
// @target: esnext
// @declaration: true

// mentioned in https://github.com/microsoft/TypeScript/issues/54220

interface TestNull {
  (): void;
  readonly prop: null;
}

export function testNull(): TestNull {
  function inner() {}
  inner.prop = null;
  return inner;
}

interface TestNull2 {
  (): void;
  prop: string | null;
}

export function testNull2(): TestNull2 {
  function inner() {}
  inner.prop = null;
  return inner;
}

interface TestUndefined {
  (): void;
  readonly prop: undefined;
}

export function testUndefined(): TestUndefined {
  function inner() {}
  inner.prop = undefined;
  return inner;
}
