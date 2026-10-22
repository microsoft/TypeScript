import type { FileSystemCallbacks } from "../fs.ts";

/**
 * An asynchronous request transport connected to a TypeScript API session.
 */
export interface AsyncTransportResponse<T> {
    readonly value: T;
    readonly bytesSent: number;
    readonly bytesReceived: number;
}

export interface AsyncTransport {
    request(method: string, payload: string): AsyncTransportResponse<string> | PromiseLike<AsyncTransportResponse<string>>;
    requestBinary(
        method: string,
        payload: Uint8Array,
    ): AsyncTransportResponse<Uint8Array> | PromiseLike<AsyncTransportResponse<Uint8Array>>;
    /**
     * Registers a callback the server invokes during a request. Transports
     * that cannot wait for a Promise or accept nested requests from the
     * callback must reject them.
     */
    registerCallback?(name: string, callback: (name: string, payload: string) => string | PromiseLike<string>): void;
    unregisterCallback?(name: string): void;
    setFileSystem?(fs: FileSystemCallbacks | undefined): void;
    close(): void | PromiseLike<void>;
}
