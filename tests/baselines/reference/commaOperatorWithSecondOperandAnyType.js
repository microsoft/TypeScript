//// [commaOperatorWithSecondOperandAnyType.ts]
var ANY: any;
var BOOLEAN: boolean;
var NUMBER: number;
var STRING: string;
var OBJECT: Object;

//The second operand type is any
ANY, ANY;
BOOLEAN, ANY;
NUMBER, ANY;
STRING, ANY;
OBJECT, ANY;

//Return type is any
var resultIsAny1 = (ANY, ANY);
var resultIsAny2 = (BOOLEAN, ANY);
var resultIsAny3 = (NUMBER, ANY);
var resultIsAny4 = (STRING, ANY);
var resultIsAny5 = (OBJECT, ANY);

//Literal and expression
var x: any;

1, ANY;
++NUMBER, ANY;
"string", [null, 1];
"string".charAt(0), [null, 1];
true, x("any");
!BOOLEAN, x.doSomeThing();

var resultIsAny6 = (1, ANY);
var resultIsAny7 = (++NUMBER, ANY);
var resultIsAny8 = ("string", null);
var resultIsAny9 = ("string".charAt(0), undefined);
var resultIsAny10 = (true, x("any"));
var resultIsAny11 = (!BOOLEAN, x.doSomeThing());


//// [commaOperatorWithSecondOperandAnyType.js]
var ANY;
var BOOLEAN;
var NUMBER;
var STRING;
var OBJECT;
//The second operand type is any
ANY, ANY;
BOOLEAN, ANY;
NUMBER, ANY;
STRING, ANY;
OBJECT, ANY;
//Return type is any
var resultIsAny1 = (ANY, ANY);
var resultIsAny2 = (BOOLEAN, ANY);
var resultIsAny3 = (NUMBER, ANY);
var resultIsAny4 = (STRING, ANY);
var resultIsAny5 = (OBJECT, ANY);
//Literal and expression
var x;
1, ANY;
++NUMBER, ANY;
"string", [null, 1];
"string".charAt(0), [null, 1];
true, x("any");
!BOOLEAN, x.doSomeThing();
var resultIsAny6 = (1, ANY);
var resultIsAny7 = (++NUMBER, ANY);
var resultIsAny8 = ("string", null);
var resultIsAny9 = ("string".charAt(0), undefined);
var resultIsAny10 = (true, x("any"));
var resultIsAny11 = (!BOOLEAN, x.doSomeThing());
