import {
    sys,
} from "typescript";

import {
    compareStringsCaseInsensitive,
    compareStringsCaseSensitive,
} from "../../compiler/lang-utils";
import {
    FileSystemEntries,
} from "./vfs";
import * as vpath from "./vpath";

export interface IO {
    newLine(): string;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames(): boolean;
    resolvePath(path: string): string | undefined;
    getFileSize(path: string): number;
    readFile(path: string): string | undefined;
    writeFile(path: string, contents: string): void;
    directoryName(path: string): string | undefined;
    getDirectories(path: string): string[];
    createDirectory(path: string): void;
    fileExists(fileName: string): boolean;
    directoryExists(path: string): boolean;
    deleteFile(fileName: string): void;
    listFiles(path: string, filter?: RegExp, options?: { recursive?: boolean; }): string[];
    log(text: string): void;
    args(): string[];
    getExecutingFilePath(): string;
    getWorkspaceRoot(): string;
    exit(exitCode?: number): void;
    readDirectory(path: string, extension?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): readonly string[];
    getAccessibleFileSystemEntries(dirname: string): FileSystemEntries;
    tryEnableSourceMapsForHost?(): void;
    getEnvironmentVariable?(name: string): string;
    getMemoryUsage?(): number | undefined;
    joinPath(...components: string[]): string;
}

// harness always uses one kind of new line
// But note that `parseTestData` in `fourslash.ts` uses "\n"
const harnessNewLine = "\r\n";

function createNodeIO(): IO {
    let workspaceRoot = "./node_modules/typescript/";
    let fs: any, pathModule: any;
    if (require) {
        fs = require("fs");
        pathModule = require("path");
        workspaceRoot = pathModule.resolve(workspaceRoot);
    }
    else {
        fs = pathModule = {};
    }

    function deleteFile(path: string) {
        try {
            fs.unlinkSync(path);
        }
        catch { /*ignore*/ }
    }

    function directoryName(path: string) {
        const dirPath = pathModule.dirname(path);
        // Node will just continue to repeat the root path, rather than return null
        return dirPath === path ? undefined : dirPath;
    }

    function joinPath(...components: string[]) {
        return pathModule.join(...components);
    }

    function listFiles(path: string, spec: RegExp, options: { recursive?: boolean; } = {}) {
        function filesInFolder(folder: string): string[] {
            let paths: string[] = [];

            for (const file of fs.readdirSync(folder)) {
                const pathToFile = pathModule.join(folder, file);
                if (!fs.existsSync(pathToFile)) continue; // ignore invalid symlinks
                const stat = fs.statSync(pathToFile);
                if (options.recursive && stat.isDirectory()) {
                    paths = paths.concat(filesInFolder(pathToFile));
                }
                else if (stat.isFile() && (!spec || file.match(spec))) {
                    paths.push(pathToFile);
                }
            }

            return paths;
        }

        return filesInFolder(path);
    }

    function getAccessibleFileSystemEntries(dirname: string): FileSystemEntries {
        try {
            const entries: string[] = fs.readdirSync(dirname || ".").sort(sys.useCaseSensitiveFileNames ? compareStringsCaseSensitive : compareStringsCaseInsensitive);
            const files: string[] = [];
            const directories: string[] = [];
            for (const entry of entries) {
                if (entry === "." || entry === "..") continue;
                const name = vpath.combine(dirname, entry);
                try {
                    const stat = fs.statSync(name);
                    if (!stat) continue;
                    if (stat.isFile()) {
                        files.push(entry);
                    }
                    else if (stat.isDirectory()) {
                        directories.push(entry);
                    }
                }
                catch { /*ignore*/ }
            }
            return { files, directories };
        }
        catch (e) {
            return { files: [], directories: [] };
        }
    }

    function createDirectory(path: string) {
        try {
            fs.mkdirSync(path);
        }
        catch (e) {
            if (e.code === "ENOENT") {
                createDirectory(vpath.dirname(path));
                createDirectory(path);
            }
            else if (!sys.directoryExists(path)) {
                throw e;
            }
        }
    }

    return {
        newLine: () => harnessNewLine,
        getCurrentDirectory: () => sys.getCurrentDirectory(),
        useCaseSensitiveFileNames: () => sys.useCaseSensitiveFileNames,
        resolvePath: (path: string) => sys.resolvePath(path),
        getFileSize: (path: string) => sys.getFileSize!(path),
        readFile: path => sys.readFile(path),
        writeFile: (path, content) => sys.writeFile(path, content),
        directoryName,
        getDirectories: path => sys.getDirectories(path),
        createDirectory,
        fileExists: path => sys.fileExists(path),
        directoryExists: path => sys.directoryExists(path),
        deleteFile,
        listFiles,
        log: s => console.log(s),
        args: () => sys.args,
        getExecutingFilePath: () => sys.getExecutingFilePath(),
        getWorkspaceRoot: () => workspaceRoot,
        exit: exitCode => sys.exit(exitCode),
        readDirectory: (path, extension, exclude, include, depth) => sys.readDirectory(path, extension, exclude, include, depth),
        getAccessibleFileSystemEntries,
        tryEnableSourceMapsForHost: () => {
            throw new Error("Not supported");
        },
        getMemoryUsage: () => sys.getMemoryUsage && sys.getMemoryUsage(),
        getEnvironmentVariable(name: string) {
            return process.env[name] || "";
        },
        joinPath,
    };
}

export const IO = createNodeIO();
