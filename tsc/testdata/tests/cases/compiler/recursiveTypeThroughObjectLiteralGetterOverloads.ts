// @strict: true
// @noEmit: true

// Whether a get accessor has been resolved records what has been asked for so far, not anything
// about the program, so skipping one on that alone makes an ordinary comparison depend on
// resolution order. This picked the numeric overload for an object whose only member is a string.
//
// Only a generic signature opens the speculative region where the skip is allowed, so the non-generic
// overloads never reach the code under test. The generic pair at the bottom covers that. Skipping there made the object look like it had no string member and picked the
// numeric candidate again, this time with the region wide open.

declare function pick(x: { [k: string]: number }): "num";
declare function pick(x: object): "obj";

const inferred = pick({
    get s() {
        return "hello";
    },
});
const mustBeObj: "obj" = inferred;

const annotated = pick({
    get s(): string {
        return "hello";
    },
});
const alsoObj: "obj" = annotated;

const numeric = pick({
    get n() {
        return 1;
    },
});
const mustBeNum: "num" = numeric;

declare function generic<T extends { [k: string]: number }>(x: T): "num";
declare function generic<T extends object>(x: T): "obj";

const inferredGeneric = generic({
    get s() {
        return "hello";
    },
});
const genericMustBeObj: "obj" = inferredGeneric;

const numericGeneric = generic({
    get n() {
        return 1;
    },
});
const genericMustBeNum: "num" = numericGeneric;
