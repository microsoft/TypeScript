/// <reference path="session.ts" />

namespace ts.server {

    export interface SessionClientHost extends LanguageServiceHost {
        writeMessage(message: string): void;
    }

    interface CompletionEntry extends CompletionInfo {
        fileName: string;
        position: number;
    }

    interface RenameEntry extends RenameInfo {
        fileName: string;
        position: number;
        locations: RenameLocation[];
        findInStrings: boolean;
        findInComments: boolean;
    }

    export class SessionClient implements LanguageService {
        private sequence: number = 0;
        private lineMaps: ts.Map<number[]> = ts.createMap<number[]>();
        private messages: string[] = [];
        private lastRenameEntry: RenameEntry;

        constructor(private host: SessionClientHost) {
        }

        public onMessage(message: string): void {
            this.messages.push(message);
        }

        private writeMessage(message: string): void {
            this.host.writeMessage(message);
        }

        private getLineMap(fileName: string): number[] {
            let lineMap = this.lineMaps[fileName];
            if (!lineMap) {
                const scriptSnapshot = this.host.getScriptSnapshot(fileName);
                lineMap = this.lineMaps[fileName] = ts.computeLineStarts(scriptSnapshot.getText(0, scriptSnapshot.getLength()));
            }
            return lineMap;
        }

        private lineOffsetToPosition(fileName: string, lineOffset: protocol.Location, lineMap?: number[]): number {
            lineMap = lineMap || this.getLineMap(fileName);
            return ts.computePositionOfLineAndCharacter(lineMap, lineOffset.line - 1, lineOffset.offset - 1);
        }

        private positionToOneBasedLineOffset(fileName: string, position: number): protocol.Location {
            const lineOffset = ts.computeLineAndCharacterOfPosition(this.getLineMap(fileName), position);
            return {
                line: lineOffset.line + 1,
                offset: lineOffset.character + 1
            };
        }

        private convertCodeEditsToTextChange(fileName: string, codeEdit: protocol.CodeEdit): ts.TextChange {
            const start = this.lineOffsetToPosition(fileName, codeEdit.start);
            const end = this.lineOffsetToPosition(fileName, codeEdit.end);

            return {
                span: ts.createTextSpanFromBounds(start, end),
                newText: codeEdit.newText
            };
        }

        private processRequest<T extends protocol.Request>(command: string, args?: any): T {
            const request: protocol.Request = {
                seq: this.sequence,
                type: "request",
                arguments: args,
                command
            };
            this.sequence++;

            this.writeMessage(JSON.stringify(request));

            return <T>request;
        }

        private processResponse<T extends protocol.Response>(request: protocol.Request): T {
            let foundResponseMessage = false;
            let lastMessage: string;
            let response: T;
            while (!foundResponseMessage) {
                lastMessage = this.messages.shift();
                Debug.assert(!!lastMessage, "Did not receive any responses.");
                const responseBody = processMessage(lastMessage);
                try {
                    response = JSON.parse(responseBody);
                    // the server may emit events before emitting the response. We
                    // want to ignore these events for testing purpose.
                    if (response.type === "response") {
                        foundResponseMessage = true;
                    }
                }
                catch (e) {
                    throw new Error("Malformed response: Failed to parse server response: " + lastMessage + ". \r\n  Error details: " + e.message);
                }
            }

            // verify the sequence numbers
            Debug.assert(response.request_seq === request.seq, "Malformed response: response sequence number did not match request sequence number.");

            // unmarshal errors
            if (!response.success) {
                throw new Error("Error " + response.message);
            }

            Debug.assert(!!response.body, "Malformed response: Unexpected empty response body.");

            return response;

            function processMessage(message: string) {
                // Read the content length
                const contentLengthPrefix = "Content-Length: ";
                const lines = message.split("\r\n");
                Debug.assert(lines.length >= 2, "Malformed response: Expected 3 lines in the response.");

                const contentLengthText = lines[0];
                Debug.assert(contentLengthText.indexOf(contentLengthPrefix) === 0, "Malformed response: Response text did not contain content-length header.");
                const contentLength = parseInt(contentLengthText.substring(contentLengthPrefix.length));

                // Read the body
                const responseBody = lines[2];

                // Verify content length
                Debug.assert(responseBody.length + 1 === contentLength, "Malformed response: Content length did not match the response's body length.");
                return responseBody;
            }
        }

        openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void {
            const args: protocol.OpenRequestArgs = { file: fileName, fileContent: content, scriptKindName };
            this.processRequest(CommandNames.Open, args);
        }

        closeFile(fileName: string): void {
            const args: protocol.FileRequestArgs = { file: fileName };
            this.processRequest(CommandNames.Close, args);
        }

        changeFile(fileName: string, start: number, end: number, newText: string): void {
            // clear the line map after an edit
            this.lineMaps[fileName] = undefined;

            const lineOffset = this.positionToOneBasedLineOffset(fileName, start);
            const endLineOffset = this.positionToOneBasedLineOffset(fileName, end);

            const args: protocol.ChangeRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                endLine: endLineOffset.line,
                endOffset: endLineOffset.offset,
                insertString: newText
            };

            this.processRequest(CommandNames.Change, args);
        }

        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset
            };

            const request = this.processRequest<protocol.QuickInfoRequest>(CommandNames.Quickinfo, args);
            const response = this.processResponse<protocol.QuickInfoResponse>(request);

            const start = this.lineOffsetToPosition(fileName, response.body.start);
            const end = this.lineOffsetToPosition(fileName, response.body.end);

            return {
                kind: response.body.kind,
                kindModifiers: response.body.kindModifiers,
                textSpan: ts.createTextSpanFromBounds(start, end),
                displayParts: [{ kind: "text", text: response.body.displayString }],
                documentation: [{ kind: "text", text: response.body.documentation }]
            };
        }

        getProjectInfo(fileName: string, needFileNameList: boolean): protocol.ProjectInfo {
            const args: protocol.ProjectInfoRequestArgs = {
                file: fileName,
                needFileNameList: needFileNameList
            };

            const request = this.processRequest<protocol.ProjectInfoRequest>(CommandNames.ProjectInfo, args);
            const response = this.processResponse<protocol.ProjectInfoResponse>(request);

            return {
                configFileName: response.body.configFileName,
                fileNames: response.body.fileNames
            };
        }

        getCompletionsAtPosition(fileName: string, position: number): CompletionInfo {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.CompletionsRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                prefix: undefined
            };

            const request = this.processRequest<protocol.CompletionsRequest>(CommandNames.Completions, args);
            const response = this.processResponse<protocol.CompletionsResponse>(request);

            return {
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: response.body
            };
        }

        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.CompletionDetailsRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                entryNames: [entryName]
            };

            const request = this.processRequest<protocol.CompletionDetailsRequest>(CommandNames.CompletionDetails, args);
            const response = this.processResponse<protocol.CompletionDetailsResponse>(request);
            Debug.assert(response.body.length === 1, "Unexpected length of completion details response body.");
            return response.body[0];
        }

        getNavigateToItems(searchValue: string): NavigateToItem[] {
            const args: protocol.NavtoRequestArgs = {
                searchValue,
                file: this.host.getScriptFileNames()[0]
            };

            const request = this.processRequest<protocol.NavtoRequest>(CommandNames.Navto, args);
            const response = this.processResponse<protocol.NavtoResponse>(request);

            return response.body.map(entry => {
                const fileName = entry.file;
                const start = this.lineOffsetToPosition(fileName, entry.start);
                const end = this.lineOffsetToPosition(fileName, entry.end);

                return {
                    name: entry.name,
                    containerName: entry.containerName || "",
                    containerKind: entry.containerKind || "",
                    kind: entry.kind,
                    kindModifiers: entry.kindModifiers,
                    matchKind: entry.matchKind,
                    isCaseSensitive: entry.isCaseSensitive,
                    fileName: fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end)
                };
            });
        }

        getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): ts.TextChange[] {
            const startLineOffset = this.positionToOneBasedLineOffset(fileName, start);
            const endLineOffset = this.positionToOneBasedLineOffset(fileName, end);
            const args: protocol.FormatRequestArgs = {
                file: fileName,
                line: startLineOffset.line,
                offset: startLineOffset.offset,
                endLine: endLineOffset.line,
                endOffset: endLineOffset.offset,
            };

            // TODO: handle FormatCodeOptions
            const request = this.processRequest<protocol.FormatRequest>(CommandNames.Format, args);
            const response = this.processResponse<protocol.FormatResponse>(request);

            return response.body.map(entry => this.convertCodeEditsToTextChange(fileName, entry));
        }

        getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): ts.TextChange[] {
            return this.getFormattingEditsForRange(fileName, 0, this.host.getScriptSnapshot(fileName).getLength(), options);
        }

        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): ts.TextChange[] {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.FormatOnKeyRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                key: key
            };

            // TODO: handle FormatCodeOptions
            const request = this.processRequest<protocol.FormatOnKeyRequest>(CommandNames.Formatonkey, args);
            const response = this.processResponse<protocol.FormatResponse>(request);

            return response.body.map(entry => this.convertCodeEditsToTextChange(fileName, entry));
        }

        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            const request = this.processRequest<protocol.DefinitionRequest>(CommandNames.Definition, args);
            const response = this.processResponse<protocol.DefinitionResponse>(request);

            return response.body.map(entry => {
                const fileName = entry.file;
                const start = this.lineOffsetToPosition(fileName, entry.start);
                const end = this.lineOffsetToPosition(fileName, entry.end);
                return {
                    containerKind: "",
                    containerName: "",
                    fileName: fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    kind: "",
                    name: ""
                };
            });
        }

        getTypeDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            const request = this.processRequest<protocol.TypeDefinitionRequest>(CommandNames.TypeDefinition, args);
            const response = this.processResponse<protocol.TypeDefinitionResponse>(request);

            return response.body.map(entry => {
                const fileName = entry.file;
                const start = this.lineOffsetToPosition(fileName, entry.start);
                const end = this.lineOffsetToPosition(fileName, entry.end);
                return {
                    containerKind: "",
                    containerName: "",
                    fileName: fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    kind: "",
                    name: ""
                };
            });
        }

        findReferences(fileName: string, position: number): ReferencedSymbol[] {
            // Not yet implemented.
            return [];
        }

        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            const request = this.processRequest<protocol.ReferencesRequest>(CommandNames.References, args);
            const response = this.processResponse<protocol.ReferencesResponse>(request);

            return response.body.refs.map(entry => {
                const fileName = entry.file;
                const start = this.lineOffsetToPosition(fileName, entry.start);
                const end = this.lineOffsetToPosition(fileName, entry.end);
                return {
                    fileName: fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    isWriteAccess: entry.isWriteAccess,
                    isDefinition: entry.isDefinition,
                };
            });
        }

        getEmitOutput(fileName: string): EmitOutput {
            throw new Error("Not Implemented Yet.");
        }

        getSyntacticDiagnostics(fileName: string): Diagnostic[] {
            throw new Error("Not Implemented Yet.");
        }

        getSemanticDiagnostics(fileName: string): Diagnostic[] {
            throw new Error("Not Implemented Yet.");
        }

        getCompilerOptionsDiagnostics(): Diagnostic[] {
            throw new Error("Not Implemented Yet.");
        }

        getRenameInfo(fileName: string, position: number, findInStrings?: boolean, findInComments?: boolean): RenameInfo {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.RenameRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                findInStrings,
                findInComments
            };

            const request = this.processRequest<protocol.RenameRequest>(CommandNames.Rename, args);
            const response = this.processResponse<protocol.RenameResponse>(request);
            const locations: RenameLocation[] = [];
            response.body.locs.map((entry: protocol.SpanGroup) => {
                const fileName = entry.file;
                entry.locs.map((loc: protocol.TextSpan) => {
                    const start = this.lineOffsetToPosition(fileName, loc.start);
                    const end = this.lineOffsetToPosition(fileName, loc.end);
                    locations.push({
                        textSpan: ts.createTextSpanFromBounds(start, end),
                        fileName: fileName
                    });
                });
            });
            return this.lastRenameEntry = {
                canRename: response.body.info.canRename,
                displayName: response.body.info.displayName,
                fullDisplayName: response.body.info.fullDisplayName,
                kind: response.body.info.kind,
                kindModifiers: response.body.info.kindModifiers,
                localizedErrorMessage: response.body.info.localizedErrorMessage,
                triggerSpan: ts.createTextSpanFromBounds(position, position),
                fileName: fileName,
                position: position,
                findInStrings: findInStrings,
                findInComments: findInComments,
                locations: locations
            };
        }

        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[] {
            if (!this.lastRenameEntry ||
                this.lastRenameEntry.fileName !== fileName ||
                this.lastRenameEntry.position !== position ||
                this.lastRenameEntry.findInStrings !== findInStrings ||
                this.lastRenameEntry.findInComments !== findInComments) {
                this.getRenameInfo(fileName, position, findInStrings, findInComments);
            }

            return this.lastRenameEntry.locations;
        }

        decodeNavigationBarItems(items: protocol.NavigationBarItem[], fileName: string, lineMap: number[]): NavigationBarItem[] {
            if (!items) {
                return [];
            }

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers || "",
                spans: item.spans.map(span =>
                    createTextSpanFromBounds(
                        this.lineOffsetToPosition(fileName, span.start, lineMap),
                        this.lineOffsetToPosition(fileName, span.end, lineMap))),
                childItems: this.decodeNavigationBarItems(item.childItems, fileName, lineMap),
                indent: item.indent,
                bolded: false,
                grayed: false
            }));
        }

        getNavigationBarItems(fileName: string): NavigationBarItem[] {
            const args: protocol.FileRequestArgs = {
                file: fileName
            };

            const request = this.processRequest<protocol.NavBarRequest>(CommandNames.NavBar, args);
            const response = this.processResponse<protocol.NavBarResponse>(request);

            const lineMap = this.getLineMap(fileName);
            return this.decodeNavigationBarItems(response.body, fileName, lineMap);
        }

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan {
            throw new Error("Not Implemented Yet.");
        }

        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan {
            throw new Error("Not Implemented Yet.");
        }

        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.SignatureHelpRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset
            };

            const request = this.processRequest<protocol.SignatureHelpRequest>(CommandNames.SignatureHelp, args);
            const response = this.processResponse<protocol.SignatureHelpResponse>(request);

            if (!response.body) {
                return undefined;
            }

            const helpItems: protocol.SignatureHelpItems = response.body;
            const span = helpItems.applicableSpan;
            const start = this.lineOffsetToPosition(fileName, span.start);
            const end = this.lineOffsetToPosition(fileName, span.end);

            const result: SignatureHelpItems = {
                items: helpItems.items,
                applicableSpan: {
                    start: start,
                    length: end - start
                },
                selectedItemIndex: helpItems.selectedItemIndex,
                argumentIndex: helpItems.argumentIndex,
                argumentCount: helpItems.argumentCount,
            };
            return result;
        }

        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            const request = this.processRequest<protocol.OccurrencesRequest>(CommandNames.Occurrences, args);
            const response = this.processResponse<protocol.OccurrencesResponse>(request);

            return response.body.map(entry => {
                const fileName = entry.file;
                const start = this.lineOffsetToPosition(fileName, entry.start);
                const end = this.lineOffsetToPosition(fileName, entry.end);
                return {
                    fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    isWriteAccess: entry.isWriteAccess,
                    isDefinition: false
                };
            });
        }

        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] {
            const { line, offset } = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.DocumentHighlightsRequestArgs = { file: fileName, line, offset, filesToSearch };

            const request = this.processRequest<protocol.DocumentHighlightsRequest>(CommandNames.DocumentHighlights, args);
            const response = this.processResponse<protocol.DocumentHighlightsResponse>(request);

            const self = this;
            return response.body.map(convertToDocumentHighlights);

            function convertToDocumentHighlights(item: ts.server.protocol.DocumentHighlightsItem): ts.DocumentHighlights {
                const { file, highlightSpans } = item;

                return {
                    fileName: file,
                    highlightSpans: highlightSpans.map(convertHighlightSpan)
                };

                function convertHighlightSpan(span: ts.server.protocol.HighlightSpan): ts.HighlightSpan {
                    const start = self.lineOffsetToPosition(file, span.start);
                    const end = self.lineOffsetToPosition(file, span.end);
                    return {
                        textSpan: ts.createTextSpanFromBounds(start, end),
                        kind: span.kind
                    };
                }
            }
        }

        getOutliningSpans(fileName: string): OutliningSpan[] {
            throw new Error("Not Implemented Yet.");
        }

        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
            throw new Error("Not Implemented Yet.");
        }

        getDocCommentTemplateAtPosition(fileName: string, position: number): TextInsertion {
            throw new Error("Not Implemented Yet.");
        }

        isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean {
            throw new Error("Not Implemented Yet.");
        }

        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[] {
            const lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            const args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            const request = this.processRequest<protocol.BraceRequest>(CommandNames.Brace, args);
            const response = this.processResponse<protocol.BraceResponse>(request);

            return response.body.map(entry => {
                const start = this.lineOffsetToPosition(fileName, entry.start);
                const end = this.lineOffsetToPosition(fileName, entry.end);
                return {
                    start: start,
                    length: end - start,
                };
            });
        }

        getIndentationAtPosition(fileName: string, position: number, options: EditorOptions): number {
            throw new Error("Not Implemented Yet.");
        }

        getSyntacticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            throw new Error("Not Implemented Yet.");
        }

        getSemanticClassifications(fileName: string, span: TextSpan): ClassifiedSpan[] {
            throw new Error("Not Implemented Yet.");
        }

        getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Classifications {
            throw new Error("Not Implemented Yet.");
        }

        getEncodedSemanticClassifications(fileName: string, span: TextSpan): Classifications {
            throw new Error("Not Implemented Yet.");
        }

        getProgram(): Program {
            throw new Error("SourceFile objects are not serializable through the server protocol.");
        }

        getNonBoundSourceFile(fileName: string): SourceFile {
            throw new Error("SourceFile objects are not serializable through the server protocol.");
        }

        cleanupSemanticCache(): void {
            throw new Error("cleanupSemanticCache is not available through the server layer.");
        }

        dispose(): void {
            throw new Error("dispose is not available through the server layer.");
        }
    }
}
