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

// In the imperative section, you can write any valid TypeScript code.

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

declare module ts {
    export type MapKey = string | number;
    export interface Map<T> {
        forEach(action: (value: T, key: string) => void): void;
        get(key: MapKey): T;
        has(key: MapKey): boolean;
        set(key: MapKey, value: T): this;
        delete(key: MapKey): boolean;
        clear(): void;
    }

    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }

    enum IndentStyle {
        None = 0,
        Block = 1,
        Smart = 2,
    }

    interface OutputFile {
        name: string;
        writeByteOrderMark: boolean;
        text: string;
    }
}

declare namespace FourSlashInterface {
    interface Marker {
        fileName: string;
        position: number;
        data?: any;
    }
    interface EditorOptions {
        BaseIndentSize?: number,
        IndentSize: number;
        TabSize: number;
        NewLineCharacter: string;
        ConvertTabsToSpaces: boolean;
    }
    interface FormatCodeOptions extends EditorOptions {
        InsertSpaceAfterCommaDelimiter: boolean;
        InsertSpaceAfterSemicolonInForStatements: boolean;
        InsertSpaceBeforeAndAfterBinaryOperators: boolean;
        InsertSpaceAfterKeywordsInControlFlowStatements: boolean;
        InsertSpaceAfterFunctionKeywordForAnonymousFunctions: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces: boolean;
        InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: boolean;
        InsertSpaceAfterTypeAssertion: boolean;
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
        [s: string]: boolean | number | string | undefined;
    }
    interface Range {
        fileName: string;
        start: number;
        end: number;
        marker?: Marker;
    }
    interface TextSpan {
        start: number;
        end: number;
    }
    class test_ {
        markers(): Marker[];
        markerNames(): string[];
        marker(name?: string): Marker;
        ranges(): Range[];
        rangesByText(): ts.Map<Range[]>;
        markerByName(s: string): Marker;
    }
    class goTo {
        marker(name?: string | Marker): void;
        eachMarker(action: () => void): void;
        rangeStart(range: Range): void;
        eachRange(action: () => void): void;
        bof(): void;
        eof(): void;
        implementation(): void;
        position(position: number, fileIndex?: number): any;
        position(position: number, fileName?: string): any;
        file(index: number, content?: string, scriptKindName?: string): any;
        file(name: string, content?: string, scriptKindName?: string): any;
    }
    class verifyNegatable {
        private negative;
        not: verifyNegatable;
        allowedClassElementKeywords: string[];
        constructor(negative?: boolean);
        completionListCount(expectedCount: number): void;
        completionListContains(symbol: string, text?: string, documentation?: string, kind?: string, spanIndex?: number): void;
        completionListItemsCountIsGreaterThan(count: number): void;
        completionListIsEmpty(): void;
        completionListContainsClassElementKeywords(): void;
        completionListAllowsNewIdentifier(): void;
        signatureHelpPresent(): void;
        errorExistsBetweenMarkers(startMarker: string, endMarker: string): void;
        errorExistsAfterMarker(markerName?: string): void;
        errorExistsBeforeMarker(markerName?: string): void;
        quickInfoExists(): void;
        typeDefinitionCountIs(expectedCount: number): void;
        implementationListIsEmpty(): void;
        isValidBraceCompletionAtPosition(openingBrace?: string): void;
        codeFixAvailable(): void;
        applicableRefactorAvailableAtMarker(markerName: string): void;
        codeFixDiagnosticsAvailableAtMarkers(markerNames: string[], diagnosticCode?: number): void;
        applicableRefactorAvailableForRange(): void;
    }
    class verify extends verifyNegatable {
        assertHasRanges(ranges: Range[]): void;
        caretAtMarker(markerName?: string): void;
        completionsAt(markerName: string, completions: string[]): void;
        indentationIs(numberOfSpaces: number): void;
        indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
        textAtCaretIs(text: string): void;
        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        eval(expr: string, value: any): void;
        currentLineContentIs(text: string): void;
        currentFileContentIs(text: string): void;
        /** Verifies that goToDefinition at the current position would take you to `endMarker`. */
        goToDefinitionIs(endMarkers: string | string[]): void;
        goToDefinitionName(name: string, containerName: string): void;
        /**
         * `verify.goToDefinition("a", "b");` verifies that go-to-definition at marker "a" takes you to marker "b".
         * `verify.goToDefinition(["a", "aa"], "b");` verifies that markers "a" and "aa" have the same definition "b".
         * `verify.goToDefinition("a", ["b", "bb"]);` verifies that "a" has multiple definitions available.
         */
        goToDefinition(startMarkerNames: string | string[], endMarkerNames: string | string[]): void;
        /** Performs `goToDefinition` for each pair. */
        goToDefinition(startsAndEnds: [string | string[], string | string[]][]): void;
        /** Performs `goToDefinition` on each key and value. */
        goToDefinition(startsAndEnds: { [startMarkerName: string]: string | string[] }): void;
        /** Verifies goToDefinition for each `${markerName}Reference` -> `${markerName}Definition` */
        goToDefinitionForMarkers(...markerNames: string[]): void;
        goToType(startsAndEnds: { [startMarkerName: string]: string | string[] }): void;
        goToType(startMarkerNames: string | string[], endMarkerNames: string | string[]): void;
        verifyGetEmitOutputForCurrentFile(expected: string): void;
        verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void;
        noReferences(markerNameOrRange?: string | Range): void;
        symbolAtLocation(startRange: Range, ...declarationRanges: Range[]): void;
        /**
         * @deprecated, prefer 'referenceGroups'
         * Like `referencesAre`, but goes to `start` first.
         * `start` should be included in `references`.
         */
        referencesOf(start: Range, references: Range[]): void;
        /**
         * For each of startRanges, asserts the ranges that are referenced from there.
         * This uses the 'findReferences' command instead of 'getReferencesAtPosition', so references are grouped by their definition.
         */
        referenceGroups(startRanges: Range | Range[], parts: Array<{ definition: string, ranges: Range[] }>): void;
        singleReferenceGroup(definition: string, ranges?: Range[]): void;
        rangesAreOccurrences(isWriteAccess?: boolean): void;
        rangesWithSameTextAreRenameLocations(): void;
        rangesAreRenameLocations(options?: Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges?: Range[] });
        /**
         * Performs `referencesOf` for every range on the whole set.
         * If `ranges` is omitted, this is `test.ranges()`.
         */
        rangesReferenceEachOther(ranges?: Range[]): void;
        findReferencesDefinitionDisplayPartsAtCaretAre(expected: ts.SymbolDisplayPart[]): void;
        currentParameterHelpArgumentNameIs(name: string): void;
        currentParameterSpanIs(parameter: string): void;
        currentParameterHelpArgumentDocCommentIs(docComment: string): void;
        currentSignatureHelpDocCommentIs(docComment: string): void;
        currentSignatureHelpTagsAre(tags: ts.JSDocTagInfo[]): void;
        signatureHelpCountIs(expected: number): void;
        signatureHelpArgumentCountIs(expected: number): void;
        signatureHelpCurrentArgumentListIsVariadic(expected: boolean);
        currentSignatureParameterCountIs(expected: number): void;
        currentSignatureTypeParameterCountIs(expected: number): void;
        currentSignatureHelpIs(expected: string): void;
        // Checks that there are no compile errors.
        noErrors(): void;
        numberOfErrorsInCurrentFile(expected: number): void;
        baselineCurrentFileBreakpointLocations(): void;
        baselineCurrentFileNameOrDottedNameSpans(): void;
        baselineGetEmitOutput(): void;
        baselineQuickInfo(): void;
        nameOrDottedNameSpanTextIs(text: string): void;
        outliningSpansInCurrentFile(spans: TextSpan[]): void;
        todoCommentsInCurrentFile(descriptors: string[]): void;
        matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number): void;
        noMatchingBracePositionInCurrentFile(bracePosition: number): void;
        DocCommentTemplate(expectedText: string, expectedOffset: number, empty?: boolean): void;
        noDocCommentTemplate(): void;
        rangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void
        getAndApplyCodeFix(errorCode?: number, index?: number): void;
        rangeIs(expectedText: string, includeWhiteSpace?: boolean): void;
        fileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, formattingOptions?: FormatCodeOptions): void;
        importFixAtPosition(expectedTextArray: string[], errorCode?: number): void;

        navigationBar(json: any): void;
        navigationTree(json: any): void;
        navigationItemsListCount(count: number, searchValue: string, matchKind?: string, fileName?: string): void;
        navigationItemsListContains(name: string, kind: string, searchValue: string, matchKind: string, fileName?: string, parentName?: string): void;
        occurrencesAtPositionContains(range: Range, isWriteAccess?: boolean): void;
        occurrencesAtPositionCount(expectedCount: number): void;
        rangesAreDocumentHighlights(ranges?: Range[]): void;
        rangesWithSameTextAreDocumentHighlights(): void;
        completionEntryDetailIs(entryName: string, text: string, documentation?: string, kind?: string): void;
        /**
         * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
         */
        syntacticClassificationsAre(...classifications: {
            classificationType: string;
            text: string;
        }[]): void;
        /**
         * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
         */
        semanticClassificationsAre(...classifications: {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        }[]): void;
        renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string): void;
        renameInfoFailed(message?: string): void;
        renameLocations(startRanges: Range | Range[], options: Range[] | { findInStrings?: boolean, findInComments?: boolean, ranges: Range[] }): void;

        /** Verify the quick info available at the current marker. */
        quickInfoIs(expectedText: string, expectedDocumentation?: string): void;
        /** Goto a marker and call `quickInfoIs`. */
        quickInfoAt(markerName: string, expectedText?: string, expectedDocumentation?: string): void;
        /**
         * Call `quickInfoAt` for each pair in the object.
         * (If the value is an array, it is [expectedText, expectedDocumentation].)
         */
        quickInfos(namesAndTexts: { [name: string]: string | [string, string] }): void;
        verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: {
            start: number;
            length: number;
        }, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]): void;
        getSyntacticDiagnostics(expected: string): void;
        getSemanticDiagnostics(expected: string): void;
        ProjectInfo(expected: string[]): void;
        allRangesAppearInImplementationList(markerName: string): void;
    }
    class edit {
        backspace(count?: number): void;
        deleteAtCaret(times?: number): void;
        replace(start: number, length: number, text: string): void;
        paste(text: string): void;
        insert(text: string): void;
        insertLine(text: string): void;
        insertLines(...lines: string[]): void;
        moveRight(count?: number): void;
        moveLeft(count?: number): void;
        enableFormatting(): void;
        disableFormatting(): void;
    }
    class debug {
        printCurrentParameterHelp(): void;
        printCurrentFileState(): void;
        printCurrentFileStateWithWhitespace(): void;
        printCurrentFileStateWithoutCaret(): void;
        printCurrentQuickInfo(): void;
        printCurrentSignatureHelp(): void;
        printCompletionListMembers(): void;
        printAvailableCodeFixes(): void;
        printBreakpointLocation(pos: number): void;
        printBreakpointAtCurrentLocation(): void;
        printNameOrDottedNameSpans(pos: number): void;
        printErrorList(): void;
        printNavigationBar(): void;
        printNavigationItems(searchValue?: string): void;
        printScriptLexicalStructureItems(): void;
        printReferences(): void;
        printContext(): void;
    }
    class format {
        document(): void;
        copyFormatOptions(): FormatCodeOptions;
        setFormatOptions(options: FormatCodeOptions): any;
        selection(startMarker: string, endMarker: string): void;
        onType(posMarker: string, key: string): void;
        setOption(name: string, value: number | string | boolean): void;
    }
    class cancellation {
        resetCancelled(): void;
        setCancelled(numberOfCalls?: number): void;
    }
    module classification {
        function comment(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function identifier(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function keyword(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function numericLiteral(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function operator(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function stringLiteral(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function whiteSpace(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function text(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function punctuation(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function docCommentTagName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function className(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function enumName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function interfaceName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function moduleName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function typeParameterName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function parameterName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function typeAliasName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function jsxOpenTagName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function jsxCloseTagName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function jsxSelfClosingTagName(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function jsxAttribute(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function jsxText(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
        function jsxAttributeStringLiteralValue(text: string, position?: number): {
            classificationType: string;
            text: string;
            textSpan?: TextSpan;
        };
    }
}
declare function verifyOperationIsCancelled(f: any): void;
declare var test: FourSlashInterface.test_;
declare var goTo: FourSlashInterface.goTo;
declare var verify: FourSlashInterface.verify;
declare var edit: FourSlashInterface.edit;
declare var debug: FourSlashInterface.debug;
declare var format: FourSlashInterface.format;
declare var cancellation: FourSlashInterface.cancellation;
declare var classification: typeof FourSlashInterface.classification;
