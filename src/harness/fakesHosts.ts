namespace fakes {
    const processExitSentinel = new Error("System exit");

    export interface SystemOptions {
        executingFilePath?: string;
        newLine?: "\r\n" | "\n";
        env?: Record<string, string>;
    }

    /**
     * A fake `ts.System` that leverages a virtual file system.
     */
    export class System implements ts.System {
        public readonly vfs: vfs.FileSystem;
        public readonly args: string[] = [];
        public readonly output: string[] = [];
        public readonly newLine: string;
        public readonly useCaseSensitiveFileNames: boolean;
        public exitCode: number | undefined;

        private readonly _executingFilePath: string | undefined;
        private readonly _env: Record<string, string> | undefined;

        constructor(vfs: vfs.FileSystem, { executingFilePath, newLine = "\r\n", env }: SystemOptions = {}) {
            this.vfs = vfs.isReadonly ? vfs.shadow() : vfs;
            this.useCaseSensitiveFileNames = !this.vfs.ignoreCase;
            this.newLine = newLine;
            this._executingFilePath = executingFilePath;
            this._env = env;
        }

        private testTerminalWidth = Number.parseInt(this.getEnvironmentVariable("TS_TEST_TERMINAL_WIDTH"));
        getWidthOfTerminal = Number.isNaN(this.testTerminalWidth) ? undefined : () => this.testTerminalWidth;

        // Pretty output
        writeOutputIsTTY() {
            return true;
        }

        public write(message: string) {
            this.output.push(message);
        }

        public readFile(path: string) {
            try {
                const content = this.vfs.readFileSync(path, "utf8");
                return content === undefined ? undefined : Utils.removeByteOrderMark(content);
            }
            catch {
                return undefined;
            }
        }

        public writeFile(path: string, data: string, writeByteOrderMark?: boolean): void {
            this.vfs.mkdirpSync(vpath.dirname(path));
            this.vfs.writeFileSync(path, writeByteOrderMark ? Utils.addUTF8ByteOrderMark(data) : data);
        }

        public deleteFile(path: string) {
            this.vfs.unlinkSync(path);
        }

        public fileExists(path: string) {
            const stats = this._getStats(path);
            return stats ? stats.isFile() : false;
        }

        public directoryExists(path: string) {
            const stats = this._getStats(path);
            return stats ? stats.isDirectory() : false;
        }

        public createDirectory(path: string): void {
            this.vfs.mkdirpSync(path);
        }

        public getCurrentDirectory() {
            return this.vfs.cwd();
        }

        public getDirectories(path: string) {
            const result: string[] = [];
            try {
                for (const file of this.vfs.readdirSync(path)) {
                    if (this.vfs.statSync(vpath.combine(path, file)).isDirectory()) {
                        result.push(file);
                    }
                }
            }
            catch { /*ignore*/ }
            return result;
        }

        public readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
            return ts.matchFiles(path, extensions, exclude, include, this.useCaseSensitiveFileNames, this.getCurrentDirectory(), depth, path => this.getAccessibleFileSystemEntries(path), path => this.realpath(path));
        }

        public getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries {
            const files: string[] = [];
            const directories: string[] = [];
            try {
                for (const file of this.vfs.readdirSync(path)) {
                    try {
                        const stats = this.vfs.statSync(vpath.combine(path, file));
                        if (stats.isFile()) {
                            files.push(file);
                        }
                        else if (stats.isDirectory()) {
                            directories.push(file);
                        }
                    }
                    catch { /*ignored*/ }
                }
            }
            catch { /*ignored*/ }
            return { files, directories };
        }

        public exit(exitCode?: number) {
            this.exitCode = exitCode;
            throw processExitSentinel;
        }

        public getFileSize(path: string) {
            const stats = this._getStats(path);
            return stats && stats.isFile() ? stats.size : 0;
        }

        public resolvePath(path: string) {
            return vpath.resolve(this.vfs.cwd(), path);
        }

        public getExecutingFilePath() {
            if (this._executingFilePath === undefined) return ts.notImplemented();
            return this._executingFilePath;
        }

        public getModifiedTime(path: string) {
            const stats = this._getStats(path);
            return stats ? stats.mtime : undefined!; // TODO: GH#18217
        }

        public setModifiedTime(path: string, time: Date) {
            this.vfs.utimesSync(path, time, time);
        }

        public createHash(data: string): string {
            return `${ts.generateDjb2Hash(data)}-${data}`;
        }

        public realpath(path: string) {
            try {
                return this.vfs.realpathSync(path);
            }
            catch {
                return path;
            }
        }

        public getEnvironmentVariable(name: string): string {
            return (this._env && this._env[name])!; // TODO: GH#18217
        }

        private _getStats(path: string) {
            try {
                return this.vfs.existsSync(path) ? this.vfs.statSync(path) : undefined;
            }
            catch {
                return undefined;
            }
        }

        now() {
            return new Date(this.vfs.time());
        }
    }

    /**
     * A fake `ts.ParseConfigHost` that leverages a virtual file system.
     */
    export class ParseConfigHost implements ts.ParseConfigHost {
        public readonly sys: System;

        constructor(sys: System | vfs.FileSystem) {
            if (sys instanceof vfs.FileSystem) sys = new System(sys);
            this.sys = sys;
        }

        public get vfs() {
            return this.sys.vfs;
        }

        public get useCaseSensitiveFileNames() {
            return this.sys.useCaseSensitiveFileNames;
        }

        public fileExists(fileName: string): boolean {
            return this.sys.fileExists(fileName);
        }

        public directoryExists(directoryName: string): boolean {
            return this.sys.directoryExists(directoryName);
        }

        public readFile(path: string): string | undefined {
            return this.sys.readFile(path);
        }

        public readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
            return this.sys.readDirectory(path, extensions, excludes, includes, depth);
        }
    }

    /**
     * @implements {server.ServerHost} but that would create a circular dependency
     */
    export class FakeServerHost extends System {
        timeoutCallbacks = new Callbacks()
        immediateCallbacks = new Callbacks()
        readonly watchedFiles = ts.createMultiMap<ts.Path, TestFileWatcher>();
        readonly fsWatches = ts.createMultiMap<ts.Path, TestFsWatcher>();
        readonly fsWatchesRecursive = ts.createMultiMap<ts.Path, TestFsWatcher>();
        readonly currentDirectory: string // TODO: Needed? Probably not
        readonly toPath: (f: string) => ts.Path;
        watchFile: ts.HostWatchFile
        watchDirectory: ts.HostWatchDirectory
        constructor(vfs: vfs.FileSystem, options: SystemOptions = {}) {
            super(vfs, options)

            this.currentDirectory = '/'; // THIS IS FINE
            this.toPath = s => ts.toPath(s, this.currentDirectory, s => s);

            const { watchFile, watchDirectory } = ts.createSystemWatchFunctions({
                // We dont have polling watch file
                // it is essentially fsWatch but lets get that separate from fsWatch and
                // into watchedFiles for easier testing
                pollingWatchFile: /*tscWatchFile === Tsc_WatchFile.SingleFileWatcherPerName ?
                    createSingleFileWatcherPerName(
                        this.watchFileWorker.bind(this),
                        this.useCaseSensitiveFileNames
                    ) :*/
                    this.watchFileWorker.bind(this),
                getModifiedTime: this.getModifiedTime.bind(this),
                setTimeout: this.setTimeout.bind(this),
                clearTimeout: this.clearTimeout.bind(this),
                fsWatch: this.fsWatch.bind(this),
                fileExists: this.fileExists.bind(this),
                useCaseSensitiveFileNames: this.useCaseSensitiveFileNames,
                getCurrentDirectory: this.getCurrentDirectory.bind(this),
                // TODO: Tests usually set "run without recursive watches" to true, except for two tests
                // watchOptions/with excludeFiles option${...}
                // and the same, but excludeDirectories
                // .............guessing that it's true on a real FS
                fsSupportsRecursiveFsWatch: true, /*tscWatchDirectory ? false : !runWithoutRecursiveWatches */
                directoryExists: this.directoryExists.bind(this),
                getAccessibleSortedChildDirectories: path => this.getDirectories(path),
                realpath: this.realpath.bind(this),
                tscWatchFile: undefined,
                tscWatchDirectory: undefined,
                defaultWatchFileKind: () => undefined, // () => this.defaultWatchFileKind?.(),
            })
            this.watchFile = watchFile
            this.watchDirectory = watchDirectory
        }
        setTimeout(callback: (...args: any[]) => void, _ms: number, ...args: any[]): any {
            return this.timeoutCallbacks.register(callback, args)
        }
        clearTimeout(timeoutId: any): void {
            this.timeoutCallbacks.unregister(timeoutId)
        }
        setImmediate(callback: (...args: any[]) => void, ...args: any[]): any {
            return this.immediateCallbacks.register(callback, args)
        }
        clearImmediate(timeoutId: any): void {
            this.immediateCallbacks.unregister(timeoutId)
        }
        watchFileWorker(fileName: string, cb: ts.FileWatcherCallback, pollingInterval: ts.PollingInterval) {
            console.log('watchfileworker')
            return createWatcher(
                this.watchedFiles,
                this.toFullPath(fileName),
                { fileName, cb, pollingInterval }
            );
        }

        fsWatch(
            fileOrDirectory: string,
            _entryKind: ts.FileSystemEntryKind,
            cb: ts.FsWatchCallback,
            recursive: boolean,
            fallbackPollingInterval: ts.PollingInterval,
            fallbackOptions: ts.WatchOptions | undefined): ts.FileWatcher {
            console.log('fswatch')
            /*return this.runWithFallbackPolling ?
                this.watchFile(
                    fileOrDirectory,
                    createFileWatcherCallback(cb),
                    fallbackPollingInterval,
                    fallbackOptions
                ) :*/
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
        toFullPath(s: string) {
            return this.toPath(this.toNormalizedAbsolutePath(s));
        }
        toNormalizedAbsolutePath(s: string) {
            return ts.getNormalizedAbsolutePath(s, this.currentDirectory);
        }
    }
    function createWatcher<T>(map: ts.MultiMap<ts.Path, T>, path: ts.Path, callback: T): ts.FileWatcher {
        map.add(path, callback);
        return { close: () => map.remove(path, callback) };
    }
    /** Copied from virtualFileSystemWithWatch */
    type TimeOutCallback = () => any;
    /** Copied from virtualFileSystemWithWatch */
    interface TestFileWatcher {
        cb: ts.FileWatcherCallback;
        fileName: string;
        pollingInterval: ts.PollingInterval;
    }
    /** Copied from virtualFileSystemWithWatch */
    interface TestFsWatcher {
        cb: ts.FsWatchCallback;
        directoryName: string;
        fallbackPollingInterval: ts.PollingInterval;
        fallbackOptions: ts.WatchOptions | undefined;
    }
    /** Copied from virtualFileSystemWithWatch */
    class Callbacks {
        private map: TimeOutCallback[] = [];
        private nextId = 1;
        getNextId() {
            return this.nextId;
        }
        register(cb: (...args: any[]) => void, args: any[]) {
            const timeoutId = this.nextId;
            this.nextId++;
            this.map[timeoutId] = cb.bind(/*this*/ undefined, ...args);
            return timeoutId;
        }
        unregister(id: any) {
            if (typeof id === "number") {
                delete this.map[id];
            }
        }
        count() {
            // ??????????????????????????????????????????????????????????????????
            let n = 0;
            for (const _ in this.map) {
                n++;
            }
            return n;
        }
        invoke(invokeKey?: number) {
            if (invokeKey) {
                this.map[invokeKey]();
                delete this.map[invokeKey];
                return;
            }
            // Note: invoking a callback may result in new callbacks been queued,
            // so do not clear the entire callback list regardless. Only remove the
            // ones we have invoked.
            for (const key in this.map) {
                this.map[key]();
                delete this.map[key];
            }
        }
    }
    /**
     * A fake `ts.CompilerHost` that leverages a virtual file system.
     */
    export class CompilerHost implements ts.CompilerHost {
        public readonly sys: System;
        public readonly defaultLibLocation: string;
        public readonly outputs: documents.TextDocument[] = [];
        private readonly _outputsMap: collections.SortedMap<string, number>;
        public readonly traces: string[] = [];
        public readonly shouldAssertInvariants = !Harness.lightMode;
                protected _setParentNodes: boolean;
        protected _sourceFiles: collections.SortedMap<string, ts.SourceFile>;
        private _parseConfigHost: ParseConfigHost | undefined;
        private _newLine: string;

        constructor(sys: System | vfs.FileSystem, options = ts.getDefaultCompilerOptions(), setParentNodes = false) {
            if (sys instanceof vfs.FileSystem) sys = new System(sys);
            this.sys = sys;
            this.defaultLibLocation = sys.vfs.meta.get("defaultLibLocation") || "";
            this._newLine = ts.getNewLineCharacter(options, () => this.sys.newLine);
            this._sourceFiles = new collections.SortedMap<string, ts.SourceFile>({ comparer: sys.vfs.stringComparer, sort: "insertion" });
            this._setParentNodes = setParentNodes;
            this._outputsMap = new collections.SortedMap(this.vfs.stringComparer);
        }

        public get vfs() {
            return this.sys.vfs;
        }

        public get parseConfigHost() {
            return this._parseConfigHost || (this._parseConfigHost = new ParseConfigHost(this.sys));
        }

        public getCurrentDirectory(): string {
            return this.sys.getCurrentDirectory();
        }

        public useCaseSensitiveFileNames(): boolean {
            return this.sys.useCaseSensitiveFileNames;
        }

        public getNewLine(): string {
            return this._newLine;
        }

        public getCanonicalFileName(fileName: string): string {
            return this.sys.useCaseSensitiveFileNames ? fileName : fileName.toLowerCase();
        }

        public deleteFile(fileName: string) {
            this.sys.deleteFile(fileName);
        }

        public fileExists(fileName: string): boolean {
            return this.sys.fileExists(fileName);
        }

        public directoryExists(directoryName: string): boolean {
            return this.sys.directoryExists(directoryName);
        }

        public getModifiedTime(fileName: string) {
            return this.sys.getModifiedTime(fileName);
        }

        public setModifiedTime(fileName: string, time: Date) {
            return this.sys.setModifiedTime(fileName, time);
        }

        public getDirectories(path: string): string[] {
            return this.sys.getDirectories(path);
        }

        public readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
            return this.sys.readDirectory(path, extensions, exclude, include, depth);
        }

        public readFile(path: string): string | undefined {
            return this.sys.readFile(path);
        }

        public writeFile(fileName: string, content: string, writeByteOrderMark: boolean) {
            if (writeByteOrderMark) content = Utils.addUTF8ByteOrderMark(content);
            this.sys.writeFile(fileName, content);

            const document = new documents.TextDocument(fileName, content);
            document.meta.set("fileName", fileName);
            this.vfs.filemeta(fileName).set("document", document);
            if (!this._outputsMap.has(document.file)) {
                this._outputsMap.set(document.file, this.outputs.length);
                this.outputs.push(document);
            }
            this.outputs[this._outputsMap.get(document.file)!] = document;
        }

        public trace(s: string): void {
            this.traces.push(s);
        }

        public realpath(path: string): string {
            return this.sys.realpath(path);
        }

        public getDefaultLibLocation(): string {
            return vpath.resolve(this.getCurrentDirectory(), this.defaultLibLocation);
        }

        public getDefaultLibFileName(options: ts.CompilerOptions): string {
            return vpath.resolve(this.getDefaultLibLocation(), ts.getDefaultLibFileName(options));
        }

        public getSourceFile(fileName: string, languageVersion: number): ts.SourceFile | undefined {
            const canonicalFileName = this.getCanonicalFileName(vpath.resolve(this.getCurrentDirectory(), fileName));
            const existing = this._sourceFiles.get(canonicalFileName);
            if (existing) return existing;

            const content = this.readFile(canonicalFileName);
            if (content === undefined) return undefined;

            // A virtual file system may shadow another existing virtual file system. This
            // allows us to reuse a common virtual file system structure across multiple
            // tests. If a virtual file is a shadow, it is likely that the file will be
            // reused across multiple tests. In that case, we cache the SourceFile we parse
            // so that it can be reused across multiple tests to avoid the cost of
            // repeatedly parsing the same file over and over (such as lib.d.ts).
            const cacheKey = this.vfs.shadowRoot && `SourceFile[languageVersion=${languageVersion},setParentNodes=${this._setParentNodes}]`;
            if (cacheKey) {
                const meta = this.vfs.filemeta(canonicalFileName);
                const sourceFileFromMetadata = meta.get(cacheKey) as ts.SourceFile | undefined;
                if (sourceFileFromMetadata && sourceFileFromMetadata.getFullText() === content) {
                    this._sourceFiles.set(canonicalFileName, sourceFileFromMetadata);
                    return sourceFileFromMetadata;
                }
            }

            const parsed = ts.createSourceFile(fileName, content, languageVersion, this._setParentNodes || this.shouldAssertInvariants);
            if (this.shouldAssertInvariants) {
                Utils.assertInvariants(parsed, /*parent*/ undefined);
            }

            this._sourceFiles.set(canonicalFileName, parsed);

            if (cacheKey) {
                // store the cached source file on the unshadowed file with the same version.
                const stats = this.vfs.statSync(canonicalFileName);

                let fs = this.vfs;
                while (fs.shadowRoot) {
                    try {
                        const shadowRootStats = fs.shadowRoot.existsSync(canonicalFileName) ? fs.shadowRoot.statSync(canonicalFileName) : undefined!; // TODO: GH#18217
                        if (shadowRootStats.dev !== stats.dev ||
                            shadowRootStats.ino !== stats.ino ||
                            shadowRootStats.mtimeMs !== stats.mtimeMs) {
                            break;
                        }

                        fs = fs.shadowRoot;
                    }
                    catch {
                        break;
                    }
                }

                if (fs !== this.vfs) {
                    fs.filemeta(canonicalFileName).set(cacheKey, parsed);
                }
            }

            return parsed;
        }

    }

    export type ExpectedDiagnosticMessage = [ts.DiagnosticMessage, ...(string | number)[]];
    export interface ExpectedDiagnosticMessageChain {
        message: ExpectedDiagnosticMessage;
        next?: ExpectedDiagnosticMessageChain[];
    }

    export interface ExpectedDiagnosticLocation {
        file: string;
        start: number;
        length: number;
    }
    export interface ExpectedDiagnosticRelatedInformation extends ExpectedDiagnosticMessageChain {
        location?: ExpectedDiagnosticLocation;
    }

    export enum DiagnosticKind {
        Error = "Error",
        Status = "Status"
    }
    export interface ExpectedErrorDiagnostic extends ExpectedDiagnosticRelatedInformation {
        relatedInformation?: ExpectedDiagnosticRelatedInformation[];
    }

    export type ExpectedDiagnostic = ExpectedDiagnosticMessage | ExpectedErrorDiagnostic;

    export interface SolutionBuilderDiagnostic {
        kind: DiagnosticKind;
        diagnostic: ts.Diagnostic;
    }

   function indentedText(indent: number, text: string) {
        if (!indent) return text;
        let indentText = "";
        for (let i = 0; i < indent; i++) {
            indentText += "  ";
        }
        return `
${indentText}${text}`;
    }

    function expectedDiagnosticMessageToText([message, ...args]: ExpectedDiagnosticMessage) {
        let text = ts.getLocaleSpecificMessage(message);
        if (args.length) {
            text = ts.formatStringFromArgs(text, args);
        }
        return text;
    }

    function expectedDiagnosticMessageChainToText({ message, next }: ExpectedDiagnosticMessageChain, indent = 0) {
        let text = indentedText(indent, expectedDiagnosticMessageToText(message));
        if (next) {
            indent++;
            next.forEach(kid => text += expectedDiagnosticMessageChainToText(kid, indent));
        }
        return text;
    }

    function diagnosticMessageChainToText({ messageText, next}: ts.DiagnosticMessageChain, indent = 0) {
        let text = indentedText(indent, messageText);
        if (next) {
            indent++;
            next.forEach(kid => text += diagnosticMessageChainToText(kid, indent));
        }
        return text;
    }

    function diagnosticRelatedInformationToText({ file, start, length, messageText }: ts.DiagnosticRelatedInformation) {
        const text = typeof messageText === "string" ?
            messageText :
            diagnosticMessageChainToText(messageText);
        return file ?
            `${file.fileName}(${start}:${length}):: ${text}` :
            text;
    }

    function diagnosticToText({ kind, diagnostic: { relatedInformation, ...diagnosticRelatedInformation } }: SolutionBuilderDiagnostic) {
        let text = `${kind}!: ${diagnosticRelatedInformationToText(diagnosticRelatedInformation)}`;
        if (relatedInformation) {
            for (const kid of relatedInformation) {
                text += `
  related:: ${diagnosticRelatedInformationToText(kid)}`;
            }
        }
        return text;
    }

    export const version = "FakeTSVersion";

    export function patchHostForBuildInfoReadWrite<T extends ts.System>(sys: T) {
        const originalReadFile = sys.readFile;
        sys.readFile = (path, encoding) => {
            const value = originalReadFile.call(sys, path, encoding);
            if (!value || !ts.isBuildInfoFile(path)) return value;
            const buildInfo = ts.getBuildInfo(value);
            ts.Debug.assert(buildInfo.version === version);
            buildInfo.version = ts.version;
            return ts.getBuildInfoText(buildInfo);
        };
        const originalWrite = sys.write;
        sys.write = msg => originalWrite.call(sys, msg.replace(ts.version, version));

        if (sys.writeFile) {
            const originalWriteFile = sys.writeFile;
            sys.writeFile = (fileName: string, content: string, writeByteOrderMark: boolean) => {
                if (!ts.isBuildInfoFile(fileName)) return originalWriteFile.call(sys, fileName, content, writeByteOrderMark);
                const buildInfo = ts.getBuildInfo(content);
                buildInfo.version = version;
                originalWriteFile.call(sys, fileName, ts.getBuildInfoText(buildInfo), writeByteOrderMark);
            };
        }
        return sys;
    }


    function expectedDiagnosticRelatedInformationToText({ location, ...diagnosticMessage }: ExpectedDiagnosticRelatedInformation) {
        const text = expectedDiagnosticMessageChainToText(diagnosticMessage);
        if (location) {
            const { file, start, length } = location;
            return `${file}(${start}:${length}):: ${text}`;
        }
        return text;
    }

    function expectedErrorDiagnosticToText({ relatedInformation, ...diagnosticRelatedInformation }: ExpectedErrorDiagnostic) {
        let text = `${DiagnosticKind.Error}!: ${expectedDiagnosticRelatedInformationToText(diagnosticRelatedInformation)}`;
        if (relatedInformation) {
            for (const kid of relatedInformation) {
                text += `
  related:: ${expectedDiagnosticRelatedInformationToText(kid)}`;
            }
        }
        return text;
    }

    function expectedDiagnosticToText(errorOrStatus: ExpectedDiagnostic) {
        return ts.isArray(errorOrStatus) ?
            `${DiagnosticKind.Status}!: ${expectedDiagnosticMessageToText(errorOrStatus)}` :
            expectedErrorDiagnosticToText(errorOrStatus);
    }

    export class SolutionBuilderHost extends CompilerHost implements ts.SolutionBuilderHost<ts.BuilderProgram> {
        createProgram: ts.CreateProgram<ts.BuilderProgram>;
        private constructor(sys: System | vfs.FileSystem, options?: ts.CompilerOptions, setParentNodes?: boolean, createProgram?: ts.CreateProgram<ts.BuilderProgram>) {
            super(sys, options, setParentNodes);
            this.createProgram = createProgram || ts.createEmitAndSemanticDiagnosticsBuilderProgram;
        }
        static create(sys: System | vfs.FileSystem, options?: ts.CompilerOptions, setParentNodes?: boolean, createProgram?: ts.CreateProgram<ts.BuilderProgram>) {
            const host = new SolutionBuilderHost(sys, options, setParentNodes, createProgram);
            patchHostForBuildInfoReadWrite(host.sys);
            return host;
        }

        createHash(data: string) {
            return `${ts.generateDjb2Hash(data)}-${data}`;
        }

        diagnostics: SolutionBuilderDiagnostic[] = [];

        reportDiagnostic(diagnostic: ts.Diagnostic) {
            this.diagnostics.push({ kind: DiagnosticKind.Error, diagnostic });
        }

        reportSolutionBuilderStatus(diagnostic: ts.Diagnostic) {
            this.diagnostics.push({ kind: DiagnosticKind.Status, diagnostic });
        }

        clearDiagnostics() {
            this.diagnostics.length = 0;
        }

        assertDiagnosticMessages(...expectedDiagnostics: ExpectedDiagnostic[]) {
            const actual = this.diagnostics.slice().map(diagnosticToText);
            const expected = expectedDiagnostics.map(expectedDiagnosticToText);
            assert.deepEqual(actual, expected, `Diagnostic arrays did not match:
Actual: ${JSON.stringify(actual, /*replacer*/ undefined, " ")}
Expected: ${JSON.stringify(expected, /*replacer*/ undefined, " ")}`);
        }

        assertErrors(...expectedDiagnostics: ExpectedErrorDiagnostic[]) {
            const actual = this.diagnostics.filter(d => d.kind === DiagnosticKind.Error).map(diagnosticToText);
            const expected = expectedDiagnostics.map(expectedDiagnosticToText);
            assert.deepEqual(actual, expected, `Diagnostics arrays did not match:
Actual: ${JSON.stringify(actual, /*replacer*/ undefined, " ")}
Expected: ${JSON.stringify(expected, /*replacer*/ undefined, " ")}
Actual All:: ${JSON.stringify(this.diagnostics.slice().map(diagnosticToText), /*replacer*/ undefined, " ")}`);
        }

        printDiagnostics(header = "== Diagnostics ==") {
            const out = ts.createDiagnosticReporter(ts.sys);
            ts.sys.write(header + "\r\n");
            for (const { diagnostic } of this.diagnostics) {
                out(diagnostic);
            }
        }

        now() {
            return this.sys.now();
        }
    }
}
