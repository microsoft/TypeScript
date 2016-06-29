namespace ts {
    export type LintErrorMethod = {
        (err: string): void;
        (err: string, span: Node): void;
        (err: string, start: number, length: number): void;
        (shortname: string, err: string): void;
        (shortname: string, err: string, span: Node): void;
        (shortname: string, err: string, start: number, length: number): void;
    };
    export type LintStopMethod = () => void;

    /*
    * Walkers call stop to halt recursion into the node's children
    * Walkers call error to add errors to the output.
    */
    export interface LintWalker {
        visit(node: Node, stop: LintStopMethod, error: LintErrorMethod): void;
    }

    export interface BaseProviderStatic {
        readonly ["extension-kind"]: ExtensionKind;
        new (state: {ts: typeof ts, args: any}): any;
    }

    export interface SyntacticLintProviderStatic extends BaseProviderStatic {
        readonly ["extension-kind"]: ExtensionKind.SyntacticLint;
        new (state: {ts: typeof ts, args: any, host: CompilerHost, program: Program}): LintWalker;
    }

    export interface SemanticLintProviderStatic extends BaseProviderStatic {
        readonly ["extension-kind"]: ExtensionKind.SemanticLint;
        new (state: {ts: typeof ts, args: any, host: CompilerHost, program: Program, checker: TypeChecker}): LintWalker;
    }

    export interface LanguageServiceHost {} // The members for these interfaces are provided in the services layer
    export interface LanguageService {}
    export interface LanguageServiceProvider {}
    export interface DocumentRegistry {}

    export interface LanguageServiceProviderStatic {
        new (state: { ts: typeof ts, args: any, host: LanguageServiceHost, service: LanguageService, registry: DocumentRegistry }): LanguageServiceProvider;
    }

    export namespace ExtensionKind {
        export const SemanticLint: "semantic-lint" = "semantic-lint";
        export type SemanticLint = "semantic-lint";
        export const SyntacticLint: "syntactic-lint" = "syntactic-lint";
        export type SyntacticLint = "syntactic-lint";
        export const LanguageService: "language-service" = "language-service";
        export type LanguageService = "language-service";
    }
    export type ExtensionKind = ExtensionKind.SemanticLint | ExtensionKind.SyntacticLint | ExtensionKind.LanguageService;

    export interface ExtensionCollectionMap {
        "syntactic-lint"?: SyntacticLintExtension[];
        "semantic-lint"?: SemanticLintExtension[];
        "language-service"?: LanguageServiceExtension[];
        [index: string]: Extension[] | undefined;
    }

    export interface ExtensionBase {
        name: string;
        args: any;
        kind: ExtensionKind;
    }

    // @kind(ExtensionKind.SyntacticLint)
    export interface SyntacticLintExtension extends ExtensionBase {
        ctor: SyntacticLintProviderStatic;
    }

    // @kind(ExtensionKind.SemanticLint)
    export interface SemanticLintExtension extends ExtensionBase {
        ctor: SemanticLintProviderStatic;
    }

    // @kind(ExtensionKind.LanguageService)
    export interface LanguageServiceExtension extends ExtensionBase {
        ctor: LanguageServiceProviderStatic;
    }

    export type Extension = SyntacticLintExtension | SemanticLintExtension | LanguageServiceExtension;

    export interface ExtensionCache {
        getCompilerExtensions(): ExtensionCollectionMap;
        getExtensionLoadingDiagnostics(): Diagnostic[];
    }

    export interface ExtensionHost extends ModuleResolutionHost {
        loadExtension?(name: string): any;
    }

    export function createExtensionCache(options: CompilerOptions, host: ExtensionHost): ExtensionCache {

        const diagnostics: Diagnostic[] = [];
        let extensions: ExtensionCollectionMap;

        const cache: ExtensionCache = {
            getCompilerExtensions: () => {
                if (!extensions) {
                    extensions = collectCompilerExtensions();
                }
                return extensions;
            },
            getExtensionLoadingDiagnostics: () => {
                // To get extension loading diagnostics, we need to make sure we've actually loaded them
                cache.getCompilerExtensions();
                return diagnostics;
            },
        };
        return cache;

        function collectCompilerExtensions(): ExtensionCollectionMap {
            const extOptions = options.extensions;
            const extensionNames = (extOptions instanceof Array) ? extOptions : getKeys(extOptions);
            const currentDirectory = host.getCurrentDirectory ? host.getCurrentDirectory() : "";
            const extensionLoadResults = map(extensionNames, name => {
                let result: any;
                let error: any;
                if (host.loadExtension) {
                    const resolved = resolveModuleName(name, combinePaths(currentDirectory, "tsconfig.json"), options, host, /*loadJs*/true).resolvedModule;
                    if (resolved) {
                        try {
                            result = host.loadExtension(resolved.resolvedFileName);
                        }
                        catch (e) {
                            error = e;
                        }
                    }
                    else {
                        error = new Error(`Host could not locate extension '${name}'.`);
                    }
                }
                else {
                    error = new Error("Extension loading not implemented in host!");
                }
                if (error) {
                    diagnostics.push(createCompilerDiagnostic(Diagnostics.Extension_loading_failed_with_error_0, error.stack ? `${error}
                    Stack trace:
                    ${error.stack}` : error));
                }
                return { name, result, error };
            });
            const successfulExtensionLoadResults = filter(extensionLoadResults, res => !res.error);
            const preparedExtensionObjects = map(successfulExtensionLoadResults, res => {
                if (res.result) {
                    return reduceProperties(res.result, (aggregate: Extension[], potentialExtension: BaseProviderStatic, key: string) => {
                        if (!potentialExtension) {
                            return; // Avoid errors on explicitly exported null/undefined (why would someone do that, though?)
                        }
                        const annotatedKind = potentialExtension["extension-kind"];
                        if (typeof annotatedKind === "string") {
                            const ext: ExtensionBase = {
                                name: key !== "default" ? `${res.name}[${key}]` : res.name,
                                args: extensionNames === extOptions ? undefined : (extOptions as Map<any>)[res.name],
                                kind: annotatedKind
                            };
                            switch (ext.kind) {
                                case ExtensionKind.SemanticLint:
                                case ExtensionKind.SyntacticLint:
                                case ExtensionKind.LanguageService:
                                    if (typeof potentialExtension !== "function") {
                                        diagnostics.push(createCompilerDiagnostic(
                                            Diagnostics.Extension_0_exported_member_1_has_extension_kind_2_but_was_type_3_when_type_4_was_expected,
                                            res.name,
                                            key,
                                            (ts as any).ExtensionKind[annotatedKind],
                                            typeof potentialExtension,
                                            "function"
                                        ));
                                        return;
                                    }
                                    (ext as (SemanticLintExtension | SyntacticLintExtension | LanguageServiceExtension)).ctor = potentialExtension as (SemanticLintProviderStatic | SyntacticLintProviderStatic | LanguageServiceProviderStatic);
                                    break;
                                default:
                                    // Include a default case which just puts the extension unchecked onto the base extension
                                    // This can allow language service extensions to query for custom extension kinds
                                    (ext as any).__extension =  potentialExtension;
                                    break;
                            }
                            aggregate.push(ext as Extension);
                        }
                        return aggregate;
                    }, []);
                }
                else {
                    return [];
                }
            });
            return groupBy(flatten(preparedExtensionObjects), elem => elem.kind) || {};
        }
    }
}