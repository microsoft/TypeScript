//// [tests/cases/conformance/es6/Symbols/symbolType16.ts] ////

//// [symbolType16.ts]
interface Symbol {
    newSymbolProp: number;
}

var sym: symbol;
sym.newSymbolProp;

//// [symbolType16.js]
var sym;
sym.newSymbolProp;
