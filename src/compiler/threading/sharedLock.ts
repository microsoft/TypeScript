import "../symbolDisposeShim";

import { Debug } from "../debug";
import { SharedLockable } from "./sharedLockable";
import { SharedMutex } from "./sharedMutex";

/** @internal */
export class SharedLock<T extends SharedLockable | SharedMutex> {
    private _mutex: T | undefined;
    private _lockable: SharedLockable | undefined;
    private _ownsLock = false;

    constructor();
    constructor(mutex: T, t?: "defer-lock" | "try-to-lock" | "adopt-lock");
    constructor(mutex?: T, t?: "defer-lock" | "try-to-lock" | "adopt-lock") {
        this._mutex = mutex;
        this._lockable =
            mutex instanceof SharedMutex ? SharedMutex.asSharedLockable(mutex) :
            mutex;
        if (this._lockable) {
            switch (t) {
                case "defer-lock":
                    break;
                case "try-to-lock":
                    this._ownsLock = this._lockable.tryLockShared();
                    break;
                case "adopt-lock":
                    this._ownsLock = true;
                    break;
                case undefined:
                    this._lockable.lockShared();
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

    tryLock(): boolean {
        Debug.assert(this._lockable);
        Debug.assert(!this._ownsLock);
        this._ownsLock = this._lockable.tryLockShared();
        return this._ownsLock;
    }

    lock(): void {
        Debug.assert(this._lockable);
        Debug.assert(!this._ownsLock);
        this._lockable.lockShared();
        this._ownsLock = true;
    }

    unlock() {
        Debug.assert(this._lockable);
        Debug.assert(this._ownsLock);
        this._ownsLock = false;
        this._lockable.unlockShared();
    }

    release() {
        this._mutex = undefined;
        this._lockable = undefined;
        this._ownsLock = false;
    }

    swap(other: SharedLock<T>) {
        const mutex = other._mutex;
        other._mutex = this._mutex;
        const lockable = other._lockable;
        other._lockable = this._lockable;
        const ownsLock = other._ownsLock;
        other._ownsLock = this._ownsLock;
        this._mutex = mutex;
        this._lockable = lockable;
        this._ownsLock = ownsLock;
    }

    move() {
        const other = new SharedLock<T>();
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
                lockable.unlockShared();
            }
        }
    }
}
