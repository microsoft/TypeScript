import type {
    AsyncClientOptions,
    ClientSocketOptions,
    ClientSpawnOptions,
} from "../options.ts";
import { TransportClient } from "./transportClient.ts";

export type { ClientSocketOptions, ClientSpawnOptions };
export type { AsyncClientOptions as ClientOptions, AsyncClientTransportOptions } from "../options.ts";
export type { AsyncTransport } from "./transport.ts";

export class Client extends TransportClient {
    constructor(options: AsyncClientOptions) {
        if (!("transport" in options)) {
            throw new Error("The browser async API requires an injected transport");
        }
        super(options.transport, options.collectTiming ?? false, options.maxResponseBytesPerPage);
    }
}
