// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/43031

type Brand<K, T> = K & { __brand: T };
type BrandedUnknown<T> = Brand<"unknown", T>;
type Maybe<T> = T | BrandedUnknown<T>;

declare const m1: Maybe<boolean> | undefined;
const test1 = m1 || false;
const test2 = m1 ?? false;

declare const m2: Maybe<null> | undefined;
const test3 = m2 || null;
const test4 = m2 ?? null;

type StrOrNum = string | number
declare const numOrStr: StrOrNum;
const test5 = numOrStr && numOrStr;
