//// [tests/cases/conformance/es7/exponentiationOperator/emitExponentiationOperator4.ts] ////

//// [emitExponentiationOperator4.ts]
var temp: any;

(<number>temp) ** 3;
(<number>--temp) ** 3;
(<number>++temp) ** 3;
(<number>temp--) ** 3;
(<number>temp++) ** 3;

1 ** (<number>--temp) ** 3;
1 ** (<number>++temp) ** 3;
1 ** (<number>temp--) ** 3;
1 ** (<number>temp++) ** 3;

(void --temp) ** 3;
(void temp--) ** 3;
(void 3) ** 4;
(void temp++) ** 4;
(void temp--) ** 4;


1 ** (void --temp) ** 3;
1 ** (void temp--) ** 3;
1 ** (void 3) ** 4;
1 ** (void temp++) ** 4;
1 ** (void temp--) ** 4;

(~ --temp) ** 3;
(~ temp--) ** 3;
(~ 3) ** 4;
(~ temp++) ** 4;
(~ temp--) ** 4;

1 ** (~ --temp) ** 3;
1 ** (~ temp--) ** 3;
1 ** (~ 3) ** 4;
1 ** (~ temp++) ** 4;
1 ** (~ temp--) ** 4;

//// [emitExponentiationOperator4.js]
var temp;
Math.pow(temp, 3);
Math.pow(--temp, 3);
Math.pow(++temp, 3);
Math.pow(temp--, 3);
Math.pow(temp++, 3);
Math.pow(1, Math.pow(--temp, 3));
Math.pow(1, Math.pow(++temp, 3));
Math.pow(1, Math.pow(temp--, 3));
Math.pow(1, Math.pow(temp++, 3));
Math.pow((void --temp), 3);
Math.pow((void temp--), 3);
Math.pow((void 3), 4);
Math.pow((void temp++), 4);
Math.pow((void temp--), 4);
Math.pow(1, Math.pow((void --temp), 3));
Math.pow(1, Math.pow((void temp--), 3));
Math.pow(1, Math.pow((void 3), 4));
Math.pow(1, Math.pow((void temp++), 4));
Math.pow(1, Math.pow((void temp--), 4));
Math.pow((~--temp), 3);
Math.pow((~temp--), 3);
Math.pow((~3), 4);
Math.pow((~temp++), 4);
Math.pow((~temp--), 4);
Math.pow(1, Math.pow((~--temp), 3));
Math.pow(1, Math.pow((~temp--), 3));
Math.pow(1, Math.pow((~3), 4));
Math.pow(1, Math.pow((~temp++), 4));
Math.pow(1, Math.pow((~temp--), 4));
