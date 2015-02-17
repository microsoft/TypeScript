/// <reference path="session.ts" />

module ts.server {

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
        private lastCompletionEntry: CompletionEntry;
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

        private lineColToPosition(fileName: string, lineCol: ts.server.protocol.LineCol): number {
            return ts.computePositionFromLineAndCharacter(this.getLineMap(fileName), lineCol.line, lineCol.col);
        }

        private positionToOneBasedLineCol(fileName: string, position: number): ts.server.protocol.LineCol {
            var lineCol = ts.computeLineAndCharacterOfPosition(this.getLineMap(fileName), position);
            return {
                line: lineCol.line,
                col: lineCol.character
            };
        }

        private convertCodeEditsToTextChange(fileName: string, codeEdit: ts.server.protocol.CodeEdit): ts.TextChange {
            var start = this.lineColToPosition(fileName, codeEdit.start);
            var end = this.lineColToPosition(fileName, codeEdit.end);

            return {
                span: ts.createTextSpanFromBounds(start, end),
                newText: codeEdit.newText
            };
        }

        private processRequest<T extends ts.server.protocol.Request>(command: string, arguments?: any): T {
            var request: ts.server.protocol.Request = {
                seq: this.sequence++,
                type: "request",
                command: command,
                arguments: arguments
            };

            this.writeMessage(JSON.stringify(request));

            return <T>request;
        }

        private processResponse<T extends ts.server.protocol.Response>(request: ts.server.protocol.Request): T {
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
                throw new Error("Malformed response: Failed to parse server response: " + lastMessage + ". \r\n  Error detailes: " + e.message);
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

        openFile(fileName: string): void {
            var args: ts.server.protocol.FileRequestArgs = { file: fileName };
            this.processRequest(CommandNames.Open, args);
        }

        closeFile(fileName: string): void {
            var args: ts.server.protocol.FileRequestArgs = { file: fileName };
            this.processRequest(CommandNames.Close, args);
        }

        changeFile(fileName: string, start: number, end: number, newText: string): void {
            // clear the line map after an edit
            this.lineMaps[fileName] = undefined;

            var lineCol = this.positionToOneBasedLineCol(fileName, start);
            var args: ts.server.protocol.ChangeRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
                insertLen: end - start,
                deleteLen: end - start,
                insertString: newText
            };

            this.processRequest(CommandNames.Change, args);
        }

        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var args: ts.server.protocol.CodeLocationRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col
            };

            var request = this.processRequest<ts.server.protocol.QuickInfoRequest>(CommandNames.Quickinfo, args);
            var response = this.processResponse<ts.server.protocol.QuickInfoResponse>(request);

            var start = this.lineColToPosition(fileName, response.body.start);
            var end = this.lineColToPosition(fileName, response.body.end);

            return {
                kind: response.body.kind,
                kindModifiers: response.body.kindModifiers,
                textSpan: ts.createTextSpanFromBounds(start, end),
                displayParts: [{ kind: "text", text: response.body.displayString }],
                documentation: [{ kind: "text", text: response.body.documentation }]
            };
        }

        getCompletionsAtPosition(fileName: string, position: number): CompletionInfo {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var args: ts.server.protocol.CompletionsRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
                prefix: undefined
            };

            var request = this.processRequest<ts.server.protocol.CompletionsRequest>(CommandNames.Completions, args);
            var response = this.processResponse<ts.server.protocol.CompletionsResponse>(request);

            return this.lastCompletionEntry = {
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: response.body.map(entry => ({
                    kind: entry.kind,
                    kindModifiers: entry.kindModifiers,
                    name: entry.name,
                    displayParts: entry.displayParts,
                    documentation: entry.documentation
                })),
                fileName: fileName,
                position: position
            };
        }

        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails {
             if (!this.lastCompletionEntry || this.lastCompletionEntry.fileName !== fileName || this.lastCompletionEntry.position !== position) { 
                this.getCompletionsAtPosition(fileName, position);
            }

            return <CompletionEntryDetails>this.lastCompletionEntry.entries.filter(entry => entry.name === entryName)[0];
        }

        getNavigateToItems(searchTerm: string): NavigateToItem[] {
            var args: ts.server.protocol.NavtoRequestArgs = {
                searchTerm,
                file: this.host.getScriptFileNames()[0]
            };

            var request = this.processRequest<ts.server.protocol.NavtoRequest>(CommandNames.Navto, args);
            var response = this.processResponse<ts.server.protocol.NavtoResponse>(request);

            return response.body.map(entry => {
                var fileName = entry.file;
                var start = this.lineColToPosition(fileName, entry.start);
                var end = this.lineColToPosition(fileName, entry.end);
                
                return {
                    name: entry.name,
                    containerName: entry.containerName || "",
                    containerKind: entry.containerKind || "",
                    kind: entry.kind,
                    kindModifiers: entry.kindModifiers,
                    matchKind: entry.matchKind,
                    fileName: fileName,
                    textSpan: ts.createTextSpanFromBounds(start, end)
                };
            });
        }

        getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): ts.TextChange[] {
            var startLineCol = this.positionToOneBasedLineCol(fileName, start);
            var endLineCol = this.positionToOneBasedLineCol(fileName, end);
            var args: ts.server.protocol.FormatRequestArgs = {
                file: fileName,
                line: startLineCol.line,
                col: startLineCol.col,
                endLine: endLineCol.line,
                endCol: endLineCol.col,
            };

            // TODO: handle FormatCodeOptions
            var request = this.processRequest<ts.server.protocol.FormatRequest>(CommandNames.Format, args);
            var response = this.processResponse<ts.server.protocol.FormatResponse>(request);

            return response.body.map(entry=> this.convertCodeEditsToTextChange(fileName, entry));
        }

        getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): ts.TextChange[] {
            return this.getFormattingEditsForRange(fileName, 0, this.host.getScriptSnapshot(fileName).getLength(), options);
        }

        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): ts.TextChange[] {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var args: ts.server.protocol.FormatOnKeyRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
                key: key
            };

            // TODO: handle FormatCodeOptions
            var request = this.processRequest<ts.server.protocol.FormatOnKeyRequest>(CommandNames.Formatonkey, args);
            var response = this.processResponse<ts.server.protocol.FormatResponse>(request);

            return response.body.map(entry=> this.convertCodeEditsToTextChange(fileName, entry));
        }

        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var args: ts.server.protocol.CodeLocationRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
            };

            var request = this.processRequest<ts.server.protocol.DefinitionRequest>(CommandNames.Definition, args);
            var response = this.processResponse<ts.server.protocol.DefinitionResponse>(request);

            return response.body.map(entry => {
                var fileName = entry.file;
                var start = this.lineColToPosition(fileName, entry.start);
                var end = this.lineColToPosition(fileName, entry.end);
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

        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var args: ts.server.protocol.CodeLocationRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
            };

            var request = this.processRequest<ts.server.protocol.ReferencesRequest>(CommandNames.References, args);
            var response = this.processResponse<ts.server.protocol.ReferencesResponse>(request);

            return response.body.refs.map(entry => {
                var fileName = entry.file;
                var start = this.lineColToPosition(fileName, entry.start);
                var end = this.lineColToPosition(fileName, entry.end);
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
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var args: ts.server.protocol.RenameRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
                findInStrings,
                findInComments
            };

            var request = this.processRequest<ts.server.protocol.RenameRequest>(CommandNames.Rename, args);
            var response = this.processResponse<ts.server.protocol.RenameResponse>(request);

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
                locations: response.body.locs.map((entry) => {
                    var fileName = entry.file;
                    var start = this.lineColToPosition(fileName, entry.start);
                    var end = this.lineColToPosition(fileName, entry.end);
                    return {
                        textSpan: ts.createTextSpanFromBounds(start, end),
                        fileName: fileName
                    };
                })
            };
        }

        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[] {
            if (!this.lastRenameEntry ||
                this.lastRenameEntry.fileName !== fileName ||
                this.lastRenameEntry.position !== position ||
                this.lastRenameEntry.findInStrings != findInStrings ||
                this.lastRenameEntry.findInComments != findInComments) {
                this.getRenameInfo(fileName, position, findInStrings, findInComments);
            }

            return this.lastRenameEntry.locations;
        }

        decodeNavigationBarItems(items: ts.server.protocol.NavigationBarItem[], fileName: string): NavigationBarItem[] {
            if (!items) {
                return [];
            }

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers || "",
                spans: item.spans.map(span=> createTextSpanFromBounds(this.lineColToPosition(fileName, span.start), this.lineColToPosition(fileName, span.end))),
                childItems: this.decodeNavigationBarItems(item.childItems, fileName),
                indent: 0,
                bolded: false,
                grayed: false
            }));
        }

        getNavigationBarItems(fileName: string): NavigationBarItem[] {
            var args: ts.server.protocol.FileRequestArgs = {
                file: fileName
            };

            var request = this.processRequest<ts.server.protocol.NavBarRequest>(CommandNames.NavBar, args);
            var response = this.processResponse<ts.server.protocol.NavBarResponse>(request);

            return this.decodeNavigationBarItems(response.body, fileName);
        }

        getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan {
            throw new Error("Not Implemented Yet.");
        }

        getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan {
            throw new Error("Not Implemented Yet.");
        }

        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems {
            throw new Error("Not Implemented Yet.");
        }

        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            throw new Error("Not Implemented Yet.");
        }

        getOutliningSpans(fileName: string): OutliningSpan[] {
            throw new Error("Not Implemented Yet.");
        }

        getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[] {
            throw new Error("Not Implemented Yet.");
        }

        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[] {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var args: ts.server.protocol.CodeLocationRequestArgs = {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
            };

            var request = this.processRequest<ts.server.protocol.BraceRequest>(CommandNames.Brace, args);
            var response = this.processResponse<ts.server.protocol.BraceResponse>(request);

            return response.body.map(entry => {
                var start = this.lineColToPosition(fileName, entry.start);
                var end = this.lineColToPosition(fileName, entry.end);
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
