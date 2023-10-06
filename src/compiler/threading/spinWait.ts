import { sys } from "../sys";
import { sleep } from "./sleep";

const cpuCount = sys.cpuCount?.() ?? 1;

export class SpinWait {
    private _count = 0;

    reset() {
        this._count = 0;
    }

    spinOnce() {
        this._count = spin(this._count);
    }
}

/**
 * Periodically puts the current thread to sleep in an effort to reduce lock contention.
 * @param currentCount an unsigned 32-bit integer value used to determine the current spin count.
 * @returns the new spin count.
 * @example
 * ```ts
 * let spinCounter = 0;
 * while (!trySomeLockFreeOperation()) {
 *   spinCounter = spin(spinCounter);
 * }
 * ```
 */
export function spin(currentCount: number) {
    currentCount >>>= 0;
    if (cpuCount > 0 && currentCount < 10) {
        for (let i = 0; i < currentCount; i++) {
            // busy loop, do nothing
        }
    }
    else if ((currentCount - 10) % 20 === 19) {
        sleep(2);
    }
    else if ((currentCount - 10) % 5 === 4) {
        sleep(1);
    }
    else {
        sleep(0);
    }
    // on uint32 overflow, reset to 10 so that we do not retry the busy loop
    currentCount = (currentCount + 1) >>> 0;
    if (currentCount === 0) {
        currentCount = 10;
    }
    return currentCount;
}