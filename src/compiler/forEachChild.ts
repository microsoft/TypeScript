import {
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AwaitExpression,
    BinaryExpression,
    BindingElement,
    BindingPattern,
    Block,
    BreakStatement,
    CallExpression,
    CallSignatureDeclaration,
    CaseBlock,
    CaseClause,
    CatchClause,
    ClassDeclaration,
    ClassExpression,
    ClassStaticBlockDeclaration,
    CommaListExpression,
    ComputedPropertyName,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    ContinueStatement,
    Decorator,
    DefaultClause,
    DeleteExpression,
    DoStatement,
    ElementAccessExpression,
    EnumDeclaration,
    EnumMember,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    ExpressionStatement,
    ExpressionWithTypeArguments,
    ExternalModuleReference,
    forEach,
    ForEachChildNodes,
    ForInStatement,
    ForOfStatement,
    ForStatement,
    FunctionDeclaration,
    FunctionExpression,
    FunctionTypeNode,
    GetAccessorDeclaration,
    HeritageClause,
    IfStatement,
    ImportAttribute,
    ImportAttributes,
    ImportClause,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportSpecifier,
    ImportTypeAssertionContainer,
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    IntersectionTypeNode,
    isArray,
    JSDoc,
    JSDocAugmentsTag,
    JSDocAuthorTag,
    JSDocCallbackTag,
    JSDocClassTag,
    JSDocDeprecatedTag,
    JSDocEnumTag,
    JSDocFunctionType,
    JSDocImplementsTag,
    JSDocImportTag,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocMemberName,
    JSDocNameReference,
    JSDocNonNullableType,
    JSDocNullableType,
    JSDocOptionalType,
    JSDocOverloadTag,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocPrivateTag,
    JSDocPropertyTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTemplateTag,
    JSDocThisTag,
    JSDocThrowsTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JSDocTypeTag,
    JSDocUnknownTag,
    JSDocVariadicType,
    JsxAttribute,
    JsxAttributes,
    JsxClosingElement,
    JsxElement,
    JsxExpression,
    JsxFragment,
    JsxNamespacedName,
    JsxOpeningLikeElement,
    JsxSpreadAttribute,
    LabeledStatement,
    LiteralTypeNode,
    MappedTypeNode,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
    MissingDeclaration,
    ModuleBlock,
    ModuleDeclaration,
    NamedExports,
    NamedImports,
    NamedTupleMember,
    NamespaceExport,
    NamespaceExportDeclaration,
    NamespaceImport,
    NewExpression,
    Node,
    NodeArray,
    NonNullExpression,
    ObjectLiteralExpression,
    OptionalTypeNode,
    ParameterDeclaration,
    ParenthesizedExpression,
    ParenthesizedTypeNode,
    PartiallyEmittedExpression,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PropertyAccessExpression,
    PropertyAssignment,
    PropertyDeclaration,
    PropertySignature,
    QualifiedName,
    RestTypeNode,
    ReturnStatement,
    SatisfiesExpression,
    SetAccessorDeclaration,
    ShorthandPropertyAssignment,
    SourceFile,
    SpreadAssignment,
    SpreadElement,
    SwitchStatement,
    SyntaxKind,
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateSpan,
    ThrowStatement,
    TryStatement,
    TupleTypeNode,
    TypeAliasDeclaration,
    TypeAssertionExpression,
    TypeLiteralNode,
    TypeOfExpression,
    TypeOperatorNode,
    TypeParameterDeclaration,
    TypePredicateNode,
    TypeQueryNode,
    TypeReferenceNode,
    UnionTypeNode,
    VariableDeclaration,
    VariableDeclarationList,
    VariableStatement,
    VoidExpression,
    WhileStatement,
    WithStatement,
    YieldExpression,
} from "./_namespaces/ts.js";

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

type ForEachChildFunction<TNode> = <T>(node: TNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined) => T | undefined;
type ForEachChildTable = { [TNode in ForEachChildNodes as TNode["kind"]]: ForEachChildFunction<TNode>; };

const forEachChildTable: ForEachChildTable = {
    [SyntaxKind.QualifiedName]: function forEachChildInQualifiedName<T>(node: QualifiedName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.TypeParameter]: function forEachChildInTypeParameter<T>(node: TypeParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.constraint) ||
            visitNode(cbNode, node.default) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ShorthandPropertyAssignment]: function forEachChildInShorthandPropertyAssignment<T>(node: ShorthandPropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.equalsToken) ||
            visitNode(cbNode, node.objectAssignmentInitializer);
    },
    [SyntaxKind.SpreadAssignment]: function forEachChildInSpreadAssignment<T>(node: SpreadAssignment, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.Parameter]: function forEachChildInParameter<T>(node: ParameterDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertyDeclaration]: function forEachChildInPropertyDeclaration<T>(node: PropertyDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertySignature]: function forEachChildInPropertySignature<T>(node: PropertySignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.PropertyAssignment]: function forEachChildInPropertyAssignment<T>(node: PropertyAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.VariableDeclaration]: function forEachChildInVariableDeclaration<T>(node: VariableDeclaration, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.BindingElement]: function forEachChildInBindingElement<T>(node: BindingElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.propertyName) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.IndexSignature]: function forEachChildInIndexSignature<T>(node: IndexSignatureDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.ConstructorType]: function forEachChildInConstructorType<T>(node: ConstructorTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.FunctionType]: function forEachChildInFunctionType<T>(node: FunctionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.CallSignature]: forEachChildInCallOrConstructSignature,
    [SyntaxKind.ConstructSignature]: forEachChildInCallOrConstructSignature,
    [SyntaxKind.MethodDeclaration]: function forEachChildInMethodDeclaration<T>(node: MethodDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.MethodSignature]: function forEachChildInMethodSignature<T>(node: MethodSignature, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.Constructor]: function forEachChildInConstructor<T>(node: ConstructorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.GetAccessor]: function forEachChildInGetAccessor<T>(node: GetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.SetAccessor]: function forEachChildInSetAccessor<T>(node: SetAccessorDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.FunctionDeclaration]: function forEachChildInFunctionDeclaration<T>(node: FunctionDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.FunctionExpression]: function forEachChildInFunctionExpression<T>(node: FunctionExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.ArrowFunction]: function forEachChildInArrowFunction<T>(node: ArrowFunction, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.equalsGreaterThanToken) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.ClassStaticBlockDeclaration]: function forEachChildInClassStaticBlockDeclaration<T>(node: ClassStaticBlockDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.TypeReference]: function forEachChildInTypeReference<T>(node: TypeReferenceNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.TypePredicate]: function forEachChildInTypePredicate<T>(node: TypePredicateNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.assertsModifier) ||
            visitNode(cbNode, node.parameterName) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.TypeQuery]: function forEachChildInTypeQuery<T>(node: TypeQueryNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.exprName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.TypeLiteral]: function forEachChildInTypeLiteral<T>(node: TypeLiteralNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.ArrayType]: function forEachChildInArrayType<T>(node: ArrayTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.elementType);
    },
    [SyntaxKind.TupleType]: function forEachChildInTupleType<T>(node: TupleTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.UnionType]: forEachChildInUnionOrIntersectionType,
    [SyntaxKind.IntersectionType]: forEachChildInUnionOrIntersectionType,
    [SyntaxKind.ConditionalType]: function forEachChildInConditionalType<T>(node: ConditionalTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.checkType) ||
            visitNode(cbNode, node.extendsType) ||
            visitNode(cbNode, node.trueType) ||
            visitNode(cbNode, node.falseType);
    },
    [SyntaxKind.InferType]: function forEachChildInInferType<T>(node: InferTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeParameter);
    },
    [SyntaxKind.ImportType]: function forEachChildInImportType<T>(node: ImportTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.argument) ||
            visitNode(cbNode, node.attributes) ||
            visitNode(cbNode, node.qualifier) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.ImportTypeAssertionContainer]: function forEachChildInImportTypeAssertionContainer<T>(node: ImportTypeAssertionContainer, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.assertClause);
    },
    [SyntaxKind.ParenthesizedType]: forEachChildInParenthesizedTypeOrTypeOperator,
    [SyntaxKind.TypeOperator]: forEachChildInParenthesizedTypeOrTypeOperator,
    [SyntaxKind.IndexedAccessType]: function forEachChildInIndexedAccessType<T>(node: IndexedAccessTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.objectType) ||
            visitNode(cbNode, node.indexType);
    },
    [SyntaxKind.MappedType]: function forEachChildInMappedType<T>(node: MappedTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.readonlyToken) ||
            visitNode(cbNode, node.typeParameter) ||
            visitNode(cbNode, node.nameType) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.LiteralType]: function forEachChildInLiteralType<T>(node: LiteralTypeNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.literal);
    },
    [SyntaxKind.NamedTupleMember]: function forEachChildInNamedTupleMember<T>(node: NamedTupleMember, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.ObjectBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [SyntaxKind.ArrayBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [SyntaxKind.ArrayLiteralExpression]: function forEachChildInArrayLiteralExpression<T>(node: ArrayLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.ObjectLiteralExpression]: function forEachChildInObjectLiteralExpression<T>(node: ObjectLiteralExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    },
    [SyntaxKind.PropertyAccessExpression]: function forEachChildInPropertyAccessExpression<T>(node: PropertyAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.ElementAccessExpression]: function forEachChildInElementAccessExpression<T>(node: ElementAccessExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.argumentExpression);
    },
    [SyntaxKind.CallExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.NewExpression]: forEachChildInCallOrNewExpression,
    [SyntaxKind.TaggedTemplateExpression]: function forEachChildInTaggedTemplateExpression<T>(node: TaggedTemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tag) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNodes(cbNode, cbNodes, node.typeArguments) ||
            visitNode(cbNode, node.template);
    },
    [SyntaxKind.TypeAssertionExpression]: function forEachChildInTypeAssertionExpression<T>(node: TypeAssertionExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ParenthesizedExpression]: function forEachChildInParenthesizedExpression<T>(node: ParenthesizedExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.DeleteExpression]: function forEachChildInDeleteExpression<T>(node: DeleteExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.TypeOfExpression]: function forEachChildInTypeOfExpression<T>(node: TypeOfExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.VoidExpression]: function forEachChildInVoidExpression<T>(node: VoidExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.PrefixUnaryExpression]: function forEachChildInPrefixUnaryExpression<T>(node: PrefixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [SyntaxKind.YieldExpression]: function forEachChildInYieldExpression<T>(node: YieldExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.AwaitExpression]: function forEachChildInAwaitExpression<T>(node: AwaitExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.PostfixUnaryExpression]: function forEachChildInPostfixUnaryExpression<T>(node: PostfixUnaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [SyntaxKind.BinaryExpression]: function forEachChildInBinaryExpression<T>(node: BinaryExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.operatorToken) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.AsExpression]: function forEachChildInAsExpression<T>(node: AsExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.NonNullExpression]: function forEachChildInNonNullExpression<T>(node: NonNullExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.SatisfiesExpression]: function forEachChildInSatisfiesExpression<T>(node: SatisfiesExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) || visitNode(cbNode, node.type);
    },
    [SyntaxKind.MetaProperty]: function forEachChildInMetaProperty<T>(node: MetaProperty, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.ConditionalExpression]: function forEachChildInConditionalExpression<T>(node: ConditionalExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.whenTrue) ||
            visitNode(cbNode, node.colonToken) ||
            visitNode(cbNode, node.whenFalse);
    },
    [SyntaxKind.SpreadElement]: function forEachChildInSpreadElement<T>(node: SpreadElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.Block]: forEachChildInBlock,
    [SyntaxKind.ModuleBlock]: forEachChildInBlock,
    [SyntaxKind.SourceFile]: function forEachChildInSourceFile<T>(node: SourceFile, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements) ||
            visitNode(cbNode, node.endOfFileToken);
    },
    [SyntaxKind.VariableStatement]: function forEachChildInVariableStatement<T>(node: VariableStatement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.declarationList);
    },
    [SyntaxKind.VariableDeclarationList]: function forEachChildInVariableDeclarationList<T>(node: VariableDeclarationList, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.declarations);
    },
    [SyntaxKind.ExpressionStatement]: function forEachChildInExpressionStatement<T>(node: ExpressionStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.IfStatement]: function forEachChildInIfStatement<T>(node: IfStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.thenStatement) ||
            visitNode(cbNode, node.elseStatement);
    },
    [SyntaxKind.DoStatement]: function forEachChildInDoStatement<T>(node: DoStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.statement) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.WhileStatement]: function forEachChildInWhileStatement<T>(node: WhileStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForStatement]: function forEachChildInForStatement<T>(node: ForStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.incrementor) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForInStatement]: function forEachChildInForInStatement<T>(node: ForInStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ForOfStatement]: function forEachChildInForOfStatement<T>(node: ForOfStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.awaitModifier) ||
            visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ContinueStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.BreakStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.ReturnStatement]: function forEachChildInReturnStatement<T>(node: ReturnStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.WithStatement]: function forEachChildInWithStatement<T>(node: WithStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.SwitchStatement]: function forEachChildInSwitchStatement<T>(node: SwitchStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.caseBlock);
    },
    [SyntaxKind.CaseBlock]: function forEachChildInCaseBlock<T>(node: CaseBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.clauses);
    },
    [SyntaxKind.CaseClause]: function forEachChildInCaseClause<T>(node: CaseClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.statements);
    },
    [SyntaxKind.DefaultClause]: function forEachChildInDefaultClause<T>(node: DefaultClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements);
    },
    [SyntaxKind.LabeledStatement]: function forEachChildInLabeledStatement<T>(node: LabeledStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.label) ||
            visitNode(cbNode, node.statement);
    },
    [SyntaxKind.ThrowStatement]: function forEachChildInThrowStatement<T>(node: ThrowStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.TryStatement]: function forEachChildInTryStatement<T>(node: TryStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tryBlock) ||
            visitNode(cbNode, node.catchClause) ||
            visitNode(cbNode, node.finallyBlock);
    },
    [SyntaxKind.CatchClause]: function forEachChildInCatchClause<T>(node: CatchClause, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.variableDeclaration) ||
            visitNode(cbNode, node.block);
    },
    [SyntaxKind.Decorator]: function forEachChildInDecorator<T>(node: Decorator, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.ClassDeclaration]: forEachChildInClassDeclarationOrExpression,
    [SyntaxKind.ClassExpression]: forEachChildInClassDeclarationOrExpression,
    [SyntaxKind.InterfaceDeclaration]: function forEachChildInInterfaceDeclaration<T>(node: InterfaceDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.heritageClauses) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.TypeAliasDeclaration]: function forEachChildInTypeAliasDeclaration<T>(node: TypeAliasDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.EnumDeclaration]: function forEachChildInEnumDeclaration<T>(node: EnumDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [SyntaxKind.EnumMember]: function forEachChildInEnumMember<T>(node: EnumMember, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.ModuleDeclaration]: function forEachChildInModuleDeclaration<T>(node: ModuleDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.body);
    },
    [SyntaxKind.ImportEqualsDeclaration]: function forEachChildInImportEqualsDeclaration<T>(node: ImportEqualsDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.moduleReference);
    },
    [SyntaxKind.ImportDeclaration]: function forEachChildInImportDeclaration<T>(node: ImportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.importClause) ||
            visitNode(cbNode, node.moduleSpecifier) ||
            visitNode(cbNode, node.attributes);
    },
    [SyntaxKind.ImportClause]: function forEachChildInImportClause<T>(node: ImportClause, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.namedBindings);
    },
    [SyntaxKind.ImportAttributes]: function forEachChildInImportAttributes<T>(node: ImportAttributes, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.ImportAttribute]: function forEachChildInImportAttribute<T>(node: ImportAttribute, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.value);
    },
    [SyntaxKind.NamespaceExportDeclaration]: function forEachChildInNamespaceExportDeclaration<T>(node: NamespaceExportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.NamespaceImport]: function forEachChildInNamespaceImport<T>(node: NamespaceImport, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.NamespaceExport]: function forEachChildInNamespaceExport<T>(node: NamespaceExport, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.NamedImports]: forEachChildInNamedImportsOrExports,
    [SyntaxKind.NamedExports]: forEachChildInNamedImportsOrExports,
    [SyntaxKind.ExportDeclaration]: function forEachChildInExportDeclaration<T>(node: ExportDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.exportClause) ||
            visitNode(cbNode, node.moduleSpecifier) ||
            visitNode(cbNode, node.attributes);
    },
    [SyntaxKind.ImportSpecifier]: forEachChildInImportOrExportSpecifier,
    [SyntaxKind.ExportSpecifier]: forEachChildInImportOrExportSpecifier,
    [SyntaxKind.ExportAssignment]: function forEachChildInExportAssignment<T>(node: ExportAssignment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.TemplateExpression]: function forEachChildInTemplateExpression<T>(node: TemplateExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.head) ||
            visitNodes(cbNode, cbNodes, node.templateSpans);
    },
    [SyntaxKind.TemplateSpan]: function forEachChildInTemplateSpan<T>(node: TemplateSpan, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.literal);
    },
    [SyntaxKind.TemplateLiteralType]: function forEachChildInTemplateLiteralType<T>(node: TemplateLiteralTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.head) ||
            visitNodes(cbNode, cbNodes, node.templateSpans);
    },
    [SyntaxKind.TemplateLiteralTypeSpan]: function forEachChildInTemplateLiteralTypeSpan<T>(node: TemplateLiteralTypeSpan, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.literal);
    },
    [SyntaxKind.ComputedPropertyName]: function forEachChildInComputedPropertyName<T>(node: ComputedPropertyName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.HeritageClause]: function forEachChildInHeritageClause<T>(node: HeritageClause, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.types);
    },
    [SyntaxKind.ExpressionWithTypeArguments]: function forEachChildInExpressionWithTypeArguments<T>(node: ExpressionWithTypeArguments, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [SyntaxKind.ExternalModuleReference]: function forEachChildInExternalModuleReference<T>(node: ExternalModuleReference, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.MissingDeclaration]: function forEachChildInMissingDeclaration<T>(node: MissingDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers);
    },
    [SyntaxKind.CommaListExpression]: function forEachChildInCommaListExpression<T>(node: CommaListExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [SyntaxKind.JsxElement]: function forEachChildInJsxElement<T>(node: JsxElement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingElement) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingElement);
    },
    [SyntaxKind.JsxFragment]: function forEachChildInJsxFragment<T>(node: JsxFragment, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingFragment) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingFragment);
    },
    [SyntaxKind.JsxSelfClosingElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [SyntaxKind.JsxOpeningElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [SyntaxKind.JsxAttributes]: function forEachChildInJsxAttributes<T>(node: JsxAttributes, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    },
    [SyntaxKind.JsxAttribute]: function forEachChildInJsxAttribute<T>(node: JsxAttribute, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [SyntaxKind.JsxSpreadAttribute]: function forEachChildInJsxSpreadAttribute<T>(node: JsxSpreadAttribute, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [SyntaxKind.JsxExpression]: function forEachChildInJsxExpression<T>(node: JsxExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.expression);
    },
    [SyntaxKind.JsxClosingElement]: function forEachChildInJsxClosingElement<T>(node: JsxClosingElement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName);
    },
    [SyntaxKind.JsxNamespacedName]: function forEachChildInJsxNamespacedName<T>(node: JsxNamespacedName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.namespace) ||
            visitNode(cbNode, node.name);
    },
    [SyntaxKind.OptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.RestType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocTypeExpression]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocNonNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocOptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocVariadicType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocFunctionType]: function forEachChildInJSDocFunctionType<T>(node: JSDocFunctionType, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.JSDoc]: function forEachChildInJSDoc<T>(node: JSDoc, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
            || visitNodes(cbNode, cbNodes, node.tags);
    },
    [SyntaxKind.JSDocSeeTag]: function forEachChildInJSDocSeeTag<T>(node: JSDocSeeTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.name) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocNameReference]: function forEachChildInJSDocNameReference<T>(node: JSDocNameReference, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [SyntaxKind.JSDocMemberName]: function forEachChildInJSDocMemberName<T>(node: JSDocMemberName, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    },
    [SyntaxKind.JSDocParameterTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocPropertyTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocAuthorTag]: function forEachChildInJSDocAuthorTag<T>(node: JSDocAuthorTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocImplementsTag]: function forEachChildInJSDocImplementsTag<T>(node: JSDocImplementsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocAugmentsTag]: function forEachChildInJSDocAugmentsTag<T>(node: JSDocAugmentsTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocTemplateTag]: function forEachChildInJSDocTemplateTag<T>(node: JSDocTemplateTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.constraint) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocTypedefTag]: function forEachChildInJSDocTypedefTag<T>(node: JSDocTypedefTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (node.typeExpression &&
                    node.typeExpression.kind === SyntaxKind.JSDocTypeExpression
                ? visitNode(cbNode, node.typeExpression) ||
                    visitNode(cbNode, node.fullName) ||
                    (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
                : visitNode(cbNode, node.fullName) ||
                    visitNode(cbNode, node.typeExpression) ||
                    (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment)));
    },
    [SyntaxKind.JSDocCallbackTag]: function forEachChildInJSDocCallbackTag<T>(node: JSDocCallbackTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.fullName) ||
            visitNode(cbNode, node.typeExpression) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [SyntaxKind.JSDocReturnTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocTypeTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThisTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocEnumTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocSatisfiesTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThrowsTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocOverloadTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocSignature]: function forEachChildInJSDocSignature<T>(node: JSDocSignature, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return forEach(node.typeParameters, cbNode) ||
            forEach(node.parameters, cbNode) ||
            visitNode(cbNode, node.type);
    },
    [SyntaxKind.JSDocLink]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkCode]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkPlain]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocTypeLiteral]: function forEachChildInJSDocTypeLiteral<T>(node: JSDocTypeLiteral, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
        return forEach(node.jsDocPropertyTags, cbNode);
    },
    [SyntaxKind.JSDocTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocClassTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocPublicTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocPrivateTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocProtectedTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocReadonlyTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocDeprecatedTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocOverrideTag]: forEachChildInJSDocTag,
    [SyntaxKind.JSDocImportTag]: forEachChildInJSDocImportTag,
    [SyntaxKind.PartiallyEmittedExpression]: forEachChildInPartiallyEmittedExpression,
};

// shared

function forEachChildInCallOrConstructSignature<T>(node: CallSignatureDeclaration | ConstructSignatureDeclaration, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.parameters) ||
        visitNode(cbNode, node.type);
}

function forEachChildInUnionOrIntersectionType<T>(node: UnionTypeNode | IntersectionTypeNode, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.types);
}

function forEachChildInParenthesizedTypeOrTypeOperator<T>(node: ParenthesizedTypeNode | TypeOperatorNode, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.type);
}

function forEachChildInObjectOrArrayBindingPattern<T>(node: BindingPattern, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.elements);
}

function forEachChildInCallOrNewExpression<T>(node: CallExpression | NewExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.expression) ||
        // TODO: should we separate these branches out?
        visitNode(cbNode, (node as CallExpression).questionDotToken) ||
        visitNodes(cbNode, cbNodes, node.typeArguments) ||
        visitNodes(cbNode, cbNodes, node.arguments);
}

function forEachChildInBlock<T>(node: Block | ModuleBlock, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.statements);
}

function forEachChildInContinueOrBreakStatement<T>(node: ContinueStatement | BreakStatement, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.label);
}

function forEachChildInClassDeclarationOrExpression<T>(node: ClassDeclaration | ClassExpression, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.modifiers) ||
        visitNode(cbNode, node.name) ||
        visitNodes(cbNode, cbNodes, node.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.heritageClauses) ||
        visitNodes(cbNode, cbNodes, node.members);
}

function forEachChildInNamedImportsOrExports<T>(node: NamedImports | NamedExports, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.elements);
}

function forEachChildInImportOrExportSpecifier<T>(node: ImportSpecifier | ExportSpecifier, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.propertyName) ||
        visitNode(cbNode, node.name);
}

function forEachChildInJsxOpeningOrSelfClosingElement<T>(node: JsxOpeningLikeElement, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        visitNodes(cbNode, cbNodes, node.typeArguments) ||
        visitNode(cbNode, node.attributes);
}

function forEachChildInOptionalRestOrJSDocParameterModifier<T>(node: OptionalTypeNode | RestTypeNode | JSDocTypeExpression | JSDocNullableType | JSDocNonNullableType | JSDocOptionalType | JSDocVariadicType, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.type);
}

function forEachChildInJSDocParameterOrPropertyTag<T>(node: JSDocParameterTag | JSDocPropertyTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        (node.isNameFirst
            ? visitNode(cbNode, node.name) || visitNode(cbNode, node.typeExpression)
            : visitNode(cbNode, node.typeExpression) || visitNode(cbNode, node.name)) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocTypeLikeTag<T>(node: JSDocReturnTag | JSDocTypeTag | JSDocThisTag | JSDocEnumTag | JSDocThrowsTag | JSDocOverloadTag | JSDocSatisfiesTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        visitNode(cbNode, node.typeExpression) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocLinkCodeOrPlain<T>(node: JSDocLink | JSDocLinkCode | JSDocLinkPlain, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.name);
}

function forEachChildInJSDocTag<T>(node: JSDocUnknownTag | JSDocClassTag | JSDocPublicTag | JSDocPrivateTag | JSDocProtectedTag | JSDocReadonlyTag | JSDocDeprecatedTag | JSDocOverrideTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName)
        || (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocImportTag<T>(node: JSDocImportTag, cbNode: (node: Node) => T | undefined, cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName)
        || visitNode(cbNode, node.importClause)
        || visitNode(cbNode, node.moduleSpecifier)
        || visitNode(cbNode, node.attributes)
        || (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInPartiallyEmittedExpression<T>(node: PartiallyEmittedExpression, cbNode: (node: Node) => T | undefined, _cbNodes?: (nodes: NodeArray<Node>) => T | undefined): T | undefined {
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
    if (node === undefined || node.kind <= SyntaxKind.LastToken) {
        return;
    }
    const fn = (forEachChildTable as Record<SyntaxKind, ForEachChildFunction<any>>)[node.kind];
    return fn === undefined ? undefined : fn(node, cbNode, cbNodes);
}

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
 *
 * @internal
 */
export function forEachChildRecursively<T>(rootNode: Node, cbNode: (node: Node, parent: Node) => T | "skip" | undefined, cbNodes?: (nodes: NodeArray<Node>, parent: Node) => T | "skip" | undefined): T | undefined {
    const queue: (Node | NodeArray<Node>)[] = gatherPossibleChildren(rootNode);
    const parents: Node[] = []; // tracks parent references for elements in queue
    while (parents.length < queue.length) {
        parents.push(rootNode);
    }
    while (queue.length !== 0) {
        const current = queue.pop()!;
        const parent = parents.pop()!;
        if (isArray(current)) {
            if (cbNodes) {
                const res = cbNodes(current, parent);
                if (res) {
                    if (res === "skip") continue;
                    return res;
                }
            }
            for (let i = current.length - 1; i >= 0; --i) {
                queue.push(current[i]);
                parents.push(parent);
            }
        }
        else {
            const res = cbNode(current, parent);
            if (res) {
                if (res === "skip") continue;
                return res;
            }
            if (current.kind >= SyntaxKind.FirstNode) {
                // add children in reverse order to the queue, so popping gives the first child
                for (const child of gatherPossibleChildren(current)) {
                    queue.push(child);
                    parents.push(current);
                }
            }
        }
    }
}

function gatherPossibleChildren(node: Node) {
    const children: (Node | NodeArray<Node>)[] = [];
    forEachChild(node, addWorkItem, addWorkItem); // By using a stack above and `unshift` here, we emulate a depth-first preorder traversal
    return children;

    function addWorkItem(n: Node | NodeArray<Node>) {
        children.unshift(n);
    }
}
