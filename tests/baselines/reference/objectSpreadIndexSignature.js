//// [objectSpreadIndexSignature.ts]
class C {
    a: number;
    c: boolean;
}
// index signatures are not allowed in object literals with spread types
let c: spread(C, { b: string, c?: string, [n: number]: string });
let n: number = c.a;
let s: string = c[12];
interface Indexed {
    [n: string]: number;
    a: number;
}
interface Indexed2 {
    [n: string]: boolean;
    c: boolean;
}
let indexed: Indexed;
let indexed2: Indexed2;
let i: spread(Indexed, { b: number });
// only indexed has indexer, so i[101]: any
i[101];
let ii: spread(spread(Indexed, Indexed2), { b: boolean, d: number });
// both have indexer, so i[1001]: number | boolean
let nb: number | boolean = ii[1001];

function f<T>(t: T) {
    let i: spread(T, { [n: number]: string });
}


//// [objectSpreadIndexSignature.js]
var C = (function () {
    function C() {
    }
    return C;
}());
// index signatures are not allowed in object literals with spread types
var c;
var n = c.a;
var s = c[12];
var indexed;
var indexed2;
var i;
// only indexed has indexer, so i[101]: any
i[101];
var ii;
// both have indexer, so i[1001]: number | boolean
var nb = ii[1001];
function f(t) {
    var i;
}
