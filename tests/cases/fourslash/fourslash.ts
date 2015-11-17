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
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }

    enum IndentStyle {
        None = 0,
        Block = 1,
        Smart = 2,
    }    
}

declare namespace FourSlashInterface {
    interface Marker {
        fileName: string;
        position: number;
        data?: any;
    }
    interface EditorOptions {
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
        PlaceOpenBraceOnNewLineForFunctions: boolean;
        PlaceOpenBraceOnNewLineForControlBlocks: boolean;
        [s: string]: boolean | number | string;
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
        marker(name?: string): Marker;
        ranges(): Range[];
        markerByName(s: string): Marker;
    }
    class goTo {
        marker(name?: string): void;
        bof(): void;
        eof(): void;
        definition(definitionIndex?: number): void;
        type(definitionIndex?: number): void;
        position(position: number, fileIndex?: number): any;
        position(position: number, fileName?: string): any;
        file(index: number, content?: string): any;
        file(name: string, content?: string): any;
    }
    class verifyNegatable {
        private negative;
        not: verifyNegatable;
        constructor(negative?: boolean);
        memberListContains(symbol: string, text?: string, documenation?: string, kind?: string): void;
        memberListCount(expectedCount: number): void;
        completionListContains(symbol: string, text?: string, documentation?: string, kind?: string): void;
        completionListItemsCountIsGreaterThan(count: number): void;
        completionListIsEmpty(): void;
        completionListAllowsNewIdentifier(): void;
        memberListIsEmpty(): void;
        referencesCountIs(count: number): void;
        referencesAtPositionContains(range: Range, isWriteAccess?: boolean): void;
        signatureHelpPresent(): void;
        errorExistsBetweenMarkers(startMarker: string, endMarker: string): void;
        errorExistsAfterMarker(markerName?: string): void;
        errorExistsBeforeMarker(markerName?: string): void;
        quickInfoIs(expectedText?: string, expectedDocumentation?: string): void;
        quickInfoExists(): void;
        definitionCountIs(expectedCount: number): void;
        typeDefinitionCountIs(expectedCount: number): void;
        definitionLocationExists(): void;
        verifyDefinitionsName(name: string, containerName: string): void;
    }
    class verify extends verifyNegatable {
        caretAtMarker(markerName?: string): void;
        indentationIs(numberOfSpaces: number): void;
        indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle?: IndentStyle): void;
        textAtCaretIs(text: string): void;
        /**
         * Compiles the current file and evaluates 'expr' in a context containing
         * the emitted output, then compares (using ===) the result of that expression
         * to 'value'. Do not use this function with external modules as it is not supported.
         */
        eval(expr: string, value: any): void;
        currentLineContentIs(text: string): void;
        currentFileContentIs(text: string): void;
        verifyGetEmitOutputForCurrentFile(expected: string): void;
        currentParameterHelpArgumentNameIs(name: string): void;
        currentParameterSpanIs(parameter: string): void;
        currentParameterHelpArgumentDocCommentIs(docComment: string): void;
        currentSignatureHelpDocCommentIs(docComment: string): void;
        signatureHelpCountIs(expected: number): void;
        signatureHelpArgumentCountIs(expected: number): void;
        currentSignatureParameterCountIs(expected: number): void;
        currentSignatureTypeParameterCountIs(expected: number): void;
        currentSignatureHelpIs(expected: string): void;
        numberOfErrorsInCurrentFile(expected: number): void;
        baselineCurrentFileBreakpointLocations(): void;
        baselineCurrentFileNameOrDottedNameSpans(): void;
        baselineGetEmitOutput(): void;
        nameOrDottedNameSpanTextIs(text: string): void;
        outliningSpansInCurrentFile(spans: TextSpan[]): void;
        todoCommentsInCurrentFile(descriptors: string[]): void;
        matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number): void;
        noMatchingBracePositionInCurrentFile(bracePosition: number): void;
        DocCommentTemplate(expectedText: string, expectedOffset: number, empty?: boolean): void;
        noDocCommentTemplate(): void;
        getScriptLexicalStructureListCount(count: number): void;
        getScriptLexicalStructureListContains(name: string, kind: string, fileName?: string, parentName?: string, isAdditionalSpan?: boolean, markerPosition?: number): void;
        navigationItemsListCount(count: number, searchValue: string, matchKind?: string): void;
        navigationItemsListContains(name: string, kind: string, searchValue: string, matchKind: string, fileName?: string, parentName?: string): void;
        occurrencesAtPositionContains(range: Range, isWriteAccess?: boolean): void;
        occurrencesAtPositionCount(expectedCount: number): void;
        documentHighlightsAtPositionContains(range: Range, fileNamesToSearch: string[], kind?: string): void;
        documentHighlightsAtPositionCount(expectedCount: number, fileNamesToSearch: string[]): void;
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
        renameLocations(findInStrings: boolean, findInComments: boolean): void;
        verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: {
            start: number;
            length: number;
        }, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[]): void;
        getSyntacticDiagnostics(expected: string): void;
        getSemanticDiagnostics(expected: string): void;
        ProjectInfo(expected: string[]): void;
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
        printMemberListMembers(): void;
        printCompletionListMembers(): void;
        printBreakpointLocation(pos: number): void;
        printBreakpointAtCurrentLocation(): void;
        printNameOrDottedNameSpans(pos: number): void;
        printErrorList(): void;
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
        setOption(name: string, value: number): any;
        setOption(name: string, value: string): any;
        setOption(name: string, value: boolean): any;
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
