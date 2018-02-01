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
export declare type Timer = Immediate | Timeout | Interval | AnimationFrame;
/**
 * Programmatic control over timers.
 */
export declare class Timers {
    static readonly MAX_DEPTH: number;
    private _nextHandle;
    private _immediates;
    private _timeouts;
    private _intervals;
    private _frames;
    private _timeline;
    private _time;
    private _depth;
    constructor();
    /**
     * Get the current time.
     */
    readonly time: number;
    /**
     * Gets the time of the last scheduled timer (not including repeating intervals).
     */
    readonly endTime: number;
    /**
     * Gets the estimated time remaining.
     */
    readonly remainingTime: number;
    getPending(options: {
        kind: "immediate";
        ms?: number;
    }): Immediate[];
    getPending(options: {
        kind: "timeout";
        ms?: number;
    }): Timeout[];
    getPending(options: {
        kind: "interval";
        ms?: number;
    }): Interval[];
    getPending(options: {
        kind: "frame";
        ms?: number;
    }): AnimationFrame[];
    getPending(options?: {
        kind?: Timer["kind"];
        ms?: number;
    }): Timer[];
    /**
     * Advance the current time and trigger callbacks, returning the number of callbacks triggered.
     * @param ms The number of milliseconds to advance.
     * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
     * - Use `0` (default) to disable processing of nested `setImmediate` calls.
     * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
     */
    advance(ms: number, maxDepth?: number): number;
    /**
     * Advance the current time to the estimated end time and trigger callbacks, returning the number of callbacks triggered.
     * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
     * - Use `0` (default) to disable processing of nested `setImmediate` calls.
     * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
     */
    advanceToEnd(maxDepth?: number): number;
    /**
     * Execute any pending immediate timers, returning the number of timers triggered.
     * @param maxDepth The maximum depth for nested `setImmediate` calls to continue processing.
     * - Use `0` (default) to disable processing of nested `setImmediate` calls.
     * - Use `Timers.MAX_DEPTH` to continue processing nested `setImmediate` calls up to the maximum depth.
     */
    executeImmediates(maxDepth?: number): number;
    setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
    clearImmedate(timerId: any): void;
    setTimeout(callback: (...args: any[]) => void, timeout: number, ...args: any[]): any;
    clearTimeout(timerId: any): void;
    setInterval(callback: (...args: any[]) => void, interval: number, ...args: any[]): any;
    clearInterval(timerId: any): void;
    requestAnimationFrame(callback: (time: number) => void): any;
    cancelAnimationFrame(timerId: any): void;
    private nextFrameDueTime();
    private nextFrameDelta();
    private addTimer<T>(timers, dueTimer);
    private deleteTimer<T>(timers, dueTimer);
    private executeTimers(dueTimers);
    private executeTimer(dueTimer);
    private executeImmediate(dueTimer);
    private executeTimeout(dueTimer);
    private executeInterval(dueTimer);
    private executeAnimationFrame(dueTimer);
    private executeCallback(depth, callback, ...args);
    private dequeueIfBefore(dueTime);
    private copyImmediates(dueTimers);
    private copyTimelineBefore(dueTimers, dueTime, kind?);
    private addToTimeline(dueTimer);
    private removeFromTimeline(dueTimer);
}
