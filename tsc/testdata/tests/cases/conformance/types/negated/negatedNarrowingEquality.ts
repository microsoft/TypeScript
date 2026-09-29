// @strict: true
// @noEmit: true

// Direct equality comparisons (`===`, `!==`, `==`, `!=`) to `undefined`, `null`, and literal values
// narrow via type facts and constituent filtering. They do NOT introduce fresh `not` negations, so
// these baselines act as a guard that negations only come from typeof / instanceof / type guards.

declare function wantsNotUndef(x: not undefined): void;

// `=== undefined` removes undefined; the else branch is just `{}` (no `not undefined`).
declare const a: {} | undefined;
if (a === undefined) {
    a; // undefined
} else {
    a; // {}
}

// `!== null` in strict mode.
declare const b: {} | null;
if (b !== null) {
    b; // {}
} else {
    b; // null
}

// Literal comparison filters the matching constituent; the else branch keeps the rest unchanged.
declare const c: "foo" | "bar" | {};
if (c === "foo") {
    c; // "foo"
} else {
    c; // "bar" | {}
}

// `== null` (double equals) removes both null and undefined.
declare const d: {} | null | undefined;
if (d == null) {
    d; // null | undefined
} else {
    d; // {}
}

// Numeric literal comparison on a `{}` base leaves `{}` unrefined in the else branch.
declare const e: {};
if (e === 0) {
    e; // {} (0 is comparable to {})
} else {
    e; // {}
}
