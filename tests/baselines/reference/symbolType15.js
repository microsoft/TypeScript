//// [tests/cases/conformance/es6/Symbols/symbolType15.ts] ////

//// [symbolType15.ts]
declare var sym: symbol;
var symObj: Symbol;

symObj = sym;
sym = symObj;

//// [symbolType15.js]
var symObj;
symObj = sym;
sym = symObj;
