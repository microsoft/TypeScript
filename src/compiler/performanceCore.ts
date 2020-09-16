/*@internal*/
namespace ts {
    // The following definitions provide the minimum compatible support for the Web Performance User Timings API
    // between browsers and NodeJS:

    export interface PerformanceHooks {
        performance: Performance;
        PerformanceObserver: PerformanceObserverConstructor;
    }

    export interface Performance {
        clearMarks(name?: string): void;
        mark(name: string): void;
        measure(name: string, startMark?: string, endMark?: string): void;
        now(): number;
        timeOrigin: number;
    }

    export interface PerformanceEntry {
        name: string;
        entryType: string;
        startTime: number;
        duration: number;
    }

    export interface PerformanceObserverEntryList {
        getEntries(): PerformanceEntryList;
        getEntriesByName(name: string, type?: string): PerformanceEntryList;
        getEntriesByType(type: string): PerformanceEntryList;
    }

    export interface PerformanceObserver {
        disconnect(): void;
        observe(options: { entryTypes: readonly string[] }): void;
    }

    export type PerformanceObserverConstructor = new (callback: (list: PerformanceObserverEntryList, observer: PerformanceObserver) => void) => PerformanceObserver;
    export type PerformanceEntryList = PerformanceEntry[];

    // Browser globals for the Web Performance User Timings API
    declare const performance: Performance | undefined;
    declare const PerformanceObserver: PerformanceObserverConstructor | undefined;

    function tryGetWebPerformanceHooks(): PerformanceHooks | undefined {
        if (typeof performance === "object" &&
            typeof performance.timeOrigin === "number" &&
            typeof performance.clearMarks === "function" &&
            typeof performance.mark === "function" &&
            typeof performance.measure === "function" &&
            typeof performance.now === "function" &&
            typeof PerformanceObserver === "function") {
            return {
                performance,
                PerformanceObserver
            };
        }
    }

    function tryGetNodePerformanceHooks(): PerformanceHooks | undefined {
        if (typeof module === "object" && typeof require === "function") {
            try {
                const perfHooks = require("perf_hooks") as typeof import("perf_hooks");
                const { performance, PerformanceObserver } = perfHooks;
                if (typeof performance === "object" &&
                    typeof performance.timeOrigin === "number" &&
                    typeof performance.clearMarks === "function" &&
                    typeof performance.mark === "function" &&
                    typeof performance.measure === "function" &&
                    typeof performance.now === "function" &&
                    typeof PerformanceObserver === "function") {
                    return perfHooks;
                }
            }
            catch {
                // ignore errors
            }
        }
    }

    // Unlike with the native Map/Set 'tryGet' functions in corePublic.ts, we eagerly evaluate these
    // since we will need them for `timestamp`, below.
    const nativePerformanceHooks = tryGetWebPerformanceHooks() || tryGetNodePerformanceHooks();
    const nativePerformance = nativePerformanceHooks?.performance;

    export function tryGetNativePerformanceHooks() {
        return nativePerformanceHooks;
    }

    /** Gets a timestamp with (at least) ms resolution */
    export const timestamp =
        nativePerformance ? () => nativePerformance.now() :
        Date.now ? Date.now :
        () => +(new Date());
}