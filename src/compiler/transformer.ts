/* @internal */
namespace ts {
    function getModuleTransformer(moduleKind: ModuleKind): TransformerFactory<SourceFile | Bundle> {
        switch (moduleKind) {
            case ModuleKind.ESNext:
            case ModuleKind.ES2015:
                return transformES2015Module;
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

    export function getTransformers(compilerOptions: CompilerOptions, customTransformers?: CustomTransformers) {
        const jsx = compilerOptions.jsx;
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const transformers: TransformerFactory<SourceFile | Bundle>[] = [];

        addRange(transformers, customTransformers && customTransformers.before);

        transformers.push(transformTypeScript);

        if (jsx === JsxEmit.React) {
            transformers.push(transformJsx);
        }

        if (languageVersion < ScriptTarget.ESNext) {
            transformers.push(transformESNext);
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

        addRange(transformers, customTransformers && customTransformers.after);

        return transformers;
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
    export function transformNodes<T extends Node>(resolver: EmitResolver, host: EmitHost, options: CompilerOptions, nodes: ReadonlyArray<T>, transformers: ReadonlyArray<TransformerFactory<T>>, allowDtsFiles: boolean): TransformationResult<T> {
        const enabledSyntaxKindFeatures = new Array<SyntaxKindFeatureFlags>(SyntaxKind.Count);
        let lexicalEnvironmentVariableDeclarations: VariableDeclaration[];
        let lexicalEnvironmentFunctionDeclarations: FunctionDeclaration[];
        let lexicalEnvironmentVariableDeclarationsStack: VariableDeclaration[][] = [];
        let lexicalEnvironmentFunctionDeclarationsStack: FunctionDeclaration[][] = [];
        let lexicalEnvironmentStackOffset = 0;
        let lexicalEnvironmentSuspended = false;
        let emitHelpers: EmitHelper[];
        let onSubstituteNode: TransformationContext["onSubstituteNode"] = (_, node) => node;
        let onEmitNode: TransformationContext["onEmitNode"] = (hint, node, callback) => callback(hint, node);
        let state = TransformationState.Uninitialized;
        const diagnostics: Diagnostic[] = [];

        // The transformation context is provided to each transformer as part of transformer
        // initialization.
        const context: TransformationContext = {
            getCompilerOptions: () => options,
            getEmitResolver: () => resolver,
            getEmitHost: () => host,
            startLexicalEnvironment,
            suspendLexicalEnvironment,
            resumeLexicalEnvironment,
            endLexicalEnvironment,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
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
        const transformation = chain(...transformers)(context);

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
        }

        /**
         * Records a hoisted function declaration within a lexical environment.
         */
        function hoistFunctionDeclaration(func: FunctionDeclaration): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            if (!lexicalEnvironmentFunctionDeclarations) {
                lexicalEnvironmentFunctionDeclarations = [func];
            }
            else {
                lexicalEnvironmentFunctionDeclarations.push(func);
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
            lexicalEnvironmentStackOffset++;
            lexicalEnvironmentVariableDeclarations = undefined;
            lexicalEnvironmentFunctionDeclarations = undefined;
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
        function endLexicalEnvironment(): Statement[] {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
            Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");

            let statements: Statement[];
            if (lexicalEnvironmentVariableDeclarations || lexicalEnvironmentFunctionDeclarations) {
                if (lexicalEnvironmentFunctionDeclarations) {
                    statements = [...lexicalEnvironmentFunctionDeclarations];
                }

                if (lexicalEnvironmentVariableDeclarations) {
                    const statement = createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(lexicalEnvironmentVariableDeclarations)
                    );

                    if (!statements) {
                        statements = [statement];
                    }
                    else {
                        statements.push(statement);
                    }
                }
            }

            // Restore the previous lexical environment.
            lexicalEnvironmentStackOffset--;
            lexicalEnvironmentVariableDeclarations = lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset];
            lexicalEnvironmentFunctionDeclarations = lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset];
            if (lexicalEnvironmentStackOffset === 0) {
                lexicalEnvironmentVariableDeclarationsStack = [];
                lexicalEnvironmentFunctionDeclarationsStack = [];
            }
            return statements;
        }

        function requestEmitHelper(helper: EmitHelper): void {
            Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the transformation context during initialization.");
            Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
            Debug.assert(!helper.scoped, "Cannot request a scoped emit helper.");
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
                lexicalEnvironmentVariableDeclarations = undefined;
                lexicalEnvironmentVariableDeclarationsStack = undefined;
                lexicalEnvironmentFunctionDeclarations = undefined;
                lexicalEnvironmentFunctionDeclarationsStack = undefined;
                onSubstituteNode = undefined;
                onEmitNode = undefined;
                emitHelpers = undefined;

                // Prevent further use of the transformation result.
                state = TransformationState.Disposed;
            }
        }
    }
}
