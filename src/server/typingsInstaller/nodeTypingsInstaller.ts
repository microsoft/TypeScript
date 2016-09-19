/// <reference path="typingsInstaller.ts"/>
/// <reference types="node" />

namespace ts.server.typingsInstaller {
    const fs: {
        appendFileSync(file: string, content: string): void
    } = require("fs");

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

    export class NodeTypingsInstaller extends TypingsInstaller {
        private exec: { (command: string, options: { cwd: string }, callback?: (error: Error, stdout: string, stderr: string) => void): any };

        readonly installTypingHost: InstallTypingHost = sys;

        constructor(globalTypingsCacheLocation: string, log: Log) {
            super(globalTypingsCacheLocation, toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)), log);
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

        protected execAsync(prefix: string, command: string, cwd: string, requestId: number, cb: (err: Error, stdout: string, stderr: string) => void) {
            if (this.log.isEnabled()) {
                this.log.writeLine(`#${requestId} running command '${command}'.`);
            }
            this.exec(command, { cwd }, (err, stdout, stderr) => {
                if (this.log.isEnabled()) {
                    this.log.writeLine(`${prefix} #${requestId} stdout: ${stdout}`);
                    this.log.writeLine(`${prefix} #${requestId} stderr: ${stderr}`);
                }
                cb(err, stdout, stderr);
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
    const installer = new NodeTypingsInstaller(globalTypingsCacheLocation, log);
    installer.init();
}