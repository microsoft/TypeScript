import {
    isNodeLikeSystem,
} from "./_namespaces/ts";

// The following definitions provide the minimum compatible support for the Web Performance User Timings API
// between browsers and NodeJS:

/** @internal */
export interface PerformanceHooks {
    isGlobal: boolean;
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
            const { performance } = require("perf_hooks") as typeof import("perf_hooks");
            return { performance, isGlobal: false };
        }
        catch {
            // ignore errors
        }
    }

    if (typeof performance === "object") {
        return { performance, isGlobal: true };
    }

    return undefined;
}

function tryGetPerformanceHooks(): PerformanceHooks | undefined {
    const p = tryGetPerformance();
    if (!p) return undefined;
    const { performance, isGlobal } = p;

    const hooks: PerformanceHooks = {
        isGlobal,
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
export function tryGetNativePerformanceHooks() {
    return nativePerformanceHooks;
}

/**
 * Gets a timestamp with (at least) ms resolution
 *
 * @internal
 */
export const timestamp = nativePerformanceTime ? () => nativePerformanceTime.now() : Date.now;

console.log(timestamp === Date.now);
