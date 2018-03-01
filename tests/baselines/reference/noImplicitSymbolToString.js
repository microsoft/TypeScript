//// [noImplicitSymbolToString.ts]
// Fix #19666

let symbol!: symbol;
let str = "hello ";

const templateStr = `hello ${symbol}`;
const appendStr = "hello " + symbol;
str += symbol;


//// [noImplicitSymbolToString.js]
// Fix #19666
var symbol;
var str = "hello ";
var templateStr = "hello " + symbol;
var appendStr = "hello " + symbol;
str += symbol;
