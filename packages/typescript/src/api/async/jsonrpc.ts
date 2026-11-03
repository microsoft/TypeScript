// Only vscode-jsonrpc's environment-neutral core is imported here. Its Node
// entry point loads Node modules at import time, which would prevent this
// package from being loaded or bundled for other environments, so the Node
// runtime layer it would install is provided below instead.
import {
    AbstractMessageBuffer,
    createMessageConnection,
    Disposable,
    Message,
    type MessageConnection,
    NullLogger,
    RAL,
    ReadableStreamMessageReader,
    WriteableStreamMessageWriter,
} from "../../../vendor/vscode-jsonrpc/lib/common/api.js";

export { type MessageConnection, RequestType } from "../../../vendor/vscode-jsonrpc/lib/common/api.js";

class MessageBuffer extends AbstractMessageBuffer {
    protected emptyBuffer(): Uint8Array {
        return Buffer.allocUnsafe(0);
    }

    protected fromString(value: string, encoding: RAL.MessageBufferEncoding): Uint8Array {
        return Buffer.from(value, encoding);
    }

    protected toString(value: Uint8Array, encoding: RAL.MessageBufferEncoding): string {
        return value instanceof Buffer ? value.toString(encoding) : new TextDecoder(encoding).decode(value);
    }

    protected asNative(buffer: Uint8Array, length?: number): Uint8Array {
        if (length === undefined) {
            return buffer instanceof Buffer ? buffer : Buffer.from(buffer);
        }
        return buffer instanceof Buffer ? buffer.subarray(0, length) : Buffer.from(buffer.buffer, buffer.byteOffset, length);
    }

    protected allocNative(length: number): Uint8Array {
        return Buffer.allocUnsafe(length);
    }
}

interface EventSource {
    on(event: string, listener: (...args: any[]) => void): unknown;
    off(event: string, listener: (...args: any[]) => void): unknown;
}

interface WritableStream extends EventSource {
    write(data: Uint8Array, callback: (error: Error | null | undefined) => void): unknown;
    write(data: string, encoding: RAL.MessageBufferEncoding, callback: (error: Error | null | undefined) => void): unknown;
    end(): unknown;
}

function listen(stream: EventSource, event: string, listener: (...args: any[]) => void): Disposable {
    stream.on(event, listener);
    return Disposable.create(() => stream.off(event, listener));
}

let installed = false;

function installRuntime(): void {
    if (installed) return;
    installed = true;
    RAL.install({
        messageBuffer: {
            create: encoding => new MessageBuffer(encoding),
        },
        applicationJson: {
            encoder: {
                name: "application/json",
                encode: async (message, options) => Buffer.from(JSON.stringify(message, undefined, 0), options.charset),
            },
            decoder: {
                name: "application/json",
                decode: async (buffer, options) =>
                    JSON.parse(
                        buffer instanceof Buffer ? buffer.toString(options.charset) : new TextDecoder(options.charset).decode(buffer),
                    ),
            },
        },
        console,
        timer: {
            setTimeout(callback, ms, ...args) {
                const handle = setTimeout(callback, ms, ...args);
                return { dispose: () => clearTimeout(handle) };
            },
            setImmediate(callback, ...args) {
                const handle = setImmediate(callback, ...args);
                return { dispose: () => clearImmediate(handle) };
            },
            setInterval(callback, ms, ...args) {
                const handle = setInterval(callback, ms, ...args);
                return { dispose: () => clearInterval(handle) };
            },
        },
    });
}

/** Creates a JSON-RPC connection over Node.js streams. */
export function createStreamConnection(readable: EventSource, writable: WritableStream): { connection: MessageConnection; drain(): Promise<void>; } {
    installRuntime();
    const frames = new IncomingFrames();
    const responses = new Map<string, Message>();
    let closing = false;
    let resolveDrain: (() => void) | undefined;

    function finishDrain(): void {
        if (frames.pending === 0 && responses.size === 0 && resolveDrain) {
            resolveDrain();
            resolveDrain = undefined;
        }
    }

    function onClose(stream: EventSource, listener: () => void): Disposable {
        return listen(stream, "close", () => {
            // A write-side close can precede EOF on the read side. Only frames
            // received before close belong to this drain; do not wait for later data.
            closing = true;
            listener();
        });
    }

    const decoder = RAL().applicationJson.decoder;
    const reader = new ReadableStreamMessageReader({
        onClose: listener => onClose(readable, listener),
        onError: listener => listen(readable, "error", listener),
        onEnd: listener => listen(readable, "end", listener),
        onData: listener =>
            listen(readable, "data", (data: Uint8Array | string) => {
                if (closing) return;
                const bytes = typeof data === "string" ? Buffer.from(data, "utf8") : data;
                frames.append(bytes);
                listener(bytes);
            }),
    }, {
        contentTypeDecoder: {
            name: decoder.name,
            async decode(data, options) {
                try {
                    return await decoder.decode(data, options);
                }
                catch (error) {
                    frames.finish();
                    finishDrain();
                    throw error;
                }
            },
        },
    });
    // This connection does not consume partial-message events. In particular,
    // avoid leaving their repeating timer alive after a truncated frame closes.
    reader.partialMessageTimeout = 0;
    const listenForMessages = reader.listen.bind(reader);
    reader.listen = callback =>
        listenForMessages(message => {
            const key = responseKey(message);
            if (key !== undefined) responses.set(key, message);
            try {
                callback(message);
            }
            finally {
                frames.finish();
                finishDrain();
            }
        });
    const writer = new WriteableStreamMessageWriter({
        onClose: listener => onClose(writable, listener),
        onError: listener => listen(writable, "error", listener),
        onEnd: listener => listen(writable, "end", listener),
        write: (data: Uint8Array | string, encoding?: RAL.MessageBufferEncoding) =>
            new Promise<void>((resolve, reject) => {
                const callback = (error: Error | null | undefined) => error ? reject(error) : resolve();
                if (typeof data === "string") {
                    writable.write(data, encoding ?? "utf-8", callback);
                }
                else {
                    writable.write(data, callback);
                }
            }),
        end: () => writable.end(),
    });
    const connection = createMessageConnection(reader, writer, NullLogger, {
        messageStrategy: {
            handleMessage(message, next) {
                try {
                    return next(message);
                }
                finally {
                    const key = responseKey(message);
                    if (key !== undefined && responses.get(key) === message) responses.delete(key);
                    finishDrain();
                }
            },
        },
    });
    return {
        connection,
        drain: () =>
            frames.pending === 0 && responses.size === 0
                ? Promise.resolve()
                : new Promise<void>(resolve => {
                    resolveDrain = resolve;
                }),
    };
}

function responseKey(message: Message): string | undefined {
    // Match the vendored connection's request-first classification and its
    // response queue key, which stringifies both numeric and string IDs.
    return !Message.isRequest(message) && Message.isResponse(message) && message.id !== null
        ? String(message.id)
        : undefined;
}

/** Counts complete Content-Length frames, retaining only bytes deferred after malformed headers. */
class IncomingFrames {
    private header = "";
    private remaining: number | undefined;
    private deferred: Uint8Array | undefined;
    private valid = true;
    pending = 0;

    append(data: Uint8Array): void {
        if (!this.valid) return;
        if (this.deferred) {
            data = Buffer.concat([this.deferred, data]);
            this.deferred = undefined;
        }
        let offset = 0;
        while (offset < data.length) {
            if (this.remaining !== undefined) {
                const consumed = Math.min(this.remaining, data.length - offset);
                this.remaining -= consumed;
                offset += consumed;
                if (this.remaining === 0) {
                    this.pending++;
                    this.remaining = undefined;
                }
                continue;
            }
            this.header += String.fromCharCode(data[offset++] & 0x7f);
            if (!this.header.endsWith("\r\n\r\n")) continue;
            const header = this.header;
            this.header = "";
            // The reader consumes malformed headers, then retries the remaining
            // buffered bytes on the next data event, including an empty event.
            let contentLength: string | undefined;
            for (const line of header.slice(0, -4).split("\r\n")) {
                const separator = line.indexOf(":");
                if (separator < 0) {
                    this.deferred = offset < data.length ? data.subarray(offset) : undefined;
                    return;
                }
                if (line.slice(0, separator).toLowerCase() === "content-length") contentLength = line.slice(separator + 1).trim();
            }
            const length = contentLength ? parseInt(contentLength) : NaN;
            if (Number.isNaN(length)) {
                this.deferred = offset < data.length ? data.subarray(offset) : undefined;
                return;
            }
            if (!Number.isSafeInteger(length) || length < 0) {
                this.valid = false;
                return;
            }
            if (length === 0) this.pending++;
            else this.remaining = length;
        }
    }

    finish(): void {
        if (this.pending > 0) this.pending--;
    }
}
