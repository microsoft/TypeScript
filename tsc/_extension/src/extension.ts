import * as vscode from "vscode";

import { Client } from "./client";
import {
    registerCodeLensShowLocationsCommand,
    registerEnablementCommands,
    registerLanguageCommands,
} from "./commands";
import { setupStatusBar } from "./statusBar";
import { needsExtHostRestartOnChange } from "./util";
import { setupVersionStatusItem } from "./versionStatusItem";

export async function activate(context: vscode.ExtensionContext) {
    await vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", false);
    registerEnablementCommands(context);
    const output = vscode.window.createOutputChannel("typescript-native-preview", { log: true });
    const traceOutput = vscode.window.createOutputChannel("typescript-native-preview (LSP)", { log: true });
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

    if (context.extensionMode === vscode.ExtensionMode.Development) {
        const tsExtension = vscode.extensions.getExtension("vscode.typescript-language-features");
        if (!tsExtension) {
            if (!useTsgo) {
                vscode.window.showWarningMessage(
                    "The built-in TypeScript extension is disabled. Sync launch.json with launch.template.json to reenable.",
                    "OK",
                );
            }
        }
        else if (useTsgo === false) {
            vscode.window.showWarningMessage(
                'TypeScript Native Preview is running in development mode with "typescript.experimental.useTsgo" set to false.',
                "Enable Setting",
                "Ignore",
            ).then(selected => {
                if (selected === "Enable Setting") {
                    vscode.commands.executeCommand("typescript.native-preview.enable");
                }
            });
        }
    }
    else if (!useTsgo) {
        output.appendLine("TypeScript Native Preview is disabled. Select 'Enable TypeScript Native Preview (Experimental)' in the command palette to enable it.");
        return;
    }

    disposeLanguageFeatures = await activateLanguageFeatures(context, output, traceOutput);
    context.subscriptions.push(disposeLanguageFeatures);
}

async function activateLanguageFeatures(context: vscode.ExtensionContext, output: vscode.LogOutputChannel, traceOutput: vscode.LogOutputChannel): Promise<vscode.Disposable> {
    const disposables: vscode.Disposable[] = [];

    const client = new Client(output, traceOutput);
    disposables.push(...registerLanguageCommands(context, client, output, traceOutput));
    disposables.push(await client.initialize(context));
    disposables.push(setupStatusBar());
    disposables.push(...setupVersionStatusItem(client));
    disposables.push(registerCodeLensShowLocationsCommand());
    return vscode.Disposable.from(...disposables);
}
