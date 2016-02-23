/// <reference path="checker.ts" />
/// <reference path="factory.ts" />

/* @internal */
namespace ts {
    export type OneOrMany<T extends Node> = T | NodeArrayNode<T>;
    /**
     * Describes an edge of a Node, used when traversing a syntax tree.
     */
    interface NodeEdge {
        /** The property name for the edge. */
        name: string;

        /** Indicates that the result is optional. */
        optional?: boolean;

        /** A callback used to test whether a node is valid. */
        test?: (node: Node) => node is Node;

        /** A callback used to lift a NodeArrayNode into a valid node. */
        lift?: (nodes: NodeArray<Node>) => Node;

        /** A callback used to parenthesize a node to preserve the intended order of operations. */
        parenthesize?: (value: Node, parentNode: Node) => Node;
    };

    /**
     * Describes the shape of a Node.
     */
    type NodeTraversalPath = NodeEdge[];

    /**
     * This map contains information about the shape of each Node in "types.ts" pertaining to how
     * each node should be traversed during a transformation.
     *
     * Each edge corresponds to a property in a Node subtype that should be traversed when visiting
     * each child. The properties are assigned in the order in which traversal should occur.
     *
     * NOTE: This needs to be kept up to date with changes to nodes in "types.ts". Currently, this
     *       map is not comprehensive. Only node edges relevant to tree transformation are
     *       currently defined. We may extend this to be more comprehensive, and eventually
     *       supplant the existing `forEachChild` implementation if performance is not
     *       significantly impacted.
     */
    const nodeEdgeTraversalMap: Map<NodeTraversalPath> = {
        [SyntaxKind.QualifiedName]: [
            { name: "left", test: isEntityName },
            { name: "right", test: isIdentifier },
        ],
        [SyntaxKind.ComputedPropertyName]: [
            { name: "expression", test: isExpression },
        ],
        [SyntaxKind.Parameter]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isBindingName },
            { name: "type", test: isTypeNode, optional: true },
            { name: "initializer", test: isExpression, optional: true, parenthesize: parenthesizeExpressionForList },
        ],
        [SyntaxKind.Decorator]: [
            { name: "expression", test: isLeftHandSideExpression },
        ],
        [SyntaxKind.PropertyDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isPropertyName },
            { name: "type", test: isTypeNode, optional: true },
            { name: "initializer", test: isExpression, optional: true },
        ],
        [SyntaxKind.MethodDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isPropertyName },
            { name: "typeParameters", test: isTypeParameter },
            { name: "parameters", test: isParameter },
            { name: "type", test: isTypeNode, optional: true },
            { name: "body", test: isBlock, optional: true },
        ],
        [SyntaxKind.Constructor]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "typeParameters", test: isTypeParameter },
            { name: "parameters", test: isParameter },
            { name: "type", test: isTypeNode, optional: true },
            { name: "body", test: isBlock, optional: true },
        ],
        [SyntaxKind.GetAccessor]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isPropertyName },
            { name: "typeParameters", test: isTypeParameter },
            { name: "parameters", test: isParameter },
            { name: "type", test: isTypeNode, optional: true },
            { name: "body", test: isBlock, optional: true },
        ],
        [SyntaxKind.SetAccessor]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isPropertyName },
            { name: "typeParameters", test: isTypeParameter },
            { name: "parameters", test: isParameter },
            { name: "type", test: isTypeNode, optional: true },
            { name: "body", test: isBlock, optional: true },
        ],
        [SyntaxKind.ObjectBindingPattern]: [
            { name: "elements", test: isBindingElement },
        ],
        [SyntaxKind.ArrayBindingPattern]: [
            { name: "elements", test: isBindingElement },
        ],
        [SyntaxKind.BindingElement]: [
            { name: "propertyName", test: isPropertyName, optional: true },
            { name: "name", test: isBindingName },
            { name: "initializer", test: isExpression, optional: true, parenthesize: parenthesizeExpressionForList },
        ],
        [SyntaxKind.ArrayLiteralExpression]: [
            { name: "elements", test: isExpression, parenthesize: parenthesizeExpressionForList },
        ],
        [SyntaxKind.ObjectLiteralExpression]: [
            { name: "properties", test: isObjectLiteralElement },
        ],
        [SyntaxKind.PropertyAccessExpression]: [
            { name: "expression", test: isLeftHandSideExpression, parenthesize: parenthesizeForAccess },
            { name: "name", test: isIdentifier },
        ],
        [SyntaxKind.ElementAccessExpression]: [
            { name: "expression", test: isLeftHandSideExpression, parenthesize: parenthesizeForAccess },
            { name: "argumentExpression", test: isExpression },
        ],
        [SyntaxKind.CallExpression]: [
            { name: "expression", test: isLeftHandSideExpression, parenthesize: parenthesizeForAccess },
            { name: "typeArguments", test: isTypeNode },
            { name: "arguments", test: isExpression },
        ],
        [SyntaxKind.NewExpression]: [
            { name: "expression", test: isLeftHandSideExpression, parenthesize: parenthesizeForAccess },
            { name: "typeArguments", test: isTypeNode },
            { name: "arguments", test: isExpression },
        ],
        [SyntaxKind.TaggedTemplateExpression]: [
            { name: "tag", test: isLeftHandSideExpression, parenthesize: parenthesizeForAccess },
            { name: "template", test: isTemplate },
        ],
        [SyntaxKind.TypeAssertionExpression]: [
            { name: "type", test: isTypeNode },
            { name: "expression", test: isUnaryExpression },
        ],
        [SyntaxKind.ParenthesizedExpression]: [
            { name: "expression", test: isExpression },
        ],
        [SyntaxKind.FunctionExpression]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isIdentifier, optional: true },
            { name: "typeParameters", test: isTypeParameter },
            { name: "parameters", test: isParameter },
            { name: "type", test: isTypeNode, optional: true },
            { name: "body", test: isBlock, optional: true },
        ],
        [SyntaxKind.ArrowFunction]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "typeParameters", test: isTypeParameter },
            { name: "parameters", test: isParameter },
            { name: "type", test: isTypeNode, optional: true },
            { name: "body", test: isConciseBody, lift: liftToBlock, parenthesize: parenthesizeConciseBody },
        ],
        [SyntaxKind.DeleteExpression]: [
            { name: "expression", test: isUnaryExpression, parenthesize: parenthesizePrefixOperand },
        ],
        [SyntaxKind.TypeOfExpression]: [
            { name: "expression", test: isUnaryExpression, parenthesize: parenthesizePrefixOperand },
        ],
        [SyntaxKind.VoidExpression]: [
            { name: "expression", test: isUnaryExpression, parenthesize: parenthesizePrefixOperand },
        ],
        [SyntaxKind.AwaitExpression]: [
            { name: "expression", test: isUnaryExpression, parenthesize: parenthesizePrefixOperand },
        ],
        [SyntaxKind.PrefixUnaryExpression]: [
            { name: "operand", test: isUnaryExpression, parenthesize: parenthesizePrefixOperand },
        ],
        [SyntaxKind.PostfixUnaryExpression]: [
            { name: "operand", test: isLeftHandSideExpression, parenthesize: parenthesizePostfixOperand },
        ],
        [SyntaxKind.BinaryExpression]: [
            { name: "left", test: isExpression, parenthesize: (node: Expression, parent: BinaryExpression) => parenthesizeBinaryOperand(getOperator(parent), node, true) },
            { name: "right", test: isExpression, parenthesize: (node: Expression, parent: BinaryExpression) => parenthesizeBinaryOperand(getOperator(parent), node, false) },
        ],
        [SyntaxKind.ConditionalExpression]: [
            { name: "condition", test: isExpression },
            { name: "whenTrue", test: isExpression },
            { name: "whenFalse", test: isExpression },
        ],
        [SyntaxKind.TemplateExpression]: [
            { name: "head", test: isTemplateLiteralFragment },
            { name: "templateSpans", test: isTemplateSpan },
        ],
        [SyntaxKind.YieldExpression]: [
            { name: "expression", test: isExpression, optional: true },
        ],
        [SyntaxKind.SpreadElementExpression]: [
            { name: "expression", test: isExpression, parenthesize: parenthesizeExpressionForList },
        ],
        [SyntaxKind.ClassExpression]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isIdentifier, optional: true },
            { name: "typeParameters", test: isTypeParameter },
            { name: "heritageClauses", test: isHeritageClause },
            { name: "members", test: isClassElement },
        ],
        [SyntaxKind.ExpressionWithTypeArguments]: [
            { name: "expression", test: isLeftHandSideExpression, parenthesize: parenthesizeForAccess },
            { name: "typeArguments", test: isTypeNode },
        ],
        [SyntaxKind.AsExpression]: [
            { name: "expression", test: isExpression },
            { name: "type", test: isTypeNode },
        ],
        [SyntaxKind.TemplateSpan]: [
            { name: "expression", test: isExpression },
            { name: "literal", test: isTemplateLiteralFragment },
        ],
        [SyntaxKind.Block]: [
            { name: "statements", test: isStatement },
        ],
        [SyntaxKind.VariableStatement]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "declarationList", test: isVariableDeclarationList },
        ],
        [SyntaxKind.ExpressionStatement]: [
            { name: "expression", test: isExpression, parenthesize: parenthesizeExpressionForExpressionStatement },
        ],
        [SyntaxKind.IfStatement]: [
            { name: "expression", test: isExpression },
            { name: "thenStatement", test: isStatement, lift: liftToBlock },
            { name: "elseStatement", test: isStatement, lift: liftToBlock, optional: true },
        ],
        [SyntaxKind.DoStatement]: [
            { name: "statement", test: isStatement, lift: liftToBlock },
            { name: "expression", test: isExpression },
        ],
        [SyntaxKind.WhileStatement]: [
            { name: "expression", test: isExpression },
            { name: "statement", test: isStatement, lift: liftToBlock },
        ],
        [SyntaxKind.ForStatement]: [
            { name: "initializer", test: isForInitializer, optional: true },
            { name: "condition", test: isExpression, optional: true },
            { name: "incrementor", test: isExpression, optional: true },
            { name: "statement", test: isStatement, lift: liftToBlock },
        ],
        [SyntaxKind.ForInStatement]: [
            { name: "initializer", test: isForInitializer },
            { name: "expression", test: isExpression },
            { name: "statement", test: isStatement, lift: liftToBlock },
        ],
        [SyntaxKind.ForOfStatement]: [
            { name: "initializer", test: isForInitializer },
            { name: "expression", test: isExpression },
            { name: "statement", test: isStatement, lift: liftToBlock },
        ],
        [SyntaxKind.ContinueStatement]: [
            { name: "label", test: isIdentifier, optional: true },
        ],
        [SyntaxKind.BreakStatement]: [
            { name: "label", test: isIdentifier, optional: true },
        ],
        [SyntaxKind.ReturnStatement]: [
            { name: "expression", test: isExpression, optional: true },
        ],
        [SyntaxKind.WithStatement]: [
            { name: "expression", test: isExpression },
            { name: "statement", test: isStatement, lift: liftToBlock },
        ],
        [SyntaxKind.SwitchStatement]: [
            { name: "expression", test: isExpression },
            { name: "caseBlock", test: isCaseBlock },
        ],
        [SyntaxKind.LabeledStatement]: [
            { name: "label", test: isIdentifier },
            { name: "statement", test: isStatement, lift: liftToBlock },
        ],
        [SyntaxKind.ThrowStatement]: [
            { name: "expression", test: isExpression },
        ],
        [SyntaxKind.TryStatement]: [
            { name: "tryBlock", test: isBlock },
            { name: "catchClause", test: isCatchClause, optional: true },
            { name: "finallyBlock", test: isBlock, optional: true },
        ],
        [SyntaxKind.VariableDeclaration]: [
            { name: "name", test: isBindingName },
            { name: "type", test: isTypeNode, optional: true },
            { name: "initializer", test: isExpression, optional: true, parenthesize: parenthesizeExpressionForList },
        ],
        [SyntaxKind.VariableDeclarationList]: [
            { name: "declarations", test: isVariableDeclaration },
        ],
        [SyntaxKind.FunctionDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isIdentifier, optional: true },
            { name: "typeParameters", test: isTypeParameter },
            { name: "parameters", test: isParameter },
            { name: "type", test: isTypeNode, optional: true },
            { name: "body", test: isBlock, optional: true },
        ],
        [SyntaxKind.ClassDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isIdentifier, optional: true },
            { name: "typeParameters", test: isTypeParameter },
            { name: "heritageClauses", test: isHeritageClause },
            { name: "members", test: isClassElement },
        ],
        [SyntaxKind.EnumDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isIdentifier },
            { name: "members", test: isEnumMember },
        ],
        [SyntaxKind.ModuleDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isModuleName },
            { name: "body", test: isModuleBody },
        ],
        [SyntaxKind.ModuleBlock]: [
            { name: "statements", test: isStatement },
        ],
        [SyntaxKind.CaseBlock]: [
            { name: "clauses", test: isCaseOrDefaultClause },
        ],
        [SyntaxKind.ImportEqualsDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "name", test: isIdentifier },
            { name: "moduleReference", test: isModuleReference },
        ],
        [SyntaxKind.ImportDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "importClause", test: isImportClause, optional: true },
            { name: "moduleSpecifier", test: isExpression },
        ],
        [SyntaxKind.ImportClause]: [
            { name: "name", test: isIdentifier, optional: true },
            { name: "namedBindings", test: isNamedImportBindings, optional: true },
        ],
        [SyntaxKind.NamespaceImport]: [
            { name: "name", test: isIdentifier },
        ],
        [SyntaxKind.NamedImports]: [
            { name: "elements", test: isImportSpecifier },
        ],
        [SyntaxKind.ImportSpecifier]: [
            { name: "propertyName", test: isIdentifier, optional: true },
            { name: "name", test: isIdentifier },
        ],
        [SyntaxKind.ExportAssignment]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "expression", test: isExpression },
        ],
        [SyntaxKind.ExportDeclaration]: [
            { name: "decorators", test: isDecorator },
            { name: "modifiers", test: isModifier },
            { name: "exportClause", test: isNamedExports, optional: true },
            { name: "moduleSpecifier", test: isExpression, optional: true },
        ],
        [SyntaxKind.NamedExports]: [
            { name: "elements", test: isExportSpecifier },
        ],
        [SyntaxKind.ExportSpecifier]: [
            { name: "propertyName", test: isIdentifier, optional: true },
            { name: "name", test: isIdentifier },
        ],
        [SyntaxKind.ExternalModuleReference]: [
            { name: "expression", test: isExpression, optional: true },
        ],
        [SyntaxKind.JsxElement]: [
            { name: "openingElement", test: isJsxOpeningElement },
            { name: "children", test: isJsxChild },
            { name: "closingElement", test: isJsxClosingElement },
        ],
        [SyntaxKind.JsxSelfClosingElement]: [
            { name: "tagName", test: isEntityName },
            { name: "attributes", test: isJsxAttributeLike },
        ],
        [SyntaxKind.JsxOpeningElement]: [
            { name: "tagName", test: isEntityName },
            { name: "attributes", test: isJsxAttributeLike },
        ],
        [SyntaxKind.JsxClosingElement]: [
            { name: "tagName", test: isEntityName },
        ],
        [SyntaxKind.JsxAttribute]: [
            { name: "name", test: isIdentifier },
            { name: "initializer", test: isExpression, optional: true },
        ],
        [SyntaxKind.JsxSpreadAttribute]: [
            { name: "expression", test: isExpression },
        ],
        [SyntaxKind.JsxExpression]: [
            { name: "expression", test: isExpression, optional: true },
        ],
        [SyntaxKind.CaseClause]: [
            { name: "expression", test: isExpression, parenthesize: parenthesizeExpressionForList },
            { name: "statements", test: isStatement },
        ],
        [SyntaxKind.DefaultClause]: [
            { name: "statements", test: isStatement },
        ],
        [SyntaxKind.HeritageClause]: [
            { name: "types", test: isExpressionWithTypeArguments },
        ],
        [SyntaxKind.CatchClause]: [
            { name: "variableDeclaration", test: isVariableDeclaration },
            { name: "block", test: isBlock },
        ],
        [SyntaxKind.PropertyAssignment]: [
            { name: "name", test: isPropertyName },
            { name: "initializer", test: isExpression, parenthesize: parenthesizeExpressionForList },
        ],
        [SyntaxKind.ShorthandPropertyAssignment]: [
            { name: "name", test: isIdentifier },
            { name: "objectAssignmentInitializer", test: isExpression, optional: true },
        ],
        [SyntaxKind.EnumMember]: [
            { name: "name", test: isPropertyName },
            { name: "initializer", test: isExpression, optional: true, parenthesize: parenthesizeExpressionForList },
        ],
        [SyntaxKind.SourceFile]: [
            { name: "statements", test: isStatement },
        ],
    };

    /**
     * Similar to `reduceLeft`, performs a reduction against each child of a node.
     * NOTE: Unlike `forEachChild`, this does *not* visit every node. Only nodes added to the
     *       `nodeEdgeTraversalMap` above will be visited.
     *
     * @param node The node containing the children to reduce.
     * @param f The callback function
     * @param initial The initial value to supply to the reduction.
     */
    export function reduceEachChild<T>(node: Node, f: (memo: T, node: Node) => T, initial: T) {
        if (node === undefined) {
            return undefined;
        }

        let result = initial;
        const edgeTraversalPath = nodeEdgeTraversalMap[node.kind];
        if (edgeTraversalPath) {
            for (const edge of edgeTraversalPath) {
                const value = (<Map<any>>node)[edge.name];
                if (value !== undefined) {
                    result = isArray(value)
                        ? reduceLeft(<NodeArray<Node>>value, f, result)
                        : f(result, <Node>value);
                }
            }
        }

        return result;
    }

    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param optional An optional value indicating whether the Node is itself optional.
     * @param lift An optional callback to execute to lift a NodeArrayNode into a valid Node.
     */
    export function visitNode<T extends Node>(node: T, visitor: (node: Node) => Node, test: (node: Node) => boolean, optional?: boolean, lift?: (node: NodeArray<Node>) => T): T {
        return <T>visitNodeWorker(node, visitor, test, optional, lift, /*parenthesize*/ undefined, /*parentNode*/ undefined);
    }

    /**
     * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
     *
     * @param node The Node to visit.
     * @param visitor The callback used to visit the Node.
     * @param test A callback to execute to verify the Node is valid.
     * @param optional A value indicating whether the Node is itself optional.
     * @param lift A callback to execute to lift a NodeArrayNode into a valid Node.
     * @param parenthesize A callback used to parenthesize the node if needed.
     * @param parentNode A parentNode for the node.
     */
    function visitNodeWorker(node: Node, visitor: (node: Node) => Node, test: (node: Node) => boolean, optional: boolean, lift: (node: NodeArray<Node>) => Node, parenthesize: (node: Node, parentNode: Node) => Node, parentNode: Node): Node {
        if (node === undefined) {
            return undefined;
        }

        let visited = visitor(node);
        if (visited === node) {
            return node;
        }

        if (lift !== undefined && visited !== undefined && isNodeArrayNode(visited)) {
            visited = lift((<NodeArrayNode<Node>>visited).nodes);
        }

        if (parenthesize !== undefined && visited !== undefined) {
            visited = parenthesize(visited, parentNode);
        }

        if (visited === undefined) {
            Debug.assert(optional, "Node not optional.");
            return undefined;
        }

        Debug.assert(test === undefined || test(visited), "Wrong node type after visit.");
        aggregateTransformFlags(visited);
        return visited;
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
    export function visitNodes<T extends Node, TArray extends NodeArray<T>>(nodes: TArray, visitor: (node: Node) => Node, test: (node: Node) => boolean, start?: number, count?: number): TArray {
        return <TArray>visitNodesWorker(nodes, visitor, test, /*parenthesize*/ undefined, /*parentNode*/ undefined, start, count);
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
    function visitNodesWorker(nodes: NodeArray<Node>, visitor: (node: Node) => Node, test: (node: Node) => boolean, parenthesize: (node: Node, parentNode: Node) => Node, parentNode: Node, start: number, count: number): NodeArray<Node> {
        if (nodes === undefined) {
            return undefined;
        }

        let updated: Node[];

        // Ensure start and count have valid values
        const length = nodes.length;
        if (start === undefined || start < 0) {
            start = 0;
        }

        if (count === undefined || count > length - start) {
            count = length - start;
        }

        // If we are not visiting all of the original nodes, we must always create a new array.
        if (start > 0 || count < length) {
            updated = [];
        }

        // Visit each original node.
        for (let i = 0; i < count; i++) {
            const node = nodes[i + start];
            const visited = node !== undefined ? visitor(node) : undefined;
            if (updated !== undefined || visited === undefined || visited !== node) {
                if (updated === undefined) {
                    // Ensure we have a copy of `nodes`, up to the current index.
                    updated = nodes.slice(0, i);
                }

                addNodeWorker(updated, visited, /*addOnNewLine*/ undefined, test, parenthesize, parentNode, /*isVisiting*/ visited !== node);
            }
        }

        if (updated !== undefined) {
            return isModifiersArray(nodes)
                ? createModifiersArray(updated, nodes)
                : createNodeArray(updated, nodes, nodes.hasTrailingComma);
        }

        return nodes;
    }

    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param context A lexical environment context for the visitor.
     */
    export function visitEachChild<T extends Node>(node: T, visitor: (node: Node) => Node, context: LexicalEnvironment): T;
    export function visitEachChild<T extends Node>(node: T & Map<any>, visitor: (node: Node) => Node, context: LexicalEnvironment): T {
        if (node === undefined) {
            return undefined;
        }

        let updated: T & Map<any>;

        // If this node starts a new lexical environment, start a new lexical environment on the context.
        const isNewLexicalEnvironment = nodeStartsNewLexicalEnvironment(node);
        if (isNewLexicalEnvironment) {
            context.startLexicalEnvironment();
        }

        const edgeTraversalPath = nodeEdgeTraversalMap[node.kind];
        if (edgeTraversalPath) {
            let modifiers: NodeFlags;
            for (const edge of edgeTraversalPath) {
                const value = <Node | NodeArray<Node>>node[edge.name];
                if (value !== undefined) {
                    let visited: Node | NodeArray<Node>;
                    if (isArray(value)) {
                        const visitedArray = visitNodesWorker(value, visitor, edge.test, edge.parenthesize, node, 0, value.length);
                        if (isModifiersArray(visitedArray)) {
                            modifiers = visitedArray.flags;
                        }

                        visited = visitedArray;
                    }
                    else {
                        visited = visitNodeWorker(<Node>value, visitor, edge.test, edge.optional, edge.lift, edge.parenthesize, node);
                    }

                    if (updated !== undefined || visited !== value) {
                        if (updated === undefined) {
                            updated = getMutableNode(node);
                            updated.flags &= ~NodeFlags.Modifier;
                        }

                        if (modifiers) {
                            updated.flags |= modifiers;
                            modifiers = undefined;
                        }

                        if (visited !== value) {
                            updated[edge.name] = value;
                        }
                    }
                }
            }
        }

        if (updated === undefined) {
            updated = node;
        }

        if (isNewLexicalEnvironment) {
            const declarations = context.endLexicalEnvironment();
            if (declarations !== undefined && declarations.length > 0) {
                updated = <T>mergeLexicalEnvironment(updated, declarations);
            }
        }

        if (updated !== node) {
            aggregateTransformFlags(updated);
            updated.original = node;
        }

        return updated;
    }

    /**
     * Appends a node to an array.
     *
     * @param to The destination array.
     * @param from The source Node or NodeArrayNode.
     * @param test The node test used to validate each node.
     */
    export function addNode<T extends Node>(to: T[], from: OneOrMany<T>, startOnNewLine?: boolean) {
        addNodeWorker(to, from, startOnNewLine, /*test*/ undefined, /*parenthesize*/ undefined, /*parentNode*/ undefined, /*isVisiting*/ false);
    }

    /**
     * Appends an array of nodes to an array.
     *
     * @param to The destination NodeArray.
     * @param from The source array of Node or NodeArrayNode.
     * @param test The node test used to validate each node.
     */
    export function addNodes<T extends Node>(to: T[], from: OneOrMany<T>[], startOnNewLine?: boolean) {
        addNodesWorker(to, from, startOnNewLine, /*test*/ undefined, /*parenthesize*/ undefined, /*parentNode*/ undefined, /*isVisiting*/ false);
    }

    function addNodeWorker(to: Node[], from: OneOrMany<Node>, startOnNewLine: boolean, test: (node: Node) => boolean, parenthesize: (node: Node, parentNode: Node) => Node, parentNode: Node, isVisiting: boolean) {
        if (to && from) {
            if (isNodeArrayNode(from)) {
                addNodesWorker(to, from.nodes, startOnNewLine, test, parenthesize, parentNode, isVisiting);
                return;
            }

            if (parenthesize !== undefined) {
                from = parenthesize(from, parentNode);
            }

            Debug.assert(test === undefined || test(from), "Wrong node type after visit.");

            if (startOnNewLine) {
                from.startsOnNewLine = true;
            }

            if (isVisiting) {
                aggregateTransformFlags(from);
            }

            to.push(from);
        }
    }

    function addNodesWorker(to: Node[], from: OneOrMany<Node>[], startOnNewLine: boolean, test: (node: Node) => boolean, parenthesize: (node: Node, parentNode: Node) => Node, parentNode: Node, isVisiting: boolean) {
        if (to && from) {
            for (const node of from) {
                addNodeWorker(to, node, startOnNewLine, test, parenthesize, parentNode, isVisiting);
            }
        }
    }

    /**
     * Merge generated declarations of a lexical environment.
     *
     * @param node The source node.
     * @param declarations The generated lexical declarations.
     */
    function mergeLexicalEnvironment(node: Node, declarations: Statement[]): Node {
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                return mergeSourceFileLexicalEnvironment(<SourceFile>node, declarations);

            case SyntaxKind.ModuleDeclaration:
                return mergeModuleDeclarationLexicalEnvironment(<ModuleDeclaration>node, declarations);

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.Constructor:
            case SyntaxKind.ArrowFunction:
                return mergeFunctionLikeLexicalEnvironment(<FunctionLikeDeclaration>node, declarations);
        }

        Debug.fail("Node is not a valid lexical environment.");
    }

    /**
     * Merge generated declarations of a lexical environment into a SourceFile.
     *
     * @param node The SourceFile node.
     * @param declarations The generated lexical declarations.
     */
    export function mergeSourceFileLexicalEnvironment(node: SourceFile, declarations: Statement[]) {
        if (declarations !== undefined && declarations.length) {
            const mutableNode = cloneNode(node, /*location*/ node, node.flags, /*parent*/ undefined, /*original*/ node);
            mutableNode.statements = mergeStatements(mutableNode.statements, declarations);
            return mutableNode;
        }

        return node;
    }

    /**
     * Merge generated declarations of a lexical environment into a ModuleDeclaration.
     *
     * @param node The ModuleDeclaration node.
     * @param declarations The generated lexical declarations.
     */
    export function mergeModuleDeclarationLexicalEnvironment(node: ModuleDeclaration, declarations: Statement[]) {
        Debug.assert(node.body.kind === SyntaxKind.ModuleBlock);
        if (declarations !== undefined && declarations.length) {
            const mutableNode = cloneNode(node, /*location*/ node, node.flags, /*parent*/ undefined, /*original*/ node);
            mutableNode.body = mergeBlockLexicalEnvironment(<ModuleBlock>node.body, declarations);
            return mutableNode;
        }

        return node;
    }

    /**
     * Merge generated declarations of a lexical environment into a FunctionLikeDeclaration.
     *
     * @param node The function-like node.
     * @param declarations The generated lexical declarations.
     */
    function mergeFunctionLikeLexicalEnvironment(node: FunctionLikeDeclaration, declarations: Statement[]) {
        Debug.assert(node.body !== undefined);
        if (declarations !== undefined && declarations.length) {
            const mutableNode = cloneNode(node, /*location*/ node, node.flags, /*parent*/ undefined, /*original*/ node);
            mutableNode.body = mergeConciseBodyLexicalEnvironment(mutableNode.body, declarations);
            return mutableNode;
        }

        return node;
    }

    /**
     * Merges generated lexical declarations into the FunctionBody of a non-arrow function-like declaration.
     *
     * @param node The ConciseBody of an arrow function.
     * @param declarations The lexical declarations to merge.
     */
    export function mergeFunctionBodyLexicalEnvironment(body: FunctionBody, declarations: Statement[]) {
        if (declarations !== undefined && declarations.length > 0) {
            return mergeBlockLexicalEnvironment(body, declarations);
        }

        return body;
    }

    /**
     * Merges generated lexical declarations into the ConciseBody of an ArrowFunction.
     *
     * @param node The ConciseBody of an arrow function.
     * @param declarations The lexical declarations to merge.
     */
    export function mergeConciseBodyLexicalEnvironment(body: ConciseBody, declarations: Statement[]) {
        if (declarations !== undefined && declarations.length > 0) {
            if (isBlock(body)) {
                return mergeBlockLexicalEnvironment(body, declarations);
            }
            else {
                return createBlock([
                    createReturn(body),
                    ...declarations
                ]);
            }
        }

        return body;
    }

    /**
     * Merge generated declarations of a lexical environment into a FunctionBody or ModuleBlock.
     *
     * @param node The block into which to merge lexical declarations.
     * @param declarations The lexical declarations to merge.
     */
    function mergeBlockLexicalEnvironment<T extends Block>(node: T, declarations: Statement[]) {
        const mutableNode = cloneNode(node, /*location*/ node, node.flags, /*parent*/ undefined, /*original*/ node);
        mutableNode.statements = mergeStatements(node.statements, declarations);
        return mutableNode;
    }

    /**
     * Merge generated declarations of a lexical environment into a NodeArray of Statement.
     *
     * @param statements The node array to concatentate with the supplied lexical declarations.
     * @param declarations The lexical declarations to merge.
     */
    function mergeStatements(statements: NodeArray<Statement>, declarations: Statement[]) {
        return createNodeArray(concatenate(statements, declarations), /*location*/ statements);
    }

    /**
     * Tries to lift a NodeArrayNode to a Node. This is primarily used to
     * lift multiple statements into a single Block.
     *
     * @param node The visited Node.
     * @param options Options used to control lift behavior.
     */
    function liftNode(node: Node, lifter: (nodes: NodeArray<Node>) => Node): Node {
        if (node === undefined) {
            return undefined;
        }
        else if (isNodeArrayNode(node)) {
            const lift = lifter || extractSingleNode;
            return lift(node.nodes);
        }
        else {
            return node;
        }
    }

    /**
     * Lifts a NodeArray containing only Statement nodes to a block.
     *
     * @param nodes The NodeArray.
     */
    export function liftToBlock(nodes: NodeArray<Node>) {
        Debug.assert(every(nodes, isStatement), "Cannot lift nodes to a Block.");
        return createBlock(<NodeArray<Statement>>nodes);
    }

    /**
     * Extracts the single node from a NodeArray.
     *
     * @param nodes The NodeArray.
     */
    function extractSingleNode(nodes: NodeArray<Node>) {
        Debug.assert(nodes.length <= 1, "Too many nodes written to output.");
        return nodes.length > 0 ? nodes[0] : undefined;
    }

    /**
     * Aggregates the TransformFlags for a Node and its subtree.
     */
    export function aggregateTransformFlags(node: Node): void {
        aggregateTransformFlagsForNode(node);
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
            return <TransformFlags>0;
        }

        if (node.transformFlags === undefined) {
            const subtreeFlags = aggregateTransformFlagsForSubtree(node);
            return computeTransformFlagsForNode(node, subtreeFlags);
        }

        return node.transformFlags & ~node.excludeTransformFlags;
    }

    /**
     * Aggregates the transform flags for the subtree of a node.
     */
    function aggregateTransformFlagsForSubtree(node: Node): TransformFlags {
        // We do not transform ambient declarations or types, so there is no need to
        // recursively aggregate transform flags.
        if (node.flags & NodeFlags.Ambient || isTypeNode(node)) {
            return <TransformFlags>0;
        }

        // Aggregate the transform flags of each child.
        return reduceEachChild<TransformFlags>(node, aggregateTransformFlagsForChildNode, 0);
    }

    /**
     * Aggregates the TransformFlags of a child node with the TransformFlags of its
     * siblings.
     */
    function aggregateTransformFlagsForChildNode(transformFlags: TransformFlags, child: Node): TransformFlags {
        return transformFlags | aggregateTransformFlagsForNode(child);
    }
}