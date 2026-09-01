import {
    createMessageConnection,
    type MessageConnection,
    RequestType,
    SocketMessageReader,
    SocketMessageWriter,
    StreamMessageReader,
    StreamMessageWriter,
} from "#vscode-jsonrpc/node";
import type { ChildProcess } from "node:child_process";
import type { Socket } from "node:net";
import {
    type FileSystem,
    fsCallbackNames,
} from "../fs.ts";
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
import {
    combineTimingInfo,
    disabledServerTimingInfo,
    disabledTimingInfo,
    type ServerTimingInfo,
    TimingCollector,
    type TimingInfo,
} from "../timing.ts";

export type { ClientOptions, ClientSocketOptions, ClientSpawnOptions };

/**
 * Client handles communication with the TypeScript API server
 * over STDIO (spawned process) or a Unix domain socket using JSON-RPC.
 */
export class Client {
    private socket: Socket | undefined;
    private process: ChildProcess | undefined;
    private connection: MessageConnection | undefined;
    private options: ClientOptions;
    private connected = false;
    private closed = false;
    private connecting: Promise<void> | undefined;
    private timing: TimingCollector | undefined;
    private batchedRequests: { method: APIRequest["method"]; params: APIRequest["params"]; resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];
    private nextBatch: NodeJS.Immediate | "manual" | undefined;

    constructor(options: ClientOptions) {
        this.options = options;
        if (isSpawnOptions(options) && options.collectTiming) {
            this.timing = new TimingCollector();
        }
    }

    connect(): Promise<void> {
        if (this.closed) return Promise.reject(new Error("Client is closed"));
        if (this.connected) return Promise.resolve();
        return this.connecting ??= this.connectWorker().finally(() => {
            this.connecting = undefined;
        });
    }

    private async connectWorker(): Promise<void> {
        if (isSpawnOptions(this.options)) {
            await this.connectViaSpawn(this.options);
        }
        else {
            await this.connectViaSocket(this.options);
        }
    }

    private async connectViaSpawn(options: ClientSpawnOptions): Promise<void> {
        const { spawn } = await import("node:child_process");

        return new Promise((resolve, reject) => {
            const args = getAPIProcessArgs(options, true);

            // Enable virtual FS callbacks for each provided FS function
            const enabledCallbacks: string[] = [];
            if (options.fs) {
                for (const name of fsCallbackNames) {
                    if (options.fs[name]) {
                        enabledCallbacks.push(name);
                    }
                }
            }
            if (enabledCallbacks.length > 0) {
                args.push(`--callbacks=${enabledCallbacks.join(",")}`);
            }

            this.process = spawn(resolveExePath(options), args, {
                stdio: ["pipe", "pipe", "inherit"],
            });

            this.process.once("error", error => {
                reject(new Error(`Failed to start tsgo process: ${error.message}`));
            });

            this.process.once("spawn", () => {
                this.connected = true;
                resolve();
            });

            const reader = new StreamMessageReader(this.process.stdout!);
            const writer = new StreamMessageWriter(this.process.stdin!);
            this.connection = createMessageConnection(reader, writer);
            this.registerFSCallbacks(this.connection, options.fs);
            this.connection.listen();
        });
    }

    private async connectViaSocket(options: ClientSocketOptions): Promise<void> {
        const { createConnection } = await import("node:net");

        return new Promise((resolve, reject) => {
            this.socket = createConnection(options.pipe, () => {
                const reader = new SocketMessageReader(this.socket!);
                const writer = new SocketMessageWriter(this.socket!);
                this.connection = createMessageConnection(reader, writer);
                this.connection.listen();
                this.connected = true;
                resolve();
            });

            this.socket.once("error", error => {
                reject(new Error(`Socket error: ${error.message}`));
            });
        });
    }

    private registerFSCallbacks(connection: MessageConnection, fs: FileSystem | undefined): void {
        if (!fs) return;
        for (const name of fsCallbackNames) {
            if (name === "writeFile") {
                if (!fs.writeFile) continue;
                const callback = fs.writeFile;

                const requestType = new RequestType<{ path: string; data: string; }, unknown, void>(name);
                connection.onRequest(requestType, (arg: { path: string; data: string; }) => {
                    callback(arg.path, arg.data);
                    return null;
                });

                continue;
            }

            const callback = fs[name];
            if (callback) {
                const requestType = new RequestType<unknown, unknown, void>(name);
                connection.onRequest(requestType, (arg: unknown) => {
                    const result = callback(arg as any);
                    if (name === "readFile") {
                        // readFile has 3 returns: string (content), null (not found), undefined (fall back).
                        // JSON-RPC can't distinguish null from undefined, so wrap in object.
                        if (result === undefined) return null;
                        return { content: result };
                    }
                    return result ?? null;
                });
            }
        }
    }

    private async sendRequestWithTiming<TResponse>(requestType: RequestType<unknown, TResponse, void>, params: unknown): Promise<TResponse> {
        if (!this.connection) {
            throw new Error("Connection not established");
        }

        if (!this.timing) {
            return this.connection.sendRequest(requestType, params);
        }

        // Round-trip latency is measured here; byte counts approximate the wire
        // payload via the serialized JSON. Server-side processing time is not
        // carried on the response; it is retrieved separately (via a
        // getServerTiming request) and folded in by getTimingInfo().
        const bytesSent = params === undefined ? 0 : Buffer.byteLength(JSON.stringify(params), "utf-8");
        const start = performance.now();
        const result = await this.connection.sendRequest(requestType, params);
        const roundTripMs = performance.now() - start;
        this.timing.record({
            method: requestType.method,
            roundTripMs,
            bytesSent,
            bytesReceived: result === undefined || result === null
                ? 0
                : Buffer.byteLength(JSON.stringify(result), "utf-8"),
        });
        return result;
    }

    private async doBatch(): Promise<void> {
        this.nextBatch = undefined;
        if (!this.batchedRequests.length) return;
        const requests = this.batchedRequests;
        this.batchedRequests = [];
        try {
            if (!this.connected) {
                await this.connect();
            }
            if (!this.connection) {
                throw new Error("Connection not established");
            }

            if (requests.length === 1) {
                // send single queued requests directly instead of as a batched request
                const requestType = new RequestType<unknown, unknown, void>(requests[0].method);
                const response = await this.sendRequestWithTiming(requestType, requests[0].params);
                requests[0].resolve(response);
                return;
            }

            const requestType = new RequestType<unknown, BatchRequestsResponse, void>("batchRequests");
            const params: BatchRequestsParams = { requests: requests.map(request => ({ method: request.method, params: request.params })) };
            const response = await this.sendRequestWithTiming(requestType, params);
            for (let i = 0; i < requests.length; i++) {
                const { resolve, reject } = requests[i];
                const item = response.responses[i];
                if (item.error !== undefined) {
                    reject(new Error(item.error));
                }
                else {
                    resolve(item.result);
                }
            }
        }
        catch (error) {
            for (const { reject } of requests) reject(error);
        }
    }

    private scheduleImmediateBatch(): void {
        if (this.nextBatch) return;
        this.nextBatch = setImmediate(this.doBatch.bind(this));
    }

    batchContext(): { [Symbol.dispose](): void; } {
        if (this.nextBatch === "manual") {
            throw new Error("Already in a manual batch context");
        }
        if (this.nextBatch) {
            clearImmediate(this.nextBatch);
            this.doBatch(); // empty the queue before entering a manual batch context
        }
        this.nextBatch = "manual";
        return {
            [Symbol.dispose]: () => {
                this.nextBatch = undefined;
                this.scheduleImmediateBatch();
            },
        };
    }

    async apiRequest<K extends keyof APIMethodInfo>(method: K, params: APIMethodInfo[K]["params"]): Promise<APIMethodInfo[K]["result"]> {
        if (this.closed) throw new Error("Client is closed");
        if (!this.connected) {
            await this.connect();
        }
        if (!this.connection) {
            throw new Error("Connection not established");
        }

        const resultPromise = new Promise<APIMethodInfo[K]["result"]>((resolve, reject) => {
            this.batchedRequests.push({ method, params, resolve, reject });
            this.scheduleImmediateBatch();
        });
        return resultPromise;
    }

    async apiRequestBinary<K extends SourceFileResponseMethod>(method: K, params: APIMethodInfo[K]["params"]): Promise<Uint8Array | undefined> {
        const response = await this.apiRequest(method, params);
        if (!response) return undefined;
        const buffer = Buffer.from(response.data, "base64");
        return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
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

    /**
     * Returns a combined timing snapshot: client-measured round-trip and byte
     * counts folded together with the server's own per-request processing time
     * (fetched via a getServerTiming request) and estimated transport overhead.
     */
    async getTimingInfo(): Promise<TimingInfo> {
        if (!this.timing) {
            return disabledTimingInfo();
        }
        const local = this.timing.getInfo();
        // No requests have been sent yet: nothing to fetch from the server.
        if (!this.connected || !this.connection) {
            return local;
        }
        return combineTimingInfo(local, await this.fetchServerTiming());
    }

    async resetTimingInfo(): Promise<void> {
        if (!this.timing) return;
        this.timing.reset();
        if (this.connected && this.connection) {
            // Keep the server's collection in sync so combined totals stay meaningful.
            const requestType = new RequestType<unknown, void, void>("resetServerTiming");
            await this.connection.sendRequest(requestType, undefined);
        }
    }

    private async fetchServerTiming(): Promise<ServerTimingInfo> {
        if (!this.connection) {
            return disabledServerTimingInfo();
        }
        // Fetch the server's own timing collection via a dedicated request. This
        // bypasses the client-side collector so the query does not pollute it.
        const requestType = new RequestType<unknown, ServerTimingInfo, void>("getServerTiming");
        return this.connection.sendRequest(requestType, undefined);
    }

    async close(): Promise<void> {
        this.closed = true;
        if (this.connection) {
            this.connection.dispose();
            this.connection = undefined;
        }
        if (this.socket) {
            this.socket.destroy();
            this.socket = undefined;
        }
        if (this.process) {
            // Close stdin to unblock the server's read loop, allowing it to exit cleanly.
            // The server is blocked on stdin.Read(), so just sending SIGTERM would deadlock:
            // - Node won't exit while child is alive
            // - Child can't process SIGTERM while blocked on read
            // - Read won't error until stdin is closed
            this.process.stdin?.end();
            this.process = undefined;
        }
        this.connected = false;
    }
}
