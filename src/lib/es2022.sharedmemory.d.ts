interface Atomics {
    /**
     * A non-blocking, asynchronous version of wait which is usable on the main thread.
     * Waits asynchronously on a shared memory location and returns a Promise
     */
    waitAsync(typedArray: Int32Array, index: number, value: number, timeout?: number): { async: false, value: "ok" | "not-equal" | "timed-out" } | { async: true, value: Promise<"ok" | "not-equal" | "timed-out"> };

    /**
     * A non-blocking, asynchronous version of wait which is usable on the main thread.
     * Waits asynchronously on a shared memory location and returns a Promise
     */
    waitAsync(typedArray: BigInt64Array, index: number, value: bigint, timeout?: number): { async: false, value: "ok" | "not-equal" | "timed-out" } | { async: true, value: Promise<"ok" | "not-equal" | "timed-out"> };
}
