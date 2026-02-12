import * as vscode from "vscode";

import {
    CloseAction,
    CloseHandlerResult,
    ErrorAction,
    ErrorHandler,
    ErrorHandlerResult,
    LanguageClient,
    LanguageClientOptions,
    Message,
    NotebookDocumentFilter,
    ServerOptions,
    TextDocumentFilter,
    TransportKind,
} from "vscode-languageclient/node";

import { codeLensShowLocationsCommandName } from "./commands";
import {
    configurationMiddleware,
    sendNotificationMiddleware,
} from "./configurationMiddleware";
import { registerTagClosingFeature } from "./languageFeatures/tagClosing";
import * as tr from "./telemetryReporting";
import {
    ExeInfo,
    getExe,
    jsTsLanguageModes,
} from "./util";
import { getLanguageForUri } from "./util";

export class Client implements vscode.Disposable {
    private outputChannel: vscode.LogOutputChannel;
    private traceOutputChannel: vscode.LogOutputChannel;
    private initializedEventEmitter: vscode.EventEmitter<void>;
    private telemetryReporter: tr.TelemetryReporter;

    private documentSelector: Array<{ scheme: string; language: string; }>;
    private clientOptions: LanguageClientOptions;
    private client?: LanguageClient;

    private isDisposed = false;
    private disposables: vscode.Disposable[] = [];
    isInitialized = false;

    private exe: ExeInfo | undefined;

    constructor(
        outputChannel: vscode.LogOutputChannel,
        traceOutputChannel: vscode.LogOutputChannel,
        initializedEventEmitter: vscode.EventEmitter<void>,
        telemetryReporter: tr.TelemetryReporter,
    ) {
        this.outputChannel = outputChannel;
        this.traceOutputChannel = traceOutputChannel;
        this.initializedEventEmitter = initializedEventEmitter;
        this.telemetryReporter = telemetryReporter;
        this.documentSelector = [
            ...jsTsLanguageModes.map(language => ({ scheme: "file", language })),
            ...jsTsLanguageModes.map(language => ({ scheme: "untitled", language })),
        ];
        this.clientOptions = {
            documentSelector: this.documentSelector,
            outputChannel: this.outputChannel,
            traceOutputChannel: this.traceOutputChannel,
            initializationOptions: {
                codeLensShowLocationsCommandName,
            },
            errorHandler: new ReportingErrorHandler(this.telemetryReporter, 5),
            middleware: {
                workspace: {
                    ...configurationMiddleware,
                },
                sendNotification: sendNotificationMiddleware,
            },
            diagnosticPullOptions: {
                onChange: true,
                onSave: true,
                onTabs: true,
                match(documentSelector, resource) {
                    // This function is called when diagnostics are requested but
                    // only the URI itself is known (e.g. open but not yet focused tabs),
                    // so will not be present in vscode.workspace.textDocuments.
                    // See if this file matches without consulting vscode.languages.match
                    // (which requires a TextDocument).

                    const language = getLanguageForUri(resource);

                    for (const selector of documentSelector) {
                        if (typeof selector === "string") {
                            if (selector === language) {
                                return true;
                            }
                            continue;
                        }
                        if (NotebookDocumentFilter.is(selector)) {
                            continue;
                        }
                        if (TextDocumentFilter.is(selector)) {
                            if (selector.language !== undefined && selector.language !== language) {
                                continue;
                            }

                            if (selector.scheme !== undefined && selector.scheme !== resource.scheme) {
                                continue;
                            }

                            if (selector.pattern !== undefined) {
                                // VS Code's glob matcher is not available via the API;
                                // see: https://github.com/microsoft/vscode/issues/237304
                                // But, we're only called on selectors passed above, so just ignore this for now.
                                throw new Error("Not implemented");
                            }

                            return true;
                        }
                    }

                    return false;
                },
            },
        };
    }

    async start(exe: { path: string; version: string; }): Promise<void> {
        this.exe = exe;
        this.outputChannel.appendLine(`Resolved to ${this.exe.path}`);
        this.telemetryReporter.sendTelemetryEvent("languageServer.start", {
            version: this.exe.version,
        });

        // Get pprofDir
        const config = vscode.workspace.getConfiguration("typescript.native-preview");
        const pprofDir = config.get<string>("pprofDir");
        const pprofArgs = pprofDir ? ["--pprofDir", pprofDir] : [];

        const goMemLimit = config.get<string>("goMemLimit");
        const env = { ...process.env };
        if (goMemLimit) {
            // Keep this regex aligned with the pattern in package.json.
            if (/^[0-9]+(([KMGT]i)?B)?$/.test(goMemLimit)) {
                this.outputChannel.appendLine(`Setting GOMEMLIMIT=${goMemLimit}`);
                env.GOMEMLIMIT = goMemLimit;
            }
            else {
                this.outputChannel.error(`Invalid goMemLimit: ${goMemLimit}. Must be a valid memory limit (e.g., '2048MiB', '4GiB'). Not overriding GOMEMLIMIT.`);
            }
        }

        const serverOptions: ServerOptions = {
            run: {
                command: this.exe.path,
                args: ["--lsp", ...pprofArgs],
                transport: TransportKind.stdio,
                options: { env },
            },
            debug: {
                command: this.exe.path,
                args: ["--lsp", ...pprofArgs],
                transport: TransportKind.stdio,
                options: { env },
            },
        };

        this.client = new LanguageClient(
            "typescript.native-preview",
            "typescript.native-preview-lsp",
            serverOptions,
            this.clientOptions,
        );
        this.disposables.push(this.client);

        this.outputChannel.appendLine(`Starting language server...`);
        await this.client.start();
        this.isInitialized = true;
        this.initializedEventEmitter.fire();

        if (this.traceOutputChannel.logLevel !== vscode.LogLevel.Trace) {
            this.traceOutputChannel.appendLine(`To see LSP trace output, set this output's log level to "Trace" (gear icon next to the dropdown).`);
        }

        type TelemetryData = {
            eventName: string;
            telemetryPurpose: "usage" | "error";
            properties?: Record<string, string>;
            measurements?: Record<string, number>;
        };

        const serverTelemetryListener = this.client.onTelemetry((d: TelemetryData) => {
            switch (d.telemetryPurpose) {
                case "usage":
                    this.telemetryReporter.sendTelemetryEventUntyped(d.eventName, d.properties, d.measurements);
                    break;
                case "error":
                    this.telemetryReporter.sendTelemetryErrorEventUntyped(d.eventName, d.properties, d.measurements);
                    break;
                default:
                    const _: never = d.telemetryPurpose;
                    this.telemetryReporter.sendTelemetryErrorEvent("languageServer.unexpectedTelemetryPurpose", {
                        telemetryPurpose: String(d.telemetryPurpose),
                    });
                    break;
            }
        });

        this.disposables.push(
            serverTelemetryListener,
            registerTagClosingFeature("typescript", this.documentSelector, this.client),
            registerTagClosingFeature("javascript", this.documentSelector, this.client),
        );
    }

    async dispose(): Promise<void> {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        await Promise.all(this.disposables.map(d => d.dispose()));
    }

    getCurrentExe(): { path: string; version: string; } | undefined {
        return this.exe;
    }

    /**
     * Initialize an API session and return the socket path for connecting.
     * This allows other extensions to get a direct connection to the API server.
     */
    async initializeAPISession(pipe?: string): Promise<{ sessionId: string; pipe: string; }> {
        if (!this.client) {
            throw new Error("Language client is not initialized");
        }
        return this.client.sendRequest<{ sessionId: string; pipe: string; }>("custom/initializeAPISession", { pipe });
    }

    /**
     * Restart the language server if the executable path has not changed.
     * Returns true if a restart was performed.
     */
    async tryRestart(context: vscode.ExtensionContext): Promise<boolean> {
        if (!this.client) {
            return Promise.reject(new Error("Language client is not initialized"));
        }
        const exe = await getExe(context);
        if (exe.path !== this.exe?.path) {
            return false;
        }

        this.isInitialized = false;
        this.outputChannel.appendLine(`Restarting language server...`);
        await this.client.restart();
        return true;
    }

    // Developer/debugging methods

    async runGC(): Promise<void> {
        if (!this.client) {
            throw new Error("Language client is not initialized");
        }
        await this.client.sendRequest("custom/runGC");
    }

    async saveHeapProfile(dir: string): Promise<string> {
        if (!this.client) {
            throw new Error("Language client is not initialized");
        }
        const result = await this.client.sendRequest<{ file: string; }>("custom/saveHeapProfile", { dir });
        return result.file;
    }

    async saveAllocProfile(dir: string): Promise<string> {
        if (!this.client) {
            throw new Error("Language client is not initialized");
        }
        const result = await this.client.sendRequest<{ file: string; }>("custom/saveAllocProfile", { dir });
        return result.file;
    }

    async startCPUProfile(dir: string): Promise<void> {
        if (!this.client) {
            throw new Error("Language client is not initialized");
        }
        await this.client.sendRequest("custom/startCPUProfile", { dir });
    }

    async stopCPUProfile(): Promise<string> {
        if (!this.client) {
            throw new Error("Language client is not initialized");
        }
        const result = await this.client.sendRequest<{ file: string; }>("custom/stopCPUProfile");
        return result.file;
    }
}

// Adapted from the default error handler in vscode-languageclient.
class ReportingErrorHandler implements ErrorHandler {
    telemetryReporter: tr.TelemetryReporter;
    maxRestartCount: number;
    restarts: number[];

    constructor(telemetryReporter: tr.TelemetryReporter, maxRestartCount: number) {
        this.telemetryReporter = telemetryReporter;
        this.maxRestartCount = maxRestartCount;
        this.restarts = [];
    }

    error(_error: Error, _message: Message | undefined, count: number | undefined): ErrorHandlerResult | Promise<ErrorHandlerResult> {
        let errorAction = ErrorAction.Shutdown;
        if (count && count <= 3) {
            errorAction = ErrorAction.Continue;
        }

        let actionString = "";
        switch (errorAction) {
            case ErrorAction.Continue:
                actionString = "continue";
                break;
            case ErrorAction.Shutdown:
                actionString = "shutdown";
                break;
            default:
                const _: never = errorAction;
        }
        this.telemetryReporter.sendTelemetryErrorEvent("languageServer.connectionError", {
            resultingAction: actionString,
        });

        return { action: errorAction };
    }

    closed(): CloseHandlerResult | Promise<CloseHandlerResult> {
        let resultingAction: CloseAction;

        this.restarts.push(Date.now());
        if (this.restarts.length <= this.maxRestartCount) {
            resultingAction = CloseAction.Restart;
        }
        else {
            const diff = this.restarts[this.restarts.length - 1] - this.restarts[0];
            if (diff <= 3 * 60 * 1000) {
                resultingAction = CloseAction.DoNotRestart;
            }
            else {
                this.restarts.shift();
                resultingAction = CloseAction.Restart;
            }
        }

        let actionString = "";
        switch (resultingAction) {
            case CloseAction.DoNotRestart:
                actionString = "doNotRestart";
                break;
            case CloseAction.Restart:
                actionString = "restart";
                break;
            default:
                const _: never = resultingAction;
        }
        this.telemetryReporter.sendTelemetryErrorEvent("languageServer.connectionClosed", {
            resultingAction: actionString,
        });

        if (resultingAction === CloseAction.DoNotRestart) {
            return {
                action: resultingAction,
                message: `The typescript.native-preview-lsp server crashed ${this.maxRestartCount + 1} times in the last 3 minutes. The server will not be restarted. See the output for more information.`,
            };
        }

        return { action: resultingAction };
    }
}
