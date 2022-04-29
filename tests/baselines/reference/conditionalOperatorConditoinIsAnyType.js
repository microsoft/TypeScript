//// [conditionalOperatorConditoinIsAnyType.ts]
//Cond ? Expr1 : Expr2,  Cond is of any type, Expr1 and Expr2 have the same type
var condAny: any;
var x: any;

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

//Cond is an any type variable
condAny ? exprAny1 : exprAny2;
condAny ? exprBoolean1 : exprBoolean2;
condAny ? exprNumber1 : exprNumber2;
condAny ? exprString1 : exprString2;
condAny ? exprIsObject1 : exprIsObject2;
condAny ? exprString1 : exprBoolean1; // union

//Cond is an any type literal
null ? exprAny1 : exprAny2;
null ? exprBoolean1 : exprBoolean2;
undefined ? exprNumber1 : exprNumber2;
[null, undefined] ? exprString1 : exprString2;
[null, undefined] ? exprIsObject1 : exprIsObject2;
undefined ? exprString1 : exprBoolean1; // union

//Cond is an any type expression
x.doSomeThing() ? exprAny1 : exprAny2;
x("x") ? exprBoolean1 : exprBoolean2;
x(x) ? exprNumber1 : exprNumber2;
x("x") ? exprString1 : exprString2;
x.doSomeThing() ? exprIsObject1 : exprIsObject2;
x.doSomeThing() ? exprString1 : exprBoolean1; // union

//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condAny ? exprAny1 : exprAny2;
var resultIsBoolean1 = condAny ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condAny ? exprNumber1 : exprNumber2;
var resultIsString1 = condAny ? exprString1 : exprString2;
var resultIsObject1 = condAny ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condAny ? exprString1 : exprBoolean1; // union

var resultIsAny2 = null ? exprAny1 : exprAny2;
var resultIsBoolean2 = null ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = undefined ? exprNumber1 : exprNumber2;
var resultIsString2 = [null, undefined] ? exprString1 : exprString2;
var resultIsObject2 = [null, undefined] ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = null ? exprString1 : exprBoolean1; // union
var resultIsStringOrBoolean3 = undefined ? exprString1 : exprBoolean1; // union
var resultIsStringOrBoolean4 = [null, undefined] ? exprString1 : exprBoolean1; // union

var resultIsAny3 = x.doSomeThing() ? exprAny1 : exprAny2;
var resultIsBoolean3 = x("x") ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = x(x) ? exprNumber1 : exprNumber2;
var resultIsString3 = x("x") ? exprString1 : exprString2;
var resultIsObject3 = x.doSomeThing() ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean5 = x.doSomeThing() ? exprString1 : exprBoolean1; // union

//// [conditionalOperatorConditoinIsAnyType.js]
//Cond ? Expr1 : Expr2,  Cond is of any type, Expr1 and Expr2 have the same type
var condAny;
var x;
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
//Cond is an any type variable
condAny ? exprAny1 : exprAny2;
condAny ? exprBoolean1 : exprBoolean2;
condAny ? exprNumber1 : exprNumber2;
condAny ? exprString1 : exprString2;
condAny ? exprIsObject1 : exprIsObject2;
condAny ? exprString1 : exprBoolean1; // union
//Cond is an any type literal
null ? exprAny1 : exprAny2;
null ? exprBoolean1 : exprBoolean2;
undefined ? exprNumber1 : exprNumber2;
[null, undefined] ? exprString1 : exprString2;
[null, undefined] ? exprIsObject1 : exprIsObject2;
undefined ? exprString1 : exprBoolean1; // union
//Cond is an any type expression
x.doSomeThing() ? exprAny1 : exprAny2;
x("x") ? exprBoolean1 : exprBoolean2;
x(x) ? exprNumber1 : exprNumber2;
x("x") ? exprString1 : exprString2;
x.doSomeThing() ? exprIsObject1 : exprIsObject2;
x.doSomeThing() ? exprString1 : exprBoolean1; // union
//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condAny ? exprAny1 : exprAny2;
var resultIsBoolean1 = condAny ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condAny ? exprNumber1 : exprNumber2;
var resultIsString1 = condAny ? exprString1 : exprString2;
var resultIsObject1 = condAny ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condAny ? exprString1 : exprBoolean1; // union
var resultIsAny2 = null ? exprAny1 : exprAny2;
var resultIsBoolean2 = null ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = undefined ? exprNumber1 : exprNumber2;
var resultIsString2 = [null, undefined] ? exprString1 : exprString2;
var resultIsObject2 = [null, undefined] ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = null ? exprString1 : exprBoolean1; // union
var resultIsStringOrBoolean3 = undefined ? exprString1 : exprBoolean1; // union
var resultIsStringOrBoolean4 = [null, undefined] ? exprString1 : exprBoolean1; // union
var resultIsAny3 = x.doSomeThing() ? exprAny1 : exprAny2;
var resultIsBoolean3 = x("x") ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = x(x) ? exprNumber1 : exprNumber2;
var resultIsString3 = x("x") ? exprString1 : exprString2;
var resultIsObject3 = x.doSomeThing() ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean5 = x.doSomeThing() ? exprString1 : exprBoolean1; // union
