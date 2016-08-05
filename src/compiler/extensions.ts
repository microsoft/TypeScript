namespace ts {

    export interface BaseProviderStatic {
        readonly ["extension-kind"]: ExtensionKind;
    }

    export interface CodegenProviderStatic extends BaseProviderStatic {
        readonly ["extension-kind"]: "codegen";
        new (context: {
            ts: typeof ts,
            args: any,
            getCommonSourceDirectory: () => string,
            getCurrentDirectory: () => string,
            /**
             * NOTE: These compiler options have not yet been verified, so may produce diagnostic messages
             */
            getCompilerOptions: () => CompilerOptions,
            /**
             * addSourceFile causes the file to be added to the program,
             * resulting in processRootFile to be called on the provided SourceFile
             */
            addSourceFile: (file: SourceFile) => void
        }): CodegenProvider
    }

    export interface CodegenProvider {
        /**
         * Called each time a file is added to the filesByName set in a program
         *  - should trigger when a generated file is added, this way your
         *    generated code can cause code to generate
         */
        sourceFileFound?(file: SourceFile): void;
        /**
         * Called when all processing is complete and the program is about to be returned,
         * giving you the opportunity to finalize your emitted set of generated files
         */
        processingComplete?(program: Program): void; 
    }

    export namespace ExtensionKind {
        export type Codegen = "codegen";
        export const Codegen: "codegen" = "codegen";
    }
    export type ExtensionKind = ExtensionKind.Codegen;

    export interface ExtensionCollectionMap {
        "codegen"?: CodegenExtension[];
        [index: string]: Extension[] | undefined;
    }

    export interface ExtensionBase {
        name: string;
        args: any;
        kind: ExtensionKind;
    }

    export interface ProfileData {
        globalBucket: string;
        task: string;
        start: number;
        length?: number;
    }

    export interface CodegenExtension extends ExtensionBase {
        kind: ExtensionKind.Codegen;
        ctor: CodegenProviderStatic;
    }

    export type Extension = CodegenExtension;

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

        /**
         * Gets only diagnostics reported while loading extensions
         */
        getExtensionLoadingDiagnostics(): Diagnostic[];
    }

    /* @internal */
    export interface TypeCheckerHost {
        getCompilerExtensions(): ExtensionCollectionMap;
    }

    export const perfTraces: Map<ProfileData> = {};

    function getExtensionRootName(qualifiedName: string) {
        return qualifiedName.substring(0, qualifiedName.indexOf("[")) || qualifiedName;
    }

    function createTaskName(qualifiedName: string, task: string) {
        return `${task}|${qualifiedName}`;
    }

    export function startProfile(enabled: boolean, key: string, bucket?: string) {
        if (!enabled) return;
        performance.emit(`start|${key}`);
        perfTraces[key] = {
            task: key,
            start: performance.mark(),
            length: undefined,
            globalBucket: bucket
        };
    }

    export function completeProfile(enabled: boolean, key: string) {
        if (!enabled) return;
        Debug.assert(!!perfTraces[key], "Completed profile did not have a corresponding start.");
        perfTraces[key].length = performance.measure(perfTraces[key].globalBucket, perfTraces[key].start);
        performance.emit(`end|${key}`);
    }

    export function startExtensionProfile(enabled: boolean, qualifiedName: string, task: string) {
        if (!enabled) return;
        const longTask = createTaskName(qualifiedName, task);
        startProfile(/*enabled*/true, longTask, getExtensionRootName(qualifiedName));
    }

    export function completeExtensionProfile(enabled: boolean, qualifiedName: string, task: string) {
        if (!enabled) return;
        const longTask = createTaskName(qualifiedName, task);
        completeProfile(/*enabled*/true, longTask);
    }

    function verifyType(thing: any, type: string, diagnostics: Diagnostic[], extName: string, extMember: string, extKind: ExtensionKind) {
        if (typeof thing !== type) {
            diagnostics.push(createCompilerDiagnostic(
                Diagnostics.Extension_0_exported_member_1_has_extension_kind_2_but_was_type_3_when_type_4_was_expected,
                extName,
                extMember,
                extKind,
                typeof thing,
                type
            ));
            return false;
        }
        return true;
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
            const profilingEnabled = options.extendedDiagnostics;
            const extensionLoadResults = map(extensionNames, (name) => {
                const resolved = resolvedExtensionNames[name];
                let result: any;
                let error: any;
                if (!resolved) {
                    error = new Error(`Host could not locate extension '${name}'.`);
                }
                if (resolved && host.loadExtension) {
                    try {
                        startProfile(profilingEnabled, name, name);
                        result = host.loadExtension(resolved);
                        completeProfile(profilingEnabled, name);
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
                if (!res.result) {
                    return [];
                }
                const aggregate: Extension[] = [];
                forEachKey(res.result, key => {
                    const potentialExtension = res.result[key];
                    if (!potentialExtension) {
                        return; // Avoid errors on explicitly exported null/undefined (why would someone do that, though?)
                    }
                    const annotatedKind = potentialExtension["extension-kind"];
                    if (typeof annotatedKind !== "string") {
                        return;
                    }
                    const ext: ExtensionBase = {
                        name: key !== "default" ? `${res.name}[${key}]` : res.name,
                        args: extensionNames === extOptions ? undefined : (extOptions as Map<any>)[res.name],
                        kind: annotatedKind as ExtensionKind,
                    };
                    switch (ext.kind) {
                        case ExtensionKind.Codegen: {
                            const verified = verifyType(potentialExtension, "function", diagnostics, res.name, key, annotatedKind);
                            if (!verified) return aggregate;
                            (ext as CodegenExtension).ctor = potentialExtension as CodegenProviderStatic;
                            break;
                        }
                        default:
                            // Include a default case which just puts the extension unchecked onto the base extension
                            // This can allow language service extensions to query for custom extension kinds
                            (ext as any).__extension = potentialExtension;
                            break;
                    }
                    aggregate.push(ext as Extension);
                });
                return aggregate;
            });
            return groupBy(flatten(preparedExtensionObjects), elem => elem.kind) || {};
        }
    }
}