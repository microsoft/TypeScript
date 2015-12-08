function isA<A>(x: any, y: any): x is A | y is B {
    return false;
}

var x: number | number[];
var y: string | string[];
var num: number;
var nums: number[];
var strOrStrs: string | string[];

if (isA<number>(x, y)) {
    num = x;
    strOrStrs = y;
}
else {
    nums = x;
    strOrStrs = y;
}