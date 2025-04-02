//// [tests/cases/conformance/parser/ecmascript6/Symbols/parserSymbolIndexer5.ts] ////

//// [parserSymbolIndexer5.ts]
var x = {
    [s: symbol]: ""
}

//// [parserSymbolIndexer5.js]
var x = {
    [s]: symbol, "": 
};
