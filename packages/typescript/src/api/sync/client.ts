import { serverFS } from "../fs.ts";
import {
    configureFileSystemCallbacks,
    validateFileSystemCallbackResult,
} from "../fsCallbacks.ts";
import {
    type ClientOptions,
    type ClientSocketOptions,
    type ClientSpawnOptions,
    getAPIProcessArgs,
    isSpawnOptions,
    resolveExePath,
} from "../options.ts";
import type {
    APIMethodInfo,
    APIRequest,
    BatchRequestsParams,
    BatchRequestsResponse,
    SourceFileResponseMethod,
} from "../proto.ts";
import { SyncRpcChannel } from "../syncChannel.ts";
import {
    combineTimingInfo,
    disabledTimingInfo,
    type ServerTimingInfo,
    TimingCollector,
    type TimingInfo,
} from "../timing.ts";

export type { ClientOptions, ClientSocketOptions, ClientSpawnOptions };

export class Client {
    private channel: SyncRpcChannel;
    private encoder = new TextEncoder();
    private timing: TimingCollector | undefined;
    private maxResponseBytesPerPage: number | undefined;

    constructor(options: ClientOptions) {
        if (!isSpawnOptions(options)) {
            throw new Error("Socket connections are not yet supported in the sync client");
        }

        const args = getAPIProcessArgs(options, false);
        this.maxResponseBytesPerPage = options.maxResponseBytesPerPage;

        const fsConfiguration = configureFileSystemCallbacks(options.fs);
        if (fsConfiguration.arguments.length > 0) {
            args.push(`--callbacks=${fsConfiguration.arguments.join(",")}`);
        }

        const collectTiming = options.collectTiming ?? false;
        if (collectTiming) {
            this.timing = new TimingCollector();
        }

        const channel = new SyncRpcChannel(resolveExePath(options), args, collectTiming);
        this.channel = channel;

        if (options.fs) {
            for (const name of fsConfiguration.callbackNames) {
                if (name === "writeFile") {
                    const callback = options.fs.writeFile;
                    if (typeof callback !== "function") throw new Error("Invalid writeFile callback configuration");

                    channel.registerCallback(name, (_, arg) => {
                        const { path, data } = JSON.parse(arg);
                        const result = callback(path, data);
                        validateFileSystemCallbackResult(name, result);
                        return result === serverFS.useOS ? "" : "true";
                    });

                    continue;
                }

                const callback = options.fs[name];
                if (typeof callback !== "function") throw new Error(`Invalid ${name} callback configuration`);
                channel.registerCallback(name, (_, arg) => {
                    const result = callback(JSON.parse(arg));
                    validateFileSystemCallbackResult(name, result);
                    if (result === serverFS.useOS) return "";
                    if (name === "readFile") {
                        return JSON.stringify({ content: result });
                    }
                    if (name === "stat") {
                        return JSON.stringify({ stat: result });
                    }
                    return JSON.stringify(result);
                });
            }
        }
    }

    apiRequest<K extends keyof APIMethodInfo>(method: K, params?: APIMethodInfo[K]["params"]): APIMethodInfo[K]["result"] {
        const encodedPayload = JSON.stringify(params);
        const start = performance.now();
        const result = this.channel.requestSync(method, encodedPayload);
        this.recordTiming(method, start);
        if (result.length) {
            return JSON.parse(result) as APIMethodInfo[K]["result"];
        }

        return undefined as APIMethodInfo[K]["result"];
    }

    registerCallback(name: string, callback: (params: unknown) => unknown): () => void {
        this.channel.registerCallback(name, (_, payload) => JSON.stringify(callback(JSON.parse(payload))) ?? "");
        return () => this.channel.unregisterCallback(name);
    }

    batchRequests(requests: readonly APIRequest[]): BatchRequestsResponse {
        const params: BatchRequestsParams = { requests };
        if (this.maxResponseBytesPerPage !== undefined) {
            params.maxResponseBytesPerPage = this.maxResponseBytesPerPage;
        }
        const response = this.apiRequest("batchRequests", params);
        let responses = response.responses;
        let continuationToken = response.continuationToken;
        while (continuationToken) {
            const pageParams: BatchRequestsParams = {
                requests: [],
                continuationToken,
            };
            if (this.maxResponseBytesPerPage !== undefined) {
                pageParams.maxResponseBytesPerPage = this.maxResponseBytesPerPage;
            }
            const page = this.apiRequest("batchRequests", pageParams);
            if (page.responses.length < 200) {
                responses.push(...page.responses);
            }
            else {
                // If the number of responses is approaching the max argument length, we need to concat instead of push
                responses = responses.concat(page.responses);
            }
            continuationToken = page.continuationToken;
        }
        return { responses };
    }

    apiRequestBinary<K extends SourceFileResponseMethod>(method: K, params?: APIMethodInfo[K]["params"]): Uint8Array | undefined {
        const start = performance.now();
        const result = this.channel.requestBinarySync(method, this.encoder.encode(JSON.stringify(params)));
        this.recordTiming(method, start);
        if (result.length === 0) return undefined;
        return result;
    }

    echo(payload: string): string {
        return this.channel.requestSync("echo", payload);
    }

    echoBinary(payload: Uint8Array): Uint8Array {
        return this.channel.requestBinarySync("echo", payload);
    }

    /**
     * Returns a combined timing snapshot: client-measured round-trip and byte
     * counts folded together with the server's own per-request processing time
     * (fetched via a getServerTiming request) and estimated transport overhead.
     */
    getTimingInfo(): TimingInfo {
        if (!this.timing) {
            return disabledTimingInfo();
        }
        const local = this.timing.getInfo();
        // requestSync bypasses recordTiming, so this query does not pollute the
        // client-side collector.
        const result = this.channel.requestSync("getServerTiming", "");
        return combineTimingInfo(local, JSON.parse(result) as ServerTimingInfo);
    }

    resetTimingInfo(): void {
        if (!this.timing) return;
        this.timing.reset();
        // Keep the server's collection in sync so combined totals stay meaningful.
        this.channel.requestSync("resetServerTiming", "");
    }

    /**
     * Returns the timing collector that per-node materialization is reported
     * into, or undefined when timing collection is disabled. The returned
     * collector is the same one folded into {@link getTimingInfo}, so
     * materialization totals surface alongside request timings.
     */
    getTimingCollector(): TimingCollector | undefined {
        return this.timing;
    }

    private recordTiming(method: string, start: number): void {
        if (!this.timing) return;
        this.timing.record({
            method,
            roundTripMs: performance.now() - start,
            bytesSent: this.channel.lastBytesSent,
            bytesReceived: this.channel.lastBytesReceived,
        });
    }

    close(): void {
        this.channel.close();
    }
}
