// Welcome to the FourSlash syntax guide!

// A line in the source text is indicated by four slashes (////)
// Tip: Hit Ctrl-K Ctrl-C Ctrl-K Ctrl-C to prefix-slash any selected block of text in Visual Studio
//// This is a line in the source text!
// Files are terminated by any entirely blank line (e.g.
// interspersed //-initiated comments are allowed)

// You can indicate a 'marker' with /**/
//// function./**/
// ... goTo.marker();

// Optionally, markers may have names:
//// function.go(/*1*/x, /*2*/y);
// goTo.marker('1');
// Marker names may consist of any alphanumeric characters

// File metadata must occur directly before the first line of source text
// and is indicated by an @ symbol:
// @Filename: lib.d.ts
//// this is the first line of my file

// Global options may appear anywhere
// @Module: Node
// @Target: ES5

// In the imperative section, you can write any valid TypeScript code. If
// you need help finding a something in Intellisense, you can
// type 'fs.' as an alternate way of accessing the top-level objects
// (e.g. 'fs.goTo.eof();')

//---------------------------------------
// For API editors:
// When editting this file, and only while editing this file, enable the reference comments
// and comment out the declarations in this section to get proper type information.
// Undo these changes before compiling/committing/editing any other fourslash tests.
// The test suite will likely crash if you try 'jake runtests' with reference comments enabled.
//
// Explanation:
// We want type-completion while we edit this file, but at compile time/while editting fourslash tests,
// we don't want to include the following reference because we are compiling this file in "--out" mode and don't want to rope
// in the entire codebase into the compilation each fourslash test. Additionally, we don't want to expose the
// src/harness/fourslash.ts API's (or the rest of the compiler) because they are unstable and complicate the
// fourslash testing DSL. Finally, in this case, runtime reflection is (much) faster.
//
// TODO: figure out a better solution to the API exposure problem.

// /// <reference path="../../../built/local/typescriptServices.d.ts"/>
// /// <reference path="../../../src/harness/fourslash.ts"/>

declare var FourSlash;
module ts {
    export interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
}

//---------------------------------------------

// Return code used by getEmitOutput function to indicate status of the function
// It is a duplicate of the one in types.ts to expose it to testcases in fourslash
enum EmitReturnStatus {
    Succeeded = 0,                      // All outputs generated if requested (.js, .map, .d.ts), no errors reported
    AllOutputGenerationSkipped = 1,     // No .js generated because of syntax errors, or compiler options errors, nothing generated
    JSGeneratedWithSemanticErrors = 2,  // .js and .map generated with semantic errors
    DeclarationGenerationSkipped = 3,   // .d.ts generation skipped because of semantic errors or declaration emitter specific errors; Output .js with semantic errors
    EmitErrorsEncountered = 4           // Emitter errors occurred during emitting process
}

// This is a duplicate of the indentstyle in services.ts to expose it to testcases in fourslash
enum IndentStyle {
    None,
    Block,
    Smart,
}

module FourSlashInterface {

    export interface Marker {
        fileName: string;
        position: number;
        data?: any;
    }
    
    export interface EditorOptions {
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
    }

    export interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
        [s: string]: boolean | number| string;
    }

    export interface Range {
        fileName: string;
        start: number;
        end: number;
        marker?: Marker;
    }

    export interface TextSpan {
        start: number;
        end: number;
    }

    export class test_ {
        public markers(): Marker[] {
            return FourSlash.currentTestState.getMarkers();
        }

        public marker(name?: string): Marker {
            return FourSlash.currentTestState.getMarkerByName(name);
        }

        public ranges(): Range[] {
            return FourSlash.currentTestState.getRanges();
        }

        public markerByName(s: string): Marker {
            return FourSlash.currentTestState.getMarkerByName(s);
        }
    }

    export class goTo {
        // Moves the caret to the specified marker,
        // or the anonymous marker ('/**/') if no name
        // is given
        public marker(name?: string) {
            FourSlash.currentTestState.goToMarker(name);
        }

        public bof() {
            FourSlash.currentTestState.goToBOF();
        }

        public eof() {
            FourSlash.currentTestState.goToEOF();
        }

        public definition(definitionIndex: number = 0) {
            FourSlash.currentTestState.goToDefinition(definitionIndex);
        }

        public type(definitionIndex: number = 0) {
            FourSlash.currentTestState.goToTypeDefinition(definitionIndex);
        }

        public position(position: number, fileIndex?: number);
        public position(position: number, fileName?: string);
        public position(position: number, fileNameOrIndex?: any) {
            if (fileNameOrIndex !== undefined) {
                this.file(fileNameOrIndex);
            }
            FourSlash.currentTestState.goToPosition(position);
        }

        // Opens a file, given either its index as it
        // appears in the test source, or its filename
        // as specified in the test metadata
        public file(index: number, content?: string);
        public file(name: string, content?: string);
        public file(indexOrName: any, content?: string) {
            FourSlash.currentTestState.openFile(indexOrName, content);
        }
    }

    export class verifyNegatable {
        public not: verifyNegatable;

        constructor(private negative = false) {
            if (!negative) {
                this.not = new verifyNegatable(true);
            }
        }

        // Verifies the member list contains the specified symbol. The
        // member list is brought up if necessary
        public memberListContains(symbol: string, text?: string, documenation?: string, kind?: string) {
            if (this.negative) {
                FourSlash.currentTestState.verifyMemberListDoesNotContain(symbol);
            } else {
                FourSlash.currentTestState.verifyMemberListContains(symbol, text, documenation, kind);
            }
        }

        public memberListCount(expectedCount: number) {
            FourSlash.currentTestState.verifyMemberListCount(expectedCount, this.negative);
        }

        // Verifies the completion list contains the specified symbol. The
        // completion list is brought up if necessary
        public completionListContains(symbol: string, text?: string, documentation?: string, kind?: string) {
            if (this.negative) {
                FourSlash.currentTestState.verifyCompletionListDoesNotContain(symbol, text, documentation, kind);
            } else {
                FourSlash.currentTestState.verifyCompletionListContains(symbol, text, documentation, kind);
            }
        }

        // Verifies the completion list items count to be greater than the specified amount. The
        // completion list is brought up if necessary
        public completionListItemsCountIsGreaterThan(count: number) {
            FourSlash.currentTestState.verifyCompletionListItemsCountIsGreaterThan(count, this.negative);
        }

        public completionListIsEmpty() {
            FourSlash.currentTestState.verifyCompletionListIsEmpty(this.negative);
        }

        public completionListAllowsNewIdentifier() {
            FourSlash.currentTestState.verifyCompletionListAllowsNewIdentifier(this.negative);
        }

        public memberListIsEmpty() {
            FourSlash.currentTestState.verifyMemberListIsEmpty(this.negative);
        }

        public referencesCountIs(count: number) {
            FourSlash.currentTestState.verifyReferencesCountIs(count, /*localFilesOnly*/ false);
        }

        public referencesAtPositionContains(range: Range, isWriteAccess?: boolean) {
            FourSlash.currentTestState.verifyReferencesAtPositionListContains(range.fileName, range.start, range.end, isWriteAccess);
        }

        public signatureHelpPresent() {
            FourSlash.currentTestState.verifySignatureHelpPresent(!this.negative);
        }

        public errorExistsBetweenMarkers(startMarker: string, endMarker: string) {
            FourSlash.currentTestState.verifyErrorExistsBetweenMarkers(startMarker, endMarker, !this.negative);
        }

        public errorExistsAfterMarker(markerName = "") {
            FourSlash.currentTestState.verifyErrorExistsAfterMarker(markerName, !this.negative, true);
        }

        public errorExistsBeforeMarker(markerName = "") {
            FourSlash.currentTestState.verifyErrorExistsAfterMarker(markerName, !this.negative, false);
        }

        public quickInfoIs(expectedText?: string, expectedDocumentation?: string) {
            FourSlash.currentTestState.verifyQuickInfoString(this.negative, expectedText, expectedDocumentation);
        }

        public quickInfoExists() {
            FourSlash.currentTestState.verifyQuickInfoExists(this.negative);
        }

        public definitionCountIs(expectedCount: number) {
            FourSlash.currentTestState.verifyDefinitionsCount(this.negative, expectedCount);
        }

        public typeDefinitionCountIs(expectedCount: number) {
            FourSlash.currentTestState.verifyTypeDefinitionsCount(this.negative, expectedCount);
        }

        public definitionLocationExists() {
            FourSlash.currentTestState.verifyDefinitionLocationExists(this.negative);
        }

        public verifyDefinitionsName(name: string, containerName: string) {
            FourSlash.currentTestState.verifyDefinitionsName(this.negative, name, containerName);
        }
    }

    export class verify extends verifyNegatable {
        public caretAtMarker(markerName?: string) {
            FourSlash.currentTestState.verifyCaretAtMarker(markerName);
        }

        public indentationIs(numberOfSpaces: number) {
            FourSlash.currentTestState.verifyIndentationAtCurrentPosition(numberOfSpaces);
        }

        public indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle = IndentStyle.Smart) {
            FourSlash.currentTestState.verifyIndentationAtPosition(fileName, position, numberOfSpaces, indentStyle);
        }

        public textAtCaretIs(text: string) {
            FourSlash.currentTestState.verifyTextAtCaretIs(text);
        }

        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        public eval(expr: string, value: any) {
            FourSlash.currentTestState.verifyEval(expr, value);
        }

        public currentLineContentIs(text: string) {
            FourSlash.currentTestState.verifyCurrentLineContent(text);
        }

        public currentFileContentIs(text: string) {
            FourSlash.currentTestState.verifyCurrentFileContent(text);
        }

        public verifyGetEmitOutputForCurrentFile(expected: string): void {
            FourSlash.currentTestState.verifyGetEmitOutputForCurrentFile(expected);
        }

        public currentParameterHelpArgumentNameIs(name: string) {
            FourSlash.currentTestState.verifyCurrentParameterHelpName(name);
        }

        public currentParameterSpanIs(parameter: string) {
            FourSlash.currentTestState.verifyCurrentParameterSpanIs(parameter);
        }

        public currentParameterHelpArgumentDocCommentIs(docComment: string) {
            FourSlash.currentTestState.verifyCurrentParameterHelpDocComment(docComment);
        }

        public currentSignatureHelpDocCommentIs(docComment: string) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpDocComment(docComment);
        }

        public signatureHelpCountIs(expected: number) {
            FourSlash.currentTestState.verifySignatureHelpCount(expected);
        }

        public signatureHelpArgumentCountIs(expected: number) {
            FourSlash.currentTestState.verifySignatureHelpArgumentCount(expected);
        }

        public currentSignatureParameterCountIs(expected: number) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpParameterCount(expected);
        }

        public currentSignatureTypeParameterCountIs(expected: number) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpTypeParameterCount(expected);
        }

        public currentSignatureHelpIs(expected: string) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpIs(expected);
        }

        public numberOfErrorsInCurrentFile(expected: number) {
            FourSlash.currentTestState.verifyNumberOfErrorsInCurrentFile(expected);
        }

        public baselineCurrentFileBreakpointLocations() {
            FourSlash.currentTestState.baselineCurrentFileBreakpointLocations();
        }

        public baselineCurrentFileNameOrDottedNameSpans() {
            FourSlash.currentTestState.baselineCurrentFileNameOrDottedNameSpans();
        }

        public baselineGetEmitOutput() {
            FourSlash.currentTestState.baselineGetEmitOutput();
        }

        public nameOrDottedNameSpanTextIs(text: string) {
            FourSlash.currentTestState.verifyCurrentNameOrDottedNameSpanText(text);
        }

        public outliningSpansInCurrentFile(spans: TextSpan[]) {
            FourSlash.currentTestState.verifyOutliningSpans(spans);
        }

        public todoCommentsInCurrentFile(descriptors: string[]) {
            FourSlash.currentTestState.verifyTodoComments(descriptors, test.ranges());
        }

        public matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number) {
            FourSlash.currentTestState.verifyMatchingBracePosition(bracePosition, expectedMatchPosition);
        }

        public noMatchingBracePositionInCurrentFile(bracePosition: number) {
            FourSlash.currentTestState.verifyNoMatchingBracePosition(bracePosition);
        }

        public DocCommentTemplate(expectedText: string, expectedOffset: number, empty?: boolean) {
            FourSlash.currentTestState.verifyDocCommentTemplate(empty ? undefined : { newText: expectedText, caretOffset: expectedOffset });
        }

        public noDocCommentTemplate() {
            this.DocCommentTemplate(/*expectedText*/ undefined, /*expectedOffset*/ undefined, true);
        }

        public getScriptLexicalStructureListCount(count: number) {
            FourSlash.currentTestState.verifyGetScriptLexicalStructureListCount(count);
        }

        // TODO: figure out what to do with the unused arguments.
        public getScriptLexicalStructureListContains(
            name: string,
            kind: string,
            fileName?: string,
            parentName?: string,
            isAdditionalSpan?: boolean,
            markerPosition?: number) {
            FourSlash.currentTestState.verifyGetScriptLexicalStructureListContains(name, kind);
        }

        public navigationItemsListCount(count: number, searchValue: string, matchKind?: string) {
            FourSlash.currentTestState.verifyNavigationItemsCount(count, searchValue, matchKind);
        }

        public navigationItemsListContains(
            name: string,
            kind: string,
            searchValue: string,
            matchKind: string,
            fileName?: string,
            parentName?: string) {
            FourSlash.currentTestState.verifyNavigationItemsListContains(
                name,
                kind,
                searchValue,
                matchKind,
                fileName,
                parentName);
        }

        public occurrencesAtPositionContains(range: Range, isWriteAccess?: boolean) {
            FourSlash.currentTestState.verifyOccurrencesAtPositionListContains(range.fileName, range.start, range.end, isWriteAccess);
        }

        public occurrencesAtPositionCount(expectedCount: number) {
            FourSlash.currentTestState.verifyOccurrencesAtPositionListCount(expectedCount);
        }

        public documentHighlightsAtPositionContains(range: Range, fileNamesToSearch: string[], kind?: string) {
            FourSlash.currentTestState.verifyDocumentHighlightsAtPositionListContains(range.fileName, range.start, range.end, fileNamesToSearch, kind);
        }

        public documentHighlightsAtPositionCount(expectedCount: number, fileNamesToSearch: string[]) {
            FourSlash.currentTestState.verifyDocumentHighlightsAtPositionListCount(expectedCount, fileNamesToSearch);
        }

        public completionEntryDetailIs(entryName: string, text: string, documentation?: string, kind?: string) {
            FourSlash.currentTestState.verifyCompletionEntryDetails(entryName, text, documentation, kind);
        }

        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        public syntacticClassificationsAre(...classifications: { classificationType: string; text: string }[]) {
            FourSlash.currentTestState.verifySyntacticClassifications(classifications);
        }

        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        public semanticClassificationsAre(...classifications: { classificationType: string; text: string; textSpan?: TextSpan }[]) {
            FourSlash.currentTestState.verifySemanticClassifications(classifications);
        }

        public renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string) {
            FourSlash.currentTestState.verifyRenameInfoSucceeded(displayName, fullDisplayName, kind, kindModifiers)
        }

        public renameInfoFailed(message?: string) {
            FourSlash.currentTestState.verifyRenameInfoFailed(message)
        }

        public renameLocations(findInStrings: boolean, findInComments: boolean) {
            FourSlash.currentTestState.verifyRenameLocations(findInStrings, findInComments);
        }

        public verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: { start: number; length: number; },
            displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[]) {
            FourSlash.currentTestState.verifyQuickInfoDisplayParts(kind, kindModifiers, textSpan, displayParts, documentation);
        }

        public getSyntacticDiagnostics(expected: string) {
            FourSlash.currentTestState.getSyntacticDiagnostics(expected);
        }

        public getSemanticDiagnostics(expected: string) {
            FourSlash.currentTestState.getSemanticDiagnostics(expected);
        }

        public ProjectInfo(expected: string []) {
            FourSlash.currentTestState.verifyProjectInfo(expected);
        }
    }

    export class edit {
        public backspace(count?: number) {
            FourSlash.currentTestState.deleteCharBehindMarker(count);
        }

        public deleteAtCaret(times?: number) {
            FourSlash.currentTestState.deleteChar(times);
        }

        public replace(start: number, length: number, text: string) {
            FourSlash.currentTestState.replace(start, length, text);
        }

        public paste(text: string) {
            FourSlash.currentTestState.paste(text);
        }

        public insert(text: string) {
            this.insertLines(text);
        }

        public insertLine(text: string) {
            this.insertLines(text + '\n');
        }

        public insertLines(...lines: string[]) {
            FourSlash.currentTestState.type(lines.join('\n'));
        }

        public moveRight(count?: number) {
            FourSlash.currentTestState.moveCaretRight(count);
        }

        public moveLeft(count?: number) {
            if (typeof count === 'undefined') {
                count = 1;
            }
            FourSlash.currentTestState.moveCaretRight(count * -1);
        }

        public enableFormatting() {
            FourSlash.currentTestState.enableFormatting = true;
        }

        public disableFormatting() {
            FourSlash.currentTestState.enableFormatting = false;
        }
    }

    export class debug {
        public printCurrentParameterHelp() {
            FourSlash.currentTestState.printCurrentParameterHelp();
        }

        public printCurrentFileState() {
            FourSlash.currentTestState.printCurrentFileState();
        }

        public printCurrentFileStateWithWhitespace() {
            FourSlash.currentTestState.printCurrentFileState(/*withWhiteSpace=*/true);
        }

        public printCurrentFileStateWithoutCaret() {
            FourSlash.currentTestState.printCurrentFileState(/*withWhiteSpace=*/false, /*withCaret=*/false);
        }

        public printCurrentQuickInfo() {
            FourSlash.currentTestState.printCurrentQuickInfo();
        }

        public printCurrentSignatureHelp() {
            FourSlash.currentTestState.printCurrentSignatureHelp();
        }

        public printMemberListMembers() {
            FourSlash.currentTestState.printMemberListMembers();
        }

        public printCompletionListMembers() {
            FourSlash.currentTestState.printCompletionListMembers();
        }

        public printBreakpointLocation(pos: number) {
            FourSlash.currentTestState.printBreakpointLocation(pos);
        }
        public printBreakpointAtCurrentLocation() {
            FourSlash.currentTestState.printBreakpointAtCurrentLocation();
        }

        public printNameOrDottedNameSpans(pos: number) {
            FourSlash.currentTestState.printNameOrDottedNameSpans(pos);
        }

        public printErrorList() {
            FourSlash.currentTestState.printErrorList();
        }

        public printNavigationItems(searchValue: string = ".*") {
            FourSlash.currentTestState.printNavigationItems(searchValue);
        }

        public printScriptLexicalStructureItems() {
            FourSlash.currentTestState.printScriptLexicalStructureItems();
        }

        public printReferences() {
            FourSlash.currentTestState.printReferences();
        }

        public printContext() {
            FourSlash.currentTestState.printContext();
        }
    }

    export class format {
        public document() {
            FourSlash.currentTestState.formatDocument();
        }

        public copyFormatOptions(): FormatCodeOptions {
            return FourSlash.currentTestState.copyFormatOptions();
        }

        public setFormatOptions(options: FormatCodeOptions) {
            return FourSlash.currentTestState.setFormatOptions(options);
        }

        public selection(startMarker: string, endMarker: string) {
            FourSlash.currentTestState.formatSelection(FourSlash.currentTestState.getMarkerByName(startMarker).position, FourSlash.currentTestState.getMarkerByName(endMarker).position);
        }

        public setOption(name: string, value: number);
        public setOption(name: string, value: string);
        public setOption(name: string, value: boolean);
        public setOption(name: string, value: any) {
            FourSlash.currentTestState.formatCodeOptions[name] = value;
        }
    }

    export class cancellation {
        public resetCancelled() {
            FourSlash.currentTestState.resetCancelled();
        }

        public setCancelled(numberOfCalls: number = 0) {
            FourSlash.currentTestState.setCancelled(numberOfCalls);
        }
    }

    export module classification {
        export function comment(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("comment", text, position);
        }

        export function identifier(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("identifier", text, position);
        }

        export function keyword(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("keyword", text, position);
        }

        export function numericLiteral(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("numericLiteral", text, position);
        }

        export function operator(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("operator", text, position);
        }

        export function stringLiteral(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("stringLiteral", text, position);
        }

        export function whiteSpace(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("whiteSpace", text, position);
        }

        export function text(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("text", text, position);
        }

        export function punctuation(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("punctuation", text, position);
        }

        export function docCommentTagName(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("docCommentTagName", text, position);
        }

        export function className(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("className", text, position);
        }

        export function enumName(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("enumName", text, position);
        }

        export function interfaceName(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("interfaceName", text, position);
        }

        export function moduleName(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("moduleName", text, position);
        }

        export function typeParameterName(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("typeParameterName", text, position);
        }

        export function parameterName(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("parameterName", text, position);
        }

        export function typeAliasName(text: string, position?: number): { classificationType: string; text: string; textSpan?: TextSpan } {
            return getClassification("typeAliasName", text, position);
        }

        function getClassification(type: string, text: string, position?: number) {
            return {
                classificationType: type,
                text: text,
                textSpan: position === undefined ? undefined : { start: position, end: position + text.length }
            };
        }
    }
}

module fs {
    export var test = new FourSlashInterface.test_();
    export var goTo = new FourSlashInterface.goTo();
    export var verify = new FourSlashInterface.verify();
    export var edit = new FourSlashInterface.edit();
    export var debug = new FourSlashInterface.debug();
    export var format = new FourSlashInterface.format();
    export var cancellation = new FourSlashInterface.cancellation();
}

function verifyOperationIsCancelled(f) {
    FourSlash.verifyOperationIsCancelled(f);
}

var test = new FourSlashInterface.test_();
var goTo = new FourSlashInterface.goTo();
var verify = new FourSlashInterface.verify();
var edit = new FourSlashInterface.edit();
var debug = new FourSlashInterface.debug();
var format = new FourSlashInterface.format();
var cancellation = new FourSlashInterface.cancellation();
var classification = FourSlashInterface.classification;
