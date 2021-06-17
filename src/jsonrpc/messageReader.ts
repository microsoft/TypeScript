/*@internal*/
namespace ts.server.rpc {
    namespace Is {
        export const func = is.func;
        export const string = is.string;
    }

    /**
     * A callback that receives each incoming JSON-RPC message.
     */
    export interface DataCallback {
        (data: Message): void;
    }

    export interface PartialMessageInfo {
        readonly messageToken: number;
        readonly waitingTime: number;
    }

    /** Reads JSON-RPC messages from some underlying transport. */
    export interface MessageReader {
        /** Raised whenever an error occurs while reading a message. */
        readonly onError: Event<Error>;

        /** An event raised when the end of the underlying transport has been reached. */
        readonly onClose: Event<void>;

        /**
         * An event that *may* be raised to inform the owner that only part of a message has been received.
         * A MessageReader implementation may choose to raise this event after a timeout elapses while waiting for more of a partially received message to be received.
         */
        readonly onPartialMessage: Event<PartialMessageInfo>;

        /**
         * Begins listening for incoming messages. To be called at most once.
         * @param callback A callback for receiving decoded messages.
         */
        listen(callback: DataCallback): Disposable;

        /** Releases resources incurred from reading or raising events. Does NOT close the underlying transport, if any. */
        dispose(): void;
    }

    export namespace MessageReader {
        export function is(value: any): value is MessageReader {
            let candidate: MessageReader = value;
            return (
                candidate &&
                Is.func(candidate.listen) &&
                Is.func(candidate.dispose) &&
                Is.func(candidate.onError) &&
                Is.func(candidate.onClose) &&
                Is.func(candidate.onPartialMessage)
            );
        }
    }

    export abstract class AbstractMessageReader implements MessageReader {
        private errorEmitter: Emitter<Error>;
        private closeEmitter: Emitter<void>;

        private partialMessageEmitter: Emitter<PartialMessageInfo>;

        constructor() {
            this.errorEmitter = new Emitter<Error>();
            this.closeEmitter = new Emitter<void>();
            this.partialMessageEmitter = new Emitter<PartialMessageInfo>();
        }

        public dispose(): void {
            this.errorEmitter.dispose();
            this.closeEmitter.dispose();
        }

        public get onError(): Event<Error> {
            return this.errorEmitter.event;
        }

        protected fireError(error: any): void {
            this.errorEmitter.fire(this.asError(error));
        }

        public get onClose(): Event<void> {
            return this.closeEmitter.event;
        }

        protected fireClose(): void {
            this.closeEmitter.fire(undefined);
        }

        public get onPartialMessage(): Event<PartialMessageInfo> {
            return this.partialMessageEmitter.event;
        }

        protected firePartialMessage(info: PartialMessageInfo): void {
            this.partialMessageEmitter.fire(info);
        }

        private asError(error: any): Error {
            if (error instanceof Error) {
                return error;
            } else {
                return new Error(
                    `Reader received error. Reason: ${
                        Is.string(error.message) ? error.message : "unknown"
                    }`
                );
            }
        }

        public abstract listen(callback: DataCallback): Disposable;
    }

    export interface MessageReaderOptions {
        charset?: RAL.MessageBufferEncoding;
        contentDecoder?: ContentDecoder;
        contentDecoders?: ContentDecoder[];
        contentTypeDecoder?: ContentTypeDecoder;
        contentTypeDecoders?: ContentTypeDecoder[];
    }

    interface ResolvedMessageReaderOptions {
        charset: RAL.MessageBufferEncoding;
        contentDecoder?: ContentDecoder;
        contentDecoders: Map<string, ContentDecoder>;
        contentTypeDecoder: ContentTypeDecoder;
        contentTypeDecoders: Map<string, ContentTypeDecoder>;
    }

    namespace ResolvedMessageReaderOptions {
        export function fromOptions(
            options?: RAL.MessageBufferEncoding | MessageReaderOptions
        ): ResolvedMessageReaderOptions {
            let charset: RAL.MessageBufferEncoding;
            let result: ResolvedMessageReaderOptions;
            let contentDecoder: ContentDecoder | undefined;
            const contentDecoders: typeof result.contentDecoders = new Map();
            let contentTypeDecoder: ContentTypeDecoder | undefined;
            const contentTypeDecoders: typeof result.contentTypeDecoders =
                new Map();
            if (options === undefined || typeof options === "string") {
                charset = options ?? "utf-8";
            } else {
                charset = options.charset ?? "utf-8";
                if (options.contentDecoder !== undefined) {
                    contentDecoder = options.contentDecoder;
                    contentDecoders.set(contentDecoder.name, contentDecoder);
                }
                if (options.contentDecoders !== undefined) {
                    for (const decoder of options.contentDecoders) {
                        contentDecoders.set(decoder.name, decoder);
                    }
                }
                if (options.contentTypeDecoder !== undefined) {
                    contentTypeDecoder = options.contentTypeDecoder;
                    contentTypeDecoders.set(
                        contentTypeDecoder.name,
                        contentTypeDecoder
                    );
                }
                if (options.contentTypeDecoders !== undefined) {
                    for (const decoder of options.contentTypeDecoders) {
                        contentTypeDecoders.set(decoder.name, decoder);
                    }
                }
            }
            if (contentTypeDecoder === undefined) {
                contentTypeDecoder = RAL().applicationJson.decoder;
                contentTypeDecoders.set(
                    contentTypeDecoder.name,
                    contentTypeDecoder
                );
            }
            return {
                charset,
                contentDecoder,
                contentDecoders,
                contentTypeDecoder,
                contentTypeDecoders,
            };
        }
    }

    export class ReadableStreamMessageReader extends AbstractMessageReader {
        private readable: RAL.ReadableStream;
        private options: ResolvedMessageReaderOptions;
        private callback!: DataCallback;

        private nextMessageLength: number;
        private messageToken: number;
        private buffer: RAL.MessageBuffer;
        private partialMessageTimer: Disposable | undefined;
        private _partialMessageTimeout: number;

        public constructor(
            readable: RAL.ReadableStream,
            options?: RAL.MessageBufferEncoding | MessageReaderOptions
        ) {
            super();
            this.readable = readable;
            this.options = ResolvedMessageReaderOptions.fromOptions(options);
            this.buffer = RAL().messageBuffer.create(this.options.charset);
            this._partialMessageTimeout = 10000;
            this.nextMessageLength = -1;
            this.messageToken = 0;
        }

        public set partialMessageTimeout(timeout: number) {
            this._partialMessageTimeout = timeout;
        }

        public get partialMessageTimeout(): number {
            return this._partialMessageTimeout;
        }

        public listen(callback: DataCallback): Disposable {
            this.nextMessageLength = -1;
            this.messageToken = 0;
            this.partialMessageTimer = undefined;
            this.callback = callback;
            const result = this.readable.onData((data: Uint8Array) => {
                this.onData(data);
            });
            this.readable.onError((error: any) => this.fireError(error));
            this.readable.onClose(() => this.fireClose());
            return result;
        }

        private onData(data: Uint8Array): void {
            this.buffer.append(data);
            while (true) {
                if (this.nextMessageLength === -1) {
                    const headers = this.buffer.tryReadHeaders();
                    if (!headers) {
                        return;
                    }
                    const contentLength = headers.get("Content-Length");
                    if (!contentLength) {
                        throw new Error(
                            "Header must provide a Content-Length property."
                        );
                    }
                    const length = parseInt(contentLength);
                    if (isNaN(length)) {
                        throw new Error(
                            "Content-Length value must be a number."
                        );
                    }
                    this.nextMessageLength = length;
                }
                const body = this.buffer.tryReadBody(this.nextMessageLength);
                if (body === undefined) {
                    /** We haven't received the full message yet. */
                    this.setPartialMessageTimer();
                    return;
                }
                this.clearPartialMessageTimer();
                this.nextMessageLength = -1;
                let p: Promise<Uint8Array>;
                if (this.options.contentDecoder !== undefined) {
                    p = this.options.contentDecoder.decode(body);
                } else {
                    p = Promise.resolve(body);
                }
                p.then(
                    (value) => {
                        this.options.contentTypeDecoder
                            .decode(value, this.options)
                            .then(
                                (msg: Message) => {
                                    this.callback(msg);
                                },
                                (error) => {
                                    this.fireError(error);
                                }
                            );
                    },
                    (error) => {
                        this.fireError(error);
                    }
                );
            }
        }

        private clearPartialMessageTimer(): void {
            if (this.partialMessageTimer) {
                this.partialMessageTimer.dispose();
                this.partialMessageTimer = undefined;
            }
        }

        private setPartialMessageTimer(): void {
            this.clearPartialMessageTimer();
            if (this._partialMessageTimeout <= 0) {
                return;
            }
            this.partialMessageTimer = RAL().timer.setTimeout(
                (token, timeout) => {
                    this.partialMessageTimer = undefined;
                    if (token === this.messageToken) {
                        this.firePartialMessage({
                            messageToken: token,
                            waitingTime: timeout,
                        });
                        this.setPartialMessageTimer();
                    }
                },
                this._partialMessageTimeout,
                this.messageToken,
                this._partialMessageTimeout
            );
        }
    }
}
