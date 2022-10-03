// @allowUnreachableCode: true

var ANY: any;
var BOOLEAN: boolean;
var NUMBER: number;
var STRING: string;
var OBJECT: Object;

//Expected: work well
ANY, BOOLEAN, NUMBER;
BOOLEAN, NUMBER, STRING;
NUMBER, STRING, OBJECT;
STRING, OBJECT, ANY;
OBJECT, ANY, BOOLEAN;

//Results should have the same type as the third operand
var resultIsAny1 = (STRING, OBJECT, ANY);
var resultIsBoolean1 = (OBJECT, ANY, BOOLEAN);
var resultIsNumber1 = (ANY, BOOLEAN, NUMBER);
var resultIsString1 = (BOOLEAN, NUMBER, STRING);
var resultIsObject1 = (NUMBER, STRING, OBJECT);

//Literal and expression
null, true, 1;
++NUMBER, STRING.charAt(0), new Object();

var resultIsNumber2 = (null, true, 1);
var resultIsObject2 = (++NUMBER, STRING.charAt(0), new Object());