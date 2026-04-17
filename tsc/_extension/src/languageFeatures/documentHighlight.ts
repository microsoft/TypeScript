import * as vscode from "vscode";
import {
    DocumentHighlight,
    LanguageClient,
} from "vscode-languageclient/node";

const multiDocumentHighlightMethod = "custom/textDocument/multiDocumentHighlight";

interface MultiDocumentHighlightParams {
    textDocument: { uri: string; };
    position: { line: number; character: number; };
    filesToSearch: string[];
}

interface MultiDocumentHighlightItem {
    uri: string;
    highlights: DocumentHighlight[];
}

class MultiDocumentHighlightProvider implements vscode.MultiDocumentHighlightProvider {
    constructor(private readonly client: LanguageClient) {}

    async provideMultiDocumentHighlights(
        document: vscode.TextDocument,
        position: vscode.Position,
        otherDocuments: vscode.TextDocument[],
        token: vscode.CancellationToken,
    ): Promise<vscode.MultiDocumentHighlight[]> {
        const allFiles = [document, ...otherDocuments]
            .map(doc => this.client.code2ProtocolConverter.asUri(doc.uri))
            .filter(file => !!file);

        if (allFiles.length === 0) {
            return [];
        }

        const params: MultiDocumentHighlightParams = {
            textDocument: this.client.code2ProtocolConverter.asTextDocumentIdentifier(document),
            position: this.client.code2ProtocolConverter.asPosition(position),
            filesToSearch: allFiles,
        };

        let response: MultiDocumentHighlightItem[] | null;
        try {
            response = await this.client.sendRequest<MultiDocumentHighlightItem[] | null>(multiDocumentHighlightMethod, params, token);
        }
        catch (error) {
            return [];
        }

        if (!response || token.isCancellationRequested) {
            return [];
        }

        // MultiDocumentHighlight is proposed API; guard against missing or changed constructor.
        try {
            return response.map(item =>
                new vscode.MultiDocumentHighlight(
                    vscode.Uri.parse(item.uri),
                    item.highlights.map(h => this.client.protocol2CodeConverter.asDocumentHighlight(h)),
                )
            );
        }
        catch {
            return [];
        }
    }
}

export function registerMultiDocumentHighlightFeature(
    selector: vscode.DocumentSelector,
    client: LanguageClient,
): vscode.Disposable {
    const capabilities = client.initializeResult?.capabilities as { customMultiDocumentHighlightProvider?: boolean; } | undefined;
    // registerMultiDocumentHighlightProvider is proposed API; guard against it not being available.
    if (!capabilities?.customMultiDocumentHighlightProvider || typeof vscode.languages.registerMultiDocumentHighlightProvider !== "function") {
        return { dispose() {} };
    }
    return vscode.languages.registerMultiDocumentHighlightProvider(selector, new MultiDocumentHighlightProvider(client));
}
