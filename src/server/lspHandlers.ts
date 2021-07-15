/*@internal*/
namespace ts.server.lsp {
    const inMemoryResourcePrefix = "^";

    export function parseMessage(message: Message): RequestMessage | NotificationMessage {
        return message as RequestMessage;
    }

    export function getCommandFromRequest(request: RequestMessage | NotificationMessage) {
        return request.method;
    }

    export function getSeqFromRequest(request: (RequestMessage | NotificationMessage) & { id?: null | number | string }) {
        if (!hasProperty(request, "id")) {
            return -1; // TODO: will the language server choke on this?
        }

        if (request.id === null) { // eslint-disable-line no-null/no-null
            return -1; // TODO: should never happen, allowable by JSONRPC but not LSP
        }

        if (typeof request.id === "number") {
            return request.id;
        }

        return Number(request.id);
    }

    export function toStringMessage(message: RequestMessage) {
        return JSON.stringify(message);
    }

    export interface SessionMethods {
        requiredResponse(response: {} | undefined): HandlerResponse,
        notRequired(): HandlerResponse,
        exit(): never,
        openClientFile(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: NormalizedPath): void,
        change(filePath: string, line: number, offset: number, endLine: number, endOffset: number, insertString: string | undefined): void,
        projectService: ProjectService,
        getQuickInfoWorker(args: protocol.FileLocationRequestArgs, simplifiedResult: boolean): protocol.QuickInfoResponseBody | QuickInfo | undefined,
        getSignatureHelpItems(args: protocol.SignatureHelpRequestArgs, simplifiedResult: boolean): protocol.SignatureHelpItems | SignatureHelpItems | undefined,
    }

    export function getHandlers(session: SessionMethods) {
        return new Map(
            getEntries<
                (
                    request: RequestMessage | NotificationMessage
                ) => HandlerResponse
            >({
                // General messages
                [Methods.Initialize]: (request: InitializeRequest) =>
                    session.requiredResponse(getInitializeResult(request.params)),
                [Methods.Initialized]: (
                    _request: InitializedNotification
                ) => session.notRequired(),
                [Methods.Shutdown]: (
                    _request: RequestMessage & { params: never }
                ) => session.requiredResponse(/*response*/ undefined),
                [Methods.Exit]: (
                    _request: NotificationMessage & { params: never }
                ) => session.exit(),

                // Text synchronization messages
                [Methods.DidOpen]: (
                    request: DidOpenTextDocumentNotification
                ) => {
                    const filePath = textDocumentToNormalizedPath(
                        request.params.textDocument.uri
                    );
                    const scriptKind =
                        mode2ScriptKind(
                            request.params.textDocument.languageId
                        ) ?? "JS";
                    session.openClientFile(
                        filePath,
                        request.params.textDocument.text,
                        convertScriptKindName(scriptKind),
                        /*projectRootPath*/ undefined // TODO - workspace folders
                    );
                    return session.notRequired();
                },
                [Methods.DidChange]: (
                    request: DidChangeTextDocumentNotification
                ) => {
                    const filePath = textDocumentToNormalizedPath(
                        request.params.textDocument.uri
                    );
                    for (const contentChange of request.params.contentChanges) {
                        if ("range" in contentChange) { // eslint-disable-line no-in-operator
                            const { line, offset } =
                                getLineAndOffsetFromPosition(
                                    contentChange.range.start
                                );
                            const { line: endLine, offset: endOffset } =
                                getLineAndOffsetFromPosition(
                                    contentChange.range.end
                                );
                            session.change(
                                filePath,
                                line,
                                offset,
                                endLine,
                                endOffset,
                                contentChange.text
                            );
                        }
                        else {
                            // replace whole file
                            const scriptInfo =
                                session.projectService.getScriptInfo(filePath)!;
                            Debug.assert(!!scriptInfo);
                            scriptInfo.open(contentChange.text);
                        }
                    }
                    return session.notRequired();
                },
                [Methods.DidClose]: (
                    _request: DidCloseTextDocumentNotification
                ) => {
                    return session.notRequired();
                },

                // Language features
                [Methods.Hover]: (request: HoverRequest) => {
                    const filePath = textDocumentToNormalizedPath(
                        request.params.textDocument.uri
                    );
                    const { line, offset } = getLineAndOffsetFromPosition(
                        request.params.position
                    );
                    const quickInfo = session.getQuickInfoWorker(
                        { file: filePath, line, offset },
                        /*simplifiedResult*/ true
                    ) as protocol.QuickInfoResponseBody;
                    if (!quickInfo) {
                        return session.requiredResponse(/*response*/ undefined);
                    }

                    const parts: MarkedString[] = [];
                    parts.push({
                        language: "typescript",
                        value: quickInfo.displayString,
                    });
                    parts.push(
                        markdownDocumentation(
                            quickInfo.documentation,
                            quickInfo.tags
                        ).value
                    );

                    //todo: documentation and tags
                    const range: Range = {
                        start: getLspPositionFromLocation(quickInfo.start),
                        end: getLspPositionFromLocation(quickInfo.end),
                    };
                    const result: Hover = { contents: parts, range };
                    return session.requiredResponse(result);
                },
                [Methods.SignatureHelp]: (
                    request: SignatureHelpRequest
                ) => {
                    const filePath = textDocumentToNormalizedPath(
                        request.params.textDocument.uri
                    );
                    const { line, offset } = getLineAndOffsetFromPosition(
                        request.params.position
                    );
                    const triggerReason = toTsTriggerReason(
                        request.params.context
                    );
                    const info = session.getSignatureHelpItems(
                        { file: filePath, line, offset, triggerReason },
                        /*simplifiedResult*/ true
                    ) as protocol.SignatureHelpItems; // cast is true due to simplified result
                    if (!info) {
                        return session.requiredResponse(/*response*/ undefined);
                    }
                    const signatures = info.items.map(convertSignature);
                    const activeSignature = getActiveSignature(
                        request.params.context,
                        info,
                        signatures
                    );
                    const activeParameter = getActiveParameter(info);
                    const result: SignatureHelp = {
                        signatures,
                        activeSignature,
                        activeParameter,
                    };
                    return session.requiredResponse(result);
                },
            })
        );
    }

    enum LanguageModeIds {
        typescript = "typescript",
        typescriptreact = "typescriptreact",
        javascript = "javascript",
        javascriptreact = "javascriptreact",
    }

    function mode2ScriptKind(
        mode: string
    ): "TS" | "TSX" | "JS" | "JSX" | undefined {
        switch (mode) {
            case LanguageModeIds.typescript:
                return "TS";
            case LanguageModeIds.typescriptreact:
                return "TSX";
            case LanguageModeIds.javascript:
                return "JS";
            case LanguageModeIds.javascriptreact:
                return "JSX";
        }
        return undefined;
    }

    function getLineAndOffsetFromPosition(position: Position) {
        // TS assumes the client is 1-based
        return { line: position.line + 1, offset: position.character + 1 };
    }

    function getLspPositionFromLocation(
        location: protocol.Location
    ): Position {
        return {
            line: Math.max(0, location.line - 1),
            character: Math.max(0, location.offset - 1),
        };
    }

    function textDocumentToNormalizedPath(textDocument: DocumentUri) {
        const documentUri = uri.URI.parse(textDocument);

        let path;
        switch (documentUri.scheme) {
            case "file":
                path = documentUri.path;
                break;
            default:
                path = inMemoryResourcePrefix + documentUri.toString(/*skipEncoding*/ true);
                break;
        }

        return normalizePath(path) as NormalizedPath;
    }

    function getInitializeResult(
        _request: InitializeParams
    ): InitializeResult {
        return {
            capabilities: {
                textDocumentSync: TextDocumentSyncKind.Incremental,
                hoverProvider: true,
                signatureHelpProvider: {
                    triggerCharacters: ["(", ",", "<"],
                    retriggerCharacters: [")"],
                },
            },
        };
    }

    function toTsTriggerReason(context: SignatureHelpContext | undefined): protocol.SignatureHelpTriggerReason | undefined {
        if (!context) {
            return undefined;
        }

        switch (context.triggerKind) {
            case SignatureHelpTriggerKind.TriggerCharacter:
                if (context.triggerCharacter) {
                    if (context.isRetrigger) {
                        return { kind: "retrigger", triggerCharacter: context.triggerCharacter as any };
                    }

                    return { kind: "characterTyped", triggerCharacter: context.triggerCharacter as any };
                }

                return { kind: "invoked" };
            case SignatureHelpTriggerKind.ContentChange:
                return context.isRetrigger ? { kind: "retrigger" } : { kind: "invoked" };
            case SignatureHelpTriggerKind.Invoked:
            default:
                return { kind: "invoked" };
        }
    }

    function convertSignature(item: protocol.SignatureHelpItem): SignatureInformation {
        const signature: SignatureInformation = {
            label: plain(item.prefixDisplayParts),
            documentation: markdownDocumentation(item.documentation, item.tags.filter(x => x.name !== "param")),
        };
        let textIndex = signature.label.length;
        const separatorLabel = plain(item.separatorDisplayParts);
        const parameters: ParameterInformation[] = [];
        for (let i = 0; i < item.parameters.length; i++) {
            const parameter = item.parameters[i];
            const label = plain(parameter.displayParts);
            const parameterInfo: ParameterInformation = {
                label: [textIndex, textIndex + label.length],
                documentation: markdownDocumentation(parameter.documentation, []),
            };
            parameters.push(parameterInfo);

            textIndex += label.length;
            signature.label += label;

            if (i !== item.parameters.length - 1) {
                signature.label += separatorLabel;
                textIndex += separatorLabel.length;
            }
        }

        signature.parameters = parameters;
        signature.label += plain(item.suffixDisplayParts);
        return signature;
    }

    function getActiveParameter(info: protocol.SignatureHelpItems): number {
        const activeSignature = info.items[info.selectedItemIndex];
        if (activeSignature && activeSignature.isVariadic) {
            return Math.min(info.argumentIndex, activeSignature.parameters.length - 1);
        }
        return info.argumentIndex;
    }

    function getActiveSignature(context: SignatureHelpContext | undefined, info: protocol.SignatureHelpItems, signatures: readonly SignatureInformation[]): number {
        if (!context?.activeSignatureHelp?.activeSignature) {
            return info.selectedItemIndex;
        }

        // Try matching the previous active signature's label to keep it selected
        const previouslyActiveSignature = context.activeSignatureHelp.signatures[context.activeSignatureHelp.activeSignature];
        if (previouslyActiveSignature && context.isRetrigger) {
            const existingIndex = signatures.findIndex(other => other.label === previouslyActiveSignature?.label);
            if (existingIndex >= 0) {
                return existingIndex;
            }
        }

        return info.selectedItemIndex;
    }
}
