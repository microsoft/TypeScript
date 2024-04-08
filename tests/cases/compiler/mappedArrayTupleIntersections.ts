// @strict: true
// @noEmit: true

type Box<T> = { value: T };
type Boxify<T> = { [K in keyof T]: Box<T[K]> };

type T1 = Boxify<string[]>;
type T2 = Boxify<[string, string]>;
type T3 = Boxify<string[] & unknown[]>;
type T4 = Boxify<string[] & [string, string]>;
type T5 = Boxify<string[] & { x: string }>;

// https://github.com/microsoft/TypeScript/issues/57744

type MustBeArray<T extends any[]> = T;

type Hmm<T extends any[]> = T extends number[] ?
    MustBeArray<{ [I in keyof T]: 1 }> :
    never;

type X = Hmm<[3, 4, 5]>;
