import {
    getDirectoryPath,
} from "../../_namespaces/ts";
import * as vfs from "../../_namespaces/vfs";
import {
    libContent,
} from "./contents";

export interface FsOptions {
    libContentToAppend?: string;
    cwd?: string;
    executingFilePath?: string;
}
export type FsOptionsOrLibContentsToAppend = FsOptions | string;

function valueOfFsOptions(options: FsOptionsOrLibContentsToAppend | undefined, key: keyof FsOptions) {
    return typeof options === "string" ?
        key === "libContentToAppend" ? options : undefined :
        options?.[key];
}

/**
 * All the files must be in /src
 */
export function loadProjectFromFiles(
    files: vfs.FileSet,
    options?: FsOptionsOrLibContentsToAppend,
): vfs.FileSystem {
    const executingFilePath = valueOfFsOptions(options, "executingFilePath");
    const defaultLibLocation = executingFilePath ? getDirectoryPath(executingFilePath) : "/lib";
    const fs = new vfs.FileSystem(/*ignoreCase*/ true, {
        files,
        cwd: valueOfFsOptions(options, "cwd") || "/",
        meta: { defaultLibLocation },
    });
    const libContentToAppend = valueOfFsOptions(options, "libContentToAppend");
    fs.mkdirpSync(defaultLibLocation);
    fs.writeFileSync(`${defaultLibLocation}/lib.d.ts`, libContentToAppend ? `${libContent}${libContentToAppend}` : libContent);
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
