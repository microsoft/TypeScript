/*@internal*/
namespace ts.server.rpc {
    namespace Is {
        export const func = is.func;
        export const string = is.string;
    }

    const ContentLength: string = "Content-Length: ";
    const CRLF = "\r\n";

    /** Writes JSON-RPC messages to an underlying transport. */
    export interface MessageWriter {
        /** Raised whenever an error occurs while writing a message. */
        readonly onError: Event<
            [Error, Message | undefined, number | undefined]
        >;

        /** An event raised when the underlying transport has closed and writing is no longer possible. */
        readonly onClose: Event<void>;

        /**
         * Sends a JSON-RPC message.
         * @param msg The JSON-RPC message to be sent.
         * @description Implementations should guarantee messages are transmitted in the same order that they are received by this method.
         */
        write(msg: Message): Promise<void>;

        end(): void;

        /** Releases resources incurred from writing or raising events. Does NOT close the underlying transport, if any. */
        dispose(): void;
    }

    export namespace MessageWriter {
        export function is(value: any): value is MessageWriter {
            let candidate: MessageWriter = value;
            return (
                candidate &&
                Is.func(candidate.dispose) &&
                Is.func(candidate.onClose) &&
                Is.func(candidate.onError) &&
                Is.func(candidate.write)
            );
        }
    }

    export abstract class AbstractMessageWriter {
        private errorEmitter: Emitter<
            [Error, Message | undefined, number | undefined]
        >;
        private closeEmitter: Emitter<void>;

        constructor() {
            this.errorEmitter = new Emitter<[Error, Message, number]>();
            this.closeEmitter = new Emitter<void>();
        }

        public dispose(): void {
            this.errorEmitter.dispose();
            this.closeEmitter.dispose();
        }

        public get onError(): Event<
            [Error, Message | undefined, number | undefined]
        > {
            return this.errorEmitter.event;
        }

        protected fireError(
            error: any,
            message?: Message,
            count?: number
        ): void {
            this.errorEmitter.fire([this.asError(error), message, count]);
        }

        public get onClose(): Event<void> {
            return this.closeEmitter.event;
        }

        protected fireClose(): void {
            this.closeEmitter.fire(undefined);
        }

        private asError(error: any): Error {
            if (error instanceof Error) {
                return error;
            } else {
                return new Error(
                    `Writer received error. Reason: ${
                        Is.string(error.message) ? error.message : "unknown"
                    }`
                );
            }
        }
    }

    export interface MessageWriterOptions {
        charset?: RAL.MessageBufferEncoding;
        contentEncoder?: ContentEncoder;
        contentTypeEncoder?: ContentTypeEncoder;
    }

    interface ResolvedMessageWriterOptions {
        charset: RAL.MessageBufferEncoding;
        contentEncoder?: ContentEncoder;
        contentTypeEncoder: ContentTypeEncoder;
    }

    namespace ResolvedMessageWriterOptions {
        export function fromOptions(
            options:
                | RAL.MessageBufferEncoding
                | MessageWriterOptions
                | undefined
        ): ResolvedMessageWriterOptions {
            if (options === undefined || typeof options === "string") {
                return {
                    charset: options ?? "utf-8",
                    contentTypeEncoder: RAL().applicationJson.encoder,
                };
            } else {
                return {
                    charset: options.charset ?? "utf-8",
                    contentEncoder: options.contentEncoder,
                    contentTypeEncoder:
                        options.contentTypeEncoder ??
                        RAL().applicationJson.encoder,
                };
            }
        }
    }

    export class WriteableStreamMessageWriter
        extends AbstractMessageWriter
        implements MessageWriter
    {
        private writable: RAL.WritableStream;
        private options: ResolvedMessageWriterOptions;
        private errorCount: number;
        private writeSemaphore: Semaphore<void>;

        public constructor(
            writable: RAL.WritableStream,
            options?: RAL.MessageBufferEncoding | MessageWriterOptions
        ) {
            super();
            this.writable = writable;
            this.options = ResolvedMessageWriterOptions.fromOptions(options);
            this.errorCount = 0;
            this.writeSemaphore = new Semaphore(1);
            this.writable.onError((error: any) => this.fireError(error));
            this.writable.onClose(() => this.fireClose());
        }

        public async write(msg: Message): Promise<void> {
            return this.writeSemaphore.lock(async () => {
                const payload = this.options.contentTypeEncoder
                    .encode(msg, this.options)
                    .then((buffer) => {
                        if (this.options.contentEncoder !== undefined) {
                            return this.options.contentEncoder.encode(buffer);
                        } else {
                            return buffer;
                        }
                    });
                return payload.then(
                    (buffer) => {
                        const headers: string[] = [];
                        headers.push(
                            ContentLength,
                            buffer.byteLength.toString(),
                            CRLF
                        );
                        headers.push(CRLF);
                        return this.doWrite(msg, headers, buffer);
                    },
                    (error) => {
                        this.fireError(error);
                        throw error;
                    }
                );
            });
        }

        private async doWrite(
            msg: Message,
            headers: string[],
            data: Uint8Array
        ): Promise<void> {
            try {
                await this.writable.write(headers.join(""), "ascii");
                return this.writable.write(data);
            } catch (error) {
                this.handleError(error, msg);
                return Promise.reject(error);
            }
        }

        private handleError(error: any, msg: Message): void {
            this.errorCount++;
            this.fireError(error, msg, this.errorCount);
        }

        public end(): void {
            this.writable.end();
        }
    }
}
