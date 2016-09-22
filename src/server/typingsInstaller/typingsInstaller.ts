/// <reference path="../../compiler/core.ts" />
/// <reference path="../../compiler/moduleNameResolver.ts" />
/// <reference path="../../services/jsTyping.ts"/>
/// <reference path="../types.d.ts"/>

namespace ts.server.typingsInstaller {
    interface NpmConfig {
        devDependencies: MapLike<any>;
    }

    export interface Log {
        isEnabled(): boolean;
        writeLine(text: string): void;
    }

    const nullLog: Log = {
        isEnabled: () => false,
        writeLine: () => {}
    };

    function typingToFileName(cachePath: string, packageName: string, installTypingHost: InstallTypingHost): string {
        const result = resolveModuleName(packageName, combinePaths(cachePath, "index.d.ts"), { moduleResolution: ModuleResolutionKind.NodeJs }, installTypingHost);
        return result.resolvedModule && result.resolvedModule.resolvedFileName;
    }

    export const NpmViewRequest: "npm view" = "npm view";
    export const NpmInstallRequest: "npm install" = "npm install";

    export type RequestKind = typeof NpmViewRequest | typeof NpmInstallRequest;

    export type RequestCompletedAction = (err: Error, stdout: string, stderr: string) => void;
    type PendingRequest = {
        requestKind: RequestKind;
        requestId: number;
        command: string;
        cwd: string;
        onRequestCompleted: RequestCompletedAction
    };

    export abstract class TypingsInstaller {
        private readonly packageNameToTypingLocation: Map<string> = createMap<string>();
        private readonly missingTypingsSet: Map<true> = createMap<true>();
        private readonly knownCachesSet: Map<true> = createMap<true>();
        private readonly projectWatchers: Map<FileWatcher[]> = createMap<FileWatcher[]>();
        readonly pendingRunRequests: PendingRequest[] = [];

        private installRunCount = 1;
        private inFlightRequestCount = 0;

        abstract readonly installTypingHost: InstallTypingHost;

        constructor(
            readonly globalCachePath: string,
            readonly npmPath: string,
            readonly safeListPath: Path,
            readonly throttleLimit: number,
            protected readonly log = nullLog) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Global cache location '${globalCachePath}', safe file path '${safeListPath}'`);
            }
        }

        init() {
            this.processCacheLocation(this.globalCachePath);
        }

        closeProject(req: CloseProject) {
            this.closeWatchers(req.projectName);
        }

        private closeWatchers(projectName: string): void {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Closing file watchers for project '${projectName}'`);
            }
            const watchers = this.projectWatchers[projectName];
            if (!watchers) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`No watchers are registered for project '${projectName}'`);
                }
                return;
            }
            for (const w of watchers) {
                w.close();
            }

            delete this.projectWatchers[projectName];

            if (this.log.isEnabled()) {
                this.log.writeLine(`Closing file watchers for project '${projectName}' - done.`);
            }
        }

        install(req: DiscoverTypings) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Got install request ${JSON.stringify(req)}`);
            }

            // load existing typing information from the cache 
            if (req.cachePath) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Request specifies cache path '${req.cachePath}', loading cached information...`);
                }
                this.processCacheLocation(req.cachePath);
            }

            const discoverTypingsResult = JsTyping.discoverTypings(
                this.installTypingHost,
                req.fileNames,
                req.projectRootPath,
                this.safeListPath,
                this.packageNameToTypingLocation,
                req.typingOptions,
                req.compilerOptions);

            if (this.log.isEnabled()) {
                this.log.writeLine(`Finished typings discovery: ${JSON.stringify(discoverTypingsResult)}`);
            }

            // respond with whatever cached typings we have now
            this.sendResponse(this.createSetTypings(req, discoverTypingsResult.cachedTypingPaths));

            // start watching files
            this.watchFiles(req.projectName, discoverTypingsResult.filesToWatch);

            // install typings
            if (discoverTypingsResult.newTypingNames.length) {
                this.installTypings(req, req.cachePath || this.globalCachePath, discoverTypingsResult.cachedTypingPaths, discoverTypingsResult.newTypingNames);
            }
            else {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`No new typings were requested as a result of typings discovery`);
                }
            }
        }

        private processCacheLocation(cacheLocation: string) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Processing cache location '${cacheLocation}'`);
            }
            if (this.knownCachesSet[cacheLocation]) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Cache location was already processed...`);
                }
                return;
            }
            const packageJson = combinePaths(cacheLocation, "package.json");
            if (this.log.isEnabled()) {
                this.log.writeLine(`Trying to find '${packageJson}'...`);
            }
            if (this.installTypingHost.fileExists(packageJson)) {
                const npmConfig = <NpmConfig>JSON.parse(this.installTypingHost.readFile(packageJson));
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Loaded content of '${packageJson}': ${JSON.stringify(npmConfig)}`);
                }
                if (npmConfig.devDependencies) {
                    for (const key in npmConfig.devDependencies) {
                        // key is @types/<package name>
                        const packageName = getBaseFileName(key);
                        if (!packageName) {
                            continue;
                        }
                        const typingFile = typingToFileName(cacheLocation, packageName, this.installTypingHost);
                        if (!typingFile) {
                            continue;
                        }
                        const existingTypingFile = this.packageNameToTypingLocation[packageName];
                        if (existingTypingFile === typingFile) {
                            continue;
                        }
                        if (existingTypingFile) {
                            if (this.log.isEnabled()) {
                                this.log.writeLine(`New typing for package ${packageName} from '${typingFile}' conflicts with existing typing file '${existingTypingFile}'`);
                            }
                        }
                        if (this.log.isEnabled()) {
                            this.log.writeLine(`Adding entry into typings cache: '${packageName}' => '${typingFile}'`);
                        }
                        this.packageNameToTypingLocation[packageName] = typingFile;
                    }
                }
            }
            if (this.log.isEnabled()) {
                this.log.writeLine(`Finished processing cache location '${cacheLocation}'`);
            }
            this.knownCachesSet[cacheLocation] = true;
        }

        private installTypings(req: DiscoverTypings, cachePath: string, currentlyCachedTypings: string[], typingsToInstall: string[]) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Installing typings ${JSON.stringify(typingsToInstall)}`);
            }
            typingsToInstall = filter(typingsToInstall, x => !this.missingTypingsSet[x]);
            if (typingsToInstall.length === 0) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`All typings are known to be missing - no need to go any further`);
                }
                return;
            }

            const npmConfigPath = combinePaths(cachePath, "package.json");
            if (this.log.isEnabled()) {
                this.log.writeLine(`Npm config file: ${npmConfigPath}`);
            }
            if (!this.installTypingHost.fileExists(npmConfigPath)) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Npm config file: '${npmConfigPath}' is missing, creating new one...`);
                }
                this.ensureDirectoryExists(cachePath, this.installTypingHost);
                this.installTypingHost.writeFile(npmConfigPath, "{}");
            }

            this.runInstall(cachePath, typingsToInstall, installedTypings => {
                // TODO: watch project directory
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Requested to install typings ${JSON.stringify(typingsToInstall)}, installed typings ${JSON.stringify(installedTypings)}`);
                }
                const installedPackages: Map<true> = createMap<true>();
                const installedTypingFiles: string[] = [];
                for (const t of installedTypings) {
                    const packageName = getBaseFileName(t);
                    if (!packageName) {
                        continue;
                    }
                    installedPackages[packageName] = true;
                    const typingFile = typingToFileName(cachePath, packageName, this.installTypingHost);
                    if (!typingFile) {
                        continue;
                    }
                    if (!this.packageNameToTypingLocation[packageName]) {
                        this.packageNameToTypingLocation[packageName] = typingFile;
                    }
                    installedTypingFiles.push(typingFile);
                }
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Installed typing files ${JSON.stringify(installedTypingFiles)}`);
                }
                for (const toInstall of typingsToInstall) {
                    if (!installedPackages[toInstall]) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine(`New missing typing package '${toInstall}'`);
                        }
                        this.missingTypingsSet[toInstall] = true;
                    }
                }

                this.sendResponse(this.createSetTypings(req, currentlyCachedTypings.concat(installedTypingFiles)));
            });
        }

        private runInstall(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void {
            const requestId = this.installRunCount;

            this.installRunCount++;
            let execInstallCmdCount = 0;
            const filteredTypings: string[] = [];
            for (const typing of typingsToInstall) {
                execNpmViewTyping(this, typing);
            }

            function execNpmViewTyping(self: TypingsInstaller, typing: string) {
                const command = `${self.npmPath} view @types/${typing} --silent name`;
                self.execAsync(NpmViewRequest, requestId, command, cachePath, (err, stdout, stderr) => {
                    if (stdout) {
                        filteredTypings.push(typing);
                    }
                    execInstallCmdCount++;
                    if (execInstallCmdCount === typingsToInstall.length) {
                        installFilteredTypings(self, filteredTypings);
                    }
                });
            }

            function installFilteredTypings(self: TypingsInstaller, filteredTypings: string[]) {
                if (filteredTypings.length === 0) {
                    postInstallAction([]);
                    return;
                }
                const scopedTypings = filteredTypings.map(t => "@types/" + t);
                const command = `${self.npmPath} install ${scopedTypings.join(" ")} --save-dev`;
                self.execAsync(NpmInstallRequest, requestId, command, cachePath, (err, stdout, stderr) => {
                    postInstallAction(stdout ? scopedTypings : []);
                });
            }
        }

        private ensureDirectoryExists(directory: string, host: InstallTypingHost): void {
            const directoryName = getDirectoryPath(directory);
            if (!host.directoryExists(directoryName)) {
                this.ensureDirectoryExists(directoryName, host);
            }
            if (!host.directoryExists(directory)) {
                host.createDirectory(directory);
            }
        }

        private watchFiles(projectName: string, files: string[]) {
            if (!files.length) {
                return;
            }
            // shut down existing watchers
            this.closeWatchers(projectName);

            // handler should be invoked once for the entire set of files since it will trigger full rediscovery of typings
            let isInvoked = false;
            const watchers: FileWatcher[] = [];
            for (const file of files) {
                const w = this.installTypingHost.watchFile(file, f => {
                    if (this.log.isEnabled()) {
                        this.log.writeLine(`Got FS notification for ${f}, handler is already invoked '${isInvoked}'`);
                    }
                    this.sendResponse({ projectName: projectName, kind: "invalidate" });
                    isInvoked = true;
                });
                watchers.push(w);
            }
            this.projectWatchers[projectName] = watchers;
        }

        private createSetTypings(request: DiscoverTypings, typings: string[]): SetTypings {
            return {
                projectName: request.projectName,
                typingOptions: request.typingOptions,
                compilerOptions: request.compilerOptions,
                typings,
                kind: "set"
            };
        }

        private execAsync(requestKind: RequestKind, requestId: number, command: string, cwd: string, onRequestCompleted: RequestCompletedAction): void {
            this.pendingRunRequests.unshift({ requestKind, requestId, command, cwd, onRequestCompleted });
            this.executeWithThrottling();
        }

        private executeWithThrottling() {
            while (this.inFlightRequestCount < this.throttleLimit && this.pendingRunRequests.length) {
                this.inFlightRequestCount++;
                const request = this.pendingRunRequests.pop();
                this.runCommand(request.requestKind, request.requestId, request.command, request.cwd, (err, stdout, stderr) => {
                    this.inFlightRequestCount--;
                    request.onRequestCompleted(err, stdout, stderr);
                    this.executeWithThrottling();
                });
            }
        }

        protected abstract runCommand(requestKind: RequestKind, requestId: number, command: string, cwd: string, onRequestCompleted: RequestCompletedAction): void;
        protected abstract sendResponse(response: SetTypings | InvalidateCachedTypings): void;
    }
}