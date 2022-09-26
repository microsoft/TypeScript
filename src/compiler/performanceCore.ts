import { isNodeLikeSystem, Version, VersionRange } from "./_namespaces/ts";

// The following definitions provide the minimum compatible support for the Web Performance User Timings API
// between browsers and NodeJS:

/** @internal */
export interface PerformanceHooks {
    /** Indicates whether we should write native performance events */
    shouldWriteNativeEvents: boolean;
    performance: Performance;
    PerformanceObserver: PerformanceObserverConstructor;
}

/** @internal */
export interface Performance {
    mark(name: string): void;
    measure(name: string, startMark?: string, endMark?: string): void;
    clearMeasures(name?: string): void;
    clearMarks(name?: string): void;
    now(): number;
    timeOrigin: number;
}

/** @internal */
export interface PerformanceEntry {
    name: string;
    entryType: string;
    startTime: number;
    duration: number;
}

/** @internal */
export interface PerformanceObserverEntryList {
    getEntries(): PerformanceEntryList;
    getEntriesByName(name: string, type?: string): PerformanceEntryList;
    getEntriesByType(type: string): PerformanceEntryList;
}

/** @internal */
export interface PerformanceObserver {
    disconnect(): void;
    observe(options: { entryTypes: readonly ("mark" | "measure")[] }): void;
}

/** @internal */
export type PerformanceObserverConstructor = new (callback: (list: PerformanceObserverEntryList, observer: PerformanceObserver) => void) => PerformanceObserver;
/** @internal */
export type PerformanceEntryList = PerformanceEntry[];

// Browser globals for the Web Performance User Timings API
declare const process: any;
declare const performance: Performance | undefined;
declare const PerformanceObserver: PerformanceObserverConstructor | undefined;

// eslint-disable-next-line @typescript-eslint/naming-convention
function hasRequiredAPI(performance: Performance | undefined, PerformanceObserver: PerformanceObserverConstructor | undefined) {
    return typeof performance === "object" &&
        typeof performance.timeOrigin === "number" &&
        typeof performance.mark === "function" &&
        typeof performance.measure === "function" &&
        typeof performance.now === "function" &&
        typeof performance.clearMarks === "function" &&
        typeof performance.clearMeasures === "function" &&
        typeof PerformanceObserver === "function";
}

function tryGetWebPerformanceHooks(): PerformanceHooks | undefined {
    if (typeof performance === "object" &&
        typeof PerformanceObserver === "function" &&
        hasRequiredAPI(performance, PerformanceObserver)) {
        return {
            // For now we always write native performance events when running in the browser. We may
            // make this conditional in the future if we find that native web performance hooks
            // in the browser also slow down compilation.
            shouldWriteNativeEvents: true,
            performance,
            PerformanceObserver
        };
    }
}

function tryGetNodePerformanceHooks(): PerformanceHooks | undefined {
    if (isNodeLikeSystem()) {
        try {
            let performance: Performance;
            const { performance: nodePerformance, PerformanceObserver } = require("perf_hooks") as typeof import("perf_hooks");
            if (hasRequiredAPI(nodePerformance as unknown as Performance, PerformanceObserver)) {
                performance = nodePerformance as unknown as Performance;
                // There is a bug in Node's performance.measure prior to 12.16.3/13.13.0 that does not
                // match the Web Performance API specification. Node's implementation did not allow
                // optional `start` and `end` arguments for `performance.measure`.
                // See https://github.com/nodejs/node/pull/32651 for more information.
                const version = new Version(process.versions.node);
                const range = new VersionRange("<12.16.3 || 13 <13.13");
                if (range.test(version)) {
                    performance = {
                        get timeOrigin() { return nodePerformance.timeOrigin; },
                        now() { return nodePerformance.now(); },
                        mark(name) { return nodePerformance.mark(name); },
                        measure(name, start = "nodeStart", end?) {
                            if (end === undefined) {
                                end = "__performance.measure-fix__";
                                nodePerformance.mark(end);
                            }
                            nodePerformance.measure(name, start, end);
                            if (end === "__performance.measure-fix__") {
                                nodePerformance.clearMarks("__performance.measure-fix__");
                            }
                        },
                        clearMarks(name) { return nodePerformance.clearMarks(name); },
                        clearMeasures(name) { return (nodePerformance as unknown as Performance).clearMeasures(name); },
                    };
                }
                return {
                    // By default, only write native events when generating a cpu profile or using the v8 profiler.
                    shouldWriteNativeEvents: false,
                    performance,
                    PerformanceObserver
                };
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

/** @internal */
export function tryGetNativePerformanceHooks() {
    return nativePerformanceHooks;
}

/**
 * Gets a timestamp with (at least) ms resolution
 *
 * @internal
 */
export const timestamp =
    nativePerformance ? () => nativePerformance.now() :
    Date.now ? Date.now :
    () => +(new Date());
