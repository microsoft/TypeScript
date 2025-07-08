//// [tests/cases/conformance/es7/exponentiationOperator/emitCompoundExponentiationOperator2.ts] ////

//// [emitCompoundExponentiationOperator2.ts]
var comp: number;

comp **= 1;
comp **= comp **= 1;
comp **= comp **= 1 + 2;
comp **= comp **= 1 - 2;
comp **= comp **= 1 * 2;
comp **= comp **= 1 / 2;

comp **= comp **= (1 + 2);
comp **= comp **= (1 - 2);
comp **= comp **= (1 * 2);
comp **= comp **= (1 / 2);

comp **= comp **= 1 + 2 ** 3;
comp **= comp **= 1 - 2 ** 4;
comp **= comp **= 1 * 2 ** 5;
comp **= comp **= 1 / 2 ** 6;

comp **= comp **= (1 + 2) ** 3;
comp **= comp **= (1 - 2) ** 4;
comp **= comp **= (1 * 2) ** 5;
comp **= comp **= (1 / 2) ** 6;


//// [emitCompoundExponentiationOperator2.js]
var comp;
comp = Math.pow(comp, 1);
comp = Math.pow(comp, comp = Math.pow(comp, 1));
comp = Math.pow(comp, comp = Math.pow(comp, 1 + 2));
comp = Math.pow(comp, comp = Math.pow(comp, 1 - 2));
comp = Math.pow(comp, comp = Math.pow(comp, 1 * 2));
comp = Math.pow(comp, comp = Math.pow(comp, 1 / 2));
comp = Math.pow(comp, comp = Math.pow(comp, (1 + 2)));
comp = Math.pow(comp, comp = Math.pow(comp, (1 - 2)));
comp = Math.pow(comp, comp = Math.pow(comp, (1 * 2)));
comp = Math.pow(comp, comp = Math.pow(comp, (1 / 2)));
comp = Math.pow(comp, comp = Math.pow(comp, 1 + Math.pow(2, 3)));
comp = Math.pow(comp, comp = Math.pow(comp, 1 - Math.pow(2, 4)));
comp = Math.pow(comp, comp = Math.pow(comp, 1 * Math.pow(2, 5)));
comp = Math.pow(comp, comp = Math.pow(comp, 1 / Math.pow(2, 6)));
comp = Math.pow(comp, comp = Math.pow(comp, Math.pow((1 + 2), 3)));
comp = Math.pow(comp, comp = Math.pow(comp, Math.pow((1 - 2), 4)));
comp = Math.pow(comp, comp = Math.pow(comp, Math.pow((1 * 2), 5)));
comp = Math.pow(comp, comp = Math.pow(comp, Math.pow((1 / 2), 6)));
