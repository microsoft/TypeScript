// @target: ES6
export const a = "hello";
export const x: string = a, y = x;
const b = y;
const c: string = b, d = c;
export namespace m1 {
    export const k = a;
    export const l: string = b, m = k;
    const n = m1.k;
    const o: string = n, p = k;
}
namespace m2 {
    export const k = a;
    export const l: string = b, m = k;
    const n = m1.k;
    const o: string = n, p = k;
}