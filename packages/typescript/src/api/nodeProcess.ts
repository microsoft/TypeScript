import getExePath from "../../lib/getExePath.js";

/**
 * Returns `process` when running in Node.js with `process.getBuiltinModule`.
 * Node modules are loaded through it so that the API can also be loaded in
 * environments without them, where a transport must be provided instead.
 */
export function nodeProcess(): NodeJS.Process {
    const process = (globalThis as { process?: Partial<NodeJS.Process>; }).process;
    if (typeof process?.getBuiltinModule !== "function") {
        throw new Error("Starting or connecting to a TypeScript API server requires Node.js 20.16 or later; in other environments, provide a transport.");
    }
    return process as NodeJS.Process;
}

export function getDefaultExePath(): string {
    const process = nodeProcess();
    return getExePath({
        fs: process.getBuiltinModule("node:fs"),
        module: process.getBuiltinModule("node:module"),
        path: process.getBuiltinModule("node:path"),
        url: process.getBuiltinModule("node:url"),
    });
}
