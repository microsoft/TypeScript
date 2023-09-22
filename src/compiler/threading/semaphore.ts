import { Condition, Debug, Mutex, Shared, SharedStructBase, Tag, Tagged, UniqueLock } from "../_namespaces/ts";
import { AtomicValue } from "../sharing/atomicValue";

/** @internal */
@Shared()
export class Semaphore extends Tagged(SharedStructBase, Tag.Semaphore) {
    @Shared() private readonly _maxCount: number;
    @Shared() private readonly _currentCount: AtomicValue<number>;
    @Shared() private readonly _waitCount = new AtomicValue<number>(0);
    @Shared() private readonly _mutex = new Mutex();
    @Shared() private readonly _condition = new Condition();

    constructor(initialCount: number, maxCount: number = 2 ** 31 - 1) {
        Debug.assert(initialCount === (initialCount | 0) && initialCount >= 0);
        Debug.assert(maxCount >= 0 && maxCount >= initialCount);
        super();
        this._maxCount = maxCount;
        this._currentCount = new AtomicValue(initialCount);
    }

    static count(self: Semaphore) {
        return AtomicValue.load(self._currentCount);
    }

    static tryAcquire(self: Semaphore, timeout?: number) {
        if (timeout !== undefined) {
            if (isNaN(timeout) || isFinite(timeout)) timeout |= 0;
            if (timeout < 0) timeout = 0;
        }

        // first, try to acquire a count lock-free
        let count = AtomicValue.load(self._currentCount);
        if (count > 0 && count === (count = AtomicValue.compareExchange(self._currentCount, count, count - 1))) {
            return true;
        }
        if (timeout === undefined) {
            return false;
        }

        const start = Date.now();
        let remaining: number;

        // if that fails, take a lock and wait for a spot to open up
        using lck = new UniqueLock(self._mutex);
        using _waiter = waitScope(self._waitCount);
        do {
            remaining = timeout - (Date.now() - start);
            if (count <= 0) {
                if (Condition.waitFor(self._condition, lck, remaining) === "timed-out") {
                    return false;
                }
                count = AtomicValue.load(self._currentCount);
            }
            else if (count === (count = AtomicValue.compareExchange(self._currentCount, count, count - 1))) {
                return true;
            }
        }
        while (remaining >= 0);
        return false;
    }

    static acquire(self: Semaphore) {
        Semaphore.tryAcquire(self, Infinity);
    }

    static release(self: Semaphore, count = 1) {
        let previousCount = AtomicValue.load(self._currentCount);
        let nextCount: number;
        let waitCount: number;
        do {
            Debug.assert(self._maxCount - previousCount >= count);
            nextCount = previousCount + count;
            waitCount = AtomicValue.load(self._waitCount);
        }
        while (previousCount !== (previousCount = AtomicValue.compareExchange(self._currentCount, previousCount, nextCount)));
        if (nextCount === 1 && waitCount === 1) {
            Condition.notify(self._condition, 1);
        }
        else if (waitCount > 1) {
            Condition.notify(self._condition);
        }
        return previousCount;
    }
}

function waitScope(count: AtomicValue<number>) {
    AtomicValue.increment(count);
    return {
        [Symbol.dispose]() {
            AtomicValue.decrement(count);
        }
    };
}