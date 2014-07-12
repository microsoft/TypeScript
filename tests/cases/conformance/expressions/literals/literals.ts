//@target: ES5

//typeof null is Null
//typeof true is Boolean
//typeof false is Boolean
//typeof numeric literal is Number
//typeof string literal is String
//typeof regex literal is Regex

var nu = null / null;
var u = undefined / undefined;

var b: boolean;
var b = true;
var b = false;

var n: number;
var n = 1;
var n = 1.0;
var n = 1e4;
var n = 001; // Error in ES5
var n = 0x1;
var n = -1;
var n = -1.0;
var n = -1e-4;
var n = -003; // Error in ES5
var n = -0x1;

var s: string;
var s = '';
var s = "";
var s = 'foo\
    bar';
var s = "foo\
    bar";

var r: RegExp;
var r = /what/;
var r = /\\\\/;
