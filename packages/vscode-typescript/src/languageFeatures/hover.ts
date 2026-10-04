import * as vscode from "vscode";
import {
    Hover,
    HoverRequest,
    LanguageClient,
    TextDocumentPositionParams,
} from "vscode-languageclient/node";

interface HoverResult extends Hover {
    canIncreaseVerbosity?: boolean;
}

interface HoverParamsWithVerbosity extends TextDocumentPositionParams {
    verbosityLevel?: number;
}

class VerboseHoverProvider implements vscode.HoverProvider {
    private lastHoverAndLevel: [vscode.Hover, number] | undefined;

    constructor(private readonly client: LanguageClient) {}

    async provideHover(
        document: vscode.TextDocument,
        position: vscode.Position,
        token: vscode.CancellationToken,
        context?: vscode.HoverContext,
    ): Promise<vscode.VerboseHover | vscode.Hover | undefined> {
        // HoverContext and VerboseHover are proposed API; guard against missing or unexpected properties.
        const verbosityDelta = typeof context?.verbosityDelta === "number" ? context.verbosityDelta : undefined;
        const previousHover = context?.previousHover instanceof vscode.Hover ? context.previousHover : undefined;
        const verbosityLevel = verbosityDelta !== undefined ? Math.max(0, this.getPreviousLevel(previousHover) + verbosityDelta) : undefined;

        const params: HoverParamsWithVerbosity = {
            ...this.client.code2ProtocolConverter.asTextDocumentPositionParams(document, position),
            verbosityLevel,
        };

        let response: HoverResult | null;
        try {
            response = await this.client.sendRequest(HoverRequest.type, params, token);
        }
        catch (error) {
            return this.client.handleFailedRequest(HoverRequest.type, token, error, null) ?? undefined;
        }

        if (!response || token.isCancellationRequested) {
            return undefined;
        }

        const hover = this.client.protocol2CodeConverter.asHover(response);
        // VerboseHover is proposed API; guard against missing or changed constructor.
        try {
            const verboseHover = new vscode.VerboseHover(
                hover.contents,
                hover.range,
                response.canIncreaseVerbosity,
                (verbosityLevel ?? 0) > 0,
            );

            this.lastHoverAndLevel = [verboseHover, verbosityLevel ?? 0];
            return verboseHover;
        }
        catch {
            return hover;
        }
    }

    private getPreviousLevel(previousHover: vscode.Hover | undefined): number {
        if (previousHover && this.lastHoverAndLevel && this.lastHoverAndLevel[0] === previousHover) {
            return this.lastHoverAndLevel[1];
        }
        return 0;
    }
}

export function registerHoverFeature(
    selector: vscode.DocumentSelector,
    client: LanguageClient,
): vscode.Disposable {
    return vscode.languages.registerHoverProvider(selector, new VerboseHoverProvider(client));
}
