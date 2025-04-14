//// [tests/cases/conformance/expressions/binaryOperators/additionOperator/additionOperatorWithUndefinedValueAndInvalidOperands.ts] ////

//// [additionOperatorWithUndefinedValueAndInvalidOperands.ts]
// If one operand is the null or undefined value, it is treated as having the type of the other operand.

function foo(): void { return undefined }

var a: boolean;
var b: Object;
var c: void;
var d: Number;

// undefined + boolean/Object
var r1 = undefined + a;
var r2 = undefined + b;
var r3 = undefined + c;
var r4 = a + undefined;
var r5 = b + undefined;
var r6 = undefined + c;

// other cases
var r7 = undefined + d;
var r8 = undefined + true;
var r9 = undefined + { a: '' };
var r10 = undefined + foo();
var r11 = undefined + (() => { });

//// [additionOperatorWithUndefinedValueAndInvalidOperands.js]
// If one operand is the null or undefined value, it is treated as having the type of the other operand.
function foo() { return undefined; }
var a;
var b;
var c;
var d;
// undefined + boolean/Object
var r1 = undefined + a;
var r2 = undefined + b;
var r3 = undefined + c;
var r4 = a + undefined;
var r5 = b + undefined;
var r6 = undefined + c;
// other cases
var r7 = undefined + d;
var r8 = undefined + true;
var r9 = undefined + { a: '' };
var r10 = undefined + foo();
var r11 = undefined + (function () { });
