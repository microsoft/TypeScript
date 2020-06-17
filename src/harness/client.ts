namespace ts.server {
    export interface SessionClientHost extends LanguageServiceHost {
        writeMessage(message: string): void;
    }

    interface RenameEntry {
        readonly renameInfo: RenameInfo;
        readonly inputs: {
            readonly fileName: string;
            readonly position: number;
            readonly findInStrings: boolean;
            readonly findInComments: boolean;
        };
        readonly locations: RenameLocation[];
    }

    /* @internal */
    export function extractMessage(message: string): string {
        // Read the content length
        const contentLengthPrefix = "Content-Length: ";
        const lines = message.split(/\r?\n/);
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

    export class SessionClient implements LanguageService {
        private sequence = 0;
        private lineMaps: Map<number[]> = createMap<number[]>();
        private messages: string[] = [];
        private lastRenameEntry: RenameEntry | undefined;

        constructor(private host: SessionClientHost) {
        }

        public onMessage(message: string): void {
            this.messages.push(message);
        }

        private writeMessage(message: string): void {
            this.host.writeMessage(message);
        }

        private getLineMap(fileName: string): number[] {
            let lineMap = this.lineMaps.get(fileName);
            if (!lineMap) {
                lineMap = computeLineStarts(getSnapshotText(this.host.getScriptSnapshot(fileName)!));
                this.lineMaps.set(fileName, lineMap);
            }
            return lineMap;
        }

        private lineOffsetToPosition(fileName: string, lineOffset: protocol.Location, lineMap?: number[]): number {
            lineMap = lineMap || this.getLineMap(fileName);
            return computePositionOfLineAndCharacter(lineMap, lineOffset.line - 1, lineOffset.offset - 1);
        }

        private positionToOneBasedLineOffset(fileName: string, position: number): protocol.Location {
            const lineOffset = computeLineAndCharacterOfPosition(this.getLineMap(fileName), position);
            return {
                line: lineOffset.line + 1,
                offset: lineOffset.character + 1
            };
        }

        private convertCodeEditsToTextChange(fileName: string, codeEdit: protocol.CodeEdit): TextChange {
            return { span: this.decodeSpan(codeEdit, fileName), newText: codeEdit.newText };
        }

        private processRequest<T extends protocol.Request>(command: string, args: T["arguments"]): T {
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

        private processResponse<T extends protocol.Response>(request: protocol.Request, expectEmptyBody = false): T {
            let foundResponseMessage = false;
            let response!: T;
            while (!foundResponseMessage) {
                const lastMessage = this.messages.shift()!;
                Debug.assert(!!lastMessage, "Did not receive any responses.");
                const responseBody = extractMessage(lastMessage);
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

            Debug.assert(expectEmptyBody || !!response.body, "Malformed response: Unexpected empty response body.");
            Debug.assert(!expectEmptyBody || !response.body, "Malformed response: Unexpected non-empty response body.");

            return response;
        }

        /*@internal*/
        configure(preferences: UserPreferences) {
            const args: protocol.ConfigureRequestArguments = { preferences };
            const request = this.processRequest(CommandNames.Configure, args);
            this.processResponse(request, /*expectEmptyBody*/ true);
        }

        openFile(file: string, fileContent?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void {
            const args: protocol.OpenRequestArgs = { file, fileContent, scriptKindName };
            this.processRequest(CommandNames.Open, args);
        }

        closeFile(file: string): void {
            const args: protocol.FileRequestArgs = { file };
            this.processRequest(CommandNames.Close, args);
        }

        createChangeFileRequestArgs(fileName: string, start: number, end: number, insertString: string): protocol.ChangeRequestArgs {
            return { ...this.createFileLocationRequestArgsWithEndLineAndOffset(fileName, start, end), insertString };
        }

        changeFile(fileName: string, args: protocol.ChangeRequestArgs): void {
            // clear the line map after an edit
            this.lineMaps.set(fileName, undefined!); // TODO: GH#18217
            this.processRequest(CommandNames.Change, args);
        }

        toLineColumnOffset(fileName: string, position: number) {
            const { line, offset } = this.positionToOneBasedLineOffset(fileName, position);
            return { line, character: offset };
        }

        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo {
            const args = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.QuickInfoRequest>(CommandNames.Quickinfo, args);
            const response = this.processResponse<protocol.QuickInfoResponse>(request);
            const body = response.body!; // TODO: GH#18217

            return {
                kind: body.kind,
                kindModifiers: body.kindModifiers,
                textSpan: this.decodeSpan(body, fileName),
                displayParts: [{ kind: "text", text: body.displayString }],
                documentation: [{ kind: "text", text: body.documentation }],
                tags: body.tags
            };
        }

        getProjectInfo(file: string, needFileNameList: boolean): protocol.ProjectInfo {
            const args: protocol.ProjectInfoRequestArgs = { file, needFileNameList };

            const request = this.processRequest<protocol.ProjectInfoRequest>(CommandNames.ProjectInfo, args);
            const response = this.processResponse<protocol.ProjectInfoResponse>(request);

            return {
                configFileName: response.body!.configFileName, // TODO: GH#18217
                fileNames: response.body!.fileNames
            };
        }

        getCompletionsAtPosition(fileName: string, position: number, _preferences: UserPreferences | undefined): CompletionInfo {
            // Not passing along 'preferences' because server should already have those from the 'configure' command
            const args: protocol.CompletionsRequestArgs = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.CompletionsRequest>(CommandNames.Completions, args);
            const response = this.processResponse<protocol.CompletionsResponse>(request);

            return {
                isGlobalCompletion: false,
                isMemberCompletion: false,
                isNewIdentifierLocation: false,
                entries: response.body!.map<CompletionEntry>(entry => { // TODO: GH#18217
                    if (entry.replacementSpan !== undefined) {
                        const { name, kind, kindModifiers, sortText, replacementSpan, hasAction, source, isRecommended } = entry;
                        // TODO: GH#241
                        const res: CompletionEntry = { name, kind, kindModifiers, sortText, replacementSpan: this.decodeSpan(replacementSpan, fileName), hasAction, source, isRecommended };
                        return res;
                    }

                    return entry as { name: string, kind: ScriptElementKind, kindModifiers: string, sortText: string }; // TODO: GH#18217
                })
            };
        }

        getCompletionEntryDetails(fileName: string, position: number, entryName: string, _options: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined): CompletionEntryDetails {
            const args: protocol.CompletionDetailsRequestArgs = { ...this.createFileLocationRequestArgs(fileName, position), entryNames: [{ name: entryName, source }] };

            const request = this.processRequest<protocol.CompletionDetailsRequest>(CommandNames.CompletionDetails, args);
            const response = this.processResponse<protocol.CompletionDetailsResponse>(request);
            Debug.assert(response.body!.length === 1, "Unexpected length of completion details response body.");
            const convertedCodeActions = map(response.body![0].codeActions, ({ description, changes }) => ({ description, changes: this.convertChanges(changes, fileName) }));
            return { ...response.body![0], codeActions: convertedCodeActions };
        }

        getCompletionEntrySymbol(_fileName: string, _position: number, _entryName: string): Symbol {
            return notImplemented();
        }

        getNavigateToItems(searchValue: string): NavigateToItem[] {
            const args: protocol.NavtoRequestArgs = {
                searchValue,
                file: this.host.getScriptFileNames()[0]
            };

            const request = this.processRequest<protocol.NavtoRequest>(CommandNames.Navto, args);
            const response = this.processResponse<protocol.NavtoResponse>(request);

            return response.body!.map(entry => ({ // TODO: GH#18217
                name: entry.name,
                containerName: entry.containerName || "",
                containerKind: entry.containerKind || ScriptElementKind.unknown,
                kind: entry.kind,
                kindModifiers: entry.kindModifiers || "",
                matchKind: entry.matchKind as keyof typeof PatternMatchKind,
                isCaseSensitive: entry.isCaseSensitive,
                fileName: entry.file,
                textSpan: this.decodeSpan(entry),
            }));
        }

        getFormattingEditsForRange(file: string, start: number, end: number, _options: FormatCodeOptions): TextChange[] {
            const args: protocol.FormatRequestArgs = this.createFileLocationRequestArgsWithEndLineAndOffset(file, start, end);


            // TODO: handle FormatCodeOptions
            const request = this.processRequest<protocol.FormatRequest>(CommandNames.Format, args);
            const response = this.processResponse<protocol.FormatResponse>(request);

            return response.body!.map(entry => this.convertCodeEditsToTextChange(file, entry)); // TODO: GH#18217
        }

        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): TextChange[] {
            return this.getFormattingEditsForRange(fileName, 0, this.host.getScriptSnapshot(fileName)!.getLength(), options);
        }

        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, _options: FormatCodeOptions): TextChange[] {
            const args: protocol.FormatOnKeyRequestArgs = { ...this.createFileLocationRequestArgs(fileName, position), key };

            // TODO: handle FormatCodeOptions
            const request = this.processRequest<protocol.FormatOnKeyRequest>(CommandNames.Formatonkey, args);
            const response = this.processResponse<protocol.FormatResponse>(request);

            return response.body!.map(entry => this.convertCodeEditsToTextChange(fileName, entry)); // TODO: GH#18217
        }

        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            const args: protocol.FileLocationRequestArgs = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.DefinitionRequest>(CommandNames.Definition, args);
            const response = this.processResponse<protocol.DefinitionResponse>(request);

            return response.body!.map(entry => ({ // TODO: GH#18217
                containerKind: ScriptElementKind.unknown,
                containerName: "",
                fileName: entry.file,
                textSpan: this.decodeSpan(entry),
                kind: ScriptElementKind.unknown,
                name: ""
            }));
        }

        getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan {
            const args: protocol.FileLocationRequestArgs = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.DefinitionRequest>(CommandNames.DefinitionAndBoundSpan, args);
            const response = this.processResponse<protocol.DefinitionInfoAndBoundSpanResponse>(request);
            const body = Debug.checkDefined(response.body); // TODO: GH#18217

            return {
                definitions: body.definitions.map(entry => ({
                    containerKind: ScriptElementKind.unknown,
                    containerName: "",
                    fileName: entry.file,
                    textSpan: this.decodeSpan(entry),
                    kind: ScriptElementKind.unknown,
                    name: ""
                })),
                textSpan: this.decodeSpan(body.textSpan, request.arguments.file)
            };
        }

        getTypeDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[] {
            const args: protocol.FileLocationRequestArgs = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.TypeDefinitionRequest>(CommandNames.TypeDefinition, args);
            const response = this.processResponse<protocol.TypeDefinitionResponse>(request);

            return response.body!.map(entry => ({ // TODO: GH#18217
                containerKind: ScriptElementKind.unknown,
                containerName: "",
                fileName: entry.file,
                textSpan: this.decodeSpan(entry),
                kind: ScriptElementKind.unknown,
                name: ""
            }));
        }

        getImplementationAtPosition(fileName: string, position: number): ImplementationLocation[] {
            const args = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.ImplementationRequest>(CommandNames.Implementation, args);
            const response = this.processResponse<protocol.ImplementationResponse>(request);

            return response.body!.map(entry => ({ // TODO: GH#18217
                fileName: entry.file,
                textSpan: this.decodeSpan(entry),
                kind: ScriptElementKind.unknown,
                displayParts: []
            }));
        }

        findReferences(_fileName: string, _position: number): ReferencedSymbol[] {
            // Not yet implemented.
            return [];
        }

        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            const args = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.ReferencesRequest>(CommandNames.References, args);
            const response = this.processResponse<protocol.ReferencesResponse>(request);

            return response.body!.refs.map(entry => ({ // TODO: GH#18217
                fileName: entry.file,
                textSpan: this.decodeSpan(entry),
                isWriteAccess: entry.isWriteAccess,
                isDefinition: entry.isDefinition,
            }));
        }

        getEmitOutput(file: string): EmitOutput {
            const request = this.processRequest<protocol.EmitOutputRequest>(protocol.CommandTypes.EmitOutput, { file });
            const response = this.processResponse<protocol.EmitOutputResponse>(request);
            return response.body as EmitOutput;
        }

        getSyntacticDiagnostics(file: string): DiagnosticWithLocation[] {
            return this.getDiagnostics(file, CommandNames.SyntacticDiagnosticsSync);
        }
        getSemanticDiagnostics(file: string): Diagnostic[] {
            return this.getDiagnostics(file, CommandNames.SemanticDiagnosticsSync);
        }
        getSuggestionDiagnostics(file: string): DiagnosticWithLocation[] {
            return this.getDiagnostics(file, CommandNames.SuggestionDiagnosticsSync);
        }

        private getDiagnostics(file: string, command: CommandNames): DiagnosticWithLocation[] {
            const request = this.processRequest<protocol.SyntacticDiagnosticsSyncRequest | protocol.SemanticDiagnosticsSyncRequest | protocol.SuggestionDiagnosticsSyncRequest>(command, { file, includeLinePosition: true });
            const response = this.processResponse<protocol.SyntacticDiagnosticsSyncResponse | protocol.SemanticDiagnosticsSyncResponse | protocol.SuggestionDiagnosticsSyncResponse>(request);
            const sourceText = getSnapshotText(this.host.getScriptSnapshot(file)!);
            const fakeSourceFile = { fileName: file, text: sourceText } as SourceFile; // Warning! This is a huge lie!

            return (<protocol.DiagnosticWithLinePosition[]>response.body).map((entry): DiagnosticWithLocation => {
                const category = firstDefined(Object.keys(DiagnosticCategory), id =>
                    isString(id) && entry.category === id.toLowerCase() ? (<any>DiagnosticCategory)[id] : undefined);
                return {
                    file: fakeSourceFile,
                    start: entry.start,
                    length: entry.length,
                    messageText: entry.message,
                    category: Debug.checkDefined(category, "convertDiagnostic: category should not be undefined"),
                    code: entry.code,
                    reportsUnnecessary: entry.reportsUnnecessary,
                };
            });
        }

        getCompilerOptionsDiagnostics(): Diagnostic[] {
            return notImplemented();
        }

        getRenameInfo(fileName: string, position: number, _options?: RenameInfoOptions, findInStrings?: boolean, findInComments?: boolean): RenameInfo {
            // Not passing along 'options' because server should already have those from the 'configure' command
            const args: protocol.RenameRequestArgs = { ...this.createFileLocationRequestArgs(fileName, position), findInStrings, findInComments };

            const request = this.processRequest<protocol.RenameRequest>(CommandNames.Rename, args);
            const response = this.processResponse<protocol.RenameResponse>(request);
            const body = response.body!; // TODO: GH#18217
            const locations: RenameLocation[] = [];
            for (const entry of body.locs) {
                const fileName = entry.file;
                for (const { start, end, contextStart, contextEnd, ...prefixSuffixText } of entry.locs) {
                    locations.push({
                        textSpan: this.decodeSpan({ start, end }, fileName),
                        fileName,
                        ...(contextStart !== undefined ?
                            { contextSpan: this.decodeSpan({ start: contextStart, end: contextEnd! }, fileName) } :
                            undefined),
                        ...prefixSuffixText
                    });
                }
            }

            const renameInfo = body.info.canRename
                ? identity<RenameInfoSuccess>({
                    canRename: body.info.canRename,
                    fileToRename: body.info.fileToRename,
                    displayName: body.info.displayName,
                    fullDisplayName: body.info.fullDisplayName,
                    kind: body.info.kind,
                    kindModifiers: body.info.kindModifiers,
                    triggerSpan: createTextSpanFromBounds(position, position),
                })
                : identity<RenameInfoFailure>({ canRename: false, localizedErrorMessage: body.info.localizedErrorMessage });
            this.lastRenameEntry = {
                renameInfo,
                inputs: {
                    fileName,
                    position,
                    findInStrings: !!findInStrings,
                    findInComments: !!findInComments,
                },
                locations,
            };
            return renameInfo;
        }

        getSmartSelectionRange() {
            return notImplemented();
        }

        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[] {
            if (!this.lastRenameEntry ||
                this.lastRenameEntry.inputs.fileName !== fileName ||
                this.lastRenameEntry.inputs.position !== position ||
                this.lastRenameEntry.inputs.findInStrings !== findInStrings ||
                this.lastRenameEntry.inputs.findInComments !== findInComments) {
                this.getRenameInfo(fileName, position, { allowRenameOfImportPath: true }, findInStrings, findInComments);
            }

            return this.lastRenameEntry!.locations;
        }

        private decodeNavigationBarItems(items: protocol.NavigationBarItem[] | undefined, fileName: string, lineMap: number[]): NavigationBarItem[] {
            if (!items) {
                return [];
            }

            return items.map(item => ({
                text: item.text,
                kind: item.kind,
                kindModifiers: item.kindModifiers || "",
                spans: item.spans.map(span => this.decodeSpan(span, fileName, lineMap)),
                childItems: this.decodeNavigationBarItems(item.childItems, fileName, lineMap),
                indent: item.indent,
                bolded: false,
                grayed: false
            }));
        }

        getNavigationBarItems(file: string): NavigationBarItem[] {
            const request = this.processRequest<protocol.NavBarRequest>(CommandNames.NavBar, { file });
            const response = this.processResponse<protocol.NavBarResponse>(request);

            const lineMap = this.getLineMap(file);
            return this.decodeNavigationBarItems(response.body, file, lineMap);
        }

        private decodeNavigationTree(tree: protocol.NavigationTree, fileName: string, lineMap: number[]): NavigationTree {
            return {
                text: tree.text,
                kind: tree.kind,
                kindModifiers: tree.kindModifiers,
                spans: tree.spans.map(span => this.decodeSpan(span, fileName, lineMap)),
                nameSpan: tree.nameSpan && this.decodeSpan(tree.nameSpan, fileName, lineMap),
                childItems: map(tree.childItems, item => this.decodeNavigationTree(item, fileName, lineMap))
            };
        }

        getNavigationTree(file: string): NavigationTree {
            const request = this.processRequest<protocol.NavTreeRequest>(CommandNames.NavTree, { file });
            const response = this.processResponse<protocol.NavTreeResponse>(request);

            const lineMap = this.getLineMap(file);
            return this.decodeNavigationTree(response.body!, file, lineMap); // TODO: GH#18217
        }

        private decodeSpan(span: protocol.TextSpan & { file: string }): TextSpan;
        private decodeSpan(span: protocol.TextSpan, fileName: string, lineMap?: number[]): TextSpan;
        private decodeSpan(span: protocol.TextSpan & { file: string }, fileName?: string, lineMap?: number[]): TextSpan {
            fileName = fileName || span.file;
            lineMap = lineMap || this.getLineMap(fileName);
            return createTextSpanFromBounds(
                this.lineOffsetToPosition(fileName, span.start, lineMap),
                this.lineOffsetToPosition(fileName, span.end, lineMap));
        }

        getNameOrDottedNameSpan(_fileName: string, _startPos: number, _endPos: number): TextSpan {
            return notImplemented();
        }

        getBreakpointStatementAtPosition(_fileName: string, _position: number): TextSpan {
            return notImplemented();
        }

        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems | undefined {
            const args: protocol.SignatureHelpRequestArgs = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.SignatureHelpRequest>(CommandNames.SignatureHelp, args);
            const response = this.processResponse<protocol.SignatureHelpResponse>(request);

            if (!response.body) {
                return undefined;
            }

            const { items, applicableSpan: encodedApplicableSpan, selectedItemIndex, argumentIndex, argumentCount } = response.body;

            const applicableSpan = this.decodeSpan(encodedApplicableSpan, fileName);

            return { items, applicableSpan, selectedItemIndex, argumentIndex, argumentCount };
        }

        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[] {
            const args = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.OccurrencesRequest>(CommandNames.Occurrences, args);
            const response = this.processResponse<protocol.OccurrencesResponse>(request);

            return response.body!.map(entry => ({ // TODO: GH#18217
                fileName: entry.file,
                textSpan: this.decodeSpan(entry),
                isWriteAccess: entry.isWriteAccess,
                isDefinition: false
            }));
        }

        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] {
            const args: protocol.DocumentHighlightsRequestArgs = { ...this.createFileLocationRequestArgs(fileName, position), filesToSearch };

            const request = this.processRequest<protocol.DocumentHighlightsRequest>(CommandNames.DocumentHighlights, args);
            const response = this.processResponse<protocol.DocumentHighlightsResponse>(request);

            return response.body!.map(item => ({ // TODO: GH#18217
                fileName: item.file,
                highlightSpans: item.highlightSpans.map(span => ({
                    textSpan: this.decodeSpan(span, item.file),
                    kind: span.kind
                })),
            }));
        }

        getOutliningSpans(file: string): OutliningSpan[] {
            const request = this.processRequest<protocol.OutliningSpansRequest>(CommandNames.GetOutliningSpans, { file });
            const response = this.processResponse<protocol.OutliningSpansResponse>(request);

            return response.body!.map<OutliningSpan>(item => ({
                textSpan: this.decodeSpan(item.textSpan, file),
                hintSpan: this.decodeSpan(item.hintSpan, file),
                bannerText: item.bannerText,
                autoCollapse: item.autoCollapse,
                kind: item.kind
            }));
        }

        getTodoComments(_fileName: string, _descriptors: TodoCommentDescriptor[]): TodoComment[] {
            return notImplemented();
        }

        getDocCommentTemplateAtPosition(_fileName: string, _position: number): TextInsertion {
            return notImplemented();
        }

        isValidBraceCompletionAtPosition(_fileName: string, _position: number, _openingBrace: number): boolean {
            return notImplemented();
        }

        getJsxClosingTagAtPosition(_fileName: string, _position: number): never {
            return notImplemented();
        }

        getSpanOfEnclosingComment(_fileName: string, _position: number, _onlyMultiLine: boolean): TextSpan {
            return notImplemented();
        }

        getCodeFixesAtPosition(file: string, start: number, end: number, errorCodes: readonly number[]): readonly CodeFixAction[] {
            const args: protocol.CodeFixRequestArgs = { ...this.createFileRangeRequestArgs(file, start, end), errorCodes };

            const request = this.processRequest<protocol.CodeFixRequest>(CommandNames.GetCodeFixes, args);
            const response = this.processResponse<protocol.CodeFixResponse>(request);

            return response.body!.map<CodeFixAction>(({ fixName, description, changes, commands, fixId, fixAllDescription }) => // TODO: GH#18217
                ({ fixName, description, changes: this.convertChanges(changes, file), commands: commands as CodeActionCommand[], fixId, fixAllDescription }));
        }

        getCombinedCodeFix = notImplemented;

        applyCodeActionCommand = notImplemented;

        private createFileLocationOrRangeRequestArgs(positionOrRange: number | TextRange, fileName: string): protocol.FileLocationOrRangeRequestArgs {
            return typeof positionOrRange === "number"
                ? this.createFileLocationRequestArgs(fileName, positionOrRange)
                : this.createFileRangeRequestArgs(fileName, positionOrRange.pos, positionOrRange.end);
        }

        private createFileLocationRequestArgs(file: string, position: number): protocol.FileLocationRequestArgs {
            const { line, offset } = this.positionToOneBasedLineOffset(file, position);
            return { file, line, offset };
        }

        private createFileRangeRequestArgs(file: string, start: number, end: number): protocol.FileRangeRequestArgs {
            const { line: startLine, offset: startOffset } = this.positionToOneBasedLineOffset(file, start);
            const { line: endLine, offset: endOffset } = this.positionToOneBasedLineOffset(file, end);
            return { file, startLine, startOffset, endLine, endOffset };
        }

        private createFileLocationRequestArgsWithEndLineAndOffset(file: string, start: number, end: number): protocol.FileLocationRequestArgs & { endLine: number, endOffset: number } {
            const { line, offset } = this.positionToOneBasedLineOffset(file, start);
            const { line: endLine, offset: endOffset } = this.positionToOneBasedLineOffset(file, end);
            return { file, line, offset, endLine, endOffset };
        }

        getApplicableRefactors(fileName: string, positionOrRange: number | TextRange): ApplicableRefactorInfo[] {
            const args = this.createFileLocationOrRangeRequestArgs(positionOrRange, fileName);

            const request = this.processRequest<protocol.GetApplicableRefactorsRequest>(CommandNames.GetApplicableRefactors, args);
            const response = this.processResponse<protocol.GetApplicableRefactorsResponse>(request);
            return response.body!; // TODO: GH#18217
        }

        getEditsForRefactor(
            fileName: string,
            _formatOptions: FormatCodeSettings,
            positionOrRange: number | TextRange,
            refactorName: string,
            actionName: string): RefactorEditInfo {

            const args = this.createFileLocationOrRangeRequestArgs(positionOrRange, fileName) as protocol.GetEditsForRefactorRequestArgs;
            args.refactor = refactorName;
            args.action = actionName;

            const request = this.processRequest<protocol.GetEditsForRefactorRequest>(CommandNames.GetEditsForRefactor, args);
            const response = this.processResponse<protocol.GetEditsForRefactorResponse>(request);

            if (!response.body) {
                return { edits: [], renameFilename: undefined, renameLocation: undefined };
            }

            const edits: FileTextChanges[] = this.convertCodeEditsToTextChanges(response.body.edits);

            const renameFilename: string | undefined = response.body.renameFilename;
            let renameLocation: number | undefined;
            if (renameFilename !== undefined) {
                renameLocation = this.lineOffsetToPosition(renameFilename, response.body.renameLocation!); // TODO: GH#18217
            }

            return {
                edits,
                renameFilename,
                renameLocation
            };
        }

        organizeImports(_scope: OrganizeImportsScope, _formatOptions: FormatCodeSettings): readonly FileTextChanges[] {
            return notImplemented();
        }

        getEditsForFileRename() {
            return notImplemented();
        }

        private convertCodeEditsToTextChanges(edits: protocol.FileCodeEdits[]): FileTextChanges[] {
            return edits.map(edit => {
                const fileName = edit.fileName;
                return {
                    fileName,
                    textChanges: edit.textChanges.map(t => this.convertTextChangeToCodeEdit(t, fileName))
                };
            });
        }

        private convertChanges(changes: protocol.FileCodeEdits[], fileName: string): FileTextChanges[] {
            return changes.map(change => ({
                fileName: change.fileName,
                textChanges: change.textChanges.map(textChange => this.convertTextChangeToCodeEdit(textChange, fileName))
            }));
        }

        convertTextChangeToCodeEdit(change: protocol.CodeEdit, fileName: string): TextChange {
            return {
                span: this.decodeSpan(change, fileName),
                newText: change.newText ? change.newText : ""
            };
        }

        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[] {
            const args = this.createFileLocationRequestArgs(fileName, position);

            const request = this.processRequest<protocol.BraceRequest>(CommandNames.Brace, args);
            const response = this.processResponse<protocol.BraceResponse>(request);

            return response.body!.map(entry => this.decodeSpan(entry, fileName)); // TODO: GH#18217
        }

        configurePlugin(pluginName: string, configuration: any): void {
            const request = this.processRequest<protocol.ConfigurePluginRequest>("configurePlugin", { pluginName, configuration });
            this.processResponse<protocol.ConfigurePluginResponse>(request, /*expectEmptyBody*/ true);
        }

        getIndentationAtPosition(_fileName: string, _position: number, _options: EditorOptions): number {
            return notImplemented();
        }

        getSyntacticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[] {
            return notImplemented();
        }

        getSemanticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[] {
            return notImplemented();
        }

        getEncodedSyntacticClassifications(_fileName: string, _span: TextSpan): Classifications {
            return notImplemented();
        }

        getEncodedSemanticClassifications(_fileName: string, _span: TextSpan): Classifications {
            return notImplemented();
        }

        private convertCallHierarchyItem(item: protocol.CallHierarchyItem): CallHierarchyItem {
            return {
                file: item.file,
                name: item.name,
                kind: item.kind,
                span: this.decodeSpan(item.span, item.file),
                selectionSpan: this.decodeSpan(item.selectionSpan, item.file)
            };
        }

        prepareCallHierarchy(fileName: string, position: number): CallHierarchyItem | CallHierarchyItem[] | undefined {
            const args = this.createFileLocationRequestArgs(fileName, position);
            const request = this.processRequest<protocol.PrepareCallHierarchyRequest>(CommandNames.PrepareCallHierarchy, args);
            const response = this.processResponse<protocol.PrepareCallHierarchyResponse>(request);
            return response.body && mapOneOrMany(response.body, item => this.convertCallHierarchyItem(item));
        }

        private convertCallHierarchyIncomingCall(item: protocol.CallHierarchyIncomingCall): CallHierarchyIncomingCall {
            return {
                from: this.convertCallHierarchyItem(item.from),
                fromSpans: item.fromSpans.map(span => this.decodeSpan(span, item.from.file))
            };
        }

        provideCallHierarchyIncomingCalls(fileName: string, position: number) {
            const args = this.createFileLocationRequestArgs(fileName, position);
            const request = this.processRequest<protocol.ProvideCallHierarchyIncomingCallsRequest>(CommandNames.PrepareCallHierarchy, args);
            const response = this.processResponse<protocol.ProvideCallHierarchyIncomingCallsResponse>(request);
            return response.body.map(item => this.convertCallHierarchyIncomingCall(item));
        }

        private convertCallHierarchyOutgoingCall(file: string, item: protocol.CallHierarchyOutgoingCall): CallHierarchyOutgoingCall {
            return {
                to: this.convertCallHierarchyItem(item.to),
                fromSpans: item.fromSpans.map(span => this.decodeSpan(span, file))
            };
        }

        provideCallHierarchyOutgoingCalls(fileName: string, position: number) {
            const args = this.createFileLocationRequestArgs(fileName, position);
            const request = this.processRequest<protocol.ProvideCallHierarchyOutgoingCallsRequest>(CommandNames.PrepareCallHierarchy, args);
            const response = this.processResponse<protocol.ProvideCallHierarchyOutgoingCallsResponse>(request);
            return response.body.map(item => this.convertCallHierarchyOutgoingCall(fileName, item));
        }

        getProgram(): Program {
            throw new Error("SourceFile objects are not serializable through the server protocol.");
        }

        getNonBoundSourceFile(_fileName: string): SourceFile {
            throw new Error("SourceFile objects are not serializable through the server protocol.");
        }

        getSourceFile(_fileName: string): SourceFile {
            throw new Error("SourceFile objects are not serializable through the server protocol.");
        }

        cleanupSemanticCache(): void {
            throw new Error("cleanupSemanticCache is not available through the server layer.");
        }

        getSourceMapper(): never {
            return notImplemented();
        }

        clearSourceMapperCache(): never {
            return notImplemented();
        }

        dispose(): void {
            throw new Error("dispose is not available through the server layer.");
        }
    }
}
