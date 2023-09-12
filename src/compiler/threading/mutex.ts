import { hasProperty } from "../core";
import { Debug } from "../debug";
import { Identifiable } from "../sharing/structs/identifiableStruct";
import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";
import { Tag, Tagged, TaggedStruct } from "../sharing/structs/taggedStruct";
import { Lockable } from "./lockable";

let tryLock: (self: Mutex, cacheKey?: object) => boolean;
let lock: (self: Mutex, cacheKey?: object) => void;
let unlock: (self: Mutex, cacheKey?: object) => void;

interface CallbackCache {
    tryLock?: () => void;
    lock?: () => void;
    unlock?: () => void;
}

/**
 * This wraps the experimental `Atomics.Mutex` such that locks can be taken via the RAII-compatible `UniqueLock` and
 * `ScopedLock` primitives.
 * @internal
 */
@Shared()
export class Mutex extends Identifiable(Tagged(SharedStructBase, Tag.Mutex)) {
    @Shared() private _mutex = new Atomics.Mutex();
    @Shared() private _condition = new Atomics.Condition();
    @Shared() private _locked = false;

    static {
        const callbackCache = new WeakMap<object, CallbackCache>();

        // we reuse the same lockTaken variable for each call to tryLock in a thread because its not
        // reentrant and is reset each time the callback is invoked.
        let lockTaken = false;

        function getCache(key: object | undefined) {
            if (key) {
                let cache = callbackCache.get(key);
                if (!cache) callbackCache.set(key, cache = {});
                return cache;
            }
        }

        function makeTryLockCallback(self: Mutex, cache: CallbackCache | undefined) {
            const fn = () => {
                if (!self._locked) {
                    self._locked = true;
                    lockTaken = true;
                }
            };
            return cache ? cache.tryLock = fn : fn;
        }

        function makeLockCallback(self: Mutex, cache: CallbackCache | undefined) {
            const fn = () => {
                while (self._locked) {
                    Atomics.Condition.wait(self._condition, self._mutex);
                }
                self._locked = true;
            };
            return cache ? cache.lock = fn : fn;
        }

        function makeUnlockCallback(self: Mutex, cache: CallbackCache | undefined) {
            const fn = () => {
                self._locked = false;
            };
            return cache ? cache.unlock = fn : fn;
        }

        tryLock = (self, cacheKey) => {
            lockTaken = false;
            const cache = getCache(cacheKey);
            Atomics.Mutex.tryLock(self._mutex, cache?.tryLock ?? makeTryLockCallback(self, cache));
            return lockTaken;
        };

        lock = (self, cacheKey) => {
            const cache = getCache(cacheKey);
            Atomics.Mutex.lock(self._mutex, cache?.lock ?? makeLockCallback(self, cache));
        };

        unlock = (self, cacheKey) => {
            const cache = getCache(cacheKey);
            Atomics.Mutex.lock(self._mutex, cache?.unlock ?? makeUnlockCallback(self, cache));
            Atomics.Condition.notify(self._condition);
        };
    }

    static tryLock(self: Mutex, cb: () => void): boolean {
        if (!tryLock(self, /*cacheKey*/ undefined)) {
            return false;
        }

        try {
            cb();
            return true;
        }
        finally {
            unlock(self, /*cacheKey*/ undefined);
        }
    }

    /**
     * Locks the mutex and invokes `cb` in the context of the lock. The mutex will always be unlocked when the method
     * returns, regardless as to whether `cb` throws an exception.
     */
    static lock<T>(self: Mutex, cb: () => T): T {
        lock(self, /*cacheKey*/ undefined);
        try {
            return cb();
        }
        finally {
            unlock(self, /*cacheKey*/ undefined);
        }
    }

    static asLockable(self: Mutex): Lockable {
        return new LockableMutex(self);
    }

    static [Symbol.hasInstance](value: unknown): value is Mutex {
        return typeof value === "object" && value !== null && // eslint-disable-line no-null/no-null -- necessary for comparison
            hasProperty(value, "__tag__") &&
            (value as TaggedStruct<Tag>).__tag__ === Tag.Mutex;
    }
}

class LockableMutex implements Lockable {
    private _mutex: Mutex;
    private _ownsLock = false;

    constructor(mutex: Mutex) {
        this._mutex = mutex;
    }

    tryLock(): boolean {
        Debug.assert(!this._ownsLock);
        this._ownsLock = tryLock(this._mutex, this);
        return this._ownsLock;
    }

    lock(): void {
        Debug.assert(!this._ownsLock);
        lock(this._mutex, this);
        this._ownsLock = true;
    }

    unlock(): void {
        Debug.assert(this._ownsLock);
        unlock(this._mutex, this);
        this._ownsLock = false;
    }
}
