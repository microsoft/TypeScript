interface Atomics {
    /**
     * A non-blocking, asynchronous version of wait and usable on the main thread.
     * Waits asynchronously on a shared memory location and returns a Promise
     * @see wait
     */
    waitAsync(typedArray: BigInt64Array | Int32Array, index: number, value: bigint, timeout?: number): { async: false, value: "ok" | "not-equal" | "timed-out" } | { async: true, value: Promise<"ok" | "not-equal" | "timed-out"> };
}
