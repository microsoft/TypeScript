//// [es6ModuleLet.ts]
export let a = "hello";
export let x: string = a, y = x;
let b = y;
let c: string = b, d = c;
export module m1 {
    export let k = a;
    export let l: string = b, m = k;
    let n = m1.k;
    let o: string = n, p = k;
}
module m2 {
    export let k = a;
    export let l: string = b, m = k;
    let n = m1.k;
    let o: string = n, p = k;
}

//// [es6ModuleLet.js]
export let a = "hello";
export let x = a, y = x;
let b = y;
let c = b, d = c;
export var m1;
(function (m1) {
    m1.k = a;
    m1.l = b, m1.m = m1.k;
    let n = m1.k;
    let o = n, p = m1.k;
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    m2.k = a;
    m2.l = b, m2.m = m2.k;
    let n = m1.k;
    let o = n, p = m2.k;
})(m2 || (m2 = {}));
