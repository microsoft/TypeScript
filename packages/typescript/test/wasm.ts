import { wasmURL } from "@typescript/typescript-wasip1-wasm";
import type { API as AsyncAPI } from "@typescript/typescript/async";
import type { FileSystemCallbacks } from "@typescript/typescript/fs";
import type { API as SyncAPI } from "@typescript/typescript/sync";
import {
    instantiateWasmSync,
    type WasmReactorInstance,
    WasmTransport,
} from "@typescript/typescript/wasm";
import { readFileSync } from "node:fs";

declare const WebAssembly: {
    Module: new (bytes: Uint8Array) => WebAssembly.Module;
};

interface WasmAPIOptions {
    cwd?: string | undefined;
    fs?: FileSystemCallbacks | undefined;
    useCaseSensitiveFileNames?: boolean | undefined;
    collectTiming?: boolean | undefined;
    maxResponseBytesPerPage?: number | undefined;
    transport?: object | undefined;
}

const availableInstances: WasmReactorInstance[] = [];
let module: WebAssembly.Module | undefined;

class TestWasmTransport extends WasmTransport {
    private returned = false;
    private readonly reactorInstance: WasmReactorInstance;

    constructor(
        reactorInstance: WasmReactorInstance,
        options: ConstructorParameters<typeof WasmTransport>[0],
    ) {
        super(options);
        this.reactorInstance = reactorInstance;
    }

    override close(): void {
        if (this.returned) return;
        super.close();
        this.returned = true;
        availableInstances.push(this.reactorInstance);
    }
}

function createWasmAPIOptions(options: WasmAPIOptions): WasmAPIOptions {
    if (options.transport) return options;
    const instance = availableInstances.pop() ?? instantiateWasmSync(module ??= new WebAssembly.Module(readFileSync(wasmURL)));
    const transport = new TestWasmTransport(instance, {
        instance,
        cwd: options.cwd ?? "/",
        useCaseSensitiveFileNames: options.useCaseSensitiveFileNames,
        collectTiming: options.collectTiming,
    });
    return {
        transport,
        fs: options.fs,
        collectTiming: options.collectTiming,
        maxResponseBytesPerPage: options.maxResponseBytesPerPage,
    };
}

export function withWasm<T extends typeof AsyncAPI | typeof SyncAPI>(API: T): T {
    return new Proxy(API, {
        construct(target, args) {
            return Reflect.construct(target, [createWasmAPIOptions(args[0] ?? {})]);
        },
    });
}
