import {LanguageServiceProvider} from "extension-api";

import * as ts from "typescript";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics replaced!",
            category: 2,
            code: "program-diagnostics-replaced",
        }];
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics replaced!",
            category: 2,
            code: "syntactic-diagnostics-replaced",
        }];
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return [{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics replaced!",
            category: 2,
            code: "semantic-diagnostics-replaced",
        }];
    }
    getEncodedSyntacticClassificationsFilter(fileName, span, previous) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.text : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getEncodedSemanticClassificationsFilter(fileName, span, previous) {
        return {
            spans: [span.start, span.length, this.ts.endsWith(fileName, "atotc.ts") ? this.ts.ClassificationType.moduleName : this.ts.ClassificationType.comment],
            endOfLineState: this.ts.EndOfLineState.None
        };
    }
    getCompletionsAtPositionFilter(fileName, position, previous) {
        return {
            isMemberCompletion: false,
            isNewIdentifierLocation: false,
            entries: [{name: "fakeCompletion", kind: "", kindModifiers: "", sortText: "fakeCompletion"}]
        };
    }
    getCompletionEntryDetailsFilter(fileName, position, entryName, previous) {
        return {
            name: "fakeCompletion",
            kind: position.toString(),
            kindModifiers: entryName,
            displayParts: [],
            documentation: [],
        };
    }
    getQuickInfoAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getNameOrDottedNameSpanFilter(fileName, startPos, endPos, previous) {
        return {};
    }
    getBreakpointStatementAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getSignatureHelpItemsFilter(fileName, position, previous) {
        return {
            items: [],
            applicableSpan: undefined,
            selectedItemIndex: undefined,
            argumentIndex: 0,
            argumentCount: 0,
        };
    }
    getRenameInfoFilter(fileName, position, previous) {
        return {};
    }
    findRenameLocationsFilter(fileName, position, findInStrings, findInComments, previous) {
        return {};
    }
    getDefinitionAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getTypeDefinitionAtPositionFilter(fileName, position, previous) {
        return {};
    }
    getReferencesAtPositionFilter(fileName, position, previous) {
        return {};
    }
    findReferencesFilter(fileName, position, previous) {
        return {};
    }
    getDocumentHighlightsFilter(fileName, position, filesToSearch, previous) {
        return {};
    }
    getNavigateToItemsFilter(searchValue, maxResultCount, previous) {
        return {};
    }
    getNavigationBarItemsFilter(fileName, previous) {
        return {};
    }
    getOutliningSpansFilter(fileName, previous) {
        return {};
    }
    getTodoCommentsFilter(fileName, descriptors, previous) {
        return [];
    }
    getBraceMatchingAtPositionFilter(fileName, position, previous) {
        return [];
    }
    getIndentationAtPositionFilter(fileName, position, options, previous) {
        return {};
    }
    getFormattingEditsForRangeFilter(fileName, start, end, options, previous) {
        return {};
    }
    getFormattingEditsForDocumentFilter(fileName, options, previous) {
        return {};
    }
    getFormattingEditsAfterKeystrokeFilter(fileName, position, key, options, previous) {
        return {};
    }
    getDocCommentTemplateAtPositionFilter(fileName, position, previous) {
        return {newText: "/********Yes.*********/", caretOffset: 9};
    }
}