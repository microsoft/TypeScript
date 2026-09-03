export { wasmURL } from "#wasmURL";
export { instantiateWasm, type InstantiateWasmOptions, instantiateWasmSync } from "./wasi.ts";
import {
    setWasmFileSystem,
    type WasmFileSystem,
} from "./wasi.ts";

export interface WasmReactorExports {
    memory: { readonly buffer: ArrayBufferLike; };
    create_session(optionsPointer: number, optionsLength: number): number;
    close_session(): void;
    get_request_buffer(size: number): number;
    handle_request(methodLength: number, payloadLength: number): number;
    set_file(pathLength: number, contentLength: number): number;
    read_file(pathLength: number): number;
    remove_file(pathLength: number): number;
    response_ptr(): number;
    response_len(): number;
}

export interface WasmReactorInstance {
    readonly exports: object;
}

export interface WasmTransportOptions {
    /**
     * An instantiated reactor whose WASI host has already initialized it.
     * For example, call `wasi.initialize(instance)` before constructing the transport.
     */
    instance: WasmReactorInstance;
    cwd?: string;
    useCaseSensitiveFileNames?: boolean;
    collectTiming?: boolean;
    fs?: WasmFileSystem;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

/** Synchronous API transport backed by an in-process TypeScript WebAssembly reactor. */
export class WasmTransport {
    lastBytesSent = 0;
    lastBytesReceived = 0;

    private readonly exports: WasmReactorExports;
    private readonly instance: WasmReactorInstance;
    private requestPointer = 0;
    private closed = false;

    constructor(options: WasmTransportOptions) {
        this.instance = options.instance;
        this.exports = getReactorExports(options.instance);
        const sessionOptions = encoder.encode(JSON.stringify({
            cwd: options.cwd ?? "/",
            useCaseSensitiveFileNames: options.useCaseSensitiveFileNames,
            collectTiming: options.collectTiming,
        }));
        this.writeRequest(sessionOptions);
        if (this.exports.create_session(this.requestPointer, sessionOptions.length) !== 0) {
            throw new Error(`Failed to create TypeScript WASM session: ${this.readResponseText()}`);
        }
        setWasmFileSystem(options.instance, options.fs);
    }

    setFileSystem(fs: WasmFileSystem | undefined): void {
        this.ensureOpen();
        setWasmFileSystem(this.instance, fs);
    }

    requestSync(method: string, payload: string): string {
        return decoder.decode(this.call(method, encoder.encode(payload)));
    }

    request(method: string, payload: string): { value: string; bytesSent: number; bytesReceived: number; } {
        const value = this.requestSync(method, payload);
        return {
            value,
            bytesSent: this.lastBytesSent,
            bytesReceived: this.lastBytesReceived,
        };
    }

    requestBinarySync(method: string, payload: Uint8Array): Uint8Array {
        return this.call(method, payload);
    }

    requestBinary(method: string, payload: Uint8Array): { value: Uint8Array; bytesSent: number; bytesReceived: number; } {
        const value = this.requestBinarySync(method, payload);
        return {
            value,
            bytesSent: this.lastBytesSent,
            bytesReceived: this.lastBytesReceived,
        };
    }

    setFile(path: string, content: string): void {
        this.ensureOpen();
        const pathBytes = encoder.encode(path);
        const contentBytes = encoder.encode(content);
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
        return this.readResponseText();
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
            setWasmFileSystem(this.instance, undefined);
        }
    }

    private call(method: string, payload: Uint8Array): Uint8Array {
        this.ensureOpen();
        const methodBytes = encoder.encode(method);
        this.writeRequest(methodBytes, payload);
        this.lastBytesSent = payload.length;
        if (this.exports.handle_request(methodBytes.length, payload.length) !== 0) {
            throw new Error(`TypeScript WASM request "${method}" failed: ${this.readResponseText()}`);
        }
        this.lastBytesReceived = this.exports.response_len();
        return this.readResponseBytes();
    }

    private writeRequest(first: Uint8Array, second?: Uint8Array): void {
        const total = first.length + (second?.length ?? 0);
        this.requestPointer = this.exports.get_request_buffer(total) >>> 0;
        const memory = new Uint8Array(this.exports.memory.buffer);
        memory.set(first, this.requestPointer);
        if (second) {
            memory.set(second, this.requestPointer + first.length);
        }
    }

    private readResponseText(): string {
        return decoder.decode(this.readResponseBytes());
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
        "close_session",
        "get_request_buffer",
        "handle_request",
        "set_file",
        "read_file",
        "remove_file",
        "response_ptr",
        "response_len",
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
