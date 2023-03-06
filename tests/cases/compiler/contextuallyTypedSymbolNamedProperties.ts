// @strict: true
// @declaration: true
// @target: esnext

// Repros from #43628

const A = Symbol("A");
const B = Symbol("B");

type Action =
    | {type: typeof A, data: string}
    | {type: typeof B, data: number}

declare const ab: Action;

declare function f<T extends { type: string | symbol }>(action: T, blah: { [K in T['type']]: (p: K) => void }): any;

f(ab, {
    [A]: ap => { ap.description },
    [B]: bp => { bp.description },
})

const x: { [sym: symbol]: (p: string) => void } = { [A]: s => s.length };
