/*@internal*/
/** Performance measurements for the compiler. */
namespace ts {
    interface Timer {
        enter(): void;
        exit(): void;
    }

    export interface Statistic {
        name: string;
        value: number;
        type: StatisticType
    }

    export enum StatisticType {
        time,
        count,
        memory,
    }

    const nullTimer: Timer = { enter: noop, exit: noop };
    export const performance = createPerformanceTracker();
    export const buildPerformance = createPerformanceTracker();

    function createPerformanceTracker() {
        let perfHooks: PerformanceHooks | undefined;
        // when set, indicates the implementation of `Performance` to use for user timing.
        // when unset, indicates user timing is unavailable or disabled.
        let performanceImpl: Performance | undefined;
        let enabled = false;
        let timeorigin = timestamp();
        const marks = new Map<string, number>();
        const counts = new Map<string, number>();
        const durations = new Map<string, number>();
        const durationMarks = new Set<string>();
        let statistics: ESMap<string, Statistic> | undefined;

        return {
            createTimerIf,
            createTimer,
            mark,
            measure,
            addStatistics,
            getCount,
            getDuration,
            forEachMeasure,
            forEachCount,
            forEachStatistics,
            isEnabled,
            enable,
            disable,
        };

        function createTimerIf(condition: boolean, measureName: string, startMarkName: string, endMarkName: string) {
            return condition ? createTimer(measureName, startMarkName, endMarkName) : nullTimer;
        }

        function createTimer(measureName: string, startMarkName: string, endMarkName: string): Timer {
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

        /**
         * Marks a performance event.
         *
         * @param markName The name of the mark.
         */
        function mark(markName: string) {
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
        function measure(measureName: string, startMarkName: string, endMarkName: string) {
            if (enabled) {
                durationMarks.add(startMarkName).add(endMarkName);
                const end = marks.get(endMarkName) ?? timestamp();
                const start = marks.get(startMarkName) ?? timeorigin;
                const previousDuration = durations.get(measureName) || 0;
                durations.set(measureName, previousDuration + (end - start));
                performanceImpl?.measure(measureName, startMarkName, endMarkName);
            }
        }

        function addStatistics(s: Statistic) {
            if (enabled) {
                const existing = statistics?.get(s.name);
                if (existing) {
                    if (existing.type === StatisticType.memory) existing.value = Math.max(existing.value, s.value);
                    else existing.value += s.value;
                }
                else {
                    (statistics ??= new Map()).set(s.name, s);
                }
            }
        }

        /**
         * Gets the number of times a marker was encountered.
         *
         * @param markName The name of the mark.
         */
        function getCount(markName: string) {
            return counts.get(markName) || 0;
        }

        /**
         * Gets the total duration of all measurements with the supplied name.
         *
         * @param measureName The name of the measure whose durations should be accumulated.
         */
        function getDuration(measureName: string) {
            return durations.get(measureName) || 0;
        }

        /**
         * Iterate over each measure, performing some action
         *
         * @param cb The action to perform for each measure
         */
        function forEachMeasure(cb: (duration: number, measureName: string) => void) {
            durations.forEach(cb);
        }

        /**
         * Iterate over each count which is not duration mark, performing some action
         *
         * @param cb The action to perform for each measure
         */
        function forEachCount(cb: (count: number, countName: string) => void) {
            counts.forEach((count, countName) => !durationMarks.has(countName) && cb(count, countName));
        }


        function forEachStatistics(cb: (statistic: Statistic, name: string) => void) {
            statistics?.forEach(cb);
        }

        /**
         * Indicates whether the performance API is enabled.
         */
        function isEnabled() {
            return enabled;
        }

        /** Enables (and resets) performance measurements for the compiler. */
        function enable(system: System = sys) {
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
        function disable() {
            if (enabled) {
                marks.clear();
                counts.clear();
                durations.clear();
                durationMarks.clear();
                statistics?.clear();
                performanceImpl = undefined;
                enabled = false;
            }
        }
    }
}
