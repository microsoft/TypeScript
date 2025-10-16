/// <reference lib="es2024.collection" />

interface Map<K, V> {
    /**
     * Returns a specified element from the Map object.
     * If no element is associated with the specified key, a new element with the value `defaultValue` will be inserted into the Map and returned.
     * @returns The element associated with the specified key, which will be `defaultValue` if no element previously existed.
     */
    getOrInsert(key: K, defaultValue: V): V;
    /**
     * Returns a specified element from the Map object.
     * If no element is associated with the specified key, the result of passing the specified key to the `callback` function will be inserted into the Map and returned.
     * @returns The element associated with the specific key, which will be the newly computed value if no element previously existed.
     */
    getOrInsertComputed(key: K, callback: (key: K) => V): V;
}

interface WeakMap<K extends WeakKey, V> {
    /**
     * Returns a specified element from the WeakMap object.
     * If no element is associated with the specified key, a new element with the value `defaultValue` will be inserted into the WeakMap and returned.
     * @returns The element associated with the specified key, which will be `defaultValue` if no element previously existed.
     */
    getOrInsert(key: K, defaultValue: V): V;
    /**
     * Returns a specified element from the WeakMap object.
     * If no element is associated with the specified key, the result of passing the specified key to the `callback` function will be inserted into the WeakMap and returned.
     * @returns The element associated with the specific key, which will be the newly computed value if no element previously existed.
     */
    getOrInsertComputed(key: K, callback: (key: K) => V): V;
}

interface ReadonlySetLike<T> {
    /**
     * Despite its name, returns an iterator of the values in the set-like.
     */
    keys(): Iterator<T>;
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
    union<U>(other: ReadonlySetLike<U>): Set<T | U>;
    /**
     * @returns a new Set containing all the elements which are both in this Set and in the argument.
     */
    intersection<U>(other: ReadonlySetLike<U>): Set<T & U>;
    /**
     * @returns a new Set containing all the elements in this Set which are not also in the argument.
     */
    difference<U>(other: ReadonlySetLike<U>): Set<T>;
    /**
     * @returns a new Set containing all the elements which are in either this Set or in the argument, but not in both.
     */
    symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U>;
    /**
     * @returns a boolean indicating whether all the elements in this Set are also in the argument.
     */
    isSubsetOf(other: ReadonlySetLike<unknown>): boolean;
    /**
     * @returns a boolean indicating whether all the elements in the argument are also in this Set.
     */
    isSupersetOf(other: ReadonlySetLike<unknown>): boolean;
    /**
     * @returns a boolean indicating whether this Set has no elements in common with the argument.
     */
    isDisjointFrom(other: ReadonlySetLike<unknown>): boolean;
}

interface ReadonlySet<T> {
    /**
     * @returns a new Set containing all the elements in this Set and also all the elements in the argument.
     */
    union<U>(other: ReadonlySetLike<U>): Set<T | U>;
    /**
     * @returns a new Set containing all the elements which are both in this Set and in the argument.
     */
    intersection<U>(other: ReadonlySetLike<U>): Set<T & U>;
    /**
     * @returns a new Set containing all the elements in this Set which are not also in the argument.
     */
    difference<U>(other: ReadonlySetLike<U>): Set<T>;
    /**
     * @returns a new Set containing all the elements which are in either this Set or in the argument, but not in both.
     */
    symmetricDifference<U>(other: ReadonlySetLike<U>): Set<T | U>;
    /**
     * @returns a boolean indicating whether all the elements in this Set are also in the argument.
     */
    isSubsetOf(other: ReadonlySetLike<unknown>): boolean;
    /**
     * @returns a boolean indicating whether all the elements in the argument are also in this Set.
     */
    isSupersetOf(other: ReadonlySetLike<unknown>): boolean;
    /**
     * @returns a boolean indicating whether this Set has no elements in common with the argument.
     */
    isDisjointFrom(other: ReadonlySetLike<unknown>): boolean;
}
