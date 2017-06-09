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
