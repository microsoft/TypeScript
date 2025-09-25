import * as vscode from "vscode";
import {
    LanguageClient,
    LanguageClientOptions,
    NotebookDocumentFilter,
    ServerOptions,
    TextDocumentFilter,
    TransportKind,
} from "vscode-languageclient/node";
import {
    ExeInfo,
    getExe,
    jsTsLanguageModes,
} from "./util";
import { getLanguageForUri } from "./util";

export class Client {
    private outputChannel: vscode.OutputChannel;
    private traceOutputChannel: vscode.OutputChannel;
    private clientOptions: LanguageClientOptions;
    private client?: LanguageClient;
    private exe: ExeInfo | undefined;
    private onStartedCallbacks: Set<() => void> = new Set();

    constructor(outputChannel: vscode.OutputChannel, traceOutputChannel: vscode.OutputChannel) {
        this.outputChannel = outputChannel;
        this.traceOutputChannel = traceOutputChannel;
        this.clientOptions = {
            documentSelector: [
                ...jsTsLanguageModes.map(language => ({ scheme: "file", language })),
                ...jsTsLanguageModes.map(language => ({ scheme: "untitled", language })),
            ],
            outputChannel: this.outputChannel,
            traceOutputChannel: this.traceOutputChannel,
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

        // Get pprofDir
        const config = vscode.workspace.getConfiguration("typescript.native-preview");
        const pprofDir = config.get<string>("pprofDir");
        const pprofArgs = pprofDir ? ["--pprofDir", pprofDir] : [];

        const serverOptions: ServerOptions = {
            run: {
                command: this.exe.path,
                args: ["--lsp", ...pprofArgs],
                transport: TransportKind.stdio,
            },
            debug: {
                command: this.exe.path,
                args: ["--lsp", ...pprofArgs],
                transport: TransportKind.stdio,
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
        return new vscode.Disposable(() => {
            if (this.client) {
                this.client.stop();
            }
            vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", false);
        });
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
}
