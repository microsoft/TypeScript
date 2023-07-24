//// [tests/cases/compiler/expandoFunctionSymbolProperty.ts] ////

//// [expandoFunctionSymbolProperty.ts]
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


//// [expandoFunctionSymbolProperty.js]
// repro from https://github.com/microsoft/TypeScript/issues/54220
const symb = Symbol();
export function test() {
    function inner() { }
    inner[symb] = true;
    return inner;
}


//// [expandoFunctionSymbolProperty.d.ts]
declare const symb: unique symbol;
interface TestSymb {
    (): void;
    readonly [symb]: boolean;
}
export declare function test(): TestSymb;
export {};
