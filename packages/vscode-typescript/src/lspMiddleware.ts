import type {
    LspMiddlewareContext,
    LspMiddlewareMethod,
    LspMiddlewareResult,
    LspMiddlewareTransformer,
} from "@typescript/typescript/unstable/vscode";
import type {
    CancellationToken,
    Disposable,
    MessageSignature,
} from "vscode-languageserver-protocol";

const supportedMethods: { readonly [M in LspMiddlewareMethod]: true; } = {
    "textDocument/hover": true,
    "textDocument/completion": true,
    "completionItem/resolve": true,
    "textDocument/signatureHelp": true,
    "textDocument/definition": true,
    "textDocument/typeDefinition": true,
    "textDocument/implementation": true,
    "textDocument/references": true,
    "textDocument/documentHighlight": true,
    "textDocument/documentSymbol": true,
    "workspace/symbol": true,
    "textDocument/rename": true,
    "textDocument/prepareRename": true,
    "textDocument/formatting": true,
    "textDocument/rangeFormatting": true,
    "textDocument/onTypeFormatting": true,
    "textDocument/selectionRange": true,
    "textDocument/foldingRange": true,
    "textDocument/inlayHint": true,
    "textDocument/codeAction": true,
    "textDocument/codeLens": true,
    "codeLens/resolve": true,
    "textDocument/prepareCallHierarchy": true,
    "callHierarchy/incomingCalls": true,
    "callHierarchy/outgoingCalls": true,
    "textDocument/linkedEditingRange": true,
    "textDocument/semanticTokens/full": true,
    "textDocument/semanticTokens/range": true,
    "textDocument/diagnostic": true,
    "custom/textDocument/sourceDefinition": true,
    "custom/textDocument/multiDocumentHighlight": true,
    "textDocument/_vs_onAutoInsert": true,
    "textDocument/_vs_references": true,
};

function isSupportedMethod(method: string): method is LspMiddlewareMethod {
    return Object.hasOwn(supportedMethods, method);
}

/** Internal middleware can change requests and receives the original parameters. */
export interface FirstPartyLspMiddleware {
    <P, R>(
        type: string | MessageSignature,
        params: P | undefined,
        token: CancellationToken | undefined,
        next: (type: string | MessageSignature, params?: P, token?: CancellationToken) => Promise<R>,
    ): Promise<R>;
}

interface Registration {
    invoke(result: unknown, context: unknown): unknown;
}

export class LspMiddlewareRegistry implements Disposable {
    private readonly registrations = new Map<LspMiddlewareMethod, Registration[]>();
    private disposed = false;

    constructor(
        private readonly reportError: (method: LspMiddlewareMethod, error: unknown) => void,
        private readonly firstPartyMiddleware: readonly FirstPartyLspMiddleware[] = [],
    ) {}

    register<M extends LspMiddlewareMethod>(method: M, transformer: LspMiddlewareTransformer<NoInfer<M>>): Disposable {
        if (this.disposed) {
            throw new Error("LSP middleware registry is disposed.");
        }
        if (!isSupportedMethod(method)) {
            throw new TypeError(`LSP middleware method '${method}' is not supported.`);
        }
        if (typeof transformer !== "function") {
            throw new TypeError("LSP middleware transformer must be a function.");
        }
        const registration: Registration = {
            // The transport erases protocol types; registration keeps each callback paired with its method.
            invoke: (result, context) => transformer(result as LspMiddlewareResult<M>, context as LspMiddlewareContext<M>),
        };
        const registrations = this.registrations.get(method) ?? [];
        registrations.push(registration);
        this.registrations.set(method, registrations);
        let disposed = false;
        return {
            dispose: () => {
                if (disposed) return;
                disposed = true;
                const index = registrations.indexOf(registration);
                if (index !== -1) registrations.splice(index, 1);
                if (registrations.length === 0 && this.registrations.get(method) === registrations) {
                    this.registrations.delete(method);
                }
            },
        };
    }

    sendRequest<P, R>(
        type: string | MessageSignature,
        params: P | undefined,
        token: CancellationToken | undefined,
        next: (type: string | MessageSignature, params?: P, token?: CancellationToken) => Promise<R>,
    ): Promise<R> {
        const dispatch = async (type: string | MessageSignature, params?: P, token?: CancellationToken): Promise<R> => {
            const result = await next(type, params, token);
            const method = typeof type === "string" ? type : type.method;
            if (!isSupportedMethod(method)) return result;
            return this.transform(method, result, { params }, token);
        };
        const invoke = (index: number, type: string | MessageSignature, params?: P, token?: CancellationToken): Promise<R> => {
            const middleware = this.firstPartyMiddleware[index];
            return middleware
                ? middleware(type, params, token, (type, params, token) => invoke(index + 1, type, params, token))
                : dispatch(type, params, token);
        };
        return invoke(0, type, params, token);
    }

    private async transform<R>(method: LspMiddlewareMethod, original: R, context: unknown, token?: CancellationToken): Promise<R> {
        const registrations = this.registrations.get(method)?.slice();
        if (!registrations?.length || token?.isCancellationRequested) return original;
        try {
            let result: unknown = structuredClone(original);
            for (const registration of registrations) {
                if (token?.isCancellationRequested) return original;
                result = await registration.invoke(result, structuredClone(context));
            }
            return token?.isCancellationRequested ? original : result as R;
        }
        catch (error) {
            this.reportError(method, error);
            return original;
        }
    }

    dispose(): void {
        this.disposed = true;
        this.registrations.clear();
    }
}
