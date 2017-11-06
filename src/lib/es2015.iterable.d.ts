/// <reference path="lib.es2015.symbol.d.ts" />

interface SymbolConstructor {
    /**
     * A method that returns the default iterator for an object. Called by the semantics of the
     * for-of statement.
     */
    readonly iterator: symbol;
}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface NonIterableIterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterator<T> extends NonIterableIterator<T> {
    [Symbol.iterator](): Iterator<T>;
}
interface IterableIterator<T> extends Iterable<T> {
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface Array<T> extends Iterable<T> {
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): Iterator<[number, T]>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): Iterator<number>;

    /**
     * Returns an iterable of values in the array
     */
    values(): Iterator<T>;
}

interface ArrayConstructor {
    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     */
    from<T>(iterable: Iterable<T>): T[];

    /**
     * Creates an array from an iterable object.
     * @param iterable An iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from<T, U>(iterable: Iterable<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
}

interface ReadonlyArray<T> extends Iterable<T> {
    /**
     * Returns an iterable of key, value pairs for every entry in the array
     */
    entries(): Iterator<[number, T]>;

    /**
     * Returns an iterable of keys in the array
     */
    keys(): Iterator<number>;

    /**
     * Returns an iterable of values in the array
     */
    values(): Iterator<T>;
}

interface IArguments extends Iterable<any> {
}

interface Map<K, V> extends Iterable<[K, V]> {
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): Iterator<[K, V]>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): Iterator<K>;

    /**
     * Returns an iterable of values in the map
     */
    values(): Iterator<V>;
}

interface ReadonlyMap<K, V> extends Iterable<[K, V]> {
    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): Iterator<[K, V]>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): Iterator<K>;

    /**
     * Returns an iterable of values in the map
     */
    values(): Iterator<V>;
}

interface MapConstructor {
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
}

interface WeakMap<K extends object, V> { }

interface WeakMapConstructor {
    new <K extends object, V>(iterable: Iterable<[K, V]>): WeakMap<K, V>;
}

interface Set<T> extends Iterable<T> {
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    entries(): Iterator<[T, T]>;
    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys(): Iterator<T>;

    /**
     * Returns an iterable of values in the set.
     */
    values(): Iterator<T>;
}

interface ReadonlySet<T> extends Iterable<T> {
    /**
     * Returns an iterable of [v,v] pairs for every value `v` in the set.
     */
    entries(): Iterator<[T, T]>;

    /**
     * Despite its name, returns an iterable of the values in the set,
     */
    keys(): Iterator<T>;

    /**
     * Returns an iterable of values in the set.
     */
    values(): Iterable<T>;
}

interface SetConstructor {
    new <T>(iterable: Iterable<T>): Set<T>;
}

interface WeakSet<T> { }

interface WeakSetConstructor {
    new <T extends object>(iterable: Iterable<T>): WeakSet<T>;
}

interface Promise<T> { }

interface PromiseConstructor {
    /**
     * Creates a Promise that is resolved with an array of results when all of the provided Promises
     * resolve, or rejected when any Promise is rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    all<TAll>(values: Iterable<TAll | PromiseLike<TAll>>): Promise<TAll[]>;

    /**
     * Creates a Promise that is resolved or rejected when any of the provided Promises are resolved
     * or rejected.
     * @param values An array of Promises.
     * @returns A new Promise.
     */
    race<T>(values: Iterable<T | PromiseLike<T>>): Promise<T>;
}

declare namespace Reflect {
    function enumerate(target: object): Iterable<any>;
}

interface String extends Iterable<string> {
}

interface Int8Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;
    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Int8ArrayConstructor {
    new (elements: Iterable<number>): Int8Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int8Array;
}

interface Uint8Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;
    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Uint8ArrayConstructor {
    new (elements: Iterable<number>): Uint8Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8Array;
}

interface Uint8ClampedArray extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;

    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;

    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Uint8ClampedArrayConstructor {
    new (elements: Iterable<number>): Uint8ClampedArray;


    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint8ClampedArray;
}

interface Int16Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;

    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;

    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Int16ArrayConstructor {
    new (elements: Iterable<number>): Int16Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int16Array;
}

interface Uint16Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;
    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Uint16ArrayConstructor {
    new (elements: Iterable<number>): Uint16Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint16Array;
}

interface Int32Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;
    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Int32ArrayConstructor {
    new (elements: Iterable<number>): Int32Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Int32Array;
}

interface Uint32Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;
    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Uint32ArrayConstructor {
    new (elements: Iterable<number>): Uint32Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Uint32Array;
}

interface Float32Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;
    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Float32ArrayConstructor {
    new (elements: Iterable<number>): Float32Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float32Array;
}

interface Float64Array extends Iterable<number> {
    /**
     * Returns an array of key, value pairs for every entry in the array
     */
    entries(): Iterable<[number, number]>;
    /**
     * Returns an list of keys in the array
     */
    keys(): Iterable<number>;
    /**
     * Returns an list of values in the array
     */
    values(): Iterable<number>;
}

interface Float64ArrayConstructor {
    new (elements: Iterable<number>): Float64Array;

    /**
     * Creates an array from an array-like or iterable object.
     * @param arrayLike An array-like or iterable object to convert to an array.
     * @param mapfn A mapping function to call on every element of the array.
     * @param thisArg Value of 'this' used to invoke the mapfn.
     */
    from(arrayLike: Iterable<number>, mapfn?: (v: number, k: number) => number, thisArg?: any): Float64Array;
}
