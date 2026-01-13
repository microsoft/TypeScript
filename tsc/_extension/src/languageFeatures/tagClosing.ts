import * as vscode from "vscode";
import {
    LanguageClient,
    TextDocumentPositionParams,
} from "vscode-languageclient/node";
import {
    Condition,
    conditionalRegistration,
} from "./util/dependentRegistration";

const CLOSING_TAG_COMPLETION_DELAY = 100;

class TagClosing {
    private disposed = false;
    private timeout: NodeJS.Timeout | undefined;
    private cancel: vscode.CancellationTokenSource | undefined;
    private onDidChangeSubscription: vscode.Disposable | undefined;
    private readonly client: LanguageClient;

    constructor(client: LanguageClient) {
        this.client = client;
        this.onDidChangeSubscription = vscode.workspace.onDidChangeTextDocument(
            this.onDidChangeTextDocument,
            this,
        );
    }

    dispose() {
        this.disposed = true;

        this.onDidChangeSubscription?.dispose();
        this.onDidChangeSubscription = undefined;

        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = undefined;
        }

        if (this.cancel) {
            this.cancel.cancel();
            this.cancel.dispose();
            this.cancel = undefined;
        }
    }

    onDidChangeTextDocument({ document, contentChanges, reason }: vscode.TextDocumentChangeEvent) {
        if (contentChanges.length === 0 || reason === vscode.TextDocumentChangeReason.Undo || reason === vscode.TextDocumentChangeReason.Redo) {
            return;
        }

        const activeDocument = vscode.window.activeTextEditor?.document;
        if (document !== activeDocument) {
            return;
        }

        // !!! toOpenTsFilePath?

        if (typeof this.timeout !== "undefined") {
            clearTimeout(this.timeout);
        }

        if (this.cancel) {
            this.cancel.cancel();
            this.cancel.dispose();
            this.cancel = undefined;
        }

        const lastChange = contentChanges[contentChanges.length - 1];
        const lastCharacter = lastChange.text.charAt(lastChange.text.length - 1);
        if (lastChange.rangeLength > 0 || (lastCharacter !== ">" && lastCharacter !== "/")) {
            return;
        }

        if (lastChange.range.start.character > 0) {
            const priorPosition = lastChange.range.start.translate(0, -1);
            const textRange = new vscode.Range(priorPosition, lastChange.range.start);
            const priorCharacter = document.getText(textRange);

            if (priorCharacter === ">") {
                return;
            }
        }

        const startingVersion = document.version;
        this.timeout = setTimeout(async () => {
            this.timeout = undefined;

            if (this.disposed) {
                return;
            }

            const addedLines = lastChange.text.split(/\r\n|\n/g);
            const position = addedLines.length <= 1
                ? lastChange.range.start.translate(0, lastChange.text.length)
                : new vscode.Position(
                    lastChange.range.start.line + addedLines.length - 1,
                    addedLines[addedLines.length - 1].length,
                );

            const params: TextDocumentPositionParams = {
                textDocument: { uri: document.uri.toString() },
                position: { line: position.line, character: position.character },
            };
            this.cancel = new vscode.CancellationTokenSource();

            let response;
            try {
                response = await this.client.sendRequest<{ newText: string; } | null>(
                    "custom/textDocument/closingTagCompletion",
                    params,
                    this.cancel.token,
                );
            }
            catch (e) {
                console.error("Error requesting closing tag completion:", e);
                return;
            }

            if (!response) {
                return;
            }

            if (this.disposed) {
                return;
            }

            const activeEditor = vscode.window.activeTextEditor;
            if (activeEditor === undefined) {
                return;
            }

            const activeDocument = activeEditor.document;
            if (document === activeDocument && activeDocument.version === startingVersion) {
                const snippet = new vscode.SnippetString();
                snippet.appendPlaceholder("", 0);
                snippet.appendText(response.newText);

                const activeSelectionsPositions = activeEditor.selections.map(sel => sel.active);
                // TODO: why was this not a `filter` or `find`?
                const insertionPositions = activeSelectionsPositions.some(p => p.isEqual(position))
                    ? activeSelectionsPositions
                    : position;

                activeEditor.insertSnippet(snippet, insertionPositions);
            }
        }, CLOSING_TAG_COMPLETION_DELAY);
    }
}

function requireActiveDocumentSetting(languageConfigSection: "typescript" | "javascript", selector: vscode.DocumentSelector) {
    return new Condition(
        () => {
            const activeEditor = vscode.window.activeTextEditor;
            if (!activeEditor) {
                return false;
            }

            const activeDocument = activeEditor.document;
            if (!vscode.languages.match(selector, activeDocument)) {
                return false;
            }

            const autoClosingTags = vscode.workspace.getConfiguration(languageConfigSection, activeDocument).get("autoClosingTags");
            return !!autoClosingTags;
        },
        handler => {
            return vscode.Disposable.from(
                vscode.window.onDidChangeActiveTextEditor(handler),
                vscode.workspace.onDidOpenTextDocument(handler),
                vscode.workspace.onDidChangeConfiguration(handler),
            );
        },
    );
}

export function registerTagClosingFeature(
    languageConfigSection: "typescript" | "javascript",
    selector: vscode.DocumentSelector,
    client: LanguageClient,
): vscode.Disposable {
    return conditionalRegistration([
        requireActiveDocumentSetting(languageConfigSection, selector),
    ], () => new TagClosing(client));
}
