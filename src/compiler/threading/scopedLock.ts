import "../symbolDisposeShim";
import { createSuppressedError } from "../symbolDisposeShim";

import { Lockable } from "./lockable";
import { Mutex } from "./mutex";
import { SharedMutex } from "./sharedMutex";

/** @internal */
export class ScopedLock {
    private _mutexes: readonly Lockable[] | undefined;

    constructor(mutexes: ArrayLike<Mutex | SharedMutex> | Iterable<Lockable | Mutex | SharedMutex>) {
        const array: Lockable[] = [];
        for (const mutex of Array.from(mutexes)) {
            array.push(
                mutex instanceof Mutex ? Mutex.asLockable(mutex) :
                    mutex instanceof SharedMutex ? SharedMutex.asLockable(mutex) :
                        mutex);
        }

        let remaining = array.length;
        let index = 0;
        let error;
        let hasError = false;
        while (!hasError) {
            try {
                if (remaining === 0) {
                    // return all locks taken, in the order they were taken. index should be back at the first lock taken in
                    // this attempt.
                    this._mutexes = [...array.slice(index), ...array.slice(0, index)];
                    return;
                }

                const lockable = array[index];
                if (remaining === array.length) {
                    // always wait for the first lock
                    lockable.lock();
                }
                else if (!lockable.tryLock()) {
                    // if we fail to take a lock, unlock each lock taken so far so that we start over at the current
                    // index.
                    let i = (index + array.length - 1) % array.length;
                    while (remaining < array.length) {
                        // always unlock all locks taken, even if one unlock fails for some reason.
                        try {
                            array[i].unlock();
                        }
                        catch (e) {
                            error = error ? createSuppressedError(e, error) : e;
                            hasError = true;
                        }
                        i = (index + array.length - 1) % array.length;
                        remaining++;
                    }
                    continue;
                }

                // this lock was taken. move to the next lock
                index = (index + 1) % array.length;
                remaining--;
            }
            catch (e) {
                error = error ? createSuppressedError(e, error) : e;
                hasError = true;
            }
        }

        // if we reach this point, an error occurred. unlock all locks taken in reverse order and throw the error.
        let i = (index + array.length - 1) % array.length;
        while (remaining < array.length) {
            // always unlock all locks taken, even if one unlock fails for some reason.
            try {
                array[i].unlock();
            }
            catch (e) {
                error = createSuppressedError(e, error);
            }
            i = (index + array.length - 1) % array.length;
            remaining++;
        }

        throw error;
    }

    [Symbol.dispose]() {
        const mutexes = this._mutexes;
        if (mutexes) {
            this._mutexes = undefined;
            for (let i = mutexes.length - 1; i >= 0; i--) {
                mutexes[i].unlock();
            }
        }
    }
}
