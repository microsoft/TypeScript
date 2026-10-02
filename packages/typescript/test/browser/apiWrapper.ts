import type { FileSystemCallbacks } from "@typescript/typescript/unstable/fs";
import {
    instantiateWasm,
    type WasmReactorInstance,
    WasmTransport,
} from "@typescript/typescript/unstable/wasm";
import {
    type DocumentIdentifier,
    type FileNotifications,
    resolveFileName,
} from "../../src/api/proto.ts";

interface BrowserAPIOptions {
    cwd?: string | undefined;
    fs?: FileSystemCallbacks | undefined;
    collectTiming?: boolean | undefined;
    maxResponseBytesPerPage?: number | undefined;
    transport?: object | undefined;
}

interface BrowserSnapshotChanges {
    fileNotifications?: FileNotifications | undefined;
    openFiles?: readonly DocumentIdentifier[] | undefined;
}

const availableInstances: WasmReactorInstance[] = [];
const mirroredFiles = new WeakMap<WasmTransport, Set<string>>();

export async function initializeBrowserAPIInstances(module: WebAssembly.Module, count: number): Promise<void> {
    availableInstances.push(
        ...await Promise.all(
            Array.from({ length: count }, () => instantiateWasm(module)),
        ),
    );
}

class BrowserWasmTransport extends WasmTransport {
    private returned = false;

    constructor(
        private readonly reactorInstance: WasmReactorInstance,
        options: ConstructorParameters<typeof WasmTransport>[0],
    ) {
        super(options);
    }

    override close(): void {
        if (this.returned) return;
        super.close();
        this.returned = true;
        availableInstances.push(this.reactorInstance);
    }
}

export function createBrowserAPIOptions(options: BrowserAPIOptions): {
    options: BrowserAPIOptions;
    transport?: WasmTransport;
} {
    if (options.transport) return { options };
    const instance = availableInstances.pop();
    if (!instance) {
        throw new Error("No initialized TypeScript WASM reactor is available");
    }
    const writeFile = typeof options.fs?.writeFile === "function" ? options.fs.writeFile : undefined;
    const transport = new BrowserWasmTransport(instance, {
        instance,
        cwd: options.cwd ?? "/",
        ...writeFile === undefined ? {} : { fs: { writeFile: writeFile.bind(options.fs) } },
        ...options.collectTiming === undefined ? {} : { collectTiming: options.collectTiming },
    });
    if (options.fs) {
        synchronizeFileSystem(options.fs, transport);
    }
    return {
        options: {
            transport,
            ...options.fs === undefined ? {} : { fs: options.fs },
            ...options.collectTiming === undefined ? {} : { collectTiming: options.collectTiming },
            ...options.maxResponseBytesPerPage === undefined ? {} : { maxResponseBytesPerPage: options.maxResponseBytesPerPage },
        },
        transport,
    };
}

export function wrapFileUpdates<T extends object>(api: T, fs: FileSystemCallbacks | undefined, transport: WasmTransport | undefined): void {
    if (!fs || !transport) return;
    wrapMethod("createSnapshot", args => {
        const params = args[0] as BrowserSnapshotChanges | undefined;
        syncFileChanges(fs, transport, params?.fileNotifications);
        syncOpenFiles(fs, transport, params);
    });
    wrapMethod("updateSnapshot", args => {
        const params = args[1] as BrowserSnapshotChanges | undefined;
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
    changes: BrowserSnapshotChanges | undefined,
): void {
    for (const file of changes?.openFiles ?? []) {
        const fileName = resolveFileName(file);
        const content = typeof fs.readFile === "function" ? fs.readFile(fileName) : undefined;
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
        const entries = typeof fs.getAccessibleEntries === "function" ? fs.getAccessibleEntries(directory) : undefined;
        if (!entries || typeof entries !== "object") return;
        for (const file of entries.files) {
            const path = join(directory, file);
            current.add(path);
            const content = typeof fs.readFile === "function" ? fs.readFile(path) : undefined;
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
        const content = typeof fs.readFile === "function" ? fs.readFile(fileName) : undefined;
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
