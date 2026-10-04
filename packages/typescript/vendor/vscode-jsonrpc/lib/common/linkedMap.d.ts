export declare namespace Touch {
    const None: 0;
    const First: 1;
    const AsOld: 1;
    const Last: 2;
    const AsNew: 2;
}
export type Touch = 0 | 1 | 2;
export declare class LinkedMap<K, V> {
    readonly [Symbol.toStringTag] = "LinkedMap";
    private _map;
    private _head;
    private _tail;
    private _size;
    private _state;
    constructor();
    clear(): void;
    isEmpty(): boolean;
    get size(): number;
    get first(): V | undefined;
    get last(): V | undefined;
    before(key: K): V | undefined;
    after(key: K): V | undefined;
    has(key: K): boolean;
    get(key: K, touch?: Touch): V | undefined;
    set(key: K, value: V, touch?: Touch): this;
    delete(key: K): boolean;
    remove(key: K): V | undefined;
    shift(): V | undefined;
    forEach(callbackfn: (value: V, key: K, map: LinkedMap<K, V>) => void, thisArg?: any): void;
    keys(): IterableIterator<K>;
    values(): IterableIterator<V>;
    entries(): IterableIterator<[K, V]>;
    [Symbol.iterator](): IterableIterator<[K, V]>;
    protected trimOld(newSize: number): void;
    private addItemFirst;
    private addItemLast;
    private removeItem;
    private touch;
    toJSON(): [K, V][];
    fromJSON(data: [K, V][]): void;
}
export declare class LRUCache<K, V> extends LinkedMap<K, V> {
    private _limit;
    private _ratio;
    constructor(limit: number, ratio?: number);
    get limit(): number;
    set limit(limit: number);
    get ratio(): number;
    set ratio(ratio: number);
    get(key: K, touch?: Touch): V | undefined;
    peek(key: K): V | undefined;
    set(key: K, value: V): this;
    private checkTrim;
}
