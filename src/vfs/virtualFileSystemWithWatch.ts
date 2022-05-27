/* @internal */
namespace ts.VirtualFS {
    export interface VirtualServerHostCreationParameters {
        useCaseSensitiveFileNames?: boolean;
        executingFilePath: string;
        currentDirectory?: string;
        newLine?: string;
        windowsStyleRoot?: string;
    }

    export interface File {
        path: string;
        content: string;
        fileSize?: number;
    }

    export interface Folder {
        path: string;
    }

    export interface SymLink {
        /** Location of the symlink. */
        path: string;
        /** Relative path to the real file. */
        symLink: string;
    }

    export type FileOrFolderOrSymLink = File | Folder | SymLink;
    export function isFile(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is File {
        return isString((fileOrFolderOrSymLink as File).content);
    }

    export function isSymLink(fileOrFolderOrSymLink: FileOrFolderOrSymLink): fileOrFolderOrSymLink is SymLink {
        return isString((fileOrFolderOrSymLink as SymLink).symLink);
    }

    interface FSEntryBase {
        path: Path;
        fullPath: string;
        modifiedTime: Date;
    }

    export interface FsFile extends FSEntryBase {
        content: string;
        fileSize?: number;
    }

    export interface FsFolder extends FSEntryBase {
        entries: SortedArray<FSEntry>;
    }

    export interface FsSymLink extends FSEntryBase {
        symLink: string;
    }

    export type FSEntry = FsFile | FsFolder | FsSymLink;

    export function isFsFolder(s: FSEntry | undefined): s is FsFolder {
        return !!s && isArray((s as FsFolder).entries);
    }

    export function isFsFile(s: FSEntry | undefined): s is FsFile {
        return !!s && isString((s as FsFile).content);
    }

    export function isFsSymLink(s: FSEntry | undefined): s is FsSymLink {
        return !!s && isString((s as FsSymLink).symLink);
    }

    function invokeWatcherCallbacks<T>(callbacks: readonly T[] | undefined, invokeCallback: (cb: T) => void): void {
        if (callbacks) {
            // The array copy is made to ensure that even if one of the callback removes the callbacks,
            // we dont miss any callbacks following it
            const cbs = callbacks.slice();
            for (const cb of cbs) {
                invokeCallback(cb);
            }
        }
    }

    export function createWatcher<T>(map: MultiMap<Path, T>, path: Path, callback: T): FileWatcher {
        map.add(path, callback);
        return { close: () => map.remove(path, callback) };
    }

    export interface VirtualFileWatcher {
        cb: FileWatcherCallback;
        fileName: string;
        pollingInterval: PollingInterval;
    }

    export interface VirtualFsWatcher {
        cb: FsWatchCallback;
        directoryName: string;
        fallbackPollingInterval: PollingInterval;
        fallbackOptions: WatchOptions | undefined;
    }

    export interface ReloadWatchInvokeOptions {
        /** Invokes the directory watcher for the parent instead of the file changed */
        invokeDirectoryWatcherInsteadOfFileChanged: boolean;
        /** When new file is created, do not invoke watches for it */
        ignoreWatchInvokedWithTriggerAsFileCreate: boolean;
        /** Invoke the file delete, followed by create instead of file changed */
        invokeFileDeleteCreateAsPartInsteadOfChange: boolean;
    }

    export enum Tsc_WatchFile {
        DynamicPolling = "DynamicPriorityPolling",
        SingleFileWatcherPerName = "SingleFileWatcherPerName"
    }

    export enum Tsc_WatchDirectory {
        WatchFile = "RecursiveDirectoryUsingFsWatchFile",
        NonRecursiveWatchDirectory = "RecursiveDirectoryUsingNonRecursiveWatchDirectory",
        DynamicPolling = "RecursiveDirectoryUsingDynamicPriorityPolling"
    }

    /**
     * Use TestServerHost for tests or VirtualServerHost for virtual file systems.
     * This is a base for those two classes.
     *
     * also implements {server.ServerHost} but that would create a circular dependency
     */
    export abstract class VirtualServerBaseHost implements FormatDiagnosticsHost, ModuleResolutionHost {
        args: string[] = [];

        protected fs: ESMap<Path, FSEntry> = new Map();
        getCanonicalFileName: (s: string) => string;
        protected toPath: (f: string) => Path;

        readonly watchedFiles = createMultiMap<Path, VirtualFileWatcher>();
        readonly fsWatches = createMultiMap<Path, VirtualFsWatcher>();
        readonly fsWatchesRecursive = createMultiMap<Path, VirtualFsWatcher>();
        public readonly useCaseSensitiveFileNames: boolean;
        public readonly newLine: string;
        public readonly windowsStyleRoot?: string;
        private readonly executingFilePath: string;
        protected readonly currentDirectory: string;
        public storeFilesChangingSignatureDuringEmit = true;
        watchFile!: HostWatchFile;
        watchDirectory!: HostWatchDirectory;

        constructor({
            useCaseSensitiveFileNames, executingFilePath, currentDirectory,
            newLine, windowsStyleRoot
        }: VirtualServerHostCreationParameters) {
            this.useCaseSensitiveFileNames = !!useCaseSensitiveFileNames;
            this.newLine = newLine || "\n";
            this.windowsStyleRoot = windowsStyleRoot;
            currentDirectory = currentDirectory || "/";
            this.getCanonicalFileName = createGetCanonicalFileName(!!useCaseSensitiveFileNames);
            this.toPath = s => toPath(s, currentDirectory, this.getCanonicalFileName);
            this.executingFilePath = this.getHostSpecificPath(executingFilePath);
            this.currentDirectory = this.getHostSpecificPath(currentDirectory);
        }

        getNewLine() {
            return this.newLine;
        }

        toNormalizedAbsolutePath(s: string) {
            return getNormalizedAbsolutePath(s, this.currentDirectory);
        }

        toFullPath(s: string) {
            return this.toPath(this.toNormalizedAbsolutePath(s));
        }

        getHostSpecificPath(s: string) {
            if (this.windowsStyleRoot && s.startsWith(directorySeparator)) {
                return this.windowsStyleRoot + s.substring(1);
            }
            return s;
        }

        now() {
            return new Date();
        }

        modifyFile(filePath: string, content: string, options?: Partial<ReloadWatchInvokeOptions>) {
            const path = this.toFullPath(filePath);
            const currentEntry = this.fs.get(path);
            if (!currentEntry || !isFsFile(currentEntry)) {
                throw new Error(`file not present: ${filePath}`);
            }

            if (options && options.invokeFileDeleteCreateAsPartInsteadOfChange) {
                this.removeFileOrFolder(currentEntry, /*isRemoveableLeafFolder*/ false);
                this.ensureFileOrFolder({ path: filePath, content });
            }
            else {
                currentEntry.content = content;
                currentEntry.modifiedTime = this.now();
                this.fs.get(getDirectoryPath(currentEntry.path))!.modifiedTime = this.now();
                if (options && options.invokeDirectoryWatcherInsteadOfFileChanged) {
                    const directoryFullPath = getDirectoryPath(currentEntry.fullPath);
                    this.invokeFileWatcher(directoryFullPath, FileWatcherEventKind.Changed, /*useFileNameInCallback*/ true);
                    this.invokeFsWatchesCallbacks(directoryFullPath, "rename", currentEntry.fullPath);
                    this.invokeRecursiveFsWatches(directoryFullPath, "rename", currentEntry.fullPath);
                }
                else {
                    this.invokeFileAndFsWatches(currentEntry.fullPath, FileWatcherEventKind.Changed);
                }
            }
        }

        ensureFileOrFolder(fileOrDirectoryOrSymLink: FileOrFolderOrSymLink, ignoreWatchInvokedWithTriggerAsFileCreate?: boolean, ignoreParentWatch?: boolean) {
            if (isFile(fileOrDirectoryOrSymLink)) {
                const file = this.toFsFile(fileOrDirectoryOrSymLink);
                // file may already exist when updating existing type declaration file
                if (!this.fs.get(file.path)) {
                    const baseFolder = this.ensureFolder(getDirectoryPath(file.fullPath), ignoreParentWatch);
                    this.addFileOrFolderInFolder(baseFolder, file, ignoreWatchInvokedWithTriggerAsFileCreate);
                }
            }
            else if (isSymLink(fileOrDirectoryOrSymLink)) {
                const symLink = this.toFsSymLink(fileOrDirectoryOrSymLink);
                Debug.assert(!this.fs.get(symLink.path));
                const baseFolder = this.ensureFolder(getDirectoryPath(symLink.fullPath), ignoreParentWatch);
                this.addFileOrFolderInFolder(baseFolder, symLink, ignoreWatchInvokedWithTriggerAsFileCreate);
            }
            else {
                const fullPath = getNormalizedAbsolutePath(fileOrDirectoryOrSymLink.path, this.currentDirectory);
                this.ensureFolder(getDirectoryPath(fullPath), ignoreParentWatch);
                this.ensureFolder(fullPath, ignoreWatchInvokedWithTriggerAsFileCreate);
            }
        }

        private ensureFolder(fullPath: string, ignoreWatch: boolean | undefined): FsFolder {
            const path = this.toPath(fullPath);
            let folder = this.fs.get(path) as FsFolder;
            if (!folder) {
                folder = this.toFsFolder(fullPath);
                const baseFullPath = getDirectoryPath(fullPath);
                if (fullPath !== baseFullPath) {
                    // Add folder in the base folder
                    const baseFolder = this.ensureFolder(baseFullPath, ignoreWatch);
                    this.addFileOrFolderInFolder(baseFolder, folder, ignoreWatch);
                }
                else {
                    // root folder
                    Debug.assert(this.fs.size === 0 || !!this.windowsStyleRoot);
                    this.fs.set(path, folder);
                }
            }
            Debug.assert(isFsFolder(folder));
            return folder;
        }

        protected addFileOrFolderInFolder(folder: FsFolder, fileOrDirectory: FsFile | FsFolder | FsSymLink, ignoreWatch?: boolean) {
            if (!this.fs.has(fileOrDirectory.path)) {
                insertSorted(folder.entries, fileOrDirectory, (a, b) => compareStringsCaseSensitive(getBaseFileName(a.path), getBaseFileName(b.path)));
            }
            folder.modifiedTime = this.now();
            this.fs.set(fileOrDirectory.path, fileOrDirectory);

            if (ignoreWatch) {
                return;
            }
            this.invokeFileAndFsWatches(fileOrDirectory.fullPath, FileWatcherEventKind.Created);
            this.invokeFileAndFsWatches(folder.fullPath, FileWatcherEventKind.Changed);
        }

        protected removeFileOrFolder(fileOrDirectory: FsFile | FsFolder | FsSymLink, isRemovableLeafFolder: boolean, isRenaming = false) {
            const basePath = getDirectoryPath(fileOrDirectory.path);
            const baseFolder = this.fs.get(basePath) as FsFolder;
            if (basePath !== fileOrDirectory.path) {
                Debug.assert(!!baseFolder);
                baseFolder.modifiedTime = this.now();
                filterMutate(baseFolder.entries, entry => entry !== fileOrDirectory);
            }
            this.fs.delete(fileOrDirectory.path);

            if (isFsFolder(fileOrDirectory)) {
                Debug.assert(fileOrDirectory.entries.length === 0 || isRenaming);
            }
            this.invokeFileAndFsWatches(fileOrDirectory.fullPath, FileWatcherEventKind.Deleted);
            this.invokeFileAndFsWatches(baseFolder.fullPath, FileWatcherEventKind.Changed);
            if (basePath !== fileOrDirectory.path &&
                baseFolder.entries.length === 0 &&
                isRemovableLeafFolder) {
                this.removeFileOrFolder(baseFolder, isRemovableLeafFolder);
            }
        }

        deleteFile(filePath: string, deleteEmptyParentFolders = false) {
            const path = this.toFullPath(filePath);
            const currentEntry = this.fs.get(path) as FsFile;
            Debug.assert(isFsFile(currentEntry));
            this.removeFileOrFolder(currentEntry, deleteEmptyParentFolders);
        }

        protected watchFileWorker(fileName: string, cb: FileWatcherCallback, pollingInterval: PollingInterval) {
            return createWatcher(
                this.watchedFiles,
                this.toFullPath(fileName),
                { fileName, cb, pollingInterval }
            );
        }

        protected fsWatch(
            fileOrDirectory: string,
            _entryKind: FileSystemEntryKind,
            cb: FsWatchCallback,
            recursive: boolean,
            fallbackPollingInterval: PollingInterval,
            fallbackOptions: WatchOptions | undefined): FileWatcher {
            return createWatcher(
                recursive ? this.fsWatchesRecursive : this.fsWatches,
                this.toFullPath(fileOrDirectory),
                {
                    directoryName: fileOrDirectory,
                    cb,
                    fallbackPollingInterval,
                    fallbackOptions
                }
            );
        }

        invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind, useFileNameInCallback?: boolean) {
            invokeWatcherCallbacks(this.watchedFiles.get(this.toPath(fileFullPath)), ({ cb, fileName }) => cb(useFileNameInCallback ? fileName : fileFullPath, eventKind));
        }

        private fsWatchCallback(map: MultiMap<Path, VirtualFsWatcher>, fullPath: string, eventName: "rename" | "change", entryFullPath?: string) {
            invokeWatcherCallbacks(map.get(this.toPath(fullPath)), ({ cb }) => cb(eventName, entryFullPath ? this.getRelativePathToDirectory(fullPath, entryFullPath) : ""));
        }

        invokeFsWatchesCallbacks(fullPath: string, eventName: "rename" | "change", entryFullPath?: string) {
            this.fsWatchCallback(this.fsWatches, fullPath, eventName, entryFullPath);
        }

        invokeFsWatchesRecursiveCallbacks(fullPath: string, eventName: "rename" | "change", entryFullPath?: string) {
            this.fsWatchCallback(this.fsWatchesRecursive, fullPath, eventName, entryFullPath);
        }

        private getRelativePathToDirectory(directoryFullPath: string, fileFullPath: string) {
            return getRelativePathToDirectoryOrUrl(directoryFullPath, fileFullPath, this.currentDirectory, this.getCanonicalFileName, /*isAbsolutePathAnUrl*/ false);
        }

        private invokeRecursiveFsWatches(fullPath: string, eventName: "rename" | "change", entryFullPath?: string) {
            this.invokeFsWatchesRecursiveCallbacks(fullPath, eventName, entryFullPath);
            const basePath = getDirectoryPath(fullPath);
            if (this.getCanonicalFileName(fullPath) !== this.getCanonicalFileName(basePath)) {
                this.invokeRecursiveFsWatches(basePath, eventName, entryFullPath || fullPath);
            }
        }

        protected invokeFsWatches(fullPath: string, eventName: "rename" | "change") {
            this.invokeFsWatchesCallbacks(fullPath, eventName);
            this.invokeFsWatchesCallbacks(getDirectoryPath(fullPath), eventName, fullPath);
            this.invokeRecursiveFsWatches(fullPath, eventName);
        }

        protected invokeFileAndFsWatches(fileOrFolderFullPath: string, eventKind: FileWatcherEventKind) {
            this.invokeFileWatcher(fileOrFolderFullPath, eventKind);
            this.invokeFsWatches(fileOrFolderFullPath, eventKind === FileWatcherEventKind.Changed ? "change" : "rename");
        }

        private toFsEntry(path: string): FSEntryBase {
            const fullPath = getNormalizedAbsolutePath(path, this.currentDirectory);
            return {
                path: this.toPath(fullPath),
                fullPath,
                modifiedTime: this.now()
            };
        }

        protected toFsFile(file: File): FsFile {
            const fsFile = this.toFsEntry(file.path) as FsFile;
            fsFile.content = file.content;
            fsFile.fileSize = file.fileSize;
            return fsFile;
        }

        private toFsSymLink(symLink: SymLink): FsSymLink {
            const fsSymLink = this.toFsEntry(symLink.path) as FsSymLink;
            fsSymLink.symLink = getNormalizedAbsolutePath(symLink.symLink, getDirectoryPath(fsSymLink.fullPath));
            return fsSymLink;
        }

        protected toFsFolder(path: string): FsFolder {
            const fsFolder = this.toFsEntry(path) as FsFolder;
            fsFolder.entries = [] as FSEntry[] as SortedArray<FSEntry>; // https://github.com/Microsoft/TypeScript/issues/19873
            return fsFolder;
        }

        private getRealFsEntry<T extends FSEntry>(isFsEntry: (fsEntry: FSEntry) => fsEntry is T, path: Path, fsEntry = this.fs.get(path)!): T | undefined {
            if (isFsEntry(fsEntry)) {
                return fsEntry;
            }

            if (isFsSymLink(fsEntry)) {
                return this.getRealFsEntry(isFsEntry, this.toPath(fsEntry.symLink));
            }

            if (fsEntry) {
                // This fs entry is something else
                return undefined;
            }

            const realpath = this.toPath(this.realpath(path));
            if (path !== realpath) {
                return this.getRealFsEntry(isFsEntry, realpath);
            }

            return undefined;
        }

        private isFsFile(fsEntry: FSEntry) {
            return !!this.getRealFile(fsEntry.path, fsEntry);
        }

        protected getRealFile(path: Path, fsEntry?: FSEntry): FsFile | undefined {
            return this.getRealFsEntry(isFsFile, path, fsEntry);
        }

        private isFsFolder(fsEntry: FSEntry) {
            return !!this.getRealFolder(fsEntry.path, fsEntry);
        }

        private getRealFolder(path: Path, fsEntry = this.fs.get(path)): FsFolder | undefined {
            return this.getRealFsEntry(isFsFolder, path, fsEntry);
        }

        fileExists(s: string) {
            const path = this.toFullPath(s);
            return !!this.getRealFile(path);
        }

        getModifiedTime(s: string) {
            const path = this.toFullPath(s);
            const fsEntry = this.fs.get(path);
            return (fsEntry && fsEntry.modifiedTime)!; // TODO: GH#18217
        }

        setModifiedTime(s: string, date: Date) {
            const path = this.toFullPath(s);
            const fsEntry = this.fs.get(path);
            if (fsEntry) {
                fsEntry.modifiedTime = date;
                this.invokeFileAndFsWatches(fsEntry.fullPath, FileWatcherEventKind.Changed);
            }
        }

        readFile(s: string): string | undefined {
            const fsEntry = this.getRealFile(this.toFullPath(s));
            return fsEntry ? fsEntry.content : undefined;
        }

        getFileSize(s: string) {
            const path = this.toFullPath(s);
            const entry = this.fs.get(path)!;
            if (isFsFile(entry)) {
                return entry.fileSize ? entry.fileSize : entry.content.length;
            }
            return undefined!; // TODO: GH#18217
        }

        directoryExists(s: string) {
            const path = this.toFullPath(s);
            return !!this.getRealFolder(path);
        }

        getDirectories(s: string): string[] {
            const path = this.toFullPath(s);
            const folder = this.getRealFolder(path);
            if (folder) {
                return mapDefined(folder.entries, entry => this.isFsFolder(entry) ? getBaseFileName(entry.fullPath) : undefined);
            }
            Debug.fail(folder ? "getDirectories called on file" : "getDirectories called on missing folder");
            return [];
        }

        readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
            return matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, (dir) => {
                const directories: string[] = [];
                const files: string[] = [];
                const folder = this.getRealFolder(this.toPath(dir));
                if (folder) {
                    folder.entries.forEach((entry) => {
                        if (this.isFsFolder(entry)) {
                            directories.push(getBaseFileName(entry.fullPath));
                        }
                        else if (this.isFsFile(entry)) {
                            files.push(getBaseFileName(entry.fullPath));
                        }
                        else {
                            Debug.fail("Unknown entry");
                        }
                    });
                }
                return { directories, files };
            }, path => this.realpath(path));
        }

        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): any {
            // eslint-disable-next-line no-restricted-globals
            setTimeout(callback, ms, ...args);
        }

        clearTimeout(_timeoutId: any): void {
            throw new Error("clearTimeout Not implemented in virtual filesystem host.");
        }

        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any {
            // eslint-disable-next-line no-restricted-globals
            setImmediate(callback, ...args);
        }

        clearImmediate(_timeoutId: any): void {
            throw new Error("clearImmediate Not implemented in virtual filesystem host.");
        }

        createDirectory(directoryName: string, recursive?: boolean): void {
            const folder = this.toFsFolder(directoryName);

            const base = getDirectoryPath(folder.path);
            if (recursive && base !== directoryName && !this.getRealFolder(base)) {
                if (base === "/") {
                    // create / if not present, then continue
                    this.ensureFolder("/", /*ignoreWatch*/ false);
                }
                else {
                    this.createDirectory(base, recursive);
                }
            }

            // base folder has to be present
            const baseFolder = this.fs.get(base) as FsFolder;
            Debug.assert(isFsFolder(baseFolder));

            Debug.assert(!this.fs.get(folder.path));
            this.addFileOrFolderInFolder(baseFolder, folder);
        }

        writeFile(path: string, content: string): void {
            const file = this.toFsFile({ path, content });

            // base folder has to be present
            const base = getDirectoryPath(file.path);
            const folder = Debug.checkDefined(this.getRealFolder(base));

            if (folder.path === base) {
                if (!this.fs.has(file.path)) {
                    this.addFileOrFolderInFolder(folder, file);
                }
                else {
                    this.modifyFile(path, content);
                }
            }
            else {
                this.writeFile(this.realpath(path), content);
            }
        }

        write(_message: string) {
            // Do nothing
        }

        realpath(s: string): string {
            const fullPath = this.toNormalizedAbsolutePath(s);
            const path = this.toPath(fullPath);
            if (getDirectoryPath(path) === path) {
                // Root
                return s;
            }
            const dirFullPath = this.realpath(getDirectoryPath(fullPath));
            const realFullPath = combinePaths(dirFullPath, getBaseFileName(fullPath));
            const fsEntry = this.fs.get(this.toPath(realFullPath))!;
            if (isFsSymLink(fsEntry)) {
                return this.realpath(fsEntry.symLink);
            }

            // realpath supports non-existent files, so there may not be an fsEntry
            return fsEntry?.fullPath || realFullPath;
        }

        readonly exitMessage = "System Exit";
        exitCode: number | undefined;
        readonly resolvePath = (s: string) => s;
        readonly getExecutingFilePath = () => this.executingFilePath;
        readonly getCurrentDirectory = () => this.currentDirectory;
        exit(exitCode?: number) {
            this.exitCode = exitCode;
            throw new Error(this.exitMessage);
        }

        getEnvironmentVariable(_name: string) {
            return "";
        }

        snap(): ESMap<Path, FSEntry> {
            const result = new Map<Path, FSEntry>();
            this.fs.forEach((value, key) => {
                const cloneValue = clone(value);
                if (isFsFolder(cloneValue)) {
                    cloneValue.entries = cloneValue.entries.map(clone) as SortedArray<FSEntry>;
                }
                result.set(key, cloneValue);
            });

            return result;
        }

        writtenFiles?: ESMap<Path, number>;
        diff(baseline: string[], base: ESMap<string, FSEntry> = new Map()) {
            this.fs.forEach(newFsEntry => {
                diffFsEntry(baseline, base.get(newFsEntry.path), newFsEntry, this.writtenFiles);
            });
            base.forEach(oldFsEntry => {
                const newFsEntry = this.fs.get(oldFsEntry.path);
                if (!newFsEntry) {
                    diffFsEntry(baseline, oldFsEntry, newFsEntry, this.writtenFiles);
                }
            });
            baseline.push("");
        }
    }

    export class VirtualServerHost extends VirtualServerBaseHost {
        constructor(options: VirtualServerHostCreationParameters) {
            super(options);
            const { watchFile, watchDirectory } = createSystemWatchFunctions({
                // We dont have polling watch file
                // it is essentially fsWatch but lets get that separate from fsWatch and
                // into watchedFiles for easier testing
                pollingWatchFile: this.watchFileWorker.bind(this),
                getModifiedTime: this.getModifiedTime.bind(this),
                setTimeout: this.setTimeout.bind(this),
                clearTimeout: this.clearTimeout.bind(this),
                fsWatch: this.fsWatch.bind(this),
                fileExists: this.fileExists.bind(this),
                useCaseSensitiveFileNames: this.useCaseSensitiveFileNames,
                getCurrentDirectory: this.getCurrentDirectory.bind(this),
                fsSupportsRecursiveFsWatch: true,
                directoryExists: this.directoryExists.bind(this),
                getAccessibleSortedChildDirectories: path => this.getDirectories(path),
                realpath: this.realpath.bind(this),
                tscWatchFile: undefined,
                tscWatchDirectory: undefined,
                defaultWatchFileKind: () => undefined,
            });
            this.watchFile = watchFile;
            this.watchDirectory = watchDirectory;
        }
    }

    function diffFsFile(baseline: string[], fsEntry: FsFile) {
        baseline.push(`//// [${fsEntry.fullPath}]\r\n${fsEntry.content}`, "");
    }

    function diffFsSymLink(baseline: string[], fsEntry: FsSymLink) {
        baseline.push(`//// [${fsEntry.fullPath}] symlink(${fsEntry.symLink})`);
    }

    function diffFsEntry(baseline: string[], oldFsEntry: FSEntry | undefined, newFsEntry: FSEntry | undefined, writtenFiles: ESMap<string, any> | undefined): void {
        const file = newFsEntry && newFsEntry.fullPath;
        if (isFsFile(oldFsEntry)) {
            if (isFsFile(newFsEntry)) {
                if (oldFsEntry.content !== newFsEntry.content) {
                    diffFsFile(baseline, newFsEntry);
                }
                else if (oldFsEntry.modifiedTime !== newFsEntry.modifiedTime) {
                    if (oldFsEntry.fullPath !== newFsEntry.fullPath) {
                        baseline.push(`//// [${file}] file was renamed from file ${oldFsEntry.fullPath}`);
                    }
                    else if (writtenFiles && !writtenFiles.has(newFsEntry.path)) {
                        baseline.push(`//// [${file}] file changed its modified time`);
                    }
                    else {
                        baseline.push(`//// [${file}] file written with same contents`);
                    }
                }
            }
            else {
                baseline.push(`//// [${oldFsEntry.fullPath}] deleted`);
                if (isFsSymLink(newFsEntry)) {
                    diffFsSymLink(baseline, newFsEntry);
                }
            }
        }
        else if (isFsSymLink(oldFsEntry)) {
            if (isFsSymLink(newFsEntry)) {
                if (oldFsEntry.symLink !== newFsEntry.symLink) {
                    diffFsSymLink(baseline, newFsEntry);
                }
                else if (oldFsEntry.modifiedTime !== newFsEntry.modifiedTime) {
                    if (oldFsEntry.fullPath !== newFsEntry.fullPath) {
                        baseline.push(`//// [${file}] symlink was renamed from symlink ${oldFsEntry.fullPath}`);
                    }
                    else if (writtenFiles && !writtenFiles.has(newFsEntry.path)) {
                        baseline.push(`//// [${file}] symlink changed its modified time`);
                    }
                    else {
                        baseline.push(`//// [${file}] symlink written with same link`);
                    }
                }
            }
            else {
                baseline.push(`//// [${oldFsEntry.fullPath}] deleted symlink`);
                if (isFsFile(newFsEntry)) {
                    diffFsFile(baseline, newFsEntry);
                }
            }
        }
        else if (isFsFile(newFsEntry)) {
            diffFsFile(baseline, newFsEntry);
        }
        else if (isFsSymLink(newFsEntry)) {
            diffFsSymLink(baseline, newFsEntry);
        }
    }
}
