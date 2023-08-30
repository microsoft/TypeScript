//// [tests/cases/compiler/unionTypeWithRecursiveSubtypeReduction3.ts] ////

//// [unionTypeWithRecursiveSubtypeReduction3.ts]
var a27: { prop: number } | { prop: T27 };
type T27 = typeof a27;

var b: T27;
var s: string = b;


//// [unionTypeWithRecursiveSubtypeReduction3.js]
var a27;
var b;
var s = b;
