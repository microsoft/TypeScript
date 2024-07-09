//// [tests/cases/conformance/expressions/asOperator/asOperatorContextualType.ts] ////

//// [asOperatorContextualType.ts]
// should error
var x = (v => v) as (x: number) => string;

//// [asOperatorContextualType.js]
// should error
var x = (function (v) { return v; });
