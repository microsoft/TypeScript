import type { LspMiddlewareRequests } from "./protocol.generated.ts";
export type * from "./protocol.generated.ts";

export interface Disposable {
    dispose(): unknown;
}

export interface Event<T> {
    (listener: (event: T) => unknown, thisArgs?: unknown, disposables?: Disposable[] | undefined): Disposable;
}

/** The URI properties used when launching a content mapper. */
export interface ContentMapperUri {
    readonly scheme: string;
    readonly fsPath: string;
}

export interface ContentMapperManifest {
    readonly name: string;
    readonly version?: string | undefined;
    readonly exec: readonly string[];
    readonly cwd?: ContentMapperUri | undefined;
    readonly compilerOptions?: readonly string[] | undefined;
    readonly dynamicConfig?: boolean | undefined;
}

export interface ContentMapperContribution {
    readonly extensions: readonly string[];
    readonly inferredProjectContribution?: {
        readonly options?: Readonly<Record<string, unknown>> | undefined;
        readonly manifest: ContentMapperManifest;
    } | undefined;
}

export type LspMiddlewareMethod = keyof LspMiddlewareRequests;

export type DeepReadonly<T> = unknown extends T ? unknown : T extends object ? { readonly [K in keyof T]: DeepReadonly<T[K]>; } : T;

export type LspMiddlewareResult<M extends LspMiddlewareMethod> = LspMiddlewareRequests[M]["result"];

export type LspMiddlewareContext<M extends LspMiddlewareMethod> = { readonly params: DeepReadonly<LspMiddlewareRequests[M]["params"]>; };

export type LspMiddlewareTransformer<M extends LspMiddlewareMethod> = (
    result: LspMiddlewareResult<M>,
    context: LspMiddlewareContext<M>,
) => LspMiddlewareResult<M> | PromiseLike<LspMiddlewareResult<M>>;

export interface ExtensionAPI {
    onLanguageServerInitialized: Event<void>;
    initializeAPIConnection(pipe?: string): Promise<string>;
    registerContentMappers(contributorId: string, contributions: readonly ContentMapperContribution[]): Disposable;

    /**
     * Changes an LSP language-feature response before conversion to VS Code objects.
     * Each callback gets its own copy of the request parameters.
     *
     * Callbacks run in registration order. Order between extensions may vary.
     * If a callback fails, we log the error and use the original server response.
     *
     * Registrations survive server restarts. Disposing removes the callback from
     * future responses but does not interrupt a response already being processed.
     *
     * Requests, notifications, lifecycle messages, and partial results are excluded.
     */
    registerLspMiddleware<M extends LspMiddlewareMethod>(
        method: M,
        transformer: LspMiddlewareTransformer<NoInfer<M>>,
    ): Disposable;
}
