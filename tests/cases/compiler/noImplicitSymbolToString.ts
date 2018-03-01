// Fix #19666

let symbol!: symbol;
let str = "hello ";

const templateStr = `hello ${symbol}`;
const appendStr = "hello " + symbol;
str += symbol;
