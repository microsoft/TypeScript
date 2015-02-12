/// <reference path="protocol.ts" />

module ts.server {

    export interface SessionClientHost extends LanguageServiceHost {
        lineColToPosition(fileName: string, line: number, col: number): number;
        positionToZeroBasedLineCol(fileName: string, position: number): ts.LineAndCharacter;
    }

    class SessionClientHostProxy implements ServerHost, Logger  {
        args: string[] = [];
        newLine: string;
        useCaseSensitiveFileNames: boolean = false;
        lastReply: string;

        constructor(private host: SessionClientHost) {
            this.newLine = this.host.getNewLine();
        }

        write(message: string): void {
            this.lastReply = message;
        }

        readFile(fileName: string): string {
            var snapshot = this.host.getScriptSnapshot(fileName);
            return snapshot && snapshot.getText(0, snapshot.getLength());
        }

        writeFile(name: string, text:string, writeByteOrderMark: boolean): void {
        }

        resolvePath(path: string): string {
            return path;
        }

        fileExists(path: string): boolean {
            return !!this.host.getScriptSnapshot(path);
        }

        directoryExists(path: string): boolean {
            return false;
        }

        getExecutingFilePath(): string {
            return "";
        }

        exit(exitCode: number): void {
        }

        createDirectory(directoryName: string): void {
            throw new Error("Not Implemented Yet.");
        }

        getCurrentDirectory(): string {
            return this.host.getCurrentDirectory();
        }

        readDirectory(path: string, extension?: string): string[] {
            throw new Error("Not implemented Yet.");
        }

        getModififedTime(fileName: string): Date {
            return new Date();
        }

        stat(path: string, callback?: (err: any, stats: any) => any) {
            throw new Error("Not implemented Yet.");
        }

        lineColToPosition(fileName: string, line: number, col: number): number { 
            return this.host.lineColToPosition(fileName, line, col);
        }

        positionToZeroBasedLineCol(fileName: string, position: number): ts.LineAndCharacter { 
            return this.host.positionToZeroBasedLineCol(fileName, position);
        }

        getFileLength(fileName: string): number {
            return this.host.getScriptSnapshot(fileName).getLength();
        }

        close(): void {
        }

        info(message: string): void {
            return this.host.log(message);
        }

        msg(message: string) {
            return this.host.log(message);
        }

        endGroup(): void {
        }

        perftrc(message: string): void {
            return this.host.log(message);
        }

        startGroup(): void {
        }
    }

    export class SessionClient implements LanguageService {
        private session: Session;
        private sequence: number = 0;
        private host: SessionClientHostProxy;
        
        constructor(host: SessionClientHost) {
            this.sequence = 0;
            this.host = new SessionClientHostProxy(host);
            this.session = new Session(this.host, this.host, /* useProtocol */ true, /*prettyJSON*/ true);
        }

        private lineColToPosition(fileName: string, lineCol: ServerProtocol.LineCol): number {
            return this.host.lineColToPosition(fileName, lineCol.line, lineCol.col);
        }

        private positionToOneBasedLineCol(fileName: string, position: number): ServerProtocol.LineCol {
            var lineCol = this.host.positionToZeroBasedLineCol(fileName, position);
            return {
                line: lineCol.line + 1,
                col: lineCol.character + 1
            };
        }

        private convertCodeEditsToTextChange(fileName: string, codeEdit: ServerProtocol.CodeEdit): ts.TextChange {
            var start = this.lineColToPosition(fileName, codeEdit.start);
            var end = this.lineColToPosition(fileName, codeEdit.end);

            return {
                span: ts.createTextSpanFromBounds(start, end),
                newText: codeEdit.newText
            };
        }

        private processRequest(command: "open", arguments: ServerProtocol.FileRequestArgs): ServerProtocol.OpenRequest;
        private processRequest(command: "close", arguments: ServerProtocol.FileRequestArgs): ServerProtocol.CloseRequest;
        private processRequest(command: "change", arguments: ServerProtocol.ChangeRequestArgs): ServerProtocol.ChangeRequest;
        private processRequest(command: "quickinfo", arguments: ServerProtocol.FileRequestArgs): ServerProtocol.QuickInfoRequest;
        private processRequest(command: "format", arguments: ServerProtocol.FormatRequestArgs): ServerProtocol.FormatRequest;
        private processRequest(command: "formatonkey", arguments: ServerProtocol.FormatOnKeyRequestArgs): ServerProtocol.FormatRequest;
        private processRequest(command: "definition", arguments: ServerProtocol.FileRequestArgs): ServerProtocol.DefinitionRequest;
        private processRequest(command: "references", arguments: ServerProtocol.FileRequestArgs): ServerProtocol.ReferencesRequest;
        private processRequest(command: "completions", arguments: ServerProtocol.CompletionsRequestArgs): ServerProtocol.CompletionsRequest;
        private processRequest(command: "navto", arguments: ServerProtocol.NavtoRequestArgs): ServerProtocol.NavtoRequest;
        private processRequest(command: "saveto", arguments: ServerProtocol.SavetoRequestArgs): ServerProtocol.SavetoRequest;
        private processRequest(command: string, arguments: any): ServerProtocol.Request;
        private processRequest(command: string, arguments: any): ServerProtocol.Request {
            var request: ServerProtocol.Request = {
                seq: this.sequence++,
                type: "request",
                command: command,
                arguments: arguments
            };

            this.session.executeJSONcmd(JSON.stringify(request));

            return request;
        }

        private processResponse<T extends ServerProtocol.Response>(request: ServerProtocol.Request): T {
            debugger;
            
            // Read the content length
            var contentLengthPrefix = "Content-Length: ";
            var lines = this.host.lastReply.split("\r\n");
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
                throw new Error("Malformed response: Failed to parse server response: " + this.host.lastReply + ". \r\n  Error detailes: " + e.message);
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
            this.processRequest("open", {
                file: fileName
            });
        }

        closeFile(fileName: string): void {
            this.processRequest("close", {
                file: fileName
            });
        }

        changeFile(fileName: string, start: number, end: number, newText: string): void {
            var lineCol = this.positionToOneBasedLineCol(fileName, start);

            this.processRequest("change", {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
                insertLen: end - start,
                deleteLen: end - start,
                insertString: newText
            });
        }

        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            var request = this.processRequest("quickinfo", {
                file: fileName,
                line: 0,
                col: 1
            });

            var response = this.processResponse<ServerProtocol.QuickInfoResponse>(request);

            var start = this.lineColToPosition(fileName, response.body.start);
            var end = this.lineColToPosition(fileName, response.body.end);

            return {
                kind: response.body.kind,
                kindModifiers: response.body.kindModifiers,
                textSpan: ts.createTextSpanFromBounds(start, end),
                displayParts: undefined,
                documentation: undefined,
                documentationString: response.body.documentation,
                displayString: response.body.displayString
            };
        }

        getCompletionsAtPosition(fileName: string, position: number): CompletionInfo {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var request = this.processRequest("completions", {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
            });

            var response = this.processResponse<ServerProtocol.CompletionsResponse>(request);

            return {
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: response.body.map(entry => ({ kind: entry.kind, kindModifiers: entry.kindModifiers, name: entry.name }))
            };
        }

        getNavigateToItems(seatchTerm: string): NavigateToItem[] {
            var request = this.processRequest("navto", { seatchTerm });

            var response = this.processResponse<ServerProtocol.NavtoResponse>(request);
            return response.body.map(entry => {
                var start = this.lineColToPosition(entry.file.toString(), entry.start);
                var end = this.lineColToPosition(entry.file.toString(), entry.end);
                return {
                    name: entry.name,
                    containerName: entry.containerName,
                    containerKind: entry.containerKind,
                    kind: entry.kind,
                    kindModifiers: entry.kindModifiers,
                    matchKind: entry.matchKind,
                    fileName: entry.file.toString(),
                    textSpan: ts.createTextSpanFromBounds(start, end)
                };
            });
        }

        getFormattingEditsForRange(fileName: string, start: number, end: number, options: ts.FormatCodeOptions): ts.TextChange[] {
            var startLineCol = this.positionToOneBasedLineCol(fileName, start);
            var endLineCol = this.positionToOneBasedLineCol(fileName, end);
            // TODO: handle FormatCodeOptions
            var request = this.processRequest("format", {
                file: fileName,
                line: startLineCol.line,
                col: startLineCol.col,
                endLine: endLineCol.line,
                endCol: endLineCol.col,
            });

            var response = this.processResponse<ServerProtocol.FormatResponse>(request);

            return response.body.map(entry=> this.convertCodeEditsToTextChange(fileName, entry));
        }

        getFormattingEditsForDocument(fileName: string, options: ts.FormatCodeOptions): ts.TextChange[] {
            return this.getFormattingEditsForRange(fileName, 0, this.host.getFileLength(fileName), options);
        }

        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions): ts.TextChange[] {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            // TODO: handle FormatCodeOptions
            var request = this.processRequest("formatonkey", {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
                key: key
            });

            var response = this.processResponse<ServerProtocol.FormatResponse>(request);
            return response.body.map(entry=> this.convertCodeEditsToTextChange(fileName, entry));
        }

        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var request = this.processRequest("definition", {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
            });

            var response = this.processResponse<ServerProtocol.DefinitionResponse>(request);
            return response.body.map(entry => {
                var start = this.lineColToPosition(fileName, entry.start);
                var end = this.lineColToPosition(fileName, entry.end);
                return {
                    containerKind: "",
                    containerName: "",
                    fileName: entry.file,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    kind: "",
                    name: ""
                };
            });
        }

        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            var lineCol = this.positionToOneBasedLineCol(fileName, position);
            var request = this.processRequest("references", {
                file: fileName,
                line: lineCol.line,
                col: lineCol.col,
            });

            var response = this.processResponse<ServerProtocol.ReferencesResponse>(request);

            return response.body.refs.map(entry => {
                var start = this.lineColToPosition(fileName, entry.start);
                var end = this.lineColToPosition(fileName, entry.end);
                return {
                    fileName: entry.file,
                    textSpan: ts.createTextSpanFromBounds(start, end),
                    isWriteAccess: false,
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

        getRenameInfo(fileName: string, position: number): RenameInfo {
            throw new Error("Not Implemented Yet.");
        }

        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[] {
            throw new Error("Not Implemented Yet.");
        }

        getNavigationBarItems(fileName: string): NavigationBarItem[] {
            throw new Error("Not Implemented Yet.");
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
            throw new Error("Not Implemented Yet.");
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

        getCompletionEntryDetails(fileName: string, position: number, entryName: string): CompletionEntryDetails {
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
