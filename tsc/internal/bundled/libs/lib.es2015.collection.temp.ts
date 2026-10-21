/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABILITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */


interface Map<K, V> {
    /**
     * Removes all elements from the Map.
     */
    clear(): void;
    /**
     * @returns true if an element in the Map existed and has been removed, or false if the element does not exist.
     */
    delete(key: K): boolean;
    /**
     * Executes a provided function once per each key/value pair in the Map, in insertion order.
     */
    forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void;
    /**
     * Returns a specified element from the Map object. If the value that is associated to the provided key is an object, then you will get a reference to that object and any change made to that object will effectively modify it inside the Map.
     * @returns Returns the element associated with the specified key. If no element is associated with the specified key, undefined is returned.
     */
    get(key: K): V | undefined;
    /**
     * @returns boolean indicating whether an element with the specified key exists or not.
     */
    has(key: K): boolean;
    /**
     * Adds a new element with a specified key and value to the Map. If an element with the same key already exists, the element will be updated.
     */
    set(key: K, value: V): this;
    /**
     * @returns the number of elements in the Map.
     */
    readonly size: number;
}

interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(entries?: readonly (readonly [K, V])[] | null): Map<K, V>;
    new <KVEntries extends readonly (readonly [any, any])[]>(entries?: KVEntries | null): Map<KVEntries[number][0], KVEntries[number][1]>;
    readonly prototype: Map<any, any>;
}
declare var Map: MapConstructor;

export const x = new Map([]);

// https://github.com/microsoft/TypeScript/issues/37527#issuecomment-628802102
export const sample: Map<number | string, number> = new Map([[1, 1], ["yes", 1]]); // errors

// https://github.com/microsoft/TypeScript/issues/37527#issuecomment-750412755
function test(_a: Map<string | number, boolean>) {}
test(new Map([["test" ,true] ,[1 ,false]]))

interface MapIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
    [Symbol.iterator](): MapIterator<T>;
}

interface Map<K, V> {
    /** Returns an iterable of entries in the map. */
    [Symbol.iterator](): MapIterator<[K, V]>;

    /**
     * Returns an iterable of key, value pairs for every entry in the map.
     */
    entries(): MapIterator<[K, V]>;

    /**
     * Returns an iterable of keys in the map
     */
    keys(): MapIterator<K>;

    /**
     * Returns an iterable of values in the map
     */
    values(): MapIterator<V>;
}

// https://github.com/microsoft/TypeScript/issues/33611#issue-498858215
export const M1 = new Map([ ['k', {a: 1, b: 'asd'}], ['k', {a: 2, b: 'asd'}] ]);
export const M2 = new Map([ ...M1, ['k', {a: 1}] ]);

// https://github.com/microsoft/TypeScript/blob/d61a7d235906e78be9b111de0ba060e28e67ecfa/tsc/testdata/tests/cases/compiler/inferFromGenericFunctionReturnTypes3.ts#L88
export function objectToMap(obj: any) {
	return new Map(Object.keys(obj).map(key => [key, obj[key]]));
};

interface ReadonlyMap<K, V> {
    forEach(callbackfn: (value: V, key: K, map: ReadonlyMap<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    readonly size: number;
}

interface WeakMap<K extends WeakKey, V> {
    /**
     * Removes the specified element from the WeakMap.
     * @returns true if the element was successfully removed, or false if it was not present.
     */
    delete(key: K): boolean;
    /**
     * @returns a specified element.
     */
    get(key: K): V | undefined;
    /**
     * @returns a boolean indicating whether an element with the specified key exists or not.
     */
    has(key: K): boolean;
    /**
     * Adds a new element with a specified key and value.
     * @param key Must be an object or symbol.
     */
    set(key: K, value: V): this;
}

interface WeakMapConstructor {
    new <K extends WeakKey = WeakKey, V = any>(entries?: readonly (readonly [K, V])[] | null): WeakMap<K, V>;
    readonly prototype: WeakMap<WeakKey, any>;
}
declare var WeakMap: WeakMapConstructor;

interface Set<T> {
    /**
     * Appends a new element with a specified value to the end of the Set.
     */
    add(value: T): this;
    /**
     * Removes all elements from the Set.
     */
    clear(): void;
    /**
     * Removes a specified value from the Set.
     * @returns Returns true if an element in the Set existed and has been removed, or false if the element does not exist.
     */
    delete(value: T): boolean;
    /**
     * Executes a provided function once per each value in the Set object, in insertion order.
     */
    forEach(callbackfn: (value: T, value2: T, set: Set<T>) => void, thisArg?: any): void;
    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    has(value: T): boolean;
    /**
     * @returns the number of (unique) elements in the Set.
     */
    readonly size: number;
}

interface SetConstructor {
    new <T = any>(values?: readonly T[] | null): Set<T>;
    readonly prototype: Set<any>;
}
declare var Set: SetConstructor;

interface ReadonlySet<T> {
    /**
     * Executes a provided function once per each value in the ReadonlySet object, in insertion order.
     */
    forEach(callbackfn: (value: T, value2: T, set: ReadonlySet<T>) => void, thisArg?: any): void;
    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    has(value: T): boolean;
    /**
     * @returns the number of (unique) elements in the Set.
     */
    readonly size: number;
}

interface WeakSet<T extends WeakKey> {
    /**
     * Appends a new value to the end of the WeakSet.
     */
    add(value: T): this;
    /**
     * Removes the specified element from the WeakSet.
     * @returns Returns true if the element existed and has been removed, or false if the element does not exist.
     */
    delete(value: T): boolean;
    /**
     * @returns a boolean indicating whether a value exists in the WeakSet or not.
     */
    has(value: T): boolean;
}

interface WeakSetConstructor {
    new <T extends WeakKey = WeakKey>(values?: readonly T[] | null): WeakSet<T>;
    readonly prototype: WeakSet<WeakKey>;
}
declare var WeakSet: WeakSetConstructor;
