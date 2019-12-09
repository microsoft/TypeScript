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
            const node = nodes[i + start];
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
                            Debug.assertNode(visitedNode, test);
                            updated.push(<T>visitedNode);
                        }
                    }
                    else {
                        Debug.assertNode(visited, test);
                        updated.push(<T>visited);
                    }
                }
            }
        }

        if (updated) {
            // TODO(rbuckton): Remove dependency on `ts.factory` in favor of a provided factory.
            const updatedArray = factory.createNodeArray(updated, hasTrailingComma);
            updatedArray.pos = pos;
            updatedArray.end = end;
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
        return mergeLexicalEnvironment(statements, context.endLexicalEnvironment(), context.factory);
    }

    /**
     * Starts a new lexical environment and visits a parameter list, suspending the lexical
     * environment upon completion.
     */
    export function visitParameterList(nodes: NodeArray<ParameterDeclaration>, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration>;
    /**
     * Starts a new lexical environment and visits a parameter list, suspending the lexical
     * environment upon completion.
     */
    export function visitParameterList(nodes: NodeArray<ParameterDeclaration> | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor): NodeArray<ParameterDeclaration> | undefined;
    export function visitParameterList(nodes: NodeArray<ParameterDeclaration> | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor = visitNodes) {
        context.startLexicalEnvironment();
        const updated = nodesVisitor(nodes, visitor, isParameterDeclaration);
        context.suspendLexicalEnvironment();
        return updated;
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
            const statements = mergeLexicalEnvironment(block.statements, declarations);
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
    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor, tokenVisitor?: Visitor): T | undefined;
    /* @internal */
    export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: NodesVisitor, tokenVisitor?: Visitor, nodeVisitor?: NodeVisitor): T | undefined; // eslint-disable-line @typescript-eslint/unified-signatures
    export function visitEachChild(node: Node | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor: NodesVisitor = visitNodes, tokenVisitor?: Visitor, nodeVisitor: NodeVisitor = visitNode): Node | undefined {
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
                    visitFunctionBody((<ConstructorDeclaration>node).body, visitor, context, nodeVisitor));

            case SyntaxKind.GetAccessor:
                return factory.updateGetAccessorDeclaration(<GetAccessorDeclaration>node,
                    nodesVisitor((<GetAccessorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<GetAccessorDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<GetAccessorDeclaration>node).name, visitor, isPropertyName),
                    visitParameterList((<GetAccessorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    nodeVisitor((<GetAccessorDeclaration>node).type, visitor, isTypeNode),
                    visitFunctionBody((<GetAccessorDeclaration>node).body, visitor, context, nodeVisitor));

            case SyntaxKind.SetAccessor:
                return factory.updateSetAccessorDeclaration(<SetAccessorDeclaration>node,
                    nodesVisitor((<SetAccessorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<SetAccessorDeclaration>node).modifiers, visitor, isModifier),
                    nodeVisitor((<SetAccessorDeclaration>node).name, visitor, isPropertyName),
                    visitParameterList((<SetAccessorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitFunctionBody((<SetAccessorDeclaration>node).body, visitor, context, nodeVisitor));

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
                    nodesVisitor((<TupleTypeNode>node).elementTypes, visitor, isTypeNode));

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
                    nodesVisitor((<ImportTypeNode>node).typeArguments, visitor, isTypeNode),
                    (<ImportTypeNode>node).isTypeOf);

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
                    nodeVisitor((<MappedTypeNode>node).questionToken, tokenVisitor, isToken),
                    nodeVisitor((<MappedTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.LiteralType:
                return factory.updateLiteralTypeNode(<LiteralTypeNode>node,
                    nodeVisitor((<LiteralTypeNode>node).literal, visitor, isExpression));

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
                return factory.updateArrayLiteral(<ArrayLiteralExpression>node,
                    nodesVisitor((<ArrayLiteralExpression>node).elements, visitor, isExpression));

            case SyntaxKind.ObjectLiteralExpression:
                return factory.updateObjectLiteral(<ObjectLiteralExpression>node,
                    nodesVisitor((<ObjectLiteralExpression>node).properties, visitor, isObjectLiteralElementLike));

            case SyntaxKind.PropertyAccessExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    return factory.updatePropertyAccessChain(<PropertyAccessChain>node,
                        nodeVisitor((<PropertyAccessChain>node).expression, visitor, isExpression),
                        nodeVisitor((<PropertyAccessChain>node).questionDotToken, visitor, isToken),
                        nodeVisitor((<PropertyAccessChain>node).name, visitor, isIdentifier));
                }
                return factory.updatePropertyAccess(<PropertyAccessExpression>node,
                    nodeVisitor((<PropertyAccessExpression>node).expression, visitor, isExpression),
                    nodeVisitor((<PropertyAccessExpression>node).name, visitor, isIdentifier));

            case SyntaxKind.ElementAccessExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    return factory.updateElementAccessChain(<ElementAccessChain>node,
                        nodeVisitor((<ElementAccessChain>node).expression, visitor, isExpression),
                        nodeVisitor((<ElementAccessChain>node).questionDotToken, visitor, isToken),
                        nodeVisitor((<ElementAccessChain>node).argumentExpression, visitor, isExpression));
                }
                return factory.updateElementAccess(<ElementAccessExpression>node,
                    nodeVisitor((<ElementAccessExpression>node).expression, visitor, isExpression),
                    nodeVisitor((<ElementAccessExpression>node).argumentExpression, visitor, isExpression));

            case SyntaxKind.CallExpression:
                if (node.flags & NodeFlags.OptionalChain) {
                    return factory.updateCallChain(<CallChain>node,
                        nodeVisitor((<CallChain>node).expression, visitor, isExpression),
                        nodeVisitor((<CallChain>node).questionDotToken, visitor, isToken),
                        nodesVisitor((<CallChain>node).typeArguments, visitor, isTypeNode),
                        nodesVisitor((<CallChain>node).arguments, visitor, isExpression));
                }
                return factory.updateCall(<CallExpression>node,
                    nodeVisitor((<CallExpression>node).expression, visitor, isExpression),
                    nodesVisitor((<CallExpression>node).typeArguments, visitor, isTypeNode),
                    nodesVisitor((<CallExpression>node).arguments, visitor, isExpression));

            case SyntaxKind.NewExpression:
                return factory.updateNew(<NewExpression>node,
                    nodeVisitor((<NewExpression>node).expression, visitor, isExpression),
                    nodesVisitor((<NewExpression>node).typeArguments, visitor, isTypeNode),
                    nodesVisitor((<NewExpression>node).arguments, visitor, isExpression));

            case SyntaxKind.TaggedTemplateExpression:
                return factory.updateTaggedTemplate(<TaggedTemplateExpression>node,
                    nodeVisitor((<TaggedTemplateExpression>node).tag, visitor, isExpression),
                    nodesVisitor((<TaggedTemplateExpression>node).typeArguments, visitor, isExpression),
                    nodeVisitor((<TaggedTemplateExpression>node).template, visitor, isTemplateLiteral));

            case SyntaxKind.TypeAssertionExpression:
                return factory.updateTypeAssertion(<TypeAssertion>node,
                    nodeVisitor((<TypeAssertion>node).type, visitor, isTypeNode),
                    nodeVisitor((<TypeAssertion>node).expression, visitor, isExpression));

            case SyntaxKind.ParenthesizedExpression:
                return factory.updateParen(<ParenthesizedExpression>node,
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
                    nodeVisitor((<ArrowFunction>node).equalsGreaterThanToken, visitor, isToken),
                    visitFunctionBody((<ArrowFunction>node).body, visitor, context, nodeVisitor));

            case SyntaxKind.DeleteExpression:
                return factory.updateDelete(<DeleteExpression>node,
                    nodeVisitor((<DeleteExpression>node).expression, visitor, isExpression));

            case SyntaxKind.TypeOfExpression:
                return factory.updateTypeOf(<TypeOfExpression>node,
                    nodeVisitor((<TypeOfExpression>node).expression, visitor, isExpression));

            case SyntaxKind.VoidExpression:
                return factory.updateVoid(<VoidExpression>node,
                    nodeVisitor((<VoidExpression>node).expression, visitor, isExpression));

            case SyntaxKind.AwaitExpression:
                return factory.updateAwait(<AwaitExpression>node,
                    nodeVisitor((<AwaitExpression>node).expression, visitor, isExpression));

            case SyntaxKind.PrefixUnaryExpression:
                return factory.updatePrefix(<PrefixUnaryExpression>node,
                    nodeVisitor((<PrefixUnaryExpression>node).operand, visitor, isExpression));

            case SyntaxKind.PostfixUnaryExpression:
                return factory.updatePostfix(<PostfixUnaryExpression>node,
                    nodeVisitor((<PostfixUnaryExpression>node).operand, visitor, isExpression));

            case SyntaxKind.BinaryExpression:
                return factory.updateBinary(<BinaryExpression>node,
                    nodeVisitor((<BinaryExpression>node).left, visitor, isExpression),
                    nodeVisitor((<BinaryExpression>node).right, visitor, isExpression),
                    nodeVisitor((<BinaryExpression>node).operatorToken, visitor, isToken));

            case SyntaxKind.ConditionalExpression:
                return factory.updateConditional(<ConditionalExpression>node,
                    nodeVisitor((<ConditionalExpression>node).condition, visitor, isExpression),
                    nodeVisitor((<ConditionalExpression>node).questionToken, visitor, isToken),
                    nodeVisitor((<ConditionalExpression>node).whenTrue, visitor, isExpression),
                    nodeVisitor((<ConditionalExpression>node).colonToken, visitor, isToken),
                    nodeVisitor((<ConditionalExpression>node).whenFalse, visitor, isExpression));

            case SyntaxKind.TemplateExpression:
                return factory.updateTemplateExpression(<TemplateExpression>node,
                    nodeVisitor((<TemplateExpression>node).head, visitor, isTemplateHead),
                    nodesVisitor((<TemplateExpression>node).templateSpans, visitor, isTemplateSpan));

            case SyntaxKind.YieldExpression:
                return factory.updateYield(<YieldExpression>node,
                    nodeVisitor((<YieldExpression>node).asteriskToken, tokenVisitor, isToken),
                    nodeVisitor((<YieldExpression>node).expression, visitor, isExpression));

            case SyntaxKind.SpreadElement:
                return factory.updateSpread(<SpreadElement>node,
                    nodeVisitor((<SpreadElement>node).expression, visitor, isExpression));

            case SyntaxKind.ClassExpression:
                return factory.updateClassExpression(<ClassExpression>node,
                    nodesVisitor((<IndexSignatureDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<IndexSignatureDeclaration>node).modifiers, visitor, isModifier),
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
                return factory.updateIf(<IfStatement>node,
                    nodeVisitor((<IfStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<IfStatement>node).thenStatement, visitor, isStatement, factory.liftToBlock),
                    nodeVisitor((<IfStatement>node).elseStatement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.DoStatement:
                return factory.updateDo(<DoStatement>node,
                    nodeVisitor((<DoStatement>node).statement, visitor, isStatement, factory.liftToBlock),
                    nodeVisitor((<DoStatement>node).expression, visitor, isExpression));

            case SyntaxKind.WhileStatement:
                return factory.updateWhile(<WhileStatement>node,
                    nodeVisitor((<WhileStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<WhileStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ForStatement:
                return factory.updateFor(<ForStatement>node,
                    nodeVisitor((<ForStatement>node).initializer, visitor, isForInitializer),
                    nodeVisitor((<ForStatement>node).condition, visitor, isExpression),
                    nodeVisitor((<ForStatement>node).incrementor, visitor, isExpression),
                    nodeVisitor((<ForStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ForInStatement:
                return factory.updateForIn(<ForInStatement>node,
                    nodeVisitor((<ForInStatement>node).initializer, visitor, isForInitializer),
                    nodeVisitor((<ForInStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<ForInStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ForOfStatement:
                return factory.updateForOf(<ForOfStatement>node,
                    nodeVisitor((<ForOfStatement>node).awaitModifier, visitor, isToken),
                    nodeVisitor((<ForOfStatement>node).initializer, visitor, isForInitializer),
                    nodeVisitor((<ForOfStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<ForOfStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ContinueStatement:
                return factory.updateContinue(<ContinueStatement>node,
                    nodeVisitor((<ContinueStatement>node).label, visitor, isIdentifier));

            case SyntaxKind.BreakStatement:
                return factory.updateBreak(<BreakStatement>node,
                    nodeVisitor((<BreakStatement>node).label, visitor, isIdentifier));

            case SyntaxKind.ReturnStatement:
                return factory.updateReturn(<ReturnStatement>node,
                    nodeVisitor((<ReturnStatement>node).expression, visitor, isExpression));

            case SyntaxKind.WithStatement:
                return factory.updateWith(<WithStatement>node,
                    nodeVisitor((<WithStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<WithStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.SwitchStatement:
                return factory.updateSwitch(<SwitchStatement>node,
                    nodeVisitor((<SwitchStatement>node).expression, visitor, isExpression),
                    nodeVisitor((<SwitchStatement>node).caseBlock, visitor, isCaseBlock));

            case SyntaxKind.LabeledStatement:
                return factory.updateLabel(<LabeledStatement>node,
                    nodeVisitor((<LabeledStatement>node).label, visitor, isIdentifier),
                    nodeVisitor((<LabeledStatement>node).statement, visitor, isStatement, factory.liftToBlock));

            case SyntaxKind.ThrowStatement:
                return factory.updateThrow(<ThrowStatement>node,
                    nodeVisitor((<ThrowStatement>node).expression!, visitor, isExpression)); // expression could be `undefined` due to invalid parse.

            case SyntaxKind.TryStatement:
                return factory.updateTry(<TryStatement>node,
                    nodeVisitor((<TryStatement>node).tryBlock, visitor, isBlock),
                    nodeVisitor((<TryStatement>node).catchClause, visitor, isCatchClause),
                    nodeVisitor((<TryStatement>node).finallyBlock, visitor, isBlock));

            case SyntaxKind.VariableDeclaration:
                return factory.updateVariableDeclaration(<VariableDeclaration>node,
                    nodeVisitor((<VariableDeclaration>node).name, visitor, isBindingName),
                    nodeVisitor((<VariableDeclaration>node).exclamationToken, visitor, isToken),
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
                    nodeVisitor((<ImportClause>node).name, visitor, isIdentifier),
                    nodeVisitor((<ImportClause>node).namedBindings, visitor, isNamedImportBindings));

            case SyntaxKind.NamespaceImport:
                return factory.updateNamespaceImport(<NamespaceImport>node,
                    nodeVisitor((<NamespaceImport>node).name, visitor, isIdentifier));

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
                    nodeVisitor((<ExportDeclaration>node).exportClause, visitor, isNamedExports),
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
                return factory.updateCommaList(<CommaListExpression>node,
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

/* @internal */
namespace ts {
    function reduceNode<T>(node: Node | undefined, f: (memo: T, node: Node) => T, initial: T) {
        return node ? f(initial, node) : initial;
    }

    function reduceNodeArray<T>(nodes: NodeArray<Node> | undefined, f: (memo: T, nodes: NodeArray<Node>) => T, initial: T) {
        return nodes ? f(initial, nodes) : initial;
    }

    /**
     * Similar to `reduceLeft`, performs a reduction against each child of a node.
     * NOTE: Unlike `forEachChild`, this does *not* visit every node.
     *
     * @param node The node containing the children to reduce.
     * @param initial The initial value to supply to the reduction.
     * @param f The callback function
     */
    export function reduceEachChild<T>(node: Node | undefined, initial: T, cbNode: (memo: T, node: Node) => T, cbNodeArray?: (memo: T, nodes: NodeArray<Node>) => T): T {
        if (node === undefined) {
            return initial;
        }

        const reduceNodes: (nodes: NodeArray<Node> | undefined, f: ((memo: T, node: Node) => T) | ((memo: T, node: NodeArray<Node>) => T), initial: T) => T = cbNodeArray ? reduceNodeArray : reduceLeft;
        const cbNodes = cbNodeArray || cbNode;
        const kind = node.kind;

        // No need to visit nodes with no children.
        if ((kind > SyntaxKind.FirstToken && kind <= SyntaxKind.LastToken)) {
            return initial;
        }

        // We do not yet support types.
        if ((kind >= SyntaxKind.TypePredicate && kind <= SyntaxKind.LiteralType)) {
            return initial;
        }

        let result = initial;
        switch (node.kind) {
            // Leaf nodes
            case SyntaxKind.SemicolonClassElement:
            case SyntaxKind.EmptyStatement:
            case SyntaxKind.OmittedExpression:
            case SyntaxKind.DebuggerStatement:
            case SyntaxKind.NotEmittedStatement:
                // No need to visit nodes with no children.
                break;

            // Names
            case SyntaxKind.QualifiedName:
                result = reduceNode((<QualifiedName>node).left, cbNode, result);
                result = reduceNode((<QualifiedName>node).right, cbNode, result);
                break;

            case SyntaxKind.ComputedPropertyName:
                result = reduceNode((<ComputedPropertyName>node).expression, cbNode, result);
                break;

            // Signature elements
            case SyntaxKind.Parameter:
                result = reduceNodes((<ParameterDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<ParameterDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<ParameterDeclaration>node).name, cbNode, result);
                result = reduceNode((<ParameterDeclaration>node).type, cbNode, result);
                result = reduceNode((<ParameterDeclaration>node).initializer, cbNode, result);
                break;

            case SyntaxKind.Decorator:
                result = reduceNode((<Decorator>node).expression, cbNode, result);
                break;

            // Type member
            case SyntaxKind.PropertySignature:
                result = reduceNodes((<PropertySignature>node).modifiers, cbNodes, result);
                result = reduceNode((<PropertySignature>node).name, cbNode, result);
                result = reduceNode((<PropertySignature>node).questionToken, cbNode, result);
                result = reduceNode((<PropertySignature>node).type, cbNode, result);
                result = reduceNode((<PropertySignature>node).initializer, cbNode, result);
                break;

            case SyntaxKind.PropertyDeclaration:
                result = reduceNodes((<PropertyDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<PropertyDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<PropertyDeclaration>node).name, cbNode, result);
                result = reduceNode((<PropertyDeclaration>node).type, cbNode, result);
                result = reduceNode((<PropertyDeclaration>node).initializer, cbNode, result);
                break;

            case SyntaxKind.MethodDeclaration:
                result = reduceNodes((<MethodDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<MethodDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<MethodDeclaration>node).name, cbNode, result);
                result = reduceNodes((<MethodDeclaration>node).typeParameters, cbNodes, result);
                result = reduceNodes((<MethodDeclaration>node).parameters, cbNodes, result);
                result = reduceNode((<MethodDeclaration>node).type, cbNode, result);
                result = reduceNode((<MethodDeclaration>node).body, cbNode, result);
                break;

            case SyntaxKind.Constructor:
                result = reduceNodes((<ConstructorDeclaration>node).modifiers, cbNodes, result);
                result = reduceNodes((<ConstructorDeclaration>node).parameters, cbNodes, result);
                result = reduceNode((<ConstructorDeclaration>node).body, cbNode, result);
                break;

            case SyntaxKind.GetAccessor:
                result = reduceNodes((<GetAccessorDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<GetAccessorDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<GetAccessorDeclaration>node).name, cbNode, result);
                result = reduceNodes((<GetAccessorDeclaration>node).parameters, cbNodes, result);
                result = reduceNode((<GetAccessorDeclaration>node).type, cbNode, result);
                result = reduceNode((<GetAccessorDeclaration>node).body, cbNode, result);
                break;

            case SyntaxKind.SetAccessor:
                result = reduceNodes((<GetAccessorDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<GetAccessorDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<GetAccessorDeclaration>node).name, cbNode, result);
                result = reduceNodes((<GetAccessorDeclaration>node).parameters, cbNodes, result);
                result = reduceNode((<GetAccessorDeclaration>node).body, cbNode, result);
                break;

            // Binding patterns
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                result = reduceNodes((<BindingPattern>node).elements, cbNodes, result);
                break;

            case SyntaxKind.BindingElement:
                result = reduceNode((<BindingElement>node).propertyName, cbNode, result);
                result = reduceNode((<BindingElement>node).name, cbNode, result);
                result = reduceNode((<BindingElement>node).initializer, cbNode, result);
                break;

            // Expression
            case SyntaxKind.ArrayLiteralExpression:
                result = reduceNodes((<ArrayLiteralExpression>node).elements, cbNodes, result);
                break;

            case SyntaxKind.ObjectLiteralExpression:
                result = reduceNodes((<ObjectLiteralExpression>node).properties, cbNodes, result);
                break;

            case SyntaxKind.PropertyAccessExpression:
                result = reduceNode((<PropertyAccessExpression>node).expression, cbNode, result);
                result = reduceNode((<PropertyAccessExpression>node).name, cbNode, result);
                break;

            case SyntaxKind.ElementAccessExpression:
                result = reduceNode((<ElementAccessExpression>node).expression, cbNode, result);
                result = reduceNode((<ElementAccessExpression>node).argumentExpression, cbNode, result);
                break;

            case SyntaxKind.CallExpression:
                result = reduceNode((<CallExpression>node).expression, cbNode, result);
                result = reduceNodes((<CallExpression>node).typeArguments, cbNodes, result);
                result = reduceNodes((<CallExpression>node).arguments, cbNodes, result);
                break;

            case SyntaxKind.NewExpression:
                result = reduceNode((<NewExpression>node).expression, cbNode, result);
                result = reduceNodes((<NewExpression>node).typeArguments, cbNodes, result);
                result = reduceNodes((<NewExpression>node).arguments, cbNodes, result);
                break;

            case SyntaxKind.TaggedTemplateExpression:
                result = reduceNode((<TaggedTemplateExpression>node).tag, cbNode, result);
                result = reduceNodes((<TaggedTemplateExpression>node).typeArguments, cbNodes, result);
                result = reduceNode((<TaggedTemplateExpression>node).template, cbNode, result);
                break;

            case SyntaxKind.TypeAssertionExpression:
                result = reduceNode((<TypeAssertion>node).type, cbNode, result);
                result = reduceNode((<TypeAssertion>node).expression, cbNode, result);
                break;

            case SyntaxKind.FunctionExpression:
                result = reduceNodes((<FunctionExpression>node).modifiers, cbNodes, result);
                result = reduceNode((<FunctionExpression>node).name, cbNode, result);
                result = reduceNodes((<FunctionExpression>node).typeParameters, cbNodes, result);
                result = reduceNodes((<FunctionExpression>node).parameters, cbNodes, result);
                result = reduceNode((<FunctionExpression>node).type, cbNode, result);
                result = reduceNode((<FunctionExpression>node).body, cbNode, result);
                break;

            case SyntaxKind.ArrowFunction:
                result = reduceNodes((<ArrowFunction>node).modifiers, cbNodes, result);
                result = reduceNodes((<ArrowFunction>node).typeParameters, cbNodes, result);
                result = reduceNodes((<ArrowFunction>node).parameters, cbNodes, result);
                result = reduceNode((<ArrowFunction>node).type, cbNode, result);
                result = reduceNode((<ArrowFunction>node).body, cbNode, result);
                break;

            case SyntaxKind.ParenthesizedExpression:
            case SyntaxKind.DeleteExpression:
            case SyntaxKind.TypeOfExpression:
            case SyntaxKind.VoidExpression:
            case SyntaxKind.AwaitExpression:
            case SyntaxKind.YieldExpression:
            case SyntaxKind.SpreadElement:
            case SyntaxKind.NonNullExpression:
                result = reduceNode((<ParenthesizedExpression | DeleteExpression | TypeOfExpression | VoidExpression | AwaitExpression | YieldExpression | SpreadElement | NonNullExpression>node).expression, cbNode, result);
                break;

            case SyntaxKind.PrefixUnaryExpression:
            case SyntaxKind.PostfixUnaryExpression:
                result = reduceNode((<PrefixUnaryExpression | PostfixUnaryExpression>node).operand, cbNode, result);
                break;

            case SyntaxKind.BinaryExpression:
                result = reduceNode((<BinaryExpression>node).left, cbNode, result);
                result = reduceNode((<BinaryExpression>node).right, cbNode, result);
                break;

            case SyntaxKind.ConditionalExpression:
                result = reduceNode((<ConditionalExpression>node).condition, cbNode, result);
                result = reduceNode((<ConditionalExpression>node).whenTrue, cbNode, result);
                result = reduceNode((<ConditionalExpression>node).whenFalse, cbNode, result);
                break;

            case SyntaxKind.TemplateExpression:
                result = reduceNode((<TemplateExpression>node).head, cbNode, result);
                result = reduceNodes((<TemplateExpression>node).templateSpans, cbNodes, result);
                break;

            case SyntaxKind.ClassExpression:
                result = reduceNodes((<ClassExpression>node).modifiers, cbNodes, result);
                result = reduceNode((<ClassExpression>node).name, cbNode, result);
                result = reduceNodes((<ClassExpression>node).typeParameters, cbNodes, result);
                result = reduceNodes((<ClassExpression>node).heritageClauses, cbNodes, result);
                result = reduceNodes((<ClassExpression>node).members, cbNodes, result);
                break;

            case SyntaxKind.ExpressionWithTypeArguments:
                result = reduceNode((<ExpressionWithTypeArguments>node).expression, cbNode, result);
                result = reduceNodes((<ExpressionWithTypeArguments>node).typeArguments, cbNodes, result);
                break;

            case SyntaxKind.AsExpression:
                result = reduceNode((<AsExpression>node).expression, cbNode, result);
                result = reduceNode((<AsExpression>node).type, cbNode, result);
                break;

            // Misc
            case SyntaxKind.TemplateSpan:
                result = reduceNode((<TemplateSpan>node).expression, cbNode, result);
                result = reduceNode((<TemplateSpan>node).literal, cbNode, result);
                break;

            // Element
            case SyntaxKind.Block:
                result = reduceNodes((<Block>node).statements, cbNodes, result);
                break;

            case SyntaxKind.VariableStatement:
                result = reduceNodes((<VariableStatement>node).modifiers, cbNodes, result);
                result = reduceNode((<VariableStatement>node).declarationList, cbNode, result);
                break;

            case SyntaxKind.ExpressionStatement:
                result = reduceNode((<ExpressionStatement>node).expression, cbNode, result);
                break;

            case SyntaxKind.IfStatement:
                result = reduceNode((<IfStatement>node).expression, cbNode, result);
                result = reduceNode((<IfStatement>node).thenStatement, cbNode, result);
                result = reduceNode((<IfStatement>node).elseStatement, cbNode, result);
                break;

            case SyntaxKind.DoStatement:
                result = reduceNode((<DoStatement>node).statement, cbNode, result);
                result = reduceNode((<DoStatement>node).expression, cbNode, result);
                break;

            case SyntaxKind.WhileStatement:
            case SyntaxKind.WithStatement:
                result = reduceNode((<WhileStatement | WithStatement>node).expression, cbNode, result);
                result = reduceNode((<WhileStatement | WithStatement>node).statement, cbNode, result);
                break;

            case SyntaxKind.ForStatement:
                result = reduceNode((<ForStatement>node).initializer, cbNode, result);
                result = reduceNode((<ForStatement>node).condition, cbNode, result);
                result = reduceNode((<ForStatement>node).incrementor, cbNode, result);
                result = reduceNode((<ForStatement>node).statement, cbNode, result);
                break;

            case SyntaxKind.ForInStatement:
            case SyntaxKind.ForOfStatement:
                result = reduceNode((<ForInOrOfStatement>node).initializer, cbNode, result);
                result = reduceNode((<ForInOrOfStatement>node).expression, cbNode, result);
                result = reduceNode((<ForInOrOfStatement>node).statement, cbNode, result);
                break;

            case SyntaxKind.ReturnStatement:
            case SyntaxKind.ThrowStatement:
                result = reduceNode((<ReturnStatement>node).expression, cbNode, result);
                break;

            case SyntaxKind.SwitchStatement:
                result = reduceNode((<SwitchStatement>node).expression, cbNode, result);
                result = reduceNode((<SwitchStatement>node).caseBlock, cbNode, result);
                break;

            case SyntaxKind.LabeledStatement:
                result = reduceNode((<LabeledStatement>node).label, cbNode, result);
                result = reduceNode((<LabeledStatement>node).statement, cbNode, result);
                break;

            case SyntaxKind.TryStatement:
                result = reduceNode((<TryStatement>node).tryBlock, cbNode, result);
                result = reduceNode((<TryStatement>node).catchClause, cbNode, result);
                result = reduceNode((<TryStatement>node).finallyBlock, cbNode, result);
                break;

            case SyntaxKind.VariableDeclaration:
                result = reduceNode((<VariableDeclaration>node).name, cbNode, result);
                result = reduceNode((<VariableDeclaration>node).type, cbNode, result);
                result = reduceNode((<VariableDeclaration>node).initializer, cbNode, result);
                break;

            case SyntaxKind.VariableDeclarationList:
                result = reduceNodes((<VariableDeclarationList>node).declarations, cbNodes, result);
                break;

            case SyntaxKind.FunctionDeclaration:
                result = reduceNodes((<FunctionDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<FunctionDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<FunctionDeclaration>node).name, cbNode, result);
                result = reduceNodes((<FunctionDeclaration>node).typeParameters, cbNodes, result);
                result = reduceNodes((<FunctionDeclaration>node).parameters, cbNodes, result);
                result = reduceNode((<FunctionDeclaration>node).type, cbNode, result);
                result = reduceNode((<FunctionDeclaration>node).body, cbNode, result);
                break;

            case SyntaxKind.ClassDeclaration:
                result = reduceNodes((<ClassDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<ClassDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<ClassDeclaration>node).name, cbNode, result);
                result = reduceNodes((<ClassDeclaration>node).typeParameters, cbNodes, result);
                result = reduceNodes((<ClassDeclaration>node).heritageClauses, cbNodes, result);
                result = reduceNodes((<ClassDeclaration>node).members, cbNodes, result);
                break;

            case SyntaxKind.EnumDeclaration:
                result = reduceNodes((<EnumDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<EnumDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<EnumDeclaration>node).name, cbNode, result);
                result = reduceNodes((<EnumDeclaration>node).members, cbNodes, result);
                break;

            case SyntaxKind.ModuleDeclaration:
                result = reduceNodes((<ModuleDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<ModuleDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<ModuleDeclaration>node).name, cbNode, result);
                result = reduceNode((<ModuleDeclaration>node).body, cbNode, result);
                break;

            case SyntaxKind.ModuleBlock:
                result = reduceNodes((<ModuleBlock>node).statements, cbNodes, result);
                break;

            case SyntaxKind.CaseBlock:
                result = reduceNodes((<CaseBlock>node).clauses, cbNodes, result);
                break;

            case SyntaxKind.ImportEqualsDeclaration:
                result = reduceNodes((<ImportEqualsDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<ImportEqualsDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<ImportEqualsDeclaration>node).name, cbNode, result);
                result = reduceNode((<ImportEqualsDeclaration>node).moduleReference, cbNode, result);
                break;

            case SyntaxKind.ImportDeclaration:
                result = reduceNodes((<ImportDeclaration>node).decorators, cbNodes, result);
                result = reduceNodes((<ImportDeclaration>node).modifiers, cbNodes, result);
                result = reduceNode((<ImportDeclaration>node).importClause, cbNode, result);
                result = reduceNode((<ImportDeclaration>node).moduleSpecifier, cbNode, result);
                break;

            case SyntaxKind.ImportClause:
                result = reduceNode((<ImportClause>node).name, cbNode, result);
                result = reduceNode((<ImportClause>node).namedBindings, cbNode, result);
                break;

            case SyntaxKind.NamespaceImport:
                result = reduceNode((<NamespaceImport>node).name, cbNode, result);
                break;

            case SyntaxKind.NamedImports:
            case SyntaxKind.NamedExports:
                result = reduceNodes((<NamedImports | NamedExports>node).elements, cbNodes, result);
                break;

            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ExportSpecifier:
                result = reduceNode((<ImportSpecifier | ExportSpecifier>node).propertyName, cbNode, result);
                result = reduceNode((<ImportSpecifier | ExportSpecifier>node).name, cbNode, result);
                break;

            case SyntaxKind.ExportAssignment:
                result = reduceLeft((<ExportAssignment>node).decorators, cbNode, result);
                result = reduceLeft((<ExportAssignment>node).modifiers, cbNode, result);
                result = reduceNode((<ExportAssignment>node).expression, cbNode, result);
                break;

            case SyntaxKind.ExportDeclaration:
                result = reduceLeft((<ExportDeclaration>node).decorators, cbNode, result);
                result = reduceLeft((<ExportDeclaration>node).modifiers, cbNode, result);
                result = reduceNode((<ExportDeclaration>node).exportClause, cbNode, result);
                result = reduceNode((<ExportDeclaration>node).moduleSpecifier, cbNode, result);
                break;

            // Module references
            case SyntaxKind.ExternalModuleReference:
                result = reduceNode((<ExternalModuleReference>node).expression, cbNode, result);
                break;

            // JSX
            case SyntaxKind.JsxElement:
                result = reduceNode((<JsxElement>node).openingElement, cbNode, result);
                result = reduceLeft((<JsxElement>node).children, cbNode, result);
                result = reduceNode((<JsxElement>node).closingElement, cbNode, result);
                break;

            case SyntaxKind.JsxFragment:
                result = reduceNode((<JsxFragment>node).openingFragment, cbNode, result);
                result = reduceLeft((<JsxFragment>node).children, cbNode, result);
                result = reduceNode((<JsxFragment>node).closingFragment, cbNode, result);
                break;

            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxOpeningElement:
                result = reduceNode((<JsxSelfClosingElement | JsxOpeningElement>node).tagName, cbNode, result);
                result = reduceNodes((<JsxSelfClosingElement | JsxOpeningElement>node).typeArguments, cbNode, result);
                result = reduceNode((<JsxSelfClosingElement | JsxOpeningElement>node).attributes, cbNode, result);
                break;

            case SyntaxKind.JsxAttributes:
                result = reduceNodes((<JsxAttributes>node).properties, cbNodes, result);
                break;

            case SyntaxKind.JsxClosingElement:
                result = reduceNode((<JsxClosingElement>node).tagName, cbNode, result);
                break;

            case SyntaxKind.JsxAttribute:
                result = reduceNode((<JsxAttribute>node).name, cbNode, result);
                result = reduceNode((<JsxAttribute>node).initializer, cbNode, result);
                break;

            case SyntaxKind.JsxSpreadAttribute:
                result = reduceNode((<JsxSpreadAttribute>node).expression, cbNode, result);
                break;

            case SyntaxKind.JsxExpression:
                result = reduceNode((<JsxExpression>node).expression, cbNode, result);
                break;

            // Clauses
            case SyntaxKind.CaseClause:
                result = reduceNode((<CaseClause>node).expression, cbNode, result);
                // falls through

            case SyntaxKind.DefaultClause:
                result = reduceNodes((<CaseClause | DefaultClause>node).statements, cbNodes, result);
                break;

            case SyntaxKind.HeritageClause:
                result = reduceNodes((<HeritageClause>node).types, cbNodes, result);
                break;

            case SyntaxKind.CatchClause:
                result = reduceNode((<CatchClause>node).variableDeclaration, cbNode, result);
                result = reduceNode((<CatchClause>node).block, cbNode, result);
                break;

            // Property assignments
            case SyntaxKind.PropertyAssignment:
                result = reduceNode((<PropertyAssignment>node).name, cbNode, result);
                result = reduceNode((<PropertyAssignment>node).initializer, cbNode, result);
                break;

            case SyntaxKind.ShorthandPropertyAssignment:
                result = reduceNode((<ShorthandPropertyAssignment>node).name, cbNode, result);
                result = reduceNode((<ShorthandPropertyAssignment>node).objectAssignmentInitializer, cbNode, result);
                break;

            case SyntaxKind.SpreadAssignment:
                result = reduceNode((<SpreadAssignment>node).expression, cbNode, result);
                break;

            // Enum
            case SyntaxKind.EnumMember:
                result = reduceNode((<EnumMember>node).name, cbNode, result);
                result = reduceNode((<EnumMember>node).initializer, cbNode, result);
                break;

            // Top-level nodes
            case SyntaxKind.SourceFile:
                result = reduceNodes((<SourceFile>node).statements, cbNodes, result);
                break;

            // Transformation nodes
            case SyntaxKind.PartiallyEmittedExpression:
                result = reduceNode((<PartiallyEmittedExpression>node).expression, cbNode, result);
                break;

            case SyntaxKind.CommaListExpression:
                result = reduceNodes((<CommaListExpression>node).elements, cbNodes, result);
                break;

            default:
                break;
        }

        return result;
    }

    /**
     * Merges generated lexical declarations into a new statement list.
     */
    export function mergeLexicalEnvironment(statements: NodeArray<Statement>, declarations: readonly Statement[] | undefined, factory?: NodeFactory): NodeArray<Statement>;

    /**
     * Appends generated lexical declarations to an array of statements.
     */
    export function mergeLexicalEnvironment(statements: Statement[], declarations: readonly Statement[] | undefined, factory?: NodeFactory): Statement[];
    export function mergeLexicalEnvironment(statements: Statement[] | NodeArray<Statement>, declarations: readonly Statement[] | undefined, factory = ts.factory) {
        if (!some(declarations)) {
            return statements;
        }

        return isNodeArray(statements)
            ? setTextRange(factory.createNodeArray(insertStatementsAfterStandardPrologue(statements.slice(), declarations)), statements)
            : insertStatementsAfterStandardPrologue(statements, declarations);
    }

    /**
     * Lifts a NodeArray containing only Statement nodes to a block.
     *
     * @param nodes The NodeArray.
     */
    export function liftToBlock(nodes: readonly Node[], factory = ts.factory): Statement {
        Debug.assert(every(nodes, isStatement), "Cannot lift nodes to a Block.");
        return <Statement>singleOrUndefined(nodes) || factory.createBlock(<NodeArray<Statement>>nodes);
    }
}
