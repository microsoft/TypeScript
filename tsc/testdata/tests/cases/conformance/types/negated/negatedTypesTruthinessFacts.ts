// @strict: true
// @noEmit: true

// Type facts for negated types drive control-flow narrowing. An intersection of negated
// falsy values excludes every falsy value, so a truthiness guard on such a type makes the
// falsy branch unreachable (never). This relies on the per-falsy-value "could be" facts,
// which getIntersectionTypeFacts AND-combines and then uses to clear a spurious Falsy fact.

// A fully-truthy type: excludes every falsy value ("", 0, 0n, null, undefined, false).
type Truthy = not "" & not 0 & not 0n & not null & not undefined & not false;

declare const t: Truthy;
if (t) {
    t; // Truthy
} else {
    t; // never
}

// `string & not ""` is exactly the non-empty strings: truthy, and the falsy branch is unreachable.
declare const s: string & not "";
if (s) {
    s; // string & not ""
} else {
    s; // never
}

// `number & not 0` is truthy (only falsy number is 0, ignoring NaN like the checker does).
declare const n: number & not 0;
if (n) {
    n; // number & not 0
} else {
    n; // never
}

// A single negation still leaves the falsy branch reachable: `not null` can be 0/""/false/undefined.
declare const u: not null;
if (u) {
    u; // not null
} else {
    u; // not null (still falsy-capable, so not never)
}

// Omitting `not 0n` leaves 0n as a reachable falsy value, so the falsy branch is not never.
type AlmostTruthy = not "" & not 0 & not null & not undefined & not false;
declare const a: AlmostTruthy;
if (a) {
    a; // AlmostTruthy
} else {
    a; // still falsy-capable via 0n, so not never
}
