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
        constructor(private readonly logFile?: string) {
        }

        isEnabled() {
            return this.logFile !== undefined;
        }
        writeLine(text: string) {
            fs.appendFileSync(this.logFile, text + sys.newLine);
        }
    }

    function getNPMLocation(processName: string) {
        if (path.basename(processName).indexOf("node") == 0) {
            return `"${path.join(path.dirname(process.argv[0]), "npm")}"`;
        }
        else {
            return "npm";
        }
    }

    export class NodeTypingsInstaller extends TypingsInstaller {
        private readonly exec: { (command: string, options: { cwd: string }, callback?: (error: Error, stdout: string, stderr: string) => void): any };

        readonly installTypingHost: InstallTypingHost = sys;

        constructor(globalTypingsCacheLocation: string, throttleLimit: number, log: Log) {
            super(
                globalTypingsCacheLocation,
                /*npmPath*/ getNPMLocation(process.argv[0]),
                toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)),
                throttleLimit,
                log);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Process id: ${process.pid}`);
            }
            const { exec } = require("child_process");
            this.exec = exec;
        }

        init() {
            super.init();
            process.on("message", (req: DiscoverTypings | CloseProject) => {
                switch (req.kind) {
                    case "discover":
                        this.install(req);
                        break;
                    case "closeProject":
                        this.closeProject(req);
                }
            });
        }

        protected sendResponse(response: SetTypings | InvalidateCachedTypings) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`Sending response: ${JSON.stringify(response)}`);
            }
            process.send(response);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Response has been sent.`);
            }
        }

        protected runCommand(requestKind: RequestKind, requestId: number, command: string, cwd: string, onRequestCompleted: RequestCompletedAction): void {
            if (this.log.isEnabled()) {
                this.log.writeLine(`#${requestId} running command '${command}'.`);
            }
            this.exec(command, { cwd }, (err, stdout, stderr) => {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`${requestKind} #${requestId} stdout: ${stdout}`);
                    this.log.writeLine(`${requestKind} #${requestId} stderr: ${stderr}`);
                }
                onRequestCompleted(err, stdout, stderr);
            });
        }
    }

    function findArgument(argumentName: string) {
        const index = sys.args.indexOf(argumentName);
        return index >= 0 && index < sys.args.length - 1
            ? sys.args[index + 1]
            : undefined;
    }

    const logFilePath = findArgument("--logFile");
    const globalTypingsCacheLocation = findArgument("--globalTypingsCacheLocation");
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
    const installer = new NodeTypingsInstaller(globalTypingsCacheLocation, /*throttleLimit*/5, log);
    installer.init();
}