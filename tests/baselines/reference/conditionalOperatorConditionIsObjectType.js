//// [tests/cases/conformance/expressions/conditonalOperator/conditionalOperatorConditionIsObjectType.ts] ////

//// [conditionalOperatorConditionIsObjectType.ts]
//Cond ? Expr1 : Expr2,  Cond is of object type, Expr1 and Expr2 have the same type
var condObject: Object;

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

function foo() { };
class C { static doIt: () => void };

//Cond is an object type variable
condObject ? exprAny1 : exprAny2;
condObject ? exprBoolean1 : exprBoolean2;
condObject ? exprNumber1 : exprNumber2;
condObject ? exprString1 : exprString2;
condObject ? exprIsObject1 : exprIsObject2;
condObject ? exprString1 : exprBoolean1; // union

//Cond is an object type literal
((a: string) => a.length) ? exprAny1 : exprAny2;
((a: string) => a.length) ? exprBoolean1 : exprBoolean2;
({}) ? exprNumber1 : exprNumber2;
({ a: 1, b: "s" }) ? exprString1 : exprString2;
({ a: 1, b: "s" }) ? exprIsObject1 : exprIsObject2;
({ a: 1, b: "s" }) ? exprString1: exprBoolean1; // union

//Cond is an object type expression
foo() ? exprAny1 : exprAny2;
new Date() ? exprBoolean1 : exprBoolean2;
new C() ? exprNumber1 : exprNumber2;
C.doIt() ? exprString1 : exprString2;
condObject.valueOf() ? exprIsObject1 : exprIsObject2;
new Date() ? exprString1 : exprBoolean1; // union

//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condObject ? exprAny1 : exprAny2;
var resultIsBoolean1 = condObject ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condObject ? exprNumber1 : exprNumber2;
var resultIsString1 = condObject ? exprString1 : exprString2;
var resultIsObject1 = condObject ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condObject ? exprString1 : exprBoolean1; // union

var resultIsAny2 = ((a: string) => a.length) ? exprAny1 : exprAny2;
var resultIsBoolean2 = ((a: string) => a.length) ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = ({}) ? exprNumber1 : exprNumber2;
var resultIsString2 = ({ a: 1, b: "s" }) ? exprString1 : exprString2;
var resultIsObject2 = ({ a: 1, b: "s" }) ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = ({ a: 1, b: "s" }) ? exprString1 : exprBoolean1; // union

var resultIsAny3 = foo() ? exprAny1 : exprAny2;
var resultIsBoolean3 = new Date() ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = new C() ? exprNumber1 : exprNumber2;
var resultIsString3 = C.doIt() ? exprString1 : exprString2;
var resultIsObject3 = condObject.valueOf() ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean3 = C.doIt() ? exprString1 : exprBoolean1; // union


//// [conditionalOperatorConditionIsObjectType.js]
//Cond ? Expr1 : Expr2,  Cond is of object type, Expr1 and Expr2 have the same type
var condObject;
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
function foo() { }
;
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
;
//Cond is an object type variable
condObject ? exprAny1 : exprAny2;
condObject ? exprBoolean1 : exprBoolean2;
condObject ? exprNumber1 : exprNumber2;
condObject ? exprString1 : exprString2;
condObject ? exprIsObject1 : exprIsObject2;
condObject ? exprString1 : exprBoolean1; // union
//Cond is an object type literal
(function (a) { return a.length; }) ? exprAny1 : exprAny2;
(function (a) { return a.length; }) ? exprBoolean1 : exprBoolean2;
({}) ? exprNumber1 : exprNumber2;
({ a: 1, b: "s" }) ? exprString1 : exprString2;
({ a: 1, b: "s" }) ? exprIsObject1 : exprIsObject2;
({ a: 1, b: "s" }) ? exprString1 : exprBoolean1; // union
//Cond is an object type expression
foo() ? exprAny1 : exprAny2;
new Date() ? exprBoolean1 : exprBoolean2;
new C() ? exprNumber1 : exprNumber2;
C.doIt() ? exprString1 : exprString2;
condObject.valueOf() ? exprIsObject1 : exprIsObject2;
new Date() ? exprString1 : exprBoolean1; // union
//Results shoud be same as Expr1 and Expr2
var resultIsAny1 = condObject ? exprAny1 : exprAny2;
var resultIsBoolean1 = condObject ? exprBoolean1 : exprBoolean2;
var resultIsNumber1 = condObject ? exprNumber1 : exprNumber2;
var resultIsString1 = condObject ? exprString1 : exprString2;
var resultIsObject1 = condObject ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean1 = condObject ? exprString1 : exprBoolean1; // union
var resultIsAny2 = (function (a) { return a.length; }) ? exprAny1 : exprAny2;
var resultIsBoolean2 = (function (a) { return a.length; }) ? exprBoolean1 : exprBoolean2;
var resultIsNumber2 = ({}) ? exprNumber1 : exprNumber2;
var resultIsString2 = ({ a: 1, b: "s" }) ? exprString1 : exprString2;
var resultIsObject2 = ({ a: 1, b: "s" }) ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean2 = ({ a: 1, b: "s" }) ? exprString1 : exprBoolean1; // union
var resultIsAny3 = foo() ? exprAny1 : exprAny2;
var resultIsBoolean3 = new Date() ? exprBoolean1 : exprBoolean2;
var resultIsNumber3 = new C() ? exprNumber1 : exprNumber2;
var resultIsString3 = C.doIt() ? exprString1 : exprString2;
var resultIsObject3 = condObject.valueOf() ? exprIsObject1 : exprIsObject2;
var resultIsStringOrBoolean3 = C.doIt() ? exprString1 : exprBoolean1; // union
