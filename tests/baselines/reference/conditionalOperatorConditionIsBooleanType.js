//// [conditionalOperatorConditionIsBooleanType.ts]
//Cond ? Expr1 : Expr2,  Cond is of boolean type, Expr1 and Expr2 have the same type
var condBoolean: boolean;

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

//Cond is a boolean type variable
condBoolean ? exprAny1 : exprAny2;
condBoolean ? exprBoolean1 : exprBoolean2;
condBoolean ? exprNumber1 : exprNumber2;
condBoolean ? exprString1 : exprString2;
condBoolean ? exprIsObject1 : exprIsObject2;
condBoolean ? exprString1 : exprBoolean1; // union

//Cond is a boolean type literal
true ? exprAny1 : exprAny2;
false ? exprBoolean1 : exprBoolean2;
true ? exprNumber1 : exprNumber2;
false ? exprString1 : exprString2;
true ? exprIsObject1 : exprIsObject2;
true ? exprString1 : exprBoolean1; // union

//Cond is a boolean type expression
!true ? exprAny1 : exprAny2;
typeof "123" == "string" ? exprBoolean1 : exprBoolean2;
2 > 1 ? exprNumber1 : exprNumber2;
null === undefined ? exprString1 : exprString2;
true || false ? exprIsObject1 : exprIsObject2;
null === undefined ? exprString1 : exprBoolean1; // union

//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condBoolean ? exprAny1 : exprAny2;
var resultIsBoolean1 = condBoolean ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condBoolean ? exprNumber1 : exprNumber2;
var resultIsString1 = condBoolean ? exprString1 : exprString2;
var resultIsObject1 = condBoolean ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condBoolean ? exprString1 : exprBoolean1; // union

var resultIsAny2 = true ? exprAny1 : exprAny2;
var resultIsBoolean2 = false ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = true ? exprNumber1 : exprNumber2;
var resultIsString2 = false ? exprString1 : exprString2;
var resultIsObject2 = true ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = true ? exprString1 : exprBoolean1; // union
var resultIsStringOrBoolean3 = false ? exprString1 : exprBoolean1; // union

var resultIsAny3 = !true ? exprAny1 : exprAny2;
var resultIsBoolean3 = typeof "123" == "string" ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = 2 > 1 ? exprNumber1 : exprNumber2;
var resultIsString3 = null === undefined ? exprString1 : exprString2;
var resultIsObject3 = true || false ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean4 = typeof "123" === "string" ? exprString1 : exprBoolean1; // union


//// [conditionalOperatorConditionIsBooleanType.js]
//Cond ? Expr1 : Expr2,  Cond is of boolean type, Expr1 and Expr2 have the same type
var condBoolean;
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
//Cond is a boolean type variable
condBoolean ? exprAny1 : exprAny2;
condBoolean ? exprBoolean1 : exprBoolean2;
condBoolean ? exprNumber1 : exprNumber2;
condBoolean ? exprString1 : exprString2;
condBoolean ? exprIsObject1 : exprIsObject2;
condBoolean ? exprString1 : exprBoolean1; // union
//Cond is a boolean type literal
true ? exprAny1 : exprAny2;
false ? exprBoolean1 : exprBoolean2;
true ? exprNumber1 : exprNumber2;
false ? exprString1 : exprString2;
true ? exprIsObject1 : exprIsObject2;
true ? exprString1 : exprBoolean1; // union
//Cond is a boolean type expression
!true ? exprAny1 : exprAny2;
typeof "123" == "string" ? exprBoolean1 : exprBoolean2;
2 > 1 ? exprNumber1 : exprNumber2;
null === undefined ? exprString1 : exprString2;
true || false ? exprIsObject1 : exprIsObject2;
null === undefined ? exprString1 : exprBoolean1; // union
//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condBoolean ? exprAny1 : exprAny2;
var resultIsBoolean1 = condBoolean ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condBoolean ? exprNumber1 : exprNumber2;
var resultIsString1 = condBoolean ? exprString1 : exprString2;
var resultIsObject1 = condBoolean ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condBoolean ? exprString1 : exprBoolean1; // union
var resultIsAny2 = true ? exprAny1 : exprAny2;
var resultIsBoolean2 = false ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = true ? exprNumber1 : exprNumber2;
var resultIsString2 = false ? exprString1 : exprString2;
var resultIsObject2 = true ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = true ? exprString1 : exprBoolean1; // union
var resultIsStringOrBoolean3 = false ? exprString1 : exprBoolean1; // union
var resultIsAny3 = !true ? exprAny1 : exprAny2;
var resultIsBoolean3 = typeof "123" == "string" ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = 2 > 1 ? exprNumber1 : exprNumber2;
var resultIsString3 = null === undefined ? exprString1 : exprString2;
var resultIsObject3 = true || false ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean4 = typeof "123" === "string" ? exprString1 : exprBoolean1; // union
