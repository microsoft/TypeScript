/// <reference path="visitor.ts" />
/// <reference path="transformers/ts.ts" />
/// <reference path="transformers/jsx.ts" />
/// <reference path="transformers/es7.ts" />
/// <reference path="transformers/es6.ts" />
/// <reference path="transformers/generators.ts" />
/// <reference path="transformers/module/module.ts" />
/// <reference path="transformers/module/system.ts" />
/// <reference path="transformers/module/es6.ts" />

/* @internal */
namespace ts {
    const moduleTransformerMap = createMap<Transformer>({
        [ModuleKind.ES6]: transformES6Module,
        [ModuleKind.System]: transformSystemModule,
        [ModuleKind.AMD]: transformModule,
        [ModuleKind.CommonJS]: transformModule,
        [ModuleKind.UMD]: transformModule,
        [ModuleKind.None]: transformModule,
    });

    const enum SyntaxKindFeatureFlags {
        Substitution = 1 << 0,
        EmitNotifications = 1 << 1,
    }

    export interface TransformationResult {
        /**
         * Gets the transformed source files.
         */
        getSourceFiles(): SourceFile[];

        /**
         * Gets the TextRange to use for source maps for a token of a node.
         */
        getTokenSourceMapRange(node: Node, token: SyntaxKind): TextRange;

        /**
         * Determines whether expression substitutions are enabled for the provided node.
         */
        isSubstitutionEnabled(node: Node): boolean;

        /**
         * Determines whether before/after emit notifications should be raised in the pretty
         * printer when it emits a node.
         */
        isEmitNotificationEnabled(node: Node): boolean;

        /**
         * Hook used by transformers to substitute expressions just before they
         * are emitted by the pretty printer.
         *
         * @param node The node to substitute.
         * @param isExpression A value indicating whether the node is in an expression context.
         */
        onSubstituteNode(node: Node, isExpression: boolean): Node;

        /**
         * Hook used to allow transformers to capture state before or after
         * the printer emits a node.
         *
         * @param node The node to emit.
         * @param emitCallback A callback used to emit the node.
         */
        onEmitNode(node: Node, emitCallback: (node: Node) => void): void;

        /**
         * Reset transient transformation properties on parse tree nodes.
         */
        dispose(): void;
    }

    export interface TransformationContext extends LexicalEnvironment {
        getCompilerOptions(): CompilerOptions;
        getEmitResolver(): EmitResolver;
        getEmitHost(): EmitHost;

        /**
         * Gets flags used to customize later transformations or emit.
         */
        getNodeEmitFlags(node: Node): NodeEmitFlags;

        /**
         * Sets flags used to customize later transformations or emit.
         */
        setNodeEmitFlags<T extends Node>(node: T, flags: NodeEmitFlags): T;

        /**
         * Gets the TextRange to use for source maps for the node.
         */
        getSourceMapRange(node: Node): TextRange;

        /**
         * Sets the TextRange to use for source maps for the node.
         */
        setSourceMapRange<T extends Node>(node: T, range: TextRange): T;

        /**
         * Gets the TextRange to use for source maps for a token of a node.
         */
        getTokenSourceMapRange(node: Node, token: SyntaxKind): TextRange;

        /**
         * Sets the TextRange to use for source maps for a token of a node.
         */
        setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: TextRange): T;

        /**
         * Gets the TextRange to use for comments for the node.
         */
        getCommentRange(node: Node): TextRange;

        /**
         * Sets the TextRange to use for comments for the node.
         */
        setCommentRange<T extends Node>(node: T, range: TextRange): T;

        /**
         * Hoists a function declaration to the containing scope.
         */
        hoistFunctionDeclaration(node: FunctionDeclaration): void;

        /**
         * Hoists a variable declaration to the containing scope.
         */
        hoistVariableDeclaration(node: Identifier): void;

        /**
         * Enables expression substitutions in the pretty printer for the provided SyntaxKind.
         */
        enableSubstitution(kind: SyntaxKind): void;

        /**
         * Determines whether expression substitutions are enabled for the provided node.
         */
        isSubstitutionEnabled(node: Node): boolean;

        /**
         * Hook used by transformers to substitute expressions just before they
         * are emitted by the pretty printer.
         */
        onSubstituteNode?: (node: Node, isExpression: boolean) => Node;

        /**
         * Enables before/after emit notifications in the pretty printer for the provided
         * SyntaxKind.
         */
        enableEmitNotification(kind: SyntaxKind): void;

        /**
         * Determines whether before/after emit notifications should be raised in the pretty
         * printer when it emits a node.
         */
        isEmitNotificationEnabled(node: Node): boolean;

        /**
         * Hook used to allow transformers to capture state before or after
         * the printer emits a node.
         */
        onEmitNode?: (node: Node, emit: (node: Node) => void) => void;
    }

    /* @internal */
    export type Transformer = (context: TransformationContext) => (node: SourceFile) => SourceFile;

    export function getTransformers(compilerOptions: CompilerOptions) {
        const jsx = compilerOptions.jsx;
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const transformers: Transformer[] = [];

        transformers.push(transformTypeScript);
        transformers.push(moduleTransformerMap[moduleKind] || moduleTransformerMap[ModuleKind.None]);

        if (jsx === JsxEmit.React) {
            transformers.push(transformJsx);
        }

        transformers.push(transformES7);

        if (languageVersion < ScriptTarget.ES6) {
            transformers.push(transformES6);
            transformers.push(transformGenerators);
        }

        return transformers;
    }

    /**
     * Tracks a monotonically increasing transformation id used to associate a node with a specific
     * transformation. This ensures transient properties related to transformations can be safely
     * stored on source tree nodes that may be reused across multiple transformations (such as
     * with compile-on-save).
     */
    let nextTransformId = 1;

    /**
     * Transforms an array of SourceFiles by passing them through each transformer.
     *
     * @param resolver The emit resolver provided by the checker.
     * @param host The emit host.
     * @param sourceFiles An array of source files
     * @param transforms An array of Transformers.
     */
    export function transformFiles(resolver: EmitResolver, host: EmitHost, sourceFiles: SourceFile[], transformers: Transformer[]): TransformationResult {
        const transformId = nextTransformId;
        nextTransformId++;

        const tokenSourceMapRanges = createMap<TextRange>();
        const lexicalEnvironmentVariableDeclarationsStack: VariableDeclaration[][] = [];
        const lexicalEnvironmentFunctionDeclarationsStack: FunctionDeclaration[][] = [];
        const enabledSyntaxKindFeatures = new Array<SyntaxKindFeatureFlags>(SyntaxKind.Count);
        const parseTreeNodesWithAnnotations: Node[] = [];

        let lastTokenSourceMapRangeNode: Node;
        let lastTokenSourceMapRangeToken: SyntaxKind;
        let lastTokenSourceMapRange: TextRange;
        let lexicalEnvironmentStackOffset = 0;
        let hoistedVariableDeclarations: VariableDeclaration[];
        let hoistedFunctionDeclarations: FunctionDeclaration[];
        let lexicalEnvironmentDisabled: boolean;

        // The transformation context is provided to each transformer as part of transformer
        // initialization.
        const context: TransformationContext = {
            getCompilerOptions: () => host.getCompilerOptions(),
            getEmitResolver: () => resolver,
            getEmitHost: () => host,
            getNodeEmitFlags,
            setNodeEmitFlags,
            getSourceMapRange,
            setSourceMapRange,
            getTokenSourceMapRange,
            setTokenSourceMapRange,
            getCommentRange,
            setCommentRange,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            startLexicalEnvironment,
            endLexicalEnvironment,
            onSubstituteNode,
            enableSubstitution,
            isSubstitutionEnabled,
            onEmitNode,
            enableEmitNotification,
            isEmitNotificationEnabled
        };

        // Chain together and initialize each transformer.
        const transformation = chain(...transformers)(context);

        // Transform each source file.
        const transformed = map(sourceFiles, transformSourceFile);

        // Disable modification of the lexical environment.
        lexicalEnvironmentDisabled = true;

        return {
            getSourceFiles: () => transformed,
            getTokenSourceMapRange,
            isSubstitutionEnabled,
            isEmitNotificationEnabled,
            onSubstituteNode: context.onSubstituteNode,
            onEmitNode: context.onEmitNode,
            dispose() {
                // During transformation we may need to annotate a parse tree node with transient
                // transformation properties. As parse tree nodes live longer than transformation
                // nodes, we need to make sure we reclaim any memory allocated for custom ranges
                // from these nodes to ensure we do not hold onto entire subtrees just for position
                // information. We also need to reset these nodes to a pre-transformation state
                // for incremental parsing scenarios so that we do not impact later emit.
                for (const node of parseTreeNodesWithAnnotations) {
                    if (node.transformId === transformId) {
                        node.transformId = 0;
                        node.emitFlags = 0;
                        node.commentRange = undefined;
                        node.sourceMapRange = undefined;
                    }
                }

                parseTreeNodesWithAnnotations.length = 0;
            }
        };

        /**
         * Transforms a source file.
         *
         * @param sourceFile The source file to transform.
         */
        function transformSourceFile(sourceFile: SourceFile) {
            if (isDeclarationFile(sourceFile)) {
                return sourceFile;
            }

            return transformation(sourceFile);
        }

        /**
         * Enables expression substitutions in the pretty printer for the provided SyntaxKind.
         */
        function enableSubstitution(kind: SyntaxKind) {
            enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.Substitution;
        }

        /**
         * Determines whether expression substitutions are enabled for the provided node.
         */
        function isSubstitutionEnabled(node: Node) {
            return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.Substitution) !== 0;
        }

        /**
         * Default hook for node substitutions.
         *
         * @param node The node to substitute.
         * @param isExpression A value indicating whether the node is to be used in an expression
         *                     position.
         */
        function onSubstituteNode(node: Node, isExpression: boolean) {
            return node;
        }

        /**
         * Enables before/after emit notifications in the pretty printer for the provided SyntaxKind.
         */
        function enableEmitNotification(kind: SyntaxKind) {
            enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.EmitNotifications;
        }

        /**
         * Determines whether before/after emit notifications should be raised in the pretty
         * printer when it emits a node.
         */
        function isEmitNotificationEnabled(node: Node) {
            return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.EmitNotifications) !== 0
                || (getNodeEmitFlags(node) & NodeEmitFlags.AdviseOnEmitNode) !== 0;
        }

        /**
         * Default hook for node emit.
         *
         * @param node The node to emit.
         * @param emit A callback used to emit the node in the printer.
         */
        function onEmitNode(node: Node, emit: (node: Node) => void) {
            emit(node);
        }

        /**
         * Associates a node with the current transformation, initializing
         * various transient transformation properties.
         *
         * @param node The node.
         */
        function beforeSetAnnotation(node: Node) {
            if ((node.flags & NodeFlags.Synthesized) === 0 && node.transformId !== transformId) {
                // To avoid holding onto transformation artifacts, we keep track of any
                // parse tree node we are annotating. This allows us to clean them up after
                // all transformations have completed.
                parseTreeNodesWithAnnotations.push(node);
                node.transformId = transformId;
            }
        }

        /**
         * Gets flags that control emit behavior of a node.
         *
         * If the node does not have its own NodeEmitFlags set, the node emit flags of its
         * original pointer are used.
         *
         * @param node The node.
         */
        function getNodeEmitFlags(node: Node) {
            return node.emitFlags;
        }

        /**
         * Sets flags that control emit behavior of a node.
         *
         * @param node The node.
         * @param emitFlags The NodeEmitFlags for the node.
         */
        function setNodeEmitFlags<T extends Node>(node: T, emitFlags: NodeEmitFlags) {
            beforeSetAnnotation(node);
            node.emitFlags = emitFlags;
            return node;
        }

        /**
         * Gets a custom text range to use when emitting source maps.
         *
         * If a node does not have its own custom source map text range, the custom source map
         * text range of its original pointer is used.
         *
         * @param node The node.
         */
        function getSourceMapRange(node: Node) {
            return node.sourceMapRange || node;
        }

        /**
         * Sets a custom text range to use when emitting source maps.
         *
         * @param node The node.
         * @param range The text range.
         */
        function setSourceMapRange<T extends Node>(node: T, range: TextRange) {
            beforeSetAnnotation(node);
            node.sourceMapRange = range;
            return node;
        }

        /**
         * Gets the TextRange to use for source maps for a token of a node.
         *
         * If a node does not have its own custom source map text range for a token, the custom
         * source map text range for the token of its original pointer is used.
         *
         * @param node The node.
         * @param token The token.
         */
        function getTokenSourceMapRange(node: Node, token: SyntaxKind) {
            // As a performance optimization, use the cached value of the most recent node.
            // This helps for cases where this function is called repeatedly for the same node.
            if (lastTokenSourceMapRangeNode === node && lastTokenSourceMapRangeToken === token) {
                return lastTokenSourceMapRange;
            }

            // Get the custom token source map range for a node or from one of its original nodes.
            // Custom token ranges are not stored on the node to avoid the GC burden.
            let range: TextRange;
            let current = node;
            while (current) {
                range = current.id ? tokenSourceMapRanges[current.id + "-" + token] : undefined;
                if (range !== undefined) {
                    break;
                }

                current = current.original;
            }

            // Cache the most recently requested value.
            lastTokenSourceMapRangeNode = node;
            lastTokenSourceMapRangeToken = token;
            lastTokenSourceMapRange = range;
            return range;
        }

        /**
         * Sets the TextRange to use for source maps for a token of a node.
         *
         * @param node The node.
         * @param token The token.
         * @param range The text range.
         */
        function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: TextRange) {
            // Cache the most recently requested value.
            lastTokenSourceMapRangeNode = node;
            lastTokenSourceMapRangeToken = token;
            lastTokenSourceMapRange = range;
            tokenSourceMapRanges[getNodeId(node) + "-" + token] = range;
            return node;
        }

        /**
         * Gets a custom text range to use when emitting comments.
         *
         * If a node does not have its own custom source map text range, the custom source map
         * text range of its original pointer is used.
         *
         * @param node The node.
         */
        function getCommentRange(node: Node) {
            return node.commentRange || node;
        }

        /**
         * Sets a custom text range to use when emitting comments.
         */
        function setCommentRange<T extends Node>(node: T, range: TextRange) {
            beforeSetAnnotation(node);
            node.commentRange = range;
            return node;
        }

        /**
         * Records a hoisted variable declaration for the provided name within a lexical environment.
         */
        function hoistVariableDeclaration(name: Identifier): void {
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot modify the lexical environment during the print phase.");
            const decl = createVariableDeclaration(name);
            if (!hoistedVariableDeclarations) {
                hoistedVariableDeclarations = [decl];
            }
            else {
                hoistedVariableDeclarations.push(decl);
            }
        }

        /**
         * Records a hoisted function declaration within a lexical environment.
         */
        function hoistFunctionDeclaration(func: FunctionDeclaration): void {
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot modify the lexical environment during the print phase.");
            if (!hoistedFunctionDeclarations) {
                hoistedFunctionDeclarations = [func];
            }
            else {
                hoistedFunctionDeclarations.push(func);
            }
        }

        /**
         * Starts a new lexical environment. Any existing hoisted variable or function declarations
         * are pushed onto a stack, and the related storage variables are reset.
         */
        function startLexicalEnvironment(): void {
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot start a lexical environment during the print phase.");

            // Save the current lexical environment. Rather than resizing the array we adjust the
            // stack size variable. This allows us to reuse existing array slots we've
            // already allocated between transformations to avoid allocation and GC overhead during
            // transformation.
            lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset] = hoistedVariableDeclarations;
            lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset] = hoistedFunctionDeclarations;
            lexicalEnvironmentStackOffset++;
            hoistedVariableDeclarations = undefined;
            hoistedFunctionDeclarations = undefined;
        }

        /**
         * Ends a lexical environment. The previous set of hoisted declarations are restored and
         * any hoisted declarations added in this environment are returned.
         */
        function endLexicalEnvironment(): Statement[] {
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot end a lexical environment during the print phase.");

            let statements: Statement[];
            if (hoistedVariableDeclarations || hoistedFunctionDeclarations) {
                if (hoistedFunctionDeclarations) {
                    statements = [...hoistedFunctionDeclarations];
                }

                if (hoistedVariableDeclarations) {
                    const statement = createVariableStatement(
                        /*modifiers*/ undefined,
                        createVariableDeclarationList(hoistedVariableDeclarations)
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
            hoistedVariableDeclarations = lexicalEnvironmentVariableDeclarationsStack[lexicalEnvironmentStackOffset];
            hoistedFunctionDeclarations = lexicalEnvironmentFunctionDeclarationsStack[lexicalEnvironmentStackOffset];
            return statements;
        }
    }

    /**
     * High-order function, creates a function that executes a function composition.
     * For example, `chain(a, b)` is the equivalent of `x => ((a', b') => y => b'(a'(y)))(a(x), b(x))`
     *
     * @param args The functions to chain.
     */
    function chain<T, U>(...args: ((t: T) => (u: U) => U)[]): (t: T) => (u: U) => U;
    function chain<T, U>(a: (t: T) => (u: U) => U, b: (t: T) => (u: U) => U, c: (t: T) => (u: U) => U, d: (t: T) => (u: U) => U, e: (t: T) => (u: U) => U): (t: T) => (u: U) => U {
        if (e) {
            const args: ((t: T) => (u: U) => U)[] = [];
            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return t => compose(...map(args, f => f(t)));
        }
        else if (d) {
            return t => compose(a(t), b(t), c(t), d(t));
        }
        else if (c) {
            return t => compose(a(t), b(t), c(t));
        }
        else if (b) {
            return t => compose(a(t), b(t));
        }
        else if (a) {
            return t => compose(a(t));
        }
        else {
            return t => u => u;
        }
    }

    /**
     * High-order function, composes functions. Note that functions are composed inside-out;
     * for example, `compose(a, b)` is the equivalent of `x => b(a(x))`.
     *
     * @param args The functions to compose.
     */
    function compose<T>(...args: ((t: T) => T)[]): (t: T) => T;
    function compose<T>(a: (t: T) => T, b: (t: T) => T, c: (t: T) => T, d: (t: T) => T, e: (t: T) => T): (t: T) => T {
        if (e) {
            const args: ((t: T) => T)[] = [];
            for (let i = 0; i < arguments.length; i++) {
                args[i] = arguments[i];
            }

            return t => reduceLeft<(t: T) => T, T>(args, (u, f) => f(u), t);
        }
        else if (d) {
            return t => d(c(b(a(t))));
        }
        else if (c) {
            return t => c(b(a(t)));
        }
        else if (b) {
            return t => b(a(t));
        }
        else if (a) {
            return t => a(t);
        }
        else {
            return t => t;
        }
    }
}