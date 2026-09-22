import getExePath from "#getExePath";
import { dirname } from "node:path";
import {
    getPathComponents,
    normalizePath,
} from "./path.ts";
import type {
    RequestDirectoryEntries,
    RequestFileSystem,
    RequestSymlink,
} from "./proto.generated.ts";
import {
    type DocumentIdentifier,
    resolveFileName,
} from "./proto.ts";

export interface FileSystemEntries {
    files: string[];
    directories: string[];
}

export interface FileSystem {
    directoryExists?: ((directoryName: string) => boolean | undefined) | undefined;
    fileExists?: ((fileName: string) => boolean | undefined) | undefined;
    getAccessibleEntries?: ((directoryName: string) => FileSystemEntries | undefined) | undefined;
    /**
     * Read a file's content.
     * - Return the file content as a `string` (including `""` for empty files).
     * - Return `null` to indicate the file does not exist (without falling back to the real FS).
     * - Return `undefined` to fall back to the real filesystem.
     */
    readFile?: ((fileName: string) => string | null | undefined) | undefined;
    realpath?: ((path: string) => string | undefined) | undefined;
    writeFile?: ((path: string, content: string) => void) | undefined;
    removeFile?: ((path: string) => void) | undefined;
}

/** The callback names supported by the Go server for virtual FS delegation. */
export const fsCallbackNames = ["readFile", "fileExists", "directoryExists", "getAccessibleEntries", "realpath", "writeFile"] as const;

export interface CreateFileSystemOptions {
    /** Complete directory listings. Full filesystems derive these from `files` when omitted. */
    directories?: Record<string, RequestDirectoryEntries> | undefined;
    symlinks?: Record<string, RequestSymlink> | undefined;
    /** Files or directory trees hidden from an underlying snapshot or host filesystem. */
    removedPaths?: readonly string[] | undefined;
}

export interface CreateFileSystemWithLibOptions extends CreateFileSystemOptions {
    /** Default library directory used by a custom or non-embedded compiler executable. */
    defaultLibraryPath?: string | undefined;
}

/**
 * Files supplied to a request filesystem. String identifiers are file names;
 * use `{ uri }` when supplying a document URI so it can be decoded correctly.
 */
export type RequestFileEntries = readonly (readonly [id: DocumentIdentifier, content: string])[];

/** Creates a full request filesystem. The server derives directory listings when omitted. */
export function createFileSystem(
    files: RequestFileEntries,
    options: CreateFileSystemOptions = {},
): RequestFileSystem {
    return createRequestFileSystem("full", files, options);
}

/**
 * Creates a full request filesystem with the compiler's default library
 * directory mounted read-only through the host filesystem.
 */
export function createFileSystemWithLib(
    files: RequestFileEntries,
    options: CreateFileSystemWithLibOptions = {},
): RequestFileSystem {
    const defaultLibraryPaths = options.defaultLibraryPath
        ? [normalizePath(options.defaultLibraryPath)]
        : [normalizePath("bundled:///libs")];
    if (!options.defaultLibraryPath) {
        try {
            defaultLibraryPaths.push(normalizePath(dirname(getExePath())));
        }
        catch {
            // A socket-connected embedded server can provide bundled libs without
            // a locally installed compiler executable.
        }
    }
    const symlinks = { ...options.symlinks };
    for (const defaultLibraryPath of defaultLibraryPaths) {
        symlinks[defaultLibraryPath] ??= { target: defaultLibraryPath, host: true };
    }
    return createRequestFileSystem("full", files, {
        symlinks,
        directories: options.directories,
        removedPaths: options.removedPaths?.length ? options.removedPaths : undefined,
    });
}

/** Creates a request filesystem layer, merging base directory listings when omitted. */
export function createFileSystemLayer(
    files: RequestFileEntries,
    options: CreateFileSystemOptions = {},
): RequestFileSystem {
    return createRequestFileSystem("layer", files, options);
}

function createRequestFileSystem(
    kind: RequestFileSystem["kind"],
    files: RequestFileEntries,
    options: CreateFileSystemOptions,
): RequestFileSystem {
    const normalizedFiles = new Map<string, string>();
    for (const [id, content] of files) {
        const fileName = normalizePath(resolveFileName(id));
        if (normalizedFiles.has(fileName)) {
            throw new Error(`Duplicate request filesystem path: ${fileName}`);
        }
        normalizedFiles.set(fileName, content);
    }
    const fileRecord = Object.fromEntries(normalizedFiles);
    return {
        kind,
        files: fileRecord,
        directories: options.directories,
        symlinks: options.symlinks,
        removedPaths: options.removedPaths?.length ? [...options.removedPaths] : undefined,
    };
}

interface VDirectory {
    type: "directory";
    children: Record<string, VNode>;
}

interface VFile {
    type: "file";
}

type VNode = VDirectory | VFile;

export function createVirtualFileSystem(files: Record<string, string>): FileSystem {
    const root: VDirectory = {
        type: "directory",
        children: {},
    };
    const content: Record<string, string> = {};

    for (const filePath of Object.keys(files)) {
        content[filePath] = files[filePath];
        addToTree(filePath);
    }

    return {
        directoryExists,
        fileExists,
        getAccessibleEntries,
        readFile,
        realpath: path => path,
        writeFile,
        removeFile,
    };

    function getNodeFromPath(path: string): VNode | undefined {
        if (!path || path === "/") {
            return root;
        }
        const segments = getPathComponents(path).slice(1);
        let current: VNode = root;
        for (const segment of segments) {
            if (current.type !== "directory") {
                return undefined;
            }
            const child: VNode = current.children[segment];
            if (!child) {
                return undefined;
            }
            current = child;
        }
        return current;
    }

    function ensureDirectory(segments: string[]): VDirectory {
        let current: VDirectory = root;
        for (const segment of segments) {
            if (!current.children[segment]) {
                current.children[segment] = { type: "directory", children: {} };
            }
            else if (current.children[segment].type !== "directory") {
                throw new Error(`Cannot create directory: a file already exists at "/${segments.join("/")}"`);
            }
            current = current.children[segment] as VDirectory;
        }
        return current;
    }

    function addToTree(path: string): void {
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) {
            throw new Error(`Invalid file path: "${path}"`);
        }
        const filename = segments.pop()!;
        const dirNode = ensureDirectory(segments);
        dirNode.children[filename] = { type: "file" };
    }

    function writeFile(path: string, data: string): void {
        content[path] = data;
        addToTree(path);
    }

    function removeFile(path: string): void {
        delete content[path];
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) return;
        const filename = segments.pop()!;
        const dirNode = getNodeFromPath("/" + segments.join("/"));
        if (dirNode && dirNode.type === "directory") {
            delete dirNode.children[filename];
        }
    }

    function directoryExists(directoryName: string): boolean {
        const node = getNodeFromPath(directoryName);
        return !!node && node.type === "directory";
    }

    function fileExists(fileName: string): boolean {
        return fileName in content;
    }

    function getAccessibleEntries(directoryName: string): FileSystemEntries | undefined {
        const node = getNodeFromPath(directoryName);
        if (!node || node.type !== "directory") {
            return undefined;
        }
        const fileEntries: string[] = [];
        const directories: string[] = [];
        for (const [name, child] of Object.entries(node.children)) {
            if (child.type === "file") {
                fileEntries.push(name);
            }
            else {
                directories.push(name);
            }
        }
        return { files: fileEntries, directories };
    }

    function readFile(fileName: string): string | undefined {
        if (fileName in content) {
            return content[fileName];
        }
        return undefined;
    }
}
