interface Atomics {
    /**
     * Performs a finite-time microwait by signaling to the operating system or
     * CPU that the current executing code is in a spin-wait loop.
     */
    pause(n?: number): void;
}
