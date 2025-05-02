//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolIndexer2.ts] ////

//// [parserSymbolIndexer2.ts]
class C {
    [s: symbol]: string;
}

//// [parserSymbolIndexer2.js]
class C {
}
