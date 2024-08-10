import { getDirectoryPath } from "../../_namespaces/ts.js";
import * as vfs from "../../_namespaces/vfs.js";
import { libFile } from "./virtualFileSystemWithWatch.js";

export interface FsOptions {
    currentDirectory?: string;
}

/**
 * All the files must be in /src
 */
export function loadProjectFromFiles(
    files: vfs.FileSet,
    options?: FsOptions,
): vfs.FileSystem {
    const defaultLibLocation = getDirectoryPath(libFile.path);
    const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
        files,
        cwd: options?.currentDirectory ?? "/",
        meta: { defaultLibLocation },
    });
    fs.mkdirpSync(defaultLibLocation);
    if (!fs.existsSync(`${defaultLibLocation}/lib.d.ts`)) fs.writeFileSync(`${defaultLibLocation}/lib.d.ts`, libFile.content);
    fs.makeReadonly();
    return fs;
}

export function replaceText(fs: vfs.FileSystem, path: string, oldText: string, newText: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    if (!old.includes(oldText)) {
        throw new Error(`Text "${oldText}" does not exist in file ${path}`);
    }
    const newContent = old.replace(oldText, newText);
    fs.writeFileSync(path, newContent, "utf-8");
}

export function prependText(fs: vfs.FileSystem, path: string, additionalContent: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    fs.writeFileSync(path, `${additionalContent}${old}`, "utf-8");
}

export function appendText(fs: vfs.FileSystem, path: string, additionalContent: string) {
    if (!fs.statSync(path).isFile()) {
        throw new Error(`File ${path} does not exist`);
    }
    const old = fs.readFileSync(path, "utf-8");
    fs.writeFileSync(path, `${old}${additionalContent}`);
}
