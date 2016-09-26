// NumberMap, StringMap, and StringSet shims
/* @internal */
namespace ts {
    // The global Map object. This may not be available, so we must test for it.
    declare const Map: NumberMapConstructor & StringMapConstructor | undefined;
    const usingNativeMaps = typeof Map !== "undefined";
    // tslint:disable-next-line:no-in-operator
    const fullyFeaturedMaps = usingNativeMaps && "keys" in Map.prototype && "values" in Map.prototype && "entries" in Map.prototype;

    /** Extra Map methods that may not be available, so we must provide fallbacks. */
    interface FullyFeaturedMap<K, V> extends Map<K, V> {
        keys(): Iterator<K>;
        values(): Iterator<V>;
        entries(): Iterator<[K, V]>;
    }

    /** Simplified ES6 Iterator interface. */
    interface Iterator<T> {
        next(): { value: T, done: false } | { value: never, done: true };
    }

    export interface NumberMapConstructor {
        /**
         * Creates a new Map with number keys.
         * If `pairs` is provided, each [key, value] pair will be added to the map.
         */
        new<K extends number, V>(pairs?: [K, V][]): Map<K, V>;
    }

    /**
     * In runtimes without Maps, this is implemented using a sparse array.
     * This is generic over the key type because it is usually an enum.
     */
    export const NumberMap: NumberMapConstructor = usingNativeMaps ? Map : class ShimNumberMap<K extends number, V> implements Map<K, V> {
        private data: { [key: number]: V } = [];

        constructor(pairs?: [K, V][]) {
            if (pairs) {
                for (const [key, value] of pairs) {
                    this.data[key as number] = value;
                }
            }
        }

        clear() {
            this.data = [];
        }

        delete(key: K) {
            delete this.data[key as number];
        }

        get(key: K) {
            return this.data[key as number];
        }

        has(key: K) {
            // tslint:disable-next-line:no-in-operator
            return (key as number) in this.data;
        }

        set(key: K, value: V) {
            this.data[key as number] = value;
        }

        forEach(action: (value: V, key: K) => void) {
            for (const key in this.data) {
                action(this.data[key], key as any as K);
            }
        }
    };

    export interface StringMapConstructor {
        new<T>(): Map<string, T>;
    }
    /** In runtimes without Maps, this is implemented using an object. */
    export const StringMap: StringMapConstructor = usingNativeMaps ? Map : class ShimStringMap<T> implements Map<string, T> {
        private data = createDictionaryModeObject<T>();

        constructor() {}

        clear() {
            this.data = createDictionaryModeObject<T>();
        }

        delete(key: string) {
            delete this.data[key];
        }

        get(key: string) {
            return this.data[key];
        }

        has(key: string) {
            // tslint:disable-next-line:no-in-operator
            return key in this.data;
        }

        set(key: string, value: T) {
            this.data[key] = value;
        }

        forEach(f: (value: T, key: string) => void) {
            for (const key in this.data) {
                f(this.data[key], key);
            }
        }
    };

    const createObject = Object.create;
    function createDictionaryModeObject<T>(): MapLike<T> {
        const map = createObject(null); // tslint:disable-line:no-null-keyword

        // Using 'delete' on an object causes V8 to put the object in dictionary mode.
        // This disables creation of hidden classes, which are expensive when an object is
        // constantly changing shape.
        map["__"] = undefined;
        delete map["__"];

        return map;
    }

    /** Iterates over entries in the map, returning the first output of `getResult` that is not `undefined`. */
    export const findInMap: <K, V, U>(map: Map<K, V>, getResult: (value: V, key: K) => U | undefined) => U | undefined = fullyFeaturedMaps
        ? <K, V, U>(map: FullyFeaturedMap<K, V>, f: (value: V, key: K) => U | undefined) => {
            const iter = map.entries();
            while (true) {
                const { value: pair, done } = iter.next();
                if (done) {
                    return undefined;
                }
                const [key, value] = pair;
                const result = f(value, key);
                if (result !== undefined) {
                    return result;
                }
            }
        }
        : <K, V, U>(map: Map<K, V>, f: (value: V, key: K) => U | undefined) => {
            let result: U | undefined;
            map.forEach((value, key) => {
                if (result === undefined)
                    result = f(value, key);
            });
            return result;
        };

    /** Whether `predicate` is true for at least one entry in the map. */
    export const someInMap: <K, V>(map: Map<K, V>, predicate: (value: V, key: K) => boolean) => boolean = fullyFeaturedMaps
        ? <K, V>(map: FullyFeaturedMap<K, V>, predicate: (value: V, key: K) => boolean) =>
            someInIterator(map.entries(), ([key, value]) => predicate(value, key))
        : <K, V>(map: Map<K, V>, predicate: (value: V, key: K) => boolean) => {
            let found = false;
            map.forEach((value, key) => {
                found = found || predicate(value, key);
            });
            return found;
        };

    /** Whether `predicate` is true for at least one key in the map. */
    export const someKeyInMap: <K>(map: Map<K, any>, predicate: (key: K) => boolean) => boolean = fullyFeaturedMaps
        ? <K>(map: FullyFeaturedMap<K, any>, predicate: (key: K) => boolean) => someInIterator(map.keys(), predicate)
        : <K>(map: Map<K, any>, predicate: (key: K) => boolean) =>
            someInMap(map, (_value, key) => predicate(key));

    /** Whether `predicate` is true for at least one value in the map. */
    export const someValueInMap: <T>(map: Map<any, T>, predicate: (value: T) => boolean) => boolean = fullyFeaturedMaps
        ? <T>(map: FullyFeaturedMap<any, T>, predicate: (value: T) => boolean) =>
            someInIterator(map.values(), predicate)
        : someInMap;

    function someInIterator<T>(iterator: Iterator<T>, predicate: (value: T) => boolean): boolean {
        while (true) {
            const { value, done } = iterator.next();
            if (done) {
                return false;
            }
            if (predicate(value)) {
                return true;
            }
        }
    }

    /**
     * Equivalent to the ES6 code:
     * `for (const key of map.keys()) action(key);`
     */
    export const forEachKeyInMap: <K>(map: Map<K, any>, action: (key: K) => void) => void = fullyFeaturedMaps
        ? <K>(map: FullyFeaturedMap<K, any>, f: (key: K) => void) => {
            const iter: Iterator<K> = map.keys();
            while (true) {
                const { value: key, done } = iter.next();
                if (done) {
                    return;
                }
                f(key);
            }
        }
        : <K>(map: Map<K, any>, action: (key: K) => void) => {
            map.forEach((_value, key) => action(key));
        };

    /** Size of a map. */
    export const mapSize: (map: Map<any, any>) => number = usingNativeMaps
        ? map => (map as any).size
        : map => {
            let size = 0;
            map.forEach(() => { size++; });
            return size;
        };

    /** Convert a Map to a MapLike. */
    export function mapLikeOfMap<T>(map: Map<string, T>): MapLike<T> {
        const obj = createDictionaryModeObject<T>();
        map.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    }

    /** Create a map from a MapLike. This is useful for writing large maps as object literals. */
    export function mapOfMapLike<T>(object: MapLike<T>): Map<string, T> {
        const map = new StringMap<T>();
        // Copies keys/values from template. Note that for..in will not throw if
        // template is undefined, and instead will just exit the loop.
        for (const key in object) if (hasProperty(object, key)) {
            map.set(key, object[key]);
        }
        return map;
    }

    class ShimStringSet implements Set<string> {
        private data = createDictionaryModeObject<true>();

        constructor() {}

        add(value: string) {
            this.data[value] = true;
        }

        clear() {
            this.data = createDictionaryModeObject<true>();
        }

        delete(value: string) {
            delete this.data[value];
        }

        forEach(action: (value: string) => void) {
            for (const value in this.data) {
                action(value);
            }
        }

        has(value: string) {
            // tslint:disable-next-line:no-in-operator
            return value in this.data;
        }

        isEmpty() {
            // tslint:disable-next-line:no-unused-variable
            for (const _ in this.data) {
                return false;
            }
            return true;
        }
    }

    declare const Set: { new(): Set<string> } | undefined;
    const usingNativeSets = typeof Set !== "undefined";

    /** In runtimes without Sets, this is implemented using an object. */
    export const StringSet: { new(): Set<string> } = usingNativeSets ? Set : ShimStringSet;

    /** False if there are any values in the set. */
    export const setIsEmpty: (set: Set<string>) => boolean = usingNativeSets
        ? set => (set as any).size === 0
        : (set: ShimStringSet) => set.isEmpty();
}

// Map utilities
namespace ts {
    /** Create a map containing a single entry key -> value. */
    export function createMapWithEntry<T>(key: string, value: T): Map<string, T> {
        const map = new StringMap<T>();
        map.set(key, value);
        return map;
    }

    /** Set a value in a map, then return that value. */
    export function setAndReturn<K, V>(map: Map<K, V>, key: K, value: V): V {
        map.set(key, value);
        return value;
    }

    /** False if there are any entries in the map. */
    export function mapIsEmpty(map: Map<any, any>): boolean {
        return !someKeyInMap(map, () => true);
    }

    /** Create a new copy of a Map. */
    export function cloneMap<T>(map: Map<string, T>) {
        const clone = new StringMap<T>();
        copyMapEntriesFromTo(map, clone);
        return clone;
    }

    /**
     * Performs a shallow copy of the properties from a source Map to a target Map
     *
     * @param source A map from which properties should be copied.
     * @param target A map to which properties should be copied.
     */
    export function copyMapEntriesFromTo<K, V>(source: Map<K, V>, target: Map<K, V>): void {
        source.forEach((value, key) => {
            target.set(key, value);
        });
    }

    /** Equivalent to `Array.from(map.keys())`. */
    export function keysOfMap<K>(map: Map<K, any>): K[] {
        const keys: K[] = [];
        forEachKeyInMap(map, key => { keys.push(key); });
        return keys;
    }

    /** Equivalent to `Array.from(map.values())`. */
    export function valuesOfMap<V>(map: Map<any, V>): V[] {
        const values: V[] = [];
        map.forEach((value) => { values.push(value); });
        return values;
    }

    /** Return a new map with each key transformed by `getNewKey`. */
    export function transformKeys<T>(map: Map<string, T>, getNewKey: (key: string) => string): Map<string, T> {
        const newMap = new StringMap<T>();
        map.forEach((value, key) => {
            newMap.set(getNewKey(key), value);
        });
        return newMap;
    }

    /** Replace each value with the result of calling `getNewValue`. */
    export function updateMapValues<V>(map: Map<any, V>, getNewValue: (value: V) => V): void {
        map.forEach((value, key) => {
            map.set(key, getNewValue(value));
        });
    }

    /**
     * Change the value at `key` by applying the given function to it.
     * If there is no value at `key` then `getNewValue` will be passed `undefined`.
     */
    export function modifyValue<K, V>(map: Map<K, V>, key: K, getNewValue: (value: V) => V) {
        map.set(key, getNewValue(map.get(key)));
    }

    /**
     * Get a value in the map, or if not already present, set and return it.
     * Treats entries set to `undefined` as equivalent to not being set (saving a call to `has`).
     */
    export function getOrUpdate<K, V>(map: Map<K, V>, key: K, getValue: (key: K) => V): V {
        const value = map.get(key);
        return value !== undefined ? value : setAndReturn(map, key, getValue(key));
    }

    /** Like `getOrUpdate`, but recognizes `undefined` as having been already set. */
    export function getOrUpdateAndAllowUndefined<K, V>(map: Map<K, V>, key: K, getValue: (key: K) => V): V {
        return map.has(key) ? map.get(key) : setAndReturn(map, key, getValue(key));
    }

    /**
     * Sets the the value if the key is not already in the map.
     * Returns whether the value was set.
     */
    export function setIfNotSet<K, V>(map: Map<K, V>, key: K, value: V): boolean {
        const shouldSet = !map.has(key);
        if (shouldSet) {
            map.set(key, value);
        }
        return shouldSet;
    }

    /** Deletes an entry from a map and returns it; or returns undefined if the key was not in the map. */
    export function tryDelete<K, V>(map: Map<K, V>, key: K): V | undefined {
        const current = map.get(key);
        if (current !== undefined) {
            map.delete(key);
            return current;
        }
        else {
            return undefined;
        }
    }

    /**
     * Creates a map from the elements of an array.
     *
     * @param array the array of input elements.
     * @param makeKey a function that produces a key for a given element.
     *
     * This function makes no effort to avoid collisions; if any two elements produce
     * the same key with the given 'makeKey' function, then the element with the higher
     * index in the array will be the one associated with the produced key.
     */
    export function arrayToMap<T>(array: T[], makeKey: (value: T) => string): Map<string, T>;
    export function arrayToMap<T, U>(array: T[], makeKey: (value: T) => string, makeValue: (value: T) => U): Map<string, U>;
    export function arrayToMap<T, U>(array: T[], makeKey: (value: T) => string, makeValue?: (value: T) => U): Map<string, T | U> {
        const result = new StringMap<T | U>();
        for (const value of array) {
            result.set(makeKey(value), makeValue ? makeValue(value) : value);
        }
        return result;
    }

    /**
     * Adds the value to an array of values associated with the key, and returns the array.
     * Creates the array if it does not already exist.
     */
    export function multiMapAdd<K, V>(map: Map<K, V[]>, key: K, value: V): V[] {
        const values = map.get(key);
        if (values) {
            values.push(value);
            return values;
        }
        else {
            return setAndReturn(map, key, [value]);
        }
    }

    /**
     * Removes a value from an array of values associated with the key.
     * Does not preserve the order of those values.
     * Does nothing if `key` is not in `map`, or `value` is not in `map[key]`.
     */
    export function multiMapRemove<K, V>(map: Map<K, V[]>, key: K, value: V): void {
        const values = map.get(key);
        if (values) {
            unorderedRemoveItem(values, value);
            if (!values.length) {
                map.delete(key);
            }
        }
    }

    /** True if the maps have the same keys and values. */
    export function mapsAreEqual<K, V>(left: Map<K, V>, right: Map<K, V>, valuesAreEqual?: (left: V, right: V) => boolean): boolean {
        if (left === right) return true;
        if (!left || !right) return false;
        const someInLeftHasNoMatch = someInMap(left, (leftValue, leftKey) => {
            if (!right.has(leftKey)) return true;
            const rightValue = right.get(leftKey);
            return !(valuesAreEqual ? valuesAreEqual(leftValue, rightValue) : leftValue === rightValue);
        });
        if (someInLeftHasNoMatch) return false;
        const someInRightHasNoMatch = someKeyInMap(right, rightKey => !left.has(rightKey));
        return !someInRightHasNoMatch;
    }

    /**
     * Creates a sorted array of keys.
     * Sorts keys according to the iteration order they would have if they were in an object, instead of from a Map.
     * This is so that tests run consistently whether or not we have a Map shim in place.
     * The difference between Map iteration order and V8 object insertion order is that V8 moves natrual-number-like keys to the front.
     */
    export function sortInV8ObjectInsertionOrder<T>(values: T[], toKey: (t: T) => string): T[] {
        const naturalNumberKeys: T[] = [];
        const allOtherKeys: T[] = [];
        for (const value of values) {
            // "0" looks like a natural but "08" doesn't.
            const looksLikeNatural = /^(0|([1-9]\d*))$/.test(toKey(value));
            (looksLikeNatural ? naturalNumberKeys : allOtherKeys).push(value);
        }
        function toInt(value: T): number {
            return parseInt(toKey(value), 10);
        }
        naturalNumberKeys.sort((a, b) => toInt(a) - toInt(b));
        return naturalNumberKeys.concat(allOtherKeys);
    }
}

// Set utilities
/* @internal */
namespace ts {
    /** Union of the `getSet` of each element in the array. */
    export function setAggregate<T>(array: T[], getSet: (t: T) => Set<string>): Set<string> {
        const result = new StringSet();
        for (const value of array) {
            copySetValuesFromTo(getSet(value), result);
        }
        return result;
    }

    /** Adds all values in `source` to `target`. */
    function copySetValuesFromTo<T>(source: Set<T>, target: Set<T>): void {
        source.forEach(value => target.add(value));
    }

    /** Returns the values in `set` satisfying `predicate`. */
    export function filterSetToArray<T>(set: Set<T>, predicate: (value: T) => boolean): T[] {
        const result: T[] = [];
        set.forEach(value => {
            if (predicate(value)) {
                result.push(value);
            }
        });
        return result;
    }
}

// MapLike utilities
/* @internal */
namespace ts {
    const hasOwnProperty = Object.prototype.hasOwnProperty;

    export function clone<T>(object: T): T {
        const result: any = {};
        for (const id in object) {
            if (hasOwnProperty.call(object, id)) {
                result[id] = (<any>object)[id];
            }
        }
        return result;
    }

    /**
     * Indicates whether a map-like contains an own property with the specified key.
     *
     * NOTE: This is intended for use only with MapLike<T> objects. For Map<T> objects, use
     *       the 'in' operator.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function hasProperty<T>(map: MapLike<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    /**
     * Gets the value of an owned property in a map-like.
     *
     * NOTE: This is intended for use only with MapLike<T> objects. For Map<T> objects, use
     *       an indexer.
     *
     * @param map A map-like.
     * @param key A property key.
     */
    export function getProperty<T>(map: MapLike<T>, key: string): T | undefined {
        return hasOwnProperty.call(map, key) ? map[key] : undefined;
    }

    /**
     * Gets the owned, enumerable property keys of a map-like.
     *
     * NOTE: This is intended for use with MapLike<T> objects. For Map<T> objects, use
     *       Object.keys instead as it offers better performance.
     *
     * @param map A map-like.
     */
    export function getOwnKeys<T>(map: MapLike<T>): string[] {
        const keys: string[] = [];
        for (const key in map) if (hasOwnProperty.call(map, key)) {
            keys.push(key);
        }
        return keys;
    }

    export function assign<T1 extends MapLike<{}>, T2, T3>(t: T1, arg1: T2, arg2: T3): T1 & T2 & T3;
    export function assign<T1 extends MapLike<{}>, T2>(t: T1, arg1: T2): T1 & T2;
    export function assign<T1 extends MapLike<{}>>(t: T1, ...args: any[]): any;
    export function assign<T1 extends MapLike<{}>>(t: T1, ...args: any[]) {
        for (const arg of args) {
            for (const p of getOwnKeys(arg)) {
                t[p] = arg[p];
            }
        }
        return t;
    }

    /**
     * Reduce the properties defined on a map-like (but not from its prototype chain).
     *
     * @param map The map-like to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    export function reduceOwnProperties<T, U>(map: MapLike<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        for (const key in map) if (hasOwnProperty.call(map, key)) {
            result = callback(result, map[key], String(key));
        }
        return result;
    }

    /**
     * Performs a shallow equality comparison of the contents of two map-likes.
     *
     * @param left A map-like whose properties should be compared.
     * @param right A map-like whose properties should be compared.
     */
    export function equalOwnProperties<T>(left: MapLike<T>, right: MapLike<T>, equalityComparer?: (left: T, right: T) => boolean) {
        if (left === right) return true;
        if (!left || !right) return false;
        for (const key in left) if (hasOwnProperty.call(left, key)) {
            if (!hasOwnProperty.call(right, key) === undefined) return false;
            if (equalityComparer ? !equalityComparer(left[key], right[key]) : left[key] !== right[key]) return false;
        }
        for (const key in right) if (hasOwnProperty.call(right, key)) {
            if (!hasOwnProperty.call(left, key)) return false;
        }
        return true;
    }

    export function extend<T1, T2>(first: T1 , second: T2): T1 & T2 {
        const result: T1 & T2 = <any>{};
        for (const id in second) if (hasOwnProperty.call(second, id)) {
            (result as any)[id] = (second as any)[id];
        }
        for (const id in first) if (hasOwnProperty.call(first, id)) {
            (result as any)[id] = (first as any)[id];
        }
        return result;
    }
}
