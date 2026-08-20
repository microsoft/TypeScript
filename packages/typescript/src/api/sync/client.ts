import { fsCallbackNames } from "../fs.ts";
import {
    type ClientOptions,
    type ClientSocketOptions,
    type ClientSpawnOptions,
    isSpawnOptions,
    resolveExePath,
} from "../options.ts";
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

    constructor(options: ClientOptions) {
        if (!isSpawnOptions(options)) {
            throw new Error("Socket connections are not yet supported in the sync client");
        }

        const cwd = options.cwd ?? process.cwd();
        const args = [
            "--api",
            "--cwd",
            cwd,
        ];

        // Enable virtual FS callbacks for each provided FS function
        const enabledCallbacks: (typeof fsCallbackNames[number])[] = [];
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

        const collectTiming = options.collectTiming ?? false;
        if (collectTiming) {
            args.push("--timing");
            this.timing = new TimingCollector();
        }

        const channel = new SyncRpcChannel(resolveExePath(options), args, collectTiming);
        this.channel = channel;

        if (options.fs) {
            for (const name of enabledCallbacks) {
                const callback = options.fs[name]!;
                channel.registerCallback(name, (_, arg) => {
                    const result = callback(JSON.parse(arg));
                    if (name === "readFile") {
                        // readFile has 3 returns: string (content), null (not found), undefined (fall back).
                        // Wrap in object to preserve null vs undefined distinction.
                        if (result === undefined) return "";
                        return JSON.stringify({ content: result });
                    }
                    return JSON.stringify(result) ?? "";
                });
            }
        }
    }

    apiRequest<T>(method: string, params?: unknown): T {
        const encodedPayload = JSON.stringify(params);
        const start = performance.now();
        const result = this.channel.requestSync(method, encodedPayload);
        this.recordTiming(method, start);
        if (result.length) {
            return JSON.parse(result) as T;
        }
        return undefined as unknown as T;
    }

    apiRequestBinary(method: string, params?: unknown): Uint8Array | undefined {
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
