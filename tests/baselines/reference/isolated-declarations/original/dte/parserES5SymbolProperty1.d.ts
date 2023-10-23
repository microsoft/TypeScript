//// [tests/cases/conformance/parser/ecmascript5/Symbols/parserES5SymbolProperty1.ts] ////

//// [parserES5SymbolProperty1.ts]
interface I {
    [Symbol.iterator]: string;
}

/// [Declarations] ////



//// [/.src/parserES5SymbolProperty1.d.ts]
interface I {
    [Symbol.iterator]: string;
}
