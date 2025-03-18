//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithOnlyNullValueOrUndefinedValue.ts] ////

//// [exponentiationOperatorWithOnlyNullValueOrUndefinedValue.ts]
// operator **
var r1 = null ** null;
var r2 = null ** undefined;
var r3 = undefined ** null;
var r4 = undefined ** undefined;


//// [exponentiationOperatorWithOnlyNullValueOrUndefinedValue.js]
var r1 = null ** null;
var r2 = null ** undefined;
var r3 = undefined ** null;
var r4 = undefined ** undefined;
