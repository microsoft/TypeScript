//// [tests/cases/conformance/expressions/commaOperator/commaOperatorWithSecondOperandBooleanType.ts] ////

//// [commaOperatorWithSecondOperandBooleanType.ts]
var ANY: any;
var BOOLEAN: boolean;
var NUMBER: number;
var STRING: string;
var OBJECT: Object;

//The second operand type is boolean
ANY, BOOLEAN;
BOOLEAN, BOOLEAN;
NUMBER, BOOLEAN;
STRING, BOOLEAN;
OBJECT, BOOLEAN;

//Return type is boolean
var resultIsBoolean1 = (ANY, BOOLEAN);
var resultIsBoolean2 = (BOOLEAN, BOOLEAN);
var resultIsBoolean3 = (NUMBER, BOOLEAN);
var resultIsBoolean4 = (STRING, BOOLEAN);
var resultIsBoolean5 = (OBJECT, BOOLEAN);

//Literal and expression
null, BOOLEAN;
ANY = undefined, BOOLEAN;
1, true;
++NUMBER, true;
[1, 2, 3], !BOOLEAN;
OBJECT = [1, 2, 3], BOOLEAN = false;

var resultIsBoolean6 = (null, BOOLEAN);
var resultIsBoolean7 = (ANY = undefined, BOOLEAN);
var resultIsBoolean8 = (1, true);
var resultIsBoolean9 = (++NUMBER, true);
var resultIsBoolean10 = ([1, 2, 3], !BOOLEAN);
var resultIsBoolean11 = (OBJECT = [1, 2, 3], BOOLEAN = false);


//// [commaOperatorWithSecondOperandBooleanType.js]
var ANY;
var BOOLEAN;
var NUMBER;
var STRING;
var OBJECT;
//The second operand type is boolean
ANY, BOOLEAN;
BOOLEAN, BOOLEAN;
NUMBER, BOOLEAN;
STRING, BOOLEAN;
OBJECT, BOOLEAN;
//Return type is boolean
var resultIsBoolean1 = (ANY, BOOLEAN);
var resultIsBoolean2 = (BOOLEAN, BOOLEAN);
var resultIsBoolean3 = (NUMBER, BOOLEAN);
var resultIsBoolean4 = (STRING, BOOLEAN);
var resultIsBoolean5 = (OBJECT, BOOLEAN);
//Literal and expression
null, BOOLEAN;
ANY = undefined, BOOLEAN;
1, true;
++NUMBER, true;
[1, 2, 3], !BOOLEAN;
OBJECT = [1, 2, 3], BOOLEAN = false;
var resultIsBoolean6 = (null, BOOLEAN);
var resultIsBoolean7 = (ANY = undefined, BOOLEAN);
var resultIsBoolean8 = (1, true);
var resultIsBoolean9 = (++NUMBER, true);
var resultIsBoolean10 = ([1, 2, 3], !BOOLEAN);
var resultIsBoolean11 = (OBJECT = [1, 2, 3], BOOLEAN = false);
