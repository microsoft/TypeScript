type PromiseSettledResult<T> = { status: 'fulfilled', value: T } | { status: 'rejected', reason: any }

/**
 * Represents the completion of an asynchronous operation
 */
interface PromiseConstructor {
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>, PromiseSettledResult<T8>, PromiseSettledResult<T9>, PromiseSettledResult<T10>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>, PromiseSettledResult<T8>, PromiseSettledResult<T9>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>, PromiseSettledResult<T8>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>, PromiseSettledResult<T7>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>, PromiseSettledResult<T6>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>, PromiseSettledResult<T5>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>, PromiseSettledResult<T4>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>, PromiseSettledResult<T3>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promise<[PromiseSettledResult<T1>, PromiseSettledResult<T2>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T1>(values: [T1 | PromiseLike<T1>]): Promise<[PromiseSettledResult<T1>]>
    /**
     * Returns a promise that is fulfilled with an array of promise state snapshots, but only after all the original promises have settled.
     * @param values An array or iterable of Promises.
     * @returns A new Promise.
     */
    allSettled<T>(values: Array<T | PromiseLike<T>> | Iterable<T | PromiseLike<T>>): Promise<PromiseSettledResult<T>[]>
}
