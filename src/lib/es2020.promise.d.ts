interface PromiseResolvedResult<T> {
    status: "fulfilled";
    value: T;
}

interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}

type PromiseSettledResult<T> = PromiseResolvedResult<T> | PromiseRejectedResult;

interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>, PromiseSettledResult<T8>, PromiseSettledResult<T9>, PromiseSettledResult<T10>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>, PromiseSettledResult<T8>, PromiseSettledResult<T9>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>, PromiseSettledResult<T8>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>]>;

    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T>(values: Iterable<T | PromiseLike<T>>): Promise<PromiseSettledResult<T>[]>;
}
