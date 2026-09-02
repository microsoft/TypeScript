import type {
    APIMethodInfo,
    APIRequest,
    BatchRequestsParams,
    BatchRequestsResponse,
    SourceFileResponseMethod,
} from "../proto.ts";
import {
    combineTimingInfo,
    disabledTimingInfo,
    type ServerTimingInfo,
    TimingCollector,
    type TimingInfo,
} from "../timing.ts";
import type { AsyncTransport } from "./transport.ts";

interface PendingRequestBase {
    reject: (reason?: unknown) => void;
}

interface PendingTextRequest extends PendingRequestBase {
    kind: "text";
    method: APIRequest["method"];
    params: APIRequest["params"];
    resolve: (value: unknown) => void;
}

interface PendingBinaryRequest extends PendingRequestBase {
    kind: "binary";
    method: SourceFileResponseMethod;
    payload: Uint8Array;
    resolve: (value: Uint8Array | undefined) => void;
}

type PendingRequest = PendingTextRequest | PendingBinaryRequest;

function isTextRequest(request: PendingRequest): request is PendingTextRequest {
    return request.kind === "text";
}

/** Protocol client for an injected asynchronous transport. */
export class TransportClient {
    private readonly encoder = new TextEncoder();
    private readonly timing: TimingCollector | undefined;
    private readonly transport: AsyncTransport;
    private readonly maxResponseBytesPerPage: number | undefined;
    private connected = false;
    private closed = false;
    private nextBatch: boolean | "manual" = false;
    private batchGeneration = 0;
    private batchedRequests: PendingRequest[] = [];
    private readonly closedPromise: Promise<never>;
    private rejectClosed!: (reason: Error) => void;

    constructor(transport: AsyncTransport, collectTiming: boolean, maxResponseBytesPerPage?: number) {
        this.transport = transport;
        this.maxResponseBytesPerPage = maxResponseBytesPerPage;
        this.closedPromise = new Promise((_, reject) => {
            this.rejectClosed = reject;
        });
        void this.closedPromise.catch(() => {});
        if (collectTiming) {
            this.timing = new TimingCollector();
        }
    }

    connect(): Promise<void> {
        if (this.closed) return Promise.reject(new Error("Client is closed"));
        this.connected = true;
        return Promise.resolve();
    }

    batchContext(): { [Symbol.dispose](): void; } {
        if (this.nextBatch === "manual") {
            throw new Error("Already in a manual batch context");
        }
        if (this.nextBatch) {
            this.batchGeneration++;
            this.nextBatch = false;
            void this.doBatch();
        }
        this.nextBatch = "manual";
        return {
            [Symbol.dispose]: () => {
                this.nextBatch = false;
                this.scheduleBatch();
            },
        };
    }

    async apiRequest<K extends APIRequest["method"]>(
        method: K,
        params: APIMethodInfo[K]["params"],
    ): Promise<APIMethodInfo[K]["result"]> {
        if (this.closed) throw new Error("Client is closed");
        if (!this.connected) {
            await this.connect();
        }
        if (this.closed) throw new Error("Client is closed");
        if (method === "initialize") {
            return this.sendRequest(method, params);
        }
        const result = new Promise<APIMethodInfo[K]["result"]>((resolve, reject) => {
            this.batchedRequests.push({ kind: "text", method, params, resolve, reject });
            this.scheduleBatch();
        });
        return result;
    }

    async apiRequestBinary<K extends SourceFileResponseMethod>(
        method: K,
        params: APIMethodInfo[K]["params"],
    ): Promise<Uint8Array | undefined> {
        if (this.closed) throw new Error("Client is closed");
        if (!this.connected) {
            await this.connect();
        }
        if (this.closed) throw new Error("Client is closed");
        return new Promise<Uint8Array | undefined>((resolve, reject) => {
            this.batchedRequests.push({
                kind: "binary",
                method,
                payload: this.encoder.encode(JSON.stringify(params)),
                resolve,
                reject,
            });
            this.scheduleBatch();
        });
    }

    getTimingCollector(): TimingCollector | undefined {
        return this.timing;
    }

    async getTimingInfo(): Promise<TimingInfo> {
        if (!this.timing) {
            return disabledTimingInfo();
        }
        const local = this.timing.getInfo();
        if (!this.connected) {
            return local;
        }
        const response = await this.invokeTransport(() => this.transport.request("getServerTiming", ""));
        return combineTimingInfo(local, JSON.parse(response.value) as ServerTimingInfo);
    }

    async resetTimingInfo(): Promise<void> {
        if (!this.timing) return;
        this.timing.reset();
        if (this.connected) {
            await this.invokeTransport(() => this.transport.request("resetServerTiming", ""));
        }
    }

    async close(): Promise<void> {
        this.closed = true;
        this.rejectClosed(new Error("Client is closed"));
        this.batchGeneration++;
        this.nextBatch = false;
        const requests = this.batchedRequests;
        this.batchedRequests = [];
        for (const { reject } of requests) {
            reject(new Error("Client is closed"));
        }
        await this.transport.close();
        this.connected = false;
    }

    private scheduleBatch(): void {
        if (this.closed || this.nextBatch) return;
        this.nextBatch = true;
        const generation = ++this.batchGeneration;
        queueMicrotask(() => {
            if (this.batchGeneration !== generation || this.nextBatch !== true) return;
            this.nextBatch = false;
            void this.doBatch();
        });
    }

    private async doBatch(): Promise<void> {
        if (!this.batchedRequests.length) return;
        const requests = this.batchedRequests;
        this.batchedRequests = [];
        if (this.closed) {
            for (const { reject } of requests) {
                reject(new Error("Client is closed"));
            }
            return;
        }
        try {
            if (requests.length === 1 && requests[0].kind === "text") {
                const request = requests[0];
                request.resolve(await this.sendRequest(request.method, request.params));
                return;
            }

            if (requests.every(isTextRequest)) {
                const params: BatchRequestsParams = {
                    requests: requests.map(request => ({ method: request.method, params: request.params })),
                };
                if (this.maxResponseBytesPerPage !== undefined) {
                    params.maxResponseBytesPerPage = this.maxResponseBytesPerPage;
                }
                const response = await this.sendRequest("batchRequests", params) as BatchRequestsResponse;
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
                    const page = await this.sendRequest("batchRequests", pageParams) as BatchRequestsResponse;
                    responses = responses.concat(page.responses);
                    continuationToken = page.continuationToken;
                }
                for (let i = 0; i < requests.length; i++) {
                    const { resolve, reject } = requests[i];
                    const item = responses[i];
                    if (item.error !== undefined) {
                        reject(new Error(item.error));
                    }
                    else {
                        resolve(item.result);
                    }
                }
                return;
            }

            for (const request of requests) {
                if (request.kind === "text") {
                    request.resolve(await this.sendRequest(request.method, request.params));
                }
                else {
                    request.resolve(await this.sendBinaryRequest(request.method, request.payload));
                }
            }
        }
        catch (error) {
            for (const { reject } of requests) reject(error);
        }
    }

    private async sendRequest<K extends keyof APIMethodInfo>(
        method: K,
        params: APIMethodInfo[K]["params"],
    ): Promise<APIMethodInfo[K]["result"]> {
        const payload = JSON.stringify(params) ?? "";
        const start = performance.now();
        const response = await this.invokeTransport(() => this.transport.request(method, payload));
        this.recordTiming(method, start, response.bytesSent, response.bytesReceived);
        return response.value.length
            ? JSON.parse(response.value) as APIMethodInfo[K]["result"]
            : undefined as APIMethodInfo[K]["result"];
    }

    private async sendBinaryRequest(method: SourceFileResponseMethod, payload: Uint8Array): Promise<Uint8Array | undefined> {
        const start = performance.now();
        const response = await this.invokeTransport(() => this.transport.requestBinary(method, payload));
        this.recordTiming(method, start, response.bytesSent, response.bytesReceived);
        return response.value.length === 0 ? undefined : response.value;
    }

    private invokeTransport<T>(operation: () => T | PromiseLike<T>): Promise<T> {
        if (this.closed) return Promise.reject(new Error("Client is closed"));
        return Promise.race([
            Promise.resolve().then(operation),
            this.closedPromise,
        ]);
    }

    private recordTiming(method: string, start: number, bytesSent: number, bytesReceived: number): void {
        if (!this.timing) return;
        this.timing.record({
            method,
            roundTripMs: performance.now() - start,
            bytesSent,
            bytesReceived,
        });
    }
}
