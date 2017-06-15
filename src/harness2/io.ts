import * as vpath from "./vpath";
import { compareStrings } from "./utils";

export interface IO {
    newLine(): string;
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;
    getExecutingFilePath(): string;
    getEnvironmentVariable(name: string): string;
    args(): string[];
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    getAccessibleFileSystemEntries(path: string): FileSystemEntries;
    getDirectories(path: string, options?: { recursive?: boolean, pattern?: RegExp, qualified?: boolean }): string[];
    getFiles(path: string, options?: { recursive?: boolean, pattern?: RegExp, qualified?: boolean }): string[];
    createDirectory(path: string): void;
    readFile(path: string): string | undefined;
    writeFile(path: string, contents: string): void;
    deleteFile(fileName: string): void;
    exit(exitCode?: number): void;
}

export interface FileSystemEntries {
    files: string[];
    directories: string[];
}

function createNodeIO(): IO {
    const fs = require("fs");
    const os = require("os");
    const platform = os.platform();
    const useCaseSensitiveFileNames = isFileSystemCaseSensitive();
    const args = process.argv.slice(2);
    const executingFilePath = vpath.combine(__dirname, "run.js");

    return {
        newLine: () => "\r\n",
        useCaseSensitiveFileNames: () => useCaseSensitiveFileNames,
        getCurrentDirectory: () => process.cwd(),
        getExecutingFilePath: () => executingFilePath,
        getEnvironmentVariable: name => process.env[name] as string || "",
        args: () => args,
        fileExists,
        directoryExists,
        getAccessibleFileSystemEntries,
        getFiles,
        getDirectories,
        createDirectory,
        readFile,
        writeFile,
        deleteFile,
        exit
    };

    function isFileSystemCaseSensitive() {
        if (platform === "win32" || <string>platform === "win64") {
            return false;
        }
        return !fileExists(__filename.toUpperCase())
            || !fileExists(__filename.toLowerCase());
    }

    function fileExists(path: string): boolean {
        try {
            return fs.statSync(path).isFile() as boolean;
        }
        catch (e) {
            return false;
        }
    }

    function directoryExists(path: string): boolean {
        try {
            return fs.statSync(path).isDirectory();
        }
        catch (e) {
            return false;
        }
    }

    function getAccessibleFileSystemEntries(dirname: string): FileSystemEntries {
        try {
            const entries: string[] = fs.readdirSync(dirname || ".").sort(useCaseSensitiveFileNames ? compareStrings.caseSensitive : compareStrings.caseInsensitive);
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
                catch (e) { }
            }
            return { files, directories };
        }
        catch (e) {
            return { files: [], directories: [] };
        }
    }

    function getEntries(dirname: string, options: { recursive?: boolean, pattern?: RegExp, qualified?: boolean, kind: "files" | "directories" }): string[] {
        const results: string[] = [];
        getEntriesWorker(dirname, options.qualified ? dirname : "", options, results);
        if (options.recursive) results.sort(compareStrings);
        return results;
    }

    function getEntriesWorker(dirname: string, qualifiedname: string, options: { recursive?: boolean, pattern?: RegExp, kind: "files" | "directories" }, results: string[]) {
        const entries = getAccessibleFileSystemEntries(dirname);
        const names = entries[options.kind];
        for (const name of names) {
            if (options.pattern && !options.pattern.test(name)) continue;
            results.push(vpath.combine(qualifiedname, name));
        }
        if (options.recursive) {
            for (const name of entries.directories) {
                getEntriesWorker(vpath.combine(dirname, name), vpath.combine(qualifiedname, name), options, results);
            }
        }
    }

    function getFiles(path: string, options: { recursive?: boolean, pattern?: RegExp, qualified?: boolean } = {}) {
        return getEntries(path, { ...options, kind: "files" });
    }

    function getDirectories(path: string, options: { recursive?: boolean, pattern?: RegExp, qualified?: boolean } = {}) {
        return getEntries(path, { ...options, kind: "directories" });
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
            else if (!directoryExists(path)) {
                throw e;
            }
        }
    }

    function readFile(name: string): string | undefined {
        try {
            const buffer = fs.readFileSync(name);
            let len = buffer.length;
            if (len >= 2 && buffer[0] === 0xFE && buffer[1] === 0xFF) {
                // Big endian UTF-16 byte order mark detected. Since big endian is not supported by node.js,
                // flip all byte pairs and treat as little endian.
                len &= ~1; // Round down to a multiple of 2
                for (let i = 0; i < len; i += 2) {
                    const temp = buffer[i];
                    buffer[i] = buffer[i + 1];
                    buffer[i + 1] = temp;
                }
                return buffer.toString("utf16le", 2);
            }
            if (len >= 2 && buffer[0] === 0xFF && buffer[1] === 0xFE) {
                // Little endian UTF-16 byte order mark detected
                return buffer.toString("utf16le", 2);
            }
            if (len >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
                // UTF-8 byte order mark detected
                return buffer.toString("utf8", 3);
            }
            // Default is UTF-8 with no byte order mark
            return buffer.toString("utf8");
        }
        catch (e) {
            return undefined;
        }
    }

    function writeFile(name: string, contents: string) {
        fs.writeFileSync(name, contents, "utf8");
    }

    function deleteFile(name: string) {
        try {
            fs.unlinkSync(name);
        }
        catch (e) {
        }
    }

    function exit(exitCode?: number) {
        process.exit(exitCode);
    }
}

function createIO() {
    return createNodeIO();
}

export const {
    newLine,
    useCaseSensitiveFileNames,
    getCurrentDirectory,
    getExecutingFilePath,
    getEnvironmentVariable,
    args,
    getAccessibleFileSystemEntries,
    directoryExists,
    getDirectories,
    createDirectory,
    fileExists,
    getFiles,
    readFile,
    writeFile,
    deleteFile,
    exit,
} = createIO();