// @strict: true
// @noEmit: true

// Repro from #58060

type Box<T extends string> = { v: T };

type Test<T extends string[]> = T

type UnboxArray<T> = {
    [K in keyof T]: T[K] extends Box<infer R> ? R : never;
};

type Identity<T> = { [K in keyof T]: T[K] };

declare function fnBad<T extends Array<Box<string>>>(...args: T): Test<Identity<UnboxArray<T>>>;
