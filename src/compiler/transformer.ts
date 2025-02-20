import {
    addRange,
    append,
    Bundle,
    chainBundle,
    CompilerOptions,
    createEmitHelperFactory,
    CustomTransformer,
    CustomTransformerFactory,
    CustomTransformers,
    Debug,
    DiagnosticWithLocation,
    disposeEmitNodes,
    EmitFlags,
    EmitHelper,
    EmitHint,
    EmitHost,
    EmitOnly,
    EmitResolver,
    EmitTransformers,
    emptyArray,
    factory,
    FunctionDeclaration,
    getEmitFlags,
    getEmitModuleKind,
    getEmitScriptTarget,
    getJSXTransformEnabled,
    getParseTreeNode,
    getSourceFileOfNode,
    getUseDefineForClassFields,
    Identifier,
    isBundle,
    isSourceFile,
    LexicalEnvironmentFlags,
    map,
    memoize,
    ModuleKind,
    Node,
    NodeFactory,
    NodeFlags,
    noop,
    notImplemented,
    returnUndefined,
    ScriptTarget,
    setEmitFlags,
    some,
    SourceFile,
    Statement,
    SyntaxKind,
    tracing,
    TransformationContext,
    TransformationResult,
    transformClassFields,
    transformDeclarations,
    transformECMAScriptModule,
    Transformer,
    TransformerFactory,
    transformES2015,
    transformES2016,
    transformES2017,
    transformES2018,
    transformES2019,
    transformES2020,
    transformES2021,
    transformESDecorators,
    transformESNext,
    transformGenerators,
    transformImpliedNodeFormatDependentModule,
    transformJsx,
    transformLegacyDecorators,
    transformModule,
    transformSystemModule,
    transformTypeScript,
    VariableDeclaration,
} from "./_namespaces/ts.js";
import * as performance from "./_namespaces/ts.performance.js";

function getModuleTransformer(moduleKind: ModuleKind): TransformerFactory<SourceFile | Bundle> {
    switch (moduleKind) {
        case ModuleKind.Preserve:
            // `transformECMAScriptModule` contains logic for preserving
            // CJS input syntax in `--module preserve`
            return transformECMAScriptModule;
        case ModuleKind.ESNext:
        case ModuleKind.ES2022:
        case ModuleKind.ES2020:
        case ModuleKind.ES2015:
        case ModuleKind.Node16:
        case ModuleKind.Node18:
        case ModuleKind.NodeNext:
        case ModuleKind.CommonJS:
            // Wraps `transformModule` and `transformECMAScriptModule` and
            // selects between them based on the `impliedNodeFormat` of the
            // source file.
            return transformImpliedNodeFormatDependentModule;
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
    Disposed,
}

const enum SyntaxKindFeatureFlags {
    Substitution = 1 << 0,
    EmitNotifications = 1 << 1,
}

/** @internal */
export const noTransformers: EmitTransformers = { scriptTransformers: emptyArray, declarationTransformers: emptyArray };

/** @internal */
export function getTransformers(compilerOptions: CompilerOptions, customTransformers?: CustomTransformers, emitOnly?: boolean | EmitOnly): EmitTransformers {
    return {
        scriptTransformers: getScriptTransformers(compilerOptions, customTransformers, emitOnly),
        declarationTransformers: getDeclarationTransformers(customTransformers),
    };
}

function getScriptTransformers(compilerOptions: CompilerOptions, customTransformers?: CustomTransformers, emitOnly?: boolean | EmitOnly) {
    if (emitOnly) return emptyArray;

    const languageVersion = getEmitScriptTarget(compilerOptions);
    const moduleKind = getEmitModuleKind(compilerOptions);
    const useDefineForClassFields = getUseDefineForClassFields(compilerOptions);
    const transformers: TransformerFactory<SourceFile | Bundle>[] = [];

    addRange(transformers, customTransformers && map(customTransformers.before, wrapScriptTransformerFactory));

    transformers.push(transformTypeScript);

    if (compilerOptions.experimentalDecorators) {
        transformers.push(transformLegacyDecorators);
    }

    if (getJSXTransformEnabled(compilerOptions)) {
        transformers.push(transformJsx);
    }

    if (languageVersion < ScriptTarget.ESNext) {
        transformers.push(transformESNext);
    }

    if (!compilerOptions.experimentalDecorators && (languageVersion < ScriptTarget.ESNext || !useDefineForClassFields)) {
        transformers.push(transformESDecorators);
    }

    transformers.push(transformClassFields);

    if (languageVersion < ScriptTarget.ES2021) {
        transformers.push(transformES2021);
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
function wrapCustomTransformerFactory<T extends SourceFile | Bundle>(transformer: TransformerFactory<T> | CustomTransformerFactory, handleDefault: (context: TransformationContext, tx: Transformer<T>) => Transformer<Bundle | SourceFile>): TransformerFactory<Bundle | SourceFile> {
    return context => {
        const customTransformer = transformer(context);
        return typeof customTransformer === "function"
            ? handleDefault(context, customTransformer)
            : wrapCustomTransformer(customTransformer);
    };
}

function wrapScriptTransformerFactory(transformer: TransformerFactory<SourceFile> | CustomTransformerFactory): TransformerFactory<Bundle | SourceFile> {
    return wrapCustomTransformerFactory(transformer, chainBundle);
}

function wrapDeclarationTransformerFactory(transformer: TransformerFactory<Bundle | SourceFile> | CustomTransformerFactory): TransformerFactory<Bundle | SourceFile> {
    return wrapCustomTransformerFactory(transformer, (_, node) => node);
}

/** @internal */
export function noEmitSubstitution(_hint: EmitHint, node: Node): Node {
    return node;
}

/** @internal */
export function noEmitNotification(hint: EmitHint, node: Node, callback: (hint: EmitHint, node: Node) => void): void {
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
 *
 * @internal
 */
export function transformNodes<T extends Node>(resolver: EmitResolver | undefined, host: EmitHost | undefined, factory: NodeFactory, options: CompilerOptions, nodes: readonly T[], transformers: readonly TransformerFactory<T>[], allowDtsFiles: boolean): TransformationResult<T> {
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
    let blockScopedVariableDeclarationsStack: Identifier[][] = [];
    let blockScopeStackOffset = 0;
    let blockScopedVariableDeclarations: Identifier[];
    let emitHelpers: EmitHelper[] | undefined;
    let onSubstituteNode: TransformationContext["onSubstituteNode"] = noEmitSubstitution;
    let onEmitNode: TransformationContext["onEmitNode"] = noEmitNotification;
    let state = TransformationState.Uninitialized;
    const diagnostics: DiagnosticWithLocation[] = [];

    // The transformation context is provided to each transformer as part of transformer
    // initialization.
    const context: TransformationContext = {
        factory,
        getCompilerOptions: () => options,
        getEmitResolver: () => resolver!, // TODO: GH#18217
        getEmitHost: () => host!, // TODO: GH#18217
        getEmitHelperFactory: memoize(() => createEmitHelperFactory(context)),
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
        get onSubstituteNode() {
            return onSubstituteNode;
        },
        set onSubstituteNode(value) {
            Debug.assert(state < TransformationState.Initialized, "Cannot modify transformation hooks after initialization has completed.");
            Debug.assert(value !== undefined, "Value must not be 'undefined'");
            onSubstituteNode = value;
        },
        get onEmitNode() {
            return onEmitNode;
        },
        set onEmitNode(value) {
            Debug.assert(state < TransformationState.Initialized, "Cannot modify transformation hooks after initialization has completed.");
            Debug.assert(value !== undefined, "Value must not be 'undefined'");
            onEmitNode = value;
        },
        addDiagnostic(diag) {
            diagnostics.push(diag);
        },
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
    const transformed: T[] = [];
    for (const node of nodes) {
        tracing?.push(tracing.Phase.Emit, "transformNodes", node.kind === SyntaxKind.SourceFile ? { path: (node as any as SourceFile).path } : { kind: node.kind, pos: node.pos, end: node.end });
        transformed.push((allowDtsFiles ? transformation : transformRoot)(node));
        tracing?.pop();
    }

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
        diagnostics,
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
        const decl = setEmitFlags(factory.createVariableDeclaration(name), EmitFlags.NoNestedSourceMaps);
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
        if (
            lexicalEnvironmentVariableDeclarations ||
            lexicalEnvironmentFunctionDeclarations ||
            lexicalEnvironmentStatements
        ) {
            if (lexicalEnvironmentFunctionDeclarations) {
                statements = [...lexicalEnvironmentFunctionDeclarations];
            }

            if (lexicalEnvironmentVariableDeclarations) {
                const statement = factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList(lexicalEnvironmentVariableDeclarations),
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

    /**
     * Starts a block scope. Any existing block hoisted variables are pushed onto the stack and the related storage variables are reset.
     */
    function startBlockScope() {
        Debug.assert(state > TransformationState.Uninitialized, "Cannot start a block scope during initialization.");
        Debug.assert(state < TransformationState.Completed, "Cannot start a block scope after transformation has completed.");
        blockScopedVariableDeclarationsStack[blockScopeStackOffset] = blockScopedVariableDeclarations;
        blockScopeStackOffset++;
        blockScopedVariableDeclarations = undefined!;
    }

    /**
     * Ends a block scope. The previous set of block hoisted variables are restored. Any hoisted declarations are returned.
     */
    function endBlockScope() {
        Debug.assert(state > TransformationState.Uninitialized, "Cannot end a block scope during initialization.");
        Debug.assert(state < TransformationState.Completed, "Cannot end a block scope after transformation has completed.");
        const statements: Statement[] | undefined = some(blockScopedVariableDeclarations) ?
            [
                factory.createVariableStatement(
                    /*modifiers*/ undefined,
                    factory.createVariableDeclarationList(
                        blockScopedVariableDeclarations.map(identifier => factory.createVariableDeclaration(identifier)),
                        NodeFlags.Let,
                    ),
                ),
            ] : undefined;
        blockScopeStackOffset--;
        blockScopedVariableDeclarations = blockScopedVariableDeclarationsStack[blockScopeStackOffset];
        if (blockScopeStackOffset === 0) {
            blockScopedVariableDeclarationsStack = [];
        }
        return statements;
    }

    function addBlockScopedVariable(name: Identifier): void {
        Debug.assert(blockScopeStackOffset > 0, "Cannot add a block scoped variable outside of an iteration body.");
        (blockScopedVariableDeclarations || (blockScopedVariableDeclarations = [])).push(name);
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

/** @internal */
export const nullTransformationContext: TransformationContext = {
    factory: factory, // eslint-disable-line object-shorthand
    getCompilerOptions: () => ({}),
    getEmitResolver: notImplemented,
    getEmitHost: notImplemented,
    getEmitHelperFactory: notImplemented,
    startLexicalEnvironment: noop,
    resumeLexicalEnvironment: noop,
    suspendLexicalEnvironment: noop,
    endLexicalEnvironment: returnUndefined,
    setLexicalEnvironmentFlags: noop,
    getLexicalEnvironmentFlags: () => 0,
    hoistVariableDeclaration: noop,
    hoistFunctionDeclaration: noop,
    addInitializationStatement: noop,
    startBlockScope: noop,
    endBlockScope: returnUndefined,
    addBlockScopedVariable: noop,
    requestEmitHelper: noop,
    readEmitHelpers: notImplemented,
    enableSubstitution: noop,
    enableEmitNotification: noop,
    isSubstitutionEnabled: notImplemented,
    isEmitNotificationEnabled: notImplemented,
    onSubstituteNode: noEmitSubstitution,
    onEmitNode: noEmitNotification,
    addDiagnostic: noop,
};
