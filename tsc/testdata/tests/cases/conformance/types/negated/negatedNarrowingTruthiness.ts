// @strict: true
// @noEmit: true

// Truthiness narrowing removes falsy constituents (0, "", null, undefined, false, NaN) via type
// facts. It does not introduce fresh `not` negations.

declare const a: {} | undefined | null;
if (a) {
    a; // {}
} else {
    a; // undefined | null
}

declare const b: string | 0 | undefined;
if (b) {
    b; // string (definitely-falsy 0 and undefined removed; no negation introduced)
} else {
    b; // string | 0 | undefined (no `not` synthesized)
}

// Truthiness on a bare `{}` leaves it unchanged on both branches: the empty object type includes
// falsy primitives (0, "", false, ...), so it is not reduced to `never` in the else branch.
declare const c: {};
if (c) {
    c; // {}
} else {
    c; // {}
}

// Negation via `!` flips the branches.
declare const d: number | undefined;
if (!d) {
    d; // 0 | undefined
} else {
    d; // number
}
