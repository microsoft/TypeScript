// @lib: es2026
// @strict: true
// @noEmit: true

declare const asyncSource: AsyncIterable<Promise<number>>;
declare const syncSource: Iterable<Promise<number>>;
declare const arrayLike: ArrayLike<Promise<number>>;
declare const mixed: typeof asyncSource | typeof syncSource;
declare const explicitMixed: AsyncIterable<number> | Iterable<number>;
declare const optionalAsync: typeof syncSource & Partial<typeof asyncSource>;
declare const dual: typeof asyncSource & Iterable<string>;

const fromAsync: Promise<number[]> = Array.fromAsync(asyncSource, value => value);
const fromSync: Promise<string[]> = Array.fromAsync(syncSource, value => value.toFixed());
const fromArrayLike: Promise<string[]> = Array.fromAsync(arrayLike, value => value.toFixed());
const fromString: Promise<string[]> = Array.fromAsync("ab", value => value.toUpperCase());
const fromMixed: Promise<number[]> = Array.fromAsync(mixed, async value => (await value) + 1);
const fromExplicitMixed: Promise<string[]> = Array.fromAsync<number, string>(explicitMixed, value => value.toFixed());
const fromOptionalAsync: Promise<number[]> = Array.fromAsync(optionalAsync, async value => (await value) + 1);
const fromDual: Promise<number[]> = Array.fromAsync(dual, value => value);
const unmapped: Promise<Promise<number>[]> = Array.fromAsync(asyncSource);

Array.fromAsync(asyncSource, value => value.toFixed());
Array.fromAsync(dual, (value: string) => value.toUpperCase());
Array.fromAsync(mixed, (value: number) => value.toFixed());
Array.fromAsync(optionalAsync, (value: number) => value.toFixed());
