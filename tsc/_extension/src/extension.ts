import * as vscode from "vscode";

import { Client } from "./client";
import { registerCommands } from "./commands";
import { setupStatusBar } from "./statusBar";
import { setupVersionStatusItem } from "./versionStatusItem";

export async function activate(context: vscode.ExtensionContext) {
    const output = vscode.window.createOutputChannel("typescript-native-preview", "log");
    const traceOutput = vscode.window.createOutputChannel("typescript-native-preview (LSP)");
    const client = new Client(output, traceOutput);
    registerCommands(context, client, output, traceOutput);

    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration("typescript.experimental.useTsgo")) {
            // Delay because the command to change the config setting will restart
            // the extension host, so no need to show a message
            setTimeout(async () => {
                const selected = await vscode.window.showInformationMessage("TypeScript Native Preview setting has changed. Restart extensions to apply changes.", "Restart Extensions");
                if (selected) {
                    vscode.commands.executeCommand("workbench.action.restartExtensionHost");
                }
            }, 100);
        }
    }));

    const useTsgo = vscode.workspace.getConfiguration("typescript").get<boolean>("experimental.useTsgo");
    if (!useTsgo) {
        if (context.extensionMode === vscode.ExtensionMode.Development) {
            if (useTsgo === false) {
                vscode.window.showInformationMessage(
                    'TypeScript Native Preview is running in development mode. Ignoring "typescript.experimental.useTsgo": false.',
                );
            }
        }
        else {
            output.appendLine("TypeScript Native Preview is disabled. Select 'Enable TypeScript Native Preview (Experimental)' in the command palette to enable it.");
            return;
        }
    }

    await client.initialize(context);
    setupStatusBar(context);
    setupVersionStatusItem(context, client);
}

export async function deactivate(): Promise<void> {
}
