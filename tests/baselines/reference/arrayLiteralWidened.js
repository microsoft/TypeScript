//// [arrayLiteralWidened.ts]
// array literals are widened upon assignment according to their element type

var a = []; // any[]

var a = [null, null];
var a = [undefined, undefined];

var b = [[], [null, null]]; // any[][]
var b = [[], []];
var b = [[undefined, undefined]];

var c = [[[]]]; // any[][][]
var c = [[[null]],[undefined]]


//// [arrayLiteralWidened.js]
// array literals are widened upon assignment according to their element type
var a = [];

var a = [null, null];
var a = [undefined, undefined];

var b = [[], [null, null]];
var b = [[], []];
var b = [[undefined, undefined]];

var c = [[[]]];
var c = [[[null]], [undefined]];
