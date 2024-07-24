/// <reference lib="es2015.symbol" />

interface SymbolConstructor {
    /**
     * A method that returns the default iterator for an object. Called by the semantics of the
     * for-of statement.
     */
    readonly iterator: unique symbol;
}

interface IteratorYieldResult<TYield> {
    done?: false;
    value: TYield;
}

interface IteratorReturnResult<TReturn> {
    done: true;
    value: TReturn;
}

type IteratorResult<T, TReturn = any> = IteratorYieldResult<T> | IteratorReturnResult<TReturn>;

interface Iterator<T, TReturn = any, TNext = any> {
    // NOTE: 'next' is defined using a tuple to ensure we report the correct assignability errors in all places.
    next(...[value]: [] | [TNext]): IteratorResult<T, TReturn>;
    return?(value?: TReturn): IteratorResult<T, TReturn>;
    throw?(e?: any): IteratorResult<T, TReturn>;
}

interface Iterable<T, TReturn = any, TNext = any> {
    [Symbol.iterator](): Iterator<T, TReturn, TNext>;
}

interface IterableIterator<T, TReturn = any, TNext = any> extends Iterator<T, TReturn, TNext> {
    [Symbol.iterator](): IterableIterator<T, TReturn, TNext>;
}

interface BuiltinIterator<T, TReturn = any, TNext = any> extends Iterator<T, TReturn, TNext> {
    [Symbol.iterator](): BuiltinIterator<T, TReturn, TNext>;
}

type BuiltinIteratorReturn = intrinsic;

interface Array<T> {
    /** Iterator */
    [Symbol.iterator](): BuiltinIterator<T, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): BuiltinIterator<[number, T], BuiltinIteratorReturn>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of values in the array
     */
    values(): BuiltinIterator<T, BuiltinIteratorReturn>;
}

interface ArrayConstructor {
    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     */
    from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];

    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
}

interface ReadonlyArray<T> {
    /** Iterator of values in the array. */
    [Symbol.iterator](): BuiltinIterator<T, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): BuiltinIterator<[number, T], BuiltinIteratorReturn>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of values in the array
     */
    values(): BuiltinIterator<T, BuiltinIteratorReturn>;
}

interface IArguments {
    /** Iterator */
    [Symbol.iterator](): BuiltinIterator<any, BuiltinIteratorReturn>;
}

interface Map<K, V> {
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): BuiltinIterator<[K, V], BuiltinIteratorReturn>;

    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): BuiltinIterator<[K, V], BuiltinIteratorReturn>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): BuiltinIterator<K, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of values in the map
     */
    values(): BuiltinIterator<V, BuiltinIteratorReturn>;
}

interface ReadonlyMap<K, V> {
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): BuiltinIterator<[K, V], BuiltinIteratorReturn>;

    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): BuiltinIterator<[K, V], BuiltinIteratorReturn>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): BuiltinIterator<K, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of values in the map
     */
    values(): BuiltinIterator<V, BuiltinIteratorReturn>;
}

interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(iterable?: Iterable<readonly [K, V]> | null): Map<K, V>;
}

interface WeakMap<K extends WeakKey, V> {}

interface WeakMapConstructor {
    new <K extends WeakKey, V>(iterable: Iterable<readonly [K, V]>): WeakMap<K, V>;
}

interface Set<T> {
    /** Iterates over values in the set. */
    [Symbol.iterator](): BuiltinIterator<T, BuiltinIteratorReturn>;
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    entries(): BuiltinIterator<[T, T], BuiltinIteratorReturn>;
    /**
     * Despite its name, returns an iterable of the values in the set.
     */
    keys(): BuiltinIterator<T, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of values in the set.
     */
    values(): BuiltinIterator<T, BuiltinIteratorReturn>;
}

interface ReadonlySet<T> {
    /** Iterates over values in the set. */
    [Symbol.iterator](): BuiltinIterator<T, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    entries(): BuiltinIterator<[T, T], BuiltinIteratorReturn>;

    /**
     * Despite its name, returns an iterable of the values in the set.
     */
    keys(): BuiltinIterator<T, BuiltinIteratorReturn>;

    /**
     * Returns an iterable of values in the set.
     */
    values(): BuiltinIterator<T, BuiltinIteratorReturn>;
}

interface SetConstructor {
    new <T>(iterable?: Iterable<T> | null): Set<T>;
}

interface WeakSet<T extends WeakKey> {}

interface WeakSetConstructor {
    new <T extends WeakKey = WeakKey>(iterable: Iterable<T>): WeakSet<T>;
}

interface Promise<T> {}

interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An iterable of Promises.
     * @returns A new Promise.
     */
    all<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An iterable of Promises.
     * @returns A new Promise.
     */
    race<T>(values: Iterable<T | PromiseLike<T>>): Promise<Awaited<T>>;
}

interface String {
    /** Iterator */
    [Symbol.iterator](): BuiltinIterator<string, BuiltinIteratorReturn>;
}

interface TypedArray<Tag extends string, T extends number | bigint, Buffer extends ArrayBufferLike> {
    [Symbol.iterator](): BuiltinIterator<T, BuiltinIteratorReturn>;
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): BuiltinIterator<[number, T], BuiltinIteratorReturn>;
    /**
     * Returns an list of keys in the array
     */
    keys(): BuiltinIterator<number, BuiltinIteratorReturn>;
    /**
     * Returns an list of values in the array
     */
    values(): BuiltinIterator<T, BuiltinIteratorReturn>;
}

interface TypedArrayConstructor<Tag extends keyof TypedArrayTypes<any>> {
    new (elements: Iterable<TypedArrayType<Tag>[number]>): TypedArrayType<Tag, ArrayBuffer>;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<TypedArrayType<Tag>[number]>, mapfn?: (v: TypedArrayType<Tag>[number], k: number) => TypedArrayType<Tag>[number], thisArg?: any): TypedArrayType<Tag, ArrayBuffer>;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from<T>(arrayLike: Iterable<T>, mapfn: (v: T, k: number) => TypedArrayType<Tag>[number], thisArg?: any): TypedArrayType<Tag, ArrayBuffer>;
}

