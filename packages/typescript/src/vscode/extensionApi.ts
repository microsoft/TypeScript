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

export interface APIModules {
    "unstable/async": typeof import("../api/async/api.ts");
    "unstable/sync": typeof import("../api/sync/api.ts");
    "unstable/fs": typeof import("../api/fs.ts");
    "unstable/proto": typeof import("../api/proto.ts");
    "unstable/ast": typeof import("../ast/index.ts");
    "unstable/ast/is": typeof import("../ast/is.ts");
    "unstable/ast/factory": typeof import("../ast/factory.generated.ts");
    "unstable/ast/utils": typeof import("../ast/utils.ts");
    "unstable/ast/scanner": typeof import("../ast/scanner.ts");
    "unstable/ast/visitor": typeof import("../ast/visitor.ts");
    "unstable/ast/clone": typeof import("../ast/clone.ts");
}

/** Structurally compatible with VS Code's Uri, without a dependency on VS Code types. */
export interface Uri {
    readonly scheme: string;
    readonly authority: string;
    readonly path: string;
    readonly query: string;
    readonly fragment: string;
    readonly fsPath: string;
    with(change: {
        scheme?: string | undefined;
        authority?: string | undefined;
        path?: string | undefined;
        query?: string | undefined;
        fragment?: string | undefined;
    }): Uri;
    toString(skipEncoding?: boolean): string;
    toJSON(): unknown;
}

/** The selected TypeScript installation, bound to one language server initialization. */
export interface TypeScriptSDK {
    readonly version: string;
    /** The matching API package manifest; undefined for a bare executable without a companion package. */
    readonly packageJsonUri: Uri | undefined;
    /**
     * Imports a module from the JavaScript API package matching this initialization's
     * language server. Export paths omit the leading "./".
     */
    importModule<K extends keyof APIModules>(exportPath: K): Promise<APIModules[K]>;
    importModule(exportPath: string): Promise<unknown>;
    /** Opens an API pipe for this initialization. Rejects if the server has stopped or restarted. */
    initializeAPIConnection(pipe?: string): Promise<string>;
}

export interface ExtensionAPI {
    /**
     * Fires after each language server initialization. Existing API connections
     * should be discarded and recreated when this fires. Newly registered listeners
     * are invoked immediately if the server is already initialized.
     */
    onLanguageServerInitialized: Event<TypeScriptSDK>;
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
