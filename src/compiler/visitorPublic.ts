namespace ts {
    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    export function visitNode<T extends Node>(node: T, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T;

    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    export function visitNode<T extends Node>(node: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T | undefined;

    export function visitNode<T extends Node>(node: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => T): T | undefined {
        if (node === undefined || visitor === undefined) {
            return node;
        }

        const visited = visitor(node);
        if (visited === node) {
            return node;
        }

        let visitedNode: Node | undefined;
        if (visited === undefined) {
            return undefined;
        }
        else if (isArray(visited)) {
            visitedNode = (lift || extractSingleNode)(visited);
        }
        else {
            visitedNode = visited;
        }

        Debug.assertNode(visitedNode, test);
        return visitedNode as T;
    }

    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    export function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T>;

    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    export function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined;

    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    export function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined {
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
            const updatedArray = factory.createNodeArray(updated, hasTrailingComma);
            setTextRangePosEnd(updatedArray, pos, end);
            return updatedArray;
        }

        return nodes;
    }

    /* @internal */
    export function visitArray<T extends Node, U extends T>(nodes: readonly T[] | undefined, visitor: Visitor, test: (node: Node) => node is U, start?: number, count?: number): readonly U[] | undefined {
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
    function visitArrayWorker<T extends Node>(nodes: readonly T[], visitor: Visitor, test: ((node: Node) => boolean) | undefined, start: number, count: number): readonly T[] | undefined {
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
                    if (isArray(visited)) {
                        for (const visitedNode of visited) {
                            void Debug.assertNode(visitedNode, test);
                            updated.push(visitedNode as T);
                        }
                    }
                    else {
                        void Debug.assertNode(visited, test);
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
            updated = nodesVisitor(nodes, visitor, isParameterDeclaration);

            // As of ES2015, any runtime execution of that occurs in for a parameter (such as evaluating an
            // initializer or a binding pattern), occurs in its own lexical scope. As a result, any expression
            // that we might transform that introduces a temporary variable would fail as the temporary variable
            // exists in a different lexical scope. To address this, we move any binding patterns and initializers
            // in a parameter list to the body if we detect a variable being hoisted while visiting a parameter list
            // when the emit target is greater than ES2015.
            if (context.getLexicalEnvironmentFlags() & LexicalEnvironmentFlags.VariablesHoistedInParameters &&
                getEmitScriptTarget(context.getCompilerOptions()) >= ScriptTarget.ES2015) {
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
                                            setEmitFlags(initializer, EmitFlags.NoSourceMap | getEmitFlags(initializer) | EmitFlags.NoComments)
                                        ),
                                        parameter
                                    ),
                                    EmitFlags.NoComments
                                )
                            )
                        ]),
                        parameter
                    ),
                    EmitFlags.SingleLine | EmitFlags.NoTrailingSourceMap | EmitFlags.NoTokenSourceMaps | EmitFlags.NoComments
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
    /* @internal*/ export function visitFunctionBody(node: FunctionBody, visitor: Visitor, context: TransformationContext, nodeVisitor?: NodeVisitor): FunctionBody; // eslint-disable-line @typescript-eslint/unified-signatures
    /* @internal*/ export function visitFunctionBody(node: FunctionBody | undefined, visitor: Visitor, context: TransformationContext, nodeVisitor?: NodeVisitor): FunctionBody | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    /* @internal*/ export function visitFunctionBody(node: ConciseBody, visitor: Visitor, context: TransformationContext, nodeVisitor?: NodeVisitor): ConciseBody; // eslint-disable-line @typescript-eslint/unified-signatures
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
    export function visitIterationBody(body: Statement, visitor: Visitor, context: TransformationContext): Statement {
        context.startBlockScope();
        const updated = visitNode(body, visitor, isStatement, context.factory.liftToBlock);
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
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    export function visitEachChild<T extends Node>(node: T, visitor: Visitor, context: TransformationContext): T;
    /* @internal */
    export function visitEachChild<T extends Node>(node: T, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor, tokenVisitor?: Visitor, nodeVisitor?: NodeVisitor): T; // eslint-disable-line @typescript-eslint/unified-signatures
    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: typeof visitNodes, tokenVisitor?: Visitor): T | undefined;
    /* @internal */
    export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor, tokenVisitor?: Visitor, nodeVisitor?: NodeVisitor): T | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    export function visitEachChild(node: Node | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor = visitNodes, tokenVisitor?: Visitor, nodeVisitor: NodeVisitor = visitNode): Node | undefined {
        if (node === undefined) {
            return undefined;
        }

        const kind = node.kind;

        // No need to visit nodes with no children.
        if ((kind > SyntaxKind.FirstToken && kind <= SyntaxKind.LastToken) || kind === SyntaxKind.ThisType) {
            return node;
        }

        const factory = context.factory;
        switch (kind) {
            // Names

            case SyntaxKind.Identifier:
                Debug.type<Identifier>(node);
                return factory.updateIdentifier(node,
                    nodesVisitor(node.typeArguments, visitor, isTypeNodeOrTypeParameterDeclaration));

            case SyntaxKind.QualifiedName:
                Debug.type<QualifiedName>(node);
                return factory.updateQualifiedName(node,
                    nodeVisitor(node.left, visitor, isEntityName),
                    nodeVisitor(node.right, visitor, isIdentifier));

            case SyntaxKind.ComputedPropertyName:
                Debug.type<ComputedPropertyName>(node);
                return factory.updateComputedPropertyName(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            // Signature elements
            case SyntaxKind.TypeParameter:
                Debug.type<TypeParameterDeclaration>(node);
                return factory.updateTypeParameterDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodeVisitor(node.constraint, visitor, isTypeNode),
                    nodeVisitor(node.default, visitor, isTypeNode));

            case SyntaxKind.Parameter:
                Debug.type<ParameterDeclaration>(node);
                return factory.updateParameterDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifierLike),
                    nodeVisitor(node.dotDotDotToken, tokenVisitor, isDotDotDotToken),
                    nodeVisitor(node.name, visitor, isBindingName),
                    nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    nodeVisitor(node.initializer, visitor, isExpression));

            case SyntaxKind.Decorator:
                Debug.type<Decorator>(node);
                return factory.updateDecorator(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            // Type elements
            case SyntaxKind.PropertySignature:
                Debug.type<PropertySignature>(node);
                return factory.updatePropertySignature(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.name, visitor, isPropertyName),
                    nodeVisitor(node.questionToken, tokenVisitor, isToken),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.PropertyDeclaration:
                Debug.type<PropertyDeclaration>(node);
                return factory.updatePropertyDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifierLike),
                    nodeVisitor(node.name, visitor, isPropertyName),
                    // QuestionToken and ExclamationToken is uniqued in Property Declaration and the signature of 'updateProperty' is that too
                    nodeVisitor(node.questionToken || node.exclamationToken, tokenVisitor, isQuestionOrExclamationToken),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    nodeVisitor(node.initializer, visitor, isExpression));

            case SyntaxKind.MethodSignature:
                Debug.type<MethodSignature>(node);
                return factory.updateMethodSignature(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.name, visitor, isPropertyName),
                    nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.parameters, visitor, isParameterDeclaration),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.MethodDeclaration:
                Debug.type<MethodDeclaration>(node);
                return factory.updateMethodDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifierLike),
                    nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken),
                    nodeVisitor(node.name, visitor, isPropertyName),
                    nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList(node.parameters, visitor, context, nodesVisitor),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    visitFunctionBody(node.body!, visitor, context, nodeVisitor));

            case SyntaxKind.Constructor:
                Debug.type<ConstructorDeclaration>(node);
                return factory.updateConstructorDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    visitParameterList(node.parameters, visitor, context, nodesVisitor),
                    visitFunctionBody(node.body!, visitor, context, nodeVisitor));

            case SyntaxKind.GetAccessor:
                Debug.type<GetAccessorDeclaration>(node);
                return factory.updateGetAccessorDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifierLike),
                    nodeVisitor(node.name, visitor, isPropertyName),
                    visitParameterList(node.parameters, visitor, context, nodesVisitor),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    visitFunctionBody(node.body!, visitor, context, nodeVisitor));

            case SyntaxKind.SetAccessor:
                Debug.type<SetAccessorDeclaration>(node);
                return factory.updateSetAccessorDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifierLike),
                    nodeVisitor(node.name, visitor, isPropertyName),
                    visitParameterList(node.parameters, visitor, context, nodesVisitor),
                    visitFunctionBody(node.body!, visitor, context, nodeVisitor));

            case SyntaxKind.ClassStaticBlockDeclaration:
                Debug.type<ClassStaticBlockDeclaration>(node);
                context.startLexicalEnvironment();
                context.suspendLexicalEnvironment();
                return factory.updateClassStaticBlockDeclaration(node,
                    visitFunctionBody(node.body, visitor, context, nodeVisitor));

            case SyntaxKind.CallSignature:
                Debug.type<CallSignatureDeclaration>(node);
                return factory.updateCallSignature(node,
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.parameters, visitor, isParameterDeclaration),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.ConstructSignature:
                Debug.type<ConstructSignatureDeclaration>(node);
                return factory.updateConstructSignature(node,
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.parameters, visitor, isParameterDeclaration),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.IndexSignature:
                Debug.type<IndexSignatureDeclaration>(node);
                return factory.updateIndexSignature(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodesVisitor(node.parameters, visitor, isParameterDeclaration),
                    nodeVisitor(node.type, visitor, isTypeNode));

            // Types
            case SyntaxKind.TypePredicate:
                Debug.type<TypePredicateNode>(node);
                return factory.updateTypePredicateNode(node,
                    nodeVisitor(node.assertsModifier, visitor, isAssertsKeyword),
                    nodeVisitor(node.parameterName, visitor, isIdentifierOrThisTypeNode),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.TypeReference:
                Debug.type<TypeReferenceNode>(node);
                return factory.updateTypeReferenceNode(node,
                    nodeVisitor(node.typeName, visitor, isEntityName),
                    nodesVisitor(node.typeArguments, visitor, isTypeNode));

            case SyntaxKind.FunctionType:
                Debug.type<FunctionTypeNode>(node);
                return factory.updateFunctionTypeNode(node,
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.parameters, visitor, isParameterDeclaration),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.ConstructorType:
                Debug.type<ConstructorTypeNode>(node);
                return factory.updateConstructorTypeNode(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.parameters, visitor, isParameterDeclaration),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.TypeQuery:
                Debug.type<TypeQueryNode>(node);
                return factory.updateTypeQueryNode(node,
                    nodeVisitor(node.exprName, visitor, isEntityName),
                    nodesVisitor(node.typeArguments, visitor, isTypeNode));

            case SyntaxKind.TypeLiteral:
                Debug.type<TypeLiteralNode>(node);
                return factory.updateTypeLiteralNode(node,
                    nodesVisitor(node.members, visitor, isTypeElement));

            case SyntaxKind.ArrayType:
                Debug.type<ArrayTypeNode>(node);
                return factory.updateArrayTypeNode(node,
                    nodeVisitor(node.elementType, visitor, isTypeNode));

            case SyntaxKind.TupleType:
                Debug.type<TupleTypeNode>(node);
                return factory.updateTupleTypeNode(node,
                    nodesVisitor(node.elements, visitor, isTypeNode));

            case SyntaxKind.OptionalType:
                Debug.type<OptionalTypeNode>(node);
                return factory.updateOptionalTypeNode(node,
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.RestType:
                Debug.type<RestTypeNode>(node);
                return factory.updateRestTypeNode(node,
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.UnionType:
                Debug.type<UnionTypeNode>(node);
                return factory.updateUnionTypeNode(node,
                    nodesVisitor(node.types, visitor, isTypeNode));

            case SyntaxKind.IntersectionType:
                Debug.type<IntersectionTypeNode>(node);
                return factory.updateIntersectionTypeNode(node,
                    nodesVisitor(node.types, visitor, isTypeNode));

            case SyntaxKind.ConditionalType:
                Debug.type<ConditionalTypeNode>(node);
                return factory.updateConditionalTypeNode(node,
                    nodeVisitor(node.checkType, visitor, isTypeNode),
                    nodeVisitor(node.extendsType, visitor, isTypeNode),
                    nodeVisitor(node.trueType, visitor, isTypeNode),
                    nodeVisitor(node.falseType, visitor, isTypeNode));

            case SyntaxKind.InferType:
                Debug.type<InferTypeNode>(node);
                return factory.updateInferTypeNode(node,
                    nodeVisitor(node.typeParameter, visitor, isTypeParameterDeclaration));

            case SyntaxKind.ImportType:
                Debug.type<ImportTypeNode>(node);
                return factory.updateImportTypeNode(node,
                    nodeVisitor(node.argument, visitor, isTypeNode),
                    nodeVisitor(node.assertions, visitor, isNode),
                    nodeVisitor(node.qualifier, visitor, isEntityName),
                    visitNodes(node.typeArguments, visitor, isTypeNode),
                    node.isTypeOf
                );

            case SyntaxKind.ImportTypeAssertionContainer:
                Debug.type<ImportTypeAssertionContainer>(node);
                return factory.updateImportTypeAssertionContainer(node,
                    nodeVisitor(node.assertClause, visitor, isNode),
                    node.multiLine
                );

            case SyntaxKind.NamedTupleMember:
                Debug.type<NamedTupleMember>(node);
                return factory.updateNamedTupleMember(node,
                    visitNode(node.dotDotDotToken, visitor, isDotDotDotToken),
                    visitNode(node.name, visitor, isIdentifier),
                    visitNode(node.questionToken, visitor, isQuestionToken),
                    visitNode(node.type, visitor, isTypeNode),
                );

            case SyntaxKind.ParenthesizedType:
                Debug.type<ParenthesizedTypeNode>(node);
                return factory.updateParenthesizedType(node,
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.TypeOperator:
                Debug.type<TypeOperatorNode>(node);
                return factory.updateTypeOperatorNode(node,
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.IndexedAccessType:
                Debug.type<IndexedAccessTypeNode>(node);
                return factory.updateIndexedAccessTypeNode(node,
                    nodeVisitor(node.objectType, visitor, isTypeNode),
                    nodeVisitor(node.indexType, visitor, isTypeNode));

            case SyntaxKind.MappedType:
                Debug.type<MappedTypeNode>(node);
                return factory.updateMappedTypeNode(node,
                    nodeVisitor(node.readonlyToken, tokenVisitor, isReadonlyKeywordOrPlusOrMinusToken),
                    nodeVisitor(node.typeParameter, visitor, isTypeParameterDeclaration),
                    nodeVisitor(node.nameType, visitor, isTypeNode),
                    nodeVisitor(node.questionToken, tokenVisitor, isQuestionOrPlusOrMinusToken),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    nodesVisitor(node.members, visitor, isTypeElement));

            case SyntaxKind.LiteralType:
                Debug.type<LiteralTypeNode>(node);
                return factory.updateLiteralTypeNode(node,
                    nodeVisitor(node.literal, visitor, isExpression));

            case SyntaxKind.TemplateLiteralType:
                Debug.type<TemplateLiteralTypeNode>(node);
                return factory.updateTemplateLiteralType(node,
                    nodeVisitor(node.head, visitor, isTemplateHead),
                    nodesVisitor(node.templateSpans, visitor, isTemplateLiteralTypeSpan));

            case SyntaxKind.TemplateLiteralTypeSpan:
                Debug.type<TemplateLiteralTypeSpan>(node);
                return factory.updateTemplateLiteralTypeSpan(node,
                    nodeVisitor(node.type, visitor, isTypeNode),
                    nodeVisitor(node.literal, visitor, isTemplateMiddleOrTemplateTail));

            // Binding patterns
            case SyntaxKind.ObjectBindingPattern:
                Debug.type<ObjectBindingPattern>(node);
                return factory.updateObjectBindingPattern(node,
                    nodesVisitor(node.elements, visitor, isBindingElement));

            case SyntaxKind.ArrayBindingPattern:
                Debug.type<ArrayBindingPattern>(node);
                return factory.updateArrayBindingPattern(node,
                    nodesVisitor(node.elements, visitor, isArrayBindingElement));

            case SyntaxKind.BindingElement:
                Debug.type<BindingElement>(node);
                return factory.updateBindingElement(node,
                    nodeVisitor(node.dotDotDotToken, tokenVisitor, isDotDotDotToken),
                    nodeVisitor(node.propertyName, visitor, isPropertyName),
                    nodeVisitor(node.name, visitor, isBindingName),
                    nodeVisitor(node.initializer, visitor, isExpression));

            // Expression
            case SyntaxKind.ArrayLiteralExpression:
                Debug.type<ArrayLiteralExpression>(node);
                return factory.updateArrayLiteralExpression(node,
                    nodesVisitor(node.elements, visitor, isExpression));

            case SyntaxKind.ObjectLiteralExpression:
                Debug.type<ObjectLiteralExpression>(node);
                return factory.updateObjectLiteralExpression(node,
                    nodesVisitor(node.properties, visitor, isObjectLiteralElementLike));

            case SyntaxKind.PropertyAccessExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    Debug.type<PropertyAccessChain>(node);
                    return factory.updatePropertyAccessChain(node,
                        nodeVisitor(node.expression, visitor, isExpression),
                        nodeVisitor(node.questionDotToken, tokenVisitor, isQuestionDotToken),
                        nodeVisitor(node.name, visitor, isMemberName));
                }
                Debug.type<PropertyAccessExpression>(node);
                return factory.updatePropertyAccessExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodeVisitor(node.name, visitor, isMemberName));

            case SyntaxKind.ElementAccessExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    Debug.type<ElementAccessChain>(node);
                    return factory.updateElementAccessChain(node,
                        nodeVisitor(node.expression, visitor, isExpression),
                        nodeVisitor(node.questionDotToken, tokenVisitor, isQuestionDotToken),
                        nodeVisitor(node.argumentExpression, visitor, isExpression));
                }
                Debug.type<ElementAccessExpression>(node);
                return factory.updateElementAccessExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodeVisitor(node.argumentExpression, visitor, isExpression));

            case SyntaxKind.CallExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    Debug.type<CallChain>(node);
                    return factory.updateCallChain(node,
                        nodeVisitor(node.expression, visitor, isExpression),
                        nodeVisitor(node.questionDotToken, tokenVisitor, isQuestionDotToken),
                        nodesVisitor(node.typeArguments, visitor, isTypeNode),
                        nodesVisitor(node.arguments, visitor, isExpression));
                }
                Debug.type<CallExpression>(node);
                return factory.updateCallExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodesVisitor(node.typeArguments, visitor, isTypeNode),
                    nodesVisitor(node.arguments, visitor, isExpression));

            case SyntaxKind.NewExpression:
                Debug.type<NewExpression>(node);
                return factory.updateNewExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodesVisitor(node.typeArguments, visitor, isTypeNode),
                    nodesVisitor(node.arguments, visitor, isExpression));

            case SyntaxKind.TaggedTemplateExpression:
                Debug.type<TaggedTemplateExpression>(node);
                return factory.updateTaggedTemplateExpression(node,
                    nodeVisitor(node.tag, visitor, isExpression),
                    visitNodes(node.typeArguments, visitor, isTypeNode),
                    nodeVisitor(node.template, visitor, isTemplateLiteral));

            case SyntaxKind.TypeAssertionExpression:
                Debug.type<TypeAssertion>(node);
                return factory.updateTypeAssertion(node,
                    nodeVisitor(node.type, visitor, isTypeNode),
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.ParenthesizedExpression:
                Debug.type<ParenthesizedExpression>(node);
                return factory.updateParenthesizedExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.FunctionExpression:
                Debug.type<FunctionExpression>(node);
                return factory.updateFunctionExpression(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList(node.parameters, visitor, context, nodesVisitor),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    visitFunctionBody(node.body, visitor, context, nodeVisitor));

            case SyntaxKind.ArrowFunction:
                Debug.type<ArrowFunction>(node);
                return factory.updateArrowFunction(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList(node.parameters, visitor, context, nodesVisitor),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    nodeVisitor(node.equalsGreaterThanToken, tokenVisitor, isEqualsGreaterThanToken),
                    visitFunctionBody(node.body, visitor, context, nodeVisitor));

            case SyntaxKind.DeleteExpression:
                Debug.type<DeleteExpression>(node);
                return factory.updateDeleteExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.TypeOfExpression:
                Debug.type<TypeOfExpression>(node);
                return factory.updateTypeOfExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.VoidExpression:
                Debug.type<VoidExpression>(node);
                return factory.updateVoidExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.AwaitExpression:
                Debug.type<AwaitExpression>(node);
                return factory.updateAwaitExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.PrefixUnaryExpression:
                Debug.type<PrefixUnaryExpression>(node);
                return factory.updatePrefixUnaryExpression(node,
                    nodeVisitor(node.operand, visitor, isExpression));

            case SyntaxKind.PostfixUnaryExpression:
                Debug.type<PostfixUnaryExpression>(node);
                return factory.updatePostfixUnaryExpression(node,
                    nodeVisitor(node.operand, visitor, isExpression));

            case SyntaxKind.BinaryExpression:
                Debug.type<BinaryExpression>(node);
                return factory.updateBinaryExpression(node,
                    nodeVisitor(node.left, visitor, isExpression),
                    nodeVisitor(node.operatorToken, tokenVisitor, isBinaryOperatorToken),
                    nodeVisitor(node.right, visitor, isExpression));

            case SyntaxKind.ConditionalExpression:
                Debug.type<ConditionalExpression>(node);
                return factory.updateConditionalExpression(node,
                    nodeVisitor(node.condition, visitor, isExpression),
                    nodeVisitor(node.questionToken, tokenVisitor, isQuestionToken),
                    nodeVisitor(node.whenTrue, visitor, isExpression),
                    nodeVisitor(node.colonToken, tokenVisitor, isColonToken),
                    nodeVisitor(node.whenFalse, visitor, isExpression));

            case SyntaxKind.TemplateExpression:
                Debug.type<TemplateExpression>(node);
                return factory.updateTemplateExpression(node,
                    nodeVisitor(node.head, visitor, isTemplateHead),
                    nodesVisitor(node.templateSpans, visitor, isTemplateSpan));

            case SyntaxKind.YieldExpression:
                Debug.type<YieldExpression>(node);
                return factory.updateYieldExpression(node,
                    nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken),
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.SpreadElement:
                Debug.type<SpreadElement>(node);
                return factory.updateSpreadElement(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.ClassExpression:
                Debug.type<ClassExpression>(node);
                return factory.updateClassExpression(node,
                    nodesVisitor(node.modifiers, visitor, isModifierLike),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.heritageClauses, visitor, isHeritageClause),
                    nodesVisitor(node.members, visitor, isClassElement));

            case SyntaxKind.ExpressionWithTypeArguments:
                Debug.type<ExpressionWithTypeArguments>(node);
                return factory.updateExpressionWithTypeArguments(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodesVisitor(node.typeArguments, visitor, isTypeNode));

            case SyntaxKind.AsExpression:
                Debug.type<AsExpression>(node);
                return factory.updateAsExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.NonNullExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    Debug.type<NonNullChain>(node);
                    return factory.updateNonNullChain(node,
                        nodeVisitor(node.expression, visitor, isExpression));
                }
                Debug.type<NonNullExpression>(node);
                return factory.updateNonNullExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.MetaProperty:
                Debug.type<MetaProperty>(node);
                return factory.updateMetaProperty(node,
                    nodeVisitor(node.name, visitor, isIdentifier));

            // Misc
            case SyntaxKind.TemplateSpan:
                Debug.type<TemplateSpan>(node);
                return factory.updateTemplateSpan(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodeVisitor(node.literal, visitor, isTemplateMiddleOrTemplateTail));

            // Element
            case SyntaxKind.Block:
                Debug.type<Block>(node);
                return factory.updateBlock(node,
                    nodesVisitor(node.statements, visitor, isStatement));

            case SyntaxKind.VariableStatement:
                Debug.type<VariableStatement>(node);
                return factory.updateVariableStatement(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.declarationList, visitor, isVariableDeclarationList));

            case SyntaxKind.ExpressionStatement:
                Debug.type<ExpressionStatement>(node);
                return factory.updateExpressionStatement(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.IfStatement:
                Debug.type<IfStatement>(node);
                return factory.updateIfStatement(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodeVisitor(node.thenStatement, visitor, isStatement, factory.liftToBlock),
                    nodeVisitor(node.elseStatement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.DoStatement:
                Debug.type<DoStatement>(node);
                return factory.updateDoStatement(node,
                    visitIterationBody(node.statement, visitor, context),
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.WhileStatement:
                Debug.type<WhileStatement>(node);
                return factory.updateWhileStatement(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    visitIterationBody(node.statement, visitor, context));

            case SyntaxKind.ForStatement:
                Debug.type<ForStatement>(node);
                return factory.updateForStatement(node,
                    nodeVisitor(node.initializer, visitor, isForInitializer),
                    nodeVisitor(node.condition, visitor, isExpression),
                    nodeVisitor(node.incrementor, visitor, isExpression),
                    visitIterationBody(node.statement, visitor, context));

            case SyntaxKind.ForInStatement:
                Debug.type<ForInStatement>(node);
                return factory.updateForInStatement(node,
                    nodeVisitor(node.initializer, visitor, isForInitializer),
                    nodeVisitor(node.expression, visitor, isExpression),
                    visitIterationBody(node.statement, visitor, context));

            case SyntaxKind.ForOfStatement:
                Debug.type<ForOfStatement>(node);
                return factory.updateForOfStatement(node,
                    nodeVisitor(node.awaitModifier, tokenVisitor, isAwaitKeyword),
                    nodeVisitor(node.initializer, visitor, isForInitializer),
                    nodeVisitor(node.expression, visitor, isExpression),
                    visitIterationBody(node.statement, visitor, context));

            case SyntaxKind.ContinueStatement:
                Debug.type<ContinueStatement>(node);
                return factory.updateContinueStatement(node,
                    nodeVisitor(node.label, visitor, isIdentifier));

            case SyntaxKind.BreakStatement:
                Debug.type<BreakStatement>(node);
                return factory.updateBreakStatement(node,
                    nodeVisitor(node.label, visitor, isIdentifier));

            case SyntaxKind.ReturnStatement:
                Debug.type<ReturnStatement>(node);
                return factory.updateReturnStatement(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.WithStatement:
                Debug.type<WithStatement>(node);
                return factory.updateWithStatement(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodeVisitor(node.statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.SwitchStatement:
                Debug.type<SwitchStatement>(node);
                return factory.updateSwitchStatement(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodeVisitor(node.caseBlock, visitor, isCaseBlock));

            case SyntaxKind.LabeledStatement:
                Debug.type<LabeledStatement>(node);
                return factory.updateLabeledStatement(node,
                    nodeVisitor(node.label, visitor, isIdentifier),
                    nodeVisitor(node.statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ThrowStatement:
                Debug.type<ThrowStatement>(node);
                return factory.updateThrowStatement(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.TryStatement:
                Debug.type<TryStatement>(node);
                return factory.updateTryStatement(node,
                    nodeVisitor(node.tryBlock, visitor, isBlock),
                    nodeVisitor(node.catchClause, visitor, isCatchClause),
                    nodeVisitor(node.finallyBlock, visitor, isBlock));

            case SyntaxKind.VariableDeclaration:
                Debug.type<VariableDeclaration>(node);
                return factory.updateVariableDeclaration(node,
                    nodeVisitor(node.name, visitor, isBindingName),
                    nodeVisitor(node.exclamationToken, tokenVisitor, isExclamationToken),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    nodeVisitor(node.initializer, visitor, isExpression));

            case SyntaxKind.VariableDeclarationList:
                Debug.type<VariableDeclarationList>(node);
                return factory.updateVariableDeclarationList(node,
                    nodesVisitor(node.declarations, visitor, isVariableDeclaration));

            case SyntaxKind.FunctionDeclaration:
                Debug.type<FunctionDeclaration>(node);
                return factory.updateFunctionDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.asteriskToken, tokenVisitor, isAsteriskToken),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList(node.parameters, visitor, context, nodesVisitor),
                    nodeVisitor(node.type, visitor, isTypeNode),
                    visitFunctionBody(node.body, visitor, context, nodeVisitor));

            case SyntaxKind.ClassDeclaration:
                Debug.type<ClassDeclaration>(node);
                return factory.updateClassDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifierLike),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.heritageClauses, visitor, isHeritageClause),
                    nodesVisitor(node.members, visitor, isClassElement));

            case SyntaxKind.InterfaceDeclaration:
                Debug.type<InterfaceDeclaration>(node);
                return factory.updateInterfaceDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor(node.heritageClauses, visitor, isHeritageClause),
                    nodesVisitor(node.members, visitor, isTypeElement));

            case SyntaxKind.TypeAliasDeclaration:
                Debug.type<TypeAliasDeclaration>(node);
                return factory.updateTypeAliasDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodesVisitor(node.typeParameters, visitor, isTypeParameterDeclaration),
                    nodeVisitor(node.type, visitor, isTypeNode));

            case SyntaxKind.EnumDeclaration:
                Debug.type<EnumDeclaration>(node);
                return factory.updateEnumDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodesVisitor(node.members, visitor, isEnumMember));

            case SyntaxKind.ModuleDeclaration:
                Debug.type<ModuleDeclaration>(node);
                return factory.updateModuleDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.name, visitor, isModuleName),
                    nodeVisitor(node.body, visitor, isModuleBody));

            case SyntaxKind.ModuleBlock:
                Debug.type<ModuleBlock>(node);
                return factory.updateModuleBlock(node,
                    nodesVisitor(node.statements, visitor, isStatement));

            case SyntaxKind.CaseBlock:
                Debug.type<CaseBlock>(node);
                return factory.updateCaseBlock(node,
                    nodesVisitor(node.clauses, visitor, isCaseOrDefaultClause));

            case SyntaxKind.NamespaceExportDeclaration:
                Debug.type<NamespaceExportDeclaration>(node);
                return factory.updateNamespaceExportDeclaration(node,
                    nodeVisitor(node.name, visitor, isIdentifier));

            case SyntaxKind.ImportEqualsDeclaration:
                Debug.type<ImportEqualsDeclaration>(node);
                return factory.updateImportEqualsDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    node.isTypeOnly,
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodeVisitor(node.moduleReference, visitor, isModuleReference));

            case SyntaxKind.ImportDeclaration:
                Debug.type<ImportDeclaration>(node);
                return factory.updateImportDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.importClause, visitor, isImportClause),
                    nodeVisitor(node.moduleSpecifier, visitor, isExpression),
                    nodeVisitor(node.assertClause, visitor, isAssertClause));

            case SyntaxKind.AssertClause:
                Debug.type<AssertClause>(node);
                return factory.updateAssertClause(node,
                    nodesVisitor(node.elements, visitor, isAssertEntry),
                    node.multiLine);

            case SyntaxKind.AssertEntry:
                Debug.type<AssertEntry>(node);
                return factory.updateAssertEntry(node,
                    nodeVisitor(node.name, visitor, isAssertionKey),
                    nodeVisitor(node.value, visitor, isExpressionNode));

            case SyntaxKind.ImportClause:
                Debug.type<ImportClause>(node);
                return factory.updateImportClause(node,
                    node.isTypeOnly,
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodeVisitor(node.namedBindings, visitor, isNamedImportBindings));

            case SyntaxKind.NamespaceImport:
                Debug.type<NamespaceImport>(node);
                return factory.updateNamespaceImport(node,
                    nodeVisitor(node.name, visitor, isIdentifier));

            case SyntaxKind.NamespaceExport:
                    Debug.type<NamespaceExport>(node);
                    return factory.updateNamespaceExport(node,
                        nodeVisitor(node.name, visitor, isIdentifier));

            case SyntaxKind.NamedImports:
                Debug.type<NamedImports>(node);
                return factory.updateNamedImports(node,
                    nodesVisitor(node.elements, visitor, isImportSpecifier));

            case SyntaxKind.ImportSpecifier:
                Debug.type<ImportSpecifier>(node);
                return factory.updateImportSpecifier(node,
                    node.isTypeOnly,
                    nodeVisitor(node.propertyName, visitor, isIdentifier),
                    nodeVisitor(node.name, visitor, isIdentifier));

            case SyntaxKind.ExportAssignment:
                Debug.type<ExportAssignment>(node);
                return factory.updateExportAssignment(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.ExportDeclaration:
                Debug.type<ExportDeclaration>(node);
                return factory.updateExportDeclaration(node,
                    nodesVisitor(node.modifiers, visitor, isModifier),
                    node.isTypeOnly,
                    nodeVisitor(node.exportClause, visitor, isNamedExportBindings),
                    nodeVisitor(node.moduleSpecifier, visitor, isExpression),
                    nodeVisitor(node.assertClause, visitor, isAssertClause));

            case SyntaxKind.NamedExports:
                Debug.type<NamedExports>(node);
                return factory.updateNamedExports(node,
                    nodesVisitor(node.elements, visitor, isExportSpecifier));

            case SyntaxKind.ExportSpecifier:
                Debug.type<ExportSpecifier>(node);
                return factory.updateExportSpecifier(node,
                    node.isTypeOnly,
                    nodeVisitor(node.propertyName, visitor, isIdentifier),
                    nodeVisitor(node.name, visitor, isIdentifier));

            // Module references
            case SyntaxKind.ExternalModuleReference:
                Debug.type<ExternalModuleReference>(node);
                return factory.updateExternalModuleReference(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            // JSX
            case SyntaxKind.JsxElement:
                Debug.type<JsxElement>(node);
                return factory.updateJsxElement(node,
                    nodeVisitor(node.openingElement, visitor, isJsxOpeningElement),
                    nodesVisitor(node.children, visitor, isJsxChild),
                    nodeVisitor(node.closingElement, visitor, isJsxClosingElement));

            case SyntaxKind.JsxSelfClosingElement:
                Debug.type<JsxSelfClosingElement>(node);
                return factory.updateJsxSelfClosingElement(node,
                    nodeVisitor(node.tagName, visitor, isJsxTagNameExpression),
                    nodesVisitor(node.typeArguments, visitor, isTypeNode),
                    nodeVisitor(node.attributes, visitor, isJsxAttributes));

            case SyntaxKind.JsxOpeningElement:
                Debug.type<JsxOpeningElement>(node);
                return factory.updateJsxOpeningElement(node,
                    nodeVisitor(node.tagName, visitor, isJsxTagNameExpression),
                    nodesVisitor(node.typeArguments, visitor, isTypeNode),
                    nodeVisitor(node.attributes, visitor, isJsxAttributes));

            case SyntaxKind.JsxClosingElement:
                Debug.type<JsxClosingElement>(node);
                return factory.updateJsxClosingElement(node,
                    nodeVisitor(node.tagName, visitor, isJsxTagNameExpression));

            case SyntaxKind.JsxFragment:
                Debug.type<JsxFragment>(node);
                return factory.updateJsxFragment(node,
                    nodeVisitor(node.openingFragment, visitor, isJsxOpeningFragment),
                    nodesVisitor(node.children, visitor, isJsxChild),
                    nodeVisitor(node.closingFragment, visitor, isJsxClosingFragment));

            case SyntaxKind.JsxAttribute:
                Debug.type<JsxAttribute>(node);
                return factory.updateJsxAttribute(node,
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodeVisitor(node.initializer, visitor, isStringLiteralOrJsxExpression));

            case SyntaxKind.JsxAttributes:
                Debug.type<JsxAttributes>(node);
                return factory.updateJsxAttributes(node,
                    nodesVisitor(node.properties, visitor, isJsxAttributeLike));

            case SyntaxKind.JsxSpreadAttribute:
                Debug.type<JsxSpreadAttribute>(node);
                return factory.updateJsxSpreadAttribute(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.JsxExpression:
                Debug.type<JsxExpression>(node);
                return factory.updateJsxExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            // Clauses
            case SyntaxKind.CaseClause:
                Debug.type<CaseClause>(node);
                return factory.updateCaseClause(node,
                    nodeVisitor(node.expression, visitor, isExpression),
                    nodesVisitor(node.statements, visitor, isStatement));

            case SyntaxKind.DefaultClause:
                Debug.type<DefaultClause>(node);
                return factory.updateDefaultClause(node,
                    nodesVisitor(node.statements, visitor, isStatement));

            case SyntaxKind.HeritageClause:
                Debug.type<HeritageClause>(node);
                return factory.updateHeritageClause(node,
                    nodesVisitor(node.types, visitor, isExpressionWithTypeArguments));

            case SyntaxKind.CatchClause:
                Debug.type<CatchClause>(node);
                return factory.updateCatchClause(node,
                    nodeVisitor(node.variableDeclaration, visitor, isVariableDeclaration),
                    nodeVisitor(node.block, visitor, isBlock));

            // Property assignments
            case SyntaxKind.PropertyAssignment:
                Debug.type<PropertyAssignment>(node);
                return factory.updatePropertyAssignment(node,
                    nodeVisitor(node.name, visitor, isPropertyName),
                    nodeVisitor(node.initializer, visitor, isExpression));

            case SyntaxKind.ShorthandPropertyAssignment:
                Debug.type<ShorthandPropertyAssignment>(node);
                return factory.updateShorthandPropertyAssignment(node,
                    nodeVisitor(node.name, visitor, isIdentifier),
                    nodeVisitor(node.objectAssignmentInitializer, visitor, isExpression));

            case SyntaxKind.SpreadAssignment:
                Debug.type<SpreadAssignment>(node);
                return factory.updateSpreadAssignment(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            // Enum
            case SyntaxKind.EnumMember:
                Debug.type<EnumMember>(node);
                return factory.updateEnumMember(node,
                    nodeVisitor(node.name, visitor, isPropertyName),
                    nodeVisitor(node.initializer, visitor, isExpression));

            // Top-level nodes
            case SyntaxKind.SourceFile:
                Debug.type<SourceFile>(node);
                return factory.updateSourceFile(node,
                    visitLexicalEnvironment(node.statements, visitor, context));

            // Transformation nodes
            case SyntaxKind.PartiallyEmittedExpression:
                Debug.type<PartiallyEmittedExpression>(node);
                return factory.updatePartiallyEmittedExpression(node,
                    nodeVisitor(node.expression, visitor, isExpression));

            case SyntaxKind.CommaListExpression:
                Debug.type<CommaListExpression>(node);
                return factory.updateCommaListExpression(node,
                    nodesVisitor(node.elements, visitor, isExpression));

            default:
                // No need to visit nodes with no children.
                return node;
        }

    }

    /**
     * Extracts the single node from a NodeArray.
     *
     * @param nodes The NodeArray.
     */
    function extractSingleNode(nodes: readonly Node[]): Node | undefined {
        Debug.assert(nodes.length <= 1, "Too many nodes written to output.");
        return singleOrUndefined(nodes);
    }
}
