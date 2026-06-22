import * as vscode from "vscode";

import {
    registerEnablementCommands,
    updateUseTsgoSetting,
} from "./commands";
import {
    aiConnectionString,
    getExplicitConfigTarget,
    getUseTsgo,
    getWinningTsgoConfigKey,
    needsExtHostRestartOnChange,
} from "./util";

import { TelemetryReporter as VSCodeTelemetryReporter } from "@vscode/extension-telemetry";
import {
    promptUseWorkspaceVersion,
    SessionManager,
} from "./session";

import { ExperimentationService } from "./experimentationService";
import { createTelemetryReporter } from "./telemetryReporting";

import assert from "node:assert";

export interface ExtensionAPI {
    onLanguageServerInitialized: vscode.Event<void>;
    initializeAPIConnection(pipe?: string): Promise<string>;
}

export async function activate(context: vscode.ExtensionContext): Promise<ExtensionAPI | undefined> {
    await vscode.commands.executeCommand("setContext", "typescript.native-preview.serverRunning", false);

    const telemetryReporter = createTelemetryReporter(new VSCodeTelemetryReporter(aiConnectionString));
    context.subscriptions.push(telemetryReporter);

    const version = context.extension.packageJSON.version;
    assert(typeof version === "string");
    // Constructing the experimentation service actually sets shared properties
    // so that events include context on treatments/flights.
    // If we actually need to read treatment variables we would hold onto this instance,
    // but for now we just construct it to ensure shared properties are set for telemetry.
    void new ExperimentationService(telemetryReporter, context.extension.id, version, context.globalState);

    registerEnablementCommands(context, telemetryReporter);

    const output = vscode.window.createOutputChannel("typescript-native-preview", { log: true });
    context.subscriptions.push(output);

    const languageServerInitializedEventEmitter = new vscode.EventEmitter<void>();
    context.subscriptions.push(languageServerInitializedEventEmitter);

    const sessionManager = new SessionManager(context, output, languageServerInitializedEventEmitter, telemetryReporter);
    context.subscriptions.push(sessionManager);

    let configChangeTimeout: ReturnType<typeof setTimeout> | undefined;
    context.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration("typescript.experimental.useTsgo") || event.affectsConfiguration("js/ts.experimental.useTsgo")) {
            // Debounce to coalesce rapid events when both settings are updated together.
            clearTimeout(configChangeTimeout);
            configChangeTimeout = setTimeout(async () => {
                if (needsExtHostRestartOnChange()) {
                    const selected = await vscode.window.showInformationMessage(vscode.l10n.t("TypeScript Native Preview setting has changed. Restart extensions to apply changes."), vscode.l10n.t("Restart Extensions"));
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

    const hasOnboardedTsgoStateKey = "hasOnboardedTsgo";
    const shouldOnboardTsgo = !context.globalState.get<boolean>(hasOnboardedTsgoStateKey);
    if (shouldOnboardTsgo) {
        await context.globalState.update(hasOnboardedTsgoStateKey, true);
    }

    const useTsgo = getUseTsgo();

    if (context.extensionMode === vscode.ExtensionMode.Development) {
        const tsExtension = vscode.extensions.getExtension("vscode.typescript-language-features");
        if (!tsExtension) {
            if (!useTsgo) {
                vscode.window.showWarningMessage(
                    vscode.l10n.t("The built-in TypeScript extension is disabled. Sync launch.json with launch.template.json to reenable."),
                    vscode.l10n.t("OK"),
                );
                return;
            }
        }
        else if (useTsgo === false) {
            const settingName = getWinningTsgoConfigKey() ?? "js/ts.experimental.useTsgo";
            const enableSettingString = vscode.l10n.t("Enable Setting");
            vscode.window.showWarningMessage(
                vscode.l10n.t(`TypeScript Native Preview is running in development mode with "{0}" set to false.`, settingName),
                enableSettingString,
                vscode.l10n.t("Ignore"),
            ).then(selected => {
                if (selected === enableSettingString) {
                    vscode.commands.executeCommand("typescript.native-preview.enable");
                }
            });
            return;
        }
    }
    else if (useTsgo === false) {
        output.appendLine(vscode.l10n.t("TypeScript Native Preview is disabled. Select 'Enable TypeScript Native Preview (Experimental)' in the command palette to enable it."));
        return;
    }
    else if (useTsgo === undefined) {
        if (shouldOnboardTsgo) {
            // First run after install: enable by default.
            updateUseTsgoSetting(true);
            return;
        }
        output.appendLine(vscode.l10n.t("TypeScript Native Preview is disabled. Select 'Enable TypeScript Native Preview (Experimental)' in the command palette to enable it."));
        return;
    }

    let pluginWarningShown = false;
    const onDidChangeExtensions = vscode.extensions.onDidChange(() => {
        warnAboutTsServerPlugins(context, output);
    });
    context.subscriptions.push(onDidChangeExtensions);
    warnAboutTsServerPlugins(context, output);

    await sessionManager.start(context);

    // Prompt user to use workspace version if one is detected and they haven't opted in yet.
    promptUseWorkspaceVersion(context).catch(err => {
        output.appendLine(vscode.l10n.t(`Error prompting to use workspace version: {0}`, String(err)));
    });

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

    async function warnAboutTsServerPlugins(context: vscode.ExtensionContext, output: vscode.LogOutputChannel): Promise<void> {
        // Never show more than once.
        if (pluginWarningShown) {
            return;
        }

        if (getUseTsgo() !== true) {
            return;
        }

        const settingName = getWinningTsgoConfigKey();
        assert(settingName !== undefined, "Expected some useTsgo configuration to be explicitly set.");

        const target = getExplicitConfigTarget(vscode.workspace.getConfiguration(), settingName);
        assert(target !== undefined, "Expected an explicit configuration target.");

        // We only want to warn about plugins when Corsa is enabled in a user's global configuration.
        // Setting in the workspace is an indication that the user is aware of the potential issues.
        if (target !== vscode.ConfigurationTarget.Global) {
            return;
        }

        const hasWorkspaceFolder = !!vscode.workspace.workspaceFolders?.length;

        if (context.globalState.get<true>(pluginWarningDismissedKey)) {
            return;
        }

        const pluginExtensions = getExtensionsWithTsServerPlugins();
        if (pluginExtensions.length === 0) {
            return;
        }

        const uniqueExtensionNames = [...new Set(pluginExtensions.map(p => p.extensionId))];
        const extensionNames = uniqueExtensionNames.join(", ");
        output.appendLine(`Extensions contributing tsserver plugins that will not apply with TypeScript Native Preview: ${extensionNames}`);

        const message = uniqueExtensionNames.length === 1
            // Pick the first extension & plugin, even though extensions can have multiple plugins
            ? vscode.l10n.t(`TypeScript server plugins from the "{0}" extension will not be loaded because TypeScript Native Preview is enabled globally.`, pluginExtensions[0].extensionId)
            : vscode.l10n.t(`{0} extensions contribute TypeScript server plugins that will not be loaded because TypeScript Native Preview is enabled globally: {1}`, uniqueExtensionNames.length, extensionNames);

        const ok = vscode.l10n.t("OK");
        const disableInWorkspace = vscode.l10n.t("Disable Native Preview in Workspace");
        const dontShowAgain = vscode.l10n.t("Don't Show Again");

        const options = [ok];
        if (hasWorkspaceFolder) {
            options.push(disableInWorkspace);
        }
        options.push(dontShowAgain);

        // Make sure we never show this message again in this session.
        pluginWarningShown = true;

        const selected = await vscode.window.showWarningMessage(message, ...options);
        if (selected === disableInWorkspace) {
            await vscode.workspace.getConfiguration("js/ts").update("experimental.useTsgo", false, vscode.ConfigurationTarget.Workspace);
        }
        else if (selected === dontShowAgain) {
            await context.globalState.update(pluginWarningDismissedKey, true);
        }
    }
}

const suppressedPluginExtensionIds: Set<string> = new Set([
    "github.copilot",
    "github.copilot-chat",
]);

const pluginWarningDismissedKey = "tsServerPluginWarningDismissed";

function getExtensionsWithTsServerPlugins(): { extensionId: string; pluginName: string; }[] {
    const results: { extensionId: string; pluginName: string; }[] = [];
    // Despite its name, 'all' actually only seems to contain active extensions.
    for (const extension of vscode.extensions.all) {
        // Ignore built-in extensions that always try to contribute plugins.
        const id = extension.id.toLowerCase();
        if (suppressedPluginExtensionIds.has(id)) {
            continue;
        }

        const contributes = extension.packageJSON?.contributes;
        if (contributes && Array.isArray(contributes.typescriptServerPlugins)) {
            for (const plugin of contributes.typescriptServerPlugins) {
                if (typeof plugin.name === "string" && plugin.name) {
                    results.push({ extensionId: extension.id, pluginName: plugin.name });
                }
            }
        }
    }
    return results;
}
