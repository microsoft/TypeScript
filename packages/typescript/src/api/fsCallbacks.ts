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
        throw new TypeError(`Invalid filesystem callback '${name}': expected a function or a supported filesystem sentinel`);
    }
    args.push(...callbackNames);
    return { callbackNames, arguments: args };
}
