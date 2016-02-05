/// <reference path="checker.ts" />

/* @internal */
namespace ts {
    /** Additional context provided to `visitEachChild` */
    export interface LexicalEnvironment {
        /** Starts a new lexical environment. */
        startLexicalEnvironment(): void;

        /** Ends a lexical environment, returning any declarations. */
        endLexicalEnvironment(): Statement[];
    }

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
            { name: "initializer", test: isExpression, optional: true },
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
            { name: "initializer", test: isExpression, optional: true },
        ],
        [SyntaxKind.ArrayLiteralExpression]: [
            { name: "elements", test: isExpression },
        ],
        [SyntaxKind.ObjectLiteralExpression]: [
            { name: "properties", test: isObjectLiteralElement },
        ],
        [SyntaxKind.PropertyAccessExpression]: [
            { name: "expression", test: isLeftHandSideExpression },
            { name: "name", test: isIdentifier },
        ],
        [SyntaxKind.ElementAccessExpression]: [
            { name: "expression", test: isLeftHandSideExpression },
            { name: "argumentExpression", test: isExpression },
        ],
        [SyntaxKind.CallExpression]: [
            { name: "expression", test: isLeftHandSideExpression },
            { name: "typeArguments", test: isTypeNode },
            { name: "arguments", test: isExpression },
        ],
        [SyntaxKind.NewExpression]: [
            { name: "expression", test: isLeftHandSideExpression },
            { name: "typeArguments", test: isTypeNode },
            { name: "arguments", test: isExpression },
        ],
        [SyntaxKind.TaggedTemplateExpression]: [
            { name: "tag", test: isLeftHandSideExpression },
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
            { name: "body", test: isConciseBody, lift: liftToBlock },
        ],
        [SyntaxKind.DeleteExpression]: [
            { name: "expression", test: isUnaryExpression },
        ],
        [SyntaxKind.TypeOfExpression]: [
            { name: "expression", test: isUnaryExpression },
        ],
        [SyntaxKind.VoidExpression]: [
            { name: "expression", test: isUnaryExpression },
        ],
        [SyntaxKind.AwaitExpression]: [
            { name: "expression", test: isUnaryExpression },
        ],
        [SyntaxKind.PrefixUnaryExpression]: [
            { name: "operand", test: isUnaryExpression },
        ],
        [SyntaxKind.PostfixUnaryExpression]: [
            { name: "operand", test: isLeftHandSideExpression },
        ],
        [SyntaxKind.BinaryExpression]: [
            { name: "left", test: isExpression },
            { name: "right", test: isExpression },
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
            { name: "expression", test: isExpression },
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
            { name: "expression", test: isLeftHandSideExpression },
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
            { name: "expression", test: isExpression },
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
            { name: "initializer", test: isExpression, optional: true },
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
            { name: "expression", test: isExpression },
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
            { name: "initializer", test: isExpression },
        ],
        [SyntaxKind.ShorthandPropertyAssignment]: [
            { name: "name", test: isIdentifier },
            { name: "objectAssignmentInitializer", test: isExpression, optional: true },
        ],
        [SyntaxKind.EnumMember]: [
            { name: "name", test: isPropertyName },
            { name: "initializer", test: isExpression, optional: true },
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
     * @param lift A callback to execute to lift a NodeArrayNode into a valid Node.
     * @param optional A value indicating whether the Node is optional.
     */
    export function visitNode<T extends Node>(node: T, visitor: (node: Node) => Node, test?: (node: Node) => boolean, lift?: (node: NodeArray<Node>) => T, optional?: boolean): T {
        if (node === undefined) {
            return undefined;
        }

        const visited = visitor(node);
        if (visited === node) {
            return node;
        }

        const lifted = liftNode(visited, lift);
        if (lifted === undefined) {
            Debug.assert(optional, "Node not optional.");
            return undefined;
        }

        Debug.assert(test === undefined || test(visited), "Wrong node type after visit.");
        return <T>visited;
    }

    /**
     * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
     *
     * @param nodes The NodeArray to visit.
     * @param visitor The callback used to visit a Node.
     * @param test A node test to execute for each node.
     */
    export function visitNodes<T extends Node, TArray extends NodeArray<T>>(nodes: TArray, visitor: (node: Node) => Node, test?: (node: Node) => boolean): TArray {
        if (nodes === undefined) {
            return undefined;
        }

        let updated: NodeArray<T> | ModifiersArray;
        for (let i = 0, len = nodes.length; i < len; i++) {
            const node = nodes[i];
            if (node === undefined) {
                continue;
            }

            const visited = visitor(node);
            if (updated !== undefined || visited === undefined || visited !== node) {
                if (updated === undefined) {
                    updated = isModifiersArray(nodes)
                        ? createModifiersArray(nodes.slice(0, i), nodes.pos, nodes.end)
                        : createNodeArray<T>(nodes.slice(0, i), nodes.pos, nodes.end);
                }

                if (visited === undefined) {
                    continue;
                }

                if (isNodeArrayNode<T>(visited)) {
                    spreadNodeArrayNode(visited, updated, test);
                }
                else if (visited !== undefined) {
                    Debug.assert(test === undefined || test(visited), "Wrong node type after visit.");
                    updated.push(<T>visited);
                }
            }
        }

        if (updated && isModifiersArray(updated)) {
            let flags: NodeFlags = 0;
            for (const node of updated) {
                flags |= modifierToFlag(node.kind);
            }

            updated.flags = flags;
        }

        return <TArray>updated || nodes;
    }

    /**
     * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
     *
     * @param node The Node whose children will be visited.
     * @param visitor The callback used to visit each child.
     * @param environment An optional lexical environment context for the visitor.
     */
    export function visitEachChild<T extends Node>(node: T, visitor: (node: Node) => Node, environment?: LexicalEnvironment): T {
        if (node === undefined) {
            return undefined;
        }

        const isNewLexicalEnvironment = environment !== undefined && nodeStartsNewLexicalEnvironment(node);
        if (isNewLexicalEnvironment) {
            environment.startLexicalEnvironment();
        }

        let modifiers: NodeFlags;
        let updated: T & Map<any>;
        const edgeTraversalPath = nodeEdgeTraversalMap[node.kind];
        if (edgeTraversalPath) {
            for (const edge of edgeTraversalPath) {
                const value = (<Map<any>>node)[edge.name];
                if (value !== undefined) {
                    const visited = visitEdge(edge, value, visitor);
                    if (updated !== undefined || visited !== value) {
                        if (updated === undefined) {
                            updated = cloneNode(node, /*location*/ undefined, node.flags & ~NodeFlags.Modifier, /*parent*/ undefined, /*original*/ node);
                        }

                        updated[edge.name] = visited;
                    }

                    if (visited && isArray(visited) && isModifiersArray(visited)) {
                        modifiers = visited.flags;
                    }
                }
            }
        }

        if (updated === undefined) {
            updated = node;
        }
        else if (modifiers) {
            updated.flags |= modifiers;
        }

        if (isNewLexicalEnvironment) {
            const declarations = environment.endLexicalEnvironment();
            if (declarations !== undefined && declarations.length > 0) {
                return <T>mergeLexicalEnvironment(updated, declarations, /*nodeIsMutable*/ updated !== node);
            }
        }

        return updated;
    }

    /**
     * Visits a node edge.
     *
     * @param edge The edge of the Node.
     * @param value The Node or NodeArray value for the edge.
     * @param visitor A callback used to visit the node.
     */
    function visitEdge(edge: NodeEdge, value: Node | NodeArray<Node>, visitor: (node: Node) => Node) {
        return isArray(value)
            ? visitNodes(<NodeArray<Node>>value, visitor, edge.test)
            : visitNode(<Node>value, visitor, edge.test, edge.lift, edge.optional);
    }

    /**
     * Spreads a NodeArrayNode into a NodeArray.
     *
     * @param source The source NodeArrayNode.
     * @param dest The destination NodeArray.
     * @param test The node test used to validate each node.
     */
    function spreadNodeArrayNode<T extends Node>(source: NodeArrayNode<T>, dest: NodeArray<T>, test: (node: Node) => boolean) {
        for (const element of source.nodes) {
            if (element === undefined) {
                continue;
            }

            Debug.assert(test === undefined || test(element), "Wrong node type after visit.");
            dest.push(element);
        }
    }

    /**
     * Merge generated declarations of a lexical environment.
     */
    function mergeLexicalEnvironment(node: Node, declarations: Statement[], nodeIsMutable: boolean) {
        const mutableNode = nodeIsMutable ? node : cloneNode(node, /*location*/ node, node.flags, /*parent*/ undefined, /*original*/ node);
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                mergeSourceFileLexicalEnvironment(<SourceFile>mutableNode, declarations);
                break;

            case SyntaxKind.ModuleDeclaration:
                mergeModuleDeclarationLexicalEnvironment(<ModuleDeclaration>mutableNode, declarations);
                break;

            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.Constructor:
                mergeFunctionLikeLexicalEnvironment(<FunctionLikeDeclaration>mutableNode, declarations);
                break;

            case SyntaxKind.ModuleBlock:
            case SyntaxKind.Block:
                mergeBlockLexicalEnvironment(<Block>mutableNode, declarations);
                break;
        }

        return mutableNode;
    }

    /**
     * Merge generated declarations of a lexical environment into a SourceFile.
     */
    function mergeSourceFileLexicalEnvironment(node: SourceFile, declarations: Statement[]) {
        node.statements = mergeStatements(node.statements, declarations);
    }

    /**
     * Merge generated declarations of a lexical environment into a ModuleDeclaration.
     */
    function mergeModuleDeclarationLexicalEnvironment(node: ModuleDeclaration, declarations: Statement[]) {
        Debug.assert(node.body.kind === SyntaxKind.ModuleBlock);
        node.body = <ModuleBlock>mergeLexicalEnvironment(node.body, declarations, /*nodeIsMutable*/ false);
    }

    /**
     * Merge generated declarations of a lexical environment into a FunctionLikeDeclaration.
     */
    function mergeFunctionLikeLexicalEnvironment(node: FunctionLikeDeclaration, declarations: Statement[]) {
        Debug.assert(node.body !== undefined);
        if (node.body.kind === SyntaxKind.Block) {
            node.body = <Block>mergeLexicalEnvironment(node.body, declarations, /*nodeIsMutable*/ false);
        }
        else {
            node.body = createBlock([
                createReturn(<Expression>node.body),
                ...declarations
            ]);
        }
    }

    /**
     * Merge generated declarations of a lexical environment into a FunctionBody or ModuleBlock.
     */
    function mergeBlockLexicalEnvironment(node: FunctionBody | ModuleBlock, declarations: Statement[]) {
        node.statements = mergeStatements(node.statements, declarations);
    }

    /**
     * Merge generated declarations of a lexical environment into a NodeArray of Statement.
     */
    function mergeStatements(statements: NodeArray<Statement>, declarations: Statement[]) {
        return createNodeArray(statements.concat(declarations), statements.pos, statements.end);
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
    function liftToBlock(nodes: NodeArray<Node>) {
        Debug.assert(trueForAll(nodes, isStatement), "Cannot lift nodes to a Block.");
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
}