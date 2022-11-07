namespace ts {
/**
 * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
 *
 * @param node The Node to visit.
 * @param visitor The callback used to visit the Node.
 * @param test A callback to execute to verify the Node is valid.
 * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
 */
export function visitNode<T extends ts.Node>(node: T, visitor: ts.Visitor | undefined, test?: (node: ts.Node) => boolean, lift?: (node: readonly ts.Node[]) => T): T;

/**
 * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
 *
 * @param node The Node to visit.
 * @param visitor The callback used to visit the Node.
 * @param test A callback to execute to verify the Node is valid.
 * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
 */
export function visitNode<T extends ts.Node>(node: T | undefined, visitor: ts.Visitor | undefined, test?: (node: ts.Node) => boolean, lift?: (node: readonly ts.Node[]) => T): T | undefined;

export function visitNode<T extends ts.Node>(node: T | undefined, visitor: ts.Visitor | undefined, test?: (node: ts.Node) => boolean, lift?: (node: readonly ts.Node[]) => T): T | undefined {
    if (node === undefined || visitor === undefined) {
        return node;
    }

    const visited = visitor(node);
    if (visited === node) {
        return node;
    }

    let visitedNode: ts.Node | undefined;
    if (visited === undefined) {
        return undefined;
    }
    else if (ts.isArray(visited)) {
        visitedNode = (lift || extractSingleNode)(visited);
    }
    else {
        visitedNode = visited;
    }

    ts.Debug.assertNode(visitedNode, test);
    return visitedNode as T;
}

/* @internal */
export function visitNodes<T extends ts.Node, U extends T>(nodes: ts.NodeArray<T>, visitor: ts.Visitor, test: (node: ts.Node) => node is U, start?: number, count?: number): ts.NodeArray<U>;

/**
 * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
 *
 * @param nodes The NodeArray to visit.
 * @param visitor The callback used to visit a Node.
 * @param test A node test to execute for each node.
 * @param start An optional value indicating the starting offset at which to start visiting.
 * @param count An optional value indicating the maximum number of nodes to visit.
 */
export function visitNodes<T extends ts.Node>(nodes: ts.NodeArray<T>, visitor: ts.Visitor | undefined, test?: (node: ts.Node) => boolean, start?: number, count?: number): ts.NodeArray<T>;

/* @internal */
export function visitNodes<T extends ts.Node, U extends T>(nodes: ts.NodeArray<T> | undefined, visitor: ts.Visitor, test: (node: ts.Node) => node is U, start?: number, count?: number): ts.NodeArray<U> | undefined;

/**
 * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
 *
 * @param nodes The NodeArray to visit.
 * @param visitor The callback used to visit a Node.
 * @param test A node test to execute for each node.
 * @param start An optional value indicating the starting offset at which to start visiting.
 * @param count An optional value indicating the maximum number of nodes to visit.
 */
export function visitNodes<T extends ts.Node>(nodes: ts.NodeArray<T> | undefined, visitor: ts.Visitor | undefined, test?: (node: ts.Node) => boolean, start?: number, count?: number): ts.NodeArray<T> | undefined;

/**
 * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
 *
 * @param nodes The NodeArray to visit.
 * @param visitor The callback used to visit a Node.
 * @param test A node test to execute for each node.
 * @param start An optional value indicating the starting offset at which to start visiting.
 * @param count An optional value indicating the maximum number of nodes to visit.
 */
export function visitNodes<T extends ts.Node>(nodes: ts.NodeArray<T> | undefined, visitor: ts.Visitor | undefined, test?: (node: ts.Node) => boolean, start?: number, count?: number): ts.NodeArray<T> | undefined {
    if (nodes === undefined || visitor === undefined) {
        return nodes;
    }

    // Ensure start and count have valid values
    const length = nodes.length;
    if (start === undefined || start < 0) {
        start = 0;
    }

    if (count === undefined || count > length - start) {
        count = length - start;
    }

    let hasTrailingComma: boolean | undefined;
    let pos = -1;
    let end = -1;
    if (start > 0 || count < length) {
        // Since this is a fragment of a node array, we do not copy over the previous location
        // and will only copy over `hasTrailingComma` if we are including the last element.
        hasTrailingComma = nodes.hasTrailingComma && start + count === length;
    }
    else {
        pos = nodes.pos;
        end = nodes.end;
        hasTrailingComma = nodes.hasTrailingComma;
    }

    const updated = visitArrayWorker(nodes, visitor, test, start, count);
    if (updated !== nodes as readonly T[]) {
        // TODO(rbuckton): Remove dependency on `ts.factory` in favor of a provided factory.
        const updatedArray = ts.factory.createNodeArray(updated, hasTrailingComma);
        ts.setTextRangePosEnd(updatedArray, pos, end);
        return updatedArray;
    }

    return nodes;
}

/* @internal */
export function visitArray<T extends ts.Node, U extends T>(nodes: T[] | undefined, visitor: ts.Visitor, test: (node: ts.Node) => node is U, start?: number, count?: number): U[] | undefined;
/* @internal */
export function visitArray<T extends ts.Node, U extends T>(nodes: readonly T[] | undefined, visitor: ts.Visitor, test: (node: ts.Node) => node is U, start?: number, count?: number): readonly U[] | undefined;
/* @internal */
export function visitArray<T extends ts.Node>(nodes: T[] | undefined, visitor: ts.Visitor, test: (node: ts.Node) => node is T, start?: number, count?: number): T[] | undefined;
/* @internal */
export function visitArray<T extends ts.Node>(nodes: readonly T[] | undefined, visitor: ts.Visitor, test: (node: ts.Node) => node is T, start?: number, count?: number): readonly T[] | undefined;
export function visitArray<T extends ts.Node, U extends T>(nodes: readonly T[] | undefined, visitor: ts.Visitor, test: (node: ts.Node) => node is U, start?: number, count?: number) {
    if (nodes === undefined) {
        return nodes;
    }

    // Ensure start and count have valid values
    const length = nodes.length;
    if (start === undefined || start < 0) {
        start = 0;
    }

    if (count === undefined || count > length - start) {
        count = length - start;
    }

    return visitArrayWorker(nodes, visitor, test, start, count) as readonly U[];
}

/* @internal */
function visitArrayWorker<T extends ts.Node>(nodes: readonly T[], visitor: ts.Visitor, test: ((node: ts.Node) => boolean) | undefined, start: number, count: number): readonly T[] | undefined {
    let updated: T[] | undefined;

    const length = nodes.length;
    if (start > 0 || count < length) {
        // If we are not visiting all of the original nodes, we must always create a new array.
        updated = [];
    }

    // Visit each original node.
    for (let i = 0; i < count; i++) {
        const node: T = nodes[i + start];
        const visited = node !== undefined ? visitor(node) : undefined;
        if (updated !== undefined || visited === undefined || visited !== node) {
            if (updated === undefined) {
                // Ensure we have a copy of `nodes`, up to the current index.
                updated = nodes.slice(0, i);
            }
            if (visited) {
                if (ts.isArray(visited)) {
                    for (const visitedNode of visited) {
                        void ts.Debug.assertNode(visitedNode, test);
                        updated.push(visitedNode as T);
                    }
                }
                else {
                    void ts.Debug.assertNode(visited, test);
                    updated.push(visited as T);
                }
            }
        }
    }

    return updated ?? nodes;
}

/**
 * Starts a new lexical environment and visits a statement list, ending the lexical environment
 * and merging hoisted declarations upon completion.
 */
export function visitLexicalEnvironment(statements: ts.NodeArray<ts.Statement>, visitor: ts.Visitor, context: ts.TransformationContext, start?: number, ensureUseStrict?: boolean, nodesVisitor: ts.NodesVisitor = visitNodes) {
    context.startLexicalEnvironment();
    statements = nodesVisitor(statements, visitor, ts.isStatement, start);
    if (ensureUseStrict) statements = context.factory.ensureUseStrict(statements);
    return ts.factory.mergeLexicalEnvironment(statements, context.endLexicalEnvironment());
}

/**
 * Starts a new lexical environment and visits a parameter list, suspending the lexical
 * environment upon completion.
 */
export function visitParameterList(nodes: ts.NodeArray<ts.ParameterDeclaration>, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor?: ts.NodesVisitor): ts.NodeArray<ts.ParameterDeclaration>;
export function visitParameterList(nodes: ts.NodeArray<ts.ParameterDeclaration> | undefined, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor?: ts.NodesVisitor): ts.NodeArray<ts.ParameterDeclaration> | undefined;
export function visitParameterList(nodes: ts.NodeArray<ts.ParameterDeclaration> | undefined, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor = visitNodes) {
    let updated: ts.NodeArray<ts.ParameterDeclaration> | undefined;
    context.startLexicalEnvironment();
    if (nodes) {
        context.setLexicalEnvironmentFlags(ts.LexicalEnvironmentFlags.InParameters, true);
        updated = nodesVisitor(nodes, visitor, ts.isParameterDeclaration);

        // As of ES2015, any runtime execution of that occurs in for a parameter (such as evaluating an
        // initializer or a binding pattern), occurs in its own lexical scope. As a result, any expression
        // that we might transform that introduces a temporary variable would fail as the temporary variable
        // exists in a different lexical scope. To address this, we move any binding patterns and initializers
        // in a parameter list to the body if we detect a variable being hoisted while visiting a parameter list
        // when the emit target is greater than ES2015.
        if (context.getLexicalEnvironmentFlags() & ts.LexicalEnvironmentFlags.VariablesHoistedInParameters &&
            ts.getEmitScriptTarget(context.getCompilerOptions()) >= ts.ScriptTarget.ES2015) {
            updated = addDefaultValueAssignmentsIfNeeded(updated, context);
        }
        context.setLexicalEnvironmentFlags(ts.LexicalEnvironmentFlags.InParameters, false);
    }
    context.suspendLexicalEnvironment();
    return updated;
}

function addDefaultValueAssignmentsIfNeeded(parameters: ts.NodeArray<ts.ParameterDeclaration>, context: ts.TransformationContext) {
    let result: ts.ParameterDeclaration[] | undefined;
    for (let i = 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        const updated = addDefaultValueAssignmentIfNeeded(parameter, context);
        if (result || updated !== parameter) {
            if (!result) result = parameters.slice(0, i);
            result[i] = updated;
        }
    }
    if (result) {
        return ts.setTextRange(context.factory.createNodeArray(result, parameters.hasTrailingComma), parameters);
    }
    return parameters;
}

function addDefaultValueAssignmentIfNeeded(parameter: ts.ParameterDeclaration, context: ts.TransformationContext) {
    // A rest parameter cannot have a binding pattern or an initializer,
    // so let's just ignore it.
    return parameter.dotDotDotToken ? parameter :
        ts.isBindingPattern(parameter.name) ? addDefaultValueAssignmentForBindingPattern(parameter, context) :
        parameter.initializer ? addDefaultValueAssignmentForInitializer(parameter, parameter.name, parameter.initializer, context) :
        parameter;
}

function addDefaultValueAssignmentForBindingPattern(parameter: ts.ParameterDeclaration, context: ts.TransformationContext) {
    const { factory } = context;
    context.addInitializationStatement(
        factory.createVariableStatement(
            /*modifiers*/ undefined,
            factory.createVariableDeclarationList([
                factory.createVariableDeclaration(
                    parameter.name,
                    /*exclamationToken*/ undefined,
                    parameter.type,
                    parameter.initializer ?
                        factory.createConditionalExpression(
                            factory.createStrictEquality(
                                factory.getGeneratedNameForNode(parameter),
                                factory.createVoidZero()
                            ),
                            /*questionToken*/ undefined,
                            parameter.initializer,
                            /*colonToken*/ undefined,
                            factory.getGeneratedNameForNode(parameter)
                        ) :
                        factory.getGeneratedNameForNode(parameter)
                ),
            ])
        )
    );
    return factory.updateParameterDeclaration(parameter,
        parameter.modifiers,
        parameter.dotDotDotToken,
        factory.getGeneratedNameForNode(parameter),
        parameter.questionToken,
        parameter.type,
        /*initializer*/ undefined);
}

function addDefaultValueAssignmentForInitializer(parameter: ts.ParameterDeclaration, name: ts.Identifier, initializer: ts.Expression, context: ts.TransformationContext) {
    const factory = context.factory;
    context.addInitializationStatement(
        factory.createIfStatement(
            factory.createTypeCheck(factory.cloneNode(name), "undefined"),
            ts.setEmitFlags(
                ts.setTextRange(
                    factory.createBlock([
                        factory.createExpressionStatement(
                            ts.setEmitFlags(
                                ts.setTextRange(
                                    factory.createAssignment(
                                        ts.setEmitFlags(factory.cloneNode(name), ts.EmitFlags.NoSourceMap),
                                        ts.setEmitFlags(initializer, ts.EmitFlags.NoSourceMap | ts.getEmitFlags(initializer) | ts.EmitFlags.NoComments)
                                    ),
                                    parameter
                                ),
                                ts.EmitFlags.NoComments
                            )
                        )
                    ]),
                    parameter
                ),
                ts.EmitFlags.SingleLine | ts.EmitFlags.NoTrailingSourceMap | ts.EmitFlags.NoTokenSourceMaps | ts.EmitFlags.NoComments
            )
        )
    );
    return factory.updateParameterDeclaration(parameter,
        parameter.modifiers,
        parameter.dotDotDotToken,
        parameter.name,
        parameter.questionToken,
        parameter.type,
        /*initializer*/ undefined);
}

/**
 * Resumes a suspended lexical environment and visits a function body, ending the lexical
 * environment and merging hoisted declarations upon completion.
 */
export function visitFunctionBody(node: ts.FunctionBody, visitor: ts.Visitor, context: ts.TransformationContext): ts.FunctionBody;
/**
 * Resumes a suspended lexical environment and visits a function body, ending the lexical
 * environment and merging hoisted declarations upon completion.
 */
export function visitFunctionBody(node: ts.FunctionBody | undefined, visitor: ts.Visitor, context: ts.TransformationContext): ts.FunctionBody | undefined;
/**
 * Resumes a suspended lexical environment and visits a concise body, ending the lexical
 * environment and merging hoisted declarations upon completion.
 */
export function visitFunctionBody(node: ts.ConciseBody, visitor: ts.Visitor, context: ts.TransformationContext): ts.ConciseBody;
/* @internal*/ export function visitFunctionBody(node: ts.FunctionBody, visitor: ts.Visitor, context: ts.TransformationContext, nodeVisitor?: ts.NodeVisitor): ts.FunctionBody; // eslint-disable-line @typescript-eslint/unified-signatures
/* @internal*/ export function visitFunctionBody(node: ts.FunctionBody | undefined, visitor: ts.Visitor, context: ts.TransformationContext, nodeVisitor?: ts.NodeVisitor): ts.FunctionBody | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
/* @internal*/ export function visitFunctionBody(node: ts.ConciseBody, visitor: ts.Visitor, context: ts.TransformationContext, nodeVisitor?: ts.NodeVisitor): ts.ConciseBody; // eslint-disable-line @typescript-eslint/unified-signatures
export function visitFunctionBody(node: ts.ConciseBody | undefined, visitor: ts.Visitor, context: ts.TransformationContext, nodeVisitor: ts.NodeVisitor = visitNode): ts.ConciseBody | undefined {
    context.resumeLexicalEnvironment();
    const updated = nodeVisitor(node, visitor, ts.isConciseBody);
    const declarations = context.endLexicalEnvironment();
    if (ts.some(declarations)) {
        if (!updated) {
            return context.factory.createBlock(declarations);
        }
        const block = context.factory.converters.convertToFunctionBlock(updated);
        const statements = ts.factory.mergeLexicalEnvironment(block.statements, declarations);
        return context.factory.updateBlock(block, statements);
    }
    return updated;
}

/**
 * Visits an iteration body, adding any block-scoped variables required by the transformation.
 */
export function visitIterationBody(body: ts.Statement, visitor: ts.Visitor, context: ts.TransformationContext): ts.Statement;
/* @internal */
export function visitIterationBody(body: ts.Statement, visitor: ts.Visitor, context: ts.TransformationContext, nodeVisitor?: ts.NodeVisitor): ts.Statement; // eslint-disable-line @typescript-eslint/unified-signatures
export function visitIterationBody(body: ts.Statement, visitor: ts.Visitor, context: ts.TransformationContext, nodeVisitor: ts.NodeVisitor = visitNode): ts.Statement {
    context.startBlockScope();
    const updated = nodeVisitor(body, visitor, ts.isStatement, context.factory.liftToBlock);
    const declarations = context.endBlockScope();
    if (ts.some(declarations)) {
        if (ts.isBlock(updated)) {
            declarations.push(...updated.statements);
            return context.factory.updateBlock(updated, declarations);
        }
        declarations.push(updated);
        return context.factory.createBlock(declarations);
    }
    return updated;
}

/**
 * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
 *
 * @param node The Node whose children will be visited.
 * @param visitor The callback used to visit each child.
 * @param context A lexical environment context for the visitor.
 */
export function visitEachChild<T extends ts.Node>(node: T, visitor: ts.Visitor, context: ts.TransformationContext): T;
/* @internal */
export function visitEachChild<T extends ts.Node>(node: T, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor?: ts.NodesVisitor, tokenVisitor?: ts.Visitor, nodeVisitor?: ts.NodeVisitor): T; // eslint-disable-line @typescript-eslint/unified-signatures
/**
 * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
 *
 * @param node The Node whose children will be visited.
 * @param visitor The callback used to visit each child.
 * @param context A lexical environment context for the visitor.
 */
export function visitEachChild<T extends ts.Node>(node: T | undefined, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor?: typeof visitNodes, tokenVisitor?: ts.Visitor): T | undefined;
/* @internal */
export function visitEachChild<T extends ts.Node>(node: T | undefined, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor?: ts.NodesVisitor, tokenVisitor?: ts.Visitor, nodeVisitor?: ts.NodeVisitor): T | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
export function visitEachChild<T extends ts.Node>(node: T | undefined, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor = visitNodes, tokenVisitor?: ts.Visitor, nodeVisitor: ts.NodeVisitor = visitNode): T | undefined {
    if (node === undefined) {
        return undefined;
    }

    const fn = (visitEachChildTable as Record<ts.SyntaxKind, VisitEachChildFunction<any> | undefined>)[node.kind];
    return fn === undefined ? node : fn(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor);
}

type VisitEachChildFunction<T extends ts.Node> = (node: T, visitor: ts.Visitor, context: ts.TransformationContext, nodesVisitor: ts.NodesVisitor, nodeVisitor: ts.NodeVisitor, tokenVisitor: ts.Visitor | undefined) => T;

// A type that correlates a `SyntaxKind` to a `VisitEachChildFunction<T>`, for nodes in the `HasChildren` union.
// This looks something like:
//
//  {
//      [SyntaxKind.Identifier]: VisitEachChildFunction<Identifier>;
//      [SyntaxKind.QualifiedName]: VisitEachChildFunction<QualifiedName>;
//      [SyntaxKind.ComputedPropertyName]: VisitEachChildFunction<ComputedPropertyName>;
//      ...
//  }
//
// This is then used as the expected type for `visitEachChildTable`.
type VisitEachChildTable = { [TNode in ts.VisitEachChildNodes as TNode["kind"]]: VisitEachChildFunction<TNode> };

// NOTE: Before you can add a new method to `visitEachChildTable`, you must first ensure the `Node` subtype you
//       wish to add is defined in the `HasChildren` union in types.ts.
const visitEachChildTable: VisitEachChildTable = {
    [ts.SyntaxKind.Identifier]: function visitEachChildOfIdentifier(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateIdentifier(node,
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNodeOrTypeParameterDeclaration));
    },

    [ts.SyntaxKind.QualifiedName]: function visitEachChildOfQualifiedName(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateQualifiedName(node,
            nodeVisitor(node.left, visitor, ts.isEntityName),
            nodeVisitor(node.right, visitor, ts.isIdentifier));
    },

    [ts.SyntaxKind.ComputedPropertyName]: function visitEachChildOfComputedPropertyName(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateComputedPropertyName(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    // Signature elements
    [ts.SyntaxKind.TypeParameter]: function visitEachChildOfTypeParameterDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeParameterDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodeVisitor(node.constraint, visitor, ts.isTypeNode),
            nodeVisitor(node.default, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.Parameter]: function visitEachChildOfParameterDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateParameterDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifierLike),
            nodeVisitor(node.dotDotDotToken, tokenVisitor, ts.isDotDotDotToken),
            nodeVisitor(node.name, visitor, ts.isBindingName),
            nodeVisitor(node.questionToken, tokenVisitor, ts.isQuestionToken),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            nodeVisitor(node.initializer, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.Decorator]: function visitEachChildOfDecorator(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateDecorator(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    // Type elements
    [ts.SyntaxKind.PropertySignature]: function visitEachChildOfPropertySignature(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updatePropertySignature(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            nodeVisitor(node.questionToken, tokenVisitor, ts.isToken),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.PropertyDeclaration]: function visitEachChildOfPropertyDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updatePropertyDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifierLike),
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            // QuestionToken and ExclamationToken are mutually exclusive in PropertyDeclaration
            nodeVisitor(node.questionToken ?? node.exclamationToken, tokenVisitor, ts.isQuestionOrExclamationToken),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            nodeVisitor(node.initializer, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.MethodSignature]: function visitEachChildOfMethodSignature(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateMethodSignature(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            nodeVisitor(node.questionToken, tokenVisitor, ts.isQuestionToken),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, ts.isParameterDeclaration),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.MethodDeclaration]: function visitEachChildOfMethodDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateMethodDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifierLike),
            nodeVisitor(node.asteriskToken, tokenVisitor, ts.isAsteriskToken),
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            nodeVisitor(node.questionToken, tokenVisitor, ts.isQuestionToken),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.Constructor]: function visitEachChildOfConstructorDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConstructorDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.GetAccessor]: function visitEachChildOfGetAccessorDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateGetAccessorDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifierLike),
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.SetAccessor]: function visitEachChildOfSetAccessorDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSetAccessorDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifierLike),
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.ClassStaticBlockDeclaration]: function visitEachChildOfClassStaticBlockDeclaration(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        context.startLexicalEnvironment();
        context.suspendLexicalEnvironment();
        return context.factory.updateClassStaticBlockDeclaration(node,
            visitFunctionBody(node.body, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.CallSignature]: function visitEachChildOfCallSignatureDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateCallSignature(node,
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, ts.isParameterDeclaration),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.ConstructSignature]: function visitEachChildOfConstructSignatureDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConstructSignature(node,
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, ts.isParameterDeclaration),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.IndexSignature]: function visitEachChildOfIndexSignatureDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateIndexSignature(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodesVisitor(node.parameters, visitor, ts.isParameterDeclaration),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    // Types
    [ts.SyntaxKind.TypePredicate]: function visitEachChildOfTypePredicateNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypePredicateNode(node,
            nodeVisitor(node.assertsModifier, visitor, ts.isAssertsKeyword),
            nodeVisitor(node.parameterName, visitor, ts.isIdentifierOrThisTypeNode),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.TypeReference]: function visitEachChildOfTypeReferenceNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeReferenceNode(node,
            nodeVisitor(node.typeName, visitor, ts.isEntityName),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.FunctionType]: function visitEachChildOfFunctionTypeNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateFunctionTypeNode(node,
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, ts.isParameterDeclaration),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.ConstructorType]: function visitEachChildOfConstructorTypeNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConstructorTypeNode(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, ts.isParameterDeclaration),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.TypeQuery]: function visitEachChildOfTypeQueryNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeQueryNode(node,
            nodeVisitor(node.exprName, visitor, ts.isEntityName),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.TypeLiteral]: function visitEachChildOfTypeLiteralNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeLiteralNode(node,
            nodesVisitor(node.members, visitor, ts.isTypeElement));
    },

    [ts.SyntaxKind.ArrayType]: function visitEachChildOfArrayTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateArrayTypeNode(node,
            nodeVisitor(node.elementType, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.TupleType]: function visitEachChildOfTupleTypeNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateTupleTypeNode(node,
            nodesVisitor(node.elements, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.OptionalType]: function visitEachChildOfOptionalTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateOptionalTypeNode(node,
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.RestType]: function visitEachChildOfRestTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateRestTypeNode(node,
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.UnionType]: function visitEachChildOfUnionTypeNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateUnionTypeNode(node,
            nodesVisitor(node.types, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.IntersectionType]: function visitEachChildOfIntersectionTypeNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateIntersectionTypeNode(node,
            nodesVisitor(node.types, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.ConditionalType]: function visitEachChildOfConditionalTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConditionalTypeNode(node,
            nodeVisitor(node.checkType, visitor, ts.isTypeNode),
            nodeVisitor(node.extendsType, visitor, ts.isTypeNode),
            nodeVisitor(node.trueType, visitor, ts.isTypeNode),
            nodeVisitor(node.falseType, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.InferType]: function visitEachChildOfInferTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateInferTypeNode(node,
            nodeVisitor(node.typeParameter, visitor, ts.isTypeParameterDeclaration));
    },

    [ts.SyntaxKind.ImportType]: function visitEachChildOfImportTypeNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportTypeNode(node,
            nodeVisitor(node.argument, visitor, ts.isTypeNode),
            nodeVisitor(node.assertions, visitor, ts.isImportTypeAssertionContainer),
            nodeVisitor(node.qualifier, visitor, ts.isEntityName),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode),
            node.isTypeOf
        );
    },

    [ts.SyntaxKind.ImportTypeAssertionContainer]: function visitEachChildOfImportTypeAssertionContainer(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportTypeAssertionContainer(node,
            nodeVisitor(node.assertClause, visitor, ts.isAssertClause),
            node.multiLine
        );
    },

    [ts.SyntaxKind.NamedTupleMember]: function visitEachChildOfNamedTupleMember(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateNamedTupleMember(node,
            nodeVisitor(node.dotDotDotToken, tokenVisitor, ts.isDotDotDotToken),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodeVisitor(node.questionToken, tokenVisitor, ts.isQuestionToken),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
        );
    },

    [ts.SyntaxKind.ParenthesizedType]: function visitEachChildOfParenthesizedType(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateParenthesizedType(node,
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.TypeOperator]: function visitEachChildOfTypeOperatorNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeOperatorNode(node,
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.IndexedAccessType]: function visitEachChildOfIndexedAccessType(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateIndexedAccessTypeNode(node,
            nodeVisitor(node.objectType, visitor, ts.isTypeNode),
            nodeVisitor(node.indexType, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.MappedType]: function visitEachChildOfMappedType(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateMappedTypeNode(node,
            nodeVisitor(node.readonlyToken, tokenVisitor, ts.isReadonlyKeywordOrPlusOrMinusToken),
            nodeVisitor(node.typeParameter, visitor, ts.isTypeParameterDeclaration),
            nodeVisitor(node.nameType, visitor, ts.isTypeNode),
            nodeVisitor(node.questionToken, tokenVisitor, ts.isQuestionOrPlusOrMinusToken),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            nodesVisitor(node.members, visitor, ts.isTypeElement));
    },

    [ts.SyntaxKind.LiteralType]: function visitEachChildOfLiteralTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateLiteralTypeNode(node,
            nodeVisitor(node.literal, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.TemplateLiteralType]: function visitEachChildOfTemplateLiteralType(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateLiteralType(node,
            nodeVisitor(node.head, visitor, ts.isTemplateHead),
            nodesVisitor(node.templateSpans, visitor, ts.isTemplateLiteralTypeSpan));
    },

    [ts.SyntaxKind.TemplateLiteralTypeSpan]: function visitEachChildOfTemplateLiteralTypeSpan(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateLiteralTypeSpan(node,
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            nodeVisitor(node.literal, visitor, ts.isTemplateMiddleOrTemplateTail));
    },

    // Binding patterns
    [ts.SyntaxKind.ObjectBindingPattern]: function visitEachChildOfObjectBindingPattern(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateObjectBindingPattern(node,
            nodesVisitor(node.elements, visitor, ts.isBindingElement));
    },

    [ts.SyntaxKind.ArrayBindingPattern]: function visitEachChildOfArrayBindingPattern(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateArrayBindingPattern(node,
            nodesVisitor(node.elements, visitor, ts.isArrayBindingElement));
    },

    [ts.SyntaxKind.BindingElement]: function visitEachChildOfBindingElement(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateBindingElement(node,
            nodeVisitor(node.dotDotDotToken, tokenVisitor, ts.isDotDotDotToken),
            nodeVisitor(node.propertyName, visitor, ts.isPropertyName),
            nodeVisitor(node.name, visitor, ts.isBindingName),
            nodeVisitor(node.initializer, visitor, ts.isExpression));
    },

    // Expression
    [ts.SyntaxKind.ArrayLiteralExpression]: function visitEachChildOfArrayLiteralExpression(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateArrayLiteralExpression(node,
            nodesVisitor(node.elements, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.ObjectLiteralExpression]: function visitEachChildOfObjectLiteralExpression(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateObjectLiteralExpression(node,
            nodesVisitor(node.properties, visitor, ts.isObjectLiteralElementLike));
    },

    [ts.SyntaxKind.PropertyAccessExpression]: function visitEachChildOfPropertyAccessExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return ts.isPropertyAccessChain(node) ?
            context.factory.updatePropertyAccessChain(node,
                nodeVisitor(node.expression, visitor, ts.isExpression),
                nodeVisitor(node.questionDotToken, tokenVisitor, ts.isQuestionDotToken),
                nodeVisitor(node.name, visitor, ts.isMemberName)) :
            context.factory.updatePropertyAccessExpression(node,
                nodeVisitor(node.expression, visitor, ts.isExpression),
                nodeVisitor(node.name, visitor, ts.isMemberName));
    },

    [ts.SyntaxKind.ElementAccessExpression]: function visitEachChildOfElementAccessExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return ts.isElementAccessChain(node) ?
            context.factory.updateElementAccessChain(node,
                nodeVisitor(node.expression, visitor, ts.isExpression),
                nodeVisitor(node.questionDotToken, tokenVisitor, ts.isQuestionDotToken),
                nodeVisitor(node.argumentExpression, visitor, ts.isExpression)) :
            context.factory.updateElementAccessExpression(node,
                nodeVisitor(node.expression, visitor, ts.isExpression),
                nodeVisitor(node.argumentExpression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.CallExpression]: function visitEachChildOfCallExpression(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return ts.isCallChain(node) ?
            context.factory.updateCallChain(node,
                nodeVisitor(node.expression, visitor, ts.isExpression),
                nodeVisitor(node.questionDotToken, tokenVisitor, ts.isQuestionDotToken),
                nodesVisitor(node.typeArguments, visitor, ts.isTypeNode),
                nodesVisitor(node.arguments, visitor, ts.isExpression)) :
            context.factory.updateCallExpression(node,
                nodeVisitor(node.expression, visitor, ts.isExpression),
                nodesVisitor(node.typeArguments, visitor, ts.isTypeNode),
                nodesVisitor(node.arguments, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.NewExpression]: function visitEachChildOfNewExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNewExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode),
            nodesVisitor(node.arguments, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.TaggedTemplateExpression]: function visitEachChildOfTaggedTemplateExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTaggedTemplateExpression(node,
            nodeVisitor(node.tag, visitor, ts.isExpression),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode),
            nodeVisitor(node.template, visitor, ts.isTemplateLiteral));
    },

    [ts.SyntaxKind.TypeAssertionExpression]: function visitEachChildOfTypeAssertionExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeAssertion(node,
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.ParenthesizedExpression]: function visitEachChildOfParenthesizedExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateParenthesizedExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.FunctionExpression]: function visitEachChildOfFunctionExpression(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateFunctionExpression(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.asteriskToken, tokenVisitor, ts.isAsteriskToken),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            visitFunctionBody(node.body, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.ArrowFunction]: function visitEachChildOfArrowFunction(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateArrowFunction(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            nodeVisitor(node.equalsGreaterThanToken, tokenVisitor, ts.isEqualsGreaterThanToken),
            visitFunctionBody(node.body, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.DeleteExpression]: function visitEachChildOfDeleteExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateDeleteExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.TypeOfExpression]: function visitEachChildOfTypeOfExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeOfExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.VoidExpression]: function visitEachChildOfVoidExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateVoidExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.AwaitExpression]: function visitEachChildOfAwaitExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateAwaitExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.PrefixUnaryExpression]: function visitEachChildOfPrefixUnaryExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePrefixUnaryExpression(node,
            nodeVisitor(node.operand, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.PostfixUnaryExpression]: function visitEachChildOfPostfixUnaryExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePostfixUnaryExpression(node,
            nodeVisitor(node.operand, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.BinaryExpression]: function visitEachChildOfBinaryExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateBinaryExpression(node,
            nodeVisitor(node.left, visitor, ts.isExpression),
            nodeVisitor(node.operatorToken, tokenVisitor, ts.isBinaryOperatorToken),
            nodeVisitor(node.right, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.ConditionalExpression]: function visitEachChildOfConditionalExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateConditionalExpression(node,
            nodeVisitor(node.condition, visitor, ts.isExpression),
            nodeVisitor(node.questionToken, tokenVisitor, ts.isQuestionToken),
            nodeVisitor(node.whenTrue, visitor, ts.isExpression),
            nodeVisitor(node.colonToken, tokenVisitor, ts.isColonToken),
            nodeVisitor(node.whenFalse, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.TemplateExpression]: function visitEachChildOfTemplateExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateExpression(node,
            nodeVisitor(node.head, visitor, ts.isTemplateHead),
            nodesVisitor(node.templateSpans, visitor, ts.isTemplateSpan));
    },

    [ts.SyntaxKind.YieldExpression]: function visitEachChildOfYieldExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateYieldExpression(node,
            nodeVisitor(node.asteriskToken, tokenVisitor, ts.isAsteriskToken),
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.SpreadElement]: function visitEachChildOfSpreadElement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSpreadElement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.ClassExpression]: function visitEachChildOfClassExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateClassExpression(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifierLike),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.heritageClauses, visitor, ts.isHeritageClause),
            nodesVisitor(node.members, visitor, ts.isClassElement));
    },

    [ts.SyntaxKind.ExpressionWithTypeArguments]: function visitEachChildOfExpressionWithTypeArguments(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExpressionWithTypeArguments(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.AsExpression]: function visitEachChildOfAsExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateAsExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.SatisfiesExpression]: function visitEachChildOfSatisfiesExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSatisfiesExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.NonNullExpression]: function visitEachChildOfNonNullExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return ts.isOptionalChain(node) ?
            context.factory.updateNonNullChain(node,
                nodeVisitor(node.expression, visitor, ts.isExpression)) :
            context.factory.updateNonNullExpression(node,
                nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.MetaProperty]: function visitEachChildOfMetaProperty(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateMetaProperty(node,
            nodeVisitor(node.name, visitor, ts.isIdentifier));
    },

    // Misc
    [ts.SyntaxKind.TemplateSpan]: function visitEachChildOfTemplateSpan(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateSpan(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodeVisitor(node.literal, visitor, ts.isTemplateMiddleOrTemplateTail));
    },

    // Element
    [ts.SyntaxKind.Block]: function visitEachChildOfBlock(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateBlock(node,
            nodesVisitor(node.statements, visitor, ts.isStatement));
    },

    [ts.SyntaxKind.VariableStatement]: function visitEachChildOfVariableStatement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateVariableStatement(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.declarationList, visitor, ts.isVariableDeclarationList));
    },

    [ts.SyntaxKind.ExpressionStatement]: function visitEachChildOfExpressionStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExpressionStatement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.IfStatement]: function visitEachChildOfIfStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateIfStatement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodeVisitor(node.thenStatement, visitor, ts.isStatement, context.factory.liftToBlock),
            nodeVisitor(node.elseStatement, visitor, ts.isStatement, context.factory.liftToBlock));
    },

    [ts.SyntaxKind.DoStatement]: function visitEachChildOfDoStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateDoStatement(node,
            visitIterationBody(node.statement, visitor, context, nodeVisitor),
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.WhileStatement]: function visitEachChildOfWhileStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateWhileStatement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            visitIterationBody(node.statement, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.ForStatement]: function visitEachChildOfForStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateForStatement(node,
            nodeVisitor(node.initializer, visitor, ts.isForInitializer),
            nodeVisitor(node.condition, visitor, ts.isExpression),
            nodeVisitor(node.incrementor, visitor, ts.isExpression),
            visitIterationBody(node.statement, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.ForInStatement]: function visitEachChildOfForInStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateForInStatement(node,
            nodeVisitor(node.initializer, visitor, ts.isForInitializer),
            nodeVisitor(node.expression, visitor, ts.isExpression),
            visitIterationBody(node.statement, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.ForOfStatement]: function visitEachChildOfForOfStatement(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateForOfStatement(node,
            nodeVisitor(node.awaitModifier, tokenVisitor, ts.isAwaitKeyword),
            nodeVisitor(node.initializer, visitor, ts.isForInitializer),
            nodeVisitor(node.expression, visitor, ts.isExpression),
            visitIterationBody(node.statement, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.ContinueStatement]: function visitEachChildOfContinueStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateContinueStatement(node,
            nodeVisitor(node.label, visitor, ts.isIdentifier));
    },

    [ts.SyntaxKind.BreakStatement]: function visitEachChildOfBreakStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateBreakStatement(node,
            nodeVisitor(node.label, visitor, ts.isIdentifier));
    },

    [ts.SyntaxKind.ReturnStatement]: function visitEachChildOfReturnStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateReturnStatement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.WithStatement]: function visitEachChildOfWithStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateWithStatement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodeVisitor(node.statement, visitor, ts.isStatement, context.factory.liftToBlock));
    },

    [ts.SyntaxKind.SwitchStatement]: function visitEachChildOfSwitchStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSwitchStatement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodeVisitor(node.caseBlock, visitor, ts.isCaseBlock));
    },

    [ts.SyntaxKind.LabeledStatement]: function visitEachChildOfLabeledStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateLabeledStatement(node,
            nodeVisitor(node.label, visitor, ts.isIdentifier),
            nodeVisitor(node.statement, visitor, ts.isStatement, context.factory.liftToBlock));
    },

    [ts.SyntaxKind.ThrowStatement]: function visitEachChildOfThrowStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateThrowStatement(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.TryStatement]: function visitEachChildOfTryStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTryStatement(node,
            nodeVisitor(node.tryBlock, visitor, ts.isBlock),
            nodeVisitor(node.catchClause, visitor, ts.isCatchClause),
            nodeVisitor(node.finallyBlock, visitor, ts.isBlock));
    },

    [ts.SyntaxKind.VariableDeclaration]: function visitEachChildOfVariableDeclaration(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateVariableDeclaration(node,
            nodeVisitor(node.name, visitor, ts.isBindingName),
            nodeVisitor(node.exclamationToken, tokenVisitor, ts.isExclamationToken),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            nodeVisitor(node.initializer, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.VariableDeclarationList]: function visitEachChildOfVariableDeclarationList(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateVariableDeclarationList(node,
            nodesVisitor(node.declarations, visitor, ts.isVariableDeclaration));
    },

    [ts.SyntaxKind.FunctionDeclaration]: function visitEachChildOfFunctionDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateFunctionDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.asteriskToken, tokenVisitor, ts.isAsteriskToken),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, ts.isTypeNode),
            visitFunctionBody(node.body, visitor, context, nodeVisitor));
    },

    [ts.SyntaxKind.ClassDeclaration]: function visitEachChildOfClassDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateClassDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifierLike),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.heritageClauses, visitor, ts.isHeritageClause),
            nodesVisitor(node.members, visitor, ts.isClassElement));
    },

    [ts.SyntaxKind.InterfaceDeclaration]: function visitEachChildOfInterfaceDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateInterfaceDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodesVisitor(node.heritageClauses, visitor, ts.isHeritageClause),
            nodesVisitor(node.members, visitor, ts.isTypeElement));
    },

    [ts.SyntaxKind.TypeAliasDeclaration]: function visitEachChildOfTypeAliasDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeAliasDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodesVisitor(node.typeParameters, visitor, ts.isTypeParameterDeclaration),
            nodeVisitor(node.type, visitor, ts.isTypeNode));
    },

    [ts.SyntaxKind.EnumDeclaration]: function visitEachChildOfEnumDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateEnumDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodesVisitor(node.members, visitor, ts.isEnumMember));
    },

    [ts.SyntaxKind.ModuleDeclaration]: function visitEachChildOfModuleDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateModuleDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.name, visitor, ts.isModuleName),
            nodeVisitor(node.body, visitor, ts.isModuleBody));
    },

    [ts.SyntaxKind.ModuleBlock]: function visitEachChildOfModuleBlock(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateModuleBlock(node,
            nodesVisitor(node.statements, visitor, ts.isStatement));
    },

    [ts.SyntaxKind.CaseBlock]: function visitEachChildOfCaseBlock(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateCaseBlock(node,
            nodesVisitor(node.clauses, visitor, ts.isCaseOrDefaultClause));
    },

    [ts.SyntaxKind.NamespaceExportDeclaration]: function visitEachChildOfNamespaceExportDeclaration(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamespaceExportDeclaration(node,
            nodeVisitor(node.name, visitor, ts.isIdentifier));
    },

    [ts.SyntaxKind.ImportEqualsDeclaration]: function visitEachChildOfImportEqualsDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportEqualsDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            node.isTypeOnly,
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodeVisitor(node.moduleReference, visitor, ts.isModuleReference));
    },

    [ts.SyntaxKind.ImportDeclaration]: function visitEachChildOfImportDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.importClause, visitor, ts.isImportClause),
            nodeVisitor(node.moduleSpecifier, visitor, ts.isExpression),
            nodeVisitor(node.assertClause, visitor, ts.isAssertClause));
    },

    [ts.SyntaxKind.AssertClause]: function visitEachChildOfAssertClause(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateAssertClause(node,
            nodesVisitor(node.elements, visitor, ts.isAssertEntry),
            node.multiLine);
    },

    [ts.SyntaxKind.AssertEntry]: function visitEachChildOfAssertEntry(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateAssertEntry(node,
            nodeVisitor(node.name, visitor, ts.isAssertionKey),
            nodeVisitor(node.value, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.ImportClause]: function visitEachChildOfImportClause(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportClause(node,
            node.isTypeOnly,
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodeVisitor(node.namedBindings, visitor, ts.isNamedImportBindings));
    },

    [ts.SyntaxKind.NamespaceImport]: function visitEachChildOfNamespaceImport(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamespaceImport(node,
            nodeVisitor(node.name, visitor, ts.isIdentifier));
    },

    [ts.SyntaxKind.NamespaceExport]: function visitEachChildOfNamespaceExport(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamespaceExport(node,
            nodeVisitor(node.name, visitor, ts.isIdentifier));
    },

    [ts.SyntaxKind.NamedImports]: function visitEachChildOfNamedImports(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamedImports(node,
            nodesVisitor(node.elements, visitor, ts.isImportSpecifier));
    },

    [ts.SyntaxKind.ImportSpecifier]: function visitEachChildOfImportSpecifier(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportSpecifier(node,
            node.isTypeOnly,
            nodeVisitor(node.propertyName, visitor, ts.isIdentifier),
            nodeVisitor(node.name, visitor, ts.isIdentifier));
    },

    [ts.SyntaxKind.ExportAssignment]: function visitEachChildOfExportAssignment(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExportAssignment(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.ExportDeclaration]: function visitEachChildOfExportDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExportDeclaration(node,
            nodesVisitor(node.modifiers, visitor, ts.isModifier),
            node.isTypeOnly,
            nodeVisitor(node.exportClause, visitor, ts.isNamedExportBindings),
            nodeVisitor(node.moduleSpecifier, visitor, ts.isExpression),
            nodeVisitor(node.assertClause, visitor, ts.isAssertClause));
    },

    [ts.SyntaxKind.NamedExports]: function visitEachChildOfNamedExports(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamedExports(node,
            nodesVisitor(node.elements, visitor, ts.isExportSpecifier));
    },

    [ts.SyntaxKind.ExportSpecifier]: function visitEachChildOfExportSpecifier(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExportSpecifier(node,
            node.isTypeOnly,
            nodeVisitor(node.propertyName, visitor, ts.isIdentifier),
            nodeVisitor(node.name, visitor, ts.isIdentifier));
    },

    // Module references
    [ts.SyntaxKind.ExternalModuleReference]: function visitEachChildOfExternalModuleReference(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExternalModuleReference(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    // JSX
    [ts.SyntaxKind.JsxElement]: function visitEachChildOfJsxElement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxElement(node,
            nodeVisitor(node.openingElement, visitor, ts.isJsxOpeningElement),
            nodesVisitor(node.children, visitor, ts.isJsxChild),
            nodeVisitor(node.closingElement, visitor, ts.isJsxClosingElement));
    },

    [ts.SyntaxKind.JsxSelfClosingElement]: function visitEachChildOfJsxSelfClosingElement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxSelfClosingElement(node,
            nodeVisitor(node.tagName, visitor, ts.isJsxTagNameExpression),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode),
            nodeVisitor(node.attributes, visitor, ts.isJsxAttributes));
    },

    [ts.SyntaxKind.JsxOpeningElement]: function visitEachChildOfJsxOpeningElement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxOpeningElement(node,
            nodeVisitor(node.tagName, visitor, ts.isJsxTagNameExpression),
            nodesVisitor(node.typeArguments, visitor, ts.isTypeNode),
            nodeVisitor(node.attributes, visitor, ts.isJsxAttributes));
    },

    [ts.SyntaxKind.JsxClosingElement]: function visitEachChildOfJsxClosingElement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxClosingElement(node,
            nodeVisitor(node.tagName, visitor, ts.isJsxTagNameExpression));
    },

    [ts.SyntaxKind.JsxFragment]: function visitEachChildOfJsxFragment(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxFragment(node,
            nodeVisitor(node.openingFragment, visitor, ts.isJsxOpeningFragment),
            nodesVisitor(node.children, visitor, ts.isJsxChild),
            nodeVisitor(node.closingFragment, visitor, ts.isJsxClosingFragment));
    },

    [ts.SyntaxKind.JsxAttribute]: function visitEachChildOfJsxAttribute(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxAttribute(node,
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodeVisitor(node.initializer, visitor, ts.isStringLiteralOrJsxExpression));
    },

    [ts.SyntaxKind.JsxAttributes]: function visitEachChildOfJsxAttributes(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxAttributes(node,
            nodesVisitor(node.properties, visitor, ts.isJsxAttributeLike));
    },

    [ts.SyntaxKind.JsxSpreadAttribute]: function visitEachChildOfJsxSpreadAttribute(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxSpreadAttribute(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.JsxExpression]: function visitEachChildOfJsxExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    // Clauses
    [ts.SyntaxKind.CaseClause]: function visitEachChildOfCaseClause(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateCaseClause(node,
            nodeVisitor(node.expression, visitor, ts.isExpression),
            nodesVisitor(node.statements, visitor, ts.isStatement));
    },

    [ts.SyntaxKind.DefaultClause]: function visitEachChildOfDefaultClause(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateDefaultClause(node,
            nodesVisitor(node.statements, visitor, ts.isStatement));
    },

    [ts.SyntaxKind.HeritageClause]: function visitEachChildOfHeritageClause(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateHeritageClause(node,
            nodesVisitor(node.types, visitor, ts.isExpressionWithTypeArguments));
    },

    [ts.SyntaxKind.CatchClause]: function visitEachChildOfCatchClause(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateCatchClause(node,
            nodeVisitor(node.variableDeclaration, visitor, ts.isVariableDeclaration),
            nodeVisitor(node.block, visitor, ts.isBlock));
    },

    // Property assignments
    [ts.SyntaxKind.PropertyAssignment]: function visitEachChildOfPropertyAssignment(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePropertyAssignment(node,
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            nodeVisitor(node.initializer, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.ShorthandPropertyAssignment]: function visitEachChildOfShorthandPropertyAssignment(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateShorthandPropertyAssignment(node,
            nodeVisitor(node.name, visitor, ts.isIdentifier),
            nodeVisitor(node.objectAssignmentInitializer, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.SpreadAssignment]: function visitEachChildOfSpreadAssignment(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSpreadAssignment(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    // Enum
    [ts.SyntaxKind.EnumMember]: function visitEachChildOfEnumMember(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateEnumMember(node,
            nodeVisitor(node.name, visitor, ts.isPropertyName),
            nodeVisitor(node.initializer, visitor, ts.isExpression));
    },

    // Top-level nodes
    [ts.SyntaxKind.SourceFile]: function visitEachChildOfSourceFile(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateSourceFile(node,
            visitLexicalEnvironment(node.statements, visitor, context, /*start*/ undefined, /*ensureUseStrict*/ undefined, nodesVisitor));
    },

    // Transformation nodes
    [ts.SyntaxKind.PartiallyEmittedExpression]: function visitEachChildOfPartiallyEmittedExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePartiallyEmittedExpression(node,
            nodeVisitor(node.expression, visitor, ts.isExpression));
    },

    [ts.SyntaxKind.CommaListExpression]: function visitEachChildOfCommaListExpression(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateCommaListExpression(node,
            nodesVisitor(node.elements, visitor, ts.isExpression));
    },
};

/**
 * Extracts the single node from a NodeArray.
 *
 * @param nodes The NodeArray.
 */
function extractSingleNode(nodes: readonly ts.Node[]): ts.Node | undefined {
    ts.Debug.assert(nodes.length <= 1, "Too many nodes written to output.");
    return ts.singleOrUndefined(nodes);
}
}
