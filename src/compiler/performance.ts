import { Debug, noop, timestamp, createMap } from "./ts";
import * as ts from "./ts";
/*@internal*/
/** Performance measurements for the compiler. */
declare const onProfilerEvent: {
    (markName: string): void;
    profiler: boolean;
};
// NOTE: cannot use ts.noop as core.ts loads after this
/* @internal */
const profilerEvent: (markName: string) => void = typeof onProfilerEvent === "function" && onProfilerEvent.profiler === true ? onProfilerEvent : () => { };
/* @internal */
let enabled = false;
/* @internal */
let profilerStart = 0;
/* @internal */
let counts: ts.Map<number>;
/* @internal */
let marks: ts.Map<number>;
/* @internal */
let measures: ts.Map<number>;
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
/**
 * Marks a performance event.
 *
 * @param markName The name of the mark.
 */
/* @internal */
export function mark(markName: string) {
    if (enabled) {
        marks.set(markName, timestamp());
        counts.set(markName, (counts.get(markName) || 0) + 1);
        profilerEvent(markName);
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
        const end = endMarkName && marks.get(endMarkName) || timestamp();
        const start = startMarkName && marks.get(startMarkName) || profilerStart;
        measures.set(measureName, (measures.get(measureName) || 0) + (end - start));
    }
}
/**
 * Gets the number of times a marker was encountered.
 *
 * @param markName The name of the mark.
 */
/* @internal */
export function getCount(markName: string) {
    return counts && counts.get(markName) || 0;
}
/**
 * Gets the total duration of all measurements with the supplied name.
 *
 * @param measureName The name of the measure whose durations should be accumulated.
 */
/* @internal */
export function getDuration(measureName: string) {
    return measures && measures.get(measureName) || 0;
}
/**
 * Iterate over each measure, performing some action
 *
 * @param cb The action to perform for each measure
 */
/* @internal */
export function forEachMeasure(cb: (measureName: string, duration: number) => void) {
    measures.forEach((measure, key) => {
        cb(key, measure);
    });
}
/** Enables (and resets) performance measurements for the compiler. */
/* @internal */
export function enable() {
    counts = createMap<number>();
    marks = createMap<number>();
    measures = createMap<number>();
    enabled = true;
    profilerStart = timestamp();
}
/** Disables performance measurements for the compiler. */
/* @internal */
export function disable() {
    enabled = false;
}
