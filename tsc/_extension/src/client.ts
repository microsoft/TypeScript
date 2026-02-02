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
import { registerTagClosingFeature } from "./languageFeatures/tagClosing";
import * as tr from "./telemetryReporting";
import {
    ExeInfo,
    getExe,
    jsTsLanguageModes,
} from "./util";
import { getLanguageForUri } from "./util";

export class Client {
    private outputChannel: vscode.LogOutputChannel;
    private traceOutputChannel: vscode.LogOutputChannel;
    private telemetryReporter: tr.TelemetryReporter;

    private documentSelector: Array<{ scheme: string; language: string; }>;
    private clientOptions: LanguageClientOptions;
    private client?: LanguageClient;

    private isDisposed = false;
    private disposables: vscode.Disposable[] = [];

    private exe: ExeInfo | undefined;
    private onStartedCallbacks: Set<() => void> = new Set();

    constructor(outputChannel: vscode.LogOutputChannel, traceOutputChannel: vscode.LogOutputChannel, telemetryReporter: tr.TelemetryReporter) {
        this.outputChannel = outputChannel;
        this.traceOutputChannel = traceOutputChannel;
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

    async initialize(context: vscode.ExtensionContext): Promise<vscode.Disposable> {
        const exe = await getExe(context);
        return this.start(context, exe);
    }

    async start(context: vscode.ExtensionContext, exe: { path: string; version: string; }): Promise<vscode.Disposable> {
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

        this.outputChannel.appendLine(`Starting language server...`);
        await this.client.start();
        vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", true);
        this.onStartedCallbacks.forEach(callback => callback());

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

        return new vscode.Disposable(() => {
            this.dispose();
            vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", false);
            vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
        });
    }

    dispose() {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;

        this.client?.dispose();
        while (this.disposables.length > 0) {
            const d = this.disposables.pop()!;
            d.dispose();
        }
    }

    getCurrentExe(): { path: string; version: string; } | undefined {
        return this.exe;
    }

    onStarted(callback: () => void): vscode.Disposable {
        if (this.exe) {
            callback();
            return new vscode.Disposable(() => {});
        }

        this.onStartedCallbacks.add(callback);

        return new vscode.Disposable(() => {
            this.onStartedCallbacks.delete(callback);
        });
    }

    async restart(context: vscode.ExtensionContext): Promise<vscode.Disposable> {
        if (!this.client) {
            return Promise.reject(new Error("Language client is not initialized"));
        }
        const exe = await getExe(context);
        if (exe.path !== this.exe?.path) {
            this.outputChannel.appendLine(`Executable path changed from ${this.exe?.path} to ${exe.path}`);
            this.outputChannel.appendLine(`Restarting language server with new executable...`);
            return this.start(context, exe);
        }

        this.outputChannel.appendLine(`Restarting language server...`);
        this.client.restart();
        return new vscode.Disposable(() => {});
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
