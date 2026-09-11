// @strict: true
// @noEmit: true

// Control flow narrowing introduces negated types in the false branch of a narrowing check.
// The negation is only retained where it is non-redundant (i.e. the narrowed base type overlaps
// the removed candidate, such as `{}` / `unknown`); for ordinary disjoint unions it reduces away.

declare function wantsStr(x: string): void;
declare function wantsNotStr(x: not string): void;
declare function wantsNegatedCallbackResult(cb: () => not string): void;

const item = {};

if (typeof item === "string") {
    wantsStr(item); // item: string
} else {
    wantsNotStr(item); // item: {} & not string
    // The negation also flows through an arrow function body (a position a syntactic check misses).
    wantsNegatedCallbackResult(() => item); // item: {} & not string
}

// No negation is introduced against a disjoint union: 'not number' reduces away.
declare const value: string | number;
if (typeof value === "string") {
    value; // string
} else {
    value; // number
}

// Union base where the negation is redundant against every constituent.
declare function wantsNotNum(x: not number): void;
declare const u: string | number | boolean;
if (typeof u === "number") {
    u; // number
} else {
    wantsNotNum(u); // string | boolean
}

// The value flows into a negated position nested inside an object literal argument.
declare function wantsNestedNegated(x: { member: not string }): void;
declare const nested: {};
if (typeof nested === "string") {
    nested; // string
} else {
    wantsNestedNegated({ member: nested }); // nested: {} & not string
}
