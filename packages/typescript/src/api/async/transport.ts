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
    registerCallback?(name: string, callback: (name: string, payload: string) => string): void;
    unregisterCallback?(name: string): void;
    close(): void | PromiseLike<void>;
}
