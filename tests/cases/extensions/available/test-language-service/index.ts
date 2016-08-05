import {LanguageServiceProvider} from "extension-api";

export default class extends LanguageServiceProvider {
    constructor(state) { super(state); }
    getProgramDiagnosticsFilter(previous) {
        previous.push({
            file: undefined,
            start: undefined,
            length: undefined,
            messageText: "Test language service plugin loaded!",
            category: 2,
            code: "test-plugin-loaded",
        });
        return previous;
    }
}