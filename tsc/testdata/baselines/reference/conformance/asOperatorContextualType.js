//// [tests/cases/conformance/expressions/asOperator/asOperatorContextualType.ts] ////

//// [asOperatorContextualType.ts]
// should error
var x = (v => v) as (x: number) => string;

//// [asOperatorContextualType.js]
"use strict";
// should error
var x = (v => v);
