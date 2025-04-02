import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

import {
    combinePaths,
    createGetCanonicalFileName,
    getDirectoryPath,
    MapLike,
    normalizePath,
    normalizeSlashes,
    sys,
    toPath,
    version,
} from "../typescript/typescript.js";
import * as ts from "../typescript/typescript.js";

class FileLog implements ts.server.typingsInstaller.Log {
    constructor(private logFile: string | undefined) {
    }

    isEnabled = () => {
        return typeof this.logFile === "string";
    };
    writeLine = (text: string) => {
        if (typeof this.logFile !== "string") return;

        try {
            fs.appendFileSync(this.logFile, `[${ts.server.nowString()}] ${text}${sys.newLine}`);
        }
        catch {
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
    entries: MapLike<MapLike<string>>;
}

function loadTypesRegistryFile(typesRegistryFilePath: string, host: ts.server.InstallTypingHost, log: ts.server.typingsInstaller.Log): Map<string, MapLike<string>> {
    if (!host.fileExists(typesRegistryFilePath)) {
        if (log.isEnabled()) {
            log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
        }
        return new Map<string, MapLike<string>>();
    }
    try {
        const content = JSON.parse(host.readFile(typesRegistryFilePath)!) as TypesRegistryFile;
        return new Map(Object.entries(content.entries));
    }
    catch (e) {
        if (log.isEnabled()) {
            log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(e as Error).message}, ${(e as Error).stack}`);
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

class NodeTypingsInstaller extends ts.server.typingsInstaller.TypingsInstaller {
    private readonly npmPath: string;
    readonly typesRegistry: Map<string, MapLike<string>>;

    private delayedInitializationError: ts.server.InitializationFailedResponse | undefined;

    constructor(globalTypingsCacheLocation: string, typingSafeListLocation: string, typesMapLocation: string, npmLocation: string | undefined, validateDefaultNpmLocation: boolean, throttleLimit: number, log: ts.server.typingsInstaller.Log) {
        const libDirectory = getDirectoryPath(normalizePath(sys.getExecutingFilePath()));
        super(
            sys,
            globalTypingsCacheLocation,
            typingSafeListLocation ? toPath(typingSafeListLocation, "", createGetCanonicalFileName(sys.useCaseSensitiveFileNames)) : toPath("typingSafeList.json", libDirectory, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)),
            typesMapLocation ? toPath(typesMapLocation, "", createGetCanonicalFileName(sys.useCaseSensitiveFileNames)) : toPath("typesMap.json", libDirectory, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)),
            throttleLimit,
            log,
        );
        this.npmPath = npmLocation !== undefined ? npmLocation : getDefaultNPMLocation(process.argv[0], validateDefaultNpmLocation, this.installTypingHost);

        // If the NPM path contains spaces and isn't wrapped in quotes, do so.
        if (this.npmPath.includes(" ") && this.npmPath[0] !== `"`) {
            this.npmPath = `"${this.npmPath}"`;
        }
        if (this.log.isEnabled()) {
            this.log.writeLine(`Process id: ${process.pid}`);
            this.log.writeLine(`NPM location: ${this.npmPath} (explicit '${ts.server.Arguments.NpmLocation}' ${npmLocation === undefined ? "not " : ""} provided)`);
            this.log.writeLine(`validateDefaultNpmLocation: ${validateDefaultNpmLocation}`);
        }

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

    override handleRequest(req: ts.server.TypingInstallerRequestUnion): void {
        if (this.delayedInitializationError) {
            // report initializationFailed error
            this.sendResponse(this.delayedInitializationError);
            this.delayedInitializationError = undefined;
        }
        super.handleRequest(req);
    }

    protected sendResponse(response: ts.server.TypingInstallerResponseUnion): void {
        if (this.log.isEnabled()) {
            this.log.writeLine(`Sending response:${ts.server.stringifyIndented(response)}`);
        }
        process.send!(response); // TODO: GH#18217
        if (this.log.isEnabled()) {
            this.log.writeLine(`Response has been sent.`);
        }
    }

    protected installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction): void {
        if (this.log.isEnabled()) {
            this.log.writeLine(`#${requestId} with cwd: ${cwd} arguments: ${JSON.stringify(packageNames)}`);
        }
        const start = Date.now();
        const hasError = ts.server.typingsInstaller.installNpmPackages(this.npmPath, version, packageNames, command => this.execSyncAndLog(command, { cwd }));
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
            const stdout = execSync(command, { ...options, encoding: "utf-8" });
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
let installer: NodeTypingsInstaller | undefined;
process.on("message", (req: ts.server.TypingInstallerRequestUnion) => {
    installer ??= new NodeTypingsInstaller(globalTypingsCacheLocation!, typingSafeListLocation!, typesMapLocation!, npmLocation, validateDefaultNpmLocation, /*throttleLimit*/ 5, log); // TODO: GH#18217
    installer.handleRequest(req);
});

function indent(newline: string, str: string | undefined): string {
    return str && str.length
        ? `${newline}    ` + str.replace(/\r?\n/, `${newline}    `)
        : "";
}
