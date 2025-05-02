import { isNodeLikeSystem } from "./_namespaces/ts.js";

// The following definitions provide the minimum compatible support for the Web Performance User Timings API
// between browsers and NodeJS:

/** @internal */
export interface PerformanceHooks {
    shouldWriteNativeEvents: boolean;
    performance?: Performance;
    performanceTime?: PerformanceTime;
}

/** @internal */
export interface PerformanceTime {
    now(): number;
    timeOrigin: number;
}

/** @internal */
export interface Performance extends PerformanceTime {
    mark(name: string): void;
    measure(name: string, startMark?: string, endMark?: string): void;
    clearMeasures(name?: string): void;
    clearMarks(name?: string): void;
}

// Browser globals for the Web Performance User Timings API
declare const performance: Performance | undefined;

function tryGetPerformance() {
    if (isNodeLikeSystem()) {
        try {
            // By default, only write native events when generating a cpu profile or using the v8 profiler.
            // Some environments may polyfill this module with an empty object; verify the object has the expected shape.
            const { performance } = require("perf_hooks") as Partial<typeof import("perf_hooks")>;
            if (performance) {
                return {
                    shouldWriteNativeEvents: false,
                    performance,
                };
            }
        }
        catch {
            // ignore errors
        }
    }

    if (typeof performance === "object") {
        // For now we always write native performance events when running in the browser. We may
        // make this conditional in the future if we find that native web performance hooks
        // in the browser also slow down compilation.
        return {
            shouldWriteNativeEvents: true,
            performance,
        };
    }

    return undefined;
}

function tryGetPerformanceHooks(): PerformanceHooks | undefined {
    const p = tryGetPerformance();
    if (!p) return undefined;
    const { shouldWriteNativeEvents, performance } = p;

    const hooks: PerformanceHooks = {
        shouldWriteNativeEvents,
        performance: undefined,
        performanceTime: undefined,
    };

    if (typeof performance.timeOrigin === "number" && typeof performance.now === "function") {
        hooks.performanceTime = performance;
    }

    if (
        hooks.performanceTime &&
        typeof performance.mark === "function" &&
        typeof performance.measure === "function" &&
        typeof performance.clearMarks === "function" &&
        typeof performance.clearMeasures === "function"
    ) {
        hooks.performance = performance;
    }

    return hooks;
}

const nativePerformanceHooks = tryGetPerformanceHooks();
const nativePerformanceTime = nativePerformanceHooks?.performanceTime;

/** @internal */
export function tryGetNativePerformanceHooks(): PerformanceHooks | undefined {
    return nativePerformanceHooks;
}

/**
 * Gets a timestamp with (at least) ms resolution
 *
 * @internal
 */
export const timestamp: () => number = nativePerformanceTime ? () => nativePerformanceTime.now() : Date.now;
