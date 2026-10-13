import { createHash } from "node:crypto";
import { writeFileSync } from "node:fs";
import inspector from "node:inspector";
import { pathToFileURL } from "node:url";
import {
    repoRoot,
    runtimeRoot,
} from "./config.mjs";

const counters = new Map();
const methods = new Map();
const handles = new Set();
const paths = new Set();
const wire = new Map();
const sourceHashes = new Map();
const started = performance.now();
export function count(name, value = 1) {
    counters.set(name, (counters.get(name) ?? 0) + value);
}
export function recordSource(url, source) {
    const key = url.replace(pathToFileURL(`${runtimeRoot}/`).href, "fixture/").replace(pathToFileURL(`${repoRoot}/`).href, "repo/");
    sourceHashes.set(key, createHash("sha256").update(source).digest("hex"));
}
export function countHandle(handle) {
    count("nodeHandlesParsed");
    handles.add(handle);
    paths.add(handle.slice(handle.indexOf(".", handle.indexOf(".") + 1) + 1));
}
export function countMethod(owner, name) {
    const key = `${owner.constructor.name}.${name}`;
    methods.set(key, (methods.get(key) ?? 0) + 1);
}
export function recordWire(method, request, response) {
    let entry = wire.get(method);
    if (!entry) wire.set(method, entry = { calls: 0, requestBytes: 0, responseBytes: 0, maxResponseBytes: 0, requestExample: "", responseExample: "" });
    const requestBytes = typeof request === "string" ? Buffer.byteLength(request) : request.length;
    const responseBytes = typeof response === "string" ? Buffer.byteLength(response) : response.length;
    entry.calls++;
    entry.requestBytes += requestBytes;
    entry.responseBytes += responseBytes;
    entry.maxResponseBytes = Math.max(entry.maxResponseBytes, responseBytes);
    if (!entry.requestExample) entry.requestExample = typeof request === "string" ? request.slice(0, 1500) : "";
    if (!entry.responseExample) entry.responseExample = typeof response === "string" ? response.slice(0, 1500) : "<binary>";
    if (process.env.API_RESPONSE_BREAKDOWN === "1" && typeof response === "string") {
        for (const [label, pattern] of [["projectField", /"project":"[^"]+"/g], ["handlePath", /"\d+\.\d+\.[^"#][^"]*"/g], ["fileDescriptor", /"file":\{[^}]*\}/g], ["symbolReference", /"reference":\{"kind":\d[^}]*\}(\}|,"id":\d+\})?/g], ["typeObjects", /\{"id":\d+,"flags":/g]]) {
            for (const match of response.matchAll(pattern)) {
                count(`response.${label}.chars`, match[0].length);
                count(`response.${label}.count`);
            }
        }
        count("response.totalChars", response.length);
    }
    if (process.env.API_COMPACT_ESTIMATE === "1") {
        for (const [label, value] of [["request", request], ["response", response]]) {
            if (typeof value !== "string") continue;
            const compact = value.replace(/"project":"[^"]+"/g, '"project":1')
                .replace(/"(\d+)\.(\d+)\.((?:\/|\^\/)[^"]+)"/g, "[$1,$2,1]");
            count(`${label}CompactChars`, compact.length);
            count(`${label}OriginalChars`, value.length);
        }
    }
}
export function jsonParse(text) {
    const start = performance.now();
    const result = JSON.parse(text);
    count("jsonParseMs", performance.now() - start);
    count("jsonParseCalls");
    count("jsonParseChars", text.length);
    return result;
}
export function jsonStringify(value) {
    const start = performance.now();
    const result = JSON.stringify(value);
    count("jsonStringifyMs", performance.now() - start);
    count("jsonStringifyCalls");
    count("jsonStringifyChars", result?.length ?? 0);
    return result;
}
let session;
if (process.env.API_ALLOCATIONS === "1") {
    session = new inspector.Session();
    session.connect();
    session.post("HeapProfiler.startSampling", {
        samplingInterval: 32768,
        includeObjectsCollectedByMajorGC: true,
        includeObjectsCollectedByMinorGC: true,
    }, error => {
        if (error) throw error;
    });
    process.once("beforeExit", () => {
        session.post("HeapProfiler.stopSampling", (error, result) => {
            if (error) throw error;
            writeFileSync(process.env.API_ALLOCATIONS_OUTPUT, JSON.stringify(result.profile));
            session.disconnect();
        });
    });
}
process.on("exit", () => {
    if (!process.env.API_METRICS_OUTPUT) return;
    writeFileSync(
        process.env.API_METRICS_OUTPUT,
        JSON.stringify(
            {
                wallMs: performance.now() - started,
                cpu: process.cpuUsage(),
                memory: process.memoryUsage(),
                resourceUsage: process.resourceUsage(),
                counters: Object.fromEntries(counters),
                uniqueHandles: handles.size,
                uniqueHandlePaths: paths.size,
                methods: Object.fromEntries([...methods].sort((a, b) => b[1] - a[1])),
                wire: Object.fromEntries([...wire].sort((a, b) => b[1].responseBytes - a[1].responseBytes)),
                sourceDigest: createHash("sha256").update(JSON.stringify([...sourceHashes].sort(([a], [b]) => a.localeCompare(b)))).digest("hex"),
                fixtureDigest: createHash("sha256").update(JSON.stringify([...sourceHashes].filter(([key]) => key.startsWith("fixture/")).sort(([a], [b]) => a.localeCompare(b)))).digest("hex"),
                sourceHashes: Object.fromEntries(sourceHashes),
            },
            null,
            2,
        ),
    );
});
