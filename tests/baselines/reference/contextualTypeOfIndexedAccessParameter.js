//// [tests/cases/compiler/contextualTypeOfIndexedAccessParameter.ts] ////

//// [contextualTypeOfIndexedAccessParameter.ts]
type Keys = "a" | "b";

type OptionsForKey = { a: { cb: (p: number) => number } } & { b: {} };

declare function f<K extends Keys>(key: K, options: OptionsForKey[K]): void;

f("a", {
    cb: p => p,
});

function g<
    K extends "a" | "b">(x: ({ a: string } & { b: string })[K], y: string) {
    x = y;
}


//// [contextualTypeOfIndexedAccessParameter.js]
"use strict";
f("a", {
    cb: function (p) { return p; },
});
function g(x, y) {
    x = y;
}
