//// [tests/cases/conformance/expressions/commaOperator/commaOperatorWithoutOperand.ts] ////

//// [commaOperatorWithoutOperand.ts]
declare var ANY: any;
declare var BOOLEAN: boolean;
declare var NUMBER: number;
declare var STRING: string;
declare var OBJECT: Object;

// Expect to have compiler errors
// Missing the second operand
(ANY, );
(BOOLEAN, );
(NUMBER, );
(STRING, );
(OBJECT, );

// Missing the first operand
(, ANY);
(, BOOLEAN);
(, NUMBER);
(, STRING);
(, OBJECT);

// Missing all operands
( , );

//// [commaOperatorWithoutOperand.js]
// Expect to have compiler errors
// Missing the second operand
(ANY, );
(BOOLEAN, );
(NUMBER, );
(STRING, );
(OBJECT, );
// Missing the first operand
(, ANY);
(, BOOLEAN);
(, NUMBER);
(, STRING);
(, OBJECT);
// Missing all operands
(, );
