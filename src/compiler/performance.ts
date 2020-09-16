/*@internal*/
/** Performance measurements for the compiler. */
namespace ts.performance {
    declare const onProfilerEvent: { (markName: string): void; profiler: boolean; };
    const profilerEvent: (markName: string) => void = typeof onProfilerEvent === "function" && onProfilerEvent.profiler === true ? onProfilerEvent : noop;

    let perfHooks: PerformanceHooks | undefined;
    let perfObserver: PerformanceObserver | undefined;
    let perfEntryList: PerformanceObserverEntryList | undefined;
    let enabled = false;

    export interface Timer {
        enter(): void;
        exit(): void;
    }

    export function createTimerIf(condition: boolean, measureName: string, startMarkName: string, endMarkName: string) {
        return condition ? createTimer(measureName, startMarkName, endMarkName) : nullTimer;
    }

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

    export const nullTimer: Timer = { enter: noop, exit: noop };

    /**
     * Marks a performance event.
     *
     * @param markName The name of the mark.
     */
    export function mark(markName: string) {
        if (perfHooks && enabled) {
            perfHooks.performance.mark(markName);
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
        if (perfHooks && enabled) {
            perfHooks.performance.measure(measureName, startMarkName, endMarkName);
        }
    }

    /**
     * Gets the number of times a marker was encountered.
     *
     * @param markName The name of the mark.
     */
    export function getCount(markName: string) {
        return perfEntryList?.getEntriesByName(markName, "mark").length || 0;
    }

    /**
     * Gets the total duration of all measurements with the supplied name.
     *
     * @param measureName The name of the measure whose durations should be accumulated.
     */
    export function getDuration(measureName: string) {
        return perfEntryList?.getEntriesByName(measureName, "measure").reduce((a, entry) => a + entry.duration, 0) || 0;
    }

    /**
     * Iterate over each measure, performing some action
     *
     * @param cb The action to perform for each measure
     */
    export function forEachMeasure(cb: (measureName: string, duration: number) => void) {
        perfEntryList?.getEntriesByType("measure").forEach(entry => {
            cb(entry.name, entry.duration);
        });
    }

    /** Enables (and resets) performance measurements for the compiler. */
    export function enable() {
        if (!enabled) {
            perfHooks ||= tryGetNativePerformanceHooks() || ShimPerformance?.createPerformanceHooksShim(timestamp);
            if (!perfHooks) throw new Error("TypeScript requires an environment that provides a compatible native Web Performance API implementation.");
            perfObserver ||= new perfHooks.PerformanceObserver(list => perfEntryList = list);
            perfObserver.observe({ entryTypes: ["mark", "measure"] });
            enabled = true;
        }
    }

    /** Disables performance measurements for the compiler. */
    export function disable() {
        perfObserver?.disconnect();
        enabled = false;
    }
}
