/// Definitions by: Kagami Sascha Rosylight <https://github.com/saschanaz>

interface ReadableStreamSource {
    start?(controller: ReadableStreamDefaultController): void | Promise<void>;
    pull?(controller: ReadableStreamDefaultController): void | Promise<void>;
    cancel?(reason: string): void | Promise<void>;
}

interface ReadableByteStreamSource {
    start?(controller: ReadableByteStreamController): void | Promise<void>;
    pull?(controller: ReadableByteStreamController): void | Promise<void>;
    cancel?(reason: string): void | Promise<void>;

    type: "bytes";
}

interface QueuingStrategy {
    highWaterMark?: number;
    size?(chunk: ArrayBufferView): number;
}

declare class ReadableStream {
    constructor(underlyingSource?: ReadableStreamSource, strategy?: QueuingStrategy);
    constructor(underlyingSource?: ReadableByteStreamSource, strategy?: QueuingStrategy);

    locked: boolean;

    cancel(reason: string): Promise<void>;
    getReader(): ReadableStreamDefaultReader;
    getReader({ mode }: { mode: "byob" }): ReadableStreamBYOBReader;
    pipeThrough<T extends ReadableStream>({ writable, readable }: { writable: WritableStream, readable: T }): T;
    pipeTo(dest: WritableStream, { preventClose, preventAbort, preventCancel }: { preventClose?: boolean, preventAbort?: boolean, preventCancel?: boolean }): Promise<void>;
    tee(): [ReadableStream, ReadableStream];
}

declare class ReadableStreamDefaultReader {
    constructor(stream: ReadableStream);

    closed: Promise<void>;

    cancel(reason: string): Promise<void>;
    read(): Promise<IteratorResult<ArrayBufferView>>;
    releaseLock(): void;
}

declare class ReadableStreamBYOBReader {
    constructor(stream: ReadableStream);

    closed: Promise<boolean>;

    cancel(reason: string): Promise<void>;
    read(view: ArrayBufferView): Promise<IteratorResult<ArrayBufferView>>;
    releaseLock(): void;
}

declare class ReadableStreamDefaultController {
    constructor(stream: ReadableStream, underlyingSource: ReadableStreamSource, size: number, highWaterMark: number);

    desiredSize: number;

    close(): void;
    enqueue(chunk: ArrayBufferView): number;
    error(e: any): void;
}

declare class ReadableByteStreamController {
    constructor(stream: ReadableStream, underlyingSource: ReadableStreamSource, highWaterMark: number);

    byobRequest: ReadableStreamBYOBRequest;
    desiredSize: number;

    close(): void;
    enqueue(chunk: ArrayBufferView): number;
    error(e: any): void;
}

declare class ReadableStreamBYOBRequest {
    constructor(controller: ReadableByteStreamController, view: ArrayBufferView);

    view: ArrayBufferView;

    respond(bytesWritten: number): void;
    respondWithNewView(view: ArrayBufferView): void;
}

interface WritableStreamSink {
    start?(controller: WritableStreamDefaultController): void | Promise<void>;
    write?(chunk: any): void | Promise<void>;
    close?(): void | Promise<void>;
    abort?(reason: string): void | Promise<void>;
}

declare class WritableStream {
    constructor(underlyingSink?: WritableStreamSink, strategy?: QueuingStrategy);

    locked: boolean;

    abort(reason: string): Promise<void>;
    getWriter(): WritableStreamDefaultWriter;
}

declare class WritableStreamDefaultWriter {
    constructor(stream: WritableStream);

    closed: Promise<void>;
    desiredSize: number;
    ready: Promise<void>;

    abort(reason: string): Promise<void>;
    close(): Promise<void>;
    releaseLock(): void;
    write(chunk: any): Promise<void>;
}

declare class WritableStreamDefaultController {
    constructor(stream: WritableStream, underlyingSink: WritableStreamSink, size: number, highWaterMark: number);

    error(e: any): void;
}

declare class ByteLengthQueuingStrategy {
    constructor({ highWaterMark }: { highWaterMark: number });

    size(chunk: ArrayBufferView): number;
}

declare class CountQueuingStrategy {
    constructor({ highWaterMark }: { highWaterMark: number });

    size(): number; // 1;
}
