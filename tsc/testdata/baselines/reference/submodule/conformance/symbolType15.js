//// [tests/cases/conformance/es6/Symbols/symbolType15.ts] ////

//// [symbolType15.ts]
var sym: symbol;
var symObj: Symbol;

symObj = sym;
sym = symObj;

//// [symbolType15.js]
var sym;
var symObj;
symObj = sym;
sym = symObj;
