//// [exponentiationOperatorWithTemplateStringInvalidES6.ts]
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
kj **= `2${ 3 }4`;

//// [exponentiationOperatorWithTemplateStringInvalidES6.js]
var a = Math.pow(1, `${3}`);
var b = Math.pow(1, `2${3}`);
var c = Math.pow(1, `${3}4`);
var d = Math.pow(1, `2${3}4`);
var e = Math.pow(`${3}`, 5);
var f = Math.pow(`2${3}`, 5);
var g = Math.pow(`${3}4`, 5);
var h = Math.pow(`2${3}4`, 5);
var k = 10;
k = Math.pow(k, `${3}`);
k = Math.pow(k, `2${3}`);
k = Math.pow(k, `2${3}4`);
kj = Math.pow(kj, `2${3}4`);
