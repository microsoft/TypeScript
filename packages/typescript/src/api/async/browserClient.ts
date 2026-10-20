import type {
    AsyncClientOptions,
    ClientSocketOptions,
    ClientSpawnOptions,
} from "../options.ts";
import {
    createTransportClient,
    type TransportClient,
} from "./transportClient.ts";

export type { ClientSocketOptions, ClientSpawnOptions };
export type { AsyncClientOptions as ClientOptions, AsyncClientTransportOptions } from "../options.ts";
export type { AsyncTransport } from "./transport.ts";

export type Client = TransportClient;

export function createClient(options: AsyncClientOptions): Client {
    if (!("transport" in options)) {
        throw new Error("The browser async API requires an injected transport");
    }
    return createTransportClient(options);
}
