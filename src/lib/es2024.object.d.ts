interface ObjectConstructor {
    /**
     * Groups members of an iterable according to the return value of the passed callback.
     * @param items An iterable.
     * @param keySelector A callback which will be invoked for each item in items.
     */
    groupBy<K extends PropertyKey, T>(
        items: Iterable<T, unknown, undefined>,
        keySelector: (item: T, index: number) => K,
    ): Partial<Record<K, T[]>>;
}
