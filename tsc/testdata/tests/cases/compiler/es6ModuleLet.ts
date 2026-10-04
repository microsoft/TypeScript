// @target: ES6
export let a = "hello";
export let x: string = a, y = x;
let b = y;
let c: string = b, d = c;
export namespace m1 {
    export let k = a;
    export let l: string = b, m = k;
    let n = m1.k;
    let o: string = n, p = k;
}
namespace m2 {
    export let k = a;
    export let l: string = b, m = k;
    let n = m1.k;
    let o: string = n, p = k;
}