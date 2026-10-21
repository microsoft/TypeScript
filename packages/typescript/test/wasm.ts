import { wasmURL } from "@typescript/typescript-wasip1-wasm";
import type { API as AsyncAPI } from "@typescript/typescript/async";
import type { FileSystemCallbacks } from "@typescript/typescript/fs";
import {
    toRootedDirectoryPath,
    toRootedFilePath,
} from "@typescript/typescript/path";
import type { API as SyncAPI } from "@typescript/typescript/sync";
import {
    instantiateWasmSync,
    type WasmReactorInstance,
    WasmTransport,
} from "@typescript/typescript/wasm";
import { readFileSync } from "node:fs";
import {
    type DocumentIdentifier,
    type FileNotifications,
    resolveFileName,
} from "../src/api/proto.ts";

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

interface SnapshotChanges {
    fileNotifications?: FileNotifications | undefined;
    openFiles?: readonly DocumentIdentifier[] | undefined;
}

const availableInstances: WasmReactorInstance[] = [];
const mirroredFiles = new WeakMap<WasmTransport, Set<string>>();
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

function createWasmAPIOptions(options: WasmAPIOptions): {
    options: WasmAPIOptions;
    transport?: WasmTransport | undefined;
} {
    if (options.transport) return { options };
    const instance = availableInstances.pop() ?? instantiateWasmSync(module ??= new WebAssembly.Module(readFileSync(wasmURL)));
    const writeFile = typeof options.fs?.writeFile === "function" ? options.fs.writeFile : undefined;
    const transport = new TestWasmTransport(instance, {
        instance,
        cwd: options.cwd ?? "/",
        fs: writeFile === undefined ? undefined : { writeFile: writeFile.bind(options.fs) },
        useCaseSensitiveFileNames: options.useCaseSensitiveFileNames,
        collectTiming: options.collectTiming,
    });
    if (options.fs) {
        synchronizeFileSystem(options.fs, transport);
    }
    return {
        options: {
            transport,
            fs: options.fs,
            collectTiming: options.collectTiming,
            maxResponseBytesPerPage: options.maxResponseBytesPerPage,
        },
        transport,
    };
}

function wrapFileUpdates<T extends object>(api: T, fs: FileSystemCallbacks | undefined, transport: WasmTransport | undefined): void {
    if (!fs || !transport) return;
    wrapMethod("createSnapshot", args => {
        const params = args[0] as SnapshotChanges | undefined;
        syncFileChanges(fs, transport, params?.fileNotifications);
        syncOpenFiles(fs, transport, params);
    });
    wrapMethod("updateSnapshot", args => {
        const params = args[1] as SnapshotChanges | undefined;
        syncFileChanges(fs, transport, params?.fileNotifications);
        syncOpenFiles(fs, transport, params);
    });

    function wrapMethod(name: string, before: (args: unknown[]) => void): void {
        const target = api as Record<string, unknown>;
        const original = target[name] as ((...args: unknown[]) => unknown) & {
            gen?: (...args: unknown[]) => Generator<unknown, unknown, unknown>;
        };
        const bound = original.bind(api);
        const wrapped = (...args: unknown[]) => {
            before(args);
            return bound(...args);
        };
        if (original.gen) {
            const boundGen = original.gen.bind(api);
            wrapped.gen = (...args: unknown[]) => {
                before(args);
                return boundGen(...args);
            };
        }
        Object.defineProperty(api, name, {
            configurable: true,
            value: wrapped,
        });
    }
}

function syncOpenFiles(
    fs: FileSystemCallbacks,
    transport: WasmTransport,
    changes: SnapshotChanges | undefined,
): void {
    for (const file of changes?.openFiles ?? []) {
        const fileName = resolveFileName(file);
        const content = typeof fs.readFile === "function" ? fs.readFile(toRootedFilePath(fileName, undefined)) : undefined;
        if (typeof content === "string") {
            transport.setFile(fileName, content);
            mirroredFiles.get(transport)?.add(fileName);
        }
        else {
            transport.removeFile(fileName);
            mirroredFiles.get(transport)?.delete(fileName);
        }
    }
}

function synchronizeFileSystem(fs: FileSystemCallbacks, transport: WasmTransport): void {
    const previous = mirroredFiles.get(transport) ?? new Set<string>();
    const current = new Set<string>();
    visit("/");
    for (const file of previous) {
        if (!current.has(file)) {
            transport.removeFile(file);
        }
    }
    mirroredFiles.set(transport, current);

    function visit(directory: string): void {
        const entries = typeof fs.getAccessibleEntries === "function"
            ? fs.getAccessibleEntries(toRootedDirectoryPath(directory, undefined))
            : undefined;
        if (!entries || typeof entries !== "object") return;
        for (const file of entries.files) {
            const path = join(directory, file);
            current.add(path);
            const content = typeof fs.readFile === "function" ? fs.readFile(toRootedFilePath(path, undefined)) : undefined;
            if (typeof content === "string") {
                transport.setFile(path, content);
            }
        }
        for (const child of entries.directories) {
            visit(join(directory, child));
        }
    }
}

function syncFileChanges(
    fs: FileSystemCallbacks,
    transport: WasmTransport,
    changes: FileNotifications | undefined,
): void {
    if (changes?.invalidateAll) {
        synchronizeFileSystem(fs, transport);
    }
    for (const file of [...changes?.changed ?? [], ...changes?.created ?? []]) {
        const fileName = resolveFileName(file);
        const content = typeof fs.readFile === "function" ? fs.readFile(toRootedFilePath(fileName, undefined)) : undefined;
        if (typeof content === "string") {
            transport.setFile(fileName, content);
            mirroredFiles.get(transport)?.add(fileName);
        }
        else {
            transport.removeFile(fileName);
            mirroredFiles.get(transport)?.delete(fileName);
        }
    }
    for (const file of changes?.deleted ?? []) {
        const fileName = resolveFileName(file);
        transport.removeFile(fileName);
        mirroredFiles.get(transport)?.delete(fileName);
    }
}

function join(directory: string, name: string): string {
    return directory === "/" ? `/${name}` : `${directory}/${name}`;
}

export function withWasm<T extends typeof AsyncAPI | typeof SyncAPI>(API: T): T {
    return new Proxy(API, {
        construct(target, args) {
            const options: WasmAPIOptions = args[0] ?? {};
            const created = createWasmAPIOptions(options);
            const api = Reflect.construct(target, [created.options]);
            wrapFileUpdates(api, options.fs, created.transport);
            return api;
        },
    });
}
