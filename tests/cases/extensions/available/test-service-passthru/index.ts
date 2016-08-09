import {LanguageServiceProvider} from "extension-api";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        return previous;
    }
    getSyntacticDiagnosticsFilter(fileName, previous) {
        return previous;
    }
    getSemanticDiagnosticsFilter(fileName, previous) {
        return previous;
    }
}