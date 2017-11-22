export interface Immediate {
    readonly kind: "immediate";
    readonly handle: number;
    readonly callback: (...args: any[]) => void;
    readonly args: ReadonlyArray<any>;
}

export interface Timeout {
    readonly kind: "timeout";
    readonly handle: number;
    readonly callback: (...args: any[]) => void;
    readonly args: ReadonlyArray<any>;
}

export interface Interval {
    readonly kind: "interval";
    readonly handle: number;
    readonly callback: (...args: any[]) => void;
    readonly args: ReadonlyArray<any>;
    readonly interval: number;
}

export interface AnimationFrame {
    readonly kind: "frame";
    readonly handle: number;
    readonly callback: (time: number) => void;
}

export type Timer = Immediate | Timeout | Interval | AnimationFrame;

type NonImmediateTimer = Timeout | Interval | AnimationFrame;

interface Due<T extends Timer> {
    timer: T;
    due: number;
    depth?: number;
    enabled?: boolean;
    timeline?: boolean;
}

const MAX_INT32 = 2 ** 31 - 1;
const MIN_TIMEOUT_VALUE = 4;
const CLAMP_TIMEOUT_NESTING_LEVEL = 5;

/**
 * Programmatic control over timers.
 */
export class Timers {
    public static readonly MAX_DEPTH = MAX_INT32;

    private _nextHandle = 1;
    private _immediates = new Map<number, Due<Immediate>>();
    private _timeouts = new Map<number, Due<Timeout>>();
    private _intervals = new Map<number, Due<Interval>>();
    private _frames = new Map<number, Due<AnimationFrame>>();
    private _timeline: Due<NonImmediateTimer>[] = [];
    private _time: number;
    private _depth = 0;

    constructor() {
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
    public get time(): number {
        return this._time;
    }

    /**
     * Gets the time of the last scheduled timer (not including repeating intervals).
     */
    public get endTime(): number {
        return this._timeline && this._timeline.length > 0
            ? this._timeline[this._timeline.length - 1].due
            : this._time;
    }

    /**
     * Gets the estimated time remaining.
     */
    public get remainingTime(): number {
        return this.endTime - this.time;
    }

    public getPending(options: { kind: "immediate", ms?: number }): Immediate[];
    public getPending(options: { kind: "timeout", ms?: number }): Timeout[];
    public getPending(options: { kind: "interval", ms?: number }): Interval[];
    public getPending(options: { kind: "frame", ms?: number }): AnimationFrame[];
    public getPending(options?: { kind?: Timer["kind"], ms?: number }): Timer[];
    public getPending(options: { kind?: Timer["kind"], ms?: number } = {}): Timer[] {
        const { kind, ms = 0 } = options;
        if (ms < 0) throw new TypeError("Argument 'ms' out of range.");

        const dueTimers: Due<Timer>[] = [];

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
    public advance(ms: number, maxDepth = 0): number {
        if (ms <= 0) throw new TypeError("Argument 'ms' out of range.");
        if (maxDepth < 0) throw new TypeError("Argument 'maxDepth' out of range.");
        let count = 0;
        const endTime = this._time + (ms | 0);
        while (true) {
            count += this.executeImmediates(maxDepth);
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
    public advanceToEnd(maxDepth = 0) {
        return this.remainingTime > 0 ? this.advance(this.remainingTime, maxDepth) : 0;
    }

    /**
     * Execute any pending immediate timers, returning the number of timers triggered.
     * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
     * - Use `0` (default) to disable processing of nested `setImmediate` calls.
     * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
     */
    public executeImmediates(maxDepth = 0): number {
        if ((maxDepth |= 0) < 0) throw new TypeError("Argument 'maxDepth' out of range.");
        const dueTimers: Due<Timer>[] = [];
        this.copyImmediates(dueTimers);
        let count = this.executeTimers(dueTimers);
        for (let depth = 0; depth < maxDepth && this._immediates.size > 0; depth++) {
            count += this.executeImmediates();
        }
        return count;
    }

    public setImmediate(callback: (...args: any[]) => void, ...args: any[]): any {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }

        const timer: Immediate = { kind: "immediate", handle: this._nextHandle++, callback, args };
        const dueTimer: Due<Immediate> = { timer, due: -1 };
        this.addTimer(this._immediates, dueTimer);
        return timer.handle;
    }

    public clearImmedate(timerId: any): void {
        const dueTimer = this._immediates.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._immediates, dueTimer);
        }
    }

    public setTimeout(callback: (...args: any[]) => void, timeout: number, ...args: any[]): any {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }

        if ((timeout |= 0) < 0) timeout = 0;

        if (this._depth >= CLAMP_TIMEOUT_NESTING_LEVEL && timeout < MIN_TIMEOUT_VALUE) {
            timeout = MIN_TIMEOUT_VALUE;
        }

        const timer: Timeout = { kind: "timeout", handle: this._nextHandle++, callback, args };
        const dueTimer: Due<Timeout> = { timer, due: this._time + timeout };
        this.addTimer(this._timeouts, dueTimer);
        this.addToTimeline(dueTimer);
        return timer.handle;
    }

    public clearTimeout(timerId: any): void {
        const dueTimer = this._timeouts.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._timeouts, dueTimer);
            this.removeFromTimeline(dueTimer);
        }
    }

    public setInterval(callback: (...args: any[]) => void, interval: number, ...args: any[]): any {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }

        if ((interval |= 0) < 10) interval = 10;
        const timer: Interval = { kind: "interval", handle: this._nextHandle++, callback, args, interval };
        const dueTimer: Due<Interval> = { timer, due: this._time + interval };
        this.addTimer(this._intervals, dueTimer);
        this.addToTimeline(dueTimer);
        return timer.handle;
    }

    public clearInterval(timerId: any): void {
        const dueTimer = this._intervals.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._intervals, dueTimer);
            this.removeFromTimeline(dueTimer);
        }
    }

    public requestAnimationFrame(callback: (time: number) => void): any {
        if (this._depth >= Timers.MAX_DEPTH) {
            throw new Error("callback nested too deeply.");
        }

        const timer: AnimationFrame = { kind: "frame", handle: this._nextHandle++, callback };
        const dueTimer: Due<AnimationFrame> = { timer, due: this.nextFrameDueTime() };
        this.addTimer(this._frames, dueTimer);
        this.addToTimeline(dueTimer);
        return timer.handle;
    }

    public cancelAnimationFrame(timerId: any): void {
        const dueTimer = this._frames.get(timerId);
        if (dueTimer) {
            this.deleteTimer(this._frames, dueTimer);
            this.removeFromTimeline(dueTimer);
        }
    }

    private nextFrameDueTime() {
        return this._time + this.nextFrameDelta();
    }

    private nextFrameDelta() {
        return 16 - this._time % 16;
    }

    private addTimer<T extends Timer>(timers: Map<number, Due<T>>, dueTimer: Due<T>) {
        if (dueTimer.enabled) return;
        timers.set(dueTimer.timer.handle, dueTimer);
        dueTimer.depth = this._depth + 1;
        dueTimer.enabled = true;
    }

    private deleteTimer<T extends Timer>(timers: Map<number, Due<T>>, dueTimer: Due<T>) {
        if (!dueTimer.enabled) return;
        timers.delete(dueTimer.timer.handle);
        dueTimer.enabled = false;
    }

    private executeTimers(dueTimers: Due<Timer>[]) {
        let count = 0;
        for (const dueTimer of dueTimers) {
            this.executeTimer(dueTimer);
            count++;
        }
        return count;
    }

    private executeTimer(dueTimer: Due<Timer>) {
        switch (dueTimer.timer.kind) {
            case "immediate": return this.executeImmediate(<Due<Immediate>>dueTimer);
            case "timeout": return this.executeTimeout(<Due<Timeout>>dueTimer);
            case "interval": return this.executeInterval(<Due<Interval>>dueTimer);
            case "frame": return this.executeAnimationFrame(<Due<AnimationFrame>>dueTimer);
        }
    }

    private executeImmediate(dueTimer: Due<Immediate>) {
        if (!dueTimer.enabled) return;

        this.deleteTimer(this._immediates, dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);
    }

    private executeTimeout(dueTimer: Due<Timeout>) {
        if (!dueTimer.enabled) return;

        this.deleteTimer(this._timeouts, dueTimer);
        this.removeFromTimeline(dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);
    }

    private executeInterval(dueTimer: Due<Interval>) {
        if (!dueTimer.enabled) return;

        this.removeFromTimeline(dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, ...dueTimer.timer.args);

        if (dueTimer.enabled) {
            dueTimer.due += dueTimer.timer.interval;
            this.addToTimeline(dueTimer);
        }
    }

    private executeAnimationFrame(dueTimer: Due<AnimationFrame>) {
        if (!dueTimer.enabled) return;

        this.deleteTimer(this._frames, dueTimer);
        this.removeFromTimeline(dueTimer);
        this.executeCallback(dueTimer.depth, dueTimer.timer.callback, this._time);
    }

    private executeCallback(depth = 0, callback: (...args: any[]) => void, ...args: any[]) {
        const savedDepth = this._depth;
        this._depth = depth;
        try {
            callback(...args);
        }
        finally {
            this._depth = savedDepth;
        }
    }

    private dequeueIfBefore(dueTime: number) {
        if (this._timeline.length > 0) {
            const dueTimer = this._timeline[0];
            if (dueTimer.due <= dueTime) {
                this._timeline.shift();
                dueTimer.timeline = false;
                return dueTimer;
            }
        }
    }

    private copyImmediates(dueTimers: Due<Timer>[]) {
        for (const dueTimer of this._immediates.values()) {
            dueTimers.push(dueTimer);
        }
    }

    private copyTimelineBefore(dueTimers: Due<Timer>[], dueTime: number, kind?: Timer["kind"]) {
        for (const dueTimer of this._timeline) {
            if (dueTimer.due <= dueTime && (!kind || dueTimer.timer.kind === kind)) {
                dueTimers.push(dueTimer);
            }
        }
    }

    private addToTimeline(dueTimer: Due<NonImmediateTimer>) {
        if (dueTimer.timeline) return;

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

    private removeFromTimeline(dueTimer: Due<NonImmediateTimer>) {
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

function getDueTime(v: Due<Timer>) {
    return v.due;
}

function compareTimestamps(a: number, b: number) {
    return a - b;
}

function binarySearch<T, U>(array: ReadonlyArray<T>, value: T, keySelector: (v: T) => U, keyComparer: (a: U, b: U) => number): number {
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

function removeAt<T>(array: T[], index: number): void {
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

function insertAt<T>(array: T[], index: number, value: T): void {
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