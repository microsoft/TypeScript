interface ErrorConstructor {
    /**
     * Indicates whether the argument provided is a built-in Error instance or not.
     */
    isError(error: unknown): error is Error;
}
