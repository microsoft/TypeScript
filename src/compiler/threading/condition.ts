import { Debug } from "../debug";
import { Mutex } from "./mutex";
import { Shared, SharedStructBase } from "../sharing/structs/sharedStruct";
import { isTaggedStruct, Tag, Tagged } from "../sharing/structs/taggedStruct";
import { UniqueLock } from "./uniqueLock";

/** @internal */
@Shared()
export class Condition extends Tagged(SharedStructBase, Tag.Condition) {
    @Shared() private _condition = new Atomics.Condition();

    /**
     * Waits until a Condition is signaled via a call to {@link notify|`Condition.notify`}.
     * @param self The condition to wait for.
     * @param lock A {@link UniqueLock} taken for a {@link Mutex}.
     * @param stopWaiting An optional callback that can be used to continue waiting if a necessary condition is not met.
     */
    static wait(self: Condition, lock: UniqueLock<Mutex>, stopWaiting?: () => boolean): void {
        Condition.waitUntil(self, lock, Infinity, stopWaiting!);
    }

    /**
     * Waits until a Condition is signaled via a call to {@link notify|`Condition.notify`}, or until a timeout period
     * has elapsed.
     * @param self The condition to wait for.
     * @param lock A {@link UniqueLock} taken for a {@link Mutex}.
     * @param timeout The number of milliseconds to wait before returning.
     * @returns `"ok"` if the condition was notified before the timeout elapsed, or `"timed-out"` to indicate the
     * timeout elapsed before the condition was notified.
     */
    static waitFor(self: Condition, lock: UniqueLock<Mutex>, timeout: number): "ok" | "timed-out";
    /**
     * Waits until a Condition is signaled via a call to {@link notify|`Condition.notify`}, or until a timeout period
     * has elapsed.
     * @param self The condition to wait for.
     * @param lock A {@link UniqueLock} taken for a {@link Mutex}.
     * @param timeout The number of milliseconds to wait before returning.
     * @param stopWaiting An optional callback that can be used to continue waiting if a necessary condition is not met.
     * @returns `true` if the condition was notified and the `stopWaiting` callback returned `true`. Otherwise,
     * `false` to indicate that the timeout elapsed before the condition was ready.
     */
    static waitFor(self: Condition, lock: UniqueLock<Mutex>, timeout: number, stopWaiting: () => boolean): boolean;
    static waitFor(self: Condition, lock: UniqueLock<Mutex>, timeout: number, stopWaiting?: () => boolean): "ok" | "timed-out" | boolean {
        return Condition.waitUntil(self, lock, Date.now() + timeout, stopWaiting!);
    }

    /**
     * Waits until a Condition is signaled via a call to {@link notify|`Condition.notify`}, or until a specific time has been reached.
     * @param self The condition to wait for.
     * @param lock A {@link UniqueLock} taken for a {@link Mutex}.
     * @param absoluteTimeout The number of milliseconds since the UNIX epoch.
     * @returns `"ok"` if the condition was notified before the timeout elapsed, or `"timed-out"` to indicate the
     * timeout elapsed before the condition was notified.
     */
    static waitUntil(self: Condition, lock: UniqueLock<Mutex>, absoluteTimeout: number): "ok" | "timed-out";
    /**
     * Waits until a Condition is signaled via a call to {@link notify|`Condition.notify`}, or until a specific time has been reached.
     * @param self The condition to wait for.
     * @param lock A {@link UniqueLock} taken for a {@link Mutex}.
     * @param absoluteTimeout The number of milliseconds since the UNIX epoch.
     * @param stopWaiting An optional callback that can be used to continue waiting if a necessary condition is not met.
     * @returns `true` if the condition was notified and the `stopWaiting` callback returned `true`. Otherwise,
     * `false` to indicate that the timeout elapsed before the condition was ready.
     */
    static waitUntil(self: Condition, lock: UniqueLock<Mutex>, absoluteTimeout: number, stopWaiting: () => boolean): boolean;
    static waitUntil(self: Condition, lock: UniqueLock<Mutex>, absoluteTimeout: number, stopWaiting?: () => boolean): "ok" | "timed-out" | boolean {
        const mutex = lock.mutex;
        Debug.assert(mutex);
        Debug.assert(mutex["_locked"]); // eslint-disable-line dot-notation -- declared `private`
        const nativeMutex = mutex["_mutex"]; // eslint-disable-line dot-notation -- declared `private`
        const nativeCondition = mutex["_condition"]; // eslint-disable-line dot-notation -- declared `private`
        return Atomics.Mutex.lock(nativeMutex, () => {
            while (!stopWaiting?.()) {
                mutex["_locked"] = false; // eslint-disable-line dot-notation -- declared `private`
                Atomics.Condition.notify(nativeCondition);
                try {
                    const remainingTimeout = isFinite(absoluteTimeout) ? Date.now() - absoluteTimeout : undefined;
                    const result = Atomics.Condition.wait(self._condition, nativeMutex, remainingTimeout) ? "ok" : "timed-out";
                    if (result === "timed-out") {
                        return stopWaiting ? stopWaiting() : result;
                    }
                    if (!stopWaiting) {
                        return "ok";
                    }
                }
                finally {
                    while (mutex["_locked"]) { // eslint-disable-line dot-notation -- declared `private`
                        Atomics.Condition.wait(nativeCondition, nativeMutex);
                    }
                    mutex["_locked"] = true; // eslint-disable-line dot-notation -- declared `private`
                }
            }
            return true;
        });
    }

    /**
     * Notify one or more waiters on a condition.
     * @param condition The condition to notify.
     * @param count The number of waiters to notify (default: all current waiters).
     * @returns The number of waiters that were notified.
     */
    static notify(self: Condition, count?: number) {
        return Atomics.Condition.notify(self._condition, count);
    }

    static [Symbol.hasInstance](value: unknown): value is Condition {
        return isTaggedStruct(value, Tag.Condition);
    }
}
