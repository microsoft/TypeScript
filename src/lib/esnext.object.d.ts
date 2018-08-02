interface ObjectConstructor {
    /**
     * Returns an object from an array of properties key/values
     * @param entries Array that contains the properties key and value.
     */
    fromEntries<T>(entries: ArrayLike<[string, T]> | Iterable<[string, T]>): Record<string, T>;

    /**
     * Returns an object from an array of properties key/values
     * @param entries Array that contains the properties key and value.
     */
    fromEntries(entries: ArrayLike<[string, any]> | Iterable<[string, any]>): Record<string, any>;
}
