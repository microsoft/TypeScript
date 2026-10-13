import { execFileSync } from "node:child_process";
import {
    readFileSync,
    writeFileSync,
} from "node:fs";
import { API as BaseAPI } from "../../../packages/typescript/dist/api/sync/api.js";
import { binary } from "./config.mjs";
import { recordWire } from "./telemetry.mjs";
export * from "../../../packages/typescript/dist/api/sync/api.js";

const instances = [];
export class API extends BaseAPI {
    constructor(options) {
        super({
            ...options,
            tsserverPath: binary,
            collectTiming: process.env.API_TIMING === "1",
            ...(process.env.API_CLIENT_POLL_US ? { responsePollMicroseconds: Number(process.env.API_CLIENT_POLL_US) } : {}),
            ...(process.env.API_SERVER_POLL_US ? { serverRequestPollMicroseconds: Number(process.env.API_SERVER_POLL_US) } : {}),
        });
        if (process.env.API_WIRE === "1") {
            const channel = this.client.channel;
            for (const name of ["requestSync", "requestBinarySync"]) {
                const original = channel[name];
                channel[name] = function (method, request) {
                    const response = original.call(this, method, request);
                    recordWire(method, request, response);
                    return response;
                };
            }
        }
        if (process.env.API_GAPS === "1") {
            const channel = this.client.channel;
            const original = channel.requestBytesSync;
            const buckets = [5, 10, 20, 50, 100, 200, 500, 1000, 5000, Infinity];
            const gaps = new Array(buckets.length).fill(0), trips = new Array(buckets.length).fill(0);
            const gapTotals = new Array(buckets.length).fill(0);
            let last = 0;
            channel.requestBytesSync = function (method, payload) {
                const start = performance.now();
                if (last) {
                    const gap = (start - last) * 1000;
                    const index = buckets.findIndex(bound => gap <= bound);
                    gaps[index]++;
                    gapTotals[index] += gap;
                }
                const result = original.call(this, method, payload);
                last = performance.now();
                trips[buckets.findIndex(bound => (last - start) * 1000 <= bound)]++;
                return result;
            };
            process.on("exit", () => writeFileSync(process.env.API_GAPS_OUTPUT, JSON.stringify({ buckets: buckets.map(String), gaps, gapTotalsMs: gapTotals.map(v => v / 1000), trips }, null, 2)));
        }
        const pid = this.client.channel.child?.pid;
        if (pid && process.env.API_METRICS_OUTPUT) {
            let server;
            // Sample before the channel's exit handler kills the server.
            process.prependListener("exit", () => {
                server = readServerCPU(pid);
            });
            // Runs after telemetry has written its metrics file.
            process.on("exit", () => {
                server ??= readServerCPU(pid);
                if (!server) return;
                try {
                    const metrics = JSON.parse(readFileSync(process.env.API_METRICS_OUTPUT, "utf8"));
                    (metrics.servers ??= []).push(server);
                    writeFileSync(process.env.API_METRICS_OUTPUT, JSON.stringify(metrics, null, 2));
                }
                catch {}
            });
        }
        instances.push(this);
    }
}

if (process.env.API_TIMING === "1") {
    process.on("exit", () => {
        writeFileSync(process.env.API_TIMING_OUTPUT, JSON.stringify(instances.map(api => api.getTimingInfo()), null, 2));
    });
}

/** Cumulative CPU time of a live (or zombie, on Linux) process, or undefined if unavailable. */
function readServerCPU(pid) {
    try {
        if (process.platform === "linux") {
            const stat = readFileSync(`/proc/${pid}/stat`, "utf8");
            const fields = stat.slice(stat.lastIndexOf(")") + 2).split(" ");
            return { userMs: Number(fields[11]) * 10, systemMs: Number(fields[12]) * 10 };
        }
        if (process.platform === "darwin") {
            // ps reports user+system time as [[dd-]hh:]mm:ss.ss.
            const parts = execFileSync("ps", ["-o", "time=", "-p", String(pid)], { encoding: "utf8" }).trim().replace("-", ":").split(":").map(Number);
            const seconds = parts.reduce((total, part, i) => total + part * [1, 60, 3600, 86400][parts.length - 1 - i], 0);
            if (!Number.isFinite(seconds)) return undefined;
            return { userMs: seconds * 1000, systemMs: 0 };
        }
    }
    catch {}
    return undefined;
}
