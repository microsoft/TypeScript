namespace ts {
    export type LintErrorMethod = {
        /**
         * @param {string} err The error message to report
         */
        (err: string): void;
        /**
         * @param {string} err The error message to report
         * @param {Node} span The node on which to position the error
         */
        (err: string, span: Node): void;
        /**
         * @param {string} err The error message to report
         * @param {number} start The start position of the error span
         * @param {number} length The length of the error span
         */
        (err: string, start: number, length: number): void;
        /**
         * @param {string} shortname A short code uniquely identifying the error within the lint
         * @param {string} err The error message to report
         */
        (shortname: string, err: string): void;
        /**
         * @param {string} shortname A short code uniquely identifying the error within the lint
         * @param {string} err The error message to report
         * @param {Node} span The node on which to position the error
         */
        (shortname: string, err: string, span: Node): void;
        /**
         * @param {string} shortname A short code uniquely identifying the error within the lint
         * @param {string} err The error message to report
         * @param {number} start The start position of the error span
         * @param {number} length The length of the error span
         */
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

    export interface LanguageServiceProviderStatic extends BaseProviderStatic {
        readonly ["extension-kind"]: ExtensionKind.LanguageService;
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

    export type Timestamp = number & { __timestampBrand: void };
    export interface ProfileData {
        globalBucket: string;
        task: string;
        start: Timestamp;
        length?: Timestamp;
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

    export interface Program {
        /**
         * Gets a map of loaded compiler extensions
         */
        getCompilerExtensions(): ExtensionCollectionMap;
    }

    /* @internal */
    export interface TypeCheckerHost {
        getCompilerExtensions(): ExtensionCollectionMap;
    }

    function profileTrace(trace: (s: string) => void | undefined, message: DiagnosticMessage, ...args: any[]) {
        if (trace) {
            trace(flattenDiagnosticMessageText(createCompilerDiagnostic(message, ...args).messageText, (sys && sys.newLine || "\n")));
        }
    }

    declare var performance: { now?(): number }; // If we're running in a context with high resolution timers, make use of them
    declare var process: { hrtime?(start?: [number, number]): [number, number] };

    function getTimestampInternal(): number {
        if (typeof performance !== "undefined" && performance.now) {
            return performance.now();
        }
        if (typeof process !== "undefined" && process.hrtime) {
            const time = process.hrtime();
            return (time[0] * 1e9 + time[1]) / 1e6;
        }
        return +(new Date());
    }

    export function getTimestampMs(since?: Timestamp): Timestamp {
        if (typeof since !== "number") {
            return getTimestampInternal() as Timestamp;
        }

        return (getTimestampInternal() - since) as Timestamp;
    }

    export const perfTraces: Map<ProfileData> = {};

    function getExtensionRootName(ext: ExtensionBase) {
        return ext.name.substring(0, ext.name.indexOf("[")) || ext.name;
    }

    function createTaskName(ext: ExtensionBase, task: string) {
        return `${task}|${ext.name}`;
    }

    export function startProfile(key: string, bucket?: string) {
        perfTraces[key] = {
            task: key,
            start: getTimestampMs(),
            length: undefined,
            globalBucket: bucket
        };
    }

    export function completeProfile(key: string) {
        Debug.assert(!!perfTraces[key], "Completed profile did not have a corresponding start.");
        perfTraces[key].length = getTimestampMs(perfTraces[key].start);
    }

    export function startExtensionProfile(level: ProfileLevel, ext: ExtensionBase, task: string, trace?: (s: string) => void) {
        if (!level) return;
        if (level >= ProfileLevel.Full) profileTrace(trace, Diagnostics.PROFILE_Colon_Extension_0_begin_1, ext.name, task);
        const longTask = createTaskName(ext, task);
        startProfile(longTask, getExtensionRootName(ext));
    }

    export function completeExtensionProfile(level: ProfileLevel, ext: ExtensionBase, task: string, trace?: (s: string) => void) {
        if (!level) return;
        const longTask = createTaskName(ext, task);
        completeProfile(longTask);

        if (level >= ProfileLevel.Full) profileTrace(trace, Diagnostics.PROFILE_Colon_Extension_0_end_1_2_ms, ext.name, task, perfTraces[longTask].length.toPrecision(5));
    }

    export function createExtensionCache(options: CompilerOptions, host: ExtensionHost, resolvedExtensionNames?: Map<string>): ExtensionCache {

        const diagnostics: Diagnostic[] = [];
        const extOptions = options.extensions;
        const extensionNames = (extOptions instanceof Array) ? extOptions : getKeys(extOptions);
        // Eagerly evaluate extension paths, but lazily execute their contents
        resolvedExtensionNames = resolvedExtensionNames || resolveExtensionNames();
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

        function trace(message: DiagnosticMessage, ...args: any[]) {
            profileTrace(host.trace, message, ...args);
        }

        function resolveExtensionNames(): Map<string> {
            const currentDirectory = host.getCurrentDirectory ? host.getCurrentDirectory() : "";
            const extMap: Map<string> = {};
            forEach(extensionNames, name => {
                const resolved = resolveModuleName(name, combinePaths(currentDirectory, "tsconfig.json"), options, host, /*loadJs*/true).resolvedModule;
                if (resolved) {
                    extMap[name] = resolved.resolvedFileName;
                }
            });
            return extMap;
        }

        function collectCompilerExtensions(): ExtensionCollectionMap {
            const profileLevel = options.profileExtensions;
            const extensionLoadResults = map(extensionNames, (name) => {
                const resolved = resolvedExtensionNames[name];
                let result: any;
                let error: any;
                if (!resolved) {
                    error = new Error(`Host could not locate extension '${name}'.`);
                }
                if (resolved && host.loadExtension) {
                    try {
                        if (profileLevel) {
                            startProfile(name, name);
                            if (profileLevel >= ProfileLevel.Full) trace(Diagnostics.PROFILE_Colon_Extension_0_begin_1, name, "load");
                        }
                        result = host.loadExtension(resolved);
                        if (profileLevel) {
                            completeProfile(name);
                            if (profileLevel >= ProfileLevel.Full) trace(Diagnostics.PROFILE_Colon_Extension_0_end_1_2_ms, name, "load", perfTraces[name].length.toPrecision(5));
                        }
                    }
                    catch (e) {
                        error = e;
                    }
                }
                else if (!host.loadExtension) {
                    error = new Error("Extension loading not implemented in host!");
                }
                if (error) {
                    diagnostics.push(createCompilerDiagnostic(Diagnostics.Extension_loading_failed_with_error_0, error));
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
                                kind: annotatedKind,
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