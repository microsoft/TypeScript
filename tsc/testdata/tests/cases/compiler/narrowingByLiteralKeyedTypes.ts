// @strict: true
// @noEmit: true

declare function isBranded<T>(t: T): t is T & { __brand: true };
declare function isType<T>(x: unknown): x is T;

declare const s1: "a" | "b" | "c" | undefined;
if (isBranded(s1)) {
    s1;
}

declare const s2: "a" | "b" | string;
if (isType<"a" & { tag: 1 }>(s2)) {
    s2;
}

declare const n1: 1 | 2 | 3 | -0 | 1n | 2n;
if (isType<(1 & { tag: 1 }) | (0 & { tag: 0 }) | (2n & { tag: 2 })>(n1)) {
    n1;
}

enum E { A = "a", B = "b" }
declare const e1: E | "a" | "c";
if (isType<"a" & { tag: 1 }>(e1)) {
    e1;
}
if (isType<E.B & { tag: 1 }>(e1)) {
    e1;
}

declare const b1: ("a" & { x: 1 }) | ("b" & { x: 2 }) | ("c" & { y: 1 }) | "d";
if (isType<("a" & { y: 1 }) | ("b" & { x: 2 }) | "c" | "d">(b1)) {
    b1;
}

function f<T extends "a" | "b">(x: "a" | "b" | "c" | T) {
    if (isType<("a" & T) | ("b" & { tag: 1 })>(x)) {
        x;
    }
    else {
        x;
    }
}

declare const o1: "a" | "b" | { kind: "a" } | { kind: "b" };
if (isType<"a" & { kind: "a" }>(o1)) {
    o1;
}

enum N { A = NaN, B = 1, C = 2 }
declare const n2: N;
if (isType<N.A | N.B>(n2)) {
    n2;
}
