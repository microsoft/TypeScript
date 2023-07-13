//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolProperty3.ts] ////

//// [parserSymbolProperty3.ts]
declare class C {
    [Symbol.unscopables](): string;
}

//// [parserSymbolProperty3.js]
