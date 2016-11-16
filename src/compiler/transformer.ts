/// <reference path="visitor.ts" />
/// <reference path="transformers/ts.ts" />
/// <reference path="transformers/jsx.ts" />
/// <reference path="transformers/esnext.ts" />
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

    export function getTransformers(compilerOptions: CompilerOptions) {
        const jsx = compilerOptions.jsx;
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const transformers: Transformer[] = [];

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
        const enabledSyntaxKindFeatures = new Array<SyntaxKindFeatureFlags>(SyntaxKind.Count);

        let lexicalEnvironmentDisabled = false;

        let lexicalEnvironmentVariableDeclarations: VariableDeclaration[];
        let lexicalEnvironmentFunctionDeclarations: FunctionDeclaration[];
        let lexicalEnvironmentVariableDeclarationsStack: VariableDeclaration[][] = [];
        let lexicalEnvironmentFunctionDeclarationsStack: FunctionDeclaration[][] = [];
        let lexicalEnvironmentStackOffset = 0;
        let lexicalEnvironmentSuspended = false;

        let emitHelpers: EmitHelper[];

        // The transformation context is provided to each transformer as part of transformer
        // initialization.
        const context: TransformationContext = {
            getCompilerOptions: () => host.getCompilerOptions(),
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
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot modify the lexical environment during the print phase.");
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
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot start a lexical environment during the print phase.");
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
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot suspend a lexical environment during the print phase.");
            Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is already suspended.");
            lexicalEnvironmentSuspended = true;
        }

        /** Resumes a suspended lexical environment, usually before visiting a function body. */
        function resumeLexicalEnvironment(): void {
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot resume a lexical environment during the print phase.");
            Debug.assert(lexicalEnvironmentSuspended, "Lexical environment is not suspended.");
            lexicalEnvironmentSuspended = false;
        }

        /**
         * Ends a lexical environment. The previous set of hoisted declarations are restored and
         * any hoisted declarations added in this environment are returned.
         */
        function endLexicalEnvironment(): Statement[] {
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot end a lexical environment during the print phase.");
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
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot modify the lexical environment during the print phase.");
            Debug.assert(!helper.scoped, "Cannot request a scoped emit helper.");
            emitHelpers = append(emitHelpers, helper);
        }

        function readEmitHelpers(): EmitHelper[] | undefined {
            Debug.assert(!lexicalEnvironmentDisabled, "Cannot modify the lexical environment during the print phase.");
            const helpers = emitHelpers;
            emitHelpers = undefined;
            return helpers;
        }
    }
}
