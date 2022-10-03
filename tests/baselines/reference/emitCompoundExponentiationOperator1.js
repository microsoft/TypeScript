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
comp = Math.pow(comp, 1);
comp = Math.pow(comp, Math.pow(comp, comp));
comp = Math.pow(comp, Math.pow(comp, Math.pow(comp, 2)));
comp = Math.pow(comp, Math.pow(comp, comp) + 2);
comp = Math.pow(comp, Math.pow(comp, comp) - 2);
comp = Math.pow(comp, Math.pow(comp, comp) * 2);
comp = Math.pow(comp, Math.pow(comp, comp) / 2);
comp = Math.pow(comp, Math.pow(comp, comp) % 2);
comp = Math.pow(comp, Math.pow((comp - 2), 5));
comp = Math.pow(comp, Math.pow((comp + 2), 5));
comp = Math.pow(comp, Math.pow((comp * 2), 5));
comp = Math.pow(comp, Math.pow((comp / 2), 5));
comp = Math.pow(comp, Math.pow((comp % 2), 5));
comp = Math.pow(comp, Math.pow(comp, (5 + 2)));
comp = Math.pow(comp, Math.pow(comp, (5 - 2)));
comp = Math.pow(comp, Math.pow(comp, (5 * 2)));
comp = Math.pow(comp, Math.pow(comp, (5 / 2)));
comp = Math.pow(comp, Math.pow(comp, (5 % 2)));
