//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolProperty2.ts] ////

//// [parserSymbolProperty2.ts]
interface I {
    [Symbol.unscopables](): string;
}

//// [parserSymbolProperty2.js]
