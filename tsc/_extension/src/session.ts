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
    resolveTsdkPath,
    resolveTsdkPathToExe,
    useWorkspaceTsdkStorageKey,
    workspaceConfigBase,
} from "./util";

/**
 * SessionManager's lifetime is equal to that of the extension. It is responsible
 * for starting, restarting, replacing, and disposing the Session.
 */
export class SessionManager implements vscode.Disposable {
    currentSession?: Session;
    private disposables: vscode.Disposable[] = [];
    private outputChannel: vscode.LogOutputChannel;
    private initializedEventEmitter: vscode.EventEmitter<void>;
    private telemetryReporter: TelemetryReporter;

    constructor(
        context: vscode.ExtensionContext,
        outputChannel: vscode.LogOutputChannel,
        initializedEventEmitter: vscode.EventEmitter<void>,
        telemetryReporter: TelemetryReporter,
    ) {
        this.outputChannel = outputChannel;
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
        this.currentSession = new Session(context, this.outputChannel, this.initializedEventEmitter, this.telemetryReporter);
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
            throw new Error(vscode.l10n.t("Language server is not running."));
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
    private telemetryReporter: TelemetryReporter;
    private initializedEventEmitter: vscode.EventEmitter<void>;

    constructor(
        context: vscode.ExtensionContext,
        outputChannel: vscode.LogOutputChannel,
        initializedEventEmitter: vscode.EventEmitter<void>,
        telemetryReporter: TelemetryReporter,
    ) {
        this.client = new Client(outputChannel, initializedEventEmitter, telemetryReporter);
        this.disposables.push(this.client);
        this.context = context;
        this.outputChannel = outputChannel;
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
                vscode.window.showInformationMessage(vscode.l10n.t(`Garbage collection triggered`));
            }
            catch (error) {
                vscode.window.showErrorMessage(vscode.l10n.t(`Failed to run GC: {0}`, String(error)));
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.saveHeapProfile", async () => {
            const dir = await promptForProfileDirectory();
            if (!dir) return;
            try {
                const file = await this.client.saveHeapProfile(dir);
                vscode.window.showInformationMessage(vscode.l10n.t(`Heap profile saved to: {0}`, file));
            }
            catch (error) {
                vscode.window.showErrorMessage(vscode.l10n.t(`Failed to save heap profile: {0}`, String(error)));
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.saveAllocProfile", async () => {
            const dir = await promptForProfileDirectory();
            if (!dir) return;
            try {
                const file = await this.client.saveAllocProfile(dir);
                vscode.window.showInformationMessage(vscode.l10n.t(`Allocation profile saved to: {0}`, file));
            }
            catch (error) {
                vscode.window.showErrorMessage(vscode.l10n.t(`Failed to save allocation profile: {0}`, String(error)));
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.startCPUProfile", async () => {
            const dir = await promptForProfileDirectory();
            if (!dir) return;
            try {
                await this.client.startCPUProfile(dir);
                vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", true);
                vscode.window.showInformationMessage(vscode.l10n.t(`CPU profiling started. Profile will be saved to: {0}`, dir));
            }
            catch (error) {
                vscode.window.showErrorMessage(vscode.l10n.t(`Failed to start CPU profile: {0}`, String(error)));
                vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.stopCPUProfile", async () => {
            try {
                const file = await this.client.stopCPUProfile();
                vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
                vscode.window.showInformationMessage(vscode.l10n.t(`CPU profile saved to: {0}`, file));
            }
            catch (error) {
                vscode.window.showErrorMessage(vscode.l10n.t(`Failed to stop CPU profile: {0}`, String(error)));
            }
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.initializeAPIConnection", async () => {
            const result = await this.client.initializeAPISession();
            return result.pipe;
        }));

        this.disposables.push(vscode.commands.registerCommand("typescript.native-preview.initializeAPIConnection.ui", async () => {
            try {
                const result = await this.client.initializeAPISession();
                const copyString = vscode.l10n.t("Copy");
                const copy = await vscode.window.showInformationMessage(vscode.l10n.t(`API session initialized. Listening on: {0}`, result.pipe), copyString);
                if (copy === copyString) {
                    await vscode.env.clipboard.writeText(result.pipe);
                }
            }
            catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                vscode.window.showErrorMessage(vscode.l10n.t(`Failed to initialize API session: {0}`, message));
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
            label: vscode.l10n.t("$(refresh) Restart Server"),
            description: vscode.l10n.t("Restart the TypeScript Native Preview language server"),
            command: "typescript.native-preview.restart",
        },
        {
            label: vscode.l10n.t("$(output) Show Output"),
            description: vscode.l10n.t("Show the TypeScript Native Preview output log"),
            command: "typescript.native-preview.output.focus",
        },
        {
            label: vscode.l10n.t("$(report) Report Issue"),
            description: vscode.l10n.t("Report an issue with TypeScript Native Preview"),
            command: "typescript.native-preview.reportIssue",
        },
        {
            label: vscode.l10n.t("$(versions) Select Version"),
            description: vscode.l10n.t("Choose between bundled and workspace versions"),
            command: "typescript.native-preview.selectVersion",
        },
        {
            label: vscode.l10n.t("$(stop-circle) Disable TypeScript Native Preview"),
            description: vscode.l10n.t("Switch back to the built-in TypeScript extension"),
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
                label: vscode.l10n.t(`Executable`),
                description: exe.path,
                action: async () => {
                    await vscode.env.clipboard.writeText(exe.path);
                    vscode.window.showInformationMessage(vscode.l10n.t("Executable path copied to clipboard."));
                },
            });
        }
        if (pid) {
            commands.push({
                label: vscode.l10n.t(`PID`),
                description: `${pid}`,
                action: async () => {
                    await vscode.env.clipboard.writeText(`${pid}`);
                    vscode.window.showInformationMessage(vscode.l10n.t("Server PID copied to clipboard."));
                },
            });
        }
    }

    const selected = await vscode.window.showQuickPick(commands, {
        placeHolder: vscode.l10n.t("{0} Commands", "TypeScript Native Preview"),
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
    folder: vscode.WorkspaceFolder;
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
            folder,
            version: resolved?.version ?? "unknown",
            tsdkPath: path.normalize(packagePath.fsPath),
            exePath: resolved?.path ?? "",
        });
    }
    return results;
}

/**
 * Compute the tsdk path to persist in workspace config. Uses a path relative
 * to the workspace config base directory (the `.code-workspace` file's parent
 * in multi-root, or the lone workspace folder in single-root). Falls back to
 * the absolute path if there is no workspace.
 */
function tsdkPathForConfig(detected: DetectedVersion): string {
    const base = workspaceConfigBase();
    if (!base) {
        return detected.tsdkPath;
    }
    return path.relative(base.fsPath, detected.tsdkPath);
}

/**
 * Update the tsdk config to point at the detected version, but only if the
 * existing value doesn't already resolve to the same absolute path (avoiding
 * unnecessary config churn from formatting differences like absolute vs
 * relative, leading ./, etc.).
 */
async function updateTsdkConfig(config: vscode.WorkspaceConfiguration, detected: DetectedVersion): Promise<void> {
    const currentValue = config.inspect<string>("tsdk")?.workspaceValue;
    const newValue = tsdkPathForConfig(detected);
    if (currentValue !== undefined && resolveTsdkPath(currentValue) === resolveTsdkPath(newValue)) {
        return;
    }
    await config.update("tsdk", newValue, vscode.ConfigurationTarget.Workspace);
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
        label: (currentExePath === builtinExe.path ? "• " : "") + vscode.l10n.t("Use Bundled Version"),
        description: bundledVersion,
        detail: builtinExe.path,
        run: async () => {
            await context.workspaceState.update(useWorkspaceTsdkStorageKey, false);
            outputChannel.appendLine("Switched to bundled tsgo version.");
        },
    });

    // Workspace versions
    if (vscode.workspace.isTrusted) {
        for (const wsVersion of workspaceVersions) {
            const isActive = currentExePath === wsVersion.exePath;
            items.push({
                label: (isActive ? "• " : "") + vscode.l10n.t("Use Workspace Version"),
                description: wsVersion.version,
                detail: wsVersion.tsdkPath,
                run: async () => {
                    await context.workspaceState.update(useWorkspaceTsdkStorageKey, true);
                    await updateTsdkConfig(config, wsVersion);
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
            label: vscode.l10n.t("$(lock) Manage Workspace Trust to select a workspace version"),
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
                label: (isActive ? "• " : "") + vscode.l10n.t("Use Custom Version"),
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
        placeHolder: vscode.l10n.t("Select the TypeScript Native Preview version to use"),
    });

    if (selected) {
        await selected.run();
        // Restart server to pick up the new version
        await vscode.commands.executeCommand("typescript.native-preview.restart");
    }
}

/**
 * If the workspace has a tsdk setting pending consent, or has
 * `@typescript/native-preview` installed in node_modules, prompt the user
 * to allow using it.
 */
export async function promptUseWorkspaceVersion(context: vscode.ExtensionContext): Promise<void> {
    if (!vscode.workspace.isTrusted) return;

    const useWorkspaceTsdk = context.workspaceState.get<boolean>(useWorkspaceTsdkStorageKey, false);
    if (useWorkspaceTsdk) return; // already opted in

    const suppressKey = "typescript.native-preview.suppressPromptWorkspaceTsdk";
    if (context.workspaceState.get<boolean>(suppressKey, false)) return;

    const config = vscode.workspace.getConfiguration("typescript.native-preview");
    const tsdkInspection = config.inspect<string>("tsdk");
    const workspaceTsdk = tsdkInspection?.workspaceValue;
    if (workspaceTsdk !== undefined) {
        // The workspace config already specifies a tsdk location, but the
        // user hasn't consented to using it. Just need their approval.
        const resolved = await resolveTsdkPathToExe(workspaceTsdk);
        if (!resolved) return;
        const allow = vscode.l10n.t("Allow");
        const dismiss = vscode.l10n.t("Dismiss");
        const suppress = vscode.l10n.t("Never in this Workspace");

        const result = await vscode.window.showInformationMessage(
            vscode.l10n.t(`This workspace has a TypeScript Native Preview tsdk configured ({0}). Would you like to use it?`, resolved.version),
            allow,
            dismiss,
            suppress,
        );

        if (result === allow) {
            if (!vscode.workspace.isTrusted) return;
            await context.workspaceState.update(useWorkspaceTsdkStorageKey, true);
            await vscode.commands.executeCommand("typescript.native-preview.restart");
        }
        else if (result === suppress) {
            await context.workspaceState.update(suppressKey, true);
        }
    }
    else {
        // No workspace tsdk config, but check if native-preview is installed
        // in the workspace's node_modules.
        const workspaceVersions = await findWorkspaceNativePreviewPackages();
        if (workspaceVersions.length === 0) return;

        const wsVersion = workspaceVersions[0];
        const allow = "Use Workspace Version";
        const dismiss = "Dismiss";
        const suppress = "Never in this Workspace";

        const result = await vscode.window.showInformationMessage(
            `This workspace has TypeScript Native Preview installed (${wsVersion.version}). Would you like to use it?`,
            allow,
            dismiss,
            suppress,
        );

        if (result === allow) {
            if (!vscode.workspace.isTrusted) return;
            await context.workspaceState.update(useWorkspaceTsdkStorageKey, true);
            await updateTsdkConfig(config, wsVersion);
            await vscode.commands.executeCommand("typescript.native-preview.restart");
        }
        else if (result === suppress) {
            await context.workspaceState.update(suppressKey, true);
        }
    }
}

async function promptForProfileDirectory(): Promise<string | undefined> {
    const defaultDir = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath ?? "";
    const dir = await vscode.window.showInputBox({
        prompt: vscode.l10n.t("Enter directory path for profile output"),
        value: defaultDir,
        validateInput: value => {
            if (!value.trim()) {
                return vscode.l10n.t("Directory path is required");
            }
            return undefined;
        },
    });
    return dir?.trim();
}
