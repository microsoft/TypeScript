import {LanguageServiceProvider} from "extension-api";

export class AddsDiagnostics extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return previous.concat([{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics amended!",
            category: 2,
            code: "program-diagnostics-amended",
        }]);
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return previous.concat([{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics amended!",
            category: 2,
            code: "syntactic-diagnostics-amended",
        }]);
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return previous.concat([{
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics amended!",
            category: 2,
            code: "semantic-diagnostics-amended",
        }]);
    }
}

// Since this is exported second, it should be second in the chain. Probably.
// This is honestly dependent on js host key ordering 
export class MutatesAddedDiagnostics extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return previous.map(prev => prev.code === "program-diagnostics-amended" ? {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Program diagnostics mutated!",
            category: 2,
            code: "program-diagnostics-mutated",
        } : prev);
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return previous.map(prev => prev.code === "syntactic-diagnostics-amended" ? {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Syntactic diagnostics mutated!",
            category: 2,
            code: "syntactic-diagnostics-mutated",
        } : prev);
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return previous.map(prev => prev.code === "semantic-diagnostics-amended" ? {
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Semantic diagnostics mutated!",
            category: 2,
            code: "semantic-diagnostics-mutated",
        } : prev);
    }
}