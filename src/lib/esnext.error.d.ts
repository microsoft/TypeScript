interface ErrorConstructor {
    /**
     * Indicates whether the argument provided is a built-in Error instance or not.
     * @param error The value to check.
     * @returns `true` if the argument is a built-in Error instance, otherwise `false`.
     */
    isError(error: unknown): error is Error;
}
