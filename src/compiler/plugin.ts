namespace ts {
    type Hook = "activate" | "deactivate" | "preEmit";
    type HookFunction<K extends Hook> = NonNullable<CompilerPluginModule[K]>;

    type ExecuteUserCodeResult<T> =
        | { error: Diagnostic, result: undefined }
        | { error: undefined, result: T | undefined };

    interface PluginEntry {
        active: boolean; // Tracks whether the plugin has been activated.
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
        debugger;
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
     * Creates a `CompilerPluginHost` used to manage plugin lifetime.
     */
    /*@internal*/
    export function createPluginHost(plugins: ReadonlyArray<CompilerPlugin>): CompilerPluginHost {
        const entries: PluginEntry[] = plugins.map(compilerPlugin => ({ compilerPlugin, active: false }));
        return {
            preEmit,
            deactivate
        };

        function executeUserCode<K extends Hook>(compilerPlugin: CompilerPlugin, hook: K, ...args: Parameters<HookFunction<K>>): ExecuteUserCodeResult<ReturnType<HookFunction<K>>> {
            const hookFunction: HookFunction<K> | undefined = compilerPlugin.plugin[hook]!;
            if (typeof hookFunction === "function") {
                try {
                    const result = hookFunction.apply(compilerPlugin.plugin, args);
                    return { result, error: undefined };
                }
                catch (error) {
                    if (error instanceof OperationCanceledException) {
                        throw error;
                    }
                    return { result: undefined, error: createUserCodeDiagnostic(compilerPlugin, hook, error) };
                }
            }
            return { result: undefined, error: undefined };
        }

        function createContext(compilerHost: CompilerHost, { options }: CompilerPlugin): CompilerPluginContext {
            return { ts, compilerHost, options };
        }

        function createUserCodeDiagnostic(compilerPlugin: CompilerPlugin, hook: Hook, error: { message?: string, stack?: string }) {
            return createCompilerDiagnostic(Diagnostics.Plugin_0_failed_while_executing_the_1_hook_Colon_2, compilerPlugin.name, hook, error.stack || error.message || error.toString());
        }

        function activate(host: CompilerHost, activationEventName: string) {
            const activeCompilerPlugins: CompilerPlugin[] = [];
            let diagnostics: ReadonlyArray<Diagnostic> | undefined;
            for (const entry of entries) {
                if (!entry.active && contains(entry.compilerPlugin.activationEvents, activationEventName)) {
                    const { error, result: activationResult } = executeUserCode(entry.compilerPlugin, "activate", createContext(host, entry.compilerPlugin));
                    if (error) {
                        diagnostics = concatenate(diagnostics, [error]);
                    }
                    else {
                        if (activationResult) diagnostics = concatenate(diagnostics, activationResult.diagnostics);
                        entry.active = true;
                    }
                }
                if (entry.active) {
                    activeCompilerPlugins.push(entry.compilerPlugin);
                }
            }
            return { activeCompilerPlugins, diagnostics };
        }

        function preEmit(host: CompilerHost, program: Program, targetSourceFile?: SourceFile, cancellationToken?: CancellationToken): CompilerPluginPreEmitResult {
            debugger;
            const activationResult = activate(host, /*activationEventName*/ "preEmit");
            const activeCompilerPlugins = activationResult.activeCompilerPlugins;
            let diagnostics = activationResult.diagnostics;
            let customTransformers: CustomTransformers | undefined;
            for (const plugin of activeCompilerPlugins) {
                const { error, result: preEmitResult } = executeUserCode(plugin, "preEmit", createContext(host, plugin), program, targetSourceFile, cancellationToken);
                if (error) {
                    diagnostics = concatenate(diagnostics, [error]);
                }
                else if (preEmitResult) {
                    diagnostics = concatenate(diagnostics, preEmitResult.diagnostics);
                    customTransformers = combineCustomTransformers(customTransformers, preEmitResult.customTransformers);
                }
            }
            return { diagnostics, customTransformers };
        }

        function deactivate(host: CompilerHost): CompilerPluginDeactivationResult {
            debugger;
            let diagnostics: Diagnostic[] | undefined;
            for (const entry of entries) {
                if (entry.active) {
                    entry.active = false;
                    const { error } = executeUserCode(entry.compilerPlugin, "deactivate", createContext(host, entry.compilerPlugin));
                    if (error) {
                        diagnostics = append(diagnostics, error);
                    }
                }
            }
            return { diagnostics };
        }
    }
}