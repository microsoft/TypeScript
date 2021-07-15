/* eslint-disable no-restricted-globals */
/*@internal*/
namespace ts.server.rpc {
    declare class TextDecoder {
        constructor(encoding: RAL.MessageBufferEncoding);
        decode(input: Uint8Array): string;
    }

    const util: {
        TextDecoder: typeof TextDecoder,
    } = require("util");

    class MessageBuffer extends AbstractMessageBuffer {

        private static readonly emptyBuffer: Buffer = Buffer.allocUnsafe(0);

        constructor(encoding: RAL.MessageBufferEncoding = "utf-8") {
            super(encoding);
        }

        protected emptyBuffer(): Uint8Array {
            return MessageBuffer.emptyBuffer;
        }

        protected fromString(value: string, encoding: RAL.MessageBufferEncoding): Buffer {
            return Buffer.from(value, encoding);
        }

        protected toString(value: Uint8Array, encoding: RAL.MessageBufferEncoding): string {
            if (value instanceof Buffer) {
                return value.toString(encoding);
            }
            else {
                return new util.TextDecoder(encoding).decode(value);
            }
        }
        protected asNative(buffer: Uint8Array, length?: number): Buffer {
            if (length === undefined) {
                return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
            }
            else {
                return buffer instanceof Buffer ? buffer.slice(0, length) : Buffer.from(buffer, 0, length);
            }
        }

        protected allocNative(length: number): Uint8Array {
            return Buffer.allocUnsafe(length);
        }
    }

    class ReadableStreamWrapper implements RAL.ReadableStream {

        constructor(private stream: NodeJS.ReadableStream) {
        }

        public onClose(listener: () => void): Disposable {
            this.stream.on("close", listener);
            return Disposable.create(() => this.stream.off("close", listener));
        }

        public onError(listener: (error: any) => void): Disposable {
            this.stream.on("error", listener);
            return Disposable.create(() => this.stream.off("error", listener));
        }

        public onEnd(listener: () => void): Disposable {
            this.stream.on("end", listener);
            return Disposable.create(() => this.stream.off("end", listener));
        }

        public onData(listener: (data: Uint8Array) => void): Disposable {
            this.stream.on("data", listener);
            return Disposable.create(() => this.stream.off("data", listener));
        }
    }

    class WritableStreamWrapper implements RAL.WritableStream {

        constructor(private stream: NodeJS.WritableStream) {
        }

        public onClose(listener: () => void): Disposable {
            this.stream.on("close", listener);
            return Disposable.create(() => this.stream.off("close", listener));
        }

        public onError(listener: (error: any) => void): Disposable {
            this.stream.on("error", listener);
            return Disposable.create(() => this.stream.off("error", listener));
        }

        public onEnd(listener: () => void): Disposable {
            this.stream.on("end", listener);
            return Disposable.create(() => this.stream.off("end", listener));
        }

        public write(data: Uint8Array | string, encoding?: RAL.MessageBufferEncoding): Promise<void> {
            return new Promise((resolve, reject) => {
                const callback = (error: Error | undefined | null) => {
                    // eslint-disable-next-line no-null/no-null
                    if (error === undefined || error === null) {
                        resolve();
                    }
                    else {
                        reject(error);
                    }
                };
                if (typeof data === "string") {
                    this.stream.write(data, encoding, callback);
                }
                else {
                    this.stream.write(data, callback);
                }
            });
        }

        public end(): void {
            this.stream.end();
        }
    }

    export interface RIL extends RAL {
        readonly stream: {
            readonly asReadableStream: (stream: NodeJS.ReadableStream) => RAL.ReadableStream;
            readonly asWritableStream: (stream: NodeJS.WritableStream) => RAL.WritableStream;
        }
    }

    const _ril: RIL = Object.freeze<RIL>({
        messageBuffer: Object.freeze({
            create: (encoding: RAL.MessageBufferEncoding) => new MessageBuffer(encoding)
        }),
        applicationJson: Object.freeze({
            encoder: Object.freeze({
                name: "application/json",
                encode: (msg: Message, options: ContentTypeEncoderOptions): Promise<Buffer> => {
                    try {
                        return Promise.resolve(Buffer.from(JSON.stringify(msg, undefined, 0), options.charset));
                    }
                    catch (err) {
                        return Promise.reject(err);
                    }
                }
            }),
            decoder: Object.freeze({
                name: "application/json",
                decode: (buffer: Uint8Array | Buffer, options: ContentTypeDecoderOptions): Promise<Message> => {
                    try {
                        if (buffer instanceof Buffer) {
                            return Promise.resolve(JSON.parse(buffer.toString(options.charset)));
                        }
                        else {
                            return Promise.resolve(JSON.parse(new TextDecoder(options.charset).decode(buffer)));
                        }
                    }
                    catch (err) {
                        return Promise.reject(err);
                    }
                }
            })
        }),
        stream: Object.freeze({
            asReadableStream: (stream: NodeJS.ReadableStream) => new ReadableStreamWrapper(stream),
            asWritableStream: (stream: NodeJS.WritableStream) => new WritableStreamWrapper(stream)
        }),
        console,
        timer: Object.freeze({
            setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): Disposable {
                const handle = setTimeout(callback, ms, ...args);
                return { dispose: () => clearTimeout(handle) };
            },
            setImmediate(callback: (...args: any[]) => void, ...args: any[]): Disposable {
                const handle = setImmediate(callback, ...args);
                return { dispose: () => clearImmediate(handle) };
            },
            setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): Disposable {
                const handle = setInterval(callback, ms, ...args);
                return { dispose: () => clearInterval(handle) };
            }
        })
    });


    export function RIL(): RIL {
        return _ril;
    }

    export namespace RIL {
        export function install(): void {
            RAL.install(_ril);
        }
    }
}
