//// [arrayLiteralWithMultipleBestCommonTypes.ts]
// when multiple best common types exist we will choose the first candidate

var a: { x: number; y?: number };
var b: { x: number; z?: number };
var c: { x: number; a?: number };

var as = [a, b]; // { x: number; y?: number };[]
var bs = [b, a]; // { x: number; z?: number };[]
var cs = [a, b, c]; // { x: number; y?: number };[]

var ds = [(x: Object) => 1, (x: string) => 2]; // { (x:Object) => number }[]
var es = [(x: string) => 2, (x: Object) => 1]; // { (x:string) => number }[]
var fs = [(a: { x: number; y?: number }) => 1, (b: { x: number; z?: number }) => 2]; // (a: { x: number; y?: number }) => number[]
var gs = [(b: { x: number; z?: number }) => 2, (a: { x: number; y?: number }) => 1]; // (b: { x: number; z?: number }) => number[]


//// [arrayLiteralWithMultipleBestCommonTypes.js]
// when multiple best common types exist we will choose the first candidate
var a;
var b;
var c;
var as = [a, b]; // { x: number; y?: number };[]
var bs = [b, a]; // { x: number; z?: number };[]
var cs = [a, b, c]; // { x: number; y?: number };[]
var ds = [function (x) { return 1; }, function (x) { return 2; }]; // { (x:Object) => number }[]
var es = [function (x) { return 2; }, function (x) { return 1; }]; // { (x:string) => number }[]
var fs = [function (a) { return 1; }, function (b) { return 2; }]; // (a: { x: number; y?: number }) => number[]
var gs = [function (b) { return 2; }, function (a) { return 1; }]; // (b: { x: number; z?: number }) => number[]
