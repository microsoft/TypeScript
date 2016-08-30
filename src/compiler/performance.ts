/*@internal*/
namespace ts {
    declare const performance: { now?(): number } | undefined;
    /** Gets a timestamp with (at least) ms resolution */
    export const timestamp = typeof performance !== "undefined" && performance.now ? () => performance.now() : Date.now ? Date.now : () => +(new Date());
}

/*@internal*/
/** Performance measurements for the compiler. */
namespace ts.performance {
    declare const onProfilerEvent: { (markName: string): void; profiler: boolean; };

    const profilerEvent = typeof onProfilerEvent === "function" && onProfilerEvent.profiler === true
            ? onProfilerEvent
            : (markName: string) => { };

    let enabled = false;
    let profilerStart = 0;
    let counts: Map<number>;
    let marks: Map<number>;
    let measures: Map<number>;

    /**
     * Marks a performance event.
     *
     * @param markName The name of the mark.
     */
    export function mark(markName: string) {
        if (enabled) {
            marks[markName] = timestamp();
            counts[markName] = (counts[markName] || 0) + 1;
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
    export function measure(measureName: string, startMarkName?: string, endMarkName?: string) {
        if (enabled) {
            const end = endMarkName && marks[endMarkName] || timestamp();
            const start = startMarkName && marks[startMarkName] || profilerStart;
            measures[measureName] = (measures[measureName] || 0) + (end - start);
        }
    }

    /**
     * Gets the number of times a marker was encountered.
     *
     * @param markName The name of the mark.
     */
    export function getCount(markName: string) {
        return counts && counts[markName] || 0;
    }

    /**
     * Gets the total duration of all measurements with the supplied name.
     *
     * @param measureName The name of the measure whose durations should be accumulated.
     */
    export function getDuration(measureName: string) {
        return measures && measures[measureName] || 0;
    }

    /**
     * Iterate over each measure, performing some action
     *
     * @param cb The action to perform for each measure
     */
    export function forEachMeasure(cb: (measureName: string, duration: number) => void) {
        for (const key in measures) {
            cb(key, measures[key]);
        }
    }

    /** Enables (and resets) performance measurements for the compiler. */
    export function enable() {
        counts = createMap<number>();
        marks = createMap<number>();
        measures = createMap<number>();
        enabled = true;
        profilerStart = timestamp();
    }

    /** Disables performance measurements for the compiler. */
    export function disable() {
        enabled = false;
    }
}
