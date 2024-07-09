//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolIndexer3.ts] ////

//// [parserSymbolIndexer3.ts]
class C {
    static [s: symbol]: string;
}

//// [parserSymbolIndexer3.js]
class C {
}
