namespace ts {
    const isTypeNodeOrTypeParameterDeclaration = or(isTypeNode, isTypeParameterDeclaration);

    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    export function visitNode<T extends Node>(node: T, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T;

    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    export function visitNode<T extends Node>(node: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T | undefined;

    export function visitNode<T extends Node>(node: T | undefined, visitor: Visitor | undefined, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T | undefined {
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
        return <T>visitedNode;
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

        let updated: T[] | undefined;

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
            // If we are not visiting all of the original nodes, we must always create a new array.
            // Since this is a fragment of a node array, we do not copy over the previous location
            // and will only copy over `hasTrailingComma` if we are including the last element.
            updated = [];
            hasTrailingComma = nodes.hasTrailingComma && start + count === length;
        }

        // Visit each original node.
        for (let i = 0; i < count; i++) {
            const node: T = nodes[i + start];
            const visited = node !== undefined ? visitor(node) : undefined;
            if (updated !== undefined || visited === undefined || visited !== node) {
                if (updated === undefined) {
                    // Ensure we have a copy of `nodes`, up to the current index.
                    updated = nodes.slice(0, i);
                    hasTrailingComma = nodes.hasTrailingComma;
                    pos = nodes.pos;
                    end = nodes.end;
                }
                if (visited) {
                    if (isArray(visited)) {
                        for (const visitedNode of visited) {
                            void Debug.assertNode(visitedNode, test);
                            updated.push(<T>visitedNode);
                        }
                    }
                    else {
                        void Debug.assertNode(visited, test);
                        updated.push(<T>visited);
                    }
                }
            }
        }

        if (updated) {
            // TODO(rbuckton): Remove dependency on `ts.factory` in favor of a provided factory.
            const updatedArray = factory.createNodeArray(updated, hasTrailingComma);
            setTextRangePosEnd(updatedArray, pos, end);
            return updatedArray;
        }

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
            parameter.decorators,
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
            parameter.decorators,
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
                return factory.updateIdentifier(<Identifier>node,
                    nodesVisitor((<Identifier>node).typeArguments, visitor, isTypeNodeOrTypeParameterDeclaration));

            case SyntaxKind.QualifiedName:
                return factory.updateQualifiedName(<QualifiedName>node,
                    nodeVisitor((<QualifiedName>node).left, visitor, isEntityName),
                    nodeVisitor((<QualifiedName>node).right, visitor, isIdentifier));

            case SyntaxKind.ComputedPropertyName:
                return factory.updateComputedPropertyName(<ComputedPropertyName>node,
                    nodeVisitor((<ComputedPropertyName>node).expression, visitor, isExpression));

            // Signature elements
            case SyntaxKind.TypeParameter:
                return factory.updateTypeParameterDeclaration(<TypeParameterDeclaration>node,
                    nodeVisitor((<TypeParameterDeclaration>node).name, visitor, isIdentifier),
                    nodeVisitor((<TypeParameterDeclaration>node).constraint, visitor, isTypeNode),
                    nodeVisitor((<TypeParameterDeclaration>node).default, visitor, isTypeNode));

            case SyntaxKind.Parameter:
                return factory.updateParameterDeclaration(<ParameterDeclaration>node,
                    nodesVisitor((<ParameterDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ParameterDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<ParameterDeclaration>node).dotDotDotToken, tokenVisitor, isToken),
                    nodeVisitor((<ParameterDeclaration>node).name, visitor, isBindingName),
                    nodeVisitor((<ParameterDeclaration>node).questionToken, tokenVisitor, isToken),
                    nodeVisitor((<ParameterDeclaration>node).type, visitor, isTypeNode),
                    nodeVisitor((<ParameterDeclaration>node).initializer, visitor, isExpression));

            case SyntaxKind.Decorator:
                return factory.updateDecorator(<Decorator>node,
                    nodeVisitor((<Decorator>node).expression, visitor, isExpression));

            // Type elements
            case SyntaxKind.PropertySignature:
                return factory.updatePropertySignature((<PropertySignature>node),
                    nodesVisitor((<PropertySignature>node).modifiers, visitor, isToken),
                    nodeVisitor((<PropertySignature>node).name, visitor, isPropertyName),
                    nodeVisitor((<PropertySignature>node).questionToken, tokenVisitor, isToken),
                    nodeVisitor((<PropertySignature>node).type, visitor, isTypeNode));

            case SyntaxKind.PropertyDeclaration:
                return factory.updatePropertyDeclaration(<PropertyDeclaration>node,
                    nodesVisitor((<PropertyDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<PropertyDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<PropertyDeclaration>node).name, visitor, isPropertyName),
                    // QuestionToken and ExclamationToken is uniqued in Property Declaration and the signature of 'updateProperty' is that too
                    nodeVisitor((<PropertyDeclaration>node).questionToken || (<PropertyDeclaration>node).exclamationToken, tokenVisitor, isToken),
                    nodeVisitor((<PropertyDeclaration>node).type, visitor, isTypeNode),
                    nodeVisitor((<PropertyDeclaration>node).initializer, visitor, isExpression));

            case SyntaxKind.MethodSignature:
                return factory.updateMethodSignature(<MethodSignature>node,
                    nodesVisitor((<ParameterDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<MethodSignature>node).name, visitor, isPropertyName),
                    nodeVisitor((<MethodSignature>node).questionToken, tokenVisitor, isToken),
                    nodesVisitor((<MethodSignature>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<MethodSignature>node).parameters, visitor, isParameterDeclaration),
                    nodeVisitor((<MethodSignature>node).type, visitor, isTypeNode));

            case SyntaxKind.MethodDeclaration:
                return factory.updateMethodDeclaration(<MethodDeclaration>node,
                    nodesVisitor((<MethodDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<MethodDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<MethodDeclaration>node).asteriskToken, tokenVisitor, isToken),
                    nodeVisitor((<MethodDeclaration>node).name, visitor, isPropertyName),
                    nodeVisitor((<MethodDeclaration>node).questionToken, tokenVisitor, isToken),
                    nodesVisitor((<MethodDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<MethodDeclaration>node).parameters, visitor, context, nodesVisitor),
                    nodeVisitor((<MethodDeclaration>node).type, visitor, isTypeNode),
                    visitFunctionBody((<MethodDeclaration>node).body!, visitor, context, nodeVisitor));

            case SyntaxKind.Constructor:
                return factory.updateConstructorDeclaration(<ConstructorDeclaration>node,
                    nodesVisitor((<ConstructorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ConstructorDeclaration>node).modifiers, visitor, isModifier),
                    visitParameterList((<ConstructorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitFunctionBody((<ConstructorDeclaration>node).body!, visitor, context, nodeVisitor));

            case SyntaxKind.GetAccessor:
                return factory.updateGetAccessorDeclaration(<GetAccessorDeclaration>node,
                    nodesVisitor((<GetAccessorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<GetAccessorDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<GetAccessorDeclaration>node).name, visitor, isPropertyName),
                    visitParameterList((<GetAccessorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    nodeVisitor((<GetAccessorDeclaration>node).type, visitor, isTypeNode),
                    visitFunctionBody((<GetAccessorDeclaration>node).body!, visitor, context, nodeVisitor));

            case SyntaxKind.SetAccessor:
                return factory.updateSetAccessorDeclaration(<SetAccessorDeclaration>node,
                    nodesVisitor((<SetAccessorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<SetAccessorDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<SetAccessorDeclaration>node).name, visitor, isPropertyName),
                    visitParameterList((<SetAccessorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitFunctionBody((<SetAccessorDeclaration>node).body!, visitor, context, nodeVisitor));

            case SyntaxKind.CallSignature:
                return factory.updateCallSignature(<CallSignatureDeclaration>node,
                    nodesVisitor((<CallSignatureDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<CallSignatureDeclaration>node).parameters, visitor, isParameterDeclaration),
                    nodeVisitor((<CallSignatureDeclaration>node).type, visitor, isTypeNode));

            case SyntaxKind.ConstructSignature:
                return factory.updateConstructSignature(<ConstructSignatureDeclaration>node,
                    nodesVisitor((<ConstructSignatureDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ConstructSignatureDeclaration>node).parameters, visitor, isParameterDeclaration),
                    nodeVisitor((<ConstructSignatureDeclaration>node).type, visitor, isTypeNode));

            case SyntaxKind.IndexSignature:
                return factory.updateIndexSignature(<IndexSignatureDeclaration>node,
                    nodesVisitor((<IndexSignatureDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<IndexSignatureDeclaration>node).modifiers, visitor, isModifier),
                    nodesVisitor((<IndexSignatureDeclaration>node).parameters, visitor, isParameterDeclaration),
                    nodeVisitor((<IndexSignatureDeclaration>node).type, visitor, isTypeNode));

            // Types
            case SyntaxKind.TypePredicate:
                return factory.updateTypePredicateNode(<TypePredicateNode>node,
                    nodeVisitor((<TypePredicateNode>node).assertsModifier, visitor),
                    nodeVisitor((<TypePredicateNode>node).parameterName, visitor),
                    nodeVisitor((<TypePredicateNode>node).type, visitor, isTypeNode));

            case SyntaxKind.TypeReference:
                return factory.updateTypeReferenceNode(<TypeReferenceNode>node,
                    nodeVisitor((<TypeReferenceNode>node).typeName, visitor, isEntityName),
                    nodesVisitor((<TypeReferenceNode>node).typeArguments, visitor, isTypeNode));

            case SyntaxKind.FunctionType:
                return factory.updateFunctionTypeNode(<FunctionTypeNode>node,
                    nodesVisitor((<FunctionTypeNode>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<FunctionTypeNode>node).parameters, visitor, isParameterDeclaration),
                    nodeVisitor((<FunctionTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.ConstructorType:
                return factory.updateConstructorTypeNode(<ConstructorTypeNode>node,
                    nodesVisitor((<ConstructorTypeNode>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ConstructorTypeNode>node).parameters, visitor, isParameterDeclaration),
                    nodeVisitor((<ConstructorTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.TypeQuery:
                return factory.updateTypeQueryNode((<TypeQueryNode>node),
                    nodeVisitor((<TypeQueryNode>node).exprName, visitor, isEntityName));

            case SyntaxKind.TypeLiteral:
                return factory.updateTypeLiteralNode((<TypeLiteralNode>node),
                    nodesVisitor((<TypeLiteralNode>node).members, visitor, isTypeElement));

            case SyntaxKind.ArrayType:
                return factory.updateArrayTypeNode(<ArrayTypeNode>node,
                    nodeVisitor((<ArrayTypeNode>node).elementType, visitor, isTypeNode));

            case SyntaxKind.TupleType:
                return factory.updateTupleTypeNode((<TupleTypeNode>node),
                    nodesVisitor((<TupleTypeNode>node).elements, visitor, isTypeNode));

            case SyntaxKind.OptionalType:
                return factory.updateOptionalTypeNode((<OptionalTypeNode>node),
                    nodeVisitor((<OptionalTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.RestType:
                return factory.updateRestTypeNode((<RestTypeNode>node),
                    nodeVisitor((<RestTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.UnionType:
                return factory.updateUnionTypeNode(<UnionTypeNode>node,
                    nodesVisitor((<UnionTypeNode>node).types, visitor, isTypeNode));

            case SyntaxKind.IntersectionType:
                return factory.updateIntersectionTypeNode(<IntersectionTypeNode>node,
                    nodesVisitor((<IntersectionTypeNode>node).types, visitor, isTypeNode));

            case SyntaxKind.ConditionalType:
                return factory.updateConditionalTypeNode(<ConditionalTypeNode>node,
                    nodeVisitor((<ConditionalTypeNode>node).checkType, visitor, isTypeNode),
                    nodeVisitor((<ConditionalTypeNode>node).extendsType, visitor, isTypeNode),
                    nodeVisitor((<ConditionalTypeNode>node).trueType, visitor, isTypeNode),
                    nodeVisitor((<ConditionalTypeNode>node).falseType, visitor, isTypeNode));

            case SyntaxKind.InferType:
                return factory.updateInferTypeNode(<InferTypeNode>node,
                    nodeVisitor((<InferTypeNode>node).typeParameter, visitor, isTypeParameterDeclaration));

            case SyntaxKind.ImportType:
                return factory.updateImportTypeNode(<ImportTypeNode>node,
                    nodeVisitor((<ImportTypeNode>node).argument, visitor, isTypeNode),
                    nodeVisitor((<ImportTypeNode>node).qualifier, visitor, isEntityName),
                    visitNodes((<ImportTypeNode>node).typeArguments, visitor, isTypeNode),
                    (<ImportTypeNode>node).isTypeOf
                );

            case SyntaxKind.NamedTupleMember:
                return factory.updateNamedTupleMember(<NamedTupleMember>node,
                    visitNode((<NamedTupleMember>node).dotDotDotToken, visitor, isToken),
                    visitNode((<NamedTupleMember>node).name, visitor, isIdentifier),
                    visitNode((<NamedTupleMember>node).questionToken, visitor, isToken),
                    visitNode((<NamedTupleMember>node).type, visitor, isTypeNode),
                );

            case SyntaxKind.ParenthesizedType:
                return factory.updateParenthesizedType(<ParenthesizedTypeNode>node,
                    nodeVisitor((<ParenthesizedTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.TypeOperator:
                return factory.updateTypeOperatorNode(<TypeOperatorNode>node,
                    nodeVisitor((<TypeOperatorNode>node).type, visitor, isTypeNode));

            case SyntaxKind.IndexedAccessType:
                return factory.updateIndexedAccessTypeNode((<IndexedAccessTypeNode>node),
                    nodeVisitor((<IndexedAccessTypeNode>node).objectType, visitor, isTypeNode),
                    nodeVisitor((<IndexedAccessTypeNode>node).indexType, visitor, isTypeNode));

            case SyntaxKind.MappedType:
                return factory.updateMappedTypeNode((<MappedTypeNode>node),
                    nodeVisitor((<MappedTypeNode>node).readonlyToken, tokenVisitor, isToken),
                    nodeVisitor((<MappedTypeNode>node).typeParameter, visitor, isTypeParameterDeclaration),
                    nodeVisitor((<MappedTypeNode>node).nameType, visitor, isTypeNode),
                    nodeVisitor((<MappedTypeNode>node).questionToken, tokenVisitor, isToken),
                    nodeVisitor((<MappedTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.LiteralType:
                return factory.updateLiteralTypeNode(<LiteralTypeNode>node,
                    nodeVisitor((<LiteralTypeNode>node).literal, visitor, isExpression));

            case SyntaxKind.TemplateLiteralType:
                return factory.updateTemplateLiteralType(<TemplateLiteralTypeNode>node,
                    nodeVisitor((<TemplateLiteralTypeNode>node).head, visitor, isTemplateHead),
                    nodesVisitor((<TemplateLiteralTypeNode>node).templateSpans, visitor, isTemplateLiteralTypeSpan));

            case SyntaxKind.TemplateLiteralTypeSpan:
                return factory.updateTemplateLiteralTypeSpan(<TemplateLiteralTypeSpan>node,
                    nodeVisitor((<TemplateLiteralTypeSpan>node).type, visitor, isTypeNode),
                    nodeVisitor((<TemplateLiteralTypeSpan>node).literal, visitor, isTemplateMiddleOrTemplateTail));

            // Binding patterns
            case SyntaxKind.ObjectBindingPattern:
                return factory.updateObjectBindingPattern(<ObjectBindingPattern>node,
                    nodesVisitor((<ObjectBindingPattern>node).elements, visitor, isBindingElement));

            case SyntaxKind.ArrayBindingPattern:
                return factory.updateArrayBindingPattern(<ArrayBindingPattern>node,
                    nodesVisitor((<ArrayBindingPattern>node).elements, visitor, isArrayBindingElement));

            case SyntaxKind.BindingElement:
                return factory.updateBindingElement(<BindingElement>node,
                    nodeVisitor((<BindingElement>node).dotDotDotToken, tokenVisitor, isToken),
                    nodeVisitor((<BindingElement>node).propertyName, visitor, isPropertyName),
                    nodeVisitor((<BindingElement>node).name, visitor, isBindingName),
                    nodeVisitor((<BindingElement>node).initializer, visitor, isExpression));

            // Expression
            case SyntaxKind.ArrayLiteralExpression:
                return factory.updateArrayLiteralExpression(<ArrayLiteralExpression>node,
                    nodesVisitor((<ArrayLiteralExpression>node).elements, visitor, isExpression));

            case SyntaxKind.ObjectLiteralExpression:
                return factory.updateObjectLiteralExpression(<ObjectLiteralExpression>node,
                    nodesVisitor((<ObjectLiteralExpression>node).properties, visitor, isObjectLiteralElementLike));

            case SyntaxKind.PropertyAccessExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    return factory.updatePropertyAccessChain(<PropertyAccessChain>node,
                        nodeVisitor((<PropertyAccessChain>node).expression, visitor, isExpression),
                        nodeVisitor((<PropertyAccessChain>node).questionDotToken, tokenVisitor, isToken),
                        nodeVisitor((<PropertyAccessChain>node).name, visitor, isIdentifier));
                }
                return factory.updatePropertyAccessExpression(<PropertyAccessExpression>node,
                    nodeVisitor((<PropertyAccessExpression>node).expression, visitor, isExpression),
                    nodeVisitor((<PropertyAccessExpression>node).name, visitor, isIdentifierOrPrivateIdentifier));

            case SyntaxKind.ElementAccessExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    return factory.updateElementAccessChain(<ElementAccessChain>node,
                        nodeVisitor((<ElementAccessChain>node).expression, visitor, isExpression),
                        nodeVisitor((<ElementAccessChain>node).questionDotToken, tokenVisitor, isToken),
                        nodeVisitor((<ElementAccessChain>node).argumentExpression, visitor, isExpression));
                }
                return factory.updateElementAccessExpression(<ElementAccessExpression>node,
                    nodeVisitor((<ElementAccessExpression>node).expression, visitor, isExpression),
                    nodeVisitor((<ElementAccessExpression>node).argumentExpression, visitor, isExpression));

            case SyntaxKind.CallExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    return factory.updateCallChain(<CallChain>node,
                        nodeVisitor((<CallChain>node).expression, visitor, isExpression),
                        nodeVisitor((<CallChain>node).questionDotToken, tokenVisitor, isToken),
                        nodesVisitor((<CallChain>node).typeArguments, visitor, isTypeNode),
                        nodesVisitor((<CallChain>node).arguments, visitor, isExpression));
                }
                return factory.updateCallExpression(<CallExpression>node,
                    nodeVisitor((<CallExpression>node).expression, visitor, isExpression),
                    nodesVisitor((<CallExpression>node).typeArguments, visitor, isTypeNode),
                    nodesVisitor((<CallExpression>node).arguments, visitor, isExpression));

            case SyntaxKind.NewExpression:
                return factory.updateNewExpression(<NewExpression>node,
                    nodeVisitor((<NewExpression>node).expression, visitor, isExpression),
                    nodesVisitor((<NewExpression>node).typeArguments, visitor, isTypeNode),
                    nodesVisitor((<NewExpression>node).arguments, visitor, isExpression));

            case SyntaxKind.TaggedTemplateExpression:
                return factory.updateTaggedTemplateExpression(<TaggedTemplateExpression>node,
                    nodeVisitor((<TaggedTemplateExpression>node).tag, visitor, isExpression),
                    visitNodes((<TaggedTemplateExpression>node).typeArguments, visitor, isExpression),
                    nodeVisitor((<TaggedTemplateExpression>node).template, visitor, isTemplateLiteral));

            case SyntaxKind.TypeAssertionExpression:
                return factory.updateTypeAssertion(<TypeAssertion>node,
                    nodeVisitor((<TypeAssertion>node).type, visitor, isTypeNode),
                    nodeVisitor((<TypeAssertion>node).expression, visitor, isExpression));

            case SyntaxKind.ParenthesizedExpression:
                return factory.updateParenthesizedExpression(<ParenthesizedExpression>node,
                    nodeVisitor((<ParenthesizedExpression>node).expression, visitor, isExpression));

            case SyntaxKind.FunctionExpression:
                return factory.updateFunctionExpression(<FunctionExpression>node,
                    nodesVisitor((<FunctionExpression>node).modifiers, visitor, isModifier),
                    nodeVisitor((<FunctionExpression>node).asteriskToken, tokenVisitor, isToken),
                    nodeVisitor((<FunctionExpression>node).name, visitor, isIdentifier),
                    nodesVisitor((<FunctionExpression>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<FunctionExpression>node).parameters, visitor, context, nodesVisitor),
                    nodeVisitor((<FunctionExpression>node).type, visitor, isTypeNode),
                    visitFunctionBody((<FunctionExpression>node).body, visitor, context, nodeVisitor));

            case SyntaxKind.ArrowFunction:
                return factory.updateArrowFunction(<ArrowFunction>node,
                    nodesVisitor((<ArrowFunction>node).modifiers, visitor, isModifier),
                    nodesVisitor((<ArrowFunction>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<ArrowFunction>node).parameters, visitor, context, nodesVisitor),
                    nodeVisitor((<ArrowFunction>node).type, visitor, isTypeNode),
                    nodeVisitor((<ArrowFunction>node).equalsGreaterThanToken, tokenVisitor, isToken),
                    visitFunctionBody((<ArrowFunction>node).body, visitor, context, nodeVisitor));

            case SyntaxKind.DeleteExpression:
                return factory.updateDeleteExpression(<DeleteExpression>node,
                    nodeVisitor((<DeleteExpression>node).expression, visitor, isExpression));

            case SyntaxKind.TypeOfExpression:
                return factory.updateTypeOfExpression(<TypeOfExpression>node,
                    nodeVisitor((<TypeOfExpression>node).expression, visitor, isExpression));

            case SyntaxKind.VoidExpression:
                return factory.updateVoidExpression(<VoidExpression>node,
                    nodeVisitor((<VoidExpression>node).expression, visitor, isExpression));

            case SyntaxKind.AwaitExpression:
                return factory.updateAwaitExpression(<AwaitExpression>node,
                    nodeVisitor((<AwaitExpression>node).expression, visitor, isExpression));

            case SyntaxKind.PrefixUnaryExpression:
                return factory.updatePrefixUnaryExpression(<PrefixUnaryExpression>node,
                    nodeVisitor((<PrefixUnaryExpression>node).operand, visitor, isExpression));

            case SyntaxKind.PostfixUnaryExpression:
                return factory.updatePostfixUnaryExpression(<PostfixUnaryExpression>node,
                    nodeVisitor((<PostfixUnaryExpression>node).operand, visitor, isExpression));

            case SyntaxKind.BinaryExpression:
                return factory.updateBinaryExpression(<BinaryExpression>node,
                    nodeVisitor((<BinaryExpression>node).left, visitor, isExpression),
                    nodeVisitor((<BinaryExpression>node).operatorToken, tokenVisitor, isToken),
                    nodeVisitor((<BinaryExpression>node).right, visitor, isExpression));

            case SyntaxKind.ConditionalExpression:
                return factory.updateConditionalExpression(<ConditionalExpression>node,
                    nodeVisitor((<ConditionalExpression>node).condition, visitor, isExpression),
                    nodeVisitor((<ConditionalExpression>node).questionToken, tokenVisitor, isToken),
                    nodeVisitor((<ConditionalExpression>node).whenTrue, visitor, isExpression),
                    nodeVisitor((<ConditionalExpression>node).colonToken, tokenVisitor, isToken),
                    nodeVisitor((<ConditionalExpression>node).whenFalse, visitor, isExpression));

            case SyntaxKind.TemplateExpression:
                return factory.updateTemplateExpression(<TemplateExpression>node,
                    nodeVisitor((<TemplateExpression>node).head, visitor, isTemplateHead),
                    nodesVisitor((<TemplateExpression>node).templateSpans, visitor, isTemplateSpan));

            case SyntaxKind.YieldExpression:
                return factory.updateYieldExpression(<YieldExpression>node,
                    nodeVisitor((<YieldExpression>node).asteriskToken, tokenVisitor, isToken),
                    nodeVisitor((<YieldExpression>node).expression, visitor, isExpression));

            case SyntaxKind.SpreadElement:
                return factory.updateSpreadElement(<SpreadElement>node,
                    nodeVisitor((<SpreadElement>node).expression, visitor, isExpression));

            case SyntaxKind.ClassExpression:
                return factory.updateClassExpression(<ClassExpression>node,
                    nodesVisitor((<ClassExpression>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ClassExpression>node).modifiers, visitor, isModifier),
                    nodeVisitor((<ClassExpression>node).name, visitor, isIdentifier),
                    nodesVisitor((<ClassExpression>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ClassExpression>node).heritageClauses, visitor, isHeritageClause),
                    nodesVisitor((<ClassExpression>node).members, visitor, isClassElement));

            case SyntaxKind.ExpressionWithTypeArguments:
                return factory.updateExpressionWithTypeArguments(<ExpressionWithTypeArguments>node,
                    nodeVisitor((<ExpressionWithTypeArguments>node).expression, visitor, isExpression),
                    nodesVisitor((<ExpressionWithTypeArguments>node).typeArguments, visitor, isTypeNode));

            case SyntaxKind.AsExpression:
                return factory.updateAsExpression(<AsExpression>node,
                    nodeVisitor((<AsExpression>node).expression, visitor, isExpression),
                    nodeVisitor((<AsExpression>node).type, visitor, isTypeNode));

            case SyntaxKind.NonNullExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    return factory.updateNonNullChain(<NonNullChain>node,
                        nodeVisitor((<NonNullChain>node).expression, visitor, isExpression));
                }
                return factory.updateNonNullExpression(<NonNullExpression>node,
                    nodeVisitor((<NonNullExpression>node).expression, visitor, isExpression));

            case SyntaxKind.MetaProperty:
                return factory.updateMetaProperty(<MetaProperty>node,
                    nodeVisitor((<MetaProperty>node).name, visitor, isIdentifier));

            // Misc
            case SyntaxKind.TemplateSpan:
                return factory.updateTemplateSpan(<TemplateSpan>node,
                    nodeVisitor((<TemplateSpan>node).expression, visitor, isExpression),
                    nodeVisitor((<TemplateSpan>node).literal, visitor, isTemplateMiddleOrTemplateTail));

            // Element
            case SyntaxKind.Block:
                return factory.updateBlock(<Block>node,
                    nodesVisitor((<Block>node).statements, visitor, isStatement));

            case SyntaxKind.VariableStatement:
                return factory.updateVariableStatement(<VariableStatement>node,
                    nodesVisitor((<VariableStatement>node).modifiers, visitor, isModifier),
                    nodeVisitor((<VariableStatement>node).declarationList, visitor, isVariableDeclarationList));

            case SyntaxKind.ExpressionStatement:
                return factory.updateExpressionStatement(<ExpressionStatement>node,
                    nodeVisitor((<ExpressionStatement>node).expression, visitor, isExpression));

            case SyntaxKind.IfStatement:
                return factory.updateIfStatement(<IfStatement>node,
                    nodeVisitor((<IfStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<IfStatement>node).thenStatement, visitor, isStatement, factory.liftToBlock),
                    nodeVisitor((<IfStatement>node).elseStatement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.DoStatement:
                return factory.updateDoStatement(<DoStatement>node,
                    nodeVisitor((<DoStatement>node).statement, visitor, isStatement, factory.liftToBlock),
                    nodeVisitor((<DoStatement>node).expression, visitor, isExpression));

            case SyntaxKind.WhileStatement:
                return factory.updateWhileStatement(<WhileStatement>node,
                    nodeVisitor((<WhileStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<WhileStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ForStatement:
                return factory.updateForStatement(<ForStatement>node,
                    nodeVisitor((<ForStatement>node).initializer, visitor, isForInitializer),
                    nodeVisitor((<ForStatement>node).condition, visitor, isExpression),
                    nodeVisitor((<ForStatement>node).incrementor, visitor, isExpression),
                    nodeVisitor((<ForStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ForInStatement:
                return factory.updateForInStatement(<ForInStatement>node,
                    nodeVisitor((<ForInStatement>node).initializer, visitor, isForInitializer),
                    nodeVisitor((<ForInStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<ForInStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ForOfStatement:
                return factory.updateForOfStatement(<ForOfStatement>node,
                    nodeVisitor((<ForOfStatement>node).awaitModifier, tokenVisitor, isToken),
                    nodeVisitor((<ForOfStatement>node).initializer, visitor, isForInitializer),
                    nodeVisitor((<ForOfStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<ForOfStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ContinueStatement:
                return factory.updateContinueStatement(<ContinueStatement>node,
                    nodeVisitor((<ContinueStatement>node).label, visitor, isIdentifier));

            case SyntaxKind.BreakStatement:
                return factory.updateBreakStatement(<BreakStatement>node,
                    nodeVisitor((<BreakStatement>node).label, visitor, isIdentifier));

            case SyntaxKind.ReturnStatement:
                return factory.updateReturnStatement(<ReturnStatement>node,
                    nodeVisitor((<ReturnStatement>node).expression, visitor, isExpression));

            case SyntaxKind.WithStatement:
                return factory.updateWithStatement(<WithStatement>node,
                    nodeVisitor((<WithStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<WithStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.SwitchStatement:
                return factory.updateSwitchStatement(<SwitchStatement>node,
                    nodeVisitor((<SwitchStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<SwitchStatement>node).caseBlock, visitor, isCaseBlock));

            case SyntaxKind.LabeledStatement:
                return factory.updateLabeledStatement(<LabeledStatement>node,
                    nodeVisitor((<LabeledStatement>node).label, visitor, isIdentifier),
                    nodeVisitor((<LabeledStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ThrowStatement:
                return factory.updateThrowStatement(<ThrowStatement>node,
                    nodeVisitor((<ThrowStatement>node).expression, visitor, isExpression));

            case SyntaxKind.TryStatement:
                return factory.updateTryStatement(<TryStatement>node,
                    nodeVisitor((<TryStatement>node).tryBlock, visitor, isBlock),
                    nodeVisitor((<TryStatement>node).catchClause, visitor, isCatchClause),
                    nodeVisitor((<TryStatement>node).finallyBlock, visitor, isBlock));

            case SyntaxKind.VariableDeclaration:
                return factory.updateVariableDeclaration(<VariableDeclaration>node,
                    nodeVisitor((<VariableDeclaration>node).name, visitor, isBindingName),
                    nodeVisitor((<VariableDeclaration>node).exclamationToken, tokenVisitor, isToken),
                    nodeVisitor((<VariableDeclaration>node).type, visitor, isTypeNode),
                    nodeVisitor((<VariableDeclaration>node).initializer, visitor, isExpression));

            case SyntaxKind.VariableDeclarationList:
                return factory.updateVariableDeclarationList(<VariableDeclarationList>node,
                    nodesVisitor((<VariableDeclarationList>node).declarations, visitor, isVariableDeclaration));

            case SyntaxKind.FunctionDeclaration:
                return factory.updateFunctionDeclaration(<FunctionDeclaration>node,
                    nodesVisitor((<FunctionDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<FunctionDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<FunctionDeclaration>node).asteriskToken, tokenVisitor, isToken),
                    nodeVisitor((<FunctionDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<FunctionDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<FunctionDeclaration>node).parameters, visitor, context, nodesVisitor),
                    nodeVisitor((<FunctionDeclaration>node).type, visitor, isTypeNode),
                    visitFunctionBody((<FunctionExpression>node).body, visitor, context, nodeVisitor));

            case SyntaxKind.ClassDeclaration:
                return factory.updateClassDeclaration(<ClassDeclaration>node,
                    nodesVisitor((<ClassDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ClassDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<ClassDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<ClassDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ClassDeclaration>node).heritageClauses, visitor, isHeritageClause),
                    nodesVisitor((<ClassDeclaration>node).members, visitor, isClassElement));

            case SyntaxKind.InterfaceDeclaration:
                return factory.updateInterfaceDeclaration(<InterfaceDeclaration>node,
                    nodesVisitor((<InterfaceDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<InterfaceDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<InterfaceDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<InterfaceDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<InterfaceDeclaration>node).heritageClauses, visitor, isHeritageClause),
                    nodesVisitor((<InterfaceDeclaration>node).members, visitor, isTypeElement));

            case SyntaxKind.TypeAliasDeclaration:
                return factory.updateTypeAliasDeclaration(<TypeAliasDeclaration>node,
                    nodesVisitor((<TypeAliasDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<TypeAliasDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<TypeAliasDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<TypeAliasDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodeVisitor((<TypeAliasDeclaration>node).type, visitor, isTypeNode));

            case SyntaxKind.EnumDeclaration:
                return factory.updateEnumDeclaration(<EnumDeclaration>node,
                    nodesVisitor((<EnumDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<EnumDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<EnumDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<EnumDeclaration>node).members, visitor, isEnumMember));

            case SyntaxKind.ModuleDeclaration:
                return factory.updateModuleDeclaration(<ModuleDeclaration>node,
                    nodesVisitor((<ModuleDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ModuleDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<ModuleDeclaration>node).name, visitor, isIdentifier),
                    nodeVisitor((<ModuleDeclaration>node).body, visitor, isModuleBody));

            case SyntaxKind.ModuleBlock:
                return factory.updateModuleBlock(<ModuleBlock>node,
                    nodesVisitor((<ModuleBlock>node).statements, visitor, isStatement));

            case SyntaxKind.CaseBlock:
                return factory.updateCaseBlock(<CaseBlock>node,
                    nodesVisitor((<CaseBlock>node).clauses, visitor, isCaseOrDefaultClause));

            case SyntaxKind.NamespaceExportDeclaration:
                return factory.updateNamespaceExportDeclaration(<NamespaceExportDeclaration>node,
                    nodeVisitor((<NamespaceExportDeclaration>node).name, visitor, isIdentifier));

            case SyntaxKind.ImportEqualsDeclaration:
                return factory.updateImportEqualsDeclaration(<ImportEqualsDeclaration>node,
                    nodesVisitor((<ImportEqualsDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ImportEqualsDeclaration>node).modifiers, visitor, isModifier),
                    (<ImportEqualsDeclaration>node).isTypeOnly,
                    nodeVisitor((<ImportEqualsDeclaration>node).name, visitor, isIdentifier),
                    nodeVisitor((<ImportEqualsDeclaration>node).moduleReference, visitor, isModuleReference));

            case SyntaxKind.ImportDeclaration:
                return factory.updateImportDeclaration(<ImportDeclaration>node,
                    nodesVisitor((<ImportDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ImportDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<ImportDeclaration>node).importClause, visitor, isImportClause),
                    nodeVisitor((<ImportDeclaration>node).moduleSpecifier, visitor, isExpression));

            case SyntaxKind.ImportClause:
                return factory.updateImportClause(<ImportClause>node,
                    (<ImportClause>node).isTypeOnly,
                    nodeVisitor((<ImportClause>node).name, visitor, isIdentifier),
                    nodeVisitor((<ImportClause>node).namedBindings, visitor, isNamedImportBindings));

            case SyntaxKind.NamespaceImport:
                return factory.updateNamespaceImport(<NamespaceImport>node,
                    nodeVisitor((<NamespaceImport>node).name, visitor, isIdentifier));

            case SyntaxKind.NamespaceExport:
                    return factory.updateNamespaceExport(<NamespaceExport>node,
                        nodeVisitor((<NamespaceExport>node).name, visitor, isIdentifier));

            case SyntaxKind.NamedImports:
                return factory.updateNamedImports(<NamedImports>node,
                    nodesVisitor((<NamedImports>node).elements, visitor, isImportSpecifier));

            case SyntaxKind.ImportSpecifier:
                return factory.updateImportSpecifier(<ImportSpecifier>node,
                    nodeVisitor((<ImportSpecifier>node).propertyName, visitor, isIdentifier),
                    nodeVisitor((<ImportSpecifier>node).name, visitor, isIdentifier));

            case SyntaxKind.ExportAssignment:
                return factory.updateExportAssignment(<ExportAssignment>node,
                    nodesVisitor((<ExportAssignment>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ExportAssignment>node).modifiers, visitor, isModifier),
                    nodeVisitor((<ExportAssignment>node).expression, visitor, isExpression));

            case SyntaxKind.ExportDeclaration:
                return factory.updateExportDeclaration(<ExportDeclaration>node,
                    nodesVisitor((<ExportDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ExportDeclaration>node).modifiers, visitor, isModifier),
                    (<ExportDeclaration>node).isTypeOnly,
                    nodeVisitor((<ExportDeclaration>node).exportClause, visitor, isNamedExportBindings),
                    nodeVisitor((<ExportDeclaration>node).moduleSpecifier, visitor, isExpression));

            case SyntaxKind.NamedExports:
                return factory.updateNamedExports(<NamedExports>node,
                    nodesVisitor((<NamedExports>node).elements, visitor, isExportSpecifier));

            case SyntaxKind.ExportSpecifier:
                return factory.updateExportSpecifier(<ExportSpecifier>node,
                    nodeVisitor((<ExportSpecifier>node).propertyName, visitor, isIdentifier),
                    nodeVisitor((<ExportSpecifier>node).name, visitor, isIdentifier));

            // Module references
            case SyntaxKind.ExternalModuleReference:
                return factory.updateExternalModuleReference(<ExternalModuleReference>node,
                    nodeVisitor((<ExternalModuleReference>node).expression, visitor, isExpression));

            // JSX
            case SyntaxKind.JsxElement:
                return factory.updateJsxElement(<JsxElement>node,
                    nodeVisitor((<JsxElement>node).openingElement, visitor, isJsxOpeningElement),
                    nodesVisitor((<JsxElement>node).children, visitor, isJsxChild),
                    nodeVisitor((<JsxElement>node).closingElement, visitor, isJsxClosingElement));

            case SyntaxKind.JsxSelfClosingElement:
                return factory.updateJsxSelfClosingElement(<JsxSelfClosingElement>node,
                    nodeVisitor((<JsxSelfClosingElement>node).tagName, visitor, isJsxTagNameExpression),
                    nodesVisitor((<JsxSelfClosingElement>node).typeArguments, visitor, isTypeNode),
                    nodeVisitor((<JsxSelfClosingElement>node).attributes, visitor, isJsxAttributes));

            case SyntaxKind.JsxOpeningElement:
                return factory.updateJsxOpeningElement(<JsxOpeningElement>node,
                    nodeVisitor((<JsxOpeningElement>node).tagName, visitor, isJsxTagNameExpression),
                    nodesVisitor((<JsxSelfClosingElement>node).typeArguments, visitor, isTypeNode),
                    nodeVisitor((<JsxOpeningElement>node).attributes, visitor, isJsxAttributes));

            case SyntaxKind.JsxClosingElement:
                return factory.updateJsxClosingElement(<JsxClosingElement>node,
                    nodeVisitor((<JsxClosingElement>node).tagName, visitor, isJsxTagNameExpression));

            case SyntaxKind.JsxFragment:
                return factory.updateJsxFragment(<JsxFragment>node,
                    nodeVisitor((<JsxFragment>node).openingFragment, visitor, isJsxOpeningFragment),
                    nodesVisitor((<JsxFragment>node).children, visitor, isJsxChild),
                    nodeVisitor((<JsxFragment>node).closingFragment, visitor, isJsxClosingFragment));

            case SyntaxKind.JsxAttribute:
                return factory.updateJsxAttribute(<JsxAttribute>node,
                    nodeVisitor((<JsxAttribute>node).name, visitor, isIdentifier),
                    nodeVisitor((<JsxAttribute>node).initializer, visitor, isStringLiteralOrJsxExpression));

            case SyntaxKind.JsxAttributes:
                return factory.updateJsxAttributes(<JsxAttributes>node,
                    nodesVisitor((<JsxAttributes>node).properties, visitor, isJsxAttributeLike));

            case SyntaxKind.JsxSpreadAttribute:
                return factory.updateJsxSpreadAttribute(<JsxSpreadAttribute>node,
                    nodeVisitor((<JsxSpreadAttribute>node).expression, visitor, isExpression));

            case SyntaxKind.JsxExpression:
                return factory.updateJsxExpression(<JsxExpression>node,
                    nodeVisitor((<JsxExpression>node).expression, visitor, isExpression));

            // Clauses
            case SyntaxKind.CaseClause:
                return factory.updateCaseClause(<CaseClause>node,
                    nodeVisitor((<CaseClause>node).expression, visitor, isExpression),
                    nodesVisitor((<CaseClause>node).statements, visitor, isStatement));

            case SyntaxKind.DefaultClause:
                return factory.updateDefaultClause(<DefaultClause>node,
                    nodesVisitor((<DefaultClause>node).statements, visitor, isStatement));

            case SyntaxKind.HeritageClause:
                return factory.updateHeritageClause(<HeritageClause>node,
                    nodesVisitor((<HeritageClause>node).types, visitor, isExpressionWithTypeArguments));

            case SyntaxKind.CatchClause:
                return factory.updateCatchClause(<CatchClause>node,
                    nodeVisitor((<CatchClause>node).variableDeclaration, visitor, isVariableDeclaration),
                    nodeVisitor((<CatchClause>node).block, visitor, isBlock));

            // Property assignments
            case SyntaxKind.PropertyAssignment:
                return factory.updatePropertyAssignment(<PropertyAssignment>node,
                    nodeVisitor((<PropertyAssignment>node).name, visitor, isPropertyName),
                    nodeVisitor((<PropertyAssignment>node).initializer, visitor, isExpression));

            case SyntaxKind.ShorthandPropertyAssignment:
                return factory.updateShorthandPropertyAssignment(<ShorthandPropertyAssignment>node,
                    nodeVisitor((<ShorthandPropertyAssignment>node).name, visitor, isIdentifier),
                    nodeVisitor((<ShorthandPropertyAssignment>node).objectAssignmentInitializer, visitor, isExpression));

            case SyntaxKind.SpreadAssignment:
                return factory.updateSpreadAssignment(<SpreadAssignment>node,
                    nodeVisitor((<SpreadAssignment>node).expression, visitor, isExpression));

            // Enum
            case SyntaxKind.EnumMember:
                return factory.updateEnumMember(<EnumMember>node,
                    nodeVisitor((<EnumMember>node).name, visitor, isPropertyName),
                    nodeVisitor((<EnumMember>node).initializer, visitor, isExpression));

            // Top-level nodes
            case SyntaxKind.SourceFile:
                return factory.updateSourceFile(<SourceFile>node,
                    visitLexicalEnvironment((<SourceFile>node).statements, visitor, context));

            // Transformation nodes
            case SyntaxKind.PartiallyEmittedExpression:
                return factory.updatePartiallyEmittedExpression(<PartiallyEmittedExpression>node,
                    nodeVisitor((<PartiallyEmittedExpression>node).expression, visitor, isExpression));

            case SyntaxKind.CommaListExpression:
                return factory.updateCommaListExpression(<CommaListExpression>node,
                    nodesVisitor((<CommaListExpression>node).elements, visitor, isExpression));

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
