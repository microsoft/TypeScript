/// <reference path="../../services/jsTyping.ts"/>
/// <reference path="../types.d.ts"/>

namespace ts.server.typingsInstaller {
    const DefaultTsdSettings = JSON.stringify({
        version: "v4",
        repo: "DefinitelyTyped/DefinitelyTyped",
        ref: "master",
        path: "typings"
    }, /*replacer*/undefined, /*space*/4);

    interface TsdConfig {
        installed: MapLike<any>;
    }

    export interface Log {
        isEnabled(): boolean;
        writeLine(text: string): void;
    }

    const nullLog: Log = {
        isEnabled: () => false,
        writeLine: () => {}
    };

    function tsdTypingToFileName(cachePath: string, tsdTypingFile: string) {
        return combinePaths(cachePath, `typings/${tsdTypingFile}`);
    }

    function getPackageName(tsdTypingFile: string) {
        const idx = tsdTypingFile.indexOf("/");
        return idx > 0 ? tsdTypingFile.substr(0, idx) : undefined;
    }

    export abstract class TypingsInstaller {
        private isTsdInstalled: boolean;

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
            this.isTsdInstalled = this.isPackageInstalled("tsd");
            if (this.log.isEnabled()) {
                this.log.writeLine(`isTsdInstalled: ${this.isTsdInstalled}`);
            }

            if (!this.isTsdInstalled) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`tsd is not installed, installing tsd...`);
                }
                this.isTsdInstalled = this.installPackage("tsd");
                if (this.log.isEnabled()) {
                    this.log.writeLine(`isTsdInstalled: ${this.isTsdInstalled}`);
                }
            }
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
            if (!this.isTsdInstalled) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`tsd is not installed, ignoring request...`);
                }
                return;
            }

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
            const tsdJson = combinePaths(cacheLocation, "tsd.json");
            if (this.log.isEnabled()) {
                this.log.writeLine(`Trying to find '${tsdJson}'...`);
            }
            if (this.installTypingHost.fileExists(tsdJson)) {
                const tsdConfig = <TsdConfig>JSON.parse(this.installTypingHost.readFile(tsdJson));
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Loaded content of '${tsdJson}': ${JSON.stringify(tsdConfig)}`);
                }
                if (tsdConfig.installed) {
                    for (const key in tsdConfig.installed) {
                        // key is <package name>/<typing file>
                        const packageName = getPackageName(key);
                        if (!packageName) {
                            continue;
                        }
                        const typingFile = tsdTypingToFileName(cacheLocation, key);
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

            // TODO: install typings and send response when they are ready
            const tsdPath = combinePaths(cachePath, "tsd.json");
            if (this.log.isEnabled()) {
                this.log.writeLine(`Tsd config file: ${tsdPath}`);
            }
            if (!this.installTypingHost.fileExists(tsdPath)) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Tsd config file '${tsdPath}' is missing, creating new one...`);
                }
                this.ensureDirectoryExists(cachePath, this.installTypingHost);
                this.installTypingHost.writeFile(tsdPath, DefaultTsdSettings);
            }

            this.runTsd(cachePath, typingsToInstall, installedTypings => {
                // TODO: watch project directory
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Requested to install typings ${JSON.stringify(typingsToInstall)}, installed typings ${JSON.stringify(installedTypings)}`);
                }
                const installedPackages: Map<true> = createMap<true>();
                const installedTypingFiles: string[] = [];
                for (const t of installedTypings) {
                    const packageName = getPackageName(t);
                    if (!packageName) {
                        continue;
                    }
                    installedPackages[packageName] = true;
                    installedTypingFiles.push(tsdTypingToFileName(cachePath, t));
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
                files: request.fileNames,
                kind: "set"
            };
        }

        protected abstract isPackageInstalled(packageName: string): boolean;
        protected abstract installPackage(packageName: string): boolean;
        protected abstract sendResponse(response: SetTypings | InvalidateCachedTypings): void;
        protected abstract runTsd(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void;
    }
}