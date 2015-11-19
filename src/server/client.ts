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
        private fileMapping: ts.Map<string> = {};
        private lineMaps: ts.Map<number[]> = {};
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
            var lineMap = ts.lookUp(this.lineMaps, fileName);
            if (!lineMap) {
                var scriptSnapshot = this.host.getScriptSnapshot(fileName);
                lineMap  = this.lineMaps[fileName] = ts.computeLineStarts(scriptSnapshot.getText(0, scriptSnapshot.getLength()));
            }
            return lineMap;
        }

        private lineOffsetToPosition(fileName: string, lineOffset: protocol.Location): number {
            return ts.computePositionOfLineAndCharacter(this.getLineMap(fileName), lineOffset.line - 1, lineOffset.offset - 1);
        }

        private positionToOneBasedLineOffset(fileName: string, position: number): protocol.Location {
            var lineOffset = ts.computeLineAndCharacterOfPosition(this.getLineMap(fileName), position);
            return {
                line: lineOffset.line + 1,
                offset: lineOffset.character + 1
            };
        }

        private convertCodeEditsToTextChange(fileName: string, codeEdit: protocol.CodeEdit): ts.TextChange {
            var start = this.lineOffsetToPosition(fileName, codeEdit.start);
            var end = this.lineOffsetToPosition(fileName, codeEdit.end);

            return {
                span: ts.createTextSpanFromBounds(start, end),
                newText: codeEdit.newText
            };
        }

        private processRequest<T extends protocol.Request>(command: string, args?: any): T {
            var request: protocol.Request = {
                seq: this.sequence++,
                type: "request",
                arguments: args,
                command
            };

            this.writeMessage(JSON.stringify(request));

            return <T>request;
        }

        private processResponse<T extends protocol.Response>(request: protocol.Request): T {
            var lastMessage = this.messages.shift();
            Debug.assert(!!lastMessage, "Did not recieve any responses.");

            // Read the content length
            var contentLengthPrefix = "Content-Length: ";
            var lines = lastMessage.split("\r\n");
            Debug.assert(lines.length >= 2, "Malformed response: Expected 3 lines in the response.");

            var contentLengthText = lines[0];
            Debug.assert(contentLengthText.indexOf(contentLengthPrefix) === 0, "Malformed response: Response text did not contain content-length header.");
            var contentLength = parseInt(contentLengthText.substring(contentLengthPrefix.length));

            // Read the body
            var responseBody = lines[2];

            // Verify content length
            Debug.assert(responseBody.length + 1 === contentLength, "Malformed response: Content length did not match the response's body length.");

            try {
                var response: T = JSON.parse(responseBody);
            }
            catch (e) {
                throw new Error("Malformed response: Failed to parse server response: " + lastMessage + ". \r\n  Error details: " + e.message);
            }

            // verify the sequence numbers
            Debug.assert(response.request_seq === request.seq, "Malformed response: response sequance number did not match request sequence number.");
            
            // unmarshal errors
            if (!response.success) {
                throw new Error("Error " + response.message);
            }

            Debug.assert(!!response.body, "Malformed response: Unexpected empty response body.");

            return response;
        }

        openFile(fileName: string, content?: string): void {
            var args: protocol.OpenRequestArgs = { file: fileName, fileContent: content };
            this.processRequest(CommandNames.Open, args);
        }

        closeFile(fileName: string): void {
            var args: protocol.FileRequestArgs = { file: fileName };
            this.processRequest(CommandNames.Close, args);
        }

        changeFile(fileName: string, start: number, end: number, newText: string): void {
            // clear the line map after an edit
            this.lineMaps[fileName] = undefined;

            var lineOffset = this.positionToOneBasedLineOffset(fileName, start);
            var endLineOffset = this.positionToOneBasedLineOffset(fileName, end);

            var args: protocol.ChangeRequestArgs = {
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
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset
            };

            var request = this.processRequest<protocol.QuickInfoRequest>(CommandNames.Quickinfo, args);
            var response = this.processResponse<protocol.QuickInfoResponse>(request);

            var start = this.lineOffsetToPosition(fileName, response.body.start);
            var end = this.lineOffsetToPosition(fileName, response.body.end);

            return {
                kind: response.body.kind,
                kindModifiers: response.body.kindModifiers,
                textSpan: ts.createTextSpanFromBounds(start, end),
                displayParts: [{ kind: "text", text: response.body.displayString }],
                documentation: [{ kind: "text", text: response.body.documentation }]
            };
        }

        getProjectInfo(fileName: string, needFileNameList: boolean): protocol.ProjectInfo {
            var args: protocol.ProjectInfoRequestArgs = {
                file: fileName,
                needFileNameList: needFileNameList
            };

            var request = this.processRequest<protocol.ProjectInfoRequest>(CommandNames.ProjectInfo, args);
            var response = this.processResponse<protocol.ProjectInfoResponse>(request);

            return {
                configFileName: response.body.configFileName,
                fileNames: response.body.fileNames
            };
        }
        
        getCompletionsAtPosition(fileName: string, position: number): CompletionInfo {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.CompletionsRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                prefix: undefined
            };

            var request = this.processRequest<protocol.CompletionsRequest>(CommandNames.Completions, args);
            var response = this.processResponse<protocol.CompletionsResponse>(request);

            return  {
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: response.body
            };
        }
     
        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.CompletionDetailsRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                entryNames: [entryName]
            };

            var request = this.processRequest<protocol.CompletionDetailsRequest>(CommandNames.CompletionDetails, args);
            var response = this.processResponse<protocol.CompletionDetailsResponse>(request);
            Debug.assert(response.body.length === 1, "Unexpected length of completion details response body.");
            return response.body[0];
        }

        getNavigateToItems(searchValue: string): NavigateToItem[] {
            var args: protocol.NavtoRequestArgs = {
                searchValue,
                file: this.host.getScriptFileNames()[0]
            };

            var request = this.processRequest<protocol.NavtoRequest>(CommandNames.Navto, args);
            var response = this.processResponse<protocol.NavtoResponse>(request);

            return response.body.map(entry => {
                var fileName = entry.file;
                var start = this.lineOffsetToPosition(fileName, entry.start);
                var end = this.lineOffsetToPosition(fileName, entry.end);
                
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
            var startLineOffset = this.positionToOneBasedLineOffset(fileName, start);
            var endLineOffset = this.positionToOneBasedLineOffset(fileName, end);
            var args: protocol.FormatRequestArgs = {
                file: fileName,
                line: startLineOffset.line,
                offset: startLineOffset.offset,
                endLine: endLineOffset.line,
                endOffset: endLineOffset.offset,
            };

            // TODO: handle FormatCodeOptions
            var request = this.processRequest<protocol.FormatRequest>(CommandNames.Format, args);
            var response = this.processResponse<protocol.FormatResponse>(request);

            return response.body.map(entry=> this.convertCodeEditsToTextChange(fileName, entry));
        }

        getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): ts.TextChange[] {
            return this.getFormattingEditsForRange(fileName, 0, this.host.getScriptSnapshot(fileName).getLength(), options);
        }

        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): ts.TextChange[] {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.FormatOnKeyRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                key: key
            };

            // TODO: handle FormatCodeOptions
            var request = this.processRequest<protocol.FormatOnKeyRequest>(CommandNames.Formatonkey, args);
            var response = this.processResponse<protocol.FormatResponse>(request);

            return response.body.map(entry=> this.convertCodeEditsToTextChange(fileName, entry));
        }

        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            var request = this.processRequest<protocol.DefinitionRequest>(CommandNames.Definition, args);
            var response = this.processResponse<protocol.DefinitionResponse>(request);

            return response.body.map(entry => {
                var fileName = entry.file;
                var start = this.lineOffsetToPosition(fileName, entry.start);
                var end = this.lineOffsetToPosition(fileName, entry.end);
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
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            var request = this.processRequest<protocol.TypeDefinitionRequest>(CommandNames.TypeDefinition, args);
            var response = this.processResponse<protocol.TypeDefinitionResponse>(request);

            return response.body.map(entry => {
                var fileName = entry.file;
                var start = this.lineOffsetToPosition(fileName, entry.start);
                var end = this.lineOffsetToPosition(fileName, entry.end);
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

        findReferences(fileName: string, position: number): ReferencedSymbol[]{
            // Not yet implemented.
            return [];
        }

        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            var request = this.processRequest<protocol.ReferencesRequest>(CommandNames.References, args);
            var response = this.processResponse<protocol.ReferencesResponse>(request);

            return response.body.refs.map(entry => {
                var fileName = entry.file;
                var start = this.lineOffsetToPosition(fileName, entry.start);
                var end = this.lineOffsetToPosition(fileName, entry.end);
                return {
                    fileName: fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    isWriteAccess: entry.isWriteAccess,
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
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.RenameRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
                findInStrings,
                findInComments
            };

            var request = this.processRequest<protocol.RenameRequest>(CommandNames.Rename, args);
            var response = this.processResponse<protocol.RenameResponse>(request);
            var locations: RenameLocation[] = [];
            response.body.locs.map((entry: protocol.SpanGroup) => {
                var fileName = entry.file;
                entry.locs.map((loc: protocol.TextSpan) => {
                    var start = this.lineOffsetToPosition(fileName, loc.start);
                    var end = this.lineOffsetToPosition(fileName, loc.end);
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

        decodeNavigationBarItems(items: protocol.NavigationBarItem[], fileName: string): NavigationBarItem[] {
            if (!items) {
                return [];
            }

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers || "",
                spans: item.spans.map(span=> createTextSpanFromBounds(this.lineOffsetToPosition(fileName, span.start), this.lineOffsetToPosition(fileName, span.end))),
                childItems: this.decodeNavigationBarItems(item.childItems, fileName),
                indent: 0,
                bolded: false,
                grayed: false
            }));
        }

        getNavigationBarItems(fileName: string): NavigationBarItem[] {
            var args: protocol.FileRequestArgs = {
                file: fileName
            };

            var request = this.processRequest<protocol.NavBarRequest>(CommandNames.NavBar, args);
            var response = this.processResponse<protocol.NavBarResponse>(request);

            return this.decodeNavigationBarItems(response.body, fileName);
        }

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan {
            throw new Error("Not Implemented Yet.");
        }

        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan {
            throw new Error("Not Implemented Yet.");
        }

        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.SignatureHelpRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset
            };
            
            var request = this.processRequest<protocol.SignatureHelpRequest>(CommandNames.SignatureHelp, args);
            var response = this.processResponse<protocol.SignatureHelpResponse>(request);
            
            if (!response.body) {
                return undefined;
            }

            var helpItems: protocol.SignatureHelpItems = response.body;
            var span = helpItems.applicableSpan;
            var start = this.lineOffsetToPosition(fileName, span.start);
            var end = this.lineOffsetToPosition(fileName, span.end);
            
            var result: SignatureHelpItems = {
                items: helpItems.items,
                applicableSpan: {
                    start: start,
                    length: end - start
                },
                selectedItemIndex: helpItems.selectedItemIndex,
                argumentIndex: helpItems.argumentIndex,
                argumentCount: helpItems.argumentCount,                
            }
            return result;
        }

        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            var request = this.processRequest<protocol.OccurrencesRequest>(CommandNames.Occurrences, args);
            var response = this.processResponse<protocol.OccurrencesResponse>(request);

            return response.body.map(entry => {
                var fileName = entry.file;
                var start = this.lineOffsetToPosition(fileName, entry.start);
                var end = this.lineOffsetToPosition(fileName, entry.end);
                return {
                    fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    isWriteAccess: entry.isWriteAccess,
                };
            });
        }

        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] {
            let { line, offset } = this.positionToOneBasedLineOffset(fileName, position);
            let args: protocol.DocumentHighlightsRequestArgs = { file: fileName, line, offset, filesToSearch };

            let request = this.processRequest<protocol.DocumentHighlightsRequest>(CommandNames.DocumentHighlights, args);
            let response = this.processResponse<protocol.DocumentHighlightsResponse>(request);

            let self = this;
            return response.body.map(convertToDocumentHighlights);

            function convertToDocumentHighlights(item: ts.server.protocol.DocumentHighlightsItem): ts.DocumentHighlights {
                let { file, highlightSpans } = item;

                return {
                    fileName: file,
                    highlightSpans: highlightSpans.map(convertHighlightSpan)
                };

                function convertHighlightSpan(span: ts.server.protocol.HighlightSpan): ts.HighlightSpan {
                    let start = self.lineOffsetToPosition(file, span.start);
                    let end = self.lineOffsetToPosition(file, span.end);
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

        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[] {
            var lineOffset = this.positionToOneBasedLineOffset(fileName, position);
            var args: protocol.FileLocationRequestArgs = {
                file: fileName,
                line: lineOffset.line,
                offset: lineOffset.offset,
            };

            var request = this.processRequest<protocol.BraceRequest>(CommandNames.Brace, args);
            var response = this.processResponse<protocol.BraceResponse>(request);

            return response.body.map(entry => {
                var start = this.lineOffsetToPosition(fileName, entry.start);
                var end = this.lineOffsetToPosition(fileName, entry.end);
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

        getSourceFile(fileName: string): SourceFile {
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
