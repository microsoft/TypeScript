// @strict: true
// @noEmit: true

// The `in` operator narrows by presence/absence of a property. It uses type facts and constituent
// filtering (not fresh `not` negations), so the else branch keeps the property-absent constituents.

declare function wantsNotHasA(x: not { a: unknown }): void;

interface WithA {
    a: number;
}
interface WithB {
    b: string;
}

declare const a: WithA | WithB;
if ("a" in a) {
    a; // WithA
} else {
    a; // WithB
}

// `in` on a `{}` base does not synthesize a negation; the true branch records the tested member.
declare const b: {};
if ("a" in b) {
    b; // Record<"a", unknown>
} else {
    b; // {}
}

// Optional property discrimination.
interface Maybe {
    kind: "maybe";
    payload?: string;
}
declare const c: Maybe;
if ("payload" in c) {
    c; // Maybe
} else {
    c; // Maybe
}
