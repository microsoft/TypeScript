// @target: esnext
// @lib: dom,esnext

function pageWasReloaded(): boolean {
    return performance
        .getEntriesByType("navigation")
        .some(entry => entry.type === "reload");
}

const marks = performance.getEntriesByType("mark");
marks[0].detail;

const measures = performance.getEntriesByType("measure");
measures[0].detail;

const paints = performance.getEntriesByType("paint");
paints[0].startTime;

const resources = performance.getEntriesByType("resource");
resources[0].initiatorType;

const events = performance.getEntriesByType("event");
events[0].processingStart;

const lcp = performance.getEntriesByType("largest-contentful-paint");
lcp[0].renderTime;

const generic = performance.getEntriesByType("something-unknown");
generic[0].entryType;
