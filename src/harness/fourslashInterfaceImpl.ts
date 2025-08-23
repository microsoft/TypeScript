import * as FourSlash from "./_namespaces/FourSlash.js";
import * as ts from "./_namespaces/ts.js";

export class Test {
    constructor(private state: FourSlash.TestState) {
    }

    public markers(): FourSlash.Marker[] {
        return this.state.getMarkers();
    }

    public markerNames(): string[] {
        return this.state.getMarkerNames();
    }

    public marker(name: string): FourSlash.Marker {
        return this.state.getMarkerByName(name);
    }

    public markerName(m: FourSlash.Marker): string {
        return this.state.markerName(m);
    }

    public ranges(): FourSlash.Range[] {
        return this.state.getRanges();
    }

    public rangesInFile(fileName?: string): FourSlash.Range[] {
        return this.state.getRangesInFile(fileName);
    }

    public spans(): ts.TextSpan[] {
        return this.ranges().map(r => ts.createTextSpan(r.pos, r.end - r.pos));
    }

    public rangesByText(): Map<string, FourSlash.Range[]> {
        return this.state.rangesByText();
    }

    public markerByName(s: string): FourSlash.Marker {
        return this.state.getMarkerByName(s);
    }

    public symbolsInScope(range: FourSlash.Range): ts.Symbol[] {
        return this.state.symbolsInScope(range);
    }

    public setTypesRegistry(map: ts.MapLike<void>): void {
        this.state.setTypesRegistry(map);
    }

    public getSemanticDiagnostics(): Diagnostic[] {
        return this.state.getSemanticDiagnostics().map<Diagnostic>(tsDiag => ({
            message: ts.flattenDiagnosticMessageText(tsDiag.messageText, "\n"),
            range: tsDiag.start ? {
                fileName: this.state.activeFile.fileName,
                pos: tsDiag.start,
                end: tsDiag.start + tsDiag.length!,
            } : undefined,
            code: tsDiag.code,
            reportsUnnecessary: tsDiag.reportsUnnecessary ? true : undefined,
            reportsDeprecated: !!tsDiag.reportsDeprecated ? true : undefined,
        }));
    }
}

export class Config {
    constructor(private state: FourSlash.TestState) {
    }

    public configurePlugin(pluginName: string, configuration: any): void {
        this.state.configurePlugin(pluginName, configuration);
    }

    public setCompilerOptionsForInferredProjects(options: ts.server.protocol.CompilerOptions): void {
        this.state.setCompilerOptionsForInferredProjects(options);
    }
}

export class GoTo {
    constructor(private state: FourSlash.TestState) {
    }
    // Moves the caret to the specified marker,
    // or the anonymous marker ('/**/') if no name
    // is given
    public marker(name?: string | FourSlash.Marker): void {
        this.state.goToMarker(name);
    }

    public eachMarker(markers: readonly string[], action: (marker: FourSlash.Marker, index: number) => void): void;
    public eachMarker(action: (marker: FourSlash.Marker, index: number) => void): void;
    public eachMarker(a: readonly string[] | ((marker: FourSlash.Marker, index: number) => void), b?: (marker: FourSlash.Marker, index: number) => void): void {
        const markers = typeof a === "function" ? this.state.getMarkers() : a.map(m => this.state.getMarkerByName(m));
        this.state.goToEachMarker(markers, typeof a === "function" ? a : b!);
    }

    public rangeStart(range: FourSlash.Range): void {
        this.state.goToRangeStart(range);
    }

    public eachRange(action: (range: FourSlash.Range) => void): void {
        this.state.goToEachRange(action);
    }

    public bof(): void {
        this.state.goToBOF();
    }

    public eof(): void {
        this.state.goToEOF();
    }

    public position(positionOrLineAndCharacter: number | ts.LineAndCharacter, fileNameOrIndex?: string | number): void {
        if (fileNameOrIndex !== undefined) {
            this.file(fileNameOrIndex);
        }
        this.state.goToPosition(positionOrLineAndCharacter);
    }

    // Opens a file, given either its index as it
    // appears in the test source, or its filename
    // as specified in the test metadata
    public file(indexOrName: number | string, content?: string, scriptKindName?: string): void {
        this.state.openFile(indexOrName, content, scriptKindName);
    }

    public select(startMarker: string, endMarker: string): void {
        this.state.select(startMarker, endMarker);
    }

    public selectAllInFile(fileName: string): void {
        this.state.selectAllInFile(fileName);
    }

    public selectRange(range: FourSlash.Range): void {
        this.state.selectRange(range);
    }
}

export class VerifyNegatable {
    public not: VerifyNegatable | undefined;

    constructor(protected state: FourSlash.TestState, private negative = false) {
        if (!negative) {
            this.not = new VerifyNegatable(state, /*negative*/ true);
        }
    }

    public assertHasRanges(ranges: FourSlash.Range[]): void {
        assert(ranges.length !== 0, "Array of ranges is expected to be non-empty");
    }

    public noSignatureHelp(...markers: (string | FourSlash.Marker)[]): void {
        this.state.verifySignatureHelpPresence(/*expectPresent*/ false, /*triggerReason*/ undefined, markers);
    }

    public noSignatureHelpForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: (string | FourSlash.Marker)[]): void {
        this.state.verifySignatureHelpPresence(/*expectPresent*/ false, reason, markers);
    }

    public signatureHelpPresentForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: (string | FourSlash.Marker)[]): void {
        this.state.verifySignatureHelpPresence(/*expectPresent*/ true, reason, markers);
    }

    public signatureHelp(...options: VerifySignatureHelpOptions[]): void {
        this.state.verifySignatureHelp(options);
    }

    public errorExistsBetweenMarkers(startMarker: string, endMarker: string): void {
        this.state.verifyErrorExistsBetweenMarkers(startMarker, endMarker, !this.negative);
    }

    public errorExistsAfterMarker(markerName = ""): void {
        this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ true);
    }

    public errorExistsBeforeMarker(markerName = ""): void {
        this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ false);
    }

    public quickInfoExists(): void {
        this.state.verifyQuickInfoExists(this.negative);
    }

    public isValidBraceCompletionAtPosition(openingBrace: string): void {
        this.state.verifyBraceCompletionAtPosition(this.negative, openingBrace);
    }

    public jsxClosingTag(map: { [markerName: string]: ts.JsxClosingTagInfo | undefined; }): void {
        this.state.verifyJsxClosingTag(map);
    }

    public linkedEditing(map: { [markerName: string]: ts.LinkedEditingInfo | undefined; }): void {
        this.state.verifyLinkedEditingRange(map);
    }

    public baselineLinkedEditing(): void {
        this.state.baselineLinkedEditing();
    }

    public isInCommentAtPosition(onlyMultiLineDiverges?: boolean): void {
        this.state.verifySpanOfEnclosingComment(this.negative, onlyMultiLineDiverges);
    }

    public codeFix(options: VerifyCodeFixOptions): void {
        this.state.verifyCodeFix(options);
    }

    public codeFixAvailable(options?: VerifyCodeFixAvailableOptions[]): void {
        this.state.verifyCodeFixAvailable(this.negative, options);
    }

    public codeFixAllAvailable(fixName: string): void {
        this.state.verifyCodeFixAllAvailable(this.negative, fixName);
    }

    public applicableRefactorAvailableAtMarker(markerName: string): void {
        this.state.verifyApplicableRefactorAvailableAtMarker(this.negative, markerName);
    }

    public applicableRefactorAvailableForRange(): void {
        this.state.verifyApplicableRefactorAvailableForRange(this.negative);
    }

    public refactorsAvailable(names: readonly string[]): void {
        this.state.verifyRefactorsAvailable(names);
    }

    public refactorAvailable(name: string, actionName?: string, actionDescription?: string, kind?: string, preferences: {} = ts.emptyOptions, includeInteractiveActions?: boolean): void {
        this.state.verifyRefactorAvailable(this.negative, "implicit", name, actionName, actionDescription, kind, preferences, includeInteractiveActions);
    }

    public refactorAvailableForTriggerReason(triggerReason: ts.RefactorTriggerReason, name: string, actionName?: string, actionDescription?: string, kind?: string, preferences: {} = ts.emptyOptions, includeInteractiveActions?: boolean): void {
        this.state.verifyRefactorAvailable(this.negative, triggerReason, name, actionName, actionDescription, kind, preferences, includeInteractiveActions);
    }

    public refactorKindAvailable(kind: string, expected: string[], preferences: {} = ts.emptyOptions): void {
        this.state.verifyRefactorKindsAvailable(kind, expected, preferences);
    }

    public toggleLineComment(newFileContent: string): void {
        this.state.toggleLineComment(newFileContent);
    }

    public toggleMultilineComment(newFileContent: string): void {
        this.state.toggleMultilineComment(newFileContent);
    }

    public commentSelection(newFileContent: string): void {
        this.state.commentSelection(newFileContent);
    }

    public uncommentSelection(newFileContent: string): void {
        this.state.uncommentSelection(newFileContent);
    }

    public baselineMapCode(ranges: FourSlash.Range[][], changes: string[] = []): void {
        this.state.baselineMapCode(ranges, changes);
    }
}

export interface CompletionsResult {
    andApplyCodeAction: (options: {
        name: string;
        source: string;
        description: string;
        newFileContent?: string;
        newRangeContent?: string;
    }) => void;
}

export class Verify extends VerifyNegatable {
    constructor(state: FourSlash.TestState) {
        super(state);
    }

    public completions(...optionsArray: VerifyCompletionsOptions[]): CompletionsResult | undefined {
        if (optionsArray.length === 1) {
            return this.state.verifyCompletions(optionsArray[0]);
        }
        for (const options of optionsArray) {
            this.state.verifyCompletions(options);
        }
        return {
            andApplyCodeAction: () => {
                throw new Error("Cannot call andApplyCodeAction on multiple completions requests");
            },
        };
    }

    public baselineInlayHints(span: ts.TextSpan, preference?: ts.UserPreferences): void {
        this.state.baselineInlayHints(span, preference);
    }

    public quickInfoIs(expectedText: string, expectedDocumentation?: string, expectedTags?: { name: string; text: string; }[]): void {
        this.state.verifyQuickInfoString(expectedText, expectedDocumentation, expectedTags);
    }

    public quickInfoAt(markerName: string | FourSlash.Range, expectedText: string, expectedDocumentation?: string, expectedTags?: { name: string; text: string; }[]): void {
        this.state.verifyQuickInfoAt(markerName, expectedText, expectedDocumentation, expectedTags);
    }

    public quickInfos(namesAndTexts: { [name: string]: string; }): void {
        this.state.verifyQuickInfos(namesAndTexts);
    }

    public caretAtMarker(markerName?: string): void {
        this.state.verifyCaretAtMarker(markerName);
    }

    public indentationIs(numberOfSpaces: number): void {
        this.state.verifyIndentationAtCurrentPosition(numberOfSpaces);
    }

    public indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle: ts.IndentStyle = ts.IndentStyle.Smart, baseIndentSize = 0): void {
        this.state.verifyIndentationAtPosition(fileName, position, numberOfSpaces, indentStyle, baseIndentSize);
    }

    public textAtCaretIs(text: string): void {
        this.state.verifyTextAtCaretIs(text);
    }

    /**
     * Compiles the current file and evaluates 'expr' in a context containing
     * the emitted output, then compares (using ===) the result of that expression
     * to 'value'. Do not use this function with external modules as it is not supported.
     */
    public eval(expr: string, value: any): void {
        this.state.verifyEval(expr, value);
    }

    public currentLineContentIs(text: string): void {
        this.state.verifyCurrentLineContent(text);
    }

    public currentFileContentIs(text: string): void {
        this.state.verifyCurrentFileContent(text);
    }

    public formatDocumentChangesNothing(): void {
        this.state.verifyFormatDocumentChangesNothing();
    }

    public verifyGetEmitOutputForCurrentFile(expected: string): void {
        this.state.verifyGetEmitOutputForCurrentFile(expected);
    }

    public verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void {
        this.state.verifyGetEmitOutputContentsForCurrentFile(expected);
    }

    public symbolAtLocation(startRange: FourSlash.Range, ...declarationRanges: FourSlash.Range[]): void {
        this.state.verifySymbolAtLocation(startRange, declarationRanges);
    }

    public typeOfSymbolAtLocation(range: FourSlash.Range, symbol: ts.Symbol, expected: string): void {
        this.state.verifyTypeOfSymbolAtLocation(range, symbol, expected);
    }

    public typeAtLocation(range: FourSlash.Range, expected: string): void {
        this.state.verifyTypeAtLocation(range, expected);
    }

    public baselineFindAllReferences(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void {
        this.state.baselineFindAllReferences(markerOrRange, /*rangeText*/ undefined);
    }

    public baselineFindAllReferencesAtRangesWithText(...rangeText: string[]): void {
        this.state.baselineFindAllReferences(/*markerOrRange*/ undefined, rangeText);
    }

    public baselineGetFileReferences(...fileName: string[]): void {
        this.state.baselineGetFileReferences(fileName);
    }

    public baselineGoToDefinition(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void {
        this.state.baselineGoToDefinition(markerOrRange, /*rangeText*/ undefined);
    }

    public baselineGoToDefinitionAtRangesWithText(...rangeText: string[]): void {
        this.state.baselineGoToDefinition(/*markerOrRange*/ undefined, rangeText);
    }

    public baselineGetDefinitionAtPosition(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void {
        this.state.baselineGetDefinitionAtPosition(markerOrRange, /*rangeText*/ undefined);
    }

    public baselineGetDefinitionAtRangesWithText(...rangeText: string[]): void {
        this.state.baselineGetDefinitionAtPosition(/*markerOrRange*/ undefined, rangeText);
    }

    public baselineGoToSourceDefinition(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void {
        this.state.baselineGoToSourceDefinition(markerOrRange, /*rangeText*/ undefined);
    }

    public baselineGoToSourceDefinitionAtRangesWithText(...rangeText: string[]): void {
        this.state.baselineGoToSourceDefinition(/*markerOrRange*/ undefined, rangeText);
    }

    public baselineGoToType(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void {
        this.state.baselineGoToType(markerOrRange, /*rangeText*/ undefined);
    }

    public baselineGoToTypeAtRangesWithText(...rangeText: string[]): void {
        this.state.baselineGoToType(/*markerOrRange*/ undefined, rangeText);
    }

    public baselineGoToImplementation(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void {
        this.state.baselineGoToImplementation(markerOrRange, /*rangeText*/ undefined);
    }

    public baselineGoToImplementationAtRangesWithText(...rangeText: string[]): void {
        this.state.baselineGoToImplementation(/*markerOrRange*/ undefined, rangeText);
    }

    public baselineDocumentHighlights(markerOrRange?: ArrayOrSingle<FourSlash.MarkerOrNameOrRange>, options?: VerifyDocumentHighlightsOptions): void {
        this.state.baselineDocumentHighlights(markerOrRange, /*rangeText*/ undefined, options);
    }

    public baselineDocumentHighlightsAtRangesWithText(rangeText?: ArrayOrSingle<string>, options?: VerifyDocumentHighlightsOptions): void {
        this.state.baselineDocumentHighlights(/*markerOrRange*/ undefined, rangeText, options);
    }

    public noErrors(): void {
        this.state.verifyNoErrors();
    }

    public errorExistsAtRange(range: FourSlash.Range, code: number, message?: string): void {
        this.state.verifyErrorExistsAtRange(range, code, message);
    }

    public numberOfErrorsInCurrentFile(expected: number): void {
        this.state.verifyNumberOfErrorsInCurrentFile(expected);
    }

    public baselineCurrentFileBreakpointLocations(): void {
        this.state.baselineCurrentFileBreakpointLocations();
    }

    public baselineCurrentFileNameOrDottedNameSpans(): void {
        this.state.baselineCurrentFileNameOrDottedNameSpans();
    }

    public getEmitOutput(expectedOutputFiles: readonly string[]): void {
        this.state.verifyGetEmitOutput(expectedOutputFiles);
    }

    public baselineGetEmitOutput(): void {
        this.state.baselineGetEmitOutput();
    }

    public baselineQuickInfo(verbosityLevels?: FourSlash.VerbosityLevels, maximumLength?: number): void {
        this.state.baselineQuickInfo(verbosityLevels, maximumLength);
    }

    public baselineSignatureHelp(): void {
        this.state.baselineSignatureHelp();
    }

    public baselineCompletions(preferences?: ts.UserPreferences): void {
        this.state.baselineCompletions(preferences);
    }

    public baselineSmartSelection(): void {
        this.state.baselineSmartSelection();
    }

    public baselineSyntacticDiagnostics(): void {
        this.state.baselineSyntacticDiagnostics();
    }

    public baselineSyntacticAndSemanticDiagnostics(): void {
        this.state.baselineSyntacticAndSemanticDiagnostics();
    }

    public nameOrDottedNameSpanTextIs(text: string): void {
        this.state.verifyCurrentNameOrDottedNameSpanText(text);
    }

    public outliningSpansInCurrentFile(spans: FourSlash.Range[], kind?: "comment" | "region" | "code" | "imports"): void {
        this.state.verifyOutliningSpans(spans, kind);
    }

    public outliningHintSpansInCurrentFile(spans: FourSlash.Range[]): void {
        this.state.verifyOutliningHintSpans(spans);
    }

    public todoCommentsInCurrentFile(descriptors: string[]): void {
        this.state.verifyTodoComments(descriptors, this.state.getRanges());
    }

    public matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number): void {
        this.state.verifyMatchingBracePosition(bracePosition, expectedMatchPosition);
    }

    public noMatchingBracePositionInCurrentFile(bracePosition: number): void {
        this.state.verifyNoMatchingBracePosition(bracePosition);
    }

    public docCommentTemplateAt(marker: string | FourSlash.Marker, expectedOffset: number, expectedText: string, options?: ts.DocCommentTemplateOptions): void {
        this.state.goToMarker(marker);
        this.state.verifyDocCommentTemplate({ newText: expectedText.replace(/\r?\n/g, ts.testFormatSettings.newLineCharacter!), caretOffset: expectedOffset }, options);
    }

    public noDocCommentTemplateAt(marker: string | FourSlash.Marker): void {
        this.state.goToMarker(marker);
        this.state.verifyDocCommentTemplate(/*expected*/ undefined);
    }

    public rangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void {
        this.state.verifyRangeAfterCodeFix(expectedText, includeWhiteSpace, errorCode, index);
    }

    public codeFixAll(options: VerifyCodeFixAllOptions): void {
        this.state.verifyCodeFixAll(options);
    }

    public fileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void {
        this.state.verifyFileAfterApplyingRefactorAtMarker(markerName, expectedContent, refactorNameToApply, actionName, formattingOptions);
    }

    public rangeIs(expectedText: string, includeWhiteSpace?: boolean): void {
        this.state.verifyRangeIs(expectedText, includeWhiteSpace);
    }

    public getAndApplyCodeFix(errorCode?: number, index?: number): void {
        this.state.getAndApplyCodeActions(errorCode, index);
    }

    public applyCodeActionFromCompletion(markerName: string | undefined, options: VerifyCompletionActionOptions): void {
        this.state.applyCodeActionFromCompletion(markerName, options);
    }

    public importFixAtPosition(expectedTextArray: string[], errorCode?: number, preferences?: ts.UserPreferences): void {
        this.state.verifyImportFixAtPosition(expectedTextArray, errorCode, preferences);
    }

    public importFixModuleSpecifiers(marker: string, moduleSpecifiers: string[], preferences?: ts.UserPreferences): void {
        this.state.verifyImportFixModuleSpecifiers(marker, moduleSpecifiers, preferences);
    }

    public baselineAutoImports(marker: string, fullNamesForCodeFix?: string[], options?: ts.UserPreferences): void {
        this.state.baselineAutoImports(marker, fullNamesForCodeFix, options);
    }

    public navigationBar(json: any, options?: { checkSpans?: boolean; }): void {
        this.state.verifyNavigationBar(json, options);
    }

    public navigationTree(json: any, options?: { checkSpans?: boolean; }): void {
        this.state.verifyNavigationTree(json, options);
    }

    public navigateTo(...options: VerifyNavigateToOptions[]): void {
        this.state.verifyNavigateTo(options);
    }

    /**
     * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
     */
    public syntacticClassificationsAre(...classifications: { classificationType: string; text: string; }[]): void {
        this.state.verifySyntacticClassifications(classifications);
    }

    public encodedSyntacticClassificationsLength(length: number): void {
        this.state.verifyEncodedSyntacticClassificationsLength(length);
    }

    public encodedSemanticClassificationsLength(format: ts.SemanticClassificationFormat, length: number): void {
        this.state.verifyEncodedSemanticClassificationsLength(format, length);
    }

    /**
     * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
     */
    public semanticClassificationsAre(format: ts.SemanticClassificationFormat, ...classifications: Classification[]): void {
        this.state.verifySemanticClassifications(format, classifications);
    }

    public replaceWithSemanticClassifications(format: ts.SemanticClassificationFormat.TwentyTwenty): void {
        this.state.replaceWithSemanticClassifications(format);
    }

    public renameInfoSucceeded(
        displayName?: string,
        fullDisplayName?: string,
        kind?: string,
        kindModifiers?: string,
        fileToRename?: string,
        expectedRange?: FourSlash.Range,
        preferences?: ts.UserPreferences,
    ): void {
        this.state.verifyRenameInfoSucceeded(displayName, fullDisplayName, kind, kindModifiers, fileToRename, expectedRange, preferences);
    }

    public renameInfoFailed(message?: string, preferences?: ts.UserPreferences): void {
        this.state.verifyRenameInfoFailed(message, preferences);
    }

    public baselineRename(markerOrRange?: ArrayOrSingle<FourSlash.MarkerOrNameOrRange>, options?: RenameOptions): void {
        this.state.baselineRename(markerOrRange, /*rangeText*/ undefined, options);
    }

    public baselineRenameAtRangesWithText(rangeText?: ArrayOrSingle<string>, options?: RenameOptions): void {
        this.state.baselineRename(/*markerOrRange*/ undefined, rangeText, options);
    }

    public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: FourSlash.TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]): void {
        this.state.verifyQuickInfoDisplayParts(kind, kindModifiers, textSpan, displayParts, documentation, tags);
    }

    public getSyntacticDiagnostics(expected: readonly Diagnostic[]): void {
        this.state.getSyntacticDiagnostics(expected);
    }

    public getSemanticDiagnostics(expected: readonly Diagnostic[]): void {
        this.state.verifySemanticDiagnostics(expected);
    }

    public getRegionSemanticDiagnostics(
        ranges: ts.TextRange[],
        expectedDiagnostics: readonly Diagnostic[],
        expectedRanges: ts.TextRange[] | undefined,
    ): void {
        this.state.getRegionSemanticDiagnostics(ranges, expectedDiagnostics, expectedRanges);
    }

    public getSuggestionDiagnostics(expected: readonly Diagnostic[]): void {
        this.state.getSuggestionDiagnostics(expected);
    }

    public ProjectInfo(expected: string[]): void {
        this.state.verifyProjectInfo(expected);
    }

    public getEditsForFileRename(options: GetEditsForFileRenameOptions): void {
        this.state.getEditsForFileRename(options);
    }

    public baselineCallHierarchy(): void {
        this.state.baselineCallHierarchy();
    }

    public moveToNewFile(options: MoveToNewFileOptions): void {
        this.state.moveToNewFile(options);
    }

    public moveToFile(options: MoveToFileOptions): void {
        this.state.moveToFile(options);
    }

    public noMoveToNewFile(): void {
        this.state.noMoveToNewFile();
    }

    public organizeImports(newContent: string, mode?: ts.OrganizeImportsMode, preferences?: ts.UserPreferences): void {
        this.state.verifyOrganizeImports(newContent, mode, preferences);
    }

    public preparePasteEdits(options: PreparePasteEditsOptions): void {
        this.state.verifyPreparePasteEdits(options);
    }
    public pasteEdits(options: PasteEditsOptions): void {
        this.state.verifyPasteEdits(options);
    }
}

export class Edit {
    constructor(private state: FourSlash.TestState) {
    }
    public caretPosition(): FourSlash.Marker {
        return this.state.caretPosition();
    }
    public backspace(count?: number): void {
        this.state.deleteCharBehindMarker(count);
    }

    public deleteAtCaret(times?: number): void {
        this.state.deleteChar(times);
    }

    public replace(start: number, length: number, text: string): void {
        this.state.replace(start, length, text);
    }

    public paste(text: string): void {
        this.state.paste(text);
    }

    public insert(text: string): void {
        this.insertLines(text);
    }

    public insertLine(text: string): void {
        this.insertLines(text + "\n");
    }

    public insertLines(...lines: string[]): void {
        this.state.type(lines.join("\n"));
    }

    public deleteLine(index: number): void {
        this.deleteLineRange(index, index);
    }

    public deleteLineRange(startIndex: number, endIndexInclusive: number): void {
        this.state.deleteLineRange(startIndex, endIndexInclusive);
    }

    public replaceLine(index: number, text: string): void {
        this.state.selectLine(index);
        this.state.type(text);
    }

    public moveRight(count?: number): void {
        this.state.moveCaretRight(count);
    }

    public moveLeft(count?: number): void {
        if (typeof count === "undefined") {
            count = 1;
        }
        this.state.moveCaretRight(count * -1);
    }

    public enableFormatting(): void {
        this.state.enableFormatting = true;
    }

    public disableFormatting(): void {
        this.state.enableFormatting = false;
    }

    public applyRefactor(options: ApplyRefactorOptions): void {
        this.state.applyRefactor(options);
    }
}

export class Debug {
    constructor(private state: FourSlash.TestState) {
    }

    public printCurrentParameterHelp(): void {
        this.state.printCurrentParameterHelp();
    }

    public printCurrentFileState(): void {
        this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ true);
    }

    public printCurrentFileStateWithWhitespace(): void {
        this.state.printCurrentFileState(/*showWhitespace*/ true, /*makeCaretVisible*/ true);
    }

    public printCurrentFileStateWithoutCaret(): void {
        this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ false);
    }

    public printCurrentQuickInfo(): void {
        this.state.printCurrentQuickInfo();
    }

    public printCurrentSignatureHelp(): void {
        this.state.printCurrentSignatureHelp();
    }

    public printCompletionListMembers(options: ts.UserPreferences | undefined): void {
        this.state.printCompletionListMembers(options);
    }

    public printAvailableCodeFixes(): void {
        this.state.printAvailableCodeFixes();
    }

    public printBreakpointLocation(pos: number): void {
        this.state.printBreakpointLocation(pos);
    }
    public printBreakpointAtCurrentLocation(): void {
        this.state.printBreakpointAtCurrentLocation();
    }

    public printNameOrDottedNameSpans(pos: number): void {
        this.state.printNameOrDottedNameSpans(pos);
    }

    public printErrorList(): void {
        this.state.printErrorList();
    }

    public printNavigationItems(searchValue = ".*"): void {
        this.state.printNavigationItems(searchValue);
    }

    public printNavigationBar(): void {
        this.state.printNavigationBar();
    }

    public printContext(): void {
        this.state.printContext();
    }

    public printOutliningSpans(): void {
        this.state.printOutliningSpans();
    }
}

export class Format {
    constructor(private state: FourSlash.TestState) {
    }

    public document(): void {
        this.state.formatDocument();
    }

    public copyFormatOptions(): ts.FormatCodeSettings {
        return this.state.copyFormatOptions();
    }

    public setFormatOptions(options: ts.FormatCodeOptions): ts.FormatCodeSettings {
        return this.state.setFormatOptions(options);
    }

    public selection(startMarker: string, endMarker: string): void {
        this.state.formatSelection(this.state.getMarkerByName(startMarker).position, this.state.getMarkerByName(endMarker).position);
    }

    public onType(posMarker: string, key: string): void {
        this.state.formatOnType(this.state.getMarkerByName(posMarker).position, key);
    }

    public setOption(name: keyof ts.FormatCodeSettings, value: number | string | boolean): void {
        this.state.setFormatOptions({ ...this.state.formatCodeSettings, [name]: value });
    }
}

export class Cancellation {
    constructor(private state: FourSlash.TestState) {
    }

    public resetCancelled(): void {
        this.state.resetCancelled();
    }

    public setCancelled(numberOfCalls = 0): void {
        this.state.setCancelled(numberOfCalls);
    }
}

interface OlderClassification {
    classificationType: ts.ClassificationTypeNames;
    text: string;
    textSpan?: FourSlash.TextSpan;
}

// The VS Code LSP
interface ModernClassification {
    classificationType: string;
    text?: string;
    textSpan?: FourSlash.TextSpan;
}

type Classification = OlderClassification | ModernClassification;

export function classification(format: ts.SemanticClassificationFormat): {
    semanticToken: (identifier: string, text: string, _position: number) => Classification;
    comment?: undefined;
    identifier?: undefined;
    keyword?: undefined;
    numericLiteral?: undefined;
    operator?: undefined;
    stringLiteral?: undefined;
    whiteSpace?: undefined;
    text?: undefined;
    punctuation?: undefined;
    docCommentTagName?: undefined;
    className?: undefined;
    enumName?: undefined;
    interfaceName?: undefined;
    moduleName?: undefined;
    typeParameterName?: undefined;
    parameterName?: undefined;
    typeAliasName?: undefined;
    jsxOpenTagName?: undefined;
    jsxCloseTagName?: undefined;
    jsxSelfClosingTagName?: undefined;
    jsxAttribute?: undefined;
    jsxText?: undefined;
    jsxAttributeStringLiteralValue?: undefined;
    getClassification?: undefined;
} | {
    comment: (text: string, position?: number) => Classification;
    identifier: (text: string, position?: number) => Classification;
    keyword: (text: string, position?: number) => Classification;
    numericLiteral: (text: string, position?: number) => Classification;
    operator: (text: string, position?: number) => Classification;
    stringLiteral: (text: string, position?: number) => Classification;
    whiteSpace: (text: string, position?: number) => Classification;
    text: (text: string, position?: number) => Classification;
    punctuation: (text: string, position?: number) => Classification;
    docCommentTagName: (text: string, position?: number) => Classification;
    className: (text: string, position?: number) => Classification;
    enumName: (text: string, position?: number) => Classification;
    interfaceName: (text: string, position?: number) => Classification;
    moduleName: (text: string, position?: number) => Classification;
    typeParameterName: (text: string, position?: number) => Classification;
    parameterName: (text: string, position?: number) => Classification;
    typeAliasName: (text: string, position?: number) => Classification;
    jsxOpenTagName: (text: string, position?: number) => Classification;
    jsxCloseTagName: (text: string, position?: number) => Classification;
    jsxSelfClosingTagName: (text: string, position?: number) => Classification;
    jsxAttribute: (text: string, position?: number) => Classification;
    jsxText: (text: string, position?: number) => Classification;
    jsxAttributeStringLiteralValue: (text: string, position?: number) => Classification;
    getClassification: (classificationType: ts.ClassificationTypeNames, text: string, position?: number) => Classification;
    semanticToken?: undefined;
} {
    function semanticToken(identifier: string, text: string, _position: number): Classification {
        return {
            classificationType: identifier,
            text,
        };
    }

    if (format === ts.SemanticClassificationFormat.TwentyTwenty) {
        return {
            semanticToken,
        };
    }

    // Defaults to the previous semantic classifier factory functions

    function comment(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.comment, text, position);
    }

    function identifier(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.identifier, text, position);
    }

    function keyword(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.keyword, text, position);
    }

    function numericLiteral(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.numericLiteral, text, position);
    }

    function operator(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.operator, text, position);
    }

    function stringLiteral(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.stringLiteral, text, position);
    }

    function whiteSpace(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.whiteSpace, text, position);
    }

    function text(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.text, text, position);
    }

    function punctuation(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.punctuation, text, position);
    }

    function docCommentTagName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.docCommentTagName, text, position);
    }

    function className(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.className, text, position);
    }

    function enumName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.enumName, text, position);
    }

    function interfaceName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.interfaceName, text, position);
    }

    function moduleName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.moduleName, text, position);
    }

    function typeParameterName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.typeParameterName, text, position);
    }

    function parameterName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.parameterName, text, position);
    }

    function typeAliasName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.typeAliasName, text, position);
    }

    function jsxOpenTagName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.jsxOpenTagName, text, position);
    }

    function jsxCloseTagName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.jsxCloseTagName, text, position);
    }

    function jsxSelfClosingTagName(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.jsxSelfClosingTagName, text, position);
    }

    function jsxAttribute(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.jsxAttribute, text, position);
    }

    function jsxText(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.jsxText, text, position);
    }

    function jsxAttributeStringLiteralValue(text: string, position?: number): Classification {
        return getClassification(ts.ClassificationTypeNames.jsxAttributeStringLiteralValue, text, position);
    }

    function getClassification(classificationType: ts.ClassificationTypeNames, text: string, position?: number): Classification {
        const textSpan = position === undefined ? undefined : { start: position, end: position + text.length };
        return { classificationType, text, textSpan };
    }

    return {
        comment,
        identifier,
        keyword,
        numericLiteral,
        operator,
        stringLiteral,
        whiteSpace,
        text,
        punctuation,
        docCommentTagName,
        className,
        enumName,
        interfaceName,
        moduleName,
        typeParameterName,
        parameterName,
        typeAliasName,
        jsxOpenTagName,
        jsxCloseTagName,
        jsxSelfClosingTagName,
        jsxAttribute,
        jsxText,
        jsxAttributeStringLiteralValue,
        getClassification,
    };
}

export namespace Completion {
    import SortTextType = ts.Completions.SortText;
    export type SortText = SortTextType;
    export import CompletionSource = ts.Completions.CompletionSource;

    export const SortText = {
        // Presets
        LocalDeclarationPriority: "10" as SortText,
        LocationPriority: "11" as SortText,
        OptionalMember: "12" as SortText,
        MemberDeclaredBySpreadAssignment: "13" as SortText,
        SuggestedClassMembers: "14" as SortText,
        GlobalsOrKeywords: "15" as SortText,
        AutoImportSuggestions: "16" as SortText,
        ClassMemberSnippets: "17" as SortText,
        JavascriptIdentifiers: "18" as SortText,

        // Transformations
        Deprecated(sortText: SortText): SortText {
            return "z" + sortText as SortText;
        },

        ObjectLiteralProperty(presetSortText: SortText, symbolDisplayName: string): SortText {
            return `${presetSortText}\0${symbolDisplayName}\0` as SortText;
        },

        SortBelow(sortText: SortText): SortText {
            return sortText + "1" as SortText;
        },
    };

    const functionEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "function",
        kindModifiers: "declare",
        sortText: SortText.GlobalsOrKeywords,
    });
    const deprecatedFunctionEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "function",
        kindModifiers: "deprecated,declare",
        sortText: "z15" as SortText,
    });
    const varEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "var",
        kindModifiers: "declare",
        sortText: SortText.GlobalsOrKeywords,
    });
    const moduleEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "module",
        kindModifiers: "declare",
        sortText: SortText.GlobalsOrKeywords,
    });
    const keywordEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "keyword",
        sortText: SortText.GlobalsOrKeywords,
    });
    const methodEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "method",
        kindModifiers: "declare",
        sortText: SortText.LocationPriority,
    });
    const deprecatedMethodEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "method",
        kindModifiers: "deprecated,declare",
        sortText: "z11" as SortText,
    });
    const propertyEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "property",
        kindModifiers: "declare",
        sortText: SortText.LocationPriority,
    });
    const interfaceEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "interface",
        kindModifiers: "declare",
        sortText: SortText.GlobalsOrKeywords,
    });
    const deprecatedInterfaceEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "interface",
        kindModifiers: "deprecated,declare",
        sortText: "z15" as SortText,
    });
    const typeEntry = (name: string): ExpectedCompletionEntryObject => ({
        name,
        kind: "type",
        kindModifiers: "declare",
        sortText: SortText.GlobalsOrKeywords,
    });

    const res: ExpectedCompletionEntryObject[] = [];
    for (let i = ts.SyntaxKind.FirstKeyword; i <= ts.SyntaxKind.LastKeyword; i++) {
        res.push({
            name: ts.Debug.checkDefined(ts.tokenToString(i)),
            kind: "keyword",
            sortText: SortText.GlobalsOrKeywords,
        });
    }
    export const keywordsWithUndefined: readonly ExpectedCompletionEntryObject[] = res;
    export const keywords: readonly ExpectedCompletionEntryObject[] = keywordsWithUndefined.filter(k => k.name !== "undefined");

    export const typeKeywords: readonly ExpectedCompletionEntryObject[] = [
        "any",
        "asserts",
        "bigint",
        "boolean",
        "false",
        "infer",
        "keyof",
        "never",
        "null",
        "number",
        "object",
        "readonly",
        "string",
        "symbol",
        "true",
        "typeof",
        "undefined",
        "unique",
        "unknown",
        "void",
    ].map(keywordEntry);

    export function sorted(entries: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[] {
        return ts.toSorted(entries, compareExpectedCompletionEntries);
    }

    // If you want to use a function like `globalsPlus`, that function needs to sort
    // the concatted array since the entries provided as "plus" could be interleaved
    // among the "globals." However, we still want to assert that the "plus" array
    // was internally sorted correctly, so we tack it onto the sorted concatted array
    // so `verify.completions` can assert that it represents the same order as the response.
    function combineExpectedCompletionEntries(
        functionName: string,
        providedByHarness: readonly ExpectedCompletionEntry[],
        providedByTest: readonly ExpectedCompletionEntry[],
    ): ExpectedExactCompletionsPlus {
        return Object.assign(sorted([...providedByHarness, ...providedByTest]), { plusFunctionName: functionName, plusArgument: providedByTest });
    }

    export function typeKeywordsPlus(plus: readonly ExpectedCompletionEntry[]): ExpectedExactCompletionsPlus {
        return combineExpectedCompletionEntries("typeKeywordsPlus", typeKeywords, plus);
    }

    const globalTypeDecls: readonly ExpectedCompletionEntryObject[] = [
        interfaceEntry("Symbol"),
        typeEntry("PropertyKey"),
        interfaceEntry("PropertyDescriptor"),
        interfaceEntry("PropertyDescriptorMap"),
        varEntry("Object"),
        interfaceEntry("ObjectConstructor"),
        varEntry("Function"),
        interfaceEntry("FunctionConstructor"),
        typeEntry("ThisParameterType"),
        typeEntry("OmitThisParameter"),
        interfaceEntry("CallableFunction"),
        interfaceEntry("NewableFunction"),
        interfaceEntry("IArguments"),
        varEntry("String"),
        interfaceEntry("StringConstructor"),
        varEntry("Boolean"),
        interfaceEntry("BooleanConstructor"),
        varEntry("Number"),
        interfaceEntry("NumberConstructor"),
        interfaceEntry("TemplateStringsArray"),
        interfaceEntry("ImportMeta"),
        interfaceEntry("ImportCallOptions"),
        deprecatedInterfaceEntry("ImportAssertions"),
        interfaceEntry("ImportAttributes"),
        varEntry("Math"),
        varEntry("Date"),
        interfaceEntry("DateConstructor"),
        interfaceEntry("RegExpMatchArray"),
        interfaceEntry("RegExpExecArray"),
        varEntry("RegExp"),
        interfaceEntry("RegExpConstructor"),
        varEntry("Error"),
        interfaceEntry("ErrorConstructor"),
        varEntry("EvalError"),
        interfaceEntry("EvalErrorConstructor"),
        varEntry("RangeError"),
        interfaceEntry("RangeErrorConstructor"),
        varEntry("ReferenceError"),
        interfaceEntry("ReferenceErrorConstructor"),
        varEntry("SyntaxError"),
        interfaceEntry("SyntaxErrorConstructor"),
        varEntry("TypeError"),
        interfaceEntry("TypeErrorConstructor"),
        varEntry("URIError"),
        interfaceEntry("URIErrorConstructor"),
        varEntry("JSON"),
        interfaceEntry("ReadonlyArray"),
        interfaceEntry("ConcatArray"),
        varEntry("Array"),
        interfaceEntry("ArrayConstructor"),
        interfaceEntry("TypedPropertyDescriptor"),
        typeEntry("ClassDecorator"),
        typeEntry("PropertyDecorator"),
        typeEntry("MethodDecorator"),
        typeEntry("ParameterDecorator"),
        typeEntry("ClassMemberDecoratorContext"),
        typeEntry("DecoratorContext"),
        typeEntry("DecoratorMetadata"),
        typeEntry("DecoratorMetadataObject"),
        interfaceEntry("ClassDecoratorContext"),
        interfaceEntry("ClassMethodDecoratorContext"),
        interfaceEntry("ClassGetterDecoratorContext"),
        interfaceEntry("ClassSetterDecoratorContext"),
        interfaceEntry("ClassAccessorDecoratorContext"),
        interfaceEntry("ClassAccessorDecoratorTarget"),
        interfaceEntry("ClassAccessorDecoratorResult"),
        interfaceEntry("ClassFieldDecoratorContext"),
        typeEntry("PromiseConstructorLike"),
        interfaceEntry("PromiseLike"),
        interfaceEntry("Promise"),
        typeEntry("Awaited"),
        interfaceEntry("ArrayLike"),
        typeEntry("Partial"),
        typeEntry("Required"),
        typeEntry("Readonly"),
        typeEntry("Pick"),
        typeEntry("Record"),
        typeEntry("Exclude"),
        typeEntry("Extract"),
        typeEntry("Omit"),
        typeEntry("NonNullable"),
        typeEntry("Parameters"),
        typeEntry("ConstructorParameters"),
        typeEntry("ReturnType"),
        typeEntry("InstanceType"),
        typeEntry("Uppercase"),
        typeEntry("Lowercase"),
        typeEntry("Capitalize"),
        typeEntry("Uncapitalize"),
        typeEntry("NoInfer"),
        interfaceEntry("ThisType"),
        varEntry("ArrayBuffer"),
        interfaceEntry("ArrayBufferTypes"),
        typeEntry("ArrayBufferLike"),
        interfaceEntry("ArrayBufferConstructor"),
        interfaceEntry("ArrayBufferView"),
        varEntry("DataView"),
        interfaceEntry("DataViewConstructor"),
        varEntry("Int8Array"),
        interfaceEntry("Int8ArrayConstructor"),
        varEntry("Uint8Array"),
        interfaceEntry("Uint8ArrayConstructor"),
        varEntry("Uint8ClampedArray"),
        interfaceEntry("Uint8ClampedArrayConstructor"),
        varEntry("Int16Array"),
        interfaceEntry("Int16ArrayConstructor"),
        varEntry("Uint16Array"),
        interfaceEntry("Uint16ArrayConstructor"),
        varEntry("Int32Array"),
        interfaceEntry("Int32ArrayConstructor"),
        varEntry("Uint32Array"),
        interfaceEntry("Uint32ArrayConstructor"),
        varEntry("Float32Array"),
        interfaceEntry("Float32ArrayConstructor"),
        varEntry("Float64Array"),
        interfaceEntry("Float64ArrayConstructor"),
        moduleEntry("Intl"),
        typeEntry("WeakKey"),
        interfaceEntry("WeakKeyTypes"),
    ];

    export const globalThisEntry: ExpectedCompletionEntry = {
        name: "globalThis",
        kind: "module",
        sortText: SortText.GlobalsOrKeywords,
    };
    export const globalTypes: ExpectedExactCompletionsPlus = globalTypesPlus([]);
    export function globalTypesPlus(plus: readonly ExpectedCompletionEntry[]): ExpectedExactCompletionsPlus {
        return combineExpectedCompletionEntries(
            "globalTypesPlus",
            [globalThisEntry, ...globalTypeDecls, ...typeKeywords],
            plus,
        );
    }

    export const typeAssertionKeywords: readonly ExpectedCompletionEntry[] = globalTypesPlus([keywordEntry("const")]);

    function getInJsKeywords(keywords: readonly ExpectedCompletionEntryObject[]): readonly ExpectedCompletionEntryObject[] {
        return keywords.filter(keyword => {
            switch (keyword.name) {
                case "enum":
                case "interface":
                case "implements":
                case "private":
                case "protected":
                case "public":
                case "abstract":
                case "any":
                case "boolean":
                case "declare":
                case "infer":
                case "is":
                case "keyof":
                case "module":
                case "namespace":
                case "never":
                case "readonly":
                case "number":
                case "object":
                case "string":
                case "symbol":
                case "type":
                case "unique":
                case "override":
                case "unknown":
                case "global":
                case "bigint":
                    return false;
                default:
                    return true;
            }
        });
    }

    export const classElementKeywords: readonly ExpectedCompletionEntryObject[] = [
        "abstract",
        "accessor",
        "async",
        "constructor",
        "declare",
        "get",
        "override",
        "private",
        "protected",
        "public",
        "readonly",
        "set",
        "static",
    ].map(keywordEntry);

    export const classElementInJsKeywords: readonly ExpectedCompletionEntryObject[] = getInJsKeywords(classElementKeywords);

    export const constructorParameterKeywords: readonly ExpectedCompletionEntryObject[] = ["override", "private", "protected", "public", "readonly"].map((name): ExpectedCompletionEntryObject => ({
        name,
        kind: "keyword",
        sortText: SortText.GlobalsOrKeywords,
    }));

    export const functionMembers: readonly ExpectedCompletionEntryObject[] = [
        methodEntry("apply"),
        methodEntry("call"),
        methodEntry("bind"),
        methodEntry("toString"),
        propertyEntry("length"),
        { name: "arguments", kind: "property", kindModifiers: "declare", text: "(property) Function.arguments: any" },
        propertyEntry("caller"),
    ].sort(compareExpectedCompletionEntries);

    export function functionMembersPlus(plus: readonly ExpectedCompletionEntryObject[]): ExpectedExactCompletionsPlus {
        return combineExpectedCompletionEntries("functionMembersPlus", functionMembers, plus);
    }

    export const stringMembers: readonly ExpectedCompletionEntryObject[] = [
        methodEntry("toString"),
        methodEntry("charAt"),
        methodEntry("charCodeAt"),
        methodEntry("concat"),
        methodEntry("indexOf"),
        methodEntry("lastIndexOf"),
        methodEntry("localeCompare"),
        methodEntry("match"),
        methodEntry("replace"),
        methodEntry("search"),
        methodEntry("slice"),
        methodEntry("split"),
        methodEntry("substring"),
        methodEntry("toLowerCase"),
        methodEntry("toLocaleLowerCase"),
        methodEntry("toUpperCase"),
        methodEntry("toLocaleUpperCase"),
        methodEntry("trim"),
        propertyEntry("length"),
        deprecatedMethodEntry("substr"),
        methodEntry("valueOf"),
    ].sort(compareExpectedCompletionEntries);

    export const functionMembersWithPrototype: readonly ExpectedCompletionEntryObject[] = [
        ...functionMembers,
        propertyEntry("prototype"),
    ].sort(compareExpectedCompletionEntries);

    export function functionMembersWithPrototypePlus(plus: readonly ExpectedCompletionEntryObject[]): ExpectedCompletionEntryObject[] {
        return [...functionMembersWithPrototype, ...plus].sort(compareExpectedCompletionEntries);
    }

    // TODO: Shouldn't propose type keywords in statement position
    export const statementKeywordsWithTypes: readonly ExpectedCompletionEntryObject[] = [
        "abstract",
        "any",
        "as",
        "asserts",
        "async",
        "await",
        "bigint",
        "boolean",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "debugger",
        "declare",
        "default",
        "delete",
        "do",
        "else",
        "enum",
        "export",
        "extends",
        "false",
        "finally",
        "for",
        "function",
        "if",
        "implements",
        "import",
        "in",
        "infer",
        "instanceof",
        "interface",
        "keyof",
        "let",
        "module",
        "namespace",
        "never",
        "new",
        "null",
        "number",
        "object",
        "package",
        "readonly",
        "return",
        "satisfies",
        "string",
        "super",
        "switch",
        "symbol",
        "this",
        "throw",
        "true",
        "try",
        "type",
        "typeof",
        "unique",
        "unknown",
        "using",
        "var",
        "void",
        "while",
        "with",
        "yield",
    ].map(keywordEntry);

    export const statementKeywords: readonly ExpectedCompletionEntryObject[] = statementKeywordsWithTypes.filter(k => {
        const name = k.name;
        switch (name) {
            case "false":
            case "true":
            case "null":
            case "void":
                return true;
            case "declare":
            case "module":
                return false;
            default:
                return !ts.contains(typeKeywords, k);
        }
    });

    export const statementInJsKeywords: readonly ExpectedCompletionEntryObject[] = getInJsKeywords(statementKeywords);

    export const globalsVars: readonly ExpectedCompletionEntryObject[] = [
        varEntry("Array"),
        varEntry("ArrayBuffer"),
        varEntry("Boolean"),
        varEntry("DataView"),
        varEntry("Date"),
        functionEntry("decodeURI"),
        functionEntry("decodeURIComponent"),
        functionEntry("encodeURI"),
        functionEntry("encodeURIComponent"),
        varEntry("Error"),
        deprecatedFunctionEntry("escape"),
        functionEntry("eval"),
        varEntry("EvalError"),
        varEntry("Float32Array"),
        varEntry("Float64Array"),
        varEntry("Function"),
        varEntry("Infinity"),
        moduleEntry("Intl"),
        varEntry("Int16Array"),
        varEntry("Int32Array"),
        varEntry("Int8Array"),
        functionEntry("isFinite"),
        functionEntry("isNaN"),
        varEntry("JSON"),
        varEntry("Math"),
        varEntry("NaN"),
        varEntry("Number"),
        varEntry("Object"),
        functionEntry("parseFloat"),
        functionEntry("parseInt"),
        varEntry("RangeError"),
        varEntry("ReferenceError"),
        varEntry("RegExp"),
        varEntry("String"),
        varEntry("SyntaxError"),
        varEntry("TypeError"),
        varEntry("Uint16Array"),
        varEntry("Uint32Array"),
        varEntry("Uint8Array"),
        varEntry("Uint8ClampedArray"),
        deprecatedFunctionEntry("unescape"),
        varEntry("URIError"),
    ];

    const globalKeywordsInsideFunction: readonly ExpectedCompletionEntryObject[] = [
        "as",
        "async",
        "await",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "else",
        "enum",
        "export",
        "extends",
        "false",
        "finally",
        "for",
        "function",
        "if",
        "implements",
        "import",
        "in",
        "instanceof",
        "interface",
        "let",
        "new",
        "null",
        "package",
        "return",
        "satisfies",
        "super",
        "switch",
        "this",
        "throw",
        "true",
        "try",
        "type",
        "typeof",
        "using",
        "var",
        "void",
        "while",
        "with",
        "yield",
    ].map(keywordEntry);

    function compareExpectedCompletionEntries(a: ExpectedCompletionEntry, b: ExpectedCompletionEntry) {
        const aSortText = typeof a !== "string" && a.sortText || ts.Completions.SortText.LocationPriority;
        const bSortText = typeof b !== "string" && b.sortText || ts.Completions.SortText.LocationPriority;
        const bySortText = ts.compareStringsCaseSensitiveUI(aSortText, bSortText);
        if (bySortText !== ts.Comparison.EqualTo) return bySortText;
        return ts.compareStringsCaseSensitiveUI(typeof a === "string" ? a : a.name, typeof b === "string" ? b : b.name);
    }

    export const undefinedVarEntry: ExpectedCompletionEntryObject = {
        name: "undefined",
        kind: "var",
        sortText: SortText.GlobalsOrKeywords,
    };
    // TODO: many of these are inappropriate to always provide
    export const globalsInsideFunction = (plus: readonly ExpectedCompletionEntry[], options?: { noLib?: boolean; }): readonly ExpectedCompletionEntry[] =>
        [
            { name: "arguments", kind: "local var" },
            ...plus,
            globalThisEntry,
            ...options?.noLib ? [] : globalsVars,
            undefinedVarEntry,
            ...globalKeywordsInsideFunction,
        ].sort(compareExpectedCompletionEntries);

    const globalInJsKeywordsInsideFunction = getInJsKeywords(globalKeywordsInsideFunction);

    // TODO: many of these are inappropriate to always provide
    export const globalsInJsInsideFunction = (plus: readonly ExpectedCompletionEntry[], options?: { noLib?: boolean; }): readonly ExpectedCompletionEntry[] =>
        [
            { name: "arguments", kind: "local var" },
            globalThisEntry,
            ...options?.noLib ? [] : globalsVars,
            ...plus,
            undefinedVarEntry,
            ...globalInJsKeywordsInsideFunction,
        ].sort(compareExpectedCompletionEntries);

    // TODO: many of these are inappropriate to always provide
    export const globalKeywords: readonly ExpectedCompletionEntryObject[] = [
        "abstract",
        "any",
        "as",
        "asserts",
        "async",
        "await",
        "bigint",
        "boolean",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "debugger",
        "declare",
        "default",
        "delete",
        "do",
        "else",
        "enum",
        "export",
        "extends",
        "false",
        "finally",
        "for",
        "function",
        "if",
        "implements",
        "import",
        "in",
        "infer",
        "instanceof",
        "interface",
        "keyof",
        "let",
        "module",
        "namespace",
        "never",
        "new",
        "null",
        "number",
        "object",
        "package",
        "readonly",
        "return",
        "satisfies",
        "string",
        "super",
        "switch",
        "symbol",
        "this",
        "throw",
        "true",
        "try",
        "type",
        "typeof",
        "unique",
        "unknown",
        "using",
        "var",
        "void",
        "while",
        "with",
        "yield",
    ].map(keywordEntry);

    export const globalInJsKeywords: readonly ExpectedCompletionEntryObject[] = getInJsKeywords(globalKeywords);

    export const insideMethodKeywords: readonly ExpectedCompletionEntryObject[] = [
        "as",
        "async",
        "await",
        "break",
        "case",
        "catch",
        "class",
        "const",
        "continue",
        "debugger",
        "default",
        "delete",
        "do",
        "else",
        "enum",
        "export",
        "extends",
        "false",
        "finally",
        "for",
        "function",
        "if",
        "implements",
        "import",
        "in",
        "instanceof",
        "interface",
        "let",
        "new",
        "null",
        "package",
        "return",
        "satisfies",
        "super",
        "switch",
        "this",
        "throw",
        "true",
        "try",
        "type",
        "typeof",
        "using",
        "var",
        "void",
        "while",
        "with",
        "yield",
    ].map(keywordEntry);

    export const insideMethodInJsKeywords: readonly ExpectedCompletionEntryObject[] = getInJsKeywords(insideMethodKeywords);

    export const globals: readonly ExpectedCompletionEntryObject[] = [
        globalThisEntry,
        ...globalsVars,
        undefinedVarEntry,
        ...globalKeywords,
    ].sort(compareExpectedCompletionEntries);

    export const globalsInJs: readonly ExpectedCompletionEntryObject[] = [
        globalThisEntry,
        ...globalsVars,
        undefinedVarEntry,
        ...globalInJsKeywords,
    ].sort(compareExpectedCompletionEntries);

    export function globalsPlus(plus: readonly ExpectedCompletionEntry[], options?: { noLib?: boolean; }): ExpectedExactCompletionsPlus {
        return combineExpectedCompletionEntries("globalsPlus", [
            globalThisEntry,
            ...options?.noLib ? [] : globalsVars,
            undefinedVarEntry,
            ...globalKeywords,
        ], plus);
    }

    export function globalsInJsPlus(plus: readonly ExpectedCompletionEntry[], options?: { noLib?: boolean; }): ExpectedExactCompletionsPlus {
        return combineExpectedCompletionEntries("globalsInJsPlus", [
            globalThisEntry,
            ...options?.noLib ? [] : globalsVars,
            undefinedVarEntry,
            ...globalInJsKeywords,
        ], plus);
    }
}

export interface ReferenceGroup {
    definition: ReferenceGroupDefinition;
    ranges: FourSlash.Range[];
}

export type ReferenceGroupDefinition = string | { text: string; range: FourSlash.Range; };

export interface ApplyRefactorOptions {
    refactorName: string;
    actionName: string;
    actionDescription: string;
    newContent: NewFileContent;
    triggerReason?: ts.RefactorTriggerReason;
}

export type ExpectedCompletionEntry = string | ExpectedCompletionEntryObject;
export interface ExpectedCompletionEntryObject {
    readonly name: string;
    readonly source?: string;
    readonly insertText?: string;
    readonly filterText?: string;
    readonly replacementSpan?: FourSlash.Range;
    readonly hasAction?: boolean; // If not specified, will assert that this is false.
    readonly isRecommended?: boolean; // If not specified, will assert that this is false.
    readonly isFromUncheckedFile?: boolean; // If not specified, won't assert about this
    readonly kind?: string; // If not specified, won't assert about this
    readonly isPackageJsonImport?: boolean; // If not specified, won't assert about this
    readonly isSnippet?: boolean;
    readonly kindModifiers?: string; // Must be paired with 'kind'
    readonly text?: string;
    readonly documentation?: string;
    readonly sourceDisplay?: string;
    readonly labelDetails?: ExpectedCompletionEntryLabelDetails;
    readonly tags?: readonly ts.JSDocTagInfo[];
    readonly sortText?: ts.Completions.SortText;
    readonly commitCharacters?: string[]; // If not specified, won't assert about this
}

export interface ExpectedCompletionEntryLabelDetails {
    detail?: string;
    description?: string;
}

export type ExpectedExactCompletionsPlus = readonly ExpectedCompletionEntry[] & {
    plusFunctionName: string;
    plusArgument: readonly ExpectedCompletionEntry[];
};

export interface VerifyCompletionsOptions {
    readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
    readonly isNewIdentifierLocation?: boolean; // Always tested
    readonly isGlobalCompletion?: boolean; // Only tested if set
    readonly optionalReplacementSpan?: FourSlash.Range; // Only tested if set
    readonly exact?: ArrayOrSingle<ExpectedCompletionEntry> | ExpectedExactCompletionsPlus;
    readonly unsorted?: readonly ExpectedCompletionEntry[];
    readonly includes?: ArrayOrSingle<ExpectedCompletionEntry>;
    readonly excludes?: ArrayOrSingle<string>;
    readonly preferences?: ts.UserPreferences;
    readonly triggerCharacter?: ts.CompletionsTriggerCharacter;
    readonly defaultCommitCharacters?: string[]; // Only tested if set
}

export interface VerifySignatureHelpOptions {
    readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
    /** @default 1 */
    readonly overloadsCount?: number;
    /** @default undefined */
    readonly docComment?: string;
    readonly text?: string;
    readonly parameterName?: string;
    readonly parameterSpan?: string;
    /** @default undefined */
    readonly parameterDocComment?: string;
    readonly parameterCount?: number;
    readonly argumentCount?: number;
    /** @default false */
    readonly isVariadic?: boolean;
    /** @default ts.emptyArray */
    readonly tags?: readonly ts.JSDocTagInfo[];
    readonly triggerReason?: ts.SignatureHelpTriggerReason;
    readonly overrideSelectedItemIndex?: number;
}

export interface VerifyNavigateToOptions {
    readonly pattern: string;
    readonly fileName?: string;
    readonly expected: readonly ExpectedNavigateToItem[];
    readonly excludeLibFiles?: boolean;
}

export interface ExpectedNavigateToItem {
    readonly name: string;
    readonly kind: ts.ScriptElementKind;
    readonly kindModifiers?: string;
    readonly matchKind?: keyof typeof ts.PatternMatchKind;
    readonly isCaseSensitive?: boolean;
    readonly range: FourSlash.Range;
    readonly containerName?: string;
    readonly containerKind?: ts.ScriptElementKind;
}

export interface VerifyInlayHintsOptions {
    text: string;
    position: number;
    kind?: ts.InlayHintKind;
    whitespaceBefore?: boolean;
    whitespaceAfter?: boolean;
}

export type ArrayOrSingle<T> = T | readonly T[];

export interface VerifyCompletionListContainsOptions extends ts.UserPreferences {
    triggerCharacter?: ts.CompletionsTriggerCharacter;
    sourceDisplay: string;
    isRecommended?: true;
    insertText?: string;
    replacementSpan?: FourSlash.Range;
}

export interface VerifyDocumentHighlightsOptions {
    filesToSearch: readonly string[];
}

export type NewFileContent = string | { readonly [filename: string]: string; };

export interface NewContentOptions {
    // Exactly one of these should be defined.
    newFileContent?: NewFileContent;
    newRangeContent?: string;
}

export interface VerifyCodeFixOptions extends NewContentOptions {
    readonly description: string | [string, ...(string | number)[]] | DiagnosticIgnoredInterpolations;
    readonly errorCode?: number;
    readonly index?: number;
    readonly preferences?: ts.UserPreferences;
    readonly applyChanges?: boolean;
    readonly commands?: readonly ts.CodeActionCommand[];
}

export interface VerifyCodeFixAvailableOptions {
    description: string;
    commands?: ts.CodeActionCommand[];
}

export interface VerifyCodeFixAllOptions {
    fixId: string;
    fixAllDescription: string;
    newFileContent: NewFileContent;
    commands: readonly {}[];
    preferences?: ts.UserPreferences;
}

export interface VerifyRefactorOptions {
    name: string;
    actionName: string;
    refactors: readonly ts.ApplicableRefactorInfo[];
}

export interface VerifyCompletionActionOptions extends NewContentOptions {
    name: string;
    source?: string;
    data?: ts.CompletionEntryData;
    description: string;
    preferences?: ts.UserPreferences;
}

export interface Diagnostic {
    message: string;
    range?: FourSlash.Range;
    code: number;
    reportsUnnecessary?: true;
    reportsDeprecated?: true;
}

export interface GetEditsForFileRenameOptions {
    readonly oldPath: string;
    readonly newPath: string;
    readonly newFileContents: { readonly [fileName: string]: string; };
    readonly preferences?: ts.UserPreferences;
}

export interface MoveToNewFileOptions {
    readonly newFileContents: { readonly [fileName: string]: string; };
    readonly preferences?: ts.UserPreferences;
}

export interface MoveToFileOptions {
    readonly newFileContents: { readonly [fileName: string]: string; };
    readonly interactiveRefactorArguments: ts.InteractiveRefactorArguments;
    readonly preferences?: ts.UserPreferences;
}

export interface PreparePasteEditsOptions {
    readonly providePasteEdits: boolean;
    readonly copiedTextRange: ts.TextRange[];
    readonly copiedFromFile: string;
}
export interface PasteEditsOptions {
    readonly newFileContents: { readonly [fileName: string]: string; };
    args: ts.PasteEditsArgs;
    readonly fixId: string;
}

export type RenameLocationsOptions = readonly RenameLocationOptions[] | {
    readonly findInStrings?: boolean;
    readonly findInComments?: boolean;
    readonly ranges: readonly RenameLocationOptions[];
    readonly providePrefixAndSuffixTextForRename?: boolean;
};
export interface DiagnosticIgnoredInterpolations {
    template: string;
}
export type RenameLocationOptions = FourSlash.Range | { readonly range: FourSlash.Range; readonly prefixText?: string; readonly suffixText?: string; };
export interface RenameOptions {
    readonly findInStrings?: boolean;
    readonly findInComments?: boolean;
    readonly providePrefixAndSuffixTextForRename?: boolean;
    readonly quotePreference?: "auto" | "double" | "single";
}
