/* @internal */
namespace ts {
    interface IteratorShim<T> {
        next(): { value: T, done?: false } | { value: never, done: true };
    }

    interface MapShim<K, V> {
        readonly size: number;
        get(key: K): V | undefined;
        set(key: K, value: V): this;
        has(key: K): boolean;
        delete(key: K): boolean;
        clear(): void;
        keys(): IteratorShim<K>;
        values(): IteratorShim<V>;
        entries(): IteratorShim<[K, V]>;
        forEach(action: (value: V, key: K) => void): void;
    }

    interface SetShim<T> {
        readonly size: number;
        add(value: T): this;
        delete(value: T): boolean;
        has(value: T): boolean;
        clear(): void;
        keys(): IteratorShim<T>;
        values(): IteratorShim<T>;
        entries(): IteratorShim<[T, T]>;
        forEach(action: (value: T, key: T) => void): void;
    }

    interface WeakMapShim<K extends object, V> {
        get(key: K): V | undefined;
        has(key: K): boolean;
        set(key: K, value: V): this;
        delete(key: K): boolean;
    }

    interface WeakSetShim<T extends object> {
        has(key: T): boolean;
        add(key: T): this;
        delete(key: T): boolean;
    }

    interface WeakMapData<K, V> {
        objects?: ObjectMapEntry<K, V>;
    }

    interface MapData<K, V> {
        size: number;
        strings?: Record<string, MapEntry<K, V>>;
        numbers?: MapEntry<K, V>[];
        objects?: ObjectMapEntry<K, V>;
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

    interface ObjectMapEntry<K, V> extends MapEntry<K, V> {
        // Linked list references for object-based keys
        next?: ObjectMapEntry<K, V>;
    }

    function isObject(value: unknown): value is object {
        // eslint-disable-next-line no-null/no-null
        return typeof value === "object" && value !== null
            || typeof value === "function";
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

    function tryAddIterator<T>(value: T, iterator: (this: T) => IteratorShim<any>) {
        if (typeof Symbol === "function" && Symbol.iterator !== undefined) {
            (value as any)[Symbol.iterator] = iterator;
        }
    }

    function createIterator(name: string) {
        class Iterator<K, V, U extends (K | V | [K, V])> {
            private currentEntry?: MapEntry<K, V>;
            private selector: (key: K, value: V) => U;

            constructor(data: MapData<K, V>, selector: (key: K, value: V) => U) {
                this.currentEntry = data.first;
                this.selector = selector;
            }

            public next(): { value: U, done?: false } | { value: never, done: true } {
                // Navigate to the next entry.
                while (this.currentEntry) {
                    const skipNext = !!this.currentEntry.skipNextIteration;
                    this.currentEntry = this.currentEntry.nextIterationEntry;
                    if (!skipNext) {
                        break;
                    }
                }

                if (this.currentEntry) {
                    return { value: this.selector(this.currentEntry.key!, this.currentEntry.value!), done: false };
                }
                else {
                    return { value: undefined as never, done: true };
                }
            }
        }
        tryAddIterator(Iterator.prototype, function() { return this; })
        Object.defineProperty(Iterator, "name", {
            ...Object.getOwnPropertyDescriptor(Iterator, "name"),
            configurable: true,
            value: name
        });
        return Iterator;
    }

    function hasEntry<K, V>(data: MapData<K, V>, key: K): boolean {
        /* eslint-disable no-in-operator, no-null/no-null */
        return typeof key === "string" ? !!data.strings && key in data.strings :
            typeof key === "number" ? !!data.numbers && key in data.numbers :
            typeof key === "boolean" ? key ? !!data.true : !!data.false :
            key === null ? !!data.null :
            key === undefined ? !!data.undefined :
            !!getObjectEntry(data, key);
        // eslint-enable no-in-operator, no-null/no-null
    }

    function getEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        /* eslint-disable no-null/no-null */
        return typeof key === "string" ? data.strings && data.strings[key] :
            typeof key === "number" ? data.numbers && data.numbers[key] :
            typeof key === "boolean" ? key ? data.true : data.false :
            key === undefined ? data.undefined :
            key === null ? data.null :
            getObjectEntry(data, key);
        /* eslint-enable no-null/no-null */
    }

    function getObjectEntry<K, V>(data: WeakMapData<K, V>, key: K): ObjectMapEntry<K, V> | undefined {
        for (let node = data.objects; node; node = node.next) {
            if (node.key === key) {
                return node;
            }
        }
    }

    function addOrUpdateEntry<K, V>(data: MapData<K, V>, key: K, value: V): MapEntry<K, V> | undefined {
        let entry: MapEntry<K, V> | undefined;
        if (typeof key === "string") {
            if (!data.strings) data.strings = createDictionaryObject();
            if (!data.strings[key]) {
                entry = data.strings[key] = { key, value };
            }
            else {
                data.strings[key].value = value;
            }
        }
        else if (typeof key === "number") {
            if (!data.numbers) data.numbers = [];
            if (!data.numbers[key]) {
                entry = data.numbers[key] = { key, value };
            }
            else {
                data.numbers[key].value = value;
            }
        }
        else {
            /* eslint-disable no-null/no-null */
            const prop = typeof key === "boolean" ? key ? "true" : "false" :
                key === null ? "null" :
                key === undefined ? "undefined" :
                undefined;
            /* eslint-enable no-null/no-null */
            if (prop) {
                if (!data[prop]) {
                    entry = data[prop] = { key, value };
                }
                else {
                    data[prop]!.value = value;
                }
            }
            else {
                entry = addOrUpdateObjectEntry(data, key, value);
            }
        }
        if (entry) {
            addToIteration(data, entry);
            data.size++;
        }
        return entry;
    }

    function addOrUpdateObjectEntry<K, V>(data: WeakMapData<K, V>, key: K, value: V): ObjectMapEntry<K, V> | undefined {
        if (!data.objects) return data.objects = { key, value, next: undefined };
        const existing = getObjectEntry(data, key);
        if (!existing) return data.objects = { key, value, next: data.objects };
        existing.value = value;
    }

    function deleteEntry<K, V>(data: MapData<K, V>, key: K): MapEntry<K, V> | undefined {
        let entry: MapEntry<K, V> | undefined;
        if (typeof key === "string") {
            if (data.strings) {
                entry = data.strings[key];
                if (entry) {
                    delete data.strings[key];
                }
            }
        }
        else if (typeof key === "number") {
            if (data.numbers) {
                entry = data.numbers[key];
                if (entry) {
                    delete data.numbers[key];
                }
            }
        }
        else {
            /* eslint-disable no-null/no-null */
            const prop = typeof key === "boolean" ? key ? "true" : "false" :
                key === null ? "null" :
                key === undefined ? "undefined" :
                undefined;
            /* eslint-enable no-null/no-null */
            if (prop) {
                entry = data[prop];
                if (entry) {
                    data[prop] = undefined;
                }
            }
            else {
                entry = deleteObjectEntry(data, key);
            }
        }
        if (entry) {
            removeFromIteration(data, entry);
            data.size--;
        }
        return entry;
    }

    function deleteObjectEntry<K, V>(data: WeakMapData<K, V>, key: K): ObjectMapEntry<K, V> | undefined {
        let prev: ObjectMapEntry<K, V> | undefined;
        for (let node = data.objects; node; prev = node, node = node.next) {
            if (node.key === key) {
                if (prev) {
                    prev.next = node.next;
                }
                else {
                    data.objects = node.next;
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
        clearObjectEntries(data);
        removeAllFromIteration(data);
        data.size = 0;
    }

    function clearObjectEntries<K, V>(data: WeakMapData<K, V>) {
        if (data.objects) {
            let node = data.objects;
            data.objects = undefined;
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

    function createMapData<K, V>(): MapData<K, V> {
        const entry: MapEntry<K, V> = {};
        return {
            first: entry,
            last: entry,
            size: 0
        };
    }

    function createWeakMapData<K, V>(): WeakMapData<K, V> {
        return {};
    }

    function pickKey<K, V>(key: K, _value: V) { return key; }
    function pickValue<K, V>(_key: K, value: V) { return value; }
    function pickEntry<K, V>(key: K, value: V) { return [key, value] as [K, V]; }

    /* @internal */
    export function createMapShim(): new <K, V>() => MapShim<K, V> {
        const MapIterator = createIterator("MapIterator");
        class Map<K, V> implements MapShim<K, V> {
            private _mapData = createMapData<K, V>();
            get size() { return this._mapData.size; }
            get(key: K): V | undefined { return getEntry(this._mapData, key)?.value; }
            set(key: K, value: V): this { return addOrUpdateEntry(this._mapData, key, value), this; }
            has(key: K): boolean { return hasEntry(this._mapData, key); }
            delete(key: K): boolean { return !!deleteEntry(this._mapData, key); }
            clear(): void { clearEntries(this._mapData); }
            keys(): IteratorShim<K> { return new MapIterator(this._mapData, pickKey); }
            values(): IteratorShim<V> { return new MapIterator(this._mapData, pickValue); }
            entries(): IteratorShim<[K, V]> { return new MapIterator(this._mapData, pickEntry); }
            forEach(action: (value: V, key: K) => void): void { forEachEntry(this._mapData, action); }
        }
        tryAddIterator(Map.prototype, Map.prototype.entries);
        return Map;
    }

    /* @internal */
    export function createSetShim(): new <T>() => SetShim<T> {
        const SetIterator = createIterator("SetIterator");
        class Set<T> implements SetShim<T> {
            private _mapData = createMapData<T, T>();
            get size() { return this._mapData.size; }
            add(value: T): this { return addOrUpdateEntry(this._mapData, value, value), this; }
            has(value: T): boolean { return hasEntry(this._mapData, value); }
            delete(value: T): boolean { return !!deleteEntry(this._mapData, value); }
            clear(): void { clearEntries(this._mapData); }
            keys(): IteratorShim<T> { return new SetIterator(this._mapData, pickKey); }
            values(): IteratorShim<T> { return new SetIterator(this._mapData, pickValue); }
            entries(): IteratorShim<[T, T]> { return new SetIterator(this._mapData, pickEntry); }
            forEach(action: (value: T, key: T) => void): void { forEachEntry(this._mapData, action); }
        }
        tryAddIterator(Set.prototype, Set.prototype.values);
        return Set;
    }

    // NOTE: Not a real WeakMap, this implementation will hold onto references until it is GC'ed. However, it's the best
    // we can do without storing data on each value itself.
    /* @internal */
    export function createWeakMapShim(): new <K extends object, V>() => WeakMapShim<K, V> {
        class WeakMap<K extends object, V> implements WeakMapShim<K, V> {
            private _mapData = createWeakMapData<K, V>();
            get(key: K): V | undefined {
                if (!isObject(key)) throw new TypeError("Invalid value used as weak map key");
                return getObjectEntry(this._mapData, key)?.value;
            }
            set(key: K, value: V): this {
                if (!isObject(key)) throw new TypeError("Invalid value used as weak map key");
                addOrUpdateObjectEntry(this._mapData, key, value);
                return this;
            }
            has(key: K): boolean {
                if (!isObject(key)) throw new TypeError("Invalid value used as weak map key");
                return !!getObjectEntry(this._mapData, key);
            }
            delete(key: K): boolean {
                if (!isObject(key)) throw new TypeError("Invalid value used as weak map key");
                return !!deleteObjectEntry(this._mapData, key);
            }
        }
        return WeakMap;
    }

    // NOTE: Not a real WeakSet, this implementation will hold onto references until it is GC'ed. However, it's the best
    // we can do without storing data on each value itself.
    /* @internal */
    export function createWeakSetShim(): new <T extends object>() => WeakSetShim<T> {
        class WeakSet<T extends object> implements WeakSetShim<T> {
            private _mapData = createWeakMapData<T, T>();
            add(value: T): this {
                if (!isObject(value)) throw new TypeError("Invalid value used in weak set");
                addOrUpdateObjectEntry(this._mapData, value, value);
                return this;
            }
            has(value: T): boolean {
                if (!isObject(value)) throw new TypeError("Invalid value used in weak set");
                return !!getObjectEntry(this._mapData, value);
            }
            delete(value: T): boolean {
                if (!isObject(value)) throw new TypeError("Invalid value used in weak set");
                return !!deleteObjectEntry(this._mapData, value);
            }
        }
        return WeakSet;
    }
}
