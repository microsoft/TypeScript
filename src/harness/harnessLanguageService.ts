import * as collections from "./_namespaces/collections.js";
import * as fakes from "./_namespaces/fakes.js";
import {
    Compiler,
    mockHash,
    virtualFileSystemRoot,
} from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";
import { getNewLineCharacter } from "./_namespaces/ts.js";
import * as vfs from "./_namespaces/vfs.js";
import * as vpath from "./_namespaces/vpath.js";
import { incrementalVerifier } from "./incrementalUtils.js";
import { patchServiceForStateBaseline } from "./projectServiceStateLogger.js";
import {
    createLoggerWithInMemoryLogs,
    HarnessLSCouldNotResolveModule,
    LoggerWithInMemoryLogs,
} from "./tsserverLogger.js";
import { createWatchUtils } from "./watchUtils.js";

export function makeDefaultProxy(info: ts.server.PluginCreateInfo): ts.LanguageService {
    const proxy = Object.create(/*o*/ null); // eslint-disable-line no-restricted-syntax
    const langSvc: any = info.languageService;
    for (const k of Object.keys(langSvc)) {
        // eslint-disable-next-line local/only-arrow-functions
        proxy[k] = function () {
            // eslint-disable-next-line prefer-spread, prefer-rest-params
            return langSvc[k].apply(langSvc, arguments);
        };
    }
    return proxy;
}

export class ScriptInfo {
    public version = 1;
    public editRanges: { length: number; textChangeRange: ts.TextChangeRange; }[] = [];
    private lineMap: number[] | undefined;

    constructor(public fileName: string, public content: string, public isRootFile: boolean) {
        this.setContent(content);
    }

    private setContent(content: string): void {
        this.content = content;
        this.lineMap = undefined;
    }

    public getLineMap(): number[] {
        return this.lineMap || (this.lineMap = ts.computeLineStarts(this.content));
    }

    public updateContent(content: string): void {
        this.editRanges = [];
        this.setContent(content);
        this.version++;
    }

    public editContent(start: number, end: number, newText: string): void {
        // Apply edits
        const prefix = this.content.substring(0, start);
        const middle = newText;
        const suffix = this.content.substring(end);
        this.setContent(prefix + middle + suffix);

        // Store edit range + new length of script
        this.editRanges.push({
            length: this.content.length,
            textChangeRange: ts.createTextChangeRange(
                ts.createTextSpanFromBounds(start, end),
                newText.length,
            ),
        });

        // Update version #
        this.version++;
    }

    public getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange {
        if (startVersion === endVersion) {
            // No edits!
            return ts.unchangedTextChangeRange;
        }

        const initialEditRangeIndex = this.editRanges.length - (this.version - startVersion);
        const lastEditRangeIndex = this.editRanges.length - (this.version - endVersion);

        const entries = this.editRanges.slice(initialEditRangeIndex, lastEditRangeIndex);
        return ts.collapseTextChangeRangesAcrossMultipleVersions(entries.map(e => e.textChangeRange));
    }
}

class ScriptSnapshot implements ts.IScriptSnapshot {
    public textSnapshot: string;
    public version: number;

    constructor(public scriptInfo: ScriptInfo) {
        this.textSnapshot = scriptInfo.content;
        this.version = scriptInfo.version;
    }

    public getText(start: number, end: number): string {
        return this.textSnapshot.substring(start, end);
    }

    public getLength(): number {
        return this.textSnapshot.length;
    }

    public getChangeRange(oldScript: ts.IScriptSnapshot): ts.TextChangeRange {
        const oldShim = oldScript as ScriptSnapshot;
        return this.scriptInfo.getTextChangeRangeBetweenVersions(oldShim.version, this.version);
    }
}

class DefaultHostCancellationToken implements ts.HostCancellationToken {
    public static readonly instance: DefaultHostCancellationToken = new DefaultHostCancellationToken();

    public isCancellationRequested() {
        return false;
    }
}

export interface LanguageServiceAdapter {
    getHost(): LanguageServiceAdapterHost;
    getLanguageService(): ts.LanguageService;
    getClassifier(): ts.Classifier;
    getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    getLogger(): LoggerWithInMemoryLogs | undefined;
}

export abstract class LanguageServiceAdapterHost {
    public readonly sys: fakes.System = new fakes.System(new vfs.FileSystem(/*ignoreCase*/ true, { cwd: virtualFileSystemRoot }));
    public typesRegistry: Map<string, void> | undefined;
    private scriptInfos: collections.SortedMap<string, ScriptInfo>;
    public jsDocParsingMode: ts.JSDocParsingMode | undefined;

    constructor(protected cancellationToken: DefaultHostCancellationToken = DefaultHostCancellationToken.instance, protected settings: ts.CompilerOptions = ts.getDefaultCompilerOptions()) {
        this.scriptInfos = new collections.SortedMap({ comparer: this.vfs.stringComparer, sort: "insertion" });
    }

    public get vfs(): vfs.FileSystem {
        return this.sys.vfs;
    }

    public getNewLine(): string {
        return getNewLineCharacter(this.settings);
    }

    public getFilenames(): string[] {
        const fileNames: string[] = [];
        this.scriptInfos.forEach(scriptInfo => {
            if (scriptInfo.isRootFile) {
                // only include root files here
                // usually it means that we won't include lib.d.ts in the list of root files so it won't mess the computation of compilation root dir.
                fileNames.push(scriptInfo.fileName);
            }
        });
        return fileNames;
    }

    public realpath(path: string): string {
        try {
            return this.vfs.realpathSync(path);
        }
        catch {
            return path;
        }
    }

    public fileExists(path: string): boolean {
        try {
            return this.vfs.existsSync(path);
        }
        catch {
            return false;
        }
    }

    public readFile(path: string): string | undefined {
        try {
            return this.vfs.readFileSync(path).toString();
        }
        catch {
            return undefined;
        }
    }

    public directoryExists(path: string): boolean {
        return this.vfs.statSync(path).isDirectory();
    }

    public getScriptInfo(fileName: string): ScriptInfo | undefined {
        return this.scriptInfos.get(vpath.resolve(this.vfs.cwd(), fileName));
    }

    public addScript(fileName: string, content: string, isRootFile: boolean): void {
        this.vfs.mkdirpSync(vpath.dirname(fileName));
        this.vfs.writeFileSync(fileName, content);
        this.scriptInfos.set(vpath.resolve(this.vfs.cwd(), fileName), new ScriptInfo(fileName, content, isRootFile));
    }

    public renameFileOrDirectory(oldPath: string, newPath: string): void {
        this.vfs.mkdirpSync(ts.getDirectoryPath(newPath));
        this.vfs.renameSync(oldPath, newPath);

        const updater = ts.getPathUpdater(oldPath, newPath, ts.createGetCanonicalFileName(this.useCaseSensitiveFileNames()), /*sourceMapper*/ undefined);
        this.scriptInfos.forEach((scriptInfo, key) => {
            const newFileName = updater(key);
            if (newFileName !== undefined) {
                this.scriptInfos.delete(key);
                this.scriptInfos.set(newFileName, scriptInfo);
                scriptInfo.fileName = newFileName;
            }
        });
    }

    public editScript(fileName: string, start: number, end: number, newText: string): void {
        const script = this.getScriptInfo(fileName);
        if (script) {
            script.editContent(start, end, newText);
            this.vfs.mkdirpSync(vpath.dirname(fileName));
            this.vfs.writeFileSync(fileName, script.content);
            return;
        }

        throw new Error("No script with name '" + fileName + "'");
    }

    public openFile(_fileName: string, _content?: string, _scriptKindName?: string): void {/*overridden*/}

    /**
     * @param line 0 based index
     * @param col 0 based index
     */
    public positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter {
        const script: ScriptInfo = this.getScriptInfo(fileName)!;
        assert.isOk(script);
        return ts.computeLineAndCharacterOfPosition(script.getLineMap(), position);
    }

    public lineAndCharacterToPosition(fileName: string, lineAndCharacter: ts.LineAndCharacter): number {
        const script: ScriptInfo = this.getScriptInfo(fileName)!;
        assert.isOk(script);
        return ts.computePositionOfLineAndCharacter(script.getLineMap(), lineAndCharacter.line, lineAndCharacter.character);
    }

    useCaseSensitiveFileNames(): boolean {
        return !this.vfs.ignoreCase;
    }
}

/** TypeScript Typings Installer global cache location for the tests */
export const harnessTypingInstallerCacheLocation = "/home/src/Library/Caches/typescript";
/// Native adapter
class NativeLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceHost, LanguageServiceAdapterHost {
    isKnownTypesPackageName(name: string): boolean {
        return !!this.typesRegistry && this.typesRegistry.has(name);
    }

    getGlobalTypingsCacheLocation(): string {
        return harnessTypingInstallerCacheLocation;
    }

    installPackage: typeof ts.notImplemented = ts.notImplemented;

    getCompilationSettings(): ts.CompilerOptions {
        return this.settings;
    }

    getCancellationToken(): DefaultHostCancellationToken {
        return this.cancellationToken;
    }

    getDirectories(path: string): string[] {
        return this.sys.getDirectories(path);
    }

    getCurrentDirectory(): string {
        return virtualFileSystemRoot;
    }

    getDefaultLibFileName(): string {
        return Compiler.defaultLibFileName;
    }

    getScriptFileNames(): string[] {
        return this.getFilenames().filter(ts.isAnySupportedFileExtension);
    }

    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {
        const script = this.getScriptInfo(fileName);
        return script ? new ScriptSnapshot(script) : undefined;
    }

    getScriptKind(): ts.ScriptKind {
        return ts.ScriptKind.Unknown;
    }

    getScriptVersion(fileName: string): string {
        const script = this.getScriptInfo(fileName);
        return script ? script.version.toString() : undefined!; // TODO: GH#18217
    }

    override directoryExists(dirName: string): boolean {
        return this.sys.directoryExists(dirName);
    }

    override fileExists(fileName: string): boolean {
        return this.sys.fileExists(fileName);
    }

    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.sys.readDirectory(path, extensions, exclude, include, depth);
    }

    override readFile(path: string): string | undefined {
        return this.sys.readFile(path);
    }

    override realpath(path: string): string {
        return this.sys.realpath(path);
    }

    getTypeRootsVersion() {
        return 0;
    }

    log: typeof ts.noop = ts.noop;
    trace: typeof ts.noop = ts.noop;
    error: typeof ts.noop = ts.noop;
}

export class NativeLanguageServiceAdapter implements LanguageServiceAdapter {
    private host: NativeLanguageServiceHost;
    getLogger: typeof ts.returnUndefined = ts.returnUndefined;
    constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
        this.host = new NativeLanguageServiceHost(cancellationToken, options);
    }
    getHost(): LanguageServiceAdapterHost {
        return this.host;
    }
    getLanguageService(): ts.LanguageService {
        return ts.createLanguageService(this.host);
    }
    getClassifier(): ts.Classifier {
        return ts.createClassifier();
    }
    getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo {
        return ts.preProcessFile(fileContents, /*readImportFiles*/ true, ts.hasJSFileExtension(fileName));
    }
}

/**
 * This is set to vscode so that in tsserver tests its what is expected
 * and is unrelated and is error to not specify for tsc tests
 */
export const harnessSessionCurrentDirectory = "/home/src/Vscode/Projects/bin";
// Server adapter
class SessionClientHost extends NativeLanguageServiceHost implements ts.server.SessionClientHost {
    private client!: ts.server.SessionClient;

    constructor(cancellationToken: ts.HostCancellationToken | undefined, settings: ts.CompilerOptions | undefined) {
        super(cancellationToken, settings);
    }

    override getCurrentDirectory(): string {
        return harnessSessionCurrentDirectory;
    }

    onMessage: typeof ts.noop = ts.noop;
    writeMessage: typeof ts.noop = ts.noop;

    setClient(client: ts.server.SessionClient): void {
        this.client = client;
    }

    override openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void {
        super.openFile(fileName, content, scriptKindName);
        this.client.openFile(fileName, content, scriptKindName);
    }

    override editScript(fileName: string, start: number, end: number, newText: string): void {
        const changeArgs = this.client.createChangeFileRequestArgs(fileName, start, end, newText);
        super.editScript(fileName, start, end, newText);
        this.client.changeFile(fileName, changeArgs);
    }
}

interface ServerHostFileWatcher {
    cb: ts.FileWatcherCallback;
    pollingInterval: ts.PollingInterval;
}
interface ServerHostDirectoryWatcher {
    cb: ts.DirectoryWatcherCallback;
}

/** Default typescript and lib installs location for tests */
export const harnessSessionLibLocation = "/home/src/tslibs/TS/Lib";
class SessionServerHost implements ts.server.ServerHost {
    args: string[] = [];
    newLine: string;
    useCaseSensitiveFileNames = false;
    watchUtils = createWatchUtils<ServerHostFileWatcher, ServerHostDirectoryWatcher>(
        "watchedFiles",
        "watchedDirectories",
        ts.createGetCanonicalFileName(this.useCaseSensitiveFileNames),
        this,
    );

    constructor(private host: NativeLanguageServiceHost) {
        this.newLine = this.host.getNewLine();
    }

    onMessage = ts.noop;
    writeMessage = ts.noop; // overridden
    write(message: string): void {
        this.writeMessage(message);
    }

    readFile(fileName: string): string | undefined {
        // System FS would follow symlinks, even though snapshots are stored by original file name
        const snapshot = this.host.getScriptSnapshot(fileName) || this.host.getScriptSnapshot(this.realpath(fileName));
        return snapshot && ts.getSnapshotText(snapshot);
    }

    realpath(path: string) {
        return this.host.realpath(path);
    }

    writeFile = ts.noop;

    resolvePath(path: string): string {
        return path;
    }

    fileExists(path: string): boolean {
        return this.host.fileExists(path);
    }

    directoryExists(): boolean {
        // for tests assume that directory exists
        return true;
    }

    getExecutingFilePath(): string {
        return harnessSessionLibLocation + "/tsc.js";
    }

    exit = ts.noop;

    createDirectory(_directoryName: string): void {
        return ts.notImplemented();
    }

    getCurrentDirectory(): string {
        return this.host.getCurrentDirectory();
    }

    getDirectories(path: string): string[] {
        return this.host.getDirectories(path);
    }

    getEnvironmentVariable(name: string): string {
        return ts.sys.getEnvironmentVariable(name);
    }

    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[] {
        return this.host.readDirectory(path, extensions, exclude, include, depth);
    }

    watchFile(file: string, cb: ts.FileWatcherCallback, pollingInterval: ts.PollingInterval) {
        return this.watchUtils.pollingWatch(file, { cb, pollingInterval });
    }

    watchDirectory(dir: string, cb: ts.DirectoryWatcherCallback, recursive: boolean): ts.FileWatcher {
        return this.watchUtils.fsWatch(dir, recursive, { cb });
    }

    setTimeout(_callback: (...args: any[]) => void, _ms: number, ..._args: any[]): any {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    clearTimeout(_timeoutId: any): void {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    setImmediate(_callback: (...args: any[]) => void, ..._args: any[]): any {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    clearImmediate(_timeoutId: any): void {
        // Currently none of the tests use this and we would want something thats deterministic like unittests where we tell which callbacks to invoke
    }

    createHash(s: string) {
        return mockHash(s);
    }

    require(_initialDir: string, _moduleName: string): ts.ModuleImportResult {
        switch (_moduleName) {
            // Adds to the Quick Info a fixed string and a string from the config file
            // and replaces the first display part
            case "quickinfo-augmeneter":
                return {
                    module: () => ({
                        create(info: ts.server.PluginCreateInfo) {
                            const proxy = makeDefaultProxy(info);
                            const langSvc: any = info.languageService;
                            // eslint-disable-next-line local/only-arrow-functions
                            proxy.getQuickInfoAtPosition = function () {
                                // eslint-disable-next-line prefer-spread, prefer-rest-params
                                const parts = langSvc.getQuickInfoAtPosition.apply(langSvc, arguments);
                                if (parts.displayParts.length > 0) {
                                    parts.displayParts[0].text = "Proxied";
                                }
                                parts.displayParts.push({ text: info.config.message, kind: "punctuation" });
                                return parts;
                            };

                            return proxy;
                        },
                    }),
                    error: undefined,
                };

            // Throws during initialization
            case "create-thrower":
                return {
                    module: () => ({
                        create() {
                            throw new Error("I am not a well-behaved plugin");
                        },
                    }),
                    error: undefined,
                };

            // Adds another diagnostic
            case "diagnostic-adder":
                return {
                    module: () => ({
                        create(info: ts.server.PluginCreateInfo) {
                            const proxy = makeDefaultProxy(info);
                            proxy.getSemanticDiagnostics = filename => {
                                const prev = info.languageService.getSemanticDiagnostics(filename);
                                const sourceFile: ts.SourceFile = info.project.getSourceFile(ts.toPath(filename, /*basePath*/ undefined, ts.createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
                                prev.push({
                                    category: ts.DiagnosticCategory.Warning,
                                    file: sourceFile,
                                    code: 9999,
                                    length: 3,
                                    messageText: `Plugin diagnostic`,
                                    start: 0,
                                });
                                return prev;
                            };
                            return proxy;
                        },
                    }),
                    error: undefined,
                };

            // Accepts configurations
            case "configurable-diagnostic-adder":
                let customMessage = "default message";
                return {
                    module: () => ({
                        create(info: ts.server.PluginCreateInfo) {
                            customMessage = info.config.message;
                            const proxy = makeDefaultProxy(info);
                            proxy.getSemanticDiagnostics = filename => {
                                const prev = info.languageService.getSemanticDiagnostics(filename);
                                const sourceFile: ts.SourceFile = info.project.getSourceFile(ts.toPath(filename, /*basePath*/ undefined, ts.createGetCanonicalFileName(info.serverHost.useCaseSensitiveFileNames)))!;
                                prev.push({
                                    category: ts.DiagnosticCategory.Error,
                                    file: sourceFile,
                                    code: 9999,
                                    length: 3,
                                    messageText: customMessage,
                                    start: 0,
                                });
                                return prev;
                            };
                            return proxy;
                        },
                        onConfigurationChanged(config: any) {
                            customMessage = config.message;
                        },
                    }),
                    error: undefined,
                };

            default:
                return {
                    module: undefined,
                    error: new Error(HarnessLSCouldNotResolveModule),
                };
        }
    }
}

class FourslashSession extends ts.server.Session {
    constructor(opts: ts.server.SessionOptions, readonly baselineHost: (when: string) => void) {
        super(opts);
        patchServiceForStateBaseline(this.projectService);
    }
    getText(fileName: string) {
        return ts.getSnapshotText(this.projectService.getDefaultProjectForFile(ts.server.toNormalizedPath(fileName), /*ensureProject*/ true)!.getScriptSnapshot(fileName)!);
    }

    protected override toStringMessage(message: string): string {
        return JSON.stringify(JSON.parse(message), undefined, 2);
    }

    public override onMessage(message: string): void {
        this.baselineHost("Before Request");
        super.onMessage(message);
        this.baselineHost("After Request");
    }

    getProjectService() {
        return this.projectService;
    }
}

export class ServerLanguageServiceAdapter implements LanguageServiceAdapter {
    private host: SessionClientHost;
    private client: ts.server.SessionClient;
    private server: FourslashSession;
    private logger: LoggerWithInMemoryLogs;
    constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions) {
        // This is the main host that tests use to direct tests
        const clientHost = new SessionClientHost(cancellationToken, options);
        const client = new ts.server.SessionClient(clientHost);

        // This host is just a proxy for the clientHost, it uses the client
        // host to answer server queries about files on disk
        const serverHost = new SessionServerHost(clientHost);
        this.logger = createLoggerWithInMemoryLogs(serverHost, /*sanitizeLibs*/ true);
        const opts: ts.server.SessionOptions = {
            host: serverHost,
            cancellationToken: ts.server.nullCancellationToken,
            useSingleInferredProject: false,
            useInferredProjectPerProjectRoot: false,
            typingsInstaller: {
                ...ts.server.nullTypingsInstaller,
                globalTypingsCacheLocation: harnessTypingInstallerCacheLocation,
            },
            byteLength: Buffer.byteLength,
            hrtime: process.hrtime,
            logger: this.logger,
            canUseEvents: true,
            incrementalVerifier,
        };
        this.server = new FourslashSession(opts, when => {
            const baseline = serverHost.watchUtils.serializeWatches();
            if (baseline.length) {
                this.logger.log(when);
                baseline.forEach(s => this.logger.log(s));
                this.server.getProjectService().baseline();
            }
            else {
                this.server.getProjectService().baseline(when);
            }
        });

        // Fake the connection between the client and the server
        serverHost.writeMessage = client.onMessage.bind(client);
        clientHost.writeMessage = this.server.onMessage.bind(this.server);

        // Wire the client to the host to get notifications when a file is open
        // or edited.
        clientHost.setClient(client);

        // Set the properties
        this.client = client;
        this.host = clientHost;
    }
    getLogger(): LoggerWithInMemoryLogs {
        return this.logger;
    }
    getHost(): SessionClientHost {
        return this.host;
    }
    getLanguageService(): ts.LanguageService {
        return this.client;
    }
    getClassifier(): ts.Classifier {
        throw new Error("getClassifier is not available using the server interface.");
    }
    getPreProcessedFileInfo(): ts.PreProcessedFileInfo {
        throw new Error("getPreProcessedFileInfo is not available using the server interface.");
    }
    assertTextConsistent(fileName: string): void {
        const serverText = this.server.getText(fileName);
        const clientText = this.host.readFile(fileName);
        ts.Debug.assert(
            serverText === clientText,
            [
                "Server and client text are inconsistent.",
                "",
                "\x1b[1mServer\x1b[0m\x1b[31m:",
                serverText,
                "",
                "\x1b[1mClient\x1b[0m\x1b[31m:",
                clientText,
                "",
                "This probably means something is wrong with the fourslash infrastructure, not with the test.",
            ].join(ts.sys.newLine),
        );
    }
}
