//// [tests/cases/compiler/es6ModuleConst.ts] ////

//// [es6ModuleConst.ts]
export const a = "hello";
export const x: string = a, y = x;
const b = y;
const c: string = b, d = c;
export module m1 {
    export const k = a;
    export const l: string = b, m = k;
    const n = m1.k;
    const o: string = n, p = k;
}
module m2 {
    export const k = a;
    export const l: string = b, m = k;
    const n = m1.k;
    const o: string = n, p = k;
}

//// [es6ModuleConst.js]
export const a = "hello";
export const x = a, y = x;
const b = y;
const c = b, d = c;
export var m1;
(function (m1) {
    m1.k = a;
    m1.l = b, m1.m = m1.k;
    const n = m1.k;
    const o = n, p = m1.k;
})(m1 || (m1 = {}));
var m2;
(function (m2) {
    m2.k = a;
    m2.l = b, m2.m = m2.k;
    const n = m1.k;
    const o = n, p = m2.k;
})(m2 || (m2 = {}));
