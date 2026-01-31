//// [tests/cases/conformance/es7/exponentiationOperator/emitExponentiationOperator1.ts] ////

//// [emitExponentiationOperator1.ts]
1 ** -2;
1 ** 2;
(-1) ** 2
1 ** 2 ** 3;
1 ** 2 ** -3;
1 ** -(2 ** 3);
(-(1 ** 2)) ** 3;
(-(1 ** 2)) ** -3;

1 ** 2 + 3;
1 ** 2 - 3;
1 ** 2 * 3;
1 ** 2 / 3;
1 ** 2 % 3;

1 ** -2 + 3;
1 ** -2 - 3;
1 ** -2 * 3;
1 ** -2 / 3;
1 ** -2 % 3;

2 + 3 ** 3;
2 - 3 ** 3;
2 * 3 ** 3;
2 / 3 ** 3;
2 % 3 ** 3;

(2 + 3) ** 4;
(2 - 3) ** 4;
(2 * 3) ** 4;
(2 / 3) ** 4;

//// [emitExponentiationOperator1.js]
Math.pow(1, -2);
Math.pow(1, 2);
Math.pow((-1), 2);
Math.pow(1, Math.pow(2, 3));
Math.pow(1, Math.pow(2, -3));
Math.pow(1, -(Math.pow(2, 3)));
Math.pow((-(Math.pow(1, 2))), 3);
Math.pow((-(Math.pow(1, 2))), -3);
Math.pow(1, 2) + 3;
Math.pow(1, 2) - 3;
Math.pow(1, 2) * 3;
Math.pow(1, 2) / 3;
Math.pow(1, 2) % 3;
Math.pow(1, -2) + 3;
Math.pow(1, -2) - 3;
Math.pow(1, -2) * 3;
Math.pow(1, -2) / 3;
Math.pow(1, -2) % 3;
2 + Math.pow(3, 3);
2 - Math.pow(3, 3);
2 * Math.pow(3, 3);
2 / Math.pow(3, 3);
2 % Math.pow(3, 3);
Math.pow((2 + 3), 4);
Math.pow((2 - 3), 4);
Math.pow((2 * 3), 4);
Math.pow((2 / 3), 4);
