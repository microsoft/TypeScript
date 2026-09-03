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
    setFileSystem?(fs: FileSystem | undefined): void;
    close(): void | PromiseLike<void>;
}
import type { FileSystem } from "../fs.ts";
