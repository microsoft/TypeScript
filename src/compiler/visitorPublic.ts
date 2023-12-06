import {
    ConciseBody,
    Debug,
    EmitFlags,
    Expression,
    factory,
    FunctionBody,
    getEmitFlags,
    getEmitScriptTarget,
    HasChildren,
    Identifier,
    isArray,
    isArrayBindingElement,
    isAssertClause,
    isAssertsKeyword,
    isAsteriskToken,
    isAwaitKeyword,
    isBinaryOperatorToken,
    isBindingElement,
    isBindingName,
    isBindingPattern,
    isBlock,
    isCallChain,
    isCaseBlock,
    isCaseOrDefaultClause,
    isCatchClause,
    isClassElement,
    isColonToken,
    isConciseBody,
    isDotDotDotToken,
    isElementAccessChain,
    isEntityName,
    isEnumMember,
    isEqualsGreaterThanToken,
    isExclamationToken,
    isExportSpecifier,
    isExpression,
    isExpressionWithTypeArguments,
    isForInitializer,
    isHeritageClause,
    isIdentifier,
    isIdentifierOrThisTypeNode,
    isImportAttribute,
    isImportAttributeName,
    isImportAttributes,
    isImportClause,
    isImportSpecifier,
    isJsxAttributeLike,
    isJsxAttributeName,
    isJsxAttributes,
    isJsxChild,
    isJsxClosingElement,
    isJsxClosingFragment,
    isJsxOpeningElement,
    isJsxOpeningFragment,
    isJsxTagNameExpression,
    isLiteralTypeLiteral,
    isMemberName,
    isModifier,
    isModifierLike,
    isModuleBody,
    isModuleName,
    isModuleReference,
    isNamedExportBindings,
    isNamedImportBindings,
    isObjectLiteralElementLike,
    isOptionalChain,
    isParameter,
    isPropertyAccessChain,
    isPropertyName,
    isQuestionDotToken,
    isQuestionOrExclamationToken,
    isQuestionOrPlusOrMinusToken,
    isQuestionToken,
    isReadonlyKeywordOrPlusOrMinusToken,
    isStatement,
    isStringLiteralOrJsxExpression,
    isTemplateHead,
    isTemplateLiteral,
    isTemplateLiteralTypeSpan,
    isTemplateMiddleOrTemplateTail,
    isTemplateSpan,
    isTypeElement,
    isTypeNode,
    isTypeParameterDeclaration,
    isVariableDeclaration,
    isVariableDeclarationList,
    LexicalEnvironmentFlags,
    Node,
    NodeArray,
    NodesVisitor,
    NodeVisitor,
    ParameterDeclaration,
    ScriptTarget,
    setEmitFlags,
    setTextRange,
    setTextRangePosEnd,
    singleOrUndefined,
    some,
    Statement,
    SyntaxKind,
    TransformationContext,
    Visitor,
} from "./_namespaces/ts";

/**
 * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
 *
 * - If the input node is undefined, then the output is undefined.
 * - If the visitor returns undefined, then the output is undefined.
 * - If the output node is not undefined, then it will satisfy the test function.
 * - In order to obtain a return type that is more specific than `Node`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * @param node The Node to visit.
 * @param visitor The callback used to visit the Node.
 * @param test A callback to execute to verify the Node is valid.
 * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
 */
export function visitNode<TIn extends Node | undefined, TVisited extends Node | undefined, TOut extends Node>(
    node: TIn,
    visitor: Visitor<NonNullable<TIn>, TVisited>,
    test: (node: Node) => node is TOut,
    lift?: (node: readonly Node[]) => Node,
): TOut | (TIn & undefined) | (TVisited & undefined);
/**
 * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
 *
 * - If the input node is undefined, then the output is undefined.
 * - If the visitor returns undefined, then the output is undefined.
 * - If the output node is not undefined, then it will satisfy the test function.
 * - In order to obtain a return type that is more specific than `Node`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * @param node The Node to visit.
 * @param visitor The callback used to visit the Node.
 * @param test A callback to execute to verify the Node is valid.
 * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
 */
export function visitNode<TIn extends Node | undefined, TVisited extends Node | undefined>(
    node: TIn,
    visitor: Visitor<NonNullable<TIn>, TVisited>,
    test?: (node: Node) => boolean,
    lift?: (node: readonly Node[]) => Node,
): Node | (TIn & undefined) | (TVisited & undefined);
export function visitNode(
    node: Node,
    visitor: Visitor,
    test?: (node: Node) => boolean,
    lift?: (node: readonly Node[]) => Node,
): Node | undefined {
    if (node === undefined) {
        // If the input type is undefined, then the output type can be undefined.
        return node;
    }

    const visited = visitor(node);

    let visitedNode: Node | undefined;
    if (visited === undefined) {
        // If the visited node is undefined, then the visitor must have returned undefined,
        // so the visitor must have been declared as able to return undefined, so TOut must be
        // potentially undefined.
        return undefined;
    }
    else if (isArray(visited)) {
        visitedNode = (lift || extractSingleNode)(visited);
    }
    else {
        visitedNode = visited;
    }

    Debug.assertNode(visitedNode, test);
    return visitedNode;
}

/**
 * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
 *
 * - If the input node array is undefined, the output is undefined.
 * - If the visitor can return undefined, the node it visits in the array will be reused.
 * - If the output node array is not undefined, then its contents will satisfy the test.
 * - In order to obtain a return type that is more specific than `NodeArray<Node>`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * @param nodes The NodeArray to visit.
 * @param visitor The callback used to visit a Node.
 * @param test A node test to execute for each node.
 * @param start An optional value indicating the starting offset at which to start visiting.
 * @param count An optional value indicating the maximum number of nodes to visit.
 */
export function visitNodes<TIn extends Node, TInArray extends NodeArray<TIn> | undefined, TOut extends Node>(
    nodes: TInArray,
    visitor: Visitor<TIn, Node | undefined>,
    test: (node: Node) => node is TOut,
    start?: number,
    count?: number,
): NodeArray<TOut> | (TInArray & undefined);
/**
 * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
 *
 * - If the input node array is undefined, the output is undefined.
 * - If the visitor can return undefined, the node it visits in the array will be reused.
 * - If the output node array is not undefined, then its contents will satisfy the test.
 * - In order to obtain a return type that is more specific than `NodeArray<Node>`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * @param nodes The NodeArray to visit.
 * @param visitor The callback used to visit a Node.
 * @param test A node test to execute for each node.
 * @param start An optional value indicating the starting offset at which to start visiting.
 * @param count An optional value indicating the maximum number of nodes to visit.
 */
export function visitNodes<TIn extends Node, TInArray extends NodeArray<TIn> | undefined>(
    nodes: TInArray,
    visitor: Visitor<TIn, Node | undefined>,
    test?: (node: Node) => boolean,
    start?: number,
    count?: number,
): NodeArray<Node> | (TInArray & undefined);
export function visitNodes(
    nodes: NodeArray<Node> | undefined,
    visitor: Visitor,
    test?: (node: Node) => boolean,
    start?: number,
    count?: number,
): NodeArray<Node> | undefined {
    if (nodes === undefined) {
        // If the input type is undefined, then the output type can be undefined.
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
    if (updated !== nodes as readonly Node[]) {
        // TODO(rbuckton): Remove dependency on `ts.factory` in favor of a provided factory.
        const updatedArray = factory.createNodeArray(updated, hasTrailingComma);
        setTextRangePosEnd(updatedArray, pos, end);
        return updatedArray;
    }

    // If we are here, updated === nodes. This means that it's still a NodeArray,
    // and also that its contents passed the tests in visitArrayWorker, so has contents
    // of type TOut.
    return nodes;
}

/** @internal */
export function visitArray<TIn extends Node, TInArray extends readonly TIn[] | undefined, TOut extends Node>(
    nodes: TInArray,
    visitor: Visitor<TIn, Node | undefined>,
    test: (node: Node) => node is TOut,
    start?: number,
    count?: number,
): readonly TOut[] | (TInArray & undefined);
/** @internal */
export function visitArray<TIn extends Node, TInArray extends readonly TIn[] | undefined>(
    nodes: TInArray,
    visitor: Visitor<TIn, Node | undefined>,
    test?: (node: Node) => boolean,
    start?: number,
    count?: number,
): readonly Node[] | (TInArray & undefined);
export function visitArray(
    nodes: readonly Node[] | undefined,
    visitor: Visitor,
    test?: (node: Node) => boolean,
    start?: number,
    count?: number,
): readonly Node[] | undefined {
    if (nodes === undefined) {
        // If the input type is undefined, then the output type can be undefined.
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

    return visitArrayWorker(nodes, visitor, test, start, count);
}

function visitArrayWorker<TIn extends Node, TInArray extends readonly TIn[], TOut extends Node>(
    nodes: TInArray,
    visitor: Visitor<TIn, Node | undefined>,
    test: (node: Node) => node is TOut,
    start: number,
    count: number,
): readonly TOut[];
function visitArrayWorker<TIn extends Node, TInArray extends readonly TIn[]>(
    nodes: TInArray,
    visitor: Visitor<TIn, Node | undefined>,
    test: ((node: Node) => boolean) | undefined,
    start: number,
    count: number,
): readonly Node[];
function visitArrayWorker(
    nodes: readonly Node[],
    visitor: Visitor | undefined,
    test: ((node: Node) => boolean) | undefined,
    start: number,
    count: number,
): readonly Node[] {
    let updated: Node[] | undefined;

    const length = nodes.length;
    if (start > 0 || count < length) {
        // If we are not visiting all of the original nodes, we must always create a new array.
        updated = [];
    }

    // Visit each original node.
    for (let i = 0; i < count; i++) {
        const node = nodes[i + start];
        const visited = node !== undefined ? (visitor ? visitor(node) : node) : undefined;
        if (updated !== undefined || visited === undefined || visited !== node) {
            if (updated === undefined) {
                // Ensure we have a copy of `nodes`, up to the current index.
                updated = nodes.slice(0, i);
                Debug.assertEachNode(updated, test);
            }
            if (visited) {
                if (isArray(visited)) {
                    for (const visitedNode of visited) {
                        Debug.assertNode(visitedNode, test);
                        updated.push(visitedNode);
                    }
                }
                else {
                    Debug.assertNode(visited, test);
                    updated.push(visited);
                }
            }
        }
    }

    if (updated) {
        // If we have an updated array, then all items will have been tested.
        return updated;
    }

    // If we are going to return the original array, ensure it passes the test.
    Debug.assertEachNode(nodes, test);
    return nodes;
}

/**
 * Starts a new lexical environment and visits a statement list, ending the lexical environment
 * and merging hoisted declarations upon completion.
 */
export function visitLexicalEnvironment(statements: NodeArray<Statement>, visitor: Visitor, context: TransformationContext, start?: number, ensureUseStrict?: boolean, nodesVisitor: NodesVisitor = visitNodes) {
    context.startLexicalEnvironment();
    statements = nodesVisitor(statements, visitor, isStatement, start);
    if (ensureUseStrict) statements = context.factory.ensureUseStrict(statements);
    return factory.mergeLexicalEnvironment(statements, context.endLexicalEnvironment());
}

/**
 * Starts a new lexical environment and visits a parameter list, suspending the lexical
 * environment upon completion.
 */
export function visitParameterList(nodes: NodeArray<ParameterDeclaration>, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration>;
export function visitParameterList(nodes: NodeArray<ParameterDeclaration> | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration> | undefined;
export function visitParameterList(nodes: NodeArray<ParameterDeclaration> | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor = visitNodes) {
    let updated: NodeArray<ParameterDeclaration> | undefined;
    context.startLexicalEnvironment();
    if (nodes) {
        context.setLexicalEnvironmentFlags(LexicalEnvironmentFlags.InParameters, true);
        updated = nodesVisitor(nodes, visitor, isParameter);

        // As of ES2015, any runtime execution of that occurs in for a parameter (such as evaluating an
        // initializer or a binding pattern), occurs in its own lexical scope. As a result, any expression
        // that we might transform that introduces a temporary variable would fail as the temporary variable
        // exists in a different lexical scope. To address this, we move any binding patterns and initializers
        // in a parameter list to the body if we detect a variable being hoisted while visiting a parameter list
        // when the emit target is greater than ES2015.
        if (
            context.getLexicalEnvironmentFlags() & LexicalEnvironmentFlags.VariablesHoistedInParameters &&
            getEmitScriptTarget(context.getCompilerOptions()) >= ScriptTarget.ES2015
        ) {
            updated = addDefaultValueAssignmentsIfNeeded(updated, context);
        }
        context.setLexicalEnvironmentFlags(LexicalEnvironmentFlags.InParameters, false);
    }
    context.suspendLexicalEnvironment();
    return updated;
}

function addDefaultValueAssignmentsIfNeeded(parameters: NodeArray<ParameterDeclaration>, context: TransformationContext) {
    let result: ParameterDeclaration[] | undefined;
    for (let i = 0; i < parameters.length; i++) {
        const parameter = parameters[i];
        const updated = addDefaultValueAssignmentIfNeeded(parameter, context);
        if (result || updated !== parameter) {
            if (!result) result = parameters.slice(0, i);
            result[i] = updated;
        }
    }
    if (result) {
        return setTextRange(context.factory.createNodeArray(result, parameters.hasTrailingComma), parameters);
    }
    return parameters;
}

function addDefaultValueAssignmentIfNeeded(parameter: ParameterDeclaration, context: TransformationContext) {
    // A rest parameter cannot have a binding pattern or an initializer,
    // so let's just ignore it.
    return parameter.dotDotDotToken ? parameter :
        isBindingPattern(parameter.name) ? addDefaultValueAssignmentForBindingPattern(parameter, context) :
        parameter.initializer ? addDefaultValueAssignmentForInitializer(parameter, parameter.name, parameter.initializer, context) :
        parameter;
}

function addDefaultValueAssignmentForBindingPattern(parameter: ParameterDeclaration, context: TransformationContext) {
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
                                factory.createVoidZero(),
                            ),
                            /*questionToken*/ undefined,
                            parameter.initializer,
                            /*colonToken*/ undefined,
                            factory.getGeneratedNameForNode(parameter),
                        ) :
                        factory.getGeneratedNameForNode(parameter),
                ),
            ]),
        ),
    );
    return factory.updateParameterDeclaration(parameter, parameter.modifiers, parameter.dotDotDotToken, factory.getGeneratedNameForNode(parameter), parameter.questionToken, parameter.type, /*initializer*/ undefined);
}

function addDefaultValueAssignmentForInitializer(parameter: ParameterDeclaration, name: Identifier, initializer: Expression, context: TransformationContext) {
    const factory = context.factory;
    context.addInitializationStatement(
        factory.createIfStatement(
            factory.createTypeCheck(factory.cloneNode(name), "undefined"),
            setEmitFlags(
                setTextRange(
                    factory.createBlock([
                        factory.createExpressionStatement(
                            setEmitFlags(
                                setTextRange(
                                    factory.createAssignment(
                                        setEmitFlags(factory.cloneNode(name), EmitFlags.NoSourceMap),
                                        setEmitFlags(initializer, EmitFlags.NoSourceMap | getEmitFlags(initializer) | EmitFlags.NoComments),
                                    ),
                                    parameter,
                                ),
                                EmitFlags.NoComments,
                            ),
                        ),
                    ]),
                    parameter,
                ),
                EmitFlags.SingleLine | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTokenSourceMaps | EmitFlags.NoComments,
            ),
        ),
    );
    return factory.updateParameterDeclaration(parameter, parameter.modifiers, parameter.dotDotDotToken, parameter.name, parameter.questionToken, parameter.type, /*initializer*/ undefined);
}

/**
 * Resumes a suspended lexical environment and visits a function body, ending the lexical
 * environment and merging hoisted declarations upon completion.
 */
export function visitFunctionBody(node: FunctionBody, visitor: Visitor, context: TransformationContext): FunctionBody;
/**
 * Resumes a suspended lexical environment and visits a function body, ending the lexical
 * environment and merging hoisted declarations upon completion.
 */
export function visitFunctionBody(node: FunctionBody | undefined, visitor: Visitor, context: TransformationContext): FunctionBody | undefined;
/**
 * Resumes a suspended lexical environment and visits a concise body, ending the lexical
 * environment and merging hoisted declarations upon completion.
 */
export function visitFunctionBody(node: ConciseBody, visitor: Visitor, context: TransformationContext): ConciseBody;
/** @internal */ export function visitFunctionBody(node: FunctionBody, visitor: Visitor, context: TransformationContext, nodeVisitor?: NodeVisitor): FunctionBody; // eslint-disable-line @typescript-eslint/unified-signatures
/** @internal */ export function visitFunctionBody(node: FunctionBody | undefined, visitor: Visitor, context: TransformationContext, nodeVisitor?: NodeVisitor): FunctionBody | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
/** @internal */ export function visitFunctionBody(node: ConciseBody, visitor: Visitor, context: TransformationContext, nodeVisitor?: NodeVisitor): ConciseBody; // eslint-disable-line @typescript-eslint/unified-signatures
export function visitFunctionBody(node: ConciseBody | undefined, visitor: Visitor, context: TransformationContext, nodeVisitor: NodeVisitor = visitNode): ConciseBody | undefined {
    context.resumeLexicalEnvironment();
    const updated = nodeVisitor(node, visitor, isConciseBody);
    const declarations = context.endLexicalEnvironment();
    if (some(declarations)) {
        if (!updated) {
            return context.factory.createBlock(declarations);
        }
        const block = context.factory.converters.convertToFunctionBlock(updated);
        const statements = factory.mergeLexicalEnvironment(block.statements, declarations);
        return context.factory.updateBlock(block, statements);
    }
    return updated;
}

/**
 * Visits an iteration body, adding any block-scoped variables required by the transformation.
 */
export function visitIterationBody(body: Statement, visitor: Visitor, context: TransformationContext): Statement;
/** @internal */
export function visitIterationBody(body: Statement, visitor: Visitor, context: TransformationContext, nodeVisitor?: NodeVisitor): Statement; // eslint-disable-line @typescript-eslint/unified-signatures
export function visitIterationBody(body: Statement, visitor: Visitor, context: TransformationContext, nodeVisitor: NodeVisitor = visitNode): Statement {
    context.startBlockScope();
    const updated = nodeVisitor(body, visitor, isStatement, context.factory.liftToBlock);
    Debug.assert(updated);
    const declarations = context.endBlockScope();
    if (some(declarations)) {
        if (isBlock(updated)) {
            declarations.push(...updated.statements);
            return context.factory.updateBlock(updated, declarations);
        }
        declarations.push(updated);
        return context.factory.createBlock(declarations);
    }
    return updated;
}

/**
 * Visits the elements of a {@link CommaListExpression}.
 * @param visitor The visitor to use when visiting expressions whose result will not be discarded at runtime.
 * @param discardVisitor The visitor to use when visiting expressions whose result will be discarded at runtime. Defaults to {@link visitor}.
 */
export function visitCommaListElements(elements: NodeArray<Expression>, visitor: Visitor, discardVisitor = visitor): NodeArray<Expression> {
    if (discardVisitor === visitor || elements.length <= 1) {
        return visitNodes(elements, visitor, isExpression);
    }

    let i = 0;
    const length = elements.length;
    return visitNodes(elements, node => {
        const discarded = i < length - 1;
        i++;
        return discarded ? discardVisitor(node) : visitor(node);
    }, isExpression);
}

/**
 * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
 *
 * @param node The Node whose children will be visited.
 * @param visitor The callback used to visit each child.
 * @param context A lexical environment context for the visitor.
 */
export function visitEachChild<T extends Node>(node: T, visitor: Visitor, context: TransformationContext): T;
/** @internal */
export function visitEachChild<T extends Node>(node: T, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor, tokenVisitor?: Visitor, nodeVisitor?: NodeVisitor): T; // eslint-disable-line @typescript-eslint/unified-signatures
/**
 * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
 *
 * @param node The Node whose children will be visited.
 * @param visitor The callback used to visit each child.
 * @param context A lexical environment context for the visitor.
 */
export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: typeof visitNodes, tokenVisitor?: Visitor): T | undefined;
/** @internal */
export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor, tokenVisitor?: Visitor, nodeVisitor?: NodeVisitor): T | undefined;
export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor = visitNodes, tokenVisitor?: Visitor, nodeVisitor: NodeVisitor = visitNode): T | undefined {
    if (node === undefined) {
        return undefined;
    }

    const fn = (visitEachChildTable as Record<SyntaxKind, VisitEachChildFunction<any> | undefined>)[node.kind];
    return fn === undefined ? node : fn(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor);
}

type VisitEachChildFunction<T extends Node> = (node: T, visitor: Visitor, context: TransformationContext, nodesVisitor: NodesVisitor, nodeVisitor: NodeVisitor, tokenVisitor: Visitor | undefined) => T;

// A type that correlates a `SyntaxKind` to a `VisitEachChildFunction<T>`, for nodes in the `HasChildren` union.
// This looks something like:
//
//  {
//      [SyntaxKind.QualifiedName]: VisitEachChildFunction<QualifiedName>;
//      [SyntaxKind.ComputedPropertyName]: VisitEachChildFunction<ComputedPropertyName>;
//      ...
//  }
//
// This is then used as the expected type for `visitEachChildTable`.
type VisitEachChildTable = { [TNode in HasChildren as TNode["kind"]]: VisitEachChildFunction<TNode>; };

// NOTE: Before you can add a new method to `visitEachChildTable`, you must first ensure the `Node` subtype you
//       wish to add is defined in the `HasChildren` union in types.ts.
const visitEachChildTable: VisitEachChildTable = {
    [SyntaxKind.QualifiedName]: function visitEachChildOfQualifiedName(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateQualifiedName(
            node,
            Debug.checkDefined(nodeVisitor(node.left, visitor, isEntityName)),
            Debug.checkDefined(nodeVisitor(node.right, visitor, isIdentifier)),
        );
    },

    [SyntaxKind.ComputedPropertyName]: function visitEachChildOfComputedPropertyName(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateComputedPropertyName(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    // Signature elements
    [SyntaxKind.TypeParameter]: function visitEachChildOfTypeParameterDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeParameterDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifier),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
            nodeVisitor(node.constraint, visitor, isTypeNode),
            nodeVisitor(node.default, visitor, isTypeNode),
        );
    },

    [SyntaxKind.Parameter]: function visitEachChildOfParameterDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateParameterDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            tokenVisitor ? nodeVisitor(node.dotDotDotToken, tokenVisitor, isDotDotDotToken) : node.dotDotDotToken,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isBindingName)),
            tokenVisitor ? nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken) : node.questionToken,
            nodeVisitor(node.type, visitor, isTypeNode),
            nodeVisitor(node.initializer, visitor, isExpression),
        );
    },

    [SyntaxKind.Decorator]: function visitEachChildOfDecorator(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateDecorator(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    // Type elements
    [SyntaxKind.PropertySignature]: function visitEachChildOfPropertySignature(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updatePropertySignature(
            node,
            nodesVisitor(node.modifiers, visitor, isModifier),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            tokenVisitor ? nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken) : node.questionToken,
            nodeVisitor(node.type, visitor, isTypeNode),
        );
    },

    [SyntaxKind.PropertyDeclaration]: function visitEachChildOfPropertyDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updatePropertyDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            // QuestionToken and ExclamationToken are mutually exclusive in PropertyDeclaration
            tokenVisitor ? nodeVisitor(node.questionToken ?? node.exclamationToken, tokenVisitor, isQuestionOrExclamationToken) : node.questionToken ?? node.exclamationToken,
            nodeVisitor(node.type, visitor, isTypeNode),
            nodeVisitor(node.initializer, visitor, isExpression),
        );
    },

    [SyntaxKind.MethodSignature]: function visitEachChildOfMethodSignature(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateMethodSignature(
            node,
            nodesVisitor(node.modifiers, visitor, isModifier),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            tokenVisitor ? nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken) : node.questionToken,
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, isParameter),
            nodeVisitor(node.type, visitor, isTypeNode),
        );
    },

    [SyntaxKind.MethodDeclaration]: function visitEachChildOfMethodDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateMethodDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            tokenVisitor ? nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken) : node.asteriskToken,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            tokenVisitor ? nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken) : node.questionToken,
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, isTypeNode),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.Constructor]: function visitEachChildOfConstructorDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConstructorDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.GetAccessor]: function visitEachChildOfGetAccessorDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateGetAccessorDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, isTypeNode),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.SetAccessor]: function visitEachChildOfSetAccessorDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSetAccessorDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            visitFunctionBody(node.body!, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.ClassStaticBlockDeclaration]: function visitEachChildOfClassStaticBlockDeclaration(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        context.startLexicalEnvironment();
        context.suspendLexicalEnvironment();
        return context.factory.updateClassStaticBlockDeclaration(
            node,
            visitFunctionBody(node.body, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.CallSignature]: function visitEachChildOfCallSignatureDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateCallSignature(
            node,
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, isParameter),
            nodeVisitor(node.type, visitor, isTypeNode),
        );
    },

    [SyntaxKind.ConstructSignature]: function visitEachChildOfConstructSignatureDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConstructSignature(
            node,
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, isParameter),
            nodeVisitor(node.type, visitor, isTypeNode),
        );
    },

    [SyntaxKind.IndexSignature]: function visitEachChildOfIndexSignatureDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateIndexSignature(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            nodesVisitor(node.parameters, visitor, isParameter),
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    // Types
    [SyntaxKind.TypePredicate]: function visitEachChildOfTypePredicateNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypePredicateNode(
            node,
            nodeVisitor(node.assertsModifier, visitor, isAssertsKeyword),
            Debug.checkDefined(nodeVisitor(node.parameterName, visitor, isIdentifierOrThisTypeNode)),
            nodeVisitor(node.type, visitor, isTypeNode),
        );
    },

    [SyntaxKind.TypeReference]: function visitEachChildOfTypeReferenceNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeReferenceNode(
            node,
            Debug.checkDefined(nodeVisitor(node.typeName, visitor, isEntityName)),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
        );
    },

    [SyntaxKind.FunctionType]: function visitEachChildOfFunctionTypeNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateFunctionTypeNode(
            node,
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, isParameter),
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.ConstructorType]: function visitEachChildOfConstructorTypeNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConstructorTypeNode(
            node,
            nodesVisitor(node.modifiers, visitor, isModifier),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.parameters, visitor, isParameter),
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.TypeQuery]: function visitEachChildOfTypeQueryNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeQueryNode(
            node,
            Debug.checkDefined(nodeVisitor(node.exprName, visitor, isEntityName)),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
        );
    },

    [SyntaxKind.TypeLiteral]: function visitEachChildOfTypeLiteralNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeLiteralNode(
            node,
            nodesVisitor(node.members, visitor, isTypeElement),
        );
    },

    [SyntaxKind.ArrayType]: function visitEachChildOfArrayTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateArrayTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.elementType, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.TupleType]: function visitEachChildOfTupleTypeNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateTupleTypeNode(
            node,
            nodesVisitor(node.elements, visitor, isTypeNode),
        );
    },

    [SyntaxKind.OptionalType]: function visitEachChildOfOptionalTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateOptionalTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.RestType]: function visitEachChildOfRestTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateRestTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.UnionType]: function visitEachChildOfUnionTypeNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateUnionTypeNode(
            node,
            nodesVisitor(node.types, visitor, isTypeNode),
        );
    },

    [SyntaxKind.IntersectionType]: function visitEachChildOfIntersectionTypeNode(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateIntersectionTypeNode(
            node,
            nodesVisitor(node.types, visitor, isTypeNode),
        );
    },

    [SyntaxKind.ConditionalType]: function visitEachChildOfConditionalTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateConditionalTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.checkType, visitor, isTypeNode)),
            Debug.checkDefined(nodeVisitor(node.extendsType, visitor, isTypeNode)),
            Debug.checkDefined(nodeVisitor(node.trueType, visitor, isTypeNode)),
            Debug.checkDefined(nodeVisitor(node.falseType, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.InferType]: function visitEachChildOfInferTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateInferTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.typeParameter, visitor, isTypeParameterDeclaration)),
        );
    },

    [SyntaxKind.ImportType]: function visitEachChildOfImportTypeNode(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.argument, visitor, isTypeNode)),
            nodeVisitor(node.attributes, visitor, isImportAttributes),
            nodeVisitor(node.qualifier, visitor, isEntityName),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
            node.isTypeOf,
        );
    },

    [SyntaxKind.ImportTypeAssertionContainer]: function visitEachChildOfImportTypeAssertionContainer(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportTypeAssertionContainer(
            node,
            Debug.checkDefined(nodeVisitor(node.assertClause, visitor, isAssertClause)),
            node.multiLine,
        );
    },

    [SyntaxKind.NamedTupleMember]: function visitEachChildOfNamedTupleMember(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateNamedTupleMember(
            node,
            tokenVisitor ? nodeVisitor(node.dotDotDotToken, tokenVisitor, isDotDotDotToken) : node.dotDotDotToken,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
            tokenVisitor ? nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken) : node.questionToken,
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.ParenthesizedType]: function visitEachChildOfParenthesizedType(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateParenthesizedType(
            node,
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.TypeOperator]: function visitEachChildOfTypeOperatorNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeOperatorNode(
            node,
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.IndexedAccessType]: function visitEachChildOfIndexedAccessType(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateIndexedAccessTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.objectType, visitor, isTypeNode)),
            Debug.checkDefined(nodeVisitor(node.indexType, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.MappedType]: function visitEachChildOfMappedType(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateMappedTypeNode(
            node,
            tokenVisitor ? nodeVisitor(node.readonlyToken, tokenVisitor, isReadonlyKeywordOrPlusOrMinusToken) : node.readonlyToken,
            Debug.checkDefined(nodeVisitor(node.typeParameter, visitor, isTypeParameterDeclaration)),
            nodeVisitor(node.nameType, visitor, isTypeNode),
            tokenVisitor ? nodeVisitor(node.questionToken, tokenVisitor, isQuestionOrPlusOrMinusToken) : node.questionToken,
            nodeVisitor(node.type, visitor, isTypeNode),
            nodesVisitor(node.members, visitor, isTypeElement),
        );
    },

    [SyntaxKind.LiteralType]: function visitEachChildOfLiteralTypeNode(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateLiteralTypeNode(
            node,
            Debug.checkDefined(nodeVisitor(node.literal, visitor, isLiteralTypeLiteral)),
        );
    },

    [SyntaxKind.TemplateLiteralType]: function visitEachChildOfTemplateLiteralType(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateLiteralType(
            node,
            Debug.checkDefined(nodeVisitor(node.head, visitor, isTemplateHead)),
            nodesVisitor(node.templateSpans, visitor, isTemplateLiteralTypeSpan),
        );
    },

    [SyntaxKind.TemplateLiteralTypeSpan]: function visitEachChildOfTemplateLiteralTypeSpan(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateLiteralTypeSpan(
            node,
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
            Debug.checkDefined(nodeVisitor(node.literal, visitor, isTemplateMiddleOrTemplateTail)),
        );
    },

    // Binding patterns
    [SyntaxKind.ObjectBindingPattern]: function visitEachChildOfObjectBindingPattern(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateObjectBindingPattern(
            node,
            nodesVisitor(node.elements, visitor, isBindingElement),
        );
    },

    [SyntaxKind.ArrayBindingPattern]: function visitEachChildOfArrayBindingPattern(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateArrayBindingPattern(
            node,
            nodesVisitor(node.elements, visitor, isArrayBindingElement),
        );
    },

    [SyntaxKind.BindingElement]: function visitEachChildOfBindingElement(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateBindingElement(
            node,
            tokenVisitor ? nodeVisitor(node.dotDotDotToken, tokenVisitor, isDotDotDotToken) : node.dotDotDotToken,
            nodeVisitor(node.propertyName, visitor, isPropertyName),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isBindingName)),
            nodeVisitor(node.initializer, visitor, isExpression),
        );
    },

    // Expression
    [SyntaxKind.ArrayLiteralExpression]: function visitEachChildOfArrayLiteralExpression(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateArrayLiteralExpression(
            node,
            nodesVisitor(node.elements, visitor, isExpression),
        );
    },

    [SyntaxKind.ObjectLiteralExpression]: function visitEachChildOfObjectLiteralExpression(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateObjectLiteralExpression(
            node,
            nodesVisitor(node.properties, visitor, isObjectLiteralElementLike),
        );
    },

    [SyntaxKind.PropertyAccessExpression]: function visitEachChildOfPropertyAccessExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return isPropertyAccessChain(node) ?
            context.factory.updatePropertyAccessChain(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
                tokenVisitor ? nodeVisitor(node.questionDotToken, tokenVisitor, isQuestionDotToken) : node.questionDotToken,
                Debug.checkDefined(nodeVisitor(node.name, visitor, isMemberName)),
            ) :
            context.factory.updatePropertyAccessExpression(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
                Debug.checkDefined(nodeVisitor(node.name, visitor, isMemberName)),
            );
    },

    [SyntaxKind.ElementAccessExpression]: function visitEachChildOfElementAccessExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return isElementAccessChain(node) ?
            context.factory.updateElementAccessChain(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
                tokenVisitor ? nodeVisitor(node.questionDotToken, tokenVisitor, isQuestionDotToken) : node.questionDotToken,
                Debug.checkDefined(nodeVisitor(node.argumentExpression, visitor, isExpression)),
            ) :
            context.factory.updateElementAccessExpression(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
                Debug.checkDefined(nodeVisitor(node.argumentExpression, visitor, isExpression)),
            );
    },

    [SyntaxKind.CallExpression]: function visitEachChildOfCallExpression(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return isCallChain(node) ?
            context.factory.updateCallChain(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
                tokenVisitor ? nodeVisitor(node.questionDotToken, tokenVisitor, isQuestionDotToken) : node.questionDotToken,
                nodesVisitor(node.typeArguments, visitor, isTypeNode),
                nodesVisitor(node.arguments, visitor, isExpression),
            ) :
            context.factory.updateCallExpression(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
                nodesVisitor(node.typeArguments, visitor, isTypeNode),
                nodesVisitor(node.arguments, visitor, isExpression),
            );
    },

    [SyntaxKind.NewExpression]: function visitEachChildOfNewExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNewExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
            nodesVisitor(node.arguments, visitor, isExpression),
        );
    },

    [SyntaxKind.TaggedTemplateExpression]: function visitEachChildOfTaggedTemplateExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTaggedTemplateExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.tag, visitor, isExpression)),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
            Debug.checkDefined(nodeVisitor(node.template, visitor, isTemplateLiteral)),
        );
    },

    [SyntaxKind.TypeAssertionExpression]: function visitEachChildOfTypeAssertionExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeAssertion(
            node,
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.ParenthesizedExpression]: function visitEachChildOfParenthesizedExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateParenthesizedExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.FunctionExpression]: function visitEachChildOfFunctionExpression(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateFunctionExpression(
            node,
            nodesVisitor(node.modifiers, visitor, isModifier),
            tokenVisitor ? nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken) : node.asteriskToken,
            nodeVisitor(node.name, visitor, isIdentifier),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, isTypeNode),
            visitFunctionBody(node.body, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.ArrowFunction]: function visitEachChildOfArrowFunction(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateArrowFunction(
            node,
            nodesVisitor(node.modifiers, visitor, isModifier),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, isTypeNode),
            tokenVisitor ? Debug.checkDefined(nodeVisitor(node.equalsGreaterThanToken, tokenVisitor, isEqualsGreaterThanToken)) : node.equalsGreaterThanToken,
            visitFunctionBody(node.body, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.DeleteExpression]: function visitEachChildOfDeleteExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateDeleteExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.TypeOfExpression]: function visitEachChildOfTypeOfExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeOfExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.VoidExpression]: function visitEachChildOfVoidExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateVoidExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.AwaitExpression]: function visitEachChildOfAwaitExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateAwaitExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.PrefixUnaryExpression]: function visitEachChildOfPrefixUnaryExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePrefixUnaryExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.operand, visitor, isExpression)),
        );
    },

    [SyntaxKind.PostfixUnaryExpression]: function visitEachChildOfPostfixUnaryExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePostfixUnaryExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.operand, visitor, isExpression)),
        );
    },

    [SyntaxKind.BinaryExpression]: function visitEachChildOfBinaryExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateBinaryExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.left, visitor, isExpression)),
            tokenVisitor ? Debug.checkDefined(nodeVisitor(node.operatorToken, tokenVisitor, isBinaryOperatorToken)) : node.operatorToken,
            Debug.checkDefined(nodeVisitor(node.right, visitor, isExpression)),
        );
    },

    [SyntaxKind.ConditionalExpression]: function visitEachChildOfConditionalExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateConditionalExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.condition, visitor, isExpression)),
            tokenVisitor ? Debug.checkDefined(nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken)) : node.questionToken,
            Debug.checkDefined(nodeVisitor(node.whenTrue, visitor, isExpression)),
            tokenVisitor ? Debug.checkDefined(nodeVisitor(node.colonToken, tokenVisitor, isColonToken)) : node.colonToken,
            Debug.checkDefined(nodeVisitor(node.whenFalse, visitor, isExpression)),
        );
    },

    [SyntaxKind.TemplateExpression]: function visitEachChildOfTemplateExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.head, visitor, isTemplateHead)),
            nodesVisitor(node.templateSpans, visitor, isTemplateSpan),
        );
    },

    [SyntaxKind.YieldExpression]: function visitEachChildOfYieldExpression(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateYieldExpression(
            node,
            tokenVisitor ? nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken) : node.asteriskToken,
            nodeVisitor(node.expression, visitor, isExpression),
        );
    },

    [SyntaxKind.SpreadElement]: function visitEachChildOfSpreadElement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSpreadElement(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.ClassExpression]: function visitEachChildOfClassExpression(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateClassExpression(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            nodeVisitor(node.name, visitor, isIdentifier),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.heritageClauses, visitor, isHeritageClause),
            nodesVisitor(node.members, visitor, isClassElement),
        );
    },

    [SyntaxKind.ExpressionWithTypeArguments]: function visitEachChildOfExpressionWithTypeArguments(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExpressionWithTypeArguments(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
        );
    },

    [SyntaxKind.AsExpression]: function visitEachChildOfAsExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateAsExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.SatisfiesExpression]: function visitEachChildOfSatisfiesExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSatisfiesExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.NonNullExpression]: function visitEachChildOfNonNullExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return isOptionalChain(node) ?
            context.factory.updateNonNullChain(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            ) :
            context.factory.updateNonNullExpression(
                node,
                Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            );
    },

    [SyntaxKind.MetaProperty]: function visitEachChildOfMetaProperty(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateMetaProperty(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
        );
    },

    // Misc
    [SyntaxKind.TemplateSpan]: function visitEachChildOfTemplateSpan(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTemplateSpan(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            Debug.checkDefined(nodeVisitor(node.literal, visitor, isTemplateMiddleOrTemplateTail)),
        );
    },

    // Element
    [SyntaxKind.Block]: function visitEachChildOfBlock(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateBlock(
            node,
            nodesVisitor(node.statements, visitor, isStatement),
        );
    },

    [SyntaxKind.VariableStatement]: function visitEachChildOfVariableStatement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateVariableStatement(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.declarationList, visitor, isVariableDeclarationList)),
        );
    },

    [SyntaxKind.ExpressionStatement]: function visitEachChildOfExpressionStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExpressionStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.IfStatement]: function visitEachChildOfIfStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateIfStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            Debug.checkDefined(nodeVisitor(node.thenStatement, visitor, isStatement, context.factory.liftToBlock)),
            nodeVisitor(node.elseStatement, visitor, isStatement, context.factory.liftToBlock),
        );
    },

    [SyntaxKind.DoStatement]: function visitEachChildOfDoStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateDoStatement(
            node,
            visitIterationBody(node.statement, visitor, context, nodeVisitor),
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.WhileStatement]: function visitEachChildOfWhileStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateWhileStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            visitIterationBody(node.statement, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.ForStatement]: function visitEachChildOfForStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateForStatement(
            node,
            nodeVisitor(node.initializer, visitor, isForInitializer),
            nodeVisitor(node.condition, visitor, isExpression),
            nodeVisitor(node.incrementor, visitor, isExpression),
            visitIterationBody(node.statement, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.ForInStatement]: function visitEachChildOfForInStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateForInStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.initializer, visitor, isForInitializer)),
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            visitIterationBody(node.statement, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.ForOfStatement]: function visitEachChildOfForOfStatement(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateForOfStatement(
            node,
            tokenVisitor ? nodeVisitor(node.awaitModifier, tokenVisitor, isAwaitKeyword) : node.awaitModifier,
            Debug.checkDefined(nodeVisitor(node.initializer, visitor, isForInitializer)),
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            visitIterationBody(node.statement, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.ContinueStatement]: function visitEachChildOfContinueStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateContinueStatement(
            node,
            nodeVisitor(node.label, visitor, isIdentifier),
        );
    },

    [SyntaxKind.BreakStatement]: function visitEachChildOfBreakStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateBreakStatement(
            node,
            nodeVisitor(node.label, visitor, isIdentifier),
        );
    },

    [SyntaxKind.ReturnStatement]: function visitEachChildOfReturnStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateReturnStatement(
            node,
            nodeVisitor(node.expression, visitor, isExpression),
        );
    },

    [SyntaxKind.WithStatement]: function visitEachChildOfWithStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateWithStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            Debug.checkDefined(nodeVisitor(node.statement, visitor, isStatement, context.factory.liftToBlock)),
        );
    },

    [SyntaxKind.SwitchStatement]: function visitEachChildOfSwitchStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSwitchStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            Debug.checkDefined(nodeVisitor(node.caseBlock, visitor, isCaseBlock)),
        );
    },

    [SyntaxKind.LabeledStatement]: function visitEachChildOfLabeledStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateLabeledStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.label, visitor, isIdentifier)),
            Debug.checkDefined(nodeVisitor(node.statement, visitor, isStatement, context.factory.liftToBlock)),
        );
    },

    [SyntaxKind.ThrowStatement]: function visitEachChildOfThrowStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateThrowStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.TryStatement]: function visitEachChildOfTryStatement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTryStatement(
            node,
            Debug.checkDefined(nodeVisitor(node.tryBlock, visitor, isBlock)),
            nodeVisitor(node.catchClause, visitor, isCatchClause),
            nodeVisitor(node.finallyBlock, visitor, isBlock),
        );
    },

    [SyntaxKind.VariableDeclaration]: function visitEachChildOfVariableDeclaration(node, visitor, context, _nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateVariableDeclaration(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isBindingName)),
            tokenVisitor ? nodeVisitor(node.exclamationToken, tokenVisitor, isExclamationToken) : node.exclamationToken,
            nodeVisitor(node.type, visitor, isTypeNode),
            nodeVisitor(node.initializer, visitor, isExpression),
        );
    },

    [SyntaxKind.VariableDeclarationList]: function visitEachChildOfVariableDeclarationList(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateVariableDeclarationList(
            node,
            nodesVisitor(node.declarations, visitor, isVariableDeclaration),
        );
    },

    [SyntaxKind.FunctionDeclaration]: function visitEachChildOfFunctionDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, tokenVisitor) {
        return context.factory.updateFunctionDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifier),
            tokenVisitor ? nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken) : node.asteriskToken,
            nodeVisitor(node.name, visitor, isIdentifier),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            visitParameterList(node.parameters, visitor, context, nodesVisitor),
            nodeVisitor(node.type, visitor, isTypeNode),
            visitFunctionBody(node.body, visitor, context, nodeVisitor),
        );
    },

    [SyntaxKind.ClassDeclaration]: function visitEachChildOfClassDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateClassDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            nodeVisitor(node.name, visitor, isIdentifier),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.heritageClauses, visitor, isHeritageClause),
            nodesVisitor(node.members, visitor, isClassElement),
        );
    },

    [SyntaxKind.InterfaceDeclaration]: function visitEachChildOfInterfaceDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateInterfaceDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            nodesVisitor(node.heritageClauses, visitor, isHeritageClause),
            nodesVisitor(node.members, visitor, isTypeElement),
        );
    },

    [SyntaxKind.TypeAliasDeclaration]: function visitEachChildOfTypeAliasDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateTypeAliasDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
            nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
            Debug.checkDefined(nodeVisitor(node.type, visitor, isTypeNode)),
        );
    },

    [SyntaxKind.EnumDeclaration]: function visitEachChildOfEnumDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateEnumDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
            nodesVisitor(node.members, visitor, isEnumMember),
        );
    },

    [SyntaxKind.ModuleDeclaration]: function visitEachChildOfModuleDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateModuleDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isModuleName)),
            nodeVisitor(node.body, visitor, isModuleBody),
        );
    },

    [SyntaxKind.ModuleBlock]: function visitEachChildOfModuleBlock(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateModuleBlock(
            node,
            nodesVisitor(node.statements, visitor, isStatement),
        );
    },

    [SyntaxKind.CaseBlock]: function visitEachChildOfCaseBlock(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateCaseBlock(
            node,
            nodesVisitor(node.clauses, visitor, isCaseOrDefaultClause),
        );
    },

    [SyntaxKind.NamespaceExportDeclaration]: function visitEachChildOfNamespaceExportDeclaration(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamespaceExportDeclaration(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
        );
    },

    [SyntaxKind.ImportEqualsDeclaration]: function visitEachChildOfImportEqualsDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportEqualsDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            node.isTypeOnly,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
            Debug.checkDefined(nodeVisitor(node.moduleReference, visitor, isModuleReference)),
        );
    },

    [SyntaxKind.ImportDeclaration]: function visitEachChildOfImportDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            nodeVisitor(node.importClause, visitor, isImportClause),
            Debug.checkDefined(nodeVisitor(node.moduleSpecifier, visitor, isExpression)),
            nodeVisitor(node.attributes, visitor, isImportAttributes),
        );
    },

    [SyntaxKind.ImportAttributes]: function visitEachChildOfImportAttributes(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportAttributes(
            node,
            nodesVisitor(node.elements, visitor, isImportAttribute),
            node.multiLine,
        );
    },

    [SyntaxKind.ImportAttribute]: function visitEachChildOfImportAttribute(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportAttribute(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isImportAttributeName)),
            Debug.checkDefined(nodeVisitor(node.value, visitor, isExpression)),
        );
    },

    [SyntaxKind.ImportClause]: function visitEachChildOfImportClause(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportClause(
            node,
            node.isTypeOnly,
            nodeVisitor(node.name, visitor, isIdentifier),
            nodeVisitor(node.namedBindings, visitor, isNamedImportBindings),
        );
    },

    [SyntaxKind.NamespaceImport]: function visitEachChildOfNamespaceImport(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamespaceImport(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
        );
    },

    [SyntaxKind.NamespaceExport]: function visitEachChildOfNamespaceExport(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamespaceExport(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
        );
    },

    [SyntaxKind.NamedImports]: function visitEachChildOfNamedImports(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamedImports(
            node,
            nodesVisitor(node.elements, visitor, isImportSpecifier),
        );
    },

    [SyntaxKind.ImportSpecifier]: function visitEachChildOfImportSpecifier(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateImportSpecifier(
            node,
            node.isTypeOnly,
            nodeVisitor(node.propertyName, visitor, isIdentifier),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
        );
    },

    [SyntaxKind.ExportAssignment]: function visitEachChildOfExportAssignment(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExportAssignment(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.ExportDeclaration]: function visitEachChildOfExportDeclaration(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExportDeclaration(
            node,
            nodesVisitor(node.modifiers, visitor, isModifierLike),
            node.isTypeOnly,
            nodeVisitor(node.exportClause, visitor, isNamedExportBindings),
            nodeVisitor(node.moduleSpecifier, visitor, isExpression),
            nodeVisitor(node.attributes, visitor, isImportAttributes),
        );
    },

    [SyntaxKind.NamedExports]: function visitEachChildOfNamedExports(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateNamedExports(
            node,
            nodesVisitor(node.elements, visitor, isExportSpecifier),
        );
    },

    [SyntaxKind.ExportSpecifier]: function visitEachChildOfExportSpecifier(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExportSpecifier(
            node,
            node.isTypeOnly,
            nodeVisitor(node.propertyName, visitor, isIdentifier),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
        );
    },

    // Module references
    [SyntaxKind.ExternalModuleReference]: function visitEachChildOfExternalModuleReference(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateExternalModuleReference(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    // JSX
    [SyntaxKind.JsxElement]: function visitEachChildOfJsxElement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxElement(
            node,
            Debug.checkDefined(nodeVisitor(node.openingElement, visitor, isJsxOpeningElement)),
            nodesVisitor(node.children, visitor, isJsxChild),
            Debug.checkDefined(nodeVisitor(node.closingElement, visitor, isJsxClosingElement)),
        );
    },

    [SyntaxKind.JsxSelfClosingElement]: function visitEachChildOfJsxSelfClosingElement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxSelfClosingElement(
            node,
            Debug.checkDefined(nodeVisitor(node.tagName, visitor, isJsxTagNameExpression)),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
            Debug.checkDefined(nodeVisitor(node.attributes, visitor, isJsxAttributes)),
        );
    },

    [SyntaxKind.JsxOpeningElement]: function visitEachChildOfJsxOpeningElement(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxOpeningElement(
            node,
            Debug.checkDefined(nodeVisitor(node.tagName, visitor, isJsxTagNameExpression)),
            nodesVisitor(node.typeArguments, visitor, isTypeNode),
            Debug.checkDefined(nodeVisitor(node.attributes, visitor, isJsxAttributes)),
        );
    },

    [SyntaxKind.JsxClosingElement]: function visitEachChildOfJsxClosingElement(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxClosingElement(
            node,
            Debug.checkDefined(nodeVisitor(node.tagName, visitor, isJsxTagNameExpression)),
        );
    },

    [SyntaxKind.JsxNamespacedName]: function forEachChildInJsxNamespacedName(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxNamespacedName(
            node,
            Debug.checkDefined(nodeVisitor(node.namespace, visitor, isIdentifier)),
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
        );
    },

    [SyntaxKind.JsxFragment]: function visitEachChildOfJsxFragment(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxFragment(
            node,
            Debug.checkDefined(nodeVisitor(node.openingFragment, visitor, isJsxOpeningFragment)),
            nodesVisitor(node.children, visitor, isJsxChild),
            Debug.checkDefined(nodeVisitor(node.closingFragment, visitor, isJsxClosingFragment)),
        );
    },

    [SyntaxKind.JsxAttribute]: function visitEachChildOfJsxAttribute(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxAttribute(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isJsxAttributeName)),
            nodeVisitor(node.initializer, visitor, isStringLiteralOrJsxExpression),
        );
    },

    [SyntaxKind.JsxAttributes]: function visitEachChildOfJsxAttributes(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxAttributes(
            node,
            nodesVisitor(node.properties, visitor, isJsxAttributeLike),
        );
    },

    [SyntaxKind.JsxSpreadAttribute]: function visitEachChildOfJsxSpreadAttribute(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxSpreadAttribute(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.JsxExpression]: function visitEachChildOfJsxExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateJsxExpression(
            node,
            nodeVisitor(node.expression, visitor, isExpression),
        );
    },

    // Clauses
    [SyntaxKind.CaseClause]: function visitEachChildOfCaseClause(node, visitor, context, nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateCaseClause(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
            nodesVisitor(node.statements, visitor, isStatement),
        );
    },

    [SyntaxKind.DefaultClause]: function visitEachChildOfDefaultClause(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateDefaultClause(
            node,
            nodesVisitor(node.statements, visitor, isStatement),
        );
    },

    [SyntaxKind.HeritageClause]: function visitEachChildOfHeritageClause(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateHeritageClause(
            node,
            nodesVisitor(node.types, visitor, isExpressionWithTypeArguments),
        );
    },

    [SyntaxKind.CatchClause]: function visitEachChildOfCatchClause(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateCatchClause(
            node,
            nodeVisitor(node.variableDeclaration, visitor, isVariableDeclaration),
            Debug.checkDefined(nodeVisitor(node.block, visitor, isBlock)),
        );
    },

    // Property assignments
    [SyntaxKind.PropertyAssignment]: function visitEachChildOfPropertyAssignment(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePropertyAssignment(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            Debug.checkDefined(nodeVisitor(node.initializer, visitor, isExpression)),
        );
    },

    [SyntaxKind.ShorthandPropertyAssignment]: function visitEachChildOfShorthandPropertyAssignment(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateShorthandPropertyAssignment(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isIdentifier)),
            nodeVisitor(node.objectAssignmentInitializer, visitor, isExpression),
        );
    },

    [SyntaxKind.SpreadAssignment]: function visitEachChildOfSpreadAssignment(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateSpreadAssignment(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    // Enum
    [SyntaxKind.EnumMember]: function visitEachChildOfEnumMember(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updateEnumMember(
            node,
            Debug.checkDefined(nodeVisitor(node.name, visitor, isPropertyName)),
            nodeVisitor(node.initializer, visitor, isExpression),
        );
    },

    // Top-level nodes
    [SyntaxKind.SourceFile]: function visitEachChildOfSourceFile(node, visitor, context, _nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateSourceFile(
            node,
            visitLexicalEnvironment(node.statements, visitor, context),
        );
    },

    // Transformation nodes
    [SyntaxKind.PartiallyEmittedExpression]: function visitEachChildOfPartiallyEmittedExpression(node, visitor, context, _nodesVisitor, nodeVisitor, _tokenVisitor) {
        return context.factory.updatePartiallyEmittedExpression(
            node,
            Debug.checkDefined(nodeVisitor(node.expression, visitor, isExpression)),
        );
    },

    [SyntaxKind.CommaListExpression]: function visitEachChildOfCommaListExpression(node, visitor, context, nodesVisitor, _nodeVisitor, _tokenVisitor) {
        return context.factory.updateCommaListExpression(
            node,
            nodesVisitor(node.elements, visitor, isExpression),
        );
    },
};

/**
 * Extracts the single node from a NodeArray.
 *
 * @param nodes The NodeArray.
 */
function extractSingleNode(nodes: readonly Node[]): Node | undefined {
    Debug.assert(nodes.length <= 1, "Too many nodes written to output.");
    return singleOrUndefined(nodes);
}
