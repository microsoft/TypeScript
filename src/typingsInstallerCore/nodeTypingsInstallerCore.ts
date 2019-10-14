namespace ts.server.typingsInstaller {
    const path: {
        join(...parts: string[]): string;
        dirname(path: string): string;
        basename(path: string, extension?: string): string;
    } = require("path");

    /** Used if `--npmLocation` is not passed. */
    function getDefaultNPMLocation(processName: string, validateDefaultNpmLocation: boolean, host: InstallTypingHost): string {
        if (path.basename(processName).indexOf("node") === 0) {
            const npmPath = path.join(path.dirname(process.argv[0]), "npm");
            if (!validateDefaultNpmLocation) {
                return npmPath;
            }
            if (host.fileExists(npmPath)) {
                return `"${npmPath}"`;
            }
        }
        return "npm";
    }

    interface TypesRegistryFile {
        entries: MapLike<MapLike<string>>;
    }

    function loadTypesRegistryFile(typesRegistryFilePath: string, host: InstallTypingHost, log: Log): Map<MapLike<string>> {
        if (!host.fileExists(typesRegistryFilePath)) {
            if (log.isEnabled()) {
                log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
            }
            return createMap<MapLike<string>>();
        }
        try {
            const content = <TypesRegistryFile>JSON.parse(host.readFile(typesRegistryFilePath)!);
            return createMapFromTemplate(content.entries);
        }
        catch (e) {
            if (log.isEnabled()) {
                log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(<Error>e).message}, ${(<Error>e).stack}`);
            }
            return createMap<MapLike<string>>();
        }
    }

    const typesRegistryPackageName = "types-registry";
    const definitelyTypedTypesRegistryPackageName = "@definitelytyped/types-registry";
    function getTypesRegistryFileLocation(globalTypingsCacheLocation: string, packageName: string): string {
        return combinePaths(normalizeSlashes(globalTypingsCacheLocation), `node_modules/${packageName}/index.json`);
    }

    export interface NodeInstallTypingHost extends InstallTypingHost {
        execSyncAndLog(command: string, options: string, log: Log): boolean;
    }

    export class NodeTypingsInstaller extends TypingsInstaller {
        private readonly npmPath: string;
        readonly typesRegistry!: Map<MapLike<string>>;

        private delayedInitializationError: InitializationFailedResponse | undefined;

        constructor(private host: NodeInstallTypingHost, globalTypingsCacheLocation: string | undefined, typingSafeListLocation: string, typesMapLocation: string, npmLocation: string | undefined, validateDefaultNpmLocation: boolean, throttleLimit: number, log: Log) {
            super(
                host,
                globalTypingsCacheLocation!,
                typingSafeListLocation ? toPath(typingSafeListLocation, "", createGetCanonicalFileName(sys.useCaseSensitiveFileNames)) : toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)),
                typesMapLocation ? toPath(typesMapLocation, "", createGetCanonicalFileName(sys.useCaseSensitiveFileNames)) : toPath("typesMap.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)),
                throttleLimit,
                log);
            this.npmPath = npmLocation !== undefined ? npmLocation : getDefaultNPMLocation(process.argv[0], validateDefaultNpmLocation, this.installTypingHost);

            // If the NPM path contains spaces and isn't wrapped in quotes, do so.
            if (stringContains(this.npmPath, " ") && this.npmPath[0] !== `"`) {
                this.npmPath = `"${this.npmPath}"`;
            }
            if (this.log.isEnabled()) {
                this.log.writeLine(`Process id: ${process.pid}`);
                this.log.writeLine(`NPM location: ${this.npmPath} (explicit '${Arguments.NpmLocation}' ${npmLocation === undefined ? "not " : ""} provided)`);
                this.log.writeLine(`validateDefaultNpmLocation: ${validateDefaultNpmLocation}`);
            }
            if (globalTypingsCacheLocation) {
                this.ensurePackageDirectoryExists(globalTypingsCacheLocation);
                const packageName = this.installTypesRegistry(globalTypingsCacheLocation);
                this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation, packageName), this.installTypingHost, this.log);
            }
            else if (this.log.isEnabled()) {
                this.log.writeLine("Error: Missing --globalTypingsCache argument on command line");
                this.delayedInitializationError = {
                    kind: "event::initializationFailed",
                    message: "Missing --globalTypingsCache argument",
                };
            }
        }

        private installTypesRegistry(globalTypingsCacheLocation: string) {
            let result: typeof typesRegistryPackageName | typeof definitelyTypedTypesRegistryPackageName | undefined =
                this.installTypesRegistryFromPackageName(definitelyTypedTypesRegistryPackageName, globalTypingsCacheLocation)
                || this.installTypesRegistryFromPackageName(typesRegistryPackageName, globalTypingsCacheLocation);
            if (!result) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Error updating ${typesRegistryPackageName} package`);
                }
                // store error info to report it later when it is known that server is already listening to events from typings installer
                this.delayedInitializationError = {
                    kind: "event::initializationFailed",
                    message: result || "UPDATE FAILED"
                };
                return "types-registry";
            }
            return result;
        }

        private installTypesRegistryFromPackageName(packageName: typeof typesRegistryPackageName | typeof definitelyTypedTypesRegistryPackageName, globalTypingsCacheLocation: string) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Updating ${packageName} npm package...`);
            }
            const registry = packageName === typesRegistryPackageName ? "" : "--registry=https://npm.pkg.github.com";
            if (this.host.execSyncAndLog(`${this.npmPath} install ${registry} --ignore-scripts ${packageName}@${this.latestDistTag}`, globalTypingsCacheLocation, this.log)) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Updated ${packageName} npm package`);
                }
                return packageName;
            }
        }

        listen() {
            process.on("message", (req: TypingInstallerRequestUnion) => {
                if (this.delayedInitializationError) {
                    // report initializationFailed error
                    this.sendResponse(this.delayedInitializationError);
                    this.delayedInitializationError = undefined;
                }
                switch (req.kind) {
                    case "discover":
                        this.install(req);
                        break;
                    case "closeProject":
                        this.closeProject(req);
                        break;
                    case "typesRegistry": {
                        const typesRegistry: { [key: string]: MapLike<string> } = {};
                        this.typesRegistry.forEach((value, key) => {
                            typesRegistry[key] = value;
                        });
                        const response: TypesRegistryResponse = { kind: EventTypesRegistry, typesRegistry };
                        this.sendResponse(response);
                        break;
                    }
                    case "installPackage": {
                        const { fileName, packageName, projectName, projectRootPath } = req;
                        const cwd = getDirectoryOfPackageJson(fileName, this.installTypingHost) || projectRootPath;
                        if (cwd) {
                            this.installWorker(-1, [packageName], cwd, success => {
                                const message = success ? `Package ${packageName} installed.` : `There was an error installing ${packageName}.`;
                                const response: PackageInstalledResponse = { kind: ActionPackageInstalled, projectName, success, message };
                                this.sendResponse(response);
                            });
                        }
                        else {
                            const response: PackageInstalledResponse = { kind: ActionPackageInstalled, projectName, success: false, message: "Could not determine a project root path." };
                            this.sendResponse(response);
                        }
                        break;
                    }
                    default:
                        Debug.assertNever(req);
                }
            });
        }

        protected sendResponse(response: TypingInstallerResponseUnion) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Sending response:\n    ${JSON.stringify(response)}`);
            }
            process.send!(response); // TODO: GH#18217
            if (this.log.isEnabled()) {
                this.log.writeLine(`Response has been sent.`);
            }
        }

        protected installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: RequestCompletedAction): void {
            if (this.log.isEnabled()) {
                this.log.writeLine(`#${requestId} with arguments'${JSON.stringify(packageNames)}'.`);
            }
            const start = Date.now();
            const succeeded = installNpmPackages(this.npmPath, version, packageNames, command => this.host.execSyncAndLog(command, cwd, this.log));
            if (this.log.isEnabled()) {
                this.log.writeLine(`npm install #${requestId} took: ${Date.now() - start} ms`);
            }
            onRequestCompleted(succeeded);
        }
    }

    function getDirectoryOfPackageJson(fileName: string, host: InstallTypingHost): string | undefined {
        return forEachAncestorDirectory(getDirectoryPath(fileName), directory => {
            if (host.fileExists(combinePaths(directory, "package.json"))) {
                return directory;
            }
        });
    }
}
