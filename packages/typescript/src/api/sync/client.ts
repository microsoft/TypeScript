import { fsCallbackNames } from "../fs.ts";
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
        const channel = new SyncRpcChannel(resolveExePath(options), args, collectTiming);
        super(channel, collectTiming, options.maxResponseBytesPerPage);

        if (options.fs) {
            for (const name of enabledCallbacks) {
                if (name === "writeFile") {
                    if (!options.fs.writeFile) continue;
                    const callback = options.fs.writeFile;

                    channel.registerCallback(name, (_, arg) => {
                        const { path, data } = JSON.parse(arg);
                        callback(path, data);
                        return "";
                    });

                    continue;
                }

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
}
