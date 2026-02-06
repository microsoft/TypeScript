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
