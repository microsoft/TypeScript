import getExePath from "#getExePath";
import { dirname } from "node:path";
import {
    createGetCanonicalFileName,
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

export interface CreateVirtualFileSystemOptions {
    useCaseSensitiveFileNames?: boolean;
}

/**
 * Files supplied to a request filesystem. String identifiers are file names;
 * use `{ uri }` when supplying a document URI so it can be decoded correctly.
 */
export type RequestFileEntries = readonly (readonly [id: DocumentIdentifier, content: string])[];

/** Creates a full request filesystem, deriving directory listings when omitted. */
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
    const directories = options.directories ?? (kind === "full" ? deriveDirectoryListings(fileRecord) : undefined);
    return {
        kind,
        files: fileRecord,
        directories,
        symlinks: options.symlinks,
        removedPaths: options.removedPaths?.length ? [...options.removedPaths] : undefined,
    };
}

function deriveDirectoryListings(files: Record<string, string>): Record<string, RequestDirectoryEntries> {
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
    name: string;
    children: Record<string, VNode>;
}

interface VFile {
    type: "file";
    name: string;
}

type VNode = VDirectory | VFile;

function createVDirectory(name: string): VDirectory {
    return {
        type: "directory",
        name,
        children: Object.create(null) as Record<string, VNode>,
    };
}

export function createVirtualFileSystem(
    files: Record<string, string>,
    options: CreateVirtualFileSystemOptions = {},
): FileSystem {
    const getCanonicalFileName = createGetCanonicalFileName(options.useCaseSensitiveFileNames !== false);
    const root = createVDirectory("");
    const content = new Map<string, string>();

    for (const [filePath, data] of Object.entries(files)) {
        const key = getCanonicalFileName(filePath);
        if (content.has(key)) {
            throw new Error(`Duplicate virtual filesystem path: ${filePath}`);
        }
        content.set(key, data);
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

    function getSegmentKey(segment: string): string {
        return getCanonicalFileName(segment);
    }

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
            const child: VNode = current.children[getSegmentKey(segment)];
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
            const key = getSegmentKey(segment);
            if (!current.children[key]) {
                current.children[key] = createVDirectory(segment);
            }
            else if (current.children[key].type !== "directory") {
                throw new Error(`Cannot create directory: a file already exists at "/${segments.join("/")}"`);
            }
            current = current.children[key] as VDirectory;
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
        const key = getSegmentKey(filename);
        const existing = dirNode.children[key];
        dirNode.children[key] = { type: "file", name: existing?.name ?? filename };
    }

    function writeFile(path: string, data: string): void {
        content.set(getCanonicalFileName(path), data);
        addToTree(path);
    }

    function removeFile(path: string): void {
        content.delete(getCanonicalFileName(path));
        const segments = getPathComponents(path).slice(1);
        if (segments.length === 0) return;
        const filename = segments.pop()!;
        const dirNode = getNodeFromPath("/" + segments.join("/"));
        if (dirNode && dirNode.type === "directory") {
            delete dirNode.children[getSegmentKey(filename)];
        }
    }

    function directoryExists(directoryName: string): boolean {
        const node = getNodeFromPath(directoryName);
        return !!node && node.type === "directory";
    }

    function fileExists(fileName: string): boolean {
        return content.has(getCanonicalFileName(fileName));
    }

    function getAccessibleEntries(directoryName: string): FileSystemEntries | undefined {
        const node = getNodeFromPath(directoryName);
        if (!node || node.type !== "directory") {
            return undefined;
        }
        const fileEntries: string[] = [];
        const directories: string[] = [];
        for (const child of Object.values(node.children)) {
            if (child.type === "file") {
                fileEntries.push(child.name);
            }
            else {
                directories.push(child.name);
            }
        }
        return { files: fileEntries, directories };
    }

    function readFile(fileName: string): string | undefined {
        return content.get(getCanonicalFileName(fileName));
    }
}
