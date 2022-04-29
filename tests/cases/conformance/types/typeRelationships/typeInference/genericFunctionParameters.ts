// @strict: true
// @declaration: true

declare function f1<T>(cb: <S>(x: S) => T): T;
declare function f2<T>(cb: <S extends number>(x: S) => T): T;
declare function f3<T>(cb: <S extends Array<S>>(x: S) => T): T;

let x1 = f1(x => x);  // {}
let x2 = f2(x => x);  // number
let x3 = f3(x => x);  // Array<any>

// Repro from #19345

declare const s: <R>(go: <S>(ops: { init(): S; }) => R) => R;
const x = s(a => a.init());  // x is any, should have been {}
