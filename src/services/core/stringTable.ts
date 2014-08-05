///<reference path='references.ts' />

module TypeScript.Collections {
    export var DefaultStringTableCapacity = 256;

    class StringTableEntry {
        constructor(public Text: string,
                    public HashCode: number,
                    public Next: StringTableEntry) {
        }
    }

    // A table of interned strings.  Faster and better than an arbitrary hashtable for the needs of the
    // scanner. Specifically, the scanner operates over a sliding window of characters, with a start 
    // and end pointer for the current lexeme.  The scanner then wants to get the *interned* string
    // represented by that subsection.
    //
    // Importantly, if the string is already interned, then it wants ask "is the string represented by 
    // this section of a char array contained within the table" in a non-allocating fashion.  i.e. if 
    // you have "[' ', 'p', 'u', 'b', 'l', 'i', 'c', ' ']" and you ask to get the string represented by
    //  range [1, 7), then this table will return "public" without any allocations if that value was 
    // already in the table.
    //
    // Of course, if the value is not in the table then there will be an initial cost to allocate the 
    // string and the bucket for the table.  However, that is only incurred the first time each unique 
    // string is added.
    export class StringTable {
        // TODO: uncomment this once typecheck bug is fixed.
        private entries: StringTableEntry[];
        private count: number = 0;

        constructor(capacity: number) {
            var size = Hash.getPrime(capacity);
            this.entries = ArrayUtilities.createArray<StringTableEntry>(size, null);
        }

        public addCharArray(key: number[], start: number, len: number): string {
            // Compute the hash for this key.  Also ensure that it fits within 31 bits  (so that it 
            // stays a non-heap integer, and so we can index into the array safely).
            var hashCode = Hash.computeSimple31BitCharArrayHashCode(key, start, len) & 0x7FFFFFFF;
            // Debug.assert(hashCode > 0);

            // First see if we already have the string represented by "key[start, start + len)" already
            // present in this table.  If we do, just return that string.  Do this without any 
            // allocations
            var entry = this.findCharArrayEntry(key, start, len, hashCode);
            if (entry !== null) {
                return entry.Text;
            }

            // We don't have an entry for that string in our table.  Convert that 
            var slice: number[] = key.slice(start, start + len);
            return this.addEntry(StringUtilities.fromCharCodeArray(slice), hashCode);
        }

        private findCharArrayEntry(key: number[], start: number, len: number, hashCode: number) {
            for (var e = this.entries[hashCode % this.entries.length]; e !== null; e = e.Next) {
                if (e.HashCode === hashCode && StringTable.textCharArrayEquals(e.Text, key, start, len)) {
                    return e;
                }
            }

            return null;
        }

        private addEntry(text: string, hashCode: number): string {
            var index = hashCode % this.entries.length;

            var e = new StringTableEntry(text, hashCode, this.entries[index]);

            this.entries[index] = e;

            // We grow when our load factor equals 1.  I tried different load factors (like .75 and 
            // .5), however they seemed to have no effect on running time.  With a load factor of 1
            // we seem to get about 80% slot fill rate with an average of around 1.25 table entries 
            // per slot.
            if (this.count === this.entries.length) {
                this.grow();
            }

            this.count++;
            return e.Text;
        }

        //private dumpStats() {
        //    var standardOut = Environment.standardOut;

        //    standardOut.WriteLine("----------------------")
        //    standardOut.WriteLine("String table stats");
        //    standardOut.WriteLine("Count            : " + this.count);
        //    standardOut.WriteLine("Entries Length   : " + this.entries.length);

        //    var longestSlot = 0;
        //    var occupiedSlots = 0;
        //    for (var i = 0; i < this.entries.length; i++) {
        //        if (this.entries[i] !== null) {
        //            occupiedSlots++;

        //            var current = this.entries[i];
        //            var slotCount = 0;
        //            while (current !== null) {
        //                slotCount++;
        //                current = current.Next;
        //            }

        //            longestSlot = MathPrototype.max(longestSlot, slotCount);
        //        }
        //    }

        //    standardOut.WriteLine("Occupied slots   : " + occupiedSlots);
        //    standardOut.WriteLine("Longest  slot    : " + longestSlot);
        //    standardOut.WriteLine("Avg Length/Slot  : " + (this.count / occupiedSlots));
        //    standardOut.WriteLine("----------------------");
        //}

        private grow(): void {
            // this.dumpStats();

            var newSize = Hash.expandPrime(this.entries.length);

            var oldEntries = this.entries;
            var newEntries: StringTableEntry[] = ArrayUtilities.createArray<StringTableEntry>(newSize, null);

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

            // this.dumpStats();
        }

        private static textCharArrayEquals(text: string, array: number[], start: number, length: number): boolean {
            if (text.length !== length) {
                return false;
            }

            var s = start;
            for (var i = 0; i < length; i++) {
                if (text.charCodeAt(i) !== array[s]) {
                    return false;
                }

                s++;
            }

            return true;
        }
    }

    export var DefaultStringTable = new StringTable(DefaultStringTableCapacity);
}