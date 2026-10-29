import type { FileSystemCallbacks } from "./fs.ts";

const useOS: unique symbol = Symbol("useOS");
const identity: unique symbol = Symbol("identity");
const fakeStat: unique symbol = Symbol("fakeStat");
const noop: unique symbol = Symbol("noop");
const error: unique symbol = Symbol("error");

export const serverFS: {
    /** Delegate the configured operation, or the current callback invocation, to the server's operating-system filesystem. */
    readonly useOS: typeof useOS;
    /** Use the input path as its own real path without consulting a filesystem. Valid only for `realpath`. */
    readonly identity: typeof identity;
    /** Synthesize stat information from `directoryExists` and `fileExists`. Valid only for `stat`. */
    readonly fakeStat: typeof fakeStat;
    /** Ignore writes without invoking a callback or writing to the server's operating-system filesystem. Valid only for `writeFile`. */
    readonly noop: typeof noop;
    /** Panic if the configured operation, or current callback invocation, reaches the server filesystem. */
    readonly error: typeof error;
} = {
    useOS: useOS,
    identity: identity,
    fakeStat: fakeStat,
    noop: noop,
    error: error,
};

type ServerFSSentinelName = keyof typeof serverFS;
type ServerFSSentinel = typeof serverFS[ServerFSSentinelName];
type ServerFSSentinelResponse = {
    [K in ServerFSSentinelName]: { kind: K; };
}[ServerFSSentinelName];

export type FileSystemCallbackResponse =
    | { kind: "value"; value?: unknown; }
    | { kind: "missing"; }
    | ServerFSSentinelResponse;

interface FileSystemCallbackDefinition {
    serverFS: readonly ServerFSSentinel[];
}

const fileSystemCallbackTable: Record<keyof FileSystemCallbacks, FileSystemCallbackDefinition> = {
    readFile: { serverFS: [serverFS.useOS, serverFS.error] },
    fileExists: { serverFS: [serverFS.useOS, serverFS.error] },
    directoryExists: { serverFS: [serverFS.useOS, serverFS.error] },
    getAccessibleEntries: { serverFS: [serverFS.useOS, serverFS.error] },
    realpath: {
        serverFS: [serverFS.useOS, serverFS.identity, serverFS.error],
    },
    stat: {
        serverFS: [serverFS.useOS, serverFS.fakeStat, serverFS.error],
    },
    writeFile: {
        serverFS: [serverFS.useOS, serverFS.noop, serverFS.error],
    },
    removeFile: {
        serverFS: [serverFS.useOS, serverFS.noop, serverFS.error],
    },
};

type FileSystemCallbackName = keyof typeof fileSystemCallbackTable;
const fsCallbackNames = Object.keys(fileSystemCallbackTable) as FileSystemCallbackName[];
const serverFSSentinelNames = Object.keys(serverFS) as ServerFSSentinelName[];

export interface FileSystemCallbackConfiguration {
    callbackNames: FileSystemCallbackName[];
    arguments: string[];
}

export function configureFileSystemCallbacks(fs: FileSystemCallbacks | undefined): FileSystemCallbackConfiguration {
    if (!fs) {
        return { callbackNames: [], arguments: [] };
    }

    const callbackNames: FileSystemCallbackName[] = [];
    const args: string[] = [];
    for (const name of fsCallbackNames) {
        const value = fs[name];
        if (typeof value === "function") {
            callbackNames.push(name);
            continue;
        }
        const sentinel = fileSystemCallbackTable[name].serverFS.find(sentinel => sentinel === value);
        if (sentinel) {
            const sentinelName = getServerFSSentinelName(sentinel);
            if (sentinelName !== "useOS") {
                args.push(`${name}:${sentinelName}`);
            }
            continue;
        }
        throw new TypeError(`Invalid filesystem callback '${name}': expected a function or a supported serverFS sentinel`);
    }
    args.push(...callbackNames);
    return { callbackNames, arguments: args };
}

export function encodeFileSystemCallbackResult(
    name: FileSystemCallbackName,
    result: unknown,
): FileSystemCallbackResponse {
    const sentinel = fileSystemCallbackTable[name].serverFS.find(sentinel => sentinel === result);
    if (sentinel) {
        return { kind: getServerFSSentinelName(sentinel) };
    }

    let valid: boolean;
    switch (name) {
        case "directoryExists":
        case "fileExists":
            valid = typeof result === "boolean";
            break;
        case "getAccessibleEntries": {
            const entries = result as { files?: unknown; directories?: unknown; symlinks?: unknown; } | null;
            valid = !!entries
                && isStringArray(entries.files)
                && isStringArray(entries.directories)
                && (entries.symlinks === undefined || isStringArray(entries.symlinks));
            break;
        }
        case "readFile":
            if (result === undefined) return { kind: "missing" };
            valid = typeof result === "string";
            break;
        case "realpath":
            valid = typeof result === "string";
            break;
        case "stat": {
            if (result === undefined) return { kind: "missing" };
            const stat = result as { mode?: unknown; size?: unknown; mtime?: unknown; } | undefined;
            valid = !!stat
                && typeof stat.mode === "number"
                && Number.isSafeInteger(stat.mode)
                && stat.mode >= 0
                && stat.mode <= 0xffff_ffff
                && typeof stat.size === "number"
                && Number.isSafeInteger(stat.size)
                && stat.size >= 0
                && stat.mtime instanceof Date
                && !Number.isNaN(stat.mtime.getTime());
            break;
        }
        case "writeFile":
        case "removeFile":
            valid = result === undefined;
            break;
    }

    if (!valid) {
        throw new TypeError(`Invalid result from filesystem callback '${name}'`);
    }
    return name === "writeFile" || name === "removeFile" ? { kind: "value" } : { kind: "value", value: result };
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(element => typeof element === "string");
}

function getServerFSSentinelName(sentinel: ServerFSSentinel): ServerFSSentinelName {
    for (const name of serverFSSentinelNames) {
        if (serverFS[name] === sentinel) {
            return name;
        }
    }
    throw new TypeError("Unknown serverFS sentinel");
}
