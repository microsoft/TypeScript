import { iterateValues } from "../../core";
import { Debug } from "../../debug";
import { sys } from "../../sys";
import { AtomicValue } from "../../threading/atomicValue";
import { Mutex } from "../../threading/mutex";
import { ScopedLock } from "../../threading/scopedLock";
import { UniqueLock } from "../../threading/uniqueLock";
import { Shared, SharedStructBase } from "../structs/sharedStruct";
import { Tag, Tagged } from "../structs/taggedStruct";
import { generateHashSeed, identityHash } from "./hash";
import { getPrime } from "./hashData";

// Portions of the following are derived from .NET Core. See ThirdPartyNoticeText.txt in the root of this repository
// for the related license notice.

@Shared()
class Node<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>> extends SharedStructBase {
    @Shared() readonly key: K;
    @Shared() value: V;
    @Shared() readonly next: AtomicValue<Node<K, V> | undefined>;
    @Shared() readonly hashCode: number;

    constructor(key: K, value: V, hashCode: number, next?: Node<K, V>) {
        super();
        this.key = key;
        this.value = value;
        this.hashCode = hashCode;
        this.next = new AtomicValue(next);
    }
}

@Shared()
class Tables<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>> extends SharedStructBase {
    @Shared() readonly buckets: SharedArray<AtomicValue<Node<K, V> | undefined>>;
    @Shared() readonly locks: SharedArray<Mutex>;
    @Shared() readonly countsPerLock: SharedArray<number>;
    @Shared() readonly seed: number | undefined;

    constructor(buckets: SharedArray<AtomicValue<Node<K, V> | undefined>>, locks: SharedArray<Mutex>, countsPerLock: SharedArray<number>, seed?: number) {
        super();
        Debug.assert(Array.prototype.every.call(buckets, x => x !== undefined));
        Debug.assert(Array.prototype.every.call(locks, x => x !== undefined));
        Debug.assert(Array.prototype.every.call(countsPerLock, x => x !== undefined));
        this.buckets = buckets;
        this.locks = locks;
        this.countsPerLock = countsPerLock;
        this.seed = seed;
    }
}

const DefaultCapacity = 31;
const MaxLockNumber = 1024;
const SHARED_ARRAY_MAX_LENGTH = 2 ** 14 - 2;
const MAX_INT32 = 2 ** 31 - 1;

const WILDCARD = Symbol();
const EXIST = Symbol();
const NOT_EXIST = Symbol();

type WILDCARD = typeof WILDCARD;
type EXIST = typeof EXIST;
type NOT_EXIST = typeof NOT_EXIST;

/**
 * A concurrent Map-like object. Based on [ConcurrentDictionary][] from .NET Core.
 *
 * [ConcurrentDictionary]: https://github.com/dotnet/runtime/blob/main/src/libraries/System.Collections.Concurrent/src/System/Collections/Concurrent/ConcurrentDictionary.cs
 * @internal
 */
@Shared()
export class ConcurrentMap<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>> extends Tagged(SharedStructBase, Tag.ConcurrentMap) {
    @Shared() private readonly _tables: AtomicValue<Tables<K, V>>;
    @Shared() private _budget: number;
    @Shared() private readonly _growLockArray: boolean;

    constructor();
    constructor(items: ConcurrentMap<K, V> | Iterable<[K, V]>);
    constructor(concurrencyLevel?: number, capacity?: number);
    constructor(concurrencyLevel: number, items: ConcurrentMap<K, V> | Iterable<[K, V]>);
    constructor(concurrencyLevelOrItems?: number | ConcurrentMap<K, V> | Iterable<[K, V]>, capacityOrItems?: number | ConcurrentMap<K, V> | Iterable<[K, V]>) {
        let concurrencyLevel: number | undefined;
        let capacity: number | undefined;
        let items: ConcurrentMap<K, V> | Iterable<[K, V]> | undefined;
        if (typeof concurrencyLevelOrItems === "object") {
            items = concurrencyLevelOrItems;
            concurrencyLevel = sys.cpuCount?.() ?? 1;
            capacity = ConcurrentMap.getCapacityFromItems(items);
        }
        else {
            concurrencyLevel = concurrencyLevelOrItems ?? sys.cpuCount?.() ?? 1;
            if (typeof capacityOrItems === "object") {
                items = capacityOrItems;
                capacity = ConcurrentMap.getCapacityFromItems(items);
            }
            else {
                capacity = capacityOrItems ?? DefaultCapacity;
            }
        }

        Debug.assert(concurrencyLevel >= 1);

        super();

        if (capacity < concurrencyLevel) capacity = concurrencyLevel;
        capacity = getPrime(capacity);

        const locks = new SharedArray<Mutex>(concurrencyLevel);
        for (let i = 0; i < concurrencyLevel; i++) {
            locks[i] = new Mutex();
        }

        const countsPerLock = new SharedArray<number>(concurrencyLevel);
        Array.prototype.fill.call(countsPerLock, 0);

        const buckets = new SharedArray<AtomicValue<Node<K, V> | undefined>>(capacity);
        for (let i = 0; i < capacity; i++) {
            buckets[i] = new AtomicValue<Node<K, V> | undefined>(/*value*/ undefined);
        }

        this._tables = new AtomicValue(new Tables(buckets, locks, countsPerLock));
        this._growLockArray = arguments.length > 0;
        this._budget = (buckets.length / locks.length) | 0;

        if (items) {
            if (items instanceof ConcurrentMap) {
                items = ConcurrentMap.entries(items);
            }

            for (const [key, value] of items) {
                const previousValue = ConcurrentMap.compareExchangeInternal(
                    this,
                    AtomicValue.load(this._tables),
                    key,
                    /*hashCode*/ undefined,
                    NOT_EXIST,
                    value,
                    /*acquireLock*/ false
                )
                Debug.assert(previousValue === undefined, "duplicate key in items");
            }

            if (this._budget === 0) {
                const tables = AtomicValue.load(this._tables);
                this._budget = (tables.buckets.length / tables.locks.length) | 0;
            }
        }
    }

    private static getCapacityFromItems<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(items: ConcurrentMap<K, V> | Iterable<[K, V]>) {
        if (items instanceof ConcurrentMap) return Math.max(DefaultCapacity, ConcurrentMap.size(items));
        if (items instanceof Map) return Math.max(DefaultCapacity, items.size);
        if (items instanceof Set) return Math.max(DefaultCapacity, items.size);
        if (Array.isArray(items)) return Math.max(DefaultCapacity, items.length);
        return DefaultCapacity;
    }

    static size<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>) {
        using _ = new ScopedLock(AtomicValue.load(self._tables).locks);
        return ConcurrentMap.getSizeNoLocks(self);
    }

    static has<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K) {
        return ConcurrentMap.get(self, key) !== undefined;
    }

    static get<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K) {
        const tables = AtomicValue.load(self._tables);
        const hashCode = identityHash(key, tables.seed);
        for (let node: Node<K, V> | undefined = ConcurrentMap.getBucket(tables, hashCode); node; node = AtomicValue.load(node.next)) {
            if (hashCode === node.hashCode && key === node.key) {
                return node.value;
            }
        }
        return undefined;
    }

    static set<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K, value: V) {
        ConcurrentMap.compareExchangeInternal(
            self,
            AtomicValue.load(self._tables),
            key,
            /*hashCode*/ undefined,
            WILDCARD,
            value
        );
    }

    static insert<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K, value: V) {
        return undefined === ConcurrentMap.compareExchangeInternal(
            self,
            AtomicValue.load(self._tables),
            key,
            /*hashCode*/ undefined,
            NOT_EXIST,
            value
        );
    }

    static replace<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K, expectedValue: V, replacementValue: V) {
        return undefined !== ConcurrentMap.compareExchangeInternal(
            self,
            AtomicValue.load(self._tables),
            key,
            /*hashCode*/ undefined,
            expectedValue,
            replacementValue
        );
    }

    static delete<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K, expectedValue?: V) {
        return ConcurrentMap.compareExchangeInternal(
            self,
            AtomicValue.load(self._tables),
            key,
            /*hashCode*/ undefined,
            expectedValue ?? EXIST,
            NOT_EXIST
        );
    }

    static exchange<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K, value: V | undefined) {
        return ConcurrentMap.compareExchangeInternal(
            self,
            AtomicValue.load(self._tables),
            key,
            /*hashCode*/ undefined,
            WILDCARD,
            value ?? NOT_EXIST
        );
    }

    static compareExchange<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, key: K, expectedValue: V | undefined, replacementValue: V | undefined) {
        return ConcurrentMap.compareExchangeInternal(
            self,
            AtomicValue.load(self._tables),
            key,
            /*hashCode*/ undefined,
            expectedValue ?? NOT_EXIST,
            replacementValue ?? NOT_EXIST
        );
    }

    private static compareExchangeInternal<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(
        self: ConcurrentMap<K, V>,
        tables: Tables<K, V>,
        key: K,
        hashCode = identityHash(key, tables.seed),
        expectedValue: V | WILDCARD | EXIST | NOT_EXIST,
        replacementValue: V | NOT_EXIST,
        acquireLock = true
    ) {
        let seed = tables.seed;
        while (true) {
            const locks = tables.locks;
            const { bucket, lockNo } = ConcurrentMap.getBucketAndLock(tables, hashCode);
            let resizeDesired = false;
            let forceRehash = false;

            // perf: if we're deleting the value and there are no entries for that bucket, we can exit early. We can also
            // perf: if we're updating a value that must exist and there are no entries for that bucket, we can exit early.
            if ((replacementValue === NOT_EXIST || expectedValue === EXIST) && tables.countsPerLock[lockNo] === 0) {
                return undefined;
            }

            // block ensures we release the lock below prior to attempting to grow the table
            {
                using _ = acquireLock ? new UniqueLock(locks[lockNo]) : undefined;
                if (tables !== AtomicValue.load(self._tables)) {
                    tables = AtomicValue.load(self._tables);
                    if (seed !== tables.seed) {
                        seed = tables.seed;
                        hashCode = identityHash(key, tables.seed);
                    }
                    continue;
                }

                let prev: Node<K, V> | undefined;
                let collisionCount = 0;
                for (let node: Node<K, V> | undefined = AtomicValue.load(bucket); node; node = AtomicValue.load(node.next)) {
                    Debug.assert((prev === undefined && node === AtomicValue.load(bucket)) || AtomicValue.load(prev!.next) === node);
                    if (hashCode === node.hashCode && key === node.key) {
                        const currentValue = node.value;
                        // We've matched the key, now match the value.
                        if (expectedValue === NOT_EXIST) {
                            // If we are inserting (`expectedValue === NOT_EXIST`) then we may not update if an entry exists.
                            return currentValue;
                        }
                        else if (expectedValue === WILDCARD || expectedValue === EXIST || expectedValue === currentValue) {
                            // We are either unconditionally setting (`expectedValue === WILDCARD`), updating/deleting
                            // (`expectedValue === EXIST`), or deleting/replacing (`expectedValue === currentValue`).
                            Debug.assert(expectedValue !== NOT_EXIST as unknown);
                            if (replacementValue === NOT_EXIST) {
                                // performing delete
                                if (!prev) {
                                    AtomicValue.store(bucket, AtomicValue.load(node.next));
                                }
                                else {
                                    AtomicValue.store(prev.next, AtomicValue.load(node.next));
                                }
                                tables.countsPerLock[lockNo]--;
                            }
                            else {
                                // performing unconditional set or update
                                if (isLockFree(replacementValue)) {
                                    node.value = replacementValue;
                                }
                                else {
                                    const newNode = new Node(node.key, replacementValue, hashCode, AtomicValue.load(node.next));
                                    if (!prev) {
                                        AtomicValue.store(bucket, newNode);
                                    }
                                    else {
                                        AtomicValue.store(prev.next, newNode);
                                    }
                                }
                            }
                        }
                        return currentValue;
                    }
                    prev = node;
                    if (typeof key === "string") {
                        collisionCount++;
                    }
                }

                // if we failed to find a matching key and we are either deleting or updating, we exit early indicating
                // there was no match.
                if (replacementValue === NOT_EXIST || expectedValue === EXIST) {
                    return undefined;
                }

                // otherwise, we are inserting or setting so we can add the entry.
                const resultNode = new Node(key, replacementValue, hashCode, AtomicValue.load(bucket));
                AtomicValue.store(bucket, resultNode);
                tables.countsPerLock[lockNo]++;

                if (tables.countsPerLock[lockNo] > self._budget) {
                    resizeDesired = true;
                }

                if (typeof key === "string" && collisionCount > 10 && tables.seed === undefined) {
                    forceRehash = true;
                }
            }

            if (resizeDesired || forceRehash) {
                ConcurrentMap.growTable(self, tables, resizeDesired, forceRehash);
            }

            return undefined;
        }
    }

    static clear<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>) {
        using _ = new ScopedLock(AtomicValue.load(self._tables).locks);
        if (ConcurrentMap.allBucketsAreEmpty(self)) {
            return;
        }

        const tables = AtomicValue.load(self._tables);
        const buckets = new SharedArray<AtomicValue<Node<K, V> | undefined>>(getPrime(DefaultCapacity));
        for (let i = 0; i < buckets.length; i++) {
            buckets[i] = new AtomicValue<Node<K, V> | undefined>(/*value*/ undefined);
        }

        const counts = new SharedArray<number>(tables.countsPerLock.length);
        Array.prototype.fill.call(counts, 0);

        const newTables = new Tables(buckets, tables.locks, counts, tables.seed);
        AtomicValue.store(self._tables, newTables);
        self._budget = Math.max(1, (newTables.buckets.length / newTables.locks.length) | 0);
    }

    static * keys<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>): IterableIterator<K> {
        const buckets = AtomicValue.load(self._tables).buckets;
        for (let i = 0; i < buckets.length; i++) {
            for (let node: Node<K, V> | undefined = AtomicValue.load(buckets[i]); node; node = AtomicValue.load(node.next)) {
                yield node.key;
            }
        }
    }

    static * values<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>): IterableIterator<V> {
        const buckets = AtomicValue.load(self._tables).buckets;
        for (let i = 0; i < buckets.length; i++) {
            for (let node: Node<K, V> | undefined = AtomicValue.load(buckets[i]); node; node = AtomicValue.load(node.next)) {
                yield node.value;
            }
        }
    }

    static * entries<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>): IterableIterator<[K, V]> {
        const buckets = AtomicValue.load(self._tables).buckets;
        for (let i = 0; i < buckets.length; i++) {
            for (let node: Node<K, V> | undefined = AtomicValue.load(buckets[i]); node; node = AtomicValue.load(node.next)) {
                yield [node.key, node.value];
            }
        }
    }

    private static growTable<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>, tables: Tables<K, V>, resizeDesired: boolean, forceRehashIfNonRandomized: boolean) {
        using _first = new UniqueLock(tables.locks[0]);
        if (tables !== AtomicValue.load(self._tables)) {
            return;
        }

        let newLength = tables.buckets.length;
        let newSeed: number | undefined;
        if (forceRehashIfNonRandomized && tables.seed === undefined) {
            newSeed = generateHashSeed();
        }

        if (resizeDesired) {
            if (newSeed === undefined && ConcurrentMap.getSizeNoLocks(self) < tables.buckets.length / 4) {
                self._budget *= 2;
                if (self._budget > (self._budget | 0)) {
                    self._budget = MAX_INT32;
                }
                return;
            }

            if ((newLength = tables.buckets.length * 2) < 0 ||
                (newLength = getPrime(newLength)) > SHARED_ARRAY_MAX_LENGTH) {
                newLength = SHARED_ARRAY_MAX_LENGTH;
                self._budget = MAX_INT32;
            }
        }

        let newLocks = tables.locks;
        if (self._growLockArray && tables.locks.length < MaxLockNumber) {
            newLocks = new SharedArray(tables.locks.length * 2);
            for (let i = 0; i < tables.locks.length; i++) {
                newLocks[i] = tables.locks[i];
            }
            for (let i = tables.locks.length; i < newLocks.length; i++) {
                newLocks[i] = new Mutex();
            }
        }

        const newBuckets = new SharedArray<AtomicValue<Node<K, V> | undefined>>(newLength);
        for (let i = 0; i < newLength; i++) {
            newBuckets[i] = new AtomicValue<Node<K, V> | undefined>(/*value*/ undefined);
        }

        const newCountsPerLock = new SharedArray<number>(newLocks.length);
        Array.prototype.fill.call(newCountsPerLock, 0);

        const newTables = new Tables(newBuckets, newLocks, newCountsPerLock, newSeed ?? tables.seed);

        using _rest = new ScopedLock(Array.prototype.slice.call(tables.locks, 1));
        for (const bucket of iterateValues(tables.buckets)) {
            let current: Node<K, V> | undefined = AtomicValue.load(bucket);
            while (current) {
                let hashCode = newSeed === undefined ? current.hashCode : identityHash(current.key, newSeed);
                const next: Node<K, V> | undefined = AtomicValue.load(current.next);
                let { lockNo: newLockNo, bucket: newBucket } = ConcurrentMap.getBucketAndLock(newTables, hashCode);
                AtomicValue.store(newBucket, new Node(current.key, current.value, hashCode, AtomicValue.load(newBucket)));
                newCountsPerLock[newLockNo]++;
                Debug.assert(newCountsPerLock[newLockNo] <= MAX_INT32);
                current = next;
            }
        }

        self._budget = Math.max(1, (newBuckets.length / newLocks.length) | 0);
        AtomicValue.store(self._tables, newTables);
    }

    private static getSizeNoLocks<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>) {
        let count = 0;
        const tables = AtomicValue.load(self._tables);
        const countsPerLock = tables.countsPerLock;
        for (let i = 0; i < countsPerLock.length; i++) {
            count += countsPerLock[i];
        }
        return count;
    }

    private static getBucket<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(tables: Tables<K, V>, hashCode: number) {
        const buckets = tables.buckets;
        const bucketNo = (hashCode >>> 0) % buckets.length;
        const bucket = buckets[bucketNo];
        return AtomicValue.load(bucket);
    }

    private static getBucketAndLock<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(tables: Tables<K, V>, hashCode: number) {
        const buckets = tables.buckets;
        const bucketNo = (hashCode >>> 0) % buckets.length;
        const lockNo = bucketNo % tables.locks.length;
        const bucket = buckets[bucketNo];
        return { bucket, lockNo };
    }

    private static allBucketsAreEmpty<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>>(self: ConcurrentMap<K, V>) {
        return Array.prototype.some.call(AtomicValue.load(self._tables).countsPerLock, x => x !== 0);
    }
}

function isLockFree(value: Shareable) {
    if (Atomics.isLockFree(8)) return true;
    if (typeof value === "number") return isFinite(value) && (value === (value >>> 0) || value === (value >> 0));
    return true;
}

/**
 * A non-shared wrapper for {@link ConcurrentMap} objects.
 * @internal
 */
export class ConcurrentMapWrapper<K extends NonNullable<Shareable>, V extends NonNullable<Shareable>> {
    private self: ConcurrentMap<K, V>;

    constructor(map: ConcurrentMap<K, V>) {
        this.self = map;
    }

    get size(): number { return ConcurrentMap.size(this.self); }
    has(key: K): boolean { return ConcurrentMap.has(this.self, key); }
    get(key: K): V | undefined { return ConcurrentMap.get(this.self, key); }
    set(key: K, value: V): this { return ConcurrentMap.set(this.self, key, value), this; }
    delete(key: K, expectedValue?: V): V | undefined { return ConcurrentMap.delete(this.self, key, expectedValue); }
    insert(key: K, value: V): boolean { return ConcurrentMap.insert(this.self, key, value); }
    replace(key: K, expectedValue: V, replacementValue: V): boolean { return ConcurrentMap.replace(this.self, key, expectedValue, replacementValue); }
    exchange(key: K, value: V | undefined): V | undefined { return ConcurrentMap.exchange(this.self, key, value); }
    compareExchange(key: K, expectedValue: V | undefined, replacementValue: V | undefined): V | undefined { return ConcurrentMap.compareExchange(this.self, key, expectedValue, replacementValue); }
    clear(): void { return ConcurrentMap.clear(this.self); }
    keys(): IterableIterator<K> { return ConcurrentMap.keys(this.self); }
    values(): IterableIterator<V> { return ConcurrentMap.values(this.self); }
    entries(): IterableIterator<[K, V]> { return ConcurrentMap.entries(this.self); }
    [Symbol.iterator]() { return this.entries(); }
}
