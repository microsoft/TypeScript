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
import { TransportClient } from "./transportClient.ts";

export type { ClientSocketOptions, ClientSpawnOptions };
export type { ClientTransportOptions, SyncClientOptions as ClientOptions } from "../options.ts";
export type { SyncTransport } from "./transport.ts";

export class Client extends TransportClient {
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

        const args = getAPIProcessArgs(options, false);

        const fsConfiguration = configureFileSystemCallbacks(options.fs);
        if (fsConfiguration.arguments.length > 0) {
            args.push(`--callbacks=${fsConfiguration.arguments.join(",")}`);
        }

        const collectTiming = options.collectTiming ?? false;
        const channel = new SyncRpcChannel(resolveExePath(options), args, collectTiming);
        super(channel, collectTiming, options.maxResponseBytesPerPage);

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
}
