import {
    type FileSystemCallbacks,
    fsCallbackNames,
    serverFS,
} from "./fs.ts";

export interface FileSystemCallbackConfiguration {
    callbackNames: (typeof fsCallbackNames[number])[];
    arguments: string[];
}

export type FileSystemCallbackResponse =
    | { kind: "value"; value?: unknown; }
    | { kind: "missing"; }
    | { kind: "useOS"; }
    | { kind: "identity"; }
    | { kind: "fakeStat"; }
    | { kind: "noop"; };

export function configureFileSystemCallbacks(fs: FileSystemCallbacks | undefined): FileSystemCallbackConfiguration {
    if (!fs) {
        return { callbackNames: [], arguments: [] };
    }

    const callbackNames: (typeof fsCallbackNames[number])[] = [];
    const args: string[] = [];
    for (const name of fsCallbackNames) {
        const value = fs[name];
        if (typeof value === "function") {
            callbackNames.push(name);
            continue;
        }
        if (value === serverFS.useOS) {
            continue;
        }
        if (name === "realpath" && value === serverFS.identity) {
            args.push("realpath:identity");
            continue;
        }
        if (name === "stat" && value === serverFS.fakeStat) {
            args.push("stat:fakeStat");
            continue;
        }
        if (name === "writeFile" && value === serverFS.noop) {
            args.push("writeFile:noop");
            continue;
        }
        throw new TypeError(`Invalid filesystem callback '${name}': expected a function or a supported serverFS sentinel`);
    }
    args.push(...callbackNames);
    return { callbackNames, arguments: args };
}

export function encodeFileSystemCallbackResult(
    name: typeof fsCallbackNames[number],
    result: unknown,
): FileSystemCallbackResponse {
    if (result === serverFS.useOS) {
        return { kind: "useOS" };
    }
    if (name === "realpath" && result === serverFS.identity) {
        return { kind: "identity" };
    }
    if (name === "stat" && result === serverFS.fakeStat) {
        return { kind: "fakeStat" };
    }
    if (name === "writeFile" && result === serverFS.noop) {
        return { kind: "noop" };
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
            valid = result === undefined;
            break;
    }

    if (!valid) {
        throw new TypeError(`Invalid result from filesystem callback '${name}'`);
    }
    return name === "writeFile" ? { kind: "value" } : { kind: "value", value: result };
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(element => typeof element === "string");
}
