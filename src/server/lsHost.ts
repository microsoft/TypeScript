/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts" />
/// <reference path="scriptInfo.ts" />
/// <reference path="..\compiler\resolutionCache.ts" />

namespace ts.server {
    export class CachedServerHost implements ServerHost {
        args: string[];
        newLine: string;
        useCaseSensitiveFileNames: boolean;

        private readonly cachedHost: CachedHost;

        readonly trace: (s: string) => void;
        readonly realpath?: (path: string) => string;

        constructor(private readonly host: ServerHost) {
            this.args = host.args;
            this.newLine = host.newLine;
            this.useCaseSensitiveFileNames = host.useCaseSensitiveFileNames;
            if (host.trace) {
                this.trace = s => host.trace(s);
            }
            if (this.host.realpath) {
                this.realpath = path => this.host.realpath(path);
            }
            this.cachedHost = createCachedHost(host);
        }

        write(s: string) {
            return this.host.write(s);
        }

        writeFile(fileName: string, data: string, writeByteOrderMark?: boolean) {
            this.cachedHost.writeFile(fileName, data, writeByteOrderMark);
        }

        resolvePath(path: string) {
            return this.host.resolvePath(path);
        }

        createDirectory(path: string) {
            Debug.fail(`Why is createDirectory called on the cached server for ${path}`);
        }

        getExecutingFilePath() {
            return this.host.getExecutingFilePath();
        }

        getCurrentDirectory() {
            return this.cachedHost.getCurrentDirectory();
        }

        exit(exitCode?: number) {
            Debug.fail(`Why is exit called on the cached server: ${exitCode}`);
        }

        getEnvironmentVariable(name: string) {
            Debug.fail(`Why is getEnvironmentVariable called on the cached server: ${name}`);
            return this.host.getEnvironmentVariable(name);
        }

        getDirectories(rootDir: string) {
            return this.cachedHost.getDirectories(rootDir);
        }

        readDirectory(rootDir: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[] {
            return this.cachedHost.readDirectory(rootDir, extensions, excludes, includes, depth);
        }

        fileExists(fileName: string): boolean {
            return this.cachedHost.fileExists(fileName);
        }

        directoryExists(dirPath: string) {
            return this.cachedHost.directoryExists(dirPath);
        }

        readFile(path: string, encoding?: string): string {
            return this.host.readFile(path, encoding);
        }


        addOrDeleteFileOrFolder(fileOrFolder: NormalizedPath) {
            return this.cachedHost.addOrDeleteFileOrFolder(fileOrFolder);
        }

        clearCache() {
            return this.cachedHost.clearCache();
        }

        setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]) {
            return this.host.setTimeout(callback, ms, ...args);
        }
        clearTimeout(timeoutId: any)  {
            return this.host.clearTimeout(timeoutId);
        }
        setImmediate(callback: (...args: any[]) => void, ...args: any[]) {
            this.host.setImmediate(callback, ...args);
        }
        clearImmediate(timeoutId: any) {
            this.host.clearImmediate(timeoutId);
        }

    }

    export class LSHost implements LanguageServiceHost, ModuleResolutionHost {
        /*@internal*/
        compilationSettings: CompilerOptions;

        readonly trace: (s: string) => void;
        readonly realpath?: (path: string) => string;

        /*@internal*/
        hasInvalidatedResolution: HasInvalidatedResolution;

        /**
         * This is the host that is associated with the project. This is normally same as projectService's host
         * except in Configured projects where it is CachedServerHost so that we can cache the results of the
         * file system entries as we would anyways be watching files in the project (so safe to cache)
         */
        /*@internal*/
        host: ServerHost;

        constructor(host: ServerHost, private project: Project, private readonly cancellationToken: HostCancellationToken) {
            this.host = host;
            this.cancellationToken = new ThrottledCancellationToken(cancellationToken, project.projectService.throttleWaitMilliseconds);

            if (host.trace) {
                this.trace = s => host.trace(s);
            }

            if (this.host.realpath) {
                this.realpath = path => this.host.realpath(path);
            }
        }

        dispose() {
            this.project = undefined;
            this.host = undefined;
        }

        getNewLine() {
            return this.host.newLine;
        }

        getProjectVersion() {
            return this.project.getProjectVersion();
        }

        getCompilationSettings() {
            return this.compilationSettings;
        }

        useCaseSensitiveFileNames() {
            return this.host.useCaseSensitiveFileNames;
        }

        getCancellationToken() {
            return this.cancellationToken;
        }

        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[] {
            return this.project.resolutionCache.resolveTypeReferenceDirectives(typeDirectiveNames, containingFile);
        }

        resolveModuleNames(moduleNames: string[], containingFile: string): ResolvedModuleFull[] {
            return this.project.resolutionCache.resolveModuleNames(moduleNames, containingFile, /*logChanges*/ true);
        }

        getDefaultLibFileName() {
            const nodeModuleBinDir = getDirectoryPath(normalizePath(this.host.getExecutingFilePath()));
            return combinePaths(nodeModuleBinDir, getDefaultLibFileName(this.compilationSettings));
        }

        getScriptSnapshot(filename: string): IScriptSnapshot {
            const scriptInfo = this.project.getScriptInfoLSHost(filename);
            if (scriptInfo) {
                return scriptInfo.getSnapshot();
            }
        }

        getScriptFileNames() {
            return this.project.getRootFilesLSHost();
        }

        getTypeRootsVersion() {
            return this.project.typesVersion;
        }

        getScriptKind(fileName: string) {
            const info = this.project.getScriptInfoLSHost(fileName);
            return info && info.scriptKind;
        }

        getScriptVersion(filename: string) {
            const info = this.project.getScriptInfoLSHost(filename);
            return info && info.getLatestVersion();
        }

        getCurrentDirectory(): string {
            return this.host.getCurrentDirectory();
        }

        resolvePath(path: string): string {
            return this.host.resolvePath(path);
        }

        fileExists(file: string): boolean {
            // As an optimization, don't hit the disks for files we already know don't exist
            // (because we're watching for their creation).
            const path = this.project.projectService.toPath(file);
            return !this.project.isWatchedMissingFile(path) && this.host.fileExists(file);
        }

        readFile(fileName: string): string | undefined {
            return this.host.readFile(fileName);
        }

        directoryExists(path: string): boolean {
            return this.host.directoryExists(path);
        }

        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[] {
            return this.host.readDirectory(path, extensions, exclude, include, depth);
        }

        getDirectories(path: string): string[] {
            return this.host.getDirectories(path);
        }
    }
}
