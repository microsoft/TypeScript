namespace ts.server.typingsInstaller {
    interface NpmConfig {
        devDependencies: MapLike<any>;
    }

    interface NpmLock {
        dependencies: { [packageName: string]: { version: string } };
    }

    export interface Log {
        isEnabled(): boolean;
        writeLine(text: string): void;
    }

    const nullLog: Log = {
        isEnabled: () => false,
        writeLine: noop
    };

    function typingToFileName(cachePath: string, packageName: string, installTypingHost: InstallTypingHost, log: Log): string | undefined {
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

    /*@internal*/
    export function installNpmPackages(npmPath: string, tsVersion: string, packageNames: string[], install: (command: string) => boolean) {
        let hasError = false;
        for (let remaining = packageNames.length; remaining > 0;) {
            const result = getNpmCommandForInstallation(npmPath, tsVersion, packageNames, remaining);
            remaining = result.remaining;
            hasError = install(result.command) || hasError;
        }
        return hasError;
    }

    /*@internal*/
    export function getNpmCommandForInstallation(npmPath: string, tsVersion: string, packageNames: string[], remaining: number) {
        const sliceStart = packageNames.length - remaining;
        let command: string, toSlice = remaining;
        while (true) {
            command = `${npmPath} install --ignore-scripts ${(toSlice === packageNames.length ? packageNames : packageNames.slice(sliceStart, sliceStart + toSlice)).join(" ")} --save-dev --user-agent="typesInstaller/${tsVersion}"`;
            if (command.length < 8000) {
                break;
            }

            toSlice = toSlice - Math.floor(toSlice / 2);
        }
        return { command, remaining: remaining - toSlice };
    }

    export type RequestCompletedAction = (success: boolean) => void;
    interface PendingRequest {
        requestId: number;
        packageNames: string[];
        cwd: string;
        onRequestCompleted: RequestCompletedAction;
    }

    function endsWith(str: string, suffix: string, caseSensitive: boolean): boolean {
        const expectedPos = str.length - suffix.length;
        return expectedPos >= 0 &&
            (str.indexOf(suffix, expectedPos) === expectedPos ||
                (!caseSensitive && compareStringsCaseInsensitive(str.substr(expectedPos), suffix) === Comparison.EqualTo));
    }

    function isPackageOrBowerJson(fileName: string, caseSensitive: boolean) {
        return endsWith(fileName, "/package.json", caseSensitive) || endsWith(fileName, "/bower.json", caseSensitive);
    }

    function sameFiles(a: string, b: string, caseSensitive: boolean) {
        return a === b || (!caseSensitive && compareStringsCaseInsensitive(a, b) === Comparison.EqualTo);
    }

    const enum ProjectWatcherType {
        FileWatcher = "FileWatcher",
        DirectoryWatcher = "DirectoryWatcher"
    }

    type ProjectWatchers = Map<string, FileWatcher> & { isInvoked?: boolean; };

    export abstract class TypingsInstaller {
        private readonly packageNameToTypingLocation: Map<string, JsTyping.CachedTyping> = new Map<string, JsTyping.CachedTyping>();
        private readonly missingTypingsSet = new Set<string>();
        private readonly knownCachesSet = new Set<string>();
        private readonly projectWatchers = new Map<string, ProjectWatchers>();
        private safeList: JsTyping.SafeList | undefined;
        readonly pendingRunRequests: PendingRequest[] = [];
        private readonly toCanonicalFileName: GetCanonicalFileName;
        private readonly globalCachePackageJsonPath: string;

        private installRunCount = 1;
        private inFlightRequestCount = 0;

        abstract readonly typesRegistry: Map<string, MapLike<string>>;

        constructor(
            protected readonly installTypingHost: InstallTypingHost,
            private readonly globalCachePath: string,
            private readonly safeListPath: Path,
            private readonly typesMapLocation: Path,
            private readonly throttleLimit: number,
            protected readonly log = nullLog) {
            this.toCanonicalFileName = createGetCanonicalFileName(installTypingHost.useCaseSensitiveFileNames);
            this.globalCachePackageJsonPath = combinePaths(globalCachePath, "package.json");
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
            clearMap(watchers, closeFileWatcher);
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
                this.safeList!,
                this.packageNameToTypingLocation,
                req.typeAcquisition,
                req.unresolvedImports,
                this.typesRegistry);

            if (this.log.isEnabled()) {
                this.log.writeLine(`Finished typings discovery: ${JSON.stringify(discoverTypingsResult)}`);
            }

            // start watching files
            this.watchFiles(req.projectName, discoverTypingsResult.filesToWatch, req.projectRootPath, req.watchOptions);

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
            if (this.knownCachesSet.has(cacheLocation)) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Cache location was already processed...`);
                }
                return;
            }
            const packageJson = combinePaths(cacheLocation, "package.json");
            const packageLockJson = combinePaths(cacheLocation, "package-lock.json");
            if (this.log.isEnabled()) {
                this.log.writeLine(`Trying to find '${packageJson}'...`);
            }
            if (this.installTypingHost.fileExists(packageJson) && this.installTypingHost.fileExists(packageLockJson)) {
                const npmConfig = <NpmConfig>JSON.parse(this.installTypingHost.readFile(packageJson)!); // TODO: GH#18217
                const npmLock = <NpmLock>JSON.parse(this.installTypingHost.readFile(packageLockJson)!); // TODO: GH#18217
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Loaded content of '${packageJson}': ${JSON.stringify(npmConfig)}`);
                    this.log.writeLine(`Loaded content of '${packageLockJson}'`);
                }
                if (npmConfig.devDependencies && npmLock.dependencies) {
                    for (const key in npmConfig.devDependencies) {
                        if (!hasProperty(npmLock.dependencies, key)) {
                            // if package in package.json but not package-lock.json, skip adding to cache so it is reinstalled on next use
                            continue;
                        }
                        // key is @types/<package name>
                        const packageName = getBaseFileName(key);
                        if (!packageName) {
                            continue;
                        }
                        const typingFile = typingToFileName(cacheLocation, packageName, this.installTypingHost, this.log);
                        if (!typingFile) {
                            this.missingTypingsSet.add(packageName);
                            continue;
                        }
                        const existingTypingFile = this.packageNameToTypingLocation.get(packageName);
                        if (existingTypingFile) {
                            if (existingTypingFile.typingLocation === typingFile) {
                                continue;
                            }

                            if (this.log.isEnabled()) {
                                this.log.writeLine(`New typing for package ${packageName} from '${typingFile}' conflicts with existing typing file '${existingTypingFile}'`);
                            }
                        }
                        if (this.log.isEnabled()) {
                            this.log.writeLine(`Adding entry into typings cache: '${packageName}' => '${typingFile}'`);
                        }
                        const info = getProperty(npmLock.dependencies, key);
                        const version = info && info.version;
                        if (!version) {
                            continue;
                        }

                        const newTyping: JsTyping.CachedTyping = { typingLocation: typingFile, version: new Version(version) };
                        this.packageNameToTypingLocation.set(packageName, newTyping);
                    }
                }
            }
            if (this.log.isEnabled()) {
                this.log.writeLine(`Finished processing cache location '${cacheLocation}'`);
            }
            this.knownCachesSet.add(cacheLocation);
        }

        private filterTypings(typingsToInstall: readonly string[]): readonly string[] {
            return mapDefined(typingsToInstall, typing => {
                const typingKey = mangleScopedPackageName(typing);
                if (this.missingTypingsSet.has(typingKey)) {
                    if (this.log.isEnabled()) this.log.writeLine(`'${typing}':: '${typingKey}' is in missingTypingsSet - skipping...`);
                    return undefined;
                }
                const validationResult = JsTyping.validatePackageName(typing);
                if (validationResult !== JsTyping.NameValidationResult.Ok) {
                    // add typing name to missing set so we won't process it again
                    this.missingTypingsSet.add(typingKey);
                    if (this.log.isEnabled()) this.log.writeLine(JsTyping.renderPackageNameValidationFailure(validationResult, typing));
                    return undefined;
                }
                if (!this.typesRegistry.has(typingKey)) {
                    if (this.log.isEnabled()) this.log.writeLine(`'${typing}':: Entry for package '${typingKey}' does not exist in local types registry - skipping...`);
                    return undefined;
                }
                if (this.packageNameToTypingLocation.get(typingKey) && JsTyping.isTypingUpToDate(this.packageNameToTypingLocation.get(typingKey)!, this.typesRegistry.get(typingKey)!)) {
                    if (this.log.isEnabled()) this.log.writeLine(`'${typing}':: '${typingKey}' already has an up-to-date typing - skipping...`);
                    return undefined;
                }
                return typingKey;
            });
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
                // qualified explicitly to prevent occasional shadowing
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-qualifier
                typingsInstallerVersion: ts.version,
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
                            this.missingTypingsSet.add(typing);
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
                            this.missingTypingsSet.add(packageName);
                            continue;
                        }

                        // packageName is guaranteed to exist in typesRegistry by filterTypings
                        const distTags = this.typesRegistry.get(packageName)!;
                        const newVersion = new Version(distTags[`ts${versionMajorMinor}`] || distTags[this.latestDistTag]);
                        const newTyping: JsTyping.CachedTyping = { typingLocation: typingFile, version: newVersion };
                        this.packageNameToTypingLocation.set(packageName, newTyping);
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
                        // qualified explicitly to prevent occasional shadowing
                        // eslint-disable-next-line @typescript-eslint/no-unnecessary-qualifier
                        typingsInstallerVersion: ts.version
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

        private watchFiles(projectName: string, files: string[], projectRootPath: Path, options: WatchOptions | undefined) {
            if (!files.length) {
                // shut down existing watchers
                this.closeWatchers(projectName);
                return;
            }

            let watchers = this.projectWatchers.get(projectName)!;
            const toRemove = new Map<string, FileWatcher>();
            if (!watchers) {
                watchers = new Map();
                this.projectWatchers.set(projectName, watchers);
            }
            else {
                copyEntries(watchers, toRemove);
            }

            // handler should be invoked once for the entire set of files since it will trigger full rediscovery of typings
            watchers.isInvoked = false;

            const isLoggingEnabled = this.log.isEnabled();
            const createProjectWatcher = (path: string, projectWatcherType: ProjectWatcherType) => {
                const canonicalPath = this.toCanonicalFileName(path);
                toRemove.delete(canonicalPath);
                if (watchers.has(canonicalPath)) {
                    return;
                }

                if (isLoggingEnabled) {
                    this.log.writeLine(`${projectWatcherType}:: Added:: WatchInfo: ${path}`);
                }
                const watcher = projectWatcherType === ProjectWatcherType.FileWatcher ?
                    this.installTypingHost.watchFile!(path, (f, eventKind) => { // TODO: GH#18217
                        if (isLoggingEnabled) {
                            this.log.writeLine(`FileWatcher:: Triggered with ${f} eventKind: ${FileWatcherEventKind[eventKind]}:: WatchInfo: ${path}:: handler is already invoked '${watchers.isInvoked}'`);
                        }
                        if (!watchers.isInvoked) {
                            watchers.isInvoked = true;
                            this.sendResponse({ projectName, kind: ActionInvalidate });
                        }
                    }, /*pollingInterval*/ 2000, options) :
                    this.installTypingHost.watchDirectory!(path, f => { // TODO: GH#18217
                        if (isLoggingEnabled) {
                            this.log.writeLine(`DirectoryWatcher:: Triggered with ${f} :: WatchInfo: ${path} recursive :: handler is already invoked '${watchers.isInvoked}'`);
                        }
                        if (watchers.isInvoked || !fileExtensionIs(f, Extension.Json)) {
                            return;
                        }

                        if (isPackageOrBowerJson(f, this.installTypingHost.useCaseSensitiveFileNames) &&
                            !sameFiles(f, this.globalCachePackageJsonPath, this.installTypingHost.useCaseSensitiveFileNames)) {
                            watchers.isInvoked = true;
                            this.sendResponse({ projectName, kind: ActionInvalidate });
                        }
                    }, /*recursive*/ true, options);

                watchers.set(canonicalPath, isLoggingEnabled ? {
                    close: () => {
                        this.log.writeLine(`${projectWatcherType}:: Closed:: WatchInfo: ${path}`);
                        watcher.close();
                    }
                } : watcher);
            };

            // Create watches from list of files
            for (const file of files) {
                if (file.endsWith("/package.json") || file.endsWith("/bower.json")) {
                    // package.json or bower.json exists, watch the file to detect changes and update typings
                    createProjectWatcher(file, ProjectWatcherType.FileWatcher);
                    continue;
                }

                // path in projectRoot, watch project root
                if (containsPath(projectRootPath, file, projectRootPath, !this.installTypingHost.useCaseSensitiveFileNames)) {
                    const subDirectory = file.indexOf(directorySeparator, projectRootPath.length + 1);
                    if (subDirectory !== -1) {
                        // Watch subDirectory
                        createProjectWatcher(file.substr(0, subDirectory), ProjectWatcherType.DirectoryWatcher);
                    }
                    else {
                        // Watch the directory itself
                        createProjectWatcher(file, ProjectWatcherType.DirectoryWatcher);
                    }
                    continue;
                }

                // path in global cache, watch global cache
                if (containsPath(this.globalCachePath, file, projectRootPath, !this.installTypingHost.useCaseSensitiveFileNames)) {
                    createProjectWatcher(this.globalCachePath, ProjectWatcherType.DirectoryWatcher);
                    continue;
                }

                // watch node_modules or bower_components
                createProjectWatcher(file, ProjectWatcherType.DirectoryWatcher);
            }

            // Remove unused watches
            toRemove.forEach((watch, path) => {
                watch.close();
                watchers.delete(path);
            });
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
                const request = this.pendingRunRequests.pop()!;
                this.installWorker(request.requestId, request.packageNames, request.cwd, ok => {
                    this.inFlightRequestCount--;
                    request.onRequestCompleted(ok);
                    this.executeWithThrottling();
                });
            }
        }

        protected abstract installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: RequestCompletedAction): void;
        protected abstract sendResponse(response: SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes): void;

        protected readonly latestDistTag = "latest";
    }

    /* @internal */
    export function typingsName(packageName: string): string {
        return `@types/${packageName}@ts${versionMajorMinor}`;
    }
}
