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

    type HttpGet = {
        (url: string, callback: (response: HttpResponse) => void): NodeJS.EventEmitter;
    };

    interface HttpResponse extends NodeJS.ReadableStream {
        statusCode: number;
        statusMessage: string;
        destroy(): void;
    }

    type Exec = {
        (command: string, options: { cwd: string }, callback?: (error: Error, stdout: string, stderr: string) => void): any
    };

    export class NodeTypingsInstaller extends TypingsInstaller {
        private readonly exec: Exec;
        private readonly httpGet: HttpGet;
        private readonly npmPath: string;
        readonly installTypingHost: InstallTypingHost = sys;

        constructor(globalTypingsCacheLocation: string, throttleLimit: number, log: Log) {
            super(
                globalTypingsCacheLocation,
                toPath("typingSafeList.json", __dirname, createGetCanonicalFileName(sys.useCaseSensitiveFileNames)),
                throttleLimit,
                log);
            if (this.log.isEnabled()) {
                this.log.writeLine(`Process id: ${process.pid}`);
            }
            this.npmPath = getNPMLocation(process.argv[0]);
            this.exec = require("child_process").exec;
            this.httpGet = require("http").get;
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

        protected executeRequest(requestKind: RequestKind, requestId: number, args: string[], cwd: string, onRequestCompleted: RequestCompletedAction): void {
            if (this.log.isEnabled()) {
                this.log.writeLine(`#${requestId} executing ${requestKind}, arguments'${JSON.stringify(args)}'.`);
            }
            switch (requestKind) {
                case NpmViewRequest: {
                        // const command = `${self.npmPath} view @types/${typing} --silent name`;
                        // use http request to global npm registry instead of running npm view
                        Debug.assert(args.length === 1);
                        const url = `http://registry.npmjs.org/@types%2f${args[0]}`;
                        const start = Date.now();
                        this.httpGet(url, response => {
                            let ok = false;
                            if (this.log.isEnabled()) {
                                this.log.writeLine(`${requestKind} #${requestId} request to ${url}:: status code ${response.statusCode}, status message '${response.statusMessage}', took ${Date.now() - start} ms`);
                            }
                            switch (response.statusCode) {
                                case 200: // OK
                                case 301: // redirect - Moved - treat package as present
                                case 302: // redirect - Found - treat package as present
                                    ok = true;
                                    break;
                            }
                            response.destroy();
                            onRequestCompleted(ok);
                        }).on("error", (err: Error) => {
                            if (this.log.isEnabled()) {
                                this.log.writeLine(`${requestKind} #${requestId} query to npm registry failed with error ${err.message}, stack ${err.stack}`);
                            }
                            onRequestCompleted(/*success*/ false);
                        });
                    }
                    break;
                case NpmInstallRequest: {
                        const command = `${this.npmPath} install ${args.join(" ")} --save-dev`;
                        const start = Date.now();
                        this.exec(command, { cwd }, (_err, stdout, stderr) => {
                            if (this.log.isEnabled()) {
                                this.log.writeLine(`${requestKind} #${requestId} took: ${Date.now() - start} ms${sys.newLine}stdout: ${stdout}${sys.newLine}stderr: ${stderr}`);
                            }
                            // treat any output on stdout as success
                            onRequestCompleted(!!stdout);
                        });
                    }
                    break;
                default:
                    Debug.assert(false, `Unknown request kind ${requestKind}`);
            }
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