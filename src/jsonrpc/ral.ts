/* eslint-disable @typescript-eslint/naming-convention */
/* @internal */
namespace ts.server.rpc {
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
         * @returns the header properties or undefined in not enough data can be read.
         */
        tryReadHeaders(): Map<string, string> | undefined;

        /**
         * Tries to read the body of the given length.
         *
         * @param length the amount of bytes to read.
         * @returns the data or undefined int less data is available.
         */
        tryReadBody(length: number): Uint8Array | undefined;
    }

    type _MessageBufferEncoding = "ascii" | "utf-8";

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

    export interface RAL {

        readonly applicationJson: {
            readonly encoder: ContentTypeEncoder;
            readonly decoder: ContentTypeDecoder;
        };

        readonly messageBuffer: {
            create(encoding: RAL.MessageBufferEncoding): RAL.MessageBuffer;
        }

        readonly console: {
            info(message?: any, ...optionalParams: any[]): void;
            log(message?: any, ...optionalParams: any[]): void;
            warn(message?: any, ...optionalParams: any[]): void;
            error(message?: any, ...optionalParams: any[]): void;
        }

        readonly timer: {
            setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): Disposable;
            setImmediate(callback: (...args: any[]) => void, ...args: any[]): Disposable;
            setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): Disposable;
        }
    }

    let _ral: RAL | undefined;

    export function RAL(): RAL {
        if (_ral === undefined) {
            throw new Error(`No runtime abstraction layer installed`);
        }
        return _ral;
    }

    export namespace RAL {
        export type MessageBuffer = _MessageBuffer;
        export type MessageBufferEncoding = _MessageBufferEncoding;
        export type ReadableStream = _ReadableStream;
        export type WritableStream = _WritableStream;
        export type DuplexStream = _DuplexStream;
        export function install(ral: RAL): void {
            if (ral === undefined) {
                throw new Error(`No runtime abstraction layer provided`);
            }
            _ral = ral;
        }
    }
}
