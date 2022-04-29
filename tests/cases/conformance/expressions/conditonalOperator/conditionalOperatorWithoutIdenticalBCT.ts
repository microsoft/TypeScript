//Cond ? Expr1 : Expr2,  Expr1 and Expr2 have no identical best common type
class X { propertyX: any; propertyX1: number; propertyX2: string };
class A extends X { propertyA: number };
class B extends X { propertyB: string };

var x: X;
var a: A;
var b: B;

// No errors anymore, uses union types
true ? a : b;
var result1 = true ? a : b;

//Be contextually typed and and bct is not identical, results in errors that union type is not assignable to target
var result2: A = true ? a : b;
var result3: B = true ? a : b;
var result31: A | B = true ? a : b;

var result4: (t: X) => number = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result5: (t: X) => string = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result6: (t: X) => boolean = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
var result61: (t: X) => number| string = true ? (m) => m.propertyX1 : (n) => n.propertyX2;
