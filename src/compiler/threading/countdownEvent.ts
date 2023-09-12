import { Condition, Debug, isTaggedStruct, Mutex, Shared, SharedStructBase, Tag, Tagged, UniqueLock } from "../_namespaces/ts";

const MAX_INT32 = 2 ** 31 - 1;

/** @internal */
@Shared()
export class CountdownEvent extends Tagged(SharedStructBase, Tag.CountdownEvent) {
    @Shared() private _mutex: Mutex | undefined = new Mutex();
    @Shared() private _condition: Condition | undefined = new Condition();
    @Shared() private _signaled = false;
    @Shared() private _initialCount: number;
    @Shared() private _remainingCount: number = 0;

    constructor(initialCount = 0) {
        super();
        initialCount |= 0;
        Debug.assert(initialCount >= 0, "initialCount out of range");
        this._initialCount = initialCount;
        this._remainingCount = initialCount;
        this._signaled = initialCount === 0;
    }

    static initialCount(self: CountdownEvent) {
        return self._initialCount;
    }

    static remainingCount(self: CountdownEvent) {
        return self._remainingCount;
    }

    static isSet(self: CountdownEvent) {
        return self._remainingCount === 0;
    }

    static add(self: CountdownEvent, count?: number) {
        Debug.assert(CountdownEvent.tryAdd(self, count), "event is already signaled");
    }

    static tryAdd(self: CountdownEvent, count = 1) {
        count |= 0;
        Debug.assert(count >= 1, "count out of range");
        Debug.assert(self._mutex, "object disposed");
        using _ = new UniqueLock(self._mutex);
        if (self._remainingCount === 0) return false;
        Debug.assert(self._remainingCount <= MAX_INT32 - count, "count out of range");
        self._remainingCount += count;
        return true;
    }

    static reset(self: CountdownEvent, count?: number) {
        if (count !== undefined) {
            count |= 0;
            Debug.assert(count >= 0, "count out of range");
        }

        Debug.assert(self._mutex && self._condition, "object disposed");
        using _ = new UniqueLock(self._mutex);
        count ??= self._initialCount;
        self._remainingCount = count;
        self._initialCount = count;
        if (count === 0) {
            if (!self._signaled) {
                self._signaled = true;
                Condition.notify(self._condition);
            }
        }
        else {
            self._signaled = false;
        }
    }

    static signal(self: CountdownEvent, count = 1) {
        count |= 0;
        Debug.assert(count >= 1, "count out of range");

        Debug.assert(self._mutex && self._condition, "object disposed");
        using _ = new UniqueLock(self._mutex);
        Debug.assert(self._remainingCount >= count, "count out of range");
        self._remainingCount = self._remainingCount - count;
        if (self._remainingCount === 0) {
            if (!self._signaled) {
                self._signaled = true;
                Condition.notify(self._condition);
            }
            return true;
        }
        return false;
    }

    static wait(self: CountdownEvent, timeout?: number) {
        if (timeout !== undefined) {
            timeout = Math.max(0, timeout | 0);
        }

        Debug.assert(self._mutex && self._condition, "object disposed");
        if (CountdownEvent.isSet(self)) {
            return true;
        }

        using lck = new UniqueLock(self._mutex);
        if (timeout !== undefined) {
            return Condition.waitFor(self._condition, lck, timeout) !== "timeout";
        }
        else {
            Condition.wait(self._condition, lck);
            return true;
        }
    }

    static close(self: CountdownEvent): void {
        self._mutex = undefined;
        self._condition = undefined;
    }

    static [Symbol.hasInstance](value: unknown): value is CountdownEvent {
        return isTaggedStruct(value, Tag.CountdownEvent);
    }
}
