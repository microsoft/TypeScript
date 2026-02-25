import * as vscode from "vscode";

import { registerEnablementCommands } from "./commands";
import {
    aiConnectionString,
    getUseTsgo,
    getUseTsgoFalseSetting,
    needsExtHostRestartOnChange,
} from "./util";

import { TelemetryReporter as VSCodeTelemetryReporter } from "@vscode/extension-telemetry";
import { SessionManager } from "./session";
import { createTelemetryReporter } from "./telemetryReporting";

export interface ExtensionAPI {
    onLanguageServerInitialized: vscode.Event<void>;
    initializeAPIConnection(pipe?: string): Promise<string>;
}

export async function activate(context: vscode.ExtensionContext): Promise<ExtensionAPI | undefined> {
    await vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", false);

    const telemetryReporter = createTelemetryReporter(new VSCodeTelemetryReporter(aiConnectionString));
    context.subscriptions.push(telemetryReporter);

    registerEnablementCommands(context, telemetryReporter);

    const output = vscode.window.createOutputChannel("typescript-native-preview", { log: true });
    const traceOutput = vscode.window.createOutputChannel("typescript-native-preview (LSP)", { log: true });
    context.subscriptions.push(output, traceOutput);

    const languageServerInitializedEventEmitter = new vscode.EventEmitter<void>();
    context.subscriptions.push(languageServerInitializedEventEmitter);

    const sessionManager = new SessionManager(context, output, traceOutput, languageServerInitializedEventEmitter, telemetryReporter);
    context.subscriptions.push(sessionManager);

    let configChangeTimeout: ReturnType<typeof setTimeout> | undefined;
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration("typescript.experimental.useTsgo") || event.affectsConfiguration("js/ts.experimental.useTsgo")) {
            // Debounce to coalesce rapid events when both settings are updated together.
            clearTimeout(configChangeTimeout);
            configChangeTimeout = setTimeout(async () => {
                if (needsExtHostRestartOnChange()) {
                    const selected = await vscode.window.showInformationMessage("TypeScript Native Preview setting has changed. Restart extensions to apply changes.", "Restart Extensions");
                    if (selected) {
                        vscode.commands.executeCommand("workbench.action.restartExtensionHost");
                    }
                }
                else {
                    const useTsgo = getUseTsgo();
                    if (useTsgo) {
                        await sessionManager.restart(context);
                    }
                    else {
                        await sessionManager.stop();
                    }
                }
            }, 100);
        }
    }));
    context.subscriptions.push({ dispose: () => clearTimeout(configChangeTimeout) });

    const useTsgo = getUseTsgo();

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
            const settingName = getUseTsgoFalseSetting() ?? "typescript.experimental.useTsgo";
            vscode.window.showWarningMessage(
                `TypeScript Native Preview is running in development mode with "${settingName}" set to false.`,
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

    await sessionManager.start(context);

    function onLanguageServerInitialized(listener: () => void): vscode.Disposable {
        if (sessionManager.currentSession?.client.isInitialized) {
            listener();
        }
        return languageServerInitializedEventEmitter.event(listener);
    }

    return {
        onLanguageServerInitialized: onLanguageServerInitialized,
        async initializeAPIConnection(pipe?: string): Promise<string> {
            return sessionManager.initializeAPIConnection(pipe);
        },
    };
}
