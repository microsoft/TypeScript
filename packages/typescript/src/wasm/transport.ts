export { instantiateWasm, type InstantiateWasmOptions, instantiateWasmSync } from "./wasi.ts";
import type { FileSystemCallbacks } from "../api/fs.ts";
import {
    configureFileSystemCallbacks,
    encodeFileSystemCallbackResult,
} from "../api/fsCallbacks.ts";
import {
    encodeWtf8,
    Wtf8Decoder,
} from "../api/node/wtf8.ts";

export interface WasmReactorExports {
    memory: { readonly buffer: ArrayBufferLike; };
    create_session(optionsLength: number): number;
    start_session(callbacksLength: number): number;
    close_session(): void;
    get_request_buffer(size: number): number;
    send_message(type: number, methodLength: number, payloadLength: number): number;
    receive_message(): number;
    set_file(pathLength: number, contentLength: number): number;
    read_file(pathLength: number): number;
    remove_file(pathLength: number): number;
    response_ptr(): number;
    response_len(): number;
    response_method_len(): number;
}

export interface WasmReactorInstance {
    readonly exports: object;
}

export interface WasmTransportOptions {
    /**
     * An initialized reactor, normally created by `instantiateWasm` or
     * `instantiateWasmSync`. Other WASI hosts must call the module's
     * `typescript_initialize` export instead of `_start`, which runs the
     * command line compiler.
     */
    instance: WasmReactorInstance;
    cwd?: string | undefined;
    useCaseSensitiveFileNames?: boolean | undefined;
    collectTiming?: boolean | undefined;
    /**
     * Callbacks that replace operations on the reactor's in-memory file
     * system, which `serverFS.useOS` refers to.
     */
    fs?: FileSystemCallbacks | undefined;
}

type TransportCallback = (name: string, payload: string) => string | PromiseLike<string>;

const MessageType = {
    Request: 1,
    CallResponse: 2,
    CallError: 3,
    Response: 4,
    Error: 5,
    Call: 6,
} as const;
type MessageType = typeof MessageType[keyof typeof MessageType];

const receiveClosed = 0;
const receiveFailed = 1;

type Settlement =
    | { ok: true; value: Uint8Array; }
    | { ok: false; error: Error; };

interface RequestFrame {
    kind: "request";
    method: string;
    bytesSent: number;
    settlement?: Settlement;
    onSettle?: (settlement: Settlement) => void;
}

interface CallFrame {
    kind: "call";
    method: string;
    reply?: { type: typeof MessageType.CallResponse | typeof MessageType.CallError; payload: Uint8Array; };
}

type Frame = RequestFrame | CallFrame;

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const fileContentDecoder = new Wtf8Decoder("utf-8", { ignoreBOM: true });

/**
 * API transport backed by an in-process TypeScript WebAssembly reactor.
 *
 * The reactor runs the same server as a separate process would, so callbacks
 * may return promises and may make nested requests through this transport.
 * Requests made while callbacks are outstanding are nested within the
 * innermost one, which must complete before outer callbacks can reply.
 */
export class WasmTransport {
    lastBytesSent = 0;
    lastBytesReceived = 0;

    private readonly exports: WasmReactorExports;
    private readonly callbacks = new Map<string, TransportCallback>();
    private readonly fileSystemCallbacks = new Map<string, TransportCallback>();
    private fs: FileSystemCallbacks | undefined;
    private readonly stack: Frame[] = [];
    private started = false;
    private closed = false;

    constructor(options: WasmTransportOptions) {
        this.exports = getReactorExports(options.instance);
        const sessionOptions = encoder.encode(JSON.stringify({
            cwd: options.cwd ?? "/",
            useCaseSensitiveFileNames: options.useCaseSensitiveFileNames,
            collectTiming: options.collectTiming,
        }));
        this.writeRequest(sessionOptions);
        if (this.exports.create_session(sessionOptions.length) !== 0) {
            throw new Error(`Failed to create TypeScript WASM session: ${this.readResponseText()}`);
        }
        try {
            this.setFileSystem(options.fs);
        }
        catch (error) {
            this.exports.close_session();
            throw error;
        }
    }

    /**
     * Configures file system callbacks. They are validated immediately and
     * read again when the first request starts the session.
     */
    setFileSystem(fs: FileSystemCallbacks | undefined): void {
        this.ensureOpen();
        if (this.started) {
            throw new Error("The TypeScript WASM file system must be configured before the first request");
        }
        configureFileSystemCallbacks(fs);
        this.fs = fs;
    }

    requestSync(method: string, payload: string): string {
        return decoder.decode(this.requestBinarySync(method, encoder.encode(payload)));
    }

    requestBinarySync(method: string, payload: Uint8Array): Uint8Array {
        const frame = this.startRequest(method, payload);
        const settlement = frame.settlement;
        if (!settlement) {
            throw new Error(`TypeScript WASM request "${method}" is waiting for an asynchronous callback`);
        }
        return this.unwrap(frame, settlement);
    }

    request(method: string, payload: string): { value: string; bytesSent: number; bytesReceived: number; } | Promise<{ value: string; bytesSent: number; bytesReceived: number; }> {
        const response = this.requestBinary(method, encoder.encode(payload));
        const decode = (response: { value: Uint8Array; bytesSent: number; bytesReceived: number; }) => ({ ...response, value: decoder.decode(response.value) });
        return response instanceof Promise ? response.then(decode) : decode(response);
    }

    requestBinary(method: string, payload: Uint8Array): { value: Uint8Array; bytesSent: number; bytesReceived: number; } | Promise<{ value: Uint8Array; bytesSent: number; bytesReceived: number; }> {
        const frame = this.startRequest(method, payload);
        const toResponse = (settlement: Settlement) => {
            const value = this.unwrap(frame, settlement);
            return { value, bytesSent: frame.bytesSent, bytesReceived: value.length };
        };
        if (frame.settlement) {
            return toResponse(frame.settlement);
        }
        return new Promise((resolve, reject) => {
            frame.onSettle = settlement => {
                try {
                    resolve(toResponse(settlement));
                }
                catch (error) {
                    reject(error);
                }
            };
        });
    }

    registerCallback(name: string, callback: TransportCallback): void {
        this.ensureOpen();
        this.callbacks.set(name, callback);
    }

    unregisterCallback(name: string): void {
        this.callbacks.delete(name);
    }

    setFile(path: string, content: string): void {
        this.ensureOpen();
        const pathBytes = encoder.encode(path);
        const contentBytes = encodeWtf8(content);
        this.writeRequest(pathBytes, contentBytes);
        if (this.exports.set_file(pathBytes.length, contentBytes.length) !== 0) {
            throw new Error(`Failed to write ${path}: ${this.readResponseText()}`);
        }
    }

    /** Read a file from the reactor's in-memory filesystem. */
    readFile(path: string): string | undefined {
        this.ensureOpen();
        const pathBytes = encoder.encode(path);
        this.writeRequest(pathBytes);
        const status = this.exports.read_file(pathBytes.length);
        if (status === 2) return undefined;
        if (status !== 0) {
            throw new Error(`Failed to read ${path}: ${this.readResponseText()}`);
        }
        return fileContentDecoder.decode(this.readResponseBytes());
    }

    removeFile(path: string): void {
        this.ensureOpen();
        const pathBytes = encoder.encode(path);
        this.writeRequest(pathBytes);
        if (this.exports.remove_file(pathBytes.length) !== 0) {
            throw new Error(`Failed to remove ${path}: ${this.readResponseText()}`);
        }
    }

    close(): void {
        if (this.closed) return;
        this.closed = true;
        try {
            this.exports.close_session();
        }
        finally {
            this.callbacks.clear();
            this.fileSystemCallbacks.clear();
            this.fs = undefined;
            this.abort(new Error("The TypeScript WASM transport is closed"));
        }
    }

    private startRequest(method: string, payload: Uint8Array): RequestFrame {
        this.ensureOpen();
        this.ensureStarted();
        const frame: RequestFrame = { kind: "request", method, bytesSent: payload.length };
        this.stack.push(frame);
        this.send(MessageType.Request, method, payload);
        this.pump();
        return frame;
    }

    private unwrap(frame: RequestFrame, settlement: Settlement): Uint8Array {
        if (!settlement.ok) throw settlement.error;
        this.lastBytesSent = frame.bytesSent;
        this.lastBytesReceived = settlement.value.length;
        return settlement.value;
    }

    /**
     * Exchanges messages with the server until the innermost frame is a
     * callback that has not yet produced its reply, or no frames remain.
     */
    private pump(): void {
        while (this.stack.length > 0) {
            const top = this.stack[this.stack.length - 1];
            if (top.kind === "call") {
                if (!top.reply) return;
                this.stack.pop();
                this.send(top.reply.type, top.method, top.reply.payload);
                continue;
            }

            const type = this.exports.receive_message();
            switch (type) {
                case MessageType.Response:
                    this.settle(top, { ok: true, value: this.readResponsePayload() });
                    break;
                case MessageType.Error:
                    this.settle(top, { ok: false, error: new Error(`TypeScript WASM request "${top.method}" failed: ${this.readResponsePayloadText()}`) });
                    break;
                case MessageType.Call:
                    this.invokeCallback(this.readResponseMethod(), this.readResponsePayloadText());
                    break;
                case receiveClosed:
                    this.abort(new Error("The TypeScript WASM server stopped"));
                    return;
                case receiveFailed:
                default:
                    this.abort(new Error(`TypeScript WASM transport failed: ${type === receiveFailed ? this.readResponseText() : `unexpected message type ${type}`}`));
                    return;
            }
        }
    }

    private settle(frame: RequestFrame, settlement: Settlement): void {
        this.stack.splice(this.stack.indexOf(frame), 1);
        frame.settlement = settlement;
        frame.onSettle?.(settlement);
    }

    private invokeCallback(method: string, payload: string): void {
        const frame: CallFrame = { kind: "call", method };
        this.stack.push(frame);
        const succeed = (result: string) => {
            frame.reply = { type: MessageType.CallResponse, payload: encoder.encode(result) };
        };
        const fail = (error: unknown) => {
            frame.reply = { type: MessageType.CallError, payload: encoder.encode(error instanceof Error ? error.message : String(error)) };
        };
        let result: string | PromiseLike<string>;
        try {
            const callback = this.fileSystemCallbacks.get(method) ?? this.callbacks.get(method);
            if (!callback) {
                throw new Error(`No callback is registered for ${method}`);
            }
            result = callback(method, payload);
        }
        catch (error) {
            fail(error);
            return;
        }
        if (typeof result === "string") {
            succeed(result);
            return;
        }
        result.then(succeed, fail).then(() => {
            if (this.stack.includes(frame)) this.pump();
        });
    }

    private abort(error: Error): void {
        const frames = this.stack.splice(0);
        for (const frame of frames) {
            if (frame.kind === "request" && !frame.settlement) {
                frame.settlement = { ok: false, error };
                frame.onSettle?.(frame.settlement);
            }
        }
    }

    private ensureStarted(): void {
        if (this.started) return;
        const fs = this.fs;
        const configuration = configureFileSystemCallbacks(fs);
        for (const name of configuration.callbackNames) {
            const callback = fs![name] as (...args: any[]) => unknown;
            this.fileSystemCallbacks.set(name, (_, payload) => {
                const arg = JSON.parse(payload);
                const result = name === "writeFile" ? callback.call(fs, arg.path, arg.data) : callback.call(fs, arg);
                return JSON.stringify(encodeFileSystemCallbackResult(name, result));
            });
        }
        const callbacks = encoder.encode(JSON.stringify(configuration.arguments));
        this.writeRequest(callbacks);
        if (this.exports.start_session(callbacks.length) !== 0) {
            throw new Error(`Failed to start TypeScript WASM session: ${this.readResponseText()}`);
        }
        this.started = true;
    }

    private send(type: MessageType, method: string, payload: Uint8Array): void {
        const methodBytes = encoder.encode(method);
        this.writeRequest(methodBytes, payload);
        if (this.exports.send_message(type, methodBytes.length, payload.length) !== 0) {
            this.abort(new Error(`TypeScript WASM transport failed: ${this.readResponseText()}`));
        }
    }

    private writeRequest(first: Uint8Array, second?: Uint8Array): void {
        const total = first.length + (second?.length ?? 0);
        const requestPointer = this.exports.get_request_buffer(total) >>> 0;
        const memory = new Uint8Array(this.exports.memory.buffer);
        memory.set(first, requestPointer);
        if (second) {
            memory.set(second, requestPointer + first.length);
        }
    }

    private readResponseText(): string {
        return decoder.decode(this.readResponseBytes());
    }

    private readResponseMethod(): string {
        return decoder.decode(this.readResponseBytes().subarray(0, this.exports.response_method_len()));
    }

    private readResponsePayloadText(): string {
        return decoder.decode(this.readResponsePayload());
    }

    private readResponsePayload(): Uint8Array {
        return this.readResponseBytes().subarray(this.exports.response_method_len());
    }

    private readResponseBytes(): Uint8Array {
        const length = this.exports.response_len();
        if (length === 0) return new Uint8Array();
        return new Uint8Array(this.exports.memory.buffer, this.exports.response_ptr() >>> 0, length).slice();
    }

    private ensureOpen(): void {
        if (this.closed) {
            throw new Error("The TypeScript WASM transport is closed");
        }
    }
}

function getReactorExports(instance: WasmReactorInstance): WasmReactorExports {
    const exports = instance.exports as unknown as Partial<WasmReactorExports>;
    const required = [
        "create_session",
        "start_session",
        "close_session",
        "get_request_buffer",
        "send_message",
        "receive_message",
        "set_file",
        "read_file",
        "remove_file",
        "response_ptr",
        "response_len",
        "response_method_len",
    ] as const;
    const missing: string[] = required.filter(name => typeof exports[name] !== "function");
    if (exports.memory == null || typeof exports.memory !== "object" || !("buffer" in exports.memory)) {
        missing.push("memory");
    }
    if (missing.length > 0) {
        throw new Error(`Invalid TypeScript WASM reactor: missing ${missing.join(", ")}`);
    }
    return exports as WasmReactorExports;
}
