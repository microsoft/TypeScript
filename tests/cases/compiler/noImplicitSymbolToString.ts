// Fix #19666

let symbol!: symbol;
let str = "hello ";

const templateStr = `hello ${symbol}`;
const appendStr = "hello " + symbol;
str += symbol;

let symbolUnionNumber!: symbol | number;
let symbolUnionString!: symbol | string;

const templateStrUnion = `union with number ${symbolUnionNumber} and union with string ${symbolUnionString}`;
