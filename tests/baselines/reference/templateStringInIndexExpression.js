//// [tests/cases/conformance/es6/templates/templateStringInIndexExpression.ts] ////

//// [templateStringInIndexExpression.ts]
`abc${0}abc`[`0`];

//// [templateStringInIndexExpression.js]
"abc".concat(0, "abc")["0"];
