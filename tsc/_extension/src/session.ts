import * as path from "path";
import * as vscode from "vscode";
import { ActiveJsTsEditorTracker } from "./activeJsTsEditorTracker";
import { Client } from "./client";
import { registerCodeLensShowLocationsCommand } from "./commands";
import { ManagedFileContextManager } from "./managedFileContext";
import { ProjectStatus } from "./projectStatus";
import { setupStatusBar } from "./statusBar";
import { TelemetryReporter } from "./telemetryReporting";
import {
    getBuiltinExePath,
    getExe,
    resolveTsdkPathToExe,
    useWorkspaceTsdkStorageKey,
} from "./util";

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
        this.currentSession = new Session(context, this.outputChannel, this.traceOutputChannel, this.initializedEventEmitter, this.telemetryReporter);
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
    private context: vscode.ExtensionContext;
    private outputChannel: vscode.LogOutputChannel;
    private traceOutputChannel: vscode.LogOutputChannel;
    private telemetryReporter: TelemetryReporter;
    private initializedEventEmitter: vscode.EventEmitter<void>;

    constructor(
        context: vscode.ExtensionContext,
        outputChannel: vscode.LogOutputChannel,
        traceOutputChannel: vscode.LogOutputChannel,
        initializedEventEmitter: vscode.EventEmitter<void>,
        telemetryReporter: TelemetryReporter,
    ) {
        this.client = new Client(outputChannel, traceOutputChannel, initializedEventEmitter, telemetryReporter);
        this.disposables.push(this.client);
        this.context = context;
        this.outputChannel = outputChannel;
        this.traceOutputChannel = traceOutputChannel;
        this.telemetryReporter = telemetryReporter;
        this.initializedEventEmitter = initializedEventEmitter;
        this.registerCommands();
    }

    async start(context: vscode.ExtensionContext): Promise<void> {
        const exe = await getExe(context);
        await this.client.start(exe);
        this.disposables.push(setupStatusBar(exe.version));

        // Set up active editor tracker and UI features
        const activeEditorTracker = new ActiveJsTsEditorTracker();
        this.disposables.push(activeEditorTracker);

        const managedFileContext = new ManagedFileContextManager(activeEditorTracker);
        this.disposables.push(managedFileContext);

        const projectStatus = new ProjectStatus(this.client, activeEditorTracker, this.initializedEventEmitter.event);
        this.disposables.push(projectStatus);

        // If already initialized, fire immediately so projectStatus picks it up
        if (this.client.isInitialized) {
            this.initializedEventEmitter.fire();
        }

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
            await promptSelectVersion(this.context, this.client, this.outputChannel);
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.showMenu", () => {
            showCommands(this.client);
        }));

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

async function showCommands(client: Client): Promise<void> {
    interface CommandItem {
        label: string;
        description?: string;
        kind?: vscode.QuickPickItemKind;
        command?: string;
        action?: () => Promise<void>;
    }
    const commands: CommandItem[] = [
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
            label: "$(versions) Select Version",
            description: "Choose between bundled and workspace versions",
            command: "typescript.native-preview.selectVersion",
        },
        {
            label: "$(stop-circle) Disable TypeScript Native Preview",
            description: "Switch back to the built-in TypeScript extension",
            command: "typescript.native-preview.disable",
        },
    ];

    const showDebugInfo = vscode.workspace.getConfiguration("typescript.native-preview").get<boolean>("showDebugInfo", false);
    if (showDebugInfo) {
        const exe = client.getCurrentExe();
        const pid = client.serverPid;
        commands.push({ label: "", kind: vscode.QuickPickItemKind.Separator });
        if (exe) {
            commands.push({
                label: `Executable`,
                description: exe.path,
                action: async () => {
                    await vscode.env.clipboard.writeText(exe.path);
                    vscode.window.showInformationMessage("Executable path copied to clipboard.");
                },
            });
        }
        if (pid) {
            commands.push({
                label: `PID`,
                description: `${pid}`,
                action: async () => {
                    await vscode.env.clipboard.writeText(`${pid}`);
                    vscode.window.showInformationMessage("Server PID copied to clipboard.");
                },
            });
        }
    }

    const selected = await vscode.window.showQuickPick(commands, {
        placeHolder: "TypeScript Native Preview Commands",
    });

    if (selected) {
        if (selected.action) {
            await selected.action();
        }
        else if (selected.command) {
            await vscode.commands.executeCommand(selected.command);
        }
    }
}

interface VersionQuickPickItem extends vscode.QuickPickItem {
    run(): Promise<void>;
}

interface DetectedVersion {
    label: string;
    version: string;
    tsdkPath: string;
    exePath: string;
}

async function findWorkspaceNativePreviewPackages(): Promise<DetectedVersion[]> {
    const results: DetectedVersion[] = [];
    for (const folder of vscode.workspace.workspaceFolders ?? []) {
        const packagePath = vscode.Uri.joinPath(folder.uri, "node_modules", "@typescript", "native-preview");
        const resolved = await resolveTsdkPathToExe(path.normalize(packagePath.fsPath));
        if (!resolved) continue;
        results.push({
            label: folder.name,
            version: resolved?.version ?? "unknown",
            tsdkPath: path.normalize(packagePath.fsPath),
            exePath: resolved?.path ?? "",
        });
    }
    return results;
}

async function promptSelectVersion(context: vscode.ExtensionContext, client: Client, outputChannel: vscode.LogOutputChannel): Promise<void> {
    const config = vscode.workspace.getConfiguration("typescript.native-preview");
    const currentExePath = client.getCurrentExe()?.path;
    const builtinExe = await getBuiltinExePath(context);
    const workspaceVersions = await findWorkspaceNativePreviewPackages();
    const bundledVersion = context.extension.packageJSON.version as string;
    const items: VersionQuickPickItem[] = [];

    // Bundled version
    items.push({
        label: (currentExePath === builtinExe.path ? "• " : "") + "Use Bundled Version",
        description: bundledVersion,
        detail: builtinExe.path,
        run: async () => {
            await context.workspaceState.update(useWorkspaceTsdkStorageKey, false);
            await config.update("tsdk", undefined, vscode.ConfigurationTarget.Workspace);
            outputChannel.appendLine("Switched to bundled tsgo version.");
        },
    });

    // Workspace versions
    if (vscode.workspace.isTrusted) {
        for (const wsVersion of workspaceVersions) {
            const isActive = currentExePath === wsVersion.tsdkPath;
            items.push({
                label: (isActive ? "• " : "") + "Use Workspace Version",
                description: wsVersion.version,
                detail: wsVersion.tsdkPath,
                run: async () => {
                    await context.workspaceState.update(useWorkspaceTsdkStorageKey, true);
                    await config.update("tsdk", wsVersion.tsdkPath, vscode.ConfigurationTarget.Workspace);
                    outputChannel.appendLine(`Switched to workspace tsgo version (${wsVersion.version}).`);
                },
            });
        }
    }
    else if (workspaceVersions.length > 0) {
        items.push({
            label: "",
            kind: vscode.QuickPickItemKind.Separator,
            run: async () => {},
        });
        items.push({
            label: "$(lock) Manage Workspace Trust to select a workspace version",
            run: async () => {
                await vscode.commands.executeCommand("workbench.trust.manage");
            },
        });
    }

    // Additional tsdk locations from settings
    const additionalLocations = config.get<string[]>("additionalTsdkLocations", []);
    if (additionalLocations.length > 0) {
        items.push({
            label: "",
            kind: vscode.QuickPickItemKind.Separator,
            run: async () => {},
        });
        for (const loc of additionalLocations) {
            const resolved = await resolveTsdkPathToExe(loc);
            if (!resolved) continue;
            if (resolved.path === builtinExe.path) continue;
            if (workspaceVersions.some(ws => ws.exePath === resolved.path)) continue;
            const isActive = currentExePath === resolved.path;
            items.push({
                label: (isActive ? "• " : "") + "Use Custom Version",
                description: resolved.version,
                detail: resolved.path,
                run: async () => {
                    await context.workspaceState.update(useWorkspaceTsdkStorageKey, true);
                    await config.update("tsdk", loc, vscode.ConfigurationTarget.Workspace);
                    outputChannel.appendLine(`Switched to custom tsgo version at ${loc}.`);
                },
            });
        }
    }

    const selected = await vscode.window.showQuickPick<VersionQuickPickItem>(items, {
        placeHolder: "Select the TypeScript Native Preview version to use",
    });

    if (selected) {
        await selected.run();
        // Restart server to pick up the new version
        await vscode.commands.executeCommand("typescript.native-preview.restart");
    }
}

/**
 * If the workspace has `@typescript/native-preview` installed and the user
 * hasn't already opted in or dismissed the prompt, ask whether they'd like
 * to use the workspace version.
 */
export async function promptUseWorkspaceVersion(context: vscode.ExtensionContext): Promise<void> {
    if (!vscode.workspace.isTrusted) return;

    const useWorkspaceTsdk = context.workspaceState.get<boolean>(useWorkspaceTsdkStorageKey, false);
    if (useWorkspaceTsdk) return; // already opted in

    const suppressKey = "typescript.native-preview.suppressPromptWorkspaceTsdk";
    if (context.workspaceState.get<boolean>(suppressKey, false)) return;

    const workspaceVersions = await findWorkspaceNativePreviewPackages();
    if (workspaceVersions.length === 0) return;

    const wsVersion = workspaceVersions[0];
    const allow = "Allow";
    const dismiss = "Dismiss";
    const suppress = "Never in this Workspace";

    const result = await vscode.window.showInformationMessage(
        `This workspace contains a TypeScript Native Preview version (${wsVersion.version}). Would you like to use the workspace version?`,
        allow,
        dismiss,
        suppress,
    );

    if (result === allow) {
        if (!vscode.workspace.isTrusted) return;
        await context.workspaceState.update(useWorkspaceTsdkStorageKey, true);
        const config = vscode.workspace.getConfiguration("typescript.native-preview");
        await config.update("tsdk", wsVersion.tsdkPath, vscode.ConfigurationTarget.Workspace);
        await vscode.commands.executeCommand("typescript.native-preview.restart");
    }
    else if (result === suppress) {
        await context.workspaceState.update(suppressKey, true);
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
