//// [templateStringInDeleteExpression.ts]
delete `abc${0}abc`;

//// [templateStringInDeleteExpression.js]
delete "abc".concat(0, "abc");
