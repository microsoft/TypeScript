import * as vscode from "vscode";

import {
    ClientCapabilities,
    CloseAction,
    CloseHandlerResult,
    ErrorAction,
    ErrorHandler,
    ErrorHandlerResult,
    LanguageClient,
    LanguageClientOptions,
    Message,
    MessageSignature,
    NotebookDocumentFilter,
    ServerOptions,
    StaticFeature,
    TextDocumentFilter,
    TransportKind,
} from "vscode-languageclient/node";

import { codeLensShowLocationsCommandName } from "./commands";
import {
    configurationMiddleware,
    sendNotificationMiddleware,
} from "./configurationMiddleware";
import { registerMultiDocumentHighlightFeature } from "./languageFeatures/documentHighlight";
import { registerHoverFeature } from "./languageFeatures/hover";
import { registerOnAutoInsertFeature } from "./languageFeatures/onAutoInsert";
import { registerSourceDefinitionFeature } from "./languageFeatures/sourceDefinition";
import * as tr from "./telemetryReporting";
import {
    ExeInfo,
    getExe,
    jsTsLanguageModes,
    languageClientName,
    readNativePreviewConfig,
} from "./util";
import { getLanguageForUri } from "./util";

export class Client implements vscode.Disposable {
    private outputChannel: vscode.LogOutputChannel;
    private initializedEventEmitter: vscode.EventEmitter<void>;
    private telemetryReporter: tr.TelemetryReporter;

    private documentSelector: Array<{ scheme: string; language: string; }>;
    private clientOptions: LanguageClientOptions;
    private client?: LanguageClient;

    private isDisposed = false;
    private isStopping = false;
    private disposables: vscode.Disposable[] = [];
    isInitialized = false;

    private exe: ExeInfo | undefined;
    private errorHandler: ReportingErrorHandler;

    constructor(
        outputChannel: vscode.LogOutputChannel,
        initializedEventEmitter: vscode.EventEmitter<void>,
        telemetryReporter: tr.TelemetryReporter,
    ) {
        this.outputChannel = outputChannel;
        this.initializedEventEmitter = initializedEventEmitter;
        this.telemetryReporter = telemetryReporter;
        this.errorHandler = new ReportingErrorHandler(this.telemetryReporter, 5);

        // Monkey-patch the output channel's error method to capture recent stderr lines.
        // When the server crashes, vscode-languageclient pipes stderr to outputChannel.error(),
        // so the error handler can include the last N lines in crash telemetry.
        const originalError = this.outputChannel.error.bind(this.outputChannel);
        this.outputChannel.error = (...args: Parameters<typeof this.outputChannel.error>) => {
            originalError(...args);
            this.errorHandler.pushStderrLine(String(args[0]));
        };

        this.documentSelector = [
            ...jsTsLanguageModes.map(language => ({ scheme: "file", language })),
            ...jsTsLanguageModes.map(language => ({ scheme: "untitled", language })),
        ];
        this.clientOptions = {
            documentSelector: this.documentSelector,
            outputChannel: this.outputChannel,
            initializationOptions: {
                codeLensShowLocationsCommandName,
                enableTelemetry: true,
                logVerbosity: this.outputChannel.logLevel,
            },
            errorHandler: this.errorHandler,
            middleware: {
                workspace: {
                    ...configurationMiddleware,
                    didChangeWatchedFile: (event, next) => {
                        if (this.isStopping || this.isDisposed) {
                            return Promise.resolve();
                        }
                        return next(event);
                    },
                },
                sendNotification: sendNotificationMiddleware,
                provideHover: () => undefined,
            },
            diagnosticCollectionName: "typescript-push",
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

    async start(exe: ExeInfo): Promise<void> {
        this.isStopping = false;
        this.exe = exe;
        this.outputChannel.appendLine(`Resolved to ${this.exe.path}`);
        this.telemetryReporter.sendTelemetryEvent("languageServer.start", {
            version: this.exe.version,
        });

        const pprofDir = readNativePreviewConfig<string | undefined>("server.pprofDir", undefined)
            ?? readNativePreviewConfig<string | undefined>("pprofDir", undefined);
        const pprofArgs = pprofDir ? ["--pprofDir", pprofDir] : [];

        const goMemLimit = readNativePreviewConfig<string | undefined>("server.goMemLimit", undefined)
            ?? readNativePreviewConfig<string | undefined>("goMemLimit", undefined);
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

        // Refresh the initial log verbosity in case the output channel's log
        // level changed between construction and start.
        this.clientOptions.initializationOptions.logVerbosity = this.outputChannel.logLevel;

        this.client = new NativePreviewLanguageClient(
            "js/ts",
            languageClientName,
            serverOptions,
            this.clientOptions,
        );

        // Register a static feature to advertise verbosityLevel support in hover capabilities.
        this.client.registerFeature(
            {
                fillClientCapabilities(capabilities: ClientCapabilities): void {
                    capabilities.experimental = typeof capabilities.experimental === "object" && capabilities.experimental !== null
                        ? capabilities.experimental
                        : {};
                    (capabilities.experimental as { hoverVerbosityLevel?: boolean; }).hoverVerbosityLevel = true;
                },
                initialize(): void {},
                getState() {
                    return { kind: "static" as const };
                },
                clear(): void {},
            } satisfies StaticFeature,
        );

        this.outputChannel.appendLine(vscode.l10n.t(`Starting language server...`));
        await this.client.start();
        this.isInitialized = true;
        this.initializedEventEmitter.fire();

        // Send the initial log verbosity level to the server, and update it
        // whenever the output channel's log level changes (via the gear icon).
        this.sendLogVerbosity();
        const logLevelListener = this.outputChannel.onDidChangeLogLevel(() => {
            this.sendLogVerbosity();
        });

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
            logLevelListener,
            serverTelemetryListener,
            registerMultiDocumentHighlightFeature(this.documentSelector, this.client),
            registerSourceDefinitionFeature(this.client),
            registerHoverFeature(this.documentSelector, this.client),
            registerOnAutoInsertFeature(this.documentSelector, this.client),
        );
    }

    async stop(): Promise<void> {
        if (this.isDisposed) {
            return;
        }
        this.isStopping = true;
        this.isInitialized = false;
        const disposables = this.disposables.splice(0);
        await Promise.all(disposables.map(d => d.dispose()));
        await this.client?.stop();
    }

    async dispose(): Promise<void> {
        if (this.isDisposed) {
            return;
        }
        this.isDisposed = true;
        this.isStopping = true;
        this.isInitialized = false;
        const disposables = this.disposables.splice(0);
        await Promise.all(disposables.map(d => d.dispose()));
        await this.client?.dispose();
    }

    getCurrentExe(): { path: string; version: string; } | undefined {
        return this.exe;
    }

    get serverPid(): number | undefined {
        return (this.client as any)?._serverProcess?.pid;
    }

    /**
     * Initialize an API session and return the socket path for connecting.
     * This allows other extensions to get a direct connection to the API server.
     */
    async initializeAPISession(pipe?: string): Promise<{ sessionId: string; pipe: string; }> {
        if (!this.client) {
            throw new Error(vscode.l10n.t("Language client is not initialized"));
        }
        return this.client.sendRequest<{ sessionId: string; pipe: string; }>("custom/initializeAPISession", { pipe });
    }

    /**
     * Restart the language server if the executable path has not changed.
     * Returns true if a restart was performed.
     */
    async tryRestart(context: vscode.ExtensionContext): Promise<boolean> {
        if (!this.client) {
            return Promise.reject(new Error(vscode.l10n.t("Language client is not initialized")));
        }
        this.isStopping = false;
        const exe = await getExe(context);
        if (exe.path !== this.exe?.path) {
            return false;
        }

        this.isInitialized = false;
        this.outputChannel.appendLine(vscode.l10n.t("Restarting language server..."));
        try {
            await this.client.restart();
        }
        catch (err) {
            this.outputChannel.appendLine(vscode.l10n.t(`Graceful shutdown failed, forcing restart: {0}`, String(err)));
            await this.client.start();
        }
        this.isInitialized = true;
        this.initializedEventEmitter.fire();
        return true;
    }

    // Developer/debugging methods

    private sendLogVerbosity(): void {
        if (!this.client) {
            return;
        }
        this.client.sendNotification("custom/setLogVerbosity", {
            verbosity: this.outputChannel.logLevel,
        });
    }

    async runGC(): Promise<void> {
        if (!this.client) {
            throw new Error(vscode.l10n.t("Language client is not initialized"));
        }
        await this.client.sendRequest("custom/runGC");
    }

    async saveHeapProfile(dir: string): Promise<string> {
        if (!this.client) {
            throw new Error(vscode.l10n.t("Language client is not initialized"));
        }
        const result = await this.client.sendRequest<{ file: string; }>("custom/saveHeapProfile", { dir });
        return result.file;
    }

    async saveAllocProfile(dir: string): Promise<string> {
        if (!this.client) {
            throw new Error(vscode.l10n.t("Language client is not initialized"));
        }
        const result = await this.client.sendRequest<{ file: string; }>("custom/saveAllocProfile", { dir });
        return result.file;
    }

    async startCPUProfile(dir: string): Promise<void> {
        if (!this.client) {
            throw new Error(vscode.l10n.t("Language client is not initialized"));
        }
        await this.client.sendRequest("custom/startCPUProfile", { dir });
    }

    async stopCPUProfile(): Promise<string> {
        if (!this.client) {
            throw new Error(vscode.l10n.t("Language client is not initialized"));
        }
        const result = await this.client.sendRequest<{ file: string; }>("custom/stopCPUProfile");
        return result.file;
    }

    async getProjectInfo(uri: string, token?: vscode.CancellationToken): Promise<{ configFilePath: string; }> {
        if (!this.client) {
            throw new Error(vscode.l10n.t("Language client is not initialized"));
        }
        return this.client.sendRequest<{ configFilePath: string; }>("custom/projectInfo", {
            textDocument: { uri },
        }, token);
    }
}

// Returns true when running on a VS Code Insiders build.
function isInsiders(): boolean {
    return vscode.env.uriScheme === "vscode-insiders";
}

// LanguageClient subclass that lets the user control whether a failed request
// surfaces an error notification, via the `js/ts.server.showFailedResponses` setting.
class NativePreviewLanguageClient extends LanguageClient {
    override handleFailedRequest<T>(
        type: MessageSignature,
        token: vscode.CancellationToken | undefined,
        error: unknown,
        defaultValue: T,
        showNotification: boolean = true,
        throwOnCancel: boolean = false,
    ): T {
        const setting = vscode.workspace
            .getConfiguration("js/ts")
            .get<"always" | "never" | "auto">("server.showFailedResponses", "auto");
        const effectiveSetting = setting === "auto" ? (isInsiders() ? "always" : "never") : setting;

        let effectiveShowNotification = showNotification;
        switch (effectiveSetting) {
            case "never":
                effectiveShowNotification = false;
                break;
            default:
                // Use the default behavior (showNotification) for "always" and any unrecognized values.
                break;
        }

        return super.handleFailedRequest(
            type,
            token,
            error,
            defaultValue,
            effectiveShowNotification,
            throwOnCancel,
        );
    }
}

// Adapted from the default error handler in vscode-languageclient.
class ReportingErrorHandler implements ErrorHandler {
    telemetryReporter: tr.TelemetryReporter;
    maxRestartCount: number;
    restarts: number[];
    private stderrBuffer: string[] = [];
    private capturingPanic = false;
    private static readonly maxStderrLines = 40;
    private static readonly maxStderrLength = 8192;

    constructor(telemetryReporter: tr.TelemetryReporter, maxRestartCount: number) {
        this.telemetryReporter = telemetryReporter;
        this.maxRestartCount = maxRestartCount;
        this.restarts = [];
    }

    pushStderrLine(line: string): void {
        for (const l of line.split("\n")) {
            if (!this.capturingPanic) {
                if (/^panic:/.test(l.trimStart())) {
                    // Clear any stale data from a previous session/panic.
                    this.stderrBuffer = [];
                    this.capturingPanic = true;
                }
                else {
                    continue;
                }
            }
            if (this.stderrBuffer.length < ReportingErrorHandler.maxStderrLines) {
                this.stderrBuffer.push(l);
            }
            else {
                this.capturingPanic = false;
            }
        }
    }

    private consumeStderrBuffer(): string {
        const raw = this.stderrBuffer.join("\n");
        this.stderrBuffer = [];
        this.capturingPanic = false;
        return sanitizeStderr(raw).slice(0, ReportingErrorHandler.maxStderrLength);
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
        const lastStderr = this.consumeStderrBuffer();
        this.telemetryReporter.sendTelemetryErrorEvent("languageServer.connectionClosed", {
            resultingAction: actionString,
            lastStderr,
        });

        if (resultingAction === CloseAction.DoNotRestart) {
            return {
                action: resultingAction,
                message: vscode.l10n.t(`The TypeScript language server crashed {0} times in the last 3 minutes. The server will not be restarted. See the output for more information.`, String(this.maxRestartCount + 1)),
            };
        }

        return { action: resultingAction };
    }
}

// Matches the server-side sanitizeStackTrace in internal/lsp/stack_sanitizer.go.
// Strips file path prefixes that may contain PII and redacts frames outside of our module.
const genericSecretKeywordRegex = /\b(key|token|signature|sig|pwd)([(\[.|])/gi;

function sanitizeStderr(stderr: string): string {
    if (!stderr) {
        return "";
    }
    return stderr.split("\n").map(sanitizeStderrLine).join("\n");
}

function sanitizeStderrLine(line: string): string {
    // Keep "goroutine N [status]:" headers as-is.
    if (/^goroutine \d+/.test(line)) {
        return line;
    }
    // Redact the panic message itself — assert messages may contain user data.
    // Keep only "panic:" as a marker.
    if (/^panic:/.test(line.trimStart())) {
        return "panic: (REDACTED)";
    }
    // Keep "Server process exited" messages from vscode-languageclient.
    if (line.includes("Server process exited")) {
        return line;
    }

    const leadingWhitespace = line.match(/^(\s*)/)?.[1] ?? "";

    // Stack frame file path lines look like: \t/full/path/to/file.go:123 +0x40
    // Function lines look like: github.com/microsoft/typescript-go/internal/foo.Bar(...)
    const ourModuleMarker = "typescript-go/internal";
    const idx = line.indexOf(ourModuleMarker);
    if (idx >= 0) {
        let relevantPart = line.slice(idx);
        // Strip hex offset suffixes like " +0x40"
        relevantPart = relevantPart.replace(/ \+0x[0-9a-fA-F]+$/, "");
        // Strip " in goroutine N" suffixes
        relevantPart = relevantPart.replace(/ in goroutine \d+$/, "");
        // Strip function arguments (keep parens empty)
        relevantPart = relevantPart.replace(/\([^)]*\)$/, "()");
        // Replace / with |> to defeat path-based secret detection
        relevantPart = relevantPart.replace(/\//g, "|>");
        // Defeat generic secret keyword regex
        relevantPart = relevantPart.replace(genericSecretKeywordRegex, "$1X_X$2");
        return leadingWhitespace + relevantPart;
    }

    // Preserve completely blank lines.
    if (line.trim() === "") {
        return "";
    }

    // Non-internal frames get fully redacted.
    return leadingWhitespace + "(REDACTED)";
}
