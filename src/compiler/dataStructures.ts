// Map
namespace ts {
    export interface MapCommon<K, V> {
        /** Removes all entries. */
        clear(): void;
        /** Removes the entry with the given key. */
        delete(key: K): void;
        /** Gets the value associated with a key. */
        get(key: K): V | undefined;
        /** Whether any entry in the map has the given key. */
        has(key: K): boolean;
        /** Associate a value with a key. */
        set(key: K, value: V): void;
    }

    /** String-keyed Map. */
    export interface SMap<V> extends MapCommon<string, V> {
        /**
         * Iterate over all entries in the map
         * For halting iteration, see `findInMap`.
         */
        forEach(fn: (value: V, key: string) => void): void;
    }
    export interface SMapConstructor {
        new(): SMap<any>;
        /** Map whose entries are the given [key, value] pairs. */
        new<V>(entries?: [string, V][]): SMap<V>;
        /** Clone another map. */
        new<V>(otherMap: SMap<V>): SMap<V>;
    }

    /** Number-keyed Map. */
    export interface NMap<V> extends MapCommon<number, V> {}
    export interface NMapConstructor {
        new(): NMap<any>;
        new<V>(entries?: [number, V][]): NMap<V>;
    }

    abstract class ShimMapCommon<K extends any, V> implements MapCommon<K, V> {
        protected data: any; // ObjMap<V> | V[]

        abstract clear(): void;

        delete(key: K) {
            delete this.data[<any>key];
        }

        get(key: K) {
            return this.has(key) ? this.data[<any>key] : undefined;
        }

        has(key: K) {
            return hasProperty(this.data, <any>key);
        }

        set(key: K, value: V) {
            this.data[<any>key] = value;
        }
    }

    /** Implementation of Map for JS engines that don't natively support it. */
    class ShimSMap<V> extends ShimMapCommon<string, V> implements SMap<V> {
        data: ObjMap<V>;

        constructor(entries?: [string, V][]);
        constructor(otherMap: SMap<V>);
        constructor(argument?: any) {
            super();
            this.data = {};

            if (argument !== undefined) {
                if (argument instanceof ShimSMap) {
                    this.data = clone(argument.data);
                }
                else {
                    Debug.assert(argument instanceof Array);
                    for (const [key, value] of argument) {
                        this.set(key, value);
                    }
                }
            }
        }

        clear() {
            this.data = {};
        }

        forEach(fn: (value: V, index: string) => void) {
            for (const key in this.data) {
                if (this.has(key)) {
                    fn(this.data[key], key);
                }
            }
        }

        // Support this directly instead of emulating an iterator, which is slow.
        find<U>(fn: (value: V, key: string) => U | undefined): U | undefined {
            for (const key in this.data) {
                if (this.has(key)) {
                    const result = fn(this.data[key], key);
                    if (result) {
                        return result;
                    }
                }
            }
        }
    }

    /** Implementation of Map for JS engines that don't natively support it. */
    class ShimNMap<V> extends ShimMapCommon<number, V> implements NMap<V> {
        data: V[];

        constructor(entries?: [number, V][]) {
            super();
            this.data = [];
            if (entries) {
                for (const [key, value] of entries) {
                    this.set(key, value);
                }
            }
        }

        clear() {
            this.data = [];
        }
    }

    declare const Map: (SMapConstructor & NMapConstructor) | undefined;
    export const SMap: SMapConstructor = Map ? Map : ShimSMap;
    export const NMap: NMapConstructor = Map ? Map : ShimNMap;

    /** Number of (key, value) pairs in a map. */
    export function mapSize<V>(map: SMap<V>): number {
        if (map instanceof Map) {
            // For native maps, this is available as a property.
            return (<any>map).size;
        }
        else {
            let size = 0;
            map.forEach(() => size++);
            return size;
        }
    }

    /** Iterate through a map, returning the first truthy value returned by `fn`, or undefined. */
    export function findInMap<V, U>(map: SMap<V>, fn: (value: V, key: string) => U | undefined): U | undefined {
        if (map instanceof Map) {
            // Using an iterator and testing for `done` performs better than using forEach() and throwing an exception.
            let iter: { next(): { value: [string, V], done: boolean } } = (<any>map).entries();
            for (;;) {
                const { value: pair, done } = iter.next();
                if (done) {
                    return;
                }
                const [key, value] = pair;
                const result = fn(value, key);
                if (result) {
                    return result;
                }
            }
        }
        else {
            return (<ShimSMap<V>>map).find(fn);
        }
    }

    /** Iterate over every key. */
    export function forEachKeyInMap<V>(map: SMap<V>, callback: (key: string) => void): void {
        map.forEach((_, key) => callback(key));
    }

    /** Copy all entries from `source` to `target`, overwriting any already existing. */
    export function copyMap<V>(source: SMap<V>, target: SMap<V>): void {
        source.forEach((value, key) => {
            target.set(key, value);
        });
    }

    /** Array of all keys in a map. */
    export function keysArray<V>(map: SMap<V>): string[] {
        const keys: string[] = [];
        forEachKeyInMap(map, key => keys.push(key));
        return keys;
    }

    /** Array of all values in a map. */
    export function valuesArray<K, V>(map: SMap<V>): V[] {
        const values: V[] = [];
        map.forEach(value => values.push(value));
        return values;
    }

    /** Set `map.get(key) === value`, and return `value`. */
    export function setAndReturn<K, V>(map: MapCommon<K, V>, key: K, value: V): V {
        map.set(key, value);
        return value;
    }

    /** Like `getOrUpdateMap` but does not return a value. */
    export function setButDontOverride<K, V>(map: MapCommon<K, V>, key: K, getValue: () => V): void {
        if (!map.has(key)) {
            map.set(key, getValue());
        }
    }

    /** Sets `map.get(key) === getValue()` unless `map.get(key)` was already defined. */
    export function getOrUpdateMap<K, V>(map: MapCommon<K, V>, key: K, getValue: () => V): V {
        const value = map.get(key);
        if (value === undefined) {
            const value = getValue();
            map.set(key, value);
            return value;
        }
        else {
            return value;
        }
    }

    /** True iff the predicate is true for some entry in the map. */
    export function someInMap<V>(map: SMap<V>, predicate: (value: V, key: string) => boolean): boolean {
        return !!findInMap(map, predicate);
    }

    /** True iff the predicate is true for every entry in the map. */
    export function allInMap<V>(map: SMap<V>, predicate: (value: V, key: string) => boolean): boolean {
        return !findInMap(map, (value, key) => !predicate(value, key));
    }

    /** Array of every *defined* result of `mapAndFilter(value, key)`, called on each entry in the map. */
    export function mapAndFilterMap<V, U>(map: SMap<V>, mapAndFilter: (value: V, key: string) => U | undefined): U[] {
        const result: U[] = [];
        map.forEach((value, key) => {
            const entry = mapAndFilter(value, key);
            if (entry !== undefined) {
                result.push(entry);
            }
        });
        return result;
    }

    /**
     * Adds the value to an array of values associated with the key, and return the array.
     * Creates the array if it does not already exist.
     */
    export function multiMapAdd<K, V>(map: MapCommon<K, V[]>, key: K, value: V): V[] {
        const values = map.get(key);
        if (values) {
            values.push(value);
            return values;
        }
        else {
            return setAndReturn(map, key, [value]);
        }
    }

    /** Creates a map with the given keys and values for each entry in `inputs`. */
    export function createMapFromArray<A, K, V>(inputs: A[], getKey: (element: A) => string, getValue: (element: A) => V): SMap<V> {
        const result = new SMap<V>();
        for (const input of inputs) {
            result.set(getKey(input), getValue(input));
        }
        return result;
    }

    /** Map whose keys are `keys` and whose values are the results of `getValue`. */
    export function createMapFromKeys<V>(keys: string[], getValue: (key: string) => V): SMap<V> {
        return createMapFromArray(keys, key => key, getValue);
    }

    /**
     * Map whose values are `values` and whose keys are the results of `getKey`.
     * `getKey` must not return the same key twice.
     */
    export function createMapFromValues<V>(values: V[], getKey: (value: V) => string): SMap<V> {
        return createMapFromArray(values, getKey, value => value);
    }

    /** Modifies every value in the map by replacing it with the result of `getNewValue`. */
    export function mapValues<V>(map: SMap<V>, getNewValue: (value: V) => V): void {
        map.forEach((value, key) => {
            map.set(key, getNewValue(value));
        });
    }

    /** Map of a single entry. */
    export function singletonMap<V>(key: string, value: V): SMap<V> {
        return new SMap([[key, value]]);
    }
}

// Set
namespace ts {
    export interface SSet {
        /** Add a value if it's not already present. */
        add(value: string): void;
        /** Remove a value. */
        delete(value: string): void;
        /** Run `fn` on every value in the set. */
        forEach(fn: (value: string) => void): void;
        /** Whether the value is in the set. */
        has(value: string): boolean;
    }
    export interface SSetConstructor {
        new(values?: string[]): SSet;
    }

    class ShimSSet implements SSet {
        data: ObjMap<boolean>;

        constructor(values?: string[]) {
            this.data = {};
        }

        add(value: string) {
            this.data[value] = true;
        }

        delete(value: string) {
            delete this.data[value];
        }

        forEach(fn: (value: string) => void) {
            forEachKey(this.data, fn);
        }

        has(value: string) {
            return hasProperty(this.data, value);
        }

        isEmpty(): boolean {
            for (const key in this.data) {
                if (this.has(key)) {
                    return false;
                }
            }
            return true;
        }
    }

    declare const Set: SSetConstructor | undefined;
    export const SSet: SSetConstructor = Set ? Set : ShimSSet;

    /** False iff there are any values in the set. */
    export function setIsEmpty(set: SSet): boolean {
        if (set instanceof Set) {
            return !(<any>set).size;
        }
        else {
            (<ShimSSet>set).isEmpty();
        }
    }

    /** Add every value in `source` to `target`. */
    export function copySet<T>(source: SSet, target: SSet): void {
        source.forEach(element => target.add(element));
    }

    /** If `shouldBeInSet`, put `value` into the set; otherwise, remove it. */
    export function addOrDelete(set: SSet, value: string, shouldBeInSet: boolean): void {
        if (shouldBeInSet) {
            set.add(value);
        }
        else {
            set.delete(value);
        }
    }
}

// ObjMap
namespace ts {
    export interface ObjMap<T> {
        [index: string]: T;
    }

    /**
     * Reduce the properties of a map.
     *
     * @param map The map to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    export function reduceProperties<T, U>(map: ObjMap<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        if (map) {
            for (const key in map) {
                if (hasProperty(map, key)) {
                    result = callback(result, map[key], String(key));
                }
            }
        }

        return result;
    }

    /** Convert an ObjMap to an SMap. */
    export function smapOfObjMap<V>(objMap: ObjMap<V>): SMap<V> {
        const result = new SMap<V>();
        for (const key in objMap) {
            if (hasProperty(objMap, key)) {
                result.set(key, objMap[key]);
            }
        }
        return result;
    }

    export function forEachValueAndKey<T>(map: ObjMap<T>, callback: (value: T, key: string) => void): void {
        for (const id in map) {
            if (hasProperty(map, id)) {
                callback(map[id], id);
            }
        }
    }

    export function forEachKey<T, U>(map: ObjMap<T>, callback: (key: string) => U): U {
        let result: U;
        for (const id in map) {
            if (result = callback(id)) break;
        }
        return result;
    }

    export function forEachValue<T, U>(map: ObjMap<T>, callback: (value: T) => U): U {
        let result: U;
        for (const id in map) {
            if (result = callback(map[id])) break;
        }
        return result;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    export function hasProperty<T>(map: ObjMap<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    export function getKeys<T>(map: ObjMap<T>): string[] {
        const keys: string[] = [];
        for (const key in map) {
            keys.push(key);
        }
        return keys;
    }

    export function getProperty<T>(map: ObjMap<T>, key: string): T {
        return hasProperty(map, key) ? map[key] : undefined;
    }

    export function isEmpty<T>(map: ObjMap<T>) {
        for (const id in map) {
            if (hasProperty(map, id)) {
                return false;
            }
        }
        return true;
    }

    export function clone<T>(object: T): T {
        const result: any = {};
        for (const id in object) {
            result[id] = (<any>object)[id];
        }
        return <T>result;
    }

    export function extend<T1 extends ObjMap<{}>, T2 extends ObjMap<{}>>(first: T1 , second: T2): T1 & T2 {
        const result: T1 & T2 = <any>{};
        for (const id in first) {
            (result as any)[id] = first[id];
        }
        for (const id in second) {
            if (!hasProperty(result, id)) {
                (result as any)[id] = second[id];
            }
        }
        return result;
    }

    export function objMapIsEqualTo<T>(map1: ObjMap<T>, map2: ObjMap<T>): boolean {
        if (!map1 || !map2) {
            return map1 === map2;
        }
        return containsAll(map1, map2) && containsAll(map2, map1);
    }

    function containsAll<T>(map: ObjMap<T>, other: ObjMap<T>): boolean {
        for (const key in map) { //ts.forEach...
            if (!hasProperty(map, key)) {
                continue;
            }
            if (!hasProperty(other, key) || map[key] !== other[key]) {
                return false;
            }
        }
        return true;
    }
}

// Array
namespace ts {
    /**
     * Tests whether a value is an array.
     */
    export function isArray(value: any): value is any[] {
        return Array.isArray ? Array.isArray(value) : value instanceof Array;
    }

    /**
     * Iterates through 'array' by index and performs the callback on each element of array until the callback
     * returns a truthy value, then returns that value.
     * If no such value is found, the callback is applied to each element of array and undefined is returned.
     */
    export function forEach<T, U>(array: T[], callback: (element: T, index: number) => U): U {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                const result = callback(array[i], i);
                if (result) {
                    return result;
                }
            }
        }
        return undefined;
    }

    export function contains<T>(array: T[], value: T): boolean {
        if (array) {
            for (const v of array) {
                if (v === value) {
                    return true;
                }
            }
        }
        return false;
    }

    export function indexOf<T>(array: T[], value: T): number {
        if (array) {
            for (let i = 0, len = array.length; i < len; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
        }
        return -1;
    }

    export function countWhere<T>(array: T[], predicate: (x: T) => boolean): number {
        let count = 0;
        if (array) {
            for (const v of array) {
                if (predicate(v)) {
                    count++;
                }
            }
        }
        return count;
    }

    export function filter<T>(array: T[], f: (x: T) => boolean): T[] {
        let result: T[];
        if (array) {
            result = [];
            for (const item of array) {
                if (f(item)) {
                    result.push(item);
                }
            }
        }
        return result;
    }

    export function filterMutate<T>(array: T[], f: (x: T) => boolean): void {
        let outIndex = 0;
        for (const item of array) {
            if (f(item)) {
                array[outIndex] = item;
                outIndex++;
            }
        }
        array.length = outIndex;
    }

    export function map<T, U>(array: T[], f: (x: T) => U): U[] {
        let result: U[];
        if (array) {
            result = [];
            for (const v of array) {
                result.push(f(v));
            }
        }
        return result;
    }

    export function concatenate<T>(array1: T[], array2: T[]): T[] {
        if (!array2 || !array2.length) return array1;
        if (!array1 || !array1.length) return array2;

        return array1.concat(array2);
    }

    export function deduplicate<T>(array: T[], areEqual?: (a: T, b: T) => boolean): T[] {
        let result: T[];
        if (array) {
            result = [];
            loop: for (const item of array) {
                for (const res of result) {
                    if (areEqual ? areEqual(res, item) : res === item) {
                        continue loop;
                    }
                }
                result.push(item);
            }
        }
        return result;
    }

    export function sum(array: any[], prop: string): number {
        let result = 0;
        for (const v of array) {
            result += v[prop];
        }
        return result;
    }

    export function addRange<T>(to: T[], from: T[]): void {
        if (to && from) {
            for (const v of from) {
                to.push(v);
            }
        }
    }

    export function rangeEquals<T>(array1: T[], array2: T[], pos: number, end: number) {
        while (pos < end) {
            if (array1[pos] !== array2[pos]) {
                return false;
            }
            pos++;
        }
        return true;
    }

    /**
     * Returns the last element of an array if non-empty, undefined otherwise.
     */
    export function lastOrUndefined<T>(array: T[]): T {
        if (array.length === 0) {
            return undefined;
        }

        return array[array.length - 1];
    }

    /**
     * Performs a binary search, finding the index at which 'value' occurs in 'array'.
     * If no such index is found, returns the 2's-complement of first index at which
     * number[index] exceeds number.
     * @param array A sorted array whose first element must be no larger than number
     * @param number The value to be searched for in the array.
     */
    export function binarySearch(array: number[], value: number): number {
        let low = 0;
        let high = array.length - 1;

        while (low <= high) {
            const middle = low + ((high - low) >> 1);
            const midValue = array[middle];

            if (midValue === value) {
                return middle;
            }
            else if (midValue > value) {
                high = middle - 1;
            }
            else {
                low = middle + 1;
            }
        }

        return ~low;
    }

    export function reduceLeft<T>(array: T[], f: (a: T, x: T) => T): T;
    export function reduceLeft<T, U>(array: T[], f: (a: U, x: T) => U, initial: U): U;
    export function reduceLeft<T, U>(array: T[], f: (a: U, x: T) => U, initial?: U): U {
        if (array) {
            const count = array.length;
            if (count > 0) {
                let pos = 0;
                let result: T | U;
                if (arguments.length <= 2) {
                    result = array[pos];
                    pos++;
                }
                else {
                    result = initial;
                }
                while (pos < count) {
                    result = f(<U>result, array[pos]);
                    pos++;
                }
                return <U>result;
            }
        }
        return initial;
    }

    export function reduceRight<T>(array: T[], f: (a: T, x: T) => T): T;
    export function reduceRight<T, U>(array: T[], f: (a: U, x: T) => U, initial: U): U;
    export function reduceRight<T, U>(array: T[], f: (a: U, x: T) => U, initial?: U): U {
        if (array) {
            let pos = array.length - 1;
            if (pos >= 0) {
                let result: T | U;
                if (arguments.length <= 2) {
                    result = array[pos];
                    pos--;
                }
                else {
                    result = initial;
                }
                while (pos >= 0) {
                    result = f(<U>result, array[pos]);
                    pos--;
                }
                return <U>result;
            }
        }
        return initial;
    }

    export function arrayIsEqualTo<T>(array1: T[], array2: T[], equaler?: (a: T, b: T) => boolean): boolean {
        if (!array1 || !array2) {
            return array1 === array2;
        }

        if (array1.length !== array2.length) {
            return false;
        }

        for (let i = 0; i < array1.length; i++) {
            const equals = equaler ? equaler(array1[i], array2[i]) : array1[i] === array2[i];
            if (!equals) {
                return false;
            }
        }

        return true;
    }
}
