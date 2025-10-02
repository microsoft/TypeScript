import * as vscode from "vscode";
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

    return disposables;
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
    await tsConfig.update("experimental.useTsgo", enable, target);
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
