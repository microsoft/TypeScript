import type { Disposable } from './disposable';
import type { ContentTypeEncoder, ContentTypeDecoder } from './encoding';
interface _MessageBuffer {
    readonly encoding: RAL.MessageBufferEncoding;
    /**
     * Append data to the message buffer.
     *
     * @param chunk the data to append.
     */
    append(chunk: Uint8Array | string): void;
    /**
     * Tries to read the headers from the buffer
     *
     * @param lowerCaseKeys Whether the keys should be stored lower case. Doing
     * so is recommended since HTTP headers are case insensitive.
     *
     * @returns the header properties or undefined in not enough data can be read.
     */
    tryReadHeaders(lowerCaseKeys?: boolean): Map<string, string> | undefined;
    /**
     * Tries to read the body of the given length.
     *
     * @param length the amount of bytes to read.
     * @returns the data or undefined int less data is available.
     */
    tryReadBody(length: number): Uint8Array | undefined;
}
type _MessageBufferEncoding = 'ascii' | 'utf-8';
interface _ReadableStream {
    onData(listener: (data: Uint8Array) => void): Disposable;
    onClose(listener: () => void): Disposable;
    onError(listener: (error: any) => void): Disposable;
    onEnd(listener: () => void): Disposable;
}
interface _WritableStream {
    onClose(listener: () => void): Disposable;
    onError(listener: (error: any) => void): Disposable;
    onEnd(listener: () => void): Disposable;
    write(data: Uint8Array): Promise<void>;
    write(data: string, encoding: _MessageBufferEncoding): Promise<void>;
    end(): void;
}
interface _DuplexStream extends _ReadableStream, _WritableStream {
}
interface RAL {
    readonly applicationJson: {
        readonly encoder: ContentTypeEncoder;
        readonly decoder: ContentTypeDecoder;
    };
    readonly messageBuffer: {
        create(encoding: RAL.MessageBufferEncoding): RAL.MessageBuffer;
    };
    readonly console: {
        info(message?: any, ...optionalParams: any[]): void;
        log(message?: any, ...optionalParams: any[]): void;
        warn(message?: any, ...optionalParams: any[]): void;
        error(message?: any, ...optionalParams: any[]): void;
    };
    readonly timer: {
        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): Disposable;
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): Disposable;
        setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): Disposable;
    };
}
declare function RAL(): RAL;
declare namespace RAL {
    type MessageBuffer = _MessageBuffer;
    type MessageBufferEncoding = _MessageBufferEncoding;
    type ReadableStream = _ReadableStream;
    type WritableStream = _WritableStream;
    type DuplexStream = _DuplexStream;
    function install(ral: RAL): void;
}
export default RAL;
