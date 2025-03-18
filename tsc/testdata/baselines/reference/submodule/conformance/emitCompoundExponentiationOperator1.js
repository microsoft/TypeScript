//// [tests/cases/conformance/es7/exponentiationOperator/emitCompoundExponentiationOperator1.ts] ////

//// [emitCompoundExponentiationOperator1.ts]
var comp: number;

comp **= 1;
comp **= comp ** comp;
comp **= comp ** comp ** 2;
comp **= comp ** comp + 2;
comp **= comp ** comp - 2;
comp **= comp ** comp * 2;
comp **= comp ** comp / 2;
comp **= comp ** comp % 2;
comp **= (comp - 2) ** 5;
comp **= (comp + 2) ** 5;
comp **= (comp * 2) ** 5;
comp **= (comp / 2) ** 5;
comp **= (comp % 2) ** 5;
comp **= comp ** (5 + 2);
comp **= comp ** (5 - 2);
comp **= comp ** (5 * 2);
comp **= comp ** (5 / 2);
comp **= comp ** (5 % 2);

//// [emitCompoundExponentiationOperator1.js]
var comp;
comp **= 1;
comp **= comp ** comp;
comp **= comp ** comp ** 2;
comp **= comp ** comp + 2;
comp **= comp ** comp - 2;
comp **= comp ** comp * 2;
comp **= comp ** comp / 2;
comp **= comp ** comp % 2;
comp **= (comp - 2) ** 5;
comp **= (comp + 2) ** 5;
comp **= (comp * 2) ** 5;
comp **= (comp / 2) ** 5;
comp **= (comp % 2) ** 5;
comp **= comp ** (5 + 2);
comp **= comp ** (5 - 2);
comp **= comp ** (5 * 2);
comp **= comp ** (5 / 2);
comp **= comp ** (5 % 2);
