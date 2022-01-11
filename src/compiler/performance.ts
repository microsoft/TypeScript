import { PerformanceHooks, Performance, Debug, noop, timestamp, System, sys, tryGetNativePerformanceHooks } from "./ts";
import * as ts from "./ts";
/*@internal*/
/** Performance measurements for the compiler. */
let perfHooks: PerformanceHooks | undefined;
// when set, indicates the implementation of `Performance` to use for user timing.
// when unset, indicates user timing is unavailable or disabled.
/* @internal */
let performanceImpl: Performance | undefined;

/* @internal */
export interface Timer {
    enter(): void;
    exit(): void;
}

/* @internal */
export function createTimerIf(condition: boolean, measureName: string, startMarkName: string, endMarkName: string) {
    return condition ? createTimer(measureName, startMarkName, endMarkName) : nullTimer;
}

/* @internal */
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
            Debug.fail("enter/exit count does not match.");
        }
    }
}

/* @internal */
export const nullTimer: Timer = { enter: noop, exit: noop };

/* @internal */
let enabled = false;
/* @internal */
let timeorigin = timestamp();
/* @internal */
const marks = new ts.Map<string, number>();
/* @internal */
const counts = new ts.Map<string, number>();
/* @internal */
const durations = new ts.Map<string, number>();

/**
 * Marks a performance event.
 *
 * @param markName The name of the mark.
 */
/* @internal */
export function mark(markName: string) {
    if (enabled) {
        const count = counts.get(markName) ?? 0;
        counts.set(markName, count + 1);
        marks.set(markName, timestamp());
        performanceImpl?.mark(markName);
    }
}

/**
 * Adds a performance measurement with the specified name.
 *
 * @param measureName The name of the performance measurement.
 * @param startMarkName The name of the starting mark. If not supplied, the point at which the
 *      profiler was enabled is used.
 * @param endMarkName The name of the ending mark. If not supplied, the current timestamp is
 *      used.
 */
/* @internal */
export function measure(measureName: string, startMarkName?: string, endMarkName?: string) {
    if (enabled) {
        const end = (endMarkName !== undefined ? marks.get(endMarkName) : undefined) ?? timestamp();
        const start = (startMarkName !== undefined ? marks.get(startMarkName) : undefined) ?? timeorigin;
        const previousDuration = durations.get(measureName) || 0;
        durations.set(measureName, previousDuration + (end - start));
        performanceImpl?.measure(measureName, startMarkName, endMarkName);
    }
}

/**
 * Gets the number of times a marker was encountered.
 *
 * @param markName The name of the mark.
 */
/* @internal */
export function getCount(markName: string) {
    return counts.get(markName) || 0;
}

/**
 * Gets the total duration of all measurements with the supplied name.
 *
 * @param measureName The name of the measure whose durations should be accumulated.
 */
/* @internal */
export function getDuration(measureName: string) {
    return durations.get(measureName) || 0;
}

/**
 * Iterate over each measure, performing some action
 *
 * @param cb The action to perform for each measure
 */
/* @internal */
export function forEachMeasure(cb: (measureName: string, duration: number) => void) {
    durations.forEach((duration, measureName) => cb(measureName, duration));
}

/**
 * Indicates whether the performance API is enabled.
 */
/* @internal */
export function isEnabled() {
    return enabled;
}

/** Enables (and resets) performance measurements for the compiler. */
/* @internal */
export function enable(system: System = sys) {
    if (!enabled) {
        enabled = true;
        perfHooks ||= tryGetNativePerformanceHooks();
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

/** Disables performance measurements for the compiler. */
/* @internal */
export function disable() {
    if (enabled) {
        marks.clear();
        counts.clear();
        durations.clear();
        performanceImpl = undefined;
        enabled = false;
    }
}
