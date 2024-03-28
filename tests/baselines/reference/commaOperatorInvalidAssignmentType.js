//// [tests/cases/conformance/expressions/commaOperator/commaOperatorInvalidAssignmentType.ts] ////

//// [commaOperatorInvalidAssignmentType.ts]
var BOOLEAN: boolean;
var NUMBER: number;
var STRING: string;

var resultIsBoolean: boolean
var resultIsNumber: number
var resultIsString: string

//Expect errors when the results type is different form the second operand
resultIsBoolean = (BOOLEAN, STRING);
resultIsBoolean = (BOOLEAN, NUMBER);

resultIsNumber = (NUMBER, BOOLEAN);
resultIsNumber = (NUMBER, STRING);

resultIsString = (STRING, BOOLEAN);
resultIsString = (STRING, NUMBER);


//// [commaOperatorInvalidAssignmentType.js]
var BOOLEAN;
var NUMBER;
var STRING;
var resultIsBoolean;
var resultIsNumber;
var resultIsString;
//Expect errors when the results type is different form the second operand
resultIsBoolean = (BOOLEAN, STRING);
resultIsBoolean = (BOOLEAN, NUMBER);
resultIsNumber = (NUMBER, BOOLEAN);
resultIsNumber = (NUMBER, STRING);
resultIsString = (STRING, BOOLEAN);
resultIsString = (STRING, NUMBER);
