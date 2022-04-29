// @target: ES6
export var a = "hello";
export var x: string = a, y = x;
var b = y;
var c: string = b, d = c;
export module m1 {
    export var k = a;
    export var l: string = b, m = k;
    var n = m1.k;
    var o: string = n, p = k;
}
module m2 {
    export var k = a;
    export var l: string = b, m = k;
    var n = m1.k;
    var o: string = n, p = k;
}