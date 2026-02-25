import * as vscode from "vscode";

import type {
    DocumentUri,
    Location,
    Position,
} from "vscode-languageclient";

import { Client } from "./client";
import type * as tr from "./telemetryReporting";
import { restartExtHostOnChangeIfNeeded } from "./util";

export function registerEnablementCommands(context: vscode.ExtensionContext, telemetryReporter: tr.TelemetryReporter): void {
    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.enable", () => {
        // Fire and forget, because this will restart the extension host and cause an error if we await
        telemetryReporter.sendTelemetryEvent("command.enableNativePreview");
        updateUseTsgoSetting(true);
    }));

    context.subscriptions.push(vscode.commands.registerCommand("typescript.native-preview.disable", () => {
        // Fire and forget, because this will restart the extension host and cause an error if we await
        telemetryReporter.sendTelemetryEvent("command.disableNativePreview");
        updateUseTsgoSetting(false);
    }));
}

/**
 * Updates the TypeScript Native Preview setting and reloads extension host.
 * Handles both `js/ts.experimental.useTsgo` and `typescript.experimental.useTsgo`.
 */
async function updateUseTsgoSetting(enable: boolean): Promise<void> {
    const tsConfig = vscode.workspace.getConfiguration("typescript");
    const jsTsConfig = vscode.workspace.getConfiguration("js/ts");

    const tsTarget = getExplicitConfigTarget(tsConfig, "experimental.useTsgo");
    const jsTsTarget = getExplicitConfigTarget(jsTsConfig, "experimental.useTsgo");

    const updates: Thenable<void>[] = [];
    if (jsTsTarget !== undefined) {
        updates.push(jsTsConfig.update("experimental.useTsgo", enable, jsTsTarget));
    }
    if (tsTarget !== undefined || jsTsTarget === undefined) {
        updates.push(tsConfig.update("experimental.useTsgo", enable, tsTarget ?? vscode.ConfigurationTarget.Global));
    }
    await Promise.all(updates);

    await restartExtHostOnChangeIfNeeded();
}

function getExplicitConfigTarget(
    config: vscode.WorkspaceConfiguration,
    key: string,
): vscode.ConfigurationTarget | undefined {
    const inspection = config.inspect(key);
    if (!inspection) return undefined;
    if (inspection.workspaceFolderValue !== undefined) return vscode.ConfigurationTarget.WorkspaceFolder;
    if (inspection.workspaceValue !== undefined) return vscode.ConfigurationTarget.Workspace;
    if (inspection.globalValue !== undefined) return vscode.ConfigurationTarget.Global;
    return undefined;
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
