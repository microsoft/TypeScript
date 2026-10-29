// @strict: true

// homomorphic - mapped type causes `keyof ExcludeKey` to not simplify, relater operates with full mapped type awareness
type ExcludeKey<T, TKey> = {
    [K in keyof T as K extends TKey ? never : K]: T[K]
};

interface Test {
    a: string;
    b: number;
    c: boolean;
}

declare const test: ExcludeKey<Test, "b">; 
declare var possibleKey: string & keyof Test & not "b";

test[possibleKey];

function f<T extends Test>(test: ExcludeKey<T, "b">, possibleKey: string & keyof T & not "b") {
    test[possibleKey];
}

// non-homomorphic - mapped type declared with `keyof T & string` causes `keyof PathTuples` to simplify to `(keyof T & string) extends '_key' ? never : (keyof T & string)`
// relater must operate without mapped type awareness
// ultimate comparison is `keyof T & string & not '_key'` to `(keyof T & string) extends '_key' ? never : (keyof T & string)`
type LocalExclude<T, U> = T & not U;
type ChildPaths<T> = [PathTuples<T>] extends [never] ? [] : PathTuples<T>;
type PathTuples<T> = T extends object
  ? {
      [K in keyof T & string as K extends '_key' ? never : K]: [PathTuples<T[K]>] extends [never]
        ? never
        : readonly [K, ...ChildPaths<T[K]>];
    }[LocalExclude<keyof T & string, '_key'>]
  : [];

type T1 = PathTuples<{ a: string; _key: string; b: { c: number } }>;
const t1: T1 = ['b', 'c'];

type S1<T> = { [K in keyof T & string as K extends '_key' ? never : K]: 1 }[LocalExclude<keyof T & string, '_key'>];
type S2<T> = { [K in string & keyof T as K extends '_key' ? never : K]: 1 }[LocalExclude<string & keyof T, '_key'>];

type ConditionalExclude<T, U> = T extends U ? never : T;

function exclude<T, U>(value: T & not U): ConditionalExclude<T, U> {
    return value;
}

type Identity<T> = T;
type AliasedExclude<T, U> = T extends U ? never : Identity<T>;

function aliasedExclude<T, U>(value: T & not U): AliasedExclude<T, U> {
    return value;
}

function mappedExclude<T, U>(value: keyof T & not U): keyof ExcludeKey<T, U> {
    return value;
}

type AliasedExcludeKey<T, U> = {
    [K in keyof T as ConditionalExclude<K, U>]: T[K]
};

function aliasedMappedExclude<T, U>(value: keyof T & not U): keyof AliasedExcludeKey<T, U> {
    return value;
}

type Prefixed<T extends string> = T extends "skip" ? never : `prefix${T}`;

function prefixed<T extends string>(value: `prefix${T & not "skip"}`): Prefixed<T> {
    return value;
}

type WithSuffix<T extends string, S extends string> = T extends "skip" ? never : `prefix${T}:${S}`;

function withSuffix<T extends string, S extends string>(value: `prefix${T & not "skip"}:${S}`): WithSuffix<T, S> {
    return value;
}

type Cased<T extends string> = Uppercase<`prefix${Lowercase<T>}`>;
type FilteredCased<T extends string> = T extends "skip" ? never : Cased<T>;

function cased<T extends string>(value: Cased<T & not "skip">): FilteredCased<T> {
    return value;
}

type Alternatives<T extends string> = T extends "skip" ? never : `left${T}` | `right${Uppercase<T>}`;

function alternatives<T extends string>(
    value: `left${T & not "skip"}` | `right${Uppercase<T & not "skip">}`
): Alternatives<T> {
    return value;
}

type Branded<T> = T extends "skip" ? never : T & { brand: true };

function branded<T>(value: T & not "skip" & { brand: true }): Branded<T> {
    return value;
}

interface Values {
    a: 1;
    b: 2;
    skip: 3;
}

type Lookup<T extends keyof Values> = T extends "skip" ? never : Values[T];

function lookup<T extends keyof Values>(value: Values[T & not "skip"]): Lookup<T> {
    return value;
}

type PrefixedKeys<T> = {
    [K in keyof T & string as K extends "_key" ? never : `prefix${K}`]: T[K]
};

function prefixedKey<T>(value: `prefix${keyof T & string & not "_key"}`): keyof PrefixedKeys<T> {
    return value;
}

type FunctionResult<T> = T extends string ? never : () => T;

function falseFunction<T>(value: () => [T]): FunctionResult<[T]> {
    return value;
}

type TupleResult<T> = T extends string ? never : [T, T];

function falseTuple<T>(value: [[T], [T]]): TupleResult<[T]> {
    return value;
}

type Nested<T extends string> = T extends "skip" ? never : ConditionalExclude<`prefix${T}`, "prefixomit">;

function nested<T extends string>(value: ConditionalExclude<`prefix${T & not "skip"}`, "prefixomit">): Nested<T> {
    return value;
}
