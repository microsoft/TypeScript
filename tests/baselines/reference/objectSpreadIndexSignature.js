//// [objectSpreadIndexSignature.ts]
class C {
    a: number;
    c: boolean;
}
let c: { ...C, b: string, c?: string, [n: number]: string };
let n: number = c.a;
let s: string = c[12];
interface Indexed {
    [n: number]: string;
    a: boolean;
}
let i: { ...Indexed, b: string };
s = i[101];
s = i.b;


//// [objectSpreadIndexSignature.js]
var C = (function () {
    function C() {
    }
    return C;
}());
var c;
var n = c.a;
var s = c[12];
var i;
s = i[101];
s = i.b;
