import getExePath from "#getExePath";
import { dirname } from "node:path";
import { normalizePath } from "./path.ts";
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
    /** Names from `files` or `directories` that are symbolic links. */
    symlinks?: string[] | undefined;
}

export interface FileSystemStat {
    /** POSIX-style file mode, matching Node.js `fs.Stats.mode`. */
    mode: number;
    /** File size in bytes, matching Node.js `fs.Stats.size`. */
    size: number;
    /** Last modification time, matching Node.js `fs.Stats.mtime`. */
    mtime: Date;
}

const useOS: unique symbol = Symbol("useOS");
const identity: unique symbol = Symbol("identity");
const fakeStat: unique symbol = Symbol("fakeStat");

export const serverFS: {
    /** Delegate the configured operation, or the current callback invocation, to the server's operating-system filesystem. */
    readonly useOS: typeof useOS;
    /** Use the input path as its own real path without consulting a filesystem. Valid only for `realpath`. */
    readonly identity: typeof identity;
    /** Synthesize stat information from `directoryExists` and `fileExists`. Valid only for `stat`. */
    readonly fakeStat: typeof fakeStat;
} = {
    useOS: useOS,
    identity: identity,
    fakeStat: fakeStat,
};

export interface FileSystemCallbacks {
    directoryExists: ((directoryName: string) => boolean | typeof serverFS.useOS) | typeof serverFS.useOS;
    fileExists: ((fileName: string) => boolean | typeof serverFS.useOS) | typeof serverFS.useOS;
    getAccessibleEntries: ((directoryName: string) => FileSystemEntries | typeof serverFS.useOS) | typeof serverFS.useOS;
    /**
     * Read a file's content.
     * - Return the file content as a `string` (including `""` for empty files).
     * - Return `null` to indicate the file does not exist (without falling back to the real FS).
     * - Return {@link serverFS.useOS} to fall back to the server's operating-system filesystem.
     */
    readFile: ((fileName: string) => string | null | typeof serverFS.useOS) | typeof serverFS.useOS;
    realpath: ((path: string) => string | typeof serverFS.useOS) | typeof serverFS.useOS | typeof serverFS.identity;
    stat: ((path: string) => FileSystemStat | null | typeof serverFS.useOS) | typeof serverFS.useOS | typeof serverFS.fakeStat;
    writeFile: ((path: string, content: string) => void | typeof serverFS.useOS) | typeof serverFS.useOS;
}

/** The callback names supported by the Go server for virtual FS delegation. */
export const fsCallbackNames = ["readFile", "fileExists", "directoryExists", "getAccessibleEntries", "realpath", "stat", "writeFile"] as const;

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
