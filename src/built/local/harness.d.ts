/// <reference types="node" />
/// <reference types="chai" />
declare namespace collections {
    interface SortOptions<T> {
        comparer: (a: T, b: T) => number;
        sort: "insertion" | "comparison";
    }
    class SortedMap<K, V> {
        private _comparer;
        private _keys;
        private _values;
        private _order;
        private _version;
        private _copyOnWrite;
        constructor(comparer: ((a: K, b: K) => number) | SortOptions<K>, iterable?: Iterable<[K, V]>);
        readonly size: number;
        readonly comparer: (a: K, b: K) => number;
        readonly [Symbol.toStringTag]: string;
        has(key: K): boolean;
        get(key: K): V | undefined;
        set(key: K, value: V): this;
        delete(key: K): boolean;
        clear(): void;
        forEach(callback: (value: V, key: K, collection: this) => void, thisArg?: any): void;
        keys(): IterableIterator<K>;
        values(): IterableIterator<V>;
        entries(): IterableIterator<[K, V]>;
        [Symbol.iterator](): IterableIterator<[K, V]>;
        private writePreamble;
        private writePostScript;
        private getIterationOrder;
    }
    function insertAt<T>(array: T[], index: number, value: T): void;
    function getIterator<T>(iterable: Iterable<T>): Iterator<T>;
    function nextResult<T>(iterator: Iterator<T>): IteratorResult<T> | undefined;
    function closeIterator<T>(iterator: Iterator<T>): void;
    /**
     * A collection of metadata that supports inheritance.
     */
    class Metadata {
        private static readonly _undefinedValue;
        private _parent;
        private _map;
        private _version;
        private _size;
        private _parentVersion;
        constructor(parent?: Metadata);
        readonly size: number;
        readonly parent: Metadata | undefined;
        has(key: string): boolean;
        get(key: string): any;
        set(key: string, value: any): this;
        delete(key: string): boolean;
        clear(): void;
        forEach(callback: (value: any, key: string, map: this) => void): void;
        private static _escapeKey;
        private static _unescapeKey;
    }
}
/**
 * Common utilities
 */
declare namespace utils {
    function removeTestPathPrefixes(text: string, retainTrailingDirectorySeparator?: boolean): string;
    /**
     * Removes leading indentation from a template literal string.
     */
    function dedent(array: TemplateStringsArray, ...args: any[]): string;
    function toUtf8(text: string): string;
    function getByteOrderMarkLength(text: string): number;
    function removeByteOrderMark(text: string): string;
    function addUTF8ByteOrderMark(text: string): string;
}
declare namespace documents {
    class TextDocument {
        readonly meta: Map<string, string>;
        readonly file: string;
        readonly text: string;
        private _lineStarts;
        private _testFile;
        constructor(file: string, text: string, meta?: Map<string, string>);
        readonly lineStarts: ReadonlyArray<number>;
        static fromTestFile(file: Harness.Compiler.TestFile): TextDocument;
        asTestFile(): Harness.Compiler.TestFile;
    }
    interface RawSourceMap {
        version: number;
        file: string;
        sourceRoot?: string;
        sources: string[];
        sourcesContent?: string[];
        names: string[];
        mappings: string;
    }
    interface Mapping {
        mappingIndex: number;
        emittedLine: number;
        emittedColumn: number;
        sourceIndex: number;
        sourceLine: number;
        sourceColumn: number;
        nameIndex?: number;
    }
    class SourceMap {
        readonly raw: RawSourceMap;
        readonly mapFile: string | undefined;
        readonly version: number;
        readonly file: string;
        readonly sourceRoot: string | undefined;
        readonly sources: ReadonlyArray<string>;
        readonly sourcesContent: ReadonlyArray<string> | undefined;
        readonly mappings: ReadonlyArray<Mapping>;
        readonly names: ReadonlyArray<string> | undefined;
        private static readonly _mappingRegExp;
        private static readonly _sourceMappingURLRegExp;
        private static readonly _dataURLRegExp;
        private static readonly _base64Chars;
        private _emittedLineMappings;
        private _sourceLineMappings;
        constructor(mapFile: string | undefined, data: string | RawSourceMap);
        static getUrl(text: string): string | undefined;
        static fromUrl(url: string): SourceMap | undefined;
        static fromSource(text: string): SourceMap | undefined;
        getMappingsForEmittedLine(emittedLine: number): ReadonlyArray<Mapping> | undefined;
        getMappingsForSourceLine(sourceIndex: number, sourceLine: number): ReadonlyArray<Mapping> | undefined;
        private static _decodeVLQ;
    }
}
declare namespace vpath {
    export import sep = ts.directorySeparator;
    export import normalizeSeparators = ts.normalizeSlashes;
    export import isAbsolute = ts.isRootedDiskPath;
    export import isRoot = ts.isDiskPathRoot;
    export import hasTrailingSeparator = ts.hasTrailingDirectorySeparator;
    export import addTrailingSeparator = ts.ensureTrailingDirectorySeparator;
    export import removeTrailingSeparator = ts.removeTrailingDirectorySeparator;
    export import normalize = ts.normalizePath;
    export import combine = ts.combinePaths;
    export import parse = ts.getPathComponents;
    export import reduce = ts.reducePathComponents;
    export import format = ts.getPathFromPathComponents;
    export import resolve = ts.resolvePath;
    export import compare = ts.comparePaths;
    export import compareCaseSensitive = ts.comparePathsCaseSensitive;
    export import compareCaseInsensitive = ts.comparePathsCaseInsensitive;
    export import dirname = ts.getDirectoryPath;
    export import basename = ts.getBaseFileName;
    export import extname = ts.getAnyExtensionFromPath;
    export import relative = ts.getRelativePathFromDirectory;
    export import beneath = ts.containsPath;
    export import changeExtension = ts.changeAnyExtension;
    export import isTypeScript = ts.hasTypeScriptFileExtension;
    export import isJavaScript = ts.hasJavaScriptFileExtension;
    const enum ValidationFlags {
        None = 0,
        RequireRoot = 1,
        RequireDirname = 2,
        RequireBasename = 4,
        RequireExtname = 8,
        RequireTrailingSeparator = 16,
        AllowRoot = 32,
        AllowDirname = 64,
        AllowBasename = 128,
        AllowExtname = 256,
        AllowTrailingSeparator = 512,
        AllowNavigation = 1024,
        AllowWildcard = 2048,
        /** Path must be a valid directory root */
        Root = 545,
        /** Path must be a absolute */
        Absolute = 2017,
        /** Path may be relative or absolute */
        RelativeOrAbsolute = 2016,
        /** Path may only be a filename */
        Basename = 260
    }
    function validate(path: string, flags?: ValidationFlags): string;
    function isDeclaration(path: string): boolean;
    function isSourceMap(path: string): boolean;
    function isJavaScriptSourceMap(path: string): boolean;
    function isJson(path: string): boolean;
    function isDefaultLibrary(path: string): boolean;
    function isTsConfigFile(path: string): boolean;
}
declare namespace vfs {
    /**
     * Posix-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
     */
    const builtFolder = "/.ts";
    /**
     * Posix-style path to additional mountable folders (./tests/projects in this repo)
     */
    const projectsFolder = "/.projects";
    /**
     * Posix-style path to additional test libraries
     */
    const testLibFolder = "/.lib";
    /**
     * Posix-style path to sources under test
     */
    const srcFolder = "/.src";
    /**
     * Represents a virtual POSIX-like file system.
     */
    class FileSystem {
        /** Indicates whether the file system is case-sensitive (`false`) or case-insensitive (`true`). */
        readonly ignoreCase: boolean;
        /** Gets the comparison function used to compare two paths. */
        readonly stringComparer: (a: string, b: string) => number;
        private _lazy;
        private _cwd;
        private _time;
        private _shadowRoot;
        private _dirStack;
        constructor(ignoreCase: boolean, options?: FileSystemOptions);
        /**
         * Gets metadata for this `FileSystem`.
         */
        readonly meta: collections.Metadata;
        /**
         * Gets a value indicating whether the file system is read-only.
         */
        readonly isReadonly: boolean;
        /**
         * Makes the file system read-only.
         */
        makeReadonly(): this;
        /**
         * Gets the file system shadowed by this file system.
         */
        readonly shadowRoot: FileSystem | undefined;
        /**
         * Gets a shadow copy of this file system. Changes to the shadow copy do not affect the
         * original, allowing multiple copies of the same core file system without multiple copies
         * of the same data.
         */
        shadow(ignoreCase?: boolean): FileSystem;
        /**
         * Gets or sets the timestamp (in milliseconds) used for file status, returning the previous timestamp.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/time.html
         */
        time(value?: number | Date | (() => number | Date)): number;
        /**
         * Gets the metadata object for a path.
         * @param path
         */
        filemeta(path: string): collections.Metadata;
        private _filemeta;
        /**
         * Get the pathname of the current working directory.
         *
         * @link - http://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html
         */
        cwd(): string;
        /**
         * Changes the current working directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html
         */
        chdir(path: string): void;
        /**
         * Pushes the current directory onto the directory stack and changes the current working directory to the supplied path.
         */
        pushd(path?: string): void;
        /**
         * Pops the previous directory from the location stack and changes the current directory to that directory.
         */
        popd(): void;
        /**
         * Update the file system with a set of files.
         */
        apply(files: FileSet): void;
        /**
         * Scan file system entries along a path. If `path` is a symbolic link, it is dereferenced.
         * @param path The path at which to start the scan.
         * @param axis The axis along which to traverse.
         * @param traversal The traversal scheme to use.
         */
        scanSync(path: string, axis: Axis, traversal: Traversal): string[];
        /**
         * Scan file system entries along a path.
         * @param path The path at which to start the scan.
         * @param axis The axis along which to traverse.
         * @param traversal The traversal scheme to use.
         */
        lscanSync(path: string, axis: Axis, traversal: Traversal): string[];
        private _scan;
        /**
         * Mounts a physical or virtual file system at a location in this virtual file system.
         *
         * @param source The path in the physical (or other virtual) file system.
         * @param target The path in this virtual file system.
         * @param resolver An object used to resolve files in `source`.
         */
        mountSync(source: string, target: string, resolver: FileSystemResolver): void;
        /**
         * Recursively remove all files and directories underneath the provided path.
         */
        rimrafSync(path: string): void;
        /**
         * Make a directory and all of its parent paths (if they don't exist).
         */
        mkdirpSync(path: string): void;
        getFileListing(): string;
        /**
         * Print diagnostic information about the structure of the file system to the console.
         */
        debugPrint(): void;
        /**
         * Determines whether a path exists.
         */
        existsSync(path: string): boolean;
        /**
         * Get file status. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        statSync(path: string): Stats;
        /**
         * Change file access times
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        utimesSync(path: string, atime: Date, mtime: Date): void;
        /**
         * Get file status. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        lstatSync(path: string): Stats;
        private _stat;
        /**
         * Read a directory. If `path` is a symbolic link, it is dereferenced.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readdirSync(path: string): string[];
        /**
         * Make a directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        mkdirSync(path: string): void;
        private _mkdir;
        /**
         * Remove a directory.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        rmdirSync(path: string): void;
        /**
         * Link one file to another file (also known as a "hard link").
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        linkSync(oldpath: string, newpath: string): void;
        /**
         * Remove a directory entry.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        unlinkSync(path: string): void;
        /**
         * Rename a file.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        renameSync(oldpath: string, newpath: string): void;
        /**
         * Make a symbolic link.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        symlinkSync(target: string, linkpath: string): void;
        /**
         * Resolve a pathname.
         *
         * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        realpathSync(path: string): string;
        /**
         * Read from a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readFileSync(path: string, encoding?: null): Buffer;
        /**
         * Read from a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readFileSync(path: string, encoding: string): string;
        /**
         * Read from a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        readFileSync(path: string, encoding?: string | null): string | Buffer;
        /**
         * Write to a file.
         *
         * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
         */
        writeFileSync(path: string, data: string | Buffer, encoding?: string | null): void;
        private _mknod;
        private _addLink;
        private _removeLink;
        private _replaceLink;
        private _getRootLinks;
        private _getLinks;
        private _getShadow;
        private _copyShadowLinks;
        private _getSize;
        private _getBuffer;
        /**
         * Walk a path to its end.
         *
         * @param path The path to follow.
         * @param noFollow A value indicating whether to *not* dereference a symbolic link at the
         * end of a path.
         *
         * @link http://man7.org/linux/man-pages/man7/path_resolution.7.html
         */
        private _walk;
        /**
         * Resolve a path relative to the current working directory.
         */
        private _resolve;
        private _applyFiles;
        private _applyFileExtendedOptions;
        private _applyFilesWorker;
        private _normalizeFileSetEntry;
    }
    interface FileSystemOptions {
        time?: number | Date | (() => number | Date);
        files?: FileSet;
        cwd?: string;
        meta?: Record<string, any>;
    }
    interface FileSystemCreateOptions {
        documents?: ReadonlyArray<documents.TextDocument>;
        cwd?: string;
    }
    type Axis = "ancestors" | "ancestors-or-self" | "self" | "descendants-or-self" | "descendants";
    interface Traversal {
        /** A function called to choose whether to continue to traverse to either ancestors or descendants. */
        traverse?(path: string, stats: Stats): boolean;
        /** A function called to choose whether to accept a path as part of the result. */
        accept?(path: string, stats: Stats): boolean;
    }
    interface FileSystemResolver {
        statSync(path: string): {
            mode: number;
            size: number;
        };
        readdirSync(path: string): string[];
        readFileSync(path: string): Buffer;
    }
    interface FileSystemResolverHost {
        useCaseSensitiveFileNames(): boolean;
        getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries;
        directoryExists(path: string): boolean;
        fileExists(path: string): boolean;
        getFileSize(path: string): number;
        readFile(path: string): string | undefined;
        getWorkspaceRoot(): string;
    }
    function createResolver(host: FileSystemResolverHost): FileSystemResolver;
    /**
     * Create a virtual file system from a physical file system using the following path mappings:
     *
     *  - `/.ts` is a directory mapped to `${workspaceRoot}/built/local`
     *  - `/.lib` is a directory mapped to `${workspaceRoot}/tests/lib`
     *  - `/.src` is a virtual directory to be used for tests.
     *
     * Unless overridden, `/.src` will be the current working directory for the virtual file system.
     */
    function createFromFileSystem(host: FileSystemResolverHost, ignoreCase: boolean, { documents, cwd }?: FileSystemCreateOptions): FileSystem;
    class Stats {
        dev: number;
        ino: number;
        mode: number;
        nlink: number;
        uid: number;
        gid: number;
        rdev: number;
        size: number;
        blksize: number;
        blocks: number;
        atimeMs: number;
        mtimeMs: number;
        ctimeMs: number;
        birthtimeMs: number;
        atime: Date;
        mtime: Date;
        ctime: Date;
        birthtime: Date;
        constructor();
        constructor(dev: number, ino: number, mode: number, nlink: number, rdev: number, size: number, blksize: number, blocks: number, atimeMs: number, mtimeMs: number, ctimeMs: number, birthtimeMs: number);
        isFile(): boolean;
        isDirectory(): boolean;
        isSymbolicLink(): boolean;
        isBlockDevice(): boolean;
        isCharacterDevice(): boolean;
        isFIFO(): boolean;
        isSocket(): boolean;
    }
    const IOErrorMessages: Readonly<{
        EACCES: string;
        EIO: string;
        ENOENT: string;
        EEXIST: string;
        ELOOP: string;
        ENOTDIR: string;
        EISDIR: string;
        EBADF: string;
        EINVAL: string;
        ENOTEMPTY: string;
        EPERM: string;
        EROFS: string;
    }>;
    function createIOError(code: keyof typeof IOErrorMessages, details?: string): NodeJS.ErrnoException;
    /**
     * A template used to populate files, directories, links, etc. in a virtual file system.
     */
    interface FileSet {
        [name: string]: DirectoryLike | FileLike | Link | Symlink | Mount | null | undefined;
    }
    type DirectoryLike = FileSet | Directory;
    type FileLike = File | Buffer | string;
    /** Extended options for a directory in a `FileSet` */
    class Directory {
        readonly files: FileSet;
        readonly meta: Record<string, any> | undefined;
        constructor(files: FileSet, { meta }?: {
            meta?: Record<string, any>;
        });
    }
    /** Extended options for a file in a `FileSet` */
    class File {
        readonly data: Buffer | string;
        readonly encoding: string | undefined;
        readonly meta: Record<string, any> | undefined;
        constructor(data: Buffer | string, { meta, encoding }?: {
            encoding?: string;
            meta?: Record<string, any>;
        });
    }
    /** Extended options for a hard link in a `FileSet` */
    class Link {
        readonly path: string;
        constructor(path: string);
    }
    /** Extended options for a symbolic link in a `FileSet` */
    class Symlink {
        readonly symlink: string;
        readonly meta: Record<string, any> | undefined;
        constructor(symlink: string, { meta }?: {
            meta?: Record<string, any>;
        });
    }
    /** Extended options for mounting a virtual copy of an external file system via a `FileSet` */
    class Mount {
        readonly source: string;
        readonly resolver: FileSystemResolver;
        readonly meta: Record<string, any> | undefined;
        constructor(source: string, resolver: FileSystemResolver, { meta }?: {
            meta?: Record<string, any>;
        });
    }
}
/**
 * Test harness compiler functionality.
 */
declare namespace compiler {
    interface Project {
        file: string;
        config?: ts.ParsedCommandLine;
        errors?: ts.Diagnostic[];
    }
    function readProject(host: fakes.ParseConfigHost, project: string | undefined, existingOptions?: ts.CompilerOptions): Project | undefined;
    /**
     * Correlates compilation inputs and outputs
     */
    interface CompilationOutput {
        readonly inputs: ReadonlyArray<documents.TextDocument>;
        readonly js: documents.TextDocument | undefined;
        readonly dts: documents.TextDocument | undefined;
        readonly map: documents.TextDocument | undefined;
    }
    class CompilationResult {
        readonly host: fakes.CompilerHost;
        readonly program: ts.Program | undefined;
        readonly result: ts.EmitResult | undefined;
        readonly options: ts.CompilerOptions;
        readonly diagnostics: ReadonlyArray<ts.Diagnostic>;
        readonly js: ReadonlyMap<string, documents.TextDocument>;
        readonly dts: ReadonlyMap<string, documents.TextDocument>;
        readonly maps: ReadonlyMap<string, documents.TextDocument>;
        private _inputs;
        private _inputsAndOutputs;
        constructor(host: fakes.CompilerHost, options: ts.CompilerOptions, program: ts.Program | undefined, result: ts.EmitResult | undefined, diagnostics: ts.Diagnostic[]);
        readonly vfs: vfs.FileSystem;
        readonly inputs: ReadonlyArray<documents.TextDocument>;
        readonly outputs: ReadonlyArray<documents.TextDocument>;
        readonly traces: ReadonlyArray<string>;
        readonly emitSkipped: boolean;
        readonly singleFile: boolean;
        readonly commonSourceDirectory: string;
        getInputsAndOutputs(path: string): CompilationOutput | undefined;
        getInputs(path: string): ReadonlyArray<documents.TextDocument> | undefined;
        getOutput(path: string, kind: "js" | "dts" | "map"): documents.TextDocument | undefined;
        getSourceMapRecord(): string | undefined;
        getSourceMap(path: string): documents.SourceMap | undefined;
        getOutputPath(path: string, ext: string): string;
        getNumberOfJsFiles(): number;
    }
    function compileFiles(host: fakes.CompilerHost, rootFiles: string[] | undefined, compilerOptions: ts.CompilerOptions): CompilationResult;
}
declare namespace evaluator {
    function evaluateTypeScript(sourceText: string, options?: ts.CompilerOptions, globals?: Record<string, any>): any;
}
/**
 * Fake implementations of various compiler dependencies.
 */
declare namespace fakes {
    interface SystemOptions {
        executingFilePath?: string;
        newLine?: "\r\n" | "\n";
        env?: Record<string, string>;
    }
    /**
     * A fake `ts.System` that leverages a virtual file system.
     */
    class System implements ts.System {
        readonly vfs: vfs.FileSystem;
        readonly args: string[];
        readonly output: string[];
        readonly newLine: string;
        readonly useCaseSensitiveFileNames: boolean;
        exitCode: number | undefined;
        private readonly _executingFilePath;
        private readonly _env;
        constructor(vfs: vfs.FileSystem, { executingFilePath, newLine, env }?: SystemOptions);
        write(message: string): void;
        readFile(path: string): string | undefined;
        writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
        deleteFile(path: string): void;
        fileExists(path: string): boolean;
        directoryExists(path: string): boolean;
        createDirectory(path: string): void;
        getCurrentDirectory(): string;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries;
        exit(exitCode?: number): void;
        getFileSize(path: string): number;
        resolvePath(path: string): string;
        getExecutingFilePath(): string;
        getModifiedTime(path: string): Date;
        setModifiedTime(path: string, time: Date): void;
        createHash(data: string): string;
        realpath(path: string): string;
        getEnvironmentVariable(name: string): string;
        private _getStats;
    }
    /**
     * A fake `ts.ParseConfigHost` that leverages a virtual file system.
     */
    class ParseConfigHost implements ts.ParseConfigHost {
        readonly sys: System;
        constructor(sys: System | vfs.FileSystem);
        readonly vfs: vfs.FileSystem;
        readonly useCaseSensitiveFileNames: boolean;
        fileExists(fileName: string): boolean;
        directoryExists(directoryName: string): boolean;
        readFile(path: string): string | undefined;
        readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[];
    }
    /**
     * A fake `ts.CompilerHost` that leverages a virtual file system.
     */
    class CompilerHost implements ts.CompilerHost {
        readonly sys: System;
        readonly defaultLibLocation: string;
        readonly outputs: documents.TextDocument[];
        private readonly _outputsMap;
        readonly traces: string[];
        readonly shouldAssertInvariants: boolean;
        private _setParentNodes;
        private _sourceFiles;
        private _parseConfigHost;
        private _newLine;
        constructor(sys: System | vfs.FileSystem, options?: ts.CompilerOptions, setParentNodes?: boolean);
        readonly vfs: vfs.FileSystem;
        readonly parseConfigHost: ParseConfigHost;
        getCurrentDirectory(): string;
        useCaseSensitiveFileNames(): boolean;
        getNewLine(): string;
        getCanonicalFileName(fileName: string): string;
        deleteFile(fileName: string): void;
        fileExists(fileName: string): boolean;
        directoryExists(directoryName: string): boolean;
        getModifiedTime(fileName: string): Date;
        setModifiedTime(fileName: string, time: Date): void;
        getDirectories(path: string): string[];
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        readFile(path: string): string | undefined;
        writeFile(fileName: string, content: string, writeByteOrderMark: boolean): void;
        trace(s: string): void;
        realpath(path: string): string;
        getDefaultLibLocation(): string;
        getDefaultLibFileName(options: ts.CompilerOptions): string;
        getSourceFile(fileName: string, languageVersion: number): ts.SourceFile | undefined;
    }
}
declare namespace ts.server {
    interface SessionClientHost extends LanguageServiceHost {
        writeMessage(message: string): void;
    }
    function extractMessage(message: string): string;
    class SessionClient implements LanguageService {
        private host;
        private sequence;
        private lineMaps;
        private messages;
        private lastRenameEntry;
        constructor(host: SessionClientHost);
        onMessage(message: string): void;
        private writeMessage;
        private getLineMap;
        private lineOffsetToPosition;
        private positionToOneBasedLineOffset;
        private convertCodeEditsToTextChange;
        private processRequest;
        private processResponse;
        openFile(file: string, fileContent?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void;
        closeFile(file: string): void;
        changeFile(fileName: string, start: number, end: number, insertString: string): void;
        toLineColumnOffset(fileName: string, position: number): {
            line: number;
            character: number;
        };
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;
        getProjectInfo(file: string, needFileNameList: boolean): protocol.ProjectInfo;
        getCompletionsAtPosition(fileName: string, position: number, _preferences: UserPreferences | undefined): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, _options: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined): CompletionEntryDetails;
        getCompletionEntrySymbol(_fileName: string, _position: number, _entryName: string): Symbol;
        getNavigateToItems(searchValue: string): NavigateToItem[];
        getFormattingEditsForRange(file: string, start: number, end: number, _options: FormatCodeOptions): TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, _options: FormatCodeOptions): TextChange[];
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan;
        getTypeDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getImplementationAtPosition(fileName: string, position: number): ImplementationLocation[];
        findReferences(_fileName: string, _position: number): ReferencedSymbol[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getEmitOutput(_fileName: string): EmitOutput;
        getSyntacticDiagnostics(file: string): DiagnosticWithLocation[];
        getSemanticDiagnostics(file: string): Diagnostic[];
        getSuggestionDiagnostics(file: string): DiagnosticWithLocation[];
        private getDiagnostics;
        getCompilerOptionsDiagnostics(): Diagnostic[];
        getRenameInfo(fileName: string, position: number, findInStrings?: boolean, findInComments?: boolean): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[];
        private decodeNavigationBarItems;
        getNavigationBarItems(file: string): NavigationBarItem[];
        private decodeNavigationTree;
        getNavigationTree(file: string): NavigationTree;
        private decodeSpan;
        getNameOrDottedNameSpan(_fileName: string, _startPos: number, _endPos: number): TextSpan;
        getBreakpointStatementAtPosition(_fileName: string, _position: number): TextSpan;
        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[];
        getOutliningSpans(file: string): OutliningSpan[];
        getTodoComments(_fileName: string, _descriptors: TodoCommentDescriptor[]): TodoComment[];
        getDocCommentTemplateAtPosition(_fileName: string, _position: number): TextInsertion;
        isValidBraceCompletionAtPosition(_fileName: string, _position: number, _openingBrace: number): boolean;
        getJsxClosingTagAtPosition(_fileName: string, _position: number): never;
        getSpanOfEnclosingComment(_fileName: string, _position: number, _onlyMultiLine: boolean): TextSpan;
        getCodeFixesAtPosition(file: string, start: number, end: number, errorCodes: ReadonlyArray<number>): ReadonlyArray<CodeFixAction>;
        getCombinedCodeFix: typeof notImplemented;
        applyCodeActionCommand: typeof notImplemented;
        private createFileLocationOrRangeRequestArgs;
        private createFileLocationRequestArgs;
        private createFileRangeRequestArgs;
        private createFileLocationRequestArgsWithEndLineAndOffset;
        getApplicableRefactors(fileName: string, positionOrRange: number | TextRange): ApplicableRefactorInfo[];
        getEditsForRefactor(fileName: string, _formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string): RefactorEditInfo;
        organizeImports(_scope: OrganizeImportsScope, _formatOptions: FormatCodeSettings): ReadonlyArray<FileTextChanges>;
        getEditsForFileRename(): never;
        private convertCodeEditsToTextChanges;
        private convertChanges;
        convertTextChangeToCodeEdit(change: protocol.CodeEdit, fileName: string): TextChange;
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        getIndentationAtPosition(_fileName: string, _position: number, _options: EditorOptions): number;
        getSyntacticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[];
        getSemanticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[];
        getEncodedSyntacticClassifications(_fileName: string, _span: TextSpan): Classifications;
        getEncodedSemanticClassifications(_fileName: string, _span: TextSpan): Classifications;
        getProgram(): Program;
        getNonBoundSourceFile(_fileName: string): SourceFile;
        getSourceFile(_fileName: string): SourceFile;
        cleanupSemanticCache(): void;
        dispose(): void;
    }
}
declare type TestRunnerKind = CompilerTestKind | FourslashTestKind | "project" | "rwc" | "test262" | "user" | "dt";
declare type CompilerTestKind = "conformance" | "compiler";
declare type FourslashTestKind = "fourslash" | "fourslash-shims" | "fourslash-shims-pp" | "fourslash-server";
declare abstract class RunnerBase {
    tests: (string | Harness.FileBasedTest)[];
    /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
    addTest(fileName: string): void;
    enumerateFiles(folder: string, regex?: RegExp, options?: {
        recursive: boolean;
    }): string[];
    abstract kind(): TestRunnerKind;
    abstract enumerateTestFiles(): (string | Harness.FileBasedTest)[];
    /** The working directory where tests are found. Needed for batch testing where the input path will differ from the output path inside baselines */
    workingDirectory: string;
    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    abstract initializeTests(): void;
    /** Replaces instances of full paths with fileNames only */
    static removeFullPaths(path: string): string;
}
declare namespace Harness.SourceMapRecorder {
    function getSourceMapRecord(sourceMapDataList: ReadonlyArray<ts.SourceMapData>, program: ts.Program, jsFiles: ReadonlyArray<documents.TextDocument>, declarationFiles: ReadonlyArray<documents.TextDocument>): string;
}
declare var _chai: typeof chai;
declare var assert: typeof _chai.assert;
declare var global: NodeJS.Global;
declare var window: {};
declare var XMLHttpRequest: {
    new (): XMLHttpRequest;
};
interface XMLHttpRequest {
    readonly readyState: number;
    readonly responseText: string;
    readonly status: number;
    readonly statusText: string;
    open(method: string, url: string, async?: boolean, user?: string, password?: string): void;
    send(data?: string): void;
    setRequestHeader(header: string, value: string): void;
    getAllResponseHeaders(): string;
    getResponseHeader(header: string): string | null;
    overrideMimeType(mime: string): void;
}
declare namespace Utils {
    const enum ExecutionEnvironment {
        Node = 0,
        Browser = 1
    }
    function getExecutionEnvironment(): ExecutionEnvironment;
    let currentExecutionEnvironment: ExecutionEnvironment;
    function encodeString(s: string): string;
    function byteLength(s: string, encoding?: string): number;
    function evalFile(fileContents: string, fileName: string, nodeContext?: any): void;
    /** Splits the given string on \r\n, or on only \n if that fails, or on only \r if *that* fails. */
    function splitContentByNewlines(content: string): string[];
    /** Reads a file under /tests */
    function readTestFile(path: string): string | undefined;
    function memoize<T extends ts.AnyFunction>(f: T, memoKey: (...anything: any[]) => string): T;
    const canonicalizeForHarness: ts.GetCanonicalFileName;
    function assertInvariants(node: ts.Node | undefined, parent: ts.Node | undefined): void;
    function convertDiagnostics(diagnostics: ReadonlyArray<ts.Diagnostic>): {
        start: number | undefined;
        length: number | undefined;
        messageText: string;
        category: string;
        code: number;
    }[];
    function sourceFileToJSON(file: ts.Node): string;
    function assertDiagnosticsEquals(array1: ReadonlyArray<ts.Diagnostic>, array2: ReadonlyArray<ts.Diagnostic>): void;
    function assertStructuralEquals(node1: ts.Node, node2: ts.Node): void;
    function filterStack(error: Error, stackTraceLimit?: number): Error;
}
declare namespace Harness {
    interface IO {
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
        enumerateTestFiles(runner: RunnerBase): (string | FileBasedTest)[];
        listFiles(path: string, filter?: RegExp, options?: {
            recursive?: boolean;
        }): string[];
        log(text: string): void;
        args(): string[];
        getExecutingFilePath(): string;
        getWorkspaceRoot(): string;
        exit(exitCode?: number): void;
        readDirectory(path: string, extension?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        getAccessibleFileSystemEntries(dirname: string): ts.FileSystemEntries;
        tryEnableSourceMapsForHost?(): void;
        getEnvironmentVariable?(name: string): string;
        getMemoryUsage?(): number | undefined;
    }
    let IO: IO;
    const harnessNewLine = "\r\n";
    const virtualFileSystemRoot = "/";
    function mockHash(s: string): string;
}
declare namespace Harness {
    const libFolder = "built/local/";
    const tcServicesFile: string;
    type SourceMapEmitterCallback = (emittedFile: string, emittedLine: number, emittedColumn: number, sourceFile: string, sourceLine: number, sourceColumn: number, sourceName: string) => void;
    let userSpecifiedRoot: string;
    let lightMode: boolean;
    /** Functionality for compiling TypeScript code */
    namespace Compiler {
        /** Aggregate various writes into a single array of lines. Useful for passing to the
         *  TypeScript compiler to fill with source code or errors.
         */
        class WriterAggregator {
            lines: string[];
            currentLine: string;
            Write(str: string): void;
            WriteLine(str: string): void;
            Close(): void;
            reset(): void;
        }
        function createSourceFileAndAssertInvariants(fileName: string, sourceText: string, languageVersion: ts.ScriptTarget): ts.SourceFile;
        const defaultLibFileName = "lib.d.ts";
        const es2015DefaultLibFileName = "lib.es2015.d.ts";
        function getDefaultLibrarySourceFile(fileName?: string): ts.SourceFile | undefined;
        function getDefaultLibFileName(options: ts.CompilerOptions): string;
        const fourslashFileName = "fourslash.ts";
        let fourslashSourceFile: ts.SourceFile;
        function getCanonicalFileName(fileName: string): string;
        interface HarnessOptions {
            useCaseSensitiveFileNames?: boolean;
            includeBuiltFile?: string;
            baselineFile?: string;
            libFiles?: string;
        }
        function setCompilerOptionsFromHarnessSetting(settings: TestCaseParser.CompilerSettings, options: ts.CompilerOptions & HarnessOptions): void;
        interface TestFile {
            unitName: string;
            content: string;
            fileOptions?: any;
        }
        function compileFiles(inputFiles: TestFile[], otherFiles: TestFile[], harnessSettings: TestCaseParser.CompilerSettings | undefined, compilerOptions: ts.CompilerOptions | undefined, currentDirectory: string | undefined): compiler.CompilationResult;
        interface DeclarationCompilationContext {
            declInputFiles: TestFile[];
            declOtherFiles: TestFile[];
            harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions | undefined;
            options: ts.CompilerOptions;
            currentDirectory: string;
        }
        function prepareDeclarationCompilationContext(inputFiles: ReadonlyArray<TestFile>, otherFiles: ReadonlyArray<TestFile>, result: compiler.CompilationResult, harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions, options: ts.CompilerOptions, currentDirectory: string | undefined): DeclarationCompilationContext | undefined;
        function compileDeclarationFiles(context: DeclarationCompilationContext | undefined): {
            declInputFiles: TestFile[];
            declOtherFiles: TestFile[];
            declResult: compiler.CompilationResult;
        } | undefined;
        function minimalDiagnosticsToString(diagnostics: ReadonlyArray<ts.Diagnostic>, pretty?: boolean): string;
        function getErrorBaseline(inputFiles: ReadonlyArray<TestFile>, diagnostics: ReadonlyArray<ts.Diagnostic>, pretty?: boolean): string;
        const diagnosticSummaryMarker = "__diagnosticSummary";
        const globalErrorsMarker = "__globalErrors";
        function iterateErrorBaseline(inputFiles: ReadonlyArray<TestFile>, diagnostics: ReadonlyArray<ts.Diagnostic>, options?: {
            pretty?: boolean;
            caseSensitive?: boolean;
            currentDirectory?: string;
        }): IterableIterator<[string, string, number]>;
        function doErrorBaseline(baselinePath: string, inputFiles: ReadonlyArray<TestFile>, errors: ReadonlyArray<ts.Diagnostic>, pretty?: boolean): void;
        function doTypeAndSymbolBaseline(baselinePath: string, program: ts.Program, allFiles: {
            unitName: string;
            content: string;
        }[], opts?: Baseline.BaselineOptions, multifile?: boolean, skipTypeBaselines?: boolean, skipSymbolBaselines?: boolean): void;
        function doSourcemapBaseline(baselinePath: string, options: ts.CompilerOptions, result: compiler.CompilationResult, harnessSettings: TestCaseParser.CompilerSettings): void;
        function doJsEmitBaseline(baselinePath: string, header: string, options: ts.CompilerOptions, result: compiler.CompilationResult, tsConfigFiles: ReadonlyArray<TestFile>, toBeCompiled: ReadonlyArray<TestFile>, otherFiles: ReadonlyArray<TestFile>, harnessSettings: TestCaseParser.CompilerSettings): void;
        function collateOutputs(outputFiles: ReadonlyArray<documents.TextDocument>): string;
        function iterateOutputs(outputFiles: Iterable<documents.TextDocument>): IterableIterator<[string, string]>;
        function sanitizeTestFilePath(name: string): string;
    }
    interface FileBasedTest {
        file: string;
        configurations?: FileBasedTestConfiguration[];
    }
    interface FileBasedTestConfiguration {
        [key: string]: string;
    }
    /**
     * Compute FileBasedTestConfiguration variations based on a supplied list of variable settings.
     */
    function getFileBasedTestConfigurations(settings: TestCaseParser.CompilerSettings, varyBy: string[]): FileBasedTestConfiguration[] | undefined;
    /**
     * Compute a description for this configuration based on its entries
     */
    function getFileBasedTestConfigurationDescription(configuration: FileBasedTestConfiguration): string;
    namespace TestCaseParser {
        /** all the necessary information to set the right compiler settings */
        interface CompilerSettings {
            [name: string]: string;
        }
        /** All the necessary information to turn a multi file test into useful units for later compilation */
        interface TestUnitData {
            content: string;
            name: string;
            fileOptions: any;
            originalFilePath: string;
            references: string[];
        }
        function extractCompilerSettings(content: string): CompilerSettings;
        interface TestCaseContent {
            settings: CompilerSettings;
            testUnitData: TestUnitData[];
            tsConfig: ts.ParsedCommandLine | undefined;
            tsConfigFileUnitData: TestUnitData | undefined;
        }
        /** Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance */
        function makeUnitsFromTest(code: string, fileName: string, rootDir?: string, settings?: CompilerSettings): TestCaseContent;
    }
    /** Support class for baseline files */
    namespace Baseline {
        interface BaselineOptions {
            Subfolder?: string;
            Baselinefolder?: string;
        }
        function localPath(fileName: string, baselineFolder?: string, subfolder?: string): string;
        function runBaseline(relativeFileName: string, generateContent: () => string | null, opts?: BaselineOptions): void;
        function runMultifileBaseline(relativeFileBase: string, extension: string, generateContent: () => IterableIterator<[string, string, number]> | IterableIterator<[string, string]> | null, opts?: BaselineOptions, referencedExtensions?: string[]): void;
    }
    function isDefaultLibraryFile(filePath: string): boolean;
    function isBuiltFile(filePath: string): boolean;
    function getDefaultLibraryFile(filePath: string, io: IO): Compiler.TestFile;
    function getConfigNameFromFileName(filename: string): "tsconfig.json" | "jsconfig.json" | undefined;
}
declare namespace Harness.LanguageService {
    class ScriptInfo {
        fileName: string;
        content: string;
        isRootFile: boolean;
        version: number;
        editRanges: {
            length: number;
            textChangeRange: ts.TextChangeRange;
        }[];
        private lineMap;
        constructor(fileName: string, content: string, isRootFile: boolean);
        private setContent;
        getLineMap(): number[];
        updateContent(content: string): void;
        editContent(start: number, end: number, newText: string): void;
        getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange;
    }
    class DefaultHostCancellationToken implements ts.HostCancellationToken {
        static readonly instance: DefaultHostCancellationToken;
        isCancellationRequested(): boolean;
    }
    interface LanguageServiceAdapter {
        getHost(): LanguageServiceAdapterHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    }
    abstract class LanguageServiceAdapterHost {
        protected cancellationToken: DefaultHostCancellationToken;
        protected settings: ts.CompilerOptions;
        readonly sys: fakes.System;
        typesRegistry: ts.Map<void> | undefined;
        private scriptInfos;
        constructor(cancellationToken?: DefaultHostCancellationToken, settings?: ts.CompilerOptions);
        readonly vfs: vfs.FileSystem;
        getNewLine(): string;
        getFilenames(): string[];
        getScriptInfo(fileName: string): ScriptInfo | undefined;
        addScript(fileName: string, content: string, isRootFile: boolean): void;
        editScript(fileName: string, start: number, end: number, newText: string): void;
        openFile(_fileName: string, _content?: string, _scriptKindName?: string): void;
        /**
         * @param line 0 based index
         * @param col 0 based index
         */
        positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter;
    }
    class NativeLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceHost, LanguageServiceAdapterHost {
        isKnownTypesPackageName(name: string): boolean;
        installPackage: typeof ts.notImplemented;
        getCompilationSettings(): ts.CompilerOptions;
        getCancellationToken(): DefaultHostCancellationToken;
        getDirectories(path: string): string[];
        getCurrentDirectory(): string;
        getDefaultLibFileName(): string;
        getScriptFileNames(): string[];
        getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined;
        getScriptKind(): ts.ScriptKind;
        getScriptVersion(fileName: string): string;
        directoryExists(dirName: string): boolean;
        fileExists(fileName: string): boolean;
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        readFile(path: string): string | undefined;
        realpath(path: string): string;
        getTypeRootsVersion(): number;
        log: typeof ts.noop;
        trace: typeof ts.noop;
        error: typeof ts.noop;
    }
    class NativeLanguageServiceAdapter implements LanguageServiceAdapter {
        private host;
        constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getHost(): LanguageServiceAdapterHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    }
    class ShimLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceShimHost, ts.CoreServicesShimHost {
        private nativeHost;
        getModuleResolutionsForFile: (fileName: string) => string;
        getTypeReferenceDirectiveResolutionsForFile: (fileName: string) => string;
        constructor(preprocessToResolve: boolean, cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getFilenames(): string[];
        getScriptInfo(fileName: string): ScriptInfo | undefined;
        addScript(fileName: string, content: string, isRootFile: boolean): void;
        editScript(fileName: string, start: number, end: number, newText: string): void;
        positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter;
        getCompilationSettings(): string;
        getCancellationToken(): ts.HostCancellationToken;
        getCurrentDirectory(): string;
        getDirectories(path: string): string;
        getDefaultLibFileName(): string;
        getScriptFileNames(): string;
        getScriptSnapshot(fileName: string): ts.ScriptSnapshotShim;
        getScriptKind(): ts.ScriptKind;
        getScriptVersion(fileName: string): string;
        getLocalizedDiagnosticMessages(): string;
        readDirectory: typeof ts.notImplemented;
        readDirectoryNames: typeof ts.notImplemented;
        readFileNames: typeof ts.notImplemented;
        fileExists(fileName: string): boolean;
        readFile(fileName: string): string | undefined;
        log(s: string): void;
        trace(s: string): void;
        error(s: string): void;
        directoryExists(): boolean;
    }
    class ShimLanguageServiceAdapter implements LanguageServiceAdapter {
        private host;
        private factory;
        constructor(preprocessToResolve: boolean, cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getHost(): ShimLanguageServiceHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    }
    class SessionClientHost extends NativeLanguageServiceHost implements ts.server.SessionClientHost {
        private client;
        constructor(cancellationToken: ts.HostCancellationToken | undefined, settings: ts.CompilerOptions | undefined);
        onMessage: typeof ts.noop;
        writeMessage: typeof ts.noop;
        setClient(client: ts.server.SessionClient): void;
        openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void;
        editScript(fileName: string, start: number, end: number, newText: string): void;
    }
    class ServerLanguageServiceAdapter implements LanguageServiceAdapter {
        private host;
        private client;
        constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
        getHost(): SessionClientHost;
        getLanguageService(): ts.LanguageService;
        getClassifier(): ts.Classifier;
        getPreProcessedFileInfo(): ts.PreProcessedFileInfo;
    }
}
declare namespace ts.TestFSWithWatch {
    const libFile: File;
    const safeList: {
        path: Path;
        content: string;
    };
    interface TestServerHostCreationParameters {
        useCaseSensitiveFileNames?: boolean;
        executingFilePath?: string;
        currentDirectory?: string;
        newLine?: string;
        useWindowsStylePaths?: boolean;
        environmentVariables?: Map<string>;
    }
    function createWatchedSystem(fileOrFolderList: ReadonlyArray<FileOrFolderOrSymLink>, params?: TestServerHostCreationParameters): TestServerHost;
    function createServerHost(fileOrFolderList: ReadonlyArray<FileOrFolderOrSymLink>, params?: TestServerHostCreationParameters): TestServerHost;
    interface File {
        path: string;
        content: string;
        fileSize?: number;
    }
    interface Folder {
        path: string;
    }
    interface SymLink {
        path: string;
        symLink: string;
    }
    type FileOrFolderOrSymLink = File | Folder | SymLink;
    function verifyMapSize(caption: string, map: Map<any>, expectedKeys: ReadonlyArray<string>): void;
    function checkMultiMapKeyCount(caption: string, actual: MultiMap<any>, expectedKeys: ReadonlyMap<number>): void;
    function checkMultiMapKeyCount(caption: string, actual: MultiMap<any>, expectedKeys: ReadonlyArray<string>, eachKeyCount: number): void;
    function checkArray(caption: string, actual: ReadonlyArray<string>, expected: ReadonlyArray<string>): void;
    function checkWatchedFiles(host: TestServerHost, expectedFiles: string[]): void;
    function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: ReadonlyMap<number>): void;
    function checkWatchedFilesDetailed(host: TestServerHost, expectedFiles: ReadonlyArray<string>, eachFileWatchCount: number): void;
    function checkWatchedDirectories(host: TestServerHost, expectedDirectories: string[], recursive: boolean): void;
    function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: ReadonlyMap<number>, recursive: boolean): void;
    function checkWatchedDirectoriesDetailed(host: TestServerHost, expectedDirectories: ReadonlyArray<string>, eachDirectoryWatchCount: number, recursive: boolean): void;
    function checkOutputContains(host: TestServerHost, expected: ReadonlyArray<string>): void;
    function checkOutputDoesNotContain(host: TestServerHost, expectedToBeAbsent: string[] | ReadonlyArray<string>): void;
    type TimeOutCallback = () => any;
    interface TestFileWatcher {
        cb: FileWatcherCallback;
        fileName: string;
    }
    interface TestDirectoryWatcher {
        cb: DirectoryWatcherCallback;
        directoryName: string;
    }
    interface ReloadWatchInvokeOptions {
        /** Invokes the directory watcher for the parent instead of the file changed */
        invokeDirectoryWatcherInsteadOfFileChanged: boolean;
        /** When new file is created, do not invoke watches for it */
        ignoreWatchInvokedWithTriggerAsFileCreate: boolean;
        /** Invoke the file delete, followed by create instead of file changed */
        invokeFileDeleteCreateAsPartInsteadOfChange: boolean;
    }
    enum Tsc_WatchDirectory {
        WatchFile = "RecursiveDirectoryUsingFsWatchFile",
        NonRecursiveWatchDirectory = "RecursiveDirectoryUsingNonRecursiveWatchDirectory",
        DynamicPolling = "RecursiveDirectoryUsingDynamicPriorityPolling"
    }
    class TestServerHost implements server.ServerHost, FormatDiagnosticsHost, ModuleResolutionHost {
        withSafeList: boolean;
        useCaseSensitiveFileNames: boolean;
        readonly newLine: string;
        readonly useWindowsStylePath?: boolean | undefined;
        private readonly environmentVariables?;
        args: string[];
        private readonly output;
        private fs;
        private time;
        getCanonicalFileName: (s: string) => string;
        private toPath;
        private timeoutCallbacks;
        private immediateCallbacks;
        readonly screenClears: number[];
        readonly watchedDirectories: MultiMap<TestDirectoryWatcher>;
        readonly watchedDirectoriesRecursive: MultiMap<TestDirectoryWatcher>;
        readonly watchedFiles: MultiMap<TestFileWatcher>;
        private readonly executingFilePath;
        private readonly currentDirectory;
        private readonly dynamicPriorityWatchFile;
        private readonly customRecursiveWatchDirectory;
        constructor(withSafeList: boolean, useCaseSensitiveFileNames: boolean, executingFilePath: string, currentDirectory: string, fileOrFolderorSymLinkList: ReadonlyArray<FileOrFolderOrSymLink>, newLine?: string, useWindowsStylePath?: boolean | undefined, environmentVariables?: Map<string> | undefined);
        getNewLine(): string;
        toNormalizedAbsolutePath(s: string): string;
        toFullPath(s: string): Path;
        getHostSpecificPath(s: string): string;
        private now;
        reloadFS(fileOrFolderOrSymLinkList: ReadonlyArray<FileOrFolderOrSymLink>, options?: Partial<ReloadWatchInvokeOptions>): void;
        modifyFile(filePath: string, content: string, options?: Partial<ReloadWatchInvokeOptions>): void;
        renameFolder(folderName: string, newFolderName: string): void;
        private renameFolderEntries;
        ensureFileOrFolder(fileOrDirectoryOrSymLink: FileOrFolderOrSymLink, ignoreWatchInvokedWithTriggerAsFileCreate?: boolean): void;
        private ensureFolder;
        private addFileOrFolderInFolder;
        private removeFileOrFolder;
        removeFolder(folderPath: string, recursive?: boolean): void;
        invokeWatchedDirectoriesCallback(folderFullPath: string, relativePath: string): void;
        invokeWatchedDirectoriesRecursiveCallback(folderFullPath: string, relativePath: string): void;
        invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind, useFileNameInCallback?: boolean): void;
        private getRelativePathToDirectory;
        /**
         * This will call the directory watcher for the folderFullPath and recursive directory watchers for this and base folders
         */
        private invokeDirectoryWatcher;
        private directoryCallback;
        /**
         * This will call the recursive directory watcher for this directory as well as all the base directories
         */
        private invokeRecursiveDirectoryWatcher;
        private toFsEntry;
        private toFsFile;
        private toFsSymLink;
        private toFsFolder;
        private getRealFsEntry;
        private isFsFile;
        private getRealFile;
        private isFsFolder;
        private getRealFolder;
        fileExists(s: string): boolean;
        getModifiedTime(s: string): Date;
        readFile(s: string): string | undefined;
        getFileSize(s: string): number;
        directoryExists(s: string): boolean;
        getDirectories(s: string): string[];
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        watchDirectory(directoryName: string, cb: DirectoryWatcherCallback, recursive: boolean): FileWatcher;
        createHash(s: string): string;
        createSHA256Hash(s: string): string;
        watchFile(fileName: string, cb: FileWatcherCallback, pollingInterval: number): FileWatcher;
        setTimeout(callback: TimeOutCallback, _time: number, ...args: any[]): number;
        getNextTimeoutId(): number;
        clearTimeout(timeoutId: any): void;
        clearScreen(): void;
        checkTimeoutQueueLengthAndRun(expected: number): void;
        checkTimeoutQueueLength(expected: number): void;
        runQueuedTimeoutCallbacks(timeoutId?: number): void;
        runQueuedImmediateCallbacks(checkCount?: number): void;
        setImmediate(callback: TimeOutCallback, _time: number, ...args: any[]): number;
        clearImmediate(timeoutId: any): void;
        createDirectory(directoryName: string): void;
        writeFile(path: string, content: string): void;
        write(message: string): void;
        getOutput(): ReadonlyArray<string>;
        clearOutput(): void;
        realpath(s: string): string;
        readonly exitMessage: string;
        exitCode: number | undefined;
        readonly resolvePath: (s: string) => string;
        readonly getExecutingFilePath: () => string;
        readonly getCurrentDirectory: () => string;
        exit(exitCode?: number): void;
        getEnvironmentVariable(name: string): string;
    }
}
declare namespace FourSlash {
    import ArrayOrSingle = FourSlashInterface.ArrayOrSingle;
    const enum FourSlashTestType {
        Native = 0,
        Shims = 1,
        ShimsWithPreprocess = 2,
        Server = 3
    }
    interface FourSlashFile {
        content: string;
        fileName: string;
        symlinks?: string[];
        version: number;
        fileOptions: Harness.TestCaseParser.CompilerSettings;
    }
    interface FourSlashData {
        globalOptions: Harness.TestCaseParser.CompilerSettings;
        files: FourSlashFile[];
        markerPositions: ts.Map<Marker>;
        markers: Marker[];
        /**
         * Inserted in source files by surrounding desired text
         * in a range with `[|` and `|]`. For example,
         *
         * [|text in range|]
         *
         * is a range with `text in range` "selected".
         */
        ranges: Range[];
    }
    interface Marker {
        fileName: string;
        position: number;
        data?: {};
    }
    interface Range {
        fileName: string;
        pos: number;
        end: number;
        marker?: Marker;
    }
    interface TextSpan {
        start: number;
        end: number;
    }
    class TestCancellationToken implements ts.HostCancellationToken {
        private static readonly notCanceled;
        private numberOfCallsBeforeCancellation;
        isCancellationRequested(): boolean;
        setCancelled(numberOfCalls?: number): void;
        resetCancelled(): void;
    }
    function verifyOperationIsCancelled(f: () => void): void;
    class TestState {
        private basePath;
        private testType;
        testData: FourSlashData;
        private languageServiceAdapterHost;
        private languageService;
        private cancellationToken;
        currentCaretPosition: number;
        selectionEnd: number;
        lastKnownMarker: string;
        activeFile: FourSlashFile;
        enableFormatting: boolean;
        formatCodeSettings: ts.FormatCodeSettings;
        private inputFiles;
        private static getDisplayPartsJson;
        private addMatchedInputFile;
        private getLanguageServiceAdapter;
        constructor(basePath: string, testType: FourSlashTestType, testData: FourSlashData);
        private getFileContent;
        goToMarker(name?: string | Marker): void;
        goToEachMarker(markers: ReadonlyArray<Marker>, action: (marker: Marker, index: number) => void): void;
        goToEachRange(action: () => void): void;
        markerName(m: Marker): string;
        goToPosition(pos: number): void;
        select(startMarker: string, endMarker: string): void;
        selectRange(range: Range): void;
        moveCaretRight(count?: number): void;
        openFile(indexOrName: number | string, content?: string, scriptKindName?: string): void;
        verifyErrorExistsBetweenMarkers(startMarkerName: string, endMarkerName: string, shouldExist: boolean): void;
        private raiseError;
        private messageAtLastKnownMarker;
        private assertionMessageAtLastKnownMarker;
        private getDiagnostics;
        private getAllDiagnostics;
        verifyErrorExistsAfterMarker(markerName: string, shouldExist: boolean, after: boolean): void;
        private anyErrorInRange;
        private printErrorLog;
        private formatRange;
        private formatLineAndCharacterOfPosition;
        private formatPosition;
        verifyNoErrors(): void;
        verifyNumberOfErrorsInCurrentFile(expected: number): void;
        verifyEval(expr: string, value: any): void;
        verifyGoToDefinitionIs(endMarker: ArrayOrSingle<string>): void;
        verifyGoToDefinition(arg0: any, endMarkerNames?: ArrayOrSingle<string>): void;
        private getGoToDefinition;
        private getGoToDefinitionAndBoundSpan;
        verifyGoToType(arg0: any, endMarkerNames?: ArrayOrSingle<string>): void;
        private verifyGoToX;
        private verifyGoToXPlain;
        verifyGoToDefinitionForMarkers(markerNames: string[]): void;
        private verifyGoToXSingle;
        private verifyGoToXWorker;
        private verifyDefinitionTextSpan;
        verifyGetEmitOutputForCurrentFile(expected: string): void;
        verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void;
        verifyCompletionListCount(expectedCount: number, negative: boolean): void;
        verifyCompletionListItemsCountIsGreaterThan(count: number, negative: boolean): void;
        verifyCompletionListStartsWithItemsInOrder(items: string[]): void;
        noItemsWithSameNameButDifferentKind(): void;
        verifyCompletionListIsEmpty(negative: boolean): void;
        verifyCompletionListAllowsNewIdentifier(negative: boolean): void;
        verifyCompletionListIsGlobal(expected: boolean): void;
        verifyCompletions(options: FourSlashInterface.VerifyCompletionsOptions): void;
        private verifyCompletionsWorker;
        private verifyCompletionEntry;
        private verifyCompletionsAreExactly;
        verifyCompletionsAt(markerName: string | ReadonlyArray<string>, expected: ReadonlyArray<FourSlashInterface.ExpectedCompletionEntry>, options?: FourSlashInterface.CompletionsAtOptions): void;
        verifyCompletionListContains(entryId: ts.Completions.CompletionEntryIdentifier, text?: string, documentation?: string, kind?: string | {
            kind?: string;
            kindModifiers?: string;
        }, spanIndex?: number, hasAction?: boolean, options?: FourSlashInterface.VerifyCompletionListContainsOptions): void;
        /**
         * Verify that the completion list does NOT contain the given symbol.
         * The symbol is considered matched with the symbol in the list if and only if all given parameters must matched.
         * When any parameter is omitted, the parameter is ignored during comparison and assumed that the parameter with
         * that property of the symbol in the list.
         * @param symbol the name of symbol
         * @param expectedText the text associated with the symbol
         * @param expectedDocumentation the documentation text associated with the symbol
         * @param expectedKind the kind of symbol (see ScriptElementKind)
         * @param spanIndex the index of the range that the completion item's replacement text span should match
         */
        verifyCompletionListDoesNotContain(entryId: ts.Completions.CompletionEntryIdentifier, expectedText?: string, expectedDocumentation?: string, expectedKind?: string | {
            kind?: string;
            kindModifiers?: string;
        }, spanIndex?: number, options?: FourSlashInterface.CompletionsAtOptions): void;
        verifyCompletionEntryDetails(entryName: string, expectedText: string, expectedDocumentation?: string, kind?: string, tags?: ts.JSDocTagInfo[]): void;
        /** Use `getProgram` instead of accessing this directly. */
        private _program;
        /** Use `getChecker` instead of accessing this directly. */
        private _checker;
        private getProgram;
        private getChecker;
        private getSourceFile;
        private getNode;
        private goToAndGetNode;
        private verifyRange;
        private verifySymbol;
        verifySymbolAtLocation(startRange: Range, declarationRanges: Range[]): void;
        symbolsInScope(range: Range): ts.Symbol[];
        setTypesRegistry(map: ts.MapLike<void>): void;
        verifyTypeOfSymbolAtLocation(range: Range, symbol: ts.Symbol, expected: string): void;
        private verifyDocumentHighlightsRespectFilesList;
        verifyReferenceGroups(starts: ArrayOrSingle<string> | ArrayOrSingle<Range>, parts: ReadonlyArray<FourSlashInterface.ReferenceGroup>): void;
        verifyNoReferences(markerNameOrRange?: string | Range): void;
        verifyGetReferencesForServerTest(expected: ReadonlyArray<ts.ReferenceEntry>): void;
        verifySingleReferenceGroup(definition: FourSlashInterface.ReferenceGroupDefinition, ranges?: Range[]): void;
        private assertObjectsEqual;
        verifyDisplayPartsOfReferencedSymbol(expected: ts.SymbolDisplayPart[]): void;
        private getCompletionListAtCaret;
        private getCompletionEntryDetails;
        private getReferencesAtCaret;
        private findReferencesAtCaret;
        getSyntacticDiagnostics(expected: ReadonlyArray<FourSlashInterface.Diagnostic>): void;
        getSemanticDiagnostics(expected: ReadonlyArray<FourSlashInterface.Diagnostic>): void;
        getSuggestionDiagnostics(expected: ReadonlyArray<FourSlashInterface.Diagnostic>): void;
        private testDiagnostics;
        verifyQuickInfoAt(markerName: string, expectedText: string, expectedDocumentation?: string): void;
        verifyQuickInfos(namesAndTexts: {
            [name: string]: string | [string, string];
        }): void;
        verifyQuickInfoString(expectedText: string, expectedDocumentation?: string): void;
        verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]): void;
        verifyRangesAreRenameLocations(options?: Range[] | {
            findInStrings?: boolean;
            findInComments?: boolean;
            ranges?: Range[];
        }): void;
        verifyRenameLocations(startRanges: ArrayOrSingle<Range>, options: Range[] | {
            findInStrings?: boolean;
            findInComments?: boolean;
            ranges: Range[];
        }): void;
        verifyQuickInfoExists(negative: boolean): void;
        verifyNoSignatureHelp(markers: ReadonlyArray<string>): void;
        verifySignatureHelp(optionses: ReadonlyArray<FourSlashInterface.VerifySignatureHelpOptions>): void;
        private verifySignatureHelpWorker;
        private validate;
        verifyRenameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string): void;
        verifyRenameInfoFailed(message?: string): void;
        private alignmentForExtraInfo;
        private spanInfoToString;
        private baselineCurrentFileLocations;
        getBreakpointStatementLocation(pos: number): ts.TextSpan | undefined;
        baselineCurrentFileBreakpointLocations(): void;
        baselineGetEmitOutput(insertResultsIntoVfs?: boolean): void;
        baselineQuickInfo(): void;
        printBreakpointLocation(pos: number): void;
        printBreakpointAtCurrentLocation(): void;
        printCurrentParameterHelp(): void;
        printCurrentQuickInfo(): void;
        printErrorList(): void;
        printCurrentFileState(showWhitespace: boolean, makeCaretVisible: boolean): void;
        printCurrentSignatureHelp(): void;
        private getSignatureHelp;
        printCompletionListMembers(preferences: ts.UserPreferences | undefined): void;
        private printMembersOrCompletions;
        printContext(): void;
        deleteChar(count?: number): void;
        replace(start: number, length: number, text: string): void;
        deleteCharBehindMarker(count?: number): void;
        type(text: string, highFidelity?: boolean): void;
        paste(text: string): void;
        private checkPostEditInvariants;
        /**
         * @returns The number of characters added to the file as a result of the edits.
         * May be negative.
         */
        private applyEdits;
        copyFormatOptions(): ts.FormatCodeSettings;
        setFormatOptions(formatCodeOptions: ts.FormatCodeOptions | ts.FormatCodeSettings): ts.FormatCodeSettings;
        formatDocument(): void;
        formatSelection(start: number, end: number): void;
        formatOnType(pos: number, key: string): void;
        private editScriptAndUpdateMarkers;
        private removeWhitespace;
        goToBOF(): void;
        goToEOF(): void;
        goToRangeStart({ fileName, pos }: Range): void;
        goToTypeDefinition(definitionIndex: number): void;
        verifyTypeDefinitionsCount(negative: boolean, expectedCount: number): void;
        verifyImplementationListIsEmpty(negative: boolean): void;
        verifyGoToDefinitionName(expectedName: string, expectedContainerName: string): void;
        goToImplementation(): void;
        verifyRangesInImplementationList(markerName: string): void;
        getMarkers(): Marker[];
        getMarkerNames(): string[];
        getRanges(): Range[];
        rangesByText(): ts.Map<Range[]>;
        private rangeText;
        verifyCaretAtMarker(markerName?: string): void;
        private getIndentation;
        verifyIndentationAtCurrentPosition(numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
        verifyIndentationAtPosition(fileName: string, position: number, numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
        verifyCurrentLineContent(text: string): void;
        verifyCurrentFileContent(text: string): void;
        private verifyFileContent;
        verifyTextAtCaretIs(text: string): void;
        verifyCurrentNameOrDottedNameSpanText(text: string): undefined;
        private getNameOrDottedNameSpan;
        baselineCurrentFileNameOrDottedNameSpans(): void;
        printNameOrDottedNameSpans(pos: number): void;
        private verifyClassifications;
        verifyProjectInfo(expected: string[]): void;
        verifySemanticClassifications(expected: {
            classificationType: string;
            text: string;
        }[]): void;
        verifySyntacticClassifications(expected: {
            classificationType: string;
            text: string;
        }[]): void;
        printOutliningSpans(): void;
        verifyOutliningSpans(spans: Range[], kind?: "comment" | "region" | "code" | "imports"): void;
        verifyTodoComments(descriptors: string[], spans: Range[]): void;
        /**
         * Finds and applies a code action corresponding to the supplied parameters.
         * If index is undefined, applies the unique code action available.
         * @param errorCode The error code that generated the code action.
         * @param index The nth (0-index-based) codeaction available generated by errorCode.
         */
        getAndApplyCodeActions(errorCode?: number, index?: number): void;
        applyCodeActionFromCompletion(markerName: string, options: FourSlashInterface.VerifyCompletionActionOptions): void;
        verifyRangeIs(expectedText: string, includeWhiteSpace?: boolean): void;
        /**
         * Compares expected text to the text that would be in the sole range
         * (ie: [|...|]) in the file after applying the codefix sole codefix
         * in the source file.
         */
        verifyRangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void;
        verifyCodeFixAll({ fixId, fixAllDescription, newFileContent, commands: expectedCommands }: FourSlashInterface.VerifyCodeFixAllOptions): void;
        /**
         * Applies fixes for the errors in fileName and compares the results to
         * expectedContents after all fixes have been applied.
         *
         * Note: applying one codefix may generate another (eg: remove duplicate implements
         * may generate an extends -> interface conversion fix).
         * @param expectedContents The contents of the file after the fixes are applied.
         * @param fileName The file to check. If not supplied, the current open file is used.
         */
        verifyFileAfterCodeFix(expectedContents: string, fileName?: string): void;
        verifyCodeFix(options: FourSlashInterface.VerifyCodeFixOptions): void;
        private verifyNewContent;
        /**
         * Rerieves a codefix satisfying the parameters, or undefined if no such codefix is found.
         * @param fileName Path to file where error should be retrieved from.
         */
        private getCodeFixes;
        private applyCodeActions;
        private applyChanges;
        verifyImportFixAtPosition(expectedTextArray: string[], errorCode: number | undefined, preferences: ts.UserPreferences | undefined): void;
        verifyDocCommentTemplate(expected: ts.TextInsertion | undefined): void;
        verifyBraceCompletionAtPosition(negative: boolean, openingBrace: string): void;
        verifyJsxClosingTag(map: {
            [markerName: string]: ts.JsxClosingTagInfo | undefined;
        }): void;
        verifyMatchingBracePosition(bracePosition: number, expectedMatchPosition: number): void;
        verifyNoMatchingBracePosition(bracePosition: number): void;
        verifySpanOfEnclosingComment(negative: boolean, onlyMultiLineDiverges?: boolean): void;
        verifyNavigationItemsCount(expected: number, searchValue: string, matchKind?: string, fileName?: string): void;
        verifyNavigationItemsListContains(name: string, kind: string, searchValue: string, matchKind: string, fileName?: string, parentName?: string): void;
        verifyNavigationBar(json: any, options: {
            checkSpans?: boolean;
        } | undefined): void;
        verifyNavigationTree(json: any, options: {
            checkSpans?: boolean;
        } | undefined): void;
        private verifyNavigationTreeOrBar;
        printNavigationItems(searchValue: string): void;
        printNavigationBar(): void;
        private getOccurrencesAtCurrentPosition;
        verifyOccurrencesAtPositionListContains(fileName: string, start: number, end: number, isWriteAccess?: boolean): undefined;
        verifyOccurrencesAtPositionListCount(expectedCount: number): void;
        private getDocumentHighlightsAtCurrentPosition;
        verifyRangesAreOccurrences(isWriteAccess?: boolean): void;
        verifyRangesWithSameTextAreRenameLocations(): void;
        verifyRangesWithSameTextAreDocumentHighlights(): void;
        verifyDocumentHighlightsOf(startRange: Range, ranges: Range[], options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined): void;
        verifyRangesAreDocumentHighlights(ranges: Range[] | undefined, options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined): void;
        verifyNoDocumentHighlights(startRange: Range): void;
        private verifyDocumentHighlights;
        verifyCodeFixAvailable(negative: boolean, expected: FourSlashInterface.VerifyCodeFixAvailableOptions[] | undefined): void;
        verifyApplicableRefactorAvailableAtMarker(negative: boolean, markerName: string): void;
        private getSelection;
        verifyRefactorAvailable(negative: boolean, name: string, actionName?: string): void;
        verifyRefactor({ name, actionName, refactors }: FourSlashInterface.VerifyRefactorOptions): void;
        verifyApplicableRefactorAvailableForRange(negative: boolean): void;
        applyRefactor({ refactorName, actionName, actionDescription, newContent: newContentWithRenameMarker }: FourSlashInterface.ApplyRefactorOptions): void;
        noMoveToNewFile(): void;
        moveToNewFile(options: FourSlashInterface.MoveToNewFileOptions): void;
        private testNewFileContents;
        verifyFileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void;
        printAvailableCodeFixes(): void;
        private getCurrentLineContent;
        private assertItemInCompletionList;
        private findFile;
        private getLineColStringAtPosition;
        private getTextSpanForRangeAtIndex;
        getMarkerByName(markerName: string): Marker;
        setCancelled(numberOfCalls: number): void;
        resetCancelled(): void;
        private static textSpansEqual;
        getEditsForFileRename(options: FourSlashInterface.GetEditsForFileRenameOptions): void;
        private getApplicableRefactors;
    }
    function runFourSlashTest(basePath: string, testType: FourSlashTestType, fileName: string): void;
    function runFourSlashTestContent(basePath: string, testType: FourSlashTestType, content: string, fileName: string): void;
}
declare namespace FourSlashInterface {
    class Test {
        private state;
        constructor(state: FourSlash.TestState);
        markers(): FourSlash.Marker[];
        markerNames(): string[];
        marker(name: string): FourSlash.Marker;
        markerName(m: FourSlash.Marker): string;
        ranges(): FourSlash.Range[];
        spans(): ts.TextSpan[];
        rangesByText(): ts.Map<FourSlash.Range[]>;
        markerByName(s: string): FourSlash.Marker;
        symbolsInScope(range: FourSlash.Range): ts.Symbol[];
        setTypesRegistry(map: ts.MapLike<void>): void;
    }
    class GoTo {
        private state;
        constructor(state: FourSlash.TestState);
        marker(name?: string | FourSlash.Marker): void;
        eachMarker(markers: ReadonlyArray<string>, action: (marker: FourSlash.Marker, index: number) => void): void;
        eachMarker(action: (marker: FourSlash.Marker, index: number) => void): void;
        rangeStart(range: FourSlash.Range): void;
        eachRange(action: () => void): void;
        bof(): void;
        eof(): void;
        implementation(): void;
        position(position: number, fileNameOrIndex?: string | number): void;
        file(indexOrName: number | string, content?: string, scriptKindName?: string): void;
        select(startMarker: string, endMarker: string): void;
        selectRange(range: FourSlash.Range): void;
    }
    class VerifyNegatable {
        protected state: FourSlash.TestState;
        private negative;
        not: VerifyNegatable;
        allowedClassElementKeywords: string[];
        allowedConstructorParameterKeywords: string[];
        constructor(state: FourSlash.TestState, negative?: boolean);
        completionListCount(expectedCount: number): void;
        completionListContains(entryId: string | ts.Completions.CompletionEntryIdentifier, text?: string, documentation?: string, kind?: string | {
            kind?: string;
            kindModifiers?: string;
        }, spanIndex?: number, hasAction?: boolean, options?: VerifyCompletionListContainsOptions): void;
        completionListItemsCountIsGreaterThan(count: number): void;
        assertHasRanges(ranges: FourSlash.Range[]): void;
        completionListIsEmpty(): void;
        completionListContainsClassElementKeywords(): void;
        completionListContainsConstructorParameterKeywords(): void;
        completionListIsGlobal(expected: boolean): void;
        completionListAllowsNewIdentifier(): void;
        noSignatureHelp(...markers: string[]): void;
        signatureHelp(...options: VerifySignatureHelpOptions[]): void;
        errorExistsBetweenMarkers(startMarker: string, endMarker: string): void;
        errorExistsAfterMarker(markerName?: string): void;
        errorExistsBeforeMarker(markerName?: string): void;
        quickInfoExists(): void;
        typeDefinitionCountIs(expectedCount: number): void;
        implementationListIsEmpty(): void;
        isValidBraceCompletionAtPosition(openingBrace: string): void;
        jsxClosingTag(map: {
            [markerName: string]: ts.JsxClosingTagInfo | undefined;
        }): void;
        isInCommentAtPosition(onlyMultiLineDiverges?: boolean): void;
        codeFix(options: VerifyCodeFixOptions): void;
        codeFixAvailable(options?: VerifyCodeFixAvailableOptions[]): void;
        applicableRefactorAvailableAtMarker(markerName: string): void;
        applicableRefactorAvailableForRange(): void;
        refactor(options: VerifyRefactorOptions): void;
        refactorAvailable(name: string, actionName?: string): void;
    }
    class Verify extends VerifyNegatable {
        constructor(state: FourSlash.TestState);
        completionsAt(markerName: ArrayOrSingle<string>, completions: ReadonlyArray<ExpectedCompletionEntry>, options?: CompletionsAtOptions): void;
        completions(...optionsArray: VerifyCompletionsOptions[]): void;
        quickInfoIs(expectedText: string, expectedDocumentation?: string): void;
        quickInfoAt(markerName: string, expectedText: string, expectedDocumentation?: string): void;
        quickInfos(namesAndTexts: {
            [name: string]: string;
        }): void;
        caretAtMarker(markerName?: string): void;
        indentationIs(numberOfSpaces: number): void;
        indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
        textAtCaretIs(text: string): void;
        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        eval(expr: string, value: any): void;
        currentLineContentIs(text: string): void;
        currentFileContentIs(text: string): void;
        goToDefinitionIs(endMarkers: ArrayOrSingle<string>): void;
        goToDefinition(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>, range?: FourSlash.Range): void;
        goToDefinition(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | {
            [startMarkerName: string]: ArrayOrSingle<string>;
        }): void;
        goToType(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>): void;
        goToType(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | {
            [startMarkerName: string]: ArrayOrSingle<string>;
        }): void;
        goToDefinitionForMarkers(...markerNames: string[]): void;
        goToDefinitionName(name: string, containerName: string): void;
        verifyGetEmitOutputForCurrentFile(expected: string): void;
        verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void;
        symbolAtLocation(startRange: FourSlash.Range, ...declarationRanges: FourSlash.Range[]): void;
        typeOfSymbolAtLocation(range: FourSlash.Range, symbol: ts.Symbol, expected: string): void;
        referenceGroups(starts: ArrayOrSingle<string> | ArrayOrSingle<FourSlash.Range>, parts: ReferenceGroup[]): void;
        noReferences(markerNameOrRange?: string | FourSlash.Range): void;
        getReferencesForServerTest(expected: ReadonlyArray<ts.ReferenceEntry>): void;
        singleReferenceGroup(definition: ReferenceGroupDefinition, ranges?: FourSlash.Range[]): void;
        findReferencesDefinitionDisplayPartsAtCaretAre(expected: ts.SymbolDisplayPart[]): void;
        noErrors(): void;
        numberOfErrorsInCurrentFile(expected: number): void;
        baselineCurrentFileBreakpointLocations(): void;
        baselineCurrentFileNameOrDottedNameSpans(): void;
        baselineGetEmitOutput(insertResultsIntoVfs?: boolean): void;
        baselineQuickInfo(): void;
        nameOrDottedNameSpanTextIs(text: string): void;
        outliningSpansInCurrentFile(spans: FourSlash.Range[], kind?: "comment" | "region" | "code" | "imports"): void;
        todoCommentsInCurrentFile(descriptors: string[]): void;
        matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number): void;
        noMatchingBracePositionInCurrentFile(bracePosition: number): void;
        docCommentTemplateAt(marker: string | FourSlash.Marker, expectedOffset: number, expectedText: string): void;
        noDocCommentTemplateAt(marker: string | FourSlash.Marker): void;
        rangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void;
        codeFixAll(options: VerifyCodeFixAllOptions): void;
        fileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void;
        rangeIs(expectedText: string, includeWhiteSpace?: boolean): void;
        getAndApplyCodeFix(errorCode?: number, index?: number): void;
        applyCodeActionFromCompletion(markerName: string, options: VerifyCompletionActionOptions): void;
        importFixAtPosition(expectedTextArray: string[], errorCode?: number, preferences?: ts.UserPreferences): void;
        navigationBar(json: any, options?: {
            checkSpans?: boolean;
        }): void;
        navigationTree(json: any, options?: {
            checkSpans?: boolean;
        }): void;
        navigationItemsListCount(count: number, searchValue: string, matchKind?: string, fileName?: string): void;
        navigationItemsListContains(name: string, kind: string, searchValue: string, matchKind: string, fileName?: string, parentName?: string): void;
        occurrencesAtPositionContains(range: FourSlash.Range, isWriteAccess?: boolean): void;
        occurrencesAtPositionCount(expectedCount: number): void;
        rangesAreOccurrences(isWriteAccess?: boolean): void;
        rangesWithSameTextAreRenameLocations(): void;
        rangesAreRenameLocations(options?: FourSlash.Range[] | {
            findInStrings?: boolean;
            findInComments?: boolean;
            ranges?: FourSlash.Range[];
        }): void;
        rangesAreDocumentHighlights(ranges?: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions): void;
        rangesWithSameTextAreDocumentHighlights(): void;
        documentHighlightsOf(startRange: FourSlash.Range, ranges: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions): void;
        noDocumentHighlights(startRange: FourSlash.Range): void;
        completionEntryDetailIs(entryName: string, text: string, documentation?: string, kind?: string, tags?: ts.JSDocTagInfo[]): void;
        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        syntacticClassificationsAre(...classifications: {
            classificationType: string;
            text: string;
        }[]): void;
        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        semanticClassificationsAre(...classifications: Classification[]): void;
        renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string): void;
        renameInfoFailed(message?: string): void;
        renameLocations(startRanges: ArrayOrSingle<FourSlash.Range>, options: FourSlash.Range[] | {
            findInStrings?: boolean;
            findInComments?: boolean;
            ranges: FourSlash.Range[];
        }): void;
        verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: FourSlash.TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]): void;
        getSyntacticDiagnostics(expected: ReadonlyArray<Diagnostic>): void;
        getSemanticDiagnostics(expected: ReadonlyArray<Diagnostic>): void;
        getSuggestionDiagnostics(expected: ReadonlyArray<Diagnostic>): void;
        ProjectInfo(expected: string[]): void;
        allRangesAppearInImplementationList(markerName: string): void;
        getEditsForFileRename(options: GetEditsForFileRenameOptions): void;
        moveToNewFile(options: MoveToNewFileOptions): void;
        noMoveToNewFile(): void;
    }
    class Edit {
        private state;
        constructor(state: FourSlash.TestState);
        backspace(count?: number): void;
        deleteAtCaret(times?: number): void;
        replace(start: number, length: number, text: string): void;
        paste(text: string): void;
        insert(text: string): void;
        insertLine(text: string): void;
        insertLines(...lines: string[]): void;
        moveRight(count?: number): void;
        moveLeft(count?: number): void;
        enableFormatting(): void;
        disableFormatting(): void;
        applyRefactor(options: ApplyRefactorOptions): void;
    }
    class Debug {
        private state;
        constructor(state: FourSlash.TestState);
        printCurrentParameterHelp(): void;
        printCurrentFileState(): void;
        printCurrentFileStateWithWhitespace(): void;
        printCurrentFileStateWithoutCaret(): void;
        printCurrentQuickInfo(): void;
        printCurrentSignatureHelp(): void;
        printCompletionListMembers(options: ts.UserPreferences | undefined): void;
        printAvailableCodeFixes(): void;
        printBreakpointLocation(pos: number): void;
        printBreakpointAtCurrentLocation(): void;
        printNameOrDottedNameSpans(pos: number): void;
        printErrorList(): void;
        printNavigationItems(searchValue?: string): void;
        printNavigationBar(): void;
        printContext(): void;
        printOutliningSpans(): void;
    }
    class Format {
        private state;
        constructor(state: FourSlash.TestState);
        document(): void;
        copyFormatOptions(): ts.FormatCodeSettings;
        setFormatOptions(options: ts.FormatCodeOptions): ts.FormatCodeSettings;
        selection(startMarker: string, endMarker: string): void;
        onType(posMarker: string, key: string): void;
        setOption(name: keyof ts.FormatCodeSettings, value: number | string | boolean): void;
    }
    class Cancellation {
        private state;
        constructor(state: FourSlash.TestState);
        resetCancelled(): void;
        setCancelled(numberOfCalls?: number): void;
    }
    interface Classification {
        classificationType: ts.ClassificationTypeNames;
        text: string;
        textSpan?: FourSlash.TextSpan;
    }
    namespace Classification {
        function comment(text: string, position?: number): Classification;
        function identifier(text: string, position?: number): Classification;
        function keyword(text: string, position?: number): Classification;
        function numericLiteral(text: string, position?: number): Classification;
        function operator(text: string, position?: number): Classification;
        function stringLiteral(text: string, position?: number): Classification;
        function whiteSpace(text: string, position?: number): Classification;
        function text(text: string, position?: number): Classification;
        function punctuation(text: string, position?: number): Classification;
        function docCommentTagName(text: string, position?: number): Classification;
        function className(text: string, position?: number): Classification;
        function enumName(text: string, position?: number): Classification;
        function interfaceName(text: string, position?: number): Classification;
        function moduleName(text: string, position?: number): Classification;
        function typeParameterName(text: string, position?: number): Classification;
        function parameterName(text: string, position?: number): Classification;
        function typeAliasName(text: string, position?: number): Classification;
        function jsxOpenTagName(text: string, position?: number): Classification;
        function jsxCloseTagName(text: string, position?: number): Classification;
        function jsxSelfClosingTagName(text: string, position?: number): Classification;
        function jsxAttribute(text: string, position?: number): Classification;
        function jsxText(text: string, position?: number): Classification;
        function jsxAttributeStringLiteralValue(text: string, position?: number): Classification;
    }
    interface ReferenceGroup {
        definition: ReferenceGroupDefinition;
        ranges: FourSlash.Range[];
    }
    type ReferenceGroupDefinition = string | {
        text: string;
        range: FourSlash.Range;
    };
    interface ApplyRefactorOptions {
        refactorName: string;
        actionName: string;
        actionDescription: string;
        newContent: string;
    }
    type ExpectedCompletionEntry = string | {
        readonly name: string;
        readonly insertText?: string;
        readonly replacementSpan?: FourSlash.Range;
        readonly hasAction?: boolean;
        readonly isRecommended?: boolean;
        readonly kind?: string;
        readonly text: string;
        readonly documentation: string;
        readonly sourceDisplay?: string;
    };
    interface CompletionsAtOptions extends Partial<ts.UserPreferences> {
        triggerCharacter?: ts.CompletionsTriggerCharacter;
        isNewIdentifierLocation?: boolean;
    }
    interface VerifyCompletionsOptions {
        readonly marker?: ArrayOrSingle<string>;
        readonly isNewIdentifierLocation?: boolean;
        readonly exact?: ArrayOrSingle<ExpectedCompletionEntry>;
        readonly includes?: ArrayOrSingle<ExpectedCompletionEntry>;
        readonly excludes?: ArrayOrSingle<string | {
            readonly name: string;
            readonly source: string;
        }>;
        readonly preferences?: ts.UserPreferences;
        readonly triggerCharacter?: ts.CompletionsTriggerCharacter;
    }
    interface VerifySignatureHelpOptions {
        readonly marker?: ArrayOrSingle<string>;
        /** @default 1 */
        readonly overloadsCount?: number;
        /** @default undefined */
        readonly docComment?: string;
        readonly text?: string;
        readonly parameterName?: string;
        readonly parameterSpan?: string;
        /** @default undefined */
        readonly parameterDocComment?: string;
        readonly parameterCount?: number;
        readonly argumentCount?: number;
        /** @default false */
        readonly isVariadic?: boolean;
        /** @default ts.emptyArray */
        readonly tags?: ReadonlyArray<ts.JSDocTagInfo>;
    }
    type ArrayOrSingle<T> = T | ReadonlyArray<T>;
    interface VerifyCompletionListContainsOptions extends ts.UserPreferences {
        triggerCharacter?: ts.CompletionsTriggerCharacter;
        sourceDisplay: string;
        isRecommended?: true;
        insertText?: string;
        replacementSpan?: FourSlash.Range;
    }
    interface VerifyDocumentHighlightsOptions {
        filesToSearch?: ReadonlyArray<string>;
    }
    interface NewContentOptions {
        newFileContent?: string | {
            readonly [filename: string]: string;
        };
        newRangeContent?: string;
    }
    interface VerifyCodeFixOptions extends NewContentOptions {
        description: string;
        errorCode?: number;
        index?: number;
        preferences?: ts.UserPreferences;
    }
    interface VerifyCodeFixAvailableOptions {
        description: string;
        commands?: ts.CodeActionCommand[];
    }
    interface VerifyCodeFixAllOptions {
        fixId: string;
        fixAllDescription: string;
        newFileContent: string;
        commands: ReadonlyArray<{}>;
    }
    interface VerifyRefactorOptions {
        name: string;
        actionName: string;
        refactors: ts.ApplicableRefactorInfo[];
    }
    interface VerifyCompletionActionOptions extends NewContentOptions {
        name: string;
        source?: string;
        description: string;
        preferences?: ts.UserPreferences;
    }
    interface Diagnostic {
        message: string;
        range?: FourSlash.Range;
        code: number;
        reportsUnnecessary?: true;
    }
    interface GetEditsForFileRenameOptions {
        readonly oldPath: string;
        readonly newPath: string;
        readonly newFileContents: {
            readonly [fileName: string]: string;
        };
    }
    interface MoveToNewFileOptions {
        readonly newFileContents: {
            readonly [fileName: string]: string;
        };
        readonly preferences?: ts.UserPreferences;
    }
}
interface TypeWriterTypeResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    type: string;
}
interface TypeWriterSymbolResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol: string;
}
interface TypeWriterResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol?: string;
    type?: string;
}
declare class TypeWriterWalker {
    private program;
    currentSourceFile: ts.SourceFile;
    private checker;
    constructor(program: ts.Program, fullTypeCheck: boolean);
    getSymbols(fileName: string): IterableIterator<TypeWriterSymbolResult>;
    getTypes(fileName: string): IterableIterator<TypeWriterTypeResult>;
    private visitNode;
    private writeTypeOrSymbol;
}
interface FileInformation {
    contents?: string;
    contentsPath?: string;
    codepage: number;
    bom?: string;
}
interface FindFileResult {
}
interface IoLogFile {
    path: string;
    codepage: number;
    result?: FileInformation;
}
interface IoLog {
    timestamp: string;
    arguments: string[];
    executingPath: string;
    currentDirectory: string;
    useCustomLibraryFile?: boolean;
    filesRead: IoLogFile[];
    filesWritten: {
        path: string;
        contents?: string;
        contentsPath?: string;
        bom: boolean;
    }[];
    filesDeleted: string[];
    filesAppended: {
        path: string;
        contents?: string;
        contentsPath?: string;
    }[];
    fileExists: {
        path: string;
        result?: boolean;
    }[];
    filesFound: {
        path: string;
        pattern: string;
        result?: FindFileResult;
    }[];
    dirs: {
        path: string;
        re: string;
        re_m: boolean;
        re_g: boolean;
        re_i: boolean;
        opts: {
            recursive?: boolean;
        };
        result?: string[];
    }[];
    dirExists: {
        path: string;
        result?: boolean;
    }[];
    dirsCreated: string[];
    pathsResolved: {
        path: string;
        result?: string;
    }[];
    directoriesRead: {
        path: string;
        extensions: ReadonlyArray<string> | undefined;
        exclude: ReadonlyArray<string> | undefined;
        include: ReadonlyArray<string> | undefined;
        depth: number | undefined;
        result: ReadonlyArray<string>;
    }[];
    useCaseSensitiveFileNames?: boolean;
}
interface PlaybackControl {
    startReplayFromFile(logFileName: string): void;
    startReplayFromString(logContents: string): void;
    startReplayFromData(log: IoLog): void;
    endReplay(): void;
    startRecord(logFileName: string): void;
    endRecord(): void;
}
declare namespace Playback {
    interface PlaybackIO extends Harness.IO, PlaybackControl {
    }
    interface PlaybackSystem extends ts.System, PlaybackControl {
    }
    function newStyleLogIntoOldStyleLog(log: IoLog, host: ts.System | Harness.IO, baseName: string): IoLog;
    function oldStyleLogIntoNewStyleLog(log: IoLog, writeFile: typeof Harness.IO.writeFile, baseTestName: string): IoLog;
    function wrapIO(underlying: Harness.IO): PlaybackIO;
    function wrapSystem(underlying: ts.System): PlaybackSystem;
}
