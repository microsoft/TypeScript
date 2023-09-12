import { AmdDependency, CommentDirective, Debug, Diagnostic, DiagnosticMessageChain, DiagnosticRelatedInformation, DiagnosticWithLocation, FileReference, getJSDocTypeAliasName, hasProperty, JSDocPropertyLikeTag, ReadonlyPragmaMap, setParent, SharedMap } from "../_namespaces/ts";
import { identity } from "../core";
import { ArrayBindingElement, ArrayBindingPattern, ArrayLiteralExpression, ArrayTypeNode, ArrowFunction, AsExpression, AssertClause, AssertEntry, AssertionKey, AwaitExpression, BigIntLiteral, BinaryExpression, BindingElement, BindingName, BindingPattern, Block, BreakStatement, CallExpression, CallSignatureDeclaration, CaseBlock, CaseClause, CaseOrDefaultClause, CatchClause, ClassDeclaration, ClassElement, ClassExpression, ClassStaticBlockDeclaration, ComputedPropertyName, ConciseBody, ConditionalExpression, ConditionalTypeNode, ConstructorDeclaration, ConstructorTypeNode, ConstructSignatureDeclaration, ContinueStatement, DebuggerStatement, Decorator, DefaultClause, DeleteExpression, DoStatement, ElementAccessExpression, EmptyStatement, EndOfFileToken, EntityName, EnumDeclaration, EnumMember, ExportAssignment, ExportDeclaration, ExportSpecifier, Expression, ExpressionStatement, ExpressionWithTypeArguments, ExternalModuleReference, FalseLiteral, ForInitializer, ForInStatement, ForOfStatement, ForStatement, FunctionDeclaration, FunctionExpression, FunctionTypeNode, GetAccessorDeclaration, HeritageClause, Identifier, IfStatement, ImportClause, ImportDeclaration, ImportEqualsDeclaration, ImportExpression, ImportSpecifier, ImportTypeAssertionContainer, ImportTypeNode, IndexedAccessTypeNode, IndexSignatureDeclaration, InferTypeNode, InterfaceDeclaration, IntersectionTypeNode, JSDoc, JSDocAllType, JSDocAugmentsTag, JSDocAuthorTag, JSDocCallbackTag, JSDocClassTag, JSDocComment, JSDocContainer, JSDocDeprecatedTag, JSDocEnumTag, JSDocFunctionType, JSDocImplementsTag, JSDocLink, JSDocLinkCode, JSDocLinkPlain, JSDocMemberName, JSDocNamepathType, JSDocNameReference, JSDocNamespaceDeclaration, JSDocNonNullableType, JSDocNullableType, JSDocOptionalType, JSDocOverloadTag, JSDocOverrideTag, JSDocParameterTag, JSDocPrivateTag, JSDocPropertyTag, JSDocProtectedTag, JSDocPublicTag, JSDocReadonlyTag, JSDocReturnTag, JSDocSatisfiesTag, JSDocSeeTag, JSDocSignature, JSDocTag, JSDocTemplateTag, JSDocText, JSDocThisTag, JSDocThrowsTag, JSDocTypedefTag, JSDocTypeExpression, JSDocTypeLiteral, JSDocTypeTag, JSDocUnknownTag, JSDocUnknownType, JSDocVariadicType, JsxAttribute, JsxAttributeLike, JsxAttributeName, JsxAttributes, JsxAttributeValue, JsxChild, JsxClosingElement, JsxClosingFragment, JsxElement, JsxExpression, JsxFragment, JsxNamespacedName, JsxOpeningElement, JsxOpeningFragment, JsxSelfClosingElement, JsxSpreadAttribute, JsxTagNameExpression, JsxTagNamePropertyAccess, JsxText, KeywordTypeNode, LabeledStatement, LeftHandSideExpression, LiteralTypeNode, MappedTypeNode, MemberExpression, MemberName, MetaProperty, MethodDeclaration, MethodSignature, MissingDeclaration, Modifier, ModifierLike, ModuleBlock, ModuleBody, ModuleDeclaration, ModuleName, ModuleReference, MutableNodeArray, NamedExportBindings, NamedExports, NamedImportBindings, NamedImports, NamedTupleMember, NamespaceDeclaration, NamespaceExport, NamespaceExportDeclaration, NamespaceImport, NewExpression, Node, NodeArray, NodeFactory, NonNullExpression, NoSubstitutionTemplateLiteral, NullLiteral, NumericLiteral, ObjectBindingPattern, ObjectLiteralElementLike, ObjectLiteralExpression, OmittedExpression, OptionalTypeNode, ParameterDeclaration, ParenthesizedExpression, ParenthesizedTypeNode, PostfixUnaryExpression, PrefixUnaryExpression, PrimaryExpression, PrivateIdentifier, PropertyAccessEntityNameExpression, PropertyAccessExpression, PropertyAssignment, PropertyDeclaration, PropertyName, PropertySignature, QualifiedName, RegularExpressionLiteral, RestTypeNode, ReturnStatement, SatisfiesExpression, SemicolonClassElement, SetAccessorDeclaration, ShorthandPropertyAssignment, SourceFile, SpreadAssignment, SpreadElement, Statement, StringLiteral, SuperExpression, SwitchStatement, SyntaxKind, TaggedTemplateExpression, TemplateExpression, TemplateHead, TemplateLiteral, TemplateLiteralTypeNode, TemplateLiteralTypeSpan, TemplateMiddle, TemplateSpan, TemplateTail, ThisExpression, ThisTypeNode, ThrowStatement, Token, TokenSyntaxKind, TrueLiteral, TryStatement, TupleTypeNode, TypeAliasDeclaration, TypeAssertion, TypeElement, TypeLiteralNode, TypeNode, TypeOfExpression, TypeOperatorNode, TypeParameterDeclaration, TypePredicateNode, TypeQueryNode, TypeReferenceNode, UnaryExpression, UnionTypeNode, VariableDeclaration, VariableDeclarationList, VariableStatement, VoidExpression, WhileStatement, WithStatement, YieldExpression } from "../types";
import { Mutable } from "../utilities";
import { SharedDiagnostic, SharedDiagnosticMessageChain, SharedDiagnosticRelatedInformation, SharedDiagnosticWithLocation } from "./sharedDiagnostics";
import { SharedArrayBindingElement, SharedArrayBindingPattern, SharedArrayLiteralExpression, SharedArrayTypeNode, SharedArrowFunction, SharedAsExpression, SharedAssertClause, SharedAssertEntry, SharedAssertionKey, SharedAwaitExpression, SharedBigIntLiteral, SharedBinaryExpression, SharedBindingElement, SharedBindingName, SharedBindingPattern, SharedBlock, SharedBreakStatement, SharedCallExpression, SharedCallSignatureDeclaration, SharedCaseBlock, SharedCaseClause, SharedCaseOrDefaultClause, SharedCatchClause, SharedClassDeclaration, SharedClassElement, SharedClassExpression, SharedClassStaticBlockDeclaration, SharedComputedPropertyName, SharedConciseBody, SharedConditionalExpression, SharedConditionalTypeNode, SharedConstructorDeclaration, SharedConstructorTypeNode, SharedConstructSignatureDeclaration, SharedContinueStatement, SharedDebuggerStatement, SharedDecorator, SharedDefaultClause, SharedDeleteExpression, SharedDoStatement, SharedElementAccessExpression, SharedEmptyStatement, SharedEndOfFileToken, SharedEntityName, SharedEnumDeclaration, SharedEnumMember, SharedExportAssignment, SharedExportDeclaration, SharedExportSpecifier, SharedExpression, SharedExpressionStatement, SharedExpressionWithTypeArguments, SharedExternalModuleReference, SharedForInitializer, SharedForInStatement, SharedForOfStatement, SharedForStatement, SharedFunctionDeclaration, SharedFunctionExpression, SharedFunctionTypeNode, SharedGetAccessorDeclaration, SharedHeritageClause, SharedIdentifier, SharedIfStatement, SharedImportClause, SharedImportDeclaration, SharedImportEqualsDeclaration, SharedImportSpecifier, SharedImportTypeAssertionContainer, SharedImportTypeNode, SharedIndexedAccessTypeNode, SharedIndexSignatureDeclaration, SharedInferTypeNode, SharedInterfaceDeclaration, SharedIntersectionTypeNode, SharedJSDocAllType, SharedJSDocAugmentsTag, SharedJSDocAuthorTag, SharedJSDocCallbackTag, SharedJSDocClassTag, SharedJSDocComment, SharedJSDocContainer, SharedJSDocDeprecatedTag, SharedJSDocEnumTag, SharedJSDocFunctionType, SharedJSDocImplementsTag, SharedJSDocLink, SharedJSDocLinkCode, SharedJSDocLinkPlain, SharedJSDocMemberName, SharedJSDocNamepathType, SharedJSDocNameReference, SharedJSDocNamespaceDeclaration, SharedJSDocNode, SharedJSDocNonNullableType, SharedJSDocNullableType, SharedJSDocOptionalType, SharedJSDocOverloadTag, SharedJSDocOverrideTag, SharedJSDocParameterTag, SharedJSDocPrivateTag, SharedJSDocPropertyLikeTag, SharedJSDocPropertyTag, SharedJSDocProtectedTag, SharedJSDocPublicTag, SharedJSDocReadonlyTag, SharedJSDocReturnTag, SharedJSDocSatisfiesTag, SharedJSDocSeeTag, SharedJSDocSignature, SharedJSDocTag, SharedJSDocTemplateTag, SharedJSDocText, SharedJSDocThisTag, SharedJSDocThrowsTag, SharedJSDocTypedefTag, SharedJSDocTypeExpression, SharedJSDocTypeLiteral, SharedJSDocTypeTag, SharedJSDocUnknownTag, SharedJSDocUnknownType, SharedJSDocVariadicType, SharedJsxAttribute, SharedJsxAttributeLike, SharedJsxAttributeName, SharedJsxAttributes, SharedJsxAttributeValue, SharedJsxChild, SharedJsxClosingElement, SharedJsxClosingFragment, SharedJsxElement, SharedJsxExpression, SharedJsxFragment, SharedJsxNamespacedName, SharedJsxOpeningElement, SharedJsxOpeningFragment, SharedJsxSelfClosingElement, SharedJsxSpreadAttribute, SharedJsxTagNameExpression, SharedJsxText, SharedLabeledStatement, SharedLeftHandSideExpression, SharedLiteralTypeNode, SharedMappedTypeNode, SharedMemberExpression, SharedMemberName, SharedMetaProperty, SharedMethodDeclaration, SharedMethodSignature, SharedMissingDeclaration, SharedModifier, SharedModifierLike, SharedModuleBlock, SharedModuleBody, SharedModuleDeclaration, SharedModuleName, SharedModuleReference, SharedNamedExportBindings, SharedNamedExports, SharedNamedImportBindings, SharedNamedImports, SharedNamedTupleMember, SharedNamespaceExport, SharedNamespaceExportDeclaration, SharedNamespaceImport, SharedNewExpression, SharedNodeBase, SharedNonNullExpression, SharedNoSubstitutionTemplateLiteral, SharedNumericLiteral, SharedObjectBindingPattern, SharedObjectLiteralElement, SharedObjectLiteralExpression, SharedOmittedExpression, SharedOptionalTypeNode, SharedParameterDeclaration, SharedParenthesizedExpression, SharedParenthesizedTypeNode, SharedPostfixUnaryExpression, SharedPrefixUnaryExpression, SharedPrimaryExpression, SharedPrivateIdentifier, SharedPropertyAccessExpression, SharedPropertyAssignment, SharedPropertyDeclaration, SharedPropertyName, SharedPropertySignature, SharedQualifiedName, SharedRegularExpressionLiteral, SharedRestTypeNode, SharedReturnStatement, SharedSatisfiesExpression, SharedSemicolonClassElement, SharedSetAccessorDeclaration, SharedShorthandPropertyAssignment, SharedSourceFile, SharedSpreadAssignment, SharedSpreadElement, SharedStatement, SharedStringLiteral, SharedSwitchStatement, SharedTaggedTemplateExpression, SharedTemplateExpression, SharedTemplateHead, SharedTemplateLiteral, SharedTemplateLiteralTypeNode, SharedTemplateLiteralTypeSpan, SharedTemplateMiddle, SharedTemplateSpan, SharedTemplateTail, SharedThisTypeNode, SharedThrowStatement, SharedToken, SharedTryStatement, SharedTupleTypeNode, SharedTypeAliasDeclaration, SharedTypeAssertion, SharedTypeElement, SharedTypeLiteralNode, SharedTypeNode, SharedTypeOfExpression, SharedTypeOperatorNode, SharedTypeParameterDeclaration, SharedTypePredicateNode, SharedTypeQueryNode, SharedTypeReferenceNode, SharedUnaryExpression, SharedUnionTypeNode, SharedUpdateExpression, SharedVariableDeclaration, SharedVariableDeclarationList, SharedVariableStatement, SharedVoidExpression, SharedWhileStatement, SharedWithStatement, SharedYieldExpression } from "./sharedNode";
import { SharedNodeArray } from "./sharedNodeArray";
import { isSharedArray } from "./structs/shareable";

/** @internal */
export function adoptSharedSourceFile(sharedFile: SharedSourceFile, factory: NodeFactory, sharedCache?: ReadonlyMap<ShareableNonPrimitive, object>): SourceFile {
    let file = sharedCache?.get(sharedFile) as SourceFile | undefined;
    let cache: Map<ShareableNonPrimitive, object>;
    let needsParent: [SharedNodeBase, Node][];
    if (!file) {
        cache = new Map(sharedCache);
        needsParent = [];
        file = visitSourceFile(sharedFile);
        for (const [shared, node] of needsParent) {
            const parent = cache.get(shared.parent!) as Node;
            Debug.assert(parent);
            setParent(node, parent);
        }
        file.__sharedCache__ = cache;
    }
    return file;

    function visitToken<Kind extends TokenSyntaxKind>(shared: SharedToken<Kind>): Token<Kind> {
        return finishNode(factory.createToken(shared.kind), shared);
    }

    function visitEndOfFileToken(shared: SharedEndOfFileToken): EndOfFileToken {
        const node = factory.createToken(SyntaxKind.EndOfFileToken) as Mutable<EndOfFileToken>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitModifier(shared: SharedModifier): Modifier {
        return visitToken(shared);
    }

    function visitModifiers<T extends SharedModifierLike>(sharedNodes: SharedNodeArray<T>): NodeArray<T extends SharedDecorator ? Decorator : Modifier> {
        return visitNodes(sharedNodes, visitModifierLike) as NodeArray<T extends SharedDecorator ? Decorator : Modifier>;
    }

    function visitModifierLike(shared: SharedModifierLike): ModifierLike {
        if (shared.kind === SyntaxKind.Decorator) {
            return visitDecorator(shared);
        }
        return visitModifier(shared);
    }

    function visitEntityName(shared: SharedEntityName): EntityName {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.QualifiedName: return visitQualifiedName(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitBindingName(shared: SharedBindingName): BindingName {
        return shared.kind === SyntaxKind.Identifier ? visitIdentifier(shared) :
            visitBindingPattern(shared);
    }

    function visitPropertyName(shared: SharedPropertyName): PropertyName {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.StringLiteral: return visitStringLiteral(shared);
            case SyntaxKind.NumericLiteral: return visitNumericLiteral(shared);
            case SyntaxKind.ComputedPropertyName: return visitComputedPropertyName(shared);
            case SyntaxKind.PrivateIdentifier: return visitPrivateIdentifier(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitMemberName(shared: SharedMemberName): MemberName {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.PrivateIdentifier: return visitPrivateIdentifier(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitIdentifier(shared: SharedIdentifier): Identifier {
        const node = factory.createIdentifier("") as Mutable<Identifier>;
        node.escapedText = shared.escapedText;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitQualifiedName(shared: SharedQualifiedName): QualifiedName {
        const node = factory.createQualifiedName(
            shared.left && visit(shared.left, visitEntityName),
            shared.right && visit(shared.right, visitIdentifier)
        ) as Mutable<QualifiedName>;
        return finishNode(node, shared);
    }

    function visitComputedPropertyName(shared: SharedComputedPropertyName): ComputedPropertyName {
        const node = factory.createComputedPropertyName(
            shared.expression && visit(shared.expression, visitExpression)
        ) as Mutable<ComputedPropertyName>;
        return finishNode(node, shared);
    }

    function visitPrivateIdentifier(shared: SharedPrivateIdentifier): PrivateIdentifier {
        const node = factory.createPrivateIdentifier("#") as Mutable<PrivateIdentifier>;
        node.escapedText = shared.escapedText;
        return finishNode(node, shared);
    }

    function visitTypeParameters(sharedNodes: SharedNodeArray<SharedTypeParameterDeclaration>): NodeArray<TypeParameterDeclaration> {
        return visitNodes(sharedNodes, visitTypeParameterDeclaration);
    }

    function visitTypeParameterDeclaration(shared: SharedTypeParameterDeclaration): TypeParameterDeclaration {
        const node = factory.createTypeParameterDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitIdentifier),
            shared.constraint && visit(shared.constraint, visitTypeNode),
            shared.default && visit(shared.default, visitTypeNode),
        ) as Mutable<TypeParameterDeclaration>;
        node.expression = shared.expression && visit(shared.expression, visitExpression);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitParameters(sharedNodes: SharedNodeArray<SharedParameterDeclaration>): NodeArray<ParameterDeclaration> {
        return visitNodes(sharedNodes, visitParameterDeclaration);
    }

    function visitParameterDeclaration(shared: SharedParameterDeclaration): ParameterDeclaration {
        const node = factory.createParameterDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.dotDotDotToken && visit(shared.dotDotDotToken, visitToken),
            shared.name && visit(shared.name, visitBindingName),
            shared.questionToken && visit(shared.questionToken, visitToken),
            shared.type && visit(shared.type, visitTypeNode),
            shared.initializer && visit(shared.initializer, visitExpression)
        ) as Mutable<ParameterDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitDecorator(shared: SharedDecorator): Decorator {
        const node = factory.createDecorator(
            shared.expression && visit(shared.expression, visitExpression)
        ) as Mutable<Decorator>;
        return finishNode(node, shared);
    }

    function visitPropertySignature(shared: SharedPropertySignature): PropertySignature {
        const node = factory.createPropertySignature(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitPropertyName),
            shared.questionToken && visit(shared.questionToken, visitToken),
            shared.type && visit(shared.type, visitTypeNode)
        ) as Mutable<PropertySignature>;
        node.initializer = shared.initializer && visit(shared.initializer, visitExpression);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitCallSignatureDeclaration(shared: SharedCallSignatureDeclaration): CallSignatureDeclaration {
        const node = factory.createCallSignature(
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode)
        ) as Mutable<CallSignatureDeclaration>;
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitConstructSignatureDeclaration(shared: SharedConstructSignatureDeclaration): ConstructSignatureDeclaration {
        const node = factory.createConstructSignature(
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode)
        ) as Mutable<ConstructSignatureDeclaration>;
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitVariableDeclaration(shared: SharedVariableDeclaration): VariableDeclaration {
        const node = factory.createVariableDeclaration(
            shared.name && visit(shared.name, visitBindingName),
            shared.exclamationToken && visit(shared.exclamationToken, visitToken),
            shared.type && visit(shared.type, visitTypeNode),
            shared.initializer && visit(shared.initializer, visitExpression),
        ) as Mutable<VariableDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitVariableDeclarations(sharedNodes: SharedNodeArray<SharedVariableDeclaration>): NodeArray<VariableDeclaration> {
        return visitNodes(sharedNodes, visitVariableDeclaration);
    }

    function visitVariableDeclarationList(shared: SharedVariableDeclarationList): VariableDeclarationList {
        const node = factory.createVariableDeclarationList(
            shared.declarations && visit(shared.declarations, visitVariableDeclarations),
        ) as Mutable<VariableDeclarationList>;
        return finishNode(node, shared);
    }

    function visitBindingElement(shared: SharedBindingElement): BindingElement {
        const node = factory.createBindingElement(
            shared.dotDotDotToken && visit(shared.dotDotDotToken, visitToken),
            shared.propertyName && visit(shared.propertyName, visitPropertyName),
            shared.name && visit(shared.name, visitBindingName),
            shared.initializer && visit(shared.initializer, visitExpression),
        ) as Mutable<BindingElement>;
        return finishNode(node, shared);
    }

    function visitPropertyDeclaration(shared: SharedPropertyDeclaration): PropertyDeclaration {
        const node = factory.createPropertyDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitPropertyName),
            shared.questionToken && visit(shared.questionToken, visitToken) ||
                shared.exclamationToken && visit(shared.exclamationToken, visitToken),
            shared.type && visit(shared.type, visitTypeNode),
            shared.initializer && visit(shared.initializer, visitExpression),
        ) as Mutable<PropertyDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitPropertyAssignment(shared: SharedPropertyAssignment): PropertyAssignment {
        const node = factory.createPropertyAssignment(
            shared.name && visit(shared.name, visitPropertyName),
            shared.initializer && visit(shared.initializer, visitExpression),
        ) as Mutable<PropertyAssignment>;
        node.modifiers = shared.modifiers && visit(shared.modifiers, visitModifiers);
        node.questionToken = shared.questionToken && visit(shared.questionToken, visitToken);
        node.exclamationToken = shared.exclamationToken && visit(shared.exclamationToken, visitToken);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitShorthandPropertyAssignment(shared: SharedShorthandPropertyAssignment): ShorthandPropertyAssignment {
        const node = factory.createShorthandPropertyAssignment(
            shared.name && visit(shared.name, visitIdentifier),
            shared.objectAssignmentInitializer && visit(shared.objectAssignmentInitializer, visitExpression),
        ) as Mutable<ShorthandPropertyAssignment>;
        node.equalsToken = shared.equalsToken && visit(shared.equalsToken, visitToken);
        node.modifiers = shared.modifiers && visit(shared.modifiers, visitModifiers);
        node.questionToken = shared.questionToken && visit(shared.questionToken, visitToken);
        node.exclamationToken = shared.exclamationToken && visit(shared.exclamationToken, visitToken);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitSpreadAssignment(shared: SharedSpreadAssignment): SpreadAssignment {
        const node = factory.createSpreadAssignment(
            shared.expression && visit(shared.expression, visitExpression)
        ) as Mutable<SpreadAssignment>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitBindingPattern(shared: SharedBindingPattern): BindingPattern {
        switch (shared.kind) {
            case SyntaxKind.ObjectBindingPattern: return visitObjectBindingPattern(shared);
            case SyntaxKind.ArrayBindingPattern: return visitArrayBindingPattern(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitArrayBindingElement(shared: SharedArrayBindingElement): ArrayBindingElement {
        switch (shared.kind) {
            case SyntaxKind.BindingElement: return visitBindingElement(shared);
            case SyntaxKind.OmittedExpression: return visitOmittedExpression(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitBindingElements(sharedNodes: SharedNodeArray<SharedBindingElement>): NodeArray<BindingElement> {
        return visitNodes(sharedNodes, visitBindingElement);
    }

    function visitObjectBindingPattern(shared: SharedObjectBindingPattern): ObjectBindingPattern {
        const node = factory.createObjectBindingPattern(
            shared.elements && visit(shared.elements, visitBindingElements),
        ) as Mutable<ObjectBindingPattern>;
        return finishNode(node, shared);
    }

    function visitArrayBindingElements(sharedNodes: SharedNodeArray<SharedArrayBindingElement>): NodeArray<ArrayBindingElement> {
        return visitNodes(sharedNodes, visitArrayBindingElement);
    }

    function visitArrayBindingPattern(shared: SharedArrayBindingPattern): ArrayBindingPattern {
        const node = factory.createArrayBindingPattern(
            shared.elements && visit(shared.elements, visitArrayBindingElements),
        ) as Mutable<ArrayBindingPattern>;
        return finishNode(node, shared);
    }

    function visitFunctionDeclaration(shared: SharedFunctionDeclaration): FunctionDeclaration {
        const node = factory.createFunctionDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.asteriskToken && visit(shared.asteriskToken, visitToken),
            shared.name && visit(shared.name, visitIdentifier),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
            shared.body && visit(shared.body, visitBlock),
        ) as Mutable<FunctionDeclaration>;
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitMethodSignature(shared: SharedMethodSignature): MethodSignature {
        const node = factory.createMethodSignature(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitPropertyName),
            shared.questionToken && visit(shared.questionToken, visitToken),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<MethodSignature>;
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitMethodDeclaration(shared: SharedMethodDeclaration): MethodDeclaration {
        const node = factory.createMethodDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.asteriskToken && visit(shared.asteriskToken, visitToken),
            shared.name && visit(shared.name, visitPropertyName),
            shared.questionToken && visit(shared.questionToken, visitToken),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
            shared.body && visit(shared.body, visitBlock),
        ) as Mutable<MethodDeclaration>;
        node.exclamationToken = shared.exclamationToken && visit(shared.exclamationToken, visitToken);
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitConstructorDeclaration(shared: SharedConstructorDeclaration): ConstructorDeclaration {
        const node = factory.createConstructorDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.body && visit(shared.body, visitBlock),
        ) as Mutable<ConstructorDeclaration>;
        node.typeParameters = shared.typeParameters && visit(shared.typeParameters, visitTypeParameters);
        node.type = shared.type && visit(shared.type, visitTypeNode);
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitSemicolonClassElement(shared: SharedSemicolonClassElement): SemicolonClassElement {
        const node = factory.createSemicolonClassElement() as Mutable<SemicolonClassElement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitGetAccessorDeclaration(shared: SharedGetAccessorDeclaration): GetAccessorDeclaration {
        const node = factory.createGetAccessorDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitPropertyName),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
            shared.body && visit(shared.body, visitBlock),
        ) as Mutable<GetAccessorDeclaration>;
        node.typeParameters = shared.typeParameters && visit(shared.typeParameters, visitTypeParameters);
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitSetAccessorDeclaration(shared: SharedSetAccessorDeclaration): SetAccessorDeclaration {
        const node = factory.createSetAccessorDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitPropertyName),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.body && visit(shared.body, visitBlock),
        ) as Mutable<SetAccessorDeclaration>;
        node.typeParameters = shared.typeParameters && visit(shared.typeParameters, visitTypeParameters);
        node.type = shared.type && visit(shared.type, visitTypeNode);
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitIndexSignatureDeclaration(shared: SharedIndexSignatureDeclaration): IndexSignatureDeclaration {
        const node = factory.createIndexSignature(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<IndexSignatureDeclaration>;
        node.typeParameters = shared.typeParameters && visit(shared.typeParameters, visitTypeParameters);
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitClassStaticBlockDeclaration(shared: SharedClassStaticBlockDeclaration): ClassStaticBlockDeclaration {
        const node = factory.createClassStaticBlockDeclaration(
            shared.body && visit(shared.body, visitBlock),
        ) as Mutable<ClassStaticBlockDeclaration>;
        node.modifiers = shared.modifiers && visit(shared.modifiers, visitModifiers);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitTypeArguments(sharedNodes: SharedNodeArray<SharedTypeNode>): NodeArray<TypeNode> {
        return visitNodes(sharedNodes, visitTypeNode);
    }

    function visitTypeNode(shared: SharedTypeNode): TypeNode {
        switch (shared.kind) {
            case SyntaxKind.ImportType: return visitImportTypeNode(shared);
            case SyntaxKind.ThisType: return visitThisTypeNode(shared);
            case SyntaxKind.FunctionType: return visitFunctionTypeNode(shared);
            case SyntaxKind.ConstructorType: return visitConstructorTypeNode(shared);
            case SyntaxKind.TypeReference: return visitTypeReferenceNode(shared);
            case SyntaxKind.TypePredicate: return visitTypePredicateNode(shared);
            case SyntaxKind.TypeQuery: return visitTypeQueryNode(shared);
            case SyntaxKind.TypeLiteral: return visitTypeLiteralNode(shared);
            case SyntaxKind.ArrayType: return visitArrayTypeNode(shared);
            case SyntaxKind.TupleType: return visitTupleTypeNode(shared);
            case SyntaxKind.NamedTupleMember: return visitNamedTupleMember(shared);
            case SyntaxKind.OptionalType: return visitOptionalTypeNode(shared);
            case SyntaxKind.RestType: return visitRestTypeNode(shared);
            case SyntaxKind.UnionType: return visitUnionTypeNode(shared);
            case SyntaxKind.IntersectionType: return visitIntersectionTypeNode(shared);
            case SyntaxKind.ConditionalType: return visitConditionalTypeNode(shared);
            case SyntaxKind.InferType: return visitInferTypeNode(shared);
            case SyntaxKind.ParenthesizedType: return visitParenthesizedTypeNode(shared);
            case SyntaxKind.TypeOperator: return visitTypeOperatorNode(shared);
            case SyntaxKind.IndexedAccessType: return visitIndexedAccessTypeNode(shared);
            case SyntaxKind.MappedType: return visitMappedTypeNode(shared);
            case SyntaxKind.LiteralType: return visitLiteralTypeNode(shared);
            case SyntaxKind.TemplateLiteralType: return visitTemplateLiteralTypeNode(shared);
            case SyntaxKind.TemplateLiteralTypeSpan: return visitTemplateLiteralTypeSpan(shared);
            case SyntaxKind.JSDocTypeExpression: return visitJSDocTypeExpression(shared);
            case SyntaxKind.JSDocAllType: return visitJSDocAllType(shared);
            case SyntaxKind.JSDocUnknownType: return visitJSDocUnknownType(shared);
            case SyntaxKind.JSDocNonNullableType: return visitJSDocNonNullableType(shared);
            case SyntaxKind.JSDocNullableType: return visitJSDocNullableType(shared);
            case SyntaxKind.JSDocOptionalType: return visitJSDocOptionalType(shared);
            case SyntaxKind.JSDocFunctionType: return visitJSDocFunctionType(shared);
            case SyntaxKind.JSDocVariadicType: return visitJSDocVariadicType(shared);
            case SyntaxKind.JSDocNamepathType: return visitJSDocNamepathType(shared);
            default: return visitToken(shared) as KeywordTypeNode;
        }
    }

    function visitImportTypeAssertionContainer(shared: SharedImportTypeAssertionContainer): ImportTypeAssertionContainer {
        const node = factory.createImportTypeAssertionContainer(
            shared.assertClause && visit(shared.assertClause, visitAssertClause),
            shared.multiLine,
        ) as Mutable<ImportTypeAssertionContainer>;
        return finishNode(node, shared);
    }

    function visitImportTypeNode(shared: SharedImportTypeNode): ImportTypeNode {
        const node = factory.createImportTypeNode(
            shared.argument && visit(shared.argument, visitTypeNode),
            shared.assertions && visit(shared.assertions, visitImportTypeAssertionContainer),
            shared.qualifier && visit(shared.qualifier, visitEntityName),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
            shared.isTypeOf,
        ) as Mutable<ImportTypeNode>;
        return finishNode(node, shared);
    }

    function visitThisTypeNode(shared: SharedThisTypeNode): ThisTypeNode {
        const node = factory.createThisTypeNode() as Mutable<ThisTypeNode>;
        return finishNode(node, shared);
    }

    function visitFunctionTypeNode(shared: SharedFunctionTypeNode): FunctionTypeNode {
        const node = factory.createFunctionTypeNode(
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<FunctionTypeNode>;
        node.modifiers = shared.modifiers && visit(shared.modifiers, visitModifiers);
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitConstructorTypeNode(shared: SharedConstructorTypeNode): ConstructorTypeNode {
        const node = factory.createConstructorTypeNode(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<ConstructorTypeNode>;
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitTypeReferenceNode(shared: SharedTypeReferenceNode): TypeReferenceNode {
        const node = factory.createTypeReferenceNode(
            shared.typeName && visit(shared.typeName, visitEntityName),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
        ) as Mutable<TypeReferenceNode>;
        return finishNode(node, shared);
    }

    function visitIdentifierOrThisTypeNode(shared: SharedIdentifier | SharedThisTypeNode): Identifier | ThisTypeNode {
        return shared.kind === SyntaxKind.Identifier ?
            visitIdentifier(shared) :
            visitThisTypeNode(shared);
    }

    function visitTypePredicateNode(shared: SharedTypePredicateNode): TypePredicateNode {
        const node = factory.createTypePredicateNode(
            shared.assertsModifier && visit(shared.assertsModifier, visitToken),
            shared.parameterName && visit(shared.parameterName, visitIdentifierOrThisTypeNode),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<TypePredicateNode>;
        return finishNode(node, shared);
    }

    function visitTypeQueryNode(shared: SharedTypeQueryNode): TypeQueryNode {
        const node = factory.createTypeQueryNode(
            shared.exprName && visit(shared.exprName, visitEntityName),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
        ) as Mutable<TypeQueryNode>;
        return finishNode(node, shared);
    }

    function visitTypeLiteralNode(shared: SharedTypeLiteralNode): TypeLiteralNode {
        const node = factory.createTypeLiteralNode(
            shared.members && visit(shared.members, visitTypeElements),
        ) as Mutable<TypeLiteralNode>;
        return finishNode(node, shared);
    }

    function visitArrayTypeNode(shared: SharedArrayTypeNode): ArrayTypeNode {
        const node = factory.createArrayTypeNode(
            shared.elementType && visit(shared.elementType, visitTypeNode),
        ) as Mutable<ArrayTypeNode>;
        return finishNode(node, shared);
    }

    function visitTupleTypeElement(shared: SharedTypeNode | SharedNamedTupleMember): TypeNode | NamedTupleMember {
        return shared.kind === SyntaxKind.NamedTupleMember ? visitNamedTupleMember(shared) :
            visitTypeNode(shared);
    }

    function visitTupleTypeElements(sharedNodes: SharedNodeArray<SharedTypeNode | SharedNamedTupleMember>): NodeArray<TypeNode | NamedTupleMember> {
        return visitNodes(sharedNodes, visitTupleTypeElement);
    }

    function visitTupleTypeNode(shared: SharedTupleTypeNode): TupleTypeNode {
        const node = factory.createTupleTypeNode(
            shared.elements && visit(shared.elements, visitTupleTypeElements),
        ) as Mutable<TupleTypeNode>;
        return finishNode(node, shared);
    }

    function visitNamedTupleMember(shared: SharedNamedTupleMember): NamedTupleMember {
        const node = factory.createNamedTupleMember(
            shared.dotDotDotToken && visit(shared.dotDotDotToken, visitToken),
            shared.name && visit(shared.name, visitIdentifier),
            shared.questionToken && visit(shared.questionToken, visitToken),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<NamedTupleMember>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitOptionalTypeNode(shared: SharedOptionalTypeNode): OptionalTypeNode {
        const node = factory.createOptionalTypeNode(
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<OptionalTypeNode>;
        return finishNode(node, shared);
    }

    function visitRestTypeNode(shared: SharedRestTypeNode): RestTypeNode {
        const node = factory.createRestTypeNode(
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<RestTypeNode>;
        return finishNode(node, shared);
    }

    function visitUnionTypeNode(shared: SharedUnionTypeNode): UnionTypeNode {
        const node = factory.createUnionTypeNode(
            shared.types && visit(shared.types, visitTypeArguments),
        ) as Mutable<UnionTypeNode>;
        return finishNode(node, shared);
    }

    function visitIntersectionTypeNode(shared: SharedIntersectionTypeNode): IntersectionTypeNode {
        const node = factory.createIntersectionTypeNode(
            shared.types && visit(shared.types, visitTypeArguments),
        ) as Mutable<IntersectionTypeNode>;
        return finishNode(node, shared);
    }

    function visitConditionalTypeNode(shared: SharedConditionalTypeNode): ConditionalTypeNode {
        const node = factory.createConditionalTypeNode(
            shared.checkType && visit(shared.checkType, visitTypeNode),
            shared.extendsType && visit(shared.extendsType, visitTypeNode),
            shared.trueType && visit(shared.trueType, visitTypeNode),
            shared.falseType && visit(shared.falseType, visitTypeNode),
        ) as Mutable<ConditionalTypeNode>;
        return finishNode(node, shared);
    }

    function visitInferTypeNode(shared: SharedInferTypeNode): InferTypeNode {
        const node = factory.createInferTypeNode(
            shared.typeParameter && visit(shared.typeParameter, visitTypeParameterDeclaration),
        ) as Mutable<InferTypeNode>;
        return finishNode(node, shared);
    }

    function visitParenthesizedTypeNode(shared: SharedParenthesizedTypeNode): ParenthesizedTypeNode {
        const node = factory.createParenthesizedType(
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<ParenthesizedTypeNode>;
        return finishNode(node, shared);
    }

    function visitTypeOperatorNode(shared: SharedTypeOperatorNode): TypeOperatorNode {
        const node = factory.createTypeOperatorNode(
            shared.operator,
            shared.type && visit(shared.type, visitTypeNode)
        ) as Mutable<TypeOperatorNode>;
        return finishNode(node, shared);
    }

    function visitIndexedAccessTypeNode(shared: SharedIndexedAccessTypeNode): IndexedAccessTypeNode {
        const node = factory.createIndexedAccessTypeNode(
            shared.objectType && visit(shared.objectType, visitTypeNode),
            shared.indexType && visit(shared.indexType, visitTypeNode),
        ) as Mutable<IndexedAccessTypeNode>;
        return finishNode(node, shared);
    }

    function visitMappedTypeNode(shared: SharedMappedTypeNode): MappedTypeNode {
        const node = factory.createMappedTypeNode(
            shared.readonlyToken && visit(shared.readonlyToken, visitToken),
            shared.typeParameter && visit(shared.typeParameter, visitTypeParameterDeclaration),
            shared.nameType && visit(shared.nameType, visitTypeNode),
            shared.questionToken && visit(shared.questionToken, visitToken),
            shared.type && visit(shared.type, visitTypeNode),
            shared.members && visit(shared.members, visitTypeElements),
        ) as Mutable<MappedTypeNode>;
        return finishNode(node, shared);
    }

    function visitLiteralOfLiteralTypeNode(shared: SharedToken<SyntaxKind.NullKeyword> | SharedToken<SyntaxKind.TrueKeyword> | SharedToken<SyntaxKind.FalseKeyword> | SharedStringLiteral | SharedNumericLiteral | SharedBigIntLiteral | SharedPrefixUnaryExpression) {
        switch (shared.kind) {
            case SyntaxKind.NullKeyword: return visitToken(shared) as NullLiteral;
            case SyntaxKind.TrueKeyword: return visitToken(shared) as TrueLiteral;
            case SyntaxKind.FalseKeyword: return visitToken(shared) as FalseLiteral;
            case SyntaxKind.StringLiteral: return visitStringLiteral(shared);
            case SyntaxKind.NumericLiteral: return visitNumericLiteral(shared);
            case SyntaxKind.BigIntLiteral: return visitBigIntLiteral(shared);
            default: return visitPrefixUnaryExpression(shared);
        }
    }

    function visitLiteralTypeNode(shared: SharedLiteralTypeNode): LiteralTypeNode {
        const node = factory.createLiteralTypeNode(
            shared.literal && visit(shared.literal, visitLiteralOfLiteralTypeNode),
        ) as Mutable<LiteralTypeNode>;
        return finishNode(node, shared);
    }

    function visitStringLiteral(shared: SharedStringLiteral): StringLiteral {
        const node = factory.createStringLiteral(shared.text, shared.singleQuote) as Mutable<StringLiteral>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitTemplateLiteralTypeSpans(sharedNodes: SharedNodeArray<SharedTemplateLiteralTypeSpan>): NodeArray<TemplateLiteralTypeSpan> {
        return visitNodes(sharedNodes, visitTemplateLiteralTypeSpan);
    }

    function visitTemplateLiteralTypeNode(shared: SharedTemplateLiteralTypeNode): TemplateLiteralTypeNode {
        const node = factory.createTemplateLiteralType(
            shared.head && visit(shared.head, visitTemplateHead),
            shared.templateSpans && visit(shared.templateSpans, visitTemplateLiteralTypeSpans),
        ) as Mutable<TemplateLiteralTypeNode>;
        return finishNode(node, shared);
    }

    function visitTemplateMiddleOrTail(shared: SharedTemplateMiddle | SharedTemplateTail): TemplateMiddle | TemplateTail {
        return shared.kind === SyntaxKind.TemplateMiddle ? visitTemplateMiddle(shared) : visitTemplateTail(shared);
    }

    function visitTemplateLiteralTypeSpan(shared: SharedTemplateLiteralTypeSpan): TemplateLiteralTypeSpan {
        const node = factory.createTemplateLiteralTypeSpan(
            shared.type && visit(shared.type, visitTypeNode),
            shared.literal && visit(shared.literal, visitTemplateMiddleOrTail),
        ) as Mutable<TemplateLiteralTypeSpan>;
        return finishNode(node, shared);
    }

    function visitExpression(shared: SharedExpression): Expression {
        switch (shared.kind) {
            case SyntaxKind.OmittedExpression: return visitOmittedExpression(shared);
            case SyntaxKind.YieldExpression: return visitYieldExpression(shared);
            case SyntaxKind.BinaryExpression: return visitBinaryExpression(shared);
            case SyntaxKind.ConditionalExpression: return visitConditionalExpression(shared);
            case SyntaxKind.ArrowFunction: return visitArrowFunction(shared);
            case SyntaxKind.SpreadElement: return visitSpreadElement(shared);
            case SyntaxKind.AsExpression: return visitAsExpression(shared);
            case SyntaxKind.SatisfiesExpression: return visitSatisfiesExpression(shared);
            case SyntaxKind.JsxOpeningElement: return visitJsxOpeningElement(shared);
            case SyntaxKind.JsxOpeningFragment: return visitJsxOpeningFragment(shared);
            case SyntaxKind.JsxClosingFragment: return visitJsxClosingFragment(shared);
            case SyntaxKind.JsxExpression: return visitJsxExpression(shared);
            default: return visitUnaryExpression(shared);
        }
    }

    function visitUnaryExpression(shared: SharedUnaryExpression | SharedUpdateExpression): UnaryExpression {
        switch (shared.kind) {
            case SyntaxKind.PrefixUnaryExpression: return visitPrefixUnaryExpression(shared);
            case SyntaxKind.PostfixUnaryExpression: return visitPostfixUnaryExpression(shared);
            case SyntaxKind.DeleteExpression: return visitDeleteExpression(shared);
            case SyntaxKind.TypeOfExpression: return visitTypeOfExpression(shared);
            case SyntaxKind.VoidExpression: return visitVoidExpression(shared);
            case SyntaxKind.AwaitExpression: return visitAwaitExpression(shared);
            case SyntaxKind.TypeAssertionExpression: return visitTypeAssertion(shared);
            default: return visitLeftHandSideExpression(shared);
        }
    }

    function visitLeftHandSideExpression(shared: SharedLeftHandSideExpression): LeftHandSideExpression {
        switch (shared.kind) {
            case SyntaxKind.CallExpression: return visitCallExpression(shared);
            case SyntaxKind.NewExpression: return visitNewExpression(shared);
            case SyntaxKind.NonNullExpression: return visitNonNullExpression(shared);
            default: return visitMemberExpression(shared);
        }
    }

    function visitMemberExpression(shared: SharedMemberExpression): MemberExpression {
        switch (shared.kind) {
            case SyntaxKind.PropertyAccessExpression: return visitPropertyAccessExpression(shared);
            case SyntaxKind.ElementAccessExpression: return visitElementAccessExpression(shared);
            case SyntaxKind.ExpressionWithTypeArguments: return visitExpressionWithTypeArguments(shared);
            case SyntaxKind.TaggedTemplateExpression: return visitTaggedTemplateExpression(shared);
            default: return visitPrimaryExpression(shared);
        }
    }

    function visitPrimaryExpression(shared: SharedPrimaryExpression): PrimaryExpression {
        switch (shared.kind) {
            case SyntaxKind.NullKeyword: return visitToken(shared) as NullLiteral;
            case SyntaxKind.TrueKeyword: return visitToken(shared) as TrueLiteral;
            case SyntaxKind.FalseKeyword: return visitToken(shared) as FalseLiteral;
            case SyntaxKind.ThisKeyword: return visitToken(shared) as ThisExpression;
            case SyntaxKind.SuperKeyword: return visitToken(shared) as SuperExpression;
            case SyntaxKind.ImportKeyword: return visitToken(shared) as ImportExpression;
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.PrivateIdentifier: return visitPrivateIdentifier(shared);
            case SyntaxKind.FunctionExpression: return visitFunctionExpression(shared);
            case SyntaxKind.ClassExpression: return visitClassExpression(shared);
            case SyntaxKind.RegularExpressionLiteral: return visitRegularExpressionLiteral(shared);
            case SyntaxKind.NoSubstitutionTemplateLiteral: return visitNoSubstitutionTemplateLiteral(shared);
            case SyntaxKind.StringLiteral: return visitStringLiteral(shared);
            case SyntaxKind.NumericLiteral: return visitNumericLiteral(shared);
            case SyntaxKind.BigIntLiteral: return visitBigIntLiteral(shared);
            case SyntaxKind.TemplateExpression: return visitTemplateExpression(shared);
            case SyntaxKind.ParenthesizedExpression: return visitParenthesizedExpression(shared);
            case SyntaxKind.ArrayLiteralExpression: return visitArrayLiteralExpression(shared);
            case SyntaxKind.ObjectLiteralExpression: return visitObjectLiteralExpression(shared);
            case SyntaxKind.NewExpression: return visitNewExpression(shared);
            case SyntaxKind.MetaProperty: return visitMetaProperty(shared);
            case SyntaxKind.JsxElement: return visitJsxElement(shared);
            case SyntaxKind.JsxAttributes: return visitJsxAttributes(shared);
            case SyntaxKind.JsxSelfClosingElement: return visitJsxSelfClosingElement(shared);
            case SyntaxKind.JsxFragment: return visitJsxFragment(shared);
            case SyntaxKind.MissingDeclaration: return visitMissingDeclaration(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitOmittedExpression(shared: SharedOmittedExpression): OmittedExpression {
        const node = factory.createOmittedExpression() as Mutable<OmittedExpression>;
        return finishNode(node, shared);
    }

    function visitPrefixUnaryExpression(shared: SharedPrefixUnaryExpression): PrefixUnaryExpression {
        const node = factory.createPrefixUnaryExpression(
            shared.operator,
            shared.operand && visit(shared.operand, visitUnaryExpression),
        ) as Mutable<PrefixUnaryExpression>;
        return finishNode(node, shared);
    }

    function visitPostfixUnaryExpression(shared: SharedPostfixUnaryExpression): PostfixUnaryExpression {
        const node = factory.createPostfixUnaryExpression(
            shared.operand && visit(shared.operand, visitUnaryExpression),
            shared.operator,
        ) as Mutable<PostfixUnaryExpression>;
        return finishNode(node, shared);
    }

    function visitDeleteExpression(shared: SharedDeleteExpression): DeleteExpression {
        const node = factory.createDeleteExpression(
            shared.expression && visit(shared.expression, visitUnaryExpression),
        ) as Mutable<DeleteExpression>;
        return finishNode(node, shared);
    }

    function visitTypeOfExpression(shared: SharedTypeOfExpression): TypeOfExpression {
        const node = factory.createTypeOfExpression(
            shared.expression && visit(shared.expression, visitUnaryExpression),
        ) as Mutable<TypeOfExpression>;
        return finishNode(node, shared);
    }

    function visitVoidExpression(shared: SharedVoidExpression): VoidExpression {
        const node = factory.createVoidExpression(
            shared.expression && visit(shared.expression, visitUnaryExpression),
        ) as Mutable<VoidExpression>;
        return finishNode(node, shared);
    }

    function visitAwaitExpression(shared: SharedAwaitExpression): AwaitExpression {
        const node = factory.createAwaitExpression(
            shared.expression && visit(shared.expression, visitUnaryExpression),
        ) as Mutable<AwaitExpression>;
        return finishNode(node, shared);
    }

    function visitYieldExpression(shared: SharedYieldExpression): YieldExpression {
        const node = factory.createYieldExpression(
            shared.asteriskToken && visit(shared.asteriskToken, visitToken),
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<YieldExpression>;
        return finishNode(node, shared);
    }

    function visitBinaryExpression(shared: SharedBinaryExpression): BinaryExpression {
        const node = factory.createBinaryExpression(
            shared.left && visit(shared.left, visitExpression),
            shared.operatorToken && visit(shared.operatorToken, visitToken),
            shared.right && visit(shared.right, visitExpression)
        ) as Mutable<BinaryExpression>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitConditionalExpression(shared: SharedConditionalExpression): ConditionalExpression {
        const node = factory.createConditionalExpression(
            shared.condition && visit(shared.condition, visitExpression),
            shared.questionToken && visit(shared.questionToken, visitToken),
            shared.whenTrue && visit(shared.whenTrue, visitExpression),
            shared.colonToken && visit(shared.colonToken, visitToken),
            shared.whenFalse && visit(shared.whenFalse, visitExpression),
        ) as Mutable<ConditionalExpression>;
        return finishNode(node, shared);
    }

    function visitFunctionExpression(shared: SharedFunctionExpression): FunctionExpression {
        const node = factory.createFunctionExpression(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.asteriskToken && visit(shared.asteriskToken, visitToken),
            shared.name && visit(shared.name, visitIdentifier),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
            shared.body && visit(shared.body, visitBlock),
        ) as Mutable<FunctionExpression>;
        node.questionToken = shared.questionToken && visit(shared.questionToken, visitToken);
        node.exclamationToken = shared.exclamationToken && visit(shared.exclamationToken, visitToken);
        node.typeArguments = shared.typeArguments && visit(shared.typeArguments, visitTypeArguments);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitConciseBody(shared: SharedConciseBody): ConciseBody {
        return shared.kind === SyntaxKind.Block ? visitBlock(shared) :
            visitExpression(shared);
    }

    function visitArrowFunction(shared: SharedArrowFunction): ArrowFunction {
        const node = factory.createArrowFunction(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
            shared.equalsGreaterThanToken && visit(shared.equalsGreaterThanToken, visitToken),
            shared.body && visit(shared.body, visitConciseBody),
        ) as Mutable<ArrowFunction>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitRegularExpressionLiteral(shared: SharedRegularExpressionLiteral): RegularExpressionLiteral {
        const node = factory.createRegularExpressionLiteral(
            shared.text,
        ) as Mutable<RegularExpressionLiteral>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitNoSubstitutionTemplateLiteral(shared: SharedNoSubstitutionTemplateLiteral): NoSubstitutionTemplateLiteral {
        const node = factory.createNoSubstitutionTemplateLiteral(
            shared.text,
            shared.rawText,
        ) as Mutable<NoSubstitutionTemplateLiteral>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        node.templateFlags = shared.templateFlags;
        return finishNode(node, shared);
    }

    function visitNumericLiteral(shared: SharedNumericLiteral): NumericLiteral {
        const node = factory.createNumericLiteral(
            shared.text,
            shared.numericLiteralFlags,
        ) as Mutable<NumericLiteral>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitBigIntLiteral(shared: SharedBigIntLiteral): BigIntLiteral {
        const node = factory.createBigIntLiteral(
            shared.text,
        ) as Mutable<BigIntLiteral>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitTemplateHead(shared: SharedTemplateHead): TemplateHead {
        const node = factory.createTemplateHead(
            shared.text,
            shared.rawText,
            shared.templateFlags,
        ) as Mutable<TemplateHead>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitTemplateMiddle(shared: SharedTemplateMiddle): TemplateMiddle {
        const node = factory.createTemplateMiddle(
            shared.text,
            shared.rawText,
            shared.templateFlags,
        ) as Mutable<TemplateMiddle>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitTemplateTail(shared: SharedTemplateTail): TemplateTail {
        const node = factory.createTemplateTail(
            shared.text,
            shared.rawText,
            shared.templateFlags,
        ) as Mutable<TemplateTail>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitTemplateExpression(shared: SharedTemplateExpression): TemplateExpression {
        const node = factory.createTemplateExpression(
            shared.head && visit(shared.head, visitTemplateHead),
            shared.templateSpans && visit(shared.templateSpans, visitTemplateSpans),
        ) as Mutable<TemplateExpression>;
        return finishNode(node, shared);
    }

    function visitTemplateSpans(sharedNodes: SharedNodeArray<SharedTemplateSpan>): NodeArray<TemplateSpan> {
        return visitNodes(sharedNodes, visitTemplateSpan);
    }

    function visitTemplateSpan(shared: SharedTemplateSpan): TemplateSpan {
        const node = factory.createTemplateSpan(
            shared.expression && visit(shared.expression, visitExpression),
            shared.literal && visit(shared.literal, visitTemplateMiddleOrTail),
        ) as Mutable<TemplateSpan>;
        return finishNode(node, shared);
    }

    function visitParenthesizedExpression(shared: SharedParenthesizedExpression): ParenthesizedExpression {
        const node = factory.createParenthesizedExpression(
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<ParenthesizedExpression>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitExpressions(sharedNodes: SharedNodeArray<SharedExpression>): NodeArray<Expression> {
        return visitNodes(sharedNodes, visitExpression);
    }

    function visitArrayLiteralExpression(shared: SharedArrayLiteralExpression): ArrayLiteralExpression {
        const node = factory.createArrayLiteralExpression(
            shared.elements && visit(shared.elements, visitExpressions),
            shared.multiLine,
        ) as Mutable<ArrayLiteralExpression>;
        return finishNode(node, shared);
    }

    function visitSpreadElement(shared: SharedSpreadElement): SpreadElement {
        const node = factory.createSpreadElement(
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<SpreadElement>;
        return finishNode(node, shared);
    }

    function visitObjectLiteralElements(sharedNodes: SharedNodeArray<SharedObjectLiteralElement>): NodeArray<ObjectLiteralElementLike> {
        return visitNodes(sharedNodes, visitObjectLiteralElement);
    }

    function visitObjectLiteralElement(shared: SharedObjectLiteralElement): ObjectLiteralElementLike {
        switch (shared.kind) {
            case SyntaxKind.PropertyAssignment: return visitPropertyAssignment(shared);
            case SyntaxKind.ShorthandPropertyAssignment: return visitShorthandPropertyAssignment(shared);
            case SyntaxKind.SpreadAssignment: return visitSpreadAssignment(shared);
            case SyntaxKind.MethodDeclaration: return visitMethodDeclaration(shared);
            case SyntaxKind.GetAccessor: return visitGetAccessorDeclaration(shared);
            case SyntaxKind.SetAccessor: return visitSetAccessorDeclaration(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitObjectLiteralExpression(shared: SharedObjectLiteralExpression): ObjectLiteralExpression {
        const node = factory.createObjectLiteralExpression(
            shared.properties && visit(shared.properties, visitObjectLiteralElements),
            shared.multiLine,
        ) as Mutable<ObjectLiteralExpression>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitPropertyAccessExpression(shared: SharedPropertyAccessExpression): PropertyAccessExpression {
        const node = factory.createPropertyAccessExpression(
            shared.expression && visit(shared.expression, visitLeftHandSideExpression),
            shared.name && visit(shared.name, visitMemberName),
        ) as Mutable<PropertyAccessExpression>;
        node.questionDotToken = shared.questionDotToken && visit(shared.questionDotToken, visitToken);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitElementAccessExpression(shared: SharedElementAccessExpression): ElementAccessExpression {
        const node = factory.createElementAccessExpression(
            shared.expression && visit(shared.expression, visitLeftHandSideExpression),
            shared.argumentExpression && visit(shared.argumentExpression, visitExpression)
        ) as Mutable<ElementAccessExpression>;
        node.questionDotToken = shared.questionDotToken && visit(shared.questionDotToken, visitToken);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitCallExpression(shared: SharedCallExpression): CallExpression {
        const node = factory.createCallExpression(
            shared.expression && visit(shared.expression, visitExpression),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
            shared.arguments && visit(shared.arguments, visitExpressions),
        ) as Mutable<CallExpression>;
        node.questionDotToken = shared.questionDotToken && visit(shared.questionDotToken, visitToken);
        return finishNode(node, shared);
    }

    function visitExpressionWithTypeArguments(shared: SharedExpressionWithTypeArguments): ExpressionWithTypeArguments {
        const node = factory.createExpressionWithTypeArguments(
            shared.expression && visit(shared.expression, visitLeftHandSideExpression),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
        ) as Mutable<ExpressionWithTypeArguments>;
        return finishNode(node, shared);
    }

    function visitNewExpression(shared: SharedNewExpression): NewExpression {
        const node = factory.createNewExpression(
            shared.expression && visit(shared.expression, visitLeftHandSideExpression),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
            shared.arguments && visit(shared.arguments, visitExpressions),
        ) as Mutable<NewExpression>;
        return finishNode(node, shared);
    }

    function visitTemplateLiteral(shared: SharedTemplateLiteral): TemplateLiteral {
        switch (shared.kind) {
            case SyntaxKind.TemplateExpression: return visitTemplateExpression(shared);
            case SyntaxKind.NoSubstitutionTemplateLiteral: return visitNoSubstitutionTemplateLiteral(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitTaggedTemplateExpression(shared: SharedTaggedTemplateExpression): TaggedTemplateExpression {
        const node = factory.createTaggedTemplateExpression(
            shared.tag && visit(shared.tag, visitLeftHandSideExpression),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
            shared.template && visit(shared.template, visitTemplateLiteral),
        ) as Mutable<TaggedTemplateExpression>;
        node.questionDotToken = shared.questionDotToken && visit(shared.questionDotToken, visitToken);
        return finishNode(node, shared);
    }

    function visitAsExpression(shared: SharedAsExpression): AsExpression {
        const node = factory.createAsExpression(
            shared.expression && visit(shared.expression, visitExpression),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<AsExpression>;
        return finishNode(node, shared);
    }

    function visitTypeAssertion(shared: SharedTypeAssertion): TypeAssertion {
        const node = factory.createTypeAssertion(
            shared.type && visit(shared.type, visitTypeNode),
            shared.expression && visit(shared.expression, visitUnaryExpression),
        ) as Mutable<TypeAssertion>;
        return finishNode(node, shared);
    }

    function visitSatisfiesExpression(shared: SharedSatisfiesExpression): SatisfiesExpression {
        const node = factory.createSatisfiesExpression(
            shared.expression && visit(shared.expression, visitExpression),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<SatisfiesExpression>;
        return finishNode(node, shared);
    }

    function visitNonNullExpression(shared: SharedNonNullExpression): NonNullExpression {
        const node = factory.createNonNullExpression(
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<NonNullExpression>;
        return finishNode(node, shared);
    }

    function visitMetaProperty(shared: SharedMetaProperty): MetaProperty {
        const node = factory.createMetaProperty(
            shared.keywordToken,
            shared.name && visit(shared.name, visitIdentifier)
        ) as Mutable<MetaProperty>;
        return finishNode(node, shared);
    }

    function visitJsxChildren(sharedNodes: SharedNodeArray<SharedJsxChild>): NodeArray<JsxChild> {
        return visitNodes(sharedNodes, visitJsxChild);
    }

    function visitJsxElement(shared: SharedJsxElement): JsxElement {
        const node = factory.createJsxElement(
            shared.openingElement && visit(shared.openingElement, visitJsxOpeningElement),
            shared.children && visit(shared.children, visitJsxChildren),
            shared.closingElement && visit(shared.closingElement, visitJsxClosingElement),
        ) as Mutable<JsxElement>;
        return finishNode(node, shared);
    }

    function visitJsxAttributeLike(shared: SharedJsxAttributeLike): JsxAttributeLike {
        switch (shared.kind) {
            case SyntaxKind.JsxAttribute: return visitJsxAttribute(shared);
            case SyntaxKind.JsxSpreadAttribute: return visitJsxSpreadAttribute(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitJsxAttributeName(shared: SharedJsxAttributeName): JsxAttributeName {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.JsxNamespacedName: return visitJsxNamespacedName(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitJsxTagNameExpression(shared: SharedJsxTagNameExpression): JsxTagNameExpression {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.ThisKeyword: return visitToken(shared) as ThisExpression;
            case SyntaxKind.PropertyAccessExpression: return visitPropertyAccessExpression(shared) as JsxTagNamePropertyAccess;
            case SyntaxKind.JsxNamespacedName: return visitJsxNamespacedName(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitJsxChild(shared: SharedJsxChild): JsxChild {
        switch (shared.kind) {
            case SyntaxKind.JsxText: return visitJsxText(shared);
            case SyntaxKind.JsxExpression: return visitJsxExpression(shared);
            case SyntaxKind.JsxElement: return visitJsxElement(shared);
            case SyntaxKind.JsxSelfClosingElement: return visitJsxSelfClosingElement(shared);
            case SyntaxKind.JsxFragment: return visitJsxFragment(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitJsxAttributeLikes(sharedNodes: SharedNodeArray<SharedJsxAttributeLike>): NodeArray<JsxAttributeLike> {
        return visitNodes(sharedNodes, visitJsxAttributeLike);
    }

    function visitJsxAttributes(shared: SharedJsxAttributes): JsxAttributes {
        const node = factory.createJsxAttributes(
            shared.properties && visit(shared.properties, visitJsxAttributeLikes),
        ) as Mutable<JsxAttributes>;
        return finishNode(node, shared);
    }

    function visitJsxNamespacedName(shared: SharedJsxNamespacedName): JsxNamespacedName {
        const node = factory.createJsxNamespacedName(
            shared.name && visit(shared.name, visitIdentifier),
            shared.namespace && visit(shared.namespace, visitIdentifier),
        ) as Mutable<JsxNamespacedName>;
        return finishNode(node, shared);
    }

    function visitJsxOpeningElement(shared: SharedJsxOpeningElement): JsxOpeningElement {
        const node = factory.createJsxOpeningElement(
            shared.tagName && visit(shared.tagName, visitJsxTagNameExpression),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
            shared.attributes && visit(shared.attributes, visitJsxAttributes),
        ) as Mutable<JsxOpeningElement>;
        return finishNode(node, shared);
    }

    function visitJsxSelfClosingElement(shared: SharedJsxSelfClosingElement): JsxSelfClosingElement {
        const node = factory.createJsxSelfClosingElement(
            shared.tagName && visit(shared.tagName, visitJsxTagNameExpression),
            shared.typeArguments && visit(shared.typeArguments, visitTypeArguments),
            shared.attributes && visit(shared.attributes, visitJsxAttributes),
        ) as Mutable<JsxSelfClosingElement>;
        return finishNode(node, shared);
    }

    function visitJsxFragment(shared: SharedJsxFragment): JsxFragment {
        const node = factory.createJsxFragment(
            shared.openingFragment && visit(shared.openingFragment, visitJsxOpeningFragment),
            shared.children && visit(shared.children, visitJsxChildren),
            shared.closingFragment && visit(shared.closingFragment, visitJsxClosingFragment),
        ) as Mutable<JsxFragment>;
        return finishNode(node, shared);
    }

    function visitJsxOpeningFragment(shared: SharedJsxOpeningFragment): JsxOpeningFragment {
        const node = factory.createJsxOpeningFragment() as Mutable<JsxOpeningFragment>;
        return finishNode(node, shared);
    }

    function visitJsxClosingFragment(shared: SharedJsxClosingFragment): JsxClosingFragment {
        const node = factory.createJsxClosingFragment() as Mutable<JsxClosingFragment>;
        return finishNode(node, shared);
    }

    function visitJsxAttribute(shared: SharedJsxAttribute): JsxAttribute {
        const node = factory.createJsxAttribute(
            shared.name && visit(shared.name, visitJsxAttributeName),
            shared.initializer && visit(shared.initializer, visitJsxAttributeValue),
        ) as Mutable<JsxAttribute>;
        return finishNode(node, shared);
    }

    function visitJsxAttributeValue(shared: SharedJsxAttributeValue): JsxAttributeValue {
        switch (shared.kind) {
            case SyntaxKind.StringLiteral: return visitStringLiteral(shared);
            case SyntaxKind.JsxExpression: return visitJsxExpression(shared);
            case SyntaxKind.JsxElement: return visitJsxElement(shared);
            case SyntaxKind.JsxSelfClosingElement: return visitJsxSelfClosingElement(shared);
            case SyntaxKind.JsxFragment: return visitJsxFragment(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitJsxSpreadAttribute(shared: SharedJsxSpreadAttribute): JsxSpreadAttribute {
        const node = factory.createJsxSpreadAttribute(
            shared.expression && visit(shared.expression, visitExpression)
        ) as Mutable<JsxSpreadAttribute>;
        return finishNode(node, shared);
    }

    function visitJsxClosingElement(shared: SharedJsxClosingElement): JsxClosingElement {
        const node = factory.createJsxClosingElement(
            shared.tagName && visit(shared.tagName, visitJsxTagNameExpression),
        ) as Mutable<JsxClosingElement>;
        return finishNode(node, shared);
    }

    function visitJsxExpression(shared: SharedJsxExpression): JsxExpression {
        const node = factory.createJsxExpression(
            shared.dotDotDotToken && visit(shared.dotDotDotToken, visitToken),
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<JsxExpression>;
        return finishNode(node, shared);
    }

    function visitJsxText(shared: SharedJsxText): JsxText {
        const node = factory.createJsxText(
            shared.text,
            shared.containsOnlyTriviaWhiteSpaces,
        ) as Mutable<JsxText>;
        node.isUnterminated = shared.isUnterminated;
        node.hasExtendedUnicodeEscape = shared.hasExtendedUnicodeEscape;
        return finishNode(node, shared);
    }

    function visitStatements(sharedNodes: SharedNodeArray<SharedStatement>): NodeArray<Statement> {
        return visitNodes(sharedNodes, visitStatement);
    }

    function visitStatement(shared: SharedStatement): Statement {
        switch (shared.kind) {
            case SyntaxKind.EmptyStatement: return visitEmptyStatement(shared);
            case SyntaxKind.DebuggerStatement: return visitDebuggerStatement(shared);
            case SyntaxKind.MissingDeclaration: return visitMissingDeclaration(shared);
            case SyntaxKind.Block: return visitBlock(shared);
            case SyntaxKind.VariableStatement: return visitVariableStatement(shared);
            case SyntaxKind.ExpressionStatement: return visitExpressionStatement(shared);
            case SyntaxKind.IfStatement: return visitIfStatement(shared);
            case SyntaxKind.DoStatement: return visitDoStatement(shared);
            case SyntaxKind.WhileStatement: return visitWhileStatement(shared);
            case SyntaxKind.ForStatement: return visitForStatement(shared);
            case SyntaxKind.ForInStatement: return visitForInStatement(shared);
            case SyntaxKind.ForOfStatement: return visitForOfStatement(shared);
            case SyntaxKind.BreakStatement: return visitBreakStatement(shared);
            case SyntaxKind.ContinueStatement: return visitContinueStatement(shared);
            case SyntaxKind.ReturnStatement: return visitReturnStatement(shared);
            case SyntaxKind.WithStatement: return visitWithStatement(shared);
            case SyntaxKind.SwitchStatement: return visitSwitchStatement(shared);
            case SyntaxKind.LabeledStatement: return visitLabeledStatement(shared);
            case SyntaxKind.ThrowStatement: return visitThrowStatement(shared);
            case SyntaxKind.TryStatement: return visitTryStatement(shared);
            case SyntaxKind.FunctionDeclaration: return visitFunctionDeclaration(shared);
            case SyntaxKind.ClassDeclaration: return visitClassDeclaration(shared);
            case SyntaxKind.InterfaceDeclaration: return visitInterfaceDeclaration(shared);
            case SyntaxKind.TypeAliasDeclaration: return visitTypeAliasDeclaration(shared);
            case SyntaxKind.EnumDeclaration: return visitEnumDeclaration(shared);
            case SyntaxKind.ModuleDeclaration: return visitModuleDeclaration(shared);
            case SyntaxKind.ModuleBlock: return visitModuleBlock(shared);
            case SyntaxKind.ImportEqualsDeclaration: return visitImportEqualsDeclaration(shared);
            case SyntaxKind.ImportDeclaration: return visitImportDeclaration(shared);
            case SyntaxKind.NamespaceExportDeclaration: return visitNamespaceExportDeclaration(shared);
            case SyntaxKind.ExportDeclaration: return visitExportDeclaration(shared);
            case SyntaxKind.ExportAssignment: return visitExportAssignment(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitEmptyStatement(shared: SharedEmptyStatement): EmptyStatement {
        const node = factory.createEmptyStatement() as Mutable<EmptyStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitDebuggerStatement(shared: SharedDebuggerStatement): DebuggerStatement {
        const node = factory.createDebuggerStatement() as Mutable<DebuggerStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitMissingDeclaration(shared: SharedMissingDeclaration): MissingDeclaration {
        const node = factory.createMissingDeclaration() as Mutable<MissingDeclaration>;
        node.name = shared.name && visit(shared.name, visitIdentifier);
        node.modifiers = shared.modifiers && visit(shared.modifiers, visitModifiers);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitBlock(shared: SharedBlock): Block {
        const node = factory.createBlock(
            shared.statements && visit(shared.statements, visitStatements),
            shared.multiLine,
        ) as Mutable<Block>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitVariableStatement(shared: SharedVariableStatement): VariableStatement {
        const node = factory.createVariableStatement(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.declarationList && visit(shared.declarationList, visitVariableDeclarationList),
        ) as Mutable<VariableStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitExpressionStatement(shared: SharedExpressionStatement): ExpressionStatement {
        const node = factory.createExpressionStatement(
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<ExpressionStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitIfStatement(shared: SharedIfStatement): IfStatement {
        const node = factory.createIfStatement(
            shared.expression && visit(shared.expression, visitExpression),
            shared.thenStatement && visit(shared.thenStatement, visitStatement),
            shared.elseStatement && visit(shared.elseStatement, visitStatement),
        ) as Mutable<IfStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitDoStatement(shared: SharedDoStatement): DoStatement {
        const node = factory.createDoStatement(
            shared.statement && visit(shared.statement, visitStatement),
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<DoStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitWhileStatement(shared: SharedWhileStatement): WhileStatement {
        const node = factory.createWhileStatement(
            shared.expression && visit(shared.expression, visitExpression),
            shared.statement && visit(shared.statement, visitStatement),
        ) as Mutable<WhileStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitForInitializer(shared: SharedForInitializer): ForInitializer {
        return shared.kind === SyntaxKind.VariableDeclarationList ? visitVariableDeclarationList(shared) :
            visitExpression(shared);
    }

    function visitForStatement(shared: SharedForStatement): ForStatement {
        const node = factory.createForStatement(
            shared.initializer && visit(shared.initializer, visitForInitializer),
            shared.condition && visit(shared.condition, visitExpression),
            shared.incrementor && visit(shared.incrementor, visitExpression),
            shared.statement && visit(shared.statement, visitStatement),
        ) as Mutable<ForStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitForInStatement(shared: SharedForInStatement): ForInStatement {
        const node = factory.createForInStatement(
            shared.initializer && visit(shared.initializer, visitForInitializer),
            shared.expression && visit(shared.expression, visitExpression),
            shared.statement && visit(shared.statement, visitStatement),
        ) as Mutable<ForInStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitForOfStatement(shared: SharedForOfStatement): ForOfStatement {
        const node = factory.createForOfStatement(
            shared.awaitModifier && visit(shared.awaitModifier, visitToken),
            shared.initializer && visit(shared.initializer, visitForInitializer),
            shared.expression && visit(shared.expression, visitExpression),
            shared.statement && visit(shared.statement, visitStatement),
        ) as Mutable<ForOfStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitBreakStatement(shared: SharedBreakStatement): BreakStatement {
        const node = factory.createBreakStatement(
            shared.label && visit(shared.label, visitIdentifier),
        ) as Mutable<BreakStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitContinueStatement(shared: SharedContinueStatement): ContinueStatement {
        const node = factory.createContinueStatement(
            shared.label && visit(shared.label, visitIdentifier),
        ) as Mutable<ContinueStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitReturnStatement(shared: SharedReturnStatement): ReturnStatement {
        const node = factory.createReturnStatement(
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<ReturnStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitWithStatement(shared: SharedWithStatement): WithStatement {
        const node = factory.createWithStatement(
            shared.expression && visit(shared.expression, visitExpression),
            shared.statement && visit(shared.statement, visitStatement),
        ) as Mutable<WithStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitSwitchStatement(shared: SharedSwitchStatement): SwitchStatement {
        const node = factory.createSwitchStatement(
            shared.expression && visit(shared.expression, visitExpression),
            shared.caseBlock && visit(shared.caseBlock, visitCaseBlock),
        ) as Mutable<SwitchStatement>;
        node.possiblyExhaustive = shared.possiblyExhaustive;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitCaseBlock(shared: SharedCaseBlock): CaseBlock {
        const node = factory.createCaseBlock(
            shared.clauses && visit(shared.clauses, visitCaseOrDefaultClauses),
        ) as Mutable<CaseBlock>;
        return finishNode(node, shared);
    }

    function visitCaseOrDefaultClauses(sharedNodes: SharedNodeArray<SharedCaseOrDefaultClause>): NodeArray<CaseOrDefaultClause> {
        return visitNodes(sharedNodes, visitCaseOrDefaultClause);
    }

    function visitCaseOrDefaultClause(shared: SharedCaseOrDefaultClause): CaseOrDefaultClause {
        switch (shared.kind) {
            case SyntaxKind.CaseClause: return visitCaseClause(shared);
            case SyntaxKind.DefaultClause: return visitDefaultClause(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitCaseClause(shared: SharedCaseClause): CaseClause {
        const node = factory.createCaseClause(
            shared.expression && visit(shared.expression, visitExpression),
            shared.statements && visit(shared.statements, visitStatements),
        ) as Mutable<CaseClause>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitDefaultClause(shared: SharedDefaultClause): DefaultClause {
        const node = factory.createDefaultClause(
            shared.statements && visit(shared.statements, visitStatements),
        ) as Mutable<DefaultClause>;
        return finishNode(node, shared);
    }

    function visitLabeledStatement(shared: SharedLabeledStatement): LabeledStatement {
        const node = factory.createLabeledStatement(
            shared.label && visit(shared.label, visitIdentifier),
            shared.statement && visit(shared.statement, visitStatement),
        ) as Mutable<LabeledStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitThrowStatement(shared: SharedThrowStatement): ThrowStatement {
        const node = factory.createThrowStatement(
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<ThrowStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitTryStatement(shared: SharedTryStatement): TryStatement {
        const node = factory.createTryStatement(
            shared.tryBlock && visit(shared.tryBlock, visitBlock),
            shared.catchClause && visit(shared.catchClause, visitCatchClause),
            shared.finallyBlock && visit(shared.finallyBlock, visitBlock),
        ) as Mutable<TryStatement>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitCatchClause(shared: SharedCatchClause): CatchClause {
        const node = factory.createCatchClause(
            shared.variableDeclaration && visit(shared.variableDeclaration, visitVariableDeclaration),
            shared.block && visit(shared.block, visitBlock),
        ) as Mutable<CatchClause>;
        return finishNode(node, shared);
    }

    function visitClassElement(shared: SharedClassElement): ClassElement {
        switch (shared.kind) {
            case SyntaxKind.PropertyDeclaration: return visitPropertyDeclaration(shared);
            case SyntaxKind.MethodDeclaration: return visitMethodDeclaration(shared);
            case SyntaxKind.Constructor: return visitConstructorDeclaration(shared);
            case SyntaxKind.SemicolonClassElement: return visitSemicolonClassElement(shared);
            case SyntaxKind.GetAccessor: return visitGetAccessorDeclaration(shared);
            case SyntaxKind.SetAccessor: return visitSetAccessorDeclaration(shared);
            case SyntaxKind.IndexSignature: return visitIndexSignatureDeclaration(shared);
            case SyntaxKind.ClassStaticBlockDeclaration: return visitClassStaticBlockDeclaration(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitClassElements(sharedNodes: SharedNodeArray<SharedClassElement>): NodeArray<ClassElement> {
        return visitNodes(sharedNodes, visitClassElement)
    }

    function visitClassDeclaration(shared: SharedClassDeclaration): ClassDeclaration {
        const node = factory.createClassDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitIdentifier),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.heritageClauses && visit(shared.heritageClauses, visitHeritageClauses),
            shared.members && visit(shared.members, visitClassElements),
        ) as Mutable<ClassDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitClassExpression(shared: SharedClassExpression): ClassExpression {
        const node = factory.createClassExpression(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitIdentifier),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.heritageClauses && visit(shared.heritageClauses, visitHeritageClauses),
            shared.members && visit(shared.members, visitClassElements),
        ) as Mutable<ClassExpression>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitTypeElements(sharedNodes: SharedNodeArray<SharedTypeElement>): NodeArray<TypeElement> {
        return visitNodes(sharedNodes, visitTypeElement);
    }

    function visitTypeElement(shared: SharedTypeElement): TypeElement {
        switch (shared.kind) {
            case SyntaxKind.CallSignature: return visitCallSignatureDeclaration(shared);
            case SyntaxKind.ConstructSignature: return visitConstructSignatureDeclaration(shared);
            case SyntaxKind.MethodSignature: return visitMethodSignature(shared);
            case SyntaxKind.IndexSignature: return visitIndexSignatureDeclaration(shared);
            case SyntaxKind.PropertySignature: return visitPropertySignature(shared);
            case SyntaxKind.GetAccessor: return visitGetAccessorDeclaration(shared);
            case SyntaxKind.SetAccessor: return visitSetAccessorDeclaration(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitInterfaceDeclaration(shared: SharedInterfaceDeclaration): InterfaceDeclaration {
        const node = factory.createInterfaceDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitIdentifier),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.heritageClauses && visit(shared.heritageClauses, visitHeritageClauses),
            shared.members && visit(shared.members, visitTypeElements),
        ) as Mutable<InterfaceDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitHeritageClauses(sharedNodes: SharedNodeArray<SharedHeritageClause>): NodeArray<HeritageClause> {
        return visitNodes(sharedNodes, visitHeritageClause)
    }

    function visitExpressionsWithTypeArguments(sharedNodes: SharedNodeArray<SharedExpressionWithTypeArguments>): NodeArray<ExpressionWithTypeArguments> {
        return visitNodes(sharedNodes, visitExpressionWithTypeArguments);
    }

    function visitHeritageClause(shared: SharedHeritageClause): HeritageClause {
        const node = factory.createHeritageClause(
            shared.token,
            shared.types && visit(shared.types, visitExpressionsWithTypeArguments),
        ) as Mutable<HeritageClause>;
        return finishNode(node, shared);
    }

    function visitTypeAliasDeclaration(shared: SharedTypeAliasDeclaration): TypeAliasDeclaration {
        const node = factory.createTypeAliasDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitIdentifier),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<TypeAliasDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitEnumMember(shared: SharedEnumMember): EnumMember {
        const node = factory.createEnumMember(
            shared.name && visit(shared.name, visitPropertyName),
            shared.initializer && visit(shared.initializer, visitExpression),
        ) as Mutable<EnumMember>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitEnumMembers(sharedNodes: SharedNodeArray<SharedEnumMember>): NodeArray<EnumMember> {
        return visitNodes(sharedNodes, visitEnumMember);
    }

    function visitEnumDeclaration(shared: SharedEnumDeclaration): EnumDeclaration {
        const node = factory.createEnumDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitIdentifier),
            shared.members && visit(shared.members, visitEnumMembers),
        ) as Mutable<EnumDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitModuleName(shared: SharedModuleName): ModuleName {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.StringLiteral: return visitStringLiteral(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitModuleBody(shared: SharedModuleBody): ModuleBody {
        switch (shared.kind) {
            case SyntaxKind.ModuleBlock: return visitModuleBlock(shared);
            case SyntaxKind.ModuleDeclaration: return visitModuleDeclaration(shared) as NamespaceDeclaration;
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitModuleDeclaration(shared: SharedModuleDeclaration): ModuleDeclaration {
        const node = factory.createModuleDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.name && visit(shared.name, visitModuleName),
            shared.body && visit(shared.body, visitModuleBody),
        ) as Mutable<ModuleDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitModuleBlock(shared: SharedModuleBlock): ModuleBlock {
        const node = factory.createModuleBlock(
            shared.statements && visit(shared.statements, visitStatements),
        ) as Mutable<ModuleBlock>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitModuleReference(shared: SharedModuleReference): ModuleReference {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.QualifiedName: return visitQualifiedName(shared);
            case SyntaxKind.ExternalModuleReference: return visitExternalModuleReference(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitImportEqualsDeclaration(shared: SharedImportEqualsDeclaration): ImportEqualsDeclaration {
        const node = factory.createImportEqualsDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.isTypeOnly,
            shared.name && visit(shared.name, visitIdentifier),
            shared.moduleReference && visit(shared.moduleReference, visitModuleReference),
        ) as Mutable<ImportEqualsDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitExternalModuleReference(shared: SharedExternalModuleReference): ExternalModuleReference {
        const node = factory.createExternalModuleReference(
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<ExternalModuleReference>;
        return finishNode(node, shared);
    }

    function visitImportDeclaration(shared: SharedImportDeclaration): ImportDeclaration {
        const node = factory.createImportDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.importClause && visit(shared.importClause, visitImportClause),
            shared.moduleSpecifier && visit(shared.moduleSpecifier, visitExpression),
            shared.assertClause && visit(shared.assertClause, visitAssertClause),
        ) as Mutable<ImportDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitNamedImportBindings(shared: SharedNamedImportBindings): NamedImportBindings {
        switch (shared.kind) {
            case SyntaxKind.NamespaceImport: return visitNamespaceImport(shared);
            case SyntaxKind.NamedImports: return visitNamedImports(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitNamedExportBindings(shared: SharedNamedExportBindings): NamedExportBindings {
        switch (shared.kind) {
            case SyntaxKind.NamespaceExport: return visitNamespaceExport(shared);
            case SyntaxKind.NamedExports: return visitNamedExports(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitImportClause(shared: SharedImportClause): ImportClause {
        const node = factory.createImportClause(
            shared.isTypeOnly,
            shared.name && visit(shared.name, visitIdentifier),
            shared.namedBindings && visit(shared.namedBindings, visitNamedImportBindings),
        ) as Mutable<ImportClause>;
        return finishNode(node, shared);
    }

    function visitAssertionKey(shared: SharedAssertionKey): AssertionKey {
        switch (shared.kind) {
            case SyntaxKind.Identifier: return visitIdentifier(shared);
            case SyntaxKind.StringLiteral: return visitStringLiteral(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitAssertEntry(shared: SharedAssertEntry): AssertEntry {
        const node = factory.createAssertEntry(
            shared.name && visit(shared.name, visitAssertionKey),
            shared.value && visit(shared.value, visitExpression),
        ) as Mutable<AssertEntry>;
        return finishNode(node, shared);
    }

    function visitAssertEntries(sharedNodes: SharedNodeArray<SharedAssertEntry>): NodeArray<AssertEntry> {
        return visitNodes(sharedNodes, visitAssertEntry);
    }

    function visitAssertClause(shared: SharedAssertClause): AssertClause {
        const node = factory.createAssertClause(
            shared.elements && visit(shared.elements, visitAssertEntries),
            shared.multiLine,
        ) as Mutable<AssertClause>;
        return finishNode(node, shared);
    }

    function visitNamespaceImport(shared: SharedNamespaceImport): NamespaceImport {
        const node = factory.createNamespaceImport(
            shared.name && visit(shared.name, visitIdentifier),
        ) as Mutable<NamespaceImport>;
        return finishNode(node, shared);
    }

    function visitNamespaceExport(shared: SharedNamespaceExport): NamespaceExport {
        const node = factory.createNamespaceExport(
            shared.name && visit(shared.name, visitIdentifier),
        ) as Mutable<NamespaceExport>;
        return finishNode(node, shared);
    }

    function visitNamespaceExportDeclaration(shared: SharedNamespaceExportDeclaration): NamespaceExportDeclaration {
        const node = factory.createNamespaceExportDeclaration(
            shared.name && visit(shared.name, visitIdentifier),
        ) as Mutable<NamespaceExportDeclaration>;
        node.modifiers = shared.modifiers && visit(shared.modifiers, visitModifiers);
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitExportDeclaration(shared: SharedExportDeclaration): ExportDeclaration {
        const node = factory.createExportDeclaration(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.isTypeOnly,
            shared.exportClause && visit(shared.exportClause, visitNamedExportBindings),
            shared.moduleSpecifier && visit(shared.moduleSpecifier, visitExpression),
            shared.assertClause && visit(shared.assertClause, visitAssertClause),
        ) as Mutable<ExportDeclaration>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitImportSpecifiers(sharedNodes: SharedNodeArray<SharedImportSpecifier>): NodeArray<ImportSpecifier> {
        return visitNodes(sharedNodes, visitImportSpecifier);
    }

    function visitExportSpecifiers(sharedNodes: SharedNodeArray<SharedExportSpecifier>): NodeArray<ExportSpecifier> {
        return visitNodes(sharedNodes, visitExportSpecifier);
    }

    function visitNamedImports(shared: SharedNamedImports): NamedImports {
        const node = factory.createNamedImports(
            shared.elements && visit(shared.elements, visitImportSpecifiers),
        ) as Mutable<NamedImports>;
        return finishNode(node, shared);
    }

    function visitNamedExports(shared: SharedNamedExports): NamedExports {
        const node = factory.createNamedExports(
            shared.elements && visit(shared.elements, visitExportSpecifiers),
        ) as Mutable<NamedExports>;
        return finishNode(node, shared);
    }

    function visitImportSpecifier(shared: SharedImportSpecifier): ImportSpecifier {
        const node = factory.createImportSpecifier(
            shared.isTypeOnly,
            shared.propertyName && visit(shared.propertyName, visitIdentifier),
            shared.name && visit(shared.name, visitIdentifier),
        ) as Mutable<ImportSpecifier>;
        return finishNode(node, shared);
    }

    function visitExportSpecifier(shared: SharedExportSpecifier): ExportSpecifier {
        const node = factory.createExportSpecifier(
            shared.isTypeOnly,
            shared.propertyName && visit(shared.propertyName, visitIdentifier),
            shared.name && visit(shared.name, visitIdentifier),
        ) as Mutable<ExportSpecifier>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitExportAssignment(shared: SharedExportAssignment): ExportAssignment {
        const node = factory.createExportAssignment(
            shared.modifiers && visit(shared.modifiers, visitModifiers),
            shared.isExportEquals,
            shared.expression && visit(shared.expression, visitExpression),
        ) as Mutable<ExportAssignment>;
        copyJSDoc(shared, node);
        return finishNode(node, shared);
    }

    function visitJSDocTypeExpression(shared: SharedJSDocTypeExpression): JSDocTypeExpression {
        const node = factory.createJSDocTypeExpression(
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<JSDocTypeExpression>;
        return finishNode(node, shared);
    }

    function visitJSDocNameReference(shared: SharedJSDocNameReference): JSDocNameReference {
        const node = factory.createJSDocNameReference(
            shared.name && visit(shared.name, visitJSDocEntityName),
        ) as Mutable<JSDocNameReference>;
        return finishNode(node, shared);
    }

    function visitJSDocMemberName(shared: SharedJSDocMemberName): JSDocMemberName {
        const node = factory.createJSDocMemberName(
            shared.left && visit(shared.left, visitJSDocEntityName),
            shared.right && visit(shared.right, visitIdentifier),
        ) as Mutable<JSDocMemberName>;
        return finishNode(node, shared);
    }

    function visitJSDocAllType(shared: SharedJSDocAllType): JSDocAllType {
        const node = factory.createJSDocAllType(
        ) as Mutable<JSDocAllType>;
        return finishNode(node, shared);
    }

    function visitJSDocUnknownType(shared: SharedJSDocUnknownType): JSDocUnknownType {
        const node = factory.createJSDocUnknownType(
        ) as Mutable<JSDocUnknownType>;
        return finishNode(node, shared);
    }

    function visitJSDocNonNullableType(shared: SharedJSDocNonNullableType): JSDocNonNullableType {
        const node = factory.createJSDocNonNullableType(
            shared.type && visit(shared.type, visitTypeNode),
            shared.postfix,
        ) as Mutable<JSDocNonNullableType>;
        return finishNode(node, shared);
    }

    function visitJSDocNullableType(shared: SharedJSDocNullableType): JSDocNullableType {
        const node = factory.createJSDocNullableType(
            shared.type && visit(shared.type, visitTypeNode),
            shared.postfix,
        ) as Mutable<JSDocNullableType>;
        return finishNode(node, shared);
    }

    function visitJSDocOptionalType(shared: SharedJSDocOptionalType): JSDocOptionalType {
        const node = factory.createJSDocOptionalType(
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<JSDocOptionalType>;
        return finishNode(node, shared);
    }

    function visitJSDocFunctionType(shared: SharedJSDocFunctionType): JSDocFunctionType {
        const node = factory.createJSDocFunctionType(
            shared.parameters && visit(shared.parameters, visitParameters),
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<JSDocFunctionType>;
        node.typeParameters = shared.typeParameters && visit(shared.typeParameters, visitTypeParameters);
        return finishNode(node, shared);
    }

    function visitJSDocVariadicType(shared: SharedJSDocVariadicType): JSDocVariadicType {
        const node = factory.createJSDocVariadicType(
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<JSDocVariadicType>;
        return finishNode(node, shared);
    }

    function visitJSDocNamepathType(shared: SharedJSDocNamepathType): JSDocNamepathType {
        const node = factory.createJSDocNamepathType(
            shared.type && visit(shared.type, visitTypeNode),
        ) as Mutable<JSDocNamepathType>;
        return finishNode(node, shared);
    }

    function visitJSDocTags(sharedNodes: SharedNodeArray<SharedJSDocTag>): NodeArray<JSDocTag> {
        return visitNodes(sharedNodes, visitJSDocTag);
    }

    function visitJSDocComments(sharedNodes: SharedNodeArray<SharedJSDocComment>): NodeArray<JSDocComment> {
        return visitNodes(sharedNodes, visitJSDocComment);
    }

    function visitJSDocNode(shared: SharedJSDocNode): JSDoc {
        const node = factory.createJSDocComment(
            typeof shared.comment === "string" ? shared.comment :
                typeof shared.comment === "string" ? shared.comment :
                    shared.comment && visit(shared.comment, visitJSDocComments),
            shared.tags && visit(shared.tags, visitJSDocTags),
        ) as Mutable<JSDoc>;
        return finishNode(node, shared);
    }

    function visitJSDocTag(shared: SharedJSDocTag): JSDocTag {
        switch (shared.kind) {
            case SyntaxKind.JSDocTag: return visitJSDocUnknownTag(shared);
            case SyntaxKind.JSDocAugmentsTag: return visitJSDocAugmentsTag(shared);
            case SyntaxKind.JSDocImplementsTag: return visitJSDocImplementsTag(shared);
            case SyntaxKind.JSDocAuthorTag: return visitJSDocAuthorTag(shared);
            case SyntaxKind.JSDocDeprecatedTag: return visitJSDocDeprecatedTag(shared);
            case SyntaxKind.JSDocClassTag: return visitJSDocClassTag(shared);
            case SyntaxKind.JSDocPublicTag: return visitJSDocPublicTag(shared);
            case SyntaxKind.JSDocPrivateTag: return visitJSDocPrivateTag(shared);
            case SyntaxKind.JSDocProtectedTag: return visitJSDocProtectedTag(shared);
            case SyntaxKind.JSDocReadonlyTag: return visitJSDocReadonlyTag(shared);
            case SyntaxKind.JSDocOverrideTag: return visitJSDocOverrideTag(shared);
            case SyntaxKind.JSDocEnumTag: return visitJSDocEnumTag(shared);
            case SyntaxKind.JSDocThisTag: return visitJSDocThisTag(shared);
            case SyntaxKind.JSDocTemplateTag: return visitJSDocTemplateTag(shared);
            case SyntaxKind.JSDocSeeTag: return visitJSDocSeeTag(shared);
            case SyntaxKind.JSDocReturnTag: return visitJSDocReturnTag(shared);
            case SyntaxKind.JSDocTypeTag: return visitJSDocTypeTag(shared);
            case SyntaxKind.JSDocTypedefTag: return visitJSDocTypedefTag(shared);
            case SyntaxKind.JSDocCallbackTag: return visitJSDocCallbackTag(shared);
            case SyntaxKind.JSDocOverloadTag: return visitJSDocOverloadTag(shared);
            case SyntaxKind.JSDocThrowsTag: return visitJSDocThrowsTag(shared);
            case SyntaxKind.JSDocPropertyTag: return visitJSDocPropertyTag(shared);
            case SyntaxKind.JSDocParameterTag: return visitJSDocParameterTag(shared);
            case SyntaxKind.JSDocSatisfiesTag: return visitJSDocSatisfiesTag(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitJSDocEntityName(shared: SharedEntityName | SharedJSDocMemberName): EntityName | JSDocMemberName {
        return shared.kind === SyntaxKind.JSDocMemberName ? visitJSDocMemberName(shared) :
            visitEntityName(shared);
    }

    function visitJSDocLink(shared: SharedJSDocLink): JSDocLink {
        const node = factory.createJSDocLink(
            shared.name && visit(shared.name, visitJSDocEntityName),
            shared.text,
        ) as Mutable<JSDocLink>;
        return finishNode(node, shared);
    }

    function visitJSDocLinkCode(shared: SharedJSDocLinkCode): JSDocLinkCode {
        const node = factory.createJSDocLinkCode(
            shared.name && visit(shared.name, visitJSDocEntityName),
            shared.text,
        ) as Mutable<JSDocLinkCode>;
        return finishNode(node, shared);
    }

    function visitJSDocLinkPlain(shared: SharedJSDocLinkPlain): JSDocLinkPlain {
        const node = factory.createJSDocLinkPlain(
            shared.name && visit(shared.name, visitJSDocEntityName),
            shared.text,
        ) as Mutable<JSDocLinkPlain>;
        return finishNode(node, shared);
    }

    function visitJSDocComment(shared: SharedJSDocComment): JSDocComment {
        switch (shared.kind) {
            case SyntaxKind.JSDocText: return visitJSDocText(shared);
            case SyntaxKind.JSDocLink: return visitJSDocLink(shared);
            case SyntaxKind.JSDocLinkCode: return visitJSDocLinkCode(shared);
            case SyntaxKind.JSDocLinkPlain: return visitJSDocLinkPlain(shared);
            default: Debug.assertNever(shared);
        }
    }

    function visitJSDocText(shared: SharedJSDocText): JSDocText {
        const node = factory.createJSDocText(
            shared.text,
        ) as Mutable<JSDocText>;
        return finishNode(node, shared);
    }

    function visitJSDocUnknownTag(shared: SharedJSDocUnknownTag): JSDocUnknownTag {
        const node = factory.createJSDocUnknownTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocUnknownTag>;
        return finishNode(node, shared);
    }

    function visitJSDocAugmentsTag(shared: SharedJSDocAugmentsTag): JSDocAugmentsTag {
        const node = factory.createJSDocAugmentsTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.class && visit(shared.class, visitExpressionWithTypeArguments) as ExpressionWithTypeArguments & {
                readonly expression: Identifier | PropertyAccessEntityNameExpression;
            },
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocAugmentsTag>;
        return finishNode(node, shared);
    }

    function visitJSDocImplementsTag(shared: SharedJSDocImplementsTag): JSDocImplementsTag {
        const node = factory.createJSDocImplementsTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.class && visit(shared.class, visitExpressionWithTypeArguments) as ExpressionWithTypeArguments & {
                readonly expression: Identifier | PropertyAccessEntityNameExpression;
            },
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocImplementsTag>;
        return finishNode(node, shared);
    }

    function visitJSDocAuthorTag(shared: SharedJSDocAuthorTag): JSDocAuthorTag {
        const node = factory.createJSDocAuthorTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocAuthorTag>;
        return finishNode(node, shared);
    }

    function visitJSDocDeprecatedTag(shared: SharedJSDocDeprecatedTag): JSDocDeprecatedTag {
        const node = factory.createJSDocDeprecatedTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocDeprecatedTag>;
        return finishNode(node, shared);
    }

    function visitJSDocClassTag(shared: SharedJSDocClassTag): JSDocClassTag {
        const node = factory.createJSDocClassTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocClassTag>;
        return finishNode(node, shared);
    }

    function visitJSDocPublicTag(shared: SharedJSDocPublicTag): JSDocPublicTag {
        const node = factory.createJSDocPublicTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocPublicTag>;
        return finishNode(node, shared);
    }

    function visitJSDocPrivateTag(shared: SharedJSDocPrivateTag): JSDocPrivateTag {
        const node = factory.createJSDocPrivateTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocPrivateTag>;
        return finishNode(node, shared);
    }

    function visitJSDocProtectedTag(shared: SharedJSDocProtectedTag): JSDocProtectedTag {
        const node = factory.createJSDocProtectedTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocProtectedTag>;
        return finishNode(node, shared);
    }

    function visitJSDocReadonlyTag(shared: SharedJSDocReadonlyTag): JSDocReadonlyTag {
        const node = factory.createJSDocReadonlyTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocReadonlyTag>;
        return finishNode(node, shared);
    }

    function visitJSDocOverrideTag(shared: SharedJSDocOverrideTag): JSDocOverrideTag {
        const node = factory.createJSDocOverrideTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocOverrideTag>;
        return finishNode(node, shared);
    }

    function visitJSDocEnumTag(shared: SharedJSDocEnumTag): JSDocEnumTag {
        const node = factory.createJSDocEnumTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocEnumTag>;
        return finishNode(node, shared);
    }

    function visitJSDocThisTag(shared: SharedJSDocThisTag): JSDocThisTag {
        const node = factory.createJSDocThisTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocThisTag>;
        return finishNode(node, shared);
    }

    function visitJSDocTemplateTag(shared: SharedJSDocTemplateTag): JSDocTemplateTag {
        const node = factory.createJSDocTemplateTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.constraint && visit(shared.constraint, visitJSDocTypeExpression),
            shared.typeParameters && visit(shared.typeParameters, visitTypeParameters),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocTemplateTag>;
        return finishNode(node, shared);
    }

    function visitJSDocSeeTag(shared: SharedJSDocSeeTag): JSDocSeeTag {
        const node = factory.createJSDocSeeTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.name && visit(shared.name, visitJSDocNameReference),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocSeeTag>;
        return finishNode(node, shared);
    }

    function visitJSDocReturnTag(shared: SharedJSDocReturnTag): JSDocReturnTag {
        const node = factory.createJSDocReturnTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocReturnTag>;
        return finishNode(node, shared);
    }

    function visitJSDocTypeTag(shared: SharedJSDocTypeTag): JSDocTypeTag {
        const node = factory.createJSDocTypeTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocTypeTag>;
        return finishNode(node, shared);
    }

    function visitJSDocNamespaceDeclarationOrIdentifier(shared: SharedJSDocNamespaceDeclaration | SharedIdentifier): JSDocNamespaceDeclaration | Identifier {
        return shared.kind === SyntaxKind.Identifier ? visitIdentifier(shared) :
            visitModuleDeclaration(shared) as JSDocNamespaceDeclaration;
    }

    function visitJSDocTypeExpressionOrTypeLiteral(shared: SharedJSDocTypeExpression | SharedJSDocTypeLiteral): JSDocTypeExpression | JSDocTypeLiteral {
        return shared.kind === SyntaxKind.JSDocTypeExpression ? visitJSDocTypeExpression(shared) :
            visitJSDocTypeLiteral(shared);
    }

    function visitJSDocTypedefTag(shared: SharedJSDocTypedefTag): JSDocTypedefTag {
        const node = factory.createJSDocTypedefTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpressionOrTypeLiteral),
            shared.fullName && visit(shared.fullName, visitJSDocNamespaceDeclarationOrIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocTypedefTag>;
        node.name = getJSDocTypeAliasName(node.fullName);
        return finishNode(node, shared);
    }
    
    function visitJSDocCallbackTag(shared: SharedJSDocCallbackTag): JSDocCallbackTag {
        const node = factory.createJSDocCallbackTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocSignature),
            shared.fullName && visit(shared.fullName, visitJSDocNamespaceDeclarationOrIdentifier),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocCallbackTag>;
        node.name = getJSDocTypeAliasName(node.fullName);
        return finishNode(node, shared);
    }
    
    function visitJSDocOverloadTag(shared: SharedJSDocOverloadTag): JSDocOverloadTag {
        const node = factory.createJSDocOverloadTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocSignature),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocOverloadTag>;
        return finishNode(node, shared);
    }
    
    function visitJSDocThrowsTag(shared: SharedJSDocThrowsTag): JSDocThrowsTag {
        const node = factory.createJSDocThrowsTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocThrowsTag>;
        return finishNode(node, shared);
    }
    
    function visitJSDocTemplateTags(shared: SharedArray<SharedJSDocTemplateTag>): readonly JSDocTemplateTag[] {
        return visitArray(shared, visitJSDocTemplateTag);
    }

    function visitJSDocParameterTags(shared: SharedArray<SharedJSDocParameterTag>): readonly JSDocParameterTag[] {
        return visitArray(shared, visitJSDocParameterTag);
    }

    function visitJSDocSignature(shared: SharedJSDocSignature): JSDocSignature {
        const node = factory.createJSDocSignature(
            shared.typeParameters && visit(shared.typeParameters, visitJSDocTemplateTags),
            shared.parameters && visit(shared.parameters, visitJSDocParameterTags),
            shared.type && visit(shared.type, visitJSDocReturnTag),
        ) as Mutable<JSDocSignature>;
        return finishNode(node, shared);
    }
    
    function visitJSDocPropertyTag(shared: SharedJSDocPropertyTag): JSDocPropertyTag {
        const node = factory.createJSDocPropertyTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.name && visit(shared.name, visitEntityName),
            shared.isBracketed,
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            shared.isNameFirst,
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocPropertyTag>;
        return finishNode(node, shared);
    }
    
    function visitJSDocParameterTag(shared: SharedJSDocParameterTag): JSDocParameterTag {
        const node = factory.createJSDocParameterTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.name && visit(shared.name, visitEntityName),
            shared.isBracketed,
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            shared.isNameFirst,
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocParameterTag>;
        return finishNode(node, shared);
    }

    function visitJSDocPropertyLikeTag(shared: SharedJSDocPropertyLikeTag): JSDocPropertyLikeTag {
        return shared.kind === SyntaxKind.JSDocPropertyTag ? visitJSDocPropertyTag(shared) :
            visitJSDocParameterTag(shared);
    }
    
    function visitJSDocPropertyLikeTags(shared: SharedArray<SharedJSDocPropertyLikeTag>): readonly JSDocPropertyLikeTag[] {
        return visitArray(shared, visitJSDocPropertyLikeTag);
    }

    function visitJSDocTypeLiteral(shared: SharedJSDocTypeLiteral): JSDocTypeLiteral {
        const node = factory.createJSDocTypeLiteral(
            shared.jsDocPropertyTags && visit(shared.jsDocPropertyTags, visitJSDocPropertyLikeTags),
            shared.isArrayType,
        ) as Mutable<JSDocTypeLiteral>;
        return finishNode(node, shared);
    }
    
    function visitJSDocSatisfiesTag(shared: SharedJSDocSatisfiesTag): JSDocSatisfiesTag {
        const node = factory.createJSDocSatisfiesTag(
            shared.tagName && visit(shared.tagName, visitIdentifier),
            shared.typeExpression && visit(shared.typeExpression, visitJSDocTypeExpression),
            typeof shared.comment === "string" ? shared.comment :
                shared.comment && visit(shared.comment, visitJSDocComments),
        ) as Mutable<JSDocSatisfiesTag>;
        return finishNode(node, shared);
    }

    function visitMap<KS extends Shareable, VS extends Shareable, K, V>(
        sharedMap: SharedMap<KS, VS>,
        visitKey: (key: KS) => K,
        visitValue: (value: VS) => V,
    ) {
        const map = new Map();
        for (const [key, value] of SharedMap.entries(sharedMap)) {
            map.set(visitKey(key), visitValue(value));
        }
        return map;
    }

    function visitDiagnosticMessageChains(shared: SharedArray<SharedDiagnosticMessageChain>): readonly DiagnosticMessageChain[] {
        return visitArray(shared, visitDiagnosticMessageChain);
    }

    function visitDiagnosticMessageChain(shared: SharedDiagnosticMessageChain): DiagnosticMessageChain {
        return {
            messageText: shared.messageText,
            category: shared.category,
            code: shared.code,
            next: shared.next && visit(shared.next, visitDiagnosticMessageChains).slice(),
            // TODO: repopulateInfo
        };
    }

    function visitDiagnosticRelatedInformations(shared: SharedArray<SharedDiagnosticRelatedInformation | SharedDiagnostic>): readonly DiagnosticRelatedInformation[] {
        return visitArray(shared, visitDiagnosticRelatedInformation);
    }

    function visitDiagnosticRelatedInformation(shared: SharedDiagnosticRelatedInformation | SharedDiagnostic): DiagnosticRelatedInformation {
        if (hasProperty(shared, "reportsUnnecessary") ||
            hasProperty(shared, "reportsDeprecated") ||
            hasProperty(shared, "source") ||
            hasProperty(shared, "relatedInformation") ||
            hasProperty(shared, "skippedOn")) {
            return visitDiagnostic(shared as SharedDiagnostic);
        }
        return {
            category: shared.category,
            code: shared.code,
            file,
            start: shared.start,
            length: shared.length,
            messageText: typeof shared.messageText === "string" ? shared.messageText :
                visitDiagnosticMessageChain(shared.messageText),
        };
    }

    function visitDiagnostics(shared: SharedArray<SharedDiagnostic>): readonly Diagnostic[];
    function visitDiagnostics(shared: SharedArray<SharedDiagnosticWithLocation>): readonly DiagnosticWithLocation[];
    function visitDiagnostics(shared: SharedArray<SharedDiagnostic>) {
        return visitArray<SharedDiagnostic, Diagnostic>(shared, visitDiagnostic);
    }

    function visitDiagnostic(shared: SharedDiagnostic): Diagnostic;
    function visitDiagnostic(shared: SharedDiagnosticWithLocation): DiagnosticWithLocation;
    function visitDiagnostic(shared: SharedDiagnostic): Diagnostic {
        let file: SourceFile | undefined;
        if (shared.file) {
            file = cache.get(shared.file) as SourceFile | undefined;
            Debug.assert(file);
        }
        
        return {
            category: shared.category,
            code: shared.code,
            file,
            start: shared.start,
            length: shared.length,
            messageText: typeof shared.messageText === "string" ? shared.messageText :
                visitDiagnosticMessageChain(shared.messageText),
            reportsUnnecessary: shared.reportsUnnecessary,
            reportsDeprecated: shared.reportsDeprecated,
            source: shared.source,
            relatedInformation: shared.relatedInformation && visit(shared.relatedInformation, visitDiagnosticRelatedInformations).slice(),
        };
    }

    function visitSourceFile(shared: SharedSourceFile): SourceFile {
        const node = factory.createSourceFile(
            shared.statements && visit(shared.statements, visitStatements),
            shared.endOfFileToken && visit(shared.endOfFileToken, visitEndOfFileToken),
            shared.flags
        ) as Mutable<SourceFile>;
        finishNode(node, shared);
        node.fileName = shared.fileName;
        node.path = shared.path;
        node.text = shared.text;
        node.resolvedPath = shared.resolvedPath;
        node.originalFileName = shared.originalFileName;
        node.amdDependencies = shared.amdDependencies && (cache.get(shared.amdDependencies) as readonly AmdDependency[] ?? visitArray(shared.amdDependencies, identity));
        node.moduleName = shared.moduleName;
        node.referencedFiles = shared.referencedFiles && (cache.get(shared.referencedFiles) as readonly FileReference[] ?? visitArray(shared.referencedFiles, identity));
        node.typeReferenceDirectives = shared.typeReferenceDirectives && (cache.get(shared.typeReferenceDirectives) as readonly FileReference[] ?? visitArray(shared.typeReferenceDirectives, identity));
        node.libReferenceDirectives = shared.libReferenceDirectives && (cache.get(shared.libReferenceDirectives) as readonly FileReference[] ?? visitArray(shared.libReferenceDirectives, identity));
        node.languageVariant = shared.languageVariant;
        node.isDeclarationFile = shared.isDeclarationFile;
        node.renamedDependencies = shared.renamedDependencies && visitMap(shared.renamedDependencies, identity, identity);
        node.hasNoDefaultLib = shared.hasNoDefaultLib;
        node.languageVersion = shared.languageVersion;
        node.impliedNodeFormat = shared.impliedNodeFormat;
        node.scriptKind = shared.scriptKind;
        node.pragmas = cache.get(shared.pragmas) as ReadonlyPragmaMap ?? visitMap(shared.pragmas, identity, value => isSharedArray(value) ? visitArray(value, identity) : value);
        if (shared.externalModuleIndicator === true) {
            node.externalModuleIndicator = true;
        }
        else if (shared.externalModuleIndicator) {
            node.externalModuleIndicator = cache.get(shared.externalModuleIndicator) as Node | undefined;
            Debug.assert(node.externalModuleIndicator);
        }
        if (shared.commonJsModuleIndicator) {
            node.commonJsModuleIndicator = cache.get(shared.commonJsModuleIndicator) as Node | undefined;
            Debug.assert(node.commonJsModuleIndicator);
        }
        node.identifiers = shared.identifiers && visitMap(shared.identifiers, identity, identity);
        node.nodeCount = shared.nodeCount;
        node.identifierCount = shared.identifierCount;
        node.symbolCount = shared.symbolCount;
        node.parseDiagnostics = shared.parseDiagnostics && visit(shared.parseDiagnostics, visitDiagnostics).slice();
        Debug.assert(!shared.bindDiagnostics);
        Debug.assert(!shared.bindSuggestionDiagnostics);
        Debug.assert(!shared.lineMap);
        node.jsDocDiagnostics = shared.jsDocDiagnostics && visit(shared.jsDocDiagnostics, visitDiagnostics).slice();
        node.commentDirectives = shared.commentDirectives && (cache.get(shared.commentDirectives) as readonly CommentDirective[] ?? visitArray(shared.commentDirectives, identity));
        node.checkJsDirective = shared.checkJsDirective;
        if (shared.version) {
            node.version = shared.version;
        }
        return node;
    }

    function visit<T extends ShareableNonPrimitive, U extends object>(shared: T, visit: (value: T) => U): U {
        return cache.get(shared) as U ?? visit(shared);
    }

    function visitNodes<T extends SharedNodeBase, U extends Node>(sharedNodes: SharedNodeArray<T>, visit: (value: T) => U): NodeArray<U> {
        const nodes = factory.createNodeArray(visitArray(sharedNodes.items, visit), sharedNodes.hasTrailingComma) as MutableNodeArray<U>;
        nodes.pos = sharedNodes.pos;
        nodes.end = sharedNodes.end;
        nodes.hasTrailingComma = sharedNodes.hasTrailingComma;
        nodes.transformFlags = sharedNodes.transformFlags;
        if (sharedNodes.isMissingList) {
            (nodes as any).isMissingList = true;
        }
        return nodes;
    }

    function visitArray<T extends Shareable, U>(sharedArray: SharedArray<T>, visit: (value: T) => U): readonly U[] {
        const nodes: U[] = [];
        for (let i = 0; i < sharedArray.length; i++) {
            nodes[i] = visit(sharedArray[i]);
        }
        return nodes;
    }

    function copyJSDoc<T extends JSDocContainer>(shared: SharedJSDocContainer, node: Mutable<T>): void {
        node.jsDoc = shared.jsDoc && visitArray(shared.jsDoc, visitJSDocNode);
    }

    function finishNode<T extends Node>(node: Mutable<T>, shared: SharedNodeBase): T {
        node.pos = shared.pos;
        node.end = shared.end;
        node.flags = shared.flags;
        node.transformFlags = shared.transformFlags;
        node.__shared__ = shared;
        cache.set(shared, node);
        if (shared.parent) {
            needsParent.push([shared, node]);
        }
        return node;
    }
}
