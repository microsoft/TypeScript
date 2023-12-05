//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty2.ts] ////

//// [parserES5SymbolProperty2.ts]
interface I {
    [Symbol.unscopables](): string;
}

//// [parserES5SymbolProperty2.js]
