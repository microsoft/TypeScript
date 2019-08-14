/*@internal*/
namespace ts {
    type MatchingKeys<T, TMatch, K extends keyof T = keyof T> = K extends (T[K] extends TMatch ? K : never) ? K : never;
    type Hook = MatchingKeys<Required<CompilerPluginModule>, (context: CompilerPluginContext, ...args: any[]) => CompilerPluginResult | void>;
    type HookFunction<K extends Hook> = NonNullable<CompilerPluginModule[K]>;
    type HookReturnType<K extends Hook> = Exclude<ReturnType<HookFunction<K>>, void>;

    type ExecuteUserCodeResult<T> =
        | { error: Diagnostic, result: undefined }
        | { error: undefined, result: T | undefined };

    interface PluginEntry {
        state: "inactive" | "active" | "failed"; // Tracks whether the plugin has been activated.
        compilerPlugin: CompilerPlugin;
    }

    /*@internal*/
    export interface GetPluginsResult {
        plugins: CompilerPlugin[];
        diagnostics?: Diagnostic[];
    }

    interface PackageJson {
        typescriptPlugin?: PluginPackageSettings;
    }

    interface PluginPackageSettings {
        activationEvents?: string[];
        pluginDependencies?: string[];
    }

    /**
     * Resolves the supplied plugins (and their dependencies) relative to an initial directory.
     */
    /*@internal*/
    export function getPlugins(host: ModuleLoaderHost, initialDir: string, plugins: ReadonlyArray<string | [string, any?]>) {
        interface ResolvedModule {
            module: {};
            moduleName: string;
            modulePath: string | undefined;
            packageJsonPath?: string;
        }

        const compilerPlugins: CompilerPlugin[] = [];
        const compilerPluginMap = createMap<CompilerPlugin>();
        const diagnostics: Diagnostic[] = [];
        for (const plugin of plugins) {
            processPlugin(initialDir, plugin);
        }

        return { plugins: compilerPlugins, diagnostics };

        function processPlugin(initialDir: string, plugin: string | [string, any?]) {
            const originalName = isArray(plugin) ? plugin[0] : <string>plugin;
            const options = isArray(plugin) && plugin.length > 0 ? plugin[1] : undefined;

            let candidates: string[];
            if (isExternalModuleNameRelative(originalName) || isTypeScriptPlugin(originalName)) {
                candidates = [originalName];
            }
            else {
                candidates = [addTypeScriptPluginPrefix(originalName), originalName];
            }

            let compilerPlugin: CompilerPlugin | undefined;
            for (const candidate of candidates) {
                compilerPlugin = compilerPluginMap.get(candidate);
                if (compilerPlugin) {
                    if (!isNullOrUndefined(options) && compilerPlugin.options === undefined) {
                        compilerPlugin.options = options;
                    }
                    return;
                }
            }

            let resolvedModule: ResolvedModule | undefined;
            let firstError: { stack?: string, message?: string } | undefined;
            for (const candidate of candidates) {
                const result = host.require(initialDir, candidate);
                if (result.module) {
                    resolvedModule = {
                        module: result.module,
                        moduleName: candidate,
                        modulePath: result.modulePath,
                        packageJsonPath: !isExternalModuleNameRelative(candidate) && result.modulePath
                            ? findPackageJsonPath(host, result.modulePath)
                            : undefined
                    };
                    break;
                }
                if (!firstError) firstError = result.error;
            }

            if (!resolvedModule) {
                const error = Debug.assertDefined(firstError);
                reportError(Diagnostics.Plugin_0_could_not_be_found_Colon_1, originalName, error.message);
                return;
            }

            const packageJson = resolvedModule.packageJsonPath
                ? readJson(resolvedModule.packageJsonPath, host) as PackageJson
                : undefined;

            let activationEvents: string[] | undefined;
            let pluginDependencies: string[] | undefined;
            if (!isNullOrUndefined(packageJson) && typeof packageJson === "object") {
                if (hasProperty(packageJson, "typescriptPlugin") && !isNullOrUndefined(packageJson.typescriptPlugin)) {
                    const typescriptPlugin = packageJson.typescriptPlugin;
                    if (typeof typescriptPlugin === "object") {
                        if (hasProperty(typescriptPlugin, "activationEvents") && !isNullOrUndefined(typescriptPlugin.activationEvents)) {
                            if (isArray(typescriptPlugin.activationEvents)) {
                                for (const event of typescriptPlugin.activationEvents) {
                                    if (typeof event !== "string") {
                                        reportError(Diagnostics.package_json_field_0_requires_a_value_of_type_1, "typescriptPlugin.activationEvents[]", "string");
                                    }
                                    else {
                                        activationEvents = append(activationEvents, event);
                                    }
                                }
                            }
                            else {
                                reportError(Diagnostics.package_json_field_0_requires_a_value_of_type_1, "typescriptPlugin.activationEvents", "Array");
                            }
                        }
                        if (hasProperty(typescriptPlugin, "pluginDependencies") && !isNullOrUndefined(typescriptPlugin.pluginDependencies)) {
                            if (isArray(typescriptPlugin.pluginDependencies)) {
                                for (const dependency of typescriptPlugin.pluginDependencies) {
                                    if (typeof dependency !== "string") {
                                        reportError(Diagnostics.package_json_field_0_requires_a_value_of_type_1, "typescriptPlugin.pluginDependencies[]", "string");
                                    }
                                    else {
                                        pluginDependencies = append(pluginDependencies, dependency);
                                    }
                                }
                            }
                            else {
                                reportError(Diagnostics.package_json_field_0_requires_a_value_of_type_1, "typescriptPlugin.pluginDependencies", "Array");
                            }
                        }
                    }
                    else {
                        reportError(Diagnostics.package_json_field_0_requires_a_value_of_type_1, "typescriptPlugin", "object");
                    }
                }
            }

            compilerPlugin = {
                originalName,
                name: resolvedModule.moduleName,
                path: resolvedModule.modulePath,
                plugin: resolvedModule.module,
                pluginDependencies,
                activationEvents,
                options
            };

            compilerPluginMap.set(compilerPlugin.name, compilerPlugin);
            if (compilerPlugin.pluginDependencies) {
                if (compilerPlugin.path) {
                    const initialDir = getDirectoryPath(compilerPlugin.path);
                    for (const plugin of compilerPlugin.pluginDependencies) {
                        processPlugin(initialDir, plugin);
                    }
                }
                else {
                    reportError(Diagnostics.Plugin_dependencies_for_0_could_not_resolved, compilerPlugin.name);
                }
            }
            compilerPlugins.push(compilerPlugin);
        }

        function reportError(message: DiagnosticMessage, arg0?: string, arg1?: string) {
            diagnostics.push(createCompilerDiagnostic(message, arg0, arg1));
        }
    }

    function findPackageJsonPath(host: ModuleResolutionHost, modulePath: string) {
        while (true) {
            const candidate = combinePaths(modulePath, "package.json");
            if (host.fileExists(candidate)) {
                return candidate;
            }
            const parentPath = getDirectoryPath(modulePath);
            if (modulePath === parentPath || !parentPath) {
                return undefined;
            }
            modulePath = parentPath;
        }
    }

    function isTypeScriptPlugin(moduleName: string) {
        return /^(?:@[^\\/]+[\\/])?typescript-plugin-\w/.test(moduleName);
    }

    function addTypeScriptPluginPrefix(moduleName: string) {
        // a module name like 'foo', 'foo/bar', or '@foo/bar`
        return moduleName.replace(/^(@[^\\/]+[\\/])?/, "$1typescript-plugin-");
    }

    /**
     * Gets a wrapped view of a Program for use with a plugin.
     */
    function getOrCreatePluginProgram(program: Program) {
        if (program.pluginProgram) {
            return program.pluginProgram;
        }

        let disposed = false;
        program.pluginProgram = {
            getCompilerOptions: () => (checkDisposed(), program.getCompilerOptions()),
            getSourceFile: fileName => (checkDisposed(), program.getSourceFile(fileName)),
            getSourceFileByPath: path => (checkDisposed(), program.getSourceFileByPath(path)),
            getCurrentDirectory: () => (checkDisposed(), program.getCurrentDirectory()),
            getRootFileNames: () => (checkDisposed(), program.getRootFileNames()),
            getSourceFiles: () => (checkDisposed(), program.getSourceFiles()),
            emit: (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) => (checkDisposed(), program.emit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers)),
            getOptionsDiagnostics: cancellationToken => (checkDisposed(), program.getOptionsDiagnostics(cancellationToken)),
            getGlobalDiagnostics: cancellationToken => (checkDisposed(), program.getGlobalDiagnostics(cancellationToken)),
            getSyntacticDiagnostics: (sourceFile, cancellationToken) => (checkDisposed(), program.getSyntacticDiagnostics(sourceFile, cancellationToken)),
            getSemanticDiagnostics: (sourceFile, cancellationToken) => (checkDisposed(), program.getSemanticDiagnostics(sourceFile, cancellationToken)),
            getDeclarationDiagnostics: (sourceFile, cancellationToken) => (checkDisposed(), program.getDeclarationDiagnostics(sourceFile, cancellationToken)),
            getConfigFileParsingDiagnostics: () => (checkDisposed(), program.getConfigFileParsingDiagnostics()),
            getTypeChecker: () => (checkDisposed(), program.getTypeChecker()),
            isSourceFileFromExternalLibrary: file => (checkDisposed(), program.isSourceFileFromExternalLibrary(file)),
            isSourceFileDefaultLibrary: file => (checkDisposed(), program.isSourceFileDefaultLibrary(file)),
            getProjectReferences: () => (checkDisposed(), program.getProjectReferences()),
            getResolvedProjectReferences: () => (checkDisposed(), program.getResolvedProjectReferences()),
            pluginDispose: () => { disposed = true },
            // internal members are not exposed.
            getMissingFilePaths: notImplemented,
            getSuggestionDiagnostics: notImplemented,
            getCommonSourceDirectory: notImplemented,
            getDiagnosticsProducingTypeChecker: notImplemented,
            dropDiagnosticsProducingTypeChecker: notImplemented,
            getClassifiableNames: notImplemented,
            getNodeCount: notImplemented,
            getIdentifierCount: notImplemented,
            getSymbolCount: notImplemented,
            getTypeCount: notImplemented,
            getFileProcessingDiagnostics: notImplemented,
            getResolvedTypeReferenceDirectives: notImplemented,
            getSourceFileFromReference: notImplemented,
            getLibFileFromReference: notImplemented,
            sourceFileToPackageName: undefined!,
            redirectTargetsMap: undefined!,
            isEmittedFile: notImplemented,
            getResolvedModuleWithFailedLookupLocationsFromCache: notImplemented,
            getProjectReferenceRedirect: notImplemented,
            getResolvedProjectReferenceToRedirect: notImplemented,
            forEachResolvedProjectReference: notImplemented,
            getResolvedProjectReferenceByPath: notImplemented,
            getRefFileMap: notImplemented,
            emitBuildInfo: notImplemented,
            getRelationCacheSizes: notImplemented,
            dispose: notImplemented,
        };
        program.pluginProgram.pluginProgram = program.pluginProgram;
        return program.pluginProgram;

        function checkDisposed() {
            if (disposed) throw new TypeError("Object is disposed.");
            disposed = true;
            program = undefined!;
        }
    }

    /**
     * Creates a `CompilerPluginHost` used to manage plugin lifetime.
     */
    export function createPluginHost(plugins: ReadonlyArray<CompilerPlugin>, compilerOptions: CompilerOptions): CompilerPluginHost {
        const entries: PluginEntry[] = plugins.map(compilerPlugin => ({ compilerPlugin, state: "inactive" }));

        return {
            preParse,
            preEmit,
            deactivate
        };

        function selectPlugins({ eventName, state }: { eventName?: Hook, state?: "inactive" | "active" | "failed" }) {
            const result: PluginEntry[] = [];
            for (const entry of entries) {
                if (state !== undefined && entry.state !== state) continue;
                if (eventName !== undefined && !contains(entry.compilerPlugin.activationEvents, eventName)) continue;
                result.push(entry);
            }
            return result;
        }

        function executeUserCode<K extends Hook>(plugin: PluginEntry, hook: K, ...args: Parameters<HookFunction<K>>): ExecuteUserCodeResult<HookReturnType<K>> {
            const hookAction = plugin.compilerPlugin.plugin[hook];
            if (typeof hookAction === "function") {
                try {
                    const result: HookReturnType<K> | undefined = hookAction.apply(plugin.compilerPlugin.plugin, args);
                    return { error: undefined, result };
                }
                catch (error) {
                    if (error instanceof OperationCanceledException) {
                        throw error;
                    }
                    plugin.state = "failed";
                    return { error: createUserCodeDiagnostic(plugin.compilerPlugin, hook, error), result: undefined };
                }
            }
            return { error: undefined, result: undefined };
        }

        function createContext(compilerHost: CompilerHost, { compilerPlugin: { options } }: PluginEntry): CompilerPluginContext {
            return { ts, compilerHost, compilerOptions, options };
        }

        function createUserCodeDiagnostic(compilerPlugin: CompilerPlugin, hook: Hook, error: { message?: string, stack?: string }) {
            return createCompilerDiagnostic(Diagnostics.Plugin_0_failed_while_executing_the_1_hook_Colon_2, compilerPlugin.name, hook, error.stack || error.message || error.toString());
        }

        function activate(host: CompilerHost, eventName: Hook): ReadonlyArray<Diagnostic> | undefined {
            let diagnostics: ReadonlyArray<Diagnostic> | undefined;
            for (const plugin of selectPlugins({ eventName, state: "inactive" })) {
                const { error, result } = executeUserCode(plugin, "activate", createContext(host, plugin), { });
                if (error) {
                    // TODO(rbuckton): Determine better mechanism to handle plugin activation failure.
                    diagnostics = concatenate(diagnostics, [error]);
                }
                else {
                    plugin.state = "active";
                    if (result) diagnostics = concatenate(diagnostics, result.diagnostics);
                }
            }
            return diagnostics;
        }

        function preParse(host: CompilerHost, { rootNames, projectReferences }: CompilerPluginPreParseArgs): CompilerPluginPreParseResult {
            let diagnostics = activate(host, "preParse");
            for (const plugin of selectPlugins({ eventName: "preParse", state: "active" })) {
                const { error, result } = executeUserCode(plugin, "preParse", createContext(host, plugin), { rootNames, projectReferences });
                if (error) {
                    diagnostics = concatenate(diagnostics, [error]);
                }
                else if (result) {
                    diagnostics = concatenate(diagnostics, result.diagnostics);
                    host = result.compilerHost || host;
                    rootNames = result.rootNames || rootNames;
                    projectReferences = result.projectReferences || projectReferences;
                }
            }
            return { compilerHost: host, rootNames, projectReferences };
        }

        function preEmit(host: CompilerHost, { program, targetSourceFile, cancellationToken }: CompilerPluginPreEmitArgs): CompilerPluginPreEmitResult {
            program = getOrCreatePluginProgram(program);
            let diagnostics = activate(host, "preEmit");
            let customTransformers: CustomTransformers | undefined;
            for (const plugin of selectPlugins({ eventName: "preEmit", state: "active" })) {
                const { error, result } = executeUserCode(plugin, "preEmit", createContext(host, plugin), { program, targetSourceFile, cancellationToken });
                if (error) {
                    diagnostics = concatenate(diagnostics, [error]);
                }
                else if (result) {
                    diagnostics = concatenate(diagnostics, result.diagnostics);
                    customTransformers = combineCustomTransformers(customTransformers, result.customTransformers);
                }
            }
            return { diagnostics, customTransformers };
        }

        function deactivate(host: CompilerHost): CompilerPluginDeactivationResult {
            let diagnostics: ReadonlyArray<Diagnostic> | undefined;
            for (const plugin of selectPlugins({ state: "active" })) {
                const { error } = executeUserCode(plugin, "deactivate", createContext(host, plugin));
                if (error) {
                    diagnostics = concatenate(diagnostics, [error]);
                }
                else {
                    plugin.state = "inactive";
                }
            }
            return { diagnostics };
        }
    }
}