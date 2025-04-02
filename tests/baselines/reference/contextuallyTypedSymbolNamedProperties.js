//// [tests/cases/compiler/contextuallyTypedSymbolNamedProperties.ts] ////

//// [contextuallyTypedSymbolNamedProperties.ts]
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


//// [contextuallyTypedSymbolNamedProperties.js]
"use strict";
// Repros from #43628
const A = Symbol("A");
const B = Symbol("B");
f(ab, {
    [A]: ap => { ap.description; },
    [B]: bp => { bp.description; },
});
const x = { [A]: s => s.length };


//// [contextuallyTypedSymbolNamedProperties.d.ts]
declare const A: unique symbol;
declare const B: unique symbol;
type Action = {
    type: typeof A;
    data: string;
} | {
    type: typeof B;
    data: number;
};
declare const ab: Action;
declare function f<T extends {
    type: string | symbol;
}>(action: T, blah: {
    [K in T['type']]: (p: K) => void;
}): any;
declare const x: {
    [sym: symbol]: (p: string) => void;
};
