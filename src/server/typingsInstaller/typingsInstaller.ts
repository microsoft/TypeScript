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

    export abstract class TypingsInstaller {
        private packageNameToTypingLocation: Map<string> = createMap<string>();
        private missingTypingsSet: Map<true> = createMap<true>();
        private knownCachesSet: Map<true> = createMap<true>();
        private projectWatchers: Map<FileWatcher[]> = createMap<FileWatcher[]>();

        abstract readonly installTypingHost: InstallTypingHost;

        constructor(readonly globalCachePath: string, readonly safeListPath: Path, protected readonly log = nullLog) {
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
                    this.log.writeLine(`Loaded content of '${npmConfig}': ${JSON.stringify(npmConfig)}`);
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

        protected abstract isPackageInstalled(packageName: string): boolean;
        protected abstract sendResponse(response: SetTypings | InvalidateCachedTypings): void;
        protected abstract runInstall(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void;
    }
}