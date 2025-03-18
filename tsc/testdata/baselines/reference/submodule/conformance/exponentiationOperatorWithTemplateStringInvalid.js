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
var a = 1 ** `${3}`;
var b = 1 ** `2${3}`;
var c = 1 ** `${3}4`;
var d = 1 ** `2${3}4`;
var e = `${3}` ** 5;
var f = `2${3}` ** 5;
var g = `${3}4` ** 5;
var h = `2${3}4` ** 5;
var k = 10;
k **= `${3}`;
k **= `2${3}`;
k **= `2${3}4`;
k **= `2${3}4`;
