/// <reference path="..\services\services.ts" />
/// <reference path="utilities.ts" />
/// <reference path="scriptInfo.ts" />
/// <reference path="..\compiler\resolutionCache.ts" />

namespace ts.server {
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
        host: PartialSystem;

        constructor(host: PartialSystem, private project: Project, private readonly cancellationToken: HostCancellationToken) {
            this.host = host;
            this.cancellationToken = new ThrottledCancellationToken(cancellationToken, project.projectService.throttleWaitMilliseconds);

            const serverHost = this.getServerHost();
            if (serverHost.trace) {
                this.trace = s => serverHost.trace(s);
            }

            if (serverHost.realpath) {
                this.realpath = path => serverHost.realpath(path);
            }
        }

        private getServerHost() {
            return this.project.projectService.host;
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
            const nodeModuleBinDir = getDirectoryPath(normalizePath(this.getServerHost().getExecutingFilePath()));
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
            return this.getServerHost().resolvePath(path);
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
