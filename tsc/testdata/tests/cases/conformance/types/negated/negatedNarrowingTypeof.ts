// @strict: true
// @noEmit: true

// Control flow narrowing by `typeof x === "..."`. In the false branch a fresh `not <primitive>`
// is intersected in, but only survives where the base type overlaps the removed primitive.

declare function wantsNotStr(x: not string): void;
declare function wantsNotNum(x: not number): void;

// `{}` overlaps every primitive, so the negation is retained.
declare const a: {};
if (typeof a === "string") {
    a; // string
} else {
    a; // {} & not string
    wantsNotStr(a);
}

// `!==` flips the branches.
declare const b: {};
if (typeof b !== "number") {
    b; // {} & not number
    wantsNotNum(b);
} else {
    b; // number
}

// A disjoint union: `not number` is redundant and reduces away.
declare const c: string | number;
if (typeof c === "number") {
    c; // number
} else {
    c; // string
}

// A bare type parameter retains the negation on each branch.
function generic<T>(x: T) {
    if (typeof x === "boolean") {
        x; // T & boolean
    } else {
        x; // T & not boolean
    }
}

// `unknown` narrows to the primitive on the true branch and keeps a negation on the false branch.
declare const u: unknown;
if (typeof u === "string") {
    u; // string
} else {
    u; // (unknown narrowed) & not string
}

// `==` / `!=` behave like their strict counterparts here.
declare const d: {};
if (typeof d == "bigint") {
    d; // bigint
} else {
    d; // {} & not bigint
}
