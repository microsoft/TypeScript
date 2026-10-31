import {
    configureFileSystemCallbacks,
    encodeFileSystemCallbackResult,
} from "../fsCallbacks.ts";
import {
    type ClientSocketOptions,
    type ClientSpawnOptions,
    getAPIProcessArgs,
    isSpawnOptions,
    isTransportOptions,
    resolveExePath,
    type SyncClientOptions,
} from "../options.ts";
import { SyncRpcChannel } from "../syncChannel.ts";
import type { ServerTimingInfo } from "../timing.ts";
import { TimingDump } from "../timingDump.ts";
import { TransportClient } from "./transportClient.ts";

export type { ClientSocketOptions, ClientSpawnOptions };
export type { ClientTransportOptions, SyncClientOptions as ClientOptions } from "../options.ts";
export type { SyncTransport } from "./transport.ts";

export class Client extends TransportClient {
    private readonly channel: SyncRpcChannel | undefined;
    private readonly timingDump: TimingDump | undefined;
    private closed = false;

    constructor(options: SyncClientOptions) {
        if (isTransportOptions(options)) {
            if (options.fs !== undefined) {
                options.transport.setFileSystem?.(options.fs);
            }
            super(options.transport, options.collectTiming ?? false, options.maxResponseBytesPerPage);
            return;
        }
        if (!isSpawnOptions(options)) {
            throw new Error("Socket connections are not yet supported in the sync client");
        }

        const timingDump = TimingDump.fromEnvironment("sync", "spawn");
        if (timingDump) {
            options = { ...options, collectTiming: true };
        }
        const args = getAPIProcessArgs(options, false);
        const fsConfiguration = configureFileSystemCallbacks(options.fs);
        if (fsConfiguration.arguments.length > 0) {
            args.push(`--callbacks=${fsConfiguration.arguments.join(",")}`);
        }

        const collectTiming = options.collectTiming ?? false;
        const channel = new SyncRpcChannel(resolveExePath(options), args, collectTiming);
        super(channel, collectTiming, options.maxResponseBytesPerPage);
        this.channel = channel;
        this.timingDump = timingDump;

        if (options.fs) {
            for (const name of fsConfiguration.callbackNames) {
                if (name === "writeFile") {
                    const callback = options.fs.writeFile;
                    if (typeof callback !== "function") throw new Error("Invalid writeFile callback configuration");
                    channel.registerCallback(name, (_, arg) => {
                        const { path, data } = JSON.parse(arg);
                        return JSON.stringify(encodeFileSystemCallbackResult(name, callback(path, data)));
                    });
                    continue;
                }

                const callback = options.fs[name];
                if (typeof callback !== "function") throw new Error(`Invalid ${name} callback configuration`);
                channel.registerCallback(name, (_, arg) => {
                    return JSON.stringify(encodeFileSystemCallbackResult(name, callback(JSON.parse(arg))));
                });
            }
        }
    }

    override close(): void {
        if (this.closed) return;
        this.closed = true;
        try {
            const timing = this.getTimingCollector();
            if (this.timingDump && timing && this.channel) {
                const local = timing.getInfo();
                let server: ServerTimingInfo | undefined;
                let serverTimingError: string | undefined;
                try {
                    server = JSON.parse(this.channel.requestSync("getServerTiming", "")) as ServerTimingInfo;
                }
                catch (error) {
                    serverTimingError = String(error);
                }
                this.timingDump.write(local, server, serverTimingError);
            }
        }
        finally {
            super.close();
        }
    }
}
