///<reference path='references.ts' />

module TypeScript.Collections {
    export var DefaultHashTableCapacity = 1024;

    class HashTableEntry<TEntryKey, TEntryValue> {
        constructor(public Key: TEntryKey,
                    public Value: TEntryValue,
                    public HashCode: number,
                    public Next: HashTableEntry<TEntryKey,TEntryValue>) {
        }
    }

    export class HashTable<TKey, TValue> {
        private entries: HashTableEntry<TKey, TValue>[];
        private count: number = 0;

        constructor(capacity: number,
                    private hash: (k: TKey) => number) {
            var size = Hash.getPrime(capacity);
            this.entries = ArrayUtilities.createArray<HashTableEntry<TKey, TValue>>(size, null);
        }

        // Maps 'key' to 'value' in this table.  Does not throw if 'key' is already in the table.
        public set (key: TKey, value: TValue): void {
            this.addOrSet(key, value, /*throwOnExistingEntry:*/ false);
        }

        // Maps 'key' to 'value' in this table.  Throws if 'key' is already in the table.
        public add(key: TKey, value: TValue): void {
            this.addOrSet(key, value, /*throwOnExistingEntry:*/ true);
        }

        public containsKey(key: TKey): boolean {
            var hashCode = this.computeHashCode(key);
            var entry = this.findEntry(key, hashCode);
            return entry !== null;
        }

        public get (key: TKey): TValue {
            var hashCode = this.computeHashCode(key);
            var entry = this.findEntry(key, hashCode);

            return entry === null ? null : entry.Value;
        }

        private computeHashCode(key: TKey): number {
            var hashCode: number = this.hash === null
                ? (<any>key).hashCode
                : this.hash(key);

            hashCode = hashCode & 0x7FFFFFFF;
            Debug.assert(hashCode >= 0);

            return hashCode;
        }

        private addOrSet(key: TKey, value: TValue, throwOnExistingEntry: boolean): TKey {
            // Compute the hash for this key.  Also ensure that it's non negative.
            var hashCode = this.computeHashCode(key);

            var entry = this.findEntry(key, hashCode);
            if (entry !== null) {
                if (throwOnExistingEntry) {
                    throw Errors.argument('key', "Key was already in table.");
                }

                entry.Key = key;
                entry.Value = value;
                return;
            }

            return this.addEntry(key, value, hashCode);
        }

        private findEntry(key: TKey, hashCode: number): HashTableEntry<TKey, TValue> {
            for (var e = this.entries[hashCode % this.entries.length]; e !== null; e = e.Next) {
                if (e.HashCode === hashCode &&
                    key === e.Key) {

                    return e;
                }
            }

            return null;
        }

        private addEntry(key: TKey, value: TValue, hashCode: number): TKey {
            var index = hashCode % this.entries.length;

            var e = new HashTableEntry(key, value, hashCode, this.entries[index]);

            this.entries[index] = e;

            if (this.count >= (this.entries.length / 2)) {
                this.grow();
            }

            this.count++;
            return e.Key;
        }

        //private dumpStats() {
        //    var standardOut = Environment.standardOut;

        //    standardOut.WriteLine("----------------------")
        //    standardOut.WriteLine("Hash table stats");
        //    standardOut.WriteLine("Count            : " + this.count);
        //    standardOut.WriteLine("Entries Length   : " + this.entries.length);

        //    var occupiedSlots = 0;
        //    for (var i = 0; i < this.entries.length; i++) {
        //        if (this.entries[i] !== null) {
        //            occupiedSlots++;
        //        }
        //    }

        //    standardOut.WriteLine("Occupied slots   : " + occupiedSlots);
        //    standardOut.WriteLine("Avg Length/Slot  : " + (this.count / occupiedSlots));
        //    standardOut.WriteLine("----------------------");
        //}

        private grow(): void {
            //this.dumpStats();

            var newSize = Hash.expandPrime(this.entries.length);

            var oldEntries = this.entries;
            var newEntries: HashTableEntry<TKey, TValue>[] = ArrayUtilities.createArray<HashTableEntry<TKey, TValue>>(newSize, null);

            this.entries = newEntries;

            for (var i = 0; i < oldEntries.length; i++) {
                var e = oldEntries[i];

                while (e !== null) {
                    var newIndex = e.HashCode % newSize;
                    var tmp = e.Next;
                    e.Next = newEntries[newIndex];
                    newEntries[newIndex] = e;
                    e = tmp;
                }
            }

            //this.dumpStats();
        }
    }

    export function createHashTable<TKey,TValue>(capacity: number = DefaultHashTableCapacity,
                                                 hash: (k: TKey) => number = null): HashTable<TKey,TValue> {
        return new HashTable<TKey,TValue>(capacity, hash);
    }

    var currentHashCode = 1;
    export function identityHashCode(value: any): number {
        if (value.__hash === undefined) {
            value.__hash = currentHashCode;
            currentHashCode++;
        }

        return value.__hash;
    }
}