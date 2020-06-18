/* @internal */
namespace ts {
    type GetIteratorCallback = <I extends readonly any[] | ReadonlySetShim<any> | ReadonlyMapShim<any, any> | undefined>(iterable: I) => Iterator<
        I extends ReadonlyMapShim<infer K, infer V> ? [K, V] :
        I extends ReadonlySetShim<infer T> ? T :
        I extends readonly (infer T)[] ? T :
        I extends undefined ? undefined :
        never>;

    type IteratorResultShim<T> =
        | { value: T, done?: false }
        | { value: never, done: true };

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
        strings?: Record<string, MapEntry<K, V>>;
        numbers?: MapEntry<K, V>[];
        nan?: MapEntry<K, V>;
        positiveInfinity?: MapEntry<K, V>;
        negativeInfinity?: MapEntry<K, V>;
        list?: MapEntry<K, V>;
        true?: MapEntry<K, V>;
        false?: MapEntry<K, V>;
        null?: MapEntry<K, V>;
        undefined?: MapEntry<K, V>;

        // Linked list references for iterators.
        // See https://github.com/Microsoft/TypeScript/pull/27292
        // for more information.

        /**
         * The first entry in the linked list.
         * Note that this is only a stub that serves as starting point
         * for iterators and doesn't contain a key and a value.
         */
        readonly first: MapEntry<K, V>;
        last: MapEntry<K, V>;
    }

    interface MapEntry<K, V> {
        readonly key?: K;
        value?: V;

        // Linked list references for non-primitive keys
        next?: MapEntry<K, V>;

        // Linked list references for iterators.
        nextIterationEntry?: MapEntry<K, V>;
        previousIterationEntry?: MapEntry<K, V>;

        /**
         * Specifies if iterators should skip the next entry.
         * This will be set when an entry is deleted.
         * See https://github.com/Microsoft/TypeScript/pull/27292 for more information.
         */
        skipNextIteration?: boolean;
    }

    interface IteratorData<K, V, U extends (K | V | [K, V])> {
        currentEntry?: MapEntry<K, V>;
        selector: (key: K, value: V) => U;
    }

    function createDictionaryObject<T>(): Record<string, T> {
        const map = Object.create(/*prototype*/ null); // eslint-disable-line no-null/no-null

        // Using 'delete' on an object causes V8 to put the object in dictionary mode.
        // This disables creation of hidden classes, which are expensive when an object is
        // constantly changing shape.
        map.__ = undefined;
        delete map.__;
        return map;
    }

    function createMapData<K, V>(): MapData<K, V> {
        const entry: MapEntry<K, V> = {};
        return { first: entry, last: entry, size: 0 };
    }

    function createMapEntry<K, V>(key: K, value: V): MapEntry<K, V> {
        return { key, value, nextIterationEntry: undefined, previousIterationEntry: undefined, skipNextIteration: false };
    }

    function createListMapEntry<K, V>(key: K, value: V, next?: MapEntry<K, V>): MapEntry<K, V> {
        const entry = createMapEntry(key, value);
        entry.next = next;
        return entry;
    }

    function getSingletonBucket(key: unknown) {
        /* eslint-disable no-null/no-null */
        if (key === true) return "true";
        if (key === false) return "false";
        if (key === null) return "null";
        if (key === undefined) return "undefined";
        if (typeof key === "number") {
            if (isNaN(key)) return "nan";
            if (!isFinite(key)) return key < 0 ? "negativeInfinity" : "positiveInfinity";
        }
        /* eslint-enable no-null/no-null */
    }

    function getEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        const bucket = getSingletonBucket(key);
        return bucket ? data[bucket] :
            typeof key === "string" ? data.strings?.[key] :
            typeof key === "number" ? data.numbers?.[key] :
            getListEntry(data, key);
    }

    function getListEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        for (let node = data.list; node; node = node.next) {
            if (node.key === key) {
                return node;
            }
        }
    }

    function addOrUpdateEntry<K, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined {
        const bucket = getSingletonBucket(key);
        const entry = bucket ? addOrUpdateSingletonEntry(data, bucket, key, value) :
            typeof key === "string" ? addOrUpdateStringsEntry(data, key, value) :
            typeof key === "number" ? addOrUpdateNumbersEntry(data, key, value) :
            addOrUpdateListEntry(data, key, value);
        if (entry) {
            addToIteration(data, entry);
            data.size++;
        }
        return entry;
    }

    function addOrUpdateSingletonEntry<K, V>(data: MapData<K, V>, prop: "nan" | "negativeInfinity" | "positiveInfinity" | "true" | "false" | "null" | "undefined", key: K, value: V) {
        const entry = data[prop];
        if (!entry) {
            return data[prop] = createMapEntry(key, value);
        }
        else {
            entry.value = value;
        }
    }

    function addOrUpdateStringsEntry<K, V>(data: MapData<K, V>, key: K & string, value: V) {
        if (!data.strings) data.strings = createDictionaryObject();
        if (!data.strings[key]) {
            return data.strings[key] = createMapEntry(key, value);
        }
        else {
            data.strings[key].value = value;
        }
    }

    function addOrUpdateNumbersEntry<K, V>(data: MapData<K, V>, key: K & number, value: V) {
        if (!data.numbers) data.numbers = [];
        if (!data.numbers[key]) {
            return data.numbers[key] = createMapEntry(key, value);
        }
        else {
            data.numbers[key].value = value;
        }
    }

    function addOrUpdateListEntry<K, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined {
        if (!data.list) return data.list = createListMapEntry(key, value, /*next*/ undefined);
        const existing = getListEntry(data, key);
        if (!existing) return data.list = createListMapEntry(key, value, data.list);
        existing.value = value;
    }

    function deleteEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        const bucket = getSingletonBucket(key);
        let entry: MapEntry<K, V> | undefined;
        if (bucket) {
            if (entry = data[bucket]) {
                delete data[bucket];
            }
        }
        else if (typeof key === "string") {
            if (entry = data.strings?.[key]) {
                delete data.strings[key];
            }
        }
        else if (typeof key === "number") {
            if (entry = data.numbers?.[key]) {
                delete data.numbers[key];
            }
        }
        else {
            entry = deleteListEntry(data, key);
        }
        if (entry) {
            removeFromIteration(data, entry);
            data.size--;
        }
        return entry;
    }

    function deleteListEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        let prev: MapEntry<K, V> | undefined;
        for (let node = data.list; node; prev = node, node = node.next) {
            if (node.key === key) {
                if (prev) {
                    prev.next = node.next;
                }
                else {
                    data.list = node.next;
                }
                node.next = undefined;
                return node;
            }
        }
    }

    function clearEntries<K, V>(data: MapData<K, V>) {
        if (data.strings) data.strings = undefined;
        if (data.numbers) data.numbers = undefined;
        if (data.true) data.true = undefined;
        if (data.false) data.false = undefined;
        if (data.null) data.null = undefined;
        if (data.undefined) data.undefined = undefined;
        clearListEntries(data);
        removeAllFromIteration(data);
        data.size = 0;
    }

    function clearListEntries<K, V>(data: MapData<K, V>) {
        if (data.list) {
            let node = data.list;
            data.list = undefined;
            while (node) {
                const next = node.next!;
                node.next = undefined;
                node = next;
            }
        }
    }

    function addToIteration<K, V>(data: MapData<K, V>, newEntry: MapEntry<K, V>) {
        // Adjust the references.
        const previousLastEntry = data.last;
        previousLastEntry.nextIterationEntry = newEntry;
        newEntry.previousIterationEntry = previousLastEntry;
        data.last = newEntry;
    }

    function removeFromIteration<K, V>(data: MapData<K, V>, entry: MapEntry<K, V>) {
        // Adjust the linked list references of the neighbor entries.
        const previousEntry = entry.previousIterationEntry!;
        previousEntry.nextIterationEntry = entry.nextIterationEntry;
        if (entry.nextIterationEntry) {
            entry.nextIterationEntry.previousIterationEntry = previousEntry;
        }

        // When the deleted entry was the last one, we need to
        // adjust the lastEntry reference.
        if (data.last === entry) {
            data.last = previousEntry;
        }

        // Adjust the forward reference of the deleted entry
        // in case an iterator still references it. This allows us
        // to throw away the entry, but when an active iterator
        // (which points to the current entry) continues, it will
        // navigate to the entry that originally came before the
        // current one and skip it.
        entry.previousIterationEntry = undefined;
        entry.nextIterationEntry = previousEntry;
        entry.skipNextIteration = true;
    }

    function removeAllFromIteration<K, V>(data: MapData<K, V>) {
        // Reset the linked list. Note that we must adjust the forward
        // references of the deleted entries to ensure iterators stuck
        // in the middle of the list don't continue with deleted entries,
        // but can continue with new entries added after the clear()
        // operation.
        const firstEntry = data.first;
        let currentEntry = firstEntry.nextIterationEntry;
        while (currentEntry) {
            const nextEntry = currentEntry.nextIterationEntry;
            currentEntry.previousIterationEntry = undefined;
            currentEntry.nextIterationEntry = firstEntry;
            currentEntry.skipNextIteration = true;
            currentEntry = nextEntry;
        }

        firstEntry.nextIterationEntry = undefined;
        data.last = firstEntry;
    }

    function forEachEntry<K, V>(data: MapData<K, V>, action: (value: V, key: K) => void) {
        let currentEntry: MapEntry<K, V> | undefined = data.first;
        while (currentEntry) {
            const skipNext = !!currentEntry.skipNextIteration;
            currentEntry = currentEntry.nextIterationEntry;
            if (skipNext) {
                continue;
            }
            if (currentEntry) {
                action(currentEntry.value!, currentEntry.key!);
            }
        }
    }

    function fill<T, O extends ReadonlyMapShim<any, any> | ReadonlySetShim<any>>(object: O, iterator: Iterator<T> | undefined, add: (object: O, value: any) => void) {
        if (iterator) {
            for (let step = iterator.next(); !step.done; step = iterator.next()) {
                add(object, step.value);
            }
        }
    }

    function createIteratorData<K, V, U extends (K | V | [K, V])>(data: MapData<K, V>, selector: (key: K, value: V) => U): IteratorData<K, V, U> {
        return { currentEntry: data.first, selector };
    }

    function iteratorNext<K, V, U extends (K | V | [K, V])>(data: IteratorData<K, V, U>): IteratorResultShim<U> {
        // Navigate to the next entry.
        while (data.currentEntry) {
            const skipNext = !!data.currentEntry.skipNextIteration;
            data.currentEntry = data.currentEntry.nextIterationEntry;
            if (!skipNext) {
                break;
            }
        }
        if (data.currentEntry) {
            return { value: data.selector(data.currentEntry.key!, data.currentEntry.value!), done: false };
        }
        else {
            return { value: undefined as never, done: true };
        }
    }

    function pickKey<K, V>(key: K, _value: V) {
        return key;
    }

    function pickValue<K, V>(_key: K, value: V) {
        return value;
    }

    function pickEntry<K, V>(key: K, value: V) {
        return [key, value] as [K, V];
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
            function fillMap<K, V>(object: MapShim<K, V>, [key, value]: readonly [K, V]) {
                object.set(key, value);
            }
            return class Map<K, V> implements MapShim<K, V> {
                private _mapData = createMapData<K, V>();
                constructor(iterable?: readonly (readonly [K, V])[] | ReadonlyMapShim<K, V>) {
                    fill(this, getIterator(iterable), fillMap);
                }
                get size() { return this._mapData.size; }
                get(key: K): V | undefined { return getEntry(this._mapData, key)?.value; }
                set(key: K, value: V): this { return addOrUpdateEntry(this._mapData, key, value), this; }
                has(key: K): boolean { return !!getEntry(this._mapData, key); }
                delete(key: K): boolean { return !!deleteEntry(this._mapData, key); }
                clear(): void { clearEntries(this._mapData); }
                keys(): IteratorShim<K> { return new MapIterator(this._mapData, pickKey); }
                values(): IteratorShim<V> { return new MapIterator(this._mapData, pickValue); }
                entries(): IteratorShim<[K, V]> { return new MapIterator(this._mapData, pickEntry); }
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
            function fillSet<T>(object: SetShim<T>, value: T) {
                object.add(value);
            }
            return class Set<T> implements SetShim<T> {
                private _mapData = createMapData<T, T>();
                constructor(iterable?: readonly T[] | ReadonlySetShim<T>) {
                    fill(this, getIterator(iterable), fillSet);
                }
                get size() { return this._mapData.size; }
                add(value: T): this { return addOrUpdateEntry(this._mapData, value, value), this; }
                has(value: T): boolean { return !!getEntry(this._mapData, value); }
                delete(value: T): boolean { return !!deleteEntry(this._mapData, value); }
                clear(): void { clearEntries(this._mapData); }
                keys(): IteratorShim<T> { return new SetIterator(this._mapData, pickKey); }
                values(): IteratorShim<T> { return new SetIterator(this._mapData, pickValue); }
                entries(): IteratorShim<[T, T]> { return new SetIterator(this._mapData, pickEntry); }
                forEach(action: (value: T, key: T) => void): void { forEachEntry(this._mapData, action); }
            };
        }
    }
}
