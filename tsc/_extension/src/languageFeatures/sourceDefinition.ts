import * as vscode from "vscode";
import {
    LanguageClient,
    Location,
    LocationLink,
} from "vscode-languageclient/node";

const sourceDefinitionMethod = "custom/textDocument/sourceDefinition";
const sourceDefinitionCommand = "typescript.native-preview.goToSourceDefinition";
const sourceDefinitionContext = "tsSupportsSourceDefinition";

type SourceDefinitionResponse = Location | Location[] | LocationLink[] | null;

export function registerSourceDefinitionFeature(client: LanguageClient): vscode.Disposable {
    const capabilities = client.initializeResult?.capabilities as { customSourceDefinitionProvider?: boolean; } | undefined;
    const enabled = !!capabilities?.customSourceDefinitionProvider;
    void vscode.commands.executeCommand("setContext", sourceDefinitionContext, enabled);

    if (!enabled) {
        return new vscode.Disposable(() => {
            void vscode.commands.executeCommand("setContext", sourceDefinitionContext, false);
        });
    }

    const disposable = vscode.commands.registerCommand(sourceDefinitionCommand, async () => {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showErrorMessage("Go to Source Definition failed. No editor is active.");
            return;
        }

        const { document } = activeEditor;
        if (!["javascript", "javascriptreact", "typescript", "typescriptreact"].includes(document.languageId)) {
            vscode.window.showErrorMessage("Go to Source Definition failed. Unsupported file type.");
            return;
        }

        const position = activeEditor.selection.active;
        await vscode.window.withProgress({
            location: vscode.ProgressLocation.Window,
            title: "Finding source definitions",
        }, async (_, token) => {
            let response: SourceDefinitionResponse;
            try {
                response = await client.sendRequest<SourceDefinitionResponse>(
                    sourceDefinitionMethod,
                    client.code2ProtocolConverter.asTextDocumentPositionParams(document, position),
                    token,
                );
            }
            catch {
                return;
            }

            if (token.isCancellationRequested) {
                return;
            }

            const p2c = client.protocol2CodeConverter;
            const items = !response ? [] : Array.isArray(response) ? response : [response];
            const locations = items.map(item =>
                LocationLink.is(item)
                    ? p2c.asLocation({ uri: item.targetUri, range: item.targetSelectionRange })
                    : p2c.asLocation(item)
            );

            await vscode.commands.executeCommand(
                "editor.action.goToLocations",
                document.uri,
                position,
                locations,
                "goto",
                "No source definitions found.",
            );
        });
    });

    return vscode.Disposable.from(
        disposable,
        new vscode.Disposable(() => {
            void vscode.commands.executeCommand("setContext", sourceDefinitionContext, false);
        }),
    );
}
