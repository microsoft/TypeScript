//// [tests/cases/conformance/expressions/commaOperator/commaOperatorWithSecondOperandNumberType.ts] ////

//// [commaOperatorWithSecondOperandNumberType.ts]
var ANY: any;
var BOOLEAN: boolean;
var NUMBER: number;
var STRING: string;
var OBJECT: Object;

//The second operand type is number
ANY, NUMBER;
BOOLEAN, NUMBER;
NUMBER, NUMBER;
STRING, NUMBER;
OBJECT, NUMBER;

//Return type is number
var resultIsNumber1 = (ANY, NUMBER);
var resultIsNumber2 = (BOOLEAN, NUMBER);
var resultIsNumber3 = (NUMBER, NUMBER);
var resultIsNumber4 = (STRING, NUMBER);
var resultIsNumber5 = (OBJECT, NUMBER);

//Literal and expression
null, NUMBER;
ANY = undefined, NUMBER;
true, 1;
BOOLEAN = false, 1;
"", NUMBER = 1;
STRING.trim(), NUMBER = 1;

var resultIsNumber6 = (null, NUMBER);
var resultIsNumber7 = (ANY = undefined, NUMBER);
var resultIsNumber8 = (true, 1);
var resultIsNumber9 = (BOOLEAN = false, 1);
var resultIsNumber10 = ("", NUMBER = 1);
var resultIsNumber11 = (STRING.trim(), NUMBER = 1);


//// [commaOperatorWithSecondOperandNumberType.js]
var ANY;
var BOOLEAN;
var NUMBER;
var STRING;
var OBJECT;
//The second operand type is number
ANY, NUMBER;
BOOLEAN, NUMBER;
NUMBER, NUMBER;
STRING, NUMBER;
OBJECT, NUMBER;
//Return type is number
var resultIsNumber1 = (ANY, NUMBER);
var resultIsNumber2 = (BOOLEAN, NUMBER);
var resultIsNumber3 = (NUMBER, NUMBER);
var resultIsNumber4 = (STRING, NUMBER);
var resultIsNumber5 = (OBJECT, NUMBER);
//Literal and expression
null, NUMBER;
ANY = undefined, NUMBER;
true, 1;
BOOLEAN = false, 1;
"", NUMBER = 1;
STRING.trim(), NUMBER = 1;
var resultIsNumber6 = (null, NUMBER);
var resultIsNumber7 = (ANY = undefined, NUMBER);
var resultIsNumber8 = (true, 1);
var resultIsNumber9 = (BOOLEAN = false, 1);
var resultIsNumber10 = ("", NUMBER = 1);
var resultIsNumber11 = (STRING.trim(), NUMBER = 1);
