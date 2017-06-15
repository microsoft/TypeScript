import * as Utils from "./utils";
import * as VirtualPath from "./vpath";
import { VirtualFileSystem } from "./vfs";

interface IO {
    newLine(): string;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames(): boolean;
    resolvePath(path: string): string | undefined;
    readFile(path: string): string | undefined;
    writeFile(path: string, contents: string): void;
    directoryName(path: string): string | undefined;
    getDirectories(path: string): string[];
    createDirectory(path: string): void;
    fileExists(fileName: string): boolean;
    directoryExists(path: string): boolean;
    deleteFile(fileName: string): void;
    listFiles(path: string, filter: RegExp, options?: { recursive?: boolean }): string[];
    log(text: string): void;
    getMemoryUsage?(): number;
    args(): string[];
    getExecutingFilePath(): string;
    exit(exitCode?: number): void;
    readDirectory(path: string, extension?: string[], exclude?: string[], include?: string[]): string[];
    tryEnableSourceMapsForHost?(): void;
    getEnvironmentVariable?(name: string): string;
}

let matchFiles: ((path: string, extensions: string[] | undefined, excludes: string[] | undefined, includes: string[] | undefined, useCaseSensitiveFileNames: boolean, currentDirectory: string, getFileSystemEntries: (path: string) => { files: string[], directories: string[] }) => string[]) | undefined;

export function setFileMatcher(value: (path: string, extensions: string[], excludes: string[], includes: string[], useCaseSensitiveFileNames: boolean, currentDirectory: string, getFileSystemEntries: (path: string) => { files: string[], directories: string[] }) => string[]) {
    matchFiles = value;
}

function createNodeIO(): IO {
    const fs = require("fs");
    const path = require("path");
    const os = require("os");
    const platform = os.platform();
    const useCaseSensitiveFileNames = isFileSystemCaseSensitive();
    const args = process.argv.slice(2);
    const executingFilePath = path.join(__dirname, "run.js");
    return {
        newLine() {
            return "\r\n";
        },
        useCaseSensitiveFileNames() {
            return useCaseSensitiveFileNames;
        },
        getCurrentDirectory() {
            return process.cwd();
        },
        getExecutingFilePath() {
            return executingFilePath;
        },
        args() {
            return args;
        },
        log(text: string) {
            console.log(text);
        },
        exit(exitCode?: number) {
            process.exit(exitCode);
        },
        resolvePath(name: string) {
            return path.resolve(name);
        },
        readFile,
        writeFile,
        directoryName,
        getDirectories,
        createDirectory(name: string) {
            tryExec(() => fs.mkdirSync(name));
        },
        fileExists,
        directoryExists,
        deleteFile(name: string) {
            tryExec(() => fs.unlinkSync(name));
        },
        listFiles(dirname: string, spec?: RegExp, options?: { recursive?: boolean }): string[] {
            return filesInFolder(dirname, options && options.recursive || false);
            function filesInFolder(folder: string, recursive: boolean): string[] {
                let paths: string[] = [];
                const files = fs.readdirSync(folder);
                for (let i = 0; i < files.length; i++) {
                    const pathToFile = path.join(folder, files[i]);
                    const stat = fs.statSync(pathToFile);
                    if (recursive && stat.isDirectory()) {
                        paths = paths.concat(filesInFolder(pathToFile, /*recursive*/ true));
                    }
                    else if (stat.isFile() && (!spec || files[i].match(spec))) {
                        paths.push(pathToFile);
                    }
                }

                return paths;
            }
        },
        getMemoryUsage() {
            if (global.gc) {
                global.gc();
            }
            return process.memoryUsage().heapUsed;
        },
        readDirectory,
        tryEnableSourceMapsForHost() {
            tryExec(() => require("source-map-support").install());
        },
        getEnvironmentVariable(name: string) {
            return process.env[name] || "";
        }
    };

    function isFileSystemCaseSensitive() {
        if (platform === "win32" || <string>platform === "win64") {
            return false;
        }
        return !fileExists(__filename.toUpperCase())
            || !fileExists(__filename.toLowerCase());
    }

    function tryExec<T>(func: () => T): T | undefined {
        try {
            return func();
        }
        catch (e) {
            return undefined;
        }
    }

    function fileExists(name: string): boolean {
        return tryExec(() => fs.statSync(name).isFile()) || false;
    }

    function directoryExists(name: string): boolean {
        return tryExec(() => fs.statSync(name).isDirectory()) || false;
    }

    function readFile(name: string) {
        return tryExec<string>(() => {
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
        });
    }

    function writeFile(name: string, contents: string) {
        fs.writeFileSync(name, contents, "utf8");
    }

    function directoryName(name: string) {
        const dir = path.dirname(name);
        // Node will just continue to repeat the root path, rather than return null
        return dir === name ? undefined : dir;
    }

    function getDirectories(name: string): string[] {
        return fs.readdirSync(name).filter((dir: string) => directoryExists(path.join(name, dir)));
    }

    function readDirectory(path: string, extensions?: string[], excludes?: string[], includes?: string[]): string[] {
        if (!matchFiles) {
            throw new Error("File matcher not defined.");
        }
        return matchFiles(path, extensions, excludes, includes, useCaseSensitiveFileNames, process.cwd(), getAccessibleFileSystemEntries);
    }

    function getAccessibleFileSystemEntries(dirname: string): { files: string[], directories: string[] } {
        try {
            const entries = fs.readdirSync(dirname || ".").sort();
            const files: string[] = [];
            const directories: string[] = [];
            for (const entry of entries) {
                // This is necessary because on some file system node fails to exclude
                // "." and "..". See https://github.com/nodejs/node/issues/4002
                if (entry === "." || entry === "..") {
                    continue;
                }
                const name = path.join(dirname, entry);

                let stat: any;
                try {
                    stat = fs.statSync(name);
                }
                catch (e) {
                    continue;
                }

                if (stat.isFile()) {
                    files.push(entry);
                }
                else if (stat.isDirectory()) {
                    directories.push(entry);
                }
            }
            return { files, directories };
        }
        catch (e) {
            return { files: [], directories: [] };
        }
    }
}

declare var XMLHttpRequest: {
    new (): XMLHttpRequest;
};

interface XMLHttpRequest {
    readonly readyState: number;
    readonly responseText: string;
    readonly status: number;
    open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
    send(data?: string): void;
    setRequestHeader(header: string, value: string): void;
}

function createNetworkIO(): IO {
    const serverRoot = "http://localhost:8888/";
    const args: string[] = [];
    const vfs = new VirtualFileSystem("", false);

    interface Response {
        status: number;
        responseText?: string;
    }

    return {
        newLine() {
            return "\r\n";
        },
        useCaseSensitiveFileNames() {
            return vfs.useCaseSensitiveFileNames;
        },
        getCurrentDirectory() {
            return vfs.currentDirectory;
        },
        getExecutingFilePath() {
            return "";
        },
        args() {
            return args;
        },
        log(s: string) {
            console.log(s);
        },
        exit(_?: number) {
        },
        resolvePath(name: string) {
            const response = send("POST", `${serverRoot}${name}?action=resolve`);
            return response.status === 200 ? response.responseText : undefined;
        },
        readFile(name: string) {
            const response = send("GET", `${serverRoot}${name}`);
            return response.status === 200 ? response.responseText : undefined;
        },
        writeFile(name: string, contents: string) {
            send("PUT", `${serverRoot}${name}`, contents);
        },
        directoryName(name: string) {
            return VirtualPath.dirname(name);
        },
        getDirectories(_: string): string[] {
            return [];
        },
        createDirectory(_: string) { },
        fileExists(name: string) {
            return send("HEAD", `${serverRoot}${name}`).status === 200;
        },
        directoryExists(_: string) {
            return false;
        },
        deleteFile(name: string) {
            send("POST", `${serverRoot}${name}?action=DELETE`);
        },
        listFiles,
        readDirectory
    };

    function send(method: "GET" | "HEAD" | "PUT" | "POST" | "DELETE", url: string, content?: string): Response {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, /*async*/ false);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.send(content);
            while (xhr.readyState !== 4);
            return xhr;
        }
        catch (e) {
            console.log(`XHR Error: ${e}`);
            return { status: 500 };
        }
    }

    // function directoryNameImpl(path: string) {
    //     let dirPath = path;
    //     // root of the server
    //     if (dirPath.match(/localhost:\d+$/) || dirPath.match(/localhost:\d+\/$/)) {
    //         dirPath = undefined;
    //         // path + fileName
    //     }
    //     else if (dirPath.indexOf(".") === -1) {
    //         dirPath = dirPath.substring(0, dirPath.lastIndexOf("/"));
    //         // path
    //     }
    //     else {
    //         // strip any trailing slash
    //         if (dirPath.match(/.*\/$/)) {
    //             dirPath = dirPath.substring(0, dirPath.length - 2);
    //         }
    //         dirPath = dirPath.substring(0, dirPath.lastIndexOf("/"));
    //     }

    //     return dirPath;
    // }

    function listFiles(_path: string, _spec?: RegExp): string[] {
        throw new Error("Not implemented");
        // let vdir = vfs.getDirectory(path);
        // if (vdir === undefined) {
        //     const response = send("GET", `${serverRoot}${path}`);
        //     if (response.status === 200 && response.responseText) {
        //         const results = response.responseText.split(",");

        //         return spec ? results.filter(file => spec.test(file)) : results;
        //     }
        // }
        // if (vdir) {
        //     const results = vdir.getFiles(true).map(file => file.fullName);
        //     return spec ? results.filter(file => spec.test(file)) : results;
        // }
        // return [];
    }

    function readDirectory(_path: string, _extensions?: string[], _excludes?: string[], _includes?: string[]): string[] {
        throw new Error("Not implemented");
        // return matchFiles(path, extensions, excludes, includes, vfs.useCaseSensitiveFileNames, process.cwd(), getAccessibleFileSystemEntries);
    }
}

function createIO() {
    const environment = Utils.getExecutionEnvironment();
    switch (environment) {
        case Utils.ExecutionEnvironment.Node: return createNodeIO();
        case Utils.ExecutionEnvironment.Browser: return createNetworkIO();
        default: throw new Error(`Unknown value '${environment}' for ExecutionEnvironment.`);
    }
}

export const {
    newLine,
    useCaseSensitiveFileNames,
    getCurrentDirectory,
    getExecutingFilePath,
    args,
    log,
    exit,
    resolvePath,
    readFile,
    writeFile,
    directoryName,
    getDirectories,
    createDirectory,
    fileExists,
    directoryExists,
    deleteFile,
    listFiles,
    getMemoryUsage,
    readDirectory,
    tryEnableSourceMapsForHost,
    getEnvironmentVariable
} = createIO();
