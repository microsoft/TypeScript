import * as vscode from "vscode";

import { Client } from "./client";
import {
    registerEnablementCommands,
    registerLanguageCommands,
} from "./commands";
import { setupStatusBar } from "./statusBar";
import { needsExtHostRestartOnChange } from "./util";
import { setupVersionStatusItem } from "./versionStatusItem";

export async function activate(context: vscode.ExtensionContext) {
    await vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", false);
    registerEnablementCommands(context);
    const output = vscode.window.createOutputChannel("typescript-native-preview", "log");
    const traceOutput = vscode.window.createOutputChannel("typescript-native-preview (LSP)");
    context.subscriptions.push(output, traceOutput);

    let disposeLanguageFeatures: vscode.Disposable | undefined;

    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(async event => {
        if (event.affectsConfiguration("typescript.experimental.useTsgo")) {
            if (needsExtHostRestartOnChange()) {
                // Delay because the command to change the config setting will restart
                // the extension host, so no need to show a message
                setTimeout(async () => {
                    const selected = await vscode.window.showInformationMessage("TypeScript Native Preview setting has changed. Restart extensions to apply changes.", "Restart Extensions");
                    if (selected) {
                        vscode.commands.executeCommand("workbench.action.restartExtensionHost");
                    }
                }, 100);
            }
            else {
                const useTsgo = vscode.workspace.getConfiguration("typescript").get<boolean>("experimental.useTsgo");
                if (useTsgo) {
                    disposeLanguageFeatures = await activateLanguageFeatures(context, output, traceOutput);
                    context.subscriptions.push(disposeLanguageFeatures);
                }
                else {
                    disposeLanguageFeatures?.dispose();
                    disposeLanguageFeatures = undefined;
                }
            }
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

    disposeLanguageFeatures = await activateLanguageFeatures(context, output, traceOutput);
    context.subscriptions.push(disposeLanguageFeatures);
}

async function activateLanguageFeatures(context: vscode.ExtensionContext, output: vscode.OutputChannel, traceOutput: vscode.OutputChannel): Promise<vscode.Disposable> {
    const disposables: vscode.Disposable[] = [];

    const client = new Client(output, traceOutput);
    disposables.push(...registerLanguageCommands(context, client, output, traceOutput));
    disposables.push(await client.initialize(context));
    disposables.push(setupStatusBar());
    disposables.push(...setupVersionStatusItem(client));
    return vscode.Disposable.from(...disposables);
}
