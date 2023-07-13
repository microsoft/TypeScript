//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithInvalidSimpleUnaryExpressionOperands.ts] ////

//// [exponentiationOperatorWithInvalidSimpleUnaryExpressionOperands.ts]
var temp: any;

// Error: incorrect type on left-hand side 
(! --temp) ** 3;
(!temp--) ** 3;
(!3) ** 4;
(!temp++) ** 4;
(!temp--) ** 4;

(! --temp) ** 3 ** 1;
(!temp--) ** 3 ** 1;
(!3) ** 4 ** 1;
(!temp++) ** 4 ** 1;
(!temp--) ** 4 ** 1;

(typeof --temp) ** 3;
(typeof temp--) ** 3;
(typeof 3) ** 4;
(typeof temp++) ** 4;
(typeof temp--) ** 4;

1 ** (typeof --temp) ** 3;
1 ** (typeof temp--) ** 3;
1 ** (typeof 3) ** 4;
1 ** (typeof temp++) ** 4;
1 ** (typeof temp--) ** 4;

(delete --temp) ** 3;
(delete ++temp) ** 3;
(delete temp--) ** 3;
(delete temp++) ** 3;

1 ** (delete --temp) ** 3;
1 ** (delete ++temp) ** 3;
1 ** (delete temp--) ** 3;
1 ** (delete temp++) ** 3;

//// [exponentiationOperatorWithInvalidSimpleUnaryExpressionOperands.js]
var temp;
// Error: incorrect type on left-hand side 
Math.pow((!--temp), 3);
Math.pow((!temp--), 3);
Math.pow((!3), 4);
Math.pow((!temp++), 4);
Math.pow((!temp--), 4);
Math.pow((!--temp), Math.pow(3, 1));
Math.pow((!temp--), Math.pow(3, 1));
Math.pow((!3), Math.pow(4, 1));
Math.pow((!temp++), Math.pow(4, 1));
Math.pow((!temp--), Math.pow(4, 1));
Math.pow((typeof --temp), 3);
Math.pow((typeof temp--), 3);
Math.pow((typeof 3), 4);
Math.pow((typeof temp++), 4);
Math.pow((typeof temp--), 4);
Math.pow(1, Math.pow((typeof --temp), 3));
Math.pow(1, Math.pow((typeof temp--), 3));
Math.pow(1, Math.pow((typeof 3), 4));
Math.pow(1, Math.pow((typeof temp++), 4));
Math.pow(1, Math.pow((typeof temp--), 4));
Math.pow((delete --temp), 3);
Math.pow((delete ++temp), 3);
Math.pow((delete temp--), 3);
Math.pow((delete temp++), 3);
Math.pow(1, Math.pow((delete --temp), 3));
Math.pow(1, Math.pow((delete ++temp), 3));
Math.pow(1, Math.pow((delete temp--), 3));
Math.pow(1, Math.pow((delete temp++), 3));
