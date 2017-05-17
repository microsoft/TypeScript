/// <reference path="typingsInstaller.ts"/>
/// <reference types="node" />

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
        private logEnabled = true;
        constructor(private readonly logFile?: string) {
        }

        isEnabled() {
            return this.logEnabled && this.logFile !== undefined;
        }
        writeLine(text: string) {
            try {
                fs.appendFileSync(this.logFile, text + sys.newLine);
            }
            catch (e) {
                this.logEnabled = false;
            }
        }
    }

    function getNPMLocation(processName: string) {
        if (path.basename(processName).indexOf("node") === 0) {
            return `"${path.join(path.dirname(process.argv[0]), "npm")}"`;
        }
        else {
            return "npm";
        }
    }

    interface TypesRegistryFile {
        entries: MapLike<void>;
    }

    function loadTypesRegistryFile(typesRegistryFilePath: string, host: InstallTypingHost, log: Log): Map<void> {
        if (!host.fileExists(typesRegistryFilePath)) {
            if (log.isEnabled()) {
                log.writeLine(`Types registry file '${typesRegistryFilePath}' does not exist`);
            }
            return createMap<void>();
        }
        try {
            const content = <TypesRegistryFile>JSON.parse(host.readFile(typesRegistryFilePath));
            return createMapFromTemplate<void>(content.entries);
        }
        catch (e) {
            if (log.isEnabled()) {
                log.writeLine(`Error when loading types registry file '${typesRegistryFilePath}': ${(<Error>e).message}, ${(<Error>e).stack}`);
            }
            return createMap<void>();
        }
    }

    const TypesRegistryPackageName = "types-registry";
    function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string {
        return combinePaths(normalizeSlashes(globalTypingsCacheLocation), `node_modules/${TypesRegistryPackageName}/index.json`);
    }

    type ExecSync = (command: string, options: { cwd: string, stdio?: "ignore" }) => any;

    export class NodeTypingsInstaller extends TypingsInstaller {
        private readonly execSync: ExecSync;
        private readonly npmPath: string;
        readonly typesRegistry: Map<void>;

        private delayedInitializationError: InitializationFailedResponse;

        constructor(globalTypingsCacheLocation: string, typingSafeListLocation: string, throttleLimit: number, log: Log) {
            super(
                sys,
                globalTypingsCacheLocation,
                typingSafeListLocation ? toPath(typingSafeListLocation, "", createGetCanonicalFileName(sys.useCaseSensitiveFileNames)) : toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)),
                throttleLimit,
                log);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Process id: ${process.pid}`);
            }
            this.npmPath = getNPMLocation(process.argv[0]);
            ({ execSync: this.execSync } = require("child_process"));

            this.ensurePackageDirectoryExists(globalTypingsCacheLocation);

            try {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Updating ${TypesRegistryPackageName} npm package...`);
                }
                this.execSync(`${this.npmPath} install ${TypesRegistryPackageName}`, { cwd: globalTypingsCacheLocation, stdio: "ignore" });
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Updated ${TypesRegistryPackageName} npm package`);
                }
            }
            catch (e) {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`Error updating ${TypesRegistryPackageName} package: ${(<Error>e).message}`);
                }
                // store error info to report it later when it is known that server is already listening to events from typings installer
                this.delayedInitializationError = {
                    kind: "event::initializationFailed",
                    message: (<Error>e).message
                };
            }

            this.typesRegistry = loadTypesRegistryFile(getTypesRegistryFileLocation(globalTypingsCacheLocation), this.installTypingHost, this.log);
        }

        listen() {
            process.on("message", (req: DiscoverTypings | CloseProject) => {
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
                }
            });
        }

        protected sendResponse(response: SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes | InitializationFailedResponse) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Sending response: ${JSON.stringify(response)}`);
            }
            process.send(response);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Response has been sent.`);
            }
        }

        protected installWorker(requestId: number, args: string[], cwd: string, onRequestCompleted: RequestCompletedAction): void {
            if (this.log.isEnabled()) {
                this.log.writeLine(`#${requestId} with arguments'${JSON.stringify(args)}'.`);
            }
            const command = `${this.npmPath} install ${args.join(" ")} --save-dev --user-agent="typesInstaller/${version}"`;
            const start = Date.now();
            let stdout: Buffer;
            let stderr: Buffer;
            let hasError = false;
            try {
                stdout = this.execSync(command, { cwd });
            }
            catch (e) {
                stdout = e.stdout;
                stderr = e.stderr;
                hasError = true;
            }
            if (this.log.isEnabled()) {
                this.log.writeLine(`npm install #${requestId} took: ${Date.now() - start} ms${sys.newLine}stdout: ${stdout && stdout.toString()}${sys.newLine}stderr: ${stderr && stderr.toString()}`);
            }
            onRequestCompleted(!hasError);
        }
    }

    const logFilePath = findArgument(server.Arguments.LogFile);
    const globalTypingsCacheLocation = findArgument(server.Arguments.GlobalCacheLocation);
    const typingSafeListLocation = findArgument(server.Arguments.TypingSafeListLocation);

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
    const installer = new NodeTypingsInstaller(globalTypingsCacheLocation, typingSafeListLocation, /*throttleLimit*/5, log);
    installer.listen();
}