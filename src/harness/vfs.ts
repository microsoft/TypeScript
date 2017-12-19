/// <reference path="../compiler/commandLineParser.ts"/>
/// <reference path="./harness.ts" />
/// <reference path="./core.ts" />
/// <reference path="./events.ts" />
/// <reference path="./vpath.ts" />
/// <reference path="./documents.ts" />

// NOTE: The contents of this file are all exported from the namespace 'vfs'. This is to
//       support the eventual conversion of harness into a modular system.

namespace vfs {
    // file mode flags used for computing Stats
    const S_IFMT = 0xf000; // file type flags mask
    const S_IFLNK = 0xa000; // symbolic link
    const S_IFREG = 0x8000; // regular file
    const S_IFDIR = 0x4000; // regular directory

    export interface PathMappings {
        [path: string]: string;
    }

    export interface FileSystemResolver {
        getEntries(dir: VirtualDirectory): { files: string[], directories: string[] };
        getContent(file: VirtualFile): string | undefined;
    }

    export type ContentResolver = FileSystemResolver["getContent"];

    function identityMapper(path: string) { return path; }

    function createMapper(ignoreCase: boolean, map: PathMappings | undefined) {
        if (!map) return identityMapper;
        const roots = Object.keys(map);
        const patterns = roots.map(root => createPattern(root, ignoreCase));
        return (path: string) => {
            for (let i = 0; i < patterns.length; i++) {
                const match = patterns[i].exec(path);
                if (match) {
                    const prefix = path.slice(0, match.index);
                    const suffix = path.slice(match.index + match[0].length);
                    return vpath.combine(prefix, map[roots[i]], suffix);
                }
            }
            return path;
        };
    }

    const reservedCharacterRegExp = /[^\w\s\/]/g;

    function escapeRegExp(pattern: string) {
        return pattern.replace(reservedCharacterRegExp, match => "\\" + match);
    }

    function createPattern(path: string, ignoreCase: boolean) {
        path = vpath.normalizeSeparators(path);
        const components = vpath.parse(path);
        let pattern = "";
        for (let i = 1; i < components.length; i++) {
            const component = components[i];
            if (pattern) pattern += "/";
            pattern += escapeRegExp(component);
        }
        pattern = (components[0] ? "^" + escapeRegExp(components[0]) : "/") + pattern + "(/|$)";
        return new RegExp(pattern, ignoreCase ? "i" : "");
    }

    export function createResolver(io: Harness.IO, map?: PathMappings): FileSystemResolver {
        const mapper = createMapper(!io.useCaseSensitiveFileNames(), map);
        return {
            getEntries(dir) {
                return io.getAccessibleFileSystemEntries(mapper(dir.path));
            },
            getContent(file) {
                return io.readFile(mapper(file.path));
            }
        };
    }

    export type Axis = "ancestors" | "ancestors-or-self" | "self" | "descendents-or-self" | "descendents";
    export type FileSystemChange = "added" | "modified" | "removed";
    export type VirtualEntry = VirtualFile | VirtualDirectory;
    export type VirtualSymlink = VirtualFileSymlink | VirtualDirectorySymlink;

    type VirtualEntryView = VirtualFileView | VirtualDirectoryView;

    interface FileWatcherEntry {
        watcher: (path: string, change: FileSystemChange) => void;
    }

    interface DirectoryWatcherEntryArray extends Array<DirectoryWatcherEntry> {
        recursiveCount?: number;
        nonRecursiveCount?: number;
    }

    interface DirectoryWatcherEntry {
        watcher: (path: string) => void;
        recursive: boolean;
    }

    export abstract class VirtualFileSystemObject extends events.EventEmitter {
        private _readonly = false;

        /**
         * Gets a value indicating whether this entry is read-only.
         */
        public get isReadOnly(): boolean {
            return this._readonly;
        }

        public makeReadOnly(): void {
            this.makeReadOnlyCore();
            this._readonly = true;
        }

        protected abstract makeReadOnlyCore(): void;

        protected writePreamble(): void {
            if (this._readonly) throw new Error("Cannot modify a frozen entry.");
        }
    }

    export class VirtualFileSystem extends VirtualFileSystemObject {
        public watchFiles = true;
        public watchDirectories = true;

        private static _builtLocal: VirtualFileSystem | undefined;
        private static _builtLocalCI: VirtualFileSystem | undefined;
        private static _builtLocalCS: VirtualFileSystem | undefined;

        private _root: VirtualRoot;
        private _useCaseSensitiveFileNames: boolean;
        private _currentDirectory: string;
        private _currentDirectoryStack: string[] | undefined;
        private _shadowRoot: VirtualFileSystem | undefined;
        private _watchedFiles: core.KeyedCollection<string, FileWatcherEntry[]> | undefined;
        private _watchedFilesSet: core.SortedSet<string> | undefined;
        private _watchedDirectories: core.KeyedCollection<string, DirectoryWatcherEntryArray> | undefined;
        private _watchedRecursiveDirectoriesSet: core.SortedSet<string> | undefined;
        private _watchedNonRecursiveDirectoriesSet: core.SortedSet<string> | undefined;
        private _stringComparer: ts.Comparer<string> | undefined;
        private _pathComparer: ts.Comparer<string> | undefined;
        private _metadata: core.Metadata;
        private _onRootFileSystemChange: (path: string, change: FileSystemChange) => void;

        constructor(currentDirectory: string, useCaseSensitiveFileNames: boolean) {
            super();
            this._currentDirectory = currentDirectory.replace(/\\/g, "/");
            this._useCaseSensitiveFileNames = useCaseSensitiveFileNames;
            this._onRootFileSystemChange = (path, change) => this.onRootFileSystemChange(path, change);
        }

        public get stringComparer() {
            return this._stringComparer || (this._stringComparer = this.useCaseSensitiveFileNames
                ? core.compareStringsCaseSensitive
                : core.compareStringsCaseInsensitive);
        }

        public get pathComparer() {
            return this._pathComparer || (this._pathComparer = this.useCaseSensitiveFileNames
                ? vpath.compareCaseSensitive
                : vpath.compareCaseInsensitive);
        }

        public get watchedFiles(): ReadonlySet<string> {
            return this.watchedFilesSetPrivate;
        }

        public get watchedRecursiveDirectories(): ReadonlySet<string> {
            return this.watchedRecursiveDirectoriesSetPrivate;
        }

        public get watchedNonRecursiveDirectories(): ReadonlySet<string> {
            return this.watchedNonRecursiveDirectoriesSetPrivate;
        }

        /**
         * Gets the file system shadowed by this instance.
         */
        public get shadowRoot(): VirtualFileSystem | undefined {
            return this._shadowRoot;
        }

        /**
         * Gets metadata about this file system.
         */
        public get metadata(): core.Metadata {
            return this._metadata || (this._metadata = new core.Metadata(this.shadowRoot ? this.shadowRoot.metadata : undefined));
        }

        /**
         * Gets a value indicating whether to use case sensitive file names.
         */
        public get useCaseSensitiveFileNames() {
            return this._useCaseSensitiveFileNames;
        }

        /**
         * Gets the path to the current directory.
         */
        public get currentDirectory() {
            return this._currentDirectory;
        }

        private get watchedFilesPrivate() {
            return this._watchedFiles || (this._watchedFiles = new core.KeyedCollection<string, FileWatcherEntry[]>(this.pathComparer));
        }

        private get watchedFilesSetPrivate() {
            return this._watchedFilesSet || (this._watchedFilesSet = new core.SortedSet<string>(this.pathComparer));
        }

        private get watchedDirectoriesPrivate() {
            return this._watchedDirectories || (this._watchedDirectories = new core.KeyedCollection<string, DirectoryWatcherEntryArray>(this.pathComparer));
        }

        private get watchedRecursiveDirectoriesSetPrivate() {
            return this._watchedRecursiveDirectoriesSet || (this._watchedRecursiveDirectoriesSet = new core.SortedSet<string>(this.pathComparer));
        }

        private get watchedNonRecursiveDirectoriesSetPrivate() {
            return this._watchedNonRecursiveDirectoriesSet || (this._watchedNonRecursiveDirectoriesSet = new core.SortedSet<string>(this.pathComparer));
        }

        private get root(): VirtualRoot {
            if (this._root === undefined) {
                if (this._shadowRoot) {
                    this._root = this._shadowRoot.root._shadow(this);
                }
                else {
                    this._root = new VirtualRoot(this);
                }
                this._root.addListener("fileSystemChange", this._onRootFileSystemChange);
                if (this.isReadOnly) this._root.makeReadOnly();
            }
            return this._root;
        }

        /**
         * Gets a read-only virtual file system with the following directories:
         *
         * | path   | physical/virtual      |
         * |:-------|:----------------------|
         * | /.ts   | physical: built/local |
         * | /.lib  | physical: tests/lib   |
         * | /.src  | virtual               |
         */
        public static getBuiltLocal(useCaseSensitiveFileNames: boolean): VirtualFileSystem {
            let vfs = useCaseSensitiveFileNames ? this._builtLocalCS : this._builtLocalCI;
            if (!vfs) {
                vfs = this._builtLocal;
                if (!vfs) {
                    const resolver = createResolver(Harness.IO, {
                        // TODO(rbuckton): This patches the baseline to replace lib.es5.d.ts with lib.d.ts.
                        // This is only to make the PR for this change easier to read. A follow-up PR will
                        // revert this change and accept the new baselines.
                        // See https://github.com/Microsoft/TypeScript/pull/20763#issuecomment-352553264
                        "/.ts/lib.d.ts": vpath.resolve(__dirname, "lib.es5.d.ts"),

                        "/.ts": __dirname,
                        "/.lib": vpath.resolve(__dirname, "../../tests/lib")
                    });
                    vfs = new VirtualFileSystem("/", Harness.IO.useCaseSensitiveFileNames());
                    vfs.metadata.set("defaultLibLocation", "/.ts");
                    vfs.addDirectory("/.ts", resolver);
                    vfs.addDirectory("/.lib", resolver);
                    vfs.addDirectory("/.src");
                    vfs.changeDirectory("/.src");
                    vfs.makeReadOnly();
                    this._builtLocal = vfs;
                }
                if (vfs._useCaseSensitiveFileNames !== useCaseSensitiveFileNames) {
                    vfs = vfs.shadow();
                    vfs._useCaseSensitiveFileNames = useCaseSensitiveFileNames;
                    vfs.makeReadOnly();
                }
                return useCaseSensitiveFileNames
                    ? this._builtLocalCS = vfs
                    : this._builtLocalCI = vfs;
            }
            return vfs;
        }

        /**
         * Creates a mutable virtual file system with the following directories:
         *
         * | path   | physical/virtual      |
         * |:-------|:----------------------|
         * | /.ts   | physical: built/local |
         * | /.lib  | physical: tests/lib   |
         * | /.src  | virtual               |
         */
        public static createFromFileSystem(useCaseSensitiveFileNames: boolean) {
            return this.getBuiltLocal(useCaseSensitiveFileNames).shadow();
        }

        public static createFromDocuments(useCaseSensitiveFileNames: boolean, documents: documents.TextDocument[], options?: { currentDirectory?: string, overwrite?: boolean }) {
            const vfs = this.createFromFileSystem(useCaseSensitiveFileNames);
            if (options && options.currentDirectory) {
                vfs.addDirectory(options.currentDirectory);
                vfs.changeDirectory(options.currentDirectory);
            }

            const fileOptions = options && options.overwrite ? { overwrite: true } : undefined;
            for (const document of documents) {
                const file = vfs.addFile(document.file, document.text, fileOptions)!;
                assert.isDefined(file, `Failed to add file: '${document.file}'`);
                file.metadata.set("document", document);
                // Add symlinks
                const symlink = document.meta.get("symlink");
                if (file && symlink) {
                    for (const link of symlink.split(",")) {
                        const symlink = vfs.addSymlink(vpath.resolve(vfs.currentDirectory, link.trim()), file)!;
                        assert.isDefined(symlink, `Failed to create symlink: '${link}'`);
                        symlink.metadata.set("document", document);
                    }
                }
            }
            return vfs;
        }

        /**
         * Changes the current directory to the supplied path.
         */
        public changeDirectory(path: string) {
            this.writePreamble();
            if (path) {
                this._currentDirectory = vpath.resolve(this._currentDirectory, path);
            }
        }

        /**
         * Pushes the current directory onto the location stack and changes the current directory to the supplied path.
         */
        public pushDirectory(path = this.currentDirectory) {
            this.writePreamble();
            if (this._currentDirectoryStack === undefined) {
                this._currentDirectoryStack = [this.currentDirectory];
            }
            else {
                this._currentDirectoryStack.push(this.currentDirectory);
            }
            this.changeDirectory(path);
        }

        /**
         * Pops the previous directory from the location stack and changes the current directory to that directory.
         */
        public popDirectory() {
            this.writePreamble();
            const previousDirectory = this._currentDirectoryStack && this._currentDirectoryStack.pop();
            if (previousDirectory !== undefined) {
                this._currentDirectory = previousDirectory;
            }
        }

        /**
         * Adds a directory (and all intermediate directories) to a path relative to the current directory.
         */
        public addDirectory(path: string, resolver?: FileSystemResolver) {
            return this.root.addDirectory(vpath.resolve(this.currentDirectory, path), resolver);
        }

        /**
         * Adds a file (and all intermediate directories) to a path relative to the current directory.
         */
        public addFile(path: string, content?: FileSystemResolver | ContentResolver | string, options?: { overwrite?: boolean }) {
            return this.root.addFile(vpath.resolve(this.currentDirectory, path), content, options);
        }

        /**
         * Adds multiple files (and all intermediate directories) to paths relative to the current directory.
         */
        public addFiles(files: string[]) {
            for (const file of files) {
                this.addFile(file);
            }
        }

        /**
         * Adds a symbolic link to a target entry for a path relative to the current directory.
         */
        public addSymlink(path: string, target: VirtualFile): VirtualFileSymlink | undefined;
        /**
         * Adds a symbolic link to a target entry for a path relative to the current directory.
         */
        public addSymlink(path: string, target: VirtualDirectory): VirtualDirectorySymlink | undefined;
        /**
         * Adds a symbolic link to a target entry for a path relative to the current directory.
         */
        public addSymlink(path: string, target: string | VirtualEntry): VirtualSymlink | undefined;
        public addSymlink(path: string, target: string | VirtualEntry) {
            if (typeof target === "string") target = vpath.resolve(this.currentDirectory, target);
            return this.root.addSymlink(vpath.resolve(this.currentDirectory, path), target);
        }

        /**
         * Removes a directory (and all of its contents) at a path relative to the current directory.
         */
        public removeDirectory(path: string): boolean {
            return this.root.removeDirectory(vpath.resolve(this.currentDirectory, path));
        }

        /**
         * Removes a file at a path relative to the current directory.
         */
        public removeFile(path: string): boolean {
            return this.root.removeFile(vpath.resolve(this.currentDirectory, path));
        }

        /**
         * Reads the contents of a file at a path relative to the current directory.
         */
        public readFile(path: string): string | undefined {
            const file = this.getFile(vpath.resolve(this.currentDirectory, path));
            return file && file.readContent();
        }

        /**
         * Writes the contents of a file at a path relative to the current directory.
         */
        public writeFile(path: string, content: string): void {
            path = vpath.resolve(this.currentDirectory, path);
            const file = this.getFile(path);
            if (file) {
                file.writeContent(content);
            }
            else {
                this.addFile(path, content);
            }
        }

        /**
         * Gets a value indicating whether a path relative to the current directory exists and is a directory.
         */
        public directoryExists(path: string) {
            return this.getEntry(path) instanceof VirtualDirectory;
        }

        /**
         * Gets a value indicating whether a path relative to the current directory exists and is a file.
         */
        public fileExists(path: string) {
            return this.getEntry(path) instanceof VirtualFile;
        }

        public rename(oldpath: string, newpath: string) {
            oldpath = vpath.resolve(this.currentDirectory, oldpath);
            newpath = vpath.resolve(this.currentDirectory, newpath);
            const oldEntry = this.getEntry(oldpath);
            return oldEntry !== undefined && this.root.replaceEntry(newpath, oldEntry);
        }

        public realpath(path: string) {
            const entry = this.getEntry(path, { followSymlinks: true });
            return entry && entry.path || path;
        }

        /**
         * Get file stats
         */
        public getStats(path: string, options?: { noFollowSymlinks?: boolean }) {
            let entry = this.getEntry(path);
            if (entry && !(options && options.noFollowSymlinks)) {
                entry = this.getRealEntry(entry);
            }
            return entry && entry.getStats();
        }

        public setStats(path: string, atime: number | Date, mtime: number | Date, options?: { noFollowSymlinks?: boolean }) {
            let entry = this.getEntry(path);
            if (entry && !(options && options.noFollowSymlinks)) {
                entry = this.getRealEntry(entry);
            }
            if (entry && !entry.isReadOnly) {
                entry.setStats(atime, mtime);
                return true;
            }
            return false;
        }

        /**
         * If an entry is a symbolic link, gets the resolved target of the link. Otherwise, returns the entry.
         */
        public getRealEntry(entry: VirtualDirectory): VirtualDirectory | undefined;
        /**
         * If an entry is a symbolic link, gets the resolved target of the link. Otherwise, returns the entry.
         */
        public getRealEntry(entry: VirtualFile): VirtualFile | undefined;
        /**
         * If an entry is a symbolic link, gets the resolved target of the link. Otherwise, returns the entry.
         */
        public getRealEntry(entry: VirtualEntry): VirtualEntry | undefined;
        public getRealEntry(entry: VirtualEntry): VirtualEntry | undefined {
            if (entry instanceof VirtualFileSymlink || entry instanceof VirtualDirectorySymlink) {
                return findTarget(this, entry.targetPath);
            }
            return entry;
        }

        /**
         * Gets an entry from a path relative to the current directory.
         */
        public getEntry(path: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "file" }): VirtualFile | undefined;
        /**
         * Gets an entry from a path relative to the current directory.
         */
        public getEntry(path: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "directory" }): VirtualDirectory | undefined;
        /**
         * Gets an entry from a path relative to the current directory.
         */
        public getEntry(path: string, options?: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" }): VirtualEntry | undefined;
        public getEntry(path: string, options?: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" }) {
            return this.root.getEntry(vpath.resolve(this.currentDirectory, path), options);
        }

        /**
         * Gets a file from a path relative to the current directory.
         */
        public getFile(path: string, options?: { followSymlinks?: boolean, pattern?: RegExp }): VirtualFile | undefined {
            return this.root.getFile(vpath.resolve(this.currentDirectory, path), options);
        }

        /**
         * Gets a directory from a path relative to the current directory.
         */
        public getDirectory(path: string, options?: { followSymlinks?: boolean, pattern?: RegExp }): VirtualDirectory | undefined {
            return this.root.getDirectory(vpath.resolve(this.currentDirectory, path), options);
        }

        public getEntries(path: string, options: { recursive?: boolean, pattern?: RegExp, kind: "file" }): VirtualFile[];
        public getEntries(path: string, options: { recursive?: boolean, pattern?: RegExp, kind: "directory" }): VirtualDirectory[];
        public getEntries(path: string, options?: { recursive?: boolean, pattern?: RegExp, kind?: "file" | "directory" }): VirtualEntry[];
        public getEntries(path: string, options?: { recursive?: boolean, pattern?: RegExp, kind?: "file" | "directory" }) {
            const dir = this.root.getDirectory(vpath.resolve(this.currentDirectory, path));
            return dir ? dir.getEntries(options) : [];
        }

        public getDirectories(path: string, options?: { recursive?: boolean, pattern?: RegExp }) {
            const dir = this.root.getDirectory(vpath.resolve(this.currentDirectory, path));
            return dir ? dir.getDirectories(options) : [];
        }

        public getFiles(path: string, options?: { recursive?: boolean, pattern?: RegExp }) {
            const dir = this.root.getDirectory(vpath.resolve(this.currentDirectory, path));
            return dir ? dir.getFiles(options) : [];
        }

        public getEntryNames(path: string, options?: { recursive?: boolean, qualified?: boolean, pattern?: RegExp, kind?: "file" | "directory" }) {
            const dir = this.root.getDirectory(vpath.resolve(this.currentDirectory, path));
            return dir ? dir.getEntryNames(options) : [];
        }

        public getDirectoryNames(path: string, options?: { recursive?: boolean, qualified?: boolean, pattern?: RegExp }) {
            const dir = this.root.getDirectory(vpath.resolve(this.currentDirectory, path));
            return dir ? dir.getDirectoryNames(options) : [];
        }

        public getFileNames(path: string, options?: { recursive?: boolean, qualified?: boolean, pattern?: RegExp }) {
            const dir = this.root.getDirectory(vpath.resolve(this.currentDirectory, path));
            return dir ? dir.getFileNames(options) : [];
        }

        /**
         * Gets the accessible file system entries from a path relative to the current directory.
         */
        public getAccessibleFileSystemEntries(path: string) {
            const entry = this.getEntry(path);
            if (entry instanceof VirtualDirectory) {
                return {
                    files: entry.getFiles().map(f => f.name),
                    directories: entry.getDirectories().map(d => d.name)
                };
            }
            return { files: [], directories: [] };
        }

        /**
         * Watch a path for changes to a file.
         */
        public watchFile(path: string, watcher: (path: string, change: FileSystemChange) => void): ts.FileWatcher {
            path = vpath.resolve(this.currentDirectory, path);
            let watchers = this.watchedFilesPrivate.get(path);
            if (!watchers) {
                this.watchedFilesPrivate.set(path, watchers = []);
                this.watchedFilesSetPrivate.add(path);
            }

            const entry: FileWatcherEntry = { watcher };
            watchers.push(entry);

            return {
                close: () => {
                    const watchers = this.watchedFilesPrivate.get(path);
                    if (watchers) {
                        ts.orderedRemoveItem(watchers, entry);
                        if (watchers.length === 0) {
                            this.watchedFilesPrivate.delete(path);
                            this.watchedFilesSetPrivate.delete(path);
                        }
                    }
                }
            };
        }

        /**
         * Watch a directory for changes to the contents of the directory.
         */
        public watchDirectory(path: string, watcher: (path: string) => void, recursive?: boolean) {
            if (!this._watchedDirectories) {
                const pathComparer = this.useCaseSensitiveFileNames ? vpath.compareCaseSensitive : vpath.compareCaseInsensitive;
                this._watchedDirectories = new core.KeyedCollection<string, DirectoryWatcherEntryArray>(pathComparer);
            }

            path = vpath.resolve(this.currentDirectory, path);
            let watchers = this.watchedDirectoriesPrivate.get(path);
            if (!watchers) {
                watchers = [];
                watchers.recursiveCount = 0;
                watchers.nonRecursiveCount = 0;
                this.watchedDirectoriesPrivate.set(path, watchers);
            }

            const entry: DirectoryWatcherEntry = { watcher, recursive };
            watchers.push(entry);
            if (recursive) {
                if (watchers.recursiveCount === 0) {
                    this.watchedRecursiveDirectoriesSetPrivate.add(path);
                }
                watchers.recursiveCount++;
            }
            else {
                if (watchers.nonRecursiveCount === 0) {
                    this.watchedNonRecursiveDirectoriesSetPrivate.add(path);
                }
                watchers.nonRecursiveCount++;
            }

            return {
                close: () => {
                    const watchers = this.watchedDirectoriesPrivate.get(path);
                    if (watchers) {
                        ts.orderedRemoveItem(watchers, entry);
                        if (entry.recursive) {
                            watchers.recursiveCount--;
                            if (watchers.recursiveCount === 0) {
                                this.watchedRecursiveDirectoriesSetPrivate.delete(path);
                            }
                        }
                        else {
                            watchers.nonRecursiveCount--;
                            if (watchers.nonRecursiveCount === 0) {
                                this.watchedNonRecursiveDirectoriesSetPrivate.delete(path);
                            }
                        }
                        if (watchers.length === 0) {
                            this.watchedDirectoriesPrivate.delete(path);
                        }
                    }
                }
            };
        }

        /**
         * Creates a shadow copy of this file system. Changes made to the shadow do not affect
         * this file system.
         */
        public shadow(): VirtualFileSystem {
            const fs = new VirtualFileSystem(this.currentDirectory, this.useCaseSensitiveFileNames);
            fs._shadowRoot = this;
            return fs;
        }

        public debugPrint(): void {
            console.log(`cwd: ${this.currentDirectory}`);
            for (const entry of this.root.getEntries({ recursive: true })) {
                if (entry instanceof VirtualDirectory) {
                    console.log(entry.path.endsWith("/") ? entry.path : entry.path + "/");
                    if (entry instanceof VirtualDirectorySymlink) {
                        console.log(`-> ${entry.targetPath.endsWith("/") ? entry.targetPath : entry.targetPath + "/"}`);
                    }
                }
                else {
                    console.log(entry.path);
                    if (entry instanceof VirtualFileSymlink) {
                        console.log(`-> ${entry.targetPath}`);
                    }
                }
            }
        }

        protected makeReadOnlyCore() {
            this.root.makeReadOnly();
        }

        private onRootFileSystemChange(path: string, change: FileSystemChange) {
            if (this.watchFiles) {
                const fileWatchers = this._watchedFiles && this._watchedFiles.get(path);
                if (fileWatchers) {
                    for (const { watcher } of fileWatchers) {
                        watcher(path, change);
                    }
                }
            }

            if (this.watchDirectories) {
                if (this._watchedDirectories && (change === "added" || change === "removed")) {
                    const ignoreCase = !this.useCaseSensitiveFileNames;
                    const dirname = vpath.dirname(path);
                    this._watchedDirectories.forEach((watchers, watchedPath) => {
                        const nonRecursiveMatch = watchers.nonRecursiveCount > 0 && vpath.equals(watchedPath, dirname, ignoreCase);
                        const recursiveMatch = watchers.recursiveCount > 0 && vpath.beneath(watchedPath, dirname, ignoreCase);
                        if (nonRecursiveMatch || recursiveMatch) {
                            for (const { recursive, watcher } of watchers) {
                                if (recursive ? recursiveMatch : nonRecursiveMatch) {
                                    watcher(path);
                                }
                            }
                        }
                    });
                }
            }
        }
    }

    export interface VirtualFileSystemEntry {
        // #region Event "fileSystemChange"
        on(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        once(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        addListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        removeListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        prependListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        prependOnceListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        emit(name: "fileSystemChange", path: string, change: FileSystemChange): boolean;
        // #endregion Event "fileSystemChange"
    }

    export interface VirtualFileSystemEntry {
        // #region Untyped events
        on(event: string | symbol, listener: (...args: any[]) => void): this;
        once(event: string | symbol, listener: (...args: any[]) => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
        emit(event: string | symbol, ...args: any[]): boolean;
        // #endregion Untyped events
    }

    export abstract class VirtualFileSystemEntry extends VirtualFileSystemObject {
        private static _nextId = 1;
        private _path: string;
        private _name: string;
        private _parent: VirtualDirectory | undefined;
        private _metadata: core.Metadata;
        private _atimeMS: number = Date.now();
        private _mtimeMS: number = Date.now();
        private _ctimeMS: number = Date.now();
        private _birthtimeMS: number = Date.now();

        public readonly id = VirtualFileSystemEntry._nextId++;

        constructor(parent: VirtualDirectory | undefined, name: string) {
            super();
            this._parent = parent;
            this._name = name;
        }

        /**
         * Gets the name of this entry.
         */
        public get name(): string {
            return this._name;
        }

        /**
         * Gets the file system to which this entry belongs.
         */
        public get fileSystem(): VirtualFileSystem {
            if (!this.parent) throw new TypeError();
            return this.parent.fileSystem;
        }

        /**
         * Gets the root directory for this entry.
         */
        public get root(): VirtualDirectory | undefined {
            return this.parent.root;
        }

        /**
         * Gets the parent directory for this entry.
         */
        public get parent(): VirtualDirectory | undefined {
            return this._parent;
        }

        /**
         * Gets the entry that this entry shadows.
         */
        public abstract get shadowRoot(): VirtualEntry | undefined;

        /**
         * Gets metadata about this entry.
         */
        public get metadata(): core.Metadata {
            return this._metadata || (this._metadata = new core.Metadata(this.shadowRoot ? this.shadowRoot.metadata : undefined));
        }

        /**
         * Gets the full path to this entry.
         */
        public get path(): string {
            return this._path || (this._path = vpath.combine(this.parent.path, this.name));
        }

        /**
         * Gets the path to this entry relative to the current directory.
         */
        public get relative(): string {
            return this.relativeTo(this.fileSystem.currentDirectory);
        }

        /**
         * Gets a value indicating whether this entry exists.
         */
        public get exists(): boolean {
            return this.parent.exists
                && this.parent.getEntry(this.name) === this as VirtualFileSystemEntry;
        }

        /**
         * Gets a relative path from this entry to another entry.
         */
        public relativeTo(other: string | VirtualEntry) {
            if (other) {
                const otherPath = typeof other === "string" ? other : other.path;
                const ignoreCase = !this.fileSystem.useCaseSensitiveFileNames;
                return vpath.relative(otherPath, this.path, ignoreCase);
            }
            return this.path;
        }

        /**
         * Creates a file system entry that shadows this file system entry.
         * @param parent The container for the shadowed entry.
         */
        public abstract shadow(parent: VirtualDirectory): VirtualEntry;

        public abstract getStats(): VirtualStats;

        public setStats(atime: number | Date, mtime: number | Date) {
            this.writePreamble();
            this._atimeMS = typeof atime === "object" ? atime.getTime() :
                atime < 0 ? Date.now() :
                atime;
            this._mtimeMS = typeof mtime === "object" ? mtime.getTime() :
                mtime < 0 ? Date.now() :
                mtime;
            this._ctimeMS = Date.now();
        }

        protected static _setNameUnsafe(entry: VirtualFileSystemEntry, name: string) {
            entry._name = name;
            entry.invalidate();
        }

        protected static _setParentUnsafe(entry: VirtualFileSystemEntry, parent: VirtualDirectory) {
            entry._parent = parent;
            entry.invalidate();
        }

        protected static _invalidate(entry: VirtualFileSystemEntry) {
            entry.invalidate();
        }

        protected shadowPreamble(parent: VirtualDirectory): void {
            this.checkShadowParent(parent);
            this.checkShadowFileSystem(parent.fileSystem);
        }

        protected checkShadowParent(shadowParent: VirtualDirectory) {
            if (this.parent !== shadowParent.shadowRoot) throw new Error("Incorrect shadow parent");
        }

        protected checkShadowFileSystem(shadowFileSystem: VirtualFileSystem) {
            let fileSystem: VirtualFileSystem | undefined = this.fileSystem;
            while (fileSystem) {
                if (shadowFileSystem === fileSystem) throw new Error("Cannot create shadow for parent in the same file system.");
                fileSystem = fileSystem.shadowRoot;
            }
        }

        protected getStatsCore(mode: number, size: number) {
            return new VirtualStats(
                this.root.id,
                this.id,
                mode,
                size,
                this._atimeMS,
                this._mtimeMS,
                this._ctimeMS,
                this._birthtimeMS);
        }

        protected updateAccessTime() {
            if (!this.isReadOnly) {
                this._atimeMS = Date.now();
            }
        }

        protected updateModificationTime() {
            if (!this.isReadOnly) {
                this._mtimeMS = Date.now();
            }
        }

        protected invalidate() {
            this._path = undefined;
        }
    }

    export interface VirtualDirectory {
        // #region Event "fileSystemChange"
        on(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        once(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        addListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        removeListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        prependListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        prependOnceListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        emit(name: "fileSystemChange", path: string, change: FileSystemChange): boolean;
        // #endregion Event "fileSystemChange"
    }

    export interface VirtualDirectory {
        // #region Event "childAdded" | "childRemoved"
        on(event: "childAdded" | "childRemoved", listener: (child: VirtualEntry) => void): this;
        once(event: "childAdded" | "childRemoved", listener: (child: VirtualEntry) => void): this;
        addListener(event: "childAdded" | "childRemoved", listener: (child: VirtualEntry) => void): this;
        removeListener(event: "childAdded" | "childRemoved", listener: (child: VirtualEntry) => void): this;
        prependListener(event: "childAdded" | "childRemoved", listener: (child: VirtualEntry) => void): this;
        prependOnceListener(event: "childAdded" | "childRemoved", listener: (child: VirtualEntry) => void): this;
        emit(name: "childAdded" | "childRemoved", child: VirtualEntry): boolean;
        // #endregion Event "childAdded" | "childRemoved"
    }

    export interface VirtualDirectory {
        // #region Untyped events
        on(event: string | symbol, listener: (...args: any[]) => void): this;
        once(event: string | symbol, listener: (...args: any[]) => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
        emit(event: string | symbol, ...args: any[]): boolean;
        // #endregion Untyped events
    }

    export class VirtualDirectory extends VirtualFileSystemEntry {
        protected _shadowRoot: VirtualDirectory | undefined;
        private _entries: core.KeyedCollection<string, VirtualEntry> | undefined;
        private _resolver: FileSystemResolver | undefined;
        private _onChildFileSystemChange: (path: string, change: FileSystemChange) => void;

        constructor(parent: VirtualDirectory | undefined, name: string, resolver?: FileSystemResolver) {
            super(parent, name);
            if (parent === undefined && !(this instanceof VirtualRoot)) throw new TypeError();
            this._entries = undefined;
            this._resolver = resolver;
            this._shadowRoot = undefined;
            this._onChildFileSystemChange = (path, change) => this.onChildFileSystemChange(path, change);
        }

        /**
         * Gets the root directory for this entry.
         */
        public get root(): VirtualDirectory | undefined {
            return this.parent instanceof VirtualRoot ? this : this.parent.root;
        }

        /**
         * Gets the entry that this entry shadows.
         */
        public get shadowRoot(): VirtualDirectory | undefined {
            return this._shadowRoot;
        }

        protected get hasOwnEntries() {
            return this._entries !== undefined;
        }

        /**
         * Gets the child entries in this directory for the provided options.
         */
        public getEntries(options: { recursive?: boolean, pattern?: RegExp, kind: "file" }): VirtualFile[];
        /**
         * Gets the child entries in this directory for the provided options.
         */
        public getEntries(options: { recursive?: boolean, pattern?: RegExp, kind: "directory" }): VirtualDirectory[];
        /**
         * Gets the child entries in this directory for the provided options.
         */
        public getEntries(options?: { recursive?: boolean, pattern?: RegExp, kind?: "file" | "directory" }): VirtualEntry[];
        public getEntries(options: { recursive?: boolean, pattern?: RegExp, kind?: "file" | "directory" } = {}): VirtualEntry[] {
            const results: VirtualEntry[] = [];
            if (options.recursive) {
                this.getOwnEntries().forEach(entry => {
                    if (entry instanceof VirtualFile) {
                        if (isMatch(entry, options)) {
                            results.push(entry);
                        }
                    }
                    else if (entry instanceof VirtualDirectory) {
                        if (isMatch(entry, options)) {
                            results.push(entry);
                        }
                        for (const child of entry.getEntries(options)) {
                            results.push(child);
                        }
                    }
                });
            }
            else {
                this.getOwnEntries().forEach(entry => {
                    if (isMatch(entry, options)) {
                        results.push(entry);
                    }
                });
            }
            return results;
        }

        /**
         * Gets the child directories in this directory for the provided options.
         */
        public getDirectories(options: { recursive?: boolean, pattern?: RegExp } = {}): VirtualDirectory[] {
            return this.getEntries({ ...options, kind: "directory" });
        }

        /**
         * Gets the child files in this directory for the provided options.
         */
        public getFiles(options: { recursive?: boolean, pattern?: RegExp } = {}): VirtualFile[] {
            return this.getEntries({ ...options, kind: "file" });
        }

        /**
         * Gets the names of the child entries in this directory for the provided options.
         */
        public getEntryNames(options: { recursive?: boolean, qualified?: boolean, pattern?: RegExp, kind?: "file" | "directory" } = {}): string[] {
            return this.getEntries(options).map(entry =>
                options && options.qualified ? entry.path :
                options && options.recursive ? entry.relativeTo(this) :
                entry.name);
        }

        /**
         * Gets the names of the child directories in this directory for the provided options.
         */
        public getDirectoryNames(options: { recursive?: boolean, qualified?: boolean, pattern?: RegExp } = {}): string[] {
            return this.getEntryNames({ ...options, kind: "directory" });
        }

        /**
         * Gets the names of the child files in this directory for the provided options.
         */
        public getFileNames(options: { recursive?: boolean, qualified?: boolean, pattern?: RegExp } = {}): string[] {
            return this.getEntryNames({ ...options, kind: "file" });
        }

        /**
         * Gets an entry from a path relative to this directory.
         */
        public getEntry(path: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "file" }): VirtualFile | undefined;
        /**
         * Gets an entry from a path relative to this directory.
         */
        public getEntry(path: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "directory" }): VirtualDirectory | undefined;
        /**
         * Gets an entry from a path relative to this directory.
         */
        public getEntry(path: string, options?: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" }): VirtualEntry | undefined;
        public getEntry(path: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" } = {}): VirtualEntry | undefined {
            const components = this.parsePath(path);
            const directory = this.walkContainers(components, /*create*/ false);
            return directory && directory.getOwnEntry(components[components.length - 1], options);
        }

        /**
         * Gets a directory from a path relative to this directory.
         */
        public getDirectory(path: string, options: { followSymlinks?: boolean, pattern?: RegExp } = {}): VirtualDirectory | undefined {
            return this.getEntry(path, { ...options, kind: "directory" });
        }

        /**
         * Gets a file from a path relative to this directory.
         */
        public getFile(path: string, options: { followSymlinks?: boolean, pattern?: RegExp } = {}): VirtualFile | undefined {
            return this.getEntry(path, { ...options, kind: "file" });
        }

        /**
         * Finds an entry for a relative path along the provided axis.
         */
        public findEntry(path: string, axis: Axis, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "file" }): VirtualFile | undefined;
        /**
         * Finds an entry for a relative path along the provided axis.
         */
        public findEntry(path: string, axis: Axis, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "directory" }): VirtualDirectory | undefined;
        /**
         * Finds an entry for a relative path along the provided axis.
         */
        public findEntry(path: string, axis: Axis, options?: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" }): VirtualEntry | undefined;
        public findEntry(path: string, axis: Axis, options: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" } = {}): VirtualEntry | undefined {
            const walkAncestors = axis === "ancestors-or-self" || axis === "ancestors";
            const walkDescendents = axis === "descendents-or-self" || axis === "descendents";
            const walkSelf = axis === "ancestors-or-self" || axis === "self" || axis === "descendents-or-self";
            if (walkSelf) {
                const entry = this.getEntry(path, options);
                if (entry) return entry;
            }
            if (walkAncestors) {
                const entry = this.parent && this.parent.findEntry(path, "ancestors-or-self", options);
                if (entry) return entry;
            }
            if (walkDescendents) {
                for (const child of this.getDirectories()) {
                    const entry = child.findEntry(path, "descendents-or-self", options);
                    if (entry) return entry;
                }
            }
        }

        /**
         * Finds a directory for a relative path along the provided axis.
         */
        public findDirectory(path: string, axis: Axis, options: { followSymlinks?: boolean, pattern?: RegExp } = {}): VirtualDirectory | undefined {
            return this.findEntry(path, axis, { ...options, kind: "directory" });
        }

        /**
         * Finds a file for a relative path along the provided axis.
         */
        public findFile(path: string, axis: Axis, options: { followSymlinks?: boolean, pattern?: RegExp } = {}): VirtualFile | undefined {
            return this.findEntry(path, axis, { ...options, kind: "file" });
        }

        /**
         * Adds a directory (and all intermediate directories) for a path relative to this directory.
         */
        public addDirectory(path: string, resolver?: FileSystemResolver): VirtualDirectory | undefined {
            const components = this.parsePath(path);
            const directory = this.walkContainers(components, /*create*/ true);
            return directory && directory.addOwnDirectory(components[components.length - 1], resolver);
        }

        /**
         * Adds a file (and all intermediate directories) for a path relative to this directory.
         */
        public addFile(path: string, content?: FileSystemResolver | ContentResolver | string, options?: { overwrite?: boolean }): VirtualFile | undefined {
            const components = this.parsePath(path);
            const directory = this.walkContainers(components, /*create*/ true);
            return directory && directory.addOwnFile(components[components.length - 1], content, options);
        }

        /**
         * Adds a symbolic link to a target entry for a path relative to this directory.
         */
        public addSymlink(path: string, target: VirtualFile): VirtualFileSymlink | undefined;
        /**
         * Adds a symbolic link to a target entry for a path relative to this directory.
         */
        public addSymlink(path: string, target: VirtualDirectory): VirtualDirectorySymlink | undefined;
        /**
         * Adds a symbolic link to a target entry for a path relative to this directory.
         */
        public addSymlink(path: string, target: string | VirtualEntry): VirtualSymlink | undefined;
        public addSymlink(path: string, target: string | VirtualEntry): VirtualSymlink | undefined {
            const targetEntry = typeof target === "string" ? this.fileSystem.getEntry(vpath.resolve(this.path, target)) : target;
            if (targetEntry === undefined) return undefined;
            const components = this.parsePath(path);
            const directory = this.walkContainers(components, /*create*/ true);
            return directory && directory.addOwnSymlink(components[components.length - 1], targetEntry);
        }

        /**
         * Removes a directory (and all of its contents) at a path relative to this directory.
         */
        public removeDirectory(path: string): boolean {
            const components = this.parsePath(path);
            const directory = this.walkContainers(components, /*create*/ false);
            return directory ? directory.removeOwnDirectory(components[components.length - 1]) : false;
        }

        /**
         * Removes a file at a path relative to this directory.
         */
        public removeFile(path: string): boolean {
            const components = this.parsePath(path);
            const directory = this.walkContainers(components, /*create*/ false);
            return directory ? directory.removeOwnFile(components[components.length - 1]) : false;
        }

        public replaceEntry(path: string, entry: VirtualEntry) {
            const components = this.parsePath(path);
            const directory = this.walkContainers(components, /*create*/ false);
            return directory ? directory.replaceOwnEntry(components[components.length - 1], entry) : false;
        }

        /**
         * Creates a shadow copy of this directory. Changes made to the shadow do not affect
         * this directory.
         */
        public shadow(shadowParent: VirtualDirectory): VirtualDirectory {
            this.shadowPreamble(shadowParent);
            const shadow = new VirtualDirectory(shadowParent, this.name);
            shadow._shadowRoot = this;
            return shadow;
        }

        public getStats() {
            return super.getStatsCore(S_IFDIR, 0);
        }

        protected makeReadOnlyCore(): void {
            if (this._entries) {
                this._entries.forEach(entry => entry.makeReadOnly());
            }
        }

        protected getOwnEntries() {
            if (!this._entries) {
                const entries = new core.KeyedCollection<string, VirtualEntry>(this.fileSystem.stringComparer);
                const resolver = this._resolver;
                const shadowRoot = this._shadowRoot;
                if (resolver) {
                    this._resolver = undefined;
                    const { files, directories } = resolver.getEntries(this);
                    for (const dir of directories) {
                        const vdir = new VirtualDirectory(this, dir, resolver);
                        vdir.addListener("fileSystemChange", this._onChildFileSystemChange);
                        if (this.isReadOnly) vdir.makeReadOnly();
                        entries.set(vdir.name, vdir);
                    }
                    for (const file of files) {
                        const vfile = new VirtualFile(this, file, resolver);
                        vfile.addListener("fileSystemChange", this._onChildFileSystemChange);
                        if (this.isReadOnly) vfile.makeReadOnly();
                        entries.set(vfile.name, vfile);
                    }
                }
                else if (shadowRoot) {
                    shadowRoot.getOwnEntries().forEach(entry => {
                        const clone = entry.shadow(this);
                        clone.addListener("fileSystemChange", this._onChildFileSystemChange);
                        if (this.isReadOnly) clone.makeReadOnly();
                        entries.set(clone.name, clone);
                    });
                }
                this._entries = entries;
            }
            return this._entries;
        }

        protected addOwnDirectory(name: string, resolver?: FileSystemResolver): VirtualDirectory | undefined {
            const existing = this.getOwnEntry(name);
            if (existing) {
                if (!resolver && existing instanceof VirtualDirectory) {
                    return existing;
                }
                return undefined;
            }

            this.writePreamble();
            const entry = new VirtualDirectory(this, name, resolver);
            this.addOwnEntry(entry);
            return entry;
        }

        protected addOwnFile(name: string, content?: FileSystemResolver | ContentResolver | string, options: { overwrite?: boolean } = {}): VirtualFile | undefined {
            const existing = this.getOwnEntry(name);
            if (existing && (!options.overwrite || !(existing instanceof VirtualFile))) {
                return undefined;
            }

            this.writePreamble();
            if (existing) {
                // Remove the existing entry
                this.getOwnEntries().delete(name);
            }

            const entry = new VirtualFile(this, name, content);
            this.addOwnEntry(entry);
            return entry;
        }

        protected addOwnSymlink(name: string, target: VirtualEntry): VirtualSymlink | undefined {
            if (this.getOwnEntry(name)) return undefined;
            this.writePreamble();
            const entry = target instanceof VirtualFile ? new VirtualFileSymlink(this, name, target.path) : new VirtualDirectorySymlink(this, name, target.path);
            this.addOwnEntry(entry);
            return entry;
        }

        protected removeOwnDirectory(name: string) {
            const entry = this.getOwnEntries().get(name);
            if (entry instanceof VirtualDirectory) {
                this.writePreamble();
                this.removeOwnEntry(entry);
                return true;
            }
            return false;
        }

        protected removeOwnFile(name: string) {
            const entry = this.getOwnEntries().get(name);
            if (entry instanceof VirtualFile) {
                this.writePreamble();
                this.removeOwnEntry(entry);
                return true;
            }
            return false;
        }

        protected replaceOwnEntry(name: string, entry: VirtualEntry) {
            const existing = this.getOwnEntry(name);
            // cannot replace yourself
            // cannot move a file or directory into a read-only container.
            if (entry === existing ||
                this.isReadOnly) {
                return false;
            }
            else if (entry instanceof VirtualDirectory) {
                // cannot move a directory on top of a file.
                // cannot move a directory on top of a non-empty directory.
                // cannot move a directory if its parent is read-only
                // cannot move a directory underneath itself.
                if (existing instanceof VirtualFile ||
                    existing instanceof VirtualDirectory && existing.getEntries().length > 0 ||
                    entry.parent.isReadOnly ||
                    vpath.beneath(entry.path, vpath.combine(this.path, name), !this.fileSystem.useCaseSensitiveFileNames)) {
                    return false;
                }
            }
            else if (entry instanceof VirtualFile) {
                // cannot move a file on top of a directory.
                // cannot move a file if its parent is read-only.
                if (existing instanceof VirtualDirectory ||
                    entry.parent.isReadOnly) {
                    return false;
                }
            }

            // delete any existing file or directory
            if (existing) this.removeOwnEntry(existing);

            // move and rename the entry
            entry.parent.removeOwnEntry(entry);
            VirtualFileSystemEntry._setNameUnsafe(entry, name);
            VirtualFileSystemEntry._setParentUnsafe(entry, this);
            this.addOwnEntry(entry);
            return true;
        }

        protected invalidate() {
            super.invalidate();
            this.invalidateEntries();
        }

        protected invalidateEntries() {
            if (this.hasOwnEntries) {
                for (const entry of Array.from(this.getOwnEntries().values())) {
                    VirtualFileSystemEntry._invalidate(entry);
                }
            }
        }

        private parsePath(path: string) {
            return vpath.parse(vpath.normalize(path));
        }

        private walkContainers(components: string[], create: boolean) {
            // no absolute paths (unless this is the root)
            if (!!components[0] === !!this.parent) return undefined;

            // no relative paths
            if (components[1] === "..") return undefined;

            // walk the components
            let directory: VirtualDirectory | undefined = this; // tslint:disable-line:no-this-assignment
            for (let i = this.parent ? 1 : 0; i < components.length - 1; i++) {
                directory = create ? directory.getOrAddOwnDirectory(components[i]) : directory.getOwnDirectory(components[i]);
                if (directory === undefined) return undefined;
            }

            return directory;
        }

        private getOwnEntry(name: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "file" }): VirtualFile | undefined;
        private getOwnEntry(name: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind: "directory" }): VirtualDirectory | undefined;
        private getOwnEntry(name: string, options?: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" }): VirtualEntry | undefined;
        private getOwnEntry(name: string, options: { followSymlinks?: boolean, pattern?: RegExp, kind?: "file" | "directory" } = {}): VirtualEntry | undefined {
            const entry = this.getOwnEntries().get(name);
            return entry && isMatch(entry, options) ? options.followSymlinks ? this.fileSystem.getRealEntry(entry) : entry : undefined;
        }

        private getOwnDirectory(name: string) {
            return this.getOwnEntry(name, { kind: "directory" });
        }

        private getOrAddOwnDirectory(name: string) {
            return this.getOwnDirectory(name) || this.addOwnDirectory(name);
        }

        private addOwnEntry(entry: VirtualEntry) {
            this.getOwnEntries().set(entry.name, entry);
            this.updateAccessTime();
            this.updateModificationTime();
            this.emit("childAdded", entry);
            this.emit("fileSystemChange", entry.path, "added");
            entry.addListener("fileSystemChange", this._onChildFileSystemChange);
        }

        private removeOwnEntry(entry: VirtualEntry) {
            const entries = this.getOwnEntries();
            entries.delete(entry.name);
            this.updateAccessTime();
            this.updateModificationTime();
            this.emit("childRemoved", entry);
            this.emit("fileSystemChange", entry.path, "removed");
            entry.removeListener("fileSystemChange", this._onChildFileSystemChange);
        }

        private onChildFileSystemChange(path: string, change: FileSystemChange) {
            this.emit("fileSystemChange", path, change);
        }
    }

    export class VirtualDirectorySymlink extends VirtualDirectory {
        private _targetPath: string;
        private _target: VirtualDirectory | undefined;
        private _views: core.KeyedCollection<string, VirtualEntryView> | undefined;
        private _allViews: core.KeyedCollection<string, VirtualEntryView> | undefined;
        private _onTargetParentChildRemoved: (entry: VirtualEntry) => void;
        private _onTargetChildRemoved: (entry: VirtualEntry) => void;
        private _onTargetChildAdded: (entry: VirtualEntry) => void;
        private _onTargetFileSystemChange: (path: string, change: FileSystemChange) => void;

        constructor(parent: VirtualDirectory, name: string, target: string) {
            super(parent, name);
            this._views = new core.KeyedCollection<string, VirtualEntryView>(this.fileSystem.stringComparer);
            this._targetPath = target;
            this._onTargetParentChildRemoved = entry => this.onTargetParentChildRemoved(entry);
            this._onTargetChildAdded = entry => this.onTargetChildAdded(entry);
            this._onTargetChildRemoved = entry => this.onTargetChildRemoved(entry);
            this._onTargetFileSystemChange = (path, change) => this.onTargetFileSystemChange(path, change);
        }

        /**
         * Gets the path to the target of the symbolic link.
         */
        public get targetPath() {
            return this._targetPath;
        }

        /**
         * Sets the path to the target of the symbolic link.
         */
        public set targetPath(value: string) {
            if (this._targetPath !== value) {
                this.writePreamble();
                this._targetPath = vpath.resolve(this.path, value);
                this.invalidateTarget();
            }
        }

        /**
         * Gets the resolved target directory for this symbolic link.
         */
        public get target(): VirtualDirectory | undefined {
            this.resolveTarget();
            return this._target;
        }

        /**
         * Gets a value indicating whether the symbolic link is broken.
         */
        public get isBroken(): boolean {
            return this.target === undefined;
        }

        /**
         * Creates a shadow copy of this directory. Changes made to the shadow do not affect
         * this directory.
         */
        public shadow(shadowParent: VirtualDirectory): VirtualDirectorySymlink {
            this.shadowPreamble(shadowParent);
            const shadow = new VirtualDirectorySymlink(shadowParent, this.name, this.targetPath);
            shadow._shadowRoot = this;
            return shadow;
        }

        public readTargetPath() {
            const targetPath = this.targetPath;
            if (targetPath) this.updateAccessTime();
            return targetPath;
        }

        public writeTargetPath(targetPath: string) {
            this.targetPath = targetPath;
            if (targetPath) this.updateModificationTime();
        }

        public getStats() {
            return super.getStatsCore(S_IFLNK, this.targetPath.length);
        }

        protected addOwnDirectory(name: string, resolver?: FileSystemResolver): VirtualDirectory | undefined {
            const target = this.target;
            const child = target && target.addDirectory(name, resolver);
            return child && this.getView(child);
        }

        protected addOwnFile(name: string, content?: FileSystemResolver | ContentResolver | string): VirtualFile | undefined {
            const target = this.target;
            const child = target && target.addFile(name, content);
            return child && this.getView(child);
        }

        protected addOwnSymlink(name: string, linkTarget: VirtualEntry): VirtualSymlink | undefined {
            const target = this.target;
            const child = target && target.addSymlink(name, linkTarget);
            return child && this.getView(child);
        }

        protected removeOwnDirectory(name: string): boolean {
            const target = this.target;
            return target && target.removeDirectory(name) || false;
        }

        protected removeOwnFile(name: string): boolean {
            const target = this.target;
            return target && target.removeFile(name) || false;
        }

        protected getOwnEntries(): core.KeyedCollection<string, VirtualEntryView> {
            if (!this._allViews) {
                this._allViews = new core.KeyedCollection<string, VirtualEntryView>(this.fileSystem.stringComparer);
                const target = this.target;
                if (target) {
                    for (const entry of target.getEntries()) {
                        this._allViews.set(entry.name, this.getView(entry));
                    }
                }
            }
            return this._allViews;
        }

        protected invalidateEntries() {
            this.invalidateTarget();
        }

        private getView(entry: VirtualFile): VirtualFileView;
        private getView(entry: VirtualDirectory): VirtualDirectoryView;
        private getView(entry: VirtualEntry): VirtualEntryView;
        private getView(entry: VirtualEntry) {
            let view = this._views.get(entry.name);
            if (entry instanceof VirtualFile) {
                if (view instanceof VirtualFileView) {
                    return view;
                }
                view = new VirtualFileView(this, entry.name, entry.path);
                this._views.set(entry.name, view);
            }
            else {
                if (view instanceof VirtualDirectoryView) {
                    return view;
                }
                view = new VirtualDirectoryView(this, entry.name, entry.path);
                this._views.set(entry.name, view);
            }
            return view;
        }

        private resolveTarget(): void {
            if (!this._target) {
                const entry = findTarget(this.fileSystem, this.targetPath);
                if (entry instanceof VirtualDirectory) {
                    this._target = entry;
                    if (this._target.parent) this._target.parent.addListener("childRemoved", this._onTargetParentChildRemoved);
                    this._target.addListener("childAdded", this._onTargetChildAdded);
                    this._target.addListener("childRemoved", this._onTargetChildRemoved);
                    this._target.addListener("fileSystemChange", this._onTargetFileSystemChange);
                }
            }
        }

        private invalidateTarget() {
            if (!this._target) return;
            if (this._target.parent) this._target.parent.removeListener("childRemoved", this._onTargetParentChildRemoved);
            this._target.removeListener("childAdded", this._onTargetChildAdded);
            this._target.removeListener("childRemoved", this._onTargetChildRemoved);
            this._target.removeListener("fileSystemChange", this._onTargetFileSystemChange);
            this._target = undefined;
            this._views.clear();
            this._allViews = undefined;
        }

        private onTargetParentChildRemoved(entry: VirtualEntry) {
            if (entry === this._target) {
                this.invalidateTarget();
            }
        }

        private onTargetChildAdded(entry: VirtualEntry) {
            const wrapped = this.getView(entry);
            this.getOwnEntries().set(entry.name, wrapped);
            this.emit("childAdded", wrapped);
        }

        private onTargetChildRemoved(entry: VirtualEntry) {
            const symlink = this.getView(entry);
            this.getOwnEntries().delete(entry.name);
            this._views.delete(entry.name);
            this.emit("childRemoved", symlink);
        }

        protected onTargetFileSystemChange(path: string, change: FileSystemChange) {
            const ignoreCase = !this.fileSystem.useCaseSensitiveFileNames;
            if (vpath.beneath(this.targetPath, path, ignoreCase)) {
                const relative = vpath.relative(this.targetPath, path, ignoreCase);
                const symbolicPath = vpath.combine(this.path, relative);
                this.emit("fileSystemChange", symbolicPath, change);
            }
        }
    }

    class VirtualDirectoryView extends VirtualDirectorySymlink {
        /**
         * Creates a shadow copy of this directory. Changes made to the shadow do not affect
         * this directory.
         */
        public shadow(shadowParent: VirtualDirectory): VirtualDirectoryView {
            this.shadowPreamble(shadowParent);
            const shadow = new VirtualDirectoryView(shadowParent, this.name, this.targetPath);
            shadow._shadowRoot = this;
            return shadow;
        }

        protected onTargetFileSystemChange() { /* views do not propagate file system events */ }
    }

    class VirtualRoot extends VirtualDirectory {
        private _fileSystem: VirtualFileSystem;

        constructor(fileSystem: VirtualFileSystem) {
            super(/*parent*/ undefined, "");
            this._fileSystem = fileSystem;
        }

        public get fileSystem(): VirtualFileSystem {
            return this._fileSystem;
        }

        public get root(): VirtualDirectory | undefined {
            return undefined;
        }

        public get path(): string {
            return "";
        }

        public get exists(): boolean {
            return true;
        }

        public _shadow(shadowFileSystem: VirtualFileSystem) {
            super.checkShadowFileSystem(shadowFileSystem);
            const shadow = new VirtualRoot(shadowFileSystem);
            shadow._shadowRoot = this;
            return shadow;
        }

        public shadow(): never {
            throw new TypeError();
        }
    }

    export interface VirtualFile {
        // #region Event "fileSystemChange"
        on(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        once(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        addListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        removeListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        prependListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        prependOnceListener(event: "fileSystemChange", listener: (path: string, change: FileSystemChange) => void): this;
        emit(name: "fileSystemChange", path: string, change: FileSystemChange): boolean;
        // #endregion Event "fileSystemChange"
    }

    export interface VirtualFile {
        // #region Event "contentChanged"
        on(event: "contentChanged", listener: (entry: VirtualFile) => void): this;
        once(event: "contentChanged", listener: (entry: VirtualFile) => void): this;
        addListener(event: "contentChanged", listener: (entry: VirtualFile) => void): this;
        removeListener(event: "contentChanged", listener: (entry: VirtualFile) => void): this;
        prependListener(event: "contentChanged", listener: (entry: VirtualFile) => void): this;
        prependOnceListener(event: "contentChanged", listener: (entry: VirtualFile) => void): this;
        emit(name: "contentChanged", entry: VirtualFile): boolean;
        // #endregion Event "contentChanged"
    }

    export interface VirtualFile {
        // #region Untyped events
        on(event: string | symbol, listener: (...args: any[]) => void): this;
        once(event: string | symbol, listener: (...args: any[]) => void): this;
        addListener(event: string | symbol, listener: (...args: any[]) => void): this;
        removeListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependListener(event: string | symbol, listener: (...args: any[]) => void): this;
        prependOnceListener(event: string | symbol, listener: (...args: any[]) => void): this;
        emit(event: string | symbol, ...args: any[]): boolean;
        // #endregion Untyped events
    }

    export class VirtualFile extends VirtualFileSystemEntry {
        protected _shadowRoot: VirtualFile | undefined;
        private _content: string | undefined;
        private _contentWasSet: boolean;
        private _resolver: FileSystemResolver | ContentResolver | undefined;
        private _version: number;

        constructor(parent: VirtualDirectory, name: string, content?: FileSystemResolver | ContentResolver | string) {
            super(parent, name);
            this._content = typeof content === "string" ? content : undefined;
            this._resolver = typeof content !== "string" ? content : undefined;
            this._shadowRoot = undefined;
            this._contentWasSet = this._content !== undefined;
            this._version = this._contentWasSet ? 1 : 0;
        }

        public get version(): number {
            return this._contentWasSet ? this._shadowRoot ? this._shadowRoot.version : 0 : this._version;
        }

        /**
         * Gets the entry that this entry shadows.
         */
        public get shadowRoot(): VirtualFile | undefined {
            return this._shadowRoot;
        }

        /**
         * Gets the text content of this file.
         */
        public get content(): string | undefined {
            return this.readContent(/*updateAccessTime*/ false);
        }

        /**
         * Sets the text content of this file.
         */
        public set content(value: string | undefined) {
            this.writeContent(value, /*updateModificationType*/ false);
        }

        /**
         * Creates a shadow copy of this file. Changes made to the shadow do not affect
         * this file.
         */
        public shadow(shadowParent: VirtualDirectory): VirtualFile {
            this.shadowPreamble(shadowParent);
            const shadow = new VirtualFile(shadowParent, this.name);
            shadow._shadowRoot = this;
            shadow._contentWasSet = false;
            return shadow;
        }

        /**
         * Reads the content and updates the file's access time.
         */
        public readContent(updateAccessTime = true) {
            if (!this._contentWasSet) {
                const resolver = this._resolver;
                const shadowRoot = this._shadowRoot;
                if (resolver) {
                    this._resolver = undefined;
                    this._content = typeof resolver === "function" ? resolver(this) : resolver.getContent(this);
                    this._contentWasSet = true;
                    this._version = 1;
                }
                else if (shadowRoot) {
                    this._content = shadowRoot.content;
                    this._contentWasSet = true;
                    this._version = shadowRoot.version;
                }
            }
            if (this._content && updateAccessTime) {
                this.updateAccessTime();
            }
            return this._content;
        }

        /**
         * Writes the provided content and updates the file's modification time.
         */
        public writeContent(content: string | undefined, updateModificationTime = true) {
            if (this.content !== content) {
                this.writePreamble();
                this._resolver = undefined;
                this._content = content;
                if (!this._contentWasSet) {
                    this._contentWasSet = true;
                    if (this._shadowRoot) {
                        this._version = this._shadowRoot.version;
                    }
                }
                this._version++;
                if (content && updateModificationTime) {
                    this.updateModificationTime();
                }
                this.emit("contentChanged", this);
                this.emit("fileSystemChange", this.path, "modified");
            }
        }

        public getStats() {
            return super.getStatsCore(S_IFREG, this.content ? this.content.length : 0);
        }

        protected makeReadOnlyCore(): void { /*ignored*/ }
    }

    export class VirtualFileSymlink extends VirtualFile {
        private _targetPath: string;
        private _target: VirtualFile | undefined;
        private _onTargetParentChildRemoved: (entry: VirtualEntry) => void;
        private _onTargetContentChanged: () => void;
        private _onTargetFileSystemChange: (path: string, change: FileSystemChange) => void;

        constructor(parent: VirtualDirectory, name: string, target: string) {
            super(parent, name);
            this._targetPath = target;
            this._onTargetParentChildRemoved = entry => this.onTargetParentChildRemoved(entry);
            this._onTargetContentChanged = () => this.onTargetContentChanged();
            this._onTargetFileSystemChange = (path, change) => this.onTargetFileSystemChange(path, change);
        }

        public get version() {
            return this.target ? this.target.version : 0;
        }

        /**
         * Gets the path to the target of the symbolic link.
         */
        public get targetPath(): string {
            return this._targetPath;
        }

        /**
         * Sets the path to the target of the symbolic link.
         */
        public set targetPath(value: string) {
            if (this._targetPath !== value) {
                this.writePreamble();
                this._targetPath = vpath.resolve(this.path, value);
                this.invalidateTarget();
            }
        }

        /**
         * Gets the resolved target file for this symbolic link.
         */
        public get target(): VirtualFile | undefined {
            this.resolveTarget();
            return this._target;
        }

        /**
         * Gets a value indicating whether the symbolic link is broken.
         */
        public get isBroken(): boolean {
            return this.target === undefined;
        }

        /**
         * Gets the text content of this file.
         */
        public get content(): string | undefined {
            const target = this.target;
            return target && target.content;
        }

        /**
         * Sets the text content of this file.
         */
        public set content(value: string | undefined) {
            const target = this.target;
            if (target) target.content = value;
        }

        /**
         * Creates a shadow copy of this file. Changes made to the shadow do not affect
         * this file.
         */
        public shadow(shadowParent: VirtualDirectory) {
            this.shadowPreamble(shadowParent);
            const shadow = new VirtualFileSymlink(shadowParent, this.name, this.targetPath);
            shadow._shadowRoot = this;
            return shadow;
        }

        public readContent() {
            return this.content;
        }

        public writeContent(content: string) {
            this.content = content;
        }

        public readTargetPath() {
            const targetPath = this.targetPath;
            if (targetPath) this.updateAccessTime();
            return targetPath;
        }

        public writeTargetPath(targetPath: string) {
            this.targetPath = targetPath;
            if (targetPath) this.updateModificationTime();
        }

        public getStats() {
            return super.getStatsCore(S_IFLNK, this.targetPath.length);
        }

        protected invalidate() {
            super.invalidate();
            this.invalidateTarget();
        }

        private resolveTarget() {
            if (!this._target) {
                const entry = findTarget(this.fileSystem, this.targetPath);
                if (entry instanceof VirtualFile) {
                    this._target = entry;
                    if (this._target.parent) this._target.parent.addListener("childRemoved", this._onTargetParentChildRemoved);
                    this._target.addListener("contentChanged", this._onTargetContentChanged);
                    this._target.addListener("fileSystemChange", this._onTargetFileSystemChange);
                }
            }
        }

        private invalidateTarget() {
            if (!this._target) return;
            if (this._target.parent) this._target.parent.removeListener("childRemoved", this._onTargetParentChildRemoved);
            this._target.removeListener("contentChanged", this._onTargetContentChanged);
            this._target.removeListener("fileSystemChange", this._onTargetFileSystemChange);
            this._target = undefined;
        }

        private onTargetParentChildRemoved(entry: VirtualEntry) {
            if (entry === this._target) {
                this.invalidateTarget();
            }
        }

        private onTargetContentChanged() {
            this.emit("contentChanged", this);
        }

        protected onTargetFileSystemChange(_path: string, change: FileSystemChange) {
            this.emit("fileSystemChange", this.path, change);
        }
    }

    class VirtualFileView extends VirtualFileSymlink {
        /**
         * Creates a shadow copy of this file. Changes made to the shadow do not affect
         * this file.
         */
        public shadow(shadowParent: VirtualDirectory) {
            this.shadowPreamble(shadowParent);
            const shadow = new VirtualFileView(shadowParent, this.name, this.targetPath);
            shadow._shadowRoot = this;
            return shadow;
        }

        protected onTargetFileSystemChange() { /* views do not propagate file system events */ }
    }

    export class VirtualStats {
        public readonly dev: number;
        public readonly ino: number;
        public readonly mode: number;
        public readonly size: number;
        public readonly atimeMS: number;
        public readonly mtimeMS: number;
        public readonly ctimeMS: number;
        public readonly birthtimeMS: number;
        public readonly atime: Date;
        public readonly mtime: Date;
        public readonly ctime: Date;
        public readonly birthtime: Date;
        constructor(dev: number, ino: number, mode: number, size: number,
            atimeMS: number, mtimeMS: number, ctimeMS: number, birthtimeMS: number) {
            this.dev = dev;
            this.ino = ino;
            this.mode = mode;
            this.size = size;
            this.atimeMS = atimeMS;
            this.mtimeMS = mtimeMS;
            this.ctimeMS = ctimeMS;
            this.birthtimeMS = birthtimeMS;
            this.atime = new Date(atimeMS + 0.5);
            this.mtime = new Date(mtimeMS + 0.5);
            this.ctime = new Date(ctimeMS + 0.5);
            this.birthtime = new Date(birthtimeMS + 0.5);
        }

        public isFile() {
            return (this.mode & S_IFMT) === S_IFREG;
        }

        public isDirectory() {
            return (this.mode & S_IFMT) === S_IFDIR;
        }

        public isSymbolicLink() {
            return (this.mode & S_IFMT) === S_IFLNK;
        }
    }

    function findTarget(vfs: VirtualFileSystem, target: string, set?: Set<VirtualSymlink>): VirtualEntry | undefined {
        const entry = vfs.getEntry(target);
        if (entry instanceof VirtualFileSymlink || entry instanceof VirtualDirectorySymlink) {
            if (!set) set = new Set<VirtualSymlink>();
            if (set.has(entry)) return undefined;
            set.add(entry);
            return findTarget(vfs, entry.targetPath, set);
        }
        return entry;
    }

    function isMatch(entry: VirtualEntry, options: { pattern?: RegExp, kind?: "file" | "directory" }) {
        return (options.pattern === undefined || options.pattern.test(entry.name))
            && (options.kind !== (entry instanceof VirtualFile ? "directory" : "file"));
    }
}

namespace Utils {
    // TODO(rbuckton): Move or retire this.
    export class MockParseConfigHost extends vfs.VirtualFileSystem implements ts.ParseConfigHost {
        constructor(currentDirectory: string, ignoreCase: boolean, files: ts.Map<string> | string[]) {
            super(currentDirectory, ignoreCase);
            if (files instanceof Array) {
                for (const file of files) {
                    // this.addFile(file, new Harness.LanguageService.ScriptInfo(file, undefined, /*isRootFile*/false));
                    this.addFile(file).metadata.set("scriptInfo", new Harness.LanguageService.ScriptInfo(file, undefined, /*isRootFile*/ false));
                }
            }
            else {
                files.forEach((fileContent, fileName) => {
                    this.addFile(fileName, fileContent).metadata.set("scriptInfo", new Harness.LanguageService.ScriptInfo(fileName, fileContent, /*isRootFile*/ false));
                });
            }
        }

        readDirectory(path: string, extensions: ReadonlyArray<string>, excludes: ReadonlyArray<string>, includes: ReadonlyArray<string>, depth: number) {
            return ts.matchFiles(path, extensions, excludes, includes, this.useCaseSensitiveFileNames, this.currentDirectory, depth, (path: string) => this.getAccessibleFileSystemEntries(path));
        }
    }
}