interface PromiseConstructor {
    /**
     * Takes a callback of any kind (returns or throws, synchronously or asynchronously) and wraps its result
     * in a Promise.
     *
     * @param callbackFn A function that is called synchronously with no arguments. It can do anything: either return
     * a value, throw an error, or return a promise.
     *
     * @returns A Promise that is:
     * - Already fulfilled, if the callback synchronously returns a value.
     * - Already rejected, if the callback synchronously throws an error.
     * - Asynchronously fulfilled or rejected, if the callback returns a promise.
     */
    try<T>(callbackFn: () => T | Promise<T>): Promise<T>;
}
