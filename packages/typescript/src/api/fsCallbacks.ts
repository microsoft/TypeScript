import {
    type FileSystemCallbacks,
    fsCallbackNames,
    serverFS,
} from "./fs.ts";

export interface FileSystemCallbackConfiguration {
    callbackNames: (typeof fsCallbackNames[number])[];
    arguments: string[];
}

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
        throw new TypeError(`Invalid filesystem callback '${name}': expected a function or a supported serverFS sentinel`);
    }
    args.push(...callbackNames);
    return { callbackNames, arguments: args };
}

export function validateFileSystemCallbackResult(name: typeof fsCallbackNames[number], result: unknown): void {
    if (result === serverFS.useOS) {
        return;
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
            valid = typeof result === "string" || result === null;
            break;
        case "realpath":
            valid = typeof result === "string";
            break;
        case "stat": {
            const stat = result as { mode?: unknown; size?: unknown; mtime?: unknown; } | null;
            valid = stat === null
                || !!stat
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
}

function isStringArray(value: unknown): value is string[] {
    return Array.isArray(value) && value.every(element => typeof element === "string");
}
