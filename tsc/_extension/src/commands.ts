import * as vscode from "vscode";
import type {
    DocumentUri,
    Location,
    Position,
} from "vscode-languageclient";

import { Client } from "./client";
import { restartExtHostOnChangeIfNeeded } from "./util";

export function registerEnablementCommands(context: vscode.ExtensionContext): void {
    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.enable", () => {
        // Fire and forget, because this will restart the extension host and cause an error if we await
        updateUseTsgoSetting(true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.disable", () => {
        // Fire and forget, because this will restart the extension host and cause an error if we await
        updateUseTsgoSetting(false);
    }));
}

export function registerLanguageCommands(context: vscode.ExtensionContext, client: Client, outputChannel: vscode.OutputChannel, traceOutputChannel: vscode.OutputChannel): vscode.Disposable[] {
    const disposables: vscode.Disposable[] = [];

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.restart", () => {
        return client.restart(context);
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.output.focus", () => {
        outputChannel.show();
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.lsp-trace.focus", () => {
        traceOutputChannel.show();
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.selectVersion", async () => {
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.showMenu", showCommands));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.reportIssue", () => {
        vscode.commands.executeCommand("workbench.action.openIssueReporter", {
            extensionId: "TypeScriptTeam.native-preview",
        });
    }));

    // Developer/debugging commands
    disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.runGC", async () => {
        try {
            await client.runGC();
            vscode.window.showInformationMessage("Garbage collection triggered");
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to run GC: ${error}`);
        }
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.saveHeapProfile", async () => {
        const dir = await promptForProfileDirectory();
        if (!dir) return;
        try {
            const file = await client.saveHeapProfile(dir);
            vscode.window.showInformationMessage(`Heap profile saved to: ${file}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to save heap profile: ${error}`);
        }
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.saveAllocProfile", async () => {
        const dir = await promptForProfileDirectory();
        if (!dir) return;
        try {
            const file = await client.saveAllocProfile(dir);
            vscode.window.showInformationMessage(`Allocation profile saved to: ${file}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to save allocation profile: ${error}`);
        }
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.startCPUProfile", async () => {
        const dir = await promptForProfileDirectory();
        if (!dir) return;
        try {
            await client.startCPUProfile(dir);
            vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", true);
            vscode.window.showInformationMessage(`CPU profiling started. Profile will be saved to: ${dir}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to start CPU profile: ${error}`);
            vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
        }
    }));

    disposables.push(vscode.commands.registerCommand("typescript.native-preview.dev.stopCPUProfile", async () => {
        try {
            const file = await client.stopCPUProfile();
            vscode.commands.executeCommand("setContext", "typescript.native-preview.cpuProfileRunning", false);
            vscode.window.showInformationMessage(`CPU profile saved to: ${file}`);
        }
        catch (error) {
            vscode.window.showErrorMessage(`Failed to stop CPU profile: ${error}`);
        }
    }));

    return disposables;
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

/**
 * Updates the TypeScript Native Preview setting and reloads extension host.
 */
async function updateUseTsgoSetting(enable: boolean): Promise<void> {
    const tsConfig = vscode.workspace.getConfiguration("typescript");
    let target: vscode.ConfigurationTarget | undefined;
    const useTsgo = tsConfig.inspect("experimental.useTsgo");
    if (useTsgo) {
        target = useTsgo.workspaceFolderValue !== undefined ? vscode.ConfigurationTarget.WorkspaceFolder :
            useTsgo.workspaceValue !== undefined ? vscode.ConfigurationTarget.Workspace :
            useTsgo.globalValue !== undefined ? vscode.ConfigurationTarget.Global : undefined;
    }
    // Update the setting and restart the extension host (needed to change the state of the built-in TS extension)
    await tsConfig.update("experimental.useTsgo", enable, target ?? vscode.ConfigurationTarget.Global);
    await restartExtHostOnChangeIfNeeded();
}

/**
 * Shows the quick pick menu for TypeScript Native Preview commands
 */
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

export const codeLensShowLocationsCommandName = "typescript.native-preview.codeLens.showLocations";
export function registerCodeLensShowLocationsCommand(): vscode.Disposable {
    return vscode.commands.registerCommand(codeLensShowLocationsCommandName, showCodeLensLocations);

    function showCodeLensLocations(...args: unknown[]): void {
        if (args.length !== 3) {
            throw new Error("Unexpected number of arguments.");
        }

        const lspUri = args[0] as DocumentUri;
        const lspPosition = args[1] as Position;
        const lspLocations = args[2] as Location[];

        const editorUri = vscode.Uri.parse(lspUri);
        const editorPosition = new vscode.Position(lspPosition.line, lspPosition.character);
        const editorLocations = lspLocations.map(loc =>
            new vscode.Location(
                vscode.Uri.parse(loc.uri),
                new vscode.Range(
                    new vscode.Position(loc.range.start.line, loc.range.start.character),
                    new vscode.Position(loc.range.end.line, loc.range.end.character),
                ),
            )
        );

        vscode.commands.executeCommand("editor.action.showReferences", editorUri, editorPosition, editorLocations);
    }
}
