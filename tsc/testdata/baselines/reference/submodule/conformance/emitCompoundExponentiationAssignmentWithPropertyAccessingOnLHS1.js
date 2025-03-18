//// [tests/cases/conformance/es7/exponentiationOperator/emitCompoundExponentiationAssignmentWithPropertyAccessingOnLHS1.ts] ////

//// [emitCompoundExponentiationAssignmentWithPropertyAccessingOnLHS1.ts]
var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { prop: 2 };
}
foo().prop **= 2;
var result0 = foo().prop **= 2;
foo().prop **= foo().prop **= 2;
var result1 = foo().prop **= foo().prop **= 2;
foo().prop **= foo().prop ** 2;
var result2 = foo().prop **= foo().prop ** 2;

//// [emitCompoundExponentiationAssignmentWithPropertyAccessingOnLHS1.js]
var globalCounter = 0;
function foo() {
    globalCounter += 1;
    return { prop: 2 };
}
foo().prop **= 2;
var result0 = foo().prop **= 2;
foo().prop **= foo().prop **= 2;
var result1 = foo().prop **= foo().prop **= 2;
foo().prop **= foo().prop ** 2;
var result2 = foo().prop **= foo().prop ** 2;
