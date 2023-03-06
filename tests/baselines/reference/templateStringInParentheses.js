//// [templateStringInParentheses.ts]
var x = (`abc${0}abc`);

//// [templateStringInParentheses.js]
var x = ("abc".concat(0, "abc"));
