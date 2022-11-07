namespace ts {
const enum SignatureFlags {
    None = 0,
    Yield = 1 << 0,
    Await = 1 << 1,
    Type  = 1 << 2,
    IgnoreMissingOpenBrace = 1 << 4,
    JSDoc = 1 << 5,
}

const enum SpeculationKind {
    TryParse,
    Lookahead,
    Reparse
}

let NodeConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
let TokenConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
let IdentifierConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
let PrivateIdentifierConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;
let SourceFileConstructor: new (kind: ts.SyntaxKind, pos?: number, end?: number) => ts.Node;

/**
 * NOTE: You should not use this, it is only exported to support `createNode` in `~/src/deprecatedCompat/deprecations.ts`.
 */
/* @internal */
export const parseBaseNodeFactory: ts.BaseNodeFactory = {
    createBaseSourceFileNode: kind => new (SourceFileConstructor || (SourceFileConstructor = ts.objectAllocator.getSourceFileConstructor()))(kind, -1, -1),
    createBaseIdentifierNode: kind => new (IdentifierConstructor || (IdentifierConstructor = ts.objectAllocator.getIdentifierConstructor()))(kind, -1, -1),
    createBasePrivateIdentifierNode: kind => new (PrivateIdentifierConstructor || (PrivateIdentifierConstructor = ts.objectAllocator.getPrivateIdentifierConstructor()))(kind, -1, -1),
    createBaseTokenNode: kind => new (TokenConstructor || (TokenConstructor = ts.objectAllocator.getTokenConstructor()))(kind, -1, -1),
    createBaseNode: kind => new (NodeConstructor || (NodeConstructor = ts.objectAllocator.getNodeConstructor()))(kind, -1, -1),
};

/* @internal */
export const parseNodeFactory = ts.createNodeFactory(ts.NodeFactoryFlags.NoParenthesizerRules, parseBaseNodeFactory);

function visitNode<T>(cbNode: (node: ts.Node) => T, node: ts.Node | undefined): T | undefined {
    return node && cbNode(node);
}

function visitNodes<T>(cbNode: (node: ts.Node) => T, cbNodes: ((node: ts.NodeArray<ts.Node>) => T | undefined) | undefined, nodes: ts.NodeArray<ts.Node> | undefined): T | undefined {
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

/*@internal*/
export function isJSDocLikeText(text: string, start: number) {
    return text.charCodeAt(start + 1) === ts.CharacterCodes.asterisk &&
        text.charCodeAt(start + 2) === ts.CharacterCodes.asterisk &&
        text.charCodeAt(start + 3) !== ts.CharacterCodes.slash;
}

/*@internal*/
export function isFileProbablyExternalModule(sourceFile: ts.SourceFile) {
    // Try to use the first top-level import/export when available, then
    // fall back to looking for an 'import.meta' somewhere in the tree if necessary.
    return ts.forEach(sourceFile.statements, isAnExternalModuleIndicatorNode) ||
        getImportMetaIfNecessary(sourceFile);
}

function isAnExternalModuleIndicatorNode(node: ts.Node) {
    return ts.canHaveModifiers(node) && hasModifierOfKind(node, ts.SyntaxKind.ExportKeyword)
        || ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)
        || ts.isImportDeclaration(node)
        || ts.isExportAssignment(node)
        || ts.isExportDeclaration(node) ? node : undefined;
}

function getImportMetaIfNecessary(sourceFile: ts.SourceFile) {
    return sourceFile.flags & ts.NodeFlags.PossiblyContainsImportMeta ?
        walkTreeForImportMeta(sourceFile) :
        undefined;
}

function walkTreeForImportMeta(node: ts.Node): ts.Node | undefined {
    return isImportMeta(node) ? node : forEachChild(node, walkTreeForImportMeta);
}

/** Do not use hasModifier inside the parser; it relies on parent pointers. Use this instead. */
function hasModifierOfKind(node: ts.HasModifiers, kind: ts.SyntaxKind) {
    return ts.some(node.modifiers, m => m.kind === kind);
}

function isImportMeta(node: ts.Node): boolean {
    return ts.isMetaProperty(node) && node.keywordToken === ts.SyntaxKind.ImportKeyword && node.name.escapedText === "meta";
}

type ForEachChildFunction<TNode> = <T>(node: TNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined) => T | undefined;
type ForEachChildTable = { [TNode in ts.ForEachChildNodes as TNode["kind"]]: ForEachChildFunction<TNode> };
const forEachChildTable: ForEachChildTable = {
    [ts.SyntaxKind.QualifiedName]: function forEachChildInQualifiedName<T>(node: ts.QualifiedName, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    },
    [ts.SyntaxKind.TypeParameter]: function forEachChildInTypeParameter<T>(node: ts.TypeParameterDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.constraint) ||
            visitNode(cbNode, node.default) ||
            visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.ShorthandPropertyAssignment]: function forEachChildInShorthandPropertyAssignment<T>(node: ts.ShorthandPropertyAssignment, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.equalsToken) ||
            visitNode(cbNode, node.objectAssignmentInitializer);
    },
    [ts.SyntaxKind.SpreadAssignment]: function forEachChildInSpreadAssignment<T>(node: ts.SpreadAssignment, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.Parameter]: function forEachChildInParameter<T>(node: ts.ParameterDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.PropertyDeclaration]: function forEachChildInPropertyDeclaration<T>(node: ts.PropertyDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.PropertySignature]: function forEachChildInPropertySignature<T>(node: ts.PropertySignature, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.PropertyAssignment]: function forEachChildInPropertyAssignment<T>(node: ts.PropertyAssignment, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.VariableDeclaration]: function forEachChildInVariableDeclaration<T>(node: ts.VariableDeclaration, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.exclamationToken) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.BindingElement]: function forEachChildInBindingElement<T>(node: ts.BindingElement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.propertyName) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.IndexSignature]: function forEachChildInIndexSignature<T>(node: ts.IndexSignatureDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.ConstructorType]: function forEachChildInConstructorType<T>(node: ts.ConstructorTypeNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.FunctionType]: function forEachChildInFunctionType<T>(node: ts.FunctionTypeNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.CallSignature]: forEachChildInCallOrConstructSignature,
    [ts.SyntaxKind.ConstructSignature]: forEachChildInCallOrConstructSignature,
    [ts.SyntaxKind.MethodDeclaration]: function forEachChildInMethodDeclaration<T>(node: ts.MethodDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
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
    [ts.SyntaxKind.MethodSignature]: function forEachChildInMethodSignature<T>(node: ts.MethodSignature, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.Constructor]: function forEachChildInConstructor<T>(node: ts.ConstructorDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.GetAccessor]: function forEachChildInGetAccessor<T>(node: ts.GetAccessorDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.SetAccessor]: function forEachChildInSetAccessor<T>(node: ts.SetAccessorDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.FunctionDeclaration]: function forEachChildInFunctionDeclaration<T>(node: ts.FunctionDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.FunctionExpression]: function forEachChildInFunctionExpression<T>(node: ts.FunctionExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.ArrowFunction]: function forEachChildInArrowFunction<T>(node: ts.ArrowFunction, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.equalsGreaterThanToken) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.ClassStaticBlockDeclaration]: function forEachChildInClassStaticBlockDeclaration<T>(node: ts.ClassStaticBlockDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.TypeReference]: function forEachChildInTypeReference<T>(node: ts.TypeReferenceNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [ts.SyntaxKind.TypePredicate]: function forEachChildInTypePredicate<T>(node: ts.TypePredicateNode, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.assertsModifier) ||
            visitNode(cbNode, node.parameterName) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.TypeQuery]: function forEachChildInTypeQuery<T>(node: ts.TypeQueryNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.exprName) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [ts.SyntaxKind.TypeLiteral]: function forEachChildInTypeLiteral<T>(node: ts.TypeLiteralNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.members);
    },
    [ts.SyntaxKind.ArrayType]: function forEachChildInArrayType<T>(node: ts.ArrayTypeNode, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.elementType);
    },
    [ts.SyntaxKind.TupleType]: function forEachChildInTupleType<T>(node: ts.TupleTypeNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [ts.SyntaxKind.UnionType]: forEachChildInUnionOrIntersectionType,
    [ts.SyntaxKind.IntersectionType]: forEachChildInUnionOrIntersectionType,
    [ts.SyntaxKind.ConditionalType]: function forEachChildInConditionalType<T>(node: ts.ConditionalTypeNode, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.checkType) ||
            visitNode(cbNode, node.extendsType) ||
            visitNode(cbNode, node.trueType) ||
            visitNode(cbNode, node.falseType);
    },
    [ts.SyntaxKind.InferType]: function forEachChildInInferType<T>(node: ts.InferTypeNode, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.typeParameter);
    },
    [ts.SyntaxKind.ImportType]: function forEachChildInImportType<T>(node: ts.ImportTypeNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.argument) ||
            visitNode(cbNode, node.assertions) ||
            visitNode(cbNode, node.qualifier) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [ts.SyntaxKind.ImportTypeAssertionContainer]: function forEachChildInImportTypeAssertionContainer<T>(node: ts.ImportTypeAssertionContainer, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.assertClause);
    },
    [ts.SyntaxKind.ParenthesizedType]: forEachChildInParenthesizedTypeOrTypeOperator,
    [ts.SyntaxKind.TypeOperator]: forEachChildInParenthesizedTypeOrTypeOperator,
    [ts.SyntaxKind.IndexedAccessType]: function forEachChildInIndexedAccessType<T>(node: ts.IndexedAccessTypeNode, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.objectType) ||
            visitNode(cbNode, node.indexType);
    },
    [ts.SyntaxKind.MappedType]: function forEachChildInMappedType<T>(node: ts.MappedTypeNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.readonlyToken) ||
            visitNode(cbNode, node.typeParameter) ||
            visitNode(cbNode, node.nameType) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [ts.SyntaxKind.LiteralType]: function forEachChildInLiteralType<T>(node: ts.LiteralTypeNode, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.literal);
    },
    [ts.SyntaxKind.NamedTupleMember]: function forEachChildInNamedTupleMember<T>(node: ts.NamedTupleMember, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.ObjectBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [ts.SyntaxKind.ArrayBindingPattern]: forEachChildInObjectOrArrayBindingPattern,
    [ts.SyntaxKind.ArrayLiteralExpression]: function forEachChildInArrayLiteralExpression<T>(node: ts.ArrayLiteralExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [ts.SyntaxKind.ObjectLiteralExpression]: function forEachChildInObjectLiteralExpression<T>(node: ts.ObjectLiteralExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    },
    [ts.SyntaxKind.PropertyAccessExpression]: function forEachChildInPropertyAccessExpression<T>(node: ts.PropertyAccessExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.name);
    },
    [ts.SyntaxKind.ElementAccessExpression]: function forEachChildInElementAccessExpression<T>(node: ts.ElementAccessExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNode(cbNode, node.argumentExpression);
    },
    [ts.SyntaxKind.CallExpression]: forEachChildInCallOrNewExpression,
    [ts.SyntaxKind.NewExpression]: forEachChildInCallOrNewExpression,
    [ts.SyntaxKind.TaggedTemplateExpression]: function forEachChildInTaggedTemplateExpression<T>(node: ts.TaggedTemplateExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tag) ||
            visitNode(cbNode, node.questionDotToken) ||
            visitNodes(cbNode, cbNodes, node.typeArguments) ||
            visitNode(cbNode, node.template);
    },
    [ts.SyntaxKind.TypeAssertionExpression]: function forEachChildInTypeAssertionExpression<T>(node: ts.TypeAssertion, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.ParenthesizedExpression]: function forEachChildInParenthesizedExpression<T>(node: ts.ParenthesizedExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.DeleteExpression]: function forEachChildInDeleteExpression<T>(node: ts.DeleteExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.TypeOfExpression]: function forEachChildInTypeOfExpression<T>(node: ts.TypeOfExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.VoidExpression]: function forEachChildInVoidExpression<T>(node: ts.VoidExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.PrefixUnaryExpression]: function forEachChildInPrefixUnaryExpression<T>(node: ts.PrefixUnaryExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [ts.SyntaxKind.YieldExpression]: function forEachChildInYieldExpression<T>(node: ts.YieldExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.asteriskToken) ||
            visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.AwaitExpression]: function forEachChildInAwaitExpression<T>(node: ts.AwaitExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.PostfixUnaryExpression]: function forEachChildInPostfixUnaryExpression<T>(node: ts.PostfixUnaryExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.operand);
    },
    [ts.SyntaxKind.BinaryExpression]: function forEachChildInBinaryExpression<T>(node: ts.BinaryExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.operatorToken) ||
            visitNode(cbNode, node.right);
    },
    [ts.SyntaxKind.AsExpression]: function forEachChildInAsExpression<T>(node: ts.AsExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.NonNullExpression]: function forEachChildInNonNullExpression<T>(node: ts.NonNullExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.SatisfiesExpression]: function forEachChildInSatisfiesExpression<T>(node: ts.SatisfiesExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) || visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.MetaProperty]: function forEachChildInMetaProperty<T>(node: ts.MetaProperty, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [ts.SyntaxKind.ConditionalExpression]: function forEachChildInConditionalExpression<T>(node: ts.ConditionalExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.questionToken) ||
            visitNode(cbNode, node.whenTrue) ||
            visitNode(cbNode, node.colonToken) ||
            visitNode(cbNode, node.whenFalse);
    },
    [ts.SyntaxKind.SpreadElement]: function forEachChildInSpreadElement<T>(node: ts.SpreadElement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.Block]: forEachChildInBlock,
    [ts.SyntaxKind.ModuleBlock]: forEachChildInBlock,
    [ts.SyntaxKind.SourceFile]: function forEachChildInSourceFile<T>(node: ts.SourceFile, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements) ||
            visitNode(cbNode, node.endOfFileToken);
    },
    [ts.SyntaxKind.VariableStatement]: function forEachChildInVariableStatement<T>(node: ts.VariableStatement, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.declarationList);
    },
    [ts.SyntaxKind.VariableDeclarationList]: function forEachChildInVariableDeclarationList<T>(node: ts.VariableDeclarationList, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.declarations);
    },
    [ts.SyntaxKind.ExpressionStatement]: function forEachChildInExpressionStatement<T>(node: ts.ExpressionStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.IfStatement]: function forEachChildInIfStatement<T>(node: ts.IfStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.thenStatement) ||
            visitNode(cbNode, node.elseStatement);
    },
    [ts.SyntaxKind.DoStatement]: function forEachChildInDoStatement<T>(node: ts.DoStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.statement) ||
            visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.WhileStatement]: function forEachChildInWhileStatement<T>(node: ts.WhileStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [ts.SyntaxKind.ForStatement]: function forEachChildInForStatement<T>(node: ts.ForStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.condition) ||
            visitNode(cbNode, node.incrementor) ||
            visitNode(cbNode, node.statement);
    },
    [ts.SyntaxKind.ForInStatement]: function forEachChildInForInStatement<T>(node: ts.ForInStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [ts.SyntaxKind.ForOfStatement]: function forEachChildInForOfStatement<T>(node: ts.ForOfStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.awaitModifier) ||
            visitNode(cbNode, node.initializer) ||
            visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [ts.SyntaxKind.ContinueStatement]: forEachChildInContinueOrBreakStatement,
    [ts.SyntaxKind.BreakStatement]: forEachChildInContinueOrBreakStatement,
    [ts.SyntaxKind.ReturnStatement]: function forEachChildInReturnStatement<T>(node: ts.ReturnStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.WithStatement]: function forEachChildInWithStatement<T>(node: ts.WithStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.statement);
    },
    [ts.SyntaxKind.SwitchStatement]: function forEachChildInSwitchStatement<T>(node: ts.SwitchStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.caseBlock);
    },
    [ts.SyntaxKind.CaseBlock]: function forEachChildInCaseBlock<T>(node: ts.CaseBlock, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.clauses);
    },
    [ts.SyntaxKind.CaseClause]: function forEachChildInCaseClause<T>(node: ts.CaseClause, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.statements);
    },
    [ts.SyntaxKind.DefaultClause]: function forEachChildInDefaultClause<T>(node: ts.DefaultClause, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.statements);
    },
    [ts.SyntaxKind.LabeledStatement]: function forEachChildInLabeledStatement<T>(node: ts.LabeledStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.label) ||
            visitNode(cbNode, node.statement);
    },
    [ts.SyntaxKind.ThrowStatement]: function forEachChildInThrowStatement<T>(node: ts.ThrowStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.TryStatement]: function forEachChildInTryStatement<T>(node: ts.TryStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tryBlock) ||
            visitNode(cbNode, node.catchClause) ||
            visitNode(cbNode, node.finallyBlock);
    },
    [ts.SyntaxKind.CatchClause]: function forEachChildInCatchClause<T>(node: ts.CatchClause, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.variableDeclaration) ||
            visitNode(cbNode, node.block);
    },
    [ts.SyntaxKind.Decorator]: function forEachChildInDecorator<T>(node: ts.Decorator, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.ClassDeclaration]: forEachChildInClassDeclarationOrExpression,
    [ts.SyntaxKind.ClassExpression]: forEachChildInClassDeclarationOrExpression,
    [ts.SyntaxKind.InterfaceDeclaration]: function forEachChildInInterfaceDeclaration<T>(node: ts.InterfaceDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNodes(cbNode, cbNodes, node.heritageClauses) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [ts.SyntaxKind.TypeAliasDeclaration]: function forEachChildInTypeAliasDeclaration<T>(node: ts.TypeAliasDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.EnumDeclaration]: function forEachChildInEnumDeclaration<T>(node: ts.EnumDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNodes(cbNode, cbNodes, node.members);
    },
    [ts.SyntaxKind.EnumMember]: function forEachChildInEnumMember<T>(node: ts.EnumMember, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.ModuleDeclaration]: function forEachChildInModuleDeclaration<T>(node: ts.ModuleDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.body);
    },
    [ts.SyntaxKind.ImportEqualsDeclaration]: function forEachChildInImportEqualsDeclaration<T>(node: ts.ImportEqualsDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.moduleReference);
    },
    [ts.SyntaxKind.ImportDeclaration]: function forEachChildInImportDeclaration<T>(node: ts.ImportDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.importClause) ||
            visitNode(cbNode, node.moduleSpecifier) ||
            visitNode(cbNode, node.assertClause);
    },
    [ts.SyntaxKind.ImportClause]: function forEachChildInImportClause<T>(node: ts.ImportClause, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.namedBindings);
    },
    [ts.SyntaxKind.AssertClause]: function forEachChildInAssertClause<T>(node: ts.AssertClause, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [ts.SyntaxKind.AssertEntry]: function forEachChildInAssertEntry<T>(node: ts.AssertEntry, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.value);
    },
    [ts.SyntaxKind.NamespaceExportDeclaration]: function forEachChildInNamespaceExportDeclaration<T>(node: ts.NamespaceExportDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNode(cbNode, node.name);
    },
    [ts.SyntaxKind.NamespaceImport]: function forEachChildInNamespaceImport<T>(node: ts.NamespaceImport, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [ts.SyntaxKind.NamespaceExport]: function forEachChildInNamespaceExport<T>(node: ts.NamespaceExport, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [ts.SyntaxKind.NamedImports]: forEachChildInNamedImportsOrExports,
    [ts.SyntaxKind.NamedExports]: forEachChildInNamedImportsOrExports,
    [ts.SyntaxKind.ExportDeclaration]: function forEachChildInExportDeclaration<T>(node: ts.ExportDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.exportClause) ||
            visitNode(cbNode, node.moduleSpecifier) ||
            visitNode(cbNode, node.assertClause);
    },
    [ts.SyntaxKind.ImportSpecifier]: forEachChildInImportOrExportSpecifier,
    [ts.SyntaxKind.ExportSpecifier]: forEachChildInImportOrExportSpecifier,
    [ts.SyntaxKind.ExportAssignment]: function forEachChildInExportAssignment<T>(node: ts.ExportAssignment, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers) ||
            visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.TemplateExpression]: function forEachChildInTemplateExpression<T>(node: ts.TemplateExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.head) ||
            visitNodes(cbNode, cbNodes, node.templateSpans);
    },
    [ts.SyntaxKind.TemplateSpan]: function forEachChildInTemplateSpan<T>(node: ts.TemplateSpan, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNode(cbNode, node.literal);
    },
    [ts.SyntaxKind.TemplateLiteralType]: function forEachChildInTemplateLiteralType<T>(node: ts.TemplateLiteralTypeNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.head) ||
            visitNodes(cbNode, cbNodes, node.templateSpans);
    },
    [ts.SyntaxKind.TemplateLiteralTypeSpan]: function forEachChildInTemplateLiteralTypeSpan<T>(node: ts.TemplateLiteralTypeSpan, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.type) ||
            visitNode(cbNode, node.literal);
    },
    [ts.SyntaxKind.ComputedPropertyName]: function forEachChildInComputedPropertyName<T>(node: ts.ComputedPropertyName, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.HeritageClause]: function forEachChildInHeritageClause<T>(node: ts.HeritageClause, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.types);
    },
    [ts.SyntaxKind.ExpressionWithTypeArguments]: function forEachChildInExpressionWithTypeArguments<T>(node: ts.ExpressionWithTypeArguments, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression) ||
            visitNodes(cbNode, cbNodes, node.typeArguments);
    },
    [ts.SyntaxKind.ExternalModuleReference]: function forEachChildInExternalModuleReference<T>(node: ts.ExternalModuleReference, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.MissingDeclaration]: function forEachChildInMissingDeclaration<T>(node: ts.MissingDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.illegalDecorators) ||
            visitNodes(cbNode, cbNodes, node.modifiers);
    },
    [ts.SyntaxKind.CommaListExpression]: function forEachChildInCommaListExpression<T>(node: ts.CommaListExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.elements);
    },
    [ts.SyntaxKind.JsxElement]: function forEachChildInJsxElement<T>(node: ts.JsxElement, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingElement) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingElement);
    },
    [ts.SyntaxKind.JsxFragment]: function forEachChildInJsxFragment<T>(node: ts.JsxFragment, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.openingFragment) ||
            visitNodes(cbNode, cbNodes, node.children) ||
            visitNode(cbNode, node.closingFragment);
    },
    [ts.SyntaxKind.JsxSelfClosingElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [ts.SyntaxKind.JsxOpeningElement]: forEachChildInJsxOpeningOrSelfClosingElement,
    [ts.SyntaxKind.JsxAttributes]: function forEachChildInJsxAttributes<T>(node: ts.JsxAttributes, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.properties);
    },
    [ts.SyntaxKind.JsxAttribute]: function forEachChildInJsxAttribute<T>(node: ts.JsxAttribute, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name) ||
            visitNode(cbNode, node.initializer);
    },
    [ts.SyntaxKind.JsxSpreadAttribute]: function forEachChildInJsxSpreadAttribute<T>(node: ts.JsxSpreadAttribute, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.JsxExpression]: function forEachChildInJsxExpression<T>(node: ts.JsxExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.dotDotDotToken) ||
            visitNode(cbNode, node.expression);
    },
    [ts.SyntaxKind.JsxClosingElement]: function forEachChildInJsxClosingElement<T>(node: ts.JsxClosingElement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName);
    },
    [ts.SyntaxKind.OptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [ts.SyntaxKind.RestType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [ts.SyntaxKind.JSDocTypeExpression]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [ts.SyntaxKind.JSDocNonNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [ts.SyntaxKind.JSDocNullableType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [ts.SyntaxKind.JSDocOptionalType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [ts.SyntaxKind.JSDocVariadicType]: forEachChildInOptionalRestOrJSDocParameterModifier,
    [ts.SyntaxKind.JSDocFunctionType]: function forEachChildInJSDocFunctionType<T>(node: ts.JSDocFunctionType, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNodes(cbNode, cbNodes, node.parameters) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.JSDoc]: function forEachChildInJSDoc<T>(node: ts.JSDoc, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
            || visitNodes(cbNode, cbNodes, node.tags);
    },
    [ts.SyntaxKind.JSDocSeeTag]: function forEachChildInJSDocSeeTag<T>(node: ts.JSDocSeeTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.name) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [ts.SyntaxKind.JSDocNameReference]: function forEachChildInJSDocNameReference<T>(node: ts.JSDocNameReference, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.name);
    },
    [ts.SyntaxKind.JSDocMemberName]: function forEachChildInJSDocMemberName<T>(node: ts.JSDocMemberName, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.left) ||
            visitNode(cbNode, node.right);
    },
    [ts.SyntaxKind.JSDocParameterTag]: forEachChildInJSDocParameterOrPropertyTag,
    [ts.SyntaxKind.JSDocPropertyTag]: forEachChildInJSDocParameterOrPropertyTag,
    [ts.SyntaxKind.JSDocAuthorTag]: function forEachChildInJSDocAuthorTag<T>(node: ts.JSDocAuthorTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [ts.SyntaxKind.JSDocImplementsTag]: function forEachChildInJSDocImplementsTag<T>(node: ts.JSDocImplementsTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [ts.SyntaxKind.JSDocAugmentsTag]: function forEachChildInJSDocAugmentsTag<T>(node: ts.JSDocAugmentsTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.class) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [ts.SyntaxKind.JSDocTemplateTag]: function forEachChildInJSDocTemplateTag<T>(node: ts.JSDocTemplateTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.constraint) ||
            visitNodes(cbNode, cbNodes, node.typeParameters) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [ts.SyntaxKind.JSDocTypedefTag]: function forEachChildInJSDocTypedefTag<T>(node: ts.JSDocTypedefTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            (node.typeExpression &&
                node.typeExpression.kind === ts.SyntaxKind.JSDocTypeExpression
                ? visitNode(cbNode, node.typeExpression) ||
                visitNode(cbNode, node.fullName) ||
                (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment))
                : visitNode(cbNode, node.fullName) ||
                visitNode(cbNode, node.typeExpression) ||
                (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment)));
    },
    [ts.SyntaxKind.JSDocCallbackTag]: function forEachChildInJSDocCallbackTag<T>(node: ts.JSDocCallbackTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return visitNode(cbNode, node.tagName) ||
            visitNode(cbNode, node.fullName) ||
            visitNode(cbNode, node.typeExpression) ||
            (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
    },
    [ts.SyntaxKind.JSDocReturnTag]: forEachChildInJSDocReturnTag,
    [ts.SyntaxKind.JSDocTypeTag]: forEachChildInJSDocReturnTag,
    [ts.SyntaxKind.JSDocThisTag]: forEachChildInJSDocReturnTag,
    [ts.SyntaxKind.JSDocEnumTag]: forEachChildInJSDocReturnTag,
    [ts.SyntaxKind.JSDocSignature]: function forEachChildInJSDocSignature<T>(node: ts.JSDocSignature, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return ts.forEach(node.typeParameters, cbNode) ||
            ts.forEach(node.parameters, cbNode) ||
            visitNode(cbNode, node.type);
    },
    [ts.SyntaxKind.JSDocLink]: forEachChildInJSDocLinkCodeOrPlain,
    [ts.SyntaxKind.JSDocLinkCode]: forEachChildInJSDocLinkCodeOrPlain,
    [ts.SyntaxKind.JSDocLinkPlain]: forEachChildInJSDocLinkCodeOrPlain,
    [ts.SyntaxKind.JSDocTypeLiteral]: function forEachChildInJSDocTypeLiteral<T>(node: ts.JSDocTypeLiteral, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
        return ts.forEach(node.jsDocPropertyTags, cbNode);
    },
    [ts.SyntaxKind.JSDocTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.JSDocClassTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.JSDocPublicTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.JSDocPrivateTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.JSDocProtectedTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.JSDocReadonlyTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.JSDocDeprecatedTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.JSDocOverrideTag]: forEachChildInJSDocTag,
    [ts.SyntaxKind.PartiallyEmittedExpression]: forEachChildInPartiallyEmittedExpression,
};

// shared

function forEachChildInCallOrConstructSignature<T>(node: ts.CallSignatureDeclaration | ts.ConstructSignatureDeclaration, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.parameters) ||
        visitNode(cbNode, node.type);
}

function forEachChildInUnionOrIntersectionType<T>(node: ts.UnionTypeNode | ts.IntersectionTypeNode, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.types);
}

function forEachChildInParenthesizedTypeOrTypeOperator<T>(node: ts.ParenthesizedTypeNode | ts.TypeOperatorNode, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.type);
}

function forEachChildInObjectOrArrayBindingPattern<T>(node: ts.BindingPattern, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.elements);
}

function forEachChildInCallOrNewExpression<T>(node: ts.CallExpression | ts.NewExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.expression) ||
        // TODO: should we separate these branches out?
        visitNode(cbNode, (node as ts.CallExpression).questionDotToken) ||
        visitNodes(cbNode, cbNodes, node.typeArguments) ||
        visitNodes(cbNode, cbNodes, node.arguments);
}

function forEachChildInBlock<T>(node: ts.Block | ts.ModuleBlock, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.statements);
}

function forEachChildInContinueOrBreakStatement<T>(node: ts.ContinueStatement | ts.BreakStatement, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.label);
}

function forEachChildInClassDeclarationOrExpression<T>(node: ts.ClassDeclaration | ts.ClassExpression, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.modifiers) ||
        visitNode(cbNode, node.name) ||
        visitNodes(cbNode, cbNodes, node.typeParameters) ||
        visitNodes(cbNode, cbNodes, node.heritageClauses) ||
        visitNodes(cbNode, cbNodes, node.members);
}

function forEachChildInNamedImportsOrExports<T>(node: ts.NamedImports | ts.NamedExports, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNodes(cbNode, cbNodes, node.elements);
}

function forEachChildInImportOrExportSpecifier<T>(node: ts.ImportSpecifier | ts.ExportSpecifier, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.propertyName) ||
        visitNode(cbNode, node.name);
}

function forEachChildInJsxOpeningOrSelfClosingElement<T>(node: ts.JsxOpeningLikeElement, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        visitNodes(cbNode, cbNodes, node.typeArguments) ||
        visitNode(cbNode, node.attributes);
}

function forEachChildInOptionalRestOrJSDocParameterModifier<T>(node: ts.OptionalTypeNode | ts.RestTypeNode | ts.JSDocTypeExpression | ts.JSDocNullableType | ts.JSDocNonNullableType | ts.JSDocOptionalType | ts.JSDocVariadicType, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.type);
}

function forEachChildInJSDocParameterOrPropertyTag<T>(node: ts.JSDocParameterTag | ts.JSDocPropertyTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        (node.isNameFirst
            ? visitNode(cbNode, node.name) || visitNode(cbNode, node.typeExpression)
            : visitNode(cbNode, node.typeExpression) || visitNode(cbNode, node.name)) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocReturnTag<T>(node: ts.JSDocReturnTag | ts.JSDocTypeTag | ts.JSDocThisTag | ts.JSDocEnumTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName) ||
        visitNode(cbNode, node.typeExpression) ||
        (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInJSDocLinkCodeOrPlain<T>(node: ts.JSDocLink | ts.JSDocLinkCode | ts.JSDocLinkPlain, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.name);
}

function forEachChildInJSDocTag<T>(node: ts.JSDocUnknownTag | ts.JSDocClassTag | ts.JSDocPublicTag | ts.JSDocPrivateTag | ts.JSDocProtectedTag | ts.JSDocReadonlyTag | ts.JSDocDeprecatedTag | ts.JSDocOverrideTag, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    return visitNode(cbNode, node.tagName)
        || (typeof node.comment === "string" ? undefined : visitNodes(cbNode, cbNodes, node.comment));
}

function forEachChildInPartiallyEmittedExpression<T>(node: ts.PartiallyEmittedExpression, cbNode: (node: ts.Node) => T | undefined, _cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
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
export function forEachChild<T>(node: ts.Node, cbNode: (node: ts.Node) => T | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>) => T | undefined): T | undefined {
    if (node === undefined || node.kind <= ts.SyntaxKind.LastToken) {
        return;
    }
    const fn = (forEachChildTable as Record<ts.SyntaxKind, ForEachChildFunction<any>>)[node.kind];
    return fn === undefined ? undefined : fn(node, cbNode, cbNodes);
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
export function forEachChildRecursively<T>(rootNode: ts.Node, cbNode: (node: ts.Node, parent: ts.Node) => T | "skip" | undefined, cbNodes?: (nodes: ts.NodeArray<ts.Node>, parent: ts.Node) => T | "skip" | undefined): T | undefined {
    const queue: (ts.Node | ts.NodeArray<ts.Node>)[] = gatherPossibleChildren(rootNode);
    const parents: ts.Node[] = []; // tracks parent references for elements in queue
    while (parents.length < queue.length) {
        parents.push(rootNode);
    }
    while (queue.length !== 0) {
        const current = queue.pop()!;
        const parent = parents.pop()!;
        if (ts.isArray(current)) {
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
            if (current.kind >= ts.SyntaxKind.FirstNode) {
                // add children in reverse order to the queue, so popping gives the first child
                for (const child of gatherPossibleChildren(current)) {
                    queue.push(child);
                    parents.push(current);
                }
            }
        }
    }
}

function gatherPossibleChildren(node: ts.Node) {
    const children: (ts.Node | ts.NodeArray<ts.Node>)[] = [];
    forEachChild(node, addWorkItem, addWorkItem); // By using a stack above and `unshift` here, we emulate a depth-first preorder traversal
    return children;

    function addWorkItem(n: ts.Node | ts.NodeArray<ts.Node>) {
        children.unshift(n);
    }
}

export interface CreateSourceFileOptions {
    languageVersion: ts.ScriptTarget;
    /**
     * Controls the format the file is detected as - this can be derived from only the path
     * and files on disk, but needs to be done with a module resolution cache in scope to be performant.
     * This is usually `undefined` for compilations that do not have `moduleResolution` values of `node16` or `nodenext`.
     */
    impliedNodeFormat?: ts.ModuleKind.ESNext | ts.ModuleKind.CommonJS;
    /**
     * Controls how module-y-ness is set for the given file. Usually the result of calling
     * `getSetExternalModuleIndicator` on a valid `CompilerOptions` object. If not present, the default
     * check specified by `isFileProbablyExternalModule` will be used to set the field.
     */
    setExternalModuleIndicator?: (file: ts.SourceFile) => void;
    /*@internal*/ packageJsonLocations?: readonly string[];
    /*@internal*/ packageJsonScope?: ts.PackageJsonInfo;
}

function setExternalModuleIndicator(sourceFile: ts.SourceFile) {
    sourceFile.externalModuleIndicator = isFileProbablyExternalModule(sourceFile);
}

export function createSourceFile(fileName: string, sourceText: string, languageVersionOrOptions: ts.ScriptTarget | CreateSourceFileOptions, setParentNodes = false, scriptKind?: ts.ScriptKind): ts.SourceFile {
    ts.tracing?.push(ts.tracing.Phase.Parse, "createSourceFile", { path: fileName }, /*separateBeginAndEnd*/ true);
    ts.performance.mark("beforeParse");
    let result: ts.SourceFile;

    ts.perfLogger.logStartParseSourceFile(fileName);
    const {
        languageVersion,
        setExternalModuleIndicator: overrideSetExternalModuleIndicator,
        impliedNodeFormat: format
    } = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions : ({ languageVersion: languageVersionOrOptions } as CreateSourceFileOptions);
    if (languageVersion === ts.ScriptTarget.JSON) {
        result = Parser.parseSourceFile(fileName, sourceText, languageVersion, /*syntaxCursor*/ undefined, setParentNodes, ts.ScriptKind.JSON, ts.noop);
    }
    else {
        const setIndicator = format === undefined ? overrideSetExternalModuleIndicator : (file: ts.SourceFile) => {
            file.impliedNodeFormat = format;
            return (overrideSetExternalModuleIndicator || setExternalModuleIndicator)(file);
        };
        result = Parser.parseSourceFile(fileName, sourceText, languageVersion, /*syntaxCursor*/ undefined, setParentNodes, scriptKind, setIndicator);
    }
    ts.perfLogger.logStopParseSourceFile();

    ts.performance.mark("afterParse");
    ts.performance.measure("Parse", "beforeParse", "afterParse");
    ts.tracing?.pop();
    return result;
}

export function parseIsolatedEntityName(text: string, languageVersion: ts.ScriptTarget): ts.EntityName | undefined {
    return Parser.parseIsolatedEntityName(text, languageVersion);
}

/**
 * Parse json text into SyntaxTree and return node and parse errors if any
 * @param fileName
 * @param sourceText
 */
export function parseJsonText(fileName: string, sourceText: string): ts.JsonSourceFile {
    return Parser.parseJsonText(fileName, sourceText);
}

// See also `isExternalOrCommonJsModule` in utilities.ts
export function isExternalModule(file: ts.SourceFile): boolean {
    return file.externalModuleIndicator !== undefined;
}

// Produces a new SourceFile for the 'newText' provided. The 'textChangeRange' parameter
// indicates what changed between the 'text' that this SourceFile has and the 'newText'.
// The SourceFile will be created with the compiler attempting to reuse as many nodes from
// this file as possible.
//
// Note: this function mutates nodes from this SourceFile. That means any existing nodes
// from this SourceFile that are being held onto may change as a result (including
// becoming detached from any SourceFile).  It is recommended that this SourceFile not
// be used once 'update' is called on it.
export function updateSourceFile(sourceFile: ts.SourceFile, newText: string, textChangeRange: ts.TextChangeRange, aggressiveChecks = false): ts.SourceFile {
    const newSourceFile = IncrementalParser.updateSourceFile(sourceFile, newText, textChangeRange, aggressiveChecks);
    // Because new source file node is created, it may not have the flag PossiblyContainDynamicImport. This is the case if there is no new edit to add dynamic import.
    // We will manually port the flag to the new source file.
    (newSourceFile as ts.Mutable<ts.SourceFile>).flags |= (sourceFile.flags & ts.NodeFlags.PermanentlySetIncrementalFlags);
    return newSourceFile;
}

/* @internal */
export function parseIsolatedJSDocComment(content: string, start?: number, length?: number) {
    const result = Parser.JSDocParser.parseIsolatedJSDocComment(content, start, length);
    if (result && result.jsDoc) {
        // because the jsDocComment was parsed out of the source file, it might
        // not be covered by the fixupParentReferences.
        Parser.fixupParentReferences(result.jsDoc);
    }

    return result;
}

/* @internal */
// Exposed only for testing.
export function parseJSDocTypeExpressionForTests(content: string, start?: number, length?: number) {
    return Parser.JSDocParser.parseJSDocTypeExpressionForTests(content, start, length);
}

// Implement the parser as a singleton module.  We do this for perf reasons because creating
// parser instances can actually be expensive enough to impact us on projects with many source
// files.
namespace Parser {
    // Share a single scanner across all calls to parse a source file.  This helps speed things
    // up by avoiding the cost of creating/compiling scanners over and over again.
    const scanner = ts.createScanner(ts.ScriptTarget.Latest, /*skipTrivia*/ true);

    const disallowInAndDecoratorContext = ts.NodeFlags.DisallowInContext | ts.NodeFlags.DecoratorContext;

    // capture constructors in 'initializeState' to avoid null checks
    let NodeConstructor: new (kind: ts.SyntaxKind, pos: number, end: number) => ts.Node;
    let TokenConstructor: new (kind: ts.SyntaxKind, pos: number, end: number) => ts.Node;
    let IdentifierConstructor: new (kind: ts.SyntaxKind, pos: number, end: number) => ts.Node;
    let PrivateIdentifierConstructor: new (kind: ts.SyntaxKind, pos: number, end: number) => ts.Node;
    let SourceFileConstructor: new (kind: ts.SyntaxKind, pos: number, end: number) => ts.Node;

    function countNode(node: ts.Node) {
        nodeCount++;
        return node;
    }

    // Rather than using `createBaseNodeFactory` here, we establish a `BaseNodeFactory` that closes over the
    // constructors above, which are reset each time `initializeState` is called.
    const baseNodeFactory: ts.BaseNodeFactory = {
        createBaseSourceFileNode: kind => countNode(new SourceFileConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseIdentifierNode: kind => countNode(new IdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBasePrivateIdentifierNode: kind => countNode(new PrivateIdentifierConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseTokenNode: kind => countNode(new TokenConstructor(kind, /*pos*/ 0, /*end*/ 0)),
        createBaseNode: kind => countNode(new NodeConstructor(kind, /*pos*/ 0, /*end*/ 0))
    };

    const factory = ts.createNodeFactory(ts.NodeFactoryFlags.NoParenthesizerRules | ts.NodeFactoryFlags.NoNodeConverters | ts.NodeFactoryFlags.NoOriginalNode, baseNodeFactory);

    let fileName: string;
    let sourceFlags: ts.NodeFlags;
    let sourceText: string;
    let languageVersion: ts.ScriptTarget;
    let scriptKind: ts.ScriptKind;
    let languageVariant: ts.LanguageVariant;
    let parseDiagnostics: ts.DiagnosticWithDetachedLocation[];
    let jsDocDiagnostics: ts.DiagnosticWithDetachedLocation[];
    let syntaxCursor: IncrementalParser.SyntaxCursor | undefined;

    let currentToken: ts.SyntaxKind;
    let nodeCount: number;
    let identifiers: ts.ESMap<string, string>;
    let privateIdentifiers: ts.ESMap<string, string>;
    let identifierCount: number;

    let parsingContext: ParsingContext;

    let notParenthesizedArrow: ts.Set<number> | undefined;

    // Flags that dictate what parsing context we're in.  For example:
    // Whether or not we are in strict parsing mode.  All that changes in strict parsing mode is
    // that some tokens that would be considered identifiers may be considered keywords.
    //
    // When adding more parser context flags, consider which is the more common case that the
    // flag will be in.  This should be the 'false' state for that flag.  The reason for this is
    // that we don't store data in our nodes unless the value is in the *non-default* state.  So,
    // for example, more often than code 'allows-in' (or doesn't 'disallow-in').  We opt for
    // 'disallow-in' set to 'false'.  Otherwise, if we had 'allowsIn' set to 'true', then almost
    // all nodes would need extra state on them to store this info.
    //
    // Note: 'allowIn' and 'allowYield' track 1:1 with the [in] and [yield] concepts in the ES6
    // grammar specification.
    //
    // An important thing about these context concepts.  By default they are effectively inherited
    // while parsing through every grammar production.  i.e. if you don't change them, then when
    // you parse a sub-production, it will have the same context values as the parent production.
    // This is great most of the time.  After all, consider all the 'expression' grammar productions
    // and how nearly all of them pass along the 'in' and 'yield' context values:
    //
    // EqualityExpression[In, Yield] :
    //      RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] == RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] != RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] === RelationalExpression[?In, ?Yield]
    //      EqualityExpression[?In, ?Yield] !== RelationalExpression[?In, ?Yield]
    //
    // Where you have to be careful is then understanding what the points are in the grammar
    // where the values are *not* passed along.  For example:
    //
    // SingleNameBinding[Yield,GeneratorParameter]
    //      [+GeneratorParameter]BindingIdentifier[Yield] Initializer[In]opt
    //      [~GeneratorParameter]BindingIdentifier[?Yield]Initializer[In, ?Yield]opt
    //
    // Here this is saying that if the GeneratorParameter context flag is set, that we should
    // explicitly set the 'yield' context flag to false before calling into the BindingIdentifier
    // and we should explicitly unset the 'yield' context flag before calling into the Initializer.
    // production.  Conversely, if the GeneratorParameter context flag is not set, then we
    // should leave the 'yield' context flag alone.
    //
    // Getting this all correct is tricky and requires careful reading of the grammar to
    // understand when these values should be changed versus when they should be inherited.
    //
    // Note: it should not be necessary to save/restore these flags during speculative/lookahead
    // parsing.  These context flags are naturally stored and restored through normal recursive
    // descent parsing and unwinding.
    let contextFlags: ts.NodeFlags;

    // Indicates whether we are currently parsing top-level statements.
    let topLevel = true;

    // Whether or not we've had a parse error since creating the last AST node.  If we have
    // encountered an error, it will be stored on the next AST node we create.  Parse errors
    // can be broken down into three categories:
    //
    // 1) An error that occurred during scanning.  For example, an unterminated literal, or a
    //    character that was completely not understood.
    //
    // 2) A token was expected, but was not present.  This type of error is commonly produced
    //    by the 'parseExpected' function.
    //
    // 3) A token was present that no parsing function was able to consume.  This type of error
    //    only occurs in the 'abortParsingListOrMoveToNextToken' function when the parser
    //    decides to skip the token.
    //
    // In all of these cases, we want to mark the next node as having had an error before it.
    // With this mark, we can know in incremental settings if this node can be reused, or if
    // we have to reparse it.  If we don't keep this information around, we may just reuse the
    // node.  in that event we would then not produce the same errors as we did before, causing
    // significant confusion problems.
    //
    // Note: it is necessary that this value be saved/restored during speculative/lookahead
    // parsing.  During lookahead parsing, we will often create a node.  That node will have
    // this value attached, and then this value will be set back to 'false'.  If we decide to
    // rewind, we must get back to the same value we had prior to the lookahead.
    //
    // Note: any errors at the end of the file that do not precede a regular node, should get
    // attached to the EOF token.
    let parseErrorBeforeNextFinishedNode = false;

    export function parseSourceFile(fileName: string, sourceText: string, languageVersion: ts.ScriptTarget, syntaxCursor: IncrementalParser.SyntaxCursor | undefined, setParentNodes = false, scriptKind?: ts.ScriptKind, setExternalModuleIndicatorOverride?: (file: ts.SourceFile) => void): ts.SourceFile {
        scriptKind = ts.ensureScriptKind(fileName, scriptKind);
        if (scriptKind === ts.ScriptKind.JSON) {
            const result = parseJsonText(fileName, sourceText, languageVersion, syntaxCursor, setParentNodes);
            ts.convertToObjectWorker(result, result.statements[0]?.expression, result.parseDiagnostics, /*returnValue*/ false, /*knownRootOptions*/ undefined, /*jsonConversionNotifier*/ undefined);
            result.referencedFiles = ts.emptyArray;
            result.typeReferenceDirectives = ts.emptyArray;
            result.libReferenceDirectives = ts.emptyArray;
            result.amdDependencies = ts.emptyArray;
            result.hasNoDefaultLib = false;
            result.pragmas = ts.emptyMap as ts.ReadonlyPragmaMap;
            return result;
        }

        initializeState(fileName, sourceText, languageVersion, syntaxCursor, scriptKind);

        const result = parseSourceFileWorker(languageVersion, setParentNodes, scriptKind, setExternalModuleIndicatorOverride || setExternalModuleIndicator);

        clearState();

        return result;
    }

    export function parseIsolatedEntityName(content: string, languageVersion: ts.ScriptTarget): ts.EntityName | undefined {
        // Choice of `isDeclarationFile` should be arbitrary
        initializeState("", content, languageVersion, /*syntaxCursor*/ undefined, ts.ScriptKind.JS);
        // Prime the scanner.
        nextToken();
        const entityName = parseEntityName(/*allowReservedWords*/ true);
        const isInvalid = token() === ts.SyntaxKind.EndOfFileToken && !parseDiagnostics.length;
        clearState();
        return isInvalid ? entityName : undefined;
    }

    export function parseJsonText(fileName: string, sourceText: string, languageVersion: ts.ScriptTarget = ts.ScriptTarget.ES2015, syntaxCursor?: IncrementalParser.SyntaxCursor, setParentNodes = false): ts.JsonSourceFile {
        initializeState(fileName, sourceText, languageVersion, syntaxCursor, ts.ScriptKind.JSON);
        sourceFlags = contextFlags;

        // Prime the scanner.
        nextToken();
        const pos = getNodePos();
        let statements, endOfFileToken;
        if (token() === ts.SyntaxKind.EndOfFileToken) {
            statements = createNodeArray([], pos, pos);
            endOfFileToken = parseTokenNode<ts.EndOfFileToken>();
        }
        else {
            // Loop and synthesize an ArrayLiteralExpression if there are more than
            // one top-level expressions to ensure all input text is consumed.
            let expressions: ts.Expression[] | ts.Expression | undefined;
            while (token() !== ts.SyntaxKind.EndOfFileToken) {
                let expression;
                switch (token()) {
                    case ts.SyntaxKind.OpenBracketToken:
                        expression = parseArrayLiteralExpression();
                        break;
                    case ts.SyntaxKind.TrueKeyword:
                    case ts.SyntaxKind.FalseKeyword:
                    case ts.SyntaxKind.NullKeyword:
                        expression = parseTokenNode<ts.BooleanLiteral | ts.NullLiteral>();
                        break;
                    case ts.SyntaxKind.MinusToken:
                        if (lookAhead(() => nextToken() === ts.SyntaxKind.NumericLiteral && nextToken() !== ts.SyntaxKind.ColonToken)) {
                            expression = parsePrefixUnaryExpression() as ts.JsonMinusNumericLiteral;
                        }
                        else {
                            expression = parseObjectLiteralExpression();
                        }
                        break;
                    case ts.SyntaxKind.NumericLiteral:
                    case ts.SyntaxKind.StringLiteral:
                        if (lookAhead(() => nextToken() !== ts.SyntaxKind.ColonToken)) {
                            expression = parseLiteralNode() as ts.StringLiteral | ts.NumericLiteral;
                            break;
                        }
                        // falls through
                    default:
                        expression = parseObjectLiteralExpression();
                        break;
                }

                // Error recovery: collect multiple top-level expressions
                if (expressions && ts.isArray(expressions)) {
                    expressions.push(expression);
                }
                else if (expressions) {
                    expressions = [expressions, expression];
                }
                else {
                    expressions = expression;
                    if (token() !== ts.SyntaxKind.EndOfFileToken) {
                        parseErrorAtCurrentToken(ts.Diagnostics.Unexpected_token);
                    }
                }
            }

            const expression = ts.isArray(expressions) ? finishNode(factory.createArrayLiteralExpression(expressions), pos) : ts.Debug.checkDefined(expressions);
            const statement = factory.createExpressionStatement(expression) as ts.JsonObjectExpressionStatement;
            finishNode(statement, pos);
            statements = createNodeArray([statement], pos);
            endOfFileToken = parseExpectedToken(ts.SyntaxKind.EndOfFileToken, ts.Diagnostics.Unexpected_token);
        }

        // Set source file so that errors will be reported with this file name
        const sourceFile = createSourceFile(fileName, ts.ScriptTarget.ES2015, ts.ScriptKind.JSON, /*isDeclaration*/ false, statements, endOfFileToken, sourceFlags, ts.noop);

        if (setParentNodes) {
            fixupParentReferences(sourceFile);
        }

        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.parseDiagnostics = ts.attachFileToDiagnostics(parseDiagnostics, sourceFile);
        if (jsDocDiagnostics) {
            sourceFile.jsDocDiagnostics = ts.attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
        }

        const result = sourceFile as ts.JsonSourceFile;
        clearState();
        return result;
    }

    function initializeState(_fileName: string, _sourceText: string, _languageVersion: ts.ScriptTarget, _syntaxCursor: IncrementalParser.SyntaxCursor | undefined, _scriptKind: ts.ScriptKind) {
        NodeConstructor = ts.objectAllocator.getNodeConstructor();
        TokenConstructor = ts.objectAllocator.getTokenConstructor();
        IdentifierConstructor = ts.objectAllocator.getIdentifierConstructor();
        PrivateIdentifierConstructor = ts.objectAllocator.getPrivateIdentifierConstructor();
        SourceFileConstructor = ts.objectAllocator.getSourceFileConstructor();

        fileName = ts.normalizePath(_fileName);
        sourceText = _sourceText;
        languageVersion = _languageVersion;
        syntaxCursor = _syntaxCursor;
        scriptKind = _scriptKind;
        languageVariant = ts.getLanguageVariant(_scriptKind);

        parseDiagnostics = [];
        parsingContext = 0;
        identifiers = new ts.Map<string, string>();
        privateIdentifiers = new ts.Map<string, string>();
        identifierCount = 0;
        nodeCount = 0;
        sourceFlags = 0;
        topLevel = true;

        switch (scriptKind) {
            case ts.ScriptKind.JS:
            case ts.ScriptKind.JSX:
                contextFlags = ts.NodeFlags.JavaScriptFile;
                break;
            case ts.ScriptKind.JSON:
                contextFlags = ts.NodeFlags.JavaScriptFile | ts.NodeFlags.JsonFile;
                break;
            default:
                contextFlags = ts.NodeFlags.None;
                break;
        }
        parseErrorBeforeNextFinishedNode = false;

        // Initialize and prime the scanner before parsing the source elements.
        scanner.setText(sourceText);
        scanner.setOnError(scanError);
        scanner.setScriptTarget(languageVersion);
        scanner.setLanguageVariant(languageVariant);
    }

    function clearState() {
        // Clear out the text the scanner is pointing at, so it doesn't keep anything alive unnecessarily.
        scanner.clearCommentDirectives();
        scanner.setText("");
        scanner.setOnError(undefined);

        // Clear any data.  We don't want to accidentally hold onto it for too long.
        sourceText = undefined!;
        languageVersion = undefined!;
        syntaxCursor = undefined;
        scriptKind = undefined!;
        languageVariant = undefined!;
        sourceFlags = 0;
        parseDiagnostics = undefined!;
        jsDocDiagnostics = undefined!;
        parsingContext = 0;
        identifiers = undefined!;
        notParenthesizedArrow = undefined;
        topLevel = true;
    }

    function parseSourceFileWorker(languageVersion: ts.ScriptTarget, setParentNodes: boolean, scriptKind: ts.ScriptKind, setExternalModuleIndicator: (file: ts.SourceFile) => void): ts.SourceFile {
        const isDeclarationFile = isDeclarationFileName(fileName);
        if (isDeclarationFile) {
            contextFlags |= ts.NodeFlags.Ambient;
        }

        sourceFlags = contextFlags;

        // Prime the scanner.
        nextToken();

        const statements = parseList(ParsingContext.SourceElements, parseStatement);
        ts.Debug.assert(token() === ts.SyntaxKind.EndOfFileToken);
        const endOfFileToken = addJSDocComment(parseTokenNode<ts.EndOfFileToken>());

        const sourceFile = createSourceFile(fileName, languageVersion, scriptKind, isDeclarationFile, statements, endOfFileToken, sourceFlags, setExternalModuleIndicator);

        // A member of ReadonlyArray<T> isn't assignable to a member of T[] (and prevents a direct cast) - but this is where we set up those members so they can be readonly in the future
        processCommentPragmas(sourceFile as {} as PragmaContext, sourceText);
        processPragmasIntoFields(sourceFile as {} as PragmaContext, reportPragmaDiagnostic);

        sourceFile.commentDirectives = scanner.getCommentDirectives();
        sourceFile.nodeCount = nodeCount;
        sourceFile.identifierCount = identifierCount;
        sourceFile.identifiers = identifiers;
        sourceFile.parseDiagnostics = ts.attachFileToDiagnostics(parseDiagnostics, sourceFile);
        if (jsDocDiagnostics) {
            sourceFile.jsDocDiagnostics = ts.attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
        }

        if (setParentNodes) {
            fixupParentReferences(sourceFile);
        }

        return sourceFile;

        function reportPragmaDiagnostic(pos: number, end: number, diagnostic: ts.DiagnosticMessage) {
            parseDiagnostics.push(ts.createDetachedDiagnostic(fileName, pos, end, diagnostic));
        }
    }

    function withJSDoc<T extends ts.HasJSDoc>(node: T, hasJSDoc: boolean): T {
        return hasJSDoc ? addJSDocComment(node) : node;
    }

    let hasDeprecatedTag = false;
    function addJSDocComment<T extends ts.HasJSDoc>(node: T): T {
        ts.Debug.assert(!node.jsDoc); // Should only be called once per node
        const jsDoc = ts.mapDefined(ts.getJSDocCommentRanges(node, sourceText), comment => JSDocParser.parseJSDocComment(node, comment.pos, comment.end - comment.pos));
        if (jsDoc.length) node.jsDoc = jsDoc;
        if (hasDeprecatedTag) {
            hasDeprecatedTag = false;
            (node as ts.Mutable<T>).flags |= ts.NodeFlags.Deprecated;
        }
        return node;
    }

    function reparseTopLevelAwait(sourceFile: ts.SourceFile) {
        const savedSyntaxCursor = syntaxCursor;
        const baseSyntaxCursor = IncrementalParser.createSyntaxCursor(sourceFile);
        syntaxCursor = { currentNode };

        const statements: ts.Statement[] = [];
        const savedParseDiagnostics = parseDiagnostics;

        parseDiagnostics = [];

        let pos = 0;
        let start = findNextStatementWithAwait(sourceFile.statements, 0);
        while (start !== -1) {
            // append all statements between pos and start
            const prevStatement = sourceFile.statements[pos];
            const nextStatement = sourceFile.statements[start];
            ts.addRange(statements, sourceFile.statements, pos, start);
            pos = findNextStatementWithoutAwait(sourceFile.statements, start);

            // append all diagnostics associated with the copied range
            const diagnosticStart = ts.findIndex(savedParseDiagnostics, diagnostic => diagnostic.start >= prevStatement.pos);
            const diagnosticEnd = diagnosticStart >= 0 ? ts.findIndex(savedParseDiagnostics, diagnostic => diagnostic.start >= nextStatement.pos, diagnosticStart) : -1;
            if (diagnosticStart >= 0) {
                ts.addRange(parseDiagnostics, savedParseDiagnostics, diagnosticStart, diagnosticEnd >= 0 ? diagnosticEnd : undefined);
            }

            // reparse all statements between start and pos. We skip existing diagnostics for the same range and allow the parser to generate new ones.
            speculationHelper(() => {
                const savedContextFlags = contextFlags;
                contextFlags |= ts.NodeFlags.AwaitContext;
                scanner.setTextPos(nextStatement.pos);
                nextToken();

                while (token() !== ts.SyntaxKind.EndOfFileToken) {
                    const startPos = scanner.getStartPos();
                    const statement = parseListElement(ParsingContext.SourceElements, parseStatement);
                    statements.push(statement);
                    if (startPos === scanner.getStartPos()) {
                        nextToken();
                    }

                    if (pos >= 0) {
                        const nonAwaitStatement = sourceFile.statements[pos];
                        if (statement.end === nonAwaitStatement.pos) {
                            // done reparsing this section
                            break;
                        }
                        if (statement.end > nonAwaitStatement.pos) {
                            // we ate into the next statement, so we must reparse it.
                            pos = findNextStatementWithoutAwait(sourceFile.statements, pos + 1);
                        }
                    }
                }

                contextFlags = savedContextFlags;
            }, SpeculationKind.Reparse);

            // find the next statement containing an `await`
            start = pos >= 0 ? findNextStatementWithAwait(sourceFile.statements, pos) : -1;
        }

        // append all statements between pos and the end of the list
        if (pos >= 0) {
            const prevStatement = sourceFile.statements[pos];
            ts.addRange(statements, sourceFile.statements, pos);

            // append all diagnostics associated with the copied range
            const diagnosticStart = ts.findIndex(savedParseDiagnostics, diagnostic => diagnostic.start >= prevStatement.pos);
            if (diagnosticStart >= 0) {
                ts.addRange(parseDiagnostics, savedParseDiagnostics, diagnosticStart);
            }
        }

        syntaxCursor = savedSyntaxCursor;
        return factory.updateSourceFile(sourceFile, ts.setTextRange(factory.createNodeArray(statements), sourceFile.statements));

        function containsPossibleTopLevelAwait(node: ts.Node) {
            return !(node.flags & ts.NodeFlags.AwaitContext)
                && !!(node.transformFlags & ts.TransformFlags.ContainsPossibleTopLevelAwait);
        }

        function findNextStatementWithAwait(statements: ts.NodeArray<ts.Statement>, start: number) {
            for (let i = start; i < statements.length; i++) {
                if (containsPossibleTopLevelAwait(statements[i])) {
                    return i;
                }
            }
            return -1;
        }

        function findNextStatementWithoutAwait(statements: ts.NodeArray<ts.Statement>, start: number) {
            for (let i = start; i < statements.length; i++) {
                if (!containsPossibleTopLevelAwait(statements[i])) {
                    return i;
                }
            }
            return -1;
        }

        function currentNode(position: number) {
            const node = baseSyntaxCursor.currentNode(position);
            if (topLevel && node && containsPossibleTopLevelAwait(node)) {
                node.intersectsChange = true;
            }
            return node;
        }

    }

    export function fixupParentReferences(rootNode: ts.Node) {
        // normally parent references are set during binding. However, for clients that only need
        // a syntax tree, and no semantic features, then the binding process is an unnecessary
        // overhead.  This functions allows us to set all the parents, without all the expense of
        // binding.
        ts.setParentRecursive(rootNode, /*incremental*/ true);
    }

    function createSourceFile(
        fileName: string,
        languageVersion: ts.ScriptTarget,
        scriptKind: ts.ScriptKind,
        isDeclarationFile: boolean,
        statements: readonly ts.Statement[],
        endOfFileToken: ts.EndOfFileToken,
        flags: ts.NodeFlags,
        setExternalModuleIndicator: (sourceFile: ts.SourceFile) => void): ts.SourceFile {
        // code from createNode is inlined here so createNode won't have to deal with special case of creating source files
        // this is quite rare comparing to other nodes and createNode should be as fast as possible
        let sourceFile = factory.createSourceFile(statements, endOfFileToken, flags);
        ts.setTextRangePosWidth(sourceFile, 0, sourceText.length);
        setFields(sourceFile);

        // If we parsed this as an external module, it may contain top-level await
        if (!isDeclarationFile && isExternalModule(sourceFile) && sourceFile.transformFlags & ts.TransformFlags.ContainsPossibleTopLevelAwait) {
            sourceFile = reparseTopLevelAwait(sourceFile);
            setFields(sourceFile);
        }

        return sourceFile;

        function setFields(sourceFile: ts.SourceFile) {
            sourceFile.text = sourceText;
            sourceFile.bindDiagnostics = [];
            sourceFile.bindSuggestionDiagnostics = undefined;
            sourceFile.languageVersion = languageVersion;
            sourceFile.fileName = fileName;
            sourceFile.languageVariant = ts.getLanguageVariant(scriptKind);
            sourceFile.isDeclarationFile = isDeclarationFile;
            sourceFile.scriptKind = scriptKind;

            setExternalModuleIndicator(sourceFile);
            sourceFile.setExternalModuleIndicator = setExternalModuleIndicator;
        }
    }

    function setContextFlag(val: boolean, flag: ts.NodeFlags) {
        if (val) {
            contextFlags |= flag;
        }
        else {
            contextFlags &= ~flag;
        }
    }

    function setDisallowInContext(val: boolean) {
        setContextFlag(val, ts.NodeFlags.DisallowInContext);
    }

    function setYieldContext(val: boolean) {
        setContextFlag(val, ts.NodeFlags.YieldContext);
    }

    function setDecoratorContext(val: boolean) {
        setContextFlag(val, ts.NodeFlags.DecoratorContext);
    }

    function setAwaitContext(val: boolean) {
        setContextFlag(val, ts.NodeFlags.AwaitContext);
    }

    function doOutsideOfContext<T>(context: ts.NodeFlags, func: () => T): T {
        // contextFlagsToClear will contain only the context flags that are
        // currently set that we need to temporarily clear
        // We don't just blindly reset to the previous flags to ensure
        // that we do not mutate cached flags for the incremental
        // parser (ThisNodeHasError, ThisNodeOrAnySubNodesHasError, and
        // HasAggregatedChildData).
        const contextFlagsToClear = context & contextFlags;
        if (contextFlagsToClear) {
            // clear the requested context flags
            setContextFlag(/*val*/ false, contextFlagsToClear);
            const result = func();
            // restore the context flags we just cleared
            setContextFlag(/*val*/ true, contextFlagsToClear);
            return result;
        }

        // no need to do anything special as we are not in any of the requested contexts
        return func();
    }

    function doInsideOfContext<T>(context: ts.NodeFlags, func: () => T): T {
        // contextFlagsToSet will contain only the context flags that
        // are not currently set that we need to temporarily enable.
        // We don't just blindly reset to the previous flags to ensure
        // that we do not mutate cached flags for the incremental
        // parser (ThisNodeHasError, ThisNodeOrAnySubNodesHasError, and
        // HasAggregatedChildData).
        const contextFlagsToSet = context & ~contextFlags;
        if (contextFlagsToSet) {
            // set the requested context flags
            setContextFlag(/*val*/ true, contextFlagsToSet);
            const result = func();
            // reset the context flags we just set
            setContextFlag(/*val*/ false, contextFlagsToSet);
            return result;
        }

        // no need to do anything special as we are already in all of the requested contexts
        return func();
    }

    function allowInAnd<T>(func: () => T): T {
        return doOutsideOfContext(ts.NodeFlags.DisallowInContext, func);
    }

    function disallowInAnd<T>(func: () => T): T {
        return doInsideOfContext(ts.NodeFlags.DisallowInContext, func);
    }

    function allowConditionalTypesAnd<T>(func: () => T): T {
        return doOutsideOfContext(ts.NodeFlags.DisallowConditionalTypesContext, func);
    }

    function disallowConditionalTypesAnd<T>(func: () => T): T {
        return doInsideOfContext(ts.NodeFlags.DisallowConditionalTypesContext, func);
    }

    function doInYieldContext<T>(func: () => T): T {
        return doInsideOfContext(ts.NodeFlags.YieldContext, func);
    }

    function doInDecoratorContext<T>(func: () => T): T {
        return doInsideOfContext(ts.NodeFlags.DecoratorContext, func);
    }

    function doInAwaitContext<T>(func: () => T): T {
        return doInsideOfContext(ts.NodeFlags.AwaitContext, func);
    }

    function doOutsideOfAwaitContext<T>(func: () => T): T {
        return doOutsideOfContext(ts.NodeFlags.AwaitContext, func);
    }

    function doInYieldAndAwaitContext<T>(func: () => T): T {
        return doInsideOfContext(ts.NodeFlags.YieldContext | ts.NodeFlags.AwaitContext, func);
    }

    function doOutsideOfYieldAndAwaitContext<T>(func: () => T): T {
        return doOutsideOfContext(ts.NodeFlags.YieldContext | ts.NodeFlags.AwaitContext, func);
    }

    function inContext(flags: ts.NodeFlags) {
        return (contextFlags & flags) !== 0;
    }

    function inYieldContext() {
        return inContext(ts.NodeFlags.YieldContext);
    }

    function inDisallowInContext() {
        return inContext(ts.NodeFlags.DisallowInContext);
    }

    function inDisallowConditionalTypesContext() {
        return inContext(ts.NodeFlags.DisallowConditionalTypesContext);
    }

    function inDecoratorContext() {
        return inContext(ts.NodeFlags.DecoratorContext);
    }

    function inAwaitContext() {
        return inContext(ts.NodeFlags.AwaitContext);
    }

    function parseErrorAtCurrentToken(message: ts.DiagnosticMessage, arg0?: any): ts.DiagnosticWithDetachedLocation | undefined {
        return parseErrorAt(scanner.getTokenPos(), scanner.getTextPos(), message, arg0);
    }

    function parseErrorAtPosition(start: number, length: number, message: ts.DiagnosticMessage, arg0?: any): ts.DiagnosticWithDetachedLocation | undefined {
        // Don't report another error if it would just be at the same position as the last error.
        const lastError = ts.lastOrUndefined(parseDiagnostics);
        let result: ts.DiagnosticWithDetachedLocation | undefined;
        if (!lastError || start !== lastError.start) {
            result = ts.createDetachedDiagnostic(fileName, start, length, message, arg0);
            parseDiagnostics.push(result);
        }

        // Mark that we've encountered an error.  We'll set an appropriate bit on the next
        // node we finish so that it can't be reused incrementally.
        parseErrorBeforeNextFinishedNode = true;
        return result;
    }

    function parseErrorAt(start: number, end: number, message: ts.DiagnosticMessage, arg0?: any): ts.DiagnosticWithDetachedLocation | undefined {
        return parseErrorAtPosition(start, end - start, message, arg0);
    }

    function parseErrorAtRange(range: ts.TextRange, message: ts.DiagnosticMessage, arg0?: any): void {
        parseErrorAt(range.pos, range.end, message, arg0);
    }

    function scanError(message: ts.DiagnosticMessage, length: number): void {
        parseErrorAtPosition(scanner.getTextPos(), length, message);
    }

    function getNodePos(): number {
        return scanner.getStartPos();
    }

    function hasPrecedingJSDocComment() {
        return scanner.hasPrecedingJSDocComment();
    }

    // Use this function to access the current token instead of reading the currentToken
    // variable. Since function results aren't narrowed in control flow analysis, this ensures
    // that the type checker doesn't make wrong assumptions about the type of the current
    // token (e.g. a call to nextToken() changes the current token but the checker doesn't
    // reason about this side effect).  Mainstream VMs inline simple functions like this, so
    // there is no performance penalty.
    function token(): ts.SyntaxKind {
        return currentToken;
    }

    function nextTokenWithoutCheck() {
        return currentToken = scanner.scan();
    }

    function nextTokenAnd<T>(func: () => T): T {
        nextToken();
        return func();
    }

    function nextToken(): ts.SyntaxKind {
        // if the keyword had an escape
        if (ts.isKeyword(currentToken) && (scanner.hasUnicodeEscape() || scanner.hasExtendedUnicodeEscape())) {
            // issue a parse error for the escape
            parseErrorAt(scanner.getTokenPos(), scanner.getTextPos(), ts.Diagnostics.Keywords_cannot_contain_escape_characters);
        }
        return nextTokenWithoutCheck();
    }

    function nextTokenJSDoc(): ts.JSDocSyntaxKind {
        return currentToken = scanner.scanJsDocToken();
    }

    function reScanGreaterToken(): ts.SyntaxKind {
        return currentToken = scanner.reScanGreaterToken();
    }

    function reScanSlashToken(): ts.SyntaxKind {
        return currentToken = scanner.reScanSlashToken();
    }

    function reScanTemplateToken(isTaggedTemplate: boolean): ts.SyntaxKind {
        return currentToken = scanner.reScanTemplateToken(isTaggedTemplate);
    }

    function reScanTemplateHeadOrNoSubstitutionTemplate(): ts.SyntaxKind {
        return currentToken = scanner.reScanTemplateHeadOrNoSubstitutionTemplate();
    }

    function reScanLessThanToken(): ts.SyntaxKind {
        return currentToken = scanner.reScanLessThanToken();
    }

    function reScanHashToken(): ts.SyntaxKind {
        return currentToken = scanner.reScanHashToken();
    }

    function scanJsxIdentifier(): ts.SyntaxKind {
        return currentToken = scanner.scanJsxIdentifier();
    }

    function scanJsxText(): ts.SyntaxKind {
        return currentToken = scanner.scanJsxToken();
    }

    function scanJsxAttributeValue(): ts.SyntaxKind {
        return currentToken = scanner.scanJsxAttributeValue();
    }

    function speculationHelper<T>(callback: () => T, speculationKind: SpeculationKind): T {
        // Keep track of the state we'll need to rollback to if lookahead fails (or if the
        // caller asked us to always reset our state).
        const saveToken = currentToken;
        const saveParseDiagnosticsLength = parseDiagnostics.length;
        const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;

        // Note: it is not actually necessary to save/restore the context flags here.  That's
        // because the saving/restoring of these flags happens naturally through the recursive
        // descent nature of our parser.  However, we still store this here just so we can
        // assert that invariant holds.
        const saveContextFlags = contextFlags;

        // If we're only looking ahead, then tell the scanner to only lookahead as well.
        // Otherwise, if we're actually speculatively parsing, then tell the scanner to do the
        // same.
        const result = speculationKind !== SpeculationKind.TryParse
            ? scanner.lookAhead(callback)
            : scanner.tryScan(callback);

        ts.Debug.assert(saveContextFlags === contextFlags);

        // If our callback returned something 'falsy' or we're just looking ahead,
        // then unconditionally restore us to where we were.
        if (!result || speculationKind !== SpeculationKind.TryParse) {
            currentToken = saveToken;
            if (speculationKind !== SpeculationKind.Reparse) {
                parseDiagnostics.length = saveParseDiagnosticsLength;
            }
            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
        }

        return result;
    }

    /** Invokes the provided callback then unconditionally restores the parser to the state it
     * was in immediately prior to invoking the callback.  The result of invoking the callback
     * is returned from this function.
     */
    function lookAhead<T>(callback: () => T): T {
        return speculationHelper(callback, SpeculationKind.Lookahead);
    }

    /** Invokes the provided callback.  If the callback returns something falsy, then it restores
     * the parser to the state it was in immediately prior to invoking the callback.  If the
     * callback returns something truthy, then the parser state is not rolled back.  The result
     * of invoking the callback is returned from this function.
     */
    function tryParse<T>(callback: () => T): T {
        return speculationHelper(callback, SpeculationKind.TryParse);
    }

    function isBindingIdentifier(): boolean {
        if (token() === ts.SyntaxKind.Identifier) {
            return true;
        }

        // `let await`/`let yield` in [Yield] or [Await] are allowed here and disallowed in the binder.
        return token() > ts.SyntaxKind.LastReservedWord;
    }

    // Ignore strict mode flag because we will report an error in type checker instead.
    function isIdentifier(): boolean {
        if (token() === ts.SyntaxKind.Identifier) {
            return true;
        }

        // If we have a 'yield' keyword, and we're in the [yield] context, then 'yield' is
        // considered a keyword and is not an identifier.
        if (token() === ts.SyntaxKind.YieldKeyword && inYieldContext()) {
            return false;
        }

        // If we have a 'await' keyword, and we're in the [Await] context, then 'await' is
        // considered a keyword and is not an identifier.
        if (token() === ts.SyntaxKind.AwaitKeyword && inAwaitContext()) {
            return false;
        }

        return token() > ts.SyntaxKind.LastReservedWord;
    }

    function parseExpected(kind: ts.SyntaxKind, diagnosticMessage?: ts.DiagnosticMessage, shouldAdvance = true): boolean {
        if (token() === kind) {
            if (shouldAdvance) {
                nextToken();
            }
            return true;
        }

        // Report specific message if provided with one.  Otherwise, report generic fallback message.
        if (diagnosticMessage) {
            parseErrorAtCurrentToken(diagnosticMessage);
        }
        else {
            parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(kind));
        }
        return false;
    }

    const viableKeywordSuggestions = Object.keys(ts.textToKeywordObj).filter(keyword => keyword.length > 2);

    /**
     * Provides a better error message than the generic "';' expected" if possible for
     * known common variants of a missing semicolon, such as from a mispelled names.
     *
     * @param node Node preceding the expected semicolon location.
     */
    function parseErrorForMissingSemicolonAfter(node: ts.Expression | ts.PropertyName): void {
        // Tagged template literals are sometimes used in places where only simple strings are allowed, i.e.:
        //   module `M1` {
        //   ^^^^^^^^^^^ This block is parsed as a template literal like module`M1`.
        if (ts.isTaggedTemplateExpression(node)) {
            parseErrorAt(ts.skipTrivia(sourceText, node.template.pos), node.template.end, ts.Diagnostics.Module_declaration_names_may_only_use_or_quoted_strings);
            return;
        }

        // Otherwise, if this isn't a well-known keyword-like identifier, give the generic fallback message.
        const expressionText = ts.isIdentifier(node) ? ts.idText(node) : undefined;
        if (!expressionText || !ts.isIdentifierText(expressionText, languageVersion)) {
            parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(ts.SyntaxKind.SemicolonToken));
            return;
        }

        const pos = ts.skipTrivia(sourceText, node.pos);

        // Some known keywords are likely signs of syntax being used improperly.
        switch (expressionText) {
            case "const":
            case "let":
            case "var":
                parseErrorAt(pos, node.end, ts.Diagnostics.Variable_declaration_not_allowed_at_this_location);
                return;

            case "declare":
                // If a declared node failed to parse, it would have emitted a diagnostic already.
                return;

            case "interface":
                parseErrorForInvalidName(ts.Diagnostics.Interface_name_cannot_be_0, ts.Diagnostics.Interface_must_be_given_a_name, ts.SyntaxKind.OpenBraceToken);
                return;

            case "is":
                parseErrorAt(pos, scanner.getTextPos(), ts.Diagnostics.A_type_predicate_is_only_allowed_in_return_type_position_for_functions_and_methods);
                return;

            case "module":
            case "namespace":
                parseErrorForInvalidName(ts.Diagnostics.Namespace_name_cannot_be_0, ts.Diagnostics.Namespace_must_be_given_a_name, ts.SyntaxKind.OpenBraceToken);
                return;

            case "type":
                parseErrorForInvalidName(ts.Diagnostics.Type_alias_name_cannot_be_0, ts.Diagnostics.Type_alias_must_be_given_a_name, ts.SyntaxKind.EqualsToken);
                return;
        }

        // The user alternatively might have misspelled or forgotten to add a space after a common keyword.
        const suggestion = ts.getSpellingSuggestion(expressionText, viableKeywordSuggestions, n => n) ?? getSpaceSuggestion(expressionText);
        if (suggestion) {
            parseErrorAt(pos, node.end, ts.Diagnostics.Unknown_keyword_or_identifier_Did_you_mean_0, suggestion);
            return;
        }

        // Unknown tokens are handled with their own errors in the scanner
        if (token() === ts.SyntaxKind.Unknown) {
            return;
        }

        // Otherwise, we know this some kind of unknown word, not just a missing expected semicolon.
        parseErrorAt(pos, node.end, ts.Diagnostics.Unexpected_keyword_or_identifier);
    }

    /**
     * Reports a diagnostic error for the current token being an invalid name.
     *
     * @param blankDiagnostic Diagnostic to report for the case of the name being blank (matched tokenIfBlankName).
     * @param nameDiagnostic Diagnostic to report for all other cases.
     * @param tokenIfBlankName Current token if the name was invalid for being blank (not provided / skipped).
     */
    function parseErrorForInvalidName(nameDiagnostic: ts.DiagnosticMessage, blankDiagnostic: ts.DiagnosticMessage, tokenIfBlankName: ts.SyntaxKind) {
        if (token() === tokenIfBlankName) {
            parseErrorAtCurrentToken(blankDiagnostic);
        }
        else {
            parseErrorAtCurrentToken(nameDiagnostic, scanner.getTokenValue());
        }
    }

    function getSpaceSuggestion(expressionText: string) {
        for (const keyword of viableKeywordSuggestions) {
            if (expressionText.length > keyword.length + 2 && ts.startsWith(expressionText, keyword)) {
                return `${keyword} ${expressionText.slice(keyword.length)}`;
            }
        }

        return undefined;
    }

    function parseSemicolonAfterPropertyName(name: ts.PropertyName, type: ts.TypeNode | undefined, initializer: ts.Expression | undefined) {
        if (token() === ts.SyntaxKind.AtToken && !scanner.hasPrecedingLineBreak()) {
            parseErrorAtCurrentToken(ts.Diagnostics.Decorators_must_precede_the_name_and_all_keywords_of_property_declarations);
            return;
        }

        if (token() === ts.SyntaxKind.OpenParenToken) {
            parseErrorAtCurrentToken(ts.Diagnostics.Cannot_start_a_function_call_in_a_type_annotation);
            nextToken();
            return;
        }

        if (type && !canParseSemicolon()) {
            if (initializer) {
                parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(ts.SyntaxKind.SemicolonToken));
            }
            else {
                parseErrorAtCurrentToken(ts.Diagnostics.Expected_for_property_initializer);
            }
            return;
        }

        if (tryParseSemicolon()) {
            return;
        }

        if (initializer) {
            parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(ts.SyntaxKind.SemicolonToken));
            return;
        }

        parseErrorForMissingSemicolonAfter(name);
    }

    function parseExpectedJSDoc(kind: ts.JSDocSyntaxKind) {
        if (token() === kind) {
            nextTokenJSDoc();
            return true;
        }
        parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(kind));
        return false;
    }

    function parseExpectedMatchingBrackets(openKind: ts.SyntaxKind, closeKind: ts.SyntaxKind, openParsed: boolean, openPosition: number) {
        if (token() === closeKind) {
            nextToken();
            return;
        }
        const lastError = parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(closeKind));
        if (!openParsed) {
            return;
        }
        if (lastError) {
            ts.addRelatedInfo(
                lastError,
                ts.createDetachedDiagnostic(fileName, openPosition, 1, ts.Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, ts.tokenToString(openKind), ts.tokenToString(closeKind))
            );
        }
    }

    function parseOptional(t: ts.SyntaxKind): boolean {
        if (token() === t) {
            nextToken();
            return true;
        }
        return false;
    }

    function parseOptionalToken<TKind extends ts.SyntaxKind>(t: TKind): ts.Token<TKind>;
    function parseOptionalToken(t: ts.SyntaxKind): ts.Node | undefined {
        if (token() === t) {
            return parseTokenNode();
        }
        return undefined;
    }

    function parseOptionalTokenJSDoc<TKind extends ts.JSDocSyntaxKind>(t: TKind): ts.Token<TKind>;
    function parseOptionalTokenJSDoc(t: ts.JSDocSyntaxKind): ts.Node | undefined {
        if (token() === t) {
            return parseTokenNodeJSDoc();
        }
        return undefined;
    }

    function parseExpectedToken<TKind extends ts.SyntaxKind>(t: TKind, diagnosticMessage?: ts.DiagnosticMessage, arg0?: any): ts.Token<TKind>;
    function parseExpectedToken(t: ts.SyntaxKind, diagnosticMessage?: ts.DiagnosticMessage, arg0?: any): ts.Node {
        return parseOptionalToken(t) ||
            createMissingNode(t, /*reportAtCurrentPosition*/ false, diagnosticMessage || ts.Diagnostics._0_expected, arg0 || ts.tokenToString(t));
    }

    function parseExpectedTokenJSDoc<TKind extends ts.JSDocSyntaxKind>(t: TKind): ts.Token<TKind>;
    function parseExpectedTokenJSDoc(t: ts.JSDocSyntaxKind): ts.Node {
        return parseOptionalTokenJSDoc(t) ||
            createMissingNode(t, /*reportAtCurrentPosition*/ false, ts.Diagnostics._0_expected, ts.tokenToString(t));
    }

    function parseTokenNode<T extends ts.Node>(): T {
        const pos = getNodePos();
        const kind = token();
        nextToken();
        return finishNode(factory.createToken(kind), pos) as T;
    }

    function parseTokenNodeJSDoc<T extends ts.Node>(): T {
        const pos = getNodePos();
        const kind = token();
        nextTokenJSDoc();
        return finishNode(factory.createToken(kind), pos) as T;
    }

    function canParseSemicolon() {
        // If there's a real semicolon, then we can always parse it out.
        if (token() === ts.SyntaxKind.SemicolonToken) {
            return true;
        }

        // We can parse out an optional semicolon in ASI cases in the following cases.
        return token() === ts.SyntaxKind.CloseBraceToken || token() === ts.SyntaxKind.EndOfFileToken || scanner.hasPrecedingLineBreak();
    }

    function tryParseSemicolon() {
        if (!canParseSemicolon()) {
            return false;
        }

        if (token() === ts.SyntaxKind.SemicolonToken) {
            // consume the semicolon if it was explicitly provided.
            nextToken();
        }

        return true;
    }

    function parseSemicolon(): boolean {
        return tryParseSemicolon() || parseExpected(ts.SyntaxKind.SemicolonToken);
    }

    function createNodeArray<T extends ts.Node>(elements: T[], pos: number, end?: number, hasTrailingComma?: boolean): ts.NodeArray<T> {
        const array = factory.createNodeArray(elements, hasTrailingComma);
        ts.setTextRangePosEnd(array, pos, end ?? scanner.getStartPos());
        return array;
    }

    function finishNode<T extends ts.Node>(node: T, pos: number, end?: number): T {
        ts.setTextRangePosEnd(node, pos, end ?? scanner.getStartPos());
        if (contextFlags) {
            (node as ts.Mutable<T>).flags |= contextFlags;
        }

        // Keep track on the node if we encountered an error while parsing it.  If we did, then
        // we cannot reuse the node incrementally.  Once we've marked this node, clear out the
        // flag so that we don't mark any subsequent nodes.
        if (parseErrorBeforeNextFinishedNode) {
            parseErrorBeforeNextFinishedNode = false;
            (node as ts.Mutable<T>).flags |= ts.NodeFlags.ThisNodeHasError;
        }

        return node;
    }

    function createMissingNode<T extends ts.Node>(kind: T["kind"], reportAtCurrentPosition: false, diagnosticMessage?: ts.DiagnosticMessage, arg0?: any): T;
    function createMissingNode<T extends ts.Node>(kind: T["kind"], reportAtCurrentPosition: boolean, diagnosticMessage: ts.DiagnosticMessage, arg0?: any): T;
    function createMissingNode<T extends ts.Node>(kind: T["kind"], reportAtCurrentPosition: boolean, diagnosticMessage: ts.DiagnosticMessage, arg0?: any): T {
        if (reportAtCurrentPosition) {
            parseErrorAtPosition(scanner.getStartPos(), 0, diagnosticMessage, arg0);
        }
        else if (diagnosticMessage) {
            parseErrorAtCurrentToken(diagnosticMessage, arg0);
        }

        const pos = getNodePos();
        const result =
            kind === ts.SyntaxKind.Identifier ? factory.createIdentifier("", /*typeArguments*/ undefined, /*originalKeywordKind*/ undefined) :
            ts.isTemplateLiteralKind(kind) ? factory.createTemplateLiteralLikeNode(kind, "", "", /*templateFlags*/ undefined) :
            kind === ts.SyntaxKind.NumericLiteral ? factory.createNumericLiteral("", /*numericLiteralFlags*/ undefined) :
            kind === ts.SyntaxKind.StringLiteral ? factory.createStringLiteral("", /*isSingleQuote*/ undefined) :
            kind === ts.SyntaxKind.MissingDeclaration ? factory.createMissingDeclaration() :
            factory.createToken(kind);
        return finishNode(result, pos) as T;
    }

    function internIdentifier(text: string): string {
        let identifier = identifiers.get(text);
        if (identifier === undefined) {
            identifiers.set(text, identifier = text);
        }
        return identifier;
    }

    // An identifier that starts with two underscores has an extra underscore character prepended to it to avoid issues
    // with magic property names like '__proto__'. The 'identifiers' object is used to share a single string instance for
    // each identifier in order to reduce memory consumption.
    function createIdentifier(isIdentifier: boolean, diagnosticMessage?: ts.DiagnosticMessage, privateIdentifierDiagnosticMessage?: ts.DiagnosticMessage): ts.Identifier {
        if (isIdentifier) {
            identifierCount++;
            const pos = getNodePos();
            // Store original token kind if it is not just an Identifier so we can report appropriate error later in type checker
            const originalKeywordKind = token();
            const text = internIdentifier(scanner.getTokenValue());
            const hasExtendedUnicodeEscape = scanner.hasExtendedUnicodeEscape();
            nextTokenWithoutCheck();
            return finishNode(factory.createIdentifier(text, /*typeArguments*/ undefined, originalKeywordKind, hasExtendedUnicodeEscape), pos);
        }

        if (token() === ts.SyntaxKind.PrivateIdentifier) {
            parseErrorAtCurrentToken(privateIdentifierDiagnosticMessage || ts.Diagnostics.Private_identifiers_are_not_allowed_outside_class_bodies);
            return createIdentifier(/*isIdentifier*/ true);
        }

        if (token() === ts.SyntaxKind.Unknown && scanner.tryScan(() => scanner.reScanInvalidIdentifier() === ts.SyntaxKind.Identifier)) {
            // Scanner has already recorded an 'Invalid character' error, so no need to add another from the parser.
            return createIdentifier(/*isIdentifier*/ true);
        }

        identifierCount++;
        // Only for end of file because the error gets reported incorrectly on embedded script tags.
        const reportAtCurrentPosition = token() === ts.SyntaxKind.EndOfFileToken;

        const isReservedWord = scanner.isReservedWord();
        const msgArg = scanner.getTokenText();

        const defaultMessage = isReservedWord ?
            ts.Diagnostics.Identifier_expected_0_is_a_reserved_word_that_cannot_be_used_here :
            ts.Diagnostics.Identifier_expected;

        return createMissingNode<ts.Identifier>(ts.SyntaxKind.Identifier, reportAtCurrentPosition, diagnosticMessage || defaultMessage, msgArg);
    }

    function parseBindingIdentifier(privateIdentifierDiagnosticMessage?: ts.DiagnosticMessage) {
        return createIdentifier(isBindingIdentifier(), /*diagnosticMessage*/ undefined, privateIdentifierDiagnosticMessage);
    }

    function parseIdentifier(diagnosticMessage?: ts.DiagnosticMessage, privateIdentifierDiagnosticMessage?: ts.DiagnosticMessage): ts.Identifier {
        return createIdentifier(isIdentifier(), diagnosticMessage, privateIdentifierDiagnosticMessage);
    }

    function parseIdentifierName(diagnosticMessage?: ts.DiagnosticMessage): ts.Identifier {
        return createIdentifier(ts.tokenIsIdentifierOrKeyword(token()), diagnosticMessage);
    }

    function isLiteralPropertyName(): boolean {
        return ts.tokenIsIdentifierOrKeyword(token()) ||
            token() === ts.SyntaxKind.StringLiteral ||
            token() === ts.SyntaxKind.NumericLiteral;
    }

    function isAssertionKey(): boolean {
        return ts.tokenIsIdentifierOrKeyword(token()) ||
            token() === ts.SyntaxKind.StringLiteral;
    }

    function parsePropertyNameWorker(allowComputedPropertyNames: boolean): ts.PropertyName {
        if (token() === ts.SyntaxKind.StringLiteral || token() === ts.SyntaxKind.NumericLiteral) {
            const node = parseLiteralNode() as ts.StringLiteral | ts.NumericLiteral;
            node.text = internIdentifier(node.text);
            return node;
        }
        if (allowComputedPropertyNames && token() === ts.SyntaxKind.OpenBracketToken) {
            return parseComputedPropertyName();
        }
        if (token() === ts.SyntaxKind.PrivateIdentifier) {
            return parsePrivateIdentifier();
        }
        return parseIdentifierName();
    }

    function parsePropertyName(): ts.PropertyName {
        return parsePropertyNameWorker(/*allowComputedPropertyNames*/ true);
    }

    function parseComputedPropertyName(): ts.ComputedPropertyName {
        // PropertyName [Yield]:
        //      LiteralPropertyName
        //      ComputedPropertyName[?Yield]
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.OpenBracketToken);
        // We parse any expression (including a comma expression). But the grammar
        // says that only an assignment expression is allowed, so the grammar checker
        // will error if it sees a comma expression.
        const expression = allowInAnd(parseExpression);
        parseExpected(ts.SyntaxKind.CloseBracketToken);
        return finishNode(factory.createComputedPropertyName(expression), pos);
    }

    function internPrivateIdentifier(text: string): string {
        let privateIdentifier = privateIdentifiers.get(text);
        if (privateIdentifier === undefined) {
            privateIdentifiers.set(text, privateIdentifier = text);
        }
        return privateIdentifier;
    }

    function parsePrivateIdentifier(): ts.PrivateIdentifier {
        const pos = getNodePos();
        const node = factory.createPrivateIdentifier(internPrivateIdentifier(scanner.getTokenValue()));
        nextToken();
        return finishNode(node, pos);
    }

    function parseContextualModifier(t: ts.SyntaxKind): boolean {
        return token() === t && tryParse(nextTokenCanFollowModifier);
    }

    function nextTokenIsOnSameLineAndCanFollowModifier() {
        nextToken();
        if (scanner.hasPrecedingLineBreak()) {
            return false;
        }
        return canFollowModifier();
    }

    function nextTokenCanFollowModifier() {
        switch (token()) {
            case ts.SyntaxKind.ConstKeyword:
                // 'const' is only a modifier if followed by 'enum'.
                return nextToken() === ts.SyntaxKind.EnumKeyword;
            case ts.SyntaxKind.ExportKeyword:
                nextToken();
                if (token() === ts.SyntaxKind.DefaultKeyword) {
                    return lookAhead(nextTokenCanFollowDefaultKeyword);
                }
                if (token() === ts.SyntaxKind.TypeKeyword) {
                    return lookAhead(nextTokenCanFollowExportModifier);
                }
                return canFollowExportModifier();
            case ts.SyntaxKind.DefaultKeyword:
                return nextTokenCanFollowDefaultKeyword();
            case ts.SyntaxKind.AccessorKeyword:
            case ts.SyntaxKind.StaticKeyword:
            case ts.SyntaxKind.GetKeyword:
            case ts.SyntaxKind.SetKeyword:
                nextToken();
                return canFollowModifier();
            default:
                return nextTokenIsOnSameLineAndCanFollowModifier();
        }
    }

    function canFollowExportModifier(): boolean {
        return token() !== ts.SyntaxKind.AsteriskToken
            && token() !== ts.SyntaxKind.AsKeyword
            && token() !== ts.SyntaxKind.OpenBraceToken
            && canFollowModifier();
    }

    function nextTokenCanFollowExportModifier(): boolean {
        nextToken();
        return canFollowExportModifier();
    }

    function parseAnyContextualModifier(): boolean {
        return ts.isModifierKind(token()) && tryParse(nextTokenCanFollowModifier);
    }

    function canFollowModifier(): boolean {
        return token() === ts.SyntaxKind.OpenBracketToken
            || token() === ts.SyntaxKind.OpenBraceToken
            || token() === ts.SyntaxKind.AsteriskToken
            || token() === ts.SyntaxKind.DotDotDotToken
            || isLiteralPropertyName();
    }

    function nextTokenCanFollowDefaultKeyword(): boolean {
        nextToken();
        return token() === ts.SyntaxKind.ClassKeyword || token() === ts.SyntaxKind.FunctionKeyword ||
            token() === ts.SyntaxKind.InterfaceKeyword ||
            (token() === ts.SyntaxKind.AbstractKeyword && lookAhead(nextTokenIsClassKeywordOnSameLine)) ||
            (token() === ts.SyntaxKind.AsyncKeyword && lookAhead(nextTokenIsFunctionKeywordOnSameLine));
    }

    // True if positioned at the start of a list element
    function isListElement(parsingContext: ParsingContext, inErrorRecovery: boolean): boolean {
        const node = currentNode(parsingContext);
        if (node) {
            return true;
        }

        switch (parsingContext) {
            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauseStatements:
                // If we're in error recovery, then we don't want to treat ';' as an empty statement.
                // The problem is that ';' can show up in far too many contexts, and if we see one
                // and assume it's a statement, then we may bail out inappropriately from whatever
                // we're parsing.  For example, if we have a semicolon in the middle of a class, then
                // we really don't want to assume the class is over and we're on a statement in the
                // outer module.  We just want to consume and move on.
                return !(token() === ts.SyntaxKind.SemicolonToken && inErrorRecovery) && isStartOfStatement();
            case ParsingContext.SwitchClauses:
                return token() === ts.SyntaxKind.CaseKeyword || token() === ts.SyntaxKind.DefaultKeyword;
            case ParsingContext.TypeMembers:
                return lookAhead(isTypeMemberStart);
            case ParsingContext.ClassMembers:
                // We allow semicolons as class elements (as specified by ES6) as long as we're
                // not in error recovery.  If we're in error recovery, we don't want an errant
                // semicolon to be treated as a class member (since they're almost always used
                // for statements.
                return lookAhead(isClassMemberStart) || (token() === ts.SyntaxKind.SemicolonToken && !inErrorRecovery);
            case ParsingContext.EnumMembers:
                // Include open bracket computed properties. This technically also lets in indexers,
                // which would be a candidate for improved error reporting.
                return token() === ts.SyntaxKind.OpenBracketToken || isLiteralPropertyName();
            case ParsingContext.ObjectLiteralMembers:
                switch (token()) {
                    case ts.SyntaxKind.OpenBracketToken:
                    case ts.SyntaxKind.AsteriskToken:
                    case ts.SyntaxKind.DotDotDotToken:
                    case ts.SyntaxKind.DotToken: // Not an object literal member, but don't want to close the object (see `tests/cases/fourslash/completionsDotInObjectLiteral.ts`)
                        return true;
                    default:
                        return isLiteralPropertyName();
                }
            case ParsingContext.RestProperties:
                return isLiteralPropertyName();
            case ParsingContext.ObjectBindingElements:
                return token() === ts.SyntaxKind.OpenBracketToken || token() === ts.SyntaxKind.DotDotDotToken || isLiteralPropertyName();
            case ParsingContext.AssertEntries:
                return isAssertionKey();
            case ParsingContext.HeritageClauseElement:
                // If we see `{ ... }` then only consume it as an expression if it is followed by `,` or `{`
                // That way we won't consume the body of a class in its heritage clause.
                if (token() === ts.SyntaxKind.OpenBraceToken) {
                    return lookAhead(isValidHeritageClauseObjectLiteral);
                }

                if (!inErrorRecovery) {
                    return isStartOfLeftHandSideExpression() && !isHeritageClauseExtendsOrImplementsKeyword();
                }
                else {
                    // If we're in error recovery we tighten up what we're willing to match.
                    // That way we don't treat something like "this" as a valid heritage clause
                    // element during recovery.
                    return isIdentifier() && !isHeritageClauseExtendsOrImplementsKeyword();
                }
            case ParsingContext.VariableDeclarations:
                return isBindingIdentifierOrPrivateIdentifierOrPattern();
            case ParsingContext.ArrayBindingElements:
                return token() === ts.SyntaxKind.CommaToken || token() === ts.SyntaxKind.DotDotDotToken || isBindingIdentifierOrPrivateIdentifierOrPattern();
            case ParsingContext.TypeParameters:
                return token() === ts.SyntaxKind.InKeyword || isIdentifier();
            case ParsingContext.ArrayLiteralMembers:
                switch (token()) {
                    case ts.SyntaxKind.CommaToken:
                    case ts.SyntaxKind.DotToken: // Not an array literal member, but don't want to close the array (see `tests/cases/fourslash/completionsDotInArrayLiteralInObjectLiteral.ts`)
                        return true;
                }
                // falls through
            case ParsingContext.ArgumentExpressions:
                return token() === ts.SyntaxKind.DotDotDotToken || isStartOfExpression();
            case ParsingContext.Parameters:
                return isStartOfParameter(/*isJSDocParameter*/ false);
            case ParsingContext.JSDocParameters:
                return isStartOfParameter(/*isJSDocParameter*/ true);
            case ParsingContext.TypeArguments:
            case ParsingContext.TupleElementTypes:
                return token() === ts.SyntaxKind.CommaToken || isStartOfType();
            case ParsingContext.HeritageClauses:
                return isHeritageClause();
            case ParsingContext.ImportOrExportSpecifiers:
                return ts.tokenIsIdentifierOrKeyword(token());
            case ParsingContext.JsxAttributes:
                return ts.tokenIsIdentifierOrKeyword(token()) || token() === ts.SyntaxKind.OpenBraceToken;
            case ParsingContext.JsxChildren:
                return true;
        }

        return ts.Debug.fail("Non-exhaustive case in 'isListElement'.");
    }

    function isValidHeritageClauseObjectLiteral() {
        ts.Debug.assert(token() === ts.SyntaxKind.OpenBraceToken);
        if (nextToken() === ts.SyntaxKind.CloseBraceToken) {
            // if we see "extends {}" then only treat the {} as what we're extending (and not
            // the class body) if we have:
            //
            //      extends {} {
            //      extends {},
            //      extends {} extends
            //      extends {} implements

            const next = nextToken();
            return next === ts.SyntaxKind.CommaToken || next === ts.SyntaxKind.OpenBraceToken || next === ts.SyntaxKind.ExtendsKeyword || next === ts.SyntaxKind.ImplementsKeyword;
        }

        return true;
    }

    function nextTokenIsIdentifier() {
        nextToken();
        return isIdentifier();
    }

    function nextTokenIsIdentifierOrKeyword() {
        nextToken();
        return ts.tokenIsIdentifierOrKeyword(token());
    }

    function nextTokenIsIdentifierOrKeywordOrGreaterThan() {
        nextToken();
        return ts.tokenIsIdentifierOrKeywordOrGreaterThan(token());
    }

    function isHeritageClauseExtendsOrImplementsKeyword(): boolean {
        if (token() === ts.SyntaxKind.ImplementsKeyword ||
            token() === ts.SyntaxKind.ExtendsKeyword) {

            return lookAhead(nextTokenIsStartOfExpression);
        }

        return false;
    }

    function nextTokenIsStartOfExpression() {
        nextToken();
        return isStartOfExpression();
    }

    function nextTokenIsStartOfType() {
        nextToken();
        return isStartOfType();
    }

    // True if positioned at a list terminator
    function isListTerminator(kind: ParsingContext): boolean {
        if (token() === ts.SyntaxKind.EndOfFileToken) {
            // Being at the end of the file ends all lists.
            return true;
        }

        switch (kind) {
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauses:
            case ParsingContext.TypeMembers:
            case ParsingContext.ClassMembers:
            case ParsingContext.EnumMembers:
            case ParsingContext.ObjectLiteralMembers:
            case ParsingContext.ObjectBindingElements:
            case ParsingContext.ImportOrExportSpecifiers:
            case ParsingContext.AssertEntries:
                return token() === ts.SyntaxKind.CloseBraceToken;
            case ParsingContext.SwitchClauseStatements:
                return token() === ts.SyntaxKind.CloseBraceToken || token() === ts.SyntaxKind.CaseKeyword || token() === ts.SyntaxKind.DefaultKeyword;
            case ParsingContext.HeritageClauseElement:
                return token() === ts.SyntaxKind.OpenBraceToken || token() === ts.SyntaxKind.ExtendsKeyword || token() === ts.SyntaxKind.ImplementsKeyword;
            case ParsingContext.VariableDeclarations:
                return isVariableDeclaratorListTerminator();
            case ParsingContext.TypeParameters:
                // Tokens other than '>' are here for better error recovery
                return token() === ts.SyntaxKind.GreaterThanToken || token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.OpenBraceToken || token() === ts.SyntaxKind.ExtendsKeyword || token() === ts.SyntaxKind.ImplementsKeyword;
            case ParsingContext.ArgumentExpressions:
                // Tokens other than ')' are here for better error recovery
                return token() === ts.SyntaxKind.CloseParenToken || token() === ts.SyntaxKind.SemicolonToken;
            case ParsingContext.ArrayLiteralMembers:
            case ParsingContext.TupleElementTypes:
            case ParsingContext.ArrayBindingElements:
                return token() === ts.SyntaxKind.CloseBracketToken;
            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
            case ParsingContext.RestProperties:
                // Tokens other than ')' and ']' (the latter for index signatures) are here for better error recovery
                return token() === ts.SyntaxKind.CloseParenToken || token() === ts.SyntaxKind.CloseBracketToken /*|| token === SyntaxKind.OpenBraceToken*/;
            case ParsingContext.TypeArguments:
                // All other tokens should cause the type-argument to terminate except comma token
                return token() !== ts.SyntaxKind.CommaToken;
            case ParsingContext.HeritageClauses:
                return token() === ts.SyntaxKind.OpenBraceToken || token() === ts.SyntaxKind.CloseBraceToken;
            case ParsingContext.JsxAttributes:
                return token() === ts.SyntaxKind.GreaterThanToken || token() === ts.SyntaxKind.SlashToken;
            case ParsingContext.JsxChildren:
                return token() === ts.SyntaxKind.LessThanToken && lookAhead(nextTokenIsSlash);
            default:
                return false;
        }
    }

    function isVariableDeclaratorListTerminator(): boolean {
        // If we can consume a semicolon (either explicitly, or with ASI), then consider us done
        // with parsing the list of variable declarators.
        if (canParseSemicolon()) {
            return true;
        }

        // in the case where we're parsing the variable declarator of a 'for-in' statement, we
        // are done if we see an 'in' keyword in front of us. Same with for-of
        if (isInOrOfKeyword(token())) {
            return true;
        }

        // ERROR RECOVERY TWEAK:
        // For better error recovery, if we see an '=>' then we just stop immediately.  We've got an
        // arrow function here and it's going to be very unlikely that we'll resynchronize and get
        // another variable declaration.
        if (token() === ts.SyntaxKind.EqualsGreaterThanToken) {
            return true;
        }

        // Keep trying to parse out variable declarators.
        return false;
    }

    // True if positioned at element or terminator of the current list or any enclosing list
    function isInSomeParsingContext(): boolean {
        for (let kind = 0; kind < ParsingContext.Count; kind++) {
            if (parsingContext & (1 << kind)) {
                if (isListElement(kind, /*inErrorRecovery*/ true) || isListTerminator(kind)) {
                    return true;
                }
            }
        }

        return false;
    }

    // Parses a list of elements
    function parseList<T extends ts.Node>(kind: ParsingContext, parseElement: () => T): ts.NodeArray<T> {
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << kind;
        const list = [];
        const listPos = getNodePos();

        while (!isListTerminator(kind)) {
            if (isListElement(kind, /*inErrorRecovery*/ false)) {
                list.push(parseListElement(kind, parseElement));

                continue;
            }

            if (abortParsingListOrMoveToNextToken(kind)) {
                break;
            }
        }

        parsingContext = saveParsingContext;
        return createNodeArray(list, listPos);
    }

    function parseListElement<T extends ts.Node | undefined>(parsingContext: ParsingContext, parseElement: () => T): T {
        const node = currentNode(parsingContext);
        if (node) {
            return consumeNode(node) as T;
        }

        return parseElement();
    }

    function currentNode(parsingContext: ParsingContext, pos?: number): ts.Node | undefined {
        // If we don't have a cursor or the parsing context isn't reusable, there's nothing to reuse.
        //
        // If there is an outstanding parse error that we've encountered, but not attached to
        // some node, then we cannot get a node from the old source tree.  This is because we
        // want to mark the next node we encounter as being unusable.
        //
        // Note: This may be too conservative.  Perhaps we could reuse the node and set the bit
        // on it (or its leftmost child) as having the error.  For now though, being conservative
        // is nice and likely won't ever affect perf.
        if (!syntaxCursor || !isReusableParsingContext(parsingContext) || parseErrorBeforeNextFinishedNode) {
            return undefined;
        }

        const node = syntaxCursor.currentNode(pos ?? scanner.getStartPos());

        // Can't reuse a missing node.
        // Can't reuse a node that intersected the change range.
        // Can't reuse a node that contains a parse error.  This is necessary so that we
        // produce the same set of errors again.
        if (ts.nodeIsMissing(node) || node.intersectsChange || ts.containsParseError(node)) {
            return undefined;
        }

        // We can only reuse a node if it was parsed under the same strict mode that we're
        // currently in.  i.e. if we originally parsed a node in non-strict mode, but then
        // the user added 'using strict' at the top of the file, then we can't use that node
        // again as the presence of strict mode may cause us to parse the tokens in the file
        // differently.
        //
        // Note: we *can* reuse tokens when the strict mode changes.  That's because tokens
        // are unaffected by strict mode.  It's just the parser will decide what to do with it
        // differently depending on what mode it is in.
        //
        // This also applies to all our other context flags as well.
        const nodeContextFlags = node.flags & ts.NodeFlags.ContextFlags;
        if (nodeContextFlags !== contextFlags) {
            return undefined;
        }

        // Ok, we have a node that looks like it could be reused.  Now verify that it is valid
        // in the current list parsing context that we're currently at.
        if (!canReuseNode(node, parsingContext)) {
            return undefined;
        }

        if ((node as ts.JSDocContainer).jsDocCache) {
            // jsDocCache may include tags from parent nodes, which might have been modified.
            (node as ts.JSDocContainer).jsDocCache = undefined;
        }

        return node;
    }

    function consumeNode(node: ts.Node) {
        // Move the scanner so it is after the node we just consumed.
        scanner.setTextPos(node.end);
        nextToken();
        return node;
    }

    function isReusableParsingContext(parsingContext: ParsingContext): boolean {
        switch (parsingContext) {
            case ParsingContext.ClassMembers:
            case ParsingContext.SwitchClauses:
            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauseStatements:
            case ParsingContext.EnumMembers:
            case ParsingContext.TypeMembers:
            case ParsingContext.VariableDeclarations:
            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
                return true;
        }
        return false;
    }

    function canReuseNode(node: ts.Node, parsingContext: ParsingContext): boolean {
        switch (parsingContext) {
            case ParsingContext.ClassMembers:
                return isReusableClassMember(node);

            case ParsingContext.SwitchClauses:
                return isReusableSwitchClause(node);

            case ParsingContext.SourceElements:
            case ParsingContext.BlockStatements:
            case ParsingContext.SwitchClauseStatements:
                return isReusableStatement(node);

            case ParsingContext.EnumMembers:
                return isReusableEnumMember(node);

            case ParsingContext.TypeMembers:
                return isReusableTypeMember(node);

            case ParsingContext.VariableDeclarations:
                return isReusableVariableDeclaration(node);

            case ParsingContext.JSDocParameters:
            case ParsingContext.Parameters:
                return isReusableParameter(node);

            // Any other lists we do not care about reusing nodes in.  But feel free to add if
            // you can do so safely.  Danger areas involve nodes that may involve speculative
            // parsing.  If speculative parsing is involved with the node, then the range the
            // parser reached while looking ahead might be in the edited range (see the example
            // in canReuseVariableDeclaratorNode for a good case of this).

            // case ParsingContext.HeritageClauses:
            // This would probably be safe to reuse.  There is no speculative parsing with
            // heritage clauses.

            // case ParsingContext.TypeParameters:
            // This would probably be safe to reuse.  There is no speculative parsing with
            // type parameters.  Note that that's because type *parameters* only occur in
            // unambiguous *type* contexts.  While type *arguments* occur in very ambiguous
            // *expression* contexts.

            // case ParsingContext.TupleElementTypes:
            // This would probably be safe to reuse.  There is no speculative parsing with
            // tuple types.

            // Technically, type argument list types are probably safe to reuse.  While
            // speculative parsing is involved with them (since type argument lists are only
            // produced from speculative parsing a < as a type argument list), we only have
            // the types because speculative parsing succeeded.  Thus, the lookahead never
            // went past the end of the list and rewound.
            // case ParsingContext.TypeArguments:

            // Note: these are almost certainly not safe to ever reuse.  Expressions commonly
            // need a large amount of lookahead, and we should not reuse them as they may
            // have actually intersected the edit.
            // case ParsingContext.ArgumentExpressions:

            // This is not safe to reuse for the same reason as the 'AssignmentExpression'
            // cases.  i.e. a property assignment may end with an expression, and thus might
            // have lookahead far beyond it's old node.
            // case ParsingContext.ObjectLiteralMembers:

            // This is probably not safe to reuse.  There can be speculative parsing with
            // type names in a heritage clause.  There can be generic names in the type
            // name list, and there can be left hand side expressions (which can have type
            // arguments.)
            // case ParsingContext.HeritageClauseElement:

            // Perhaps safe to reuse, but it's unlikely we'd see more than a dozen attributes
            // on any given element. Same for children.
            // case ParsingContext.JsxAttributes:
            // case ParsingContext.JsxChildren:

        }

        return false;
    }

    function isReusableClassMember(node: ts.Node) {
        if (node) {
            switch (node.kind) {
                case ts.SyntaxKind.Constructor:
                case ts.SyntaxKind.IndexSignature:
                case ts.SyntaxKind.GetAccessor:
                case ts.SyntaxKind.SetAccessor:
                case ts.SyntaxKind.PropertyDeclaration:
                case ts.SyntaxKind.SemicolonClassElement:
                    return true;
                case ts.SyntaxKind.MethodDeclaration:
                    // Method declarations are not necessarily reusable.  An object-literal
                    // may have a method calls "constructor(...)" and we must reparse that
                    // into an actual .ConstructorDeclaration.
                    const methodDeclaration = node as ts.MethodDeclaration;
                    const nameIsConstructor = methodDeclaration.name.kind === ts.SyntaxKind.Identifier &&
                        methodDeclaration.name.originalKeywordKind === ts.SyntaxKind.ConstructorKeyword;

                    return !nameIsConstructor;
            }
        }

        return false;
    }

    function isReusableSwitchClause(node: ts.Node) {
        if (node) {
            switch (node.kind) {
                case ts.SyntaxKind.CaseClause:
                case ts.SyntaxKind.DefaultClause:
                    return true;
            }
        }

        return false;
    }

    function isReusableStatement(node: ts.Node) {
        if (node) {
            switch (node.kind) {
                case ts.SyntaxKind.FunctionDeclaration:
                case ts.SyntaxKind.VariableStatement:
                case ts.SyntaxKind.Block:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.ExpressionStatement:
                case ts.SyntaxKind.ThrowStatement:
                case ts.SyntaxKind.ReturnStatement:
                case ts.SyntaxKind.SwitchStatement:
                case ts.SyntaxKind.BreakStatement:
                case ts.SyntaxKind.ContinueStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.WithStatement:
                case ts.SyntaxKind.EmptyStatement:
                case ts.SyntaxKind.TryStatement:
                case ts.SyntaxKind.LabeledStatement:
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.DebuggerStatement:
                case ts.SyntaxKind.ImportDeclaration:
                case ts.SyntaxKind.ImportEqualsDeclaration:
                case ts.SyntaxKind.ExportDeclaration:
                case ts.SyntaxKind.ExportAssignment:
                case ts.SyntaxKind.ModuleDeclaration:
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.EnumDeclaration:
                case ts.SyntaxKind.TypeAliasDeclaration:
                    return true;
            }
        }

        return false;
    }

    function isReusableEnumMember(node: ts.Node) {
        return node.kind === ts.SyntaxKind.EnumMember;
    }

    function isReusableTypeMember(node: ts.Node) {
        if (node) {
            switch (node.kind) {
                case ts.SyntaxKind.ConstructSignature:
                case ts.SyntaxKind.MethodSignature:
                case ts.SyntaxKind.IndexSignature:
                case ts.SyntaxKind.PropertySignature:
                case ts.SyntaxKind.CallSignature:
                    return true;
            }
        }

        return false;
    }

    function isReusableVariableDeclaration(node: ts.Node) {
        if (node.kind !== ts.SyntaxKind.VariableDeclaration) {
            return false;
        }

        // Very subtle incremental parsing bug.  Consider the following code:
        //
        //      let v = new List < A, B
        //
        // This is actually legal code.  It's a list of variable declarators "v = new List<A"
        // on one side and "B" on the other. If you then change that to:
        //
        //      let v = new List < A, B >()
        //
        // then we have a problem.  "v = new List<A" doesn't intersect the change range, so we
        // start reparsing at "B" and we completely fail to handle this properly.
        //
        // In order to prevent this, we do not allow a variable declarator to be reused if it
        // has an initializer.
        const variableDeclarator = node as ts.VariableDeclaration;
        return variableDeclarator.initializer === undefined;
    }

    function isReusableParameter(node: ts.Node) {
        if (node.kind !== ts.SyntaxKind.Parameter) {
            return false;
        }

        // See the comment in isReusableVariableDeclaration for why we do this.
        const parameter = node as ts.ParameterDeclaration;
        return parameter.initializer === undefined;
    }

    // Returns true if we should abort parsing.
    function abortParsingListOrMoveToNextToken(kind: ParsingContext) {
        parsingContextErrors(kind);
        if (isInSomeParsingContext()) {
            return true;
        }

        nextToken();
        return false;
    }

    function parsingContextErrors(context: ParsingContext) {
        switch (context) {
            case ParsingContext.SourceElements:
                return token() === ts.SyntaxKind.DefaultKeyword
                    ? parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(ts.SyntaxKind.ExportKeyword))
                    : parseErrorAtCurrentToken(ts.Diagnostics.Declaration_or_statement_expected);
            case ParsingContext.BlockStatements: return parseErrorAtCurrentToken(ts.Diagnostics.Declaration_or_statement_expected);
            case ParsingContext.SwitchClauses: return parseErrorAtCurrentToken(ts.Diagnostics.case_or_default_expected);
            case ParsingContext.SwitchClauseStatements: return parseErrorAtCurrentToken(ts.Diagnostics.Statement_expected);
            case ParsingContext.RestProperties: // fallthrough
            case ParsingContext.TypeMembers: return parseErrorAtCurrentToken(ts.Diagnostics.Property_or_signature_expected);
            case ParsingContext.ClassMembers: return parseErrorAtCurrentToken(ts.Diagnostics.Unexpected_token_A_constructor_method_accessor_or_property_was_expected);
            case ParsingContext.EnumMembers: return parseErrorAtCurrentToken(ts.Diagnostics.Enum_member_expected);
            case ParsingContext.HeritageClauseElement: return parseErrorAtCurrentToken(ts.Diagnostics.Expression_expected);
            case ParsingContext.VariableDeclarations:
                return ts.isKeyword(token())
                    ? parseErrorAtCurrentToken(ts.Diagnostics._0_is_not_allowed_as_a_variable_declaration_name, ts.tokenToString(token()))
                    : parseErrorAtCurrentToken(ts.Diagnostics.Variable_declaration_expected);
            case ParsingContext.ObjectBindingElements: return parseErrorAtCurrentToken(ts.Diagnostics.Property_destructuring_pattern_expected);
            case ParsingContext.ArrayBindingElements: return parseErrorAtCurrentToken(ts.Diagnostics.Array_element_destructuring_pattern_expected);
            case ParsingContext.ArgumentExpressions: return parseErrorAtCurrentToken(ts.Diagnostics.Argument_expression_expected);
            case ParsingContext.ObjectLiteralMembers: return parseErrorAtCurrentToken(ts.Diagnostics.Property_assignment_expected);
            case ParsingContext.ArrayLiteralMembers: return parseErrorAtCurrentToken(ts.Diagnostics.Expression_or_comma_expected);
            case ParsingContext.JSDocParameters: return parseErrorAtCurrentToken(ts.Diagnostics.Parameter_declaration_expected);
            case ParsingContext.Parameters:
                return ts.isKeyword(token())
                    ? parseErrorAtCurrentToken(ts.Diagnostics._0_is_not_allowed_as_a_parameter_name, ts.tokenToString(token()))
                    : parseErrorAtCurrentToken(ts.Diagnostics.Parameter_declaration_expected);
            case ParsingContext.TypeParameters: return parseErrorAtCurrentToken(ts.Diagnostics.Type_parameter_declaration_expected);
            case ParsingContext.TypeArguments: return parseErrorAtCurrentToken(ts.Diagnostics.Type_argument_expected);
            case ParsingContext.TupleElementTypes: return parseErrorAtCurrentToken(ts.Diagnostics.Type_expected);
            case ParsingContext.HeritageClauses: return parseErrorAtCurrentToken(ts.Diagnostics.Unexpected_token_expected);
            case ParsingContext.ImportOrExportSpecifiers: return parseErrorAtCurrentToken(ts.Diagnostics.Identifier_expected);
            case ParsingContext.JsxAttributes: return parseErrorAtCurrentToken(ts.Diagnostics.Identifier_expected);
            case ParsingContext.JsxChildren: return parseErrorAtCurrentToken(ts.Diagnostics.Identifier_expected);
            case ParsingContext.AssertEntries: return parseErrorAtCurrentToken(ts.Diagnostics.Identifier_or_string_literal_expected); // AssertionKey.
            case ParsingContext.Count: return ts.Debug.fail("ParsingContext.Count used as a context"); // Not a real context, only a marker.
            default: ts.Debug.assertNever(context);
        }
    }

    // Parses a comma-delimited list of elements
    function parseDelimitedList<T extends ts.Node>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): ts.NodeArray<T>;
    function parseDelimitedList<T extends ts.Node | undefined>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): ts.NodeArray<NonNullable<T>> | undefined;
    function parseDelimitedList<T extends ts.Node | undefined>(kind: ParsingContext, parseElement: () => T, considerSemicolonAsDelimiter?: boolean): ts.NodeArray<NonNullable<T>> | undefined {
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << kind;
        const list: NonNullable<T>[] = [];
        const listPos = getNodePos();

        let commaStart = -1; // Meaning the previous token was not a comma
        while (true) {
            if (isListElement(kind, /*inErrorRecovery*/ false)) {
                const startPos = scanner.getStartPos();
                const result = parseListElement(kind, parseElement);
                if (!result) {
                    parsingContext = saveParsingContext;
                    return undefined;
                }
                list.push(result);
                commaStart = scanner.getTokenPos();

                if (parseOptional(ts.SyntaxKind.CommaToken)) {
                    // No need to check for a zero length node since we know we parsed a comma
                    continue;
                }

                commaStart = -1; // Back to the state where the last token was not a comma
                if (isListTerminator(kind)) {
                    break;
                }

                // We didn't get a comma, and the list wasn't terminated, explicitly parse
                // out a comma so we give a good error message.
                parseExpected(ts.SyntaxKind.CommaToken, getExpectedCommaDiagnostic(kind));

                // If the token was a semicolon, and the caller allows that, then skip it and
                // continue.  This ensures we get back on track and don't result in tons of
                // parse errors.  For example, this can happen when people do things like use
                // a semicolon to delimit object literal members.   Note: we'll have already
                // reported an error when we called parseExpected above.
                if (considerSemicolonAsDelimiter && token() === ts.SyntaxKind.SemicolonToken && !scanner.hasPrecedingLineBreak()) {
                    nextToken();
                }
                if (startPos === scanner.getStartPos()) {
                    // What we're parsing isn't actually remotely recognizable as a element and we've consumed no tokens whatsoever
                    // Consume a token to advance the parser in some way and avoid an infinite loop
                    // This can happen when we're speculatively parsing parenthesized expressions which we think may be arrow functions,
                    // or when a modifier keyword which is disallowed as a parameter name (ie, `static` in strict mode) is supplied
                    nextToken();
                }
                continue;
            }

            if (isListTerminator(kind)) {
                break;
            }

            if (abortParsingListOrMoveToNextToken(kind)) {
                break;
            }
        }

        parsingContext = saveParsingContext;
        // Recording the trailing comma is deliberately done after the previous
        // loop, and not just if we see a list terminator. This is because the list
        // may have ended incorrectly, but it is still important to know if there
        // was a trailing comma.
        // Check if the last token was a comma.
        // Always preserve a trailing comma by marking it on the NodeArray
        return createNodeArray(list, listPos, /*end*/ undefined, commaStart >= 0);
    }

    function getExpectedCommaDiagnostic(kind: ParsingContext) {
        return kind === ParsingContext.EnumMembers ? ts.Diagnostics.An_enum_member_name_must_be_followed_by_a_or : undefined;
    }

    interface MissingList<T extends ts.Node> extends ts.NodeArray<T> {
        isMissingList: true;
    }

    function createMissingList<T extends ts.Node>(): MissingList<T> {
        const list = createNodeArray<T>([], getNodePos()) as MissingList<T>;
        list.isMissingList = true;
        return list;
    }

    function isMissingList(arr: ts.NodeArray<ts.Node>): boolean {
        return !!(arr as MissingList<ts.Node>).isMissingList;
    }

    function parseBracketedList<T extends ts.Node>(kind: ParsingContext, parseElement: () => T, open: ts.SyntaxKind, close: ts.SyntaxKind): ts.NodeArray<T> {
        if (parseExpected(open)) {
            const result = parseDelimitedList(kind, parseElement);
            parseExpected(close);
            return result;
        }

        return createMissingList<T>();
    }

    function parseEntityName(allowReservedWords: boolean, diagnosticMessage?: ts.DiagnosticMessage): ts.EntityName {
        const pos = getNodePos();
        let entity: ts.EntityName = allowReservedWords ? parseIdentifierName(diagnosticMessage) : parseIdentifier(diagnosticMessage);
        let dotPos = getNodePos();
        while (parseOptional(ts.SyntaxKind.DotToken)) {
            if (token() === ts.SyntaxKind.LessThanToken) {
                // the entity is part of a JSDoc-style generic, so record the trailing dot for later error reporting
                entity.jsdocDotPos = dotPos;
                break;
            }
            dotPos = getNodePos();
            entity = finishNode(
                factory.createQualifiedName(
                    entity,
                    parseRightSideOfDot(allowReservedWords, /* allowPrivateIdentifiers */ false) as ts.Identifier
                ),
                pos
            );
        }
        return entity;
    }

    function createQualifiedName(entity: ts.EntityName, name: ts.Identifier): ts.QualifiedName {
        return finishNode(factory.createQualifiedName(entity, name), entity.pos);
    }

    function parseRightSideOfDot(allowIdentifierNames: boolean, allowPrivateIdentifiers: boolean): ts.Identifier | ts.PrivateIdentifier {
        // Technically a keyword is valid here as all identifiers and keywords are identifier names.
        // However, often we'll encounter this in error situations when the identifier or keyword
        // is actually starting another valid construct.
        //
        // So, we check for the following specific case:
        //
        //      name.
        //      identifierOrKeyword identifierNameOrKeyword
        //
        // Note: the newlines are important here.  For example, if that above code
        // were rewritten into:
        //
        //      name.identifierOrKeyword
        //      identifierNameOrKeyword
        //
        // Then we would consider it valid.  That's because ASI would take effect and
        // the code would be implicitly: "name.identifierOrKeyword; identifierNameOrKeyword".
        // In the first case though, ASI will not take effect because there is not a
        // line terminator after the identifier or keyword.
        if (scanner.hasPrecedingLineBreak() && ts.tokenIsIdentifierOrKeyword(token())) {
            const matchesPattern = lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);

            if (matchesPattern) {
                // Report that we need an identifier.  However, report it right after the dot,
                // and not on the next token.  This is because the next token might actually
                // be an identifier and the error would be quite confusing.
                return createMissingNode<ts.Identifier>(ts.SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, ts.Diagnostics.Identifier_expected);
            }
        }

        if (token() === ts.SyntaxKind.PrivateIdentifier) {
            const node = parsePrivateIdentifier();
            return allowPrivateIdentifiers ? node : createMissingNode<ts.Identifier>(ts.SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, ts.Diagnostics.Identifier_expected);
        }

        return allowIdentifierNames ? parseIdentifierName() : parseIdentifier();
    }

    function parseTemplateSpans(isTaggedTemplate: boolean) {
        const pos = getNodePos();
        const list = [];
        let node: ts.TemplateSpan;
        do {
            node = parseTemplateSpan(isTaggedTemplate);
            list.push(node);
        }
        while (node.literal.kind === ts.SyntaxKind.TemplateMiddle);
        return createNodeArray(list, pos);
    }

    function parseTemplateExpression(isTaggedTemplate: boolean): ts.TemplateExpression {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateExpression(
                parseTemplateHead(isTaggedTemplate),
                parseTemplateSpans(isTaggedTemplate)
            ),
            pos
        );
    }

    function parseTemplateType(): ts.TemplateLiteralTypeNode {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateLiteralType(
                parseTemplateHead(/*isTaggedTemplate*/ false),
                parseTemplateTypeSpans()
            ),
            pos
        );
    }

    function parseTemplateTypeSpans() {
        const pos = getNodePos();
        const list = [];
        let node: ts.TemplateLiteralTypeSpan;
        do {
            node = parseTemplateTypeSpan();
            list.push(node);
        }
        while (node.literal.kind === ts.SyntaxKind.TemplateMiddle);
        return createNodeArray(list, pos);
    }

    function parseTemplateTypeSpan(): ts.TemplateLiteralTypeSpan {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateLiteralTypeSpan(
                parseType(),
                parseLiteralOfTemplateSpan(/*isTaggedTemplate*/ false)
            ),
            pos
        );
    }

    function parseLiteralOfTemplateSpan(isTaggedTemplate: boolean) {
        if (token() === ts.SyntaxKind.CloseBraceToken) {
            reScanTemplateToken(isTaggedTemplate);
            return parseTemplateMiddleOrTemplateTail();
        }
        else {
            // TODO(rbuckton): Do we need to call `parseExpectedToken` or can we just call `createMissingNode` directly?
            return parseExpectedToken(ts.SyntaxKind.TemplateTail, ts.Diagnostics._0_expected, ts.tokenToString(ts.SyntaxKind.CloseBraceToken)) as ts.TemplateTail;
        }
    }

    function parseTemplateSpan(isTaggedTemplate: boolean): ts.TemplateSpan {
        const pos = getNodePos();
        return finishNode(
            factory.createTemplateSpan(
                allowInAnd(parseExpression),
                parseLiteralOfTemplateSpan(isTaggedTemplate)
            ),
            pos
        );
    }

    function parseLiteralNode(): ts.LiteralExpression {
        return parseLiteralLikeNode(token()) as ts.LiteralExpression;
    }

    function parseTemplateHead(isTaggedTemplate: boolean): ts.TemplateHead {
        if (isTaggedTemplate) {
            reScanTemplateHeadOrNoSubstitutionTemplate();
        }
        const fragment = parseLiteralLikeNode(token());
        ts.Debug.assert(fragment.kind === ts.SyntaxKind.TemplateHead, "Template head has wrong token kind");
        return fragment as ts.TemplateHead;
    }

    function parseTemplateMiddleOrTemplateTail(): ts.TemplateMiddle | ts.TemplateTail {
        const fragment = parseLiteralLikeNode(token());
        ts.Debug.assert(fragment.kind === ts.SyntaxKind.TemplateMiddle || fragment.kind === ts.SyntaxKind.TemplateTail, "Template fragment has wrong token kind");
        return fragment as ts.TemplateMiddle | ts.TemplateTail;
    }

    function getTemplateLiteralRawText(kind: ts.TemplateLiteralToken["kind"]) {
        const isLast = kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral || kind === ts.SyntaxKind.TemplateTail;
        const tokenText = scanner.getTokenText();
        return tokenText.substring(1, tokenText.length - (scanner.isUnterminated() ? 0 : isLast ? 1 : 2));
    }

    function parseLiteralLikeNode(kind: ts.SyntaxKind): ts.LiteralLikeNode {
        const pos = getNodePos();
        const node =
            ts.isTemplateLiteralKind(kind) ? factory.createTemplateLiteralLikeNode(kind, scanner.getTokenValue(), getTemplateLiteralRawText(kind), scanner.getTokenFlags() & ts.TokenFlags.TemplateLiteralLikeFlags) :
            // Octal literals are not allowed in strict mode or ES5
            // Note that theoretically the following condition would hold true literals like 009,
            // which is not octal. But because of how the scanner separates the tokens, we would
            // never get a token like this. Instead, we would get 00 and 9 as two separate tokens.
            // We also do not need to check for negatives because any prefix operator would be part of a
            // parent unary expression.
            kind === ts.SyntaxKind.NumericLiteral ? factory.createNumericLiteral(scanner.getTokenValue(), scanner.getNumericLiteralFlags()) :
            kind === ts.SyntaxKind.StringLiteral ? factory.createStringLiteral(scanner.getTokenValue(), /*isSingleQuote*/ undefined, scanner.hasExtendedUnicodeEscape()) :
            ts.isLiteralKind(kind) ? factory.createLiteralLikeNode(kind, scanner.getTokenValue()) :
            ts.Debug.fail();

        if (scanner.hasExtendedUnicodeEscape()) {
            node.hasExtendedUnicodeEscape = true;
        }

        if (scanner.isUnterminated()) {
            node.isUnterminated = true;
        }

        nextToken();
        return finishNode(node, pos);
    }

    // TYPES

    function parseEntityNameOfTypeReference() {
        return parseEntityName(/*allowReservedWords*/ true, ts.Diagnostics.Type_expected);
    }

    function parseTypeArgumentsOfTypeReference() {
        if (!scanner.hasPrecedingLineBreak() && reScanLessThanToken() === ts.SyntaxKind.LessThanToken) {
            return parseBracketedList(ParsingContext.TypeArguments, parseType, ts.SyntaxKind.LessThanToken, ts.SyntaxKind.GreaterThanToken);
        }
    }

    function parseTypeReference(): ts.TypeReferenceNode {
        const pos = getNodePos();
        return finishNode(
            factory.createTypeReferenceNode(
                parseEntityNameOfTypeReference(),
                parseTypeArgumentsOfTypeReference()
            ),
            pos
        );
    }

    // If true, we should abort parsing an error function.
    function typeHasArrowFunctionBlockingParseError(node: ts.TypeNode): boolean {
        switch (node.kind) {
            case ts.SyntaxKind.TypeReference:
                return ts.nodeIsMissing((node as ts.TypeReferenceNode).typeName);
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.ConstructorType: {
                const { parameters, type } = node as ts.FunctionOrConstructorTypeNode;
                return isMissingList(parameters) || typeHasArrowFunctionBlockingParseError(type);
            }
            case ts.SyntaxKind.ParenthesizedType:
                return typeHasArrowFunctionBlockingParseError((node as ts.ParenthesizedTypeNode).type);
            default:
                return false;
        }
    }

    function parseThisTypePredicate(lhs: ts.ThisTypeNode): ts.TypePredicateNode {
        nextToken();
        return finishNode(factory.createTypePredicateNode(/*assertsModifier*/ undefined, lhs, parseType()), lhs.pos);
    }

    function parseThisTypeNode(): ts.ThisTypeNode {
        const pos = getNodePos();
        nextToken();
        return finishNode(factory.createThisTypeNode(), pos);
    }

    function parseJSDocAllType(): ts.JSDocAllType | ts.JSDocOptionalType {
        const pos = getNodePos();
        nextToken();
        return finishNode(factory.createJSDocAllType(), pos);
    }

    function parseJSDocNonNullableType(): ts.TypeNode {
        const pos = getNodePos();
        nextToken();
        return finishNode(factory.createJSDocNonNullableType(parseNonArrayType(), /*postfix*/ false), pos);
    }

    function parseJSDocUnknownOrNullableType(): ts.JSDocUnknownType | ts.JSDocNullableType {
        const pos = getNodePos();
        // skip the ?
        nextToken();

        // Need to lookahead to decide if this is a nullable or unknown type.

        // Here are cases where we'll pick the unknown type:
        //
        //      Foo(?,
        //      { a: ? }
        //      Foo(?)
        //      Foo<?>
        //      Foo(?=
        //      (?|
        if (token() === ts.SyntaxKind.CommaToken ||
            token() === ts.SyntaxKind.CloseBraceToken ||
            token() === ts.SyntaxKind.CloseParenToken ||
            token() === ts.SyntaxKind.GreaterThanToken ||
            token() === ts.SyntaxKind.EqualsToken ||
            token() === ts.SyntaxKind.BarToken) {
            return finishNode(factory.createJSDocUnknownType(), pos);
        }
        else {
            return finishNode(factory.createJSDocNullableType(parseType(), /*postfix*/ false), pos);
        }
    }

    function parseJSDocFunctionType(): ts.JSDocFunctionType | ts.TypeReferenceNode {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        if (lookAhead(nextTokenIsOpenParen)) {
            nextToken();
            const parameters = parseParameters(SignatureFlags.Type | SignatureFlags.JSDoc);
            const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ false);
            return withJSDoc(finishNode(factory.createJSDocFunctionType(parameters, type), pos), hasJSDoc);
        }
        return finishNode(factory.createTypeReferenceNode(parseIdentifierName(), /*typeArguments*/ undefined), pos);
    }

    function parseJSDocParameter(): ts.ParameterDeclaration {
        const pos = getNodePos();
        let name: ts.Identifier | undefined;
        if (token() === ts.SyntaxKind.ThisKeyword || token() === ts.SyntaxKind.NewKeyword) {
            name = parseIdentifierName();
            parseExpected(ts.SyntaxKind.ColonToken);
        }
        return finishNode(
            factory.createParameterDeclaration(
                /*modifiers*/ undefined,
                /*dotDotDotToken*/ undefined,
                // TODO(rbuckton): JSDoc parameters don't have names (except `this`/`new`), should we manufacture an empty identifier?
                name!,
                /*questionToken*/ undefined,
                parseJSDocType(),
                /*initializer*/ undefined
            ),
            pos
        );
    }

    function parseJSDocType(): ts.TypeNode {
        scanner.setInJSDocType(true);
        const pos = getNodePos();
        if (parseOptional(ts.SyntaxKind.ModuleKeyword)) {
            // TODO(rbuckton): We never set the type for a JSDocNamepathType. What should we put here?
            const moduleTag = factory.createJSDocNamepathType(/*type*/ undefined!);
            terminate: while (true) {
                switch (token()) {
                    case ts.SyntaxKind.CloseBraceToken:
                    case ts.SyntaxKind.EndOfFileToken:
                    case ts.SyntaxKind.CommaToken:
                    case ts.SyntaxKind.WhitespaceTrivia:
                        break terminate;
                    default:
                        nextTokenJSDoc();
                }
            }

            scanner.setInJSDocType(false);
            return finishNode(moduleTag, pos);
        }

        const hasDotDotDot = parseOptional(ts.SyntaxKind.DotDotDotToken);
        let type = parseTypeOrTypePredicate();
        scanner.setInJSDocType(false);
        if (hasDotDotDot) {
            type = finishNode(factory.createJSDocVariadicType(type), pos);
        }
        if (token() === ts.SyntaxKind.EqualsToken) {
            nextToken();
            return finishNode(factory.createJSDocOptionalType(type), pos);
        }
        return type;
    }

    function parseTypeQuery(): ts.TypeQueryNode {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.TypeOfKeyword);
        const entityName = parseEntityName(/*allowReservedWords*/ true);
        // Make sure we perform ASI to prevent parsing the next line's type arguments as part of an instantiation expression.
        const typeArguments = !scanner.hasPrecedingLineBreak() ? tryParseTypeArguments() : undefined;
        return finishNode(factory.createTypeQueryNode(entityName, typeArguments), pos);
    }

    function parseTypeParameter(): ts.TypeParameterDeclaration {
        const pos = getNodePos();
        const modifiers = parseModifiers();
        const name = parseIdentifier();
        let constraint: ts.TypeNode | undefined;
        let expression: ts.Expression | undefined;
        if (parseOptional(ts.SyntaxKind.ExtendsKeyword)) {
            // It's not uncommon for people to write improper constraints to a generic.  If the
            // user writes a constraint that is an expression and not an actual type, then parse
            // it out as an expression (so we can recover well), but report that a type is needed
            // instead.
            if (isStartOfType() || !isStartOfExpression()) {
                constraint = parseType();
            }
            else {
                // It was not a type, and it looked like an expression.  Parse out an expression
                // here so we recover well.  Note: it is important that we call parseUnaryExpression
                // and not parseExpression here.  If the user has:
                //
                //      <T extends "">
                //
                // We do *not* want to consume the `>` as we're consuming the expression for "".
                expression = parseUnaryExpressionOrHigher();
            }
        }

        const defaultType = parseOptional(ts.SyntaxKind.EqualsToken) ? parseType() : undefined;
        const node = factory.createTypeParameterDeclaration(modifiers, name, constraint, defaultType);
        node.expression = expression;
        return finishNode(node, pos);
    }

    function parseTypeParameters(): ts.NodeArray<ts.TypeParameterDeclaration> | undefined {
        if (token() === ts.SyntaxKind.LessThanToken) {
            return parseBracketedList(ParsingContext.TypeParameters, parseTypeParameter, ts.SyntaxKind.LessThanToken, ts.SyntaxKind.GreaterThanToken);
        }
    }

    function isStartOfParameter(isJSDocParameter: boolean): boolean {
        return token() === ts.SyntaxKind.DotDotDotToken ||
            isBindingIdentifierOrPrivateIdentifierOrPattern() ||
            ts.isModifierKind(token()) ||
            token() === ts.SyntaxKind.AtToken ||
            isStartOfType(/*inStartOfParameter*/ !isJSDocParameter);
    }

    function parseNameOfParameter(modifiers: ts.NodeArray<ts.ModifierLike> | undefined) {
        // FormalParameter [Yield,Await]:
        //      BindingElement[?Yield,?Await]
        const name = parseIdentifierOrPattern(ts.Diagnostics.Private_identifiers_cannot_be_used_as_parameters);
        if (ts.getFullWidth(name) === 0 && !ts.some(modifiers) && ts.isModifierKind(token())) {
            // in cases like
            // 'use strict'
            // function foo(static)
            // isParameter('static') === true, because of isModifier('static')
            // however 'static' is not a legal identifier in a strict mode.
            // so result of this function will be ParameterDeclaration (flags = 0, name = missing, type = undefined, initializer = undefined)
            // and current token will not change => parsing of the enclosing parameter list will last till the end of time (or OOM)
            // to avoid this we'll advance cursor to the next token.
            nextToken();
        }
        return name;
    }

    function isParameterNameStart() {
        // Be permissive about await and yield by calling isBindingIdentifier instead of isIdentifier; disallowing
        // them during a speculative parse leads to many more follow-on errors than allowing the function to parse then later
        // complaining about the use of the keywords.
        return isBindingIdentifier() || token() === ts.SyntaxKind.OpenBracketToken || token() === ts.SyntaxKind.OpenBraceToken;
    }

    function parseParameter(inOuterAwaitContext: boolean): ts.ParameterDeclaration {
        return parseParameterWorker(inOuterAwaitContext);
    }

    function parseParameterForSpeculation(inOuterAwaitContext: boolean): ts.ParameterDeclaration | undefined {
        return parseParameterWorker(inOuterAwaitContext, /*allowAmbiguity*/ false);
    }

    function parseParameterWorker(inOuterAwaitContext: boolean): ts.ParameterDeclaration;
    function parseParameterWorker(inOuterAwaitContext: boolean, allowAmbiguity: false): ts.ParameterDeclaration | undefined;
    function parseParameterWorker(inOuterAwaitContext: boolean, allowAmbiguity = true): ts.ParameterDeclaration | undefined {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        // FormalParameter [Yield,Await]:
        //      BindingElement[?Yield,?Await]

        // Decorators are parsed in the outer [Await] context, the rest of the parameter is parsed in the function's [Await] context.
        const decorators = inOuterAwaitContext ? doInAwaitContext(parseDecorators) : doOutsideOfAwaitContext(parseDecorators);

        if (token() === ts.SyntaxKind.ThisKeyword) {
            const node = factory.createParameterDeclaration(
                decorators,
                /*dotDotDotToken*/ undefined,
                createIdentifier(/*isIdentifier*/ true),
                /*questionToken*/ undefined,
                parseTypeAnnotation(),
                /*initializer*/ undefined
            );

            if (decorators) {
                parseErrorAtRange(decorators[0], ts.Diagnostics.Decorators_may_not_be_applied_to_this_parameters);
            }

            return withJSDoc(finishNode(node, pos), hasJSDoc);
        }

        const savedTopLevel = topLevel;
        topLevel = false;

        const modifiers = combineDecoratorsAndModifiers(decorators, parseModifiers());
        const dotDotDotToken = parseOptionalToken(ts.SyntaxKind.DotDotDotToken);

        if (!allowAmbiguity && !isParameterNameStart()) {
            return undefined;
        }

        const node = withJSDoc(
            finishNode(
                factory.createParameterDeclaration(
                    modifiers,
                    dotDotDotToken,
                    parseNameOfParameter(modifiers),
                    parseOptionalToken(ts.SyntaxKind.QuestionToken),
                    parseTypeAnnotation(),
                    parseInitializer()
                ),
                pos
            ),
            hasJSDoc
        );
        topLevel = savedTopLevel;
        return node;
    }

    function parseReturnType(returnToken: ts.SyntaxKind.EqualsGreaterThanToken, isType: boolean): ts.TypeNode;
    function parseReturnType(returnToken: ts.SyntaxKind.ColonToken | ts.SyntaxKind.EqualsGreaterThanToken, isType: boolean): ts.TypeNode | undefined;
    function parseReturnType(returnToken: ts.SyntaxKind.ColonToken | ts.SyntaxKind.EqualsGreaterThanToken, isType: boolean) {
        if (shouldParseReturnType(returnToken, isType)) {
            return allowConditionalTypesAnd(parseTypeOrTypePredicate);
        }
    }

    function shouldParseReturnType(returnToken: ts.SyntaxKind.ColonToken | ts.SyntaxKind.EqualsGreaterThanToken, isType: boolean): boolean {
        if (returnToken === ts.SyntaxKind.EqualsGreaterThanToken) {
            parseExpected(returnToken);
            return true;
        }
        else if (parseOptional(ts.SyntaxKind.ColonToken)) {
            return true;
        }
        else if (isType && token() === ts.SyntaxKind.EqualsGreaterThanToken) {
            // This is easy to get backward, especially in type contexts, so parse the type anyway
            parseErrorAtCurrentToken(ts.Diagnostics._0_expected, ts.tokenToString(ts.SyntaxKind.ColonToken));
            nextToken();
            return true;
        }
        return false;
    }

    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: true): ts.NodeArray<ts.ParameterDeclaration>;
    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: false): ts.NodeArray<ts.ParameterDeclaration> | undefined;
    function parseParametersWorker(flags: SignatureFlags, allowAmbiguity: boolean): ts.NodeArray<ts.ParameterDeclaration> | undefined {
        // FormalParameters [Yield,Await]: (modified)
        //      [empty]
        //      FormalParameterList[?Yield,Await]
        //
        // FormalParameter[Yield,Await]: (modified)
        //      BindingElement[?Yield,Await]
        //
        // BindingElement [Yield,Await]: (modified)
        //      SingleNameBinding[?Yield,?Await]
        //      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        //
        // SingleNameBinding [Yield,Await]:
        //      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        const savedYieldContext = inYieldContext();
        const savedAwaitContext = inAwaitContext();

        setYieldContext(!!(flags & SignatureFlags.Yield));
        setAwaitContext(!!(flags & SignatureFlags.Await));

        const parameters = flags & SignatureFlags.JSDoc ?
            parseDelimitedList(ParsingContext.JSDocParameters, parseJSDocParameter) :
            parseDelimitedList(ParsingContext.Parameters, () => allowAmbiguity ? parseParameter(savedAwaitContext) : parseParameterForSpeculation(savedAwaitContext));

        setYieldContext(savedYieldContext);
        setAwaitContext(savedAwaitContext);

        return parameters;
    }

    function parseParameters(flags: SignatureFlags): ts.NodeArray<ts.ParameterDeclaration> {
        // FormalParameters [Yield,Await]: (modified)
        //      [empty]
        //      FormalParameterList[?Yield,Await]
        //
        // FormalParameter[Yield,Await]: (modified)
        //      BindingElement[?Yield,Await]
        //
        // BindingElement [Yield,Await]: (modified)
        //      SingleNameBinding[?Yield,?Await]
        //      BindingPattern[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        //
        // SingleNameBinding [Yield,Await]:
        //      BindingIdentifier[?Yield,?Await]Initializer [In, ?Yield,?Await] opt
        if (!parseExpected(ts.SyntaxKind.OpenParenToken)) {
            return createMissingList<ts.ParameterDeclaration>();
        }

        const parameters = parseParametersWorker(flags, /*allowAmbiguity*/ true);
        parseExpected(ts.SyntaxKind.CloseParenToken);
        return parameters;
    }

    function parseTypeMemberSemicolon() {
        // We allow type members to be separated by commas or (possibly ASI) semicolons.
        // First check if it was a comma.  If so, we're done with the member.
        if (parseOptional(ts.SyntaxKind.CommaToken)) {
            return;
        }

        // Didn't have a comma.  We must have a (possible ASI) semicolon.
        parseSemicolon();
    }

    function parseSignatureMember(kind: ts.SyntaxKind.CallSignature | ts.SyntaxKind.ConstructSignature): ts.CallSignatureDeclaration | ts.ConstructSignatureDeclaration {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        if (kind === ts.SyntaxKind.ConstructSignature) {
            parseExpected(ts.SyntaxKind.NewKeyword);
        }

        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(SignatureFlags.Type);
        const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ true);
        parseTypeMemberSemicolon();
        const node = kind === ts.SyntaxKind.CallSignature
            ? factory.createCallSignature(typeParameters, parameters, type)
            : factory.createConstructSignature(typeParameters, parameters, type);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function isIndexSignature(): boolean {
        return token() === ts.SyntaxKind.OpenBracketToken && lookAhead(isUnambiguouslyIndexSignature);
    }

    function isUnambiguouslyIndexSignature() {
        // The only allowed sequence is:
        //
        //   [id:
        //
        // However, for error recovery, we also check the following cases:
        //
        //   [...
        //   [id,
        //   [id?,
        //   [id?:
        //   [id?]
        //   [public id
        //   [private id
        //   [protected id
        //   []
        //
        nextToken();
        if (token() === ts.SyntaxKind.DotDotDotToken || token() === ts.SyntaxKind.CloseBracketToken) {
            return true;
        }

        if (ts.isModifierKind(token())) {
            nextToken();
            if (isIdentifier()) {
                return true;
            }
        }
        else if (!isIdentifier()) {
            return false;
        }
        else {
            // Skip the identifier
            nextToken();
        }

        // A colon signifies a well formed indexer
        // A comma should be a badly formed indexer because comma expressions are not allowed
        // in computed properties.
        if (token() === ts.SyntaxKind.ColonToken || token() === ts.SyntaxKind.CommaToken) {
            return true;
        }

        // Question mark could be an indexer with an optional property,
        // or it could be a conditional expression in a computed property.
        if (token() !== ts.SyntaxKind.QuestionToken) {
            return false;
        }

        // If any of the following tokens are after the question mark, it cannot
        // be a conditional expression, so treat it as an indexer.
        nextToken();
        return token() === ts.SyntaxKind.ColonToken || token() === ts.SyntaxKind.CommaToken || token() === ts.SyntaxKind.CloseBracketToken;
    }

    function parseIndexSignatureDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.IndexSignatureDeclaration {
        const parameters = parseBracketedList<ts.ParameterDeclaration>(ParsingContext.Parameters, () => parseParameter(/*inOuterAwaitContext*/ false), ts.SyntaxKind.OpenBracketToken, ts.SyntaxKind.CloseBracketToken);
        const type = parseTypeAnnotation();
        parseTypeMemberSemicolon();
        const node = factory.createIndexSignature(modifiers, parameters, type);
        (node as ts.Mutable<ts.IndexSignatureDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parsePropertyOrMethodSignature(pos: number, hasJSDoc: boolean, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.PropertySignature | ts.MethodSignature {
        const name = parsePropertyName();
        const questionToken = parseOptionalToken(ts.SyntaxKind.QuestionToken);
        let node: ts.PropertySignature | ts.MethodSignature;
        if (token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.LessThanToken) {
            // Method signatures don't exist in expression contexts.  So they have neither
            // [Yield] nor [Await]
            const typeParameters = parseTypeParameters();
            const parameters = parseParameters(SignatureFlags.Type);
            const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ true);
            node = factory.createMethodSignature(modifiers, name, questionToken, typeParameters, parameters, type);
        }
        else {
            const type = parseTypeAnnotation();
            node = factory.createPropertySignature(modifiers, name, questionToken, type);
            // Although type literal properties cannot not have initializers, we attempt
            // to parse an initializer so we can report in the checker that an interface
            // property or type literal property cannot have an initializer.
            if (token() === ts.SyntaxKind.EqualsToken) (node as ts.Mutable<ts.PropertySignature>).initializer = parseInitializer();
        }
        parseTypeMemberSemicolon();
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function isTypeMemberStart(): boolean {
        // Return true if we have the start of a signature member
        if (token() === ts.SyntaxKind.OpenParenToken ||
            token() === ts.SyntaxKind.LessThanToken ||
            token() === ts.SyntaxKind.GetKeyword ||
            token() === ts.SyntaxKind.SetKeyword) {
            return true;
        }
        let idToken = false;
        // Eat up all modifiers, but hold on to the last one in case it is actually an identifier
        while (ts.isModifierKind(token())) {
            idToken = true;
            nextToken();
        }
        // Index signatures and computed property names are type members
        if (token() === ts.SyntaxKind.OpenBracketToken) {
            return true;
        }
        // Try to get the first property-like token following all modifiers
        if (isLiteralPropertyName()) {
            idToken = true;
            nextToken();
        }
        // If we were able to get any potential identifier, check that it is
        // the start of a member declaration
        if (idToken) {
            return token() === ts.SyntaxKind.OpenParenToken ||
                token() === ts.SyntaxKind.LessThanToken ||
                token() === ts.SyntaxKind.QuestionToken ||
                token() === ts.SyntaxKind.ColonToken ||
                token() === ts.SyntaxKind.CommaToken ||
                canParseSemicolon();
        }
        return false;
    }

    function parseTypeMember(): ts.TypeElement {
        if (token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.LessThanToken) {
            return parseSignatureMember(ts.SyntaxKind.CallSignature);
        }
        if (token() === ts.SyntaxKind.NewKeyword && lookAhead(nextTokenIsOpenParenOrLessThan)) {
            return parseSignatureMember(ts.SyntaxKind.ConstructSignature);
        }
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers();
        if (parseContextualModifier(ts.SyntaxKind.GetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, /*decorators*/ undefined, modifiers, ts.SyntaxKind.GetAccessor, SignatureFlags.Type);
        }

        if (parseContextualModifier(ts.SyntaxKind.SetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, /*decorators*/ undefined, modifiers, ts.SyntaxKind.SetAccessor, SignatureFlags.Type);
        }

        if (isIndexSignature()) {
            return parseIndexSignatureDeclaration(pos, hasJSDoc, /*decorators*/ undefined, modifiers);
        }
        return parsePropertyOrMethodSignature(pos, hasJSDoc, modifiers);
    }

    function nextTokenIsOpenParenOrLessThan() {
        nextToken();
        return token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.LessThanToken;
    }

    function nextTokenIsDot() {
        return nextToken() === ts.SyntaxKind.DotToken;
    }

    function nextTokenIsOpenParenOrLessThanOrDot() {
        switch (nextToken()) {
            case ts.SyntaxKind.OpenParenToken:
            case ts.SyntaxKind.LessThanToken:
            case ts.SyntaxKind.DotToken:
                return true;
        }
        return false;
    }

    function parseTypeLiteral(): ts.TypeLiteralNode {
        const pos = getNodePos();
        return finishNode(factory.createTypeLiteralNode(parseObjectTypeMembers()), pos);
    }

    function parseObjectTypeMembers(): ts.NodeArray<ts.TypeElement> {
        let members: ts.NodeArray<ts.TypeElement>;
        if (parseExpected(ts.SyntaxKind.OpenBraceToken)) {
            members = parseList(ParsingContext.TypeMembers, parseTypeMember);
            parseExpected(ts.SyntaxKind.CloseBraceToken);
        }
        else {
            members = createMissingList<ts.TypeElement>();
        }

        return members;
    }

    function isStartOfMappedType() {
        nextToken();
        if (token() === ts.SyntaxKind.PlusToken || token() === ts.SyntaxKind.MinusToken) {
            return nextToken() === ts.SyntaxKind.ReadonlyKeyword;
        }
        if (token() === ts.SyntaxKind.ReadonlyKeyword) {
            nextToken();
        }
        return token() === ts.SyntaxKind.OpenBracketToken && nextTokenIsIdentifier() && nextToken() === ts.SyntaxKind.InKeyword;
    }

    function parseMappedTypeParameter() {
        const pos = getNodePos();
        const name = parseIdentifierName();
        parseExpected(ts.SyntaxKind.InKeyword);
        const type = parseType();
        return finishNode(factory.createTypeParameterDeclaration(/*modifiers*/ undefined, name, type, /*defaultType*/ undefined), pos);
    }

    function parseMappedType() {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.OpenBraceToken);
        let readonlyToken: ts.ReadonlyKeyword | ts.PlusToken | ts.MinusToken | undefined;
        if (token() === ts.SyntaxKind.ReadonlyKeyword || token() === ts.SyntaxKind.PlusToken || token() === ts.SyntaxKind.MinusToken) {
            readonlyToken = parseTokenNode<ts.ReadonlyKeyword | ts.PlusToken | ts.MinusToken>();
            if (readonlyToken.kind !== ts.SyntaxKind.ReadonlyKeyword) {
                parseExpected(ts.SyntaxKind.ReadonlyKeyword);
            }
        }
        parseExpected(ts.SyntaxKind.OpenBracketToken);
        const typeParameter = parseMappedTypeParameter();
        const nameType = parseOptional(ts.SyntaxKind.AsKeyword) ? parseType() : undefined;
        parseExpected(ts.SyntaxKind.CloseBracketToken);
        let questionToken: ts.QuestionToken | ts.PlusToken | ts.MinusToken | undefined;
        if (token() === ts.SyntaxKind.QuestionToken || token() === ts.SyntaxKind.PlusToken || token() === ts.SyntaxKind.MinusToken) {
            questionToken = parseTokenNode<ts.QuestionToken | ts.PlusToken | ts.MinusToken>();
            if (questionToken.kind !== ts.SyntaxKind.QuestionToken) {
                parseExpected(ts.SyntaxKind.QuestionToken);
            }
        }
        const type = parseTypeAnnotation();
        parseSemicolon();
        const members = parseList(ParsingContext.TypeMembers, parseTypeMember);
        parseExpected(ts.SyntaxKind.CloseBraceToken);
        return finishNode(factory.createMappedTypeNode(readonlyToken, typeParameter, nameType, questionToken, type, members), pos);
    }

    function parseTupleElementType() {
        const pos = getNodePos();
        if (parseOptional(ts.SyntaxKind.DotDotDotToken)) {
            return finishNode(factory.createRestTypeNode(parseType()), pos);
        }
        const type = parseType();
        if (ts.isJSDocNullableType(type) && type.pos === type.type.pos) {
            const node = factory.createOptionalTypeNode(type.type);
            ts.setTextRange(node, type);
            (node as ts.Mutable<ts.Node>).flags = type.flags;
            return node;
        }
        return type;
    }

    function isNextTokenColonOrQuestionColon() {
        return nextToken() === ts.SyntaxKind.ColonToken || (token() === ts.SyntaxKind.QuestionToken && nextToken() === ts.SyntaxKind.ColonToken);
    }

    function isTupleElementName() {
        if (token() === ts.SyntaxKind.DotDotDotToken) {
            return ts.tokenIsIdentifierOrKeyword(nextToken()) && isNextTokenColonOrQuestionColon();
        }
        return ts.tokenIsIdentifierOrKeyword(token()) && isNextTokenColonOrQuestionColon();
    }

    function parseTupleElementNameOrTupleElementType() {
        if (lookAhead(isTupleElementName)) {
            const pos = getNodePos();
            const hasJSDoc = hasPrecedingJSDocComment();
            const dotDotDotToken = parseOptionalToken(ts.SyntaxKind.DotDotDotToken);
            const name = parseIdentifierName();
            const questionToken = parseOptionalToken(ts.SyntaxKind.QuestionToken);
            parseExpected(ts.SyntaxKind.ColonToken);
            const type = parseTupleElementType();
            const node = factory.createNamedTupleMember(dotDotDotToken, name, questionToken, type);
            return withJSDoc(finishNode(node, pos), hasJSDoc);
        }
        return parseTupleElementType();
    }

    function parseTupleType(): ts.TupleTypeNode {
        const pos = getNodePos();
        return finishNode(
            factory.createTupleTypeNode(
                parseBracketedList(ParsingContext.TupleElementTypes, parseTupleElementNameOrTupleElementType, ts.SyntaxKind.OpenBracketToken, ts.SyntaxKind.CloseBracketToken)
            ),
            pos
        );
    }

    function parseParenthesizedType(): ts.TypeNode {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.OpenParenToken);
        const type = parseType();
        parseExpected(ts.SyntaxKind.CloseParenToken);
        return finishNode(factory.createParenthesizedType(type), pos);
    }

    function parseModifiersForConstructorType(): ts.NodeArray<ts.Modifier> | undefined {
        let modifiers: ts.NodeArray<ts.Modifier> | undefined;
        if (token() === ts.SyntaxKind.AbstractKeyword) {
            const pos = getNodePos();
            nextToken();
            const modifier = finishNode(factory.createToken(ts.SyntaxKind.AbstractKeyword), pos);
            modifiers = createNodeArray<ts.Modifier>([modifier], pos);
        }
        return modifiers;
    }

    function parseFunctionOrConstructorType(): ts.TypeNode {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiersForConstructorType();
        const isConstructorType = parseOptional(ts.SyntaxKind.NewKeyword);
        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(SignatureFlags.Type);
        const type = parseReturnType(ts.SyntaxKind.EqualsGreaterThanToken, /*isType*/ false);
        const node = isConstructorType
            ? factory.createConstructorTypeNode(modifiers, typeParameters, parameters, type)
            : factory.createFunctionTypeNode(typeParameters, parameters, type);
        if (!isConstructorType) (node as ts.Mutable<ts.FunctionTypeNode>).modifiers = modifiers;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseKeywordAndNoDot(): ts.TypeNode | undefined {
        const node = parseTokenNode<ts.TypeNode>();
        return token() === ts.SyntaxKind.DotToken ? undefined : node;
    }

    function parseLiteralTypeNode(negative?: boolean): ts.LiteralTypeNode {
        const pos = getNodePos();
        if (negative) {
            nextToken();
        }
        let expression: ts.BooleanLiteral | ts.NullLiteral | ts.LiteralExpression | ts.PrefixUnaryExpression =
            token() === ts.SyntaxKind.TrueKeyword || token() === ts.SyntaxKind.FalseKeyword || token() === ts.SyntaxKind.NullKeyword ?
                parseTokenNode<ts.BooleanLiteral | ts.NullLiteral>() :
                parseLiteralLikeNode(token()) as ts.LiteralExpression;
        if (negative) {
            expression = finishNode(factory.createPrefixUnaryExpression(ts.SyntaxKind.MinusToken, expression), pos);
        }
        return finishNode(factory.createLiteralTypeNode(expression), pos);
    }

    function isStartOfTypeOfImportType() {
        nextToken();
        return token() === ts.SyntaxKind.ImportKeyword;
    }

    function parseImportTypeAssertions(): ts.ImportTypeAssertionContainer {
        const pos = getNodePos();
        const openBracePosition = scanner.getTokenPos();
        parseExpected(ts.SyntaxKind.OpenBraceToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        parseExpected(ts.SyntaxKind.AssertKeyword);
        parseExpected(ts.SyntaxKind.ColonToken);
        const clause = parseAssertClause(/*skipAssertKeyword*/ true);
        if (!parseExpected(ts.SyntaxKind.CloseBraceToken)) {
            const lastError = ts.lastOrUndefined(parseDiagnostics);
            if (lastError && lastError.code === ts.Diagnostics._0_expected.code) {
                ts.addRelatedInfo(
                    lastError,
                    ts.createDetachedDiagnostic(fileName, openBracePosition, 1, ts.Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}")
                );
            }
        }
        return finishNode(factory.createImportTypeAssertionContainer(clause, multiLine), pos);
    }

    function parseImportType(): ts.ImportTypeNode {
        sourceFlags |= ts.NodeFlags.PossiblyContainsDynamicImport;
        const pos = getNodePos();
        const isTypeOf = parseOptional(ts.SyntaxKind.TypeOfKeyword);
        parseExpected(ts.SyntaxKind.ImportKeyword);
        parseExpected(ts.SyntaxKind.OpenParenToken);
        const type = parseType();
        let assertions: ts.ImportTypeAssertionContainer | undefined;
        if (parseOptional(ts.SyntaxKind.CommaToken)) {
            assertions = parseImportTypeAssertions();
        }
        parseExpected(ts.SyntaxKind.CloseParenToken);
        const qualifier = parseOptional(ts.SyntaxKind.DotToken) ? parseEntityNameOfTypeReference() : undefined;
        const typeArguments = parseTypeArgumentsOfTypeReference();
        return finishNode(factory.createImportTypeNode(type, assertions, qualifier, typeArguments, isTypeOf), pos);
    }

    function nextTokenIsNumericOrBigIntLiteral() {
        nextToken();
        return token() === ts.SyntaxKind.NumericLiteral || token() === ts.SyntaxKind.BigIntLiteral;
    }

    function parseNonArrayType(): ts.TypeNode {
        switch (token()) {
            case ts.SyntaxKind.AnyKeyword:
            case ts.SyntaxKind.UnknownKeyword:
            case ts.SyntaxKind.StringKeyword:
            case ts.SyntaxKind.NumberKeyword:
            case ts.SyntaxKind.BigIntKeyword:
            case ts.SyntaxKind.SymbolKeyword:
            case ts.SyntaxKind.BooleanKeyword:
            case ts.SyntaxKind.UndefinedKeyword:
            case ts.SyntaxKind.NeverKeyword:
            case ts.SyntaxKind.ObjectKeyword:
                // If these are followed by a dot, then parse these out as a dotted type reference instead.
                return tryParse(parseKeywordAndNoDot) || parseTypeReference();
            case ts.SyntaxKind.AsteriskEqualsToken:
                // If there is '*=', treat it as * followed by postfix =
                scanner.reScanAsteriskEqualsToken();
                // falls through
            case ts.SyntaxKind.AsteriskToken:
                return parseJSDocAllType();
            case ts.SyntaxKind.QuestionQuestionToken:
                // If there is '??', treat it as prefix-'?' in JSDoc type.
                scanner.reScanQuestionToken();
                // falls through
            case ts.SyntaxKind.QuestionToken:
                return parseJSDocUnknownOrNullableType();
            case ts.SyntaxKind.FunctionKeyword:
                return parseJSDocFunctionType();
            case ts.SyntaxKind.ExclamationToken:
                return parseJSDocNonNullableType();
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.BigIntLiteral:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.NullKeyword:
                return parseLiteralTypeNode();
            case ts.SyntaxKind.MinusToken:
                return lookAhead(nextTokenIsNumericOrBigIntLiteral) ? parseLiteralTypeNode(/*negative*/ true) : parseTypeReference();
            case ts.SyntaxKind.VoidKeyword:
                return parseTokenNode<ts.TypeNode>();
            case ts.SyntaxKind.ThisKeyword: {
                const thisKeyword = parseThisTypeNode();
                if (token() === ts.SyntaxKind.IsKeyword && !scanner.hasPrecedingLineBreak()) {
                    return parseThisTypePredicate(thisKeyword);
                }
                else {
                    return thisKeyword;
                }
            }
            case ts.SyntaxKind.TypeOfKeyword:
                return lookAhead(isStartOfTypeOfImportType) ? parseImportType() : parseTypeQuery();
            case ts.SyntaxKind.OpenBraceToken:
                return lookAhead(isStartOfMappedType) ? parseMappedType() : parseTypeLiteral();
            case ts.SyntaxKind.OpenBracketToken:
                return parseTupleType();
            case ts.SyntaxKind.OpenParenToken:
                return parseParenthesizedType();
            case ts.SyntaxKind.ImportKeyword:
                return parseImportType();
            case ts.SyntaxKind.AssertsKeyword:
                return lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine) ? parseAssertsTypePredicate() : parseTypeReference();
            case ts.SyntaxKind.TemplateHead:
                return parseTemplateType();
            default:
                return parseTypeReference();
        }
    }

    function isStartOfType(inStartOfParameter?: boolean): boolean {
        switch (token()) {
            case ts.SyntaxKind.AnyKeyword:
            case ts.SyntaxKind.UnknownKeyword:
            case ts.SyntaxKind.StringKeyword:
            case ts.SyntaxKind.NumberKeyword:
            case ts.SyntaxKind.BigIntKeyword:
            case ts.SyntaxKind.BooleanKeyword:
            case ts.SyntaxKind.ReadonlyKeyword:
            case ts.SyntaxKind.SymbolKeyword:
            case ts.SyntaxKind.UniqueKeyword:
            case ts.SyntaxKind.VoidKeyword:
            case ts.SyntaxKind.UndefinedKeyword:
            case ts.SyntaxKind.NullKeyword:
            case ts.SyntaxKind.ThisKeyword:
            case ts.SyntaxKind.TypeOfKeyword:
            case ts.SyntaxKind.NeverKeyword:
            case ts.SyntaxKind.OpenBraceToken:
            case ts.SyntaxKind.OpenBracketToken:
            case ts.SyntaxKind.LessThanToken:
            case ts.SyntaxKind.BarToken:
            case ts.SyntaxKind.AmpersandToken:
            case ts.SyntaxKind.NewKeyword:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.BigIntLiteral:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.ObjectKeyword:
            case ts.SyntaxKind.AsteriskToken:
            case ts.SyntaxKind.QuestionToken:
            case ts.SyntaxKind.ExclamationToken:
            case ts.SyntaxKind.DotDotDotToken:
            case ts.SyntaxKind.InferKeyword:
            case ts.SyntaxKind.ImportKeyword:
            case ts.SyntaxKind.AssertsKeyword:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.TemplateHead:
                return true;
            case ts.SyntaxKind.FunctionKeyword:
                return !inStartOfParameter;
            case ts.SyntaxKind.MinusToken:
                return !inStartOfParameter && lookAhead(nextTokenIsNumericOrBigIntLiteral);
            case ts.SyntaxKind.OpenParenToken:
                // Only consider '(' the start of a type if followed by ')', '...', an identifier, a modifier,
                // or something that starts a type. We don't want to consider things like '(1)' a type.
                return !inStartOfParameter && lookAhead(isStartOfParenthesizedOrFunctionType);
            default:
                return isIdentifier();
        }
    }

    function isStartOfParenthesizedOrFunctionType() {
        nextToken();
        return token() === ts.SyntaxKind.CloseParenToken || isStartOfParameter(/*isJSDocParameter*/ false) || isStartOfType();
    }

    function parsePostfixTypeOrHigher(): ts.TypeNode {
        const pos = getNodePos();
        let type = parseNonArrayType();
        while (!scanner.hasPrecedingLineBreak()) {
            switch (token()) {
                case ts.SyntaxKind.ExclamationToken:
                    nextToken();
                    type = finishNode(factory.createJSDocNonNullableType(type, /*postfix*/ true), pos);
                    break;
                case ts.SyntaxKind.QuestionToken:
                    // If next token is start of a type we have a conditional type
                    if (lookAhead(nextTokenIsStartOfType)) {
                        return type;
                    }
                    nextToken();
                    type = finishNode(factory.createJSDocNullableType(type, /*postfix*/ true), pos);
                    break;
                case ts.SyntaxKind.OpenBracketToken:
                    parseExpected(ts.SyntaxKind.OpenBracketToken);
                    if (isStartOfType()) {
                        const indexType = parseType();
                        parseExpected(ts.SyntaxKind.CloseBracketToken);
                        type = finishNode(factory.createIndexedAccessTypeNode(type, indexType), pos);
                    }
                    else {
                        parseExpected(ts.SyntaxKind.CloseBracketToken);
                        type = finishNode(factory.createArrayTypeNode(type), pos);
                    }
                    break;
                default:
                    return type;
            }
        }
        return type;
    }

    function parseTypeOperator(operator: ts.SyntaxKind.KeyOfKeyword | ts.SyntaxKind.UniqueKeyword | ts.SyntaxKind.ReadonlyKeyword) {
        const pos = getNodePos();
        parseExpected(operator);
        return finishNode(factory.createTypeOperatorNode(operator, parseTypeOperatorOrHigher()), pos);
    }

    function tryParseConstraintOfInferType() {
        if (parseOptional(ts.SyntaxKind.ExtendsKeyword)) {
            const constraint = disallowConditionalTypesAnd(parseType);
            if (inDisallowConditionalTypesContext() || token() !== ts.SyntaxKind.QuestionToken) {
                return constraint;
            }
        }
    }

    function parseTypeParameterOfInferType(): ts.TypeParameterDeclaration {
        const pos = getNodePos();
        const name = parseIdentifier();
        const constraint = tryParse(tryParseConstraintOfInferType);
        const node = factory.createTypeParameterDeclaration(/*modifiers*/ undefined, name, constraint);
        return finishNode(node, pos);
    }

    function parseInferType(): ts.InferTypeNode {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.InferKeyword);
        return finishNode(factory.createInferTypeNode(parseTypeParameterOfInferType()), pos);
    }

    function parseTypeOperatorOrHigher(): ts.TypeNode {
        const operator = token();
        switch (operator) {
            case ts.SyntaxKind.KeyOfKeyword:
            case ts.SyntaxKind.UniqueKeyword:
            case ts.SyntaxKind.ReadonlyKeyword:
                return parseTypeOperator(operator);
            case ts.SyntaxKind.InferKeyword:
                return parseInferType();
        }
        return allowConditionalTypesAnd(parsePostfixTypeOrHigher);
    }

    function parseFunctionOrConstructorTypeToError(
        isInUnionType: boolean
    ): ts.TypeNode | undefined {
        // the function type and constructor type shorthand notation
        // are not allowed directly in unions and intersections, but we'll
        // try to parse them gracefully and issue a helpful message.
        if (isStartOfFunctionTypeOrConstructorType()) {
            const type = parseFunctionOrConstructorType();
            let diagnostic: ts.DiagnosticMessage;
            if (ts.isFunctionTypeNode(type)) {
                diagnostic = isInUnionType
                    ? ts.Diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_a_union_type
                    : ts.Diagnostics.Function_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;
            }
            else {
                diagnostic = isInUnionType
                    ? ts.Diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_a_union_type
                    : ts.Diagnostics.Constructor_type_notation_must_be_parenthesized_when_used_in_an_intersection_type;

            }
            parseErrorAtRange(type, diagnostic);
            return type;
        }
        return undefined;
    }

    function parseUnionOrIntersectionType(
        operator: ts.SyntaxKind.BarToken | ts.SyntaxKind.AmpersandToken,
        parseConstituentType: () => ts.TypeNode,
        createTypeNode: (types: ts.NodeArray<ts.TypeNode>) => ts.UnionOrIntersectionTypeNode
    ): ts.TypeNode {
        const pos = getNodePos();
        const isUnionType = operator === ts.SyntaxKind.BarToken;
        const hasLeadingOperator = parseOptional(operator);
        let type = hasLeadingOperator && parseFunctionOrConstructorTypeToError(isUnionType)
            || parseConstituentType();
        if (token() === operator || hasLeadingOperator) {
            const types = [type];
            while (parseOptional(operator)) {
                types.push(parseFunctionOrConstructorTypeToError(isUnionType) || parseConstituentType());
            }
            type = finishNode(createTypeNode(createNodeArray(types, pos)), pos);
        }
        return type;
    }

    function parseIntersectionTypeOrHigher(): ts.TypeNode {
        return parseUnionOrIntersectionType(ts.SyntaxKind.AmpersandToken, parseTypeOperatorOrHigher, factory.createIntersectionTypeNode);
    }

    function parseUnionTypeOrHigher(): ts.TypeNode {
        return parseUnionOrIntersectionType(ts.SyntaxKind.BarToken, parseIntersectionTypeOrHigher, factory.createUnionTypeNode);
    }

    function nextTokenIsNewKeyword(): boolean {
        nextToken();
        return token() === ts.SyntaxKind.NewKeyword;
    }

    function isStartOfFunctionTypeOrConstructorType(): boolean {
        if (token() === ts.SyntaxKind.LessThanToken) {
            return true;
        }
        if (token() === ts.SyntaxKind.OpenParenToken && lookAhead(isUnambiguouslyStartOfFunctionType)) {
            return true;
        }
        return token() === ts.SyntaxKind.NewKeyword ||
            token() === ts.SyntaxKind.AbstractKeyword && lookAhead(nextTokenIsNewKeyword);
    }

    function skipParameterStart(): boolean {
        if (ts.isModifierKind(token())) {
            // Skip modifiers
            parseModifiers();
        }
        if (isIdentifier() || token() === ts.SyntaxKind.ThisKeyword) {
            nextToken();
            return true;
        }
        if (token() === ts.SyntaxKind.OpenBracketToken || token() === ts.SyntaxKind.OpenBraceToken) {
            // Return true if we can parse an array or object binding pattern with no errors
            const previousErrorCount = parseDiagnostics.length;
            parseIdentifierOrPattern();
            return previousErrorCount === parseDiagnostics.length;
        }
        return false;
    }

    function isUnambiguouslyStartOfFunctionType() {
        nextToken();
        if (token() === ts.SyntaxKind.CloseParenToken || token() === ts.SyntaxKind.DotDotDotToken) {
            // ( )
            // ( ...
            return true;
        }
        if (skipParameterStart()) {
            // We successfully skipped modifiers (if any) and an identifier or binding pattern,
            // now see if we have something that indicates a parameter declaration
            if (token() === ts.SyntaxKind.ColonToken || token() === ts.SyntaxKind.CommaToken ||
                token() === ts.SyntaxKind.QuestionToken || token() === ts.SyntaxKind.EqualsToken) {
                // ( xxx :
                // ( xxx ,
                // ( xxx ?
                // ( xxx =
                return true;
            }
            if (token() === ts.SyntaxKind.CloseParenToken) {
                nextToken();
                if (token() === ts.SyntaxKind.EqualsGreaterThanToken) {
                    // ( xxx ) =>
                    return true;
                }
            }
        }
        return false;
    }

    function parseTypeOrTypePredicate(): ts.TypeNode {
        const pos = getNodePos();
        const typePredicateVariable = isIdentifier() && tryParse(parseTypePredicatePrefix);
        const type = parseType();
        if (typePredicateVariable) {
            return finishNode(factory.createTypePredicateNode(/*assertsModifier*/ undefined, typePredicateVariable, type), pos);
        }
        else {
            return type;
        }
    }

    function parseTypePredicatePrefix() {
        const id = parseIdentifier();
        if (token() === ts.SyntaxKind.IsKeyword && !scanner.hasPrecedingLineBreak()) {
            nextToken();
            return id;
        }
    }

    function parseAssertsTypePredicate(): ts.TypeNode {
        const pos = getNodePos();
        const assertsModifier = parseExpectedToken(ts.SyntaxKind.AssertsKeyword);
        const parameterName = token() === ts.SyntaxKind.ThisKeyword ? parseThisTypeNode() : parseIdentifier();
        const type = parseOptional(ts.SyntaxKind.IsKeyword) ? parseType() : undefined;
        return finishNode(factory.createTypePredicateNode(assertsModifier, parameterName, type), pos);
    }

    function parseType(): ts.TypeNode {
        if (contextFlags & ts.NodeFlags.TypeExcludesFlags) {
            return doOutsideOfContext(ts.NodeFlags.TypeExcludesFlags, parseType);
        }

        if (isStartOfFunctionTypeOrConstructorType()) {
            return parseFunctionOrConstructorType();
        }
        const pos = getNodePos();
        const type = parseUnionTypeOrHigher();
        if (!inDisallowConditionalTypesContext() && !scanner.hasPrecedingLineBreak() && parseOptional(ts.SyntaxKind.ExtendsKeyword)) {
            // The type following 'extends' is not permitted to be another conditional type
            const extendsType = disallowConditionalTypesAnd(parseType);
            parseExpected(ts.SyntaxKind.QuestionToken);
            const trueType = allowConditionalTypesAnd(parseType);
            parseExpected(ts.SyntaxKind.ColonToken);
            const falseType = allowConditionalTypesAnd(parseType);
            return finishNode(factory.createConditionalTypeNode(type, extendsType, trueType, falseType), pos);
        }
        return type;
    }

    function parseTypeAnnotation(): ts.TypeNode | undefined {
        return parseOptional(ts.SyntaxKind.ColonToken) ? parseType() : undefined;
    }

    // EXPRESSIONS
    function isStartOfLeftHandSideExpression(): boolean {
        switch (token()) {
            case ts.SyntaxKind.ThisKeyword:
            case ts.SyntaxKind.SuperKeyword:
            case ts.SyntaxKind.NullKeyword:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.BigIntLiteral:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            case ts.SyntaxKind.TemplateHead:
            case ts.SyntaxKind.OpenParenToken:
            case ts.SyntaxKind.OpenBracketToken:
            case ts.SyntaxKind.OpenBraceToken:
            case ts.SyntaxKind.FunctionKeyword:
            case ts.SyntaxKind.ClassKeyword:
            case ts.SyntaxKind.NewKeyword:
            case ts.SyntaxKind.SlashToken:
            case ts.SyntaxKind.SlashEqualsToken:
            case ts.SyntaxKind.Identifier:
                return true;
            case ts.SyntaxKind.ImportKeyword:
                return lookAhead(nextTokenIsOpenParenOrLessThanOrDot);
            default:
                return isIdentifier();
        }
    }

    function isStartOfExpression(): boolean {
        if (isStartOfLeftHandSideExpression()) {
            return true;
        }

        switch (token()) {
            case ts.SyntaxKind.PlusToken:
            case ts.SyntaxKind.MinusToken:
            case ts.SyntaxKind.TildeToken:
            case ts.SyntaxKind.ExclamationToken:
            case ts.SyntaxKind.DeleteKeyword:
            case ts.SyntaxKind.TypeOfKeyword:
            case ts.SyntaxKind.VoidKeyword:
            case ts.SyntaxKind.PlusPlusToken:
            case ts.SyntaxKind.MinusMinusToken:
            case ts.SyntaxKind.LessThanToken:
            case ts.SyntaxKind.AwaitKeyword:
            case ts.SyntaxKind.YieldKeyword:
            case ts.SyntaxKind.PrivateIdentifier:
                // Yield/await always starts an expression.  Either it is an identifier (in which case
                // it is definitely an expression).  Or it's a keyword (either because we're in
                // a generator or async function, or in strict mode (or both)) and it started a yield or await expression.
                return true;
            default:
                // Error tolerance.  If we see the start of some binary operator, we consider
                // that the start of an expression.  That way we'll parse out a missing identifier,
                // give a good message about an identifier being missing, and then consume the
                // rest of the binary expression.
                if (isBinaryOperator()) {
                    return true;
                }

                return isIdentifier();
        }
    }

    function isStartOfExpressionStatement(): boolean {
        // As per the grammar, none of '{' or 'function' or 'class' can start an expression statement.
        return token() !== ts.SyntaxKind.OpenBraceToken &&
            token() !== ts.SyntaxKind.FunctionKeyword &&
            token() !== ts.SyntaxKind.ClassKeyword &&
            token() !== ts.SyntaxKind.AtToken &&
            isStartOfExpression();
    }

    function parseExpression(): ts.Expression {
        // Expression[in]:
        //      AssignmentExpression[in]
        //      Expression[in] , AssignmentExpression[in]

        // clear the decorator context when parsing Expression, as it should be unambiguous when parsing a decorator
        const saveDecoratorContext = inDecoratorContext();
        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ false);
        }

        const pos = getNodePos();
        let expr = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        let operatorToken: ts.BinaryOperatorToken;
        while ((operatorToken = parseOptionalToken(ts.SyntaxKind.CommaToken))) {
            expr = makeBinaryExpression(expr, operatorToken, parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true), pos);
        }

        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ true);
        }
        return expr;
    }

    function parseInitializer(): ts.Expression | undefined {
        return parseOptional(ts.SyntaxKind.EqualsToken) ? parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true) : undefined;
    }

    function parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction: boolean): ts.Expression {
        //  AssignmentExpression[in,yield]:
        //      1) ConditionalExpression[?in,?yield]
        //      2) LeftHandSideExpression = AssignmentExpression[?in,?yield]
        //      3) LeftHandSideExpression AssignmentOperator AssignmentExpression[?in,?yield]
        //      4) ArrowFunctionExpression[?in,?yield]
        //      5) AsyncArrowFunctionExpression[in,yield,await]
        //      6) [+Yield] YieldExpression[?In]
        //
        // Note: for ease of implementation we treat productions '2' and '3' as the same thing.
        // (i.e. they're both BinaryExpressions with an assignment operator in it).

        // First, do the simple check if we have a YieldExpression (production '6').
        if (isYieldExpression()) {
            return parseYieldExpression();
        }

        // Then, check if we have an arrow function (production '4' and '5') that starts with a parenthesized
        // parameter list or is an async arrow function.
        // AsyncArrowFunctionExpression:
        //      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
        //      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
        // Production (1) of AsyncArrowFunctionExpression is parsed in "tryParseAsyncSimpleArrowFunctionExpression".
        // And production (2) is parsed in "tryParseParenthesizedArrowFunctionExpression".
        //
        // If we do successfully parse arrow-function, we must *not* recurse for productions 1, 2 or 3. An ArrowFunction is
        // not a LeftHandSideExpression, nor does it start a ConditionalExpression.  So we are done
        // with AssignmentExpression if we see one.
        const arrowExpression = tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction) || tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction);
        if (arrowExpression) {
            return arrowExpression;
        }

        // Now try to see if we're in production '1', '2' or '3'.  A conditional expression can
        // start with a LogicalOrExpression, while the assignment productions can only start with
        // LeftHandSideExpressions.
        //
        // So, first, we try to just parse out a BinaryExpression.  If we get something that is a
        // LeftHandSide or higher, then we can try to parse out the assignment expression part.
        // Otherwise, we try to parse out the conditional expression bit.  We want to allow any
        // binary expression here, so we pass in the 'lowest' precedence here so that it matches
        // and consumes anything.
        const pos = getNodePos();
        const expr = parseBinaryExpressionOrHigher(ts.OperatorPrecedence.Lowest);

        // To avoid a look-ahead, we did not handle the case of an arrow function with a single un-parenthesized
        // parameter ('x => ...') above. We handle it here by checking if the parsed expression was a single
        // identifier and the current token is an arrow.
        if (expr.kind === ts.SyntaxKind.Identifier && token() === ts.SyntaxKind.EqualsGreaterThanToken) {
            return parseSimpleArrowFunctionExpression(pos, expr as ts.Identifier, allowReturnTypeInArrowFunction, /*asyncModifier*/ undefined);
        }

        // Now see if we might be in cases '2' or '3'.
        // If the expression was a LHS expression, and we have an assignment operator, then
        // we're in '2' or '3'. Consume the assignment and return.
        //
        // Note: we call reScanGreaterToken so that we get an appropriately merged token
        // for cases like `> > =` becoming `>>=`
        if (ts.isLeftHandSideExpression(expr) && ts.isAssignmentOperator(reScanGreaterToken())) {
            return makeBinaryExpression(expr, parseTokenNode(), parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction), pos);
        }

        // It wasn't an assignment or a lambda.  This is a conditional expression:
        return parseConditionalExpressionRest(expr, pos, allowReturnTypeInArrowFunction);
    }

    function isYieldExpression(): boolean {
        if (token() === ts.SyntaxKind.YieldKeyword) {
            // If we have a 'yield' keyword, and this is a context where yield expressions are
            // allowed, then definitely parse out a yield expression.
            if (inYieldContext()) {
                return true;
            }

            // We're in a context where 'yield expr' is not allowed.  However, if we can
            // definitely tell that the user was trying to parse a 'yield expr' and not
            // just a normal expr that start with a 'yield' identifier, then parse out
            // a 'yield expr'.  We can then report an error later that they are only
            // allowed in generator expressions.
            //
            // for example, if we see 'yield(foo)', then we'll have to treat that as an
            // invocation expression of something called 'yield'.  However, if we have
            // 'yield foo' then that is not legal as a normal expression, so we can
            // definitely recognize this as a yield expression.
            //
            // for now we just check if the next token is an identifier.  More heuristics
            // can be added here later as necessary.  We just need to make sure that we
            // don't accidentally consume something legal.
            return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
        }

        return false;
    }

    function nextTokenIsIdentifierOnSameLine() {
        nextToken();
        return !scanner.hasPrecedingLineBreak() && isIdentifier();
    }

    function parseYieldExpression(): ts.YieldExpression {
        const pos = getNodePos();

        // YieldExpression[In] :
        //      yield
        //      yield [no LineTerminator here] [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
        //      yield [no LineTerminator here] * [Lexical goal InputElementRegExp]AssignmentExpression[?In, Yield]
        nextToken();

        if (!scanner.hasPrecedingLineBreak() &&
            (token() === ts.SyntaxKind.AsteriskToken || isStartOfExpression())) {
            return finishNode(
                factory.createYieldExpression(
                    parseOptionalToken(ts.SyntaxKind.AsteriskToken),
                    parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true)
                ),
                pos
            );
        }
        else {
            // if the next token is not on the same line as yield.  or we don't have an '*' or
            // the start of an expression, then this is just a simple "yield" expression.
            return finishNode(factory.createYieldExpression(/*asteriskToken*/ undefined, /*expression*/ undefined), pos);
        }
    }

    function parseSimpleArrowFunctionExpression(pos: number, identifier: ts.Identifier, allowReturnTypeInArrowFunction: boolean, asyncModifier?: ts.NodeArray<ts.Modifier> | undefined): ts.ArrowFunction {
        ts.Debug.assert(token() === ts.SyntaxKind.EqualsGreaterThanToken, "parseSimpleArrowFunctionExpression should only have been called if we had a =>");
        const parameter = factory.createParameterDeclaration(
            /*modifiers*/ undefined,
            /*dotDotDotToken*/ undefined,
            identifier,
            /*questionToken*/ undefined,
            /*type*/ undefined,
            /*initializer*/ undefined
        );
        finishNode(parameter, identifier.pos);

        const parameters = createNodeArray<ts.ParameterDeclaration>([parameter], parameter.pos, parameter.end);
        const equalsGreaterThanToken = parseExpectedToken(ts.SyntaxKind.EqualsGreaterThanToken);
        const body = parseArrowFunctionExpressionBody(/*isAsync*/ !!asyncModifier, allowReturnTypeInArrowFunction);
        const node = factory.createArrowFunction(asyncModifier, /*typeParameters*/ undefined, parameters, /*type*/ undefined, equalsGreaterThanToken, body);
        return addJSDocComment(finishNode(node, pos));
    }

    function tryParseParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction: boolean): ts.Expression | undefined {
        const triState = isParenthesizedArrowFunctionExpression();
        if (triState === Tristate.False) {
            // It's definitely not a parenthesized arrow function expression.
            return undefined;
        }

        // If we definitely have an arrow function, then we can just parse one, not requiring a
        // following => or { token. Otherwise, we *might* have an arrow function.  Try to parse
        // it out, but don't allow any ambiguity, and return 'undefined' if this could be an
        // expression instead.
        return triState === Tristate.True ?
            parseParenthesizedArrowFunctionExpression(/*allowAmbiguity*/ true, /*allowReturnTypeInArrowFunction*/ true) :
            tryParse(() => parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction));
    }

    //  True        -> We definitely expect a parenthesized arrow function here.
    //  False       -> There *cannot* be a parenthesized arrow function here.
    //  Unknown     -> There *might* be a parenthesized arrow function here.
    //                 Speculatively look ahead to be sure, and rollback if not.
    function isParenthesizedArrowFunctionExpression(): Tristate {
        if (token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.LessThanToken || token() === ts.SyntaxKind.AsyncKeyword) {
            return lookAhead(isParenthesizedArrowFunctionExpressionWorker);
        }

        if (token() === ts.SyntaxKind.EqualsGreaterThanToken) {
            // ERROR RECOVERY TWEAK:
            // If we see a standalone => try to parse it as an arrow function expression as that's
            // likely what the user intended to write.
            return Tristate.True;
        }
        // Definitely not a parenthesized arrow function.
        return Tristate.False;
    }

    function isParenthesizedArrowFunctionExpressionWorker() {
        if (token() === ts.SyntaxKind.AsyncKeyword) {
            nextToken();
            if (scanner.hasPrecedingLineBreak()) {
                return Tristate.False;
            }
            if (token() !== ts.SyntaxKind.OpenParenToken && token() !== ts.SyntaxKind.LessThanToken) {
                return Tristate.False;
            }
        }

        const first = token();
        const second = nextToken();

        if (first === ts.SyntaxKind.OpenParenToken) {
            if (second === ts.SyntaxKind.CloseParenToken) {
                // Simple cases: "() =>", "(): ", and "() {".
                // This is an arrow function with no parameters.
                // The last one is not actually an arrow function,
                // but this is probably what the user intended.
                const third = nextToken();
                switch (third) {
                    case ts.SyntaxKind.EqualsGreaterThanToken:
                    case ts.SyntaxKind.ColonToken:
                    case ts.SyntaxKind.OpenBraceToken:
                        return Tristate.True;
                    default:
                        return Tristate.False;
                }
            }

            // If encounter "([" or "({", this could be the start of a binding pattern.
            // Examples:
            //      ([ x ]) => { }
            //      ({ x }) => { }
            //      ([ x ])
            //      ({ x })
            if (second === ts.SyntaxKind.OpenBracketToken || second === ts.SyntaxKind.OpenBraceToken) {
                return Tristate.Unknown;
            }

            // Simple case: "(..."
            // This is an arrow function with a rest parameter.
            if (second === ts.SyntaxKind.DotDotDotToken) {
                return Tristate.True;
            }

            // Check for "(xxx yyy", where xxx is a modifier and yyy is an identifier. This
            // isn't actually allowed, but we want to treat it as a lambda so we can provide
            // a good error message.
            if (ts.isModifierKind(second) && second !== ts.SyntaxKind.AsyncKeyword && lookAhead(nextTokenIsIdentifier)) {
                if (nextToken() === ts.SyntaxKind.AsKeyword) {
                    // https://github.com/microsoft/TypeScript/issues/44466
                    return Tristate.False;
                }
                return Tristate.True;
            }

            // If we had "(" followed by something that's not an identifier,
            // then this definitely doesn't look like a lambda.  "this" is not
            // valid, but we want to parse it and then give a semantic error.
            if (!isIdentifier() && second !== ts.SyntaxKind.ThisKeyword) {
                return Tristate.False;
            }

            switch (nextToken()) {
                case ts.SyntaxKind.ColonToken:
                    // If we have something like "(a:", then we must have a
                    // type-annotated parameter in an arrow function expression.
                    return Tristate.True;
                case ts.SyntaxKind.QuestionToken:
                    nextToken();
                    // If we have "(a?:" or "(a?," or "(a?=" or "(a?)" then it is definitely a lambda.
                    if (token() === ts.SyntaxKind.ColonToken || token() === ts.SyntaxKind.CommaToken || token() === ts.SyntaxKind.EqualsToken || token() === ts.SyntaxKind.CloseParenToken) {
                        return Tristate.True;
                    }
                    // Otherwise it is definitely not a lambda.
                    return Tristate.False;
                case ts.SyntaxKind.CommaToken:
                case ts.SyntaxKind.EqualsToken:
                case ts.SyntaxKind.CloseParenToken:
                    // If we have "(a," or "(a=" or "(a)" this *could* be an arrow function
                    return Tristate.Unknown;
            }
            // It is definitely not an arrow function
            return Tristate.False;
        }
        else {
            ts.Debug.assert(first === ts.SyntaxKind.LessThanToken);

            // If we have "<" not followed by an identifier,
            // then this definitely is not an arrow function.
            if (!isIdentifier()) {
                return Tristate.False;
            }

            // JSX overrides
            if (languageVariant === ts.LanguageVariant.JSX) {
                const isArrowFunctionInJsx = lookAhead(() => {
                    const third = nextToken();
                    if (third === ts.SyntaxKind.ExtendsKeyword) {
                        const fourth = nextToken();
                        switch (fourth) {
                            case ts.SyntaxKind.EqualsToken:
                            case ts.SyntaxKind.GreaterThanToken:
                                return false;
                            default:
                                return true;
                        }
                    }
                    else if (third === ts.SyntaxKind.CommaToken || third === ts.SyntaxKind.EqualsToken) {
                        return true;
                    }
                    return false;
                });

                if (isArrowFunctionInJsx) {
                    return Tristate.True;
                }

                return Tristate.False;
            }

            // This *could* be a parenthesized arrow function.
            return Tristate.Unknown;
        }
    }

    function parsePossibleParenthesizedArrowFunctionExpression(allowReturnTypeInArrowFunction: boolean): ts.ArrowFunction | undefined {
        const tokenPos = scanner.getTokenPos();
        if (notParenthesizedArrow?.has(tokenPos)) {
            return undefined;
        }

        const result = parseParenthesizedArrowFunctionExpression(/*allowAmbiguity*/ false, allowReturnTypeInArrowFunction);
        if (!result) {
            (notParenthesizedArrow || (notParenthesizedArrow = new ts.Set())).add(tokenPos);
        }

        return result;
    }

    function tryParseAsyncSimpleArrowFunctionExpression(allowReturnTypeInArrowFunction: boolean): ts.ArrowFunction | undefined {
        // We do a check here so that we won't be doing unnecessarily call to "lookAhead"
        if (token() === ts.SyntaxKind.AsyncKeyword) {
            if (lookAhead(isUnParenthesizedAsyncArrowFunctionWorker) === Tristate.True) {
                const pos = getNodePos();
                const asyncModifier = parseModifiersForArrowFunction();
                const expr = parseBinaryExpressionOrHigher(ts.OperatorPrecedence.Lowest);
                return parseSimpleArrowFunctionExpression(pos, expr as ts.Identifier, allowReturnTypeInArrowFunction, asyncModifier);
            }
        }
        return undefined;
    }

    function isUnParenthesizedAsyncArrowFunctionWorker(): Tristate {
        // AsyncArrowFunctionExpression:
        //      1) async[no LineTerminator here]AsyncArrowBindingIdentifier[?Yield][no LineTerminator here]=>AsyncConciseBody[?In]
        //      2) CoverCallExpressionAndAsyncArrowHead[?Yield, ?Await][no LineTerminator here]=>AsyncConciseBody[?In]
        if (token() === ts.SyntaxKind.AsyncKeyword) {
            nextToken();
            // If the "async" is followed by "=>" token then it is not a beginning of an async arrow-function
            // but instead a simple arrow-function which will be parsed inside "parseAssignmentExpressionOrHigher"
            if (scanner.hasPrecedingLineBreak() || token() === ts.SyntaxKind.EqualsGreaterThanToken) {
                return Tristate.False;
            }
            // Check for un-parenthesized AsyncArrowFunction
            const expr = parseBinaryExpressionOrHigher(ts.OperatorPrecedence.Lowest);
            if (!scanner.hasPrecedingLineBreak() && expr.kind === ts.SyntaxKind.Identifier && token() === ts.SyntaxKind.EqualsGreaterThanToken) {
                return Tristate.True;
            }
        }

        return Tristate.False;
    }

    function parseParenthesizedArrowFunctionExpression(allowAmbiguity: boolean, allowReturnTypeInArrowFunction: boolean): ts.ArrowFunction | undefined {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiersForArrowFunction();
        const isAsync = ts.some(modifiers, ts.isAsyncModifier) ? SignatureFlags.Await : SignatureFlags.None;
        // Arrow functions are never generators.
        //
        // If we're speculatively parsing a signature for a parenthesized arrow function, then
        // we have to have a complete parameter list.  Otherwise we might see something like
        // a => (b => c)
        // And think that "(b =>" was actually a parenthesized arrow function with a missing
        // close paren.
        const typeParameters = parseTypeParameters();

        let parameters: ts.NodeArray<ts.ParameterDeclaration>;
        if (!parseExpected(ts.SyntaxKind.OpenParenToken)) {
            if (!allowAmbiguity) {
                return undefined;
            }
            parameters = createMissingList<ts.ParameterDeclaration>();
        }
        else {
            if (!allowAmbiguity) {
                const maybeParameters = parseParametersWorker(isAsync, allowAmbiguity);
                if (!maybeParameters) {
                    return undefined;
                }
                parameters = maybeParameters;
            }
            else {
                parameters = parseParametersWorker(isAsync, allowAmbiguity);
            }
            if (!parseExpected(ts.SyntaxKind.CloseParenToken) && !allowAmbiguity) {
                return undefined;
            }
        }

        const hasReturnColon = token() === ts.SyntaxKind.ColonToken;
        const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ false);
        if (type && !allowAmbiguity && typeHasArrowFunctionBlockingParseError(type)) {
            return undefined;
        }

        // Parsing a signature isn't enough.
        // Parenthesized arrow signatures often look like other valid expressions.
        // For instance:
        //  - "(x = 10)" is an assignment expression parsed as a signature with a default parameter value.
        //  - "(x,y)" is a comma expression parsed as a signature with two parameters.
        //  - "a ? (b): c" will have "(b):" parsed as a signature with a return type annotation.
        //  - "a ? (b): function() {}" will too, since function() is a valid JSDoc function type.
        //  - "a ? (b): (function() {})" as well, but inside of a parenthesized type with an arbitrary amount of nesting.
        //
        // So we need just a bit of lookahead to ensure that it can only be a signature.

        let unwrappedType = type;
        while (unwrappedType?.kind === ts.SyntaxKind.ParenthesizedType) {
            unwrappedType = (unwrappedType as ts.ParenthesizedTypeNode).type;  // Skip parens if need be
        }

        const hasJSDocFunctionType = unwrappedType && ts.isJSDocFunctionType(unwrappedType);
        if (!allowAmbiguity && token() !== ts.SyntaxKind.EqualsGreaterThanToken && (hasJSDocFunctionType || token() !== ts.SyntaxKind.OpenBraceToken)) {
            // Returning undefined here will cause our caller to rewind to where we started from.
                return undefined;
        }

        // If we have an arrow, then try to parse the body. Even if not, try to parse if we
        // have an opening brace, just in case we're in an error state.
        const lastToken = token();
        const equalsGreaterThanToken = parseExpectedToken(ts.SyntaxKind.EqualsGreaterThanToken);
        const body = (lastToken === ts.SyntaxKind.EqualsGreaterThanToken || lastToken === ts.SyntaxKind.OpenBraceToken)
            ? parseArrowFunctionExpressionBody(ts.some(modifiers, ts.isAsyncModifier), allowReturnTypeInArrowFunction)
            : parseIdentifier();

        // Given:
        //     x ? y => ({ y }) : z => ({ z })
        // We try to parse the body of the first arrow function by looking at:
        //     ({ y }) : z => ({ z })
        // This is a valid arrow function with "z" as the return type.
        //
        // But, if we're in the true side of a conditional expression, this colon
        // terminates the expression, so we cannot allow a return type if we aren't
        // certain whether or not the preceding text was parsed as a parameter list.
        //
        // For example,
        //     a() ? (b: number, c?: string): void => d() : e
        // is determined by isParenthesizedArrowFunctionExpression to unambiguously
        // be an arrow expression, so we allow a return type.
        if (!allowReturnTypeInArrowFunction && hasReturnColon) {
            // However, if the arrow function we were able to parse is followed by another colon
            // as in:
            //     a ? (x): string => x : null
            // Then allow the arrow function, and treat the second colon as terminating
            // the conditional expression. It's okay to do this because this code would
            // be a syntax error in JavaScript (as the second colon shouldn't be there).
            if (token() !== ts.SyntaxKind.ColonToken) {
                return undefined;
            }
        }

        const node = factory.createArrowFunction(modifiers, typeParameters, parameters, type, equalsGreaterThanToken, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseArrowFunctionExpressionBody(isAsync: boolean, allowReturnTypeInArrowFunction: boolean): ts.Block | ts.Expression {
        if (token() === ts.SyntaxKind.OpenBraceToken) {
            return parseFunctionBlock(isAsync ? SignatureFlags.Await : SignatureFlags.None);
        }

        if (token() !== ts.SyntaxKind.SemicolonToken &&
            token() !== ts.SyntaxKind.FunctionKeyword &&
            token() !== ts.SyntaxKind.ClassKeyword &&
            isStartOfStatement() &&
            !isStartOfExpressionStatement()) {
            // Check if we got a plain statement (i.e. no expression-statements, no function/class expressions/declarations)
            //
            // Here we try to recover from a potential error situation in the case where the
            // user meant to supply a block. For example, if the user wrote:
            //
            //  a =>
            //      let v = 0;
            //  }
            //
            // they may be missing an open brace.  Check to see if that's the case so we can
            // try to recover better.  If we don't do this, then the next close curly we see may end
            // up preemptively closing the containing construct.
            //
            // Note: even when 'IgnoreMissingOpenBrace' is passed, parseBody will still error.
            return parseFunctionBlock(SignatureFlags.IgnoreMissingOpenBrace | (isAsync ? SignatureFlags.Await : SignatureFlags.None));
        }

        const savedTopLevel = topLevel;
        topLevel = false;
        const node = isAsync
            ? doInAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction))
            : doOutsideOfAwaitContext(() => parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction));
        topLevel = savedTopLevel;
        return node;
    }

    function parseConditionalExpressionRest(leftOperand: ts.Expression, pos: number, allowReturnTypeInArrowFunction: boolean): ts.Expression {
        // Note: we are passed in an expression which was produced from parseBinaryExpressionOrHigher.
        const questionToken = parseOptionalToken(ts.SyntaxKind.QuestionToken);
        if (!questionToken) {
            return leftOperand;
        }

        // Note: we explicitly 'allowIn' in the whenTrue part of the condition expression, and
        // we do not that for the 'whenFalse' part.
        let colonToken;
        return finishNode(
            factory.createConditionalExpression(
                leftOperand,
                questionToken,
                doOutsideOfContext(disallowInAndDecoratorContext, () => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ false)),
                colonToken = parseExpectedToken(ts.SyntaxKind.ColonToken),
                ts.nodeIsPresent(colonToken)
                    ? parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction)
                    : createMissingNode(ts.SyntaxKind.Identifier, /*reportAtCurrentPosition*/ false, ts.Diagnostics._0_expected, ts.tokenToString(ts.SyntaxKind.ColonToken))
            ),
            pos
        );
    }

    function parseBinaryExpressionOrHigher(precedence: ts.OperatorPrecedence): ts.Expression {
        const pos = getNodePos();
        const leftOperand = parseUnaryExpressionOrHigher();
        return parseBinaryExpressionRest(precedence, leftOperand, pos);
    }

    function isInOrOfKeyword(t: ts.SyntaxKind) {
        return t === ts.SyntaxKind.InKeyword || t === ts.SyntaxKind.OfKeyword;
    }

    function parseBinaryExpressionRest(precedence: ts.OperatorPrecedence, leftOperand: ts.Expression, pos: number): ts.Expression {
        while (true) {
            // We either have a binary operator here, or we're finished.  We call
            // reScanGreaterToken so that we merge token sequences like > and = into >=

            reScanGreaterToken();
            const newPrecedence = ts.getBinaryOperatorPrecedence(token());

            // Check the precedence to see if we should "take" this operator
            // - For left associative operator (all operator but **), consume the operator,
            //   recursively call the function below, and parse binaryExpression as a rightOperand
            //   of the caller if the new precedence of the operator is greater then or equal to the current precedence.
            //   For example:
            //      a - b - c;
            //            ^token; leftOperand = b. Return b to the caller as a rightOperand
            //      a * b - c
            //            ^token; leftOperand = b. Return b to the caller as a rightOperand
            //      a - b * c;
            //            ^token; leftOperand = b. Return b * c to the caller as a rightOperand
            // - For right associative operator (**), consume the operator, recursively call the function
            //   and parse binaryExpression as a rightOperand of the caller if the new precedence of
            //   the operator is strictly grater than the current precedence
            //   For example:
            //      a ** b ** c;
            //             ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
            //      a - b ** c;
            //            ^^token; leftOperand = b. Return b ** c to the caller as a rightOperand
            //      a ** b - c
            //             ^token; leftOperand = b. Return b to the caller as a rightOperand
            const consumeCurrentOperator = token() === ts.SyntaxKind.AsteriskAsteriskToken ?
                newPrecedence >= precedence :
                newPrecedence > precedence;

            if (!consumeCurrentOperator) {
                break;
            }

            if (token() === ts.SyntaxKind.InKeyword && inDisallowInContext()) {
                break;
            }

            if (token() === ts.SyntaxKind.AsKeyword || token() === ts.SyntaxKind.SatisfiesKeyword) {
                // Make sure we *do* perform ASI for constructs like this:
                //    var x = foo
                //    as (Bar)
                // This should be parsed as an initialized variable, followed
                // by a function call to 'as' with the argument 'Bar'
                if (scanner.hasPrecedingLineBreak()) {
                    break;
                }
                else {
                    const keywordKind = token();
                    nextToken();
                    leftOperand = keywordKind === ts.SyntaxKind.SatisfiesKeyword ? makeSatisfiesExpression(leftOperand, parseType()) :
                        makeAsExpression(leftOperand, parseType());
                }
            }
            else {
                leftOperand = makeBinaryExpression(leftOperand, parseTokenNode(), parseBinaryExpressionOrHigher(newPrecedence), pos);
            }
        }

        return leftOperand;
    }

    function isBinaryOperator() {
        if (inDisallowInContext() && token() === ts.SyntaxKind.InKeyword) {
            return false;
        }

        return ts.getBinaryOperatorPrecedence(token()) > 0;
    }

    function makeSatisfiesExpression(left: ts.Expression, right: ts.TypeNode): ts.SatisfiesExpression {
        return finishNode(factory.createSatisfiesExpression(left, right), left.pos);
    }

    function makeBinaryExpression(left: ts.Expression, operatorToken: ts.BinaryOperatorToken, right: ts.Expression, pos: number): ts.BinaryExpression {
        return finishNode(factory.createBinaryExpression(left, operatorToken, right), pos);
    }

    function makeAsExpression(left: ts.Expression, right: ts.TypeNode): ts.AsExpression {
        return finishNode(factory.createAsExpression(left, right), left.pos);
    }

    function parsePrefixUnaryExpression() {
        const pos = getNodePos();
        return finishNode(factory.createPrefixUnaryExpression(token() as ts.PrefixUnaryOperator, nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function parseDeleteExpression() {
        const pos = getNodePos();
        return finishNode(factory.createDeleteExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function parseTypeOfExpression() {
        const pos = getNodePos();
        return finishNode(factory.createTypeOfExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function parseVoidExpression() {
        const pos = getNodePos();
        return finishNode(factory.createVoidExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    function isAwaitExpression(): boolean {
        if (token() === ts.SyntaxKind.AwaitKeyword) {
            if (inAwaitContext()) {
                return true;
            }

            // here we are using similar heuristics as 'isYieldExpression'
            return lookAhead(nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine);
        }

        return false;
    }

    function parseAwaitExpression() {
        const pos = getNodePos();
        return finishNode(factory.createAwaitExpression(nextTokenAnd(parseSimpleUnaryExpression)), pos);
    }

    /**
     * Parse ES7 exponential expression and await expression
     *
     * ES7 ExponentiationExpression:
     *      1) UnaryExpression[?Yield]
     *      2) UpdateExpression[?Yield] ** ExponentiationExpression[?Yield]
     *
     */
    function parseUnaryExpressionOrHigher(): ts.UnaryExpression | ts.BinaryExpression {
        /**
         * ES7 UpdateExpression:
         *      1) LeftHandSideExpression[?Yield]
         *      2) LeftHandSideExpression[?Yield][no LineTerminator here]++
         *      3) LeftHandSideExpression[?Yield][no LineTerminator here]--
         *      4) ++UnaryExpression[?Yield]
         *      5) --UnaryExpression[?Yield]
         */
        if (isUpdateExpression()) {
            const pos = getNodePos();
            const updateExpression = parseUpdateExpression();
            return token() === ts.SyntaxKind.AsteriskAsteriskToken ?
                parseBinaryExpressionRest(ts.getBinaryOperatorPrecedence(token()), updateExpression, pos) as ts.BinaryExpression :
                updateExpression;
        }

        /**
         * ES7 UnaryExpression:
         *      1) UpdateExpression[?yield]
         *      2) delete UpdateExpression[?yield]
         *      3) void UpdateExpression[?yield]
         *      4) typeof UpdateExpression[?yield]
         *      5) + UpdateExpression[?yield]
         *      6) - UpdateExpression[?yield]
         *      7) ~ UpdateExpression[?yield]
         *      8) ! UpdateExpression[?yield]
         */
        const unaryOperator = token();
        const simpleUnaryExpression = parseSimpleUnaryExpression();
        if (token() === ts.SyntaxKind.AsteriskAsteriskToken) {
            const pos = ts.skipTrivia(sourceText, simpleUnaryExpression.pos);
            const { end } = simpleUnaryExpression;
            if (simpleUnaryExpression.kind === ts.SyntaxKind.TypeAssertionExpression) {
                parseErrorAt(pos, end, ts.Diagnostics.A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses);
            }
            else {
                parseErrorAt(pos, end, ts.Diagnostics.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses, ts.tokenToString(unaryOperator));
            }
        }
        return simpleUnaryExpression;
    }

    /**
     * Parse ES7 simple-unary expression or higher:
     *
     * ES7 UnaryExpression:
     *      1) UpdateExpression[?yield]
     *      2) delete UnaryExpression[?yield]
     *      3) void UnaryExpression[?yield]
     *      4) typeof UnaryExpression[?yield]
     *      5) + UnaryExpression[?yield]
     *      6) - UnaryExpression[?yield]
     *      7) ~ UnaryExpression[?yield]
     *      8) ! UnaryExpression[?yield]
     *      9) [+Await] await UnaryExpression[?yield]
     */
    function parseSimpleUnaryExpression(): ts.UnaryExpression {
        switch (token()) {
            case ts.SyntaxKind.PlusToken:
            case ts.SyntaxKind.MinusToken:
            case ts.SyntaxKind.TildeToken:
            case ts.SyntaxKind.ExclamationToken:
                return parsePrefixUnaryExpression();
            case ts.SyntaxKind.DeleteKeyword:
                return parseDeleteExpression();
            case ts.SyntaxKind.TypeOfKeyword:
                return parseTypeOfExpression();
            case ts.SyntaxKind.VoidKeyword:
                return parseVoidExpression();
            case ts.SyntaxKind.LessThanToken:
                // This is modified UnaryExpression grammar in TypeScript
                //  UnaryExpression (modified):
                //      < type > UnaryExpression
                return parseTypeAssertion();
            case ts.SyntaxKind.AwaitKeyword:
                if (isAwaitExpression()) {
                    return parseAwaitExpression();
                }
                // falls through
            default:
                return parseUpdateExpression();
        }
    }

    /**
     * Check if the current token can possibly be an ES7 increment expression.
     *
     * ES7 UpdateExpression:
     *      LeftHandSideExpression[?Yield]
     *      LeftHandSideExpression[?Yield][no LineTerminator here]++
     *      LeftHandSideExpression[?Yield][no LineTerminator here]--
     *      ++LeftHandSideExpression[?Yield]
     *      --LeftHandSideExpression[?Yield]
     */
    function isUpdateExpression(): boolean {
        // This function is called inside parseUnaryExpression to decide
        // whether to call parseSimpleUnaryExpression or call parseUpdateExpression directly
        switch (token()) {
            case ts.SyntaxKind.PlusToken:
            case ts.SyntaxKind.MinusToken:
            case ts.SyntaxKind.TildeToken:
            case ts.SyntaxKind.ExclamationToken:
            case ts.SyntaxKind.DeleteKeyword:
            case ts.SyntaxKind.TypeOfKeyword:
            case ts.SyntaxKind.VoidKeyword:
            case ts.SyntaxKind.AwaitKeyword:
                return false;
            case ts.SyntaxKind.LessThanToken:
                // If we are not in JSX context, we are parsing TypeAssertion which is an UnaryExpression
                if (languageVariant !== ts.LanguageVariant.JSX) {
                    return false;
                }
                // We are in JSX context and the token is part of JSXElement.
                // falls through
            default:
                return true;
        }
    }

    /**
     * Parse ES7 UpdateExpression. UpdateExpression is used instead of ES6's PostFixExpression.
     *
     * ES7 UpdateExpression[yield]:
     *      1) LeftHandSideExpression[?yield]
     *      2) LeftHandSideExpression[?yield] [[no LineTerminator here]]++
     *      3) LeftHandSideExpression[?yield] [[no LineTerminator here]]--
     *      4) ++LeftHandSideExpression[?yield]
     *      5) --LeftHandSideExpression[?yield]
     * In TypeScript (2), (3) are parsed as PostfixUnaryExpression. (4), (5) are parsed as PrefixUnaryExpression
     */
    function parseUpdateExpression(): ts.UpdateExpression {
        if (token() === ts.SyntaxKind.PlusPlusToken || token() === ts.SyntaxKind.MinusMinusToken) {
            const pos = getNodePos();
            return finishNode(factory.createPrefixUnaryExpression(token() as ts.PrefixUnaryOperator, nextTokenAnd(parseLeftHandSideExpressionOrHigher)), pos);
        }
        else if (languageVariant === ts.LanguageVariant.JSX && token() === ts.SyntaxKind.LessThanToken && lookAhead(nextTokenIsIdentifierOrKeywordOrGreaterThan)) {
            // JSXElement is part of primaryExpression
            return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true);
        }

        const expression = parseLeftHandSideExpressionOrHigher();

        ts.Debug.assert(ts.isLeftHandSideExpression(expression));
        if ((token() === ts.SyntaxKind.PlusPlusToken || token() === ts.SyntaxKind.MinusMinusToken) && !scanner.hasPrecedingLineBreak()) {
            const operator = token() as ts.PostfixUnaryOperator;
            nextToken();
            return finishNode(factory.createPostfixUnaryExpression(expression, operator), expression.pos);
        }

        return expression;
    }

    function parseLeftHandSideExpressionOrHigher(): ts.LeftHandSideExpression {
        // Original Ecma:
        // LeftHandSideExpression: See 11.2
        //      NewExpression
        //      CallExpression
        //
        // Our simplification:
        //
        // LeftHandSideExpression: See 11.2
        //      MemberExpression
        //      CallExpression
        //
        // See comment in parseMemberExpressionOrHigher on how we replaced NewExpression with
        // MemberExpression to make our lives easier.
        //
        // to best understand the below code, it's important to see how CallExpression expands
        // out into its own productions:
        //
        // CallExpression:
        //      MemberExpression Arguments
        //      CallExpression Arguments
        //      CallExpression[Expression]
        //      CallExpression.IdentifierName
        //      import (AssignmentExpression)
        //      super Arguments
        //      super.IdentifierName
        //
        // Because of the recursion in these calls, we need to bottom out first. There are three
        // bottom out states we can run into: 1) We see 'super' which must start either of
        // the last two CallExpression productions. 2) We see 'import' which must start import call.
        // 3)we have a MemberExpression which either completes the LeftHandSideExpression,
        // or starts the beginning of the first four CallExpression productions.
        const pos = getNodePos();
        let expression: ts.MemberExpression;
        if (token() === ts.SyntaxKind.ImportKeyword) {
            if (lookAhead(nextTokenIsOpenParenOrLessThan)) {
                // We don't want to eagerly consume all import keyword as import call expression so we look ahead to find "("
                // For example:
                //      var foo3 = require("subfolder
                //      import * as foo1 from "module-from-node
                // We want this import to be a statement rather than import call expression
                sourceFlags |= ts.NodeFlags.PossiblyContainsDynamicImport;
                expression = parseTokenNode<ts.PrimaryExpression>();
            }
            else if (lookAhead(nextTokenIsDot)) {
                // This is an 'import.*' metaproperty (i.e. 'import.meta')
                nextToken(); // advance past the 'import'
                nextToken(); // advance past the dot
                expression = finishNode(factory.createMetaProperty(ts.SyntaxKind.ImportKeyword, parseIdentifierName()), pos);
                sourceFlags |= ts.NodeFlags.PossiblyContainsImportMeta;
            }
            else {
                expression = parseMemberExpressionOrHigher();
            }
        }
        else {
            expression = token() === ts.SyntaxKind.SuperKeyword ? parseSuperExpression() : parseMemberExpressionOrHigher();
        }

        // Now, we *may* be complete.  However, we might have consumed the start of a
        // CallExpression or OptionalExpression.  As such, we need to consume the rest
        // of it here to be complete.
        return parseCallExpressionRest(pos, expression);
    }

    function parseMemberExpressionOrHigher(): ts.MemberExpression {
        // Note: to make our lives simpler, we decompose the NewExpression productions and
        // place ObjectCreationExpression and FunctionExpression into PrimaryExpression.
        // like so:
        //
        //   PrimaryExpression : See 11.1
        //      this
        //      Identifier
        //      Literal
        //      ArrayLiteral
        //      ObjectLiteral
        //      (Expression)
        //      FunctionExpression
        //      new MemberExpression Arguments?
        //
        //   MemberExpression : See 11.2
        //      PrimaryExpression
        //      MemberExpression[Expression]
        //      MemberExpression.IdentifierName
        //
        //   CallExpression : See 11.2
        //      MemberExpression
        //      CallExpression Arguments
        //      CallExpression[Expression]
        //      CallExpression.IdentifierName
        //
        // Technically this is ambiguous.  i.e. CallExpression defines:
        //
        //   CallExpression:
        //      CallExpression Arguments
        //
        // If you see: "new Foo()"
        //
        // Then that could be treated as a single ObjectCreationExpression, or it could be
        // treated as the invocation of "new Foo".  We disambiguate that in code (to match
        // the original grammar) by making sure that if we see an ObjectCreationExpression
        // we always consume arguments if they are there. So we treat "new Foo()" as an
        // object creation only, and not at all as an invocation.  Another way to think
        // about this is that for every "new" that we see, we will consume an argument list if
        // it is there as part of the *associated* object creation node.  Any additional
        // argument lists we see, will become invocation expressions.
        //
        // Because there are no other places in the grammar now that refer to FunctionExpression
        // or ObjectCreationExpression, it is safe to push down into the PrimaryExpression
        // production.
        //
        // Because CallExpression and MemberExpression are left recursive, we need to bottom out
        // of the recursion immediately.  So we parse out a primary expression to start with.
        const pos = getNodePos();
        const expression = parsePrimaryExpression();
        return parseMemberExpressionRest(pos, expression, /*allowOptionalChain*/ true);
    }

    function parseSuperExpression(): ts.MemberExpression {
        const pos = getNodePos();
        let expression = parseTokenNode<ts.MemberExpression>();
        if (token() === ts.SyntaxKind.LessThanToken) {
            const startPos = getNodePos();
            const typeArguments = tryParse(parseTypeArgumentsInExpression);
            if (typeArguments !== undefined) {
                parseErrorAt(startPos, getNodePos(), ts.Diagnostics.super_may_not_use_type_arguments);
                if (!isTemplateStartOfTaggedTemplate()) {
                    expression = factory.createExpressionWithTypeArguments(expression, typeArguments);
                }
            }
        }

        if (token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.DotToken || token() === ts.SyntaxKind.OpenBracketToken) {
            return expression;
        }

        // If we have seen "super" it must be followed by '(' or '.'.
        // If it wasn't then just try to parse out a '.' and report an error.
        parseExpectedToken(ts.SyntaxKind.DotToken, ts.Diagnostics.super_must_be_followed_by_an_argument_list_or_member_access);
        // private names will never work with `super` (`super.#foo`), but that's a semantic error, not syntactic
        return finishNode(factory.createPropertyAccessExpression(expression, parseRightSideOfDot(/*allowIdentifierNames*/ true, /*allowPrivateIdentifiers*/ true)), pos);
    }

    function parseJsxElementOrSelfClosingElementOrFragment(inExpressionContext: boolean, topInvalidNodePosition?: number, openingTag?: ts.JsxOpeningElement | ts.JsxOpeningFragment): ts.JsxElement | ts.JsxSelfClosingElement | ts.JsxFragment {
        const pos = getNodePos();
        const opening = parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext);
        let result: ts.JsxElement | ts.JsxSelfClosingElement | ts.JsxFragment;
        if (opening.kind === ts.SyntaxKind.JsxOpeningElement) {
            let children = parseJsxChildren(opening);
            let closingElement: ts.JsxClosingElement;

            const lastChild: ts.JsxChild | undefined = children[children.length - 1];
            if (lastChild?.kind === ts.SyntaxKind.JsxElement
                && !tagNamesAreEquivalent(lastChild.openingElement.tagName, lastChild.closingElement.tagName)
                && tagNamesAreEquivalent(opening.tagName, lastChild.closingElement.tagName)) {
                // when an unclosed JsxOpeningElement incorrectly parses its parent's JsxClosingElement,
                // restructure (<div>(...<span>...</div>)) --> (<div>(...<span>...</>)</div>)
                // (no need to error; the parent will error)
                const end = lastChild.children.end;
                const newLast = finishNode(factory.createJsxElement(
                    lastChild.openingElement,
                    lastChild.children,
                    finishNode(factory.createJsxClosingElement(finishNode(factory.createIdentifier(""), end, end)), end, end)),
                lastChild.openingElement.pos,
                end);

                children = createNodeArray([...children.slice(0, children.length - 1), newLast], children.pos, end);
                closingElement = lastChild.closingElement;
            }
            else {
                closingElement = parseJsxClosingElement(opening, inExpressionContext);
                if (!tagNamesAreEquivalent(opening.tagName, closingElement.tagName)) {
                    if (openingTag && ts.isJsxOpeningElement(openingTag) && tagNamesAreEquivalent(closingElement.tagName, openingTag.tagName)) {
                        // opening incorrectly matched with its parent's closing -- put error on opening
                        parseErrorAtRange(opening.tagName, ts.Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, ts.getTextOfNodeFromSourceText(sourceText, opening.tagName));
                    }
                    else {
                        // other opening/closing mismatches -- put error on closing
                        parseErrorAtRange(closingElement.tagName, ts.Diagnostics.Expected_corresponding_JSX_closing_tag_for_0, ts.getTextOfNodeFromSourceText(sourceText, opening.tagName));
                    }
                }
            }
            result = finishNode(factory.createJsxElement(opening, children, closingElement), pos);
        }
        else if (opening.kind === ts.SyntaxKind.JsxOpeningFragment) {
            result = finishNode(factory.createJsxFragment(opening, parseJsxChildren(opening), parseJsxClosingFragment(inExpressionContext)), pos);
        }
        else {
            ts.Debug.assert(opening.kind === ts.SyntaxKind.JsxSelfClosingElement);
            // Nothing else to do for self-closing elements
            result = opening;
        }

        // If the user writes the invalid code '<div></div><div></div>' in an expression context (i.e. not wrapped in
        // an enclosing tag), we'll naively try to parse   ^ this as a 'less than' operator and the remainder of the tag
        // as garbage, which will cause the formatter to badly mangle the JSX. Perform a speculative parse of a JSX
        // element if we see a < token so that we can wrap it in a synthetic binary expression so the formatter
        // does less damage and we can report a better error.
        // Since JSX elements are invalid < operands anyway, this lookahead parse will only occur in error scenarios
        // of one sort or another.
        if (inExpressionContext && token() === ts.SyntaxKind.LessThanToken) {
            const topBadPos = typeof topInvalidNodePosition === "undefined" ? result.pos : topInvalidNodePosition;
            const invalidElement = tryParse(() => parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true, topBadPos));
            if (invalidElement) {
                const operatorToken = createMissingNode(ts.SyntaxKind.CommaToken, /*reportAtCurrentPosition*/ false);
                ts.setTextRangePosWidth(operatorToken, invalidElement.pos, 0);
                parseErrorAt(ts.skipTrivia(sourceText, topBadPos), invalidElement.end, ts.Diagnostics.JSX_expressions_must_have_one_parent_element);
                return finishNode(factory.createBinaryExpression(result, operatorToken as ts.Token<ts.SyntaxKind.CommaToken>, invalidElement), pos) as ts.Node as ts.JsxElement;
            }
        }

        return result;
    }

    function parseJsxText(): ts.JsxText {
        const pos = getNodePos();
        const node = factory.createJsxText(scanner.getTokenValue(), currentToken === ts.SyntaxKind.JsxTextAllWhiteSpaces);
        currentToken = scanner.scanJsxToken();
        return finishNode(node, pos);
    }

    function parseJsxChild(openingTag: ts.JsxOpeningElement | ts.JsxOpeningFragment, token: ts.JsxTokenSyntaxKind): ts.JsxChild | undefined {
        switch (token) {
            case ts.SyntaxKind.EndOfFileToken:
                // If we hit EOF, issue the error at the tag that lacks the closing element
                // rather than at the end of the file (which is useless)
                if (ts.isJsxOpeningFragment(openingTag)) {
                    parseErrorAtRange(openingTag, ts.Diagnostics.JSX_fragment_has_no_corresponding_closing_tag);
                }
                else {
                    // We want the error span to cover only 'Foo.Bar' in < Foo.Bar >
                    // or to cover only 'Foo' in < Foo >
                    const tag = openingTag.tagName;
                    const start = ts.skipTrivia(sourceText, tag.pos);
                    parseErrorAt(start, tag.end, ts.Diagnostics.JSX_element_0_has_no_corresponding_closing_tag, ts.getTextOfNodeFromSourceText(sourceText, openingTag.tagName));
                }
                return undefined;
            case ts.SyntaxKind.LessThanSlashToken:
            case ts.SyntaxKind.ConflictMarkerTrivia:
                return undefined;
            case ts.SyntaxKind.JsxText:
            case ts.SyntaxKind.JsxTextAllWhiteSpaces:
                return parseJsxText();
            case ts.SyntaxKind.OpenBraceToken:
                return parseJsxExpression(/*inExpressionContext*/ false);
            case ts.SyntaxKind.LessThanToken:
                return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ false, /*topInvalidNodePosition*/ undefined, openingTag);
            default:
                return ts.Debug.assertNever(token);
        }
    }

    function parseJsxChildren(openingTag: ts.JsxOpeningElement | ts.JsxOpeningFragment): ts.NodeArray<ts.JsxChild> {
        const list = [];
        const listPos = getNodePos();
        const saveParsingContext = parsingContext;
        parsingContext |= 1 << ParsingContext.JsxChildren;

        while (true) {
            const child = parseJsxChild(openingTag, currentToken = scanner.reScanJsxToken());
            if (!child) break;
            list.push(child);
            if (ts.isJsxOpeningElement(openingTag)
                && child?.kind === ts.SyntaxKind.JsxElement
                && !tagNamesAreEquivalent(child.openingElement.tagName, child.closingElement.tagName)
                && tagNamesAreEquivalent(openingTag.tagName, child.closingElement.tagName)) {
                // stop after parsing a mismatched child like <div>...(<span></div>) in order to reattach the </div> higher
                break;
            }
        }

        parsingContext = saveParsingContext;
        return createNodeArray(list, listPos);
    }

    function parseJsxAttributes(): ts.JsxAttributes {
        const pos = getNodePos();
        return finishNode(factory.createJsxAttributes(parseList(ParsingContext.JsxAttributes, parseJsxAttribute)), pos);
    }

    function parseJsxOpeningOrSelfClosingElementOrOpeningFragment(inExpressionContext: boolean): ts.JsxOpeningElement | ts.JsxSelfClosingElement | ts.JsxOpeningFragment {
        const pos = getNodePos();

        parseExpected(ts.SyntaxKind.LessThanToken);

        if (token() === ts.SyntaxKind.GreaterThanToken) {
            // See below for explanation of scanJsxText
            scanJsxText();
            return finishNode(factory.createJsxOpeningFragment(), pos);
        }
        const tagName = parseJsxElementName();
        const typeArguments = (contextFlags & ts.NodeFlags.JavaScriptFile) === 0 ? tryParseTypeArguments() : undefined;
        const attributes = parseJsxAttributes();

        let node: ts.JsxOpeningLikeElement;

        if (token() === ts.SyntaxKind.GreaterThanToken) {
            // Closing tag, so scan the immediately-following text with the JSX scanning instead
            // of regular scanning to avoid treating illegal characters (e.g. '#') as immediate
            // scanning errors
            scanJsxText();
            node = factory.createJsxOpeningElement(tagName, typeArguments, attributes);
        }
        else {
            parseExpected(ts.SyntaxKind.SlashToken);
            if (parseExpected(ts.SyntaxKind.GreaterThanToken, /*diagnostic*/ undefined, /*shouldAdvance*/ false)) {
                // manually advance the scanner in order to look for jsx text inside jsx
                if (inExpressionContext) {
                    nextToken();
                }
                else {
                    scanJsxText();
                }
            }
            node = factory.createJsxSelfClosingElement(tagName, typeArguments, attributes);
        }

        return finishNode(node, pos);
    }

    function parseJsxElementName(): ts.JsxTagNameExpression {
        const pos = getNodePos();
        scanJsxIdentifier();
        // JsxElement can have name in the form of
        //      propertyAccessExpression
        //      primaryExpression in the form of an identifier and "this" keyword
        // We can't just simply use parseLeftHandSideExpressionOrHigher because then we will start consider class,function etc as a keyword
        // We only want to consider "this" as a primaryExpression
        let expression: ts.JsxTagNameExpression = token() === ts.SyntaxKind.ThisKeyword ?
            parseTokenNode<ts.ThisExpression>() : parseIdentifierName();
        while (parseOptional(ts.SyntaxKind.DotToken)) {
            expression = finishNode(factory.createPropertyAccessExpression(expression, parseRightSideOfDot(/*allowIdentifierNames*/ true, /*allowPrivateIdentifiers*/ false)), pos) as ts.JsxTagNamePropertyAccess;
        }
        return expression;
    }

    function parseJsxExpression(inExpressionContext: boolean): ts.JsxExpression | undefined {
        const pos = getNodePos();
        if (!parseExpected(ts.SyntaxKind.OpenBraceToken)) {
            return undefined;
        }

        let dotDotDotToken: ts.DotDotDotToken | undefined;
        let expression: ts.Expression | undefined;
        if (token() !== ts.SyntaxKind.CloseBraceToken) {
            dotDotDotToken = parseOptionalToken(ts.SyntaxKind.DotDotDotToken);
            // Only an AssignmentExpression is valid here per the JSX spec,
            // but we can unambiguously parse a comma sequence and provide
            // a better error message in grammar checking.
            expression = parseExpression();
        }
        if (inExpressionContext) {
            parseExpected(ts.SyntaxKind.CloseBraceToken);
        }
        else {
            if (parseExpected(ts.SyntaxKind.CloseBraceToken, /*message*/ undefined, /*shouldAdvance*/ false)) {
                scanJsxText();
            }
        }

        return finishNode(factory.createJsxExpression(dotDotDotToken, expression), pos);
    }

    function parseJsxAttribute(): ts.JsxAttribute | ts.JsxSpreadAttribute {
        if (token() === ts.SyntaxKind.OpenBraceToken) {
            return parseJsxSpreadAttribute();
        }

        scanJsxIdentifier();
        const pos = getNodePos();
        return finishNode(factory.createJsxAttribute(parseIdentifierName(), parseJsxAttributeValue()), pos);
    }

    function parseJsxAttributeValue(): ts.JsxAttributeValue | undefined {
        if (token() === ts.SyntaxKind.EqualsToken) {
            if (scanJsxAttributeValue() === ts.SyntaxKind.StringLiteral) {
                return parseLiteralNode() as ts.StringLiteral;
            }
            if (token() === ts.SyntaxKind.OpenBraceToken) {
                return parseJsxExpression(/*inExpressionContext*/ true);
            }
            if (token() === ts.SyntaxKind.LessThanToken) {
                return parseJsxElementOrSelfClosingElementOrFragment(/*inExpressionContext*/ true);
            }
            parseErrorAtCurrentToken(ts.Diagnostics.or_JSX_element_expected);
        }
        return undefined;
    }

    function parseJsxSpreadAttribute(): ts.JsxSpreadAttribute {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.OpenBraceToken);
        parseExpected(ts.SyntaxKind.DotDotDotToken);
        const expression = parseExpression();
        parseExpected(ts.SyntaxKind.CloseBraceToken);
        return finishNode(factory.createJsxSpreadAttribute(expression), pos);
    }

    function parseJsxClosingElement(open: ts.JsxOpeningElement, inExpressionContext: boolean): ts.JsxClosingElement {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.LessThanSlashToken);
        const tagName = parseJsxElementName();
        if (parseExpected(ts.SyntaxKind.GreaterThanToken, /*diagnostic*/ undefined, /*shouldAdvance*/ false)) {
            // manually advance the scanner in order to look for jsx text inside jsx
            if (inExpressionContext || !tagNamesAreEquivalent(open.tagName, tagName)) {
                nextToken();
            }
            else {
                scanJsxText();
            }
        }
        return finishNode(factory.createJsxClosingElement(tagName), pos);
    }

    function parseJsxClosingFragment(inExpressionContext: boolean): ts.JsxClosingFragment {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.LessThanSlashToken);
        if (ts.tokenIsIdentifierOrKeyword(token())) {
            parseErrorAtRange(parseJsxElementName(), ts.Diagnostics.Expected_corresponding_closing_tag_for_JSX_fragment);
        }
        if (parseExpected(ts.SyntaxKind.GreaterThanToken, /*diagnostic*/ undefined, /*shouldAdvance*/ false)) {
            // manually advance the scanner in order to look for jsx text inside jsx
            if (inExpressionContext) {
                nextToken();
            }
            else {
                scanJsxText();
            }
        }
        return finishNode(factory.createJsxJsxClosingFragment(), pos);
    }

    function parseTypeAssertion(): ts.TypeAssertion {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.LessThanToken);
        const type = parseType();
        parseExpected(ts.SyntaxKind.GreaterThanToken);
        const expression = parseSimpleUnaryExpression();
        return finishNode(factory.createTypeAssertion(type, expression), pos);
    }

    function nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate() {
        nextToken();
        return ts.tokenIsIdentifierOrKeyword(token())
            || token() === ts.SyntaxKind.OpenBracketToken
            || isTemplateStartOfTaggedTemplate();
    }

    function isStartOfOptionalPropertyOrElementAccessChain() {
        return token() === ts.SyntaxKind.QuestionDotToken
            && lookAhead(nextTokenIsIdentifierOrKeywordOrOpenBracketOrTemplate);
    }

    function tryReparseOptionalChain(node: ts.Expression) {
        if (node.flags & ts.NodeFlags.OptionalChain) {
            return true;
        }
        // check for an optional chain in a non-null expression
        if (ts.isNonNullExpression(node)) {
            let expr = node.expression;
            while (ts.isNonNullExpression(expr) && !(expr.flags & ts.NodeFlags.OptionalChain)) {
                expr = expr.expression;
            }
            if (expr.flags & ts.NodeFlags.OptionalChain) {
                // this is part of an optional chain. Walk down from `node` to `expression` and set the flag.
                while (ts.isNonNullExpression(node)) {
                    (node as ts.Mutable<ts.NonNullExpression>).flags |= ts.NodeFlags.OptionalChain;
                    node = node.expression;
                }
                return true;
            }
        }
        return false;
    }

    function parsePropertyAccessExpressionRest(pos: number, expression: ts.LeftHandSideExpression, questionDotToken: ts.QuestionDotToken | undefined) {
        const name = parseRightSideOfDot(/*allowIdentifierNames*/ true, /*allowPrivateIdentifiers*/ true);
        const isOptionalChain = questionDotToken || tryReparseOptionalChain(expression);
        const propertyAccess = isOptionalChain ?
            factory.createPropertyAccessChain(expression, questionDotToken, name) :
            factory.createPropertyAccessExpression(expression, name);
        if (isOptionalChain && ts.isPrivateIdentifier(propertyAccess.name)) {
            parseErrorAtRange(propertyAccess.name, ts.Diagnostics.An_optional_chain_cannot_contain_private_identifiers);
        }
        if (ts.isExpressionWithTypeArguments(expression) && expression.typeArguments) {
            const pos = expression.typeArguments.pos - 1;
            const end = ts.skipTrivia(sourceText, expression.typeArguments.end) + 1;
            parseErrorAt(pos, end, ts.Diagnostics.An_instantiation_expression_cannot_be_followed_by_a_property_access);
        }
        return finishNode(propertyAccess, pos);
    }

    function parseElementAccessExpressionRest(pos: number, expression: ts.LeftHandSideExpression, questionDotToken: ts.QuestionDotToken | undefined) {
        let argumentExpression: ts.Expression;
        if (token() === ts.SyntaxKind.CloseBracketToken) {
            argumentExpression = createMissingNode(ts.SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, ts.Diagnostics.An_element_access_expression_should_take_an_argument);
        }
        else {
            const argument = allowInAnd(parseExpression);
            if (ts.isStringOrNumericLiteralLike(argument)) {
                argument.text = internIdentifier(argument.text);
            }
            argumentExpression = argument;
        }

        parseExpected(ts.SyntaxKind.CloseBracketToken);

        const indexedAccess = questionDotToken || tryReparseOptionalChain(expression) ?
            factory.createElementAccessChain(expression, questionDotToken, argumentExpression) :
            factory.createElementAccessExpression(expression, argumentExpression);
        return finishNode(indexedAccess, pos);
    }

    function parseMemberExpressionRest(pos: number, expression: ts.LeftHandSideExpression, allowOptionalChain: boolean): ts.MemberExpression {
        while (true) {
            let questionDotToken: ts.QuestionDotToken | undefined;
            let isPropertyAccess = false;
            if (allowOptionalChain && isStartOfOptionalPropertyOrElementAccessChain()) {
                questionDotToken = parseExpectedToken(ts.SyntaxKind.QuestionDotToken);
                isPropertyAccess = ts.tokenIsIdentifierOrKeyword(token());
            }
            else {
                isPropertyAccess = parseOptional(ts.SyntaxKind.DotToken);
            }

            if (isPropertyAccess) {
                expression = parsePropertyAccessExpressionRest(pos, expression, questionDotToken);
                continue;
            }

            // when in the [Decorator] context, we do not parse ElementAccess as it could be part of a ComputedPropertyName
            if ((questionDotToken || !inDecoratorContext()) && parseOptional(ts.SyntaxKind.OpenBracketToken)) {
                expression = parseElementAccessExpressionRest(pos, expression, questionDotToken);
                continue;
            }

            if (isTemplateStartOfTaggedTemplate()) {
                // Absorb type arguments into TemplateExpression when preceding expression is ExpressionWithTypeArguments
                expression = !questionDotToken && expression.kind === ts.SyntaxKind.ExpressionWithTypeArguments ?
                    parseTaggedTemplateRest(pos, (expression as ts.ExpressionWithTypeArguments).expression, questionDotToken, (expression as ts.ExpressionWithTypeArguments).typeArguments) :
                    parseTaggedTemplateRest(pos, expression, questionDotToken, /*typeArguments*/ undefined);
                continue;
            }

            if (!questionDotToken) {
                if (token() === ts.SyntaxKind.ExclamationToken && !scanner.hasPrecedingLineBreak()) {
                    nextToken();
                    expression = finishNode(factory.createNonNullExpression(expression), pos);
                    continue;
                }
                const typeArguments = tryParse(parseTypeArgumentsInExpression);
                if (typeArguments) {
                    expression = finishNode(factory.createExpressionWithTypeArguments(expression, typeArguments), pos);
                    continue;
                }
            }

            return expression as ts.MemberExpression;
        }
    }

    function isTemplateStartOfTaggedTemplate() {
        return token() === ts.SyntaxKind.NoSubstitutionTemplateLiteral || token() === ts.SyntaxKind.TemplateHead;
    }

    function parseTaggedTemplateRest(pos: number, tag: ts.LeftHandSideExpression, questionDotToken: ts.QuestionDotToken | undefined, typeArguments: ts.NodeArray<ts.TypeNode> | undefined) {
        const tagExpression = factory.createTaggedTemplateExpression(
            tag,
            typeArguments,
            token() === ts.SyntaxKind.NoSubstitutionTemplateLiteral ?
                (reScanTemplateHeadOrNoSubstitutionTemplate(), parseLiteralNode() as ts.NoSubstitutionTemplateLiteral) :
                parseTemplateExpression(/*isTaggedTemplate*/ true)
        );
        if (questionDotToken || tag.flags & ts.NodeFlags.OptionalChain) {
            (tagExpression as ts.Mutable<ts.Node>).flags |= ts.NodeFlags.OptionalChain;
        }
        tagExpression.questionDotToken = questionDotToken;
        return finishNode(tagExpression, pos);
    }

    function parseCallExpressionRest(pos: number, expression: ts.LeftHandSideExpression): ts.LeftHandSideExpression {
        while (true) {
            expression = parseMemberExpressionRest(pos, expression, /*allowOptionalChain*/ true);
            let typeArguments: ts.NodeArray<ts.TypeNode> | undefined;
            const questionDotToken = parseOptionalToken(ts.SyntaxKind.QuestionDotToken);
            if (questionDotToken) {
                typeArguments = tryParse(parseTypeArgumentsInExpression);
                if (isTemplateStartOfTaggedTemplate()) {
                    expression = parseTaggedTemplateRest(pos, expression, questionDotToken, typeArguments);
                    continue;
                }
            }
            if (typeArguments || token() === ts.SyntaxKind.OpenParenToken) {
                // Absorb type arguments into CallExpression when preceding expression is ExpressionWithTypeArguments
                if (!questionDotToken && expression.kind === ts.SyntaxKind.ExpressionWithTypeArguments) {
                    typeArguments = (expression as ts.ExpressionWithTypeArguments).typeArguments;
                    expression = (expression as ts.ExpressionWithTypeArguments).expression;
                }
                const argumentList = parseArgumentList();
                const callExpr = questionDotToken || tryReparseOptionalChain(expression) ?
                    factory.createCallChain(expression, questionDotToken, typeArguments, argumentList) :
                    factory.createCallExpression(expression, typeArguments, argumentList);
                expression = finishNode(callExpr, pos);
                continue;
            }
            if (questionDotToken) {
                // We parsed `?.` but then failed to parse anything, so report a missing identifier here.
                const name = createMissingNode<ts.Identifier>(ts.SyntaxKind.Identifier, /*reportAtCurrentPosition*/ false, ts.Diagnostics.Identifier_expected);
                expression = finishNode(factory.createPropertyAccessChain(expression, questionDotToken, name), pos);
            }
            break;
        }
        return expression;
    }

    function parseArgumentList() {
        parseExpected(ts.SyntaxKind.OpenParenToken);
        const result = parseDelimitedList(ParsingContext.ArgumentExpressions, parseArgumentExpression);
        parseExpected(ts.SyntaxKind.CloseParenToken);
        return result;
    }

    function parseTypeArgumentsInExpression() {
        if ((contextFlags & ts.NodeFlags.JavaScriptFile) !== 0) {
            // TypeArguments must not be parsed in JavaScript files to avoid ambiguity with binary operators.
            return undefined;
        }

        if (reScanLessThanToken() !== ts.SyntaxKind.LessThanToken) {
            return undefined;
        }
        nextToken();

        const typeArguments = parseDelimitedList(ParsingContext.TypeArguments, parseType);
        if (reScanGreaterToken() !== ts.SyntaxKind.GreaterThanToken) {
            // If it doesn't have the closing `>` then it's definitely not an type argument list.
            return undefined;
        }
        nextToken();

        // We successfully parsed a type argument list. The next token determines whether we want to
        // treat it as such. If the type argument list is followed by `(` or a template literal, as in
        // `f<number>(42)`, we favor the type argument interpretation even though JavaScript would view
        // it as a relational expression.
        return typeArguments && canFollowTypeArgumentsInExpression() ? typeArguments : undefined;
    }

    function canFollowTypeArgumentsInExpression(): boolean {
        switch (token()) {
            // These tokens can follow a type argument list in a call expression.
            case ts.SyntaxKind.OpenParenToken:                 // foo<x>(
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:  // foo<T> `...`
            case ts.SyntaxKind.TemplateHead:                   // foo<T> `...${100}...`
                return true;
            // A type argument list followed by `<` never makes sense, and a type argument list followed
            // by `>` is ambiguous with a (re-scanned) `>>` operator, so we disqualify both. Also, in
            // this context, `+` and `-` are unary operators, not binary operators.
            case ts.SyntaxKind.LessThanToken:
            case ts.SyntaxKind.GreaterThanToken:
            case ts.SyntaxKind.PlusToken:
            case ts.SyntaxKind.MinusToken:
                return false;
        }
        // We favor the type argument list interpretation when it is immediately followed by
        // a line break, a binary operator, or something that can't start an expression.
        return scanner.hasPrecedingLineBreak() || isBinaryOperator() || !isStartOfExpression();
    }

    function parsePrimaryExpression(): ts.PrimaryExpression {
        switch (token()) {
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.BigIntLiteral:
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
                return parseLiteralNode();
            case ts.SyntaxKind.ThisKeyword:
            case ts.SyntaxKind.SuperKeyword:
            case ts.SyntaxKind.NullKeyword:
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
                return parseTokenNode<ts.PrimaryExpression>();
            case ts.SyntaxKind.OpenParenToken:
                return parseParenthesizedExpression();
            case ts.SyntaxKind.OpenBracketToken:
                return parseArrayLiteralExpression();
            case ts.SyntaxKind.OpenBraceToken:
                return parseObjectLiteralExpression();
            case ts.SyntaxKind.AsyncKeyword:
                // Async arrow functions are parsed earlier in parseAssignmentExpressionOrHigher.
                // If we encounter `async [no LineTerminator here] function` then this is an async
                // function; otherwise, its an identifier.
                if (!lookAhead(nextTokenIsFunctionKeywordOnSameLine)) {
                    break;
                }

                return parseFunctionExpression();
            case ts.SyntaxKind.ClassKeyword:
                return parseClassExpression();
            case ts.SyntaxKind.FunctionKeyword:
                return parseFunctionExpression();
            case ts.SyntaxKind.NewKeyword:
                return parseNewExpressionOrNewDotTarget();
            case ts.SyntaxKind.SlashToken:
            case ts.SyntaxKind.SlashEqualsToken:
                if (reScanSlashToken() === ts.SyntaxKind.RegularExpressionLiteral) {
                    return parseLiteralNode();
                }
                break;
            case ts.SyntaxKind.TemplateHead:
                return parseTemplateExpression(/* isTaggedTemplate */ false);
            case ts.SyntaxKind.PrivateIdentifier:
                return parsePrivateIdentifier();
        }

        return parseIdentifier(ts.Diagnostics.Expression_expected);
    }

    function parseParenthesizedExpression(): ts.ParenthesizedExpression {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpected(ts.SyntaxKind.CloseParenToken);
        return withJSDoc(finishNode(factory.createParenthesizedExpression(expression), pos), hasJSDoc);
    }

    function parseSpreadElement(): ts.Expression {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.DotDotDotToken);
        const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        return finishNode(factory.createSpreadElement(expression), pos);
    }

    function parseArgumentOrArrayLiteralElement(): ts.Expression {
        return token() === ts.SyntaxKind.DotDotDotToken ? parseSpreadElement() :
            token() === ts.SyntaxKind.CommaToken ? finishNode(factory.createOmittedExpression(), getNodePos()) :
            parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
    }

    function parseArgumentExpression(): ts.Expression {
        return doOutsideOfContext(disallowInAndDecoratorContext, parseArgumentOrArrayLiteralElement);
    }

    function parseArrayLiteralExpression(): ts.ArrayLiteralExpression {
        const pos = getNodePos();
        const openBracketPosition = scanner.getTokenPos();
        const openBracketParsed = parseExpected(ts.SyntaxKind.OpenBracketToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        const elements = parseDelimitedList(ParsingContext.ArrayLiteralMembers, parseArgumentOrArrayLiteralElement);
        parseExpectedMatchingBrackets(ts.SyntaxKind.OpenBracketToken, ts.SyntaxKind.CloseBracketToken, openBracketParsed, openBracketPosition);
        return finishNode(factory.createArrayLiteralExpression(elements, multiLine), pos);
    }

    function parseObjectLiteralElement(): ts.ObjectLiteralElementLike {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        if (parseOptionalToken(ts.SyntaxKind.DotDotDotToken)) {
            const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
            return withJSDoc(finishNode(factory.createSpreadAssignment(expression), pos), hasJSDoc);
        }

        const decorators = parseDecorators();
        const modifiers = parseModifiers();

        if (parseContextualModifier(ts.SyntaxKind.GetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, decorators, modifiers, ts.SyntaxKind.GetAccessor, SignatureFlags.None);
        }
        if (parseContextualModifier(ts.SyntaxKind.SetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, decorators, modifiers, ts.SyntaxKind.SetAccessor, SignatureFlags.None);
        }

        const asteriskToken = parseOptionalToken(ts.SyntaxKind.AsteriskToken);
        const tokenIsIdentifier = isIdentifier();
        const name = parsePropertyName();

        // Disallowing of optional property assignments and definite assignment assertion happens in the grammar checker.
        const questionToken = parseOptionalToken(ts.SyntaxKind.QuestionToken);
        const exclamationToken = parseOptionalToken(ts.SyntaxKind.ExclamationToken);

        if (asteriskToken || token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.LessThanToken) {
            return parseMethodDeclaration(pos, hasJSDoc, decorators, modifiers, asteriskToken, name, questionToken, exclamationToken);
        }

        // check if it is short-hand property assignment or normal property assignment
        // NOTE: if token is EqualsToken it is interpreted as CoverInitializedName production
        // CoverInitializedName[Yield] :
        //     IdentifierReference[?Yield] Initializer[In, ?Yield]
        // this is necessary because ObjectLiteral productions are also used to cover grammar for ObjectAssignmentPattern
        let node: ts.Mutable<ts.ShorthandPropertyAssignment | ts.PropertyAssignment>;
        const isShorthandPropertyAssignment = tokenIsIdentifier && (token() !== ts.SyntaxKind.ColonToken);
        if (isShorthandPropertyAssignment) {
            const equalsToken = parseOptionalToken(ts.SyntaxKind.EqualsToken);
            const objectAssignmentInitializer = equalsToken ? allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true)) : undefined;
            node = factory.createShorthandPropertyAssignment(name as ts.Identifier, objectAssignmentInitializer);
            // Save equals token for error reporting.
            // TODO(rbuckton): Consider manufacturing this when we need to report an error as it is otherwise not useful.
            node.equalsToken = equalsToken;
        }
        else {
            parseExpected(ts.SyntaxKind.ColonToken);
            const initializer = allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true));
            node = factory.createPropertyAssignment(name, initializer);
        }
        // Decorators, Modifiers, questionToken, and exclamationToken are not supported by property assignments and are reported in the grammar checker
        node.illegalDecorators = decorators;
        node.modifiers = modifiers;
        node.questionToken = questionToken;
        node.exclamationToken = exclamationToken;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseObjectLiteralExpression(): ts.ObjectLiteralExpression {
        const pos = getNodePos();
        const openBracePosition = scanner.getTokenPos();
        const openBraceParsed = parseExpected(ts.SyntaxKind.OpenBraceToken);
        const multiLine = scanner.hasPrecedingLineBreak();
        const properties = parseDelimitedList(ParsingContext.ObjectLiteralMembers, parseObjectLiteralElement, /*considerSemicolonAsDelimiter*/ true);
        parseExpectedMatchingBrackets(ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken, openBraceParsed, openBracePosition);
        return finishNode(factory.createObjectLiteralExpression(properties, multiLine), pos);
    }

    function parseFunctionExpression(): ts.FunctionExpression {
        // GeneratorExpression:
        //      function* BindingIdentifier [Yield][opt](FormalParameters[Yield]){ GeneratorBody }
        //
        // FunctionExpression:
        //      function BindingIdentifier[opt](FormalParameters){ FunctionBody }
        const savedDecoratorContext = inDecoratorContext();
        setDecoratorContext(/*val*/ false);

        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const modifiers = parseModifiers();
        parseExpected(ts.SyntaxKind.FunctionKeyword);
        const asteriskToken = parseOptionalToken(ts.SyntaxKind.AsteriskToken);
        const isGenerator = asteriskToken ? SignatureFlags.Yield : SignatureFlags.None;
        const isAsync = ts.some(modifiers, ts.isAsyncModifier) ? SignatureFlags.Await : SignatureFlags.None;
        const name = isGenerator && isAsync ? doInYieldAndAwaitContext(parseOptionalBindingIdentifier) :
            isGenerator ? doInYieldContext(parseOptionalBindingIdentifier) :
            isAsync ? doInAwaitContext(parseOptionalBindingIdentifier) :
            parseOptionalBindingIdentifier();

        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(isGenerator | isAsync);
        const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlock(isGenerator | isAsync);

        setDecoratorContext(savedDecoratorContext);

        const node = factory.createFunctionExpression(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseOptionalBindingIdentifier(): ts.Identifier | undefined {
        return isBindingIdentifier() ? parseBindingIdentifier() : undefined;
    }

    function parseNewExpressionOrNewDotTarget(): ts.NewExpression | ts.MetaProperty {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.NewKeyword);
        if (parseOptional(ts.SyntaxKind.DotToken)) {
            const name = parseIdentifierName();
            return finishNode(factory.createMetaProperty(ts.SyntaxKind.NewKeyword, name), pos);
        }
        const expressionPos = getNodePos();
        let expression: ts.LeftHandSideExpression = parseMemberExpressionRest(expressionPos, parsePrimaryExpression(), /*allowOptionalChain*/ false);
        let typeArguments: ts.NodeArray<ts.TypeNode> | undefined;
        // Absorb type arguments into NewExpression when preceding expression is ExpressionWithTypeArguments
        if (expression.kind === ts.SyntaxKind.ExpressionWithTypeArguments) {
            typeArguments = (expression as ts.ExpressionWithTypeArguments).typeArguments;
            expression = (expression as ts.ExpressionWithTypeArguments).expression;
        }
        if (token() === ts.SyntaxKind.QuestionDotToken) {
            parseErrorAtCurrentToken(ts.Diagnostics.Invalid_optional_chain_from_new_expression_Did_you_mean_to_call_0, ts.getTextOfNodeFromSourceText(sourceText, expression));
        }
        const argumentList = token() === ts.SyntaxKind.OpenParenToken ? parseArgumentList() : undefined;
        return finishNode(factory.createNewExpression(expression, typeArguments, argumentList), pos);
    }

    // STATEMENTS
    function parseBlock(ignoreMissingOpenBrace: boolean, diagnosticMessage?: ts.DiagnosticMessage): ts.Block {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const openBracePosition = scanner.getTokenPos();
        const openBraceParsed = parseExpected(ts.SyntaxKind.OpenBraceToken, diagnosticMessage);
        if (openBraceParsed || ignoreMissingOpenBrace) {
            const multiLine = scanner.hasPrecedingLineBreak();
            const statements = parseList(ParsingContext.BlockStatements, parseStatement);
            parseExpectedMatchingBrackets(ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken, openBraceParsed, openBracePosition);
            const result = withJSDoc(finishNode(factory.createBlock(statements, multiLine), pos), hasJSDoc);
            if (token() === ts.SyntaxKind.EqualsToken) {
                parseErrorAtCurrentToken(ts.Diagnostics.Declaration_or_statement_expected_This_follows_a_block_of_statements_so_if_you_intended_to_write_a_destructuring_assignment_you_might_need_to_wrap_the_the_whole_assignment_in_parentheses);
                nextToken();
            }

            return result;
        }
        else {
            const statements = createMissingList<ts.Statement>();
            return withJSDoc(finishNode(factory.createBlock(statements, /*multiLine*/ undefined), pos), hasJSDoc);
        }
    }

    function parseFunctionBlock(flags: SignatureFlags, diagnosticMessage?: ts.DiagnosticMessage): ts.Block {
        const savedYieldContext = inYieldContext();
        setYieldContext(!!(flags & SignatureFlags.Yield));

        const savedAwaitContext = inAwaitContext();
        setAwaitContext(!!(flags & SignatureFlags.Await));

        const savedTopLevel = topLevel;
        topLevel = false;

        // We may be in a [Decorator] context when parsing a function expression or
        // arrow function. The body of the function is not in [Decorator] context.
        const saveDecoratorContext = inDecoratorContext();
        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ false);
        }

        const block = parseBlock(!!(flags & SignatureFlags.IgnoreMissingOpenBrace), diagnosticMessage);

        if (saveDecoratorContext) {
            setDecoratorContext(/*val*/ true);
        }

        topLevel = savedTopLevel;
        setYieldContext(savedYieldContext);
        setAwaitContext(savedAwaitContext);

        return block;
    }

    function parseEmptyStatement(): ts.Statement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.SemicolonToken);
        return withJSDoc(finishNode(factory.createEmptyStatement(), pos), hasJSDoc);
    }

    function parseIfStatement(): ts.IfStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.IfKeyword);
        const openParenPosition = scanner.getTokenPos();
        const openParenParsed = parseExpected(ts.SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);
        const thenStatement = parseStatement();
        const elseStatement = parseOptional(ts.SyntaxKind.ElseKeyword) ? parseStatement() : undefined;
        return withJSDoc(finishNode(factory.createIfStatement(expression, thenStatement, elseStatement), pos), hasJSDoc);
    }

    function parseDoStatement(): ts.DoStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.DoKeyword);
        const statement = parseStatement();
        parseExpected(ts.SyntaxKind.WhileKeyword);
        const openParenPosition = scanner.getTokenPos();
        const openParenParsed = parseExpected(ts.SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);

        // From: https://mail.mozilla.org/pipermail/es-discuss/2011-August/016188.html
        // 157 min --- All allen at wirfs-brock.com CONF --- "do{;}while(false)false" prohibited in
        // spec but allowed in consensus reality. Approved -- this is the de-facto standard whereby
        //  do;while(0)x will have a semicolon inserted before x.
        parseOptional(ts.SyntaxKind.SemicolonToken);
        return withJSDoc(finishNode(factory.createDoStatement(statement, expression), pos), hasJSDoc);
    }

    function parseWhileStatement(): ts.WhileStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.WhileKeyword);
        const openParenPosition = scanner.getTokenPos();
        const openParenParsed = parseExpected(ts.SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);
        const statement = parseStatement();
        return withJSDoc(finishNode(factory.createWhileStatement(expression, statement), pos), hasJSDoc);
    }

    function parseForOrForInOrForOfStatement(): ts.Statement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.ForKeyword);
        const awaitToken = parseOptionalToken(ts.SyntaxKind.AwaitKeyword);
        parseExpected(ts.SyntaxKind.OpenParenToken);

        let initializer!: ts.VariableDeclarationList | ts.Expression;
        if (token() !== ts.SyntaxKind.SemicolonToken) {
            if (token() === ts.SyntaxKind.VarKeyword || token() === ts.SyntaxKind.LetKeyword || token() === ts.SyntaxKind.ConstKeyword) {
                initializer = parseVariableDeclarationList(/*inForStatementInitializer*/ true);
            }
            else {
                initializer = disallowInAnd(parseExpression);
            }
        }

        let node: ts.IterationStatement;
        if (awaitToken ? parseExpected(ts.SyntaxKind.OfKeyword) : parseOptional(ts.SyntaxKind.OfKeyword)) {
            const expression = allowInAnd(() => parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true));
            parseExpected(ts.SyntaxKind.CloseParenToken);
            node = factory.createForOfStatement(awaitToken, initializer, expression, parseStatement());
        }
        else if (parseOptional(ts.SyntaxKind.InKeyword)) {
            const expression = allowInAnd(parseExpression);
            parseExpected(ts.SyntaxKind.CloseParenToken);
            node = factory.createForInStatement(initializer, expression, parseStatement());
        }
        else {
            parseExpected(ts.SyntaxKind.SemicolonToken);
            const condition = token() !== ts.SyntaxKind.SemicolonToken && token() !== ts.SyntaxKind.CloseParenToken
                ? allowInAnd(parseExpression)
                : undefined;
            parseExpected(ts.SyntaxKind.SemicolonToken);
            const incrementor = token() !== ts.SyntaxKind.CloseParenToken
                ? allowInAnd(parseExpression)
                : undefined;
            parseExpected(ts.SyntaxKind.CloseParenToken);
            node = factory.createForStatement(initializer, condition, incrementor, parseStatement());
        }

        return withJSDoc(finishNode(node, pos) as ts.ForStatement | ts.ForInOrOfStatement, hasJSDoc);
    }

    function parseBreakOrContinueStatement(kind: ts.SyntaxKind): ts.BreakOrContinueStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpected(kind === ts.SyntaxKind.BreakStatement ? ts.SyntaxKind.BreakKeyword : ts.SyntaxKind.ContinueKeyword);
        const label = canParseSemicolon() ? undefined : parseIdentifier();

        parseSemicolon();
        const node = kind === ts.SyntaxKind.BreakStatement
            ? factory.createBreakStatement(label)
            : factory.createContinueStatement(label);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseReturnStatement(): ts.ReturnStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.ReturnKeyword);
        const expression = canParseSemicolon() ? undefined : allowInAnd(parseExpression);
        parseSemicolon();
        return withJSDoc(finishNode(factory.createReturnStatement(expression), pos), hasJSDoc);
    }

    function parseWithStatement(): ts.WithStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.WithKeyword);
        const openParenPosition = scanner.getTokenPos();
        const openParenParsed = parseExpected(ts.SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpectedMatchingBrackets(ts.SyntaxKind.OpenParenToken, ts.SyntaxKind.CloseParenToken, openParenParsed, openParenPosition);
        const statement = doInsideOfContext(ts.NodeFlags.InWithStatement, parseStatement);
        return withJSDoc(finishNode(factory.createWithStatement(expression, statement), pos), hasJSDoc);
    }

    function parseCaseClause(): ts.CaseClause {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.CaseKeyword);
        const expression = allowInAnd(parseExpression);
        parseExpected(ts.SyntaxKind.ColonToken);
        const statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
        return withJSDoc(finishNode(factory.createCaseClause(expression, statements), pos), hasJSDoc);
    }

    function parseDefaultClause(): ts.DefaultClause {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.DefaultKeyword);
        parseExpected(ts.SyntaxKind.ColonToken);
        const statements = parseList(ParsingContext.SwitchClauseStatements, parseStatement);
        return finishNode(factory.createDefaultClause(statements), pos);
    }

    function parseCaseOrDefaultClause(): ts.CaseOrDefaultClause {
        return token() === ts.SyntaxKind.CaseKeyword ? parseCaseClause() : parseDefaultClause();
    }

    function parseCaseBlock(): ts.CaseBlock {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.OpenBraceToken);
        const clauses = parseList(ParsingContext.SwitchClauses, parseCaseOrDefaultClause);
        parseExpected(ts.SyntaxKind.CloseBraceToken);
        return finishNode(factory.createCaseBlock(clauses), pos);
    }

    function parseSwitchStatement(): ts.SwitchStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.SwitchKeyword);
        parseExpected(ts.SyntaxKind.OpenParenToken);
        const expression = allowInAnd(parseExpression);
        parseExpected(ts.SyntaxKind.CloseParenToken);
        const caseBlock = parseCaseBlock();
        return withJSDoc(finishNode(factory.createSwitchStatement(expression, caseBlock), pos), hasJSDoc);
    }

    function parseThrowStatement(): ts.ThrowStatement {
        // ThrowStatement[Yield] :
        //      throw [no LineTerminator here]Expression[In, ?Yield];

        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.ThrowKeyword);

        // Because of automatic semicolon insertion, we need to report error if this
        // throw could be terminated with a semicolon.  Note: we can't call 'parseExpression'
        // directly as that might consume an expression on the following line.
        // Instead, we create a "missing" identifier, but don't report an error. The actual error
        // will be reported in the grammar walker.
        let expression = scanner.hasPrecedingLineBreak() ? undefined : allowInAnd(parseExpression);
        if (expression === undefined) {
            identifierCount++;
            expression = finishNode(factory.createIdentifier(""), getNodePos());
        }
        if (!tryParseSemicolon()) {
            parseErrorForMissingSemicolonAfter(expression);
        }
        return withJSDoc(finishNode(factory.createThrowStatement(expression), pos), hasJSDoc);
    }

    // TODO: Review for error recovery
    function parseTryStatement(): ts.TryStatement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();

        parseExpected(ts.SyntaxKind.TryKeyword);
        const tryBlock = parseBlock(/*ignoreMissingOpenBrace*/ false);
        const catchClause = token() === ts.SyntaxKind.CatchKeyword ? parseCatchClause() : undefined;

        // If we don't have a catch clause, then we must have a finally clause.  Try to parse
        // one out no matter what.
        let finallyBlock: ts.Block | undefined;
        if (!catchClause || token() === ts.SyntaxKind.FinallyKeyword) {
            parseExpected(ts.SyntaxKind.FinallyKeyword, ts.Diagnostics.catch_or_finally_expected);
            finallyBlock = parseBlock(/*ignoreMissingOpenBrace*/ false);
        }

        return withJSDoc(finishNode(factory.createTryStatement(tryBlock, catchClause, finallyBlock), pos), hasJSDoc);
    }

    function parseCatchClause(): ts.CatchClause {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.CatchKeyword);

        let variableDeclaration;
        if (parseOptional(ts.SyntaxKind.OpenParenToken)) {
            variableDeclaration = parseVariableDeclaration();
            parseExpected(ts.SyntaxKind.CloseParenToken);
        }
        else {
            // Keep shape of node to avoid degrading performance.
            variableDeclaration = undefined;
        }

        const block = parseBlock(/*ignoreMissingOpenBrace*/ false);
        return finishNode(factory.createCatchClause(variableDeclaration, block), pos);
    }

    function parseDebuggerStatement(): ts.Statement {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        parseExpected(ts.SyntaxKind.DebuggerKeyword);
        parseSemicolon();
        return withJSDoc(finishNode(factory.createDebuggerStatement(), pos), hasJSDoc);
    }

    function parseExpressionOrLabeledStatement(): ts.ExpressionStatement | ts.LabeledStatement {
        // Avoiding having to do the lookahead for a labeled statement by just trying to parse
        // out an expression, seeing if it is identifier and then seeing if it is followed by
        // a colon.
        const pos = getNodePos();
        let hasJSDoc = hasPrecedingJSDocComment();
        let node: ts.ExpressionStatement | ts.LabeledStatement;
        const hasParen = token() === ts.SyntaxKind.OpenParenToken;
        const expression = allowInAnd(parseExpression);
        if (ts.isIdentifier(expression) && parseOptional(ts.SyntaxKind.ColonToken)) {
            node = factory.createLabeledStatement(expression, parseStatement());
        }
        else {
            if (!tryParseSemicolon()) {
                parseErrorForMissingSemicolonAfter(expression);
            }
            node = factory.createExpressionStatement(expression);
            if (hasParen) {
                // do not parse the same jsdoc twice
                hasJSDoc = false;
            }
        }
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function nextTokenIsIdentifierOrKeywordOnSameLine() {
        nextToken();
        return ts.tokenIsIdentifierOrKeyword(token()) && !scanner.hasPrecedingLineBreak();
    }

    function nextTokenIsClassKeywordOnSameLine() {
        nextToken();
        return token() === ts.SyntaxKind.ClassKeyword && !scanner.hasPrecedingLineBreak();
    }

    function nextTokenIsFunctionKeywordOnSameLine() {
        nextToken();
        return token() === ts.SyntaxKind.FunctionKeyword && !scanner.hasPrecedingLineBreak();
    }

    function nextTokenIsIdentifierOrKeywordOrLiteralOnSameLine() {
        nextToken();
        return (ts.tokenIsIdentifierOrKeyword(token()) || token() === ts.SyntaxKind.NumericLiteral || token() === ts.SyntaxKind.BigIntLiteral || token() === ts.SyntaxKind.StringLiteral) && !scanner.hasPrecedingLineBreak();
    }

    function isDeclaration(): boolean {
        while (true) {
            switch (token()) {
                case ts.SyntaxKind.VarKeyword:
                case ts.SyntaxKind.LetKeyword:
                case ts.SyntaxKind.ConstKeyword:
                case ts.SyntaxKind.FunctionKeyword:
                case ts.SyntaxKind.ClassKeyword:
                case ts.SyntaxKind.EnumKeyword:
                    return true;

                // 'declare', 'module', 'namespace', 'interface'* and 'type' are all legal JavaScript identifiers;
                // however, an identifier cannot be followed by another identifier on the same line. This is what we
                // count on to parse out the respective declarations. For instance, we exploit this to say that
                //
                //    namespace n
                //
                // can be none other than the beginning of a namespace declaration, but need to respect that JavaScript sees
                //
                //    namespace
                //    n
                //
                // as the identifier 'namespace' on one line followed by the identifier 'n' on another.
                // We need to look one token ahead to see if it permissible to try parsing a declaration.
                //
                // *Note*: 'interface' is actually a strict mode reserved word. So while
                //
                //   "use strict"
                //   interface
                //   I {}
                //
                // could be legal, it would add complexity for very little gain.
                case ts.SyntaxKind.InterfaceKeyword:
                case ts.SyntaxKind.TypeKeyword:
                    return nextTokenIsIdentifierOnSameLine();
                case ts.SyntaxKind.ModuleKeyword:
                case ts.SyntaxKind.NamespaceKeyword:
                    return nextTokenIsIdentifierOrStringLiteralOnSameLine();
                case ts.SyntaxKind.AbstractKeyword:
                case ts.SyntaxKind.AccessorKeyword:
                case ts.SyntaxKind.AsyncKeyword:
                case ts.SyntaxKind.DeclareKeyword:
                case ts.SyntaxKind.PrivateKeyword:
                case ts.SyntaxKind.ProtectedKeyword:
                case ts.SyntaxKind.PublicKeyword:
                case ts.SyntaxKind.ReadonlyKeyword:
                    nextToken();
                    // ASI takes effect for this modifier.
                    if (scanner.hasPrecedingLineBreak()) {
                        return false;
                    }
                    continue;

                case ts.SyntaxKind.GlobalKeyword:
                    nextToken();
                    return token() === ts.SyntaxKind.OpenBraceToken || token() === ts.SyntaxKind.Identifier || token() === ts.SyntaxKind.ExportKeyword;

                case ts.SyntaxKind.ImportKeyword:
                    nextToken();
                    return token() === ts.SyntaxKind.StringLiteral || token() === ts.SyntaxKind.AsteriskToken ||
                        token() === ts.SyntaxKind.OpenBraceToken || ts.tokenIsIdentifierOrKeyword(token());
                case ts.SyntaxKind.ExportKeyword:
                    let currentToken = nextToken();
                    if (currentToken === ts.SyntaxKind.TypeKeyword) {
                        currentToken = lookAhead(nextToken);
                    }
                    if (currentToken === ts.SyntaxKind.EqualsToken || currentToken === ts.SyntaxKind.AsteriskToken ||
                        currentToken === ts.SyntaxKind.OpenBraceToken || currentToken === ts.SyntaxKind.DefaultKeyword ||
                        currentToken === ts.SyntaxKind.AsKeyword) {
                        return true;
                    }
                    continue;

                case ts.SyntaxKind.StaticKeyword:
                    nextToken();
                    continue;
                default:
                    return false;
            }
        }
    }

    function isStartOfDeclaration(): boolean {
        return lookAhead(isDeclaration);
    }

    function isStartOfStatement(): boolean {
        switch (token()) {
            case ts.SyntaxKind.AtToken:
            case ts.SyntaxKind.SemicolonToken:
            case ts.SyntaxKind.OpenBraceToken:
            case ts.SyntaxKind.VarKeyword:
            case ts.SyntaxKind.LetKeyword:
            case ts.SyntaxKind.FunctionKeyword:
            case ts.SyntaxKind.ClassKeyword:
            case ts.SyntaxKind.EnumKeyword:
            case ts.SyntaxKind.IfKeyword:
            case ts.SyntaxKind.DoKeyword:
            case ts.SyntaxKind.WhileKeyword:
            case ts.SyntaxKind.ForKeyword:
            case ts.SyntaxKind.ContinueKeyword:
            case ts.SyntaxKind.BreakKeyword:
            case ts.SyntaxKind.ReturnKeyword:
            case ts.SyntaxKind.WithKeyword:
            case ts.SyntaxKind.SwitchKeyword:
            case ts.SyntaxKind.ThrowKeyword:
            case ts.SyntaxKind.TryKeyword:
            case ts.SyntaxKind.DebuggerKeyword:
            // 'catch' and 'finally' do not actually indicate that the code is part of a statement,
            // however, we say they are here so that we may gracefully parse them and error later.
            // falls through
            case ts.SyntaxKind.CatchKeyword:
            case ts.SyntaxKind.FinallyKeyword:
                return true;

            case ts.SyntaxKind.ImportKeyword:
                return isStartOfDeclaration() || lookAhead(nextTokenIsOpenParenOrLessThanOrDot);

            case ts.SyntaxKind.ConstKeyword:
            case ts.SyntaxKind.ExportKeyword:
                return isStartOfDeclaration();

            case ts.SyntaxKind.AsyncKeyword:
            case ts.SyntaxKind.DeclareKeyword:
            case ts.SyntaxKind.InterfaceKeyword:
            case ts.SyntaxKind.ModuleKeyword:
            case ts.SyntaxKind.NamespaceKeyword:
            case ts.SyntaxKind.TypeKeyword:
            case ts.SyntaxKind.GlobalKeyword:
                // When these don't start a declaration, they're an identifier in an expression statement
                return true;

            case ts.SyntaxKind.AccessorKeyword:
            case ts.SyntaxKind.PublicKeyword:
            case ts.SyntaxKind.PrivateKeyword:
            case ts.SyntaxKind.ProtectedKeyword:
            case ts.SyntaxKind.StaticKeyword:
            case ts.SyntaxKind.ReadonlyKeyword:
                // When these don't start a declaration, they may be the start of a class member if an identifier
                // immediately follows. Otherwise they're an identifier in an expression statement.
                return isStartOfDeclaration() || !lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);

            default:
                return isStartOfExpression();
        }
    }

    function nextTokenIsBindingIdentifierOrStartOfDestructuring() {
        nextToken();
        return isBindingIdentifier() || token() === ts.SyntaxKind.OpenBraceToken || token() === ts.SyntaxKind.OpenBracketToken;
    }

    function isLetDeclaration() {
        // In ES6 'let' always starts a lexical declaration if followed by an identifier or {
        // or [.
        return lookAhead(nextTokenIsBindingIdentifierOrStartOfDestructuring);
    }

    function parseStatement(): ts.Statement {
        switch (token()) {
            case ts.SyntaxKind.SemicolonToken:
                return parseEmptyStatement();
            case ts.SyntaxKind.OpenBraceToken:
                return parseBlock(/*ignoreMissingOpenBrace*/ false);
            case ts.SyntaxKind.VarKeyword:
                return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), /*decorators*/ undefined, /*modifiers*/ undefined);
            case ts.SyntaxKind.LetKeyword:
                if (isLetDeclaration()) {
                    return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), /*decorators*/ undefined, /*modifiers*/ undefined);
                }
                break;
            case ts.SyntaxKind.FunctionKeyword:
                return parseFunctionDeclaration(getNodePos(), hasPrecedingJSDocComment(), /*decorators*/ undefined, /*modifiers*/ undefined);
            case ts.SyntaxKind.ClassKeyword:
                return parseClassDeclaration(getNodePos(), hasPrecedingJSDocComment(), /*decorators*/ undefined, /*modifiers*/ undefined);
            case ts.SyntaxKind.IfKeyword:
                return parseIfStatement();
            case ts.SyntaxKind.DoKeyword:
                return parseDoStatement();
            case ts.SyntaxKind.WhileKeyword:
                return parseWhileStatement();
            case ts.SyntaxKind.ForKeyword:
                return parseForOrForInOrForOfStatement();
            case ts.SyntaxKind.ContinueKeyword:
                return parseBreakOrContinueStatement(ts.SyntaxKind.ContinueStatement);
            case ts.SyntaxKind.BreakKeyword:
                return parseBreakOrContinueStatement(ts.SyntaxKind.BreakStatement);
            case ts.SyntaxKind.ReturnKeyword:
                return parseReturnStatement();
            case ts.SyntaxKind.WithKeyword:
                return parseWithStatement();
            case ts.SyntaxKind.SwitchKeyword:
                return parseSwitchStatement();
            case ts.SyntaxKind.ThrowKeyword:
                return parseThrowStatement();
            case ts.SyntaxKind.TryKeyword:
            // Include 'catch' and 'finally' for error recovery.
            // falls through
            case ts.SyntaxKind.CatchKeyword:
            case ts.SyntaxKind.FinallyKeyword:
                return parseTryStatement();
            case ts.SyntaxKind.DebuggerKeyword:
                return parseDebuggerStatement();
            case ts.SyntaxKind.AtToken:
                return parseDeclaration();
            case ts.SyntaxKind.AsyncKeyword:
            case ts.SyntaxKind.InterfaceKeyword:
            case ts.SyntaxKind.TypeKeyword:
            case ts.SyntaxKind.ModuleKeyword:
            case ts.SyntaxKind.NamespaceKeyword:
            case ts.SyntaxKind.DeclareKeyword:
            case ts.SyntaxKind.ConstKeyword:
            case ts.SyntaxKind.EnumKeyword:
            case ts.SyntaxKind.ExportKeyword:
            case ts.SyntaxKind.ImportKeyword:
            case ts.SyntaxKind.PrivateKeyword:
            case ts.SyntaxKind.ProtectedKeyword:
            case ts.SyntaxKind.PublicKeyword:
            case ts.SyntaxKind.AbstractKeyword:
            case ts.SyntaxKind.AccessorKeyword:
            case ts.SyntaxKind.StaticKeyword:
            case ts.SyntaxKind.ReadonlyKeyword:
            case ts.SyntaxKind.GlobalKeyword:
                if (isStartOfDeclaration()) {
                    return parseDeclaration();
                }
                break;
        }
        return parseExpressionOrLabeledStatement();
    }

    function isDeclareModifier(modifier: ts.Modifier) {
        return modifier.kind === ts.SyntaxKind.DeclareKeyword;
    }

    function parseDeclaration(): ts.Statement {
        // `parseListElement` attempted to get the reused node at this position,
        // but the ambient context flag was not yet set, so the node appeared
        // not reusable in that context.
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const decorators = parseDecorators();
        const modifiers = parseModifiers();
        const isAmbient = ts.some(modifiers, isDeclareModifier);
        if (isAmbient) {
            const node = tryReuseAmbientDeclaration(pos);
            if (node) {
                return node;
            }

            for (const m of modifiers!) {
                (m as ts.Mutable<ts.Node>).flags |= ts.NodeFlags.Ambient;
            }
            return doInsideOfContext(ts.NodeFlags.Ambient, () => parseDeclarationWorker(pos, hasJSDoc, decorators, modifiers));
        }
        else {
            return parseDeclarationWorker(pos, hasJSDoc, decorators, modifiers);
        }
    }

    function tryReuseAmbientDeclaration(pos: number): ts.Statement | undefined {
        return doInsideOfContext(ts.NodeFlags.Ambient, () => {
            const node = currentNode(parsingContext, pos);
            if (node) {
                return consumeNode(node) as ts.Statement;
            }
        });
    }

    function parseDeclarationWorker(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.Statement {
        switch (token()) {
            case ts.SyntaxKind.VarKeyword:
            case ts.SyntaxKind.LetKeyword:
            case ts.SyntaxKind.ConstKeyword:
                return parseVariableStatement(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.FunctionKeyword:
                return parseFunctionDeclaration(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.ClassKeyword:
                return parseClassDeclaration(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.InterfaceKeyword:
                return parseInterfaceDeclaration(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.TypeKeyword:
                return parseTypeAliasDeclaration(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.EnumKeyword:
                return parseEnumDeclaration(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.GlobalKeyword:
            case ts.SyntaxKind.ModuleKeyword:
            case ts.SyntaxKind.NamespaceKeyword:
                return parseModuleDeclaration(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.ImportKeyword:
                return parseImportDeclarationOrImportEqualsDeclaration(pos, hasJSDoc, decorators, modifiers);
            case ts.SyntaxKind.ExportKeyword:
                nextToken();
                switch (token()) {
                    case ts.SyntaxKind.DefaultKeyword:
                    case ts.SyntaxKind.EqualsToken:
                        return parseExportAssignment(pos, hasJSDoc, decorators, modifiers);
                    case ts.SyntaxKind.AsKeyword:
                        return parseNamespaceExportDeclaration(pos, hasJSDoc, decorators, modifiers);
                    default:
                        return parseExportDeclaration(pos, hasJSDoc, decorators, modifiers);
                }
            default:
                if (decorators || modifiers) {
                    // We reached this point because we encountered decorators and/or modifiers and assumed a declaration
                    // would follow. For recovery and error reporting purposes, return an incomplete declaration.
                    const missing = createMissingNode<ts.MissingDeclaration>(ts.SyntaxKind.MissingDeclaration, /*reportAtCurrentPosition*/ true, ts.Diagnostics.Declaration_expected);
                    ts.setTextRangePos(missing, pos);
                    missing.illegalDecorators = decorators;
                    missing.modifiers = modifiers;
                    return missing;
                }
                return undefined!; // TODO: GH#18217
        }
    }

    function nextTokenIsIdentifierOrStringLiteralOnSameLine() {
        nextToken();
        return !scanner.hasPrecedingLineBreak() && (isIdentifier() || token() === ts.SyntaxKind.StringLiteral);
    }

    function parseFunctionBlockOrSemicolon(flags: SignatureFlags, diagnosticMessage?: ts.DiagnosticMessage): ts.Block | undefined {
        if (token() !== ts.SyntaxKind.OpenBraceToken) {
            if (flags & SignatureFlags.Type) {
                parseTypeMemberSemicolon();
                return;
            }
            if (canParseSemicolon()) {
                parseSemicolon();
                return;
            }
        }
        return parseFunctionBlock(flags, diagnosticMessage);
    }

    // DECLARATIONS

    function parseArrayBindingElement(): ts.ArrayBindingElement {
        const pos = getNodePos();
        if (token() === ts.SyntaxKind.CommaToken) {
            return finishNode(factory.createOmittedExpression(), pos);
        }
        const dotDotDotToken = parseOptionalToken(ts.SyntaxKind.DotDotDotToken);
        const name = parseIdentifierOrPattern();
        const initializer = parseInitializer();
        return finishNode(factory.createBindingElement(dotDotDotToken, /*propertyName*/ undefined, name, initializer), pos);
    }

    function parseObjectBindingElement(): ts.BindingElement {
        const pos = getNodePos();
        const dotDotDotToken = parseOptionalToken(ts.SyntaxKind.DotDotDotToken);
        const tokenIsIdentifier = isBindingIdentifier();
        let propertyName: ts.PropertyName | undefined = parsePropertyName();
        let name: ts.BindingName;
        if (tokenIsIdentifier && token() !== ts.SyntaxKind.ColonToken) {
            name = propertyName as ts.Identifier;
            propertyName = undefined;
        }
        else {
            parseExpected(ts.SyntaxKind.ColonToken);
            name = parseIdentifierOrPattern();
        }
        const initializer = parseInitializer();
        return finishNode(factory.createBindingElement(dotDotDotToken, propertyName, name, initializer), pos);
    }

    function parseObjectBindingPattern(): ts.ObjectBindingPattern {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.OpenBraceToken);
        const elements = parseDelimitedList(ParsingContext.ObjectBindingElements, parseObjectBindingElement);
        parseExpected(ts.SyntaxKind.CloseBraceToken);
        return finishNode(factory.createObjectBindingPattern(elements), pos);
    }

    function parseArrayBindingPattern(): ts.ArrayBindingPattern {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.OpenBracketToken);
        const elements = parseDelimitedList(ParsingContext.ArrayBindingElements, parseArrayBindingElement);
        parseExpected(ts.SyntaxKind.CloseBracketToken);
        return finishNode(factory.createArrayBindingPattern(elements), pos);
    }

    function isBindingIdentifierOrPrivateIdentifierOrPattern() {
        return token() === ts.SyntaxKind.OpenBraceToken
            || token() === ts.SyntaxKind.OpenBracketToken
            || token() === ts.SyntaxKind.PrivateIdentifier
            || isBindingIdentifier();
    }

    function parseIdentifierOrPattern(privateIdentifierDiagnosticMessage?: ts.DiagnosticMessage): ts.Identifier | ts.BindingPattern {
        if (token() === ts.SyntaxKind.OpenBracketToken) {
            return parseArrayBindingPattern();
        }
        if (token() === ts.SyntaxKind.OpenBraceToken) {
            return parseObjectBindingPattern();
        }
        return parseBindingIdentifier(privateIdentifierDiagnosticMessage);
    }

    function parseVariableDeclarationAllowExclamation() {
        return parseVariableDeclaration(/*allowExclamation*/ true);
    }

    function parseVariableDeclaration(allowExclamation?: boolean): ts.VariableDeclaration {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const name = parseIdentifierOrPattern(ts.Diagnostics.Private_identifiers_are_not_allowed_in_variable_declarations);
        let exclamationToken: ts.ExclamationToken | undefined;
        if (allowExclamation && name.kind === ts.SyntaxKind.Identifier &&
            token() === ts.SyntaxKind.ExclamationToken && !scanner.hasPrecedingLineBreak()) {
            exclamationToken = parseTokenNode<ts.Token<ts.SyntaxKind.ExclamationToken>>();
        }
        const type = parseTypeAnnotation();
        const initializer = isInOrOfKeyword(token()) ? undefined : parseInitializer();
        const node = factory.createVariableDeclaration(name, exclamationToken, type, initializer);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseVariableDeclarationList(inForStatementInitializer: boolean): ts.VariableDeclarationList {
        const pos = getNodePos();

        let flags: ts.NodeFlags = 0;
        switch (token()) {
            case ts.SyntaxKind.VarKeyword:
                break;
            case ts.SyntaxKind.LetKeyword:
                flags |= ts.NodeFlags.Let;
                break;
            case ts.SyntaxKind.ConstKeyword:
                flags |= ts.NodeFlags.Const;
                break;
            default:
                ts.Debug.fail();
        }

        nextToken();

        // The user may have written the following:
        //
        //    for (let of X) { }
        //
        // In this case, we want to parse an empty declaration list, and then parse 'of'
        // as a keyword. The reason this is not automatic is that 'of' is a valid identifier.
        // So we need to look ahead to determine if 'of' should be treated as a keyword in
        // this context.
        // The checker will then give an error that there is an empty declaration list.
        let declarations: readonly ts.VariableDeclaration[];
        if (token() === ts.SyntaxKind.OfKeyword && lookAhead(canFollowContextualOfKeyword)) {
            declarations = createMissingList<ts.VariableDeclaration>();
        }
        else {
            const savedDisallowIn = inDisallowInContext();
            setDisallowInContext(inForStatementInitializer);

            declarations = parseDelimitedList(ParsingContext.VariableDeclarations,
                inForStatementInitializer ? parseVariableDeclaration : parseVariableDeclarationAllowExclamation);

            setDisallowInContext(savedDisallowIn);
        }

        return finishNode(factory.createVariableDeclarationList(declarations, flags), pos);
    }

    function canFollowContextualOfKeyword(): boolean {
        return nextTokenIsIdentifier() && nextToken() === ts.SyntaxKind.CloseParenToken;
    }

    function parseVariableStatement(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.VariableStatement {
        const declarationList = parseVariableDeclarationList(/*inForStatementInitializer*/ false);
        parseSemicolon();
        const node = factory.createVariableStatement(modifiers, declarationList);
        // Decorators are not allowed on a variable statement, so we keep track of them to report them in the grammar checker.
        node.illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseFunctionDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.FunctionDeclaration {
        const savedAwaitContext = inAwaitContext();

        const modifierFlags = ts.modifiersToFlags(modifiers);
        parseExpected(ts.SyntaxKind.FunctionKeyword);
        const asteriskToken = parseOptionalToken(ts.SyntaxKind.AsteriskToken);
        // We don't parse the name here in await context, instead we will report a grammar error in the checker.
        const name = modifierFlags & ts.ModifierFlags.Default ? parseOptionalBindingIdentifier() : parseBindingIdentifier();
        const isGenerator = asteriskToken ? SignatureFlags.Yield : SignatureFlags.None;
        const isAsync = modifierFlags & ts.ModifierFlags.Async ? SignatureFlags.Await : SignatureFlags.None;
        const typeParameters = parseTypeParameters();
        if (modifierFlags & ts.ModifierFlags.Export) setAwaitContext(/*value*/ true);
        const parameters = parseParameters(isGenerator | isAsync);
        const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, ts.Diagnostics.or_expected);
        setAwaitContext(savedAwaitContext);
        const node = factory.createFunctionDeclaration(modifiers, asteriskToken, name, typeParameters, parameters, type, body);
        (node as ts.Mutable<ts.FunctionDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseConstructorName() {
        if (token() === ts.SyntaxKind.ConstructorKeyword) {
            return parseExpected(ts.SyntaxKind.ConstructorKeyword);
        }
        if (token() === ts.SyntaxKind.StringLiteral && lookAhead(nextToken) === ts.SyntaxKind.OpenParenToken) {
            return tryParse(() => {
                const literalNode = parseLiteralNode();
                return literalNode.text === "constructor" ? literalNode : undefined;
            });
        }
    }

    function tryParseConstructorDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.ConstructorDeclaration | undefined {
        return tryParse(() => {
            if (parseConstructorName()) {
                const typeParameters = parseTypeParameters();
                const parameters = parseParameters(SignatureFlags.None);
                const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ false);
                const body = parseFunctionBlockOrSemicolon(SignatureFlags.None, ts.Diagnostics.or_expected);
                const node = factory.createConstructorDeclaration(modifiers, parameters, body);

                // Attach invalid nodes if they exist so that we can report them in the grammar checker.
                (node as ts.Mutable<ts.ConstructorDeclaration>).illegalDecorators = decorators;
                (node as ts.Mutable<ts.ConstructorDeclaration>).typeParameters = typeParameters;
                (node as ts.Mutable<ts.ConstructorDeclaration>).type = type;
                return withJSDoc(finishNode(node, pos), hasJSDoc);
            }
        });
    }

    function parseMethodDeclaration(
        pos: number,
        hasJSDoc: boolean,
        decorators: ts.NodeArray<ts.Decorator> | undefined,
        modifiers: ts.NodeArray<ts.Modifier> | undefined,
        asteriskToken: ts.AsteriskToken | undefined,
        name: ts.PropertyName,
        questionToken: ts.QuestionToken | undefined,
        exclamationToken: ts.ExclamationToken | undefined,
        diagnosticMessage?: ts.DiagnosticMessage
    ): ts.MethodDeclaration {
        const isGenerator = asteriskToken ? SignatureFlags.Yield : SignatureFlags.None;
        const isAsync = ts.some(modifiers, ts.isAsyncModifier) ? SignatureFlags.Await : SignatureFlags.None;
        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(isGenerator | isAsync);
        const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlockOrSemicolon(isGenerator | isAsync, diagnosticMessage);
        const node = factory.createMethodDeclaration(
            combineDecoratorsAndModifiers(decorators, modifiers),
            asteriskToken,
            name,
            questionToken,
            typeParameters,
            parameters,
            type,
            body
        );

        // An exclamation token on a method is invalid syntax and will be handled by the grammar checker
        (node as ts.Mutable<ts.MethodDeclaration>).exclamationToken = exclamationToken;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parsePropertyDeclaration(
        pos: number,
        hasJSDoc: boolean,
        decorators: ts.NodeArray<ts.Decorator> | undefined,
        modifiers: ts.NodeArray<ts.Modifier> | undefined,
        name: ts.PropertyName,
        questionToken: ts.QuestionToken | undefined
    ): ts.PropertyDeclaration {
        const exclamationToken = !questionToken && !scanner.hasPrecedingLineBreak() ? parseOptionalToken(ts.SyntaxKind.ExclamationToken) : undefined;
        const type = parseTypeAnnotation();
        const initializer = doOutsideOfContext(ts.NodeFlags.YieldContext | ts.NodeFlags.AwaitContext | ts.NodeFlags.DisallowInContext, parseInitializer);
        parseSemicolonAfterPropertyName(name, type, initializer);
        const node = factory.createPropertyDeclaration(
            combineDecoratorsAndModifiers(decorators, modifiers),
            name,
            questionToken || exclamationToken,
            type,
            initializer);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parsePropertyOrMethodDeclaration(
        pos: number,
        hasJSDoc: boolean,
        decorators: ts.NodeArray<ts.Decorator> | undefined,
        modifiers: ts.NodeArray<ts.Modifier> | undefined
    ): ts.PropertyDeclaration | ts.MethodDeclaration {
        const asteriskToken = parseOptionalToken(ts.SyntaxKind.AsteriskToken);
        const name = parsePropertyName();
        // Note: this is not legal as per the grammar.  But we allow it in the parser and
        // report an error in the grammar checker.
        const questionToken = parseOptionalToken(ts.SyntaxKind.QuestionToken);
        if (asteriskToken || token() === ts.SyntaxKind.OpenParenToken || token() === ts.SyntaxKind.LessThanToken) {
            return parseMethodDeclaration(pos, hasJSDoc, decorators, modifiers, asteriskToken, name, questionToken, /*exclamationToken*/ undefined, ts.Diagnostics.or_expected);
        }
        return parsePropertyDeclaration(pos, hasJSDoc, decorators, modifiers, name, questionToken);
    }

    function parseAccessorDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined, kind: ts.AccessorDeclaration["kind"], flags: SignatureFlags): ts.AccessorDeclaration {
        const name = parsePropertyName();
        const typeParameters = parseTypeParameters();
        const parameters = parseParameters(SignatureFlags.None);
        const type = parseReturnType(ts.SyntaxKind.ColonToken, /*isType*/ false);
        const body = parseFunctionBlockOrSemicolon(flags);
        const node = kind === ts.SyntaxKind.GetAccessor
            ? factory.createGetAccessorDeclaration(combineDecoratorsAndModifiers(decorators, modifiers), name, parameters, type, body)
            : factory.createSetAccessorDeclaration(combineDecoratorsAndModifiers(decorators, modifiers), name, parameters, body);
        // Keep track of `typeParameters` (for both) and `type` (for setters) if they were parsed those indicate grammar errors
        (node as ts.Mutable<ts.AccessorDeclaration>).typeParameters = typeParameters;
        if (ts.isSetAccessorDeclaration(node)) (node as ts.Mutable<ts.SetAccessorDeclaration>).type = type;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function isClassMemberStart(): boolean {
        let idToken: ts.SyntaxKind | undefined;

        if (token() === ts.SyntaxKind.AtToken) {
            return true;
        }

        // Eat up all modifiers, but hold on to the last one in case it is actually an identifier.
        while (ts.isModifierKind(token())) {
            idToken = token();
            // If the idToken is a class modifier (protected, private, public, and static), it is
            // certain that we are starting to parse class member. This allows better error recovery
            // Example:
            //      public foo() ...     // true
            //      public @dec blah ... // true; we will then report an error later
            //      export public ...    // true; we will then report an error later
            if (ts.isClassMemberModifier(idToken)) {
                return true;
            }

            nextToken();
        }

        if (token() === ts.SyntaxKind.AsteriskToken) {
            return true;
        }

        // Try to get the first property-like token following all modifiers.
        // This can either be an identifier or the 'get' or 'set' keywords.
        if (isLiteralPropertyName()) {
            idToken = token();
            nextToken();
        }

        // Index signatures and computed properties are class members; we can parse.
        if (token() === ts.SyntaxKind.OpenBracketToken) {
            return true;
        }

        // If we were able to get any potential identifier...
        if (idToken !== undefined) {
            // If we have a non-keyword identifier, or if we have an accessor, then it's safe to parse.
            if (!ts.isKeyword(idToken) || idToken === ts.SyntaxKind.SetKeyword || idToken === ts.SyntaxKind.GetKeyword) {
                return true;
            }

            // If it *is* a keyword, but not an accessor, check a little farther along
            // to see if it should actually be parsed as a class member.
            switch (token()) {
                case ts.SyntaxKind.OpenParenToken:     // Method declaration
                case ts.SyntaxKind.LessThanToken:      // Generic Method declaration
                case ts.SyntaxKind.ExclamationToken:   // Non-null assertion on property name
                case ts.SyntaxKind.ColonToken:         // Type Annotation for declaration
                case ts.SyntaxKind.EqualsToken:        // Initializer for declaration
                case ts.SyntaxKind.QuestionToken:      // Not valid, but permitted so that it gets caught later on.
                    return true;
                default:
                    // Covers
                    //  - Semicolons     (declaration termination)
                    //  - Closing braces (end-of-class, must be declaration)
                    //  - End-of-files   (not valid, but permitted so that it gets caught later on)
                    //  - Line-breaks    (enabling *automatic semicolon insertion*)
                    return canParseSemicolon();
            }
        }

        return false;
    }

    function parseClassStaticBlockDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.ModifiersArray | undefined): ts.ClassStaticBlockDeclaration {
        parseExpectedToken(ts.SyntaxKind.StaticKeyword);
        const body = parseClassStaticBlockBody();
        const node = withJSDoc(finishNode(factory.createClassStaticBlockDeclaration(body), pos), hasJSDoc);
        (node as ts.Mutable<ts.ClassStaticBlockDeclaration>).illegalDecorators = decorators;
        (node as ts.Mutable<ts.ClassStaticBlockDeclaration>).modifiers = modifiers;
        return node;
    }

    function parseClassStaticBlockBody() {
        const savedYieldContext = inYieldContext();
        const savedAwaitContext = inAwaitContext();

        setYieldContext(false);
        setAwaitContext(true);

        const body = parseBlock(/*ignoreMissingOpenBrace*/ false);

        setYieldContext(savedYieldContext);
        setAwaitContext(savedAwaitContext);

        return body;
    }

    function parseDecoratorExpression() {
        if (inAwaitContext() && token() === ts.SyntaxKind.AwaitKeyword) {
            // `@await` is is disallowed in an [Await] context, but can cause parsing to go off the rails
            // This simply parses the missing identifier and moves on.
            const pos = getNodePos();
            const awaitExpression = parseIdentifier(ts.Diagnostics.Expression_expected);
            nextToken();
            const memberExpression = parseMemberExpressionRest(pos, awaitExpression, /*allowOptionalChain*/ true);
            return parseCallExpressionRest(pos, memberExpression);
        }
        return parseLeftHandSideExpressionOrHigher();
    }

    function tryParseDecorator(): ts.Decorator | undefined {
        const pos = getNodePos();
        if (!parseOptional(ts.SyntaxKind.AtToken)) {
            return undefined;
        }
        const expression = doInDecoratorContext(parseDecoratorExpression);
        return finishNode(factory.createDecorator(expression), pos);
    }

    function parseDecorators(): ts.NodeArray<ts.Decorator> | undefined {
        const pos = getNodePos();
        let list, decorator;
        while (decorator = tryParseDecorator()) {
            list = ts.append(list, decorator);
        }
        return list && createNodeArray(list, pos);
    }

    function tryParseModifier(permitInvalidConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean, hasSeenStaticModifier?: boolean): ts.Modifier | undefined {
        const pos = getNodePos();
        const kind = token();

        if (token() === ts.SyntaxKind.ConstKeyword && permitInvalidConstAsModifier) {
            // We need to ensure that any subsequent modifiers appear on the same line
            // so that when 'const' is a standalone declaration, we don't issue an error.
            if (!tryParse(nextTokenIsOnSameLineAndCanFollowModifier)) {
                return undefined;
            }
        }
        else if (stopOnStartOfClassStaticBlock && token() === ts.SyntaxKind.StaticKeyword && lookAhead(nextTokenIsOpenBrace)) {
            return undefined;
        }
        else if (hasSeenStaticModifier && token() === ts.SyntaxKind.StaticKeyword) {
            return undefined;
        }
        else {
            if (!parseAnyContextualModifier()) {
                return undefined;
            }
        }

        return finishNode(factory.createToken(kind as ts.Modifier["kind"]), pos);
    }

    function combineDecoratorsAndModifiers(decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.NodeArray<ts.ModifierLike> | undefined {
        if (!decorators) return modifiers;
        if (!modifiers) return decorators;
        const decoratorsAndModifiers = factory.createNodeArray(ts.concatenate<ts.ModifierLike>(decorators, modifiers));
        ts.setTextRangePosEnd(decoratorsAndModifiers, decorators.pos, modifiers.end);
        return decoratorsAndModifiers;
    }

    /*
     * There are situations in which a modifier like 'const' will appear unexpectedly, such as on a class member.
     * In those situations, if we are entirely sure that 'const' is not valid on its own (such as when ASI takes effect
     * and turns it into a standalone declaration), then it is better to parse it and report an error later.
     *
     * In such situations, 'permitInvalidConstAsModifier' should be set to true.
     */
    function parseModifiers(permitInvalidConstAsModifier?: boolean, stopOnStartOfClassStaticBlock?: boolean): ts.NodeArray<ts.Modifier> | undefined {
        const pos = getNodePos();
        let list, modifier, hasSeenStatic = false;
        while (modifier = tryParseModifier(permitInvalidConstAsModifier, stopOnStartOfClassStaticBlock, hasSeenStatic)) {
            if (modifier.kind === ts.SyntaxKind.StaticKeyword) hasSeenStatic = true;
            list = ts.append(list, modifier);
        }
        return list && createNodeArray(list, pos);
    }

    function parseModifiersForArrowFunction(): ts.NodeArray<ts.Modifier> | undefined {
        let modifiers: ts.NodeArray<ts.Modifier> | undefined;
        if (token() === ts.SyntaxKind.AsyncKeyword) {
            const pos = getNodePos();
            nextToken();
            const modifier = finishNode(factory.createToken(ts.SyntaxKind.AsyncKeyword), pos);
            modifiers = createNodeArray<ts.Modifier>([modifier], pos);
        }
        return modifiers;
    }

    function parseClassElement(): ts.ClassElement {
        const pos = getNodePos();
        if (token() === ts.SyntaxKind.SemicolonToken) {
            nextToken();
            return finishNode(factory.createSemicolonClassElement(), pos);
        }

        const hasJSDoc = hasPrecedingJSDocComment();
        const decorators = parseDecorators();
        const modifiers = parseModifiers(/*permitInvalidConstAsModifier*/ true, /*stopOnStartOfClassStaticBlock*/ true);
        if (token() === ts.SyntaxKind.StaticKeyword && lookAhead(nextTokenIsOpenBrace)) {
            return parseClassStaticBlockDeclaration(pos, hasJSDoc, decorators, modifiers);
        }

        if (parseContextualModifier(ts.SyntaxKind.GetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, decorators, modifiers, ts.SyntaxKind.GetAccessor, SignatureFlags.None);
        }

        if (parseContextualModifier(ts.SyntaxKind.SetKeyword)) {
            return parseAccessorDeclaration(pos, hasJSDoc, decorators, modifiers, ts.SyntaxKind.SetAccessor, SignatureFlags.None);
        }

        if (token() === ts.SyntaxKind.ConstructorKeyword || token() === ts.SyntaxKind.StringLiteral) {
            const constructorDeclaration = tryParseConstructorDeclaration(pos, hasJSDoc, decorators, modifiers);
            if (constructorDeclaration) {
                return constructorDeclaration;
            }
        }

        if (isIndexSignature()) {
            return parseIndexSignatureDeclaration(pos, hasJSDoc, decorators, modifiers);
        }

        // It is very important that we check this *after* checking indexers because
        // the [ token can start an index signature or a computed property name
        if (ts.tokenIsIdentifierOrKeyword(token()) ||
            token() === ts.SyntaxKind.StringLiteral ||
            token() === ts.SyntaxKind.NumericLiteral ||
            token() === ts.SyntaxKind.AsteriskToken ||
            token() === ts.SyntaxKind.OpenBracketToken) {
            const isAmbient = ts.some(modifiers, isDeclareModifier);
            if (isAmbient) {
                for (const m of modifiers!) {
                    (m as ts.Mutable<ts.Node>).flags |= ts.NodeFlags.Ambient;
                }
                return doInsideOfContext(ts.NodeFlags.Ambient, () => parsePropertyOrMethodDeclaration(pos, hasJSDoc, decorators, modifiers));
            }
            else {
                return parsePropertyOrMethodDeclaration(pos, hasJSDoc, decorators, modifiers);
            }
        }

        if (decorators || modifiers) {
            // treat this as a property declaration with a missing name.
            const name = createMissingNode<ts.Identifier>(ts.SyntaxKind.Identifier, /*reportAtCurrentPosition*/ true, ts.Diagnostics.Declaration_expected);
            return parsePropertyDeclaration(pos, hasJSDoc, decorators, modifiers, name, /*questionToken*/ undefined);
        }

        // 'isClassMemberStart' should have hinted not to attempt parsing.
        return ts.Debug.fail("Should not have attempted to parse class member declaration.");
    }

    function parseClassExpression(): ts.ClassExpression {
        return parseClassDeclarationOrExpression(getNodePos(), hasPrecedingJSDocComment(), /*decorators*/ undefined, /*modifiers*/ undefined, ts.SyntaxKind.ClassExpression) as ts.ClassExpression;
    }

    function parseClassDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.ClassDeclaration {
        return parseClassDeclarationOrExpression(pos, hasJSDoc, decorators, modifiers, ts.SyntaxKind.ClassDeclaration) as ts.ClassDeclaration;
    }

    function parseClassDeclarationOrExpression(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined, kind: ts.ClassLikeDeclaration["kind"]): ts.ClassLikeDeclaration {
        const savedAwaitContext = inAwaitContext();
        parseExpected(ts.SyntaxKind.ClassKeyword);

        // We don't parse the name here in await context, instead we will report a grammar error in the checker.
        const name = parseNameOfClassDeclarationOrExpression();
        const typeParameters = parseTypeParameters();
        if (ts.some(modifiers, ts.isExportModifier)) setAwaitContext(/*value*/ true);
        const heritageClauses = parseHeritageClauses();

        let members;
        if (parseExpected(ts.SyntaxKind.OpenBraceToken)) {
            // ClassTail[Yield,Await] : (Modified) See 14.5
            //      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }
            members = parseClassMembers();
            parseExpected(ts.SyntaxKind.CloseBraceToken);
        }
        else {
            members = createMissingList<ts.ClassElement>();
        }
        setAwaitContext(savedAwaitContext);
        const node = kind === ts.SyntaxKind.ClassDeclaration
            ? factory.createClassDeclaration(combineDecoratorsAndModifiers(decorators, modifiers), name, typeParameters, heritageClauses, members)
            : factory.createClassExpression(combineDecoratorsAndModifiers(decorators, modifiers), name, typeParameters, heritageClauses, members);
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseNameOfClassDeclarationOrExpression(): ts.Identifier | undefined {
        // implements is a future reserved word so
        // 'class implements' might mean either
        // - class expression with omitted name, 'implements' starts heritage clause
        // - class with name 'implements'
        // 'isImplementsClause' helps to disambiguate between these two cases
        return isBindingIdentifier() && !isImplementsClause()
            ? createIdentifier(isBindingIdentifier())
            : undefined;
    }

    function isImplementsClause() {
        return token() === ts.SyntaxKind.ImplementsKeyword && lookAhead(nextTokenIsIdentifierOrKeyword);
    }

    function parseHeritageClauses(): ts.NodeArray<ts.HeritageClause> | undefined {
        // ClassTail[Yield,Await] : (Modified) See 14.5
        //      ClassHeritage[?Yield,?Await]opt { ClassBody[?Yield,?Await]opt }

        if (isHeritageClause()) {
            return parseList(ParsingContext.HeritageClauses, parseHeritageClause);
        }

        return undefined;
    }

    function parseHeritageClause(): ts.HeritageClause {
        const pos = getNodePos();
        const tok = token();
        ts.Debug.assert(tok === ts.SyntaxKind.ExtendsKeyword || tok === ts.SyntaxKind.ImplementsKeyword); // isListElement() should ensure this.
        nextToken();
        const types = parseDelimitedList(ParsingContext.HeritageClauseElement, parseExpressionWithTypeArguments);
        return finishNode(factory.createHeritageClause(tok, types), pos);
    }

    function parseExpressionWithTypeArguments(): ts.ExpressionWithTypeArguments {
        const pos = getNodePos();
        const expression = parseLeftHandSideExpressionOrHigher();
        if (expression.kind === ts.SyntaxKind.ExpressionWithTypeArguments) {
            return expression as ts.ExpressionWithTypeArguments;
        }
        const typeArguments = tryParseTypeArguments();
        return finishNode(factory.createExpressionWithTypeArguments(expression, typeArguments), pos);
    }

    function tryParseTypeArguments(): ts.NodeArray<ts.TypeNode> | undefined {
        return token() === ts.SyntaxKind.LessThanToken ?
            parseBracketedList(ParsingContext.TypeArguments, parseType, ts.SyntaxKind.LessThanToken, ts.SyntaxKind.GreaterThanToken) : undefined;
    }

    function isHeritageClause(): boolean {
        return token() === ts.SyntaxKind.ExtendsKeyword || token() === ts.SyntaxKind.ImplementsKeyword;
    }

    function parseClassMembers(): ts.NodeArray<ts.ClassElement> {
        return parseList(ParsingContext.ClassMembers, parseClassElement);
    }

    function parseInterfaceDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.InterfaceDeclaration {
        parseExpected(ts.SyntaxKind.InterfaceKeyword);
        const name = parseIdentifier();
        const typeParameters = parseTypeParameters();
        const heritageClauses = parseHeritageClauses();
        const members = parseObjectTypeMembers();
        const node = factory.createInterfaceDeclaration(modifiers, name, typeParameters, heritageClauses, members);
        (node as ts.Mutable<ts.InterfaceDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseTypeAliasDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.TypeAliasDeclaration {
        parseExpected(ts.SyntaxKind.TypeKeyword);
        const name = parseIdentifier();
        const typeParameters = parseTypeParameters();
        parseExpected(ts.SyntaxKind.EqualsToken);
        const type = token() === ts.SyntaxKind.IntrinsicKeyword && tryParse(parseKeywordAndNoDot) || parseType();
        parseSemicolon();
        const node = factory.createTypeAliasDeclaration(modifiers, name, typeParameters, type);
        (node as ts.Mutable<ts.TypeAliasDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    // In an ambient declaration, the grammar only allows integer literals as initializers.
    // In a non-ambient declaration, the grammar allows uninitialized members only in a
    // ConstantEnumMemberSection, which starts at the beginning of an enum declaration
    // or any time an integer literal initializer is encountered.
    function parseEnumMember(): ts.EnumMember {
        const pos = getNodePos();
        const hasJSDoc = hasPrecedingJSDocComment();
        const name = parsePropertyName();
        const initializer = allowInAnd(parseInitializer);
        return withJSDoc(finishNode(factory.createEnumMember(name, initializer), pos), hasJSDoc);
    }

    function parseEnumDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.EnumDeclaration {
        parseExpected(ts.SyntaxKind.EnumKeyword);
        const name = parseIdentifier();
        let members;
        if (parseExpected(ts.SyntaxKind.OpenBraceToken)) {
            members = doOutsideOfYieldAndAwaitContext(() => parseDelimitedList(ParsingContext.EnumMembers, parseEnumMember));
            parseExpected(ts.SyntaxKind.CloseBraceToken);
        }
        else {
            members = createMissingList<ts.EnumMember>();
        }
        const node = factory.createEnumDeclaration(modifiers, name, members);
        (node as ts.Mutable<ts.EnumDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseModuleBlock(): ts.ModuleBlock {
        const pos = getNodePos();
        let statements;
        if (parseExpected(ts.SyntaxKind.OpenBraceToken)) {
            statements = parseList(ParsingContext.BlockStatements, parseStatement);
            parseExpected(ts.SyntaxKind.CloseBraceToken);
        }
        else {
            statements = createMissingList<ts.Statement>();
        }
        return finishNode(factory.createModuleBlock(statements), pos);
    }

    function parseModuleOrNamespaceDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined, flags: ts.NodeFlags): ts.ModuleDeclaration {
        // If we are parsing a dotted namespace name, we want to
        // propagate the 'Namespace' flag across the names if set.
        const namespaceFlag = flags & ts.NodeFlags.Namespace;
        const name = parseIdentifier();
        const body = parseOptional(ts.SyntaxKind.DotToken)
            ? parseModuleOrNamespaceDeclaration(getNodePos(), /*hasJSDoc*/ false, /*decorators*/ undefined, /*modifiers*/ undefined, ts.NodeFlags.NestedNamespace | namespaceFlag) as ts.NamespaceDeclaration
            : parseModuleBlock();
        const node = factory.createModuleDeclaration(modifiers, name, body, flags);
        (node as ts.Mutable<ts.ModuleDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseAmbientExternalModuleDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.ModuleDeclaration {
        let flags: ts.NodeFlags = 0;
        let name;
        if (token() === ts.SyntaxKind.GlobalKeyword) {
            // parse 'global' as name of global scope augmentation
            name = parseIdentifier();
            flags |= ts.NodeFlags.GlobalAugmentation;
        }
        else {
            name = parseLiteralNode() as ts.StringLiteral;
            name.text = internIdentifier(name.text);
        }
        let body: ts.ModuleBlock | undefined;
        if (token() === ts.SyntaxKind.OpenBraceToken) {
            body = parseModuleBlock();
        }
        else {
            parseSemicolon();
        }
        const node = factory.createModuleDeclaration(modifiers, name, body, flags);
        (node as ts.Mutable<ts.ModuleDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseModuleDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.ModuleDeclaration {
        let flags: ts.NodeFlags = 0;
        if (token() === ts.SyntaxKind.GlobalKeyword) {
            // global augmentation
            return parseAmbientExternalModuleDeclaration(pos, hasJSDoc, decorators, modifiers);
        }
        else if (parseOptional(ts.SyntaxKind.NamespaceKeyword)) {
            flags |= ts.NodeFlags.Namespace;
        }
        else {
            parseExpected(ts.SyntaxKind.ModuleKeyword);
            if (token() === ts.SyntaxKind.StringLiteral) {
                return parseAmbientExternalModuleDeclaration(pos, hasJSDoc, decorators, modifiers);
            }
        }
        return parseModuleOrNamespaceDeclaration(pos, hasJSDoc, decorators, modifiers, flags);
    }

    function isExternalModuleReference() {
        return token() === ts.SyntaxKind.RequireKeyword &&
            lookAhead(nextTokenIsOpenParen);
    }

    function nextTokenIsOpenParen() {
        return nextToken() === ts.SyntaxKind.OpenParenToken;
    }

    function nextTokenIsOpenBrace() {
        return nextToken() === ts.SyntaxKind.OpenBraceToken;
    }

    function nextTokenIsSlash() {
        return nextToken() === ts.SyntaxKind.SlashToken;
    }

    function parseNamespaceExportDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.NamespaceExportDeclaration {
        parseExpected(ts.SyntaxKind.AsKeyword);
        parseExpected(ts.SyntaxKind.NamespaceKeyword);
        const name = parseIdentifier();
        parseSemicolon();
        const node = factory.createNamespaceExportDeclaration(name);
        // NamespaceExportDeclaration nodes cannot have decorators or modifiers, so we attach them here so we can report them in the grammar checker
        (node as ts.Mutable<ts.NamespaceExportDeclaration>).illegalDecorators = decorators;
        (node as ts.Mutable<ts.NamespaceExportDeclaration>).modifiers = modifiers;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseImportDeclarationOrImportEqualsDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.ImportEqualsDeclaration | ts.ImportDeclaration {
        parseExpected(ts.SyntaxKind.ImportKeyword);

        const afterImportPos = scanner.getStartPos();

        // We don't parse the identifier here in await context, instead we will report a grammar error in the checker.
        let identifier: ts.Identifier | undefined;
        if (isIdentifier()) {
            identifier = parseIdentifier();
        }

        let isTypeOnly = false;
        if (token() !== ts.SyntaxKind.FromKeyword &&
            identifier?.escapedText === "type" &&
            (isIdentifier() || tokenAfterImportDefinitelyProducesImportDeclaration())
        ) {
            isTypeOnly = true;
            identifier = isIdentifier() ? parseIdentifier() : undefined;
        }

        if (identifier && !tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration()) {
            return parseImportEqualsDeclaration(pos, hasJSDoc, decorators, modifiers, identifier, isTypeOnly);
        }

        // ImportDeclaration:
        //  import ImportClause from ModuleSpecifier ;
        //  import ModuleSpecifier;
        let importClause: ts.ImportClause | undefined;
        if (identifier || // import id
            token() === ts.SyntaxKind.AsteriskToken || // import *
            token() === ts.SyntaxKind.OpenBraceToken    // import {
        ) {
            importClause = parseImportClause(identifier, afterImportPos, isTypeOnly);
            parseExpected(ts.SyntaxKind.FromKeyword);
        }
        const moduleSpecifier = parseModuleSpecifier();

        let assertClause: ts.AssertClause | undefined;
        if (token() === ts.SyntaxKind.AssertKeyword && !scanner.hasPrecedingLineBreak()) {
            assertClause = parseAssertClause();
        }

        parseSemicolon();
        const node = factory.createImportDeclaration(modifiers, importClause, moduleSpecifier, assertClause);
        (node as ts.Mutable<ts.ImportDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseAssertEntry() {
        const pos = getNodePos();
        const name = ts.tokenIsIdentifierOrKeyword(token()) ? parseIdentifierName() : parseLiteralLikeNode(ts.SyntaxKind.StringLiteral) as ts.StringLiteral;
        parseExpected(ts.SyntaxKind.ColonToken);
        const value = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        return finishNode(factory.createAssertEntry(name, value), pos);
    }

    function parseAssertClause(skipAssertKeyword?: true) {
        const pos = getNodePos();
        if (!skipAssertKeyword) {
            parseExpected(ts.SyntaxKind.AssertKeyword);
        }
        const openBracePosition = scanner.getTokenPos();
        if (parseExpected(ts.SyntaxKind.OpenBraceToken)) {
            const multiLine = scanner.hasPrecedingLineBreak();
            const elements = parseDelimitedList(ParsingContext.AssertEntries, parseAssertEntry, /*considerSemicolonAsDelimiter*/ true);
            if (!parseExpected(ts.SyntaxKind.CloseBraceToken)) {
                const lastError = ts.lastOrUndefined(parseDiagnostics);
                if (lastError && lastError.code === ts.Diagnostics._0_expected.code) {
                    ts.addRelatedInfo(
                        lastError,
                        ts.createDetachedDiagnostic(fileName, openBracePosition, 1, ts.Diagnostics.The_parser_expected_to_find_a_1_to_match_the_0_token_here, "{", "}")
                    );
                }
            }
            return finishNode(factory.createAssertClause(elements, multiLine), pos);
        }
        else {
            const elements = createNodeArray([], getNodePos(), /*end*/ undefined, /*hasTrailingComma*/ false);
            return finishNode(factory.createAssertClause(elements, /*multiLine*/ false), pos);
        }
    }

    function tokenAfterImportDefinitelyProducesImportDeclaration() {
        return token() === ts.SyntaxKind.AsteriskToken || token() === ts.SyntaxKind.OpenBraceToken;
    }

    function tokenAfterImportedIdentifierDefinitelyProducesImportDeclaration() {
        // In `import id ___`, the current token decides whether to produce
        // an ImportDeclaration or ImportEqualsDeclaration.
        return token() === ts.SyntaxKind.CommaToken || token() === ts.SyntaxKind.FromKeyword;
    }

    function parseImportEqualsDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined, identifier: ts.Identifier, isTypeOnly: boolean): ts.ImportEqualsDeclaration {
        parseExpected(ts.SyntaxKind.EqualsToken);
        const moduleReference = parseModuleReference();
        parseSemicolon();
        const node = factory.createImportEqualsDeclaration(modifiers, isTypeOnly, identifier, moduleReference);
        (node as ts.Mutable<ts.ImportEqualsDeclaration>).illegalDecorators = decorators;
        const finished = withJSDoc(finishNode(node, pos), hasJSDoc);
        return finished;
    }

    function parseImportClause(identifier: ts.Identifier | undefined, pos: number, isTypeOnly: boolean) {
        // ImportClause:
        //  ImportedDefaultBinding
        //  NameSpaceImport
        //  NamedImports
        //  ImportedDefaultBinding, NameSpaceImport
        //  ImportedDefaultBinding, NamedImports

        // If there was no default import or if there is comma token after default import
        // parse namespace or named imports
        let namedBindings: ts.NamespaceImport | ts.NamedImports | undefined;
        if (!identifier ||
            parseOptional(ts.SyntaxKind.CommaToken)) {
            namedBindings = token() === ts.SyntaxKind.AsteriskToken ? parseNamespaceImport() : parseNamedImportsOrExports(ts.SyntaxKind.NamedImports);
        }

        return finishNode(factory.createImportClause(isTypeOnly, identifier, namedBindings), pos);
    }

    function parseModuleReference() {
        return isExternalModuleReference()
            ? parseExternalModuleReference()
            : parseEntityName(/*allowReservedWords*/ false);
    }

    function parseExternalModuleReference() {
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.RequireKeyword);
        parseExpected(ts.SyntaxKind.OpenParenToken);
        const expression = parseModuleSpecifier();
        parseExpected(ts.SyntaxKind.CloseParenToken);
        return finishNode(factory.createExternalModuleReference(expression), pos);
    }

    function parseModuleSpecifier(): ts.Expression {
        if (token() === ts.SyntaxKind.StringLiteral) {
            const result = parseLiteralNode();
            result.text = internIdentifier(result.text);
            return result;
        }
        else {
            // We allow arbitrary expressions here, even though the grammar only allows string
            // literals.  We check to ensure that it is only a string literal later in the grammar
            // check pass.
            return parseExpression();
        }
    }

    function parseNamespaceImport(): ts.NamespaceImport {
        // NameSpaceImport:
        //  * as ImportedBinding
        const pos = getNodePos();
        parseExpected(ts.SyntaxKind.AsteriskToken);
        parseExpected(ts.SyntaxKind.AsKeyword);
        const name = parseIdentifier();
        return finishNode(factory.createNamespaceImport(name), pos);
    }

    function parseNamedImportsOrExports(kind: ts.SyntaxKind.NamedImports): ts.NamedImports;
    function parseNamedImportsOrExports(kind: ts.SyntaxKind.NamedExports): ts.NamedExports;
    function parseNamedImportsOrExports(kind: ts.SyntaxKind): ts.NamedImportsOrExports {
        const pos = getNodePos();

        // NamedImports:
        //  { }
        //  { ImportsList }
        //  { ImportsList, }

        // ImportsList:
        //  ImportSpecifier
        //  ImportsList, ImportSpecifier
        const node = kind === ts.SyntaxKind.NamedImports
            ? factory.createNamedImports(parseBracketedList(ParsingContext.ImportOrExportSpecifiers, parseImportSpecifier, ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken))
            : factory.createNamedExports(parseBracketedList(ParsingContext.ImportOrExportSpecifiers, parseExportSpecifier, ts.SyntaxKind.OpenBraceToken, ts.SyntaxKind.CloseBraceToken));
        return finishNode(node, pos);
    }

    function parseExportSpecifier() {
        const hasJSDoc = hasPrecedingJSDocComment();
        return withJSDoc(parseImportOrExportSpecifier(ts.SyntaxKind.ExportSpecifier) as ts.ExportSpecifier, hasJSDoc);
    }

    function parseImportSpecifier() {
        return parseImportOrExportSpecifier(ts.SyntaxKind.ImportSpecifier) as ts.ImportSpecifier;
    }

    function parseImportOrExportSpecifier(kind: ts.SyntaxKind): ts.ImportOrExportSpecifier {
        const pos = getNodePos();
        // ImportSpecifier:
        //   BindingIdentifier
        //   IdentifierName as BindingIdentifier
        // ExportSpecifier:
        //   IdentifierName
        //   IdentifierName as IdentifierName
        let checkIdentifierIsKeyword = ts.isKeyword(token()) && !isIdentifier();
        let checkIdentifierStart = scanner.getTokenPos();
        let checkIdentifierEnd = scanner.getTextPos();
        let isTypeOnly = false;
        let propertyName: ts.Identifier | undefined;
        let canParseAsKeyword = true;
        let name = parseIdentifierName();
        if (name.escapedText === "type") {
            // If the first token of an import specifier is 'type', there are a lot of possibilities,
            // especially if we see 'as' afterwards:
            //
            // import { type } from "mod";          - isTypeOnly: false,   name: type
            // import { type as } from "mod";       - isTypeOnly: true,    name: as
            // import { type as as } from "mod";    - isTypeOnly: false,   name: as,    propertyName: type
            // import { type as as as } from "mod"; - isTypeOnly: true,    name: as,    propertyName: as
            if (token() === ts.SyntaxKind.AsKeyword) {
                // { type as ...? }
                const firstAs = parseIdentifierName();
                if (token() === ts.SyntaxKind.AsKeyword) {
                    // { type as as ...? }
                    const secondAs = parseIdentifierName();
                    if (ts.tokenIsIdentifierOrKeyword(token())) {
                        // { type as as something }
                        isTypeOnly = true;
                        propertyName = firstAs;
                        name = parseNameWithKeywordCheck();
                        canParseAsKeyword = false;
                    }
                    else {
                        // { type as as }
                        propertyName = name;
                        name = secondAs;
                        canParseAsKeyword = false;
                    }
                }
                else if (ts.tokenIsIdentifierOrKeyword(token())) {
                    // { type as something }
                    propertyName = name;
                    canParseAsKeyword = false;
                    name = parseNameWithKeywordCheck();
                }
                else {
                    // { type as }
                    isTypeOnly = true;
                    name = firstAs;
                }
            }
            else if (ts.tokenIsIdentifierOrKeyword(token())) {
                // { type something ...? }
                isTypeOnly = true;
                name = parseNameWithKeywordCheck();
            }
        }

        if (canParseAsKeyword && token() === ts.SyntaxKind.AsKeyword) {
            propertyName = name;
            parseExpected(ts.SyntaxKind.AsKeyword);
            name = parseNameWithKeywordCheck();
        }
        if (kind === ts.SyntaxKind.ImportSpecifier && checkIdentifierIsKeyword) {
            parseErrorAt(checkIdentifierStart, checkIdentifierEnd, ts.Diagnostics.Identifier_expected);
        }
        const node = kind === ts.SyntaxKind.ImportSpecifier
            ? factory.createImportSpecifier(isTypeOnly, propertyName, name)
            : factory.createExportSpecifier(isTypeOnly, propertyName, name);
        return finishNode(node, pos);

        function parseNameWithKeywordCheck() {
            checkIdentifierIsKeyword = ts.isKeyword(token()) && !isIdentifier();
            checkIdentifierStart = scanner.getTokenPos();
            checkIdentifierEnd = scanner.getTextPos();
            return parseIdentifierName();
        }
    }

    function parseNamespaceExport(pos: number): ts.NamespaceExport {
        return finishNode(factory.createNamespaceExport(parseIdentifierName()), pos);
    }

    function parseExportDeclaration(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.ExportDeclaration {
        const savedAwaitContext = inAwaitContext();
        setAwaitContext(/*value*/ true);
        let exportClause: ts.NamedExportBindings | undefined;
        let moduleSpecifier: ts.Expression | undefined;
        let assertClause: ts.AssertClause | undefined;
        const isTypeOnly = parseOptional(ts.SyntaxKind.TypeKeyword);
        const namespaceExportPos = getNodePos();
        if (parseOptional(ts.SyntaxKind.AsteriskToken)) {
            if (parseOptional(ts.SyntaxKind.AsKeyword)) {
                exportClause = parseNamespaceExport(namespaceExportPos);
            }
            parseExpected(ts.SyntaxKind.FromKeyword);
            moduleSpecifier = parseModuleSpecifier();
        }
        else {
            exportClause = parseNamedImportsOrExports(ts.SyntaxKind.NamedExports);
            // It is not uncommon to accidentally omit the 'from' keyword. Additionally, in editing scenarios,
            // the 'from' keyword can be parsed as a named export when the export clause is unterminated (i.e. `export { from "moduleName";`)
            // If we don't have a 'from' keyword, see if we have a string literal such that ASI won't take effect.
            if (token() === ts.SyntaxKind.FromKeyword || (token() === ts.SyntaxKind.StringLiteral && !scanner.hasPrecedingLineBreak())) {
                parseExpected(ts.SyntaxKind.FromKeyword);
                moduleSpecifier = parseModuleSpecifier();
            }
        }
        if (moduleSpecifier && token() === ts.SyntaxKind.AssertKeyword && !scanner.hasPrecedingLineBreak()) {
            assertClause = parseAssertClause();
        }
        parseSemicolon();
        setAwaitContext(savedAwaitContext);
        const node = factory.createExportDeclaration(modifiers, isTypeOnly, exportClause, moduleSpecifier, assertClause);
        (node as ts.Mutable<ts.ExportDeclaration>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    function parseExportAssignment(pos: number, hasJSDoc: boolean, decorators: ts.NodeArray<ts.Decorator> | undefined, modifiers: ts.NodeArray<ts.Modifier> | undefined): ts.ExportAssignment {
        const savedAwaitContext = inAwaitContext();
        setAwaitContext(/*value*/ true);
        let isExportEquals: boolean | undefined;
        if (parseOptional(ts.SyntaxKind.EqualsToken)) {
            isExportEquals = true;
        }
        else {
            parseExpected(ts.SyntaxKind.DefaultKeyword);
        }
        const expression = parseAssignmentExpressionOrHigher(/*allowReturnTypeInArrowFunction*/ true);
        parseSemicolon();
        setAwaitContext(savedAwaitContext);
        const node = factory.createExportAssignment(modifiers, isExportEquals, expression);
        (node as ts.Mutable<ts.ExportAssignment>).illegalDecorators = decorators;
        return withJSDoc(finishNode(node, pos), hasJSDoc);
    }

    const enum ParsingContext {
        SourceElements,            // Elements in source file
        BlockStatements,           // Statements in block
        SwitchClauses,             // Clauses in switch statement
        SwitchClauseStatements,    // Statements in switch clause
        TypeMembers,               // Members in interface or type literal
        ClassMembers,              // Members in class declaration
        EnumMembers,               // Members in enum declaration
        HeritageClauseElement,     // Elements in a heritage clause
        VariableDeclarations,      // Variable declarations in variable statement
        ObjectBindingElements,     // Binding elements in object binding list
        ArrayBindingElements,      // Binding elements in array binding list
        ArgumentExpressions,       // Expressions in argument list
        ObjectLiteralMembers,      // Members in object literal
        JsxAttributes,             // Attributes in jsx element
        JsxChildren,               // Things between opening and closing JSX tags
        ArrayLiteralMembers,       // Members in array literal
        Parameters,                // Parameters in parameter list
        JSDocParameters,           // JSDoc parameters in parameter list of JSDoc function type
        RestProperties,            // Property names in a rest type list
        TypeParameters,            // Type parameters in type parameter list
        TypeArguments,             // Type arguments in type argument list
        TupleElementTypes,         // Element types in tuple element type list
        HeritageClauses,           // Heritage clauses for a class or interface declaration.
        ImportOrExportSpecifiers,  // Named import clause's import specifier list,
        AssertEntries,               // Import entries list.
        Count                      // Number of parsing contexts
    }

    const enum Tristate {
        False,
        True,
        Unknown
    }

    export namespace JSDocParser {
        export function parseJSDocTypeExpressionForTests(content: string, start: number | undefined, length: number | undefined): { jsDocTypeExpression: ts.JSDocTypeExpression, diagnostics: ts.Diagnostic[] } | undefined {
            initializeState("file.js", content, ts.ScriptTarget.Latest, /*_syntaxCursor:*/ undefined, ts.ScriptKind.JS);
            scanner.setText(content, start, length);
            currentToken = scanner.scan();
            const jsDocTypeExpression = parseJSDocTypeExpression();

            const sourceFile = createSourceFile("file.js", ts.ScriptTarget.Latest, ts.ScriptKind.JS, /*isDeclarationFile*/ false, [], factory.createToken(ts.SyntaxKind.EndOfFileToken), ts.NodeFlags.None, ts.noop);
            const diagnostics = ts.attachFileToDiagnostics(parseDiagnostics, sourceFile);
            if (jsDocDiagnostics) {
                sourceFile.jsDocDiagnostics = ts.attachFileToDiagnostics(jsDocDiagnostics, sourceFile);
            }

            clearState();

            return jsDocTypeExpression ? { jsDocTypeExpression, diagnostics } : undefined;
        }

        // Parses out a JSDoc type expression.
        export function parseJSDocTypeExpression(mayOmitBraces?: boolean): ts.JSDocTypeExpression {
            const pos = getNodePos();
            const hasBrace = (mayOmitBraces ? parseOptional : parseExpected)(ts.SyntaxKind.OpenBraceToken);
            const type = doInsideOfContext(ts.NodeFlags.JSDoc, parseJSDocType);
            if (!mayOmitBraces || hasBrace) {
                parseExpectedJSDoc(ts.SyntaxKind.CloseBraceToken);
            }

            const result = factory.createJSDocTypeExpression(type);
            fixupParentReferences(result);
            return finishNode(result, pos);
        }

        export function parseJSDocNameReference(): ts.JSDocNameReference {
            const pos = getNodePos();
            const hasBrace = parseOptional(ts.SyntaxKind.OpenBraceToken);
            const p2 = getNodePos();
            let entityName: ts.EntityName | ts.JSDocMemberName = parseEntityName(/* allowReservedWords*/ false);
            while (token() === ts.SyntaxKind.PrivateIdentifier) {
                reScanHashToken(); // rescan #id as # id
                nextTokenJSDoc(); // then skip the #
                entityName = finishNode(factory.createJSDocMemberName(entityName, parseIdentifier()), p2);
            }
            if (hasBrace) {
                parseExpectedJSDoc(ts.SyntaxKind.CloseBraceToken);
            }

            const result = factory.createJSDocNameReference(entityName);
            fixupParentReferences(result);
            return finishNode(result, pos);
        }

        export function parseIsolatedJSDocComment(content: string, start: number | undefined, length: number | undefined): { jsDoc: ts.JSDoc, diagnostics: ts.Diagnostic[] } | undefined {
            initializeState("", content, ts.ScriptTarget.Latest, /*_syntaxCursor:*/ undefined, ts.ScriptKind.JS);
            const jsDoc = doInsideOfContext(ts.NodeFlags.JSDoc, () => parseJSDocCommentWorker(start, length));

            const sourceFile = { languageVariant: ts.LanguageVariant.Standard, text: content } as ts.SourceFile;
            const diagnostics = ts.attachFileToDiagnostics(parseDiagnostics, sourceFile);
            clearState();

            return jsDoc ? { jsDoc, diagnostics } : undefined;
        }

        export function parseJSDocComment(parent: ts.HasJSDoc, start: number, length: number): ts.JSDoc | undefined {
            const saveToken = currentToken;
            const saveParseDiagnosticsLength = parseDiagnostics.length;
            const saveParseErrorBeforeNextFinishedNode = parseErrorBeforeNextFinishedNode;

            const comment = doInsideOfContext(ts.NodeFlags.JSDoc, () => parseJSDocCommentWorker(start, length));
            ts.setParent(comment, parent);

            if (contextFlags & ts.NodeFlags.JavaScriptFile) {
                if (!jsDocDiagnostics) {
                    jsDocDiagnostics = [];
                }
                jsDocDiagnostics.push(...parseDiagnostics);
            }
            currentToken = saveToken;
            parseDiagnostics.length = saveParseDiagnosticsLength;
            parseErrorBeforeNextFinishedNode = saveParseErrorBeforeNextFinishedNode;
            return comment;
        }

        const enum JSDocState {
            BeginningOfLine,
            SawAsterisk,
            SavingComments,
            SavingBackticks, // NOTE: Only used when parsing tag comments
        }

        const enum PropertyLikeParse {
            Property = 1 << 0,
            Parameter = 1 << 1,
            CallbackParameter = 1 << 2,
        }

        function parseJSDocCommentWorker(start = 0, length: number | undefined): ts.JSDoc | undefined {
            const content = sourceText;
            const end = length === undefined ? content.length : start + length;
            length = end - start;

            ts.Debug.assert(start >= 0);
            ts.Debug.assert(start <= end);
            ts.Debug.assert(end <= content.length);

            // Check for /** (JSDoc opening part)
            if (!isJSDocLikeText(content, start)) {
                return undefined;
            }

            let tags: ts.JSDocTag[];
            let tagsPos: number;
            let tagsEnd: number;
            let linkEnd: number;
            let commentsPos: number | undefined;
            let comments: string[] = [];
            const parts: ts.JSDocComment[] = [];

            // + 3 for leading /**, - 5 in total for /** */
            return scanner.scanRange(start + 3, length - 5, () => {
                // Initially we can parse out a tag.  We also have seen a starting asterisk.
                // This is so that /** * @type */ doesn't parse.
                let state = JSDocState.SawAsterisk;
                let margin: number | undefined;
                // + 4 for leading '/** '
                // + 1 because the last index of \n is always one index before the first character in the line and coincidentally, if there is no \n before start, it is -1, which is also one index before the first character
                let indent = start - (content.lastIndexOf("\n", start) + 1) + 4;
                function pushComment(text: string) {
                    if (!margin) {
                        margin = indent;
                    }
                    comments.push(text);
                    indent += text.length;
                }

                nextTokenJSDoc();
                while (parseOptionalJsdoc(ts.SyntaxKind.WhitespaceTrivia));
                if (parseOptionalJsdoc(ts.SyntaxKind.NewLineTrivia)) {
                    state = JSDocState.BeginningOfLine;
                    indent = 0;
                }
                loop: while (true) {
                    switch (token()) {
                        case ts.SyntaxKind.AtToken:
                            if (state === JSDocState.BeginningOfLine || state === JSDocState.SawAsterisk) {
                                removeTrailingWhitespace(comments);
                                if (!commentsPos) commentsPos = getNodePos();
                                addTag(parseTag(indent));
                                // NOTE: According to usejsdoc.org, a tag goes to end of line, except the last tag.
                                // Real-world comments may break this rule, so "BeginningOfLine" will not be a real line beginning
                                // for malformed examples like `/** @param {string} x @returns {number} the length */`
                                state = JSDocState.BeginningOfLine;
                                margin = undefined;
                            }
                            else {
                                pushComment(scanner.getTokenText());
                            }
                            break;
                        case ts.SyntaxKind.NewLineTrivia:
                            comments.push(scanner.getTokenText());
                            state = JSDocState.BeginningOfLine;
                            indent = 0;
                            break;
                        case ts.SyntaxKind.AsteriskToken:
                            const asterisk = scanner.getTokenText();
                            if (state === JSDocState.SawAsterisk || state === JSDocState.SavingComments) {
                                // If we've already seen an asterisk, then we can no longer parse a tag on this line
                                state = JSDocState.SavingComments;
                                pushComment(asterisk);
                            }
                            else {
                                // Ignore the first asterisk on a line
                                state = JSDocState.SawAsterisk;
                                indent += asterisk.length;
                            }
                            break;
                        case ts.SyntaxKind.WhitespaceTrivia:
                            // only collect whitespace if we're already saving comments or have just crossed the comment indent margin
                            const whitespace = scanner.getTokenText();
                            if (state === JSDocState.SavingComments) {
                                comments.push(whitespace);
                            }
                            else if (margin !== undefined && indent + whitespace.length > margin) {
                                comments.push(whitespace.slice(margin - indent));
                            }
                            indent += whitespace.length;
                            break;
                        case ts.SyntaxKind.EndOfFileToken:
                            break loop;
                        case ts.SyntaxKind.OpenBraceToken:
                            state = JSDocState.SavingComments;
                            const commentEnd = scanner.getStartPos();
                            const linkStart = scanner.getTextPos() - 1;
                            const link = parseJSDocLink(linkStart);
                            if (link) {
                                if (!linkEnd) {
                                    removeLeadingNewlines(comments);
                                }
                                parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? start, commentEnd));
                                parts.push(link);
                                comments = [];
                                linkEnd = scanner.getTextPos();
                                break;
                            }
                            // fallthrough if it's not a {@link sequence
                        default:
                            // Anything else is doc comment text. We just save it. Because it
                            // wasn't a tag, we can no longer parse a tag on this line until we hit the next
                            // line break.
                            state = JSDocState.SavingComments;
                            pushComment(scanner.getTokenText());
                            break;
                    }
                    nextTokenJSDoc();
                }
                removeTrailingWhitespace(comments);
                if (parts.length && comments.length) {
                    parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? start, commentsPos));
                }
                if (parts.length && tags) ts.Debug.assertIsDefined(commentsPos, "having parsed tags implies that the end of the comment span should be set");
                const tagsArray = tags && createNodeArray(tags, tagsPos, tagsEnd);
                return finishNode(factory.createJSDocComment(parts.length ? createNodeArray(parts, start, commentsPos) : comments.length ? comments.join("") : undefined, tagsArray), start, end);
            });

            function removeLeadingNewlines(comments: string[]) {
                while (comments.length && (comments[0] === "\n" || comments[0] === "\r")) {
                    comments.shift();
                }
            }

            function removeTrailingWhitespace(comments: string[]) {
                while (comments.length && comments[comments.length - 1].trim() === "") {
                    comments.pop();
                }
            }

            function isNextNonwhitespaceTokenEndOfFile(): boolean {
                // We must use infinite lookahead, as there could be any number of newlines :(
                while (true) {
                    nextTokenJSDoc();
                    if (token() === ts.SyntaxKind.EndOfFileToken) {
                        return true;
                    }
                    if (!(token() === ts.SyntaxKind.WhitespaceTrivia || token() === ts.SyntaxKind.NewLineTrivia)) {
                        return false;
                    }
                }
            }

            function skipWhitespace(): void {
                if (token() === ts.SyntaxKind.WhitespaceTrivia || token() === ts.SyntaxKind.NewLineTrivia) {
                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                        return; // Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
                    }
                }
                while (token() === ts.SyntaxKind.WhitespaceTrivia || token() === ts.SyntaxKind.NewLineTrivia) {
                    nextTokenJSDoc();
                }
            }

            function skipWhitespaceOrAsterisk(): string {
                if (token() === ts.SyntaxKind.WhitespaceTrivia || token() === ts.SyntaxKind.NewLineTrivia) {
                    if (lookAhead(isNextNonwhitespaceTokenEndOfFile)) {
                        return ""; // Don't skip whitespace prior to EoF (or end of comment) - that shouldn't be included in any node's range
                    }
                }

                let precedingLineBreak = scanner.hasPrecedingLineBreak();
                let seenLineBreak = false;
                let indentText = "";
                while ((precedingLineBreak && token() === ts.SyntaxKind.AsteriskToken) || token() === ts.SyntaxKind.WhitespaceTrivia || token() === ts.SyntaxKind.NewLineTrivia) {
                    indentText += scanner.getTokenText();
                    if (token() === ts.SyntaxKind.NewLineTrivia) {
                        precedingLineBreak = true;
                        seenLineBreak = true;
                        indentText = "";
                    }
                    else if (token() === ts.SyntaxKind.AsteriskToken) {
                        precedingLineBreak = false;
                    }
                    nextTokenJSDoc();
                }
                return seenLineBreak ? indentText : "";
            }

            function parseTag(margin: number) {
                ts.Debug.assert(token() === ts.SyntaxKind.AtToken);
                const start = scanner.getTokenPos();
                nextTokenJSDoc();

                const tagName = parseJSDocIdentifierName(/*message*/ undefined);
                const indentText = skipWhitespaceOrAsterisk();

                let tag: ts.JSDocTag | undefined;
                switch (tagName.escapedText) {
                    case "author":
                        tag = parseAuthorTag(start, tagName, margin, indentText);
                        break;
                    case "implements":
                        tag = parseImplementsTag(start, tagName, margin, indentText);
                        break;
                    case "augments":
                    case "extends":
                        tag = parseAugmentsTag(start, tagName, margin, indentText);
                        break;
                    case "class":
                    case "constructor":
                        tag = parseSimpleTag(start, factory.createJSDocClassTag, tagName, margin, indentText);
                        break;
                    case "public":
                        tag = parseSimpleTag(start, factory.createJSDocPublicTag, tagName, margin, indentText);
                        break;
                    case "private":
                        tag = parseSimpleTag(start, factory.createJSDocPrivateTag, tagName, margin, indentText);
                        break;
                    case "protected":
                        tag = parseSimpleTag(start, factory.createJSDocProtectedTag, tagName, margin, indentText);
                        break;
                    case "readonly":
                        tag = parseSimpleTag(start, factory.createJSDocReadonlyTag, tagName, margin, indentText);
                        break;
                    case "override":
                        tag = parseSimpleTag(start, factory.createJSDocOverrideTag, tagName, margin, indentText);
                        break;
                    case "deprecated":
                        hasDeprecatedTag = true;
                        tag = parseSimpleTag(start, factory.createJSDocDeprecatedTag, tagName, margin, indentText);
                        break;
                    case "this":
                        tag = parseThisTag(start, tagName, margin, indentText);
                        break;
                    case "enum":
                        tag = parseEnumTag(start, tagName, margin, indentText);
                        break;
                    case "arg":
                    case "argument":
                    case "param":
                        return parseParameterOrPropertyTag(start, tagName, PropertyLikeParse.Parameter, margin);
                    case "return":
                    case "returns":
                        tag = parseReturnTag(start, tagName, margin, indentText);
                        break;
                    case "template":
                        tag = parseTemplateTag(start, tagName, margin, indentText);
                        break;
                    case "type":
                        tag = parseTypeTag(start, tagName, margin, indentText);
                        break;
                    case "typedef":
                        tag = parseTypedefTag(start, tagName, margin, indentText);
                        break;
                    case "callback":
                        tag = parseCallbackTag(start, tagName, margin, indentText);
                        break;
                    case "see":
                        tag = parseSeeTag(start, tagName, margin, indentText);
                        break;
                    default:
                        tag = parseUnknownTag(start, tagName, margin, indentText);
                        break;
                }
                return tag;
            }

            function parseTrailingTagComments(pos: number, end: number, margin: number, indentText: string) {
                // some tags, like typedef and callback, have already parsed their comments earlier
                if (!indentText) {
                    margin += end - pos;
                }
                return parseTagComments(margin, indentText.slice(margin));
            }

            function parseTagComments(indent: number, initialMargin?: string): string | ts.NodeArray<ts.JSDocComment> | undefined {
                const commentsPos = getNodePos();
                let comments: string[] = [];
                const parts: ts.JSDocComment[] = [];
                let linkEnd;
                let state = JSDocState.BeginningOfLine;
                let previousWhitespace = true;
                let margin: number | undefined;
                function pushComment(text: string) {
                    if (!margin) {
                        margin = indent;
                    }
                    comments.push(text);
                    indent += text.length;
                }
                if (initialMargin !== undefined) {
                    // jump straight to saving comments if there is some initial indentation
                    if (initialMargin !== "") {
                        pushComment(initialMargin);
                    }
                    state = JSDocState.SawAsterisk;
                }
                let tok = token() as ts.JSDocSyntaxKind;
                loop: while (true) {
                    switch (tok) {
                        case ts.SyntaxKind.NewLineTrivia:
                            state = JSDocState.BeginningOfLine;
                            // don't use pushComment here because we want to keep the margin unchanged
                            comments.push(scanner.getTokenText());
                            indent = 0;
                            break;
                        case ts.SyntaxKind.AtToken:
                            if (state === JSDocState.SavingBackticks
                                || state === JSDocState.SavingComments && (!previousWhitespace || lookAhead(isNextJSDocTokenWhitespace))) {
                                // @ doesn't start a new tag inside ``, and inside a comment, only after whitespace or not before whitespace
                                comments.push(scanner.getTokenText());
                                break;
                            }
                            scanner.setTextPos(scanner.getTextPos() - 1);
                            // falls through
                        case ts.SyntaxKind.EndOfFileToken:
                            // Done
                            break loop;
                        case ts.SyntaxKind.WhitespaceTrivia:
                            if (state === JSDocState.SavingComments || state === JSDocState.SavingBackticks) {
                                pushComment(scanner.getTokenText());
                            }
                            else {
                                const whitespace = scanner.getTokenText();
                                // if the whitespace crosses the margin, take only the whitespace that passes the margin
                                if (margin !== undefined && indent + whitespace.length > margin) {
                                    comments.push(whitespace.slice(margin - indent));
                                }
                                indent += whitespace.length;
                            }
                            break;
                        case ts.SyntaxKind.OpenBraceToken:
                            state = JSDocState.SavingComments;
                            const commentEnd = scanner.getStartPos();
                            const linkStart = scanner.getTextPos() - 1;
                            const link = parseJSDocLink(linkStart);
                            if (link) {
                                parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? commentsPos, commentEnd));
                                parts.push(link);
                                comments = [];
                                linkEnd = scanner.getTextPos();
                            }
                            else {
                                pushComment(scanner.getTokenText());
                            }
                            break;
                        case ts.SyntaxKind.BacktickToken:
                            if (state === JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments;
                            }
                            else {
                                state = JSDocState.SavingBackticks;
                            }
                            pushComment(scanner.getTokenText());
                            break;
                        case ts.SyntaxKind.AsteriskToken:
                            if (state === JSDocState.BeginningOfLine) {
                                // leading asterisks start recording on the *next* (non-whitespace) token
                                state = JSDocState.SawAsterisk;
                                indent += 1;
                                break;
                            }
                            // record the * as a comment
                            // falls through
                        default:
                            if (state !== JSDocState.SavingBackticks) {
                                state = JSDocState.SavingComments; // leading identifiers start recording as well
                            }
                            pushComment(scanner.getTokenText());
                            break;
                    }
                    previousWhitespace = token() === ts.SyntaxKind.WhitespaceTrivia;
                    tok = nextTokenJSDoc();
                }

                removeLeadingNewlines(comments);
                removeTrailingWhitespace(comments);
                if (parts.length) {
                    if (comments.length) {
                        parts.push(finishNode(factory.createJSDocText(comments.join("")), linkEnd ?? commentsPos));
                    }
                    return createNodeArray(parts, commentsPos, scanner.getTextPos());
                }
                else if (comments.length) {
                    return comments.join("");
                }
            }

            function isNextJSDocTokenWhitespace() {
                const next = nextTokenJSDoc();
                return next === ts.SyntaxKind.WhitespaceTrivia || next === ts.SyntaxKind.NewLineTrivia;
            }

            function parseJSDocLink(start: number) {
                const linkType = tryParse(parseJSDocLinkPrefix);
                if (!linkType) {
                    return undefined;
                }
                nextTokenJSDoc(); // start at token after link, then skip any whitespace
                skipWhitespace();
                // parseEntityName logs an error for non-identifier, so create a MissingNode ourselves to avoid the error
                const p2 = getNodePos();
                let name: ts.EntityName | ts.JSDocMemberName | undefined = ts.tokenIsIdentifierOrKeyword(token())
                    ? parseEntityName(/*allowReservedWords*/ true)
                    : undefined;
                if (name) {
                    while (token() === ts.SyntaxKind.PrivateIdentifier) {
                        reScanHashToken(); // rescan #id as # id
                        nextTokenJSDoc(); // then skip the #
                        name = finishNode(factory.createJSDocMemberName(name, parseIdentifier()), p2);
                    }
                }
                const text = [];
                while (token() !== ts.SyntaxKind.CloseBraceToken && token() !== ts.SyntaxKind.NewLineTrivia && token() !== ts.SyntaxKind.EndOfFileToken) {
                    text.push(scanner.getTokenText());
                    nextTokenJSDoc();
                }
                const create = linkType === "link" ? factory.createJSDocLink
                    : linkType === "linkcode" ? factory.createJSDocLinkCode
                    : factory.createJSDocLinkPlain;
                return finishNode(create(name, text.join("")), start, scanner.getTextPos());
            }

            function parseJSDocLinkPrefix() {
                skipWhitespaceOrAsterisk();
                if (token() === ts.SyntaxKind.OpenBraceToken
                    && nextTokenJSDoc() === ts.SyntaxKind.AtToken
                    && ts.tokenIsIdentifierOrKeyword(nextTokenJSDoc())) {
                    const kind = scanner.getTokenValue();
                    if (isJSDocLinkTag(kind)) return kind;
                }
            }

            function isJSDocLinkTag(kind: string) {
                return kind === "link" || kind === "linkcode" || kind === "linkplain";
            }

            function parseUnknownTag(start: number, tagName: ts.Identifier, indent: number, indentText: string) {
                return finishNode(factory.createJSDocUnknownTag(tagName, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function addTag(tag: ts.JSDocTag | undefined): void {
                if (!tag) {
                    return;
                }
                if (!tags) {
                    tags = [tag];
                    tagsPos = tag.pos;
                }
                else {
                    tags.push(tag);
                }
                tagsEnd = tag.end;
            }

            function tryParseTypeExpression(): ts.JSDocTypeExpression | undefined {
                skipWhitespaceOrAsterisk();
                return token() === ts.SyntaxKind.OpenBraceToken ? parseJSDocTypeExpression() : undefined;
            }

            function parseBracketNameInPropertyAndParamTag(): { name: ts.EntityName, isBracketed: boolean } {
                // Looking for something like '[foo]', 'foo', '[foo.bar]' or 'foo.bar'
                const isBracketed = parseOptionalJsdoc(ts.SyntaxKind.OpenBracketToken);
                if (isBracketed) {
                    skipWhitespace();
                }
                // a markdown-quoted name: `arg` is not legal jsdoc, but occurs in the wild
                const isBackquoted = parseOptionalJsdoc(ts.SyntaxKind.BacktickToken);
                const name = parseJSDocEntityName();
                if (isBackquoted) {
                    parseExpectedTokenJSDoc(ts.SyntaxKind.BacktickToken);
                }
                if (isBracketed) {
                    skipWhitespace();
                    // May have an optional default, e.g. '[foo = 42]'
                    if (parseOptionalToken(ts.SyntaxKind.EqualsToken)) {
                        parseExpression();
                    }

                    parseExpected(ts.SyntaxKind.CloseBracketToken);
                }

                return { name, isBracketed };
            }

            function isObjectOrObjectArrayTypeReference(node: ts.TypeNode): boolean {
                switch (node.kind) {
                    case ts.SyntaxKind.ObjectKeyword:
                        return true;
                    case ts.SyntaxKind.ArrayType:
                        return isObjectOrObjectArrayTypeReference((node as ts.ArrayTypeNode).elementType);
                    default:
                        return ts.isTypeReferenceNode(node) && ts.isIdentifier(node.typeName) && node.typeName.escapedText === "Object" && !node.typeArguments;
                }
            }

            function parseParameterOrPropertyTag(start: number, tagName: ts.Identifier, target: PropertyLikeParse, indent: number): ts.JSDocParameterTag | ts.JSDocPropertyTag {
                let typeExpression = tryParseTypeExpression();
                let isNameFirst = !typeExpression;
                skipWhitespaceOrAsterisk();

                const { name, isBracketed } = parseBracketNameInPropertyAndParamTag();
                const indentText = skipWhitespaceOrAsterisk();

                if (isNameFirst && !lookAhead(parseJSDocLinkPrefix)) {
                    typeExpression = tryParseTypeExpression();
                }

                const comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);

                const nestedTypeLiteral = target !== PropertyLikeParse.CallbackParameter && parseNestedTypeLiteral(typeExpression, name, target, indent);
                if (nestedTypeLiteral) {
                    typeExpression = nestedTypeLiteral;
                    isNameFirst = true;
                }
                const result = target === PropertyLikeParse.Property
                    ? factory.createJSDocPropertyTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment)
                    : factory.createJSDocParameterTag(tagName, name, isBracketed, typeExpression, isNameFirst, comment);
                return finishNode(result, start);
            }

            function parseNestedTypeLiteral(typeExpression: ts.JSDocTypeExpression | undefined, name: ts.EntityName, target: PropertyLikeParse, indent: number) {
                if (typeExpression && isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                    const pos = getNodePos();
                    let child: ts.JSDocPropertyLikeTag | ts.JSDocTypeTag | false;
                    let children: ts.JSDocPropertyLikeTag[] | undefined;
                    while (child = tryParse(() => parseChildParameterOrPropertyTag(target, indent, name))) {
                        if (child.kind === ts.SyntaxKind.JSDocParameterTag || child.kind === ts.SyntaxKind.JSDocPropertyTag) {
                            children = ts.append(children, child);
                        }
                    }
                    if (children) {
                        const literal = finishNode(factory.createJSDocTypeLiteral(children, typeExpression.type.kind === ts.SyntaxKind.ArrayType), pos);
                        return finishNode(factory.createJSDocTypeExpression(literal), pos);
                    }
                }
            }

            function parseReturnTag(start: number, tagName: ts.Identifier, indent: number, indentText: string): ts.JSDocReturnTag {
                if (ts.some(tags, ts.isJSDocReturnTag)) {
                    parseErrorAt(tagName.pos, scanner.getTokenPos(), ts.Diagnostics._0_tag_already_specified, tagName.escapedText);
                }

                const typeExpression = tryParseTypeExpression();
                return finishNode(factory.createJSDocReturnTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function parseTypeTag(start: number, tagName: ts.Identifier, indent?: number, indentText?: string): ts.JSDocTypeTag {
                if (ts.some(tags, ts.isJSDocTypeTag)) {
                    parseErrorAt(tagName.pos, scanner.getTokenPos(), ts.Diagnostics._0_tag_already_specified, tagName.escapedText);
                }

                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                const comments = indent !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), indent, indentText) : undefined;
                return finishNode(factory.createJSDocTypeTag(tagName, typeExpression, comments), start);
            }

            function parseSeeTag(start: number, tagName: ts.Identifier, indent?: number, indentText?: string): ts.JSDocSeeTag {
                const isMarkdownOrJSDocLink = token() === ts.SyntaxKind.OpenBracketToken
                    || lookAhead(() => nextTokenJSDoc() === ts.SyntaxKind.AtToken && ts.tokenIsIdentifierOrKeyword(nextTokenJSDoc()) && isJSDocLinkTag(scanner.getTokenValue()));
                const nameExpression = isMarkdownOrJSDocLink ? undefined : parseJSDocNameReference();
                const comments = indent !== undefined && indentText !== undefined ? parseTrailingTagComments(start, getNodePos(), indent, indentText) : undefined;
                return finishNode(factory.createJSDocSeeTag(tagName, nameExpression, comments), start);
            }

            function parseAuthorTag(start: number, tagName: ts.Identifier, indent: number, indentText: string): ts.JSDocAuthorTag {
                const commentStart = getNodePos();
                const textOnly = parseAuthorNameAndEmail();
                let commentEnd = scanner.getStartPos();
                const comments = parseTrailingTagComments(start, commentEnd, indent, indentText);
                if (!comments) {
                    commentEnd = scanner.getStartPos();
                }
                const allParts = typeof comments !== "string"
                    ? createNodeArray(ts.concatenate([finishNode(textOnly, commentStart, commentEnd)], comments) as ts.JSDocComment[], commentStart) // cast away readonly
                    : textOnly.text + comments;
                return finishNode(factory.createJSDocAuthorTag(tagName, allParts), start);
            }

            function parseAuthorNameAndEmail(): ts.JSDocText {
                const comments: string[] = [];
                let inEmail = false;
                let token = scanner.getToken();
                while (token !== ts.SyntaxKind.EndOfFileToken && token !== ts.SyntaxKind.NewLineTrivia) {
                    if (token === ts.SyntaxKind.LessThanToken) {
                        inEmail = true;
                    }
                    else if (token === ts.SyntaxKind.AtToken && !inEmail) {
                        break;
                    }
                    else if (token === ts.SyntaxKind.GreaterThanToken && inEmail) {
                        comments.push(scanner.getTokenText());
                        scanner.setTextPos(scanner.getTokenPos() + 1);
                        break;
                    }
                    comments.push(scanner.getTokenText());
                    token = nextTokenJSDoc();
                }

                return factory.createJSDocText(comments.join(""));
            }

            function parseImplementsTag(start: number, tagName: ts.Identifier, margin: number, indentText: string): ts.JSDocImplementsTag {
                const className = parseExpressionWithTypeArgumentsForAugments();
                return finishNode(factory.createJSDocImplementsTag(tagName, className, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseAugmentsTag(start: number, tagName: ts.Identifier, margin: number, indentText: string): ts.JSDocAugmentsTag {
                const className = parseExpressionWithTypeArgumentsForAugments();
                return finishNode(factory.createJSDocAugmentsTag(tagName, className, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseExpressionWithTypeArgumentsForAugments(): ts.ExpressionWithTypeArguments & { expression: ts.Identifier | ts.PropertyAccessEntityNameExpression } {
                const usedBrace = parseOptional(ts.SyntaxKind.OpenBraceToken);
                const pos = getNodePos();
                const expression = parsePropertyAccessEntityNameExpression();
                const typeArguments = tryParseTypeArguments();
                const node = factory.createExpressionWithTypeArguments(expression, typeArguments) as ts.ExpressionWithTypeArguments & { expression: ts.Identifier | ts.PropertyAccessEntityNameExpression };
                const res = finishNode(node, pos);
                if (usedBrace) {
                    parseExpected(ts.SyntaxKind.CloseBraceToken);
                }
                return res;
            }

            function parsePropertyAccessEntityNameExpression() {
                const pos = getNodePos();
                let node: ts.Identifier | ts.PropertyAccessEntityNameExpression = parseJSDocIdentifierName();
                while (parseOptional(ts.SyntaxKind.DotToken)) {
                    const name = parseJSDocIdentifierName();
                    node = finishNode(factory.createPropertyAccessExpression(node, name), pos) as ts.PropertyAccessEntityNameExpression;
                }
                return node;
            }

            function parseSimpleTag(start: number, createTag: (tagName: ts.Identifier | undefined, comment?: string | ts.NodeArray<ts.JSDocComment>) => ts.JSDocTag, tagName: ts.Identifier, margin: number, indentText: string): ts.JSDocTag {
                return finishNode(createTag(tagName, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseThisTag(start: number, tagName: ts.Identifier, margin: number, indentText: string): ts.JSDocThisTag {
                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                skipWhitespace();
                return finishNode(factory.createJSDocThisTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseEnumTag(start: number, tagName: ts.Identifier, margin: number, indentText: string): ts.JSDocEnumTag {
                const typeExpression = parseJSDocTypeExpression(/*mayOmitBraces*/ true);
                skipWhitespace();
                return finishNode(factory.createJSDocEnumTag(tagName, typeExpression, parseTrailingTagComments(start, getNodePos(), margin, indentText)), start);
            }

            function parseTypedefTag(start: number, tagName: ts.Identifier, indent: number, indentText: string): ts.JSDocTypedefTag {
                let typeExpression: ts.JSDocTypeExpression | ts.JSDocTypeLiteral | undefined = tryParseTypeExpression();
                skipWhitespaceOrAsterisk();

                const fullName = parseJSDocTypeNameWithNamespace();
                skipWhitespace();
                let comment = parseTagComments(indent);

                let end: number | undefined;
                if (!typeExpression || isObjectOrObjectArrayTypeReference(typeExpression.type)) {
                    let child: ts.JSDocTypeTag | ts.JSDocPropertyTag | false;
                    let childTypeTag: ts.JSDocTypeTag | undefined;
                    let jsDocPropertyTags: ts.JSDocPropertyTag[] | undefined;
                    let hasChildren = false;
                    while (child = tryParse(() => parseChildPropertyTag(indent))) {
                        hasChildren = true;
                        if (child.kind === ts.SyntaxKind.JSDocTypeTag) {
                            if (childTypeTag) {
                                const lastError = parseErrorAtCurrentToken(ts.Diagnostics.A_JSDoc_typedef_comment_may_not_contain_multiple_type_tags);
                                if (lastError) {
                                    ts.addRelatedInfo(lastError, ts.createDetachedDiagnostic(fileName, 0, 0, ts.Diagnostics.The_tag_was_first_specified_here));
                                }
                                break;
                            }
                            else {
                                childTypeTag = child;
                            }
                        }
                        else {
                            jsDocPropertyTags = ts.append(jsDocPropertyTags, child);
                        }
                    }
                    if (hasChildren) {
                        const isArrayType = typeExpression && typeExpression.type.kind === ts.SyntaxKind.ArrayType;
                        const jsdocTypeLiteral = factory.createJSDocTypeLiteral(jsDocPropertyTags, isArrayType);
                        typeExpression = childTypeTag && childTypeTag.typeExpression && !isObjectOrObjectArrayTypeReference(childTypeTag.typeExpression.type) ?
                            childTypeTag.typeExpression :
                            finishNode(jsdocTypeLiteral, start);
                        end = typeExpression.end;
                    }
                }

                // Only include the characters between the name end and the next token if a comment was actually parsed out - otherwise it's just whitespace
                end = end || comment !== undefined ?
                    getNodePos() :
                    (fullName ?? typeExpression ?? tagName).end;

                if (!comment) {
                    comment = parseTrailingTagComments(start, end, indent, indentText);
                }

                const typedefTag = factory.createJSDocTypedefTag(tagName, typeExpression, fullName, comment);
                return finishNode(typedefTag, start, end);
            }

            function parseJSDocTypeNameWithNamespace(nested?: boolean) {
                const pos = scanner.getTokenPos();
                if (!ts.tokenIsIdentifierOrKeyword(token())) {
                    return undefined;
                }
                const typeNameOrNamespaceName = parseJSDocIdentifierName();
                if (parseOptional(ts.SyntaxKind.DotToken)) {
                    const body = parseJSDocTypeNameWithNamespace(/*nested*/ true);
                    const jsDocNamespaceNode = factory.createModuleDeclaration(
                        /*modifiers*/ undefined,
                        typeNameOrNamespaceName,
                        body,
                        nested ? ts.NodeFlags.NestedNamespace : undefined
                    ) as ts.JSDocNamespaceDeclaration;
                    return finishNode(jsDocNamespaceNode, pos);
                }

                if (nested) {
                    typeNameOrNamespaceName.isInJSDocNamespace = true;
                }
                return typeNameOrNamespaceName;
            }


            function parseCallbackTagParameters(indent: number) {
                const pos = getNodePos();
                let child: ts.JSDocParameterTag | false;
                let parameters;
                while (child = tryParse(() => parseChildParameterOrPropertyTag(PropertyLikeParse.CallbackParameter, indent) as ts.JSDocParameterTag)) {
                    parameters = ts.append(parameters, child);
                }
                return createNodeArray(parameters || [], pos);
            }

            function parseCallbackTag(start: number, tagName: ts.Identifier, indent: number, indentText: string): ts.JSDocCallbackTag {
                const fullName = parseJSDocTypeNameWithNamespace();
                skipWhitespace();
                let comment = parseTagComments(indent);
                const parameters = parseCallbackTagParameters(indent);
                const returnTag = tryParse(() => {
                    if (parseOptionalJsdoc(ts.SyntaxKind.AtToken)) {
                        const tag = parseTag(indent);
                        if (tag && tag.kind === ts.SyntaxKind.JSDocReturnTag) {
                            return tag as ts.JSDocReturnTag;
                        }
                    }
                });
                const typeExpression = finishNode(factory.createJSDocSignature(/*typeParameters*/ undefined, parameters, returnTag), start);
                if (!comment) {
                    comment = parseTrailingTagComments(start, getNodePos(), indent, indentText);
                }
                const end = comment !== undefined ? getNodePos() : typeExpression.end;
                return finishNode(factory.createJSDocCallbackTag(tagName, typeExpression, fullName, comment), start, end);
            }

            function escapedTextsEqual(a: ts.EntityName, b: ts.EntityName): boolean {
                while (!ts.isIdentifier(a) || !ts.isIdentifier(b)) {
                    if (!ts.isIdentifier(a) && !ts.isIdentifier(b) && a.right.escapedText === b.right.escapedText) {
                        a = a.left;
                        b = b.left;
                    }
                    else {
                        return false;
                    }
                }
                return a.escapedText === b.escapedText;
            }

            function parseChildPropertyTag(indent: number) {
                return parseChildParameterOrPropertyTag(PropertyLikeParse.Property, indent) as ts.JSDocTypeTag | ts.JSDocPropertyTag | false;
            }

            function parseChildParameterOrPropertyTag(target: PropertyLikeParse, indent: number, name?: ts.EntityName): ts.JSDocTypeTag | ts.JSDocPropertyTag | ts.JSDocParameterTag | false {
                let canParseTag = true;
                let seenAsterisk = false;
                while (true) {
                    switch (nextTokenJSDoc()) {
                        case ts.SyntaxKind.AtToken:
                            if (canParseTag) {
                                const child = tryParseChildTag(target, indent);
                                if (child && (child.kind === ts.SyntaxKind.JSDocParameterTag || child.kind === ts.SyntaxKind.JSDocPropertyTag) &&
                                    target !== PropertyLikeParse.CallbackParameter &&
                                    name && (ts.isIdentifier(child.name) || !escapedTextsEqual(name, child.name.left))) {
                                    return false;
                                }
                                return child;
                            }
                            seenAsterisk = false;
                            break;
                        case ts.SyntaxKind.NewLineTrivia:
                            canParseTag = true;
                            seenAsterisk = false;
                            break;
                        case ts.SyntaxKind.AsteriskToken:
                            if (seenAsterisk) {
                                canParseTag = false;
                            }
                            seenAsterisk = true;
                            break;
                        case ts.SyntaxKind.Identifier:
                            canParseTag = false;
                            break;
                        case ts.SyntaxKind.EndOfFileToken:
                            return false;
                    }
                }
            }

            function tryParseChildTag(target: PropertyLikeParse, indent: number): ts.JSDocTypeTag | ts.JSDocPropertyTag | ts.JSDocParameterTag | false {
                ts.Debug.assert(token() === ts.SyntaxKind.AtToken);
                const start = scanner.getStartPos();
                nextTokenJSDoc();

                const tagName = parseJSDocIdentifierName();
                skipWhitespace();
                let t: PropertyLikeParse;
                switch (tagName.escapedText) {
                    case "type":
                        return target === PropertyLikeParse.Property && parseTypeTag(start, tagName);
                    case "prop":
                    case "property":
                        t = PropertyLikeParse.Property;
                        break;
                    case "arg":
                    case "argument":
                    case "param":
                        t = PropertyLikeParse.Parameter | PropertyLikeParse.CallbackParameter;
                        break;
                    default:
                        return false;
                }
                if (!(target & t)) {
                    return false;
                }
                return parseParameterOrPropertyTag(start, tagName, target, indent);
            }

            function parseTemplateTagTypeParameter() {
                const typeParameterPos = getNodePos();
                const isBracketed = parseOptionalJsdoc(ts.SyntaxKind.OpenBracketToken);
                if (isBracketed) {
                    skipWhitespace();
                }
                const name = parseJSDocIdentifierName(ts.Diagnostics.Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces);

                let defaultType: ts.TypeNode | undefined;
                if (isBracketed) {
                    skipWhitespace();
                    parseExpected(ts.SyntaxKind.EqualsToken);
                    defaultType = doInsideOfContext(ts.NodeFlags.JSDoc, parseJSDocType);
                    parseExpected(ts.SyntaxKind.CloseBracketToken);
                }

                if (ts.nodeIsMissing(name)) {
                    return undefined;
                }
                return finishNode(factory.createTypeParameterDeclaration(/*modifiers*/ undefined, name, /*constraint*/ undefined, defaultType), typeParameterPos);
            }

            function parseTemplateTagTypeParameters() {
                const pos = getNodePos();
                const typeParameters = [];
                do {
                    skipWhitespace();
                    const node = parseTemplateTagTypeParameter();
                    if (node !== undefined) {
                        typeParameters.push(node);
                    }
                    skipWhitespaceOrAsterisk();
                } while (parseOptionalJsdoc(ts.SyntaxKind.CommaToken));
                return createNodeArray(typeParameters, pos);
            }

            function parseTemplateTag(start: number, tagName: ts.Identifier, indent: number, indentText: string): ts.JSDocTemplateTag {
                // The template tag looks like one of the following:
                //   @template T,U,V
                //   @template {Constraint} T
                //
                // According to the [closure docs](https://github.com/google/closure-compiler/wiki/Generic-Types#multiple-bounded-template-types):
                //   > Multiple bounded generics cannot be declared on the same line. For the sake of clarity, if multiple templates share the same
                //   > type bound they must be declared on separate lines.
                //
                // TODO: Determine whether we should enforce this in the checker.
                // TODO: Consider moving the `constraint` to the first type parameter as we could then remove `getEffectiveConstraintOfTypeParameter`.
                // TODO: Consider only parsing a single type parameter if there is a constraint.
                const constraint = token() === ts.SyntaxKind.OpenBraceToken ? parseJSDocTypeExpression() : undefined;
                const typeParameters = parseTemplateTagTypeParameters();
                return finishNode(factory.createJSDocTemplateTag(tagName, constraint, typeParameters, parseTrailingTagComments(start, getNodePos(), indent, indentText)), start);
            }

            function parseOptionalJsdoc(t: ts.JSDocSyntaxKind): boolean {
                if (token() === t) {
                    nextTokenJSDoc();
                    return true;
                }
                return false;
            }

            function parseJSDocEntityName(): ts.EntityName {
                let entity: ts.EntityName = parseJSDocIdentifierName();
                if (parseOptional(ts.SyntaxKind.OpenBracketToken)) {
                    parseExpected(ts.SyntaxKind.CloseBracketToken);
                    // Note that y[] is accepted as an entity name, but the postfix brackets are not saved for checking.
                    // Technically usejsdoc.org requires them for specifying a property of a type equivalent to Array<{ x: ...}>
                    // but it's not worth it to enforce that restriction.
                }
                while (parseOptional(ts.SyntaxKind.DotToken)) {
                    const name = parseJSDocIdentifierName();
                    if (parseOptional(ts.SyntaxKind.OpenBracketToken)) {
                        parseExpected(ts.SyntaxKind.CloseBracketToken);
                    }
                    entity = createQualifiedName(entity, name);
                }
                return entity;
            }

            function parseJSDocIdentifierName(message?: ts.DiagnosticMessage): ts.Identifier {
                if (!ts.tokenIsIdentifierOrKeyword(token())) {
                    return createMissingNode<ts.Identifier>(ts.SyntaxKind.Identifier, /*reportAtCurrentPosition*/ !message, message || ts.Diagnostics.Identifier_expected);
                }

                identifierCount++;
                const pos = scanner.getTokenPos();
                const end = scanner.getTextPos();
                const originalKeywordKind = token();
                const text = internIdentifier(scanner.getTokenValue());
                const result = finishNode(factory.createIdentifier(text, /*typeArguments*/ undefined, originalKeywordKind), pos, end);
                nextTokenJSDoc();
                return result;
            }
        }
    }
}

namespace IncrementalParser {
    export function updateSourceFile(sourceFile: ts.SourceFile, newText: string, textChangeRange: ts.TextChangeRange, aggressiveChecks: boolean): ts.SourceFile {
        aggressiveChecks = aggressiveChecks || ts.Debug.shouldAssert(ts.AssertionLevel.Aggressive);

        checkChangeRange(sourceFile, newText, textChangeRange, aggressiveChecks);
        if (ts.textChangeRangeIsUnchanged(textChangeRange)) {
            // if the text didn't change, then we can just return our current source file as-is.
            return sourceFile;
        }

        if (sourceFile.statements.length === 0) {
            // If we don't have any statements in the current source file, then there's no real
            // way to incrementally parse.  So just do a full parse instead.
            return Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, /*syntaxCursor*/ undefined, /*setParentNodes*/ true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator);
        }

        // Make sure we're not trying to incrementally update a source file more than once.  Once
        // we do an update the original source file is considered unusable from that point onwards.
        //
        // This is because we do incremental parsing in-place.  i.e. we take nodes from the old
        // tree and give them new positions and parents.  From that point on, trusting the old
        // tree at all is not possible as far too much of it may violate invariants.
        const incrementalSourceFile = sourceFile as ts.Node as IncrementalNode;
        ts.Debug.assert(!incrementalSourceFile.hasBeenIncrementallyParsed);
        incrementalSourceFile.hasBeenIncrementallyParsed = true;
        Parser.fixupParentReferences(incrementalSourceFile);
        const oldText = sourceFile.text;
        const syntaxCursor = createSyntaxCursor(sourceFile);

        // Make the actual change larger so that we know to reparse anything whose lookahead
        // might have intersected the change.
        const changeRange = extendToAffectedRange(sourceFile, textChangeRange);
        checkChangeRange(sourceFile, newText, changeRange, aggressiveChecks);

        // Ensure that extending the affected range only moved the start of the change range
        // earlier in the file.
        ts.Debug.assert(changeRange.span.start <= textChangeRange.span.start);
        ts.Debug.assert(ts.textSpanEnd(changeRange.span) === ts.textSpanEnd(textChangeRange.span));
        ts.Debug.assert(ts.textSpanEnd(ts.textChangeRangeNewSpan(changeRange)) === ts.textSpanEnd(ts.textChangeRangeNewSpan(textChangeRange)));

        // The is the amount the nodes after the edit range need to be adjusted.  It can be
        // positive (if the edit added characters), negative (if the edit deleted characters)
        // or zero (if this was a pure overwrite with nothing added/removed).
        const delta = ts.textChangeRangeNewSpan(changeRange).length - changeRange.span.length;

        // If we added or removed characters during the edit, then we need to go and adjust all
        // the nodes after the edit.  Those nodes may move forward (if we inserted chars) or they
        // may move backward (if we deleted chars).
        //
        // Doing this helps us out in two ways.  First, it means that any nodes/tokens we want
        // to reuse are already at the appropriate position in the new text.  That way when we
        // reuse them, we don't have to figure out if they need to be adjusted.  Second, it makes
        // it very easy to determine if we can reuse a node.  If the node's position is at where
        // we are in the text, then we can reuse it.  Otherwise we can't.  If the node's position
        // is ahead of us, then we'll need to rescan tokens.  If the node's position is behind
        // us, then we'll need to skip it or crumble it as appropriate
        //
        // We will also adjust the positions of nodes that intersect the change range as well.
        // By doing this, we ensure that all the positions in the old tree are consistent, not
        // just the positions of nodes entirely before/after the change range.  By being
        // consistent, we can then easily map from positions to nodes in the old tree easily.
        //
        // Also, mark any syntax elements that intersect the changed span.  We know, up front,
        // that we cannot reuse these elements.
        updateTokenPositionsAndMarkElements(incrementalSourceFile,
            changeRange.span.start, ts.textSpanEnd(changeRange.span), ts.textSpanEnd(ts.textChangeRangeNewSpan(changeRange)), delta, oldText, newText, aggressiveChecks);

        // Now that we've set up our internal incremental state just proceed and parse the
        // source file in the normal fashion.  When possible the parser will retrieve and
        // reuse nodes from the old tree.
        //
        // Note: passing in 'true' for setNodeParents is very important.  When incrementally
        // parsing, we will be reusing nodes from the old tree, and placing it into new
        // parents.  If we don't set the parents now, we'll end up with an observably
        // inconsistent tree.  Setting the parents on the new tree should be very fast.  We
        // will immediately bail out of walking any subtrees when we can see that their parents
        // are already correct.
        const result = Parser.parseSourceFile(sourceFile.fileName, newText, sourceFile.languageVersion, syntaxCursor, /*setParentNodes*/ true, sourceFile.scriptKind, sourceFile.setExternalModuleIndicator);
        result.commentDirectives = getNewCommentDirectives(
            sourceFile.commentDirectives,
            result.commentDirectives,
            changeRange.span.start,
            ts.textSpanEnd(changeRange.span),
            delta,
            oldText,
            newText,
            aggressiveChecks
        );
        result.impliedNodeFormat = sourceFile.impliedNodeFormat;
        return result;
    }

    function getNewCommentDirectives(
        oldDirectives: ts.CommentDirective[] | undefined,
        newDirectives: ts.CommentDirective[] | undefined,
        changeStart: number,
        changeRangeOldEnd: number,
        delta: number,
        oldText: string,
        newText: string,
        aggressiveChecks: boolean
    ): ts.CommentDirective[] | undefined {
        if (!oldDirectives) return newDirectives;
        let commentDirectives: ts.CommentDirective[] | undefined;
        let addedNewlyScannedDirectives = false;
        for (const directive of oldDirectives) {
            const { range, type } = directive;
            // Range before the change
            if (range.end < changeStart) {
                commentDirectives = ts.append(commentDirectives, directive);
            }
            else if (range.pos > changeRangeOldEnd) {
                addNewlyScannedDirectives();
                // Node is entirely past the change range.  We need to move both its pos and
                // end, forward or backward appropriately.
                const updatedDirective: ts.CommentDirective = {
                    range: { pos: range.pos + delta, end: range.end + delta },
                    type
                };
                commentDirectives = ts.append(commentDirectives, updatedDirective);
                if (aggressiveChecks) {
                    ts.Debug.assert(oldText.substring(range.pos, range.end) === newText.substring(updatedDirective.range.pos, updatedDirective.range.end));
                }
            }
            // Ignore ranges that fall in change range
        }
        addNewlyScannedDirectives();
        return commentDirectives;

        function addNewlyScannedDirectives() {
            if (addedNewlyScannedDirectives) return;
            addedNewlyScannedDirectives = true;
            if (!commentDirectives) {
                commentDirectives = newDirectives;
            }
            else if (newDirectives) {
                commentDirectives.push(...newDirectives);
            }
        }
    }

    function moveElementEntirelyPastChangeRange(element: IncrementalElement, isArray: boolean, delta: number, oldText: string, newText: string, aggressiveChecks: boolean) {
        if (isArray) {
            visitArray(element as IncrementalNodeArray);
        }
        else {
            visitNode(element as IncrementalNode);
        }
        return;

        function visitNode(node: IncrementalNode) {
            let text = "";
            if (aggressiveChecks && shouldCheckNode(node)) {
                text = oldText.substring(node.pos, node.end);
            }

            // Ditch any existing LS children we may have created.  This way we can avoid
            // moving them forward.
            if (node._children) {
                node._children = undefined;
            }

            ts.setTextRangePosEnd(node, node.pos + delta, node.end + delta);

            if (aggressiveChecks && shouldCheckNode(node)) {
                ts.Debug.assert(text === newText.substring(node.pos, node.end));
            }

            forEachChild(node, visitNode, visitArray);
            if (ts.hasJSDocNodes(node)) {
                for (const jsDocComment of node.jsDoc!) {
                    visitNode(jsDocComment as ts.Node as IncrementalNode);
                }
            }
            checkNodePositions(node, aggressiveChecks);
        }

        function visitArray(array: IncrementalNodeArray) {
            array._children = undefined;
            ts.setTextRangePosEnd(array, array.pos + delta, array.end + delta);

            for (const node of array) {
                visitNode(node);
            }
        }
    }

    function shouldCheckNode(node: ts.Node) {
        switch (node.kind) {
            case ts.SyntaxKind.StringLiteral:
            case ts.SyntaxKind.NumericLiteral:
            case ts.SyntaxKind.Identifier:
                return true;
        }

        return false;
    }

    function adjustIntersectingElement(element: IncrementalElement, changeStart: number, changeRangeOldEnd: number, changeRangeNewEnd: number, delta: number) {
        ts.Debug.assert(element.end >= changeStart, "Adjusting an element that was entirely before the change range");
        ts.Debug.assert(element.pos <= changeRangeOldEnd, "Adjusting an element that was entirely after the change range");
        ts.Debug.assert(element.pos <= element.end);

        // We have an element that intersects the change range in some way.  It may have its
        // start, or its end (or both) in the changed range.  We want to adjust any part
        // that intersects such that the final tree is in a consistent state.  i.e. all
        // children have spans within the span of their parent, and all siblings are ordered
        // properly.

        // We may need to update both the 'pos' and the 'end' of the element.

        // If the 'pos' is before the start of the change, then we don't need to touch it.
        // If it isn't, then the 'pos' must be inside the change.  How we update it will
        // depend if delta is positive or negative. If delta is positive then we have
        // something like:
        //
        //  -------------------AAA-----------------
        //  -------------------BBBCCCCCCC-----------------
        //
        // In this case, we consider any node that started in the change range to still be
        // starting at the same position.
        //
        // however, if the delta is negative, then we instead have something like this:
        //
        //  -------------------XXXYYYYYYY-----------------
        //  -------------------ZZZ-----------------
        //
        // In this case, any element that started in the 'X' range will keep its position.
        // However any element that started after that will have their pos adjusted to be
        // at the end of the new range.  i.e. any node that started in the 'Y' range will
        // be adjusted to have their start at the end of the 'Z' range.
        //
        // The element will keep its position if possible.  Or Move backward to the new-end
        // if it's in the 'Y' range.
        const pos = Math.min(element.pos, changeRangeNewEnd);

        // If the 'end' is after the change range, then we always adjust it by the delta
        // amount.  However, if the end is in the change range, then how we adjust it
        // will depend on if delta is positive or negative.  If delta is positive then we
        // have something like:
        //
        //  -------------------AAA-----------------
        //  -------------------BBBCCCCCCC-----------------
        //
        // In this case, we consider any node that ended inside the change range to keep its
        // end position.
        //
        // however, if the delta is negative, then we instead have something like this:
        //
        //  -------------------XXXYYYYYYY-----------------
        //  -------------------ZZZ-----------------
        //
        // In this case, any element that ended in the 'X' range will keep its position.
        // However any element that ended after that will have their pos adjusted to be
        // at the end of the new range.  i.e. any node that ended in the 'Y' range will
        // be adjusted to have their end at the end of the 'Z' range.
        const end = element.end >= changeRangeOldEnd ?
            // Element ends after the change range.  Always adjust the end pos.
            element.end + delta :
            // Element ends in the change range.  The element will keep its position if
            // possible. Or Move backward to the new-end if it's in the 'Y' range.
            Math.min(element.end, changeRangeNewEnd);

        ts.Debug.assert(pos <= end);
        if (element.parent) {
            ts.Debug.assertGreaterThanOrEqual(pos, element.parent.pos);
            ts.Debug.assertLessThanOrEqual(end, element.parent.end);
        }

        ts.setTextRangePosEnd(element, pos, end);
    }

    function checkNodePositions(node: ts.Node, aggressiveChecks: boolean) {
        if (aggressiveChecks) {
            let pos = node.pos;
            const visitNode = (child: ts.Node) => {
                ts.Debug.assert(child.pos >= pos);
                pos = child.end;
            };
            if (ts.hasJSDocNodes(node)) {
                for (const jsDocComment of node.jsDoc!) {
                    visitNode(jsDocComment);
                }
            }
            forEachChild(node, visitNode);
            ts.Debug.assert(pos <= node.end);
        }
    }

    function updateTokenPositionsAndMarkElements(
        sourceFile: IncrementalNode,
        changeStart: number,
        changeRangeOldEnd: number,
        changeRangeNewEnd: number,
        delta: number,
        oldText: string,
        newText: string,
        aggressiveChecks: boolean): void {

        visitNode(sourceFile);
        return;

        function visitNode(child: IncrementalNode) {
            ts.Debug.assert(child.pos <= child.end);
            if (child.pos > changeRangeOldEnd) {
                // Node is entirely past the change range.  We need to move both its pos and
                // end, forward or backward appropriately.
                moveElementEntirelyPastChangeRange(child, /*isArray*/ false, delta, oldText, newText, aggressiveChecks);
                return;
            }

            // Check if the element intersects the change range.  If it does, then it is not
            // reusable.  Also, we'll need to recurse to see what constituent portions we may
            // be able to use.
            const fullEnd = child.end;
            if (fullEnd >= changeStart) {
                child.intersectsChange = true;
                child._children = undefined;

                // Adjust the pos or end (or both) of the intersecting element accordingly.
                adjustIntersectingElement(child, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                forEachChild(child, visitNode, visitArray);
                if (ts.hasJSDocNodes(child)) {
                    for (const jsDocComment of child.jsDoc!) {
                        visitNode(jsDocComment as ts.Node as IncrementalNode);
                    }
                }
                checkNodePositions(child, aggressiveChecks);
                return;
            }

            // Otherwise, the node is entirely before the change range.  No need to do anything with it.
            ts.Debug.assert(fullEnd < changeStart);
        }

        function visitArray(array: IncrementalNodeArray) {
            ts.Debug.assert(array.pos <= array.end);
            if (array.pos > changeRangeOldEnd) {
                // Array is entirely after the change range.  We need to move it, and move any of
                // its children.
                moveElementEntirelyPastChangeRange(array, /*isArray*/ true, delta, oldText, newText, aggressiveChecks);
                return;
            }

            // Check if the element intersects the change range.  If it does, then it is not
            // reusable.  Also, we'll need to recurse to see what constituent portions we may
            // be able to use.
            const fullEnd = array.end;
            if (fullEnd >= changeStart) {
                array.intersectsChange = true;
                array._children = undefined;

                // Adjust the pos or end (or both) of the intersecting array accordingly.
                adjustIntersectingElement(array, changeStart, changeRangeOldEnd, changeRangeNewEnd, delta);
                for (const node of array) {
                    visitNode(node);
                }
                return;
            }

            // Otherwise, the array is entirely before the change range.  No need to do anything with it.
            ts.Debug.assert(fullEnd < changeStart);
        }
    }

    function extendToAffectedRange(sourceFile: ts.SourceFile, changeRange: ts.TextChangeRange): ts.TextChangeRange {
        // Consider the following code:
        //      void foo() { /; }
        //
        // If the text changes with an insertion of / just before the semicolon then we end up with:
        //      void foo() { //; }
        //
        // If we were to just use the changeRange a is, then we would not rescan the { token
        // (as it does not intersect the actual original change range).  Because an edit may
        // change the token touching it, we actually need to look back *at least* one token so
        // that the prior token sees that change.
        const maxLookahead = 1;

        let start = changeRange.span.start;

        // the first iteration aligns us with the change start. subsequent iteration move us to
        // the left by maxLookahead tokens.  We only need to do this as long as we're not at the
        // start of the tree.
        for (let i = 0; start > 0 && i <= maxLookahead; i++) {
            const nearestNode = findNearestNodeStartingBeforeOrAtPosition(sourceFile, start);
            ts.Debug.assert(nearestNode.pos <= start);
            const position = nearestNode.pos;

            start = Math.max(0, position - 1);
        }

        const finalSpan = ts.createTextSpanFromBounds(start, ts.textSpanEnd(changeRange.span));
        const finalLength = changeRange.newLength + (changeRange.span.start - start);

        return ts.createTextChangeRange(finalSpan, finalLength);
    }

    function findNearestNodeStartingBeforeOrAtPosition(sourceFile: ts.SourceFile, position: number): ts.Node {
        let bestResult: ts.Node = sourceFile;
        let lastNodeEntirelyBeforePosition: ts.Node | undefined;

        forEachChild(sourceFile, visit);

        if (lastNodeEntirelyBeforePosition) {
            const lastChildOfLastEntireNodeBeforePosition = getLastDescendant(lastNodeEntirelyBeforePosition);
            if (lastChildOfLastEntireNodeBeforePosition.pos > bestResult.pos) {
                bestResult = lastChildOfLastEntireNodeBeforePosition;
            }
        }

        return bestResult;

        function getLastDescendant(node: ts.Node): ts.Node {
            while (true) {
                const lastChild = ts.getLastChild(node);
                if (lastChild) {
                    node = lastChild;
                }
                else {
                    return node;
                }
            }
        }

        function visit(child: ts.Node) {
            if (ts.nodeIsMissing(child)) {
                // Missing nodes are effectively invisible to us.  We never even consider them
                // When trying to find the nearest node before us.
                return;
            }

            // If the child intersects this position, then this node is currently the nearest
            // node that starts before the position.
            if (child.pos <= position) {
                if (child.pos >= bestResult.pos) {
                    // This node starts before the position, and is closer to the position than
                    // the previous best node we found.  It is now the new best node.
                    bestResult = child;
                }

                // Now, the node may overlap the position, or it may end entirely before the
                // position.  If it overlaps with the position, then either it, or one of its
                // children must be the nearest node before the position.  So we can just
                // recurse into this child to see if we can find something better.
                if (position < child.end) {
                    // The nearest node is either this child, or one of the children inside
                    // of it.  We've already marked this child as the best so far.  Recurse
                    // in case one of the children is better.
                    forEachChild(child, visit);

                    // Once we look at the children of this node, then there's no need to
                    // continue any further.
                    return true;
                }
                else {
                    ts.Debug.assert(child.end <= position);
                    // The child ends entirely before this position.  Say you have the following
                    // (where $ is the position)
                    //
                    //      <complex expr 1> ? <complex expr 2> $ : <...> <...>
                    //
                    // We would want to find the nearest preceding node in "complex expr 2".
                    // To support that, we keep track of this node, and once we're done searching
                    // for a best node, we recurse down this node to see if we can find a good
                    // result in it.
                    //
                    // This approach allows us to quickly skip over nodes that are entirely
                    // before the position, while still allowing us to find any nodes in the
                    // last one that might be what we want.
                    lastNodeEntirelyBeforePosition = child;
                }
            }
            else {
                ts.Debug.assert(child.pos > position);
                // We're now at a node that is entirely past the position we're searching for.
                // This node (and all following nodes) could never contribute to the result,
                // so just skip them by returning 'true' here.
                return true;
            }
        }
    }

    function checkChangeRange(sourceFile: ts.SourceFile, newText: string, textChangeRange: ts.TextChangeRange, aggressiveChecks: boolean) {
        const oldText = sourceFile.text;
        if (textChangeRange) {
            ts.Debug.assert((oldText.length - textChangeRange.span.length + textChangeRange.newLength) === newText.length);

            if (aggressiveChecks || ts.Debug.shouldAssert(ts.AssertionLevel.VeryAggressive)) {
                const oldTextPrefix = oldText.substr(0, textChangeRange.span.start);
                const newTextPrefix = newText.substr(0, textChangeRange.span.start);
                ts.Debug.assert(oldTextPrefix === newTextPrefix);

                const oldTextSuffix = oldText.substring(ts.textSpanEnd(textChangeRange.span), oldText.length);
                const newTextSuffix = newText.substring(ts.textSpanEnd(ts.textChangeRangeNewSpan(textChangeRange)), newText.length);
                ts.Debug.assert(oldTextSuffix === newTextSuffix);
            }
        }
    }

    interface IncrementalElement extends ts.ReadonlyTextRange {
        readonly parent: ts.Node;
        intersectsChange: boolean;
        length?: number;
        _children: ts.Node[] | undefined;
    }

    export interface IncrementalNode extends ts.Node, IncrementalElement {
        hasBeenIncrementallyParsed: boolean;
    }

    interface IncrementalNodeArray extends ts.NodeArray<IncrementalNode>, IncrementalElement {
        length: number;
    }

    // Allows finding nodes in the source file at a certain position in an efficient manner.
    // The implementation takes advantage of the calling pattern it knows the parser will
    // make in order to optimize finding nodes as quickly as possible.
    export interface SyntaxCursor {
        currentNode(position: number): IncrementalNode;
    }

    export function createSyntaxCursor(sourceFile: ts.SourceFile): SyntaxCursor {
        let currentArray: ts.NodeArray<ts.Node> = sourceFile.statements;
        let currentArrayIndex = 0;

        ts.Debug.assert(currentArrayIndex < currentArray.length);
        let current = currentArray[currentArrayIndex];
        let lastQueriedPosition = InvalidPosition.Value;

        return {
            currentNode(position: number) {
                // Only compute the current node if the position is different than the last time
                // we were asked.  The parser commonly asks for the node at the same position
                // twice.  Once to know if can read an appropriate list element at a certain point,
                // and then to actually read and consume the node.
                if (position !== lastQueriedPosition) {
                    // Much of the time the parser will need the very next node in the array that
                    // we just returned a node from.So just simply check for that case and move
                    // forward in the array instead of searching for the node again.
                    if (current && current.end === position && currentArrayIndex < (currentArray.length - 1)) {
                        currentArrayIndex++;
                        current = currentArray[currentArrayIndex];
                    }

                    // If we don't have a node, or the node we have isn't in the right position,
                    // then try to find a viable node at the position requested.
                    if (!current || current.pos !== position) {
                        findHighestListElementThatStartsAtPosition(position);
                    }
                }

                // Cache this query so that we don't do any extra work if the parser calls back
                // into us.  Note: this is very common as the parser will make pairs of calls like
                // 'isListElement -> parseListElement'.  If we were unable to find a node when
                // called with 'isListElement', we don't want to redo the work when parseListElement
                // is called immediately after.
                lastQueriedPosition = position;

                // Either we don'd have a node, or we have a node at the position being asked for.
                ts.Debug.assert(!current || current.pos === position);
                return current as IncrementalNode;
            }
        };

        // Finds the highest element in the tree we can find that starts at the provided position.
        // The element must be a direct child of some node list in the tree.  This way after we
        // return it, we can easily return its next sibling in the list.
        function findHighestListElementThatStartsAtPosition(position: number) {
            // Clear out any cached state about the last node we found.
            currentArray = undefined!;
            currentArrayIndex = InvalidPosition.Value;
            current = undefined!;

            // Recurse into the source file to find the highest node at this position.
            forEachChild(sourceFile, visitNode, visitArray);
            return;

            function visitNode(node: ts.Node) {
                if (position >= node.pos && position < node.end) {
                    // Position was within this node.  Keep searching deeper to find the node.
                    forEachChild(node, visitNode, visitArray);

                    // don't proceed any further in the search.
                    return true;
                }

                // position wasn't in this node, have to keep searching.
                return false;
            }

            function visitArray(array: ts.NodeArray<ts.Node>) {
                if (position >= array.pos && position < array.end) {
                    // position was in this array.  Search through this array to see if we find a
                    // viable element.
                    for (let i = 0; i < array.length; i++) {
                        const child = array[i];
                        if (child) {
                            if (child.pos === position) {
                                // Found the right node.  We're done.
                                currentArray = array;
                                currentArrayIndex = i;
                                current = child;
                                return true;
                            }
                            else {
                                if (child.pos < position && position < child.end) {
                                    // Position in somewhere within this child.  Search in it and
                                    // stop searching in this array.
                                    forEachChild(child, visitNode, visitArray);
                                    return true;
                                }
                            }
                        }
                    }
                }

                // position wasn't in this array, have to keep searching.
                return false;
            }
        }
    }

    const enum InvalidPosition {
        Value = -1
    }
}

/** @internal */
export function isDeclarationFileName(fileName: string): boolean {
    return ts.fileExtensionIsOneOf(fileName, ts.supportedDeclarationExtensions);
}

/*@internal*/
export interface PragmaContext {
    languageVersion: ts.ScriptTarget;
    pragmas?: ts.PragmaMap;
    checkJsDirective?: ts.CheckJsDirective;
    referencedFiles: ts.FileReference[];
    typeReferenceDirectives: ts.FileReference[];
    libReferenceDirectives: ts.FileReference[];
    amdDependencies: ts.AmdDependency[];
    hasNoDefaultLib?: boolean;
    moduleName?: string;
}

function parseResolutionMode(mode: string | undefined, pos: number, end: number, reportDiagnostic: PragmaDiagnosticReporter): ts.ModuleKind.ESNext | ts.ModuleKind.CommonJS | undefined {
    if (!mode) {
        return undefined;
    }
    if (mode === "import") {
        return ts.ModuleKind.ESNext;
    }
    if (mode === "require") {
        return ts.ModuleKind.CommonJS;
    }
    reportDiagnostic(pos, end - pos, ts.Diagnostics.resolution_mode_should_be_either_require_or_import);
    return undefined;
}

/*@internal*/
export function processCommentPragmas(context: PragmaContext, sourceText: string): void {
    const pragmas: ts.PragmaPseudoMapEntry[] = [];

    for (const range of ts.getLeadingCommentRanges(sourceText, 0) || ts.emptyArray) {
        const comment = sourceText.substring(range.pos, range.end);
        extractPragmas(pragmas, range, comment);
    }

    context.pragmas = new ts.Map() as ts.PragmaMap;
    for (const pragma of pragmas) {
        if (context.pragmas.has(pragma.name)) {
            const currentValue = context.pragmas.get(pragma.name);
            if (currentValue instanceof Array) {
                currentValue.push(pragma.args);
            }
            else {
                context.pragmas.set(pragma.name, [currentValue, pragma.args]);
            }
            continue;
        }
        context.pragmas.set(pragma.name, pragma.args);
    }
}

/*@internal*/
type PragmaDiagnosticReporter = (pos: number, length: number, message: ts.DiagnosticMessage) => void;

/*@internal*/
export function processPragmasIntoFields(context: PragmaContext, reportDiagnostic: PragmaDiagnosticReporter): void {
    context.checkJsDirective = undefined;
    context.referencedFiles = [];
    context.typeReferenceDirectives = [];
    context.libReferenceDirectives = [];
    context.amdDependencies = [];
    context.hasNoDefaultLib = false;
    context.pragmas!.forEach((entryOrList, key) => { // TODO: GH#18217
        // TODO: The below should be strongly type-guarded and not need casts/explicit annotations, since entryOrList is related to
        // key and key is constrained to a union; but it's not (see GH#21483 for at least partial fix) :(
        switch (key) {
            case "reference": {
                const referencedFiles = context.referencedFiles;
                const typeReferenceDirectives = context.typeReferenceDirectives;
                const libReferenceDirectives = context.libReferenceDirectives;
                ts.forEach(ts.toArray(entryOrList) as ts.PragmaPseudoMap["reference"][], arg => {
                    const { types, lib, path, ["resolution-mode"]: res } = arg.arguments;
                    if (arg.arguments["no-default-lib"]) {
                        context.hasNoDefaultLib = true;
                    }
                    else if (types) {
                        const parsed = parseResolutionMode(res, types.pos, types.end, reportDiagnostic);
                        typeReferenceDirectives.push({ pos: types.pos, end: types.end, fileName: types.value, ...(parsed ? { resolutionMode: parsed } : {}) });
                    }
                    else if (lib) {
                        libReferenceDirectives.push({ pos: lib.pos, end: lib.end, fileName: lib.value });
                    }
                    else if (path) {
                        referencedFiles.push({ pos: path.pos, end: path.end, fileName: path.value });
                    }
                    else {
                        reportDiagnostic(arg.range.pos, arg.range.end - arg.range.pos, ts.Diagnostics.Invalid_reference_directive_syntax);
                    }
                });
                break;
            }
            case "amd-dependency": {
                context.amdDependencies = ts.map(
                    ts.toArray(entryOrList) as ts.PragmaPseudoMap["amd-dependency"][],
                    x => ({ name: x.arguments.name, path: x.arguments.path }));
                break;
            }
            case "amd-module": {
                if (entryOrList instanceof Array) {
                    for (const entry of entryOrList) {
                        if (context.moduleName) {
                            // TODO: It's probably fine to issue this diagnostic on all instances of the pragma
                            reportDiagnostic(entry.range.pos, entry.range.end - entry.range.pos, ts.Diagnostics.An_AMD_module_cannot_have_multiple_name_assignments);
                        }
                        context.moduleName = (entry as ts.PragmaPseudoMap["amd-module"]).arguments.name;
                    }
                }
                else {
                    context.moduleName = (entryOrList as ts.PragmaPseudoMap["amd-module"]).arguments.name;
                }
                break;
            }
            case "ts-nocheck":
            case "ts-check": {
                // _last_ of either nocheck or check in a file is the "winner"
                ts.forEach(ts.toArray(entryOrList), entry => {
                    if (!context.checkJsDirective || entry.range.pos > context.checkJsDirective.pos) {
                        context.checkJsDirective = {
                            enabled: key === "ts-check",
                            end: entry.range.end,
                            pos: entry.range.pos
                        };
                    }
                });
                break;
            }
            case "jsx":
            case "jsxfrag":
            case "jsximportsource":
            case "jsxruntime":
                return; // Accessed directly
            default: ts.Debug.fail("Unhandled pragma kind"); // Can this be made into an assertNever in the future?
        }
    });
}

const namedArgRegExCache = new ts.Map<string, RegExp>();
function getNamedArgRegEx(name: string): RegExp {
    if (namedArgRegExCache.has(name)) {
        return namedArgRegExCache.get(name)!;
    }
    const result = new RegExp(`(\\s${name}\\s*=\\s*)(?:(?:'([^']*)')|(?:"([^"]*)"))`, "im");
    namedArgRegExCache.set(name, result);
    return result;
}

const tripleSlashXMLCommentStartRegEx = /^\/\/\/\s*<(\S+)\s.*?\/>/im;
const singleLinePragmaRegEx = /^\/\/\/?\s*@(\S+)\s*(.*)\s*$/im;
function extractPragmas(pragmas: ts.PragmaPseudoMapEntry[], range: ts.CommentRange, text: string) {
    const tripleSlash = range.kind === ts.SyntaxKind.SingleLineCommentTrivia && tripleSlashXMLCommentStartRegEx.exec(text);
    if (tripleSlash) {
        const name = tripleSlash[1].toLowerCase() as keyof ts.PragmaPseudoMap; // Technically unsafe cast, but we do it so the below check to make it safe typechecks
        const pragma = ts.commentPragmas[name] as ts.PragmaDefinition;
        if (!pragma || !(pragma.kind! & ts.PragmaKindFlags.TripleSlashXML)) {
            return;
        }
        if (pragma.args) {
            const argument: {[index: string]: string | {value: string, pos: number, end: number}} = {};
            for (const arg of pragma.args) {
                const matcher = getNamedArgRegEx(arg.name);
                const matchResult = matcher.exec(text);
                if (!matchResult && !arg.optional) {
                    return; // Missing required argument, don't parse
                }
                else if (matchResult) {
                    const value = matchResult[2] || matchResult[3];
                    if (arg.captureSpan) {
                        const startPos = range.pos + matchResult.index + matchResult[1].length + 1;
                        argument[arg.name] = {
                            value,
                            pos: startPos,
                            end: startPos + value.length
                        };
                    }
                    else {
                        argument[arg.name] = value;
                    }
                }
            }
            pragmas.push({ name, args: { arguments: argument, range } } as ts.PragmaPseudoMapEntry);
        }
        else {
            pragmas.push({ name, args: { arguments: {}, range } } as ts.PragmaPseudoMapEntry);
        }
        return;
    }

    const singleLine = range.kind === ts.SyntaxKind.SingleLineCommentTrivia && singleLinePragmaRegEx.exec(text);
    if (singleLine) {
        return addPragmaForMatch(pragmas, range, ts.PragmaKindFlags.SingleLine, singleLine);
    }

    if (range.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
        const multiLinePragmaRegEx = /@(\S+)(\s+.*)?$/gim; // Defined inline since it uses the "g" flag, which keeps a persistent index (for iterating)
        let multiLineMatch: RegExpExecArray | null;
        while (multiLineMatch = multiLinePragmaRegEx.exec(text)) {
            addPragmaForMatch(pragmas, range, ts.PragmaKindFlags.MultiLine, multiLineMatch);
        }
    }
}

function addPragmaForMatch(pragmas: ts.PragmaPseudoMapEntry[], range: ts.CommentRange, kind: ts.PragmaKindFlags, match: RegExpExecArray) {
    if (!match) return;
    const name = match[1].toLowerCase() as keyof ts.PragmaPseudoMap; // Technically unsafe cast, but we do it so they below check to make it safe typechecks
    const pragma = ts.commentPragmas[name] as ts.PragmaDefinition;
    if (!pragma || !(pragma.kind! & kind)) {
        return;
    }
    const args = match[2]; // Split on spaces and match up positionally with definition
    const argument = getNamedPragmaArguments(pragma, args);
    if (argument === "fail") return; // Missing required argument, fail to parse it
    pragmas.push({ name, args: { arguments: argument, range } } as ts.PragmaPseudoMapEntry);
    return;
}

function getNamedPragmaArguments(pragma: ts.PragmaDefinition, text: string | undefined): {[index: string]: string} | "fail" {
    if (!text) return {};
    if (!pragma.args) return {};
    const args = ts.trimString(text).split(/\s+/);
    const argMap: {[index: string]: string} = {};
    for (let i = 0; i < pragma.args.length; i++) {
        const argument = pragma.args[i];
        if (!args[i] && !argument.optional) {
            return "fail";
        }
        if (argument.captureSpan) {
            return ts.Debug.fail("Capture spans not yet implemented for non-xml pragmas");
        }
        argMap[argument.name] = args[i];
    }
    return argMap;
}

/** @internal */
export function tagNamesAreEquivalent(lhs: ts.JsxTagNameExpression, rhs: ts.JsxTagNameExpression): boolean {
    if (lhs.kind !== rhs.kind) {
        return false;
    }

    if (lhs.kind === ts.SyntaxKind.Identifier) {
        return lhs.escapedText === (rhs as ts.Identifier).escapedText;
    }

    if (lhs.kind === ts.SyntaxKind.ThisKeyword) {
        return true;
    }

    // If we are at this statement then we must have PropertyAccessExpression and because tag name in Jsx element can only
    // take forms of JsxTagNameExpression which includes an identifier, "this" expression, or another propertyAccessExpression
    // it is safe to case the expression property as such. See parseJsxElementName for how we parse tag name in Jsx element
    return (lhs as ts.PropertyAccessExpression).name.escapedText === (rhs as ts.PropertyAccessExpression).name.escapedText &&
        tagNamesAreEquivalent((lhs as ts.PropertyAccessExpression).expression as ts.JsxTagNameExpression, (rhs as ts.PropertyAccessExpression).expression as ts.JsxTagNameExpression);
}
}
