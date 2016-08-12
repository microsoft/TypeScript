/*@internal*/
namespace ts {
    declare const performance: { now?(): number } | undefined;
    /** Gets a timestamp with (at least) ms resolution */
    export const timestamp = typeof performance !== "undefined" && performance.now ? () => performance.now() : Date.now ? Date.now : () => +(new Date());
}

/*@internal*/
namespace ts.performance {
    /** Performance measurements for the compiler. */
    declare const onProfilerEvent: { (markName: string): void; profiler: boolean; };
    let profilerEvent: (markName: string) => void;
    let counters: Map<number>;
    let measures: Map<number>;

    /**
     * Emit a performance event if ts-profiler is connected. This is primarily used
     * to generate heap snapshots.
     *
     * @param eventName A name for the event.
     */
    export function emit(eventName: string) {
        if (profilerEvent) {
            profilerEvent(eventName);
        }
    }

    /**
     * Increments a counter with the specified name.
     *
     * @param counterName The name of the counter.
     */
    export function increment(counterName: string) {
        if (counters) {
            counters[counterName] = (Map.get(counters, counterName) || 0) + 1;
        }
    }

    /**
     * Gets the value of the counter with the specified name.
     *
     * @param counterName The name of the counter.
     */
    export function getCount(counterName: string) {
        return counters && Map.get(counters, counterName) || 0;
    }

    /**
     * Marks the start of a performance measurement.
     */
    export function mark() {
        return measures ? timestamp() : 0;
    }

    /**
     * Adds a performance measurement with the specified name.
     *
     * @param measureName The name of the performance measurement.
     * @param marker The timestamp of the starting mark.
     */
    export function measure(measureName: string, marker: number) {
        if (measures) {
            measures[measureName] = (Map.get(measures, measureName) || 0) + (timestamp() - marker);
        }
    }

    /**
     * Iterate over each measure, performing some action
     *
     * @param cb The action to perform for each measure
     */
    export function forEachMeasure(cb: (measureName: string, duration: number) => void) {
        for (const key in measures) if (Map.guard(measures, key)) {
            cb(key, measures[key]);
        }
    }

    /**
     * Gets the total duration of all measurements with the supplied name.
     *
     * @param measureName The name of the measure whose durations should be accumulated.
     */
    export function getDuration(measureName: string) {
        return measures && Map.get(measures, measureName) || 0;
    }

    /** Enables (and resets) performance measurements for the compiler. */
    export function enable() {
        counters = Map.create<number>();
        measures = Map.create<number>();

        profilerEvent = typeof onProfilerEvent === "function" && onProfilerEvent.profiler === true
            ? onProfilerEvent
            : undefined;
    }

    /** Disables (and clears) performance measurements for the compiler. */
    export function disable() {
        counters = undefined;
        measures = undefined;
        profilerEvent = undefined;
    }
}
