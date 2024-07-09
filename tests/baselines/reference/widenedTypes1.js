//// [tests/cases/compiler/widenedTypes1.ts] ////

//// [widenedTypes1.ts]
var a = null;
var b = undefined;

var c = {x: null};
var d = [{x: null}];
var f = [null, null];
var g = [undefined, undefined];
var h = [{x: undefined}];


//// [widenedTypes1.js]
var a = null;
var b = undefined;
var c = { x: null };
var d = [{ x: null }];
var f = [null, null];
var g = [undefined, undefined];
var h = [{ x: undefined }];
