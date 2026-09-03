/**
 * A synchronous request transport connected to a TypeScript API session.
 *
 * Implementations may use a child process, an in-process WebAssembly reactor,
 * or another embedding mechanism. Calls must run to completion before returning.
 */
export interface SyncTransport {
    /** Payload bytes sent by the most recently completed request. */
    readonly lastBytesSent: number;
    /** Payload bytes received by the most recently completed request. */
    readonly lastBytesReceived: number;

    requestSync(method: string, payload: string): string;
    requestBinarySync(method: string, payload: Uint8Array): Uint8Array;
    setFileSystem?(fs: FileSystem | undefined): void;
    close(): void;
}
import type { FileSystem } from "../fs.ts";
