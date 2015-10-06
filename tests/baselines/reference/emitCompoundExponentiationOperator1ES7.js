//// [emitCompoundExponentiationOperator1ES7.ts]

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

//// [emitCompoundExponentiationOperator1ES7.js]
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
