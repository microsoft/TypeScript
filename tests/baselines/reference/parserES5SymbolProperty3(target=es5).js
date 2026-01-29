//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty3.ts] ////

//// [parserES5SymbolProperty3.ts]
declare class C {
    [Symbol.unscopables](): string;
}

//// [parserES5SymbolProperty3.js]
