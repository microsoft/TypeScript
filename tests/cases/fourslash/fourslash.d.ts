declare var FourSlash: any;
declare enum IncrementalEditValidation {
    None,
    SyntacticOnly,
    Complete,
}
declare enum TypingFidelity {
    /** Performs typing and formatting (if formatting is enabled) */
    Low,
    /** Performs typing, checks completion lists, signature help, and formatting (if enabled) */
    High,
}
declare enum EmitReturnStatus {
    Succeeded = 0,
    AllOutputGenerationSkipped = 1,
    JSGeneratedWithSemanticErrors = 2,
    DeclarationGenerationSkipped = 3,
    EmitErrorsEncountered = 4,
}
declare module FourSlashInterface {
    interface Marker {
        fileName: string;
        position: number;
        data?: any;
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
        ranges(): Range[];
    }
    class diagnostics {
        validateTypeAtCurrentPosition(): any;
        validateTypesAtPositions(...positions: number[]): any;
        setEditValidation(validation: IncrementalEditValidation): void;
        setTypingFidelity(fidelity: TypingFidelity): void;
    }
    class goTo {
        marker(name?: string): void;
        bof(): void;
        eof(): void;
        definition(definitionIndex?: number): void;
        position(position: number, fileIndex?: number): any;
        position(position: number, fileName?: string): any;
        file(index: number): any;
        file(name: string): any;
    }
    class verifyNegatable {
        private negative;
        not: verifyNegatable;
        constructor(negative?: boolean);
        memberListContains(symbol: string, type?: string, docComment?: string, fullSymbolName?: string, kind?: string): void;
        memberListCount(expectedCount: number): void;
        completionListContains(symbol: string, type?: string, docComment?: string, fullSymbolName?: string, kind?: string): void;
        completionListItemsCountIsGreaterThan(count: number): void;
        completionListIsEmpty(): void;
        memberListIsEmpty(): void;
        referencesCountIs(count: number): void;
        referencesAtPositionContains(range: Range, isWriteAccess?: boolean): void;
        implementorsCountIs(count: number): void;
        currentParameterIsVariable(): void;
        signatureHelpPresent(): void;
        errorExistsBetweenMarkers(startMarker: string, endMarker: string): void;
        errorExistsAfterMarker(markerName?: string): void;
        errorExistsBeforeMarker(markerName?: string): void;
        quickInfoIs(typeName?: string, docComment?: string, symbolName?: string, kind?: string): void;
        quickInfoSymbolNameIs(symbolName: any): void;
        quickInfoExists(): void;
        definitionLocationExists(): void;
    }
    class verify extends verifyNegatable {
        caretAtMarker(markerName?: string): void;
        indentationIs(numberOfSpaces: number): void;
        indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number): void;
        textAtCaretIs(text: string): void;
        /**
            Compiles the current file and evaluates 'expr' in a context containing
            the emitted output, then compares (using ===) the result of that expression
            to 'value'. Do not use this function with external modules as it is not supported.
        */
        eval(expr: string, value: any): void;
        emitOutput(expectedState: EmitReturnStatus, expectedFilename?: string): void;
        currentLineContentIs(text: string): void;
        currentFileContentIs(text: string): void;
        currentParameterHelpArgumentNameIs(name: string): void;
        currentParameterSpanIs(parameter: string): void;
        currentParameterHelpArgumentDocCommentIs(docComment: string): void;
        currentSignatureHelpDocCommentIs(docComment: string): void;
        signatureHelpCountIs(expected: number): void;
        currentSignatureParamterCountIs(expected: number): void;
        currentSignatureTypeParamterCountIs(expected: number): void;
        currentSignatureHelpIs(expected: string): void;
        numberOfErrorsInCurrentFile(expected: number): void;
        baselineCurrentFileBreakpointLocations(): void;
        baselineCurrentFileNameOrDottedNameSpans(): void;
        nameOrDottedNameSpanTextIs(text: string): void;
        outliningSpansInCurrentFile(spans: TextSpan[]): void;
        todoCommentsInCurrentFile(descriptors: string[]): void;
        matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number): void;
        noMatchingBracePositionInCurrentFile(bracePosition: number): void;
        setVerifyDocComments(val: boolean): void;
        getScriptLexicalStructureListCount(count: number): void;
        getScriptLexicalStructureListContains(name: string, kind: string, fileName?: string, parentName?: string, isAdditionalSpan?: boolean, markerPosition?: number): void;
        navigationItemsListCount(count: number, searchValue: string, matchKind?: string): void;
        navigationItemsListContains(name: string, kind: string, searchValue: string, matchKind: string, fileName?: string, parenetName?: string): void;
        occurrencesAtPositionContains(range: Range, isWriteAccess?: boolean): void;
        occurrencesAtPositionCount(expectedCount: number): void;
        completionEntryDetailIs(entryName: string, type: string, docComment?: string, fullSymbolName?: string, kind?: string): void;
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
        selection(startMarker: string, endMarker: string): void;
        setOption(name: string, value: number): any;
        setOption(name: string, value: string): any;
        setOption(name: string, value: boolean): any;
    }
    class cancellation {
        resetCancelled(): void;
        setCancelled(numberOfCalls?: number): void;
    }
}
declare module fs {
    var test: FourSlashInterface.test_;
    var goTo: FourSlashInterface.goTo;
    var verify: FourSlashInterface.verify;
    var edit: FourSlashInterface.edit;
    var debug: FourSlashInterface.debug;
    var format: FourSlashInterface.format;
    var diagnostics: FourSlashInterface.diagnostics;
    var cancellation: FourSlashInterface.cancellation;
}
declare function verifyOperationIsCancelled(f: any): void;
declare var test: FourSlashInterface.test_;
declare var goTo: FourSlashInterface.goTo;
declare var verify: FourSlashInterface.verify;
declare var edit: FourSlashInterface.edit;
declare var debug: FourSlashInterface.debug;
declare var format: FourSlashInterface.format;
declare var diagnostics: FourSlashInterface.diagnostics;
declare var cancellation: FourSlashInterface.cancellation;
