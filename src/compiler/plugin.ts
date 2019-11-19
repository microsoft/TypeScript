/*@internal*/
namespace ts {
    type TryExcludeVoid<T> = [T] extends [void] ? void : Exclude<T, void>;
    type Replace<T, Match, Replace> = T extends Match ? Replace : T;
    type Promised<T> = T extends PromiseLike<infer U> ? U : T;
    type Hook = MatchingKeys<Required<CompilerPluginModule>, (context: CompilerPluginContext, ...args: any[]) => PromiseLike<CompilerPluginResult | void> | CompilerPluginResult | void>;
    type HookFunction<K extends Hook> = Required<CompilerPluginModule>[K];
    type HookParameters<K extends Hook> = HookFunction<K> extends (context: CompilerPluginContext, ...args: infer P) => any ? Readonly<P> : never;
    type HookReturnTypes = { [K in Hook]: TryExcludeVoid<Promised<ReturnType<HookFunction<K>>>> };
    type HookReturnType<K extends Hook> = HookReturnTypes[K];
    type HostHook = Exclude<Hook, "activate" | "deactivate">;
    type HostHookReturnType<K extends Hook> = Replace<HookReturnType<K>, void, CompilerPluginResult>;
    type HostHookAggregate<K extends HostHook> = (state: HostHookReturnType<K>, userCodeResult: HookReturnType<K>, args: ArgumentsHolder<K>, compilerPlugin: CompilerPlugin, hook: HostHook) => HostHookReturnType<K>;

    interface ArgumentsHolder<K extends Hook> {
        arguments: HookParameters<K>;
    }

    type ExecuteUserCodeResult<T> =
        | { error: Diagnostic, result: undefined }
        | { error: undefined, result: T | undefined };

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
    export function getPlugins(host: ModuleLoaderHost, initialDir: string, plugins: ReadonlyArray<string | [string, any?]>): GetPluginsResult {
        interface ResolvedModule {
            getModule(): RequireResult;
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
                try {
                    const modulePath = resolveJSModule(candidate, initialDir, host);
                    resolvedModule = {
                        getModule: () => host.require(initialDir, modulePath),
                        moduleName: candidate,
                        modulePath,
                        packageJsonPath: !isExternalModuleNameRelative(candidate) && modulePath
                            ? findPackageJsonPath(host, modulePath)
                            : undefined
                    };
                    break;
                }
                catch (e) {
                    if (!firstError) {
                        firstError = e;
                    }
                }
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
                loadPlugin: resolvedModule.getModule,
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

    export function registerPluginApiModules(host: ModuleLoaderHost) {
        host.registerModule(createPluginApiModuleFactory());
    }

    function createPluginApiModuleFactory(): ModuleFactory {
        return {
            id: ["typescript"],
            load: () => ts
        };
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
    export function createPluginHost(compilerPlugins: ReadonlyArray<CompilerPlugin>, compilerHost: CompilerHost, compilerOptions: CompilerOptions): CompilerPluginHost {
    /**
     * Wrap a user-defined `TransformerFactory` so that we can catch errors during transformation and measure execution time.
     */
    interface Plugin {
            state: "unloaded" | "inactive" | "active" | "active-failed" | "failed"; // Tracks whether the plugin has been activated.
            compilerPlugin: CompilerPlugin;
            context: CompilerPluginContext;
            timer: performance.Timer;
            module?: CompilerPluginModule;
        }

        const plugins: Plugin[] = compilerPlugins.map(compilerPlugin => ({
            compilerPlugin,
            state: "unloaded",
            context: createContext(compilerPlugin),
            timer: performance.createTimer(`userCode:${compilerPlugin.name}`)
        }));

        return {
            deactivate,
            preParse: (...args) => executeHostHook("preParse", args, (state, result, argsHolder, compilerPlugin) => {
                state.diagnostics = concatenate(state.diagnostics, result.diagnostics);
                state.rootNames = result.rootNames || state.rootNames;
                state.projectReferences = result.projectReferences || state.projectReferences;
                state.preprocessors = concatenate(state.preprocessors, map(result.preprocessors, preprocessor => wrapTransformerFactory(preprocessor, compilerPlugin, "preParse")));
                const previousArgs = argsHolder.arguments[0];
                if (state.projectReferences !== previousArgs.projectReferences ||
                    state.rootNames !== previousArgs.rootNames) {
                    argsHolder.arguments = [{
                        projectReferences: state.projectReferences || previousArgs.projectReferences,
                        rootNames: state.rootNames || previousArgs.rootNames
                    }];
                }
                return state;
            }, {}),
            preEmit: (...args) => executeHostHook("preEmit", args, (state, result, _, compilerPlugin) => {
                state.diagnostics = concatenate(state.diagnostics, result.diagnostics);
                state.customTransformers = combineCustomTransformers(state.customTransformers, result.customTransformers && wrapCustomTransformers(result.customTransformers, compilerPlugin, "preEmit"));
                return state;
            }, {})
        };

        /**
         * Gets the module object of a loaded compiler plugin.
         */
        function getModule(plugin: Plugin) {
            Debug.assert(plugin.state !== "unloaded" && plugin.module !== undefined, "Cannot execute a plugin hook on an unloaded plugin.");
            return plugin.module!;
        }

        /**
         * Gets the plugin hook function for a plugin module.
         */
        function getHook<K extends Hook>(pluginModule: CompilerPluginModule, hook: K): CompilerPluginModule[K] {
            const hookAction = pluginModule[hook];
            return typeof hookAction === "function" ? hookAction : undefined;
        }

        /**
         * Selects plugins matching the provided activation event and plugin activation state.
         */
        function selectPlugins({ eventName, state }: { eventName?: Hook, state?: Plugin["state"] }) {
            const result: Plugin[] = [];
            for (const entry of plugins) {
                if (state !== undefined && entry.state !== state) continue;
                if (eventName !== undefined && !contains(entry.compilerPlugin.activationEvents, eventName)) continue;
                result.push(entry);
            }
            return result;
        }

        /**
         * Loads any unloaded plugins for the provided activation event.
         */
        function load(eventName: Hook): ReadonlyArray<Diagnostic> | undefined {
            let diagnostics: readonly Diagnostic[] | undefined;
            for (const plugin of selectPlugins({ eventName, state: "unloaded" })) {
                const result = plugin.compilerPlugin.loadPlugin();
                if (result.error) {
                    // The plugin failed to load. Mark the plugin as failed to prevent any attempt to load it again in this Program.
                    plugin.state = "failed";
                    plugin.module = undefined;
                    diagnostics = concatenate(diagnostics, [createLoadDiagnostic(plugin.compilerPlugin, result.error)]);
                }
                else {
                    // The plugin was loaded and is currently inactive.
                    plugin.state = "inactive";
                    plugin.module = result.module;
                }
            }
            return diagnostics;
        }

        /**
         * Executes a user-defined plugin hook.
         */
        async function executeUserHook<K extends Hook>(plugin: Plugin, hook: K, ...args: HookParameters<K>): Promise<ExecuteUserCodeResult<HookReturnType<K>>> {
            Debug.assert(plugin.state !== "failed", "Cannot execute a plugin hook on a plugin that failed to load.");
            Debug.assert(plugin.state !== "active-failed" || hook === "deactivate", "Cannot execute a plugin hook on a failed plugin.");
            Debug.assert(plugin.state !== "inactive" || hook === "activate", "Cannot activate a plugin that is already active.");
            const pluginModule = getModule(plugin);
            try {
                const hookAction = getHook(pluginModule, hook);
                if (hookAction) {
                    const result: HookReturnType<K> | undefined = await hookAction.call(pluginModule, plugin.context, ...args);
                    return { error: undefined, result };
                }
            }
            catch (error) {
                if (error instanceof OperationCanceledException) {
                    throw error;
                }

                if (hook === "activate" || hook === "deactivate") {
                    // If we encounter an error while activating or deactivating a hook, set the plugin's state to
                    // indicate an unconditional failure and release our reference to the module.
                    plugin.state = "failed";
                    plugin.module = undefined;
                }
                else {
                    // For any other lifecycle hook, indicate that the plugin has failed but is still active.
                    // This will allow us to deactivate the plugin later.
                    plugin.state = "active-failed";
                }
                return { error: createUserCodeDiagnostic(plugin.compilerPlugin, hook, error), result: undefined };
            }
            return { error: undefined, result: undefined };
        }

        function createContext({ options }: CompilerPlugin): CompilerPluginContext {
            return Object.freeze({ ts, compilerHost, compilerOptions, options });
        }

        /**
         * Activates inactive plugins registered for the requested activation event.
         */
        async function activate(eventName: Hook): Promise<ReadonlyArray<Diagnostic> | undefined> {
            let diagnostics = load(eventName);
            for (const plugin of selectPlugins({ eventName, state: "inactive" })) {
                const { error, result } = await executeUserHook(plugin, "activate", { });
                if (error) {
                    // The plugin failed to activate and its state is already set to `"failed"`.
                    diagnostics = concatenate(diagnostics, [error]);
                }
                else {
                    plugin.state = "active";
                    if (result) diagnostics = concatenate(diagnostics, result.diagnostics);
                }
            }
            return diagnostics;
        }

        /**
         * Deactivates active plugins.
         */
        async function deactivate(): Promise<CompilerPluginDeactivationResult> {
            let diagnostics: ReadonlyArray<Diagnostic> | undefined;
            for (const state of ["active-failed", "active"] as const) {
                for (const plugin of selectPlugins({ state })) {
                    const { error } = await executeUserHook(plugin, "deactivate");
                    if (error) {
                        diagnostics = concatenate(diagnostics, [error]);
                    }
                    else {
                        plugin.state = state === "active-failed" ? "failed" : "inactive";
                    }
                }
            }
            return { diagnostics };
        }

        async function executeHostHook<K extends HostHook>(
            hook: K,
            args: HookParameters<K>,
            aggregate: HostHookAggregate<K>,
            state: HostHookReturnType<K>,
        ): Promise<HostHookReturnType<K>> {
            state.diagnostics = concatenate(state.diagnostics, await activate(hook));
            const argsHolder: ArgumentsHolder<K> = { arguments: args };
            for (const plugin of selectPlugins({ eventName: hook, state: "active" })) {
                const userCodeResult = await executeUserHook(plugin, hook, ...argsHolder.arguments);
                if (userCodeResult.error) {
                    state.diagnostics = concatenate(state.diagnostics, [userCodeResult.error]);
                }
                else if (userCodeResult.result) {
                    state = aggregate(state, userCodeResult.result, argsHolder, plugin.compilerPlugin, hook);
                }
            }
            return state;
        }
    }

    function formatPluginError(error: { message?: string, stack?: string }) {
        return error.stack ? Debug.filterStack(error.stack, { excludeTypeScript: true, excludeMocha: true, excludeBuiltin: true, excludeNode: true }) :
            error.message || error.toString();
    }

    function createLoadDiagnostic(compilerPlugin: CompilerPlugin, error: { message?: string, stack?: string }) {
        debugger;
        return createCompilerDiagnostic(Diagnostics.Plugin_0_could_not_be_loaded_Colon_1, compilerPlugin.name, formatPluginError(error));
    }

    function createUserCodeDiagnostic(compilerPlugin: CompilerPlugin, hook: Hook, error: { message?: string, stack?: string }) {
        debugger;
        return createCompilerDiagnostic(Diagnostics.Plugin_0_failed_while_executing_the_1_hook_Colon_2, compilerPlugin.name, hook, formatPluginError(error));
    }

    function createTransformerDiagnostic(compilerPlugin: CompilerPlugin, hook: Hook, error: { message?: string, stack?: string }) {
        debugger;
        return createCompilerDiagnostic(Diagnostics.Plugin_0_failed_while_executing_a_transformer_provided_by_the_1_hook_Colon_2, compilerPlugin.name, hook, formatPluginError(error));
    }

    /**
     * Wrap a user-defined `CustomTransformers` so that we can catch errors during transformation and measure execution time.
     */
    function wrapCustomTransformers(customTransformers: CustomTransformers, compilerPlugin: CompilerPlugin, hook: Hook): CustomTransformers {
        const result: CustomTransformers = {};
        if (customTransformers.before) {
            result.before = customTransformers.before.map(transformer => wrapTransformerFactory(transformer, compilerPlugin, hook));
        }
        if (customTransformers.after) {
            result.after = customTransformers.after.map(transformer => wrapTransformerFactory(transformer, compilerPlugin, hook));
        }
        if (customTransformers.afterDeclarations) {
            result.afterDeclarations = customTransformers.afterDeclarations.map(transformer => wrapTransformerFactory(transformer, compilerPlugin, hook));
        }
        return result;
    }

    /**
     * Wrap a user-defined `TransformerFactory` so that we can catch errors during transformation and measure execution time.
     */
    function wrapTransformerFactory<T extends Node>(factory: TransformerFactory<T>, compilerPlugin: CompilerPlugin, hook: Hook): TransformerFactory<T>;
    function wrapTransformerFactory<T extends Node>(factory: TransformerFactory<T> | CustomTransformerFactory, compilerPlugin: CompilerPlugin, hook: Hook): TransformerFactory<T> | CustomTransformerFactory;
    function wrapTransformerFactory<T extends Node>(factory: TransformerFactory<T> | CustomTransformerFactory, compilerPlugin: CompilerPlugin, hook: Hook) {
        return (context: TransformationContext): Transformer<T> | CustomTransformer => {
            try {
                const transformer = factory(context);
                return typeof transformer === "function"
                    ? wrapTransformer(transformer, context, compilerPlugin, hook)
                    : wrapCustomTransformer(transformer, context, compilerPlugin, hook);
            }
            catch (e) {
                context.addCompilerDiagnostic(createTransformerDiagnostic(compilerPlugin, hook, e));
                return identity;
            }
        };
    }

    /**
     * Wrap a user-defined `Transformer` so that we can catch errors during transformation and measure execution time.
     */
    function wrapTransformer<T extends Node>(transformer: Transformer<T>, context: TransformationContext, compilerPlugin: CompilerPlugin, hook: Hook): Transformer<T> {
        return node => {
            try {
                return transformer(node);
            }
            catch (e) {
                context.addCompilerDiagnostic(createTransformerDiagnostic(compilerPlugin, hook, e));
                return node;
            }
        };
    }

    /**
     * Wrap a user-defined `CustomTransformer` so that we can catch errors during transformation and measure execution time.
     */
    function wrapCustomTransformer(customTransformer: CustomTransformer, context: TransformationContext, compilerPlugin: CompilerPlugin, hook: Hook): CustomTransformer {
        return {
            transformBundle(node) {
                try {
                    return customTransformer.transformBundle(node);
                }
                catch (e) {
                    context.addCompilerDiagnostic(createTransformerDiagnostic(compilerPlugin, hook, e));
                    return node;
                }
            },
            transformSourceFile(node) {
                try {
                    return customTransformer.transformSourceFile(node);
                }
                catch (e) {
                    context.addCompilerDiagnostic(createTransformerDiagnostic(compilerPlugin, hook, e));
                    return node;
                }
            }
        };
    }
}