namespace ts.server.typingsInstaller {
    const fs: {
        appendFileSync(file: string, content: string): void
    } = require("fs");

    const path: {
        join(...parts: string[]): string;
        dirname(path: string): string;
        basename(path: string, extension?: string): string;
    } = require("path");

    class FileLog implements Log {
        constructor(private logFile: string | undefined) {
        }

        isEnabled = () => {
            return typeof this.logFile === "string";
        };
        writeLine = (text: string) => {
            if (typeof this.logFile !== "string") return;

            try {
                fs.appendFileSync(this.logFile, `[${nowString()}] ${text}${sys.newLine}`);
            }
            catch (e) {
                this.logFile = undefined;
            }
        };
    }

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

    function loadTypesRegistryFile(typesRegistryFilePath: string, host: InstallTypingHost, log: Log): Map<string, MapLike<string>> {
        if (!host.fileExists(typesRegistryFilePath)) {
            if (log.isEnabled()) {
                log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
            }
            return new Map<string, MapLike<string>>();
        }
        try {
            const content = <TypesRegistryFile>JSON.parse(host.readFile(typesRegistryFilePath)!);
            return new Map(getEntries(content.entries));
        }
        catch (e) {
            if (log.isEnabled()) {
                log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(<Error>e).message}, ${(<Error>e).stack}`);
            }
            return new Map<string, MapLike<string>>();
        }
    }

    const typesRegistryPackageName = "types-registry";
    function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string {
        return combinePaths(normalizeSlashes(globalTypingsCacheLocation), `node_modules/${typesRegistryPackageName}/index.json`);
    }

    interface ExecSyncOptions {
        cwd: string;
        encoding: "utf-8";
    }
    type ExecSync = (command: string, options: ExecSyncOptions) => string;

    export class NodeTypingsInstaller extends TypingsInstaller {
        private readonly nodeExecSync: ExecSync;
        private readonly npmPath: string;
        readonly typesRegistry: Map<string, MapLike<string>>;

        private delayedInitializationError: InitializationFailedResponse | undefined;

        constructor(globalTypingsCacheLocation: string, typingSafeListLocation: string, typesMapLocation: string, npmLocation: string | undefined, validateDefaultNpmLocation: boolean, throttleLimit: number, log: Log) {
            super(
                sys,
                globalTypingsCacheLocation,
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
            ({ execSync: this.nodeExecSync } = require("child_process"));

            this.ensurePackageDirectoryExists(globalTypingsCacheLocation);

            try {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Updating ${typesRegistryPackageName} npm package...`);
                }
                this.execSyncAndLog(`${this.npmPath} install --ignore-scripts ${typesRegistryPackageName}@${this.latestDistTag}`, { cwd: globalTypingsCacheLocation });
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Updated ${typesRegistryPackageName} npm package`);
                }
            }
            catch (e) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Error updating ${typesRegistryPackageName} package: ${(<Error>e).message}`);
                }
                // store error info to report it later when it is known that server is already listening to events from typings installer
                this.delayedInitializationError = {
                    kind: "event::initializationFailed",
                    message: (<Error>e).message,
                    stack: (<Error>e).stack,
                };
            }

            this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation), this.installTypingHost, this.log);
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
            const hasError = installNpmPackages(this.npmPath, version, packageNames, command => this.execSyncAndLog(command, { cwd }));
            if (this.log.isEnabled()) {
                this.log.writeLine(`npm install #${requestId} took: ${Date.now() - start} ms`);
            }
            onRequestCompleted(!hasError);
        }

        /** Returns 'true' in case of error. */
        private execSyncAndLog(command: string, options: Pick<ExecSyncOptions, "cwd">): boolean {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Exec: ${command}`);
            }
            try {
                const stdout = this.nodeExecSync(command, { ...options, encoding: "utf-8" });
                if (this.log.isEnabled()) {
                    this.log.writeLine(`    Succeeded. stdout:${indent(sys.newLine, stdout)}`);
                }
                return false;
            }
            catch (error) {
                const { stdout, stderr } = error;
                this.log.writeLine(`    Failed. stdout:${indent(sys.newLine, stdout)}${sys.newLine}    stderr:${indent(sys.newLine, stderr)}`);
                return true;
            }
        }
    }

    function getDirectoryOfPackageJson(fileName: string, host: InstallTypingHost): string | undefined {
        return forEachAncestorDirectory(getDirectoryPath(fileName), directory => {
            if (host.fileExists(combinePaths(directory, "package.json"))) {
                return directory;
            }
        });
    }

    const logFilePath = findArgument(Arguments.LogFile);
    const globalTypingsCacheLocation = findArgument(Arguments.GlobalCacheLocation);
    const typingSafeListLocation = findArgument(Arguments.TypingSafeListLocation);
    const typesMapLocation = findArgument(Arguments.TypesMapLocation);
    const npmLocation = findArgument(Arguments.NpmLocation);
    const validateDefaultNpmLocation = hasArgument(Arguments.ValidateDefaultNpmLocation);

    const log = new FileLog(logFilePath);
    if (log.isEnabled()) {
        process.on("uncaughtException", (e: Error) => {
            log.writeLine(`Unhandled exception: ${e} at ${e.stack}`);
        });
    }
    process.on("disconnect", () => {
        if (log.isEnabled()) {
            log.writeLine(`Parent process has exited, shutting down...`);
        }
        process.exit(0);
    });
    const installer = new NodeTypingsInstaller(globalTypingsCacheLocation!, typingSafeListLocation!, typesMapLocation!, npmLocation, validateDefaultNpmLocation, /*throttleLimit*/5, log); // TODO: GH#18217
    installer.listen();

    function indent(newline: string, str: string | undefined): string {
        return str && str.length
            ? `${newline}    ` + str.replace(/\r?\n/, `${newline}    `)
            : "";
    }
}
