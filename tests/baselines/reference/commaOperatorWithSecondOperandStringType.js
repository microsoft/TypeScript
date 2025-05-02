//// [tests/cases/conformance/expressions/commaOperator/commaOperatorWithSecondOperandStringType.ts] ////

//// [commaOperatorWithSecondOperandStringType.ts]
var ANY: any;
var BOOLEAN: boolean;
var NUMBER: number;
var STRING: string;
var OBJECT: Object;

var resultIsString: string;

//The second operand is string
ANY, STRING;
BOOLEAN, STRING;
NUMBER, STRING;
STRING, STRING;
OBJECT, STRING;

//Return type is string
var resultIsString1 = (ANY, STRING);
var resultIsString2 = (BOOLEAN, STRING);
var resultIsString3 = (NUMBER, STRING);
var resultIsString4 = (STRING, STRING);
var resultIsString5 = (OBJECT, STRING);

//Literal and expression
null, STRING;
ANY = new Date(), STRING;
true, "";
BOOLEAN == undefined, "";
["a", "b"], NUMBER.toString();
OBJECT = new Object, STRING + "string";

var resultIsString6 = (null, STRING);
var resultIsString7 = (ANY = new Date(), STRING);
var resultIsString8 = (true, "");
var resultIsString9 = (BOOLEAN == undefined, "");
var resultIsString10 = (["a", "b"], NUMBER.toString());
var resultIsString11 = (new Object, STRING + "string");


//// [commaOperatorWithSecondOperandStringType.js]
var ANY;
var BOOLEAN;
var NUMBER;
var STRING;
var OBJECT;
var resultIsString;
//The second operand is string
ANY, STRING;
BOOLEAN, STRING;
NUMBER, STRING;
STRING, STRING;
OBJECT, STRING;
//Return type is string
var resultIsString1 = (ANY, STRING);
var resultIsString2 = (BOOLEAN, STRING);
var resultIsString3 = (NUMBER, STRING);
var resultIsString4 = (STRING, STRING);
var resultIsString5 = (OBJECT, STRING);
//Literal and expression
null, STRING;
ANY = new Date(), STRING;
true, "";
BOOLEAN == undefined, "";
["a", "b"], NUMBER.toString();
OBJECT = new Object, STRING + "string";
var resultIsString6 = (null, STRING);
var resultIsString7 = (ANY = new Date(), STRING);
var resultIsString8 = (true, "");
var resultIsString9 = (BOOLEAN == undefined, "");
var resultIsString10 = (["a", "b"], NUMBER.toString());
var resultIsString11 = (new Object, STRING + "string");
