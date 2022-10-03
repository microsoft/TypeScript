//// [templateStringWithEmptyLiteralPortions.ts]
var a = ``;

var b = `${ 0 }`;

var c = `1${ 0 }`;

var d = `${ 0 }2`;

var e = `1${ 0 }2`;

var f = `${ 0 }${ 0 }`;

var g = `1${ 0 }${ 0 }`;

var h = `${ 0 }2${ 0 }`;

var i = `1${ 0 }2${ 0 }`;

var j = `${ 0 }${ 0 }3`;

var k = `1${ 0 }${ 0 }3`;

var l = `${ 0 }2${ 0 }3`;

var m = `1${ 0 }2${ 0 }3`;


//// [templateStringWithEmptyLiteralPortions.js]
var a = "";
var b = "".concat(0);
var c = "1".concat(0);
var d = "".concat(0, "2");
var e = "1".concat(0, "2");
var f = "".concat(0).concat(0);
var g = "1".concat(0).concat(0);
var h = "".concat(0, "2").concat(0);
var i = "1".concat(0, "2").concat(0);
var j = "".concat(0).concat(0, "3");
var k = "1".concat(0).concat(0, "3");
var l = "".concat(0, "2").concat(0, "3");
var m = "1".concat(0, "2").concat(0, "3");
