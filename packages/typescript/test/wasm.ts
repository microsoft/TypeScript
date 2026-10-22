import { wasmURL } from "@typescript/typescript-wasip1-wasm";
import type { API as AsyncAPI } from "@typescript/typescript/async";
import {
    type FileSystemCallbacks,
    serverFS,
} from "@typescript/typescript/fs";
import type { API as SyncAPI } from "@typescript/typescript/sync";
import {
    instantiateWasmSync,
    type WasmReactorInstance,
    WasmTransport,
} from "@typescript/typescript/wasm";
import {
    mkdirSync,
    readdirSync,
    readFileSync,
    realpathSync,
    rmSync,
    statSync,
    writeFileSync,
} from "node:fs";
import { dirname } from "node:path";

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

/** The disk a native server process would use for `serverFS.useOS`. */
const diskFileSystem: { [K in keyof FileSystemCallbacks]: Extract<FileSystemCallbacks[K], Function>; } = {
    directoryExists: path => statSync(path, { throwIfNoEntry: false })?.isDirectory() ?? false,
    fileExists: path => statSync(path, { throwIfNoEntry: false })?.isFile() ?? false,
    getAccessibleEntries: path => {
        const files: string[] = [];
        const directories: string[] = [];
        const symlinks: string[] = [];
        try {
            for (const entry of readdirSync(path, { withFileTypes: true })) {
                let stat: { isFile(): boolean; isDirectory(): boolean; } | undefined = entry;
                if (entry.isSymbolicLink()) {
                    symlinks.push(entry.name);
                    stat = statSync(`${path}/${entry.name}`, { throwIfNoEntry: false });
                }
                if (stat?.isFile()) files.push(entry.name);
                else if (stat?.isDirectory()) directories.push(entry.name);
            }
        }
        catch {
            // Unreadable directories have no accessible entries.
        }
        return { files, directories, symlinks };
    },
    readFile: path => {
        try {
            return readFileSync(path, "utf8");
        }
        catch {
            return undefined;
        }
    },
    realpath: path => {
        try {
            return realpathSync.native(path);
        }
        catch {
            return path;
        }
    },
    stat: path => statSync(path, { throwIfNoEntry: false }),
    writeFile: (path, content) => {
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, content);
    },
    removeFile: path => rmSync(path, { recursive: true, force: true }),
};

/**
 * Sends operations that a native server would perform on its own disk to
 * the disk, since the reactor's base file system is in memory. Members are
 * read on access so that the client sees the caller's current configuration.
 */
function withDiskFallback(fs: FileSystemCallbacks | undefined): FileSystemCallbacks {
    const result = {} as FileSystemCallbacks;
    for (const name of Object.keys(diskFileSystem) as (keyof FileSystemCallbacks)[]) {
        const diskOperation = diskFileSystem[name] as (...args: unknown[]) => unknown;
        // The reactor's own base file system serves the embedded libraries.
        const disk = (...args: unknown[]) => (args[0] as string).startsWith("bundled:///") ? serverFS.useOS : diskOperation(...args);
        Object.defineProperty(result, name, {
            enumerable: true,
            get() {
                const value = fs ? fs[name] : serverFS.useOS;
                if (value === serverFS.useOS) return disk;
                if (typeof value !== "function") return value;
                return (...args: unknown[]) => {
                    const result = (value as (...args: unknown[]) => unknown).apply(fs, args);
                    return result === serverFS.useOS ? disk(...args) : result;
                };
            },
        });
    }
    return result;
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
        fs: withDiskFallback(options.fs),
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
