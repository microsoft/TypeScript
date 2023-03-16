import { Node, NodeFactory, CompilerOptions, TransformerFactory, TransformationResult, SyntaxKind, VariableDeclaration, FunctionDeclaration, Statement, Identifier, EmitHelper, DiagnosticWithLocation, disposeEmitNodes, getParseTreeNode, SourceFile, isSourceFile, EmitFlags, EmitHint, setEmitFlags, NodeFlags } from "typescript";
import { Debug } from "./debug";
import { some, append } from "./lang-utils";
import { EmitResolver, EmitHost, TransformationContext } from "./types";
import { getEmitFlags, getSourceFileOfNode } from "./utils";

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
        factory: factory as TransformationContext['factory'],
        getCompilerOptions: () => options,
        getEmitResolver: () => resolver!, // TODO: GH#18217
        getEmitHost: () => host!, // TODO: GH#18217
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
            console.log(diag.messageText);
        },
        getEmitHelperFactory() {
            return factory;
        },
    };

    // Ensure the parse tree is clean before applying transformations
    for (const node of nodes) {
        disposeEmitNodes(getSourceFileOfNode(getParseTreeNode(node)));
    }


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
        transformed.push((allowDtsFiles ? transformation : transformRoot)(node));
    }

    // prevent modification of the lexical environment.
    state = TransformationState.Completed;

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
                        NodeFlags.Let
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


/** @internal */
export const enum LexicalEnvironmentFlags {
    None = 0,
    InParameters = 1 << 0, // currently visiting a parameter list
    VariablesHoistedInParameters = 1 << 1 // a temp variable was hoisted while visiting a parameter list
}

/** @internal */
export function noEmitSubstitution(_hint: EmitHint, node: Node) {
    return node;
}

/** @internal */
export function noEmitNotification(hint: EmitHint, node: Node, callback: (hint: EmitHint, node: Node) => void) {
    callback(hint, node);
}