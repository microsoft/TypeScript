// @strict: true
// @target: esnext
// @noEmit: true
// @lib: esnext

// Member lookups, index signatures and never reduction on { [P in keyof T]: X }
// mapped types whose members aren't otherwise resolved.

interface Options {
    readonly name: string;
    size?: number;
    tags: string[];
}
declare const partial: Partial<Options>;
const partial1 = partial.size;
partial.name = "x";
partial.missing;

declare const required: Required<Options>;
const required1: number = required.size;

declare const mutable: { -readonly [K in keyof Options]: Options[K] };
mutable.name = "y";

type Boxed<T> = { [K in keyof T]: { value: T[K] } };
declare const boxed: Boxed<Options>;
const boxed1: string = boxed.name.value;
const boxed2: number = boxed.tags.value;

// Index signatures of the modifiers type become index signatures of the mapped type.
interface Dictionary {
    [key: string]: number;
    fixed: number;
}
declare const dict: Boxed<Dictionary>;
const dict1 = dict.fixed.value;
const dict2 = dict.anything.value;
const dict3: Record<string, { value: string }> = dict;

// Assertion chains in the style of test frameworks, where the base type is an
// intersection of a mapped type and a call signature.
interface ChaiLike {
    equal(value: unknown): void;
    deep: ChaiLike;
}
type Chain<A, T> = { [K in keyof A]: A[K] extends ChaiLike ? Assertion<T> : A[K] } & ((message?: string) => Assertion<T>);
interface Matchers<T> {
    toBe(value: T): void;
}
interface Assertion<T> extends Chain<ChaiLike, T>, Matchers<T> {}
declare function expect<T>(value: T): Assertion<T>;
expect(1).toBe(2);
expect("a").toBe(1);
expect(true).deep.equal(false);
expect(1)("message").toBe(3);
expect(1).missing;

// Intersections with mapped types that reduce to never.
type Kinded<T> = { [K in keyof T]: T[K] } & { kind: "b" };
declare const kinded: Kinded<{ kind: "a"; other: number }>;
kinded.other;
declare const compatible: Kinded<{ kind: "b"; other: number }>;
const compatible1: number = compatible.other;

// Circular mapped types.
type SelfMapped = { [K in keyof SelfMapped]: string };
declare const selfMapped: SelfMapped;
selfMapped.anything;

type X<T> = { [K in keyof T]: string } & { b: string };
interface Y extends X<Y> {
    a: "";
}
declare const y: Y;
const y1 = y.a;
const y2 = y.b;
