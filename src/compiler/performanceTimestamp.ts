/*@internal*/
namespace ts {
    declare const performance: { now?(): number } | undefined;
    function tryGlobalPerformanceNow() { // browsers
        if (typeof performance !== "undefined") return () => performance.now!();
    }
    function tryNodePerformanceNow() { // node
        try {
            const perf_hooks = require("perf_hooks") as typeof import("perf_hooks");
            if (perf_hooks.performance) return () => perf_hooks.performance.now();
        }
        // eslint-disable-next-line no-empty
        catch {
        }
    }
    function tryDateNow() {
        if (Date.now) return () => Date.now();
    }
    /** Gets a timestamp with (at least) ms resolution */
    export const timestamp: () => number =
        tryGlobalPerformanceNow()
        || tryNodePerformanceNow()
        || tryDateNow()
        || (() => +(new Date()));

}
