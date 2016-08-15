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

        abstract readonly installTypingHost: InstallTypingHost;

        constructor(readonly globalCachePath: string, readonly safeListPath: Path) {
        }

        init() {
            this.isTsdInstalled = this.isPackageInstalled("tsd");
            if (!this.isTsdInstalled) {
                this.isTsdInstalled = this.installPackage("tsd");
            }
            this.processCacheLocation(this.globalCachePath);
        }

        install(req: InstallTypingsRequest) {
            if (!this.isTsdInstalled) {
                return;
            }

            // load existing typing information from the cache 
            if (req.cachePath) {
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

            // respond with whatever cached typings we have now
            this.sendResponse(this.createResponse(req, discoverTypingsResult.cachedTypingPaths));

            // start watching files
            this.watchFiles(discoverTypingsResult.filesToWatch);

            // install typings and 
            this.installTypings(req, discoverTypingsResult.cachedTypingPaths, discoverTypingsResult.newTypingNames);
        }

        private processCacheLocation(cacheLocation: string) {
            if (this.knownCachesSet[cacheLocation]) {
                return;
            }
            const tsdJson = combinePaths(cacheLocation, "tsd.json");
            if (this.installTypingHost.fileExists(tsdJson)) {
                const tsdConfig = <TsdConfig>JSON.parse(this.installTypingHost.readFile(tsdJson));
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
                            // TODO: log warning
                        }
                        this.packageNameToTypingLocation[packageName] = typingFile;
                    }
                }
            }
            this.knownCachesSet[cacheLocation] = true;
        }

        private installTypings(req: InstallTypingsRequest, currentlyCachedTypings: string[], typingsToInstall: string[]) {
            typingsToInstall = filter(typingsToInstall, x => !this.missingTypingsSet[x]);
            if (typingsToInstall.length === 0) {
                return;
            }

            // TODO: install typings and send response when they are ready
            const tsdPath = combinePaths(req.cachePath, "tsd.json");
            if (!this.installTypingHost.fileExists(tsdPath)) {
                this.ensureDirectoryExists(req.cachePath, this.installTypingHost);
                this.installTypingHost.writeFile(tsdPath, DefaultTsdSettings);
            }

            this.runTsd(req.cachePath, typingsToInstall, installedTypings => {
                // TODO: watch project directory
                const installedPackages: Map<true> = createMap<true>();
                const installedTypingFiles: string[] = [];
                for (const t of installedTypings) {
                    const packageName = getPackageName(t);
                    if (!packageName) {
                        continue;
                    }
                    installedPackages[packageName] = true;
                    installedTypingFiles.push(tsdTypingToFileName(req.cachePath, t));
                }
                for (const toInstall of typingsToInstall) {
                    if (!installedPackages[toInstall]) {
                        this.missingTypingsSet[toInstall] = true;
                    }
                }

                this.sendResponse(this.createResponse(req, currentlyCachedTypings.concat(installedTypingFiles)));
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

        private watchFiles(files: string[]) {
            // TODO: start watching files
        }

        private createResponse(request: InstallTypingsRequest, typings: string[]) {
            return {
                projectName: request.projectName,
                typingOptions: request.typingOptions,
                compilerOptions: request.compilerOptions,
                typings
            };
        }

        protected abstract isPackageInstalled(packageName: string): boolean;
        protected abstract installPackage(packageName: string): boolean;
        protected abstract sendResponse(response: InstallTypingsResponse): void;
        protected abstract runTsd(cachePath: string, typingsToInstall: string[], postInstallAction: (installedTypings: string[]) => void): void;
    }
}