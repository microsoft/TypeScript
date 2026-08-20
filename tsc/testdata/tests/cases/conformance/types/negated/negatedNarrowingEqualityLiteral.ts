// @strict: true
// @noEmit: true

// The false branch of a literal equality comparison introduces a negated type, so a base type that
// overlaps the compared value records the exclusion (e.g. 'number & not 0').

declare function wantsNonZero(x: number & not 0): void;
declare function wantsZero(x: 0): void;

declare const n: number;
if (n === 0) {
    wantsZero(n); // 0
} else {
    n; // number & not 0
    wantsNonZero(n);
}

// `!==` flips the branches.
declare const m: number;
if (m !== 0) {
    m; // number & not 0
    wantsNonZero(m);
} else {
    wantsZero(m); // 0
}

// A disjoint union member: 'not 0' is redundant against non-overlapping constituents.
declare const u: 0 | 1 | 2;
if (u === 0) {
    u; // 0
} else {
    u; // 1 | 2
}

// A string base is disjoint from the numeric literal, so the negation reduces away.
declare const s: string;
if ((s as unknown) === 0) {
    s; // string
} else {
    s; // string
}

// String literal comparison on a broad base.
declare function wantsNotFoo(x: string & not "foo"): void;
declare const str: string;
if (str === "foo") {
    str; // "foo"
} else {
    str; // string & not "foo"
    wantsNotFoo(str);
}
