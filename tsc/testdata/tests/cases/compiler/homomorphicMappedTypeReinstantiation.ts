// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/65560

declare function either<A, B>(a: A, b: B): A | B;

type Options = Partial<{ verbose: boolean }>;
declare const options: (Options | string)[];
const r1 = either(options[0], options.map(value => value)[0]);

type ReadonlyOptions = Readonly<{ verbose: boolean }>;
declare const readonlyOptions: (ReadonlyOptions | string)[];
const r2 = either(readonlyOptions[0], readonlyOptions.map(value => value)[0]);

type Nullable<T> = { [K in keyof T]: T[K] | null };
type NullableOptions = Nullable<{ verbose: boolean }>;
declare const nullableOptions: (NullableOptions | string)[];
const r3 = either(nullableOptions[0], nullableOptions.map(value => value)[0]);

declare const unionOptions: (Partial<{ a: boolean } | { b: string }> | string)[];
const r4 = either(unionOptions[0], unionOptions.map(value => value)[0]);

type AliasedUnionOptions = Partial<{ a: boolean } | { b: string }>;
declare const aliasedUnionOptions: (AliasedUnionOptions | string)[];
const r5 = either(aliasedUnionOptions[0], aliasedUnionOptions.map(value => value)[0]);

type Named = { verbose: boolean };
type A1 = Partial<Named>;
type A2 = Partial<Named>;
declare const a1: A1;
declare const a2: A2;
declare const a3: Partial<Named>;
const r6 = either(a1, a2);
const r7 = either(a1, a3);
