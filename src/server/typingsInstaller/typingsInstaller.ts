/// <reference path="../../compiler/core.ts" />
/// <reference path="../../compiler/moduleNameResolver.ts" />
/// <reference path="../../services/jsTyping.ts"/>
/// <reference path="../types.ts"/>
/// <reference path="../shared.ts"/>

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
        writeLine: noop
    };

    function typingToFileName(cachePath: string, packageName: string, installTypingHost: InstallTypingHost, log: Log): string {
        try {
            const result = resolveModuleName(packageName, combinePaths(cachePath, "index.d.ts"), { moduleResolution: ModuleResolutionKind.NodeJs }, installTypingHost);
            return result.resolvedModule && result.resolvedModule.resolvedFileName;
        }
        catch (e) {
            if (log.isEnabled()) {
                log.writeLine(`Failed to resolve ${packageName} in folder '${cachePath}': ${(<Error>e).message}`);
            }
            return undefined;
        }
    }


    export type RequestCompletedAction = (success: boolean) => void;
    interface PendingRequest {
        requestId: number;
        packageNames: string[];
        cwd: string;
        onRequestCompleted: RequestCompletedAction;
    }

    export abstract class TypingsInstaller {
        private readonly packageNameToTypingLocation: Map<string> = createMap<string>();
        private readonly missingTypingsSet: Map<true> = createMap<true>();
        private readonly knownCachesSet: Map<true> = createMap<true>();
        private readonly projectWatchers: Map<FileWatcher[]> = createMap<FileWatcher[]>();
        private safeList: JsTyping.SafeList | undefined;
        readonly pendingRunRequests: PendingRequest[] = [];

        private installRunCount = 1;
        private inFlightRequestCount = 0;

        abstract readonly typesRegistry: Map<void>;

        constructor(
            protected readonly installTypingHost: InstallTypingHost,
            private readonly globalCachePath: string,
            private readonly safeListPath: Path,
            private readonly typesMapLocation: Path,
            private readonly throttleLimit: number,
            protected readonly log = nullLog) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Global cache location '${globalCachePath}', safe file path '${safeListPath}', types map path ${typesMapLocation}`);
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
            const watchers = this.projectWatchers.get(projectName);
            if (!watchers) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`No watchers are registered for project '${projectName}'`);
                }
                return;
            }
            for (const w of watchers) {
                w.close();
            }

            this.projectWatchers.delete(projectName);

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

            if (this.safeList === undefined) {
                this.initializeSafeList();
            }
            const discoverTypingsResult = JsTyping.discoverTypings(
                this.installTypingHost,
                this.log.isEnabled() ? (s => this.log.writeLine(s)) : undefined,
                req.fileNames,
                req.projectRootPath,
                this.safeList,
                this.packageNameToTypingLocation,
                req.typeAcquisition,
                req.unresolvedImports);

            if (this.log.isEnabled()) {
                this.log.writeLine(`Finished typings discovery: ${JSON.stringify(discoverTypingsResult)}`);
            }

            // start watching files
            this.watchFiles(req.projectName, discoverTypingsResult.filesToWatch);

            // install typings
            if (discoverTypingsResult.newTypingNames.length) {
                this.installTypings(req, req.cachePath || this.globalCachePath, discoverTypingsResult.cachedTypingPaths, discoverTypingsResult.newTypingNames);
            }
            else {
                this.sendResponse(this.createSetTypings(req, discoverTypingsResult.cachedTypingPaths));
                if (this.log.isEnabled()) {
                    this.log.writeLine(`No new typings were requested as a result of typings discovery`);
                }
            }
        }

        private initializeSafeList() {
            // Prefer the safe list from the types map if it exists
            if (this.typesMapLocation) {
                const safeListFromMap = JsTyping.loadTypesMap(this.installTypingHost, this.typesMapLocation);
                if (safeListFromMap) {
                    this.log.writeLine(`Loaded safelist from types map file '${this.typesMapLocation}'`);
                    this.safeList = safeListFromMap;
                    return;
                }
                this.log.writeLine(`Failed to load safelist from types map file '${this.typesMapLocation}'`);
            }
            this.safeList = JsTyping.loadSafeList(this.installTypingHost, this.safeListPath);
        }

        private processCacheLocation(cacheLocation: string) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Processing cache location '${cacheLocation}'`);
            }
            if (this.knownCachesSet.get(cacheLocation)) {
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
                        const typingFile = typingToFileName(cacheLocation, packageName, this.installTypingHost, this.log);
                        if (!typingFile) {
                            this.missingTypingsSet.set(packageName, true);
                            continue;
                        }
                        const existingTypingFile = this.packageNameToTypingLocation.get(packageName);
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
                        this.packageNameToTypingLocation.set(packageName, typingFile);
                    }
                }
            }
            if (this.log.isEnabled()) {
                this.log.writeLine(`Finished processing cache location '${cacheLocation}'`);
            }
            this.knownCachesSet.set(cacheLocation, true);
        }

        private filterTypings(typingsToInstall: string[]) {
            if (typingsToInstall.length === 0) {
                return typingsToInstall;
            }
            const result: string[] = [];
            for (const typing of typingsToInstall) {
                if (this.missingTypingsSet.get(typing) || this.packageNameToTypingLocation.get(typing)) {
                    continue;
                }
                const validationResult = JsTyping.validatePackageName(typing);
                if (validationResult === JsTyping.PackageNameValidationResult.Ok) {
                    if (this.typesRegistry.has(typing)) {
                        result.push(typing);
                    }
                    else {
                        if (this.log.isEnabled()) {
                            this.log.writeLine(`Entry for package '${typing}' does not exist in local types registry - skipping...`);
                        }
                    }
                }
                else {
                    // add typing name to missing set so we won't process it again
                    this.missingTypingsSet.set(typing, true);
                    if (this.log.isEnabled()) {
                        this.log.writeLine(JsTyping.renderPackageNameValidationFailure(validationResult, typing));
                    }
                }
            }
            return result;
        }

        protected ensurePackageDirectoryExists(directory: string) {
            const npmConfigPath = combinePaths(directory, "package.json");
            if (this.log.isEnabled()) {
                this.log.writeLine(`Npm config file: ${npmConfigPath}`);
            }
            if (!this.installTypingHost.fileExists(npmConfigPath)) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Npm config file: '${npmConfigPath}' is missing, creating new one...`);
                }
                this.ensureDirectoryExists(directory, this.installTypingHost);
                this.installTypingHost.writeFile(npmConfigPath, '{ "private": true }');
            }
        }

        private installTypings(req: DiscoverTypings, cachePath: string, currentlyCachedTypings: string[], typingsToInstall: string[]) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Installing typings ${JSON.stringify(typingsToInstall)}`);
            }
            const filteredTypings = this.filterTypings(typingsToInstall);
            if (filteredTypings.length === 0) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`All typings are known to be missing or invalid - no need to install more typings`);
                }
                this.sendResponse(this.createSetTypings(req, currentlyCachedTypings));
                return;
            }

            this.ensurePackageDirectoryExists(cachePath);

            const requestId = this.installRunCount;
            this.installRunCount++;

            // send progress event
            this.sendResponse(<BeginInstallTypes>{
                kind: EventBeginInstallTypes,
                eventId: requestId,
                typingsInstallerVersion: ts.version, // qualified explicitly to prevent occasional shadowing
                projectName: req.projectName
            });

            const scopedTypings = filteredTypings.map(typingsName);
            this.installTypingsAsync(requestId, scopedTypings, cachePath, ok => {
                try {
                    if (!ok) {
                        if (this.log.isEnabled()) {
                            this.log.writeLine(`install request failed, marking packages as missing to prevent repeated requests: ${JSON.stringify(filteredTypings)}`);
                        }
                        for (const typing of filteredTypings) {
                            this.missingTypingsSet.set(typing, true);
                        }
                        return;
                    }

                    // TODO: watch project directory
                    if (this.log.isEnabled()) {
                        this.log.writeLine(`Installed typings ${JSON.stringify(scopedTypings)}`);
                    }
                    const installedTypingFiles: string[] = [];
                    for (const packageName of filteredTypings) {
                        const typingFile = typingToFileName(cachePath, packageName, this.installTypingHost, this.log);
                        if (!typingFile) {
                            this.missingTypingsSet.set(packageName, true);
                            continue;
                        }
                        if (!this.packageNameToTypingLocation.has(packageName)) {
                            this.packageNameToTypingLocation.set(packageName, typingFile);
                        }
                        installedTypingFiles.push(typingFile);
                    }
                    if (this.log.isEnabled()) {
                        this.log.writeLine(`Installed typing files ${JSON.stringify(installedTypingFiles)}`);
                    }

                    this.sendResponse(this.createSetTypings(req, currentlyCachedTypings.concat(installedTypingFiles)));
                }
                finally {
                    const response: EndInstallTypes = {
                        kind: EventEndInstallTypes,
                        eventId: requestId,
                        projectName: req.projectName,
                        packagesToInstall: scopedTypings,
                        installSuccess: ok,
                        typingsInstallerVersion: ts.version // qualified explicitly to prevent occasional shadowing
                    };
                    this.sendResponse(response);
                }
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
                    if (!isInvoked) {
                        this.sendResponse({ projectName, kind: server.ActionInvalidate });
                        isInvoked = true;
                    }
                }, /*pollingInterval*/ 2000);
                watchers.push(w);
            }
            this.projectWatchers.set(projectName, watchers);
        }

        private createSetTypings(request: DiscoverTypings, typings: string[]): SetTypings {
            return {
                projectName: request.projectName,
                typeAcquisition: request.typeAcquisition,
                compilerOptions: request.compilerOptions,
                typings,
                unresolvedImports: request.unresolvedImports,
                kind: ActionSet
            };
        }

        private installTypingsAsync(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: RequestCompletedAction): void {
            this.pendingRunRequests.unshift({ requestId, packageNames, cwd, onRequestCompleted });
            this.executeWithThrottling();
        }

        private executeWithThrottling() {
            while (this.inFlightRequestCount < this.throttleLimit && this.pendingRunRequests.length) {
                this.inFlightRequestCount++;
                const request = this.pendingRunRequests.pop();
                this.installWorker(request.requestId, request.packageNames, request.cwd, ok => {
                    this.inFlightRequestCount--;
                    request.onRequestCompleted(ok);
                    this.executeWithThrottling();
                });
            }
        }

        protected abstract installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: RequestCompletedAction): void;
        protected abstract sendResponse(response: SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes): void;
    }

    /* @internal */
    export function typingsName(packageName: string): string {
        return `@types/${packageName}@ts${versionMajorMinor}`;
    }
}