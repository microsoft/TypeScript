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
         * Emits the substitute for a node, if one is available; otherwise, emits the node.
         *
         * @param node The node to substitute.
         * @param isExpression A value indicating whether the node is in an expression context.
         * @param emitCallback A callback used to emit the node or its substitute.
         */
        emitNodeWithSubstitution(node: Node, isExpression: boolean, emitCallback: (node: Node) => void): void;

        /**
         * Emits a node with possible notification.
         *
         * @param node The node to emit.
         * @param emitCallback A callback used to emit the node.
         */
        emitNodeWithNotification(node: Node, emitCallback: (node: Node) => void): void;

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
     * Clears any EmitNode entries from parse-tree nodes.
     * @param sourceFile A source file.
     */
    export function disposeEmitNodes(sourceFile: SourceFile) {
        // During transformation we may need to annotate a parse tree node with transient
        // transformation properties. As parse tree nodes live longer than transformation
        // nodes, we need to make sure we reclaim any memory allocated for custom ranges
        // from these nodes to ensure we do not hold onto entire subtrees just for position
        // information. We also need to reset these nodes to a pre-transformation state
        // for incremental parsing scenarios so that we do not impact later emit.
        sourceFile = getSourceFileOfNode(getParseTreeNode(sourceFile));
        const emitNode = sourceFile && sourceFile.emitNode;
        const annotatedNodes = emitNode && emitNode.annotatedNodes;
        if (annotatedNodes) {
            for (const node of annotatedNodes) {
                node.emitNode = undefined;
            }
        }
    }

    /**
     * Associates a node with the current transformation, initializing
     * various transient transformation properties.
     *
     * @param node The node.
     */
    function getOrCreateEmitNode(node: Node) {
        if (!node.emitNode) {
            if (isParseTreeNode(node)) {
                // To avoid holding onto transformation artifacts, we keep track of any
                // parse tree node we are annotating. This allows us to clean them up after
                // all transformations have completed.
                if (node.kind === SyntaxKind.SourceFile) {
                    return node.emitNode = { annotatedNodes: [node] };
                }

                const sourceFile = getSourceFileOfNode(node);
                getOrCreateEmitNode(sourceFile).annotatedNodes.push(node);
            }

            node.emitNode = {};
        }

        return node.emitNode;
    }

    /**
     * Gets flags that control emit behavior of a node.
     *
     * @param node The node.
     */
    export function getEmitFlags(node: Node) {
        const emitNode = node.emitNode;
        return emitNode && emitNode.flags;
    }

    /**
     * Sets flags that control emit behavior of a node.
     *
     * @param node The node.
     * @param emitFlags The NodeEmitFlags for the node.
     */
    export function setEmitFlags<T extends Node>(node: T, emitFlags: EmitFlags) {
        getOrCreateEmitNode(node).flags = emitFlags;
        return node;
    }

    /**
     * Sets a custom text range to use when emitting source maps.
     *
     * @param node The node.
     * @param range The text range.
     */
    export function setSourceMapRange<T extends Node>(node: T, range: TextRange) {
        getOrCreateEmitNode(node).sourceMapRange = range;
        return node;
    }

    /**
     * Sets the TextRange to use for source maps for a token of a node.
     *
     * @param node The node.
     * @param token The token.
     * @param range The text range.
     */
    export function setTokenSourceMapRange<T extends Node>(node: T, token: SyntaxKind, range: TextRange) {
        const emitNode = getOrCreateEmitNode(node);
        const tokenSourceMapRanges = emitNode.tokenSourceMapRanges || (emitNode.tokenSourceMapRanges = createMap<TextRange>());
        tokenSourceMapRanges[token] = range;
        return node;
    }

    /**
     * Sets a custom text range to use when emitting comments.
     */
    export function setCommentRange<T extends Node>(node: T, range: TextRange) {
        getOrCreateEmitNode(node).commentRange = range;
        return node;
    }

    /**
     * Gets a custom text range to use when emitting comments.
     *
     * @param node The node.
     */
    export function getCommentRange(node: Node) {
        const emitNode = node.emitNode;
        return (emitNode && emitNode.commentRange) || node;
    }

    /**
     * Gets a custom text range to use when emitting source maps.
     *
     * @param node The node.
     */
    export function getSourceMapRange(node: Node) {
        const emitNode = node.emitNode;
        return (emitNode && emitNode.sourceMapRange) || node;
    }

    /**
     * Gets the TextRange to use for source maps for a token of a node.
     *
     * @param node The node.
     * @param token The token.
     */
    export function getTokenSourceMapRange(node: Node, token: SyntaxKind) {
        const emitNode = node.emitNode;
        const tokenSourceMapRanges = emitNode && emitNode.tokenSourceMapRanges;
        return tokenSourceMapRanges && tokenSourceMapRanges[token];
    }

    /**
     * Transforms an array of SourceFiles by passing them through each transformer.
     *
     * @param resolver The emit resolver provided by the checker.
     * @param host The emit host.
     * @param sourceFiles An array of source files
     * @param transforms An array of Transformers.
     */
    export function transformFiles(resolver: EmitResolver, host: EmitHost, sourceFiles: SourceFile[], transformers: Transformer[]): TransformationResult {
        const lexicalEnvironmentVariableDeclarationsStack: VariableDeclaration[][] = [];
        const lexicalEnvironmentFunctionDeclarationsStack: FunctionDeclaration[][] = [];
        const enabledSyntaxKindFeatures = new Array<SyntaxKindFeatureFlags>(SyntaxKind.Count);

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
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            startLexicalEnvironment,
            endLexicalEnvironment,
            onSubstituteNode: (node, isExpression) => node,
            enableSubstitution,
            isSubstitutionEnabled,
            onEmitNode: (node, emitCallback) => emitCallback(node),
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
            emitNodeWithSubstitution,
            emitNodeWithNotification,
            dispose() {
                // During transformation we may need to annotate a parse tree node with transient
                // transformation properties. As parse tree nodes live longer than transformation
                // nodes, we need to make sure we reclaim any memory allocated for custom ranges
                // from these nodes to ensure we do not hold onto entire subtrees just for position
                // information. We also need to reset these nodes to a pre-transformation state
                // for incremental parsing scenarios so that we do not impact later emit.
                for (const sourceFile of sourceFiles) {
                    disposeEmitNodes(sourceFile);
                }
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
            return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.Substitution) !== 0
                && (getEmitFlags(node) & EmitFlags.NoSubstitution) === 0;
        }

        /**
         * Emits a node with possible substitution.
         *
         * @param node The node to emit.
         * @param isExpression Whether the node represents an expression.
         * @param emitCallback The callback used to emit the node or its substitute.
         */
        function emitNodeWithSubstitution(node: Node, isExpression: boolean, emitCallback: (node: Node) => void) {
            if (node) {
                if (isSubstitutionEnabled(node)) {
                    const substitute = context.onSubstituteNode(node, isExpression);
                    if (substitute && substitute !== node) {
                        emitCallback(substitute);
                        return;
                    }
                }

                emitCallback(node);
            }
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
                || (getEmitFlags(node) & EmitFlags.AdviseOnEmitNode) !== 0;
        }

        /**
         * Emits a node with possible emit notification.
         */
        function emitNodeWithNotification(node: Node, emitCallback: (node: Node) => void) {
            if (node) {
                if (isEmitNotificationEnabled(node)) {
                    context.onEmitNode(node, emitCallback);
                }
                else {
                    emitCallback(node);
                }
            }
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
}