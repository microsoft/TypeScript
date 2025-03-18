//// [tests/cases/compiler/excessPropertyCheckWithSpread.ts] ////

//// [excessPropertyCheckWithSpread.ts]
declare function f({ a: number }): void
interface I {
    readonly n: number;
}
declare let i: I;
f({ a: 1, ...i });

interface R {
    opt?: number
}
interface L {
    opt: string
}
declare let l: L;
declare let r: R;
f({ a: 1, ...l, ...r });


//// [excessPropertyCheckWithSpread.js]
f({ a: 1, ...i });
f({ a: 1, ...l, ...r });
