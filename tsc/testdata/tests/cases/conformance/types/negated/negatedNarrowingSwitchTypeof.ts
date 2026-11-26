// @strict: true
// @noEmit: true

// `switch (typeof x)` narrowing. Each case narrows to the primitive; the `default` clause is the
// negation of all handled primitives.

declare function wantsNotStr(x: not string): void;

declare const a: {};
switch (typeof a) {
    case "string":
        a; // string
        break;
    case "number":
        a; // number
        break;
    default:
        a; // {} & not string & not number (default excludes handled primitives)
}

// A single handled case: default excludes just that primitive.
declare const b: {};
switch (typeof b) {
    case "string":
        b; // string
        break;
    default:
        b; // {} & not string
        wantsNotStr(b);
}

// Disjoint union: default reduces to the unhandled constituents with no lingering negation.
declare const c: string | number | boolean;
switch (typeof c) {
    case "string":
        c; // string
        break;
    default:
        c; // number | boolean
}
