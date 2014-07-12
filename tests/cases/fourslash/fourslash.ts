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

declare var FourSlash;

enum IncrementalEditValidation {
    None = FourSlash.IncrementalEditValidation.None,
    SyntacticOnly = FourSlash.IncrementalEditValidation.SyntacticOnly,
    Complete = FourSlash.IncrementalEditValidation.Complete
}

enum TypingFidelity {
    /** Performs typing and formatting (if formatting is enabled) */
    Low = FourSlash.TypingFidelity.Low,
    /** Performs typing, checks completion lists, signature help, and formatting (if enabled) */
    High = FourSlash.TypingFidelity.High
}

module FourSlashInterface {
    declare var FourSlash;

    export interface Marker {
        fileName: string;
        position: number;
        data?: any;
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

    export class test {
        public markers(): Marker[] {
            return FourSlash.currentTestState.getMarkers();
        }

        public ranges(): Range[] {
            return FourSlash.currentTestState.getRanges();
        }
    }

    export class diagnostics {
        public validateTypeAtCurrentPosition() {
            return this.validateTypesAtPositions(FourSlash.currentTestState.currentCaretPosition);
        }

        public validateTypesAtPositions(...positions: number[]) {
            return FourSlash.currentTestState.verifyTypesAgainstFullCheckAtPositions(positions);
        }

        public setEditValidation(validation: IncrementalEditValidation) {
            FourSlash.currentTestState.editValidation = validation;
        }

        public setTypingFidelity(fidelity: TypingFidelity) {
            FourSlash.currentTestState.typingFidelity = fidelity;
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
        public file(index: number);
        public file(name: string);
        public file(indexOrName: any) {
            FourSlash.currentTestState.openFile(indexOrName);
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
        public memberListContains(symbol: string, type?: string, docComment?: string, fullSymbolName?: string, kind?: string) {
            if (this.negative) {
                FourSlash.currentTestState.verifyMemberListDoesNotContain(symbol);
            } else {
                FourSlash.currentTestState.verifyMemberListContains(symbol, type, docComment, fullSymbolName, kind);
            }
        }

        public memberListCount(expectedCount: number) {
            FourSlash.currentTestState.verifyMemberListCount(expectedCount, this.negative);
        }

        // Verifies the completion list contains the specified symbol. The
        // completion list is brought up if necessary
        public completionListContains(symbol: string, type?: string, docComment?: string, fullSymbolName?: string, kind?: string) {
            if (this.negative) {
                FourSlash.currentTestState.verifyCompletionListDoesNotContain(symbol);
            } else {
                FourSlash.currentTestState.verifyCompletionListContains(symbol, type, docComment, fullSymbolName, kind);
            }
        }

        // Verifies the completion list items count to be greater than the specified amount. The
        // completion list is brought up if necessary
        public completionListItemsCountIsGreaterThan(count: number) {
            FourSlash.currentTestState.verifyCompletionListItemsCountIsGreaterThan(count);
        }

        public completionListIsEmpty() {
            FourSlash.currentTestState.verifyCompletionListIsEmpty(this.negative);
        }

        public memberListIsEmpty() {
            FourSlash.currentTestState.verifyMemberListIsEmpty(this.negative);
        }

        public referencesCountIs(count: number) {
            FourSlash.currentTestState.verifyReferencesCountIs(count);
        }

        public implementorsCountIs(count: number) {
            FourSlash.currentTestState.verifyImplementorsCountIs(count);
        }

        public currentParameterIsVariable() {
            FourSlash.currentTestState.verifyCurrentParameterIsVariable(!this.negative);
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

        public quickInfoIs(typeName?: string, docComment?: string, symbolName?: string, kind?: string) {
            FourSlash.currentTestState.verifyQuickInfo(this.negative, typeName, docComment, symbolName, kind);
        }

        public quickInfoSymbolNameIs(symbolName) {
            FourSlash.currentTestState.verifyQuickInfo(this.negative, undefined, undefined, symbolName, undefined);
        }

        public quickInfoExists() {
            FourSlash.currentTestState.verifyQuickInfoExists(this.negative);
        }

        public definitionLocationExists() {
            FourSlash.currentTestState.verifyDefinitionLocationExists(this.negative);
        }
    }

    export class verify extends verifyNegatable {

        public caretAtMarker(markerName?: string) {
            FourSlash.currentTestState.verifyCaretAtMarker(markerName);
        }

        public indentationIs(numberOfSpaces: number) {
            FourSlash.currentTestState.verifyIndentationAtCurrentPosition(numberOfSpaces);
        }

        public indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number) {
            FourSlash.currentTestState.verifyIndentationAtPosition(fileName, position, numberOfSpaces);
        }

        public textAtCaretIs(text: string) {
            FourSlash.currentTestState.verifyTextAtCaretIs(text);
        }

        /**
            Compiles the current file and evaluates 'expr' in a context containing
            the emitted output, then compares (using ===) the result of that expression
            to 'value'. Do not use this function with external modules as it is not supported.
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

        public currentSignatureParamterCountIs(expected: number) {
            FourSlash.currentTestState.verifyCurrentSignatureHelpParameterCount(expected);
        }

        public currentSignatureTypeParamterCountIs(expected: number) {
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

        public nameOrDottedNameSpanTextIs(text: string) {
            FourSlash.currentTestState.verifyCurrentNameOrDottedNameSpanText(text);
        }

        public outliningSpansInCurrentFile(spans: TextSpan[]) {
            FourSlash.currentTestState.verifyOutliningSpans(spans);
        }

        public matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number) {
            FourSlash.currentTestState.verifyMatchingBracePosition(bracePosition, expectedMatchPosition);
        }

        public noMatchingBracePositionInCurrentFile(bracePosition: number) {
            FourSlash.currentTestState.verifyNoMatchingBracePosition(bracePosition);
        }

        public setVerifyDocComments(val: boolean) {
            FourSlash.currentTestState.setVerifyDocComments(val);
        }

        public getScriptLexicalStructureListCount(count: number) {
            FourSlash.currentTestState.verifyGetScriptLexicalStructureListCount(count);
        }

        public getScriptLexicalStructureListContains(
            name: string,
            kind: string,
            fileName?: string,
            parentName?: string,
            isAdditionalSpan?: boolean,
            markerPosition?: number) {
            FourSlash.currentTestState.verifGetScriptLexicalStructureListContains(
                name,
                kind,
                fileName,
                parentName,
                isAdditionalSpan,
                markerPosition);
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
            parenetName?: string) {
            FourSlash.currentTestState.verifyNavigationItemsListContains(
                name,
                kind,
                searchValue,
                matchKind,
                fileName,
                parenetName);
        }

        public occurrencesAtPositionContains(range: Range, isWriteAccess?: boolean) {
            FourSlash.currentTestState.verifyOccurrencesAtPositionListContains(range.fileName, range.start, range.end, isWriteAccess);
        }

        public occurrencesAtPositionCount(expectedCount: number) {
            FourSlash.currentTestState.verifyOccurrencesAtPositionListCount(expectedCount);
        }

        public completionEntryDetailIs(entryName: string, type: string, docComment?: string, fullSymbolName?: string, kind?: string) {
            FourSlash.currentTestState.verifyCompletionEntryDetails(entryName, type, docComment, fullSymbolName, kind);
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
    }

    export class format {
        public document() {
            FourSlash.currentTestState.formatDocument();
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
}

module fs {
    export var test = new FourSlashInterface.test();
    export var goTo = new FourSlashInterface.goTo();
    export var verify = new FourSlashInterface.verify();
    export var edit = new FourSlashInterface.edit();
    export var debug = new FourSlashInterface.debug();
    export var format = new FourSlashInterface.format();
    export var diagnostics = new FourSlashInterface.diagnostics();
}

var test = new FourSlashInterface.test();
var goTo = new FourSlashInterface.goTo();
var verify = new FourSlashInterface.verify();
var edit = new FourSlashInterface.edit();
var debug = new FourSlashInterface.debug();
var format = new FourSlashInterface.format();
var diagnostics = new FourSlashInterface.diagnostics();
