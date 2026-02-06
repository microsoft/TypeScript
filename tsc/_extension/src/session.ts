import * as vscode from "vscode";
import { Client } from "./client";
import { registerCodeLensShowLocationsCommand } from "./commands";
import { setupStatusBar } from "./statusBar";
import { TelemetryReporter } from "./telemetryReporting";
import { getExe } from "./util";
import { setupVersionStatusItem } from "./versionStatusItem";

/**
 * SessionManager's lifetime is equal to that of the extension. It is responsible
 * for starting, restarting, replacing, and disposing the Session.
 */
export class SessionManager implements vscode.Disposable {
    currentSession?: Session;
    private disposables: vscode.Disposable[] = [];
    private outputChannel: vscode.LogOutputChannel;
    private traceOutputChannel: vscode.LogOutputChannel;
    private initializedEventEmitter: vscode.EventEmitter<void>;
    private telemetryReporter: TelemetryReporter;

    constructor(
        context: vscode.ExtensionContext,
        outputChannel: vscode.LogOutputChannel,
        traceOutputChannel: vscode.LogOutputChannel,
        initializedEventEmitter: vscode.EventEmitter<void>,
        telemetryReporter: TelemetryReporter,
    ) {
        this.outputChannel = outputChannel;
        this.traceOutputChannel = traceOutputChannel;
        this.telemetryReporter = telemetryReporter;
        this.initializedEventEmitter = initializedEventEmitter;
        this.registerCommands(context);
    }

    registerCommands(context: vscode.ExtensionContext): void {
        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.restart", async () => {
            this.telemetryReporter.sendTelemetryEvent("command.restartLanguageServer");
            if (await this.currentSession?.tryRestartClient(context)) {
                // Language client was able to restart without a full session restart
                return;
            }

            await this.restart(context);
        }));
    }

    start(context: vscode.ExtensionContext): Promise<void> {
        return this.restart(context);
    }

    async restart(context: vscode.ExtensionContext): Promise<void> {
        if (this.currentSession) {
            this.outputChannel.appendLine("Restarting TypeScript Native Preview...");
            await this.currentSession.dispose();
        }
        this.currentSession = new Session(this.outputChannel, this.traceOutputChannel, this.initializedEventEmitter, this.telemetryReporter);
        return this.currentSession.start(context);
    }

    async stop(): Promise<void> {
        if (this.currentSession) {
            await this.currentSession.dispose();
            this.currentSession = undefined;
        }
    }

    async initializeAPIConnection(pipe?: string): Promise<string> {
        if (!this.currentSession) {
            throw new Error("Language server is not running.");
        }
        const result = await this.currentSession.client.initializeAPISession(pipe);
        return result.pipe;
    }

    async dispose(): Promise<void> {
        await this.currentSession?.dispose();
        await Promise.all(this.disposables.map(d => d.dispose()));
    }
}

/**
 * Session's lifetime is equal to that of its LanguageClient. The LanguageClient
 * can be restarted within the same Session only if the underlying exe path/version
 * has not changed. Otherwise, a new Session must be created. Since Session only
 * exists while the LSP server is running (or actively starting/restarting/stopping),
 * it also owns the commands and UI elements that should only be active while the
 * server is running.
 */
class Session implements vscode.Disposable {
    client: Client;
    private disposables: vscode.Disposable[] = [];
    private outputChannel: vscode.LogOutputChannel;
    private traceOutputChannel: vscode.LogOutputChannel;
    private telemetryReporter: TelemetryReporter;

    constructor(
        outputChannel: vscode.LogOutputChannel,
        traceOutputChannel: vscode.LogOutputChannel,
        initializedEventEmitter: vscode.EventEmitter<void>,
        telemetryReporter: TelemetryReporter,
    ) {
        this.client = new Client(outputChannel, traceOutputChannel, initializedEventEmitter, telemetryReporter);
        this.disposables.push(this.client);
        this.outputChannel = outputChannel;
        this.traceOutputChannel = traceOutputChannel;
        this.telemetryReporter = telemetryReporter;
        this.registerCommands();
    }

    async start(context: vscode.ExtensionContext): Promise<void> {
        const exe = await getExe(context);
        await this.client.start(exe);
        this.disposables.push(setupVersionStatusItem(exe.version));
        this.disposables.push(setupStatusBar());
        await vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", true);
    }

    tryRestartClient(context: vscode.ExtensionContext): Promise<boolean> {
        return this.client.tryRestart(context);
    }

    registerCommands(): void {
        this.disposables.push(registerCodeLensShowLocationsCommand());

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.output.focus", () => {
            this.outputChannel.show();
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.lsp-trace.focus", () => {
            this.traceOutputChannel.show();
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.selectVersion", async () => {
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.showMenu", showCommands));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.reportIssue", () => {
            this.telemetryReporter.sendTelemetryEvent("command.reportIssue");
            vscode.commands.executeCommand("workbench.action.openIssueReporter", {
                extensionId: "TypeScriptTeam.native-preview",
            });
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.runGC", async () => {
            try {
                await this.client.runGC();
                vscode.window.showInformationMessage("Garbage collection triggered");
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to run GC: ${error}`);
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.saveHeapProfile", async () => {
            const dir = await promptForProfileDirectory();
            if (!dir) return;
            try {
                const file = await this.client.saveHeapProfile(dir);
                vscode.window.showInformationMessage(`Heap profile saved to: ${file}`);
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to save heap profile: ${error}`);
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.saveAllocProfile", async () => {
            const dir = await promptForProfileDirectory();
            if (!dir) return;
            try {
                const file = await this.client.saveAllocProfile(dir);
                vscode.window.showInformationMessage(`Allocation profile saved to: ${file}`);
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to save allocation profile: ${error}`);
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.startCPUProfile", async () => {
            const dir = await promptForProfileDirectory();
            if (!dir) return;
            try {
                await this.client.startCPUProfile(dir);
                vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", true);
                vscode.window.showInformationMessage(`CPU profiling started. Profile will be saved to: ${dir}`);
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to start CPU profile: ${error}`);
                vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.stopCPUProfile", async () => {
            try {
                const file = await this.client.stopCPUProfile();
                vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
                vscode.window.showInformationMessage(`CPU profile saved to: ${file}`);
            }
            catch (error) {
                vscode.window.showErrorMessage(`Failed to stop CPU profile: ${error}`);
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.initializeAPIConnection", async () => {
            const result = await this.client.initializeAPISession();
            return result.pipe;
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.initializeAPIConnection.ui", async () => {
            try {
                const result = await this.client.initializeAPISession();
                const copy = await vscode.window.showInformationMessage(`API session initialized. Listening on: ${result.pipe}`, "Copy");
                if (copy === "Copy") {
                    await vscode.env.clipboard.writeText(result.pipe);
                }
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                vscode.window.showErrorMessage(`Failed to initialize API session: ${message}`);
            }
        }));
    }

    async dispose(): Promise<void> {
        await vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", false);
        await vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
        await Promise.all(this.disposables.map(d => d.dispose()));
    }
}

async function showCommands(): Promise<void> {
    const commands: readonly { label: string; description: string; command: string; }[] = [
        {
            label: "$(refresh) Restart Server",
            description: "Restart the TypeScript Native Preview language server",
            command: "typescript.native-preview.restart",
        },
        {
            label: "$(output) Show TS Server Log",
            description: "Show the TypeScript Native Preview server log",
            command: "typescript.native-preview.output.focus",
        },
        {
            label: "$(debug-console) Show LSP Messages",
            description: "Show the LSP communication trace",
            command: "typescript.native-preview.lsp-trace.focus",
        },
        {
            label: "$(report) Report Issue",
            description: "Report an issue with TypeScript Native Preview",
            command: "typescript.native-preview.reportIssue",
        },
        {
            label: "$(stop-circle) Disable TypeScript Native Preview",
            description: "Switch back to the built-in TypeScript extension",
            command: "typescript.native-preview.disable",
        },
    ];

    const selected = await vscode.window.showQuickPick(commands, {
        placeHolder: "TypeScript Native Preview Commands",
    });

    if (selected) {
        await vscode.commands.executeCommand(selected.command);
    }
}

async function promptForProfileDirectory(): Promise<string | undefined> {
    const defaultDir = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? "";
    const dir = await vscode.window.showInputBox({
        prompt: "Enter directory path for profile output",
        value: defaultDir,
        validateInput: value => {
            if (!value.trim()) {
                return "Directory path is required";
            }
            return undefined;
        },
    });
    return dir?.trim();
}
