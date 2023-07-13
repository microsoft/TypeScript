//// [tests/cases/conformance/es7/exponentiationOperator/exponentiationOperatorWithTemplateStringInvalid.ts] ////

//// [exponentiationOperatorWithTemplateStringInvalid.ts]
var a = 1 ** `${ 3 }`;
var b = 1 ** `2${ 3 }`;
var c = 1 ** `${ 3 }4`;
var d = 1 ** `2${ 3 }4`;
var e = `${ 3 }` ** 5;
var f = `2${ 3 }` ** 5;
var g = `${ 3 }4` ** 5;
var h = `2${ 3 }4` ** 5;

var k = 10;
k **= `${ 3 }`;
k **= `2${ 3 }`;
k **= `2${ 3 }4`;
k **= `2${ 3 }4`;


 

//// [exponentiationOperatorWithTemplateStringInvalid.js]
var a = Math.pow(1, "".concat(3));
var b = Math.pow(1, "2".concat(3));
var c = Math.pow(1, "".concat(3, "4"));
var d = Math.pow(1, "2".concat(3, "4"));
var e = Math.pow("".concat(3), 5);
var f = Math.pow("2".concat(3), 5);
var g = Math.pow("".concat(3, "4"), 5);
var h = Math.pow("2".concat(3, "4"), 5);
var k = 10;
k = Math.pow(k, "".concat(3));
k = Math.pow(k, "2".concat(3));
k = Math.pow(k, "2".concat(3, "4"));
k = Math.pow(k, "2".concat(3, "4"));
