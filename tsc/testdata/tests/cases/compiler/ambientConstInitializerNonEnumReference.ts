// @filename: a.d.ts
declare enum E { A = 1, B = "b" }
declare namespace NS { const v: 1; }
declare const obj: { readonly x: 1 };

declare const e1 = E.A;
declare const e2 = E["B"];
declare const n1 = NS.v;
declare const n2 = NS["v"];
declare const o1 = obj.x;

declare class C {
    static readonly r1 = E.A;
    static readonly r2 = NS.v;
}
