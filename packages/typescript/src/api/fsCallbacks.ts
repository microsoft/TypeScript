import {
    type FileSystemCallbacks,
    fsCallbackNames,
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
        if (value === "passthrough") {
            continue;
        }
        if (name === "realpath" && value === "identity") {
            args.push("realpath:identity");
            continue;
        }
        if (name === "stat" && value === "infer") {
            args.push("stat:infer");
            continue;
        }
        throw new TypeError(`Invalid filesystem callback '${name}': expected a function${name === "realpath" ? ', "passthrough", or "identity"' : name === "stat" ? ', "passthrough", or "infer"' : ' or "passthrough"'}`);
    }
    args.push(...callbackNames);
    return { callbackNames, arguments: args };
}
