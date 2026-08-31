import getExePath from "#getExePath";
import { dirname } from "node:path";
import {
    getPathComponents,
    normalizePath,
} from "./path.ts";
import type {
    SnapshotDirectoryEntries,
    SnapshotFileSystem,
    SnapshotSymlink,
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
    directoryExists?: (directoryName: string) => boolean | undefined;
    fileExists?: (fileName: string) => boolean | undefined;
    getAccessibleEntries?: (directoryName: string) => FileSystemEntries | undefined;
    /**
     * Read a file's content.
     * - Return the file content as a `string` (including `""` for empty files).
     * - Return `null` to indicate the file does not exist (without falling back to the real FS).
     * - Return `undefined` to fall back to the real filesystem.
     */
    readFile?: (fileName: string) => string | null | undefined;
    realpath?: (path: string) => string | undefined;
    writeFile?: (path: string, content: string) => void;
    removeFile?: (path: string) => void;
}

/** The callback names supported by the Go server for virtual FS delegation. */
export const fsCallbackNames = ["readFile", "fileExists", "directoryExists", "getAccessibleEntries", "realpath", "writeFile"] as const;

export interface CreateSnapshotFileSystemOptions {
    /** Complete directory listings. Derived from `files` when omitted. */
    directories?: Record<string, SnapshotDirectoryEntries>;
    symlinks?: Record<string, SnapshotSymlink>;
    /** Files or directory trees hidden from an underlying snapshot or host filesystem. */
    removedPaths?: readonly string[];
}

export interface CreateMemoryFileSystemWithLibOptions extends CreateSnapshotFileSystemOptions {
    /** Default library directory used by a custom or non-embedded compiler executable. */
    defaultLibraryPath?: string;
}

/**
 * Files supplied to a snapshot filesystem. String identifiers are file names;
 * use `{ uri }` when supplying a document URI so it can be decoded correctly.
 */
export type SnapshotFileEntries = readonly (readonly [id: DocumentIdentifier, content: string])[];

/** Creates a total memory snapshot filesystem, deriving directory listings when omitted. */
export function createMemoryFileSystem(
    files: SnapshotFileEntries,
    options: CreateSnapshotFileSystemOptions = {},
): SnapshotFileSystem {
    return createSnapshotFileSystem("memory", files, options);
}

/**
 * Creates a total memory snapshot filesystem with the compiler's default library
 * directory mounted read-only through the host filesystem.
 */
export function createMemoryFileSystemWithLib(
    files: SnapshotFileEntries,
    options: CreateMemoryFileSystemWithLibOptions = {},
): SnapshotFileSystem {
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
    return createSnapshotFileSystem("memory", files, {
        symlinks,
        ...(options.directories ? { directories: options.directories } : {}),
        ...(options.removedPaths?.length ? { removedPaths: options.removedPaths } : {}),
    });
}

/** Creates a read-through cache snapshot filesystem, deriving directory listings when omitted. */
export function createCacheFileSystem(
    files: SnapshotFileEntries,
    options: CreateSnapshotFileSystemOptions = {},
): SnapshotFileSystem {
    return createSnapshotFileSystem("cache", files, options);
}

function createSnapshotFileSystem(
    kind: SnapshotFileSystem["kind"],
    files: SnapshotFileEntries,
    options: CreateSnapshotFileSystemOptions,
): SnapshotFileSystem {
    const normalizedFiles: Record<string, string> = {};
    for (const [id, content] of files) {
        const fileName = resolveFileName(id);
        if (Object.hasOwn(normalizedFiles, fileName)) {
            throw new Error(`Duplicate snapshot filesystem path: ${fileName}`);
        }
        normalizedFiles[fileName] = content;
    }
    return {
        kind,
        files: normalizedFiles,
        directories: options.directories ?? deriveDirectoryListings(normalizedFiles),
        ...(options.symlinks ? { symlinks: options.symlinks } : {}),
        ...(options.removedPaths?.length ? { removedPaths: [...options.removedPaths] } : {}),
    };
}

function deriveDirectoryListings(files: Record<string, string>): Record<string, SnapshotDirectoryEntries> {
    const listings = new Map<string, { files: Set<string>; directories: Set<string>; }>();
    const getListing = (directory: string) => {
        let listing = listings.get(directory);
        if (!listing) {
            listing = { files: new Set(), directories: new Set() };
            listings.set(directory, listing);
        }
        return listing;
    };

    for (const inputPath of Object.keys(files)) {
        const filePath = normalizePath(inputPath);
        const fileName = getBaseName(filePath);
        let directory = getDirectory(filePath);
        getListing(directory).files.add(fileName);

        let parent = getDirectory(directory);
        while (parent !== directory) {
            getListing(parent).directories.add(getBaseName(directory));
            directory = parent;
            parent = getDirectory(directory);
        }
    }

    return Object.fromEntries([...listings].map(([directory, listing]) => [directory, {
        files: [...listing.files],
        directories: [...listing.directories],
    }]));
}

function getDirectory(path: string): string {
    const components = getPathComponents(path);
    if (components.length <= 1) return components[0] ?? "";
    components.pop();
    const root = components.shift()!;
    return root + components.join("/");
}

function getBaseName(path: string): string {
    const components = getPathComponents(path);
    return components.at(-1) ?? "";
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
