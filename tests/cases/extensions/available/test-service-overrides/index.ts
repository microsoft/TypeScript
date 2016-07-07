import {LanguageServiceProvider} from "extension-api";
import * as ts from "typescript";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnostics() {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics replaced!",
            category: 2,
            code: "program-diagnostics-replaced",
        }];
    }
    getSyntacticDiagnostics(fileName) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics replaced!",
            category: 2,
            code: "syntactic-diagnostics-replaced",
        }];
    }
    getSemanticDiagnostics(fileName) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics replaced!",
            category: 2,
            code: "semantic-diagnostics-replaced",
        }];
    }
    getEncodedSyntacticClassifications(fileName, span) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.text : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getEncodedSemanticClassifications(fileName, span) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.moduleName : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getCompletionsAtPosition(fileName, position) {
        return {
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries: [{name: "fakeCompletion", kind: "", kindModifiers: "", sortText: "fakeCompletion"}]
        };
    }
    getCompletionEntryDetails(fileName, position, entryName) {
        return {
            name: "fakeCompletion",
            kind: position.toString(),
            kindModifiers: entryName,
            displayParts: [],
            documentation: [],
        };
    }
    getQuickInfoAtPosition(fileName, position) {
        return {};
    }
    getNameOrDottedNameSpan(fileName, startPos, endPos) {
        return {};
    }
    getBreakpointStatementAtPosition(fileName, position) {
        return {};
    }
    getSignatureHelpItems(fileName, position) {
        return {
            items: [],
            applicableSpan: undefined,
            selectedItemIndex: undefined,
            argumentIndex: 0,
            argumentCount: 0,
        };
    }
    getRenameInfo(fileName, position) {
        return {};
    }
    findRenameLocations(fileName, position, findInStrings, findInComments) {
        return {};
    }
    getDefinitionAtPosition(fileName, position) {
        return {};
    }
    getTypeDefinitionAtPosition(fileName, position) {
        return {};
    }
    getReferencesAtPosition(fileName, position) {
        return {};
    }
    findReferences(fileName, position) {
        return {};
    }
    getDocumentHighlights(fileName, position, filesToSearch) {
        return {};
    }
    getNavigateToItems(searchValue, maxResultCount) {
        return {};
    }
    getNavigationBarItems(fileName) {
        return {};
    }
    getOutliningSpans(fileName) {
        return {};
    }
    getTodoComments(fileName, descriptors) {
        return [];
    }
    getBraceMatchingAtPosition(fileName, position) {
        return [];
    }
    getIndentationAtPosition(fileName, position, options) {
        return {};
    }
    getFormattingEditsForRange(fileName, start, end, options) {
        return {};
    }
    getFormattingEditsForDocument(fileName, options) {
        return {};
    }
    getFormattingEditsAfterKeystroke(fileName, position, key, options) {
        return {};
    }
    getDocCommentTemplateAtPosition(fileName, position) {
        return {newText: "/********Yes.*********/", caretOffset: 9};
    }
}