interface MapConstructor {
    /**
     * Groups members of an iterable according to the return value of the passed callback.
     * @param items An iterable.
     * @param keySelector A callback which will be invoked for each item in items.
     */
    groupBy<K, T>(
        items: Iterable<T>,
        keySelector: (item: T, index: number) => K,
    ): Map<K, T[]>;
}

interface SetLike<T> {
    /**
     * Despite its name, returns an iterable of the values in the set-like.
     */
    keys(): Iterable<T>;
    /**
     * @returns a boolean indicating whether an element with the specified value exists in the set-like or not.
     */
    has(value: T): boolean;
    /**
     * @returns the number of (unique) elements in the set-like.
     */
    readonly size: number;
}

interface Set<T> {
    /**
     * @returns a new Set containing all the elements in this Set and also all the elements in the argument.
     */
    union(other: SetLike<T>): Set<T>;
    /**
     * @returns a new Set containing all the elements which are both in this Set and in the argument.
     */
    intersection(other: SetLike<T>): Set<T>;
    /**
     * @returns a new Set containing all the elements in this Set which are not also in the argument.
     */
    difference(other: SetLike<T>): Set<T>;
    /**
     * @returns a new Set containing all the elements in this Set which are in this or in the argument, but not in both.
     */
    symmetricDifference(other: SetLike<T>): Set<T>;
    /**
     * @returns a boolean indicating whether all the elements in this Set are also in the argument.
     */
    isSubsetOf(other: SetLike<T>): Set<T>;
    /**
     * @returns a boolean indicating whether all the elements in the argument are also in this Set.
     */
    isSupersetOf(other: SetLike<T>): Set<T>;
    /**
     * @returns a boolean indicating whether this Set has no elements in common with the argument.
     */
    isDisjointFrom(other: SetLike<T>): Set<T>;
}
