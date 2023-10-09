import "../symbolDisposeShim";

import { Debug } from "../debug";
import { Identifiable } from "../sharing/structs/identifiableStruct";
import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";
import { isTaggedStruct, Tag, Tagged } from "../sharing/structs/taggedStruct";
import { Lockable } from "./lockable";
import { SharedLockable } from "./sharedLockable";

const EXCLUSIVE = 1 << 31 >>> 0;
const SHARED = ~EXCLUSIVE >>> 0;

let tryLock: (self: SharedMutex, cacheKey: object | undefined) => boolean;
let lock: (self: SharedMutex, cacheKey: object | undefined) => void;
let unlock: (self: SharedMutex, cacheKey: object | undefined) => void;
let tryLockShared: (self: SharedMutex, cacheKey: object | undefined) => boolean;
let lockShared: (self: SharedMutex, cacheKey: object | undefined) => void;
let unlockShared: (self: SharedMutex, cacheKey: object | undefined) => void;

interface CallbackCache {
    tryLock?: () => void;
    lock?: () => void;
    unlock?: () => void;
    tryLockShared?: () => void;
    lockShared?: () => void;
    unlockShared?: () => void;
}

/**
 * A mutex that allows both exclusive and non-exclusive locking. Inspired by `std::shared_mutex` in C++.
 * @internal
 */
@Shared()
export class SharedMutex extends Identifiable(Tagged(SharedStructBase, Tag.SharedMutex)) {
    @Shared() private _mutex = new Atomics.Mutex();
    @Shared() private _gate1 = new Atomics.Condition();
    @Shared() private _gate2 = new Atomics.Condition();
    @Shared() private _state = 0;

    static {
        const callbackCache = new WeakMap<object, CallbackCache>();

        // we reuse the same lockTaken variable for each call to tryLock/tryShardLock in a thread because its not
        // reentrant and is reset each time the callback is invoked.
        let lockTaken = false;

        function getCache(key: object | undefined) {
            if (key) {
                let cache = callbackCache.get(key);
                if (!cache) callbackCache.set(key, cache = {});
                return cache;
            }
        }

        function makeTryLockCallback(self: SharedMutex, cache: CallbackCache | undefined) {
            const fn = () => {
                if (self._state === 0) {
                    self._state |= EXCLUSIVE;
                    lockTaken = true;
                }
            };
            return cache ? cache.tryLock = fn : fn;
        }

        function makeLockCallback(self: SharedMutex, cache: CallbackCache | undefined) {
            const fn = () => {
                // take exclusive lock
                while (self._state & EXCLUSIVE) {
                    Atomics.Condition.wait(self._gate1, self._mutex);
                }

                self._state |= EXCLUSIVE;

                // wait for readers to drain
                while (self._state & SHARED) {
                    Atomics.Condition.wait(self._gate2, self._mutex);
                }
            };
            return cache ? cache.lock = fn : fn;
        }

        function makeUnlockCallback(self: SharedMutex, cache: CallbackCache | undefined) {
            const fn = () => {
                // release exclusive lock
                self._state = 0;
            };
            return cache ? cache.unlock = fn : fn;
        }

        function makeTryLockSharedCallback(self: SharedMutex, cache: CallbackCache | undefined) {
            const fn = () => {
                if (self._state === 0) {
                    self._state |= EXCLUSIVE;
                    lockTaken = true;
                }
            };
            return cache ? cache.tryLockShared = fn : fn;
        }

        function makeLockSharedCallback(self: SharedMutex, cache: CallbackCache | undefined) {
            const fn = () => {
                while ((self._state & EXCLUSIVE) || ((self._state & SHARED) >>> 0) === SHARED) {
                    Atomics.Condition.wait(self._gate1, self._mutex);
                }
                const readerCount = ((self._state & SHARED) >>> 0) + 1;
                self._state = (readerCount | (self._state & EXCLUSIVE)) >>> 0;
            };
            return cache ? cache.lockShared = fn : fn;
        }

        function makeUnlockSharedCallback(self: SharedMutex, cache: CallbackCache | undefined) {
            const fn = () => {
                const readerCount = ((self._state & SHARED) >>> 0) - 1;
                self._state = (readerCount | (self._state & EXCLUSIVE)) >>> 0;
                if (self._state & EXCLUSIVE) {
                    if (readerCount === 0) {
                        Atomics.Condition.notify(self._gate2, 1);
                    }
                }
                else {
                    if (readerCount === SHARED - 1) {
                        Atomics.Condition.notify(self._gate1, 1);
                    }
                }
            };
            return cache ? cache.unlockShared = fn : fn;
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
            Atomics.Condition.notify(self._gate1);
        };

        tryLockShared = (self, cacheKey) => {
            lockTaken = false;
            const cache = getCache(cacheKey);
            Atomics.Mutex.tryLock(self._mutex, cache?.tryLockShared ?? makeTryLockSharedCallback(self, cache));
            return lockTaken;
        };

        lockShared = (self, cacheKey) => {
            const cache = getCache(cacheKey);
            Atomics.Mutex.lock(self._mutex, cache?.lockShared ?? makeLockSharedCallback(self, cache));
        };

        unlockShared = (self, cacheKey) => {
            const cache = getCache(cacheKey);
            Atomics.Mutex.lock(self._mutex, cache?.unlockShared ?? makeUnlockCallback(self, cache));
        };
    }

    static tryLock(self: SharedMutex, cb: () => void): boolean {
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

    static lock<T>(self: SharedMutex, cb: () => T): T {
        lock(self, /*cacheKey*/ undefined);
        try {
            return cb();
        }
        finally {
            unlock(self, /*cacheKey*/ undefined);
        }
    }

    static tryLockShared(self: SharedMutex, cb: () => void): boolean {
        if (!tryLockShared(self, /*cacheKey*/ undefined)) {
            return false;
        }
        try {
            cb();
            return true;
        }
        finally {
            unlockShared(self, /*cacheKey*/ undefined);
        }
    }

    static lockShared<T>(self: SharedMutex, cb: () => T): T {
        lockShared(self, /*cacheKey*/ undefined);
        try {
            return cb();
        }
        finally {
            unlockShared(self, /*cacheKey*/ undefined);
        }
    }

    static asLockable(self: SharedMutex): Lockable {
        return new LockableSharedMutex(self);
    }

    static asSharedLockable(self: SharedMutex): SharedLockable {
        return new SharedLockableSharedMutex(self);
    }

    static [Symbol.hasInstance](value: unknown): value is SharedMutex {
        return isTaggedStruct(value, Tag.SharedMutex);
    }
}

class LockableSharedMutex implements Lockable {
    private _mutex: SharedMutex;
    private _ownsLock = false;

    constructor(mutex: SharedMutex) {
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

class SharedLockableSharedMutex implements SharedLockable {
    private _mutex: SharedMutex;
    private _ownsLock = false;

    constructor(mutex: SharedMutex) {
        this._mutex = mutex;
    }

    tryLockShared(): boolean {
        Debug.assert(!this._ownsLock);
        this._ownsLock = tryLockShared(this._mutex, this);
        return this._ownsLock;
    }

    lockShared(): void {
        Debug.assert(!this._ownsLock);
        lockShared(this._mutex, this);
        this._ownsLock = true;
    }

    unlockShared(): void {
        Debug.assert(this._ownsLock);
        unlockShared(this._mutex, this);
        this._ownsLock = false;
    }
}
