import type * as vscode from "vscode";
import type * as lsp from "vscode-languageserver-protocol";

export interface ContentMapperManifest {
    readonly name: string;
    readonly version?: string;
    readonly exec: readonly string[];
    readonly cwd?: vscode.Uri;
    readonly compilerOptions?: readonly string[];
    readonly dynamicConfig?: boolean;
}

export interface ContentMapperContribution {
    readonly extensions: readonly string[];
    readonly inferredProjectContribution?: {
        readonly options?: Readonly<Record<string, unknown>>;
        readonly manifest: ContentMapperManifest;
    };
}

type Request<T> = T extends lsp.ProtocolRequestType<infer P, infer R, infer _PR, infer _E, infer _RO> ? { params: P; result: R; }
    : never;

export interface MultiDocumentHighlightParams extends lsp.TextDocumentPositionParams {
    filesToSearch: string[];
}

export interface MultiDocumentHighlight {
    uri: lsp.DocumentUri;
    highlights: lsp.DocumentHighlight[];
}

export interface AutoInsertParams {
    _vs_textDocument: lsp.TextDocumentIdentifier;
    _vs_position: lsp.Position;
    _vs_ch: string;
}

export interface AutoInsertResult {
    _vs_textEditFormat: lsp.InsertTextFormat;
    _vs_textEdit: lsp.TextEdit;
}

export interface ClassifiedTextElement {
    Runs: {
        ClassificationTypeName: string;
        Text: string;
        MarkerTagType?: string;
        Style?: number | null;
        _vs_type: "ClassifiedTextRun";
    }[];
    _vs_type: "ClassifiedTextElement";
}

export interface VSReferenceItem {
    _vs_id: number;
    _vs_definitionId?: number;
    _vs_kind?: number[];
    _vs_location: lsp.Location;
    _vs_definitionText?: ClassifiedTextElement;
    _vs_projectName?: string;
    _vs_containingType?: string;
}

/** Language-feature requests supported by this extension's middleware API. */
export interface LspMiddlewareRequests {
    "textDocument/hover": {
        params: lsp.HoverParams & { verbosityLevel?: number; };
        result: (lsp.Hover & { canIncreaseVerbosity?: boolean; }) | null;
    };
    "textDocument/completion": Request<typeof lsp.CompletionRequest.type>;
    "completionItem/resolve": Request<typeof lsp.CompletionResolveRequest.type>;
    "textDocument/signatureHelp": Request<typeof lsp.SignatureHelpRequest.type>;
    "textDocument/definition": Request<typeof lsp.DefinitionRequest.type>;
    "textDocument/typeDefinition": Request<typeof lsp.TypeDefinitionRequest.type>;
    "textDocument/implementation": Request<typeof lsp.ImplementationRequest.type>;
    "textDocument/references": Request<typeof lsp.ReferencesRequest.type>;
    "textDocument/documentHighlight": Request<typeof lsp.DocumentHighlightRequest.type>;
    "textDocument/documentSymbol": Request<typeof lsp.DocumentSymbolRequest.type>;
    "workspace/symbol": Request<typeof lsp.WorkspaceSymbolRequest.type> & {
        params: { textDocument?: lsp.TextDocumentIdentifier; };
    };
    "textDocument/rename": Request<typeof lsp.RenameRequest.type>;
    "textDocument/prepareRename": Request<typeof lsp.PrepareRenameRequest.type>;
    "textDocument/formatting": Request<typeof lsp.DocumentFormattingRequest.type>;
    "textDocument/rangeFormatting": Request<typeof lsp.DocumentRangeFormattingRequest.type>;
    "textDocument/onTypeFormatting": Request<typeof lsp.DocumentOnTypeFormattingRequest.type>;
    "textDocument/selectionRange": Request<typeof lsp.SelectionRangeRequest.type>;
    "textDocument/foldingRange": Request<typeof lsp.FoldingRangeRequest.type>;
    "textDocument/inlayHint": Request<typeof lsp.InlayHintRequest.type>;
    "textDocument/codeAction": Request<typeof lsp.CodeActionRequest.type>;
    "textDocument/codeLens": Request<typeof lsp.CodeLensRequest.type>;
    "codeLens/resolve": Request<typeof lsp.CodeLensResolveRequest.type>;
    "textDocument/prepareCallHierarchy": Request<typeof lsp.CallHierarchyPrepareRequest.type>;
    "callHierarchy/incomingCalls": Request<typeof lsp.CallHierarchyIncomingCallsRequest.type>;
    "callHierarchy/outgoingCalls": Request<typeof lsp.CallHierarchyOutgoingCallsRequest.type>;
    "textDocument/linkedEditingRange": Request<typeof lsp.LinkedEditingRangeRequest.type>;
    "textDocument/semanticTokens/full": Request<typeof lsp.SemanticTokensRequest.type>;
    "textDocument/semanticTokens/range": Request<typeof lsp.SemanticTokensRangeRequest.type>;
    "textDocument/diagnostic": Request<typeof lsp.DocumentDiagnosticRequest.type>;
    "custom/textDocument/sourceDefinition": {
        params: lsp.TextDocumentPositionParams;
        result: lsp.Location | lsp.Location[] | lsp.LocationLink[] | null;
    };
    "custom/textDocument/multiDocumentHighlight": {
        params: MultiDocumentHighlightParams;
        result: MultiDocumentHighlight[] | null;
    };
    "textDocument/_vs_onAutoInsert": { params: AutoInsertParams; result: AutoInsertResult | null; };
    "textDocument/_vs_references": { params: lsp.ReferenceParams; result: VSReferenceItem[] | null; };
}

export type LspMiddlewareMethod = keyof LspMiddlewareRequests;

export type DeepReadonly<T> = unknown extends T ? unknown : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]>; } : T;

export type LspMiddlewareResult<M extends LspMiddlewareMethod> = LspMiddlewareRequests[M]["result"];

export type LspMiddlewareContext<M extends LspMiddlewareMethod> = { readonly params: DeepReadonly<LspMiddlewareRequests[M]["params"]>; };

export type LspMiddlewareTransformer<M extends LspMiddlewareMethod> = (
    result: LspMiddlewareResult<M>,
    context: LspMiddlewareContext<M>,
) => LspMiddlewareResult<M> | PromiseLike<LspMiddlewareResult<M>>;

export interface ExtensionAPI {
    onLanguageServerInitialized: vscode.Event<void>;
    initializeAPIConnection(pipe?: string): Promise<string>;
    registerContentMappers(contributorId: string, contributions: readonly ContentMapperContribution[]): vscode.Disposable;

    /**
     * Changes an LSP language-feature response before conversion to VS Code objects.
     * Request parameters are provided as a frozen copy.
     *
     * Callbacks run in registration order. Order between extensions may vary.
     * If a callback fails, we log the error and use the original server response.
     *
     * Registrations survive server restarts. Disposing removes the callback from
     * future responses but does not interrupt a response already being processed.
     *
     * Requests, notifications, lifecycle messages, and partial results are excluded.
     */
    registerLspMiddleware<M extends LspMiddlewareMethod>(
        method: M,
        transformer: LspMiddlewareTransformer<NoInfer<M>>,
    ): vscode.Disposable;
}
