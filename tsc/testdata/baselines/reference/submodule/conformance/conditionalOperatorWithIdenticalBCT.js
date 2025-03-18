//// [tests/cases/conformance/expressions/conditonalOperator/conditionalOperatorWithIdenticalBCT.ts] ////

//// [conditionalOperatorWithIdenticalBCT.ts]
//Cond ? Expr1 : Expr2,  Expr1 and Expr2 have identical best common type
class X { propertyX: any; propertyX1: number; propertyX2: string };
class A extends X { propertyA: number };
class B extends X { propertyB: string };

var x: X;
var a: A;
var b: B;

//Cond ? Expr1 : Expr2,  Expr1 is supertype
//Be Not contextually typed
true ? x : a;
var result1 = true ? x : a;

//Expr1 and Expr2 are literals
true ? {} : 1;
true ? { a: 1 } : { a: 2, b: 'string' };
var result2 = true ? {} : 1;
var result3 = true ? { a: 1 } : { a: 2, b: 'string' };

//Contextually typed
var resultIsX1: X = true ? x : a;
var result4: (t: A) => any = true ? (m) => m.propertyX : (n) => n.propertyA;

//Cond ? Expr1 : Expr2,  Expr2 is supertype
//Be Not contextually typed
true ? a : x;
var result5 = true ? a : x;

//Expr1 and Expr2 are literals
true ? 1 : {};
true ? { a: 2, b: 'string' } : { a: 1 };
var result6 = true ? 1 : {};
var result7 = true ? { a: 2, b: 'string' } : { a: 1 };

//Contextually typed
var resultIsX2: X = true ? x : a;
var result8: (t: A) => any = true ? (m) => m.propertyA : (n) => n.propertyX;

//Result = Cond ? Expr1 : Expr2,  Result is supertype
//Contextually typed
var resultIsX3: X = true ? a : b;
var result10: (t: X) => any = true ? (m) => m.propertyX1 : (n) => n.propertyX2;

//Expr1 and Expr2 are literals
var result11: any = true ? 1 : 'string';


//// [conditionalOperatorWithIdenticalBCT.js]
class X {
    propertyX;
    propertyX1;
    propertyX2;
}
;
class A extends X {
    propertyA;
}
;
class B extends X {
    propertyB;
}
;
var x;
var a;
var b;
true ? x : a;
var result1 = true ? x : a;
true ? {} : 1;
true ? { a: 1 } : { a: 2, b: 'string' };
var result2 = true ? {} : 1;
var result3 = true ? { a: 1 } : { a: 2, b: 'string' };
var resultIsX1 = true ? x : a;
var result4 = true ? (m) => m.propertyX : (n) => n.propertyA;
true ? a : x;
var result5 = true ? a : x;
true ? 1 : {};
true ? { a: 2, b: 'string' } : { a: 1 };
var result6 = true ? 1 : {};
var result7 = true ? { a: 2, b: 'string' } : { a: 1 };
var resultIsX2 = true ? x : a;
var result8 = true ? (m) => m.propertyA : (n) => n.propertyX;
var resultIsX3 = true ? a : b;
var result10 = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result11 = true ? 1 : 'string';
