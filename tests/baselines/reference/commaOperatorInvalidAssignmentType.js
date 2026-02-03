//// [tests/cases/conformance/expressions/commaOperator/commaOperatorInvalidAssignmentType.ts] ////

//// [commaOperatorInvalidAssignmentType.ts]
declare var BOOLEAN: boolean;
declare var NUMBER: number;
declare var STRING: string;

declare var resultIsBoolean: boolean
declare var resultIsNumber: number
declare var resultIsString: string

//Expect errors when the results type is different form the second operand
resultIsBoolean = (BOOLEAN, STRING);
resultIsBoolean = (BOOLEAN, NUMBER);

resultIsNumber = (NUMBER, BOOLEAN);
resultIsNumber = (NUMBER, STRING);

resultIsString = (STRING, BOOLEAN);
resultIsString = (STRING, NUMBER);


//// [commaOperatorInvalidAssignmentType.js]
//Expect errors when the results type is different form the second operand
resultIsBoolean = (BOOLEAN, STRING);
resultIsBoolean = (BOOLEAN, NUMBER);
resultIsNumber = (NUMBER, BOOLEAN);
resultIsNumber = (NUMBER, STRING);
resultIsString = (STRING, BOOLEAN);
resultIsString = (STRING, NUMBER);
