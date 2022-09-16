import * as ts from "./_namespaces/ts";

/** Performance measurements for the compiler. */

let perfHooks: ts.PerformanceHooks | undefined;
// when set, indicates the implementation of `Performance` to use for user timing.
// when unset, indicates user timing is unavailable or disabled.
let performanceImpl: ts.Performance | undefined;

/** @internal */
export interface Timer {
    enter(): void;
    exit(): void;
}

/** @internal */
export function createTimerIf(condition: boolean, measureName: string, startMarkName: string, endMarkName: string) {
    return condition ? createTimer(measureName, startMarkName, endMarkName) : nullTimer;
}

/** @internal */
export function createTimer(measureName: string, startMarkName: string, endMarkName: string): Timer {
    let enterCount = 0;
    return {
        enter,
        exit
    };

    function enter() {
        if (++enterCount === 1) {
            mark(startMarkName);
        }
    }

    function exit() {
        if (--enterCount === 0) {
            mark(endMarkName);
            measure(measureName, startMarkName, endMarkName);
        }
        else if (enterCount < 0) {
            ts.Debug.fail("enter/exit count does not match.");
        }
    }
}

/** @internal */
export const nullTimer: Timer = { enter: ts.noop, exit: ts.noop };

let enabled = false;
let timeorigin = ts.timestamp();
const marks = new ts.Map<string, number>();
const counts = new ts.Map<string, number>();
const durations = new ts.Map<string, number>();

/** @internal */
/**
 * Marks a performance event.
 *
 * @param markName The name of the mark.
 */
export function mark(markName: string) {
    if (enabled) {
        const count = counts.get(markName) ?? 0;
        counts.set(markName, count + 1);
        marks.set(markName, ts.timestamp());
        performanceImpl?.mark(markName);
    }
}

/** @internal */
/**
 * Adds a performance measurement with the specified name.
 *
 * @param measureName The name of the performance measurement.
 * @param startMarkName The name of the starting mark. If not supplied, the point at which the
 *      profiler was enabled is used.
 * @param endMarkName The name of the ending mark. If not supplied, the current timestamp is
 *      used.
 */
export function measure(measureName: string, startMarkName?: string, endMarkName?: string) {
    if (enabled) {
        const end = (endMarkName !== undefined ? marks.get(endMarkName) : undefined) ?? ts.timestamp();
        const start = (startMarkName !== undefined ? marks.get(startMarkName) : undefined) ?? timeorigin;
        const previousDuration = durations.get(measureName) || 0;
        durations.set(measureName, previousDuration + (end - start));
        performanceImpl?.measure(measureName, startMarkName, endMarkName);
    }
}

/** @internal */
/**
 * Gets the number of times a marker was encountered.
 *
 * @param markName The name of the mark.
 */
export function getCount(markName: string) {
    return counts.get(markName) || 0;
}

/** @internal */
/**
 * Gets the total duration of all measurements with the supplied name.
 *
 * @param measureName The name of the measure whose durations should be accumulated.
 */
export function getDuration(measureName: string) {
    return durations.get(measureName) || 0;
}

/** @internal */
/**
 * Iterate over each measure, performing some action
 *
 * @param cb The action to perform for each measure
 */
export function forEachMeasure(cb: (measureName: string, duration: number) => void) {
    durations.forEach((duration, measureName) => cb(measureName, duration));
}

/** @internal */
export function forEachMark(cb: (markName: string) => void) {
    marks.forEach((_time, markName) => cb(markName));
}

/** @internal */
export function clearMeasures(name?: string) {
    if (name !== undefined) durations.delete(name);
    else durations.clear();
    performanceImpl?.clearMeasures(name);
}

/** @internal */
export function clearMarks(name?: string) {
    if (name !== undefined) {
        counts.delete(name);
        marks.delete(name);
    }
    else {
        counts.clear();
        marks.clear();
    }
    performanceImpl?.clearMarks(name);
}

/** @internal */
/**
 * Indicates whether the performance API is enabled.
 */
export function isEnabled() {
    return enabled;
}

/** @internal */
/** Enables (and resets) performance measurements for the compiler. */
export function enable(system: ts.System = ts.sys) {
    if (!enabled) {
        enabled = true;
        perfHooks ||= ts.tryGetNativePerformanceHooks();
        if (perfHooks) {
            timeorigin = perfHooks.performance.timeOrigin;
            // NodeJS's Web Performance API is currently slower than expected, but we'd still like
            // to be able to leverage native trace events when node is run with either `--cpu-prof`
            // or `--prof`, if we're running with our own `--generateCpuProfile` flag, or when
            // running in debug mode (since its possible to generate a cpu profile while debugging).
            if (perfHooks.shouldWriteNativeEvents || system?.cpuProfilingEnabled?.() || system?.debugMode) {
                performanceImpl = perfHooks.performance;
            }
        }
    }
    return true;
}

/** @internal */
/** Disables performance measurements for the compiler. */
export function disable() {
    if (enabled) {
        marks.clear();
        counts.clear();
        durations.clear();
        performanceImpl = undefined;
        enabled = false;
    }
}
