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
    type NodeTraversalPath = Map<NodeEdge>;

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
        [SyntaxKind.QualifiedName]: {
            left: { test: isEntityName },
            right: { test: isIdentifierNode },
        },
        [SyntaxKind.ComputedPropertyName]: {
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.Parameter]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isBindingPatternOrIdentifier },
            type: { test: isTypeNodeNode, optional: true },
            initializer: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.Decorator]: {
            expression: { test: isLeftHandSideExpression },
        },
        [SyntaxKind.PropertyDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isPropertyName },
            type: { test: isTypeNodeNode, optional: true },
            initializer: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.MethodDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isPropertyName },
            typeParameters: { test: isTypeParameter },
            parameters: { test: isParameter },
            type: { test: isTypeNodeNode, optional: true },
            body: { test: isBlock, optional: true },
        },
        [SyntaxKind.Constructor]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            typeParameters: { test: isTypeParameter },
            parameters: { test: isParameter },
            type: { test: isTypeNodeNode, optional: true },
            body: { test: isBlock, optional: true },
        },
        [SyntaxKind.GetAccessor]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isPropertyName },
            typeParameters: { test: isTypeParameter },
            parameters: { test: isParameter },
            type: { test: isTypeNodeNode, optional: true },
            body: { test: isBlock, optional: true },
        },
        [SyntaxKind.SetAccessor]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isPropertyName },
            typeParameters: { test: isTypeParameter },
            parameters: { test: isParameter },
            type: { test: isTypeNodeNode, optional: true },
            body: { test: isBlock, optional: true },
        },
        [SyntaxKind.ObjectBindingPattern]: {
            elements: { test: isBindingElement },
        },
        [SyntaxKind.ArrayBindingPattern]: {
            elements: { test: isBindingElement },
        },
        [SyntaxKind.BindingElement]: {
            propertyName: { test: isPropertyName, optional: true },
            name: { test: isBindingPatternOrIdentifier },
            initializer: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.ArrayLiteralExpression]: {
            elements: { test: isExpressionNode },
        },
        [SyntaxKind.ObjectLiteralExpression]: {
            properties: { test: isObjectLiteralElement },
        },
        [SyntaxKind.PropertyAccessExpression]: {
            expression: { test: isLeftHandSideExpression },
            name: { test: isIdentifierNode },
        },
        [SyntaxKind.ElementAccessExpression]: {
            expression: { test: isLeftHandSideExpression },
            argumentExpression: { test: isExpressionNode },
        },
        [SyntaxKind.CallExpression]: {
            expression: { test: isLeftHandSideExpression },
            typeArguments: { test: isTypeNodeNode },
            arguments: { test: isExpressionNode },
        },
        [SyntaxKind.NewExpression]: {
            expression: { test: isLeftHandSideExpression },
            typeArguments: { test: isTypeNodeNode },
            arguments: { test: isExpressionNode },
        },
        [SyntaxKind.TaggedTemplateExpression]: {
            tag: { test: isLeftHandSideExpression },
            template: { test: isTemplate },
        },
        [SyntaxKind.TypeAssertionExpression]: {
            type: { test: isTypeNodeNode },
            expression: { test: isUnaryExpression },
        },
        [SyntaxKind.ParenthesizedExpression]: {
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.FunctionExpression]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isIdentifierNode, optional: true },
            typeParameters: { test: isTypeParameter },
            parameters: { test: isParameter },
            type: { test: isTypeNodeNode, optional: true },
            body: { test: isBlock, optional: true },
        },
        [SyntaxKind.ArrowFunction]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            typeParameters: { test: isTypeParameter },
            parameters: { test: isParameter },
            type: { test: isTypeNodeNode, optional: true },
            body: { test: isConciseBody, lift: liftToBlock },
        },
        [SyntaxKind.DeleteExpression]: {
            expression: { test: isUnaryExpression },
        },
        [SyntaxKind.TypeOfExpression]: {
            expression: { test: isUnaryExpression },
        },
        [SyntaxKind.VoidExpression]: {
            expression: { test: isUnaryExpression },
        },
        [SyntaxKind.AwaitExpression]: {
            expression: { test: isUnaryExpression },
        },
        [SyntaxKind.PrefixUnaryExpression]: {
            operand: { test: isUnaryExpression },
        },
        [SyntaxKind.PostfixUnaryExpression]: {
            operand: { test: isLeftHandSideExpression },
        },
        [SyntaxKind.BinaryExpression]: {
            left: { test: isExpressionNode },
            right: { test: isExpressionNode },
        },
        [SyntaxKind.ConditionalExpression]: {
            condition: { test: isExpressionNode },
            whenTrue: { test: isExpressionNode },
            whenFalse: { test: isExpressionNode },
        },
        [SyntaxKind.TemplateExpression]: {
            head: { test: isTemplateLiteralFragment },
            templateSpans: { test: isTemplateSpan },
        },
        [SyntaxKind.YieldExpression]: {
            expression: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.SpreadElementExpression]: {
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.ClassExpression]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isIdentifierNode, optional: true },
            typeParameters: { test: isTypeParameter },
            heritageClauses: { test: isHeritageClause },
            members: { test: isClassElement },
        },
        [SyntaxKind.ExpressionWithTypeArguments]: {
            expression: { test: isLeftHandSideExpression },
            typeArguments: { test: isTypeNodeNode },
        },
        [SyntaxKind.AsExpression]: {
            expression: { test: isExpressionNode },
            type: { test: isTypeNodeNode },
        },
        [SyntaxKind.TemplateSpan]: {
            expression: { test: isExpressionNode },
            literal: { test: isTemplateLiteralFragment },
        },
        [SyntaxKind.Block]: {
            statements: { test: isStatementNode },
        },
        [SyntaxKind.VariableStatement]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            declarationList: { test: isVariableDeclarationList },
        },
        [SyntaxKind.ExpressionStatement]: {
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.IfStatement]: {
            expression: { test: isExpressionNode },
            thenStatement: { test: isStatementNode, lift: liftToBlock },
            elseStatement: { test: isStatementNode, lift: liftToBlock, optional: true},
        },
        [SyntaxKind.DoStatement]: {
            statement: { test: isStatementNode, lift: liftToBlock },
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.WhileStatement]: {
            expression: { test: isExpressionNode },
            statement: { test: isStatementNode, lift: liftToBlock },
        },
        [SyntaxKind.ForStatement]: {
            initializer: { test: isExpressionOrVariableDeclarationList, optional: true },
            condition: { test: isExpressionNode, optional: true },
            incrementor: { test: isExpressionNode, optional: true },
            statement: { test: isStatementNode, lift: liftToBlock },
        },
        [SyntaxKind.ForInStatement]: {
            initializer: { test: isExpressionOrVariableDeclarationList },
            expression: { test: isExpressionNode },
            statement: { test: isStatementNode, lift: liftToBlock },
        },
        [SyntaxKind.ForOfStatement]: {
            initializer: { test: isExpressionOrVariableDeclarationList },
            expression: { test: isExpressionNode },
            statement: { test: isStatementNode, lift: liftToBlock },
        },
        [SyntaxKind.ContinueStatement]: {
            label: { test: isIdentifierNode, optional: true },
        },
        [SyntaxKind.BreakStatement]: {
            label: { test: isIdentifierNode, optional: true },
        },
        [SyntaxKind.ReturnStatement]: {
            expression: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.WithStatement]: {
            expression: { test: isExpressionNode },
            statement: { test: isStatementNode, lift: liftToBlock },
        },
        [SyntaxKind.SwitchStatement]: {
            expression: { test: isExpressionNode },
            caseBlock: { test: isCaseBlock },
        },
        [SyntaxKind.LabeledStatement]: {
            label: { test: isIdentifierNode },
            statement: { test: isStatementNode, lift: liftToBlock },
        },
        [SyntaxKind.ThrowStatement]: {
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.TryStatement]: {
            tryBlock: { test: isBlock },
            catchClause: { test: isCatchClause, optional: true },
            finallyBlock: { test: isBlock, optional: true },
        },
        [SyntaxKind.VariableDeclaration]: {
            name: { test: isBindingPatternOrIdentifier },
            type: { test: isTypeNodeNode, optional: true },
            initializer: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.VariableDeclarationList]: {
            declarations: { test: isVariableDeclaration },
        },
        [SyntaxKind.FunctionDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isIdentifierNode, optional: true },
            typeParameters: { test: isTypeParameter },
            parameters: { test: isParameter },
            type: { test: isTypeNodeNode, optional: true },
            body: { test: isBlock, optional: true },
        },
        [SyntaxKind.ClassDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isIdentifierNode, optional: true },
            typeParameters: { test: isTypeParameter },
            heritageClauses: { test: isHeritageClause },
            members: { test: isClassElement },
        },
        [SyntaxKind.EnumDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isIdentifierNode },
            members: { test: isEnumMember },
        },
        [SyntaxKind.ModuleDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isModuleName },
            body: { test: isModuleBody },
        },
        [SyntaxKind.ModuleBlock]: {
            statements: { test: isStatementNode },
        },
        [SyntaxKind.CaseBlock]: {
            clauses: { test: isCaseOrDefaultClause },
        },
        [SyntaxKind.ImportEqualsDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            name: { test: isIdentifierNode },
            moduleReference: { test: isModuleReference },
        },
        [SyntaxKind.ImportDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            importClause: { test: isImportClause, optional: true },
            moduleSpecifier: { test: isExpressionNode },
        },
        [SyntaxKind.ImportClause]: {
            name: { test: isIdentifierNode, optional: true },
            namedBindings: { test: isNamedImportsOrNamespaceImport, optional: true },
        },
        [SyntaxKind.NamespaceImport]: {
            name: { test: isIdentifierNode },
        },
        [SyntaxKind.NamedImports]: {
            elements: { test: isImportSpecifier },
        },
        [SyntaxKind.ImportSpecifier]: {
            propertyName: { test: isIdentifierNode, optional: true },
            name: { test: isIdentifierNode },
        },
        [SyntaxKind.ExportAssignment]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.ExportDeclaration]: {
            decorators: { test: isDecorator },
            modifiers: { test: isModifier },
            exportClause: { test: isNamedExports, optional: true },
            moduleSpecifier: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.NamedExports]: {
            elements: { test: isExportSpecifier },
        },
        [SyntaxKind.ExportSpecifier]: {
            propertyName: { test: isIdentifierNode, optional: true },
            name: { test: isIdentifierNode },
        },
        [SyntaxKind.ExternalModuleReference]: {
            expression: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.JsxElement]: {
            openingElement: { test: isJsxOpeningElement },
            children: { test: isJsxChild },
            closingElement: { test: isJsxClosingElement },
        },
        [SyntaxKind.JsxSelfClosingElement]: {
            tagName: { test: isEntityName },
            attributes: { test: isJsxAttributeOrJsxSpreadAttribute },
        },
        [SyntaxKind.JsxOpeningElement]: {
            tagName: { test: isEntityName },
            attributes: { test: isJsxAttributeOrJsxSpreadAttribute },
        },
        [SyntaxKind.JsxClosingElement]: {
            tagName: { test: isEntityName },
        },
        [SyntaxKind.JsxAttribute]: {
            name: { test: isIdentifierNode },
            initializer: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.JsxSpreadAttribute]: {
            expression: { test: isExpressionNode },
        },
        [SyntaxKind.JsxExpression]: {
            expression: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.CaseClause]: {
            expression: { test: isExpressionNode },
            statements: { test: isStatementNode },
        },
        [SyntaxKind.DefaultClause]: {
            statements: { test: isStatementNode },
        },
        [SyntaxKind.HeritageClause]: {
            types: { test: isExpressionWithTypeArguments },
        },
        [SyntaxKind.CatchClause]: {
            variableDeclaration: { test: isVariableDeclaration },
            block: { test: isBlock },
        },
        [SyntaxKind.PropertyAssignment]: {
            name: { test: isPropertyName },
            initializer: { test: isExpressionNode },
        },
        [SyntaxKind.ShorthandPropertyAssignment]: {
            name: { test: isIdentifierNode },
            objectAssignmentInitializer: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.EnumMember]: {
            name: { test: isPropertyName },
            initializer: { test: isExpressionNode, optional: true },
        },
        [SyntaxKind.SourceFile]: {
            statements: { test: isStatementNode },
        },
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
            for (const propertyName in edgeTraversalPath) {
                const value = (<Map<any>>node)[propertyName];
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

        let updated: T & Map<any>;
        const edgeTraversalPath = nodeEdgeTraversalMap[node.kind];
        if (edgeTraversalPath) {
            for (const propertyName in edgeTraversalPath) {
                const value = (<Map<any>>node)[propertyName];
                if (value !== undefined) {
                    const edge = edgeTraversalPath[propertyName];
                    const visited = visitEdge(edge, value, visitor);
                    if (updated !== undefined || visited !== value) {
                        if (updated === undefined) {
                            updated = cloneNode(node, /*location*/ undefined, node.flags & ~NodeFlags.Modifier, /*parent*/ undefined, /*original*/ node);
                        }

                        updated[propertyName] = visited;
                    }

                    if (visited && isArray(visited) && isModifiersArray(visited)) {
                        updated.flags |= visited.flags;
                    }
                }
            }
        }

        if (updated === undefined) {
            updated = node;
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
        Debug.assert(trueForAll(nodes, isStatementNode), "Cannot lift nodes to a Block.");
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