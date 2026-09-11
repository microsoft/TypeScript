// @strict: true
// @noEmit: true

// Assertion signatures narrow only the (single) continuation after the call. Because there is no
// `false` branch, no fresh CFA negation is introduced; a negation only appears when the assertion
// predicate itself is written with `not`.

interface Cat {
    meow(): void;
}

declare function assertCat(x: unknown): asserts x is Cat;
declare function assertNotCat(x: unknown): asserts x is not Cat;
declare function assertDefined<T>(x: T): asserts x is NonNullable<T>;
declare function assertTruthy(x: unknown): asserts x;

declare function wantsNotCat(x: not Cat): void;

// `asserts x is Cat` narrows to Cat.
declare const a: {};
assertCat(a);
a; // {} & Cat

// `asserts x is not Cat` narrows to `not Cat` (the negation comes from the annotation).
declare const b: {};
assertNotCat(b);
b; // {} & not Cat
wantsNotCat(b);

// `asserts x is NonNullable<T>` removes null/undefined without introducing a negation.
declare const c: string | undefined;
assertDefined(c);
c; // string

// `asserts x` (truthiness assertion) removes falsy constituents, no negation.
declare const d: {} | undefined | 0;
assertTruthy(d);
d; // {}
