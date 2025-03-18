//// [tests/cases/conformance/expressions/asOperator/asOperatorContextualType.ts] ////

//// [asOperatorContextualType.ts]
// should error
var x = (v => v) as (x: number) => string;

//// [asOperatorContextualType.js]
var x = (v => v);
