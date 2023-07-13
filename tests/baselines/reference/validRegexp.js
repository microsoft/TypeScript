//// [tests/cases/compiler/validRegexp.ts] ////

//// [validRegexp.ts]
var x = / [a - z /]$ / i;
var x1 = /[a-z/]$/i;
var x2 = /[a-z/]$ /i;

//// [validRegexp.js]
var x = / [a - z /]$ /, i;
var x1 = /[a-z/]$/i;
var x2 = /[a-z/]$ /i;
