import * as tsi from "typescript";

export abstract class LanguageServiceProvider implements tsi.LanguageServiceProvider {
    static "extension-kind": tsi.ExtensionKind.LanguageService = "language-service";
    protected ts: typeof tsi;
    protected args: any;
    protected host: tsi.LanguageServiceHost;
    protected service: tsi.LanguageService;
    protected registry: tsi.DocumentRegistry;
    constructor(state: {ts: typeof tsi, args: any, host: tsi.LanguageServiceHost, service: tsi.LanguageService, registry: tsi.DocumentRegistry}) {
        this.ts = state.ts;
        this.args = state.args;
        this.host = state.host;
        this.service = state.service;
        this.registry = state.registry;
    }
}
