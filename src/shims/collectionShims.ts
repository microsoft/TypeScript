/* @internal */
namespace ts {
    type GetIteratorCallback = <I extends readonly any[] | ReadonlySetShim<any> | ReadonlyMapShim<any, any> | undefined>(iterable: I) => IteratorShim<
        I extends ReadonlyMapShim<infer K, infer V> ? [K, V] :
        I extends ReadonlySetShim<infer T> ? T :
        I extends readonly (infer T)[] ? T :
        I extends undefined ? undefined :
        never>;

    type IteratorResultShim<T> =
        | { value: T, done?: false }
        | { value: void, done: true };

    interface IteratorShim<T> {
        next(): IteratorResultShim<T>;
    }

    interface ReadonlyMapShim<K, V> {
        readonly size: number;
        get(key: K): V | undefined;
        has(key: K): boolean;
        keys(): IteratorShim<K>;
        values(): IteratorShim<V>;
        entries(): IteratorShim<[K, V]>;
        forEach(action: (value: V, key: K) => void): void;
    }

    interface MapShim<K, V> extends ReadonlyMapShim<K, V> {
        set(key: K, value: V): this;
        delete(key: K): boolean;
        clear(): void;
    }

    type MapShimConstructor = new <K, V>(iterable?: readonly (readonly [K, V])[] | ReadonlyMapShim<K, V>) => MapShim<K, V>;

    interface ReadonlySetShim<T> {
        readonly size: number;
        has(value: T): boolean;
        keys(): IteratorShim<T>;
        values(): IteratorShim<T>;
        entries(): IteratorShim<[T, T]>;
        forEach(action: (value: T, key: T) => void): void;
    }

    interface SetShim<T> extends ReadonlySetShim<T> {
        add(value: T): this;
        delete(value: T): boolean;
        clear(): void;
    }

    type SetShimConstructor = new <T>(iterable?: readonly T[] | ReadonlySetShim<T>) => SetShim<T>;

    interface MapData<K, V> {
        size: number;
        readonly head: MapEntry<K, V>;
        tail: MapEntry<K, V>;
    }

    interface MapEntry<K, V> {
        readonly key?: K;
        value?: V;
        /**
         * Specifies the next entry in the linked list.
         */
        next?: MapEntry<K, V>;
        /**
         * Specifies the previous entry in the linked list.
         * Must be set when the entry is part of a Map/Set.
         * When 'undefined', iterators should skip the next entry.
         * This will be set to 'undefined' when an entry is deleted.
         * See https://github.com/Microsoft/TypeScript/pull/27292 for more information.
         */
        prev?: MapEntry<K, V>;
    }

    interface IteratorData<K, V, U extends (K | V | [K, V])> {
        current?: MapEntry<K, V>;
        selector: (key: K, value: V) => U;
    }

    function createMapData<K, V>(): MapData<K, V> {
        const sentinel: MapEntry<K, V> = {};
        sentinel.prev = sentinel;
        return { head: sentinel, tail: sentinel, size: 0 };
    }

    function createMapEntry<K, V>(key: K, value: V): MapEntry<K, V> {
        return { key, value, next: undefined, prev: undefined };
    }

    function sameValueZero(x: unknown, y: unknown) {
        // Treats -0 === 0 and NaN === NaN
        return x === y || x !== x && y !== y;
    }

    function getPrev<K, V>(entry: MapEntry<K, V>) {
        const prev = entry.prev;
        // Entries without a 'prev' have been removed from the map.
        // An entry whose 'prev' points to itself is the head of the list and is invalid here.
        if (!prev || prev === entry) throw new Error("Illegal state");
        return prev;
    }

    function getNext<K, V>(entry: MapEntry<K, V> | undefined) {
        while (entry) {
            // Entries without a 'prev' have been removed from the map. Their 'next'
            // pointer should point to the previous entry prior to deletion and
            // that entry should be skipped to resume iteration.
            const skipNext = !entry.prev;
            entry = entry.next;
            if (skipNext) {
                continue;
            }
            return entry;
        }
    }

    function getEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        // We walk backwards from 'tail' to prioritize recently added entries.
        // We skip 'head' because it is an empty entry used to track iteration start.
        for (let entry = data.tail; entry !== data.head; entry = getPrev(entry)) {
            if (sameValueZero(entry.key, key)) {
                return entry;
            }
        }
    }

    function addOrUpdateEntry<K, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined {
        const existing = getEntry(data, key);
        if (existing) {
            existing.value = value;
            return;
        }

        const entry = createMapEntry(key, value);
        entry.prev = data.tail;
        data.tail.next = entry;
        data.tail = entry;
        data.size++;
        return entry;
    }

    function deleteEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        // We walk backwards from 'tail' to prioritize recently added entries.
        // We skip 'head' because it is an empty entry used to track iteration start.
        for (let entry = data.tail; entry !== data.head; entry = getPrev(entry)) {
            // all entries in the map should have a 'prev' pointer.
            if (entry.prev === undefined) throw new Error("Illegal state");
            if (sameValueZero(entry.key, key)) {
                if (entry.next) {
                    entry.next.prev = entry.prev;
                }
                else {
                    // an entry in the map without a 'next' pointer must be the 'tail'.
                    if (data.tail !== entry) throw new Error("Illegal state");
                    data.tail = entry.prev;
                }

                entry.prev.next = entry.next;
                entry.next = entry.prev;
                entry.prev = undefined;
                data.size--;
                return entry;
            }
        }
    }

    function clearEntries<K, V>(data: MapData<K, V>) {
        let node = data.tail;
        while (node !== data.head) {
            const prev = getPrev(node);
            node.next = data.head;
            node.prev = undefined;
            node = prev;
        }
        data.head.next = undefined;
        data.tail = data.head;
        data.size = 0;
    }

    function forEachEntry<K, V>(data: MapData<K, V>, action: (value: V, key: K) => void) {
        let entry: MapEntry<K, V> | undefined = data.head;
        while (entry) {
            entry = getNext(entry);
            if (entry) {
                action(entry.value!, entry.key!);
            }
        }
    }

    function forEachIteration<T>(iterator: IteratorShim<T> | undefined, action: (value: any) => void) {
        if (iterator) {
            for (let step = iterator.next(); !step.done; step = iterator.next()) {
                action(step.value);
            }
        }
    }

    function createIteratorData<K, V, U extends (K | V | [K, V])>(data: MapData<K, V>, selector: (key: K, value: V) => U): IteratorData<K, V, U> {
        return { current: data.head, selector };
    }

    function iteratorNext<K, V, U extends (K | V | [K, V])>(data: IteratorData<K, V, U>): IteratorResultShim<U> {
        // Navigate to the next entry.
        data.current = getNext(data.current);
        if (data.current) {
            return { value: data.selector(data.current.key!, data.current.value!), done: false };
        }
        else {
            return { value: undefined as never, done: true };
        }
    }

    /* @internal */
    export namespace ShimCollections {
        export function createMapShim(getIterator: GetIteratorCallback): MapShimConstructor {
            class MapIterator<K, V, U extends (K | V | [K, V])> {
                private _data: IteratorData<K, V, U>;
                constructor(data: MapData<K, V>, selector: (key: K, value: V) => U) {
                    this._data = createIteratorData(data, selector);
                }
                next() { return iteratorNext(this._data); }
            }
            return class Map<K, V> implements MapShim<K, V> {
                private _mapData = createMapData<K, V>();
                constructor(iterable?: readonly (readonly [K, V])[] | ReadonlyMapShim<K, V>) {
                    forEachIteration(getIterator(iterable), ([key, value]) => this.set(key, value));
                }
                get size() { return this._mapData.size; }
                get(key: K): V | undefined { return getEntry(this._mapData, key)?.value; }
                set(key: K, value: V): this { return addOrUpdateEntry(this._mapData, key, value), this; }
                has(key: K): boolean { return !!getEntry(this._mapData, key); }
                delete(key: K): boolean { return !!deleteEntry(this._mapData, key); }
                clear(): void { clearEntries(this._mapData); }
                keys(): IteratorShim<K> { return new MapIterator(this._mapData, (key, _value) => key); }
                values(): IteratorShim<V> { return new MapIterator(this._mapData, (_key, value) => value); }
                entries(): IteratorShim<[K, V]> { return new MapIterator(this._mapData, (key, value) => [key, value]); }
                forEach(action: (value: V, key: K) => void): void { forEachEntry(this._mapData, action); }
            };
        }

        export function createSetShim(getIterator: GetIteratorCallback): SetShimConstructor {
            class SetIterator<K, V, U extends (K | V | [K, V])> {
                private _data: IteratorData<K, V, U>;
                constructor(data: MapData<K, V>, selector: (key: K, value: V) => U) {
                    this._data = createIteratorData(data, selector);
                }
                next() { return iteratorNext(this._data); }
            }
            return class Set<T> implements SetShim<T> {
                private _mapData = createMapData<T, T>();
                constructor(iterable?: readonly T[] | ReadonlySetShim<T>) {
                    forEachIteration(getIterator(iterable), value => this.add(value));
                }
                get size() { return this._mapData.size; }
                add(value: T): this { return addOrUpdateEntry(this._mapData, value, value), this; }
                has(value: T): boolean { return !!getEntry(this._mapData, value); }
                delete(value: T): boolean { return !!deleteEntry(this._mapData, value); }
                clear(): void { clearEntries(this._mapData); }
                keys(): IteratorShim<T> { return new SetIterator(this._mapData, (key, _value) => key); }
                values(): IteratorShim<T> { return new SetIterator(this._mapData, (_key, value) => value); }
                entries(): IteratorShim<[T, T]> { return new SetIterator(this._mapData, (key, value) => [key, value]); }
                forEach(action: (value: T, key: T) => void): void { forEachEntry(this._mapData, action); }
            };
        }
    }
}
