interface PromiseConstructor {
    /**
     * A reference to the prototype.
     */
    readonly prototype: Promise<any>;

    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]): Promise<[promised T1, promised T2, promised T3, promised T4, promised T5, promised T6, promised T7, promised T8, promised T9, promised T10]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1, T2, T3, T4, T5, T6, T7, T8, T9]): Promise<[promised T1, promised T2, promised T3, promised T4, promised T5, promised T6, promised T7, promised T8, promised T9]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1, T2, T3, T4, T5, T6, T7, T8]): Promise<[promised T1, promised T2, promised T3, promised T4, promised T5, promised T6, promised T7, promised T8]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6, T7>(values: [T1, T2, T3, T4, T5, T6, T7]): Promise<[promised T1, promised T2, promised T3, promised T4, promised T5, promised T6, promised T7]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5, T6>(values: [T1, T2, T3, T4, T5, T6]): Promise<[promised T1, promised T2, promised T3, promised T4, promised T5, promised T6]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4, T5>(values: [T1, T2, T3, T4, T5]): Promise<[promised T1, promised T2, promised T3, promised T4, promised T5]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3, T4>(values: [T1, T2, T3, T4]): Promise<[promised T1, promised T2, promised T3, promised T4]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2, T3>(values: [T1, T2, T3]): Promise<[promised T1, promised T2, promised T3]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T1, T2>(values: [T1, T2]): Promise<[promised T1, promised T2]>;

    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<T>(values: T[]): Promise<(promised T)[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]): Promise<promised T1 | promised T2 | promised T3 | promised T4 | promised T5 | promised T6 | promised T7 | promised T8 | promised T9 | promised T10>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1, T2, T3, T4, T5, T6, T7, T8, T9]): Promise<promised T1 | promised T2 | promised T3 | promised T4 | promised T5 | promised T6 | promised T7 | promised T8 | promised T9>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1, T2, T3, T4, T5, T6, T7, T8]): Promise<promised T1 | promised T2 | promised T3 | promised T4 | promised T5 | promised T6 | promised T7 | promised T8>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6, T7>(values: [T1, T2, T3, T4, T5, T6, T7]): Promise<promised T1 | promised T2 | promised T3 | promised T4 | promised T5 | promised T6 | promised T7>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5, T6>(values: [T1, T2, T3, T4, T5, T6]): Promise<promised T1 | promised T2 | promised T3 | promised T4 | promised T5 | promised T6>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4, T5>(values: [T1, T2, T3, T4, T5]): Promise<promised T1 | promised T2 | promised T3 | promised T4 | promised T5>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3, T4>(values: [T1, T2, T3, T4]): Promise<promised T1 | promised T2 | promised T3 | promised T4>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2, T3>(values: [T1, T2, T3]): Promise<promised T1 | promised T2 | promised T3>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T1, T2>(values: [T1, T2]): Promise<promised T1 | promised T2>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: T[]): Promise<promised T>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject(reason: any): Promise<never>;

    /**
     * Creates a new rejected promise for the provided reason.
     * @param reason The reason the promise was rejected.
     * @returns A new rejected Promise.
     */
    reject<T>(reason: any): Promise<promised T>;

    /**
     * Creates a new resolved promise for the provided value.
     * @param value A promise.
     * @returns A promise whose internal state matches the provided promise.
     */
    resolve<T>(value: T): Promise<promised T>;

    /**
     * Creates a new resolved promise .
     * @returns A resolved promise.
     */
    resolve(): Promise<void>;
}

declare var Promise: PromiseConstructor;