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

type MustHaveFooBar<T extends { foo: unknown; bar: unknown }> = T;

type Hmm2<T> = T extends { foo: string }[]
  ? T extends { bar: number }[]
    ? MustBeArray<{ [I in keyof T]: MustHaveFooBar<T[I]> }>
    : never
  : never;

type Y = Hmm2<[{ foo: string; bar: number }]>;

type MustHaveFoo<T extends { foo: unknown }> = T;

type Hmm3<T extends { foo: string }[]> = T extends { bar: string }
  ? MustBeArray<{ [I in keyof T]: MustHaveFoo<T[I]> }>
  : never;

type Z1 = Hmm3<[{ foo: string }]>;
type Z2 = Hmm3<[{ foo: string }] & { bar: string }>;
