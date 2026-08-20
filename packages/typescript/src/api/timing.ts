/**
 * Client-side collection of per-request timing and transfer measurements.
 *
 * When enabled, each request records its round-trip latency and the number of
 * payload bytes sent and received, accumulated into running totals and a
 * fixed-size ring buffer of the most recent requests.
 *
 * The server measures its own per-request processing time independently. When a
 * timing snapshot is requested, the client fetches the server's collection via
 * a `getServerTiming` request and folds it into the returned {@link TimingInfo},
 * yielding per-request and total server processing time and an estimated
 * transport overhead (round-trip minus server processing time). Normal response
 * messages are left unchanged.
 */

/** Number of most-recent requests retained in the ring buffer. */
export const RECENT_REQUEST_CAPACITY = 5;

/** A single request's measured timing and transfer sample. */
export interface RequestTiming {
    /** The API method that was invoked. */
    method: string;
    /** Wall-clock round-trip time measured by the client, in milliseconds. */
    roundTripMs: number;
    /** Number of request payload bytes sent to the server. */
    bytesSent: number;
    /** Number of response payload bytes received from the server. */
    bytesReceived: number;
    /** Wall-clock timestamp ({@link Date.now}) captured when the request completed. */
    timestamp: number;
    /**
     * Server-side processing time for this request, in milliseconds, as folded
     * in from the server's own timing collection. Undefined when server timing
     * for the request could not be matched.
     */
    serverTimeMs?: number;
    /**
     * Estimated transport overhead for this request, in milliseconds
     * (`roundTripMs - serverTimeMs`, clamped to be non-negative). Present
     * exactly when {@link serverTimeMs} is.
     */
    transportOverheadMs?: number;
}

/** Running totals accumulated across every measured request. */
export interface TimingAccumulators {
    /** Number of requests measured. */
    requestCount: number;
    /** Sum of round-trip latencies, in milliseconds. */
    roundTripMs: number;
    /** Sum of request payload bytes sent. */
    bytesSent: number;
    /** Sum of response payload bytes received. */
    bytesReceived: number;
    /** Sum of server-side processing time, in milliseconds. */
    serverTimeMs: number;
    /**
     * Estimated total transport overhead, in milliseconds
     * (`roundTripMs - serverTimeMs`, clamped to be non-negative).
     */
    transportOverheadMs: number;
    /**
     * Number of AST nodes materialized from binary source-file responses as the
     * client walked the returned trees. Materialization is lazy and happens on
     * demand, so this accrues after the originating request completes.
     */
    nodesMaterialized: number;
    /**
     * Number of source files fetched from the server (each decoded into a
     * lazily-materialized tree).
     */
    sourceFilesFetched: number;
    /**
     * Number of AST nodes across all fetched source files that can be
     * materialized on demand. Each fetched file contributes its full node count
     * (excluding the pre-materialized source-file node), whether or not those
     * nodes are ever walked. Serves as the denominator for the share of fetched
     * nodes that end up materialized (`nodesMaterialized / nodesFetched`).
     */
    nodesFetched: number;
}

/** A point-in-time snapshot of collected timing information. */
export interface TimingInfo {
    /** Whether timing collection is enabled for this API instance. */
    enabled: boolean;
    /** Running totals across every measured request. */
    totals: TimingAccumulators;
    /**
     * The most recent requests, up to {@link RECENT_REQUEST_CAPACITY}, ordered
     * from oldest to newest.
     */
    recentRequests: RequestTiming[];
}

/** A raw measurement handed to {@link TimingCollector.record}. */
export interface TimingSample {
    method: string;
    roundTripMs: number;
    bytesSent: number;
    bytesReceived: number;
}

/**
 * A single server-side request's processing-time sample, as returned by a
 * `getServerTiming` request. This is an internal wire shape; consumers see the
 * folded-in {@link RequestTiming.serverTimeMs}.
 */
export interface ServerRequestTiming {
    /** The API method that was handled. */
    method: string;
    /** Server-side processing time, in milliseconds. */
    processingTimeMs: number;
    /** Unix timestamp in milliseconds captured when the request completed. */
    timestamp: number;
}

/** Running totals accumulated on the server across every handled request. */
export interface ServerTimingTotals {
    /** Total number of requests handled. */
    requestCount: number;
    /** Sum of server-side processing time, in milliseconds. */
    totalProcessingTimeMs: number;
}

/**
 * A snapshot of the server's own timing collection, retrieved via a
 * `getServerTiming` request. This is an internal wire shape used to compute the
 * server-derived fields of {@link TimingInfo}.
 */
export interface ServerTimingInfo {
    /** Whether server-side timing collection is enabled. */
    enabled: boolean;
    /** Running totals across every request the server handled. */
    totals: ServerTimingTotals;
    /**
     * The most recent requests as seen by the server, ordered from oldest to
     * newest.
     */
    recentRequests: ServerRequestTiming[];
}

function emptyAccumulators(): TimingAccumulators {
    return {
        requestCount: 0,
        roundTripMs: 0,
        bytesSent: 0,
        bytesReceived: 0,
        serverTimeMs: 0,
        transportOverheadMs: 0,
        nodesMaterialized: 0,
        sourceFilesFetched: 0,
        nodesFetched: 0,
    };
}

/** Returns a snapshot representing a disabled (never-collecting) timing state. */
export function disabledTimingInfo(): TimingInfo {
    return {
        enabled: false,
        totals: emptyAccumulators(),
        recentRequests: [],
    };
}

/** Returns a snapshot representing disabled server-side timing collection. */
export function disabledServerTimingInfo(): ServerTimingInfo {
    return {
        enabled: false,
        totals: { requestCount: 0, totalProcessingTimeMs: 0 },
        recentRequests: [],
    };
}

/**
 * Folds a server-side timing snapshot into a client-side snapshot, producing a
 * combined {@link TimingInfo} with per-request and total server processing time
 * plus estimated transport overhead.
 *
 * Recent requests are paired newest-to-newest and only matched when the method
 * names agree, so that requests recorded by only one side (e.g. the meta
 * requests used to fetch timing) do not misalign the two ring buffers.
 */
export function combineTimingInfo(client: TimingInfo, server: ServerTimingInfo): TimingInfo {
    if (!client.enabled) {
        return client;
    }

    const serverTimeMs = server.totals.totalProcessingTimeMs;
    const totals: TimingAccumulators = {
        ...client.totals,
        serverTimeMs,
        transportOverheadMs: Math.max(0, client.totals.roundTripMs - serverTimeMs),
    };

    const recentRequests = client.recentRequests.map(r => ({ ...r }));
    const serverRecent = server.recentRequests;
    const pairs = Math.min(recentRequests.length, serverRecent.length);
    for (let i = 1; i <= pairs; i++) {
        const c = recentRequests[recentRequests.length - i];
        const s = serverRecent[serverRecent.length - i];
        if (c.method === s.method) {
            c.serverTimeMs = s.processingTimeMs;
            c.transportOverheadMs = Math.max(0, c.roundTripMs - s.processingTimeMs);
        }
    }

    return {
        enabled: true,
        totals,
        recentRequests,
    };
}

/**
 * Accumulates request timing samples into running totals and a fixed-size ring
 * buffer of the most recent requests.
 */
export class TimingCollector {
    private totals: TimingAccumulators = emptyAccumulators();
    // Ring buffer of the most recent requests. `ring` grows to at most
    // RECENT_REQUEST_CAPACITY; once full, `head` marks the oldest entry.
    private ring: RequestTiming[] = [];
    private head = 0;

    /** Records a single request's measurements. */
    record(sample: TimingSample): void {
        this.totals.requestCount++;
        this.totals.roundTripMs += sample.roundTripMs;
        this.totals.bytesSent += sample.bytesSent;
        this.totals.bytesReceived += sample.bytesReceived;

        const entry: RequestTiming = {
            method: sample.method,
            roundTripMs: sample.roundTripMs,
            bytesSent: sample.bytesSent,
            bytesReceived: sample.bytesReceived,
            timestamp: Date.now(),
        };

        if (this.ring.length < RECENT_REQUEST_CAPACITY) {
            this.ring.push(entry);
        }
        else {
            this.ring[this.head] = entry;
            this.head = (this.head + 1) % RECENT_REQUEST_CAPACITY;
        }
    }

    /**
     * Records a single AST node materialization. Called on demand as the consumer
     * walks a binary source-file response's tree, so it is not tied to any one
     * request.
     */
    recordMaterialization(): void {
        this.totals.nodesMaterialized++;
    }

    /**
     * Records a fetched source file: increments the fetched-file counter and adds
     * the file's materializable node count to the fetched-node total, which serves
     * as the denominator for the share of fetched nodes that end up materialized.
     */
    recordSourceFileFetched(materializableNodeCount: number): void {
        this.totals.sourceFilesFetched++;
        this.totals.nodesFetched += materializableNodeCount;
    }

    /** Returns a snapshot of the collected timing information. */
    getInfo(): TimingInfo {
        const recentRequests: RequestTiming[] = [];
        for (let i = 0; i < this.ring.length; i++) {
            recentRequests.push(this.ring[(this.head + i) % this.ring.length]);
        }
        return {
            enabled: true,
            totals: { ...this.totals },
            recentRequests,
        };
    }

    /** Clears all accumulated totals and recent-request history. */
    reset(): void {
        this.totals = emptyAccumulators();
        this.ring = [];
        this.head = 0;
    }
}
