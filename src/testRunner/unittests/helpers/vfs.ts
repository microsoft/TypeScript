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

export function enableStrict(fs: vfs.FileSystem, path: string) {
    replaceText(fs, path, `"strict": false`, `"strict": true`);
}

export function addTestPrologue(fs: vfs.FileSystem, path: string, prologue: string) {
    prependText(
        fs,
        path,
        `${prologue}
`,
    );
}

export function addShebang(fs: vfs.FileSystem, project: string, file: string) {
    prependText(
        fs,
        `src/${project}/${file}.ts`,
        `#!someshebang ${project} ${file}
`,
    );
}

export function restContent(project: string, file: string) {
    return `function for${project}${file}Rest() {
const { b, ...rest } = { a: 10, b: 30, yy: 30 };
}`;
}
function nonrestContent(project: string, file: string) {
    return `function for${project}${file}Rest() { }`;
}

export function addRest(fs: vfs.FileSystem, project: string, file: string) {
    appendText(fs, `src/${project}/${file}.ts`, restContent(project, file));
}

export function removeRest(fs: vfs.FileSystem, project: string, file: string) {
    replaceText(fs, `src/${project}/${file}.ts`, restContent(project, file), nonrestContent(project, file));
}

export function addStubFoo(fs: vfs.FileSystem, project: string, file: string) {
    appendText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file));
}

export function changeStubToRest(fs: vfs.FileSystem, project: string, file: string) {
    replaceText(fs, `src/${project}/${file}.ts`, nonrestContent(project, file), restContent(project, file));
}

export function addSpread(fs: vfs.FileSystem, project: string, file: string) {
    const path = `src/${project}/${file}.ts`;
    const content = fs.readFileSync(path, "utf8");
    fs.writeFileSync(
        path,
        `${content}
function ${project}${file}Spread(...b: number[]) { }
const ${project}${file}_ar = [20, 30];
${project}${file}Spread(10, ...${project}${file}_ar);`,
    );

    replaceText(
        fs,
        `src/${project}/tsconfig.json`,
        `"strict": false,`,
        `"strict": false,
    "downlevelIteration": true,`,
    );
}

export function getTripleSlashRef(project: string) {
    return `/src/${project}/tripleRef.d.ts`;
}

export function addTripleSlashRef(fs: vfs.FileSystem, project: string, file: string) {
    fs.writeFileSync(getTripleSlashRef(project), `declare class ${project}${file} { }`);
    prependText(
        fs,
        `src/${project}/${file}.ts`,
        `///<reference path="./tripleRef.d.ts"/>
const ${file}Const = new ${project}${file}();
`,
    );
}
