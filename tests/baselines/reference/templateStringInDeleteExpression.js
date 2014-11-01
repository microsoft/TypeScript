//// [templateStringInDeleteExpression.ts]
delete `abc${0}abc`;

//// [templateStringInDeleteExpression.js]
delete ("abc" + 0 + "abc");
