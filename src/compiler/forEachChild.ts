namespace ts {
    function visitNode<T>(cbNode: (node: Node) => T, node: Node | undefined): T | undefined {
        return node && cbNode(node);
    }

    function visitNodes<T>(cbNode: (node: Node) => T, cbNodes: ((node: NodeArray<Node>) => T | undefined) | undefined, nodes: NodeArray<Node> | undefined): T | undefined {
        if (nodes) {
            if (cbNodes) {
                return cbNodes(nodes);
            }
            for (const node of nodes) {
                const result = cbNode(node);
                if (result) {
                    return result;
                }
            }
        }
    }

    /**
     * Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
     * stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; otherwise,
     * embedded arrays are flattened and the 'cbNode' callback is invoked for each element. If a callback returns
     * a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
     *
     * @param node a given node to visit its children
     * @param cbNode a callback to be invoked for all child nodes
     * @param cbNodes a callback to be invoked for embedded array
     *
     * @remarks `forEachChild` must visit the children of a node in the order
     * that they appear in the source code. The language service depends on this property to locate nodes by position.
     */
    export function forEachChild<T>(node: Node, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        if (!node || node.kind <= SyntaxKind.LastToken) {
            return;
        }
        switch (node.kind) {
            case SyntaxKind.QualifiedName:
                return visitNode(cbNode, (<QualifiedName>node).left) ||
                    visitNode(cbNode, (<QualifiedName>node).right);
            case SyntaxKind.TypeParameter:
                return visitNode(cbNode, (<TypeParameterDeclaration>node).name) ||
                    visitNode(cbNode, (<TypeParameterDeclaration>node).constraint) ||
                    visitNode(cbNode, (<TypeParameterDeclaration>node).default) ||
                    visitNode(cbNode, (<TypeParameterDeclaration>node).expression);
            case SyntaxKind.ShorthandPropertyAssignment:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ShorthandPropertyAssignment>node).name) ||
                    visitNode(cbNode, (<ShorthandPropertyAssignment>node).questionToken) ||
                    visitNode(cbNode, (<ShorthandPropertyAssignment>node).exclamationToken) ||
                    visitNode(cbNode, (<ShorthandPropertyAssignment>node).equalsToken) ||
                    visitNode(cbNode, (<ShorthandPropertyAssignment>node).objectAssignmentInitializer);
            case SyntaxKind.SpreadAssignment:
                return visitNode(cbNode, (<SpreadAssignment>node).expression);
            case SyntaxKind.Parameter:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ParameterDeclaration>node).dotDotDotToken) ||
                    visitNode(cbNode, (<ParameterDeclaration>node).name) ||
                    visitNode(cbNode, (<ParameterDeclaration>node).questionToken) ||
                    visitNode(cbNode, (<ParameterDeclaration>node).type) ||
                    visitNode(cbNode, (<ParameterDeclaration>node).initializer);
            case SyntaxKind.PropertyDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<PropertyDeclaration>node).name) ||
                    visitNode(cbNode, (<PropertyDeclaration>node).questionToken) ||
                    visitNode(cbNode, (<PropertyDeclaration>node).exclamationToken) ||
                    visitNode(cbNode, (<PropertyDeclaration>node).type) ||
                    visitNode(cbNode, (<PropertyDeclaration>node).initializer);
            case SyntaxKind.PropertySignature:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<PropertySignature>node).name) ||
                    visitNode(cbNode, (<PropertySignature>node).questionToken) ||
                    visitNode(cbNode, (<PropertySignature>node).type) ||
                    visitNode(cbNode, (<PropertySignature>node).initializer);
            case SyntaxKind.PropertyAssignment:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<PropertyAssignment>node).name) ||
                    visitNode(cbNode, (<PropertyAssignment>node).questionToken) ||
                    visitNode(cbNode, (<PropertyAssignment>node).initializer);
            case SyntaxKind.VariableDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<VariableDeclaration>node).name) ||
                    visitNode(cbNode, (<VariableDeclaration>node).exclamationToken) ||
                    visitNode(cbNode, (<VariableDeclaration>node).type) ||
                    visitNode(cbNode, (<VariableDeclaration>node).initializer);
            case SyntaxKind.BindingElement:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<BindingElement>node).dotDotDotToken) ||
                    visitNode(cbNode, (<BindingElement>node).propertyName) ||
                    visitNode(cbNode, (<BindingElement>node).name) ||
                    visitNode(cbNode, (<BindingElement>node).initializer);
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNodes(cbNode, cbNodes, (<SignatureDeclaration>node).typeParameters) ||
                    visitNodes(cbNode, cbNodes, (<SignatureDeclaration>node).parameters) ||
                    visitNode(cbNode, (<SignatureDeclaration>node).type);
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ArrowFunction:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).asteriskToken) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).name) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).questionToken) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).exclamationToken) ||
                    visitNodes(cbNode, cbNodes, (<FunctionLikeDeclaration>node).typeParameters) ||
                    visitNodes(cbNode, cbNodes, (<FunctionLikeDeclaration>node).parameters) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).type) ||
                    visitNode(cbNode, (<ArrowFunction>node).equalsGreaterThanToken) ||
                    visitNode(cbNode, (<FunctionLikeDeclaration>node).body);
            case SyntaxKind.TypeReference:
                return visitNode(cbNode, (<TypeReferenceNode>node).typeName) ||
                    visitNodes(cbNode, cbNodes, (<TypeReferenceNode>node).typeArguments);
            case SyntaxKind.TypePredicate:
                return visitNode(cbNode, (<TypePredicateNode>node).assertsModifier) ||
                    visitNode(cbNode, (<TypePredicateNode>node).parameterName) ||
                    visitNode(cbNode, (<TypePredicateNode>node).type);
            case SyntaxKind.TypeQuery:
                return visitNode(cbNode, (<TypeQueryNode>node).exprName);
            case SyntaxKind.TypeLiteral:
                return visitNodes(cbNode, cbNodes, (<TypeLiteralNode>node).members);
            case SyntaxKind.ArrayType:
                return visitNode(cbNode, (<ArrayTypeNode>node).elementType);
            case SyntaxKind.TupleType:
                return visitNodes(cbNode, cbNodes, (<TupleTypeNode>node).elementTypes);
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType:
                return visitNodes(cbNode, cbNodes, (<UnionOrIntersectionTypeNode>node).types);
            case SyntaxKind.ConditionalType:
                return visitNode(cbNode, (<ConditionalTypeNode>node).checkType) ||
                    visitNode(cbNode, (<ConditionalTypeNode>node).extendsType) ||
                    visitNode(cbNode, (<ConditionalTypeNode>node).trueType) ||
                    visitNode(cbNode, (<ConditionalTypeNode>node).falseType);
            case SyntaxKind.InferType:
                return visitNode(cbNode, (<InferTypeNode>node).typeParameter);
            case SyntaxKind.ImportType:
                return visitNode(cbNode, (<ImportTypeNode>node).argument) ||
                    visitNode(cbNode, (<ImportTypeNode>node).qualifier) ||
                    visitNodes(cbNode, cbNodes, (<ImportTypeNode>node).typeArguments);
            case SyntaxKind.ParenthesizedType:
            case SyntaxKind.TypeOperator:
                return visitNode(cbNode, (<ParenthesizedTypeNode | TypeOperatorNode>node).type);
            case SyntaxKind.IndexedAccessType:
                return visitNode(cbNode, (<IndexedAccessTypeNode>node).objectType) ||
                    visitNode(cbNode, (<IndexedAccessTypeNode>node).indexType);
            case SyntaxKind.MappedType:
                return visitNode(cbNode, (<MappedTypeNode>node).readonlyToken) ||
                    visitNode(cbNode, (<MappedTypeNode>node).typeParameter) ||
                    visitNode(cbNode, (<MappedTypeNode>node).questionToken) ||
                    visitNode(cbNode, (<MappedTypeNode>node).type);
            case SyntaxKind.LiteralType:
                return visitNode(cbNode, (<LiteralTypeNode>node).literal);
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return visitNodes(cbNode, cbNodes, (<BindingPattern>node).elements);
            case SyntaxKind.ArrayLiteralExpression:
                return visitNodes(cbNode, cbNodes, (<ArrayLiteralExpression>node).elements);
            case SyntaxKind.ObjectLiteralExpression:
                return visitNodes(cbNode, cbNodes, (<ObjectLiteralExpression>node).properties);
            case SyntaxKind.PropertyAccessExpression:
                return visitNode(cbNode, (<PropertyAccessExpression>node).expression) ||
                    visitNode(cbNode, (<PropertyAccessExpression>node).questionDotToken) ||
                    visitNode(cbNode, (<PropertyAccessExpression>node).name);
            case SyntaxKind.ElementAccessExpression:
                return visitNode(cbNode, (<ElementAccessExpression>node).expression) ||
                    visitNode(cbNode, (<ElementAccessExpression>node).questionDotToken) ||
                    visitNode(cbNode, (<ElementAccessExpression>node).argumentExpression);
            case SyntaxKind.CallExpression:
            case SyntaxKind.NewExpression:
                return visitNode(cbNode, (<CallExpression>node).expression) ||
                    visitNode(cbNode, (<CallExpression>node).questionDotToken) ||
                    visitNodes(cbNode, cbNodes, (<CallExpression>node).typeArguments) ||
                    visitNodes(cbNode, cbNodes, (<CallExpression>node).arguments);
            case SyntaxKind.TaggedTemplateExpression:
                return visitNode(cbNode, (<TaggedTemplateExpression>node).tag) ||
                    visitNode(cbNode, (<TaggedTemplateExpression>node).questionDotToken) ||
                    visitNodes(cbNode, cbNodes, (<TaggedTemplateExpression>node).typeArguments) ||
                    visitNode(cbNode, (<TaggedTemplateExpression>node).template);
            case SyntaxKind.TypeAssertionExpression:
                return visitNode(cbNode, (<TypeAssertion>node).type) ||
                    visitNode(cbNode, (<TypeAssertion>node).expression);
            case SyntaxKind.ParenthesizedExpression:
                return visitNode(cbNode, (<ParenthesizedExpression>node).expression);
            case SyntaxKind.DeleteExpression:
                return visitNode(cbNode, (<DeleteExpression>node).expression);
            case SyntaxKind.TypeOfExpression:
                return visitNode(cbNode, (<TypeOfExpression>node).expression);
            case SyntaxKind.VoidExpression:
                return visitNode(cbNode, (<VoidExpression>node).expression);
            case SyntaxKind.PrefixUnaryExpression:
                return visitNode(cbNode, (<PrefixUnaryExpression>node).operand);
            case SyntaxKind.YieldExpression:
                return visitNode(cbNode, (<YieldExpression>node).asteriskToken) ||
                    visitNode(cbNode, (<YieldExpression>node).expression);
            case SyntaxKind.AwaitExpression:
                return visitNode(cbNode, (<AwaitExpression>node).expression);
            case SyntaxKind.PostfixUnaryExpression:
                return visitNode(cbNode, (<PostfixUnaryExpression>node).operand);
            case SyntaxKind.BinaryExpression:
                return visitNode(cbNode, (<BinaryExpression>node).left) ||
                    visitNode(cbNode, (<BinaryExpression>node).operatorToken) ||
                    visitNode(cbNode, (<BinaryExpression>node).right);
            case SyntaxKind.AsExpression:
                return visitNode(cbNode, (<AsExpression>node).expression) ||
                    visitNode(cbNode, (<AsExpression>node).type);
            case SyntaxKind.NonNullExpression:
                return visitNode(cbNode, (<NonNullExpression>node).expression);
            case SyntaxKind.MetaProperty:
                return visitNode(cbNode, (<MetaProperty>node).name);
            case SyntaxKind.ConditionalExpression:
                return visitNode(cbNode, (<ConditionalExpression>node).condition) ||
                    visitNode(cbNode, (<ConditionalExpression>node).questionToken) ||
                    visitNode(cbNode, (<ConditionalExpression>node).whenTrue) ||
                    visitNode(cbNode, (<ConditionalExpression>node).colonToken) ||
                    visitNode(cbNode, (<ConditionalExpression>node).whenFalse);
            case SyntaxKind.SpreadElement:
                return visitNode(cbNode, (<SpreadElement>node).expression);
            case SyntaxKind.Block:
            case SyntaxKind.ModuleBlock:
                return visitNodes(cbNode, cbNodes, (<Block>node).statements);
            case SyntaxKind.SourceFile:
                return visitNodes(cbNode, cbNodes, (<SourceFile>node).statements) ||
                    visitNode(cbNode, (<SourceFile>node).endOfFileToken);
            case SyntaxKind.VariableStatement:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<VariableStatement>node).declarationList);
            case SyntaxKind.VariableDeclarationList:
                return visitNodes(cbNode, cbNodes, (<VariableDeclarationList>node).declarations);
            case SyntaxKind.ExpressionStatement:
                return visitNode(cbNode, (<ExpressionStatement>node).expression);
            case SyntaxKind.IfStatement:
                return visitNode(cbNode, (<IfStatement>node).expression) ||
                    visitNode(cbNode, (<IfStatement>node).thenStatement) ||
                    visitNode(cbNode, (<IfStatement>node).elseStatement);
            case SyntaxKind.DoStatement:
                return visitNode(cbNode, (<DoStatement>node).statement) ||
                    visitNode(cbNode, (<DoStatement>node).expression);
            case SyntaxKind.WhileStatement:
                return visitNode(cbNode, (<WhileStatement>node).expression) ||
                    visitNode(cbNode, (<WhileStatement>node).statement);
            case SyntaxKind.ForStatement:
                return visitNode(cbNode, (<ForStatement>node).initializer) ||
                    visitNode(cbNode, (<ForStatement>node).condition) ||
                    visitNode(cbNode, (<ForStatement>node).incrementor) ||
                    visitNode(cbNode, (<ForStatement>node).statement);
            case SyntaxKind.ForInStatement:
                return visitNode(cbNode, (<ForInStatement>node).initializer) ||
                    visitNode(cbNode, (<ForInStatement>node).expression) ||
                    visitNode(cbNode, (<ForInStatement>node).statement);
            case SyntaxKind.ForOfStatement:
                return visitNode(cbNode, (<ForOfStatement>node).awaitModifier) ||
                    visitNode(cbNode, (<ForOfStatement>node).initializer) ||
                    visitNode(cbNode, (<ForOfStatement>node).expression) ||
                    visitNode(cbNode, (<ForOfStatement>node).statement);
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.BreakStatement:
                return visitNode(cbNode, (<BreakOrContinueStatement>node).label);
            case SyntaxKind.ReturnStatement:
                return visitNode(cbNode, (<ReturnStatement>node).expression);
            case SyntaxKind.WithStatement:
                return visitNode(cbNode, (<WithStatement>node).expression) ||
                    visitNode(cbNode, (<WithStatement>node).statement);
            case SyntaxKind.SwitchStatement:
                return visitNode(cbNode, (<SwitchStatement>node).expression) ||
                    visitNode(cbNode, (<SwitchStatement>node).caseBlock);
            case SyntaxKind.CaseBlock:
                return visitNodes(cbNode, cbNodes, (<CaseBlock>node).clauses);
            case SyntaxKind.CaseClause:
                return visitNode(cbNode, (<CaseClause>node).expression) ||
                    visitNodes(cbNode, cbNodes, (<CaseClause>node).statements);
            case SyntaxKind.DefaultClause:
                return visitNodes(cbNode, cbNodes, (<DefaultClause>node).statements);
            case SyntaxKind.LabeledStatement:
                return visitNode(cbNode, (<LabeledStatement>node).label) ||
                    visitNode(cbNode, (<LabeledStatement>node).statement);
            case SyntaxKind.ThrowStatement:
                return visitNode(cbNode, (<ThrowStatement>node).expression);
            case SyntaxKind.TryStatement:
                return visitNode(cbNode, (<TryStatement>node).tryBlock) ||
                    visitNode(cbNode, (<TryStatement>node).catchClause) ||
                    visitNode(cbNode, (<TryStatement>node).finallyBlock);
            case SyntaxKind.CatchClause:
                return visitNode(cbNode, (<CatchClause>node).variableDeclaration) ||
                    visitNode(cbNode, (<CatchClause>node).block);
            case SyntaxKind.Decorator:
                return visitNode(cbNode, (<Decorator>node).expression);
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ClassLikeDeclaration>node).name) ||
                    visitNodes(cbNode, cbNodes, (<ClassLikeDeclaration>node).typeParameters) ||
                    visitNodes(cbNode, cbNodes, (<ClassLikeDeclaration>node).heritageClauses) ||
                    visitNodes(cbNode, cbNodes, (<ClassLikeDeclaration>node).members);
            case SyntaxKind.InterfaceDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<InterfaceDeclaration>node).name) ||
                    visitNodes(cbNode, cbNodes, (<InterfaceDeclaration>node).typeParameters) ||
                    visitNodes(cbNode, cbNodes, (<ClassDeclaration>node).heritageClauses) ||
                    visitNodes(cbNode, cbNodes, (<InterfaceDeclaration>node).members);
            case SyntaxKind.TypeAliasDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<TypeAliasDeclaration>node).name) ||
                    visitNodes(cbNode, cbNodes, (<TypeAliasDeclaration>node).typeParameters) ||
                    visitNode(cbNode, (<TypeAliasDeclaration>node).type);
            case SyntaxKind.EnumDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<EnumDeclaration>node).name) ||
                    visitNodes(cbNode, cbNodes, (<EnumDeclaration>node).members);
            case SyntaxKind.EnumMember:
                return visitNode(cbNode, (<EnumMember>node).name) ||
                    visitNode(cbNode, (<EnumMember>node).initializer);
            case SyntaxKind.ModuleDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ModuleDeclaration>node).name) ||
                    visitNode(cbNode, (<ModuleDeclaration>node).body);
            case SyntaxKind.ImportEqualsDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ImportEqualsDeclaration>node).name) ||
                    visitNode(cbNode, (<ImportEqualsDeclaration>node).moduleReference);
            case SyntaxKind.ImportDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ImportDeclaration>node).importClause) ||
                    visitNode(cbNode, (<ImportDeclaration>node).moduleSpecifier);
            case SyntaxKind.ImportClause:
                return visitNode(cbNode, (<ImportClause>node).name) ||
                    visitNode(cbNode, (<ImportClause>node).namedBindings);
            case SyntaxKind.NamespaceExportDeclaration:
                return visitNode(cbNode, (<NamespaceExportDeclaration>node).name);

            case SyntaxKind.NamespaceImport:
                return visitNode(cbNode, (<NamespaceImport>node).name);
            case SyntaxKind.NamespaceExport:
                return visitNode(cbNode, (<NamespaceExport>node).name);
            case SyntaxKind.NamedImports:
            case SyntaxKind.NamedExports:
                return visitNodes(cbNode, cbNodes, (<NamedImportsOrExports>node).elements);
            case SyntaxKind.ExportDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ExportDeclaration>node).exportClause) ||
                    visitNode(cbNode, (<ExportDeclaration>node).moduleSpecifier);
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ExportSpecifier:
                return visitNode(cbNode, (<ImportOrExportSpecifier>node).propertyName) ||
                    visitNode(cbNode, (<ImportOrExportSpecifier>node).name);
            case SyntaxKind.ExportAssignment:
                return visitNodes(cbNode, cbNodes, node.decorators) ||
                    visitNodes(cbNode, cbNodes, node.modifiers) ||
                    visitNode(cbNode, (<ExportAssignment>node).expression);
            case SyntaxKind.TemplateExpression:
                return visitNode(cbNode, (<TemplateExpression>node).head) || visitNodes(cbNode, cbNodes, (<TemplateExpression>node).templateSpans);
            case SyntaxKind.TemplateSpan:
                return visitNode(cbNode, (<TemplateSpan>node).expression) || visitNode(cbNode, (<TemplateSpan>node).literal);
            case SyntaxKind.ComputedPropertyName:
                return visitNode(cbNode, (<ComputedPropertyName>node).expression);
            case SyntaxKind.HeritageClause:
                return visitNodes(cbNode, cbNodes, (<HeritageClause>node).types);
            case SyntaxKind.ExpressionWithTypeArguments:
                return visitNode(cbNode, (<ExpressionWithTypeArguments>node).expression) ||
                    visitNodes(cbNode, cbNodes, (<ExpressionWithTypeArguments>node).typeArguments);
            case SyntaxKind.ExternalModuleReference:
                return visitNode(cbNode, (<ExternalModuleReference>node).expression);
            case SyntaxKind.MissingDeclaration:
                return visitNodes(cbNode, cbNodes, node.decorators);
            case SyntaxKind.CommaListExpression:
                return visitNodes(cbNode, cbNodes, (<CommaListExpression>node).elements);

            case SyntaxKind.JsxElement:
                return visitNode(cbNode, (<JsxElement>node).openingElement) ||
                    visitNodes(cbNode, cbNodes, (<JsxElement>node).children) ||
                    visitNode(cbNode, (<JsxElement>node).closingElement);
            case SyntaxKind.JsxFragment:
                return visitNode(cbNode, (<JsxFragment>node).openingFragment) ||
                    visitNodes(cbNode, cbNodes, (<JsxFragment>node).children) ||
                    visitNode(cbNode, (<JsxFragment>node).closingFragment);
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxOpeningElement:
                return visitNode(cbNode, (<JsxOpeningLikeElement>node).tagName) ||
                    visitNodes(cbNode, cbNodes, (<JsxOpeningLikeElement>node).typeArguments) ||
                    visitNode(cbNode, (<JsxOpeningLikeElement>node).attributes);
            case SyntaxKind.JsxAttributes:
                return visitNodes(cbNode, cbNodes, (<JsxAttributes>node).properties);
            case SyntaxKind.JsxAttribute:
                return visitNode(cbNode, (<JsxAttribute>node).name) ||
                    visitNode(cbNode, (<JsxAttribute>node).initializer);
            case SyntaxKind.JsxSpreadAttribute:
                return visitNode(cbNode, (<JsxSpreadAttribute>node).expression);
            case SyntaxKind.JsxExpression:
                return visitNode(cbNode, (node as JsxExpression).dotDotDotToken) ||
                    visitNode(cbNode, (node as JsxExpression).expression);
            case SyntaxKind.JsxClosingElement:
                return visitNode(cbNode, (<JsxClosingElement>node).tagName);

            case SyntaxKind.OptionalType:
            case SyntaxKind.RestType:
            case SyntaxKind.JSDocTypeExpression:
            case SyntaxKind.JSDocNonNullableType:
            case SyntaxKind.JSDocNullableType:
            case SyntaxKind.JSDocOptionalType:
            case SyntaxKind.JSDocVariadicType:
                return visitNode(cbNode, (<OptionalTypeNode | RestTypeNode | JSDocTypeExpression | JSDocTypeReferencingNode>node).type);
            case SyntaxKind.JSDocFunctionType:
                return visitNodes(cbNode, cbNodes, (<JSDocFunctionType>node).parameters) ||
                    visitNode(cbNode, (<JSDocFunctionType>node).type);
            case SyntaxKind.JSDocComment:
                return visitNodes(cbNode, cbNodes, (<JSDoc>node).tags);
            case SyntaxKind.JSDocParameterTag:
            case SyntaxKind.JSDocPropertyTag:
                return visitNode(cbNode, (node as JSDocTag).tagName) ||
                    ((node as JSDocPropertyLikeTag).isNameFirst
                        ? visitNode(cbNode, (<JSDocPropertyLikeTag>node).name) ||
                            visitNode(cbNode, (<JSDocPropertyLikeTag>node).typeExpression)
                        : visitNode(cbNode, (<JSDocPropertyLikeTag>node).typeExpression) ||
                            visitNode(cbNode, (<JSDocPropertyLikeTag>node).name));
            case SyntaxKind.JSDocAuthorTag:
                return visitNode(cbNode, (node as JSDocTag).tagName);
            case SyntaxKind.JSDocImplementsTag:
                return visitNode(cbNode, (node as JSDocTag).tagName) ||
                    visitNode(cbNode, (<JSDocImplementsTag>node).class);
            case SyntaxKind.JSDocAugmentsTag:
                return visitNode(cbNode, (node as JSDocTag).tagName) ||
                    visitNode(cbNode, (<JSDocAugmentsTag>node).class);
            case SyntaxKind.JSDocTemplateTag:
                return visitNode(cbNode, (node as JSDocTag).tagName) ||
                    visitNode(cbNode, (<JSDocTemplateTag>node).constraint) ||
                    visitNodes(cbNode, cbNodes, (<JSDocTemplateTag>node).typeParameters);
            case SyntaxKind.JSDocTypedefTag:
                return visitNode(cbNode, (node as JSDocTag).tagName) ||
                    ((node as JSDocTypedefTag).typeExpression &&
                        (node as JSDocTypedefTag).typeExpression!.kind === SyntaxKind.JSDocTypeExpression
                        ? visitNode(cbNode, (<JSDocTypedefTag>node).typeExpression) ||
                            visitNode(cbNode, (<JSDocTypedefTag>node).fullName)
                        : visitNode(cbNode, (<JSDocTypedefTag>node).fullName) ||
                            visitNode(cbNode, (<JSDocTypedefTag>node).typeExpression));
            case SyntaxKind.JSDocCallbackTag:
                return visitNode(cbNode, (node as JSDocTag).tagName) ||
                    visitNode(cbNode, (node as JSDocCallbackTag).fullName) ||
                    visitNode(cbNode, (node as JSDocCallbackTag).typeExpression);
            case SyntaxKind.JSDocReturnTag:
            case SyntaxKind.JSDocTypeTag:
            case SyntaxKind.JSDocThisTag:
            case SyntaxKind.JSDocEnumTag:
                return visitNode(cbNode, (node as JSDocTag).tagName) ||
                    visitNode(cbNode, (node as JSDocReturnTag | JSDocTypeTag | JSDocThisTag | JSDocEnumTag).typeExpression);
            case SyntaxKind.JSDocSignature:
                return forEach((<JSDocSignature>node).typeParameters, cbNode) ||
                    forEach((<JSDocSignature>node).parameters, cbNode) ||
                    visitNode(cbNode, (<JSDocSignature>node).type);
            case SyntaxKind.JSDocTypeLiteral:
                return forEach((node as JSDocTypeLiteral).jsDocPropertyTags, cbNode);
            case SyntaxKind.JSDocTag:
            case SyntaxKind.JSDocClassTag:
            case SyntaxKind.JSDocPublicTag:
            case SyntaxKind.JSDocPrivateTag:
            case SyntaxKind.JSDocProtectedTag:
            case SyntaxKind.JSDocReadonlyTag:
                return visitNode(cbNode, (node as JSDocTag).tagName);
            case SyntaxKind.PartiallyEmittedExpression:
                return visitNode(cbNode, (<PartiallyEmittedExpression>node).expression);
        }
    }

    /** @internal */
    /**
     * Invokes a callback for each child of the given node. The 'cbNode' callback is invoked for all child nodes
     * stored in properties. If a 'cbNodes' callback is specified, it is invoked for embedded arrays; additionally,
     * unlike `forEachChild`, embedded arrays are flattened and the 'cbNode' callback is invoked for each element.
     *  If a callback returns a truthy value, iteration stops and that value is returned. Otherwise, undefined is returned.
     *
     * @param node a given node to visit its children
     * @param cbNode a callback to be invoked for all child nodes
     * @param cbNodes a callback to be invoked for embedded array
     *
     * @remarks Unlike `forEachChild`, `forEachChildRecursively` handles recursively invoking the traversal on each child node found,
     * and while doing so, handles traversing the structure without relying on the callstack to encode the tree structure.
     */
    export function forEachChildRecursively<T>(rootNode: Node, cbNode: (node: Node, parent: Node) => T | "skip" | undefined, cbNodes?: (nodes: NodeArray<Node>, parent: Node) => T | "skip" | undefined): T | undefined {

        const stack: Node[] = [rootNode];
        while (stack.length) {
            const parent = stack.pop()!;
            const res = visitAllPossibleChildren(parent, gatherPossibleChildren(parent));
            if (res) {
                return res;
            }
        }

        return;

        function gatherPossibleChildren(node: Node) {
            const children: (Node | NodeArray<Node>)[] = [];
            forEachChild(node, addWorkItem, addWorkItem); // By using a stack above and `unshift` here, we emulate a depth-first preorder traversal
            return children;

            function addWorkItem(n: Node | NodeArray<Node>) {
                children.unshift(n);
            }
        }

        function visitAllPossibleChildren(parent: Node, children: readonly (Node | NodeArray<Node>)[]) {
            for (const child of children) {
                if (isArray(child)) {
                    if (cbNodes) {
                        const res = cbNodes(child, parent);
                        if (res) {
                            if (res === "skip") continue;
                            return res;
                        }
                    }

                    for (let i = child.length - 1; i >= 0; i--) {
                        const realChild = child[i];
                        const res = cbNode(realChild, parent);
                        if (res) {
                            if (res === "skip") continue;
                            return res;
                        }
                        stack.push(realChild);
                    }
                }
                else {
                    stack.push(child);
                    const res = cbNode(child, parent);
                    if (res) {
                        if (res === "skip") continue;
                        return res;
                    }
                }
            }
        }
    }

}