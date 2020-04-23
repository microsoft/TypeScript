/* @internal */
namespace ts {
    function getModuleTransformer(moduleKind: ModuleKind): TransformerFactory<SourceFile | Bundle> {
        switch (moduleKind) {
            case ModuleKind.ESNext:
            case ModuleKind.ES2020:
            case ModuleKind.ES2015:
                return transformECMAScriptModule;
            case ModuleKind.System:
                return transformSystemModule;
            default:
                return transformModule;
        }
    }

    const enum TransformationState {
        Uninitialized,
        Initialized,
        Completed,
        Disposed
    }

    const enum SyntaxKindFeatureFlags {
        Substitution = 1 << 0,
        EmitNotifications = 1 << 1,
    }

    export const noTransformers: EmitTransformers = { scriptTransformers: emptyArray, declarationTransformers: emptyArray };

    export function getTransformers(compilerOptions: CompilerOptions, customTransformers?: CustomTransformers, emitOnlyDtsFiles?: boolean): EmitTransformers {
        return {
            scriptTransformers: getScriptTransformers(compilerOptions, customTransformers, emitOnlyDtsFiles),
            declarationTransformers: getDeclarationTransformers(customTransformers),
        };
    }

    function getScriptTransformers(compilerOptions: CompilerOptions, customTransformers?: CustomTransformers, emitOnlyDtsFiles?: boolean) {
        if (emitOnlyDtsFiles) return emptyArray;

        const jsx = compilerOptions.jsx;
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const transformers: TransformerFactory<SourceFile | Bundle>[] = [];

        addRange(transformers, customTransformers && map(customTransformers.before, wrapScriptTransformerFactory));

        transformers.push(transformTypeScript);
        transformers.push(transformClassFields);

        if (jsx === JsxEmit.React) {
            transformers.push(transformJsx);
        }

        if (languageVersion < ScriptTarget.ESNext) {
            transformers.push(transformESNext);
        }

        if (languageVersion < ScriptTarget.ES2020) {
            transformers.push(transformES2020);
        }

        if (languageVersion < ScriptTarget.ES2019) {
            transformers.push(transformES2019);
        }

        if (languageVersion < ScriptTarget.ES2018) {
            transformers.push(transformES2018);
        }

        if (languageVersion < ScriptTarget.ES2017) {
            transformers.push(transformES2017);
        }

        if (languageVersion < ScriptTarget.ES2016) {
            transformers.push(transformES2016);
        }

        if (languageVersion < ScriptTarget.ES2015) {
            transformers.push(transformES2015);
            transformers.push(transformGenerators);
        }

        transformers.push(getModuleTransformer(moduleKind));

        // The ES5 transformer is last so that it can substitute expressions like `exports.default`
        // for ES3.
        if (languageVersion < ScriptTarget.ES5) {
            transformers.push(transformES5);
        }

        addRange(transformers, customTransformers && map(customTransformers.after, wrapScriptTransformerFactory));
        return transformers;
    }

    function getDeclarationTransformers(customTransformers?: CustomTransformers) {
        const transformers: TransformerFactory<SourceFile | Bundle>[] = [];
        transformers.push(transformDeclarations);
        addRange(transformers, customTransformers && map(customTransformers.afterDeclarations, wrapDeclarationTransformerFactory));
        return transformers;
    }

    /**
     * Wrap a custom script or declaration transformer object in a `Transformer` callback with fallback support for transforming bundles.
     */
    function wrapCustomTransformer(transformer: CustomTransformer): Transformer<Bundle | SourceFile> {
        return node => isBundle(node) ? transformer.transformBundle(node) : transformer.transformSourceFile(node);
    }

    /**
     * Wrap a transformer factory that may return a custom script or declaration transformer object.
     */
    function wrapCustomTransformerFactory<T extends SourceFile | Bundle>(transformer: TransformerFactory<T> | CustomTransformerFactory, handleDefault: (node: Transformer<T>) => Transformer<Bundle | SourceFile>): TransformerFactory<Bundle | SourceFile> {
        return context => {
            const customTransformer = transformer(context);
            return typeof customTransformer === "function"
                ? handleDefault(customTransformer)
                : wrapCustomTransformer(customTransformer);
        };
    }

    function wrapScriptTransformerFactory(transformer: TransformerFactory<SourceFile> | CustomTransformerFactory): TransformerFactory<Bundle | SourceFile> {
        return wrapCustomTransformerFactory(transformer, chainBundle);
    }

    function wrapDeclarationTransformerFactory(transformer: TransformerFactory<Bundle | SourceFile> | CustomTransformerFactory): TransformerFactory<Bundle | SourceFile> {
        return wrapCustomTransformerFactory(transformer, identity);
    }

    export function noEmitSubstitution(_hint: EmitHint, node: Node) {
        return node;
    }

    export function noEmitNotification(hint: EmitHint, node: Node, callback: (hint: EmitHint, node: Node) => void) {
        callback(hint, node);
    }

    /**
     * Transforms an array of SourceFiles by passing them through each transformer.
     *
     * @param resolver The emit resolver provided by the checker.
     * @param host The emit host object used to interact with the file system.
     * @param options Compiler options to surface in the `TransformationContext`.
     * @param nodes An array of nodes to transform.
     * @param transforms An array of `TransformerFactory` callbacks.
     * @param allowDtsFiles A value indicating whether to allow the transformation of .d.ts files.
     */
    export function transformNodes<T extends Node>(resolver: EmitResolver | undefined, host: EmitHost | undefined, options: CompilerOptions, nodes: readonly T[], transformers: readonly TransformerFactory<T>[], allowDtsFiles: boolean): TransformationResult<T> {
        const enabledSyntaxKindFeatures = new Array<SyntaxKindFeatureFlags>(SyntaxKind.Count);
        let lexicalEnvironmentVariableDeclarations: VariableDeclaration[];
        let lexicalEnvironmentFunctionDeclarations: FunctionDeclaration[];
        let lexicalEnvironmentStatements: Statement[];
        let lexicalEnvironmentFlags = LexicalEnvironmentFlags.None;
        let lexicalEnvironmentVariableDeclarationsStack: VariableDeclaration[][] = [];
        let lexicalEnvironmentFunctionDeclarationsStack: FunctionDeclaration[][] = [];
        let lexicalEnvironmentStatementsStack: Statement[][] = [];
        let lexicalEnvironmentFlagsStack: LexicalEnvironmentFlags[] = [];
        let lexicalEnvironmentStackOffset = 0;
        let lexicalEnvironmentSuspended = false;
        let emitHelpers: EmitHelper[] | undefined;
        let onSubstituteNode: TransformationContext["onSubstituteNode"] = noEmitSubstitution;
        let onEmitNode: TransformationContext["onEmitNode"] = noEmitNotification;
        let state = TransformationState.Uninitialized;
        const diagnostics: DiagnosticWithLocation[] = [];

        // The transformation context is provided to each transformer as part of transformer
        // initialization.
        const context: TransformationContext = {
            getCompilerOptions: () => options,
            getEmitResolver: () => resolver!, // TODO: GH#18217
            getEmitHost: () => host!, // TODO: GH#18217
            startLexicalEnvironment,
            suspendLexicalEnvironment,
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            setLexicalEnvironmentFlags,
            getLexicalEnvironmentFlags,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            addInitializationStatement,
            requestEmitHelper,
            readEmitHelpers,
            enableSubstitution,
            enableEmitNotification,
            isSubstitutionEnabled,
            isEmitNotificationEnabled,
            get onSubstituteNode() { return onSubstituteNode; },
            set onSubstituteNode(value) {
                Debug.assert(state < TransformationState.Initialized, "Cannot modify transformation hooks after initialization has completed.");
                Debug.assert(value !== undefined, "Value must not be 'undefined'");
                onSubstituteNode = value;
            },
            get onEmitNode() { return onEmitNode; },
            set onEmitNode(value) {
                Debug.assert(state < TransformationState.Initialized, "Cannot modify transformation hooks after initialization has completed.");
                Debug.assert(value !== undefined, "Value must not be 'undefined'");
                onEmitNode = value;
            },
            addDiagnostic(diag) {
                diagnostics.push(diag);
            }
        };

        // Ensure the parse tree is clean before applying transformations
        for (const node of nodes) {
            disposeEmitNodes(getSourceFileOfNode(getParseTreeNode(node)));
        }

        performance.mark("beforeTransform");

        // Chain together and initialize each transformer.
        const transformersWithContext = transformers.map(t => t(context));
        const transformation = (node: T): T => {
            for (const transform of transformersWithContext) {
                node = transform(node);
            }
            return node;
        };

        // prevent modification of transformation hooks.
        state = TransformationState.Initialized;

        // Transform each node.
        const transformed = map(nodes, allowDtsFiles ? transformation : transformRoot);

        // prevent modification of the lexical environment.
        state = TransformationState.Completed;

        performance.mark("afterTransform");
        performance.measure("transformTime", "beforeTransform", "afterTransform");

        return {
            transformed,
            substituteNode,
            emitNodeWithNotification,
            isEmitNotificationEnabled,
            dispose,
            diagnostics
        };

        function transformRoot(node: T) {
            return node && (!isSourceFile(node) || !node.isDeclarationFile) ? transformation(node) : node;
        }

        /**
         * Enables expression substitutions in the pretty printer for the provided SyntaxKind.
         */
        function enableSubstitution(kind: SyntaxKind) {
            Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
            enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.Substitution;
        }

        /**
         * Determines whether expression substitutions are enabled for the provided node.
         */
        function isSubstitutionEnabled(node: Node) {
            return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.Substitution) !== 0
                && (getEmitFlags(node) & EmitFlags.NoSubstitution) === 0;
        }

        /**
         * Emits a node with possible substitution.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node or its substitute.
         */
        function substituteNode(hint: EmitHint, node: Node) {
            Debug.assert(state < TransformationState.Disposed, "Cannot substitute a node after the result is disposed.");
            return node && isSubstitutionEnabled(node) && onSubstituteNode(hint, node) || node;
        }

        /**
         * Enables before/after emit notifications in the pretty printer for the provided SyntaxKind.
         */
        function enableEmitNotification(kind: SyntaxKind) {
            Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
            enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.EmitNotifications;
        }

        /**
         * Determines whether before/after emit notifications should be raised in the pretty
         * printer when it emits a node.
         */
        function isEmitNotificationEnabled(node: Node) {
            return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.EmitNotifications) !== 0
                || (getEmitFlags(node) & EmitFlags.AdviseOnEmitNode) !== 0;
        }

        /**
         * Emits a node with possible emit notification.
         *
         * @param hint A hint as to the intended usage of the node.
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node.
         */
        function emitNodeWithNotification(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) {
            Debug.assert(state < TransformationState.Disposed, "Cannot invoke TransformationResult callbacks after the result is disposed.");
            if (node) {
                // TODO: Remove check and unconditionally use onEmitNode when API is breakingly changed
                // (see https://github.com/microsoft/TypeScript/pull/36248/files/5062623f39120171b98870c71344b3242eb03d23#r369766739)
                if (isEmitNotificationEnabled(node)) {
                    onEmitNode(hint, node, emitCallback);
                }
                else {
                    emitCallback(hint, node);
                }
            }
        }

        /**
         * Records a hoisted variable declaration for the provided name within a lexical environment.
         */
        function hoistVariableDeclaration(name: Identifier): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            const decl = setEmitFlags(createVariableDeclaration(name), EmitFlags.NoNestedSourceMaps);
            if (!lexicalEnvironmentVariableDeclarations) {
                lexicalEnvironmentVariableDeclarations = [decl];
            }
            else {
                lexicalEnvironmentVariableDeclarations.push(decl);
            }
            if (lexicalEnvironmentFlags & LexicalEnvironmentFlags.InParameters) {
                lexicalEnvironmentFlags |= LexicalEnvironmentFlags.VariablesHoistedInParameters;
            }
        }

        /**
         * Records a hoisted function declaration within a lexical environment.
         */
        function hoistFunctionDeclaration(func: FunctionDeclaration): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            setEmitFlags(func, EmitFlags.CustomPrologue);
            if (!lexicalEnvironmentFunctionDeclarations) {
                lexicalEnvironmentFunctionDeclarations = [func];
            }
            else {
                lexicalEnvironmentFunctionDeclarations.push(func);
            }
        }

        /**
         * Adds an initialization statement to the top of the lexical environment.
         */
        function addInitializationStatement(node: Statement): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            setEmitFlags(node, EmitFlags.CustomPrologue);
            if (!lexicalEnvironmentStatements) {
                lexicalEnvironmentStatements = [node];
            }
            else {
                lexicalEnvironmentStatements.push(node);
            }
        }

        /**
         * Starts a new lexical environment. Any existing hoisted variable or function declarations
         * are pushed onto a stack, and the related storage variables are reset.
         */
        function startLexicalEnvironment(): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");

            // Save the current lexical environment. Rather than resizing the array we adjust the
            // stack size variable. This allows us to reuse existing array slots we've
            // already allocated between transformations to avoid allocation and GC overhead during
            // transformation.
            lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentVariableDeclarations;
            lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentFunctionDeclarations;
            lexicalEnvironmentStatementsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentStatements;
            lexicalEnvironmentFlagsStack[lexicalEnvironmentStackOffset] = lexicalEnvironmentFlags;
            lexicalEnvironmentStackOffset++;
            lexicalEnvironmentVariableDeclarations = undefined!;
            lexicalEnvironmentFunctionDeclarations = undefined!;
            lexicalEnvironmentStatements = undefined!;
            lexicalEnvironmentFlags = LexicalEnvironmentFlags.None;
        }

        /** Suspends the current lexical environment, usually after visiting a parameter list. */
        function suspendLexicalEnvironment(): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is already suspended.");
            lexicalEnvironmentSuspended = true;
        }

        /** Resumes a suspended lexical environment, usually before visiting a function body. */
        function resumeLexicalEnvironment(): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            Debug.assert(lexicalEnvironmentSuspended, "Lexical environment is not suspended.");
            lexicalEnvironmentSuspended = false;
        }

        /**
         * Ends a lexical environment. The previous set of hoisted declarations are restored and
         * any hoisted declarations added in this environment are returned.
         */
        function endLexicalEnvironment(): Statement[] | undefined {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");

            let statements: Statement[] | undefined;
            if (lexicalEnvironmentVariableDeclarations ||
                lexicalEnvironmentFunctionDeclarations ||
                lexicalEnvironmentStatements) {
                if (lexicalEnvironmentFunctionDeclarations) {
                    statements = [...lexicalEnvironmentFunctionDeclarations];
                }

                if (lexicalEnvironmentVariableDeclarations) {
                    const statement = createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(lexicalEnvironmentVariableDeclarations)
                    );

                    setEmitFlags(statement, EmitFlags.CustomPrologue);

                    if (!statements) {
                        statements = [statement];
                    }
                    else {
                        statements.push(statement);
                    }
                }

                if (lexicalEnvironmentStatements) {
                    if (!statements) {
                        statements = [...lexicalEnvironmentStatements];
                    }
                    else {
                        statements = [...statements, ...lexicalEnvironmentStatements];
                    }
                }
            }

            // Restore the previous lexical environment.
            lexicalEnvironmentStackOffset--;
            lexicalEnvironmentVariableDeclarations = lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset];
            lexicalEnvironmentFunctionDeclarations = lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset];
            lexicalEnvironmentStatements = lexicalEnvironmentStatementsStack[lexicalEnvironmentStackOffset];
            lexicalEnvironmentFlags = lexicalEnvironmentFlagsStack[lexicalEnvironmentStackOffset];
            if (lexicalEnvironmentStackOffset === 0) {
                lexicalEnvironmentVariableDeclarationsStack = [];
                lexicalEnvironmentFunctionDeclarationsStack = [];
                lexicalEnvironmentStatementsStack = [];
                lexicalEnvironmentFlagsStack = [];
            }
            return statements;
        }

        function setLexicalEnvironmentFlags(flags: LexicalEnvironmentFlags, value: boolean): void {
            lexicalEnvironmentFlags = value ?
                lexicalEnvironmentFlags | flags :
                lexicalEnvironmentFlags & ~flags;
        }

        function getLexicalEnvironmentFlags(): LexicalEnvironmentFlags {
            return lexicalEnvironmentFlags;
        }

        function requestEmitHelper(helper: EmitHelper): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the transformation context during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
            Debug.assert(!helper.scoped, "Cannot request a scoped emit helper.");
            if (helper.dependencies) {
                for (const h of helper.dependencies) {
                    requestEmitHelper(h);
                }
            }
            emitHelpers = append(emitHelpers, helper);
        }

        function readEmitHelpers(): EmitHelper[] | undefined {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the transformation context during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
            const helpers = emitHelpers;
            emitHelpers = undefined;
            return helpers;
        }

        function dispose() {
            if (state < TransformationState.Disposed) {
                // Clean up emit nodes on parse tree
                for (const node of nodes) {
                    disposeEmitNodes(getSourceFileOfNode(getParseTreeNode(node)));
                }

                // Release references to external entries for GC purposes.
                lexicalEnvironmentVariableDeclarations = undefined!;
                lexicalEnvironmentVariableDeclarationsStack = undefined!;
                lexicalEnvironmentFunctionDeclarations = undefined!;
                lexicalEnvironmentFunctionDeclarationsStack = undefined!;
                onSubstituteNode = undefined!;
                onEmitNode = undefined!;
                emitHelpers = undefined;

                // Prevent further use of the transformation result.
                state = TransformationState.Disposed;
            }
        }
    }
}
