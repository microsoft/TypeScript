// @strict: true
// @target: esnext
// @noEmit: true

// Intersections that are and aren't reduced to never because of conflicting
// discriminants or private properties.

type A1 = { kind: "a"; x: string } & { kind: "b"; y: string };
type A2 = { kind: "a" | "b"; x: string } & { kind: "b"; y: string };
type A3 = { kind?: "a" } & { kind?: "b" };
type A4 = { kind: "a" } & { kind: string };
type A5 = { kind: `a${string}` } & { kind: `b${string}` };
type A6 = { kind: never } & { kind: "a" };
type A7 = { flag: true } & { flag: false };
type A8 = { tag: 1; a: string } & { b: number } & { tag: 2; c: boolean };
type A9 = { x: string } & { x: number };

declare const a1: A1;
declare const a2: A2;
declare const a3: A3;
declare const a4: A4;
declare const a5: A5;
declare const a6: A6;
declare const a7: A7;
declare const a8: A8;
declare const a9: A9;

a1.kind;
a2.kind;
a3.kind;
a4.kind;
a5.kind;
a6.kind;
a7.flag;
a8.tag;
a9.x;

class P1 {
    private x = 1;
}
class P2 {
    private x = 1;
}
class Q1 {
    protected x = 1;
}
class Q2 {
    protected x = 1;
}
class Generic<T> {
    private value!: T;
    kind!: T;
}

declare const b1: P1 & P2;
declare const b2: Q1 & Q2;
declare const b3: P1 & { y: string };
declare const b4: Generic<string> & Generic<string>;
declare const b5: Generic<string> & Generic<number>;
declare const b6: Generic<"a"> & Generic<"b">;

b1.x;
b2.x;
b3.y;
b4.kind;
b5.kind;
b6.kind;

type Tagged<T> = { kind: T } & { kind: "a" };
declare const c1: Tagged<"a">;
declare const c2: Tagged<"b">;
declare const c3: Tagged<string>;
c1.kind;
c2.kind;
c3.kind;

function f<T extends { kind: "a" } | { kind: "b" }>(x: T & { kind: "c" }, y: T & { kind: "a" }) {
    x.kind;
    y.kind;
}

interface Many {
    p1: string;
    p2: number;
    p3: boolean;
    p4: string[];
    p5: () => void;
    kind: "many";
}
declare const d1: Many & { kind: "many"; extra: string };
declare const d2: Many & { kind: "other" };
declare const d3: Many & Partial<Many> & { p1: "literal" };
d1.extra;
d2.p1;
d3.p1;
