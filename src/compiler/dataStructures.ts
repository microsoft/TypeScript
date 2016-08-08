//TODO: document this file
//and review everything in it.

// Map
namespace ts {
    export interface MapCommon<K, V> {
        clear(): void;
        delete(key: K): void;
        get(key: K): V | undefined;
        has(key: K): boolean;
        set(key: K, value: V): void;
    }

    /** String-keyed Map. */
    export interface SMap<V> extends MapCommon<string, V> {
        forEach(fn: (value: V, key: string) => void): void;
    }
    export interface SMapConstructor {
        new(): SMap<any>;
        new<V>(entries?: [string, V][]): SMap<V>;
        new<V>(otherMap: SMap<V>): SMap<V>;
    }

    /** Number-keyed Map. */
    export interface NMap<V> extends MapCommon<number, V> {}
    export interface NMapConstructor {
        new(): NMap<any>;
        new<V>(entries?: [number, V][]): NMap<V>;
    }

    abstract class ShimMapCommon<K extends any, V> implements MapCommon<K, V> {
        protected data: any; //ObjMap<V> | V[]

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
            if (argument === undefined) {
                return;
            }

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
            return (<any> map).size;
        }
        else {
            let size = 0;
            map.forEach(() => size++);
            return size;
        }
    }

    //TODO: better name...
    const findInMapDone = {};
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

            //kill, old:
            /*let result: U | undefined;
            try {
                //TODO: perf
                map.forEach((value, key) => {
                    result = fn(value, key);
                    if (result) {
                        throw findInMapDone;
                    }
                });
            } catch (error) {
                if (error === findInMapDone) {
                    return result;
                }
                else {
                    throw error;
                }
            }*/
        }
        else {
            (<ShimSMap<V>>map).find(fn);
        }
    }

    //rename
    export function forEachKeyInMap<V>(map: SMap<V>, callback: (key: string) => void): void {
        map.forEach((_, key) => callback(key));
    }

    //rename
    export function copyNewMap<V>(source: SMap<V>, target: SMap<V>): void {
        //This is probably duplicate code
        source.forEach((value, key) => {
            target.set(key, value);
        });
    }

    //rename, or kill?
    export function reducePropertiesForMap<V, U>(map: SMap<V>, callback: (aggregate: U, value: V, key: string) => U, initial: U): U {
        let result = initial;
        if (map) {
            map.forEach((value, key) => {
                result = callback(result, value, key);
            })
        }
        return result;
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

    //TODO:USE!
    export function setAndReturn<K, V>(map: MapCommon<K, V>, key: K, value: V): V {
        map.set(key, value);
        return value;
    }

    //TODO: may be simpler without using this function.
    export function setIfNotAlreadyPresent<K, V>(map: MapCommon<K, V>, key: K, getValue: () => V): void {
        if (!map.has(key)) {
            map.set(key, getValue());
        }
    }

    //kill?
    export function someInMap<V>(map: SMap<V>, predicate: (value: V, key: string) => boolean): boolean {
        return !!findInMap(map, predicate);
    }

    export function allInMap<V>(map: SMap<V>, predicate: (value: V, key: string) => boolean): boolean {
        return !findInMap(map, predicate);
    }

    //kill?
    export function mapAndFilterMap<V, U>(map: SMap<V>, f: (value: V, key: string) => U | undefined): U[] {
        const result: U[] = [];
        map.forEach((value, key) => {
            const entry = f(value, key);
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

    //TODO: probably want to get rid of this...
    export function createMapFromArray<A, K, V>(inputs: A[], getKey: (element: A) => string, getValue: (element: A) => V): SMap<V> {
        const result = new SMap<V>();
        for (const input of inputs) {
            result.set(getKey(input), getValue(input));
        }
        return result;
    }

    export function createMapFromKeys<V>(keys: string[], getValue: (key: string) => V): SMap<V> {
        return createMapFromArray(keys, key => key, getValue);
    }

    /**
     * Creates a map with the given values and keys from `getKey`.
     * `getKey` must not return the same key twice.
     */
    export function createMapFromValues<V>(values: V[], getKey: (value: V) => string): SMap<V> {
        return createMapFromArray(values, getKey, value => value);
    }

    export function mapValues<V>(map: SMap<V>, getNewValue: (value: V) => V): void {
        map.forEach((value, key) => {
            map.set(key, getNewValue(value));
        })
    }

    //move
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

    export function singletonMap<V>(key: string, value: V): SMap<V> {
        return new SMap([[key, value]]);
    }

    export function cloneMap<V>(map: SMap<V>): SMap<V> {
        return new SMap(map);
    }
}

// Set
namespace ts {
    export interface SSet {
        add(value: string): void;
        delete(value: string): void;
        forEach(fn: (value: string) => void): void;
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
     * Creates a map from the elements of an array.
     *
     * @param array the array of input elements.
     * @param makeKey a function that produces a key for a given element.
     *
     * This function makes no effort to avoid collisions; if any two elements produce
     * the same key with the given 'makeKey' function, then the element with the higher
     * index in the array will be the one associated with the produced key.
     */
    //rename, kill?
    export function arrayToMap<T>(array: T[], makeKey: (value: T) => string): ObjMap<T> {
        const result: ObjMap<T> = {};

        forEach(array, value => {
            result[makeKey(value)] = value;
        });

        return result;
    }

    /**
     * Reduce the properties of a map.
     *
     * @param map The map to reduce
     * @param callback An aggregation function that is called for each entry in the map
     * @param initial The initial value for the reduction.
     */
    //kill?
    export function reduceProperties<T, U>(map: ObjMap<T>, callback: (aggregate: U, value: T, key: string) => U, initial: U): U {
        let result = initial;
        if (map) {
            for (const key in map) { //ts.forEach...
                if (hasProperty(map, key)) {
                    result = callback(result, map[key], String(key));
                }
            }
        }

        return result;
    }

    //kill?
    export function mapOfObjMap<V>(objMap: ObjMap<V>): SMap<V> {
        const result = new SMap<V>();
        for (const key in objMap) { //ts.forEach...
            if (hasProperty(objMap, key)) {
                result.set(key, objMap[key]);
            }
        }
        return result;
    }

    //kill?
    export function forEachKey<T, U>(map: ObjMap<T>, callback: (key: string) => U): U {
        let result: U;
        for (const id in map) { //ts.forEach...
            if (result = callback(id)) break;
        }
        return result;
    }

    export function forEachValue<T, U>(map: ObjMap<T>, callback: (value: T) => U): U {
        let result: U;
        for (const id in map) { //ts.forEach...
            if (result = callback(map[id])) break;
        }
        return result;
    }

    const hasOwnProperty = Object.prototype.hasOwnProperty;

    //kill?
    export function hasProperty<T>(map: ObjMap<T>, key: string): boolean {
        return hasOwnProperty.call(map, key);
    }

    //kill?
    export function getKeys<T>(map: ObjMap<T>): string[] {
        const keys: string[] = [];
        for (const key in map) { //ts.forEach...
            keys.push(key);
        }
        return keys;
    }

    //kill?
    export function getProperty<T>(map: ObjMap<T>, key: string): T {
        return hasProperty(map, key) ? map[key] : undefined;
    }

    //todo: kill
    export function isEmpty<T>(map: ObjMap<T>) {
        for (const id in map) { //ts.forEach...
            if (hasProperty(map, id)) {
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
}
