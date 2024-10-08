import {
    AstArrayLiteralExpression,
    AstArrayTypeNode,
    AstArrowFunction,
    AstAsExpression,
    AstAwaitExpression,
    AstBinaryExpression,
    AstBindingElement,
    AstBindingPattern,
    AstBlock,
    AstBreakStatement,
    AstCallExpression,
    AstCallSignatureDeclaration,
    AstCaseBlock,
    AstCaseClause,
    AstCatchClause,
    AstClassDeclaration,
    AstClassExpression,
    AstClassStaticBlockDeclaration,
    AstCommaListExpression,
    AstComputedPropertyName,
    AstConditionalExpression,
    AstConditionalTypeNode,
    AstConstructorDeclaration,
    AstConstructorTypeNode,
    AstConstructSignatureDeclaration,
    AstContinueStatement,
    AstDecorator,
    AstDefaultClause,
    AstDeleteExpression,
    AstDoStatement,
    AstElementAccessExpression,
    AstEnumDeclaration,
    AstEnumMember,
    AstExportAssignment,
    AstExportDeclaration,
    AstExportSpecifier,
    AstExpressionStatement,
    AstExpressionWithTypeArguments,
    AstExternalModuleReference,
    AstForEachChildNodes,
    AstForInStatement,
    AstForOfStatement,
    AstForStatement,
    AstFunctionDeclaration,
    AstFunctionExpression,
    AstFunctionTypeNode,
    AstGetAccessorDeclaration,
    AstHeritageClause,
    AstIfStatement,
    AstImportAttribute,
    AstImportAttributes,
    AstImportClause,
    AstImportDeclaration,
    AstImportEqualsDeclaration,
    AstImportSpecifier,
    AstImportTypeAssertionContainer,
    AstImportTypeNode,
    AstIndexedAccessTypeNode,
    AstIndexSignatureDeclaration,
    AstInferTypeNode,
    AstInterfaceDeclaration,
    AstIntersectionTypeNode,
    AstJSDoc,
    AstJSDocAugmentsTag,
    AstJSDocAuthorTag,
    AstJSDocCallbackTag,
    AstJSDocClassTag,
    AstJSDocDeprecatedTag,
    AstJSDocEnumTag,
    AstJSDocFunctionType,
    AstJSDocImplementsTag,
    AstJSDocImportTag,
    AstJSDocLink,
    AstJSDocLinkCode,
    AstJSDocLinkPlain,
    AstJSDocMemberName,
    AstJSDocNameReference,
    AstJSDocNonNullableType,
    AstJSDocNullableType,
    AstJSDocOptionalType,
    AstJSDocOverloadTag,
    AstJSDocOverrideTag,
    AstJSDocParameterTag,
    AstJSDocPrivateTag,
    AstJSDocPropertyTag,
    AstJSDocProtectedTag,
    AstJSDocPublicTag,
    AstJSDocReadonlyTag,
    AstJSDocReturnTag,
    AstJSDocSatisfiesTag,
    AstJSDocSeeTag,
    AstJSDocSignature,
    AstJSDocTemplateTag,
    AstJSDocThisTag,
    AstJSDocThrowsTag,
    AstJSDocTypedefTag,
    AstJSDocTypeExpression,
    AstJSDocTypeLiteral,
    AstJSDocTypeTag,
    AstJSDocUnknownTag,
    AstJSDocVariadicType,
    AstJsxAttribute,
    AstJsxAttributes,
    AstJsxClosingElement,
    AstJsxElement,
    AstJsxExpression,
    AstJsxFragment,
    AstJsxNamespacedName,
    AstJsxOpeningLikeElement,
    AstJsxSpreadAttribute,
    AstLabeledStatement,
    AstLiteralTypeNode,
    AstMappedTypeNode,
    AstMetaProperty,
    AstMethodDeclaration,
    AstMethodSignature,
    AstMissingDeclaration,
    AstModuleBlock,
    AstModuleDeclaration,
    AstNamedExports,
    AstNamedImports,
    AstNamedTupleMember,
    AstNamespaceExport,
    AstNamespaceExportDeclaration,
    AstNamespaceImport,
    AstNewExpression,
    AstNode,
    AstNodeArray,
    AstNonNullExpression,
    AstObjectLiteralExpression,
    AstOptionalTypeNode,
    AstParameterDeclaration,
    AstParenthesizedExpression,
    AstParenthesizedTypeNode,
    AstPartiallyEmittedExpression,
    AstPostfixUnaryExpression,
    AstPrefixUnaryExpression,
    AstPropertyAccessExpression,
    AstPropertyAssignment,
    AstPropertyDeclaration,
    AstPropertySignature,
    AstQualifiedName,
    AstRestTypeNode,
    AstReturnStatement,
    AstSatisfiesExpression,
    AstSetAccessorDeclaration,
    AstShorthandPropertyAssignment,
    AstSourceFile,
    AstSpreadAssignment,
    AstSpreadElement,
    AstSwitchStatement,
    AstTaggedTemplateExpression,
    AstTemplateExpression,
    AstTemplateLiteralTypeNode,
    AstTemplateLiteralTypeSpan,
    AstTemplateSpan,
    AstThrowStatement,
    AstTryStatement,
    AstTupleTypeNode,
    AstTypeAliasDeclaration,
    AstTypeAssertion,
    AstTypeLiteralNode,
    AstTypeOfExpression,
    AstTypeOperatorNode,
    AstTypeParameterDeclaration,
    AstTypePredicateNode,
    AstTypeQueryNode,
    AstTypeReferenceNode,
    AstUnionTypeNode,
    AstVariableDeclaration,
    AstVariableDeclarationList,
    AstVariableStatement,
    AstVoidExpression,
    AstWhileStatement,
    AstWithStatement,
    AstYieldExpression,
    forEach,
    SyntaxKind,
} from "./_namespaces/ts.js";

function visitNode<T>(cbNode: (node: AstNode) => T, node: AstNode | undefined): T | undefined {
    return node && cbNode(node);
}

function visitNodes<T>(cbNode: (node: AstNode) => T, cbNodes: ((node: AstNodeArray<AstNode>) => T | undefined) | undefined, nodes: AstNodeArray<AstNode> | undefined): T | undefined {
    if (nodes) {
        if (cbNodes) {
            return cbNodes(nodes);
        }
        for (const node of nodes.items) {
            const result = cbNode(node);
            if (result) {
                return result;
            }
        }
    }
}

type AstForEachChildFunction<TNode> = <T>(node: TNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined) => T | undefined;
type AstForEachChildTable = { [TNode in AstForEachChildNodes as TNode["kind"]]: AstForEachChildFunction<TNode>; };

const astForEachChildTable: AstForEachChildTable = {
    [SyntaxKind.QualifiedName]: function forEachChildInQualifiedName<T>(node: AstQualifiedName, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.left) ||
            visitNode(cbNode, node.data.right);
    },
    [SyntaxKind.TypeParameter]: function forEachChildInTypeParameter<T>(node: AstTypeParameterDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.constraint) ||
            visitNode(cbNode, node.data.default) ||
            visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.ShorthandPropertyAssignment]: function forEachChildInShorthandPropertyAssignment<T>(node: AstShorthandPropertyAssignment, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.exclamationToken) ||
            visitNode(cbNode, node.data.equalsToken) ||
            visitNode(cbNode, node.data.objectAssignmentInitializer);
    },
    [SyntaxKind.SpreadAssignment]: function forEachChildInSpreadAssignment<T>(node: AstSpreadAssignment, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.Parameter]: function forEachChildInParameter<T>(node: AstParameterDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.dotDotDotToken) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.PropertyDeclaration]: function forEachChildInPropertyDeclaration<T>(node: AstPropertyDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.exclamationToken) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.PropertySignature]: function forEachChildInPropertySignature<T>(node: AstPropertySignature, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.PropertyAssignment]: function forEachChildInPropertyAssignment<T>(node: AstPropertyAssignment, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.exclamationToken) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.VariableDeclaration]: function forEachChildInVariableDeclaration<T>(node: AstVariableDeclaration, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.exclamationToken) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.BindingElement]: function forEachChildInBindingElement<T>(node: AstBindingElement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.dotDotDotToken) ||
            visitNode(cbNode, node.data.propertyName) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.IndexSignature]: function forEachChildInIndexSignature<T>(node: AstIndexSignatureDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.ConstructorType]: function forEachChildInConstructorType<T>(node: AstConstructorTypeNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.FunctionType]: function forEachChildInFunctionType<T>(node: AstFunctionTypeNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.CallSignature]: forEachChildInCallOrConstructSignature,
    [SyntaxKind.ConstructSignature]: forEachChildInCallOrConstructSignature,
    [SyntaxKind.MethodDeclaration]: function forEachChildInMethodDeclaration<T>(node: AstMethodDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.asteriskToken) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.exclamationToken) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.MethodSignature]: function forEachChildInMethodSignature<T>(node: AstMethodSignature, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.Constructor]: function forEachChildInConstructor<T>(node: AstConstructorDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.GetAccessor]: function forEachChildInGetAccessor<T>(node: AstGetAccessorDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.SetAccessor]: function forEachChildInSetAccessor<T>(node: AstSetAccessorDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.FunctionDeclaration]: function forEachChildInFunctionDeclaration<T>(node: AstFunctionDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.asteriskToken) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.FunctionExpression]: function forEachChildInFunctionExpression<T>(node: AstFunctionExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.asteriskToken) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.ArrowFunction]: function forEachChildInArrowFunction<T>(node: AstArrowFunction, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.equalsGreaterThanToken) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.ClassStaticBlockDeclaration]: function forEachChildInClassStaticBlockDeclaration<T>(node: AstClassStaticBlockDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.TypeReference]: function forEachChildInTypeReference<T>(node: AstTypeReferenceNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.typeName) ||
            visitNodes(cbNode, cbNodes, node.data.typeArguments);
    },
    [SyntaxKind.TypePredicate]: function forEachChildInTypePredicate<T>(node: AstTypePredicateNode, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.assertsModifier) ||
            visitNode(cbNode, node.data.parameterName) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.TypeQuery]: function forEachChildInTypeQuery<T>(node: AstTypeQueryNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.exprName) ||
            visitNodes(cbNode, cbNodes, node.data.typeArguments);
    },
    [SyntaxKind.TypeLiteral]: function forEachChildInTypeLiteral<T>(node: AstTypeLiteralNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.members);
    },
    [SyntaxKind.ArrayType]: function forEachChildInArrayType<T>(node: AstArrayTypeNode, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.elementType);
    },
    [SyntaxKind.TupleType]: function forEachChildInTupleType<T>(node: AstTupleTypeNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.elements);
    },
    [SyntaxKind.UnionType]: forEachChildInUnionOrIntersectionType,
    [SyntaxKind.IntersectionType]: forEachChildInUnionOrIntersectionType,
    [SyntaxKind.ConditionalType]: function forEachChildInConditionalType<T>(node: AstConditionalTypeNode, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.checkType) ||
            visitNode(cbNode, node.data.extendsType) ||
            visitNode(cbNode, node.data.trueType) ||
            visitNode(cbNode, node.data.falseType);
    },
    [SyntaxKind.InferType]: function forEachChildInInferType<T>(node: AstInferTypeNode, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.typeParameter);
    },
    [SyntaxKind.ImportType]: function forEachChildInImportType<T>(node: AstImportTypeNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.argument) ||
            visitNode(cbNode, node.data.attributes) ||
            visitNode(cbNode, node.data.qualifier) ||
            visitNodes(cbNode, cbNodes, node.data.typeArguments);
    },
    [SyntaxKind.ImportTypeAssertionContainer]: function forEachChildInImportTypeAssertionContainer<T>(node: AstImportTypeAssertionContainer, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.assertClause);
    },
    [SyntaxKind.ParenthesizedType]: forEachChildInParenthesizedTypeOrTypeOperator,
    [SyntaxKind.TypeOperator]: forEachChildInParenthesizedTypeOrTypeOperator,
    [SyntaxKind.IndexedAccessType]: function forEachChildInIndexedAccessType<T>(node: AstIndexedAccessTypeNode, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.objectType) ||
            visitNode(cbNode, node.data.indexType);
    },
    [SyntaxKind.MappedType]: function forEachChildInMappedType<T>(node: AstMappedTypeNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.readonlyToken) ||
            visitNode(cbNode, node.data.typeParameter) ||
            visitNode(cbNode, node.data.nameType) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.type) ||
            visitNodes(cbNode, cbNodes, node.data.members);
    },
    [SyntaxKind.LiteralType]: function forEachChildInLiteralType<T>(node: AstLiteralTypeNode, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.literal);
    },
    [SyntaxKind.NamedTupleMember]: function forEachChildInNamedTupleMember<T>(node: AstNamedTupleMember, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.dotDotDotToken) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.ObjectBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [SyntaxKind.ArrayBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [SyntaxKind.ArrayLiteralExpression]: function forEachChildInArrayLiteralExpression<T>(node: AstArrayLiteralExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.elements);
    },
    [SyntaxKind.ObjectLiteralExpression]: function forEachChildInObjectLiteralExpression<T>(node: AstObjectLiteralExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.properties);
    },
    [SyntaxKind.PropertyAccessExpression]: function forEachChildInPropertyAccessExpression<T>(node: AstPropertyAccessExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.questionDotToken) ||
            visitNode(cbNode, node.data.name);
    },
    [SyntaxKind.ElementAccessExpression]: function forEachChildInElementAccessExpression<T>(node: AstElementAccessExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.questionDotToken) ||
            visitNode(cbNode, node.data.argumentExpression);
    },
    [SyntaxKind.CallExpression]: function forEachChildInCallExpression<T>(node: AstCallExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.questionDotToken) ||
            visitNodes(cbNode, cbNodes, node.data.typeArguments) ||
            visitNodes(cbNode, cbNodes, node.data.arguments);
    },
    [SyntaxKind.NewExpression]: function forEachChildInNewExpression<T>(node: AstNewExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNodes(cbNode, cbNodes, node.data.typeArguments) ||
            visitNodes(cbNode, cbNodes, node.data.arguments);
    },
    [SyntaxKind.TaggedTemplateExpression]: function forEachChildInTaggedTemplateExpression<T>(node: AstTaggedTemplateExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tag) ||
            visitNode(cbNode, node.data.questionDotToken) ||
            visitNodes(cbNode, cbNodes, node.data.typeArguments) ||
            visitNode(cbNode, node.data.template);
    },
    [SyntaxKind.TypeAssertionExpression]: function forEachChildInTypeAssertionExpression<T>(node: AstTypeAssertion, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.ParenthesizedExpression]: function forEachChildInParenthesizedExpression<T>(node: AstParenthesizedExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.DeleteExpression]: function forEachChildInDeleteExpression<T>(node: AstDeleteExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.TypeOfExpression]: function forEachChildInTypeOfExpression<T>(node: AstTypeOfExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.VoidExpression]: function forEachChildInVoidExpression<T>(node: AstVoidExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.PrefixUnaryExpression]: function forEachChildInPrefixUnaryExpression<T>(node: AstPrefixUnaryExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.operand);
    },
    [SyntaxKind.YieldExpression]: function forEachChildInYieldExpression<T>(node: AstYieldExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.asteriskToken) ||
            visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.AwaitExpression]: function forEachChildInAwaitExpression<T>(node: AstAwaitExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.PostfixUnaryExpression]: function forEachChildInPostfixUnaryExpression<T>(node: AstPostfixUnaryExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.operand);
    },
    [SyntaxKind.BinaryExpression]: function forEachChildInBinaryExpression<T>(node: AstBinaryExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.left) ||
            visitNode(cbNode, node.data.operatorToken) ||
            visitNode(cbNode, node.data.right);
    },
    [SyntaxKind.AsExpression]: function forEachChildInAsExpression<T>(node: AstAsExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.NonNullExpression]: function forEachChildInNonNullExpression<T>(node: AstNonNullExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.SatisfiesExpression]: function forEachChildInSatisfiesExpression<T>(node: AstSatisfiesExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) || visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.MetaProperty]: function forEachChildInMetaProperty<T>(node: AstMetaProperty, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name);
    },
    [SyntaxKind.ConditionalExpression]: function forEachChildInConditionalExpression<T>(node: AstConditionalExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.condition) ||
            visitNode(cbNode, node.data.questionToken) ||
            visitNode(cbNode, node.data.whenTrue) ||
            visitNode(cbNode, node.data.colonToken) ||
            visitNode(cbNode, node.data.whenFalse);
    },
    [SyntaxKind.SpreadElement]: function forEachChildInSpreadElement<T>(node: AstSpreadElement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.Block]: forEachChildInBlock,
    [SyntaxKind.ModuleBlock]: forEachChildInBlock,
    [SyntaxKind.SourceFile]: function forEachChildInSourceFile<T>(node: AstSourceFile, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.statements) ||
            visitNode(cbNode, node.data.endOfFileToken);
    },
    [SyntaxKind.VariableStatement]: function forEachChildInVariableStatement<T>(node: AstVariableStatement, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.declarationList);
    },
    [SyntaxKind.VariableDeclarationList]: function forEachChildInVariableDeclarationList<T>(node: AstVariableDeclarationList, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.declarations);
    },
    [SyntaxKind.ExpressionStatement]: function forEachChildInExpressionStatement<T>(node: AstExpressionStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.IfStatement]: function forEachChildInIfStatement<T>(node: AstIfStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.thenStatement) ||
            visitNode(cbNode, node.data.elseStatement);
    },
    [SyntaxKind.DoStatement]: function forEachChildInDoStatement<T>(node: AstDoStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.statement) ||
            visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.WhileStatement]: function forEachChildInWhileStatement<T>(node: AstWhileStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.statement);
    },
    [SyntaxKind.ForStatement]: function forEachChildInForStatement<T>(node: AstForStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.initializer) ||
            visitNode(cbNode, node.data.condition) ||
            visitNode(cbNode, node.data.incrementor) ||
            visitNode(cbNode, node.data.statement);
    },
    [SyntaxKind.ForInStatement]: function forEachChildInForInStatement<T>(node: AstForInStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.initializer) ||
            visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.statement);
    },
    [SyntaxKind.ForOfStatement]: function forEachChildInForOfStatement<T>(node: AstForOfStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.awaitModifier) ||
            visitNode(cbNode, node.data.initializer) ||
            visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.statement);
    },
    [SyntaxKind.ContinueStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.BreakStatement]: forEachChildInContinueOrBreakStatement,
    [SyntaxKind.ReturnStatement]: function forEachChildInReturnStatement<T>(node: AstReturnStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.WithStatement]: function forEachChildInWithStatement<T>(node: AstWithStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.statement);
    },
    [SyntaxKind.SwitchStatement]: function forEachChildInSwitchStatement<T>(node: AstSwitchStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.caseBlock);
    },
    [SyntaxKind.CaseBlock]: function forEachChildInCaseBlock<T>(node: AstCaseBlock, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.clauses);
    },
    [SyntaxKind.CaseClause]: function forEachChildInCaseClause<T>(node: AstCaseClause, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNodes(cbNode, cbNodes, node.data.statements);
    },
    [SyntaxKind.DefaultClause]: function forEachChildInDefaultClause<T>(node: AstDefaultClause, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.statements);
    },
    [SyntaxKind.LabeledStatement]: function forEachChildInLabeledStatement<T>(node: AstLabeledStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.label) ||
            visitNode(cbNode, node.data.statement);
    },
    [SyntaxKind.ThrowStatement]: function forEachChildInThrowStatement<T>(node: AstThrowStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.TryStatement]: function forEachChildInTryStatement<T>(node: AstTryStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tryBlock) ||
            visitNode(cbNode, node.data.catchClause) ||
            visitNode(cbNode, node.data.finallyBlock);
    },
    [SyntaxKind.CatchClause]: function forEachChildInCatchClause<T>(node: AstCatchClause, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.variableDeclaration) ||
            visitNode(cbNode, node.data.block);
    },
    [SyntaxKind.Decorator]: function forEachChildInDecorator<T>(node: AstDecorator, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.ClassDeclaration]: forEachChildInClassDeclarationOrExpression,
    [SyntaxKind.ClassExpression]: forEachChildInClassDeclarationOrExpression,
    [SyntaxKind.InterfaceDeclaration]: function forEachChildInInterfaceDeclaration<T>(node: AstInterfaceDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.heritageClauses) ||
            visitNodes(cbNode, cbNodes, node.data.members);
    },
    [SyntaxKind.TypeAliasDeclaration]: function forEachChildInTypeAliasDeclaration<T>(node: AstTypeAliasDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.EnumDeclaration]: function forEachChildInEnumDeclaration<T>(node: AstEnumDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.members);
    },
    [SyntaxKind.EnumMember]: function forEachChildInEnumMember<T>(node: AstEnumMember, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.ModuleDeclaration]: function forEachChildInModuleDeclaration<T>(node: AstModuleDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.body);
    },
    [SyntaxKind.ImportEqualsDeclaration]: function forEachChildInImportEqualsDeclaration<T>(node: AstImportEqualsDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.moduleReference);
    },
    [SyntaxKind.ImportDeclaration]: function forEachChildInImportDeclaration<T>(node: AstImportDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.importClause) ||
            visitNode(cbNode, node.data.moduleSpecifier) ||
            visitNode(cbNode, node.data.attributes);
    },
    [SyntaxKind.ImportClause]: function forEachChildInImportClause<T>(node: AstImportClause, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.namedBindings);
    },
    [SyntaxKind.ImportAttributes]: function forEachChildInImportAttributes<T>(node: AstImportAttributes, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.elements);
    },
    [SyntaxKind.ImportAttribute]: function forEachChildInImportAttribute<T>(node: AstImportAttribute, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.value);
    },
    [SyntaxKind.NamespaceExportDeclaration]: function forEachChildInNamespaceExportDeclaration<T>(node: AstNamespaceExportDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.name);
    },
    [SyntaxKind.NamespaceImport]: function forEachChildInNamespaceImport<T>(node: AstNamespaceImport, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name);
    },
    [SyntaxKind.NamespaceExport]: function forEachChildInNamespaceExport<T>(node: AstNamespaceExport, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name);
    },
    [SyntaxKind.NamedImports]: forEachChildInNamedImportsOrExports,
    [SyntaxKind.NamedExports]: forEachChildInNamedImportsOrExports,
    [SyntaxKind.ExportDeclaration]: function forEachChildInExportDeclaration<T>(node: AstExportDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.exportClause) ||
            visitNode(cbNode, node.data.moduleSpecifier) ||
            visitNode(cbNode, node.data.attributes);
    },
    [SyntaxKind.ImportSpecifier]: forEachChildInImportOrExportSpecifier,
    [SyntaxKind.ExportSpecifier]: forEachChildInImportOrExportSpecifier,
    [SyntaxKind.ExportAssignment]: function forEachChildInExportAssignment<T>(node: AstExportAssignment, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
            visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.TemplateExpression]: function forEachChildInTemplateExpression<T>(node: AstTemplateExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.head) ||
            visitNodes(cbNode, cbNodes, node.data.templateSpans);
    },
    [SyntaxKind.TemplateSpan]: function forEachChildInTemplateSpan<T>(node: AstTemplateSpan, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNode(cbNode, node.data.literal);
    },
    [SyntaxKind.TemplateLiteralType]: function forEachChildInTemplateLiteralType<T>(node: AstTemplateLiteralTypeNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.head) ||
            visitNodes(cbNode, cbNodes, node.data.templateSpans);
    },
    [SyntaxKind.TemplateLiteralTypeSpan]: function forEachChildInTemplateLiteralTypeSpan<T>(node: AstTemplateLiteralTypeSpan, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.type) ||
            visitNode(cbNode, node.data.literal);
    },
    [SyntaxKind.ComputedPropertyName]: function forEachChildInComputedPropertyName<T>(node: AstComputedPropertyName, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.HeritageClause]: function forEachChildInHeritageClause<T>(node: AstHeritageClause, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.types);
    },
    [SyntaxKind.ExpressionWithTypeArguments]: function forEachChildInExpressionWithTypeArguments<T>(node: AstExpressionWithTypeArguments, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression) ||
            visitNodes(cbNode, cbNodes, node.data.typeArguments);
    },
    [SyntaxKind.ExternalModuleReference]: function forEachChildInExternalModuleReference<T>(node: AstExternalModuleReference, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.MissingDeclaration]: function forEachChildInMissingDeclaration<T>(node: AstMissingDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.modifiers);
    },
    [SyntaxKind.CommaListExpression]: function forEachChildInCommaListExpression<T>(node: AstCommaListExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.elements);
    },
    [SyntaxKind.JsxElement]: function forEachChildInJsxElement<T>(node: AstJsxElement, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.openingElement) ||
            visitNodes(cbNode, cbNodes, node.data.children) ||
            visitNode(cbNode, node.data.closingElement);
    },
    [SyntaxKind.JsxFragment]: function forEachChildInJsxFragment<T>(node: AstJsxFragment, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.openingFragment) ||
            visitNodes(cbNode, cbNodes, node.data.children) ||
            visitNode(cbNode, node.data.closingFragment);
    },
    [SyntaxKind.JsxSelfClosingElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [SyntaxKind.JsxOpeningElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [SyntaxKind.JsxAttributes]: function forEachChildInJsxAttributes<T>(node: AstJsxAttributes, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.properties);
    },
    [SyntaxKind.JsxAttribute]: function forEachChildInJsxAttribute<T>(node: AstJsxAttribute, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name) ||
            visitNode(cbNode, node.data.initializer);
    },
    [SyntaxKind.JsxSpreadAttribute]: function forEachChildInJsxSpreadAttribute<T>(node: AstJsxSpreadAttribute, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.JsxExpression]: function forEachChildInJsxExpression<T>(node: AstJsxExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.dotDotDotToken) ||
            visitNode(cbNode, node.data.expression);
    },
    [SyntaxKind.JsxClosingElement]: function forEachChildInJsxClosingElement<T>(node: AstJsxClosingElement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName);
    },
    [SyntaxKind.JsxNamespacedName]: function forEachChildInJsxNamespacedName<T>(node: AstJsxNamespacedName, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.namespace) ||
            visitNode(cbNode, node.data.name);
    },
    [SyntaxKind.OptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.RestType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocTypeExpression]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocNonNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocOptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocVariadicType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [SyntaxKind.JSDocFunctionType]: function forEachChildInJSDocFunctionType<T>(node: AstJSDocFunctionType, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.parameters) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.JSDoc]: function forEachChildInJSDoc<T>(node: AstJSDoc, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.data.commentArray)
            || visitNodes(cbNode, cbNodes, node.data.tags);
    },
    [SyntaxKind.JSDocSeeTag]: function forEachChildInJSDocSeeTag<T>(node: AstJSDocSeeTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName) ||
            visitNode(cbNode, node.data.name) ||
            visitNodes(cbNode, cbNodes, node.data.commentArray);
    },
    [SyntaxKind.JSDocNameReference]: function forEachChildInJSDocNameReference<T>(node: AstJSDocNameReference, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.name);
    },
    [SyntaxKind.JSDocMemberName]: function forEachChildInJSDocMemberName<T>(node: AstJSDocMemberName, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.left) ||
            visitNode(cbNode, node.data.right);
    },
    [SyntaxKind.JSDocParameterTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocPropertyTag]: forEachChildInJSDocParameterOrPropertyTag,
    [SyntaxKind.JSDocAuthorTag]: function forEachChildInJSDocAuthorTag<T>(node: AstJSDocAuthorTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName) ||
            visitNodes(cbNode, cbNodes, node.data.commentArray);
    },
    [SyntaxKind.JSDocImplementsTag]: function forEachChildInJSDocImplementsTag<T>(node: AstJSDocImplementsTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName) ||
            visitNode(cbNode, node.data.class) ||
            visitNodes(cbNode, cbNodes, node.data.commentArray);
    },
    [SyntaxKind.JSDocAugmentsTag]: function forEachChildInJSDocAugmentsTag<T>(node: AstJSDocAugmentsTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName) ||
            visitNode(cbNode, node.data.class) ||
            visitNodes(cbNode, cbNodes, node.data.commentArray);
    },
    [SyntaxKind.JSDocTemplateTag]: function forEachChildInJSDocTemplateTag<T>(node: AstJSDocTemplateTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName) ||
            visitNode(cbNode, node.data.constraint) ||
            visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.data.commentArray);
    },
    [SyntaxKind.JSDocTypedefTag]: function forEachChildInJSDocTypedefTag<T>(node: AstJSDocTypedefTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName) ||
            (node.data.typeExpression &&
                    node.data.typeExpression.kind === SyntaxKind.JSDocTypeExpression
                ? visitNode(cbNode, node.data.typeExpression) ||
                    visitNode(cbNode, node.data.fullName) ||
                    visitNodes(cbNode, cbNodes, node.data.commentArray)
                : visitNode(cbNode, node.data.fullName) ||
                    visitNode(cbNode, node.data.typeExpression) ||
                    visitNodes(cbNode, cbNodes, node.data.commentArray));
    },
    [SyntaxKind.JSDocCallbackTag]: function forEachChildInJSDocCallbackTag<T>(node: AstJSDocCallbackTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.data.tagName) ||
            visitNode(cbNode, node.data.fullName) ||
            visitNode(cbNode, node.data.typeExpression) ||
            visitNodes(cbNode, cbNodes, node.data.commentArray);
    },
    [SyntaxKind.JSDocReturnTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocTypeTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThisTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocEnumTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocSatisfiesTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocThrowsTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocOverloadTag]: forEachChildInJSDocTypeLikeTag,
    [SyntaxKind.JSDocSignature]: function forEachChildInJSDocSignature<T>(node: AstJSDocSignature, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return forEach(node.data.typeParameters?.items, cbNode) ||
            forEach(node.data.parameters.items, cbNode) ||
            visitNode(cbNode, node.data.type);
    },
    [SyntaxKind.JSDocLink]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkCode]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocLinkPlain]: forEachChildInJSDocLinkCodeOrPlain,
    [SyntaxKind.JSDocTypeLiteral]: function forEachChildInJSDocTypeLiteral<T>(node: AstJSDocTypeLiteral, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
        return forEach(node.data.jsDocPropertyTags?.items, cbNode);
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

function forEachChildInCallOrConstructSignature<T>(node: AstCallSignatureDeclaration | AstConstructSignatureDeclaration, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.data.parameters) ||
        visitNode(cbNode, node.data.type);
}

function forEachChildInUnionOrIntersectionType<T>(node: AstUnionTypeNode | AstIntersectionTypeNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.data.types);
}

function forEachChildInParenthesizedTypeOrTypeOperator<T>(node: AstParenthesizedTypeNode | AstTypeOperatorNode, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.type);
}

function forEachChildInObjectOrArrayBindingPattern<T>(node: AstBindingPattern, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.data.elements);
}

function forEachChildInBlock<T>(node: AstBlock | AstModuleBlock, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.data.statements);
}

function forEachChildInContinueOrBreakStatement<T>(node: AstContinueStatement | AstBreakStatement, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.label);
}

function forEachChildInClassDeclarationOrExpression<T>(node: AstClassDeclaration | AstClassExpression, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.data.modifiers) ||
        visitNode(cbNode, node.data.name) ||
        visitNodes(cbNode, cbNodes, node.data.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.data.heritageClauses) ||
        visitNodes(cbNode, cbNodes, node.data.members);
}

function forEachChildInNamedImportsOrExports<T>(node: AstNamedImports | AstNamedExports, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.data.elements);
}

function forEachChildInImportOrExportSpecifier<T>(node: AstImportSpecifier | AstExportSpecifier, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.propertyName) ||
        visitNode(cbNode, node.data.name);
}

function forEachChildInJsxOpeningOrSelfClosingElement<T>(node: AstJsxOpeningLikeElement, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.tagName) ||
        visitNodes(cbNode, cbNodes, node.data.typeArguments) ||
        visitNode(cbNode, node.data.attributes);
}

function forEachChildInOptionalRestOrJSDocParameterModifier<T>(node: AstOptionalTypeNode | AstRestTypeNode | AstJSDocTypeExpression | AstJSDocNullableType | AstJSDocNonNullableType | AstJSDocOptionalType | AstJSDocVariadicType, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.type);
}

function forEachChildInJSDocParameterOrPropertyTag<T>(node: AstJSDocParameterTag | AstJSDocPropertyTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.tagName) ||
        (node.data.isNameFirst
            ? visitNode(cbNode, node.data.name) || visitNode(cbNode, node.data.typeExpression)
            : visitNode(cbNode, node.data.typeExpression) || visitNode(cbNode, node.data.name)) ||
        visitNodes(cbNode, cbNodes, node.data.commentArray);
}

function forEachChildInJSDocTypeLikeTag<T>(node: AstJSDocReturnTag | AstJSDocTypeTag | AstJSDocThisTag | AstJSDocEnumTag | AstJSDocThrowsTag | AstJSDocOverloadTag | AstJSDocSatisfiesTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.tagName) ||
        visitNode(cbNode, node.data.typeExpression) ||
        visitNodes(cbNode, cbNodes, node.data.commentArray);
}

function forEachChildInJSDocLinkCodeOrPlain<T>(node: AstJSDocLink | AstJSDocLinkCode | AstJSDocLinkPlain, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.name);
}

function forEachChildInJSDocTag<T>(node: AstJSDocUnknownTag | AstJSDocClassTag | AstJSDocPublicTag | AstJSDocPrivateTag | AstJSDocProtectedTag | AstJSDocReadonlyTag | AstJSDocDeprecatedTag | AstJSDocOverrideTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.tagName)
        || visitNodes(cbNode, cbNodes, node.data.commentArray);
}

function forEachChildInJSDocImportTag<T>(node: AstJSDocImportTag, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.tagName)
        || visitNode(cbNode, node.data.importClause)
        || visitNode(cbNode, node.data.moduleSpecifier)
        || visitNode(cbNode, node.data.attributes)
        || visitNodes(cbNode, cbNodes, node.data.commentArray);
}

function forEachChildInPartiallyEmittedExpression<T>(node: AstPartiallyEmittedExpression, cbNode: (node: AstNode) => T | undefined, _cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.data.expression);
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
export function astForEachChild<T>(node: AstNode, cbNode: (node: AstNode) => T | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>) => T | undefined): T | undefined {
    if (node === undefined || node.kind <= SyntaxKind.LastToken) {
        return;
    }
    const fn = (astForEachChildTable as Record<SyntaxKind, AstForEachChildFunction<any>>)[node.kind];
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
export function astForEachChildRecursively<T>(rootNode: AstNode, cbNode: (node: AstNode, parent: AstNode) => T | "skip" | undefined, cbNodes?: (nodes: AstNodeArray<AstNode>, parent: AstNode) => T | "skip" | undefined): T | undefined {
    const queue: GatherEntry[] = gatherPossibleChildren(rootNode);
    const parents: AstNode[] = []; // tracks parent references for elements in queue
    while (parents.length < queue.length) {
        parents.push(rootNode);
    }
    while (queue.length !== 0) {
        const { kind, node, array } = queue.pop()!;
        const parent = parents.pop()!;
        if (kind === "array") {
            if (cbNodes) {
                const res = cbNodes(array, parent);
                if (res) {
                    if (res === "skip") continue;
                    return res;
                }
            }
            for (let i = array.items.length - 1; i >= 0; --i) {
                queue.push(makeGatherEntry("node", array.items[i], /*array*/ undefined));
                parents.push(parent);
            }
        }
        else {
            const res = cbNode(node, parent);
            if (res) {
                if (res === "skip") continue;
                return res;
            }
            if (node.kind >= SyntaxKind.FirstNode) {
                // add children in reverse order to the queue, so popping gives the first child
                for (const child of gatherPossibleChildren(node)) {
                    queue.push(child);
                    parents.push(node);
                }
            }
        }
    }
}

interface AstNodeGatherEntry {
    kind: "node";
    node: AstNode;
    array: undefined;
}

interface AstNodeArrayGatherEntry {
    kind: "array";
    node: undefined;
    array: AstNodeArray<AstNode>;
}

type GatherEntry = AstNodeGatherEntry | AstNodeArrayGatherEntry;

function makeGatherEntry(kind: "node" | "array", node: AstNode | undefined, array: AstNodeArray<AstNode> | undefined): GatherEntry {
    return { kind, node, array } as GatherEntry;
}

function gatherPossibleChildren(node: AstNode) {
    const children: GatherEntry[] = [];
    astForEachChild(node, addNodeWorkItem, addArrayWorkItem); // By using a stack above and `unshift` here, we emulate a depth-first preorder traversal
    return children;

    function addNodeWorkItem(node: AstNode) {
        children.unshift(makeGatherEntry("node", node, /*array*/ undefined));
    }

    function addArrayWorkItem(array: AstNodeArray<AstNode>) {
        children.unshift(makeGatherEntry("array", /*node*/ undefined, array));
    }
}
