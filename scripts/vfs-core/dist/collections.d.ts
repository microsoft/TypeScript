export interface SortOptions<T> {
    comparer: (a: T, b: T) => number;
    sort: "insertion" | "comparison";
}
export declare class SortedMap<K, V> {
    private _comparer;
    private _keys;
    private _values;
    private _order;
    private _version;
    private _copyOnWrite;
    constructor(comparer: ((a: K, b: K) => number) | SortOptions<K>, iterable?: Iterable<[K, V]>);
    readonly size: number;
    readonly [Symbol.toStringTag]: string;
    has(key: K): boolean;
    get(key: K): V | undefined;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    clear(): void;
    forEach(callback: (value: V, key: K, collection: this) => void, thisArg?: any): void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    private writePreamble();
    private writePostScript();
    private getIterationOrder();
}
export declare class SortedSet<T> {
    private _comparer;
    private _values;
    private _order;
    private _version;
    private _copyOnWrite;
    constructor(comparer: ((a: T, b: T) => number) | SortOptions<T>, iterable?: Iterable<T>);
    readonly size: number;
    readonly [Symbol.toStringTag]: string;
    has(value: T): boolean;
    add(value: T): this;
    delete(value: T): boolean;
    clear(): void;
    forEach(callback: (value: T, key: T, collection: this) => void, thisArg?: any): void;
    keys(): IterableIterator<T>;
    values(): IterableIterator<T>;
    entries(): IterableIterator<[T, T]>;
    [Symbol.iterator](): IterableIterator<T>;
    private writePreamble();
    private writePostScript();
    private getIterationOrder();
}
export declare function binarySearch<T, U>(array: ReadonlyArray<T>, value: T, keySelector: (v: T) => U, keyComparer: (a: U, b: U) => number, offset?: number): number;
export declare function removeAt<T>(array: T[], index: number): void;
export declare function insertAt<T>(array: T[], index: number, value: T): void;
/**
 * A collection of metadata that supports inheritance.
 */
export declare class Metadata {
    private static readonly _undefinedValue;
    private _parent;
    private _map;
    private _version;
    private _size;
    private _parentVersion;
    constructor(parent?: Metadata);
    readonly size: number;
    readonly parent: Metadata | undefined;
    has(key: string): boolean;
    get(key: string): any;
    set(key: string, value: any): this;
    delete(key: string): boolean;
    clear(): void;
    forEach(callback: (value: any, key: string, map: this) => void): void;
    private static _escapeKey(text);
    private static _unescapeKey(text);
}
