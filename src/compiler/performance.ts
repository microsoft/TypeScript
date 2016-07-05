/*@internal*/
namespace ts {
    /** Performance measurements for the compiler. */
    export namespace performance {
        declare const onProfilerEvent: { (markName: string): void; profiler: boolean; };
        declare const performance: { now?(): number } | undefined;
        let profilerEvent: (markName: string) => void;
        let markInternal: () => number;
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
                counters[counterName] = (getProperty(counters, counterName) || 0) + 1;
            }
        }

        /**
         * Gets the value of the counter with the specified name.
         *
         * @param counterName The name of the counter.
         */
        export function getCount(counterName: string) {
            return counters && getProperty(counters, counterName) || 0;
        }

        /**
         * Marks the start of a performance measurement.
         */
        export function mark() {
            return measures ? markInternal() : 0;
        }

        /**
         * Adds a performance measurement with the specified name.
         *
         * @param measureName The name of the performance measurement.
         * @param marker The timestamp of the starting mark.
         */
        export function measure(measureName: string, marker: number) {
            if (measures) {
                measures[measureName] = (getProperty(measures, measureName) || 0) + (Date.now() - marker);
            }
        }

        /**
         * Gets the total duration of all measurements with the supplied name.
         *
         * @param measureName The name of the measure whose durations should be accumulated.
         */
        export function getDuration(measureName: string) {
            return measures && getProperty(measures, measureName) || 0;
        }

        /** Enables (and resets) performance measurements for the compiler. */
        export function enable() {
            counters = { };
            measures = {
                programTime: 0,
                parseTime: 0,
                bindTime: 0,
                checkTime: 0,
                emitTime: 0,
                ioReadTime: 0,
                ioWriteTime: 0,
            };

            profilerEvent = typeof onProfilerEvent === "function" && onProfilerEvent.profiler === true
                ? onProfilerEvent
                : undefined;
            markInternal = performance && performance.now ? performance.now : Date.now ? Date.now : () => +(new Date());
        }

        /** Disables (and clears) performance measurements for the compiler. */
        export function disable() {
            counters = undefined;
            measures = undefined;
            profilerEvent = undefined;
        }
    }
}