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
import type { SyncTransport } from "./transport.ts";

/** Protocol client shared by the process and embedded synchronous transports. */
export class TransportClient {
    private readonly encoder = new TextEncoder();
    private readonly timing: TimingCollector | undefined;
    private readonly transport: SyncTransport;
    private readonly maxResponseBytesPerPage: number | undefined;

    constructor(transport: SyncTransport, collectTiming: boolean, maxResponseBytesPerPage?: number) {
        this.transport = transport;
        this.maxResponseBytesPerPage = maxResponseBytesPerPage;
        if (collectTiming) {
            this.timing = new TimingCollector();
        }
    }

    apiRequest<K extends keyof APIMethodInfo>(method: K, params?: APIMethodInfo[K]["params"]): APIMethodInfo[K]["result"] {
        const encodedPayload = JSON.stringify(params);
        const start = performance.now();
        const result = this.transport.requestSync(method, encodedPayload);
        this.recordTiming(method, start);
        if (result.length) {
            return JSON.parse(result) as APIMethodInfo[K]["result"];
        }
        return undefined as APIMethodInfo[K]["result"];
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
                responses = responses.concat(page.responses);
            }
            continuationToken = page.continuationToken;
        }
        return { responses };
    }

    echo(payload: string): string {
        return this.transport.requestSync("echo", payload);
    }

    echoBinary(payload: Uint8Array): Uint8Array {
        return this.transport.requestBinarySync("echo", payload);
    }

    apiRequestBinary<K extends SourceFileResponseMethod>(
        method: K,
        params?: APIMethodInfo[K]["params"],
    ): Uint8Array | undefined {
        const start = performance.now();
        const result = this.transport.requestBinarySync(method, this.encoder.encode(JSON.stringify(params)));
        this.recordTiming(method, start);
        return result.length === 0 ? undefined : result;
    }

    getTimingCollector(): TimingCollector | undefined {
        return this.timing;
    }

    getTimingInfo(): TimingInfo {
        if (!this.timing) {
            return disabledTimingInfo();
        }
        const local = this.timing.getInfo();
        const result = this.transport.requestSync("getServerTiming", "");
        return combineTimingInfo(local, JSON.parse(result) as ServerTimingInfo);
    }

    resetTimingInfo(): void {
        if (!this.timing) return;
        this.timing.reset();
        this.transport.requestSync("resetServerTiming", "");
    }

    close(): void {
        this.transport.close();
    }

    private recordTiming(method: string, start: number): void {
        if (!this.timing) return;
        this.timing.record({
            method,
            roundTripMs: performance.now() - start,
            bytesSent: this.transport.lastBytesSent,
            bytesReceived: this.transport.lastBytesReceived,
        });
    }
}
