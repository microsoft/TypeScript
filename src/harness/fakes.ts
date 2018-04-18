/// <reference path="./core.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./vfs.ts" />

// NOTE: The contents of this file are all exported from the namespace 'fakes'. This is to
//       support the eventual conversion of harness into a modular system.

// harness fakes
namespace fakes {
    const processExitSentinel = new Error("System exit");

    export interface ServerHostOptions {
        /**
         * The virtual path to tsc.js. If not specified, a default of `"/.ts/tsc.js"` is used.
         */
        executingFilePath?: string;
        newLine?: "\r\n" | "\n";
        safeList?: boolean;
        lib?: boolean;
        dos?: boolean;
    }

    export class ServerHost implements ts.server.ServerHost, ts.FormatDiagnosticsHost {
        public readonly vfs: vfs.FileSystem;
        public exitCode: number;
        private readonly _output: string[] = [];
        private readonly _executingFilePath: string;
        private readonly _getCanonicalFileName: (file: string) => string;

        constructor(vfs: vfs.FileSystem, options: ServerHostOptions = {}) {
            const {
                dos = false,
                executingFilePath = dos
                    ? vfsutils.dosTscPath
                    : vfsutils.tscPath,
                newLine = "\n",
                safeList = false,
                lib = false,
            } = options;

            this.vfs = vfs.isReadonly ? vfs.shadow() : vfs;
            this.useCaseSensitiveFileNames = !this.vfs.ignoreCase;
            this.newLine = newLine;
            this._executingFilePath = executingFilePath;
            this._getCanonicalFileName = ts.createGetCanonicalFileName(this.useCaseSensitiveFileNames);

            if (safeList) {
                const safelistPath = dos ? vfsutils.dosSafelistPath : vfsutils.safelistPath;
                this.vfs.mkdirpSync(vpath.dirname(safelistPath));
                this.vfs.writeFileSync(safelistPath, vfsutils.safelistContent);
            }

            if (lib) {
                const libPath = dos ? vfsutils.dosLibPath : vfsutils.libPath;
                this.vfs.mkdirpSync(vpath.dirname(libPath));
                this.vfs.writeFileSync(libPath, vfsutils.emptyLibContent);
            }
        }

        // #region System members
        public readonly newLine: string;
        public readonly useCaseSensitiveFileNames: boolean;

        public write(message: string) {
            this._output.push(message);
        }

        public readFile(path: string) {
            return vfsutils.readFile(this.vfs, path);
        }

        public writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
            vfsutils.writeFile(this.vfs, path, data, writeByteOrderMark);
        }

        public fileExists(path: string) {
            return vfsutils.fileExists(this.vfs, path);
        }

        public directoryExists(path: string) {
            return vfsutils.directoryExists(this.vfs, path);
        }

        public createDirectory(path: string): void {
            this.vfs.mkdirpSync(path);
        }

        public getCurrentDirectory() {
            return this.vfs.cwd();
        }

        public getDirectories(path: string) {
            return vfsutils.getDirectories(this.vfs, path);
        }

        public readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return ts.matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.vfs.cwd(), depth, path => {
                return vfsutils.getAccessibleFileSystemEntries(this.vfs, path);
            });
        }

        public exit(exitCode?: number) {
            this.exitCode = exitCode;
            throw processExitSentinel;
        }

        public readonly args: string[] = [];

        public getFileSize(path: string) {
            return vfsutils.getFileSize(this.vfs, path);
        }

        public watchFile(_path: string, _cb: ts.FileWatcherCallback): ts.FileWatcher {
            return { close(): void { /*ignored*/ } };
        }

        public watchDirectory(_path: string, _cb: ts.DirectoryWatcherCallback, _recursive?: boolean): ts.FileWatcher {
            return { close(): void { /*ignored*/ } };
        }

        public resolvePath(path: string) {
            return vpath.resolve(this.vfs.cwd(), path);
        }

        public getExecutingFilePath() {
            return this._executingFilePath;
        }

        public getModifiedTime(path: string) {
            return vfsutils.getModifiedTime(this.vfs, path);
        }

        public createHash(data: string): string {
            return data;
        }

        public realpath(path: string) {
            try {
                return this.vfs.realpathSync(path);
            }
            catch {
                return path;
            }
        }

        public getEnvironmentVariable(_name: string): string | undefined {
            return undefined;
        }

        public setTimeout(_callback: (...args: any[]) => void, _timeout: number, ..._args: any[]) {
            return ts.notImplemented();
        }

        public clearTimeout(_timeoutId: any): void {
            return ts.notImplemented();
        }
        // #endregion System members

        // #region FormatDiagnosticsHost members
        public getNewLine() {
            return this.newLine;
        }

        public getCanonicalFileName(fileName: string) {
            return this._getCanonicalFileName(fileName);
        }
        // #endregion FormatDiagnosticsHost members

        // #region ServerHost members
        public setImmediate(_callback: (...args: any[]) => void, ..._args: any[]): any {
            return ts.notImplemented();
        }

        public clearImmediate(_timeoutId: any): void {
            return ts.notImplemented();
        }
        // #endregion ServerHost members
    }
}

