import "../symbolDisposeShim";

import { hasProperty } from "../core";
import { Debug } from "../debug";
import { BasicLockable, Lockable } from "./lockable";
import { Mutex } from "./mutex";
import { SharedMutex } from "./sharedMutex";

function isLockable(x: BasicLockable): x is Lockable {
    return x instanceof UniqueLock ? !!x.mutex && isLockable(x.mutex) : hasProperty(x, "tryLock") && typeof (x as Lockable).tryLock === "function";
}

/** @internal */
export class UniqueLock<T extends BasicLockable | Mutex | SharedMutex> {
    private _mutex: T | undefined;
    private _lockable: BasicLockable | undefined;
    private _ownsLock = false;

    constructor(mutex?: T);
    constructor(mutex: Extract<T, Lockable | Mutex | SharedMutex>, t?: "defer-lock" | "try-to-lock" | "adopt-lock");
    constructor(mutex: T, t?: "defer-lock" | "adopt-lock");
    constructor(mutex?: T, t?: "defer-lock" | "try-to-lock" | "adopt-lock") {
        this._mutex = mutex;
        this._lockable =
            mutex instanceof Mutex ? Mutex.asLockable(mutex) :
            mutex instanceof SharedMutex ? SharedMutex.asLockable(mutex) :
            mutex;
        if (this._lockable) {
            switch (t) {
                case "defer-lock":
                    break;
                case "try-to-lock":
                    Debug.assert(isLockable(this._lockable));
                    this._ownsLock = this._lockable.tryLock();
                    break;
                case "adopt-lock":
                    this._ownsLock = true;
                    break;
                case undefined:
                    this._lockable.lock();
                    this._ownsLock = true;
                    break;
            }
        }
    }

    get mutex() {
        return this._mutex;
    }

    get ownsLock() {
        return this._ownsLock;
    }

    tryLock(this: UniqueLock<Extract<T, Lockable | Mutex | SharedMutex>>): boolean {
        Debug.assert(this._lockable);
        Debug.assert(!this._ownsLock);
        Debug.assert(isLockable(this._lockable));
        this._ownsLock = this._lockable.tryLock();
        return this._ownsLock;
    }

    lock(): void {
        Debug.assert(this._lockable);
        Debug.assert(!this._ownsLock);
        this._lockable.lock();
        this._ownsLock = true;
    }

    unlock() {
        Debug.assert(this._lockable);
        Debug.assert(this._ownsLock);
        this._ownsLock = false;
        this._lockable.unlock();
    }

    release() {
        this._mutex = undefined;
        this._lockable = undefined;
        this._ownsLock = false;
    }

    swap(other: UniqueLock<T>) {
        const mutex = other._mutex;
        const lockable = other._lockable;
        const ownsLock = other._ownsLock;
        other._mutex = this._mutex;
        other._lockable = this._lockable;
        other._ownsLock = this._ownsLock;
        this._mutex = mutex;
        this._lockable = lockable;
        this._ownsLock = ownsLock;
    }

    move() {
        const other = new UniqueLock<T>();
        other._mutex = this._mutex;
        other._lockable = this._lockable;
        other._ownsLock = this._ownsLock;
        this._mutex = undefined;
        this._lockable = undefined;
        this._ownsLock = false;
        return other;
    }

    [Symbol.dispose]() {
        const lockable = this._lockable;
        if (lockable) {
            const ownsLock = this._ownsLock;
            this._mutex = undefined;
            this._lockable = undefined;
            this._ownsLock = false;
            if (ownsLock) {
                lockable.unlock();
            }
        }
    }
}
