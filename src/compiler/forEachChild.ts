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

    function forEachChildOfQualifiedName<T>(node: QualifiedName, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    }

    function forEachChildOfTypeParameter<T>(node: TypeParameterDeclaration, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.constraint) ||
            visitNode(cbNode, node.default) ||
            visitNode(cbNode, node.expression);
    }

    function forEachChildOfShorthandPropertyAssignment<T>(node: ShorthandPropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.equalsToken) ||
            visitNode(cbNode, node.objectAssignmentInitializer);
    }

    function forEachChildOfSpreadAssignment<T>(node: SpreadAssignment, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfParameter<T>(node: ParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfPropertyDeclaration<T>(node: PropertyDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfPropertySignature<T>(node: PropertySignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfPropertyAssignment<T>(node: PropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfVariableDeclaration<T>(node: VariableDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfBindingElement<T>(node: BindingElement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.propertyName) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfFunctionOrConstructorTypeOrCallConstructOrIndexSignature<T>(node: FunctionTypeNode | ConstructorTypeNode | CallSignatureDeclaration | ConstructSignatureDeclaration | IndexSignatureDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfMethodDeclaration<T>(node: MethodDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfMethodSignature<T>(node: MethodSignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfConstructor<T>(node: ConstructorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfGetAccessor<T>(node: GetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfSetAccessor<T>(node: SetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfFunctionExpression<T>(node: FunctionExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfFunctionDeclaration<T>(node: FunctionDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfArrowFunction<T>(node: ArrowFunction, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.equalsGreaterThanToken) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfTypeReference<T>(node: TypeReferenceNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    }

    function forEachChildOfTypePredicate<T>(node: TypePredicateNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.assertsModifier) ||
            visitNode(cbNode, node.parameterName) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfTypeQuery<T>(node: TypeQueryNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.exprName);
    }

    function forEachChildOfTypeLiteral<T>(node: TypeLiteralNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.members);
    }

    function forEachChildOfArrayType<T>(node: ArrayTypeNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.elementType);
    }

    function forEachChildOfTupleType<T>(node: TupleTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elementTypes);
    }

    function forEachChildOfUnionOrIntersectionType<T>(node: UnionTypeNode | IntersectionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.types);
    }

    function forEachChildOfConditionalType<T>(node: ConditionalTypeNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.checkType) ||
            visitNode(cbNode, node.extendsType) ||
            visitNode(cbNode, node.trueType) ||
            visitNode(cbNode, node.falseType);
    }

    function forEachChildOfInferType<T>(node: InferTypeNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeParameter);
    }

    function forEachChildOfImportType<T>(node: ImportTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.argument) ||
            visitNode(cbNode, node.qualifier) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    }

    function forEachChildOfParenthesizedTypeOrTypeOperator<T>(node: ParenthesizedTypeNode | TypeOperatorNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type);
    }

    function forEachChildOfIndexedAccessType<T>(node: IndexedAccessTypeNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.objectType) ||
            visitNode(cbNode, node.indexType);
    }

    function forEachChildOfMappedType<T>(node: MappedTypeNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.readonlyToken) ||
            visitNode(cbNode, node.typeParameter) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfLiteralType<T>(node: LiteralTypeNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.literal);
    }

    function forEachChildOfObjectOrArrayBindingPattern<T>(node: ObjectBindingPattern | ArrayBindingPattern, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    }

    function forEachChildOfArrayLiteralExpression<T>(node: ArrayLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    }

    function forEachChildOfObjectLiteralExpression<T>(node: ObjectLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    }

    function forEachChildOfPropertyAccessExpression<T>(node: PropertyAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.name);
    }

    function forEachChildOfElementAccessExpression<T>(node: ElementAccessExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.argumentExpression);
    }

    function forEachChildOfCallExpression<T>(node: CallExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNodes(cbNode, cbNodes, node.typeArguments) ||
            visitNodes(cbNode, cbNodes, node.arguments);
    }

    function forEachChildOfNewExpression<T>(node: NewExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.typeArguments) ||
            visitNodes(cbNode, cbNodes, node.arguments);
    }

    function forEachChildOfTaggedTemplateExpression<T>(node: TaggedTemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tag) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNodes(cbNode, cbNodes, node.typeArguments) ||
            visitNode(cbNode, node.template);
    }

    function forEachChildOfTypeAssertion<T>(node: TypeAssertion, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.expression);
    }

    function forEachChildOfParenthesizedExpression<T>(node: ParenthesizedExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfDeleteExpression<T>(node: DeleteExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfTypeOfExpression<T>(node: TypeOfExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfVoidExpression<T>(node: VoidExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfPrefixUnaryExpression<T>(node: PrefixUnaryExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    }

    function forEachChildOfYieldExpression<T>(node: YieldExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.expression);
    }

    function forEachChildOfAwaitExpression<T>(node: AwaitExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfPostfixUnaryExpression<T>(node: PostfixUnaryExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    }

    function forEachChildOfBinaryExpression<T>(node: BinaryExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.operatorToken) ||
            visitNode(cbNode, node.right);
    }

    function forEachChildOfAsExpression<T>(node: AsExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfNonNullExpression<T>(node: NonNullExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfMetaProperty<T>(node: MetaProperty, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    }

    function forEachChildOfConditionalExpression<T>(node: ConditionalExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.whenTrue) ||
            visitNode(cbNode, node.colonToken) ||
            visitNode(cbNode, node.whenFalse);
    }

    function forEachChildOfSpreadElement<T>(node: SpreadElement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfBlockOrModuleBlock<T>(node: Block | ModuleBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements);
    }

    function forEachChildOfSourceFile<T>(node: SourceFile, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements) ||
            visitNode(cbNode, node.endOfFileToken);
    }

    function forEachChildOfVariableStatement<T>(node: VariableStatement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.declarationList);
    }

    function forEachChildOfVariableDeclarationList<T>(node: VariableDeclarationList, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.declarations);
    }

    function forEachChildOfExpressionStatement<T>(node: ExpressionStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfIfStatement<T>(node: IfStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.thenStatement) ||
            visitNode(cbNode, node.elseStatement);
    }

    function forEachChildOfDoStatement<T>(node: DoStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.statement) ||
            visitNode(cbNode, node.expression);
    }

    function forEachChildOfWhileStatement<T>(node: WhileStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    }

    function forEachChildOfForStatement<T>(node: ForStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.incrementor) ||
            visitNode(cbNode, node.statement);
    }

    function forEachChildOfForInStatement<T>(node: ForInStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    }

    function forEachChildOfForOfStatement<T>(node: ForOfStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.awaitModifier) ||
            visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    }

    function forEachChildOfContinueOrBreakStatement<T>(node: ContinueStatement | BreakStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.label);
    }

    function forEachChildOfReturnStatement<T>(node: ReturnStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfWithStatement<T>(node: WithStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    }

    function forEachChildOfSwitchStatement<T>(node: SwitchStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.caseBlock);
    }

    function forEachChildOfCaseBlock<T>(node: CaseBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.clauses);
    }

    function forEachChildOfCaseClause<T>(node: CaseClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.statements);
    }

    function forEachChildOfDefaultClause<T>(node: DefaultClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements);
    }

    function forEachChildOfLabeledStatement<T>(node: LabeledStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.label) ||
            visitNode(cbNode, node.statement);
    }

    function forEachChildOfThrowStatement<T>(node: ThrowStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfTryStatement<T>(node: TryStatement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tryBlock) ||
            visitNode(cbNode, node.catchClause) ||
            visitNode(cbNode, node.finallyBlock);
    }

    function forEachChildOfCatchClause<T>(node: CatchClause, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.variableDeclaration) ||
            visitNode(cbNode, node.block);
    }

    function forEachChildOfDecorator<T>(node: Decorator, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfClassDeclarationOrExpression<T>(node: ClassDeclaration | ClassExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.heritageClauses) ||
            visitNodes(cbNode, cbNodes, node.members);
    }

    function forEachChildOfInterfaceDeclaration<T>(node: InterfaceDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.heritageClauses) ||
            visitNodes(cbNode, cbNodes, node.members);
    }

    function forEachChildOfTypeAliasDeclaration<T>(node: TypeAliasDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfEnumDeclaration<T>(node: EnumDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.members);
    }

    function forEachChildOfEnumMember<T>(node: EnumMember, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfModuleDeclaration<T>(node: ModuleDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.body);
    }

    function forEachChildOfImportEqualsDeclaration<T>(node: ImportEqualsDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.moduleReference);
    }

    function forEachChildOfImportDeclaration<T>(node: ImportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.importClause) ||
            visitNode(cbNode, node.moduleSpecifier);
    }

    function forEachChildOfImportClause<T>(node: ImportClause, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.namedBindings);
    }

    function forEachChildOfNamespaceExportDeclaration<T>(node: NamespaceExportDeclaration, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);

    }

    function forEachChildOfNamespaceImport<T>(node: NamespaceImport, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    }

    function forEachChildOfNamespaceExport<T>(node: NamespaceExport, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    }

    function forEachChildOfNamedImportsOrExports<T>(node: NamedImports | NamedExports, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    }

    function forEachChildOfExportDeclaration<T>(node: ExportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.exportClause) ||
            visitNode(cbNode, node.moduleSpecifier);
    }

    function forEachChildOfImportOrExportSpecifier<T>(node: ImportSpecifier | ExportSpecifier, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.propertyName) ||
            visitNode(cbNode, node.name);
    }

    function forEachChildOfExportAssignment<T>(node: ExportAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.expression);
    }

    function forEachChildOfTemplateExpression<T>(node: TemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.head) || visitNodes(cbNode, cbNodes, node.templateSpans);
    }

    function forEachChildOfTemplateSpan<T>(node: TemplateSpan, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) || visitNode(cbNode, node.literal);
    }

    function forEachChildOfComputedPropertyName<T>(node: ComputedPropertyName, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfHeritageClause<T>(node: HeritageClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.types);
    }

    function forEachChildOfExpressionWithTypeArguments<T>(node: ExpressionWithTypeArguments, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    }

    function forEachChildOfExternalModuleReference<T>(node: ExternalModuleReference, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfMissingDeclaration<T>(node: MissingDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.decorators);
    }

    function forEachChildOfCommaListExpression<T>(node: CommaListExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    }

    function forEachChildOfJsxElement<T>(node: JsxElement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingElement) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingElement);
    }

    function forEachChildOfJsxFragment<T>(node: JsxFragment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingFragment) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingFragment);
    }

    function forEachChildOfJsxOpeningOrSelfClosingElement<T>(node: JsxOpeningElement | JsxSelfClosingElement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments) ||
            visitNode(cbNode, node.attributes);
    }

    function forEachChildOfJsxAttributes<T>(node: JsxAttributes, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    }

    function forEachChildOfJsxAttribute<T>(node: JsxAttribute, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    }

    function forEachChildOfJsxSpreadAttribute<T>(node: JsxSpreadAttribute, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    }

    function forEachChildOfJsxExpression<T>(node: JsxExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.expression);
    }

    function forEachChildOfJsxClosingElement<T>(node: JsxClosingElement, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName);
    }

    function forEachChildOfOptionalOrRestOrJSDocTypeLike<T>(node: OptionalTypeNode | RestTypeNode | JSDocTypeExpression | JSDocTypeReferencingNode, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type);
    }

    function forEachChildOfJSDocFunctionType<T>(node: JSDocFunctionType, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfJSDocComment<T>(node: JSDoc, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.tags);
    }

    function forEachChildOfJSDocPropertyOrParameterTag<T>(node: JSDocPropertyTag | JSDocParameterTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (node.isNameFirst
                ? visitNode(cbNode, node.name) ||
                    visitNode(cbNode, node.typeExpression)
                : visitNode(cbNode, node.typeExpression) ||
                    visitNode(cbNode, node.name));
    }

    function forEachChildOfJSDocAuthorTag<T>(node: JSDocAuthorTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName);
    }

    function forEachChildOfJSDocImplementsTag<T>(node: JSDocImplementsTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class);
    }

    function forEachChildOfJSDocAugmentsTag<T>(node: JSDocAugmentsTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class);
    }

    function forEachChildOfJSDocTemplateTag<T>(node: JSDocTemplateTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.constraint) ||
            visitNodes(cbNode, cbNodes, node.typeParameters);
    }

    function forEachChildOfJSDocTypedefTag<T>(node: JSDocTypedefTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (node.typeExpression?.kind === SyntaxKind.JSDocTypeExpression
                ? visitNode(cbNode, node.typeExpression) ||
                    visitNode(cbNode, node.fullName)
                : visitNode(cbNode, node.fullName) ||
                    visitNode(cbNode, node.typeExpression));
    }

    function forEachChildOfJSDocCallbackTag<T>(node: JSDocCallbackTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.fullName) ||
            visitNode(cbNode, node.typeExpression);
    }

    function forEachChildOfJSDocReturnOrTypeOrThisOrEnumTag<T>(node: JSDocReturnTag | JSDocTypeTag | JSDocThisTag | JSDocEnumTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.typeExpression);
    }

    function forEachChildOfJSDocSignature<T>(node: JSDocSignature, cbNode: (node: Node) => T | undefined): T | undefined {
        return forEach(node.typeParameters, cbNode) ||
            forEach(node.parameters, cbNode) ||
            visitNode(cbNode, node.type);
    }

    function forEachChildOfJSDocTypeLiteral<T>(node: JSDocTypeLiteral, cbNode: (node: Node) => T | undefined): T | undefined {
        return forEach(node.jsDocPropertyTags, cbNode);
    }

    function forEachChildOfJSDocUnknownOrClassOrPublicOrPrivateOrProtectedOrReadonlyTag<T>(node: JSDocUnknownTag | JSDocClassTag | JSDocPublicTag | JSDocPrivateTag | JSDocProtectedTag | JSDocReadonlyTag, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName);
    }

    function forEachChildOfPartiallyEmittedExpression<T>(node: PartiallyEmittedExpression, cbNode: (node: Node) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
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
                return forEachChildOfQualifiedName(node as QualifiedName, cbNode);
            case SyntaxKind.TypeParameter:
                return forEachChildOfTypeParameter(node as TypeParameterDeclaration, cbNode);
            case SyntaxKind.ShorthandPropertyAssignment:
                return forEachChildOfShorthandPropertyAssignment(node as ShorthandPropertyAssignment, cbNode, cbNodes);
            case SyntaxKind.SpreadAssignment:
                return forEachChildOfSpreadAssignment(node as SpreadAssignment, cbNode);
            case SyntaxKind.Parameter:
                return forEachChildOfParameter(node as ParameterDeclaration, cbNode, cbNodes);
            case SyntaxKind.PropertyDeclaration:
                return forEachChildOfPropertyDeclaration(node as PropertyDeclaration, cbNode, cbNodes);
            case SyntaxKind.PropertySignature:
                return forEachChildOfPropertySignature(node as PropertySignature, cbNode, cbNodes);
            case SyntaxKind.PropertyAssignment:
                return forEachChildOfPropertyAssignment(node as PropertyAssignment, cbNode, cbNodes);
            case SyntaxKind.VariableDeclaration:
                return forEachChildOfVariableDeclaration(node as VariableDeclaration, cbNode, cbNodes);
            case SyntaxKind.BindingElement:
                return forEachChildOfBindingElement(node as BindingElement, cbNode, cbNodes);
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.CallSignature:
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.IndexSignature:
                return forEachChildOfFunctionOrConstructorTypeOrCallConstructOrIndexSignature(node as FunctionTypeNode | ConstructorTypeNode | CallSignatureDeclaration | ConstructSignatureDeclaration | IndexSignatureDeclaration, cbNode, cbNodes);
            case SyntaxKind.MethodDeclaration:
                return forEachChildOfMethodDeclaration(node as MethodDeclaration, cbNode, cbNodes);
            case SyntaxKind.MethodSignature:
                return forEachChildOfMethodSignature(node as MethodSignature, cbNode, cbNodes);
            case SyntaxKind.Constructor:
                return forEachChildOfConstructor(node as ConstructorDeclaration, cbNode, cbNodes);
            case SyntaxKind.GetAccessor:
                return forEachChildOfGetAccessor(node as GetAccessorDeclaration, cbNode, cbNodes);
            case SyntaxKind.SetAccessor:
                return forEachChildOfSetAccessor(node as SetAccessorDeclaration, cbNode, cbNodes);
            case SyntaxKind.FunctionExpression:
                return forEachChildOfFunctionExpression(node as FunctionExpression, cbNode, cbNodes);
            case SyntaxKind.FunctionDeclaration:
                return forEachChildOfFunctionDeclaration(node as FunctionDeclaration, cbNode, cbNodes);
            case SyntaxKind.ArrowFunction:
                return forEachChildOfArrowFunction(node as ArrowFunction, cbNode, cbNodes);
            case SyntaxKind.TypeReference:
                return forEachChildOfTypeReference(node as TypeReferenceNode, cbNode, cbNodes);
            case SyntaxKind.TypePredicate:
                return forEachChildOfTypePredicate(node as TypePredicateNode, cbNode);
            case SyntaxKind.TypeQuery:
                return forEachChildOfTypeQuery(node as TypeQueryNode, cbNode);
            case SyntaxKind.TypeLiteral:
                return forEachChildOfTypeLiteral(node as TypeLiteralNode, cbNode, cbNodes);
            case SyntaxKind.ArrayType:
                return forEachChildOfArrayType(node as ArrayTypeNode, cbNode);
            case SyntaxKind.TupleType:
                return forEachChildOfTupleType(node as TupleTypeNode, cbNode, cbNodes);
            case SyntaxKind.UnionType:
            case SyntaxKind.IntersectionType:
                return forEachChildOfUnionOrIntersectionType(node as IntersectionTypeNode, cbNode, cbNodes);
            case SyntaxKind.ConditionalType:
                return forEachChildOfConditionalType(node as ConditionalTypeNode, cbNode);
            case SyntaxKind.InferType:
                return forEachChildOfInferType(node as InferTypeNode, cbNode);
            case SyntaxKind.ImportType:
                return forEachChildOfImportType(node as ImportTypeNode, cbNode, cbNodes);
            case SyntaxKind.ParenthesizedType:
            case SyntaxKind.TypeOperator:
                return forEachChildOfParenthesizedTypeOrTypeOperator(node as TypeOperatorNode, cbNode);
            case SyntaxKind.IndexedAccessType:
                return forEachChildOfIndexedAccessType(node as IndexedAccessTypeNode, cbNode);
            case SyntaxKind.MappedType:
                return forEachChildOfMappedType(node as MappedTypeNode, cbNode);
            case SyntaxKind.LiteralType:
                return forEachChildOfLiteralType(node as LiteralTypeNode, cbNode);
            case SyntaxKind.ObjectBindingPattern:
            case SyntaxKind.ArrayBindingPattern:
                return forEachChildOfObjectOrArrayBindingPattern(node as ArrayBindingPattern, cbNode, cbNodes);
            case SyntaxKind.ArrayLiteralExpression:
                return forEachChildOfArrayLiteralExpression(node as ArrayLiteralExpression, cbNode, cbNodes);
            case SyntaxKind.ObjectLiteralExpression:
                return forEachChildOfObjectLiteralExpression(node as ObjectLiteralExpression, cbNode, cbNodes);
            case SyntaxKind.PropertyAccessExpression:
                return forEachChildOfPropertyAccessExpression(node as PropertyAccessExpression, cbNode, cbNodes);
            case SyntaxKind.ElementAccessExpression:
                return forEachChildOfElementAccessExpression(node as ElementAccessExpression, cbNode);
            case SyntaxKind.CallExpression:
                return forEachChildOfCallExpression(node as CallExpression, cbNode, cbNodes);
            case SyntaxKind.NewExpression:
                return forEachChildOfNewExpression(node as NewExpression, cbNode, cbNodes);
            case SyntaxKind.TaggedTemplateExpression:
                return forEachChildOfTaggedTemplateExpression(node as TaggedTemplateExpression, cbNode, cbNodes);
            case SyntaxKind.TypeAssertionExpression:
                return forEachChildOfTypeAssertion(node as TypeAssertion, cbNode);
            case SyntaxKind.ParenthesizedExpression:
                return forEachChildOfParenthesizedExpression(node as ParenthesizedExpression, cbNode);
            case SyntaxKind.DeleteExpression:
                return forEachChildOfDeleteExpression(node as DeleteExpression, cbNode);
            case SyntaxKind.TypeOfExpression:
                return forEachChildOfTypeOfExpression(node as TypeOfExpression, cbNode);
            case SyntaxKind.VoidExpression:
                return forEachChildOfVoidExpression(node as VoidExpression, cbNode);
            case SyntaxKind.PrefixUnaryExpression:
                return forEachChildOfPrefixUnaryExpression(node as PrefixUnaryExpression, cbNode);
            case SyntaxKind.YieldExpression:
                return forEachChildOfYieldExpression(node as YieldExpression, cbNode);
            case SyntaxKind.AwaitExpression:
                return forEachChildOfAwaitExpression(node as AwaitExpression, cbNode);
            case SyntaxKind.PostfixUnaryExpression:
                return forEachChildOfPostfixUnaryExpression(node as PostfixUnaryExpression, cbNode);
            case SyntaxKind.BinaryExpression:
                return forEachChildOfBinaryExpression(node as BinaryExpression, cbNode);
            case SyntaxKind.AsExpression:
                return forEachChildOfAsExpression(node as AsExpression, cbNode);
            case SyntaxKind.NonNullExpression:
                return forEachChildOfNonNullExpression(node as NonNullExpression, cbNode);
            case SyntaxKind.MetaProperty:
                return forEachChildOfMetaProperty(node as MetaProperty, cbNode);
            case SyntaxKind.ConditionalExpression:
                return forEachChildOfConditionalExpression(node as ConditionalExpression, cbNode);
            case SyntaxKind.SpreadElement:
                return forEachChildOfSpreadElement(node as SpreadElement, cbNode);
            case SyntaxKind.Block:
            case SyntaxKind.ModuleBlock:
                return forEachChildOfBlockOrModuleBlock(node as ModuleBlock, cbNode, cbNodes);
            case SyntaxKind.SourceFile:
                return forEachChildOfSourceFile(node as SourceFile, cbNode, cbNodes);
            case SyntaxKind.VariableStatement:
                return forEachChildOfVariableStatement(node as VariableStatement, cbNode, cbNodes);
            case SyntaxKind.VariableDeclarationList:
                return forEachChildOfVariableDeclarationList(node as VariableDeclarationList, cbNode, cbNodes);
            case SyntaxKind.ExpressionStatement:
                return forEachChildOfExpressionStatement(node as ExpressionStatement, cbNode);
            case SyntaxKind.IfStatement:
                return forEachChildOfIfStatement(node as IfStatement, cbNode);
            case SyntaxKind.DoStatement:
                return forEachChildOfDoStatement(node as DoStatement, cbNode);
            case SyntaxKind.WhileStatement:
                return forEachChildOfWhileStatement(node as WhileStatement, cbNode);
            case SyntaxKind.ForStatement:
                return forEachChildOfForStatement(node as ForStatement, cbNode);
            case SyntaxKind.ForInStatement:
                return forEachChildOfForInStatement(node as ForInStatement, cbNode);
            case SyntaxKind.ForOfStatement:
                return forEachChildOfForOfStatement(node as ForOfStatement, cbNode);
            case SyntaxKind.ContinueStatement:
            case SyntaxKind.BreakStatement:
                return forEachChildOfContinueOrBreakStatement(node as BreakStatement, cbNode);
            case SyntaxKind.ReturnStatement:
                return forEachChildOfReturnStatement(node as ReturnStatement, cbNode);
            case SyntaxKind.WithStatement:
                return forEachChildOfWithStatement(node as WithStatement, cbNode);
            case SyntaxKind.SwitchStatement:
                return forEachChildOfSwitchStatement(node as SwitchStatement, cbNode);
            case SyntaxKind.CaseBlock:
                return forEachChildOfCaseBlock(node as CaseBlock, cbNode, cbNodes);
            case SyntaxKind.CaseClause:
                return forEachChildOfCaseClause(node as CaseClause, cbNode, cbNodes);
            case SyntaxKind.DefaultClause:
                return forEachChildOfDefaultClause(node as DefaultClause, cbNode, cbNodes);
            case SyntaxKind.LabeledStatement:
                return forEachChildOfLabeledStatement(node as LabeledStatement, cbNode);
            case SyntaxKind.ThrowStatement:
                return forEachChildOfThrowStatement(node as ThrowStatement, cbNode);
            case SyntaxKind.TryStatement:
                return forEachChildOfTryStatement(node as TryStatement, cbNode);
            case SyntaxKind.CatchClause:
                return forEachChildOfCatchClause(node as CatchClause, cbNode);
            case SyntaxKind.Decorator:
                return forEachChildOfDecorator(node as Decorator, cbNode);
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
                return forEachChildOfClassDeclarationOrExpression(node as ClassExpression, cbNode, cbNodes);
            case SyntaxKind.InterfaceDeclaration:
                return forEachChildOfInterfaceDeclaration(node as InterfaceDeclaration, cbNode, cbNodes);
            case SyntaxKind.TypeAliasDeclaration:
                return forEachChildOfTypeAliasDeclaration(node as TypeAliasDeclaration, cbNode, cbNodes);
            case SyntaxKind.EnumDeclaration:
                return forEachChildOfEnumDeclaration(node as EnumDeclaration, cbNode, cbNodes);
            case SyntaxKind.EnumMember:
                return forEachChildOfEnumMember(node as EnumMember, cbNode);
            case SyntaxKind.ModuleDeclaration:
                return forEachChildOfModuleDeclaration(node as ModuleDeclaration, cbNode, cbNodes);
            case SyntaxKind.ImportEqualsDeclaration:
                return forEachChildOfImportEqualsDeclaration(node as ImportEqualsDeclaration, cbNode, cbNodes);
            case SyntaxKind.ImportDeclaration:
                return forEachChildOfImportDeclaration(node as ImportDeclaration, cbNode, cbNodes);
            case SyntaxKind.ImportClause:
                return forEachChildOfImportClause(node as ImportClause, cbNode);
            case SyntaxKind.NamespaceExportDeclaration:
                return forEachChildOfNamespaceExportDeclaration(node as NamespaceExportDeclaration, cbNode);
            case SyntaxKind.NamespaceImport:
                return forEachChildOfNamespaceImport(node as NamespaceImport, cbNode);
            case SyntaxKind.NamespaceExport:
                return forEachChildOfNamespaceExport(node as NamespaceExport, cbNode);
            case SyntaxKind.NamedImports:
            case SyntaxKind.NamedExports:
                return forEachChildOfNamedImportsOrExports(node as NamedImports | NamedExports, cbNode, cbNodes);
            case SyntaxKind.ExportDeclaration:
                return forEachChildOfExportDeclaration(node as ExportDeclaration, cbNode, cbNodes);
            case SyntaxKind.ImportSpecifier:
            case SyntaxKind.ExportSpecifier:
                return forEachChildOfImportOrExportSpecifier(node as ExportSpecifier, cbNode);
            case SyntaxKind.ExportAssignment:
                return forEachChildOfExportAssignment(node as ExportAssignment, cbNode, cbNodes);
            case SyntaxKind.TemplateExpression:
                return forEachChildOfTemplateExpression(node as TemplateExpression, cbNode, cbNodes);
            case SyntaxKind.TemplateSpan:
                return forEachChildOfTemplateSpan(node as TemplateSpan, cbNode);
            case SyntaxKind.ComputedPropertyName:
                return forEachChildOfComputedPropertyName(node as ComputedPropertyName, cbNode);
            case SyntaxKind.HeritageClause:
                return forEachChildOfHeritageClause(node as HeritageClause, cbNode, cbNodes);
            case SyntaxKind.ExpressionWithTypeArguments:
                return forEachChildOfExpressionWithTypeArguments(node as ExpressionWithTypeArguments, cbNode, cbNodes);
            case SyntaxKind.ExternalModuleReference:
                return forEachChildOfExternalModuleReference(node as ExternalModuleReference, cbNode);
            case SyntaxKind.MissingDeclaration:
                return forEachChildOfMissingDeclaration(node as MissingDeclaration, cbNode, cbNodes);
            case SyntaxKind.CommaListExpression:
                return forEachChildOfCommaListExpression(node as CommaListExpression, cbNode, cbNodes);
            case SyntaxKind.JsxElement:
                return forEachChildOfJsxElement(node as JsxElement, cbNode, cbNodes);
            case SyntaxKind.JsxFragment:
                return forEachChildOfJsxFragment(node as JsxFragment, cbNode, cbNodes);
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxOpeningElement:
                return forEachChildOfJsxOpeningOrSelfClosingElement(node as JsxOpeningElement, cbNode, cbNodes);
            case SyntaxKind.JsxAttributes:
                return forEachChildOfJsxAttributes(node as JsxAttributes, cbNode, cbNodes);
            case SyntaxKind.JsxAttribute:
                return forEachChildOfJsxAttribute(node as JsxAttribute, cbNode);
            case SyntaxKind.JsxSpreadAttribute:
                return forEachChildOfJsxSpreadAttribute(node as JsxSpreadAttribute, cbNode);
            case SyntaxKind.JsxExpression:
                return forEachChildOfJsxExpression(node as JsxExpression, cbNode);
            case SyntaxKind.JsxClosingElement:
                return forEachChildOfJsxClosingElement(node as JsxClosingElement, cbNode);
            case SyntaxKind.OptionalType:
            case SyntaxKind.RestType:
            case SyntaxKind.JSDocTypeExpression:
            case SyntaxKind.JSDocNonNullableType:
            case SyntaxKind.JSDocNullableType:
            case SyntaxKind.JSDocOptionalType:
            case SyntaxKind.JSDocVariadicType:
                return forEachChildOfOptionalOrRestOrJSDocTypeLike(node as JSDocVariadicType, cbNode);
            case SyntaxKind.JSDocFunctionType:
                return forEachChildOfJSDocFunctionType(node as JSDocFunctionType, cbNode, cbNodes);
            case SyntaxKind.JSDocComment:
                return forEachChildOfJSDocComment(node as JSDoc, cbNode, cbNodes);
            case SyntaxKind.JSDocParameterTag:
            case SyntaxKind.JSDocPropertyTag:
                return forEachChildOfJSDocPropertyOrParameterTag(node as JSDocPropertyTag, cbNode);
            case SyntaxKind.JSDocAuthorTag:
                return forEachChildOfJSDocAuthorTag(node as JSDocAuthorTag, cbNode);
            case SyntaxKind.JSDocImplementsTag:
                return forEachChildOfJSDocImplementsTag(node as JSDocImplementsTag, cbNode);
            case SyntaxKind.JSDocAugmentsTag:
                return forEachChildOfJSDocAugmentsTag(node as JSDocAugmentsTag, cbNode);
            case SyntaxKind.JSDocTemplateTag:
                return forEachChildOfJSDocTemplateTag(node as JSDocTemplateTag, cbNode, cbNodes);
            case SyntaxKind.JSDocTypedefTag:
                return forEachChildOfJSDocTypedefTag(node as JSDocTypedefTag, cbNode);
            case SyntaxKind.JSDocCallbackTag:
                return forEachChildOfJSDocCallbackTag(node as JSDocCallbackTag, cbNode);
            case SyntaxKind.JSDocReturnTag:
            case SyntaxKind.JSDocTypeTag:
            case SyntaxKind.JSDocThisTag:
            case SyntaxKind.JSDocEnumTag:
                return forEachChildOfJSDocReturnOrTypeOrThisOrEnumTag(node as JSDocEnumTag, cbNode);
            case SyntaxKind.JSDocSignature:
                return forEachChildOfJSDocSignature(node as JSDocSignature, cbNode);
            case SyntaxKind.JSDocTypeLiteral:
                return forEachChildOfJSDocTypeLiteral(node as JSDocTypeLiteral, cbNode);
            case SyntaxKind.JSDocTag:
            case SyntaxKind.JSDocClassTag:
            case SyntaxKind.JSDocPublicTag:
            case SyntaxKind.JSDocPrivateTag:
            case SyntaxKind.JSDocProtectedTag:
            case SyntaxKind.JSDocReadonlyTag:
                return forEachChildOfJSDocUnknownOrClassOrPublicOrPrivateOrProtectedOrReadonlyTag(node as JSDocReadonlyTag, cbNode);
            case SyntaxKind.PartiallyEmittedExpression:
                return forEachChildOfPartiallyEmittedExpression(node as PartiallyEmittedExpression, cbNode);
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