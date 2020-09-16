/*@internal*/
namespace ts {
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
                return require("perf_hooks") as typeof import("perf_hooks");
            }
            catch {
                // ignore errors
            }
        }
    }

    const nativePerformanceHooks = tryGetWebPerformanceHooks() || tryGetNodePerformanceHooks();

    export function tryGetNativePerformanceHooks() {
        return nativePerformanceHooks;
    }

    /** Gets a timestamp with (at least) ms resolution */
    export const timestamp = (() => {
        if (nativePerformanceHooks) {
            const performance = nativePerformanceHooks.performance;
            return () => performance.now();
        }
        return Date.now ? Date.now : () => +(new Date());
    })();
}