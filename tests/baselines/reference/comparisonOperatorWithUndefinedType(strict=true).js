//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithUndefinedType.ts] ////

//// [comparisonOperatorWithUndefinedType.ts]
declare let foo: string | undefined;
declare let bar: number | undefined;
foo === bar;

//// [comparisonOperatorWithUndefinedType.js]
"use strict";
foo === bar;
