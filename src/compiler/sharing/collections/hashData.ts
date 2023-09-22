import { Shared, SharedStructBase } from "../structs/sharedStruct";
import { identityHash } from "./hash";


// Portions of the following are derived from esfx and .NET Core. See ThirdPartyNoticeText.txt in the root of this
// repository for their respective license notices.

const MAX_INT32 = (2 ** 31) - 1;
const maxPrimeArrayLength = 2146435069;
const hashPrime = 101;

// Table of prime numbers to use as hash table sizes.
// A typical resize algorithm would pick the smallest prime number in this array
// that is larger than twice the previous capacity.
// Suppose our Hashtable currently has capacity x and enough elements are added
// such that a resize needs to occur. Resizing first computes 2x then finds the
// first prime in the table greater than 2x, i.e. if primes are ordered
// p_1, p_2, ..., p_i, ..., it finds p_n such that p_n-1 < 2x < p_n.
// Doubling is important for preserving the asymptotic complexity of the
// hashtable operations such as add.  Having a prime guarantees that double
// hashing does not lead to infinite loops.  IE, your hash function will be
// h1(key) + i*h2(key), 0 <= i < size.  h2 and the size must be relatively prime.
// We prefer the low computation costs of higher prime numbers over the increased
// memory allocation of a fixed prime number i.e. when right sizing a HashSet.
const primes: readonly number[] = [
    3, 7, 11, 17,
    23, 29, 37, 47,
    59, 71, 89, 107,
    131, 163, 197, 239,
    293, 353, 431, 521,
    631, 761, 919, 1103,
    1327, 1597, 1931, 2333,
    2801, 3371, 4049, 4861,
    5839, 7013, 8419, 10103,
    12143, 14591, 17519, 21023,
    25229, 30293, 36353, 43627,
    52361, 62851, 75431, 90523,
    108631, 130363, 156437, 187751,
    225307, 270371, 324449, 389357,
    467237, 560689, 672827, 807403,
    968897, 1162687, 1395263, 1674319,
    2009191, 2411033, 2893249, 3471899,
    4166287, 4999559, 5999471, 7199369
];

function isPrime(candidate: number) {
    if (candidate & 1) {
        const limit = Math.sqrt(candidate) | 0;
        for (let divisor = 3; divisor <= limit; divisor += 2) {
            if (!(candidate % divisor)) return false;
        }
        return true;
    }
    return candidate === 2;
}

/** @internal */
export function getPrime(min: number) {
    if (min < 0) throw new RangeError();
    for (const prime of primes) {
        if (prime >= min) return prime;
    }
    for (let i = min | 1; i < MAX_INT32; i += 2) {
        if (isPrime(i) && (i - 1) % hashPrime) {
            return i;
        }
    }
    return min;
}

function expandPrime(oldSize: number) {
    const newSize = 2 * oldSize;
    // Allow the hashtables to grow to maximum possible size (~2G elements) before encountering capacity overflow.
    // Note that this check works even when _items.Length overflowed thanks to the (uint) cast
    if (newSize > maxPrimeArrayLength && maxPrimeArrayLength > oldSize) {
        return maxPrimeArrayLength;
    }
    return getPrime(newSize);
}

/** @internal */
@Shared()
export class HashEntry<K extends Shareable, V extends Shareable> extends SharedStructBase {
    @Shared() next = 0;
    @Shared() prevEntry: HashEntry<K, V> | undefined;
    @Shared() nextEntry: HashEntry<K, V> | undefined;
    @Shared() skipNextEntry = false;
    @Shared() hashCode = 0;
    @Shared() key!: K;
    @Shared() value!: V;
}

/** @internal */
@Shared()
export class HashData<K extends Shareable, V extends Shareable> extends SharedStructBase {
    @Shared() buckets: SharedArray<number>;
    @Shared() entries: SharedArray<HashEntry<K, V>>;
    @Shared() freeSize = 0;
    @Shared() freeList = -1;
    @Shared() size = 0;
    @Shared() head: HashEntry<K, V>;
    @Shared() tail: HashEntry<K, V>;

    constructor(capacity: number) {
        super();
        capacity = getPrime(capacity);
        this.buckets = HashData.fill(new SharedArray(capacity), 0);
        this.entries = new SharedArray(capacity);
        this.head = new HashEntry<K, V>();
        this.tail = this.head;
    }

    private static fill<T extends Shareable>(array: SharedArray<T>, value: T) {
        for (let i = 0; i < array.length; i++) {
            array[i] = value;
        }
        return array;
    }

    private static resizeSharedArray<T extends Shareable>(array: SharedArray<T>, newSize: number) {
        if (array.length === newSize) return array;
        const newArray = new SharedArray<T>(newSize);
        const minSize = Math.min(array.length, newSize);
        for (let i = 0; i < minSize; i++) {
            newArray[i] = array[i];
        }
        return newArray;
    }

    private static resizeHashData<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>, newSize: number) {
        const size = hashData.size;
        const buckets = HashData.fill(new SharedArray<number>(newSize), 0);
        const entries = HashData.resizeSharedArray(hashData.entries, newSize);
        for (let i = 0; i < size; i++) {
            const entry = entries[i];
            if (entry && entry.hashCode >= 0) {
                const bucket = entry.hashCode % newSize;
                // Value in buckets is 1-based
                entry.next = buckets[bucket] - 1;
                // Value in buckets is 1-based
                buckets[bucket] = i + 1;
            }
        }
        hashData.buckets = buckets;
        hashData.entries = entries;
    }

    static findEntryIndex<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>, key: K) {
        const hashCode = identityHash(key);
        // Value in _buckets is 1-based
        let i = hashData.buckets[hashCode % hashData.buckets.length] - 1;
        const length = hashData.entries.length;
        while ((i >>> 0) < length) {
            const entry = hashData.entries[i];
            if (entry.hashCode === hashCode && entry.key === key) {
                break;
            }
            i = entry.next;
        }
        return i;
    }

    static findEntryValue<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>, key: K) {
        const index = HashData.findEntryIndex(hashData, key);
        return index >= 0 ? hashData.entries[index].value : undefined;
    }

    static insertEntry<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>, key: K, value: V) {
        const hashCode = identityHash(key) & MAX_INT32;
        let bucket = hashCode % hashData.buckets.length;
        // Value in _buckets is 1-based
        let i = hashData.buckets[bucket] - 1;
        while ((i >>> 0) < hashData.entries.length) {
            const entry = hashData.entries[i];
            if (entry.hashCode === hashCode && entry.key === key) {
                entry.value = value;
                return;
            }
            i = entry.next;
        }
        let updateFreeList = false;
        let index: number;
        if (hashData.freeSize > 0) {
            index = hashData.freeList;
            updateFreeList = true;
            hashData.freeSize--;
        }
        else {
            const size = hashData.size;
            if (size === hashData.entries.length) {
                HashData.resizeHashData(hashData, expandPrime(hashData.size));
                bucket = hashCode % hashData.buckets.length;
            }
            index = size;
            hashData.size = size + 1;
        }
        const entry = hashData.entries[index] ??= new HashEntry<K, V>();
        if (updateFreeList) hashData.freeList = entry.next;
        entry.hashCode = hashCode;
        // Value in _buckets is 1-based
        entry.next = hashData.buckets[bucket] - 1;
        entry.key = key;
        entry.value = value;
        entry.skipNextEntry = false;
        const tail = hashData.tail;
        tail.nextEntry = entry;
        entry.prevEntry = tail;
        hashData.tail = entry;
        // Value in _buckets is 1-based
        hashData.buckets[bucket] = index + 1;
    }

    static deleteEntry<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>, key: K) {
        const hashCode = identityHash(key) & MAX_INT32;
        const bucket = hashCode % hashData.buckets.length;
        let last = -1;
        let entry: HashEntry<K, V> | undefined;
        // Value in _buckets is 1-based
        for (let i = hashData.buckets[bucket] - 1; i >= 0; i = entry.next) {
            entry = hashData.entries[i];
            if (entry.hashCode === hashCode && entry.key === key) {
                if (last < 0) {
                    // Value in _buckets is 1-based
                    hashData.buckets[bucket] = entry.next + 1;
                }
                else {
                    hashData.entries[last]!.next = entry.next;
                }

                const prevEntry = entry.prevEntry!;
                prevEntry.nextEntry = entry.nextEntry;
                if (prevEntry.nextEntry) {
                    prevEntry.nextEntry.prevEntry = prevEntry;
                }
                if (hashData.tail === entry) {
                    hashData.tail = prevEntry;
                }
                entry.hashCode = -1;
                entry.next = hashData.freeList;
                entry.key = undefined!;
                entry.value = undefined!;
                entry.prevEntry = undefined;
                entry.nextEntry = prevEntry;
                entry.skipNextEntry = true;
                hashData.freeList = i;
                hashData.freeSize++;
                return true;
            }
            last = i;
        }
        return false;
    }

    static clearEntries<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>) {
        const size = hashData.size;
        if (size > 0) {
            for (let i = 0; i < hashData.buckets.length; i++) hashData.buckets[i] = 0;
            for (let i = 0; i < hashData.entries.length; i++) hashData.entries[i] = undefined!;
            let currentEntry = hashData.head.nextEntry;
            while (currentEntry) {
                const nextEntry = currentEntry.nextEntry;
                currentEntry.prevEntry = undefined;
                currentEntry.nextEntry = hashData.head;
                currentEntry.skipNextEntry = true;
                currentEntry = nextEntry;
            }
            hashData.head.nextEntry = undefined;
            hashData.tail = hashData.head;
            hashData.size = 0;
            hashData.freeList = -1;
            hashData.freeSize = 0;
        }
    }

    static ensureCapacity<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>, capacity: number) {
        if (capacity < 0) throw new RangeError();
        const existingCapacity = hashData.entries.length;
        if (existingCapacity >= capacity) return existingCapacity;
        const newCapacity = getPrime(capacity);
        HashData.resizeHashData(hashData, newCapacity);
        return newCapacity;
    }

    static trimExcessEntries<K extends Shareable, V extends Shareable>(hashData: HashData<K, V>, capacity = hashData.size - hashData.freeSize) {
        if (capacity < hashData.size) throw new RangeError(); // TODO
        const newCapacity = getPrime(capacity);
        const existingEntries = hashData.entries;
        if (newCapacity >= existingEntries.length) return;
        const oldSize = hashData.size;
        hashData.freeList = -1;
        hashData.buckets = new SharedArray(newCapacity);
        hashData.entries = new SharedArray(newCapacity);
        let newSize = 0;
        for (let i = 0; i < oldSize; i++) {
            const hashCode = existingEntries[i].hashCode;
            if (hashCode >= 0) {
                const bucket = hashCode % newCapacity;
                hashData.entries[newSize] = existingEntries[i];
                // Value in _buckets is 1-based
                hashData.entries[newSize].next = hashData.buckets[bucket] - 1;
                // Value in _buckets is 1-based
                hashData.buckets[bucket] = newSize + 1;
                newSize++;
            }
        }
        hashData.size = newSize;
        hashData.freeSize = 0;
    }

    static * iterateEntries<K extends Shareable, V extends Shareable, R>(head: HashEntry<K, V>, selector: (entry: HashEntry<K, V>) => R) {
        let currentEntry: HashEntry<K, V> | undefined = head;
        while (currentEntry) {
            const skipNextEntry = currentEntry.skipNextEntry;
            currentEntry = currentEntry.nextEntry;
            if (skipNextEntry) continue;
            if (currentEntry) yield selector(currentEntry);
        }
    }

    static selectEntryKey<K extends Shareable, V extends Shareable>(entry: HashEntry<K, V>) {
        return entry.key;
    }

    static selectEntryValue<K extends Shareable, V extends Shareable>(entry: HashEntry<K, V>) {
        return entry.value;
    }

    static selectEntryEntry<K extends Shareable, V extends Shareable>(entry: HashEntry<K, V>) {
        return [entry.key, entry.value] as [K, V];
    }
}
