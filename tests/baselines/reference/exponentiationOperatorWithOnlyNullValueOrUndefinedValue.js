//// [exponentiationOperatorWithOnlyNullValueOrUndefinedValue.ts]
// operator **
var r1 = null ** null;
var r2 = null ** undefined;
var r3 = undefined ** null;
var r4 = undefined ** undefined;


//// [exponentiationOperatorWithOnlyNullValueOrUndefinedValue.js]
// operator **
var r1 = Math.pow(null, null);
var r2 = Math.pow(null, undefined);
var r3 = Math.pow(undefined, null);
var r4 = Math.pow(undefined, undefined);
