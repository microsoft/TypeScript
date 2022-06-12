interface Map<K, V> {
    /**
     * Removes all elements from the Map object.
     */
    clear(): void;
    /**
     * Removes the specified element from the Map object by key.
     * @param key The key of the element to remove from the Map object.
     * @returns Returns true if an element in the Map object existed and has been removed, or false if the element does not exist.
     */
    delete(key: K): boolean;
    /**
     * Executes a provided function once per each key/value pair in the Map object, in insertion order.
     * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each key/value pair in the Map.
     * @param thisArg Value to use as this when executing callback.
     */
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    /**
     * Returns a specified element from a Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map object.
     * @param key The key of the element to return from the Map object.
     * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
     */
    get(key: K): V | undefined;
    /**
     * Returns a boolean indicating whether an element with the specified key exists or not.
     * @param key The key of the element to test for presence in the Map object.
     * @returns Returns true if an element in the Map object exists with the specified key, or false otherwise.
     */
    has(key: K): boolean;
    /**
     * Adds a new element with a specified key and value to the Map object. If an element with the same key already exists, the element will be updated.
     * @param key The key of the element to add to the Map object. The key may be any JavaScript type (any primitive value or any type of JavaScript object).
     * @param value The value of the element to add to the Map object. The value may be any JavaScript type (any primitive value or any type of JavaScript object).
     */
    set(key: K, value: V): this;
    /**
     * Returns the number of elements in a Map object.
     */
    readonly size: number;
}

interface MapConstructor {
    new(): Map<any, any>;
    new <K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
    readonly prototype: Map<any, any>;
}
declare var Map: MapConstructor;

interface ReadonlyMap<K, V> {
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    readonly size: number;
}

interface WeakMap<K extends object, V> {
    /**
     * removes the specified element from a WeakMap object.
     * @param key The key of the element to remove from the WeakMap object.
     */
    delete(key: K): boolean;
    /**
     * Returns a specified element from a WeakMap object.
     * @param key The key of the element to return from the WeakMap object.
     */
    get(key: K): V | undefined;
    /**
     * Returns a boolean indicating whether an element with the specified key exists in the WeakMap object or not.
     * @param key The key of the element to test for presence in the WeakMap object.
     * @returns Returns true if an element with the specified key exists in the WeakMap object, or false otherwise.
     */
    has(key: K): boolean;
    /**
     * Adds a new element with a specified key and value to a WeakMap object.
     * @param key Must be object. The key of the element to add to the WeakMap object.
     * @param value The value of the element to add to the WeakMap object.
     */
    set(key: K, value: V): this;
}

interface WeakMapConstructor {
    new <K extends object = object, V = any>(entries?: readonly [K, V][] | null): WeakMap<K, V>;
    readonly prototype: WeakMap<object, any>;
}
declare var WeakMap: WeakMapConstructor;

interface Set<T> {
    /**
     * Appends a new element with a specified value to the end of the Set object.
     * @param value The value of the element to add to the Set object.
     */
    add(value: T): this;
    /**
     * Removes all elements from the Set object.
     */
    clear(): void;
    /**
     * Removes a specified value from a Set object, if it is in the set.
     * @param value The value to remove from Set.
     * @returns Returns true if an element in the Set object existed and has been removed, or false if the element does not exist.
     */
    delete(value: T): boolean;
    /**
     * Executes a provided function once per each value in the Set object, in insertion order.
     * @param callbackfn A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the Set.
     * @param thisArg Value to use as this when executing callback.
     */
    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
    /**
     * Returns a boolean indicating whether an element with the specified value exists in a Set object or not.
     * @param value The value to test for presence in the Set object.
     * @returns Returns true if an element with the specified value exists in the Set object, or false if not.
     */
    has(value: T): boolean;
    /**
     * Returns the number of (unique) elements in a Set object.
     */
    readonly size: number;
}

interface SetConstructor {
    new <T = any>(values?: readonly T[] | null): Set<T>;
    readonly prototype: Set<any>;
}
declare var Set: SetConstructor;

interface ReadonlySet<T> {
    forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    readonly size: number;
}

interface WeakSet<T extends object> {
    /**
     * Appends a new object to the end of the WeakSet object.
     * @param value The object to add to the WeakSet collection.
     */
    add(value: T): this;
    /**
     * Removes the specified element from the WeakSet object.
     * @param value The object remove from the WeakSet object.
     */
    delete(value: T): boolean;
    /**
     * Returns a boolean indicating whether an object exists in a WeakSet or not.
     * @param value The object to test for presence in the WeakSet.
     * @returns Returns true if the object exists in the WeakSet, or false if it does not.
     */
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new <T extends object = object>(values?: readonly T[] | null): WeakSet<T>;
    readonly prototype: WeakSet<object>;
}
declare var WeakSet: WeakSetConstructor;
