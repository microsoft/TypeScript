// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// !!! THIS FILE IS AUTO-GENERATED - DO NOT EDIT !!!
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//
// Source: _packages/ast/src/nodes.ts
// Generator: _packages/ast/scripts/generateVisitor.ts
//

import { SyntaxKind } from "#enums/syntaxKind";
import {
    createNodeArray,
    updateArrayBindingPattern,
    updateArrayLiteralExpression,
    updateArrayTypeNode,
    updateArrowFunction,
    updateAsExpression,
    updateAwaitExpression,
    updateBinaryExpression,
    updateBindingElement,
    updateBlock,
    updateBreakStatement,
    updateCallExpression,
    updateCallSignatureDeclaration,
    updateCaseBlock,
    updateCaseClause,
    updateCatchClause,
    updateClassDeclaration,
    updateClassExpression,
    updateClassStaticBlockDeclaration,
    updateCommaListExpression,
    updateComputedPropertyName,
    updateConditionalExpression,
    updateConditionalTypeNode,
    updateConstructorDeclaration,
    updateConstructorTypeNode,
    updateConstructSignatureDeclaration,
    updateContinueStatement,
    updateDecorator,
    updateDefaultClause,
    updateDeleteExpression,
    updateDoStatement,
    updateElementAccessExpression,
    updateEnumDeclaration,
    updateEnumMember,
    updateExportAssignment,
    updateExportDeclaration,
    updateExportSpecifier,
    updateExpressionStatement,
    updateExpressionWithTypeArguments,
    updateExternalModuleReference,
    updateForInStatement,
    updateForOfStatement,
    updateForStatement,
    updateFunctionDeclaration,
    updateFunctionExpression,
    updateFunctionTypeNode,
    updateGetAccessorDeclaration,
    updateHeritageClause,
    updateIfStatement,
    updateImportAttribute,
    updateImportAttributes,
    updateImportClause,
    updateImportDeclaration,
    updateImportEqualsDeclaration,
    updateImportSpecifier,
    updateImportTypeNode,
    updateIndexedAccessTypeNode,
    updateIndexSignatureDeclaration,
    updateInferTypeNode,
    updateInterfaceDeclaration,
    updateIntersectionTypeNode,
    updateJSDoc,
    updateJSDocAugmentsTag,
    updateJSDocCallbackTag,
    updateJSDocDeprecatedTag,
    updateJSDocImplementsTag,
    updateJSDocImportTag,
    updateJSDocLink,
    updateJSDocLinkCode,
    updateJSDocLinkPlain,
    updateJSDocMemberName,
    updateJSDocNameReference,
    updateJSDocNonNullableType,
    updateJSDocNullableType,
    updateJSDocOptionalType,
    updateJSDocOverloadTag,
    updateJSDocOverrideTag,
    updateJSDocParameterTag,
    updateJSDocPrivateTag,
    updateJSDocProtectedTag,
    updateJSDocPublicTag,
    updateJSDocReadonlyTag,
    updateJSDocReturnTag,
    updateJSDocSatisfiesTag,
    updateJSDocSeeTag,
    updateJSDocSignature,
    updateJSDocTemplateTag,
    updateJSDocThisTag,
    updateJSDocTypedefTag,
    updateJSDocTypeExpression,
    updateJSDocTypeTag,
    updateJSDocUnknownTag,
    updateJSDocVariadicType,
    updateJsxAttribute,
    updateJsxAttributes,
    updateJsxClosingElement,
    updateJsxElement,
    updateJsxExpression,
    updateJsxFragment,
    updateJsxNamespacedName,
    updateJsxOpeningElement,
    updateJsxSelfClosingElement,
    updateJsxSpreadAttribute,
    updateLabeledStatement,
    updateLiteralTypeNode,
    updateMappedTypeNode,
    updateMetaProperty,
    updateMethodDeclaration,
    updateMethodSignature,
    updateModuleBlock,
    updateModuleDeclaration,
    updateNamedExports,
    updateNamedImports,
    updateNamedTupleMember,
    updateNamespaceExport,
    updateNamespaceExportDeclaration,
    updateNamespaceImport,
    updateNewExpression,
    updateNonNullExpression,
    updateObjectBindingPattern,
    updateObjectLiteralExpression,
    updateOptionalTypeNode,
    updateParameterDeclaration,
    updateParenthesizedExpression,
    updateParenthesizedTypeNode,
    updatePartiallyEmittedExpression,
    updatePostfixUnaryExpression,
    updatePrefixUnaryExpression,
    updatePropertyAccessExpression,
    updatePropertyAssignment,
    updatePropertyDeclaration,
    updatePropertySignature,
    updateQualifiedName,
    updateRestTypeNode,
    updateReturnStatement,
    updateSatisfiesExpression,
    updateSetAccessorDeclaration,
    updateShorthandPropertyAssignment,
    updateSourceFile,
    updateSpreadAssignment,
    updateSpreadElement,
    updateSwitchStatement,
    updateTaggedTemplateExpression,
    updateTemplateExpression,
    updateTemplateLiteralTypeNode,
    updateTemplateLiteralTypeSpan,
    updateTemplateSpan,
    updateThrowStatement,
    updateTryStatement,
    updateTupleTypeNode,
    updateTypeAliasDeclaration,
    updateTypeAssertion,
    updateTypeLiteralNode,
    updateTypeOfExpression,
    updateTypeOperatorNode,
    updateTypeParameterDeclaration,
    updateTypePredicateNode,
    updateTypeQueryNode,
    updateTypeReferenceNode,
    updateUnionTypeNode,
    updateVariableDeclaration,
    updateVariableDeclarationList,
    updateVariableStatement,
    updateVoidExpression,
    updateWhileStatement,
    updateWithStatement,
    updateYieldExpression,
} from "./factory.ts";
import {
    isAssertsKeyword,
    isAsteriskToken,
    isAwaitKeyword,
    isBinaryOperatorToken,
    isBindingName,
    isBlock,
    isCaseBlock,
    isCatchClause,
    isColonToken,
    isConciseBody,
    isDotDotDotToken,
    isEndOfFile,
    isEntityName,
    isEntityNameOrJSDocMemberName,
    isEqualsGreaterThanToken,
    isEqualsToken,
    isExclamationToken,
    isExpression,
    isExpressionWithTypeArguments,
    isForInitializer,
    isFunctionBody,
    isIdentifier,
    isIdentifierOrJSDocNamespaceDeclaration,
    isIdentifierOrThisTypeNode,
    isImportAttributeName,
    isImportAttributes,
    isImportClause,
    isJSDocNameReference,
    isJSDocReturnTag,
    isJSDocSignature,
    isJSDocTypeExpression,
    isJSDocTypeExpressionOrJSDocTypeLiteral,
    isJsxAttributeName,
    isJsxAttributes,
    isJsxAttributeValue,
    isJsxClosingElement,
    isJsxClosingFragment,
    isJsxOpeningElement,
    isJsxOpeningFragment,
    isJsxTagNameExpression,
    isLeftHandSideExpression,
    isLiteralTypeLiteral,
    isMemberName,
    isModuleBody,
    isModuleExportName,
    isModuleName,
    isModuleReference,
    isNamedExportBindings,
    isNamedImportBindings,
    isPropertyName,
    isQuestionDotToken,
    isQuestionOrExclamationToken,
    isQuestionOrPlusOrMinusToken,
    isQuestionToken,
    isReadonlyKeywordOrPlusOrMinusToken,
    isStatement,
    isTemplateHead,
    isTemplateLiteral,
    isTemplateMiddleOrTemplateTail,
    isTypeNode,
    isTypeParameterDeclaration,
    isUnaryExpression,
    isVariableDeclaration,
    isVariableDeclarationList,
} from "./is.ts";
import type {
    ArrayBindingPattern,
    ArrayLiteralExpression,
    ArrayTypeNode,
    ArrowFunction,
    AsExpression,
    AwaitExpression,
    BinaryExpression,
    BindingElement,
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
    ImportTypeNode,
    IndexedAccessTypeNode,
    IndexSignatureDeclaration,
    InferTypeNode,
    InterfaceDeclaration,
    IntersectionTypeNode,
    JSDoc,
    JSDocAugmentsTag,
    JSDocCallbackTag,
    JSDocDeprecatedTag,
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
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSeeTag,
    JSDocSignature,
    JSDocTemplateTag,
    JSDocThisTag,
    JSDocTypedefTag,
    JSDocTypeExpression,
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
    JsxOpeningElement,
    JsxSelfClosingElement,
    JsxSpreadAttribute,
    LabeledStatement,
    LiteralTypeNode,
    MappedTypeNode,
    MetaProperty,
    MethodDeclaration,
    MethodSignature,
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
    ObjectBindingPattern,
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
    TaggedTemplateExpression,
    TemplateExpression,
    TemplateLiteralTypeNode,
    TemplateLiteralTypeSpan,
    TemplateSpan,
    ThrowStatement,
    TryStatement,
    TupleTypeNode,
    TypeAliasDeclaration,
    TypeAssertion,
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
} from "./nodes.ts";

/**
 * A callback that receives a node and returns a visited node (or undefined to remove it).
 */
export type Visitor = (node: Node) => Node | undefined;

/**
 * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
 *
 * - If the input node is undefined, then the output is undefined.
 * - If the visitor returns undefined, then the output is undefined.
 * - If the output node is not undefined, then it will satisfy the test function.
 * - In order to obtain a return type that is more specific than `Node`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * @param node The Node to visit.
 * @param visitor The callback used to visit the Node.
 * @param test A callback to execute to verify the Node is valid.
 */
export function visitNode<TIn extends Node | undefined, TOut extends Node>(
    node: TIn,
    visitor: Visitor,
    test: (node: Node) => node is TOut,
): TOut | (TIn & undefined);
/**
 * Visits a Node using the supplied visitor, possibly returning a new Node in its place.
 *
 * - If the input node is undefined, then the output is undefined.
 * - If the visitor returns undefined, then the output is undefined.
 *
 * @param node The Node to visit.
 * @param visitor The callback used to visit the Node.
 * @param test An optional callback to execute to verify the Node is valid.
 */
export function visitNode<TIn extends Node | undefined>(
    node: TIn,
    visitor: Visitor,
    test?: (node: Node) => boolean,
): Node | (TIn & undefined);
export function visitNode(node: Node | undefined, visitor: Visitor, test?: (node: Node) => boolean): Node | undefined {
    if (node === undefined) return undefined;
    const visited = visitor(node);
    if (visited !== undefined && test !== undefined && !test(visited)) {
        throw new Error("Visited node failed test assertion.");
    }
    return visited;
}

/**
 * Visits a NodeArray using the supplied visitor, possibly returning a new NodeArray in its place.
 *
 * - If the input node array is undefined, the output is undefined.
 * - If the visitor returns undefined for a node, that node is dropped from the result.
 */
export function visitNodes<T extends Node>(nodes: NodeArray<T>, visitor: Visitor): NodeArray<T>;
export function visitNodes<T extends Node>(nodes: NodeArray<T> | undefined, visitor: Visitor): NodeArray<T> | undefined;
export function visitNodes(nodes: NodeArray<Node> | undefined, visitor: Visitor): NodeArray<Node> | undefined {
    if (nodes === undefined) return undefined;
    let updated: Node[] | undefined;
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const visited = visitor(node);
        if (updated) {
            if (visited) updated.push(visited);
        }
        else if (visited !== node) {
            updated = [];
            for (let j = 0; j < i; j++) updated.push(nodes[j]);
            if (visited) updated.push(visited);
        }
    }
    if (!updated) return nodes;
    return createNodeArray(updated, nodes.pos, nodes.end);
}

/**
 * Visits each child of a Node using the supplied visitor, possibly returning a new Node of the same kind in its place.
 *
 * @param node The Node whose children will be visited.
 * @param visitor The callback used to visit each child.
 * @returns The original node if no children changed, or a new node with visited children.
 */
export function visitEachChild<T extends Node>(node: T, visitor: Visitor): T;
export function visitEachChild<T extends Node>(node: T | undefined, visitor: Visitor): T | undefined;
export function visitEachChild(node: Node | undefined, visitor: Visitor): Node | undefined {
    if (node === undefined) return undefined;
    const fn = visitEachChildTable[node.kind];
    return fn ? fn(node, visitor) : node;
}

type VisitEachChildFunction = (node: any, visitor: Visitor) => Node;

const visitEachChildTable: Record<number, VisitEachChildFunction> = {
    [SyntaxKind.ArrayBindingPattern]: (node: ArrayBindingPattern, visitor: Visitor): ArrayBindingPattern => {
        const _elements = visitNodes(node.elements, visitor);
        return updateArrayBindingPattern(node, _elements);
    },
    [SyntaxKind.ArrayLiteralExpression]: (node: ArrayLiteralExpression, visitor: Visitor): ArrayLiteralExpression => {
        const _elements = visitNodes(node.elements, visitor);
        return updateArrayLiteralExpression(node, _elements);
    },
    [SyntaxKind.ArrayType]: (node: ArrayTypeNode, visitor: Visitor): ArrayTypeNode => {
        const _elementType = visitNode(node.elementType, visitor, isTypeNode);
        return updateArrayTypeNode(node, _elementType);
    },
    [SyntaxKind.ArrowFunction]: (node: ArrowFunction, visitor: Visitor): ArrowFunction => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _equalsGreaterThanToken = visitNode(node.equalsGreaterThanToken, visitor, isEqualsGreaterThanToken);
        const _body = visitNode(node.body, visitor, isConciseBody);
        return updateArrowFunction(node, _modifiers, _typeParameters, _parameters, _type, _equalsGreaterThanToken, _body);
    },
    [SyntaxKind.AsExpression]: (node: AsExpression, visitor: Visitor): AsExpression => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateAsExpression(node, _expression, _type);
    },
    [SyntaxKind.AwaitExpression]: (node: AwaitExpression, visitor: Visitor): AwaitExpression => {
        const _expression = visitNode(node.expression, visitor, isUnaryExpression);
        return updateAwaitExpression(node, _expression);
    },
    [SyntaxKind.BinaryExpression]: (node: BinaryExpression, visitor: Visitor): BinaryExpression => {
        const _left = visitNode(node.left, visitor, isExpression);
        const _operatorToken = visitNode(node.operatorToken, visitor, isBinaryOperatorToken);
        const _right = visitNode(node.right, visitor, isExpression);
        return updateBinaryExpression(node, _left, _operatorToken, _right);
    },
    [SyntaxKind.BindingElement]: (node: BindingElement, visitor: Visitor): BindingElement => {
        const _dotDotDotToken = visitNode(node.dotDotDotToken, visitor, isDotDotDotToken);
        const _propertyName = visitNode(node.propertyName, visitor, isPropertyName);
        const _name = visitNode(node.name, visitor, isBindingName);
        const _initializer = visitNode(node.initializer, visitor, isExpression);
        return updateBindingElement(node, _dotDotDotToken, _propertyName, _name, _initializer);
    },
    [SyntaxKind.Block]: (node: Block, visitor: Visitor): Block => {
        const _statements = visitNodes(node.statements, visitor);
        return updateBlock(node, _statements);
    },
    [SyntaxKind.BreakStatement]: (node: BreakStatement, visitor: Visitor): BreakStatement => {
        const _label = visitNode(node.label, visitor, isIdentifier);
        return updateBreakStatement(node, _label);
    },
    [SyntaxKind.CallExpression]: (node: CallExpression, visitor: Visitor): CallExpression => {
        const _expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
        const _questionDotToken = visitNode(node.questionDotToken, visitor, isQuestionDotToken);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        const _arguments = visitNodes(node.arguments, visitor);
        return updateCallExpression(node, _expression, _questionDotToken, _typeArguments, _arguments);
    },
    [SyntaxKind.CallSignature]: (node: CallSignatureDeclaration, visitor: Visitor): CallSignatureDeclaration => {
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateCallSignatureDeclaration(node, _typeParameters, _parameters, _type);
    },
    [SyntaxKind.CaseBlock]: (node: CaseBlock, visitor: Visitor): CaseBlock => {
        const _clauses = visitNodes(node.clauses, visitor);
        return updateCaseBlock(node, _clauses);
    },
    [SyntaxKind.CaseClause]: (node: CaseClause, visitor: Visitor): CaseClause => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _statements = visitNodes(node.statements, visitor);
        return updateCaseClause(node, _expression, _statements);
    },
    [SyntaxKind.CatchClause]: (node: CatchClause, visitor: Visitor): CatchClause => {
        const _variableDeclaration = visitNode(node.variableDeclaration, visitor, isVariableDeclaration);
        const _block = visitNode(node.block, visitor, isBlock);
        return updateCatchClause(node, _variableDeclaration, _block);
    },
    [SyntaxKind.ClassDeclaration]: (node: ClassDeclaration, visitor: Visitor): ClassDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _heritageClauses = visitNodes(node.heritageClauses, visitor);
        const _members = visitNodes(node.members, visitor);
        return updateClassDeclaration(node, _modifiers, _name, _typeParameters, _heritageClauses, _members);
    },
    [SyntaxKind.ClassExpression]: (node: ClassExpression, visitor: Visitor): ClassExpression => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _heritageClauses = visitNodes(node.heritageClauses, visitor);
        const _members = visitNodes(node.members, visitor);
        return updateClassExpression(node, _modifiers, _name, _typeParameters, _heritageClauses, _members);
    },
    [SyntaxKind.ClassStaticBlockDeclaration]: (node: ClassStaticBlockDeclaration, visitor: Visitor): ClassStaticBlockDeclaration => {
        const _body = visitNode(node.body, visitor, isBlock);
        return updateClassStaticBlockDeclaration(node, _body);
    },
    [SyntaxKind.CommaListExpression]: (node: CommaListExpression, visitor: Visitor): CommaListExpression => {
        const _elements = visitNodes(node.elements, visitor);
        return updateCommaListExpression(node, _elements);
    },
    [SyntaxKind.ComputedPropertyName]: (node: ComputedPropertyName, visitor: Visitor): ComputedPropertyName => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateComputedPropertyName(node, _expression);
    },
    [SyntaxKind.ConditionalExpression]: (node: ConditionalExpression, visitor: Visitor): ConditionalExpression => {
        const _condition = visitNode(node.condition, visitor, isExpression);
        const _questionToken = visitNode(node.questionToken, visitor, isQuestionToken);
        const _whenTrue = visitNode(node.whenTrue, visitor, isExpression);
        const _colonToken = visitNode(node.colonToken, visitor, isColonToken);
        const _whenFalse = visitNode(node.whenFalse, visitor, isExpression);
        return updateConditionalExpression(node, _condition, _questionToken, _whenTrue, _colonToken, _whenFalse);
    },
    [SyntaxKind.ConditionalType]: (node: ConditionalTypeNode, visitor: Visitor): ConditionalTypeNode => {
        const _checkType = visitNode(node.checkType, visitor, isTypeNode);
        const _extendsType = visitNode(node.extendsType, visitor, isTypeNode);
        const _trueType = visitNode(node.trueType, visitor, isTypeNode);
        const _falseType = visitNode(node.falseType, visitor, isTypeNode);
        return updateConditionalTypeNode(node, _checkType, _extendsType, _trueType, _falseType);
    },
    [SyntaxKind.Constructor]: (node: ConstructorDeclaration, visitor: Visitor): ConstructorDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _body = visitNode(node.body, visitor, isFunctionBody);
        return updateConstructorDeclaration(node, _modifiers, _parameters, _body);
    },
    [SyntaxKind.ConstructorType]: (node: ConstructorTypeNode, visitor: Visitor): ConstructorTypeNode => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateConstructorTypeNode(node, _modifiers, _typeParameters, _parameters, _type);
    },
    [SyntaxKind.ConstructSignature]: (node: ConstructSignatureDeclaration, visitor: Visitor): ConstructSignatureDeclaration => {
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateConstructSignatureDeclaration(node, _typeParameters, _parameters, _type);
    },
    [SyntaxKind.ContinueStatement]: (node: ContinueStatement, visitor: Visitor): ContinueStatement => {
        const _label = visitNode(node.label, visitor, isIdentifier);
        return updateContinueStatement(node, _label);
    },
    [SyntaxKind.Decorator]: (node: Decorator, visitor: Visitor): Decorator => {
        const _expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
        return updateDecorator(node, _expression);
    },
    [SyntaxKind.DefaultClause]: (node: DefaultClause, visitor: Visitor): DefaultClause => {
        const _statements = visitNodes(node.statements, visitor);
        return updateDefaultClause(node, _statements);
    },
    [SyntaxKind.DeleteExpression]: (node: DeleteExpression, visitor: Visitor): DeleteExpression => {
        const _expression = visitNode(node.expression, visitor, isUnaryExpression);
        return updateDeleteExpression(node, _expression);
    },
    [SyntaxKind.DoStatement]: (node: DoStatement, visitor: Visitor): DoStatement => {
        const _statement = visitNode(node.statement, visitor, isStatement);
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateDoStatement(node, _statement, _expression);
    },
    [SyntaxKind.ElementAccessExpression]: (node: ElementAccessExpression, visitor: Visitor): ElementAccessExpression => {
        const _expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
        const _questionDotToken = visitNode(node.questionDotToken, visitor, isQuestionDotToken);
        const _argumentExpression = visitNode(node.argumentExpression, visitor, isExpression);
        return updateElementAccessExpression(node, _expression, _questionDotToken, _argumentExpression);
    },
    [SyntaxKind.EnumDeclaration]: (node: EnumDeclaration, visitor: Visitor): EnumDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _members = visitNodes(node.members, visitor);
        return updateEnumDeclaration(node, _modifiers, _name, _members);
    },
    [SyntaxKind.EnumMember]: (node: EnumMember, visitor: Visitor): EnumMember => {
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _initializer = visitNode(node.initializer, visitor, isExpression);
        return updateEnumMember(node, _name, _initializer);
    },
    [SyntaxKind.ExportAssignment]: (node: ExportAssignment, visitor: Visitor): ExportAssignment => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateExportAssignment(node, _modifiers, _expression);
    },
    [SyntaxKind.ExportDeclaration]: (node: ExportDeclaration, visitor: Visitor): ExportDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _exportClause = visitNode(node.exportClause, visitor, isNamedExportBindings);
        const _moduleSpecifier = visitNode(node.moduleSpecifier, visitor, isExpression);
        const _attributes = visitNode(node.attributes, visitor, isImportAttributes);
        return updateExportDeclaration(node, _modifiers, _exportClause, _moduleSpecifier, _attributes);
    },
    [SyntaxKind.ExportSpecifier]: (node: ExportSpecifier, visitor: Visitor): ExportSpecifier => {
        const _propertyName = visitNode(node.propertyName, visitor, isModuleExportName);
        const _name = visitNode(node.name, visitor, isModuleExportName);
        return updateExportSpecifier(node, _propertyName, _name);
    },
    [SyntaxKind.ExpressionStatement]: (node: ExpressionStatement, visitor: Visitor): ExpressionStatement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateExpressionStatement(node, _expression);
    },
    [SyntaxKind.ExpressionWithTypeArguments]: (node: ExpressionWithTypeArguments, visitor: Visitor): ExpressionWithTypeArguments => {
        const _expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        return updateExpressionWithTypeArguments(node, _expression, _typeArguments);
    },
    [SyntaxKind.ExternalModuleReference]: (node: ExternalModuleReference, visitor: Visitor): ExternalModuleReference => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateExternalModuleReference(node, _expression);
    },
    [SyntaxKind.ForInStatement]: (node: ForInStatement, visitor: Visitor): ForInStatement => {
        const _initializer = visitNode(node.initializer, visitor, isForInitializer);
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _statement = visitNode(node.statement, visitor, isStatement);
        return updateForInStatement(node, _initializer, _expression, _statement);
    },
    [SyntaxKind.ForOfStatement]: (node: ForOfStatement, visitor: Visitor): ForOfStatement => {
        const _awaitModifier = visitNode(node.awaitModifier, visitor, isAwaitKeyword);
        const _initializer = visitNode(node.initializer, visitor, isForInitializer);
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _statement = visitNode(node.statement, visitor, isStatement);
        return updateForOfStatement(node, _awaitModifier, _initializer, _expression, _statement);
    },
    [SyntaxKind.ForStatement]: (node: ForStatement, visitor: Visitor): ForStatement => {
        const _initializer = visitNode(node.initializer, visitor, isForInitializer);
        const _condition = visitNode(node.condition, visitor, isExpression);
        const _incrementor = visitNode(node.incrementor, visitor, isExpression);
        const _statement = visitNode(node.statement, visitor, isStatement);
        return updateForStatement(node, _initializer, _condition, _incrementor, _statement);
    },
    [SyntaxKind.FunctionDeclaration]: (node: FunctionDeclaration, visitor: Visitor): FunctionDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _asteriskToken = visitNode(node.asteriskToken, visitor, isAsteriskToken);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _body = visitNode(node.body, visitor, isFunctionBody);
        return updateFunctionDeclaration(node, _modifiers, _asteriskToken, _name, _typeParameters, _parameters, _type, _body);
    },
    [SyntaxKind.FunctionExpression]: (node: FunctionExpression, visitor: Visitor): FunctionExpression => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _asteriskToken = visitNode(node.asteriskToken, visitor, isAsteriskToken);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _body = visitNode(node.body, visitor, isFunctionBody);
        return updateFunctionExpression(node, _modifiers, _asteriskToken, _name, _typeParameters, _parameters, _type, _body);
    },
    [SyntaxKind.FunctionType]: (node: FunctionTypeNode, visitor: Visitor): FunctionTypeNode => {
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateFunctionTypeNode(node, _typeParameters, _parameters, _type);
    },
    [SyntaxKind.GetAccessor]: (node: GetAccessorDeclaration, visitor: Visitor): GetAccessorDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _body = visitNode(node.body, visitor, isFunctionBody);
        return updateGetAccessorDeclaration(node, _modifiers, _name, _parameters, _type, _body);
    },
    [SyntaxKind.HeritageClause]: (node: HeritageClause, visitor: Visitor): HeritageClause => {
        const _types = visitNodes(node.types, visitor);
        return updateHeritageClause(node, _types);
    },
    [SyntaxKind.IfStatement]: (node: IfStatement, visitor: Visitor): IfStatement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _thenStatement = visitNode(node.thenStatement, visitor, isStatement);
        const _elseStatement = visitNode(node.elseStatement, visitor, isStatement);
        return updateIfStatement(node, _expression, _thenStatement, _elseStatement);
    },
    [SyntaxKind.ImportAttribute]: (node: ImportAttribute, visitor: Visitor): ImportAttribute => {
        const _name = visitNode(node.name, visitor, isImportAttributeName);
        const _value = visitNode(node.value, visitor, isExpression);
        return updateImportAttribute(node, _name, _value);
    },
    [SyntaxKind.ImportAttributes]: (node: ImportAttributes, visitor: Visitor): ImportAttributes => {
        const _elements = visitNodes(node.elements, visitor);
        return updateImportAttributes(node, _elements);
    },
    [SyntaxKind.ImportClause]: (node: ImportClause, visitor: Visitor): ImportClause => {
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _namedBindings = visitNode(node.namedBindings, visitor, isNamedImportBindings);
        return updateImportClause(node, _name, _namedBindings);
    },
    [SyntaxKind.ImportDeclaration]: (node: ImportDeclaration, visitor: Visitor): ImportDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _importClause = visitNode(node.importClause, visitor, isImportClause);
        const _moduleSpecifier = visitNode(node.moduleSpecifier, visitor, isExpression);
        const _attributes = visitNode(node.attributes, visitor, isImportAttributes);
        return updateImportDeclaration(node, _modifiers, _importClause, _moduleSpecifier, _attributes);
    },
    [SyntaxKind.ImportEqualsDeclaration]: (node: ImportEqualsDeclaration, visitor: Visitor): ImportEqualsDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _moduleReference = visitNode(node.moduleReference, visitor, isModuleReference);
        return updateImportEqualsDeclaration(node, _modifiers, _name, _moduleReference);
    },
    [SyntaxKind.ImportSpecifier]: (node: ImportSpecifier, visitor: Visitor): ImportSpecifier => {
        const _propertyName = visitNode(node.propertyName, visitor, isModuleExportName);
        const _name = visitNode(node.name, visitor, isIdentifier);
        return updateImportSpecifier(node, _propertyName, _name);
    },
    [SyntaxKind.ImportType]: (node: ImportTypeNode, visitor: Visitor): ImportTypeNode => {
        const _argument = visitNode(node.argument, visitor, isTypeNode);
        const _attributes = visitNode(node.attributes, visitor, isImportAttributes);
        const _qualifier = visitNode(node.qualifier, visitor, isEntityName);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        return updateImportTypeNode(node, _argument, _attributes, _qualifier, _typeArguments);
    },
    [SyntaxKind.IndexedAccessType]: (node: IndexedAccessTypeNode, visitor: Visitor): IndexedAccessTypeNode => {
        const _objectType = visitNode(node.objectType, visitor, isTypeNode);
        const _indexType = visitNode(node.indexType, visitor, isTypeNode);
        return updateIndexedAccessTypeNode(node, _objectType, _indexType);
    },
    [SyntaxKind.IndexSignature]: (node: IndexSignatureDeclaration, visitor: Visitor): IndexSignatureDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateIndexSignatureDeclaration(node, _modifiers, _parameters, _type);
    },
    [SyntaxKind.InferType]: (node: InferTypeNode, visitor: Visitor): InferTypeNode => {
        const _typeParameter = visitNode(node.typeParameter, visitor, isTypeParameterDeclaration);
        return updateInferTypeNode(node, _typeParameter);
    },
    [SyntaxKind.InterfaceDeclaration]: (node: InterfaceDeclaration, visitor: Visitor): InterfaceDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _heritageClauses = visitNodes(node.heritageClauses, visitor);
        const _members = visitNodes(node.members, visitor);
        return updateInterfaceDeclaration(node, _modifiers, _name, _typeParameters, _heritageClauses, _members);
    },
    [SyntaxKind.IntersectionType]: (node: IntersectionTypeNode, visitor: Visitor): IntersectionTypeNode => {
        const _types = visitNodes(node.types, visitor);
        return updateIntersectionTypeNode(node, _types);
    },
    [SyntaxKind.JSDoc]: (node: JSDoc, visitor: Visitor): JSDoc => {
        const _tags = visitNodes(node.tags, visitor);
        return updateJSDoc(node, _tags);
    },
    [SyntaxKind.JSDocAugmentsTag]: (node: JSDocAugmentsTag, visitor: Visitor): JSDocAugmentsTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _class = visitNode(node.class, visitor, isExpressionWithTypeArguments) as typeof node.class;
        return updateJSDocAugmentsTag(node, _tagName, _class);
    },
    [SyntaxKind.JSDocCallbackTag]: (node: JSDocCallbackTag, visitor: Visitor): JSDocCallbackTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _typeExpression = visitNode(node.typeExpression, visitor, isJSDocSignature);
        const _fullName = visitNode(node.fullName, visitor, isIdentifierOrJSDocNamespaceDeclaration);
        return updateJSDocCallbackTag(node, _tagName, _typeExpression, _fullName);
    },
    [SyntaxKind.JSDocDeprecatedTag]: (node: JSDocDeprecatedTag, visitor: Visitor): JSDocDeprecatedTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocDeprecatedTag(node, _tagName);
    },
    [SyntaxKind.JSDocImplementsTag]: (node: JSDocImplementsTag, visitor: Visitor): JSDocImplementsTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _class = visitNode(node.class, visitor, isExpressionWithTypeArguments) as typeof node.class;
        return updateJSDocImplementsTag(node, _tagName, _class);
    },
    [SyntaxKind.JSDocImportTag]: (node: JSDocImportTag, visitor: Visitor): JSDocImportTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _importClause = visitNode(node.importClause, visitor, isImportClause);
        const _moduleSpecifier = visitNode(node.moduleSpecifier, visitor, isExpression);
        const _attributes = visitNode(node.attributes, visitor, isImportAttributes);
        return updateJSDocImportTag(node, _tagName, _importClause, _moduleSpecifier, _attributes);
    },
    [SyntaxKind.JSDocLink]: (node: JSDocLink, visitor: Visitor): JSDocLink => {
        const _name = visitNode(node.name, visitor, isEntityNameOrJSDocMemberName);
        return updateJSDocLink(node, _name);
    },
    [SyntaxKind.JSDocLinkCode]: (node: JSDocLinkCode, visitor: Visitor): JSDocLinkCode => {
        const _name = visitNode(node.name, visitor, isEntityNameOrJSDocMemberName);
        return updateJSDocLinkCode(node, _name);
    },
    [SyntaxKind.JSDocLinkPlain]: (node: JSDocLinkPlain, visitor: Visitor): JSDocLinkPlain => {
        const _name = visitNode(node.name, visitor, isEntityNameOrJSDocMemberName);
        return updateJSDocLinkPlain(node, _name);
    },
    [SyntaxKind.JSDocMemberName]: (node: JSDocMemberName, visitor: Visitor): JSDocMemberName => {
        const _left = visitNode(node.left, visitor, isEntityNameOrJSDocMemberName);
        const _right = visitNode(node.right, visitor, isIdentifier);
        return updateJSDocMemberName(node, _left, _right);
    },
    [SyntaxKind.JSDocNameReference]: (node: JSDocNameReference, visitor: Visitor): JSDocNameReference => {
        const _name = visitNode(node.name, visitor, isEntityNameOrJSDocMemberName);
        return updateJSDocNameReference(node, _name);
    },
    [SyntaxKind.JSDocNonNullableType]: (node: JSDocNonNullableType, visitor: Visitor): JSDocNonNullableType => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateJSDocNonNullableType(node, _type);
    },
    [SyntaxKind.JSDocNullableType]: (node: JSDocNullableType, visitor: Visitor): JSDocNullableType => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateJSDocNullableType(node, _type);
    },
    [SyntaxKind.JSDocOptionalType]: (node: JSDocOptionalType, visitor: Visitor): JSDocOptionalType => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateJSDocOptionalType(node, _type);
    },
    [SyntaxKind.JSDocOverloadTag]: (node: JSDocOverloadTag, visitor: Visitor): JSDocOverloadTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _typeExpression = visitNode(node.typeExpression, visitor, isJSDocSignature);
        return updateJSDocOverloadTag(node, _tagName, _typeExpression);
    },
    [SyntaxKind.JSDocOverrideTag]: (node: JSDocOverrideTag, visitor: Visitor): JSDocOverrideTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocOverrideTag(node, _tagName);
    },
    [SyntaxKind.JSDocParameterTag]: (node: JSDocParameterTag, visitor: Visitor): JSDocParameterTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocParameterTag(node, _tagName);
    },
    [SyntaxKind.JSDocPrivateTag]: (node: JSDocPrivateTag, visitor: Visitor): JSDocPrivateTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocPrivateTag(node, _tagName);
    },
    [SyntaxKind.JSDocProtectedTag]: (node: JSDocProtectedTag, visitor: Visitor): JSDocProtectedTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocProtectedTag(node, _tagName);
    },
    [SyntaxKind.JSDocPublicTag]: (node: JSDocPublicTag, visitor: Visitor): JSDocPublicTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocPublicTag(node, _tagName);
    },
    [SyntaxKind.JSDocReadonlyTag]: (node: JSDocReadonlyTag, visitor: Visitor): JSDocReadonlyTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocReadonlyTag(node, _tagName);
    },
    [SyntaxKind.JSDocReturnTag]: (node: JSDocReturnTag, visitor: Visitor): JSDocReturnTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _typeExpression = visitNode(node.typeExpression, visitor, isJSDocTypeExpression);
        return updateJSDocReturnTag(node, _tagName, _typeExpression);
    },
    [SyntaxKind.JSDocSatisfiesTag]: (node: JSDocSatisfiesTag, visitor: Visitor): JSDocSatisfiesTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _typeExpression = visitNode(node.typeExpression, visitor, isJSDocTypeExpression);
        return updateJSDocSatisfiesTag(node, _tagName, _typeExpression);
    },
    [SyntaxKind.JSDocSeeTag]: (node: JSDocSeeTag, visitor: Visitor): JSDocSeeTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _name = visitNode(node.name, visitor, isJSDocNameReference);
        return updateJSDocSeeTag(node, _tagName, _name);
    },
    [SyntaxKind.JSDocSignature]: (node: JSDocSignature, visitor: Visitor): JSDocSignature => {
        const _type = visitNode(node.type, visitor, isJSDocReturnTag);
        return updateJSDocSignature(node, _type);
    },
    [SyntaxKind.JSDocTemplateTag]: (node: JSDocTemplateTag, visitor: Visitor): JSDocTemplateTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _constraint = visitNode(node.constraint, visitor, isJSDocTypeExpression);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        return updateJSDocTemplateTag(node, _tagName, _constraint, _typeParameters);
    },
    [SyntaxKind.JSDocThisTag]: (node: JSDocThisTag, visitor: Visitor): JSDocThisTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _typeExpression = visitNode(node.typeExpression, visitor, isJSDocTypeExpression);
        return updateJSDocThisTag(node, _tagName, _typeExpression);
    },
    [SyntaxKind.JSDocTypedefTag]: (node: JSDocTypedefTag, visitor: Visitor): JSDocTypedefTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _typeExpression = visitNode(node.typeExpression, visitor, isJSDocTypeExpressionOrJSDocTypeLiteral);
        const _fullName = visitNode(node.fullName, visitor, isIdentifierOrJSDocNamespaceDeclaration);
        return updateJSDocTypedefTag(node, _tagName, _typeExpression, _fullName);
    },
    [SyntaxKind.JSDocTypeExpression]: (node: JSDocTypeExpression, visitor: Visitor): JSDocTypeExpression => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateJSDocTypeExpression(node, _type);
    },
    [SyntaxKind.JSDocTypeTag]: (node: JSDocTypeTag, visitor: Visitor): JSDocTypeTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        const _typeExpression = visitNode(node.typeExpression, visitor, isJSDocTypeExpression);
        return updateJSDocTypeTag(node, _tagName, _typeExpression);
    },
    [SyntaxKind.JSDocTag]: (node: JSDocUnknownTag, visitor: Visitor): JSDocUnknownTag => {
        const _tagName = visitNode(node.tagName, visitor, isIdentifier);
        return updateJSDocUnknownTag(node, _tagName);
    },
    [SyntaxKind.JSDocVariadicType]: (node: JSDocVariadicType, visitor: Visitor): JSDocVariadicType => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateJSDocVariadicType(node, _type);
    },
    [SyntaxKind.JsxAttribute]: (node: JsxAttribute, visitor: Visitor): JsxAttribute => {
        const _name = visitNode(node.name, visitor, isJsxAttributeName);
        const _initializer = visitNode(node.initializer, visitor, isJsxAttributeValue);
        return updateJsxAttribute(node, _name, _initializer);
    },
    [SyntaxKind.JsxAttributes]: (node: JsxAttributes, visitor: Visitor): JsxAttributes => {
        const _properties = visitNodes(node.properties, visitor);
        return updateJsxAttributes(node, _properties);
    },
    [SyntaxKind.JsxClosingElement]: (node: JsxClosingElement, visitor: Visitor): JsxClosingElement => {
        const _tagName = visitNode(node.tagName, visitor, isJsxTagNameExpression);
        return updateJsxClosingElement(node, _tagName);
    },
    [SyntaxKind.JsxElement]: (node: JsxElement, visitor: Visitor): JsxElement => {
        const _openingElement = visitNode(node.openingElement, visitor, isJsxOpeningElement);
        const _children = visitNodes(node.children, visitor);
        const _closingElement = visitNode(node.closingElement, visitor, isJsxClosingElement);
        return updateJsxElement(node, _openingElement, _children, _closingElement);
    },
    [SyntaxKind.JsxExpression]: (node: JsxExpression, visitor: Visitor): JsxExpression => {
        const _dotDotDotToken = visitNode(node.dotDotDotToken, visitor, isDotDotDotToken);
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateJsxExpression(node, _dotDotDotToken, _expression);
    },
    [SyntaxKind.JsxFragment]: (node: JsxFragment, visitor: Visitor): JsxFragment => {
        const _openingFragment = visitNode(node.openingFragment, visitor, isJsxOpeningFragment);
        const _children = visitNodes(node.children, visitor);
        const _closingFragment = visitNode(node.closingFragment, visitor, isJsxClosingFragment);
        return updateJsxFragment(node, _openingFragment, _children, _closingFragment);
    },
    [SyntaxKind.JsxNamespacedName]: (node: JsxNamespacedName, visitor: Visitor): JsxNamespacedName => {
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _namespace = visitNode(node.namespace, visitor, isIdentifier);
        return updateJsxNamespacedName(node, _name, _namespace);
    },
    [SyntaxKind.JsxOpeningElement]: (node: JsxOpeningElement, visitor: Visitor): JsxOpeningElement => {
        const _tagName = visitNode(node.tagName, visitor, isJsxTagNameExpression);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        const _attributes = visitNode(node.attributes, visitor, isJsxAttributes);
        return updateJsxOpeningElement(node, _tagName, _typeArguments, _attributes);
    },
    [SyntaxKind.JsxSelfClosingElement]: (node: JsxSelfClosingElement, visitor: Visitor): JsxSelfClosingElement => {
        const _tagName = visitNode(node.tagName, visitor, isJsxTagNameExpression);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        const _attributes = visitNode(node.attributes, visitor, isJsxAttributes);
        return updateJsxSelfClosingElement(node, _tagName, _typeArguments, _attributes);
    },
    [SyntaxKind.JsxSpreadAttribute]: (node: JsxSpreadAttribute, visitor: Visitor): JsxSpreadAttribute => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateJsxSpreadAttribute(node, _expression);
    },
    [SyntaxKind.LabeledStatement]: (node: LabeledStatement, visitor: Visitor): LabeledStatement => {
        const _label = visitNode(node.label, visitor, isIdentifier);
        const _statement = visitNode(node.statement, visitor, isStatement);
        return updateLabeledStatement(node, _label, _statement);
    },
    [SyntaxKind.LiteralType]: (node: LiteralTypeNode, visitor: Visitor): LiteralTypeNode => {
        const _literal = visitNode(node.literal, visitor, isLiteralTypeLiteral);
        return updateLiteralTypeNode(node, _literal);
    },
    [SyntaxKind.MappedType]: (node: MappedTypeNode, visitor: Visitor): MappedTypeNode => {
        const _readonlyToken = visitNode(node.readonlyToken, visitor, isReadonlyKeywordOrPlusOrMinusToken);
        const _typeParameter = visitNode(node.typeParameter, visitor, isTypeParameterDeclaration);
        const _nameType = visitNode(node.nameType, visitor, isTypeNode);
        const _questionToken = visitNode(node.questionToken, visitor, isQuestionOrPlusOrMinusToken);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _members = visitNodes(node.members, visitor);
        return updateMappedTypeNode(node, _readonlyToken, _typeParameter, _nameType, _questionToken, _type, _members);
    },
    [SyntaxKind.MetaProperty]: (node: MetaProperty, visitor: Visitor): MetaProperty => {
        const _name = visitNode(node.name, visitor, isIdentifier);
        return updateMetaProperty(node, _name);
    },
    [SyntaxKind.MethodDeclaration]: (node: MethodDeclaration, visitor: Visitor): MethodDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _asteriskToken = visitNode(node.asteriskToken, visitor, isAsteriskToken);
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _postfixToken = visitNode(node.postfixToken, visitor, isQuestionToken);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _body = visitNode(node.body, visitor, isFunctionBody);
        return updateMethodDeclaration(node, _modifiers, _asteriskToken, _name, _postfixToken, _typeParameters, _parameters, _type, _body);
    },
    [SyntaxKind.MethodSignature]: (node: MethodSignature, visitor: Visitor): MethodSignature => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _postfixToken = visitNode(node.postfixToken, visitor, isQuestionToken);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _parameters = visitNodes(node.parameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateMethodSignature(node, _modifiers, _name, _postfixToken, _typeParameters, _parameters, _type);
    },
    [SyntaxKind.ModuleBlock]: (node: ModuleBlock, visitor: Visitor): ModuleBlock => {
        const _statements = visitNodes(node.statements, visitor);
        return updateModuleBlock(node, _statements);
    },
    [SyntaxKind.ModuleDeclaration]: (node: ModuleDeclaration, visitor: Visitor): ModuleDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isModuleName);
        const _body = visitNode(node.body, visitor, isModuleBody);
        return updateModuleDeclaration(node, _modifiers, _name, _body);
    },
    [SyntaxKind.NamedExports]: (node: NamedExports, visitor: Visitor): NamedExports => {
        const _elements = visitNodes(node.elements, visitor);
        return updateNamedExports(node, _elements);
    },
    [SyntaxKind.NamedImports]: (node: NamedImports, visitor: Visitor): NamedImports => {
        const _elements = visitNodes(node.elements, visitor);
        return updateNamedImports(node, _elements);
    },
    [SyntaxKind.NamedTupleMember]: (node: NamedTupleMember, visitor: Visitor): NamedTupleMember => {
        const _dotDotDotToken = visitNode(node.dotDotDotToken, visitor, isDotDotDotToken);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _questionToken = visitNode(node.questionToken, visitor, isQuestionToken);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateNamedTupleMember(node, _dotDotDotToken, _name, _questionToken, _type);
    },
    [SyntaxKind.NamespaceExport]: (node: NamespaceExport, visitor: Visitor): NamespaceExport => {
        const _name = visitNode(node.name, visitor, isModuleExportName);
        return updateNamespaceExport(node, _name);
    },
    [SyntaxKind.NamespaceExportDeclaration]: (node: NamespaceExportDeclaration, visitor: Visitor): NamespaceExportDeclaration => {
        const _name = visitNode(node.name, visitor, isIdentifier);
        return updateNamespaceExportDeclaration(node, _name);
    },
    [SyntaxKind.NamespaceImport]: (node: NamespaceImport, visitor: Visitor): NamespaceImport => {
        const _name = visitNode(node.name, visitor, isIdentifier);
        return updateNamespaceImport(node, _name);
    },
    [SyntaxKind.NewExpression]: (node: NewExpression, visitor: Visitor): NewExpression => {
        const _expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        const _arguments = visitNodes(node.arguments, visitor);
        return updateNewExpression(node, _expression, _typeArguments, _arguments);
    },
    [SyntaxKind.NonNullExpression]: (node: NonNullExpression, visitor: Visitor): NonNullExpression => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateNonNullExpression(node, _expression);
    },
    [SyntaxKind.ObjectBindingPattern]: (node: ObjectBindingPattern, visitor: Visitor): ObjectBindingPattern => {
        const _elements = visitNodes(node.elements, visitor);
        return updateObjectBindingPattern(node, _elements);
    },
    [SyntaxKind.ObjectLiteralExpression]: (node: ObjectLiteralExpression, visitor: Visitor): ObjectLiteralExpression => {
        const _properties = visitNodes(node.properties, visitor);
        return updateObjectLiteralExpression(node, _properties);
    },
    [SyntaxKind.OptionalType]: (node: OptionalTypeNode, visitor: Visitor): OptionalTypeNode => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateOptionalTypeNode(node, _type);
    },
    [SyntaxKind.Parameter]: (node: ParameterDeclaration, visitor: Visitor): ParameterDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _dotDotDotToken = visitNode(node.dotDotDotToken, visitor, isDotDotDotToken);
        const _name = visitNode(node.name, visitor, isBindingName);
        const _questionToken = visitNode(node.questionToken, visitor, isQuestionToken);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _initializer = visitNode(node.initializer, visitor, isExpression);
        return updateParameterDeclaration(node, _modifiers, _dotDotDotToken, _name, _questionToken, _type, _initializer);
    },
    [SyntaxKind.ParenthesizedExpression]: (node: ParenthesizedExpression, visitor: Visitor): ParenthesizedExpression => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateParenthesizedExpression(node, _expression);
    },
    [SyntaxKind.ParenthesizedType]: (node: ParenthesizedTypeNode, visitor: Visitor): ParenthesizedTypeNode => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateParenthesizedTypeNode(node, _type);
    },
    [SyntaxKind.PartiallyEmittedExpression]: (node: PartiallyEmittedExpression, visitor: Visitor): PartiallyEmittedExpression => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updatePartiallyEmittedExpression(node, _expression);
    },
    [SyntaxKind.PostfixUnaryExpression]: (node: PostfixUnaryExpression, visitor: Visitor): PostfixUnaryExpression => {
        const _operand = visitNode(node.operand, visitor, isLeftHandSideExpression);
        return updatePostfixUnaryExpression(node, _operand);
    },
    [SyntaxKind.PrefixUnaryExpression]: (node: PrefixUnaryExpression, visitor: Visitor): PrefixUnaryExpression => {
        const _operand = visitNode(node.operand, visitor, isUnaryExpression);
        return updatePrefixUnaryExpression(node, _operand);
    },
    [SyntaxKind.PropertyAccessExpression]: (node: PropertyAccessExpression, visitor: Visitor): PropertyAccessExpression => {
        const _expression = visitNode(node.expression, visitor, isLeftHandSideExpression);
        const _questionDotToken = visitNode(node.questionDotToken, visitor, isQuestionDotToken);
        const _name = visitNode(node.name, visitor, isMemberName);
        return updatePropertyAccessExpression(node, _expression, _questionDotToken, _name);
    },
    [SyntaxKind.PropertyAssignment]: (node: PropertyAssignment, visitor: Visitor): PropertyAssignment => {
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _postfixToken = visitNode(node.postfixToken, visitor, isQuestionToken);
        const _initializer = visitNode(node.initializer, visitor, isExpression);
        return updatePropertyAssignment(node, _name, _postfixToken, _initializer);
    },
    [SyntaxKind.PropertyDeclaration]: (node: PropertyDeclaration, visitor: Visitor): PropertyDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _postfixToken = visitNode(node.postfixToken, visitor, isQuestionOrExclamationToken);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _initializer = visitNode(node.initializer, visitor, isExpression);
        return updatePropertyDeclaration(node, _modifiers, _name, _postfixToken, _type, _initializer);
    },
    [SyntaxKind.PropertySignature]: (node: PropertySignature, visitor: Visitor): PropertySignature => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _postfixToken = visitNode(node.postfixToken, visitor, isQuestionToken);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updatePropertySignature(node, _modifiers, _name, _postfixToken, _type);
    },
    [SyntaxKind.QualifiedName]: (node: QualifiedName, visitor: Visitor): QualifiedName => {
        const _left = visitNode(node.left, visitor, isEntityName);
        const _right = visitNode(node.right, visitor, isIdentifier);
        return updateQualifiedName(node, _left, _right);
    },
    [SyntaxKind.RestType]: (node: RestTypeNode, visitor: Visitor): RestTypeNode => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateRestTypeNode(node, _type);
    },
    [SyntaxKind.ReturnStatement]: (node: ReturnStatement, visitor: Visitor): ReturnStatement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateReturnStatement(node, _expression);
    },
    [SyntaxKind.SatisfiesExpression]: (node: SatisfiesExpression, visitor: Visitor): SatisfiesExpression => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateSatisfiesExpression(node, _expression, _type);
    },
    [SyntaxKind.SetAccessor]: (node: SetAccessorDeclaration, visitor: Visitor): SetAccessorDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isPropertyName);
        const _parameters = visitNodes(node.parameters, visitor);
        const _body = visitNode(node.body, visitor, isFunctionBody);
        return updateSetAccessorDeclaration(node, _modifiers, _name, _parameters, _body);
    },
    [SyntaxKind.ShorthandPropertyAssignment]: (node: ShorthandPropertyAssignment, visitor: Visitor): ShorthandPropertyAssignment => {
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _postfixToken = visitNode(node.postfixToken, visitor, isQuestionToken);
        const _equalsToken = visitNode(node.equalsToken, visitor, isEqualsToken);
        const _objectAssignmentInitializer = visitNode(node.objectAssignmentInitializer, visitor, isExpression);
        return updateShorthandPropertyAssignment(node, _name, _postfixToken, _equalsToken, _objectAssignmentInitializer);
    },
    [SyntaxKind.SourceFile]: (node: SourceFile, visitor: Visitor): SourceFile => {
        const _statements = visitNodes(node.statements, visitor);
        const _endOfFileToken = visitNode(node.endOfFileToken, visitor, isEndOfFile);
        return updateSourceFile(node, _statements, _endOfFileToken);
    },
    [SyntaxKind.SpreadAssignment]: (node: SpreadAssignment, visitor: Visitor): SpreadAssignment => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateSpreadAssignment(node, _expression);
    },
    [SyntaxKind.SpreadElement]: (node: SpreadElement, visitor: Visitor): SpreadElement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateSpreadElement(node, _expression);
    },
    [SyntaxKind.SwitchStatement]: (node: SwitchStatement, visitor: Visitor): SwitchStatement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _caseBlock = visitNode(node.caseBlock, visitor, isCaseBlock);
        return updateSwitchStatement(node, _expression, _caseBlock);
    },
    [SyntaxKind.TaggedTemplateExpression]: (node: TaggedTemplateExpression, visitor: Visitor): TaggedTemplateExpression => {
        const _tag = visitNode(node.tag, visitor, isLeftHandSideExpression);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        const _template = visitNode(node.template, visitor, isTemplateLiteral);
        return updateTaggedTemplateExpression(node, _tag, _typeArguments, _template);
    },
    [SyntaxKind.TemplateExpression]: (node: TemplateExpression, visitor: Visitor): TemplateExpression => {
        const _head = visitNode(node.head, visitor, isTemplateHead);
        const _templateSpans = visitNodes(node.templateSpans, visitor);
        return updateTemplateExpression(node, _head, _templateSpans);
    },
    [SyntaxKind.TemplateLiteralType]: (node: TemplateLiteralTypeNode, visitor: Visitor): TemplateLiteralTypeNode => {
        const _head = visitNode(node.head, visitor, isTemplateHead);
        const _templateSpans = visitNodes(node.templateSpans, visitor);
        return updateTemplateLiteralTypeNode(node, _head, _templateSpans);
    },
    [SyntaxKind.TemplateLiteralTypeSpan]: (node: TemplateLiteralTypeSpan, visitor: Visitor): TemplateLiteralTypeSpan => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _literal = visitNode(node.literal, visitor, isTemplateMiddleOrTemplateTail);
        return updateTemplateLiteralTypeSpan(node, _type, _literal);
    },
    [SyntaxKind.TemplateSpan]: (node: TemplateSpan, visitor: Visitor): TemplateSpan => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _literal = visitNode(node.literal, visitor, isTemplateMiddleOrTemplateTail);
        return updateTemplateSpan(node, _expression, _literal);
    },
    [SyntaxKind.ThrowStatement]: (node: ThrowStatement, visitor: Visitor): ThrowStatement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateThrowStatement(node, _expression);
    },
    [SyntaxKind.TryStatement]: (node: TryStatement, visitor: Visitor): TryStatement => {
        const _tryBlock = visitNode(node.tryBlock, visitor, isBlock);
        const _catchClause = visitNode(node.catchClause, visitor, isCatchClause);
        const _finallyBlock = visitNode(node.finallyBlock, visitor, isBlock);
        return updateTryStatement(node, _tryBlock, _catchClause, _finallyBlock);
    },
    [SyntaxKind.TupleType]: (node: TupleTypeNode, visitor: Visitor): TupleTypeNode => {
        const _elements = visitNodes(node.elements, visitor);
        return updateTupleTypeNode(node, _elements);
    },
    [SyntaxKind.TypeAliasDeclaration]: (node: TypeAliasDeclaration, visitor: Visitor): TypeAliasDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _typeParameters = visitNodes(node.typeParameters, visitor);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateTypeAliasDeclaration(node, _modifiers, _name, _typeParameters, _type);
    },
    [SyntaxKind.TypeAssertionExpression]: (node: TypeAssertion, visitor: Visitor): TypeAssertion => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _expression = visitNode(node.expression, visitor, isUnaryExpression);
        return updateTypeAssertion(node, _type, _expression);
    },
    [SyntaxKind.TypeLiteral]: (node: TypeLiteralNode, visitor: Visitor): TypeLiteralNode => {
        const _members = visitNodes(node.members, visitor);
        return updateTypeLiteralNode(node, _members);
    },
    [SyntaxKind.TypeOfExpression]: (node: TypeOfExpression, visitor: Visitor): TypeOfExpression => {
        const _expression = visitNode(node.expression, visitor, isUnaryExpression);
        return updateTypeOfExpression(node, _expression);
    },
    [SyntaxKind.TypeOperator]: (node: TypeOperatorNode, visitor: Visitor): TypeOperatorNode => {
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateTypeOperatorNode(node, _type);
    },
    [SyntaxKind.TypeParameter]: (node: TypeParameterDeclaration, visitor: Visitor): TypeParameterDeclaration => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _name = visitNode(node.name, visitor, isIdentifier);
        const _constraint = visitNode(node.constraint, visitor, isTypeNode);
        const _default = visitNode(node.default, visitor, isTypeNode);
        return updateTypeParameterDeclaration(node, _modifiers, _name, _constraint, _default);
    },
    [SyntaxKind.TypePredicate]: (node: TypePredicateNode, visitor: Visitor): TypePredicateNode => {
        const _assertsModifier = visitNode(node.assertsModifier, visitor, isAssertsKeyword);
        const _parameterName = visitNode(node.parameterName, visitor, isIdentifierOrThisTypeNode);
        const _type = visitNode(node.type, visitor, isTypeNode);
        return updateTypePredicateNode(node, _assertsModifier, _parameterName, _type);
    },
    [SyntaxKind.TypeQuery]: (node: TypeQueryNode, visitor: Visitor): TypeQueryNode => {
        const _exprName = visitNode(node.exprName, visitor, isEntityName);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        return updateTypeQueryNode(node, _exprName, _typeArguments);
    },
    [SyntaxKind.TypeReference]: (node: TypeReferenceNode, visitor: Visitor): TypeReferenceNode => {
        const _typeName = visitNode(node.typeName, visitor, isEntityName);
        const _typeArguments = visitNodes(node.typeArguments, visitor);
        return updateTypeReferenceNode(node, _typeName, _typeArguments);
    },
    [SyntaxKind.UnionType]: (node: UnionTypeNode, visitor: Visitor): UnionTypeNode => {
        const _types = visitNodes(node.types, visitor);
        return updateUnionTypeNode(node, _types);
    },
    [SyntaxKind.VariableDeclaration]: (node: VariableDeclaration, visitor: Visitor): VariableDeclaration => {
        const _name = visitNode(node.name, visitor, isBindingName);
        const _exclamationToken = visitNode(node.exclamationToken, visitor, isExclamationToken);
        const _type = visitNode(node.type, visitor, isTypeNode);
        const _initializer = visitNode(node.initializer, visitor, isExpression);
        return updateVariableDeclaration(node, _name, _exclamationToken, _type, _initializer);
    },
    [SyntaxKind.VariableDeclarationList]: (node: VariableDeclarationList, visitor: Visitor): VariableDeclarationList => {
        const _declarations = visitNodes(node.declarations, visitor);
        return updateVariableDeclarationList(node, _declarations);
    },
    [SyntaxKind.VariableStatement]: (node: VariableStatement, visitor: Visitor): VariableStatement => {
        const _modifiers = visitNodes(node.modifiers, visitor);
        const _declarationList = visitNode(node.declarationList, visitor, isVariableDeclarationList);
        return updateVariableStatement(node, _modifiers, _declarationList);
    },
    [SyntaxKind.VoidExpression]: (node: VoidExpression, visitor: Visitor): VoidExpression => {
        const _expression = visitNode(node.expression, visitor, isUnaryExpression);
        return updateVoidExpression(node, _expression);
    },
    [SyntaxKind.WhileStatement]: (node: WhileStatement, visitor: Visitor): WhileStatement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _statement = visitNode(node.statement, visitor, isStatement);
        return updateWhileStatement(node, _expression, _statement);
    },
    [SyntaxKind.WithStatement]: (node: WithStatement, visitor: Visitor): WithStatement => {
        const _expression = visitNode(node.expression, visitor, isExpression);
        const _statement = visitNode(node.statement, visitor, isStatement);
        return updateWithStatement(node, _expression, _statement);
    },
    [SyntaxKind.YieldExpression]: (node: YieldExpression, visitor: Visitor): YieldExpression => {
        const _asteriskToken = visitNode(node.asteriskToken, visitor, isAsteriskToken);
        const _expression = visitNode(node.expression, visitor, isExpression);
        return updateYieldExpression(node, _asteriskToken, _expression);
    },
};
