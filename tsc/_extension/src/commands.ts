import * as vscode from "vscode";

import type {
    DocumentUri,
    Location,
    Position,
} from "vscode-languageclient";

import type * as tr from "./telemetryReporting";
import {
    getExplicitConfigTarget,
    restartExtHostOnChangeIfNeeded,
} from "./util";

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
export async function updateUseTsgoSetting(enable: boolean): Promise<void> {
    const jsTsConfig = vscode.workspace.getConfiguration("js/ts");
    const tsConfig = vscode.workspace.getConfiguration("typescript");

    const jsTsTarget = getExplicitConfigTarget(jsTsConfig, "experimental.useTsgo");
    const tsTarget = getExplicitConfigTarget(tsConfig, "experimental.useTsgo");

    // If any are defined, we'll use the most-specific target,
    // but we'll only set it through `js/ts`.
    if (jsTsTarget !== undefined || tsTarget !== undefined) {
        const updates = [];

        const mostSpecificTarget = Math.max(
            jsTsTarget ?? vscode.ConfigurationTarget.Global,
            tsTarget ?? vscode.ConfigurationTarget.Global,
        );
        updates.push(jsTsConfig.update("experimental.useTsgo", enable, mostSpecificTarget));

        // If `typescript` had the most-specific target
        // (or shared the most-specific target), then
        // we'll erase that since we've just set `js/ts` above.
        if (tsTarget === mostSpecificTarget) {
            updates.push(tsConfig.update("experimental.useTsgo", undefined, mostSpecificTarget));
        }

        await Promise.all(updates);
    }

    return restartExtHostOnChangeIfNeeded();
}

export const codeLensShowLocationsCommandName = "typescript.native-preview.codeLens.showLocations";
export function registerCodeLensShowLocationsCommand(): vscode.Disposable {
    return vscode.commands.registerCommand(codeLensShowLocationsCommandName, showCodeLensLocations);

    function showCodeLensLocations(...args: unknown[]): void {
        if (args.length !== 3) {
            throw new Error(vscode.l10n.t("Unexpected number of arguments."));
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
