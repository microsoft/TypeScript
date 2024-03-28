//// [tests/cases/conformance/expressions/conditonalOperator/conditionalOperatorConditionIsNumberType.ts] ////

//// [conditionalOperatorConditionIsNumberType.ts]
//Cond ? Expr1 : Expr2,  Cond is of number type, Expr1 and Expr2 have the same type
var condNumber: number;

var exprAny1: any;
var exprBoolean1: boolean;
var exprNumber1: number;
var exprString1: string;
var exprIsObject1: Object;

var exprAny2: any;
var exprBoolean2: boolean;
var exprNumber2: number;
var exprString2: string;
var exprIsObject2: Object;

//Cond is a number type variable
condNumber ? exprAny1 : exprAny2;
condNumber ? exprBoolean1 : exprBoolean2;
condNumber ? exprNumber1 : exprNumber2;
condNumber ? exprString1 : exprString2;
condNumber ? exprIsObject1 : exprIsObject2;
condNumber ? exprString1 : exprBoolean1; // Union

//Cond is a number type literal
1 ? exprAny1 : exprAny2;
0 ? exprBoolean1 : exprBoolean2;
0.123456789 ? exprNumber1 : exprNumber2;
- 10000000000000 ? exprString1 : exprString2;
1000000000000 ? exprIsObject1 : exprIsObject2;
10000 ? exprString1 : exprBoolean1; // Union

//Cond is a number type expression
function foo() { return 1 };
var array = [1, 2, 3];

1 * 0 ? exprAny1 : exprAny2;
1 + 1 ? exprBoolean1 : exprBoolean2;
"string".length ? exprNumber1 : exprNumber2;
foo() ? exprString1 : exprString2;
foo() / array[1] ? exprIsObject1 : exprIsObject2;
foo() ? exprString1 : exprBoolean1; // Union

//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condNumber ? exprAny1 : exprAny2;
var resultIsBoolean1 = condNumber ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condNumber ? exprNumber1 : exprNumber2;
var resultIsString1 = condNumber ? exprString1 : exprString2;
var resultIsObject1 = condNumber ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condNumber ? exprString1 : exprBoolean1; // Union

var resultIsAny2 = 1 ? exprAny1 : exprAny2;
var resultIsBoolean2 = 0 ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = 0.123456789 ? exprNumber1 : exprNumber2;
var resultIsString2 = - 10000000000000 ? exprString1 : exprString2;
var resultIsObject2 = 1000000000000 ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = 10000 ? exprString1 : exprBoolean1; // Union

var resultIsAny3 = 1 * 0 ? exprAny1 : exprAny2;
var resultIsBoolean3 = 1 + 1 ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = "string".length ? exprNumber1 : exprNumber2;
var resultIsString3 = foo() ? exprString1 : exprString2;
var resultIsObject3 = foo() / array[1] ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean3 = foo() / array[1] ? exprString1 : exprBoolean1; // Union

//// [conditionalOperatorConditionIsNumberType.js]
//Cond ? Expr1 : Expr2,  Cond is of number type, Expr1 and Expr2 have the same type
var condNumber;
var exprAny1;
var exprBoolean1;
var exprNumber1;
var exprString1;
var exprIsObject1;
var exprAny2;
var exprBoolean2;
var exprNumber2;
var exprString2;
var exprIsObject2;
//Cond is a number type variable
condNumber ? exprAny1 : exprAny2;
condNumber ? exprBoolean1 : exprBoolean2;
condNumber ? exprNumber1 : exprNumber2;
condNumber ? exprString1 : exprString2;
condNumber ? exprIsObject1 : exprIsObject2;
condNumber ? exprString1 : exprBoolean1; // Union
//Cond is a number type literal
1 ? exprAny1 : exprAny2;
0 ? exprBoolean1 : exprBoolean2;
0.123456789 ? exprNumber1 : exprNumber2;
-10000000000000 ? exprString1 : exprString2;
1000000000000 ? exprIsObject1 : exprIsObject2;
10000 ? exprString1 : exprBoolean1; // Union
//Cond is a number type expression
function foo() { return 1; }
;
var array = [1, 2, 3];
1 * 0 ? exprAny1 : exprAny2;
1 + 1 ? exprBoolean1 : exprBoolean2;
"string".length ? exprNumber1 : exprNumber2;
foo() ? exprString1 : exprString2;
foo() / array[1] ? exprIsObject1 : exprIsObject2;
foo() ? exprString1 : exprBoolean1; // Union
//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condNumber ? exprAny1 : exprAny2;
var resultIsBoolean1 = condNumber ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condNumber ? exprNumber1 : exprNumber2;
var resultIsString1 = condNumber ? exprString1 : exprString2;
var resultIsObject1 = condNumber ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condNumber ? exprString1 : exprBoolean1; // Union
var resultIsAny2 = 1 ? exprAny1 : exprAny2;
var resultIsBoolean2 = 0 ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = 0.123456789 ? exprNumber1 : exprNumber2;
var resultIsString2 = -10000000000000 ? exprString1 : exprString2;
var resultIsObject2 = 1000000000000 ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = 10000 ? exprString1 : exprBoolean1; // Union
var resultIsAny3 = 1 * 0 ? exprAny1 : exprAny2;
var resultIsBoolean3 = 1 + 1 ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = "string".length ? exprNumber1 : exprNumber2;
var resultIsString3 = foo() ? exprString1 : exprString2;
var resultIsObject3 = foo() / array[1] ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean3 = foo() / array[1] ? exprString1 : exprBoolean1; // Union
