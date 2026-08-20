import RAL from './ral';
import { Event } from './events';
import { Message } from './messages';
import { ContentDecoder, ContentTypeDecoder } from './encoding';
import { Disposable } from './api';
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
export declare namespace MessageReader {
    function is(value: any): value is MessageReader;
}
export declare abstract class AbstractMessageReader implements MessageReader {
    private errorEmitter;
    private closeEmitter;
    private partialMessageEmitter;
    constructor();
    dispose(): void;
    get onError(): Event<Error>;
    protected fireError(error: any): void;
    get onClose(): Event<void>;
    protected fireClose(): void;
    get onPartialMessage(): Event<PartialMessageInfo>;
    protected firePartialMessage(info: PartialMessageInfo): void;
    private asError;
    abstract listen(callback: DataCallback): Disposable;
}
export interface MessageReaderOptions {
    charset?: RAL.MessageBufferEncoding;
    contentDecoder?: ContentDecoder;
    contentDecoders?: ContentDecoder[];
    contentTypeDecoder?: ContentTypeDecoder;
    contentTypeDecoders?: ContentTypeDecoder[];
}
export declare class ReadableStreamMessageReader extends AbstractMessageReader {
    private readable;
    private options;
    private callback;
    private nextMessageLength;
    private messageToken;
    private buffer;
    private partialMessageTimer;
    private _partialMessageTimeout;
    private readSemaphore;
    constructor(readable: RAL.ReadableStream, options?: RAL.MessageBufferEncoding | MessageReaderOptions);
    set partialMessageTimeout(timeout: number);
    get partialMessageTimeout(): number;
    listen(callback: DataCallback): Disposable;
    private onData;
    private clearPartialMessageTimer;
    private setPartialMessageTimer;
}
