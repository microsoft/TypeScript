namespace ts.server.typingsInstaller {
const fs: {
    appendFileSync(file: string, content: string): void
} = require("fs");

const path: {
    join(...parts: string[]): string;
    dirname(path: string): string;
    basename(path: string, extension?: string): string;
} = require("path");

class FileLog implements ts.server.typingsInstaller.Log {
    constructor(private logFile: string | undefined) {
    }

    isEnabled = () => {
        return typeof this.logFile === "string";
    };
    writeLine = (text: string) => {
        if (typeof this.logFile !== "string") return;

        try {
            fs.appendFileSync(this.logFile, `[${ts.server.nowString()}] ${text}${ts.sys.newLine}`);
        }
        catch (e) {
            this.logFile = undefined;
        }
    };
}

/** Used if `--npmLocation` is not passed. */
function getDefaultNPMLocation(processName: string, validateDefaultNpmLocation: boolean, host: ts.server.InstallTypingHost): string {
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
    entries: ts.MapLike<ts.MapLike<string>>;
}

function loadTypesRegistryFile(typesRegistryFilePath: string, host: ts.server.InstallTypingHost, log: ts.server.typingsInstaller.Log): ts.ESMap<string, ts.MapLike<string>> {
    if (!host.fileExists(typesRegistryFilePath)) {
        if (log.isEnabled()) {
            log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
        }
        return new ts.Map<string, ts.MapLike<string>>();
    }
    try {
        const content = JSON.parse(host.readFile(typesRegistryFilePath)!) as TypesRegistryFile;
        return new ts.Map(ts.getEntries(content.entries));
    }
    catch (e) {
        if (log.isEnabled()) {
            log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(e as Error).message}, ${(e as Error).stack}`);
        }
        return new ts.Map<string, ts.MapLike<string>>();
    }
}

const typesRegistryPackageName = "types-registry";
function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string {
    return ts.combinePaths(ts.normalizeSlashes(globalTypingsCacheLocation), `node_modules/${typesRegistryPackageName}/index.json`);
}

interface ExecSyncOptions {
    cwd: string;
    encoding: "utf-8";
}
type ExecSync = (command: string, options: ExecSyncOptions) => string;

export class NodeTypingsInstaller extends ts.server.typingsInstaller.TypingsInstaller {
    private readonly nodeExecSync: ExecSync;
    private readonly npmPath: string;
    readonly typesRegistry: ts.ESMap<string, ts.MapLike<string>>;

    private delayedInitializationError: ts.server.InitializationFailedResponse | undefined;

    constructor(globalTypingsCacheLocation: string, typingSafeListLocation: string, typesMapLocation: string, npmLocation: string | undefined, validateDefaultNpmLocation: boolean, throttleLimit: number, log: ts.server.typingsInstaller.Log) {
        super(
            ts.sys,
            globalTypingsCacheLocation,
            typingSafeListLocation ? ts.toPath(typingSafeListLocation, "", ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)) : ts.toPath("typingSafeList.json", __dirname, ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)),
            typesMapLocation ? ts.toPath(typesMapLocation, "", ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)) : ts.toPath("typesMap.json", __dirname, ts.createGetCanonicalFileName(ts.sys.useCaseSensitiveFileNames)),
            throttleLimit,
            log);
        this.npmPath = npmLocation !== undefined ? npmLocation : getDefaultNPMLocation(process.argv[0], validateDefaultNpmLocation, this.installTypingHost);

        // If the NPM path contains spaces and isn't wrapped in quotes, do so.
        if (ts.stringContains(this.npmPath, " ") && this.npmPath[0] !== `"`) {
            this.npmPath = `"${this.npmPath}"`;
        }
        if (this.log.isEnabled()) {
            this.log.writeLine(`Process id: ${process.pid}`);
            this.log.writeLine(`NPM location: ${this.npmPath} (explicit '${ts.server.Arguments.NpmLocation}' ${npmLocation === undefined ? "not " : ""} provided)`);
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
                this.log.writeLine(`Error updating ${typesRegistryPackageName} package: ${(e as Error).message}`);
            }
            // store error info to report it later when it is known that server is already listening to events from typings installer
            this.delayedInitializationError = {
                kind: "event::initializationFailed",
                message: (e as Error).message,
                stack: (e as Error).stack,
            };
        }

        this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation), this.installTypingHost, this.log);
    }

    listen() {
        process.on("message", (req: ts.server.TypingInstallerRequestUnion) => {
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
                    const typesRegistry: { [key: string]: ts.MapLike<string> } = {};
                    this.typesRegistry.forEach((value, key) => {
                        typesRegistry[key] = value;
                    });
                    const response: ts.server.TypesRegistryResponse = { kind: ts.server.EventTypesRegistry, typesRegistry };
                    this.sendResponse(response);
                    break;
                }
                case "installPackage": {
                    const { fileName, packageName, projectName, projectRootPath } = req;
                    const cwd = getDirectoryOfPackageJson(fileName, this.installTypingHost) || projectRootPath;
                    if (cwd) {
                        this.installWorker(-1, [packageName], cwd, success => {
                            const message = success ? `Package ${packageName} installed.` : `There was an error installing ${packageName}.`;
                            const response: ts.server.PackageInstalledResponse = { kind: ts.server.ActionPackageInstalled, projectName, success, message };
                            this.sendResponse(response);
                        });
                    }
                    else {
                        const response: ts.server.PackageInstalledResponse = { kind: ts.server.ActionPackageInstalled, projectName, success: false, message: "Could not determine a project root path." };
                        this.sendResponse(response);
                    }
                    break;
                }
                default:
                    ts.Debug.assertNever(req);
            }
        });
    }

    protected sendResponse(response: ts.server.TypingInstallerResponseUnion) {
        if (this.log.isEnabled()) {
            this.log.writeLine(`Sending response:\n    ${JSON.stringify(response)}`);
        }
        process.send!(response); // TODO: GH#18217
        if (this.log.isEnabled()) {
            this.log.writeLine(`Response has been sent.`);
        }
    }

    protected installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction): void {
        if (this.log.isEnabled()) {
            this.log.writeLine(`#${requestId} with arguments'${JSON.stringify(packageNames)}'.`);
        }
        const start = Date.now();
        const hasError = ts.server.typingsInstaller.installNpmPackages(this.npmPath, ts.version, packageNames, command => this.execSyncAndLog(command, { cwd }));
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
                this.log.writeLine(`    Succeeded. stdout:${indent(ts.sys.newLine, stdout)}`);
            }
            return false;
        }
        catch (error) {
            const { stdout, stderr } = error;
            this.log.writeLine(`    Failed. stdout:${indent(ts.sys.newLine, stdout)}${ts.sys.newLine}    stderr:${indent(ts.sys.newLine, stderr)}`);
            return true;
        }
    }
}

function getDirectoryOfPackageJson(fileName: string, host: ts.server.InstallTypingHost): string | undefined {
    return ts.forEachAncestorDirectory(ts.getDirectoryPath(fileName), directory => {
        if (host.fileExists(ts.combinePaths(directory, "package.json"))) {
            return directory;
        }
    });
}

const logFilePath = ts.server.findArgument(ts.server.Arguments.LogFile);
const globalTypingsCacheLocation = ts.server.findArgument(ts.server.Arguments.GlobalCacheLocation);
const typingSafeListLocation = ts.server.findArgument(ts.server.Arguments.TypingSafeListLocation);
const typesMapLocation = ts.server.findArgument(ts.server.Arguments.TypesMapLocation);
const npmLocation = ts.server.findArgument(ts.server.Arguments.NpmLocation);
const validateDefaultNpmLocation = ts.server.hasArgument(ts.server.Arguments.ValidateDefaultNpmLocation);

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
