import type { TypeScriptModuleLoader } from "./moduleLoader.ts";
import type { LspMiddlewareRequests } from "./protocol.generated.ts";
export { createTypeScriptModuleLoader, type TypeScriptModuleLoader } from "./moduleLoader.ts";
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
    "typescript/unstable/async": typeof import("../api/async/api.ts");
    "typescript/unstable/sync": typeof import("../api/sync/api.ts");
    "typescript/unstable/fs": typeof import("../api/fs.ts");
    "typescript/unstable/path": typeof import("../api/typedPaths.ts");
    "typescript/unstable/proto": typeof import("../api/proto.ts");
    "typescript/unstable/ast": typeof import("../ast/index.ts");
    "typescript/unstable/ast/is": typeof import("../ast/is.ts");
    "typescript/unstable/ast/factory": typeof import("../ast/factory.generated.ts");
    "typescript/unstable/ast/utils": typeof import("../ast/utils.ts");
    "typescript/unstable/ast/scanner": typeof import("../ast/scanner.ts");
    "typescript/unstable/ast/visitor": typeof import("../ast/visitor.ts");
    "typescript/unstable/ast/clone": typeof import("../ast/clone.ts");
    [exportPath: string]: unknown;
}

/**
 * The selected TypeScript installation and its module loader.
 * Restart TS Server offers to restart extensions if an acquired installation's
 * version changed on disk, without first restarting the server.
 */
export interface TypeScriptSDK extends TypeScriptModuleLoader {
    readonly version: string;
    /** The matching API package manifest; undefined for a bare executable without a companion package. */
    readonly packageJsonPath: string | undefined;
    /**
     * Whether an initialized language server currently uses this installation.
     * False while stopped or restarting; true again after a same-installation restart.
     * This is a synchronous snapshot, not a guarantee for subsequent async operations
     * or a check for changes on disk.
     */
    isCurrent(): boolean;
    /**
     * Opens an API pipe, waiting for scheduled server restarts to complete.
     * Handles remain usable after restarts of the same installation. If a different
     * installation is selected, use the SDK from the latest initialization event.
     */
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
