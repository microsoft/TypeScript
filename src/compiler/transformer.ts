/// <reference path="visitor.ts" />
/// <reference path="transformers/ts.ts" />
/// <reference path="transformers/jsx.ts" />
/// <reference path="transformers/es2017.ts" />
/// <reference path="transformers/es2016.ts" />
/// <reference path="transformers/es2015.ts" />
/// <reference path="transformers/generators.ts" />
/// <reference path="transformers/es5.ts" />
/// <reference path="transformers/module/module.ts" />
/// <reference path="transformers/module/system.ts" />
/// <reference path="transformers/module/es2015.ts" />

/* @internal */
namespace ts {
    const moduleTransformerMap = createMap<Transformer>({
        [ModuleKind.ES2015]: transformES2015Module,
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
        transformed: SourceFile[];

        /**
         * Emits the substitute for a node, if one is available; otherwise, emits the node.
         *
         * @param emitContext The current emit context.
         * @param node The node to substitute.
         * @param emitCallback A callback used to emit the node or its substitute.
         */
        emitNodeWithSubstitution(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void): void;

        /**
         * Emits a node with possible notification.
         *
         * @param emitContext The current emit context.
         * @param node The node to emit.
         * @param emitCallback A callback used to emit the node.
         */
        emitNodeWithNotification(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void): void;
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
        onSubstituteNode?: (emitContext: EmitContext, node: Node) => Node;

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
        onEmitNode?: (emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void) => void;
    }

    /* @internal */
    export type Transformer = (context: TransformationContext) => (node: SourceFile) => SourceFile;

    export function getTransformers(compilerOptions: CompilerOptions) {
        const jsx = compilerOptions.jsx;
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const transformers: Transformer[] = [];

        transformers.push(transformTypeScript);

        if (jsx === JsxEmit.React) {
            transformers.push(transformJsx);
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

        transformers.push(moduleTransformerMap[moduleKind] || moduleTransformerMap[ModuleKind.None]);

        // The ES5 transformer is last so that it can substitute expressions like `exports.default`
        // for ES3.
        if (languageVersion < ScriptTarget.ES5) {
            transformers.push(transformES5);
        }

        return transformers;
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
            onSubstituteNode: (_emitContext, node) => node,
            enableSubstitution,
            isSubstitutionEnabled,
            onEmitNode: (node, emitContext, emitCallback) => emitCallback(node, emitContext),
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
            transformed,
            emitNodeWithSubstitution,
            emitNodeWithNotification
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
         * @param emitContext The current emit context.
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node or its substitute.
         */
        function emitNodeWithSubstitution(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void) {
            if (node) {
                if (isSubstitutionEnabled(node)) {
                    const substitute = context.onSubstituteNode(emitContext, node);
                    if (substitute && substitute !== node) {
                        emitCallback(emitContext, substitute);
                        return;
                    }
                }

                emitCallback(emitContext, node);
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
         *
         * @param emitContext The current emit context.
         * @param node The node to emit.
         * @param emitCallback The callback used to emit the node.
         */
        function emitNodeWithNotification(emitContext: EmitContext, node: Node, emitCallback: (emitContext: EmitContext, node: Node) => void) {
            if (node) {
                if (isEmitNotificationEnabled(node)) {
                    context.onEmitNode(emitContext, node, emitCallback);
                }
                else {
                    emitCallback(emitContext, node);
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
