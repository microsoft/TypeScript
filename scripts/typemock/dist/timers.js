"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MAX_INT32 = Math.pow(2, 31) - 1;
const MIN_TIMEOUT_VALUE = 4;
const CLAMP_TIMEOUT_NESTING_LEVEL = 5;
/**
 * Programmatic control over timers.
 */
class Timers {
    constructor() {
        this._nextHandle = 1;
        this._immediates = new Map();
        this._timeouts = new Map();
        this._intervals = new Map();
        this._frames = new Map();
        this._timeline = [];
        this._depth = 0;
        this._time = 0;
        // bind each timer method so that it can be detached from this instance.
        this.setImmediate = this.setImmediate.bind(this);
        this.clearImmedate = this.clearImmedate.bind(this);
        this.setTimeout = this.setTimeout.bind(this);
        this.clearTimeout = this.clearTimeout.bind(this);
        this.setInterval = this.setInterval.bind(this);
        this.clearInterval = this.clearInterval.bind(this);
        this.requestAnimationFrame = this.requestAnimationFrame.bind(this);
        this.cancelAnimationFrame = this.cancelAnimationFrame.bind(this);
    }
    /**
     * Get the current time.
     */
    get time() {
        return this._time;
    }
    /**
     * Gets the time of the last scheduled timer (not including repeating intervals).
     */
    get endTime() {
        return this._timeline && this._timeline.length > 0
            ? this._timeline[this._timeline.length - 1].due
            : this._time;
    }
    /**
     * Gets the estimated time remaining.
     */
    get remainingTime() {
        return this.endTime - this.time;
    }
    getPending(options = {}) {
        const { kind, ms = 0 } = options;
        if (ms < 0)
            throw new TypeError("Argument 'ms' out of range.");
        const dueTimers = [];
        if (!kind || kind === "immediate") {
            this.copyImmediates(dueTimers);
        }
        if (kind !== "immediate") {
            this.copyTimelineBefore(dueTimers, this._time + ms, kind);
        }
        return dueTimers.map(dueTimer => dueTimer.timer);
    }
    /**
     * Advance the current time and trigger callbacks, returning the number of callbacks triggered.
     * @param ms The number of milliseconds to advance.
     * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
     * - Use `0` (default) to disable processing of nested `setImmediate` calls.
     * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
     */
    advance(ms, maxDepth = 0) {
        if (ms < 0)
            throw new TypeError("Argument 'ms' out of range.");
        if (maxDepth < 0)
            throw new TypeError("Argument 'maxDepth' out of range.");
        let count = 0;
        const endTime = this._time + (ms | 0);
        while (true) {
            if (maxDepth >= 0) {
                count += this.executeImmediates(maxDepth);
                maxDepth--;
            }
            const dueTimer = this.dequeueIfBefore(endTime);
            if (dueTimer) {
                this._time = dueTimer.due;
                this.executeTimer(dueTimer);
                count++;
            }
            else {
                this._time = endTime;
                return count;
            }
        }
    }
    /**
     * Advance the current time to the estimated end time and trigger callbacks, returning the number of callbacks triggered.
     * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
     * - Use `0` (default) to disable processing of nested `setImmediate` calls.
     * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
     */
    advanceToEnd(maxDepth = 0) {
        return this.advance(this.remainingTime, maxDepth);
    }
    /**
     * Execute any pending immediate timers, returning the number of timers triggered.
     * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
     * - Use `0` (default) to disable processing of nested `setImmediate` calls.
     * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
     */
    executeImmediates(maxDepth = 0) {
        if ((maxDepth |= 0) < 0)
            throw new TypeError("Argument 'maxDepth' out of range.");
        const dueTimers = [];
        this.copyImmediates(dueTimers);
        let count = this.executeTimers(dueTimers);
        for (let depth = 0; depth < maxDepth && this._immediates.size > 0; depth++) {
            count += this.executeImmediates();
        }
        return count;
    }
    setImmediate(callback, ...args) {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }
        const timer = { kind: "immediate", handle: this._nextHandle++, callback, args };
        const dueTimer = { timer, due: -1 };
        this.addTimer(this._immediates, dueTimer);
        return timer.handle;
    }
    clearImmedate(timerId) {
        const dueTimer = this._immediates.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._immediates, dueTimer);
        }
    }
    setTimeout(callback, timeout, ...args) {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }
        if ((timeout |= 0) < 0)
            timeout = 0;
        if (this._depth >= CLAMP_TIMEOUT_NESTING_LEVEL && timeout < MIN_TIMEOUT_VALUE) {
            timeout = MIN_TIMEOUT_VALUE;
        }
        const timer = { kind: "timeout", handle: this._nextHandle++, callback, args };
        const dueTimer = { timer, due: this._time + timeout };
        this.addTimer(this._timeouts, dueTimer);
        this.addToTimeline(dueTimer);
        return timer.handle;
    }
    clearTimeout(timerId) {
        const dueTimer = this._timeouts.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._timeouts, dueTimer);
            this.removeFromTimeline(dueTimer);
        }
    }
    setInterval(callback, interval, ...args) {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }
        if ((interval |= 0) < 10)
            interval = 10;
        const timer = { kind: "interval", handle: this._nextHandle++, callback, args, interval };
        const dueTimer = { timer, due: this._time + interval };
        this.addTimer(this._intervals, dueTimer);
        this.addToTimeline(dueTimer);
        return timer.handle;
    }
    clearInterval(timerId) {
        const dueTimer = this._intervals.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._intervals, dueTimer);
            this.removeFromTimeline(dueTimer);
        }
    }
    requestAnimationFrame(callback) {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }
        const timer = { kind: "frame", handle: this._nextHandle++, callback };
        const dueTimer = { timer, due: this.nextFrameDueTime() };
        this.addTimer(this._frames, dueTimer);
        this.addToTimeline(dueTimer);
        return timer.handle;
    }
    cancelAnimationFrame(timerId) {
        const dueTimer = this._frames.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._frames, dueTimer);
            this.removeFromTimeline(dueTimer);
        }
    }
    nextFrameDueTime() {
        return this._time + this.nextFrameDelta();
    }
    nextFrameDelta() {
        return 16 - this._time % 16;
    }
    addTimer(timers, dueTimer) {
        if (dueTimer.enabled)
            return;
        timers.set(dueTimer.timer.handle, dueTimer);
        dueTimer.depth = this._depth + 1;
        dueTimer.enabled = true;
    }
    deleteTimer(timers, dueTimer) {
        if (!dueTimer.enabled)
            return;
        timers.delete(dueTimer.timer.handle);
        dueTimer.enabled = false;
    }
    executeTimers(dueTimers) {
        let count = 0;
        for (const dueTimer of dueTimers) {
            this.executeTimer(dueTimer);
            count++;
        }
        return count;
    }
    executeTimer(dueTimer) {
        switch (dueTimer.timer.kind) {
            case "immediate": return this.executeImmediate(dueTimer);
            case "timeout": return this.executeTimeout(dueTimer);
            case "interval": return this.executeInterval(dueTimer);
            case "frame": return this.executeAnimationFrame(dueTimer);
        }
    }
    executeImmediate(dueTimer) {
        if (!dueTimer.enabled)
            return;
        this.deleteTimer(this._immediates, dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);
    }
    executeTimeout(dueTimer) {
        if (!dueTimer.enabled)
            return;
        this.deleteTimer(this._timeouts, dueTimer);
        this.removeFromTimeline(dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);
    }
    executeInterval(dueTimer) {
        if (!dueTimer.enabled)
            return;
        this.removeFromTimeline(dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);
        if (dueTimer.enabled) {
            dueTimer.due += dueTimer.timer.interval;
            this.addToTimeline(dueTimer);
        }
    }
    executeAnimationFrame(dueTimer) {
        if (!dueTimer.enabled)
            return;
        this.deleteTimer(this._frames, dueTimer);
        this.removeFromTimeline(dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, this._time);
    }
    executeCallback(depth = 0, callback, ...args) {
        const savedDepth = this._depth;
        this._depth = depth;
        try {
            callback(...args);
        }
        finally {
            this._depth = savedDepth;
        }
    }
    dequeueIfBefore(dueTime) {
        if (this._timeline.length > 0) {
            const dueTimer = this._timeline[0];
            if (dueTimer.due <= dueTime) {
                this._timeline.shift();
                dueTimer.timeline = false;
                return dueTimer;
            }
        }
    }
    copyImmediates(dueTimers) {
        for (const dueTimer of this._immediates.values()) {
            dueTimers.push(dueTimer);
        }
    }
    copyTimelineBefore(dueTimers, dueTime, kind) {
        for (const dueTimer of this._timeline) {
            if (dueTimer.due <= dueTime && (!kind || dueTimer.timer.kind === kind)) {
                dueTimers.push(dueTimer);
            }
        }
    }
    addToTimeline(dueTimer) {
        if (dueTimer.timeline)
            return;
        let index = binarySearch(this._timeline, dueTimer, getDueTime, compareTimestamps);
        if (index < 0) {
            index = ~index;
        }
        else {
            while (index < this._timeline.length) {
                if (this._timeline[index].due > dueTimer.due) {
                    break;
                }
                index++;
            }
        }
        insertAt(this._timeline, index, dueTimer);
        dueTimer.timeline = true;
    }
    removeFromTimeline(dueTimer) {
        if (dueTimer.timeline) {
            let index = binarySearch(this._timeline, dueTimer, getDueTime, compareTimestamps);
            if (index >= 0) {
                while (index < this._timeline.length) {
                    const event = this._timeline[index];
                    if (event === dueTimer) {
                        removeAt(this._timeline, index);
                        dueTimer.timeline = false;
                        return true;
                    }
                    if (event.due > dueTimer.due) {
                        break;
                    }
                    index++;
                }
            }
        }
        return false;
    }
}
Timers.MAX_DEPTH = MAX_INT32;
exports.Timers = Timers;
function getDueTime(v) {
    return v.due;
}
function compareTimestamps(a, b) {
    return a - b;
}
function binarySearch(array, value, keySelector, keyComparer) {
    if (array.length === 0) {
        return -1;
    }
    let low = 0;
    let high = array.length - 1;
    const key = keySelector(value);
    while (low <= high) {
        const middle = low + ((high - low) >> 1);
        const midKey = keySelector(array[middle]);
        const result = keyComparer(midKey, key);
        if (result < 0) {
            low = middle + 1;
        }
        else if (result > 0) {
            high = middle - 1;
        }
        else {
            return middle;
        }
    }
    return ~low;
}
function removeAt(array, index) {
    if (array.length === 0) {
        return;
    }
    else if (index === 0) {
        array.shift();
    }
    else if (index === array.length - 1) {
        array.pop();
    }
    else {
        for (let i = index; i < array.length - 1; i++) {
            array[i] = array[i + 1];
        }
        array.length--;
    }
}
function insertAt(array, index, value) {
    if (index === 0) {
        array.unshift(value);
    }
    else if (index === array.length) {
        array.push(value);
    }
    else {
        for (let i = array.length; i > index; i--) {
            array[i] = array[i - 1];
        }
        array[index] = value;
    }
}

//# sourceMappingURL=timers.js.map
