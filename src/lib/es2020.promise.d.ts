interface PromiseFulfilledResult<T> {
    status: "fulfilled";
    value: T;
}

interface PromiseRejectedResult {
    status: "rejected";
    reason: any;
}

type PromiseSettledResult<T> = PromiseFulfilledResult<T> | PromiseRejectedResult;

interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all
     * of the provided Promises resolve or reject.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    allSettled<T extends [unknown] | ArrayLike<unknown> | Iterable<unknown>>(values: T): Promise<
        T extends {[P in 0]: unknown} ? 
            {-readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>} : 
                T extends ArrayLike<infer S> | Iterable<infer S> ? PromiseSettledResult<Awaited<S>>[] : never 
    >
}
