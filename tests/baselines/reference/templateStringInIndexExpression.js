//// [templateStringInIndexExpression.ts]
`abc${0}abc`[`0`];

//// [templateStringInIndexExpression.js]
"abc".concat(0, "abc")["0"];
