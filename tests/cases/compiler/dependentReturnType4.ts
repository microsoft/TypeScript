// @strict: true
// @noEmit: true
// @target: ES2022
// @exactOptionalPropertyTypes: true

// Test narrowing through `hasOwnProperty` calls
declare const rand: { a?: never };
type Missing = typeof rand.a;
declare function takesString(x: string): void;
function hasOwnP<T extends string | Missing>(obj: { a?: T }): T extends string ? 1 : T extends undefined ? 2 : 1 | 2 {
    if (obj.hasOwnProperty("a")) {
        takesString(obj.a);
        return 1;
    }
    return 2;
}

function foo<T extends string | undefined>(opts: { x?: T }):
    T extends undefined ? 0 : T extends string ? 1 : 0 | 1 {
    if (opts.x === undefined) {
        return 0;
    }
    return 1;
}

function bar<T extends string | Missing>(x?: T ):
    T extends Missing ? 0 : T extends string ? 1 : 0 | 1 {
    if (x === undefined) {
        return 0;
    }
    return 1;
}

// Aliased narrowing
function inlined<T extends number | string>(x: T): T extends number ? string : T extends string ? number : string | number {
    const t = typeof x === "string";
    if (t) {
        const y: string = x;
        return 1;
    }
    return "one";
}

// Don't narrow more than 5 levels of aliasing
function inlined6<T extends number | string>(x: T): T extends number ? string : T extends string ? number : string | number {
    const t1 = typeof x === "string";
    const t2 = t1;
    const t3 = t2;
    const t4 = t3;
    const t5 = t4;
    const t6 = t5;
    if (t6) {
        const y: string = x;
        return 1;
    }
    return "one";
}

type A = { kind: "a", a: number };
type B = { kind: "b", b: string };
type AOrB = A | B;

function subexpression<T extends AOrB>(x: T): T extends A ? number : T extends B ? string : number | string {
    if (x.kind === "b") {
        return "some str";
    }
    return 0;
}

function switchTrue<T extends boolean>(x: T): T extends true ? 1 : T extends false ? 0 : 0 | 1 {
    switch (true) {
        case x:
            return 1;
    }
    return 0;
}

// Don't raise errors when getting the narrowed type of synthesized nodes
type Ret<T extends string | number> = T extends string ? 1 : T extends number ? 2 : 1 | 2;
function f<T extends string | number>(x: T): Ret<T> {
    let y!: T;
    if (typeof y === "string") {
        return 1;
    }
    return 2;
}