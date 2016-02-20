/// <reference path="visitor.ts" />
/// <reference path="transformers/ts.ts" />
/// <reference path="transformers/jsx.ts" />
/// <reference path="transformers/es7.ts" />
/// <reference path="transformers/es6.ts" />
/// <reference path="transformers/module/module.ts" />
/// <reference path="transformers/module/system.ts" />
/// <reference path="transformers/module/es6.ts" />


/* @internal */
namespace ts {
    const moduleTransformerMap: Map<Transformer> = {
        [ModuleKind.ES6]: transformES6Module,
        [ModuleKind.System]: transformSystemModule,
        [ModuleKind.AMD]: transformModule,
        [ModuleKind.CommonJS]: transformModule,
        [ModuleKind.UMD]: transformModule,
        [ModuleKind.None]: transformModule
    };

    const enum SyntaxKindFeatureFlags {
        ExpressionSubstitution = 1 << 0,
        EmitNotifications = 1 << 1,
    }


    export function getTransformers(compilerOptions: CompilerOptions) {
        const jsx = compilerOptions.jsx;
        const languageVersion = getEmitScriptTarget(compilerOptions);
        const moduleKind = getEmitModuleKind(compilerOptions);
        const transformers: Transformer[] = [];

        transformers.push(transformTypeScript);
        transformers.push(moduleTransformerMap[moduleKind]);
        if (jsx === JsxEmit.React) {
            transformers.push(transformJsx);
        }

        if (languageVersion < ScriptTarget.ES7) {
            transformers.push(transformES7);
        }

        if (languageVersion < ScriptTarget.ES6) {
            transformers.push(transformES6);
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
    export function transformFiles(resolver: EmitResolver, host: EmitHost, sourceFiles: SourceFile[], transformers: Transformer[]) {
        const nodeToGeneratedName: Identifier[] = [];
        const generatedNameSet: Map<string> = {};
        const nodeEmitFlags: NodeEmitFlags[] = [];
        const lexicalEnvironmentVariableDeclarationsStack: VariableDeclaration[][] = [];
        const lexicalEnvironmentFunctionDeclarationsStack: FunctionDeclaration[][] = [];
        const enabledSyntaxKindFeatures = new Array<SyntaxKindFeatureFlags>(SyntaxKind.Count);

        let lexicalEnvironmentStackOffset = 0;
        let hoistedVariableDeclarations: VariableDeclaration[];
        let hoistedFunctionDeclarations: FunctionDeclaration[];
        let currentSourceFile: SourceFile;

        // The transformation context is provided to each transformer as part of transformer
        // initialization.
        const context: TransformationContext = {
            getCompilerOptions: () => host.getCompilerOptions(),
            getEmitResolver: () => resolver,
            getNodeEmitFlags,
            setNodeEmitFlags,
            isUniqueName,
            getGeneratedNameForNode,
            nodeHasGeneratedName,
            makeUniqueName,
            hoistVariableDeclaration,
            hoistFunctionDeclaration,
            startLexicalEnvironment,
            endLexicalEnvironment,
            identifierSubstitution: node => node,
            expressionSubstitution: node => node,
            enableExpressionSubstitution,
            isExpressionSubstitutionEnabled,
            onBeforeEmitNode: node => { },
            onAfterEmitNode: node => { },
            enableEmitNotification,
            isEmitNotificationEnabled,
        };

        // Chain together and initialize each transformer.
        const transformation = chain(...transformers)(context);

        // Transform each source file.
        return map(sourceFiles, transformSourceFile);

        /**
         * Transforms a source file.
         *
         * @param sourceFile The source file to transform.
         */
        function transformSourceFile(sourceFile: SourceFile) {
            if (isDeclarationFile(sourceFile)) {
                return sourceFile;
            }

            currentSourceFile = sourceFile;
            const visited = transformation(sourceFile);
            currentSourceFile = undefined;
            return visited;
        }

        function enableExpressionSubstitution(kind: SyntaxKind) {
            enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.ExpressionSubstitution;
        }

        function isExpressionSubstitutionEnabled(node: Node) {
            return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.ExpressionSubstitution) !== 0;
        }

        function enableEmitNotification(kind: SyntaxKind) {
            enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.EmitNotifications;
        }

        function isEmitNotificationEnabled(node: Node) {
            return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.EmitNotifications) !== 0
                || (getNodeEmitFlags(node) & NodeEmitFlags.AdviseOnEmitNode) !== 0;
        }

        /**
         * Gets flags that control emit behavior of a node.
         */
        function getNodeEmitFlags(node: Node) {
            while (node) {
                const nodeId = getNodeId(node);
                if (nodeEmitFlags[nodeId] !== undefined) {
                    return nodeEmitFlags[nodeId];
                }

                node = node.original;
            }

            return undefined;
        }

        /**
         * Sets flags that control emit behavior of a node.
         */
        function setNodeEmitFlags<T extends Node>(node: T, flags: NodeEmitFlags) {
            nodeEmitFlags[getNodeId(node)] = flags;
            return node;
        }

        /**
         * Generate a name that is unique within the current file and doesn't conflict with any names
         * in global scope. The name is formed by adding an '_n' suffix to the specified base name,
         * where n is a positive integer. Note that names generated by makeTempVariableName and
         * makeUniqueName are guaranteed to never conflict.
         */
        function makeUniqueName(baseName: string): Identifier {
            // Find the first unique 'name_n', where n is a positive number
            if (baseName.charCodeAt(baseName.length - 1) !== CharacterCodes._) {
                baseName += "_";
            }

            let i = 1;
            while (true) {
                const generatedName = baseName + i;
                if (isUniqueName(generatedName)) {
                    return createIdentifier(generatedNameSet[generatedName] = generatedName);
                }

                i++;
            }
        }

        /**
         * Gets the generated name for a node.
         */
        function getGeneratedNameForNode(node: Node) {
            const id = getNodeId(node);
            return nodeToGeneratedName[id] || (nodeToGeneratedName[id] = generateNameForNode(node));
        }

        /**
         * Gets a value indicating whether a node has a generated name.
         */
        function nodeHasGeneratedName(node: Node) {
            const id = getNodeId(node);
            return nodeToGeneratedName[id] !== undefined;
        }

        /**
         * Tests whether the provided name is unique.
         */
        function isUniqueName(name: string): boolean {
            return !resolver.hasGlobalName(name)
                && !hasProperty(currentSourceFile.identifiers, name)
                && !hasProperty(generatedNameSet, name);
        }

        /**
         * Tests whether the provided name is unique within a container.
         */
        function isUniqueLocalName(name: string, container: Node): boolean {
            container = getOriginalNode(container);
            for (let node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && hasProperty(node.locals, name)) {
                    // We conservatively include alias symbols to cover cases where they're emitted as locals
                    if (node.locals[name].flags & (SymbolFlags.Value | SymbolFlags.ExportValue | SymbolFlags.Alias)) {
                        return false;
                    }
                }
            }
            return true;
        }

        /**
         * Generates a name for a node.
         */
        function generateNameForNode(node: Node): Identifier {
            switch (node.kind) {
                case SyntaxKind.Identifier:
                    return makeUniqueName((<Identifier>node).text);
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return generateNameForModuleOrEnum(<ModuleDeclaration | EnumDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ExportDeclaration:
                    return generateNameForImportOrExportDeclaration(<ImportDeclaration | ExportDeclaration>node);
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ClassDeclaration:
                    Debug.assert((node.flags & NodeFlags.Default) !== 0, "Can only generate a name for a default export.");
                    return generateNameForExportDefault();
                case SyntaxKind.ExportAssignment:
                    return generateNameForExportDefault();
                case SyntaxKind.ClassExpression:
                    return generateNameForClassExpression();
                default:
                    return createTempVariable();
            }
        }

        function generateNameForModuleOrEnum(node: ModuleDeclaration | EnumDeclaration) {
            const name = node.name;
            // Use module/enum name itself if it is unique, otherwise make a unique variation
            return isUniqueLocalName(name.text, node) ? name : makeUniqueName(name.text);
        }

        function generateNameForImportOrExportDeclaration(node: ImportDeclaration | ExportDeclaration) {
            const expr = getExternalModuleName(node);
            const baseName = expr.kind === SyntaxKind.StringLiteral
                ? escapeIdentifier(makeIdentifierFromModuleName((<LiteralExpression>expr).text))
                : "module";
            return makeUniqueName(baseName);
        }

        function generateNameForExportDefault() {
            return makeUniqueName("default");
        }

        function generateNameForClassExpression() {
            return makeUniqueName("class");
        }

        /**
         * Records a hoisted variable declaration for the provided name within a lexical environment.
         */
        function hoistVariableDeclaration(name: Identifier): void {
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
            let statements: Statement[];
            if (hoistedVariableDeclarations || hoistedFunctionDeclarations) {
                if (hoistedFunctionDeclarations) {
                    statements = [...hoistedFunctionDeclarations];
                }

                if (hoistedVariableDeclarations) {
                    statements = append(statements,
                        createVariableStatement(
                            /*modifiers*/ undefined,
                            createVariableDeclarationList(hoistedVariableDeclarations)
                        )
                    );
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
            const args = arrayOf<(t: T) => (u: U) => U>(arguments);
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
            const args = arrayOf(arguments);
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

    /**
     * Makes an array from an ArrayLike.
     */
    function arrayOf<T>(arrayLike: ArrayLike<T>) {
        const length = arrayLike.length;
        const array: T[] = new Array<T>(length);
        for (let i = 0; i < length; i++) {
            array[i] = arrayLike[i];
        }
        return array;
    }
}