/* @internal */
namespace ts {
    // NOTE: Due to how the project-reference merging ends up working, `T` isn't considered referenced until `Map` merges with the definition
    // in src/compiler/core.ts
    // @ts-ignore
    export interface Map<T> {
        // full type defined in ~/src/compiler/core.ts
    }

    export function createMapShim(): new <T>() => Map<T> {
        /** Create a MapLike with good performance. */
        function createDictionaryObject<T>(): Record<string, T> {
            const map = Object.create(/*prototype*/ null); // eslint-disable-line no-null/no-null

            // Using 'delete' on an object causes V8 to put the object in dictionary mode.
            // This disables creation of hidden classes, which are expensive when an object is
            // constantly changing shape.
            map.__ = undefined;
            delete map.__;

            return map;
        }

        interface MapEntry<T> {
            readonly key?: string;
            value?: T;

            // Linked list references for iterators.
            nextEntry?: MapEntry<T>;
            previousEntry?: MapEntry<T>;

            /**
             * Specifies if iterators should skip the next entry.
             * This will be set when an entry is deleted.
             * See https://github.com/Microsoft/TypeScript/pull/27292 for more information.
             */
            skipNext?: boolean;
        }

        class MapIterator<T, U extends (string | T | [string, T])> {
            private currentEntry?: MapEntry<T>;
            private selector: (key: string, value: T) => U;

            constructor(currentEntry: MapEntry<T>, selector: (key: string, value: T) => U) {
                this.currentEntry = currentEntry;
                this.selector = selector;
            }

            public next(): { value: U, done: false } | { value: never, done: true } {
                // Navigate to the next entry.
                while (this.currentEntry) {
                    const skipNext = !!this.currentEntry.skipNext;
                    this.currentEntry = this.currentEntry.nextEntry;

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

        return class <T> implements Map<T> {
            private data = createDictionaryObject<MapEntry<T>>();
            public size = 0;

            // Linked list references for iterators.
            // See https://github.com/Microsoft/TypeScript/pull/27292
            // for more information.

            /**
             * The first entry in the linked list.
             * Note that this is only a stub that serves as starting point
             * for iterators and doesn't contain a key and a value.
             */
            private readonly firstEntry: MapEntry<T>;
            private lastEntry: MapEntry<T>;

            constructor() {
                // Create a first (stub) map entry that will not contain a key
                // and value but serves as starting point for iterators.
                this.firstEntry = {};
                // When the map is empty, the last entry is the same as the
                // first one.
                this.lastEntry = this.firstEntry;
            }

            get(key: string): T | undefined {
                const entry = this.data[key] as MapEntry<T> | undefined;
                return entry && entry.value!;
            }

            set(key: string, value: T): this {
                if (!this.has(key)) {
                    this.size++;

                    // Create a new entry that will be appended at the
                    // end of the linked list.
                    const newEntry: MapEntry<T> = {
                        key,
                        value
                    };
                    this.data[key] = newEntry;

                    // Adjust the references.
                    const previousLastEntry = this.lastEntry;
                    previousLastEntry.nextEntry = newEntry;
                    newEntry.previousEntry = previousLastEntry;
                    this.lastEntry = newEntry;
                }
                else {
                    this.data[key].value = value;
                }

                return this;
            }

            has(key: string): boolean {
                // eslint-disable-next-line no-in-operator
                return key in this.data;
            }

            delete(key: string): boolean {
                if (this.has(key)) {
                    this.size--;
                    const entry = this.data[key];
                    delete this.data[key];

                    // Adjust the linked list references of the neighbor entries.
                    const previousEntry = entry.previousEntry!;
                    previousEntry.nextEntry = entry.nextEntry;
                    if (entry.nextEntry) {
                        entry.nextEntry.previousEntry = previousEntry;
                    }

                    // When the deleted entry was the last one, we need to
                    // adjust the lastEntry reference.
                    if (this.lastEntry === entry) {
                        this.lastEntry = previousEntry;
                    }

                    // Adjust the forward reference of the deleted entry
                    // in case an iterator still references it. This allows us
                    // to throw away the entry, but when an active iterator
                    // (which points to the current entry) continues, it will
                    // navigate to the entry that originally came before the
                    // current one and skip it.
                    entry.previousEntry = undefined;
                    entry.nextEntry = previousEntry;
                    entry.skipNext = true;

                    return true;
                }
                return false;
            }

            clear(): void {
                this.data = createDictionaryObject<MapEntry<T>>();
                this.size = 0;

                // Reset the linked list. Note that we must adjust the forward
                // references of the deleted entries to ensure iterators stuck
                // in the middle of the list don't continue with deleted entries,
                // but can continue with new entries added after the clear()
                // operation.
                const firstEntry = this.firstEntry;
                let currentEntry = firstEntry.nextEntry;
                while (currentEntry) {
                    const nextEntry = currentEntry.nextEntry;
                    currentEntry.previousEntry = undefined;
                    currentEntry.nextEntry = firstEntry;
                    currentEntry.skipNext = true;

                    currentEntry = nextEntry;
                }
                firstEntry.nextEntry = undefined;
                this.lastEntry = firstEntry;
            }

            keys(): Iterator<string> {
                return new MapIterator(this.firstEntry, key => key);
            }

            values(): Iterator<T> {
                return new MapIterator(this.firstEntry, (_key, value) => value);
            }

            entries(): Iterator<[string, T]> {
                return new MapIterator(this.firstEntry, (key, value) => [key, value] as [string, T]);
            }

            forEach(action: (value: T, key: string) => void): void {
                const iterator = this.entries();
                while (true) {
                    const iterResult = iterator.next();
                    if (iterResult.done) {
                        break;
                    }

                    const [key, value] = iterResult.value;
                    action(value, key);
                }
            }
        };
    }
}