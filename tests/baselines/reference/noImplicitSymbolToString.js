//// [noImplicitSymbolToString.ts]
// Fix #19666

let symbol!: symbol;
let str = "hello ";

const templateStr = `hello ${symbol}`;
const appendStr = "hello " + symbol;
str += symbol;

let symbolUnionNumber!: symbol | number;
let symbolUnionString!: symbol | string;

const templateStrUnion = `union with number ${symbolUnionNumber} and union with string ${symbolUnionString}`;


//// [noImplicitSymbolToString.js]
// Fix #19666
var symbol;
var str = "hello ";
var templateStr = "hello ".concat(symbol);
var appendStr = "hello " + symbol;
str += symbol;
var symbolUnionNumber;
var symbolUnionString;
var templateStrUnion = "union with number ".concat(symbolUnionNumber, " and union with string ").concat(symbolUnionString);
