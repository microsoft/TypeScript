import RAL from './ral';
import { Message } from './messages';
import { Event } from './events';
import { ContentEncoder, ContentTypeEncoder } from './encoding';
/**
 * Writes JSON-RPC messages to an underlying transport.
 */
export interface MessageWriter {
    /**
     * Raised whenever an error occurs while writing a message.
     */
    readonly onError: Event<[Error, Message | undefined, number | undefined]>;
    /**
     * An event raised when the underlying transport has closed and writing is no longer possible.
     */
    readonly onClose: Event<void>;
    /**
     * Sends a JSON-RPC message.
     * @param msg The JSON-RPC message to be sent.
     * @description Implementations should guarantee messages are transmitted in the same order that they are received by this method.
     */
    write(msg: Message): Promise<void>;
    /**
     * Call when the connection using this message writer ends
     * (e.g. MessageConnection.end() is called)
     */
    end(): void;
    /** Releases resources incurred from writing or raising events. Does NOT close the underlying transport, if any. */
    dispose(): void;
}
export declare namespace MessageWriter {
    function is(value: any): value is MessageWriter;
}
export declare abstract class AbstractMessageWriter {
    private errorEmitter;
    private closeEmitter;
    constructor();
    dispose(): void;
    get onError(): Event<[Error, Message | undefined, number | undefined]>;
    protected fireError(error: any, message?: Message, count?: number): void;
    get onClose(): Event<void>;
    protected fireClose(): void;
    private asError;
}
export interface MessageWriterOptions {
    charset?: RAL.MessageBufferEncoding;
    contentEncoder?: ContentEncoder;
    contentTypeEncoder?: ContentTypeEncoder;
}
export declare class WriteableStreamMessageWriter extends AbstractMessageWriter implements MessageWriter {
    private writable;
    private options;
    private errorCount;
    private writeSemaphore;
    constructor(writable: RAL.WritableStream, options?: RAL.MessageBufferEncoding | MessageWriterOptions);
    write(msg: Message): Promise<void>;
    private doWrite;
    private handleError;
    end(): void;
}
