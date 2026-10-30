import type {
    RootedDirectoryPath,
    RootedFilePath,
    RootedPath,
} from "../ast/index.ts";
import type { Snapshot } from "./async/api.ts";
import { serverFS } from "./fsCallbacks.ts";
import {
    getDefaultExePath,
    nodeProcess,
} from "./nodeProcess.ts";
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
    symlinks: string[] | undefined;
}

export interface FileSystemStat {
    /** POSIX-style file mode, matching Node.js `fs.Stats.mode`. */
    mode: number;
    /** File size in bytes, matching Node.js `fs.Stats.size`. */
    size: number;
    /** Last modification time, matching Node.js `fs.Stats.mtime`. */
    mtime: Date;
}

export { serverFS };

export interface FileSystemCallbacks {
    directoryExists:
        | ((directoryName: RootedDirectoryPath) => boolean | typeof serverFS.useOS | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.error;
    fileExists:
        | ((fileName: RootedFilePath) => boolean | typeof serverFS.useOS | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.error;
    getAccessibleEntries:
        | ((directoryName: RootedDirectoryPath) => FileSystemEntries | typeof serverFS.useOS | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.error;
    /**
     * Read a file's content.
     * - Return the file content as a `string` (including `""` for empty files).
     * - Return `undefined` to indicate the file does not exist.
     * - Return {@link serverFS.useOS} to fall back to the server's operating-system filesystem.
     */
    readFile:
        | ((fileName: RootedFilePath) => string | undefined | typeof serverFS.useOS | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.error;
    /** Relative results are resolved against the queried path's directory by the server. */
    realpath:
        | ((path: RootedPath) => string | typeof serverFS.useOS | typeof serverFS.identity | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.identity
        | typeof serverFS.error;
    stat:
        | ((path: RootedPath) => FileSystemStat | undefined | typeof serverFS.useOS | typeof serverFS.fakeStat | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.fakeStat
        | typeof serverFS.error;
    writeFile:
        | ((path: RootedFilePath, content: string) => void | typeof serverFS.useOS | typeof serverFS.noop | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.noop
        | typeof serverFS.error;
    removeFile:
        | ((path: RootedPath) => void | typeof serverFS.useOS | typeof serverFS.noop | typeof serverFS.error)
        | typeof serverFS.useOS
        | typeof serverFS.noop
        | typeof serverFS.error;
}

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
            defaultLibraryPaths.push(normalizePath(nodeProcess().getBuiltinModule("node:path").dirname(getDefaultExePath())));
        }
        catch {
            // A socket-connected embedded server or a WebAssembly transport can
            // provide bundled libs without a locally installed compiler executable.
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

/**
 * Reuses a snapshot's retained request filesystem without resending its contents.
 * Entries take precedence over the receiving snapshot's filesystem; a full source
 * filesystem remains total. Host and editor contents are not copied.
 * An optional layer or full filesystem is applied over the reused filesystem.
 * The source must remain active until the snapshot operation completes.
 */
export function createFileSystemFromSnapshot(
    snapshot: Pick<Snapshot, "id" | "isDisposed">,
    fileSystem?: RequestFileSystem | undefined,
): RequestFileSystem {
    if (snapshot.isDisposed()) {
        throw new Error("Cannot create a filesystem from a disposed snapshot");
    }
    if (fileSystem?.kind === "snapshot") {
        throw new Error("Only a layer or full filesystem can be applied on top of a snapshot filesystem");
    }
    return { kind: "snapshot", snapshot: snapshot.id, files: {}, fileSystem };
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
