interface PromiseResolution<T> {
    status: "fulfilled";
    value: T;
}

interface PromiseRejection {
    status: "rejected";
    reason: any;
}

type PromiseResult<T> = PromiseResolution<T> | PromiseRejection;

interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>, PromiseResult<T4>, PromiseResult<T5>, PromiseResult<T6>, PromiseResult<T7>, PromiseResult<T8>, PromiseResult<T9>, PromiseResult<T10>]>;
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>, PromiseResult<T4>, PromiseResult<T5>, PromiseResult<T6>, PromiseResult<T7>, PromiseResult<T8>, PromiseResult<T9>]>;
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>, PromiseResult<T4>, PromiseResult<T5>, PromiseResult<T6>, PromiseResult<T7>, PromiseResult<T8>]>;
    allSettled<T1, T2, T3, T4, T5, T6, T7>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>, PromiseResult<T4>, PromiseResult<T5>, PromiseResult<T6>, PromiseResult<T7>]>;
    allSettled<T1, T2, T3, T4, T5, T6>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>, PromiseResult<T4>, PromiseResult<T5>, PromiseResult<T6>]>;
    allSettled<T1, T2, T3, T4, T5>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>, PromiseResult<T4>, PromiseResult<T5>]>;
    allSettled<T1, T2, T3, T4>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>, PromiseResult<T4>]>;
    allSettled<T1, T2, T3>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[PromiseResult<T1>, PromiseResult<T2>, PromiseResult<T3>]>;
    allSettled<T1, T2>(values: readonly [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[PromiseResult<T1>, PromiseResult<T2>]>;
    allSettled<T>(values: readonly (T | PromiseLike<T>)[]): Promise<PromiseResult<T>[]>;
}
