
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
    has(key: K): boolean;
    keys(): IterableIterator<K>;
    set(key: K, value?: V): Map<K, V>;
    readonly size: number;
    values(): IterableIterator<V>;
    [Symbol.iterator]():IterableIterator<[K,V]>;
    readonly [Symbol.toStringTag]: "Map";
}

interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(): Map<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): Map<K, V>;
    readonly prototype: Map<any, any>;
}
declare var Map: MapConstructor;

interface WeakMap<K, V> {
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;
    readonly [Symbol.toStringTag]: "WeakMap";
}

interface WeakMapConstructor {
    new (): WeakMap<any, any>;
    new <K, V>(): WeakMap<K, V>;
    new <K, V>(iterable: Iterable<[K, V]>): WeakMap<K, V>;
    readonly prototype: WeakMap<any, any>;
}
declare var WeakMap: WeakMapConstructor;

