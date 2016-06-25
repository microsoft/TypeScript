interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value?: V): Map<K, V>;
    readonly size: number;
}

interface MapConstructor {
    new (): Map<any, any>;
    new <K, V>(): Map<K, V>;
    readonly prototype: Map<any, any>;
}
declare var Map: MapConstructor;

interface WeakMap<K, V> {
    clear(): void;
    delete(key: K): boolean;
    get(key: K): V | undefined;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;

}

interface WeakMapConstructor {
    new (): WeakMap<any, any>;
    new <K, V>(): WeakMap<K, V>;
    readonly prototype: WeakMap<any, any>;
}
declare var WeakMap: WeakMapConstructor;

interface Set<T> {
    add(value: T): Set<T>;
    clear(): void;
    delete(value: T): boolean;
    entries(): IterableIterator<[T, T]>;
    forEach(callbackfn: (value: T, index: T, set: Set<T>) => void, thisArg?: any): void;
    has(value: T): boolean;
    keys(): IterableIterator<T>;
    readonly size: number;
    values(): IterableIterator<T>;
    [Symbol.iterator]():IterableIterator<T>;
    readonly [Symbol.toStringTag]: "Set";
}

interface SetConstructor {
    new (): Set<any>;
    new <T>(): Set<T>;
    new <T>(iterable: Iterable<T>): Set<T>;
    readonly prototype: Set<any>;
}
declare var Set: SetConstructor;

interface WeakSet<T> {
    add(value: T): WeakSet<T>;
    clear(): void;
    delete(value: T): boolean;
    has(value: T): boolean;
    readonly [Symbol.toStringTag]: "WeakSet";
}

interface WeakSetConstructor {
    new (): WeakSet<any>;
    new <T>(): WeakSet<T>;
    new <T>(iterable: Iterable<T>): WeakSet<T>;
    readonly prototype: WeakSet<any>;
}
declare var WeakSet: WeakSetConstructor;
