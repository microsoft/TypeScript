namespace FourSlashInterface {
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

        public markerName(m: FourSlash.Marker) {
            return this.state.markerName(m);
        }

        public ranges(): FourSlash.Range[] {
            return this.state.getRanges();
        }

        public spans(): ts.TextSpan[] {
            return this.ranges().map(r => ts.createTextSpan(r.pos, r.end - r.pos));
        }

        public rangesByText(): ts.Map<FourSlash.Range[]> {
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
    }

    export class Plugins {
        constructor(private state: FourSlash.TestState) {
        }

        public configurePlugin(pluginName: string, configuration: any): void {
            this.state.configurePlugin(pluginName, configuration);
        }
    }

    export class GoTo {
        constructor(private state: FourSlash.TestState) {
        }
        // Moves the caret to the specified marker,
        // or the anonymous marker ('/**/') if no name
        // is given
        public marker(name?: string | FourSlash.Marker) {
            this.state.goToMarker(name);
        }

        public eachMarker(markers: readonly string[], action: (marker: FourSlash.Marker, index: number) => void): void;
        public eachMarker(action: (marker: FourSlash.Marker, index: number) => void): void;
        public eachMarker(a: readonly string[] | ((marker: FourSlash.Marker, index: number) => void), b?: (marker: FourSlash.Marker, index: number) => void): void {
            const markers = typeof a === "function" ? this.state.getMarkers() : a.map(m => this.state.getMarkerByName(m));
            this.state.goToEachMarker(markers, typeof a === "function" ? a : b!);
        }


        public rangeStart(range: FourSlash.Range) {
            this.state.goToRangeStart(range);
        }

        public eachRange(action: (range: FourSlash.Range) => void) {
            this.state.goToEachRange(action);
        }

        public bof() {
            this.state.goToBOF();
        }

        public eof() {
            this.state.goToEOF();
        }

        public implementation() {
            this.state.goToImplementation();
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

        public select(startMarker: string, endMarker: string) {
            this.state.select(startMarker, endMarker);
        }

        public selectAllInFile(fileName: string) {
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
                this.not = new VerifyNegatable(state, true);
            }
        }

        public assertHasRanges(ranges: FourSlash.Range[]) {
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

        public errorExistsBetweenMarkers(startMarker: string, endMarker: string) {
            this.state.verifyErrorExistsBetweenMarkers(startMarker, endMarker, !this.negative);
        }

        public errorExistsAfterMarker(markerName = "") {
            this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ true);
        }

        public errorExistsBeforeMarker(markerName = "") {
            this.state.verifyErrorExistsAfterMarker(markerName, !this.negative, /*after*/ false);
        }

        public quickInfoExists() {
            this.state.verifyQuickInfoExists(this.negative);
        }

        public typeDefinitionCountIs(expectedCount: number) {
            this.state.verifyTypeDefinitionsCount(this.negative, expectedCount);
        }

        public implementationListIsEmpty() {
            this.state.verifyImplementationListIsEmpty(this.negative);
        }

        public isValidBraceCompletionAtPosition(openingBrace: string) {
            this.state.verifyBraceCompletionAtPosition(this.negative, openingBrace);
        }

        public jsxClosingTag(map: { [markerName: string]: ts.JsxClosingTagInfo | undefined }): void {
            this.state.verifyJsxClosingTag(map);
        }

        public isInCommentAtPosition(onlyMultiLineDiverges?: boolean) {
            this.state.verifySpanOfEnclosingComment(this.negative, onlyMultiLineDiverges);
        }

        public codeFix(options: VerifyCodeFixOptions) {
            this.state.verifyCodeFix(options);
        }

        public codeFixAvailable(options?: VerifyCodeFixAvailableOptions[]) {
            this.state.verifyCodeFixAvailable(this.negative, options);
        }

        public codeFixAllAvailable(fixName: string) {
            this.state.verifyCodeFixAllAvailable(this.negative, fixName);
        }

        public applicableRefactorAvailableAtMarker(markerName: string) {
            this.state.verifyApplicableRefactorAvailableAtMarker(this.negative, markerName);
        }

        public applicableRefactorAvailableForRange() {
            this.state.verifyApplicableRefactorAvailableForRange(this.negative);
        }

        public refactorsAvailable(names: readonly string[]): void {
            this.state.verifyRefactorsAvailable(names);
        }

        public refactorAvailable(name: string, actionName?: string) {
            this.state.verifyRefactorAvailable(this.negative, "implicit", name, actionName);
        }

        public refactorAvailableForTriggerReason(triggerReason: ts.RefactorTriggerReason, name: string, actionName?: string) {
            this.state.verifyRefactorAvailable(this.negative, triggerReason, name, actionName);
        }
    }

    export class Verify extends VerifyNegatable {
        constructor(state: FourSlash.TestState) {
            super(state);
        }

        public completions(...optionsArray: VerifyCompletionsOptions[]) {
            for (const options of optionsArray) {
                this.state.verifyCompletions(options);
            }
        }

        public quickInfoIs(expectedText: string, expectedDocumentation?: string) {
            this.state.verifyQuickInfoString(expectedText, expectedDocumentation);
        }

        public quickInfoAt(markerName: string | FourSlash.Range, expectedText: string, expectedDocumentation?: string) {
            this.state.verifyQuickInfoAt(markerName, expectedText, expectedDocumentation);
        }

        public quickInfos(namesAndTexts: { [name: string]: string }) {
            this.state.verifyQuickInfos(namesAndTexts);
        }

        public caretAtMarker(markerName?: string) {
            this.state.verifyCaretAtMarker(markerName);
        }

        public indentationIs(numberOfSpaces: number) {
            this.state.verifyIndentationAtCurrentPosition(numberOfSpaces);
        }

        public indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle = ts.IndentStyle.Smart, baseIndentSize = 0) {
            this.state.verifyIndentationAtPosition(fileName, position, numberOfSpaces, indentStyle, baseIndentSize);
        }

        public textAtCaretIs(text: string) {
            this.state.verifyTextAtCaretIs(text);
        }

        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        public eval(expr: string, value: any) {
            this.state.verifyEval(expr, value);
        }

        public currentLineContentIs(text: string) {
            this.state.verifyCurrentLineContent(text);
        }

        public currentFileContentIs(text: string) {
            this.state.verifyCurrentFileContent(text);
        }

        public formatDocumentChangesNothing(): void {
            this.state.verifyFormatDocumentChangesNothing();
        }

        public goToDefinitionIs(endMarkers: ArrayOrSingle<string>) {
            this.state.verifyGoToDefinitionIs(endMarkers);
        }

        public goToDefinition(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>, range?: FourSlash.Range): void;
        public goToDefinition(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | { [startMarkerName: string]: ArrayOrSingle<string> }): void;
        public goToDefinition(arg0: any, endMarkerName?: ArrayOrSingle<string>) {
            this.state.verifyGoToDefinition(arg0, endMarkerName);
        }

        public goToType(startMarkerName: ArrayOrSingle<string>, endMarkerName: ArrayOrSingle<string>): void;
        public goToType(startsAndEnds: [ArrayOrSingle<string>, ArrayOrSingle<string>][] | { [startMarkerName: string]: ArrayOrSingle<string> }): void;
        public goToType(arg0: any, endMarkerName?: ArrayOrSingle<string>) {
            this.state.verifyGoToType(arg0, endMarkerName);
        }

        public goToDefinitionForMarkers(...markerNames: string[]) {
            this.state.verifyGoToDefinitionForMarkers(markerNames);
        }

        public goToDefinitionName(name: string, containerName: string) {
            this.state.verifyGoToDefinitionName(name, containerName);
        }

        public verifyGetEmitOutputForCurrentFile(expected: string): void {
            this.state.verifyGetEmitOutputForCurrentFile(expected);
        }

        public verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void {
            this.state.verifyGetEmitOutputContentsForCurrentFile(expected);
        }

        public symbolAtLocation(startRange: FourSlash.Range, ...declarationRanges: FourSlash.Range[]) {
            this.state.verifySymbolAtLocation(startRange, declarationRanges);
        }

        public typeOfSymbolAtLocation(range: FourSlash.Range, symbol: ts.Symbol, expected: string) {
            this.state.verifyTypeOfSymbolAtLocation(range, symbol, expected);
        }

        public referenceGroups(starts: ArrayOrSingle<string> | ArrayOrSingle<FourSlash.Range>, parts: ReferenceGroup[]) {
            this.state.verifyReferenceGroups(starts, parts);
        }

        public noReferences(markerNameOrRange?: string | FourSlash.Range) {
            this.state.verifyNoReferences(markerNameOrRange);
        }

        public getReferencesForServerTest(expected: readonly ts.ReferenceEntry[]) {
            this.state.verifyGetReferencesForServerTest(expected);
        }

        public singleReferenceGroup(definition: ReferenceGroupDefinition, ranges?: FourSlash.Range[] | string) {
            this.state.verifySingleReferenceGroup(definition, ranges);
        }

        public findReferencesDefinitionDisplayPartsAtCaretAre(expected: ts.SymbolDisplayPart[]) {
            this.state.verifyDisplayPartsOfReferencedSymbol(expected);
        }

        public noErrors() {
            this.state.verifyNoErrors();
        }

        public errorExistsAtRange(range: FourSlash.Range, code: number, message?: string) {
            this.state.verifyErrorExistsAtRange(range, code, message);
        }

        public numberOfErrorsInCurrentFile(expected: number) {
            this.state.verifyNumberOfErrorsInCurrentFile(expected);
        }

        public baselineCurrentFileBreakpointLocations() {
            this.state.baselineCurrentFileBreakpointLocations();
        }

        public baselineCurrentFileNameOrDottedNameSpans() {
            this.state.baselineCurrentFileNameOrDottedNameSpans();
        }

        public getEmitOutput(expectedOutputFiles: readonly string[]): void {
            this.state.verifyGetEmitOutput(expectedOutputFiles);
        }

        public baselineGetEmitOutput() {
            this.state.baselineGetEmitOutput();
        }

        public baselineQuickInfo() {
            this.state.baselineQuickInfo();
        }

        public baselineSmartSelection() {
            this.state.baselineSmartSelection();
        }

        public baselineSyntacticDiagnostics() {
            this.state.baselineSyntacticDiagnostics();
        }

        public baselineSyntacticAndSemanticDiagnostics() {
            this.state.baselineSyntacticAndSemanticDiagnostics();
        }

        public nameOrDottedNameSpanTextIs(text: string) {
            this.state.verifyCurrentNameOrDottedNameSpanText(text);
        }

        public outliningSpansInCurrentFile(spans: FourSlash.Range[], kind?: "comment" | "region" | "code" | "imports") {
            this.state.verifyOutliningSpans(spans, kind);
        }

        public outliningHintSpansInCurrentFile(spans: FourSlash.Range[]) {
            this.state.verifyOutliningHintSpans(spans);
        }

        public todoCommentsInCurrentFile(descriptors: string[]) {
            this.state.verifyTodoComments(descriptors, this.state.getRanges());
        }

        public matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number) {
            this.state.verifyMatchingBracePosition(bracePosition, expectedMatchPosition);
        }

        public noMatchingBracePositionInCurrentFile(bracePosition: number) {
            this.state.verifyNoMatchingBracePosition(bracePosition);
        }

        public docCommentTemplateAt(marker: string | FourSlash.Marker, expectedOffset: number, expectedText: string) {
            this.state.goToMarker(marker);
            this.state.verifyDocCommentTemplate({ newText: expectedText.replace(/\r?\n/g, "\r\n"), caretOffset: expectedOffset });
        }

        public noDocCommentTemplateAt(marker: string | FourSlash.Marker) {
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

        public applyCodeActionFromCompletion(markerName: string, options: VerifyCompletionActionOptions): void {
            this.state.applyCodeActionFromCompletion(markerName, options);
        }

        public importFixAtPosition(expectedTextArray: string[], errorCode?: number, preferences?: ts.UserPreferences): void {
            this.state.verifyImportFixAtPosition(expectedTextArray, errorCode, preferences);
        }

        public importFixModuleSpecifiers(marker: string, moduleSpecifiers: string[]) {
            this.state.verifyImportFixModuleSpecifiers(marker, moduleSpecifiers);
        }

        public navigationBar(json: any, options?: { checkSpans?: boolean }) {
            this.state.verifyNavigationBar(json, options);
        }

        public navigationTree(json: any, options?: { checkSpans?: boolean }) {
            this.state.verifyNavigationTree(json, options);
        }

        public navigateTo(...options: VerifyNavigateToOptions[]): void {
            this.state.verifyNavigateTo(options);
        }

        public occurrencesAtPositionContains(range: FourSlash.Range, isWriteAccess?: boolean) {
            this.state.verifyOccurrencesAtPositionListContains(range.fileName, range.pos, range.end, isWriteAccess);
        }

        public occurrencesAtPositionCount(expectedCount: number) {
            this.state.verifyOccurrencesAtPositionListCount(expectedCount);
        }

        public rangesAreOccurrences(isWriteAccess?: boolean, ranges?: FourSlash.Range[]) {
            this.state.verifyRangesAreOccurrences(isWriteAccess, ranges);
        }

        public rangesWithSameTextAreRenameLocations(...texts: string[]) {
            this.state.verifyRangesWithSameTextAreRenameLocations(...texts);
        }

        public rangesAreRenameLocations(options?: FourSlash.Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges?: FourSlash.Range[], providePrefixAndSuffixTextForRename?: boolean }) {
            this.state.verifyRangesAreRenameLocations(options);
        }

        public rangesAreDocumentHighlights(ranges?: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions) {
            this.state.verifyRangesAreDocumentHighlights(ranges, options);
        }

        public rangesWithSameTextAreDocumentHighlights() {
            this.state.verifyRangesWithSameTextAreDocumentHighlights();
        }

        public documentHighlightsOf(startRange: FourSlash.Range, ranges: FourSlash.Range[], options?: VerifyDocumentHighlightsOptions) {
            this.state.verifyDocumentHighlightsOf(startRange, ranges, options);
        }

        public noDocumentHighlights(startRange: FourSlash.Range) {
            this.state.verifyNoDocumentHighlights(startRange);
        }

        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        public syntacticClassificationsAre(...classifications: { classificationType: string; text: string }[]) {
            this.state.verifySyntacticClassifications(classifications);
        }

        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        public semanticClassificationsAre(...classifications: Classification[]) {
            this.state.verifySemanticClassifications(classifications);
        }

        public renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string, fileToRename?: string, expectedRange?: FourSlash.Range, options?: ts.RenameInfoOptions) {
            this.state.verifyRenameInfoSucceeded(displayName, fullDisplayName, kind, kindModifiers, fileToRename, expectedRange, options);
        }

        public renameInfoFailed(message?: string, allowRenameOfImportPath?: boolean) {
            this.state.verifyRenameInfoFailed(message, allowRenameOfImportPath);
        }

        public renameLocations(startRanges: ArrayOrSingle<FourSlash.Range>, options: RenameLocationsOptions) {
            this.state.verifyRenameLocations(startRanges, options);
        }

        public baselineRename(marker: string, options: RenameOptions) {
            this.state.baselineRename(marker, options);
        }

        public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: FourSlash.TextSpan,
            displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]) {
            this.state.verifyQuickInfoDisplayParts(kind, kindModifiers, textSpan, displayParts, documentation, tags);
        }

        public getSyntacticDiagnostics(expected: readonly Diagnostic[]) {
            this.state.getSyntacticDiagnostics(expected);
        }

        public getSemanticDiagnostics(expected: readonly Diagnostic[]) {
            this.state.getSemanticDiagnostics(expected);
        }

        public getSuggestionDiagnostics(expected: readonly Diagnostic[]) {
            this.state.getSuggestionDiagnostics(expected);
        }

        public ProjectInfo(expected: string[]) {
            this.state.verifyProjectInfo(expected);
        }

        public allRangesAppearInImplementationList(markerName: string) {
            this.state.verifyRangesInImplementationList(markerName);
        }

        public getEditsForFileRename(options: GetEditsForFileRenameOptions) {
            this.state.getEditsForFileRename(options);
        }

        public baselineCallHierarchy() {
            this.state.baselineCallHierarchy();
        }

        public moveToNewFile(options: MoveToNewFileOptions): void {
            this.state.moveToNewFile(options);
        }

        public noMoveToNewFile(): void {
            this.state.noMoveToNewFile();
        }

        public organizeImports(newContent: string) {
            this.state.verifyOrganizeImports(newContent);
        }
    }

    export class Edit {
        constructor(private state: FourSlash.TestState) {
        }
        public backspace(count?: number) {
            this.state.deleteCharBehindMarker(count);
        }

        public deleteAtCaret(times?: number) {
            this.state.deleteChar(times);
        }

        public replace(start: number, length: number, text: string) {
            this.state.replace(start, length, text);
        }

        public paste(text: string) {
            this.state.paste(text);
        }

        public insert(text: string) {
            this.insertLines(text);
        }

        public insertLine(text: string) {
            this.insertLines(text + "\n");
        }

        public insertLines(...lines: string[]) {
            this.state.type(lines.join("\n"));
        }

        public deleteLine(index: number) {
            this.deleteLineRange(index, index);
        }

        public deleteLineRange(startIndex: number, endIndexInclusive: number) {
            this.state.deleteLineRange(startIndex, endIndexInclusive);
        }

        public replaceLine(index: number, text: string) {
            this.state.selectLine(index);
            this.state.type(text);
        }

        public moveRight(count?: number) {
            this.state.moveCaretRight(count);
        }

        public moveLeft(count?: number) {
            if (typeof count === "undefined") {
                count = 1;
            }
            this.state.moveCaretRight(count * -1);
        }

        public enableFormatting() {
            this.state.enableFormatting = true;
        }

        public disableFormatting() {
            this.state.enableFormatting = false;
        }

        public applyRefactor(options: ApplyRefactorOptions) {
            this.state.applyRefactor(options);
        }
    }

    export class Debug {
        constructor(private state: FourSlash.TestState) {
        }

        public printCurrentParameterHelp() {
            this.state.printCurrentParameterHelp();
        }

        public printCurrentFileState() {
            this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ true);
        }

        public printCurrentFileStateWithWhitespace() {
            this.state.printCurrentFileState(/*showWhitespace*/ true, /*makeCaretVisible*/ true);
        }

        public printCurrentFileStateWithoutCaret() {
            this.state.printCurrentFileState(/*showWhitespace*/ false, /*makeCaretVisible*/ false);
        }

        public printCurrentQuickInfo() {
            this.state.printCurrentQuickInfo();
        }

        public printCurrentSignatureHelp() {
            this.state.printCurrentSignatureHelp();
        }

        public printCompletionListMembers(options: ts.UserPreferences | undefined) {
            this.state.printCompletionListMembers(options);
        }

        public printAvailableCodeFixes() {
            this.state.printAvailableCodeFixes();
        }

        public printBreakpointLocation(pos: number) {
            this.state.printBreakpointLocation(pos);
        }
        public printBreakpointAtCurrentLocation() {
            this.state.printBreakpointAtCurrentLocation();
        }

        public printNameOrDottedNameSpans(pos: number) {
            this.state.printNameOrDottedNameSpans(pos);
        }

        public printErrorList() {
            this.state.printErrorList();
        }

        public printNavigationItems(searchValue = ".*") {
            this.state.printNavigationItems(searchValue);
        }

        public printNavigationBar() {
            this.state.printNavigationBar();
        }

        public printContext() {
            this.state.printContext();
        }

        public printOutliningSpans() {
            this.state.printOutliningSpans();
        }
    }

    export class Format {
        constructor(private state: FourSlash.TestState) {
        }

        public document() {
            this.state.formatDocument();
        }

        public copyFormatOptions(): ts.FormatCodeSettings {
            return this.state.copyFormatOptions();
        }

        public setFormatOptions(options: ts.FormatCodeOptions) {
            return this.state.setFormatOptions(options);
        }

        public selection(startMarker: string, endMarker: string) {
            this.state.formatSelection(this.state.getMarkerByName(startMarker).position, this.state.getMarkerByName(endMarker).position);
        }

        public onType(posMarker: string, key: string) {
            this.state.formatOnType(this.state.getMarkerByName(posMarker).position, key);
        }

        public setOption(name: keyof ts.FormatCodeSettings, value: number | string | boolean): void {
            this.state.formatCodeSettings = { ...this.state.formatCodeSettings, [name]: value };
        }
    }

    export class Cancellation {
        constructor(private state: FourSlash.TestState) {
        }

        public resetCancelled() {
            this.state.resetCancelled();
        }

        public setCancelled(numberOfCalls = 0) {
            this.state.setCancelled(numberOfCalls);
        }
    }

    interface Classification {
        classificationType: ts.ClassificationTypeNames;
        text: string;
        textSpan?: FourSlash.TextSpan;
    }
    export namespace Classification {
        export function comment(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.comment, text, position);
        }

        export function identifier(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.identifier, text, position);
        }

        export function keyword(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.keyword, text, position);
        }

        export function numericLiteral(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.numericLiteral, text, position);
        }

        export function operator(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.operator, text, position);
        }

        export function stringLiteral(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.stringLiteral, text, position);
        }

        export function whiteSpace(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.whiteSpace, text, position);
        }

        export function text(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.text, text, position);
        }

        export function punctuation(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.punctuation, text, position);
        }

        export function docCommentTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.docCommentTagName, text, position);
        }

        export function className(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.className, text, position);
        }

        export function enumName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.enumName, text, position);
        }

        export function interfaceName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.interfaceName, text, position);
        }

        export function moduleName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.moduleName, text, position);
        }

        export function typeParameterName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.typeParameterName, text, position);
        }

        export function parameterName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.parameterName, text, position);
        }

        export function typeAliasName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.typeAliasName, text, position);
        }

        export function jsxOpenTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxOpenTagName, text, position);
        }

        export function jsxCloseTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxCloseTagName, text, position);
        }

        export function jsxSelfClosingTagName(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxSelfClosingTagName, text, position);
        }

        export function jsxAttribute(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxAttribute, text, position);
        }

        export function jsxText(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxText, text, position);
        }

        export function jsxAttributeStringLiteralValue(text: string, position?: number): Classification {
            return getClassification(ts.ClassificationTypeNames.jsxAttributeStringLiteralValue, text, position);
        }

        function getClassification(classificationType: ts.ClassificationTypeNames, text: string, position?: number): Classification {
            const textSpan = position === undefined ? undefined : { start: position, end: position + text.length };
            return { classificationType, text, textSpan };
        }
    }
    export namespace Completion {
        export import SortText = ts.Completions.SortText;
        export import CompletionSource = ts.Completions.CompletionSource;

        const functionEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "function",
            kindModifiers: "declare",
            sortText: SortText.GlobalsOrKeywords
        });
        const varEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "var",
            kindModifiers: "declare",
            sortText: SortText.GlobalsOrKeywords
        });
        const moduleEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "module",
            kindModifiers: "declare",
            sortText: SortText.GlobalsOrKeywords
        });
        const keywordEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "keyword",
            sortText: SortText.GlobalsOrKeywords
        });
        const methodEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "method",
            kindModifiers: "declare",
            sortText: SortText.LocationPriority
        });
        const propertyEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "property",
            kindModifiers: "declare",
            sortText: SortText.LocationPriority
        });
        const interfaceEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "interface",
            kindModifiers: "declare",
            sortText: SortText.GlobalsOrKeywords
        });
        const typeEntry = (name: string): ExpectedCompletionEntryObject => ({
            name,
            kind: "type",
            kindModifiers: "declare",
            sortText: SortText.GlobalsOrKeywords
        });

        const res: ExpectedCompletionEntryObject[] = [];
        for (let i = ts.SyntaxKind.FirstKeyword; i <= ts.SyntaxKind.LastKeyword; i++) {
            res.push({
                name: ts.Debug.checkDefined(ts.tokenToString(i)),
                kind: "keyword",
                sortText: SortText.GlobalsOrKeywords
            });
        }
        export const keywordsWithUndefined: readonly ExpectedCompletionEntryObject[] = res;
        export const keywords: readonly ExpectedCompletionEntryObject[] = keywordsWithUndefined.filter(k => k.name !== "undefined");

        export const typeKeywords: readonly ExpectedCompletionEntryObject[] =
            ["false", "null", "true", "void", "asserts", "any", "boolean", "keyof", "never", "readonly", "number", "object", "string", "symbol", "undefined", "unique", "unknown", "bigint"].map(keywordEntry);

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
            typeEntry("PromiseConstructorLike"),
            interfaceEntry("PromiseLike"),
            interfaceEntry("Promise"),
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
        ];

        export const globalThisEntry: ExpectedCompletionEntry = {
            name: "globalThis",
            kind: "module",
            sortText: SortText.GlobalsOrKeywords
        };
        export const globalTypes = globalTypesPlus([]);
        export function globalTypesPlus(plus: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[] {
            return [
                globalThisEntry,
                ...globalTypeDecls,
                ...plus,
                ...typeKeywords,
            ];
        }

        export const typeAssertionKeywords: readonly ExpectedCompletionEntry[] =
            globalTypesPlus([keywordEntry("const")]);

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
                    case "unknown":
                    case "global":
                    case "bigint":
                        return false;
                    default:
                        return true;
                }
            });
        }

        export const classElementKeywords: readonly ExpectedCompletionEntryObject[] =
            ["private", "protected", "public", "static", "abstract", "async", "constructor", "declare", "get", "readonly", "set"].map(keywordEntry);

        export const classElementInJsKeywords = getInJsKeywords(classElementKeywords);

        export const constructorParameterKeywords: readonly ExpectedCompletionEntryObject[] =
            ["private", "protected", "public", "readonly"].map((name): ExpectedCompletionEntryObject => ({
                name,
                kind: "keyword",
                sortText: SortText.GlobalsOrKeywords
            }));

        export const functionMembers: readonly ExpectedCompletionEntryObject[] = [
            methodEntry("apply"),
            methodEntry("call"),
            methodEntry("bind"),
            methodEntry("toString"),
            propertyEntry("length"),
            { name: "arguments", kind: "property", kindModifiers: "declare", text: "(property) Function.arguments: any" },
            propertyEntry("caller"),
        ];

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
            methodEntry("substr"),
            methodEntry("valueOf"),
        ];

        export const functionMembersWithPrototype: readonly ExpectedCompletionEntryObject[] = [
            ...functionMembers.slice(0, 4),
            propertyEntry("prototype"),
            ...functionMembers.slice(4),
        ];

        // TODO: Shouldn't propose type keywords in statement position
        export const statementKeywordsWithTypes: readonly ExpectedCompletionEntryObject[] = [
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
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "yield",
            "as",
            "asserts",
            "any",
            "async",
            "await",
            "boolean",
            "declare",
            "keyof",
            "module",
            "namespace",
            "never",
            "readonly",
            "number",
            "object",
            "string",
            "symbol",
            "type",
            "unique",
            "unknown",
            "bigint",
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

        export const statementInJsKeywords = getInJsKeywords(statementKeywords);

        export const globalsVars: readonly ExpectedCompletionEntryObject[] = [
            functionEntry("eval"),
            functionEntry("parseInt"),
            functionEntry("parseFloat"),
            functionEntry("isNaN"),
            functionEntry("isFinite"),
            functionEntry("decodeURI"),
            functionEntry("decodeURIComponent"),
            functionEntry("encodeURI"),
            functionEntry("encodeURIComponent"),
            functionEntry("escape"),
            functionEntry("unescape"),
            varEntry("NaN"),
            varEntry("Infinity"),
            varEntry("Object"),
            varEntry("Function"),
            varEntry("String"),
            varEntry("Boolean"),
            varEntry("Number"),
            varEntry("Math"),
            varEntry("Date"),
            varEntry("RegExp"),
            varEntry("Error"),
            varEntry("EvalError"),
            varEntry("RangeError"),
            varEntry("ReferenceError"),
            varEntry("SyntaxError"),
            varEntry("TypeError"),
            varEntry("URIError"),
            varEntry("JSON"),
            varEntry("Array"),
            varEntry("ArrayBuffer"),
            varEntry("DataView"),
            varEntry("Int8Array"),
            varEntry("Uint8Array"),
            varEntry("Uint8ClampedArray"),
            varEntry("Int16Array"),
            varEntry("Uint16Array"),
            varEntry("Int32Array"),
            varEntry("Uint32Array"),
            varEntry("Float32Array"),
            varEntry("Float64Array"),
            moduleEntry("Intl"),
        ];

        const globalKeywordsInsideFunction: readonly ExpectedCompletionEntryObject[] = [
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
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "yield",
            "async",
            "await",
        ].map(keywordEntry);

        export const undefinedVarEntry: ExpectedCompletionEntry = {
            name: "undefined",
            kind: "var",
            sortText: SortText.GlobalsOrKeywords
        };
        // TODO: many of these are inappropriate to always provide
        export const globalsInsideFunction = (plus: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[] => [
            { name: "arguments", kind: "local var" },
            ...plus,
            globalThisEntry,
            ...globalsVars,
            undefinedVarEntry,
            ...globalKeywordsInsideFunction,
        ];

        const globalInJsKeywordsInsideFunction = getInJsKeywords(globalKeywordsInsideFunction);

        // TODO: many of these are inappropriate to always provide
        export const globalsInJsInsideFunction = (plus: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[] => [
            { name: "arguments", kind: "local var" },
            globalThisEntry,
            ...globalsVars,
            ...plus,
            undefinedVarEntry,
            ...globalInJsKeywordsInsideFunction,
        ];

        // TODO: many of these are inappropriate to always provide
        export const globalKeywords: readonly ExpectedCompletionEntryObject[] = [
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
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "yield",
            "as",
            "asserts",
            "any",
            "async",
            "await",
            "boolean",
            "declare",
            "keyof",
            "module",
            "namespace",
            "never",
            "readonly",
            "number",
            "object",
            "string",
            "symbol",
            "type",
            "unique",
            "unknown",
            "bigint",
        ].map(keywordEntry);

        export const globalInJsKeywords = getInJsKeywords(globalKeywords);

        export const insideMethodKeywords: readonly ExpectedCompletionEntryObject[] = [
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
            "import",
            "in",
            "instanceof",
            "new",
            "null",
            "return",
            "super",
            "switch",
            "this",
            "throw",
            "true",
            "try",
            "typeof",
            "var",
            "void",
            "while",
            "with",
            "implements",
            "interface",
            "let",
            "package",
            "yield",
            "async",
            "await",
        ].map(keywordEntry);

        export const insideMethodInJsKeywords = getInJsKeywords(insideMethodKeywords);

        export const globals: readonly ExpectedCompletionEntryObject[] = [
            globalThisEntry,
            ...globalsVars,
            undefinedVarEntry,
            ...globalKeywords
        ];

        export const globalsInJs: readonly ExpectedCompletionEntryObject[] = [
            globalThisEntry,
            ...globalsVars,
            undefinedVarEntry,
            ...globalInJsKeywords
        ];

        export function globalsPlus(plus: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[] {
            return [
                globalThisEntry,
                ...globalsVars,
                ...plus,
                undefinedVarEntry,
                ...globalKeywords];
        }

        export function globalsInJsPlus(plus: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[] {
            return [
                globalThisEntry,
                ...globalsVars,
                ...plus,
                undefinedVarEntry,
                ...globalInJsKeywords];
        }
    }

    export interface ReferenceGroup {
        definition: ReferenceGroupDefinition;
        ranges: FourSlash.Range[];
    }

    export type ReferenceGroupDefinition = string | { text: string, range: FourSlash.Range };

    export interface ApplyRefactorOptions {
        refactorName: string;
        actionName: string;
        actionDescription: string;
        newContent: NewFileContent;
    }

    export type ExpectedCompletionEntry = string | ExpectedCompletionEntryObject;
    export interface ExpectedCompletionEntryObject {
        readonly name: string;
        readonly source?: string;
        readonly insertText?: string;
        readonly replacementSpan?: FourSlash.Range;
        readonly hasAction?: boolean; // If not specified, will assert that this is false.
        readonly isRecommended?: boolean; // If not specified, will assert that this is false.
        readonly isFromUncheckedFile?: boolean; // If not specified, won't assert about this
        readonly kind?: string; // If not specified, won't assert about this
        readonly kindModifiers?: string; // Must be paired with 'kind'
        readonly text?: string;
        readonly documentation?: string;
        readonly sourceDisplay?: string;
        readonly tags?: readonly ts.JSDocTagInfo[];
        readonly sortText?: ts.Completions.SortText;
    }

    export interface VerifyCompletionsOptions {
        readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
        readonly isNewIdentifierLocation?: boolean; // Always tested
        readonly isGlobalCompletion?: boolean; // Only tested if set
        readonly exact?: ArrayOrSingle<ExpectedCompletionEntry>;
        readonly includes?: ArrayOrSingle<ExpectedCompletionEntry>;
        readonly excludes?: ArrayOrSingle<string>;
        readonly preferences?: ts.UserPreferences;
        readonly triggerCharacter?: ts.CompletionsTriggerCharacter;
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
    }

    export interface VerifyNavigateToOptions {
        readonly pattern: string;
        readonly fileName?: string;
        readonly expected: readonly ExpectedNavigateToItem[];
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

    export type ArrayOrSingle<T> = T | readonly T[];

    export interface VerifyCompletionListContainsOptions extends ts.UserPreferences {
        triggerCharacter?: ts.CompletionsTriggerCharacter;
        sourceDisplay: string;
        isRecommended?: true;
        insertText?: string;
        replacementSpan?: FourSlash.Range;
    }

    export interface VerifyDocumentHighlightsOptions {
        filesToSearch?: readonly string[];
    }

    export type NewFileContent = string | { readonly [filename: string]: string };

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
    }

    export interface VerifyRefactorOptions {
        name: string;
        actionName: string;
        refactors: readonly ts.ApplicableRefactorInfo[];
    }

    export interface VerifyCompletionActionOptions extends NewContentOptions {
        name: string;
        source?: string;
        description: string;
        preferences?: ts.UserPreferences;
    }

    export interface Diagnostic {
        message: string;
        range?: FourSlash.Range;
        code: number;
        reportsUnnecessary?: true;
    }

    export interface GetEditsForFileRenameOptions {
        readonly oldPath: string;
        readonly newPath: string;
        readonly newFileContents: { readonly [fileName: string]: string };
        readonly preferences?: ts.UserPreferences;
    }

    export interface MoveToNewFileOptions {
        readonly newFileContents: { readonly [fileName: string]: string };
        readonly preferences?: ts.UserPreferences;
    }

    export type RenameLocationsOptions = readonly RenameLocationOptions[] | {
        readonly findInStrings?: boolean;
        readonly findInComments?: boolean;
        readonly ranges: readonly RenameLocationOptions[];
        readonly providePrefixAndSuffixTextForRename?: boolean;
    };
    export interface DiagnosticIgnoredInterpolations {
        template: string
    };
    export type RenameLocationOptions = FourSlash.Range | { readonly range: FourSlash.Range, readonly prefixText?: string, readonly suffixText?: string };
    export interface RenameOptions {
        readonly findInStrings?: boolean;
        readonly findInComments?: boolean;
        readonly providePrefixAndSuffixTextForRename?: boolean;
    };
}
