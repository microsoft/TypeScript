//// [tests/cases/compiler/typeArgInference.ts] ////

//// [typeArgInference.ts]
interface I {
    f<T, U>(a1: { a: T; b: U }[], a2: { a: T; b: U }[]): { c: T; d: U };
    g<T, U>(...arg: { a: T; b: U }[][]): { c: T; d: U };
}
var o = { a: 3, b: "test" };
var x: I;
var t1 = x.f([o], [o]);
var t1: { c: number; d: string }; 
var t2 = x.f<number, string>([o], [o]);
var t2: { c: number; d: string }; 
var t3 = x.g([o], [o]);
var t3: { c: number; d: string };
var t4 = x.g<number, string>([o], [o]);
var t4: { c: number; d: string };


//// [typeArgInference.js]
var o = { a: 3, b: "test" };
var x;
var t1 = x.f([o], [o]);
var t1;
var t2 = x.f([o], [o]);
var t2;
var t3 = x.g([o], [o]);
var t3;
var t4 = x.g([o], [o]);
var t4;
