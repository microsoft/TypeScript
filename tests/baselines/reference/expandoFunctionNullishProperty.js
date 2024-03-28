//// [tests/cases/compiler/expandoFunctionNullishProperty.ts] ////

//// [expandoFunctionNullishProperty.ts]
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


//// [expandoFunctionNullishProperty.js]
// mentioned in https://github.com/microsoft/TypeScript/issues/54220
export function testNull() {
    function inner() { }
    inner.prop = null;
    return inner;
}
export function testNull2() {
    function inner() { }
    inner.prop = null;
    return inner;
}
export function testUndefined() {
    function inner() { }
    inner.prop = undefined;
    return inner;
}


//// [expandoFunctionNullishProperty.d.ts]
interface TestNull {
    (): void;
    readonly prop: null;
}
export declare function testNull(): TestNull;
interface TestNull2 {
    (): void;
    prop: string | null;
}
export declare function testNull2(): TestNull2;
interface TestUndefined {
    (): void;
    readonly prop: undefined;
}
export declare function testUndefined(): TestUndefined;
export {};
