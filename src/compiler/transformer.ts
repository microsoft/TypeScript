/* @internal */
namespace ts {
function getModuleTransformer(moduleKind: ts.ModuleKind): ts.TransformerFactory<ts.SourceFile | ts.Bundle> {
    switch (moduleKind) {
        case ts.ModuleKind.ESNext:
        case ts.ModuleKind.ES2022:
        case ts.ModuleKind.ES2020:
        case ts.ModuleKind.ES2015:
            return ts.transformECMAScriptModule;
        case ts.ModuleKind.System:
            return ts.transformSystemModule;
        case ts.ModuleKind.Node16:
        case ts.ModuleKind.NodeNext:
            return ts.transformNodeModule;
        default:
            return ts.transformModule;
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

export const noTransformers: ts.EmitTransformers = { scriptTransformers: ts.emptyArray, declarationTransformers: ts.emptyArray };

export function getTransformers(compilerOptions: ts.CompilerOptions, customTransformers?: ts.CustomTransformers, emitOnly?: boolean | ts.EmitOnly): ts.EmitTransformers {
    return {
        scriptTransformers: getScriptTransformers(compilerOptions, customTransformers, emitOnly),
        declarationTransformers: getDeclarationTransformers(customTransformers),
    };
}

function getScriptTransformers(compilerOptions: ts.CompilerOptions, customTransformers?: ts.CustomTransformers, emitOnly?: boolean | ts.EmitOnly) {
    if (emitOnly) return ts.emptyArray;

    const languageVersion = ts.getEmitScriptTarget(compilerOptions);
    const moduleKind = ts.getEmitModuleKind(compilerOptions);
    const transformers: ts.TransformerFactory<ts.SourceFile | ts.Bundle>[] = [];

    ts.addRange(transformers, customTransformers && ts.map(customTransformers.before, wrapScriptTransformerFactory));

    transformers.push(ts.transformTypeScript);
    transformers.push(ts.transformLegacyDecorators);
    transformers.push(ts.transformClassFields);

    if (ts.getJSXTransformEnabled(compilerOptions)) {
        transformers.push(ts.transformJsx);
    }

    if (languageVersion < ts.ScriptTarget.ESNext) {
        transformers.push(ts.transformESNext);
    }

    if (languageVersion < ts.ScriptTarget.ES2021) {
        transformers.push(ts.transformES2021);
    }

    if (languageVersion < ts.ScriptTarget.ES2020) {
        transformers.push(ts.transformES2020);
    }

    if (languageVersion < ts.ScriptTarget.ES2019) {
        transformers.push(ts.transformES2019);
    }

    if (languageVersion < ts.ScriptTarget.ES2018) {
        transformers.push(ts.transformES2018);
    }

    if (languageVersion < ts.ScriptTarget.ES2017) {
        transformers.push(ts.transformES2017);
    }

    if (languageVersion < ts.ScriptTarget.ES2016) {
        transformers.push(ts.transformES2016);
    }

    if (languageVersion < ts.ScriptTarget.ES2015) {
        transformers.push(ts.transformES2015);
        transformers.push(ts.transformGenerators);
    }

    transformers.push(getModuleTransformer(moduleKind));

    // The ES5 transformer is last so that it can substitute expressions like `exports.default`
    // for ES3.
    if (languageVersion < ts.ScriptTarget.ES5) {
        transformers.push(ts.transformES5);
    }

    ts.addRange(transformers, customTransformers && ts.map(customTransformers.after, wrapScriptTransformerFactory));
    return transformers;
}

function getDeclarationTransformers(customTransformers?: ts.CustomTransformers) {
    const transformers: ts.TransformerFactory<ts.SourceFile | ts.Bundle>[] = [];
    transformers.push(ts.transformDeclarations);
    ts.addRange(transformers, customTransformers && ts.map(customTransformers.afterDeclarations, wrapDeclarationTransformerFactory));
    return transformers;
}

/**
 * Wrap a custom script or declaration transformer object in a `Transformer` callback with fallback support for transforming bundles.
 */
function wrapCustomTransformer(transformer: ts.CustomTransformer): ts.Transformer<ts.Bundle | ts.SourceFile> {
    return node => ts.isBundle(node) ? transformer.transformBundle(node) : transformer.transformSourceFile(node);
}

/**
 * Wrap a transformer factory that may return a custom script or declaration transformer object.
 */
function wrapCustomTransformerFactory<T extends ts.SourceFile | ts.Bundle>(transformer: ts.TransformerFactory<T> | ts.CustomTransformerFactory, handleDefault: (context: ts.TransformationContext, tx: ts.Transformer<T>) => ts.Transformer<ts.Bundle | ts.SourceFile>): ts.TransformerFactory<ts.Bundle | ts.SourceFile> {
    return context => {
        const customTransformer = transformer(context);
        return typeof customTransformer === "function"
            ? handleDefault(context, customTransformer)
            : wrapCustomTransformer(customTransformer);
    };
}

function wrapScriptTransformerFactory(transformer: ts.TransformerFactory<ts.SourceFile> | ts.CustomTransformerFactory): ts.TransformerFactory<ts.Bundle | ts.SourceFile> {
    return wrapCustomTransformerFactory(transformer, ts.chainBundle);
}

function wrapDeclarationTransformerFactory(transformer: ts.TransformerFactory<ts.Bundle | ts.SourceFile> | ts.CustomTransformerFactory): ts.TransformerFactory<ts.Bundle | ts.SourceFile> {
    return wrapCustomTransformerFactory(transformer, (_, node) => node);
}

export function noEmitSubstitution(_hint: ts.EmitHint, node: ts.Node) {
    return node;
}

export function noEmitNotification(hint: ts.EmitHint, node: ts.Node, callback: (hint: ts.EmitHint, node: ts.Node) => void) {
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
export function transformNodes<T extends ts.Node>(resolver: ts.EmitResolver | undefined, host: ts.EmitHost | undefined, factory: ts.NodeFactory, options: ts.CompilerOptions, nodes: readonly T[], transformers: readonly ts.TransformerFactory<T>[], allowDtsFiles: boolean): ts.TransformationResult<T> {
    const enabledSyntaxKindFeatures = new Array<SyntaxKindFeatureFlags>(ts.SyntaxKind.Count);
    let lexicalEnvironmentVariableDeclarations: ts.VariableDeclaration[];
    let lexicalEnvironmentFunctionDeclarations: ts.FunctionDeclaration[];
    let lexicalEnvironmentStatements: ts.Statement[];
    let lexicalEnvironmentFlags = ts.LexicalEnvironmentFlags.None;
    let lexicalEnvironmentVariableDeclarationsStack: ts.VariableDeclaration[][] = [];
    let lexicalEnvironmentFunctionDeclarationsStack: ts.FunctionDeclaration[][] = [];
    let lexicalEnvironmentStatementsStack: ts.Statement[][] = [];
    let lexicalEnvironmentFlagsStack: ts.LexicalEnvironmentFlags[] = [];
    let lexicalEnvironmentStackOffset = 0;
    let lexicalEnvironmentSuspended = false;
    let blockScopedVariableDeclarationsStack: ts.Identifier[][] = [];
    let blockScopeStackOffset = 0;
    let blockScopedVariableDeclarations: ts.Identifier[];
    let emitHelpers: ts.EmitHelper[] | undefined;
    let onSubstituteNode: ts.TransformationContext["onSubstituteNode"] = noEmitSubstitution;
    let onEmitNode: ts.TransformationContext["onEmitNode"] = noEmitNotification;
    let state = TransformationState.Uninitialized;
    const diagnostics: ts.DiagnosticWithLocation[] = [];

    // The transformation context is provided to each transformer as part of transformer
    // initialization.
    const context: ts.TransformationContext = {
        factory,
        getCompilerOptions: () => options,
        getEmitResolver: () => resolver!, // TODO: GH#18217
        getEmitHost: () => host!, // TODO: GH#18217
        getEmitHelperFactory: ts.memoize(() => ts.createEmitHelperFactory(context)),
        startLexicalEnvironment,
        suspendLexicalEnvironment,
        resumeLexicalEnvironment,
        endLexicalEnvironment,
        setLexicalEnvironmentFlags,
        getLexicalEnvironmentFlags,
        hoistVariableDeclaration,
        hoistFunctionDeclaration,
        addInitializationStatement,
        startBlockScope,
        endBlockScope,
        addBlockScopedVariable,
        requestEmitHelper,
        readEmitHelpers,
        enableSubstitution,
        enableEmitNotification,
        isSubstitutionEnabled,
        isEmitNotificationEnabled,
        get onSubstituteNode() { return onSubstituteNode; },
        set onSubstituteNode(value) {
            ts.Debug.assert(state < TransformationState.Initialized, "Cannot modify transformation hooks after initialization has completed.");
            ts.Debug.assert(value !== undefined, "Value must not be 'undefined'");
            onSubstituteNode = value;
        },
        get onEmitNode() { return onEmitNode; },
        set onEmitNode(value) {
            ts.Debug.assert(state < TransformationState.Initialized, "Cannot modify transformation hooks after initialization has completed.");
            ts.Debug.assert(value !== undefined, "Value must not be 'undefined'");
            onEmitNode = value;
        },
        addDiagnostic(diag) {
            diagnostics.push(diag);
        }
    };

    // Ensure the parse tree is clean before applying transformations
    for (const node of nodes) {
        ts.disposeEmitNodes(ts.getSourceFileOfNode(ts.getParseTreeNode(node)));
    }

    ts.performance.mark("beforeTransform");

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
    const transformed: T[] = [];
    for (const node of nodes) {
        ts.tracing?.push(ts.tracing.Phase.Emit, "transformNodes", node.kind === ts.SyntaxKind.SourceFile ? { path: (node as any as ts.SourceFile).path } : { kind: node.kind, pos: node.pos, end: node.end });
        transformed.push((allowDtsFiles ? transformation : transformRoot)(node));
        ts.tracing?.pop();
    }

    // prevent modification of the lexical environment.
    state = TransformationState.Completed;

    ts.performance.mark("afterTransform");
    ts.performance.measure("transformTime", "beforeTransform", "afterTransform");

    return {
        transformed,
        substituteNode,
        emitNodeWithNotification,
        isEmitNotificationEnabled,
        dispose,
        diagnostics
    };

    function transformRoot(node: T) {
        return node && (!ts.isSourceFile(node) || !node.isDeclarationFile) ? transformation(node) : node;
    }

    /**
     * Enables expression substitutions in the pretty printer for the provided SyntaxKind.
     */
    function enableSubstitution(kind: ts.SyntaxKind) {
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
        enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.Substitution;
    }

    /**
     * Determines whether expression substitutions are enabled for the provided node.
     */
    function isSubstitutionEnabled(node: ts.Node) {
        return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.Substitution) !== 0
            && (ts.getEmitFlags(node) & ts.EmitFlags.NoSubstitution) === 0;
    }

    /**
     * Emits a node with possible substitution.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to emit.
     * @param emitCallback The callback used to emit the node or its substitute.
     */
    function substituteNode(hint: ts.EmitHint, node: ts.Node) {
        ts.Debug.assert(state < TransformationState.Disposed, "Cannot substitute a node after the result is disposed.");
        return node && isSubstitutionEnabled(node) && onSubstituteNode(hint, node) || node;
    }

    /**
     * Enables before/after emit notifications in the pretty printer for the provided SyntaxKind.
     */
    function enableEmitNotification(kind: ts.SyntaxKind) {
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
        enabledSyntaxKindFeatures[kind] |= SyntaxKindFeatureFlags.EmitNotifications;
    }

    /**
     * Determines whether before/after emit notifications should be raised in the pretty
     * printer when it emits a node.
     */
    function isEmitNotificationEnabled(node: ts.Node) {
        return (enabledSyntaxKindFeatures[node.kind] & SyntaxKindFeatureFlags.EmitNotifications) !== 0
            || (ts.getEmitFlags(node) & ts.EmitFlags.AdviseOnEmitNode) !== 0;
    }

    /**
     * Emits a node with possible emit notification.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to emit.
     * @param emitCallback The callback used to emit the node.
     */
    function emitNodeWithNotification(hint: ts.EmitHint, node: ts.Node, emitCallback: (hint: ts.EmitHint, node: ts.Node) => void) {
        ts.Debug.assert(state < TransformationState.Disposed, "Cannot invoke TransformationResult callbacks after the result is disposed.");
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
    function hoistVariableDeclaration(name: ts.Identifier): void {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
        const decl = ts.setEmitFlags(factory.createVariableDeclaration(name), ts.EmitFlags.NoNestedSourceMaps);
        if (!lexicalEnvironmentVariableDeclarations) {
            lexicalEnvironmentVariableDeclarations = [decl];
        }
        else {
            lexicalEnvironmentVariableDeclarations.push(decl);
        }
        if (lexicalEnvironmentFlags & ts.LexicalEnvironmentFlags.InParameters) {
            lexicalEnvironmentFlags |= ts.LexicalEnvironmentFlags.VariablesHoistedInParameters;
        }
    }

    /**
     * Records a hoisted function declaration within a lexical environment.
     */
    function hoistFunctionDeclaration(func: ts.FunctionDeclaration): void {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
        ts.setEmitFlags(func, ts.EmitFlags.CustomPrologue);
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
    function addInitializationStatement(node: ts.Statement): void {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
        ts.setEmitFlags(node, ts.EmitFlags.CustomPrologue);
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
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
        ts.Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");

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
        lexicalEnvironmentFlags = ts.LexicalEnvironmentFlags.None;
    }

    /** Suspends the current lexical environment, usually after visiting a parameter list. */
    function suspendLexicalEnvironment(): void {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
        ts.Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is already suspended.");
        lexicalEnvironmentSuspended = true;
    }

    /** Resumes a suspended lexical environment, usually before visiting a function body. */
    function resumeLexicalEnvironment(): void {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
        ts.Debug.assert(lexicalEnvironmentSuspended, "Lexical environment is not suspended.");
        lexicalEnvironmentSuspended = false;
    }

    /**
     * Ends a lexical environment. The previous set of hoisted declarations are restored and
     * any hoisted declarations added in this environment are returned.
     */
    function endLexicalEnvironment(): ts.Statement[] | undefined {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the lexical environment during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the lexical environment after transformation has completed.");
        ts.Debug.assert(!lexicalEnvironmentSuspended, "Lexical environment is suspended.");

        let statements: ts.Statement[] | undefined;
        if (lexicalEnvironmentVariableDeclarations ||
            lexicalEnvironmentFunctionDeclarations ||
            lexicalEnvironmentStatements) {
            if (lexicalEnvironmentFunctionDeclarations) {
                statements = [...lexicalEnvironmentFunctionDeclarations];
            }

            if (lexicalEnvironmentVariableDeclarations) {
                const statement = factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList(lexicalEnvironmentVariableDeclarations)
                );

                ts.setEmitFlags(statement, ts.EmitFlags.CustomPrologue);

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

    function setLexicalEnvironmentFlags(flags: ts.LexicalEnvironmentFlags, value: boolean): void {
        lexicalEnvironmentFlags = value ?
            lexicalEnvironmentFlags | flags :
            lexicalEnvironmentFlags & ~flags;
    }

    function getLexicalEnvironmentFlags(): ts.LexicalEnvironmentFlags {
        return lexicalEnvironmentFlags;
    }

    /**
     * Starts a block scope. Any existing block hoisted variables are pushed onto the stack and the related storage variables are reset.
     */
    function startBlockScope() {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot start a block scope during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot start a block scope after transformation has completed.");
        blockScopedVariableDeclarationsStack[blockScopeStackOffset] = blockScopedVariableDeclarations;
        blockScopeStackOffset++;
        blockScopedVariableDeclarations = undefined!;
    }

    /**
     * Ends a block scope. The previous set of block hoisted variables are restored. Any hoisted declarations are returned.
     */
    function endBlockScope() {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot end a block scope during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot end a block scope after transformation has completed.");
        const statements: ts.Statement[] | undefined = ts.some(blockScopedVariableDeclarations) ?
            [
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList(
                        blockScopedVariableDeclarations.map(identifier => factory.createVariableDeclaration(identifier)),
                        ts.NodeFlags.Let
                    )
                )
            ] : undefined;
        blockScopeStackOffset--;
        blockScopedVariableDeclarations = blockScopedVariableDeclarationsStack[blockScopeStackOffset];
        if (blockScopeStackOffset === 0) {
            blockScopedVariableDeclarationsStack = [];
        }
        return statements;
    }

    function addBlockScopedVariable(name: ts.Identifier): void {
        ts.Debug.assert(blockScopeStackOffset > 0, "Cannot add a block scoped variable outside of an iteration body.");
        (blockScopedVariableDeclarations || (blockScopedVariableDeclarations = [])).push(name);
    }

    function requestEmitHelper(helper: ts.EmitHelper): void {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the transformation context during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
        ts.Debug.assert(!helper.scoped, "Cannot request a scoped emit helper.");
        if (helper.dependencies) {
            for (const h of helper.dependencies) {
                requestEmitHelper(h);
            }
        }
        emitHelpers = ts.append(emitHelpers, helper);
    }

    function readEmitHelpers(): ts.EmitHelper[] | undefined {
        ts.Debug.assert(state > TransformationState.Uninitialized, "Cannot modify the transformation context during initialization.");
        ts.Debug.assert(state < TransformationState.Completed, "Cannot modify the transformation context after transformation has completed.");
        const helpers = emitHelpers;
        emitHelpers = undefined;
        return helpers;
    }

    function dispose() {
        if (state < TransformationState.Disposed) {
            // Clean up emit nodes on parse tree
            for (const node of nodes) {
                ts.disposeEmitNodes(ts.getSourceFileOfNode(ts.getParseTreeNode(node)));
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

export const nullTransformationContext: ts.TransformationContext = {
    factory: ts.factory, // eslint-disable-line object-shorthand
    getCompilerOptions: () => ({}),
    getEmitResolver: ts.notImplemented,
    getEmitHost: ts.notImplemented,
    getEmitHelperFactory: ts.notImplemented,
    startLexicalEnvironment: ts.noop,
    resumeLexicalEnvironment: ts.noop,
    suspendLexicalEnvironment: ts.noop,
    endLexicalEnvironment: ts.returnUndefined,
    setLexicalEnvironmentFlags: ts.noop,
    getLexicalEnvironmentFlags: () => 0,
    hoistVariableDeclaration: ts.noop,
    hoistFunctionDeclaration: ts.noop,
    addInitializationStatement: ts.noop,
    startBlockScope: ts.noop,
    endBlockScope: ts.returnUndefined,
    addBlockScopedVariable: ts.noop,
    requestEmitHelper: ts.noop,
    readEmitHelpers: ts.notImplemented,
    enableSubstitution: ts.noop,
    enableEmitNotification: ts.noop,
    isSubstitutionEnabled: ts.notImplemented,
    isEmitNotificationEnabled: ts.notImplemented,
    onSubstituteNode: noEmitSubstitution,
    onEmitNode: noEmitNotification,
    addDiagnostic: ts.noop,
};
}
