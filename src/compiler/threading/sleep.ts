let mutex: Atomics.Mutex;
let condition: Atomics.Condition;
let timeout: number;

/**
 * Puts the current thread to sleep for the specified number of milliseconds.
 * @internal
 */
export function sleep(ms: number) {
    mutex ??= new Atomics.Mutex();
    condition ??= new Atomics.Condition();
    timeout = ms;
    Atomics.Mutex.lock(mutex, sleepWorker);
}

function sleepWorker() {
    Atomics.Condition.wait(condition, mutex, timeout | 0);
}
