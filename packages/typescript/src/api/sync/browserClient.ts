import type {
    ClientSocketOptions,
    ClientSpawnOptions,
    SyncClientOptions,
} from "../options.ts";
import { TransportClient } from "./transportClient.ts";

export type { ClientSocketOptions, ClientSpawnOptions };
export type { ClientTransportOptions, SyncClientOptions as ClientOptions } from "../options.ts";
export type { SyncTransport } from "./transport.ts";

export class Client extends TransportClient {
    constructor(options: SyncClientOptions) {
        if (!("transport" in options)) {
            throw new Error("The browser sync API requires an injected transport");
        }
        options.transport.setFileSystem?.(options.fs);
        super(options.transport, options.collectTiming ?? false, options.maxResponseBytesPerPage);
    }
}
