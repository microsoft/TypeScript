// @allowUnreachableCode: true

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
