
interface Map<K, V> {
    clear(): void;
    delete(key: K): boolean;
    forEach(callbackfn: (value: V, index: K, map: Map<K, V>) => void, thisArg?: any): void;
    get(key: K): V;
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
    get(key: K): V;
    has(key: K): boolean;
    set(key: K, value?: V): WeakMap<K, V>;

}

interface WeakMapConstructor {
    new (): WeakMap<any, any>;
    new <K, V>(): WeakMap<K, V>;
    readonly prototype: WeakMap<any, any>;
}
declare var WeakMap: WeakMapConstructor;

