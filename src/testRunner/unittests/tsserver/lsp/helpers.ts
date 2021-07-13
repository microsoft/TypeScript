/*@internal*/
namespace ts.projectSystem {
    import lsp = server.lsp;

    const URI: typeof import("vscode-uri").URI = require("vscode-uri").URI;

    type LspMessage = lsp.RequestMessage | lsp.NotificationMessage;

    export class TestLspSession extends server.Session<lsp.Message, LspMessage> {
        private id = 0;
        public logger: Logger;

        constructor(opts: TestSessionOptions) {
            super(opts);
            this.logger = opts.logger;
        }

        protected override parseMessage(message: lsp.Message): LspMessage {
            return lsp.parseMessage(message);
        }

        protected override getCommandFromRequest(request: LspMessage) {
            return lsp.getCommandFromRequest(request);
        }

        protected override getSeqFromRequest(request: LspMessage) {
            return lsp.getSeqFromRequest(request);
        }

        protected override toStringMessage(message: lsp.RequestMessage) {
            return lsp.toStringMessage(message);
        }

        protected override getHandlers() {
            return lsp.getHandlers({
                change: this.change.bind(this),
                exit: this.exit.bind(this),
                getQuickInfoWorker: this.getQuickInfoWorker.bind(this),
                getSignatureHelpItems: this.getSignatureHelpItems.bind(this),
                notRequired: this.notRequired.bind(this),
                openClientFile: this.openClientFile.bind(this),
                projectService: this.projectService,
                requiredResponse: this.requiredResponse.bind(this),
            });
        }

        public override executeCommand(request: lsp.RequestMessage | lsp.NotificationMessage) {
            const verboseLogging = this.logger.hasLevel(server.LogLevel.verbose);
            if (verboseLogging) this.logger.info(`request:${JSON.stringify(request)}`);
            const result = super.executeCommand(request);
            if (verboseLogging) this.logger.info(`response:${JSON.stringify(result)}`);
            return result;
        }

        public executeLspRequest<T extends lsp.RequestMessage>(request: Partial<T>) {
            this.id++;
            request.id = this.id;
            return this.executeCommand(request as T).response;
        }

        public executeLspNotification(notification: lsp.NotificationMessage) {
            this.executeCommand(notification);
        }
    }

    export function createLspSession(host: server.ServerHost, opts: Partial<TestSessionOptions & { canUseEvents: never }> = {}) {
        const typingsInstaller = opts.typingsInstaller ?? new TestTypingsInstaller("/a/data/", /*throttleLimit*/ 5, host);

        const sessionOptions: TestSessionOptions = {
            host,
            cancellationToken: server.nullCancellationToken,
            useSingleInferredProject: true,
            useInferredProjectPerProjectRoot: false,
            typingsInstaller,
            byteLength: Utils.byteLength,
            hrtime: process.hrtime,
            logger: opts.logger ?? createHasErrorMessageLogger(),
            canUseEvents: false
        };

        const session = new TestLspSession({...sessionOptions, ...opts});
        session.executeLspRequest<lsp.InitializeRequest>(
            makeLspMessage(lsp.Methods.Initialize, { processId: 0 })
        );
        session.executeLspNotification(
            makeLspMessage(lsp.Methods.Initialized, {})
        );

        return session;
    }

    export function makeLspMessage<TMethod extends lsp.Methods, TParams extends {} | unknown[] | undefined>(method: TMethod, params: TParams): lsp.Message & { readonly method: TMethod, readonly params: TParams } {
        return {
            jsonrpc: "2.0",
            method,
            params,
        };
    }

    export function openFilesForLspSession(files: readonly File[], session: TestLspSession) {
        for (const file of files) {
            session.executeLspNotification(
                makeLspMessage(lsp.Methods.DidOpen, { textDocument: fileToTextDocumentItem(file) }) as lsp.NotificationMessage
            );
        }
    }

    function fileToTextDocumentItem(file: File, scriptKind?: ScriptKind): lsp.TextDocumentItem {
        const languageId = scriptKindToLanguageId(scriptKind ?? getScriptKindFromFileName(file.path));
        return {
            languageId,
            text: file.content,
            uri: URI.file(file.path).toString(),
            version: 0,
        };
    }

    function scriptKindToLanguageId(scriptKind: ScriptKind): string {
        switch (scriptKind) {
            case ScriptKind.Unknown:
            case ScriptKind.JS:
            case ScriptKind.External:
            case ScriptKind.Deferred:
                return "javascript";
            case ScriptKind.JSX:
                return "javascriptreact";
            case ScriptKind.TSX:
                return "typescriptreact";
            case ScriptKind.TS:
            default:
                return "typescript";
        }
    }

    export function createUriFromPath(path: string) {
        return URI.file(path).toString();
    }
}
