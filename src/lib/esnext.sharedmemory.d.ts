interface Atomics {
    /**
     * Performs a finite-time microwait by signaling to the operating system or
     * CPU that the current executing code is in a spin-wait loop.
     * @param n The number of times the pause hint should be issued. If omitted, a platform-defined default is used.
     */
    pause(n?: number): void;
}
