import * as vscode from "vscode";
import { Client } from "./client";

export function registerCommands(context: vscode.ExtensionContext, client: Client, outputChannel: vscode.OutputChannel, traceOutputChannel: vscode.OutputChannel): void {
    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.enable", () => {
        // Fire and forget, because this will restart the extension host and cause an error if we await
        updateUseTsgoSetting(true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.disable", () => {
        // Fire and forget, because this will restart the extension host and cause an error if we await
        updateUseTsgoSetting(false);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.restart", () => {
        return client.restart(context);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.output.focus", () => {
        outputChannel.show();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.lsp-trace.focus", () => {
        traceOutputChannel.show();
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.selectVersion", async () => {
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.showMenu", showCommands));
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
    await vscode.commands.executeCommand("workbench.action.restartExtensionHost");
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
