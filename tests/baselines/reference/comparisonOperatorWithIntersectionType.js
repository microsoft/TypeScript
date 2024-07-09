//// [tests/cases/conformance/expressions/binaryOperators/comparisonOperator/comparisonOperatorWithIntersectionType.ts] ////

//// [comparisonOperatorWithIntersectionType.ts]
declare let a: { a: 1 }
a > 1;

declare let b: { a: 1 } & { b: number }
b > 1;


//// [comparisonOperatorWithIntersectionType.js]
a > 1;
b > 1;
