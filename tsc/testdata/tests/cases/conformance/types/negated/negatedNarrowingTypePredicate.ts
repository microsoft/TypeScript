// @strict: true
// @noEmit: true

// Control flow narrowing by a user-defined type guard `x is T`. In the false branch a fresh
// `not T` is intersected in and survives where the base type overlaps T.

interface Cat {
    meow(): void;
}

declare function isCat(x: unknown): x is Cat;
declare function wantsNotCat(x: not Cat): void;

// `{}` base overlaps Cat.
declare const a: {};
if (isCat(a)) {
    a; // {} & Cat
} else {
    a; // {} & not Cat
    wantsNotCat(a);
}

// A bare type parameter.
function generic<T>(x: T) {
    if (isCat(x)) {
        x; // T & Cat
    } else {
        x; // T & not Cat
    }
}

// A disjoint union: `not Cat` reduces away against the non-Cat constituent.
interface Dog {
    bark(): void;
    meow?: undefined;
}
declare const b: Cat | Dog;
if (isCat(b)) {
    b; // Cat
} else {
    b; // Dog
}

// A negated type guard `x is not Cat` narrows the *true* branch to `not Cat`.
declare function isNotCat(x: unknown): x is not Cat;
declare const c: {};
if (isNotCat(c)) {
    c; // {} & not Cat
    wantsNotCat(c);
} else {
    c; // {} & Cat
}
