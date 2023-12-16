interface MapConstructor {
    /**
     * Groups members of an iterable according to the return value of the passed callback.
     * @param items An iterable.
     * @param keySelector A callback which will be invoked for each item in items.
     */
    groupBy<Item, Key>(
        items: Iterable<Item>,
        keySelector: (item: Item, index: number) => Key,
    ): Map<Key, Item[]>;
}
