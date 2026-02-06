/**
 * MaybeAsync is a conditional type that returns Promise<T> for async operations
 * or T directly for sync operations.
 *
 * @example
 * type AsyncResult = MaybeAsync<true, string>;  // Promise<string>
 * type SyncResult = MaybeAsync<false, string>;  // string
 */
export type MaybeAsync<Async extends boolean, T> = Async extends true ? Promise<T> : T;

/**
 * Type utility to convert a tuple/array of types to their MaybeAsync equivalents.
 */
export type MaybeAsyncArray<Async extends boolean, T extends readonly unknown[]> = {
    [K in keyof T]: MaybeAsync<Async, T[K]>;
};
