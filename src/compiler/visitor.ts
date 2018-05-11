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
    export function visitNode<T extends Node>(node: T, visitor: Visitor, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T;

    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param lift An optional callback to execute to lift a NodeArray into a valid Node.
     */
    export function visitNode<T extends Node>(node: T | undefined, visitor: Visitor, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T | undefined;

    export function visitNode<T extends Node>(node: T | undefined, visitor: Visitor, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T): T | undefined {
        if (node === undefined || visitor === undefined) {
            return node;
        }

        aggregateTransformFlags(node);
        const visited = visitor(node);
        if (visited === node) {
            return node;
        }

        let visitedNode: Node;
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
        aggregateTransformFlags(visitedNode);
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
    export function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T>;

    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    export function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined;

    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     * @param start An optional value indicating the starting offset at which to start visiting.
     * @param count An optional value indicating the maximum number of nodes to visit.
     */
    export function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<T> | undefined {
        if (nodes === undefined || visitor === undefined) {
            return nodes;
        }

        let updated: MutableNodeArray<T>;

        // Ensure start and count have valid values
        const length = nodes.length;
        if (start === undefined || start < 0) {
            start = 0;
        }

        if (count === undefined || count > length - start) {
            count = length - start;
        }

        if (start > 0 || count < length) {
            // If we are not visiting all of the original nodes, we must always create a new array.
            // Since this is a fragment of a node array, we do not copy over the previous location
            // and will only copy over `hasTrailingComma` if we are including the last element.
            updated = createNodeArray<T>([], /*hasTrailingComma*/ nodes.hasTrailingComma && start + count === length);
        }

        // Visit each original node.
        for (let i = 0; i < count; i++) {
            const node = nodes[i + start];
            aggregateTransformFlags(node);
            const visited = node !== undefined ? visitor(node) : undefined;
            if (updated !== undefined || visited === undefined || visited !== node) {
                if (updated === undefined) {
                    // Ensure we have a copy of `nodes`, up to the current index.
                    updated = createNodeArray(nodes.slice(0, i), nodes.hasTrailingComma);
                    setTextRange(updated, nodes);
                }
                if (visited) {
                    if (isArray(visited)) {
                        for (const visitedNode of visited) {
                            Debug.assertNode(visitedNode, test);
                            aggregateTransformFlags(visitedNode);
                            updated.push(<T>visitedNode);
                        }
                    }
                    else {
                        Debug.assertNode(visited, test);
                        aggregateTransformFlags(visited);
                        updated.push(<T>visited);
                    }
                }
            }
        }

        return updated || nodes;
    }

    /**
     * Starts a new lexical environment and visits a statement list, ending the lexical environment
     * and merging hoisted declarations upon completion.
     */
    export function visitLexicalEnvironment(statements: NodeArray<Statement>, visitor: Visitor, context: TransformationContext, start?: number, ensureUseStrict?: boolean) {
        context.startLexicalEnvironment();
        statements = visitNodes(statements, visitor, isStatement, start);
        if (ensureUseStrict && !startsWithUseStrict(statements)) {
            statements = setTextRange(createNodeArray([createStatement(createLiteral("use strict")), ...statements]), statements);
        }
        const declarations = context.endLexicalEnvironment();
        return setTextRange(createNodeArray(concatenate(declarations, statements)), statements);
    }

    /**
     * Starts a new lexical environment and visits a parameter list, suspending the lexical
     * environment upon completion.
     */
    export function visitParameterList(nodes: NodeArray<ParameterDeclaration>, visitor: Visitor, context: TransformationContext, nodesVisitor = visitNodes) {
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
    export function visitFunctionBody(node: ConciseBody, visitor: Visitor, context: TransformationContext): ConciseBody {
        context.resumeLexicalEnvironment();
        const updated = visitNode(node, visitor, isConciseBody);
        const declarations = context.endLexicalEnvironment();
        if (some(declarations)) {
            const block = convertToFunctionBody(updated);
            const statements = mergeLexicalEnvironment(block.statements, declarations);
            return updateBlock(block, statements);
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
    export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor, context: TransformationContext, nodesVisitor?: typeof visitNodes, tokenVisitor?: Visitor): T | undefined;

    export function visitEachChild(node: Node, visitor: Visitor, context: TransformationContext, nodesVisitor = visitNodes, tokenVisitor?: Visitor): Node {
        if (node === undefined) {
            return undefined;
        }

        const kind = node.kind;

        // No need to visit nodes with no children.
        if ((kind > SyntaxKind.FirstToken && kind <= SyntaxKind.LastToken) || kind === SyntaxKind.ThisType) {
            return node;
        }

        switch (kind) {
            // Names

            case SyntaxKind.Identifier:
                return updateIdentifier(<Identifier>node, nodesVisitor((<Identifier>node).typeArguments, visitor, isTypeNodeOrTypeParameterDeclaration));

            case SyntaxKind.QualifiedName:
                return updateQualifiedName(<QualifiedName>node,
                    visitNode((<QualifiedName>node).left, visitor, isEntityName),
                    visitNode((<QualifiedName>node).right, visitor, isIdentifier));

            case SyntaxKind.ComputedPropertyName:
                return updateComputedPropertyName(<ComputedPropertyName>node,
                    visitNode((<ComputedPropertyName>node).expression, visitor, isExpression));

            // Signature elements

            case SyntaxKind.TypeParameter:
                return updateTypeParameterDeclaration(<TypeParameterDeclaration>node,
                    visitNode((<TypeParameterDeclaration>node).name, visitor, isIdentifier),
                    visitNode((<TypeParameterDeclaration>node).constraint, visitor, isTypeNode),
                    visitNode((<TypeParameterDeclaration>node).default, visitor, isTypeNode));

            case SyntaxKind.Parameter:
                return updateParameter(<ParameterDeclaration>node,
                    nodesVisitor((<ParameterDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ParameterDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<ParameterDeclaration>node).dotDotDotToken, tokenVisitor, isToken),
                    visitNode((<ParameterDeclaration>node).name, visitor, isBindingName),
                    visitNode((<ParameterDeclaration>node).questionToken, tokenVisitor, isToken),
                    visitNode((<ParameterDeclaration>node).type, visitor, isTypeNode),
                    visitNode((<ParameterDeclaration>node).initializer, visitor, isExpression));

            case SyntaxKind.Decorator:
                return updateDecorator(<Decorator>node,
                    visitNode((<Decorator>node).expression, visitor, isExpression));

            // Type elements

            case SyntaxKind.PropertySignature:
                return updatePropertySignature((<PropertySignature>node),
                    nodesVisitor((<PropertySignature>node).modifiers, visitor, isToken),
                    visitNode((<PropertySignature>node).name, visitor, isPropertyName),
                    visitNode((<PropertySignature>node).questionToken, tokenVisitor, isToken),
                    visitNode((<PropertySignature>node).type, visitor, isTypeNode),
                    visitNode((<PropertySignature>node).initializer, visitor, isExpression));

            case SyntaxKind.PropertyDeclaration:
                return updateProperty(<PropertyDeclaration>node,
                    nodesVisitor((<PropertyDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<PropertyDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<PropertyDeclaration>node).name, visitor, isPropertyName),
                    visitNode((<PropertyDeclaration>node).questionToken, tokenVisitor, isToken),
                    visitNode((<PropertyDeclaration>node).type, visitor, isTypeNode),
                    visitNode((<PropertyDeclaration>node).initializer, visitor, isExpression));

            case SyntaxKind.MethodSignature:
                return updateMethodSignature(<MethodSignature>node,
                    nodesVisitor((<MethodSignature>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<MethodSignature>node).parameters, visitor, isParameterDeclaration),
                    visitNode((<MethodSignature>node).type, visitor, isTypeNode),
                    visitNode((<MethodSignature>node).name, visitor, isPropertyName),
                    visitNode((<MethodSignature>node).questionToken, tokenVisitor, isToken));

            case SyntaxKind.MethodDeclaration:
                return updateMethod(<MethodDeclaration>node,
                    nodesVisitor((<MethodDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<MethodDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<MethodDeclaration>node).asteriskToken, tokenVisitor, isToken),
                    visitNode((<MethodDeclaration>node).name, visitor, isPropertyName),
                    visitNode((<MethodDeclaration>node).questionToken, tokenVisitor, isToken),
                    nodesVisitor((<MethodDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<MethodDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitNode((<MethodDeclaration>node).type, visitor, isTypeNode),
                    visitFunctionBody((<MethodDeclaration>node).body, visitor, context));

            case SyntaxKind.Constructor:
                return updateConstructor(<ConstructorDeclaration>node,
                    nodesVisitor((<ConstructorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ConstructorDeclaration>node).modifiers, visitor, isModifier),
                    visitParameterList((<ConstructorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitFunctionBody((<ConstructorDeclaration>node).body, visitor, context));

            case SyntaxKind.GetAccessor:
                return updateGetAccessor(<GetAccessorDeclaration>node,
                    nodesVisitor((<GetAccessorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<GetAccessorDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<GetAccessorDeclaration>node).name, visitor, isPropertyName),
                    visitParameterList((<GetAccessorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitNode((<GetAccessorDeclaration>node).type, visitor, isTypeNode),
                    visitFunctionBody((<GetAccessorDeclaration>node).body, visitor, context));

            case SyntaxKind.SetAccessor:
                return updateSetAccessor(<SetAccessorDeclaration>node,
                    nodesVisitor((<SetAccessorDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<SetAccessorDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<SetAccessorDeclaration>node).name, visitor, isPropertyName),
                    visitParameterList((<SetAccessorDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitFunctionBody((<SetAccessorDeclaration>node).body, visitor, context));

            case SyntaxKind.CallSignature:
                return updateCallSignature(<CallSignatureDeclaration>node,
                    nodesVisitor((<CallSignatureDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<CallSignatureDeclaration>node).parameters, visitor, isParameterDeclaration),
                    visitNode((<CallSignatureDeclaration>node).type, visitor, isTypeNode));

            case SyntaxKind.ConstructSignature:
                return updateConstructSignature(<ConstructSignatureDeclaration>node,
                    nodesVisitor((<ConstructSignatureDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ConstructSignatureDeclaration>node).parameters, visitor, isParameterDeclaration),
                    visitNode((<ConstructSignatureDeclaration>node).type, visitor, isTypeNode));

            case SyntaxKind.IndexSignature:
                return updateIndexSignature(<IndexSignatureDeclaration>node,
                    nodesVisitor((<IndexSignatureDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<IndexSignatureDeclaration>node).modifiers, visitor, isModifier),
                    nodesVisitor((<IndexSignatureDeclaration>node).parameters, visitor, isParameterDeclaration),
                    visitNode((<IndexSignatureDeclaration>node).type, visitor, isTypeNode));

            // Types

            case SyntaxKind.TypePredicate:
                return updateTypePredicateNode(<TypePredicateNode>node,
                    visitNode((<TypePredicateNode>node).parameterName, visitor),
                    visitNode((<TypePredicateNode>node).type, visitor, isTypeNode));

            case SyntaxKind.TypeReference:
                return updateTypeReferenceNode(<TypeReferenceNode>node,
                    visitNode((<TypeReferenceNode>node).typeName, visitor, isEntityName),
                    nodesVisitor((<TypeReferenceNode>node).typeArguments, visitor, isTypeNode));

            case SyntaxKind.FunctionType:
                return updateFunctionTypeNode(<FunctionTypeNode>node,
                    nodesVisitor((<FunctionTypeNode>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<FunctionTypeNode>node).parameters, visitor, isParameterDeclaration),
                    visitNode((<FunctionTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.ConstructorType:
                return updateConstructorTypeNode(<ConstructorTypeNode>node,
                    nodesVisitor((<ConstructorTypeNode>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ConstructorTypeNode>node).parameters, visitor, isParameterDeclaration),
                    visitNode((<ConstructorTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.TypeQuery:
                return updateTypeQueryNode((<TypeQueryNode>node),
                    visitNode((<TypeQueryNode>node).exprName, visitor, isEntityName));

            case SyntaxKind.TypeLiteral:
                return updateTypeLiteralNode((<TypeLiteralNode>node),
                    nodesVisitor((<TypeLiteralNode>node).members, visitor, isTypeElement));

            case SyntaxKind.ArrayType:
                return updateArrayTypeNode(<ArrayTypeNode>node,
                    visitNode((<ArrayTypeNode>node).elementType, visitor, isTypeNode));

            case SyntaxKind.TupleType:
                return updateTypleTypeNode((<TupleTypeNode>node),
                    nodesVisitor((<TupleTypeNode>node).elementTypes, visitor, isTypeNode));

            case SyntaxKind.UnionType:
                return updateUnionTypeNode(<UnionTypeNode>node,
                    nodesVisitor((<UnionTypeNode>node).types, visitor, isTypeNode));

            case SyntaxKind.IntersectionType:
                return updateIntersectionTypeNode(<IntersectionTypeNode>node,
                    nodesVisitor((<IntersectionTypeNode>node).types, visitor, isTypeNode));

            case SyntaxKind.ConditionalType:
                return updateConditionalTypeNode(<ConditionalTypeNode>node,
                    visitNode((<ConditionalTypeNode>node).checkType, visitor, isTypeNode),
                    visitNode((<ConditionalTypeNode>node).extendsType, visitor, isTypeNode),
                    visitNode((<ConditionalTypeNode>node).trueType, visitor, isTypeNode),
                    visitNode((<ConditionalTypeNode>node).falseType, visitor, isTypeNode));

            case SyntaxKind.InferType:
                return updateInferTypeNode(<InferTypeNode>node,
                    visitNode((<InferTypeNode>node).typeParameter, visitor, isTypeParameterDeclaration));

            case SyntaxKind.ImportType:
                return updateImportTypeNode(<ImportTypeNode>node,
                    visitNode((<ImportTypeNode>node).argument, visitor, isTypeNode),
                    visitNode((<ImportTypeNode>node).qualifier, visitor, isEntityName),
                    visitNodes((<ImportTypeNode>node).typeArguments, visitor, isTypeNode),
                    (<ImportTypeNode>node).isTypeOf
                );

            case SyntaxKind.ParenthesizedType:
                return updateParenthesizedType(<ParenthesizedTypeNode>node,
                    visitNode((<ParenthesizedTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.TypeOperator:
                return updateTypeOperatorNode(<TypeOperatorNode>node,
                    visitNode((<TypeOperatorNode>node).type, visitor, isTypeNode));

            case SyntaxKind.IndexedAccessType:
                return updateIndexedAccessTypeNode((<IndexedAccessTypeNode>node),
                    visitNode((<IndexedAccessTypeNode>node).objectType, visitor, isTypeNode),
                    visitNode((<IndexedAccessTypeNode>node).indexType, visitor, isTypeNode));

            case SyntaxKind.MappedType:
                return updateMappedTypeNode((<MappedTypeNode>node),
                    visitNode((<MappedTypeNode>node).readonlyToken, tokenVisitor, isToken),
                    visitNode((<MappedTypeNode>node).typeParameter, visitor, isTypeParameterDeclaration),
                    visitNode((<MappedTypeNode>node).questionToken, tokenVisitor, isToken),
                    visitNode((<MappedTypeNode>node).type, visitor, isTypeNode));

            case SyntaxKind.LiteralType:
                return updateLiteralTypeNode(<LiteralTypeNode>node,
                    visitNode((<LiteralTypeNode>node).literal, visitor, isExpression));

            // Binding patterns

            case SyntaxKind.ObjectBindingPattern:
                return updateObjectBindingPattern(<ObjectBindingPattern>node,
                    nodesVisitor((<ObjectBindingPattern>node).elements, visitor, isBindingElement));

            case SyntaxKind.ArrayBindingPattern:
                return updateArrayBindingPattern(<ArrayBindingPattern>node,
                    nodesVisitor((<ArrayBindingPattern>node).elements, visitor, isArrayBindingElement));

            case SyntaxKind.BindingElement:
                return updateBindingElement(<BindingElement>node,
                    visitNode((<BindingElement>node).dotDotDotToken, tokenVisitor, isToken),
                    visitNode((<BindingElement>node).propertyName, visitor, isPropertyName),
                    visitNode((<BindingElement>node).name, visitor, isBindingName),
                    visitNode((<BindingElement>node).initializer, visitor, isExpression));

            // Expression

            case SyntaxKind.ArrayLiteralExpression:
                return updateArrayLiteral(<ArrayLiteralExpression>node,
                    nodesVisitor((<ArrayLiteralExpression>node).elements, visitor, isExpression));

            case SyntaxKind.ObjectLiteralExpression:
                return updateObjectLiteral(<ObjectLiteralExpression>node,
                    nodesVisitor((<ObjectLiteralExpression>node).properties, visitor, isObjectLiteralElementLike));

            case SyntaxKind.PropertyAccessExpression:
                return updatePropertyAccess(<PropertyAccessExpression>node,
                    visitNode((<PropertyAccessExpression>node).expression, visitor, isExpression),
                    visitNode((<PropertyAccessExpression>node).name, visitor, isIdentifier));

            case SyntaxKind.ElementAccessExpression:
                return updateElementAccess(<ElementAccessExpression>node,
                    visitNode((<ElementAccessExpression>node).expression, visitor, isExpression),
                    visitNode((<ElementAccessExpression>node).argumentExpression, visitor, isExpression));

            case SyntaxKind.CallExpression:
                return updateCall(<CallExpression>node,
                    visitNode((<CallExpression>node).expression, visitor, isExpression),
                    nodesVisitor((<CallExpression>node).typeArguments, visitor, isTypeNode),
                    nodesVisitor((<CallExpression>node).arguments, visitor, isExpression));

            case SyntaxKind.NewExpression:
                return updateNew(<NewExpression>node,
                    visitNode((<NewExpression>node).expression, visitor, isExpression),
                    nodesVisitor((<NewExpression>node).typeArguments, visitor, isTypeNode),
                    nodesVisitor((<NewExpression>node).arguments, visitor, isExpression));

            case SyntaxKind.TaggedTemplateExpression:
                return updateTaggedTemplate(<TaggedTemplateExpression>node,
                    visitNode((<TaggedTemplateExpression>node).tag, visitor, isExpression),
                    visitNodes((<TaggedTemplateExpression>node).typeArguments, visitor, isExpression),
                    visitNode((<TaggedTemplateExpression>node).template, visitor, isTemplateLiteral));

            case SyntaxKind.TypeAssertionExpression:
                return updateTypeAssertion(<TypeAssertion>node,
                    visitNode((<TypeAssertion>node).type, visitor, isTypeNode),
                    visitNode((<TypeAssertion>node).expression, visitor, isExpression));

            case SyntaxKind.ParenthesizedExpression:
                return updateParen(<ParenthesizedExpression>node,
                    visitNode((<ParenthesizedExpression>node).expression, visitor, isExpression));

            case SyntaxKind.FunctionExpression:
                return updateFunctionExpression(<FunctionExpression>node,
                    nodesVisitor((<FunctionExpression>node).modifiers, visitor, isModifier),
                    visitNode((<FunctionExpression>node).asteriskToken, tokenVisitor, isToken),
                    visitNode((<FunctionExpression>node).name, visitor, isIdentifier),
                    nodesVisitor((<FunctionExpression>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<FunctionExpression>node).parameters, visitor, context, nodesVisitor),
                    visitNode((<FunctionExpression>node).type, visitor, isTypeNode),
                    visitFunctionBody((<FunctionExpression>node).body, visitor, context));

            case SyntaxKind.ArrowFunction:
                return updateArrowFunction(<ArrowFunction>node,
                    nodesVisitor((<ArrowFunction>node).modifiers, visitor, isModifier),
                    nodesVisitor((<ArrowFunction>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<ArrowFunction>node).parameters, visitor, context, nodesVisitor),
                    visitNode((<ArrowFunction>node).type, visitor, isTypeNode),
                    visitNode((<ArrowFunction>node).equalsGreaterThanToken, visitor, isToken),
                    visitFunctionBody((<ArrowFunction>node).body, visitor, context));

            case SyntaxKind.DeleteExpression:
                return updateDelete(<DeleteExpression>node,
                    visitNode((<DeleteExpression>node).expression, visitor, isExpression));

            case SyntaxKind.TypeOfExpression:
                return updateTypeOf(<TypeOfExpression>node,
                    visitNode((<TypeOfExpression>node).expression, visitor, isExpression));

            case SyntaxKind.VoidExpression:
                return updateVoid(<VoidExpression>node,
                    visitNode((<VoidExpression>node).expression, visitor, isExpression));

            case SyntaxKind.AwaitExpression:
                return updateAwait(<AwaitExpression>node,
                    visitNode((<AwaitExpression>node).expression, visitor, isExpression));

            case SyntaxKind.PrefixUnaryExpression:
                return updatePrefix(<PrefixUnaryExpression>node,
                    visitNode((<PrefixUnaryExpression>node).operand, visitor, isExpression));

            case SyntaxKind.PostfixUnaryExpression:
                return updatePostfix(<PostfixUnaryExpression>node,
                    visitNode((<PostfixUnaryExpression>node).operand, visitor, isExpression));

            case SyntaxKind.BinaryExpression:
                return updateBinary(<BinaryExpression>node,
                    visitNode((<BinaryExpression>node).left, visitor, isExpression),
                    visitNode((<BinaryExpression>node).right, visitor, isExpression),
                    visitNode((<BinaryExpression>node).operatorToken, visitor, isToken));

            case SyntaxKind.ConditionalExpression:
                return updateConditional(<ConditionalExpression>node,
                    visitNode((<ConditionalExpression>node).condition, visitor, isExpression),
                    visitNode((<ConditionalExpression>node).questionToken, visitor, isToken),
                    visitNode((<ConditionalExpression>node).whenTrue, visitor, isExpression),
                    visitNode((<ConditionalExpression>node).colonToken, visitor, isToken),
                    visitNode((<ConditionalExpression>node).whenFalse, visitor, isExpression));

            case SyntaxKind.TemplateExpression:
                return updateTemplateExpression(<TemplateExpression>node,
                    visitNode((<TemplateExpression>node).head, visitor, isTemplateHead),
                    nodesVisitor((<TemplateExpression>node).templateSpans, visitor, isTemplateSpan));

            case SyntaxKind.YieldExpression:
                return updateYield(<YieldExpression>node,
                    visitNode((<YieldExpression>node).asteriskToken, tokenVisitor, isToken),
                    visitNode((<YieldExpression>node).expression, visitor, isExpression));

            case SyntaxKind.SpreadElement:
                return updateSpread(<SpreadElement>node,
                    visitNode((<SpreadElement>node).expression, visitor, isExpression));

            case SyntaxKind.ClassExpression:
                return updateClassExpression(<ClassExpression>node,
                    nodesVisitor((<ClassExpression>node).modifiers, visitor, isModifier),
                    visitNode((<ClassExpression>node).name, visitor, isIdentifier),
                    nodesVisitor((<ClassExpression>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ClassExpression>node).heritageClauses, visitor, isHeritageClause),
                    nodesVisitor((<ClassExpression>node).members, visitor, isClassElement));

            case SyntaxKind.ExpressionWithTypeArguments:
                return updateExpressionWithTypeArguments(<ExpressionWithTypeArguments>node,
                    nodesVisitor((<ExpressionWithTypeArguments>node).typeArguments, visitor, isTypeNode),
                    visitNode((<ExpressionWithTypeArguments>node).expression, visitor, isExpression));

            case SyntaxKind.AsExpression:
                return updateAsExpression(<AsExpression>node,
                    visitNode((<AsExpression>node).expression, visitor, isExpression),
                    visitNode((<AsExpression>node).type, visitor, isTypeNode));

            case SyntaxKind.NonNullExpression:
                return updateNonNullExpression(<NonNullExpression>node,
                    visitNode((<NonNullExpression>node).expression, visitor, isExpression));

            case SyntaxKind.MetaProperty:
                return updateMetaProperty(<MetaProperty>node,
                    visitNode((<MetaProperty>node).name, visitor, isIdentifier));

            // Misc

            case SyntaxKind.TemplateSpan:
                return updateTemplateSpan(<TemplateSpan>node,
                    visitNode((<TemplateSpan>node).expression, visitor, isExpression),
                    visitNode((<TemplateSpan>node).literal, visitor, isTemplateMiddleOrTemplateTail));

            // Element

            case SyntaxKind.Block:
                return updateBlock(<Block>node,
                    nodesVisitor((<Block>node).statements, visitor, isStatement));

            case SyntaxKind.VariableStatement:
                return updateVariableStatement(<VariableStatement>node,
                    nodesVisitor((<VariableStatement>node).modifiers, visitor, isModifier),
                    visitNode((<VariableStatement>node).declarationList, visitor, isVariableDeclarationList));

            case SyntaxKind.ExpressionStatement:
                return updateStatement(<ExpressionStatement>node,
                    visitNode((<ExpressionStatement>node).expression, visitor, isExpression));

            case SyntaxKind.IfStatement:
                return updateIf(<IfStatement>node,
                    visitNode((<IfStatement>node).expression, visitor, isExpression),
                    visitNode((<IfStatement>node).thenStatement, visitor, isStatement, liftToBlock),
                    visitNode((<IfStatement>node).elseStatement, visitor, isStatement, liftToBlock));

            case SyntaxKind.DoStatement:
                return updateDo(<DoStatement>node,
                    visitNode((<DoStatement>node).statement, visitor, isStatement, liftToBlock),
                    visitNode((<DoStatement>node).expression, visitor, isExpression));

            case SyntaxKind.WhileStatement:
                return updateWhile(<WhileStatement>node,
                    visitNode((<WhileStatement>node).expression, visitor, isExpression),
                    visitNode((<WhileStatement>node).statement, visitor, isStatement, liftToBlock));

            case SyntaxKind.ForStatement:
                return updateFor(<ForStatement>node,
                    visitNode((<ForStatement>node).initializer, visitor, isForInitializer),
                    visitNode((<ForStatement>node).condition, visitor, isExpression),
                    visitNode((<ForStatement>node).incrementor, visitor, isExpression),
                    visitNode((<ForStatement>node).statement, visitor, isStatement, liftToBlock));

            case SyntaxKind.ForInStatement:
                return updateForIn(<ForInStatement>node,
                    visitNode((<ForInStatement>node).initializer, visitor, isForInitializer),
                    visitNode((<ForInStatement>node).expression, visitor, isExpression),
                    visitNode((<ForInStatement>node).statement, visitor, isStatement, liftToBlock));

            case SyntaxKind.ForOfStatement:
                return updateForOf(<ForOfStatement>node,
                    visitNode((<ForOfStatement>node).awaitModifier, visitor, isToken),
                    visitNode((<ForOfStatement>node).initializer, visitor, isForInitializer),
                    visitNode((<ForOfStatement>node).expression, visitor, isExpression),
                    visitNode((<ForOfStatement>node).statement, visitor, isStatement, liftToBlock));

            case SyntaxKind.ContinueStatement:
                return updateContinue(<ContinueStatement>node,
                    visitNode((<ContinueStatement>node).label, visitor, isIdentifier));

            case SyntaxKind.BreakStatement:
                return updateBreak(<BreakStatement>node,
                    visitNode((<BreakStatement>node).label, visitor, isIdentifier));

            case SyntaxKind.ReturnStatement:
                return updateReturn(<ReturnStatement>node,
                    visitNode((<ReturnStatement>node).expression, visitor, isExpression));

            case SyntaxKind.WithStatement:
                return updateWith(<WithStatement>node,
                    visitNode((<WithStatement>node).expression, visitor, isExpression),
                    visitNode((<WithStatement>node).statement, visitor, isStatement, liftToBlock));

            case SyntaxKind.SwitchStatement:
                return updateSwitch(<SwitchStatement>node,
                    visitNode((<SwitchStatement>node).expression, visitor, isExpression),
                    visitNode((<SwitchStatement>node).caseBlock, visitor, isCaseBlock));

            case SyntaxKind.LabeledStatement:
                return updateLabel(<LabeledStatement>node,
                    visitNode((<LabeledStatement>node).label, visitor, isIdentifier),
                    visitNode((<LabeledStatement>node).statement, visitor, isStatement, liftToBlock));

            case SyntaxKind.ThrowStatement:
                return updateThrow(<ThrowStatement>node,
                    visitNode((<ThrowStatement>node).expression, visitor, isExpression));

            case SyntaxKind.TryStatement:
                return updateTry(<TryStatement>node,
                    visitNode((<TryStatement>node).tryBlock, visitor, isBlock),
                    visitNode((<TryStatement>node).catchClause, visitor, isCatchClause),
                    visitNode((<TryStatement>node).finallyBlock, visitor, isBlock));

            case SyntaxKind.VariableDeclaration:
                return updateVariableDeclaration(<VariableDeclaration>node,
                    visitNode((<VariableDeclaration>node).name, visitor, isBindingName),
                    visitNode((<VariableDeclaration>node).type, visitor, isTypeNode),
                    visitNode((<VariableDeclaration>node).initializer, visitor, isExpression));

            case SyntaxKind.VariableDeclarationList:
                return updateVariableDeclarationList(<VariableDeclarationList>node,
                    nodesVisitor((<VariableDeclarationList>node).declarations, visitor, isVariableDeclaration));

            case SyntaxKind.FunctionDeclaration:
                return updateFunctionDeclaration(<FunctionDeclaration>node,
                    nodesVisitor((<FunctionDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<FunctionDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<FunctionDeclaration>node).asteriskToken, tokenVisitor, isToken),
                    visitNode((<FunctionDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<FunctionDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitParameterList((<FunctionDeclaration>node).parameters, visitor, context, nodesVisitor),
                    visitNode((<FunctionDeclaration>node).type, visitor, isTypeNode),
                    visitFunctionBody((<FunctionExpression>node).body, visitor, context));

            case SyntaxKind.ClassDeclaration:
                return updateClassDeclaration(<ClassDeclaration>node,
                    nodesVisitor((<ClassDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ClassDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<ClassDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<ClassDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<ClassDeclaration>node).heritageClauses, visitor, isHeritageClause),
                    nodesVisitor((<ClassDeclaration>node).members, visitor, isClassElement));

            case SyntaxKind.InterfaceDeclaration:
                return updateInterfaceDeclaration(<InterfaceDeclaration>node,
                    nodesVisitor((<InterfaceDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<InterfaceDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<InterfaceDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<InterfaceDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    nodesVisitor((<InterfaceDeclaration>node).heritageClauses, visitor, isHeritageClause),
                    nodesVisitor((<InterfaceDeclaration>node).members, visitor, isTypeElement));

            case SyntaxKind.TypeAliasDeclaration:
                return updateTypeAliasDeclaration(<TypeAliasDeclaration>node,
                    nodesVisitor((<TypeAliasDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<TypeAliasDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<TypeAliasDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<TypeAliasDeclaration>node).typeParameters, visitor, isTypeParameterDeclaration),
                    visitNode((<TypeAliasDeclaration>node).type, visitor, isTypeNode));

            case SyntaxKind.EnumDeclaration:
                return updateEnumDeclaration(<EnumDeclaration>node,
                    nodesVisitor((<EnumDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<EnumDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<EnumDeclaration>node).name, visitor, isIdentifier),
                    nodesVisitor((<EnumDeclaration>node).members, visitor, isEnumMember));

            case SyntaxKind.ModuleDeclaration:
                return updateModuleDeclaration(<ModuleDeclaration>node,
                    nodesVisitor((<ModuleDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ModuleDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<ModuleDeclaration>node).name, visitor, isIdentifier),
                    visitNode((<ModuleDeclaration>node).body, visitor, isModuleBody));

            case SyntaxKind.ModuleBlock:
                return updateModuleBlock(<ModuleBlock>node,
                    nodesVisitor((<ModuleBlock>node).statements, visitor, isStatement));

            case SyntaxKind.CaseBlock:
                return updateCaseBlock(<CaseBlock>node,
                    nodesVisitor((<CaseBlock>node).clauses, visitor, isCaseOrDefaultClause));

            case SyntaxKind.NamespaceExportDeclaration:
                return updateNamespaceExportDeclaration(<NamespaceExportDeclaration>node,
                    visitNode((<NamespaceExportDeclaration>node).name, visitor, isIdentifier));

            case SyntaxKind.ImportEqualsDeclaration:
                return updateImportEqualsDeclaration(<ImportEqualsDeclaration>node,
                    nodesVisitor((<ImportEqualsDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ImportEqualsDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<ImportEqualsDeclaration>node).name, visitor, isIdentifier),
                    visitNode((<ImportEqualsDeclaration>node).moduleReference, visitor, isModuleReference));

            case SyntaxKind.ImportDeclaration:
                return updateImportDeclaration(<ImportDeclaration>node,
                    nodesVisitor((<ImportDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ImportDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<ImportDeclaration>node).importClause, visitor, isImportClause),
                    visitNode((<ImportDeclaration>node).moduleSpecifier, visitor, isExpression));

            case SyntaxKind.ImportClause:
                return updateImportClause(<ImportClause>node,
                    visitNode((<ImportClause>node).name, visitor, isIdentifier),
                    visitNode((<ImportClause>node).namedBindings, visitor, isNamedImportBindings));

            case SyntaxKind.NamespaceImport:
                return updateNamespaceImport(<NamespaceImport>node,
                    visitNode((<NamespaceImport>node).name, visitor, isIdentifier));

            case SyntaxKind.NamedImports:
                return updateNamedImports(<NamedImports>node,
                    nodesVisitor((<NamedImports>node).elements, visitor, isImportSpecifier));

            case SyntaxKind.ImportSpecifier:
                return updateImportSpecifier(<ImportSpecifier>node,
                    visitNode((<ImportSpecifier>node).propertyName, visitor, isIdentifier),
                    visitNode((<ImportSpecifier>node).name, visitor, isIdentifier));

            case SyntaxKind.ExportAssignment:
                return updateExportAssignment(<ExportAssignment>node,
                    nodesVisitor((<ExportAssignment>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ExportAssignment>node).modifiers, visitor, isModifier),
                    visitNode((<ExportAssignment>node).expression, visitor, isExpression));

            case SyntaxKind.ExportDeclaration:
                return updateExportDeclaration(<ExportDeclaration>node,
                    nodesVisitor((<ExportDeclaration>node).decorators, visitor, isDecorator),
                    nodesVisitor((<ExportDeclaration>node).modifiers, visitor, isModifier),
                    visitNode((<ExportDeclaration>node).exportClause, visitor, isNamedExports),
                    visitNode((<ExportDeclaration>node).moduleSpecifier, visitor, isExpression));

            case SyntaxKind.NamedExports:
                return updateNamedExports(<NamedExports>node,
                    nodesVisitor((<NamedExports>node).elements, visitor, isExportSpecifier));

            case SyntaxKind.ExportSpecifier:
                return updateExportSpecifier(<ExportSpecifier>node,
                    visitNode((<ExportSpecifier>node).propertyName, visitor, isIdentifier),
                    visitNode((<ExportSpecifier>node).name, visitor, isIdentifier));

            // Module references

            case SyntaxKind.ExternalModuleReference:
                return updateExternalModuleReference(<ExternalModuleReference>node,
                    visitNode((<ExternalModuleReference>node).expression, visitor, isExpression));

            // JSX

            case SyntaxKind.JsxElement:
                return updateJsxElement(<JsxElement>node,
                    visitNode((<JsxElement>node).openingElement, visitor, isJsxOpeningElement),
                    nodesVisitor((<JsxElement>node).children, visitor, isJsxChild),
                    visitNode((<JsxElement>node).closingElement, visitor, isJsxClosingElement));

            case SyntaxKind.JsxSelfClosingElement:
                return updateJsxSelfClosingElement(<JsxSelfClosingElement>node,
                    visitNode((<JsxSelfClosingElement>node).tagName, visitor, isJsxTagNameExpression),
                    nodesVisitor((<JsxSelfClosingElement>node).typeArguments, visitor, isTypeNode),
                    visitNode((<JsxSelfClosingElement>node).attributes, visitor, isJsxAttributes));

            case SyntaxKind.JsxOpeningElement:
                return updateJsxOpeningElement(<JsxOpeningElement>node,
                    visitNode((<JsxOpeningElement>node).tagName, visitor, isJsxTagNameExpression),
                    nodesVisitor((<JsxSelfClosingElement>node).typeArguments, visitor, isTypeNode),
                    visitNode((<JsxOpeningElement>node).attributes, visitor, isJsxAttributes));

            case SyntaxKind.JsxClosingElement:
                return updateJsxClosingElement(<JsxClosingElement>node,
                    visitNode((<JsxClosingElement>node).tagName, visitor, isJsxTagNameExpression));

            case SyntaxKind.JsxFragment:
                return updateJsxFragment(<JsxFragment>node,
                    visitNode((<JsxFragment>node).openingFragment, visitor, isJsxOpeningFragment),
                    nodesVisitor((<JsxFragment>node).children, visitor, isJsxChild),
                    visitNode((<JsxFragment>node).closingFragment, visitor, isJsxClosingFragment));

            case SyntaxKind.JsxAttribute:
                return updateJsxAttribute(<JsxAttribute>node,
                    visitNode((<JsxAttribute>node).name, visitor, isIdentifier),
                    visitNode((<JsxAttribute>node).initializer, visitor, isStringLiteralOrJsxExpression));

            case SyntaxKind.JsxAttributes:
                return updateJsxAttributes(<JsxAttributes>node,
                    nodesVisitor((<JsxAttributes>node).properties, visitor, isJsxAttributeLike));

            case SyntaxKind.JsxSpreadAttribute:
                return updateJsxSpreadAttribute(<JsxSpreadAttribute>node,
                    visitNode((<JsxSpreadAttribute>node).expression, visitor, isExpression));

            case SyntaxKind.JsxExpression:
                return updateJsxExpression(<JsxExpression>node,
                    visitNode((<JsxExpression>node).expression, visitor, isExpression));

            // Clauses

            case SyntaxKind.CaseClause:
                return updateCaseClause(<CaseClause>node,
                    visitNode((<CaseClause>node).expression, visitor, isExpression),
                    nodesVisitor((<CaseClause>node).statements, visitor, isStatement));

            case SyntaxKind.DefaultClause:
                return updateDefaultClause(<DefaultClause>node,
                    nodesVisitor((<DefaultClause>node).statements, visitor, isStatement));

            case SyntaxKind.HeritageClause:
                return updateHeritageClause(<HeritageClause>node,
                    nodesVisitor((<HeritageClause>node).types, visitor, isExpressionWithTypeArguments));

            case SyntaxKind.CatchClause:
                return updateCatchClause(<CatchClause>node,
                    visitNode((<CatchClause>node).variableDeclaration, visitor, isVariableDeclaration),
                    visitNode((<CatchClause>node).block, visitor, isBlock));

            // Property assignments

            case SyntaxKind.PropertyAssignment:
                return updatePropertyAssignment(<PropertyAssignment>node,
                    visitNode((<PropertyAssignment>node).name, visitor, isPropertyName),
                    visitNode((<PropertyAssignment>node).initializer, visitor, isExpression));

            case SyntaxKind.ShorthandPropertyAssignment:
                return updateShorthandPropertyAssignment(<ShorthandPropertyAssignment>node,
                    visitNode((<ShorthandPropertyAssignment>node).name, visitor, isIdentifier),
                    visitNode((<ShorthandPropertyAssignment>node).objectAssignmentInitializer, visitor, isExpression));

            case SyntaxKind.SpreadAssignment:
                return updateSpreadAssignment(<SpreadAssignment>node,
                    visitNode((<SpreadAssignment>node).expression, visitor, isExpression));

            // Enum
            case SyntaxKind.EnumMember:
                return updateEnumMember(<EnumMember>node,
                    visitNode((<EnumMember>node).name, visitor, isPropertyName),
                    visitNode((<EnumMember>node).initializer, visitor, isExpression));

            // Top-level nodes
            case SyntaxKind.SourceFile:
                return updateSourceFileNode(<SourceFile>node,
                    visitLexicalEnvironment((<SourceFile>node).statements, visitor, context));

            // Transformation nodes
            case SyntaxKind.PartiallyEmittedExpression:
                return updatePartiallyEmittedExpression(<PartiallyEmittedExpression>node,
                    visitNode((<PartiallyEmittedExpression>node).expression, visitor, isExpression));

            case SyntaxKind.CommaListExpression:
                return updateCommaList(<CommaListExpression>node,
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
    function extractSingleNode(nodes: ReadonlyArray<Node>): Node {
        Debug.assert(nodes.length <= 1, "Too many nodes written to output.");
        return singleOrUndefined(nodes);
    }
}

/* @internal */
namespace ts {
    function reduceNode<T>(node: Node, f: (memo: T, node: Node) => T, initial: T) {
        return node ? f(initial, node) : initial;
    }

    function reduceNodeArray<T>(nodes: NodeArray<Node>, f: (memo: T, nodes: NodeArray<Node>) => T, initial: T) {
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
    export function reduceEachChild<T>(node: Node, initial: T, cbNode: (memo: T, node: Node) => T, cbNodeArray?: (memo: T, nodes: NodeArray<Node>) => T): T {
        if (node === undefined) {
            return initial;
        }

        const reduceNodes: (nodes: NodeArray<Node>, f: ((memo: T, node: Node) => T) | ((memo: T, node: NodeArray<Node>) => T), initial: T) => T = cbNodeArray ? reduceNodeArray : reduceLeft;
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
    export function mergeLexicalEnvironment(statements: NodeArray<Statement>, declarations: ReadonlyArray<Statement>): NodeArray<Statement>;

    /**
     * Appends generated lexical declarations to an array of statements.
     */
    export function mergeLexicalEnvironment(statements: Statement[], declarations: ReadonlyArray<Statement>): Statement[];
    export function mergeLexicalEnvironment(statements: Statement[] | NodeArray<Statement>, declarations: ReadonlyArray<Statement>) {
        if (!some(declarations)) {
            return statements;
        }

        return isNodeArray(statements)
            ? setTextRange(createNodeArray(concatenate(declarations, statements)), statements)
            : prependRange(statements, declarations);
    }

    /**
     * Lifts a NodeArray containing only Statement nodes to a block.
     *
     * @param nodes The NodeArray.
     */
    export function liftToBlock(nodes: ReadonlyArray<Node>): Statement {
        Debug.assert(every(nodes, isStatement), "Cannot lift nodes to a Block.");
        return <Statement>singleOrUndefined(nodes) || createBlock(<NodeArray<Statement>>nodes);
    }

    /**
     * Aggregates the TransformFlags for a Node and its subtree.
     */
    export function aggregateTransformFlags<T extends Node>(node: T): T {
        aggregateTransformFlagsForNode(node);
        return node;
    }

    /**
     * Aggregates the TransformFlags for a Node and its subtree. The flags for the subtree are
     * computed first, then the transform flags for the current node are computed from the subtree
     * flags and the state of the current node. Finally, the transform flags of the node are
     * returned, excluding any flags that should not be included in its parent node's subtree
     * flags.
     */
    function aggregateTransformFlagsForNode(node: Node): TransformFlags {
        if (node === undefined) {
            return TransformFlags.None;
        }
        if (node.transformFlags & TransformFlags.HasComputedFlags) {
            return node.transformFlags & ~getTransformFlagsSubtreeExclusions(node.kind);
        }
        const subtreeFlags = aggregateTransformFlagsForSubtree(node);
        return computeTransformFlagsForNode(node, subtreeFlags);
    }

    function aggregateTransformFlagsForNodeArray(nodes: NodeArray<Node>): TransformFlags {
        if (nodes === undefined) {
            return TransformFlags.None;
        }
        let subtreeFlags = TransformFlags.None;
        let nodeArrayFlags = TransformFlags.None;
        for (const node of nodes) {
            subtreeFlags |= aggregateTransformFlagsForNode(node);
            nodeArrayFlags |= node.transformFlags & ~TransformFlags.HasComputedFlags;
        }
        nodes.transformFlags = nodeArrayFlags | TransformFlags.HasComputedFlags;
        return subtreeFlags;
    }

    /**
     * Aggregates the transform flags for the subtree of a node.
     */
    function aggregateTransformFlagsForSubtree(node: Node): TransformFlags {
        // We do not transform ambient declarations or types, so there is no need to
        // recursively aggregate transform flags.
        if (hasModifier(node, ModifierFlags.Ambient) || (isTypeNode(node) && node.kind !== SyntaxKind.ExpressionWithTypeArguments)) {
            return TransformFlags.None;
        }

        // Aggregate the transform flags of each child.
        return reduceEachChild(node, TransformFlags.None, aggregateTransformFlagsForChildNode, aggregateTransformFlagsForChildNodes);
    }

    /**
     * Aggregates the TransformFlags of a child node with the TransformFlags of its
     * siblings.
     */
    function aggregateTransformFlagsForChildNode(transformFlags: TransformFlags, node: Node): TransformFlags {
        return transformFlags | aggregateTransformFlagsForNode(node);
    }

    function aggregateTransformFlagsForChildNodes(transformFlags: TransformFlags, nodes: NodeArray<Node>): TransformFlags {
        return transformFlags | aggregateTransformFlagsForNodeArray(nodes);
    }

    export namespace Debug {
        let isDebugInfoEnabled = false;

        export function failBadSyntaxKind(node: Node, message?: string): never {
            return fail(
                `${message || "Unexpected node."}\r\nNode ${formatSyntaxKind(node.kind)} was unexpected.`,
                failBadSyntaxKind);
        }

        export const assertEachNode = shouldAssert(AssertionLevel.Normal)
            ? (nodes: Node[], test: (node: Node) => boolean, message?: string): void => assert(
                test === undefined || every(nodes, test),
                message || "Unexpected node.",
                () => `Node array did not pass test '${getFunctionName(test)}'.`,
                assertEachNode)
            : noop;

        export const assertNode = shouldAssert(AssertionLevel.Normal)
            ? (node: Node, test: (node: Node) => boolean, message?: string): void => assert(
                test === undefined || test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node.kind)} did not pass test '${getFunctionName(test)}'.`,
                assertNode)
            : noop;

        export const assertOptionalNode = shouldAssert(AssertionLevel.Normal)
            ? (node: Node, test: (node: Node) => boolean, message?: string): void => assert(
                test === undefined || node === undefined || test(node),
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node.kind)} did not pass test '${getFunctionName(test)}'.`,
                assertOptionalNode)
            : noop;

        export const assertOptionalToken = shouldAssert(AssertionLevel.Normal)
            ? (node: Node, kind: SyntaxKind, message?: string): void => assert(
                kind === undefined || node === undefined || node.kind === kind,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node.kind)} was not a '${formatSyntaxKind(kind)}' token.`,
                assertOptionalToken)
            : noop;

        export const assertMissingNode = shouldAssert(AssertionLevel.Normal)
            ? (node: Node, message?: string): void => assert(
                node === undefined,
                message || "Unexpected node.",
                () => `Node ${formatSyntaxKind(node.kind)} was unexpected'.`,
                assertMissingNode)
            : noop;

        /**
         * Injects debug information into frequently used types.
         */
        export function enableDebugInfo() {
            if (isDebugInfoEnabled) return;

            // Add additional properties in debug mode to assist with debugging.
            Object.defineProperties(objectAllocator.getSymbolConstructor().prototype, {
                __debugFlags: { get(this: Symbol) { return formatSymbolFlags(this.flags); } }
            });

            Object.defineProperties(objectAllocator.getTypeConstructor().prototype, {
                __debugFlags: { get(this: Type) { return formatTypeFlags(this.flags); } },
                __debugObjectFlags: { get(this: Type) { return this.flags & TypeFlags.Object ? formatObjectFlags((<ObjectType>this).objectFlags) : ""; } },
                __debugTypeToString: { value(this: Type) { return this.checker.typeToString(this); } },
            });

            const nodeConstructors = [
                objectAllocator.getNodeConstructor(),
                objectAllocator.getIdentifierConstructor(),
                objectAllocator.getTokenConstructor(),
                objectAllocator.getSourceFileConstructor()
            ];

            for (const ctor of nodeConstructors) {
                if (!ctor.prototype.hasOwnProperty("__debugKind")) {
                    Object.defineProperties(ctor.prototype, {
                        __debugKind: { get(this: Node) { return formatSyntaxKind(this.kind); } },
                        __debugModifierFlags: { get(this: Node) { return formatModifierFlags(getModifierFlagsNoCache(this)); } },
                        __debugTransformFlags: { get(this: Node) { return formatTransformFlags(this.transformFlags); } },
                        __debugEmitFlags: { get(this: Node) { return formatEmitFlags(getEmitFlags(this)); } },
                        __debugGetText: {
                            value(this: Node, includeTrivia?: boolean) {
                                if (nodeIsSynthesized(this)) return "";
                                const parseNode = getParseTreeNode(this);
                                const sourceFile = parseNode && getSourceFileOfNode(parseNode);
                                return sourceFile ? getSourceTextOfNodeFromSourceFile(sourceFile, parseNode, includeTrivia) : "";
                            }
                        }
                    });
                }
            }

            isDebugInfoEnabled = true;
        }
    }
}
