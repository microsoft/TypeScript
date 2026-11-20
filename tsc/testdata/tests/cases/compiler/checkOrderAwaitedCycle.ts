// @strict: true
// @target: esnext
// @lib: esnext
// @noEmit: true
// @checkOrder: default, reverse, isolated, typesfirst

// Awaiting a promise whose promised type refers back to it reports a
// circularity wherever it is awaited, whichever is awaited first.

// @filename: a.ts
type S = string | Promise<S>;
declare const s: S;
declare const p: Promise<S>;
async function f1() {
    const a: number = await p;
}

// @filename: b.ts
async function f2() {
    const b: number = await s;
}
