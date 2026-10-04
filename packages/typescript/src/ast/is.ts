// is.ts — Hand-written type guard functions
// Generated guards are in is.generated.ts

import { ModifierFlags } from "#enums/modifierFlags";
import { NodeFlags } from "#enums/nodeFlags";
import { OuterExpressionKinds } from "#enums/outerExpressionKinds";
import { ScriptKind } from "#enums/scriptKind";
import { SyntaxKind } from "#enums/syntaxKind";
import type {
    AsExpression,
    BindingPattern,
    BlockOrExpression,
    BooleanLiteral,
    ComputedPropertyName,
    ConciseBody,
    ExclamationToken,
    Expression,
    ExpressionWithTypeArguments,
    ForInitializer,
    ForInOrOfStatement,
    ForStatement,
    Identifier,
    JSDocTypeExpression,
    JSDocTypeLiteral,
    JsxTagNameExpression,
    LeftHandSideExpression,
    LiteralExpression,
    MetaProperty,
    MinusToken,
    ModuleDeclaration,
    Node,
    NonNullExpression,
    NullLiteral,
    ParenthesizedExpression,
    PartiallyEmittedExpression,
    PlusToken,
    PrefixUnaryExpression,
    QuestionToken,
    ReadonlyKeyword,
    SatisfiesExpression,
    Statement,
    TemplateMiddle,
    TemplateTail,
    ThisTypeNode,
    TypeAssertion,
    TypeNode,
    UnaryExpressionBase,
} from "./ast.ts";
import {
    isBinaryExpression,
    isClassLikeDeclaration,
    isComputedPropertyName,
    isHeritageClause,
    isIdentifier,
    isJSDocAugmentsTag,
    isJSDocImplementsTag,
    isJSDocLink,
    isJSDocLinkCode,
    isJSDocLinkPlain,
    isJSDocNameReference,
    isLiteralExpression,
    isShorthandPropertyAssignment,
} from "./is.generated.ts";
import {
    hasExpression,
    hasInitializer,
    hasObjectAssignmentInitializer,
} from "./utils.ts";

export * from "./is.generated.ts";

type JSDocNamespaceDeclaration = ModuleDeclaration;

type WrappedExpression<T extends Expression> =
    | ParenthesizedExpression
    | TypeAssertion
    | AsExpression
    | SatisfiesExpression
    | ExpressionWithTypeArguments
    | NonNullExpression
    | PartiallyEmittedExpression;

type OuterExpression = WrappedExpression<Expression>;

export function isTypeNode(node: Node): node is TypeNode {
    return isTypeNodeKind(node.kind);
}

function isTypeNodeKind(kind: SyntaxKind): boolean {
    return kind >= SyntaxKind.FirstTypeNode && kind <= SyntaxKind.LastTypeNode
        || kind === SyntaxKind.AnyKeyword
        || kind === SyntaxKind.UnknownKeyword
        || kind === SyntaxKind.NumberKeyword
        || kind === SyntaxKind.BigIntKeyword
        || kind === SyntaxKind.ObjectKeyword
        || kind === SyntaxKind.BooleanKeyword
        || kind === SyntaxKind.StringKeyword
        || kind === SyntaxKind.SymbolKeyword
        || kind === SyntaxKind.VoidKeyword
        || kind === SyntaxKind.UndefinedKeyword
        || kind === SyntaxKind.NeverKeyword
        || kind === SyntaxKind.IntrinsicKeyword
        || kind === SyntaxKind.ExpressionWithTypeArguments
        || kind === SyntaxKind.JSDocAllType
        || kind === SyntaxKind.JSDocNullableType
        || kind === SyntaxKind.JSDocNonNullableType
        || kind === SyntaxKind.JSDocOptionalType
        || kind === SyntaxKind.JSDocVariadicType
        || kind === SyntaxKind.JSDocTypeExpression
        || kind === SyntaxKind.JSDocTypeLiteral
        || kind === SyntaxKind.JSDocSignature;
}

export function isStatement(node: Node): node is Statement {
    const kind = node.kind;
    return kind === SyntaxKind.VariableStatement || kind === SyntaxKind.EmptyStatement
        || kind === SyntaxKind.ExpressionStatement || kind === SyntaxKind.IfStatement
        || kind === SyntaxKind.DoStatement || kind === SyntaxKind.WhileStatement
        || kind === SyntaxKind.ForStatement || kind === SyntaxKind.ForInStatement
        || kind === SyntaxKind.ForOfStatement || kind === SyntaxKind.ContinueStatement
        || kind === SyntaxKind.BreakStatement || kind === SyntaxKind.ReturnStatement
        || kind === SyntaxKind.WithStatement || kind === SyntaxKind.SwitchStatement
        || kind === SyntaxKind.LabeledStatement || kind === SyntaxKind.ThrowStatement
        || kind === SyntaxKind.TryStatement || kind === SyntaxKind.DebuggerStatement
        || kind === SyntaxKind.InterfaceDeclaration || kind === SyntaxKind.TypeAliasDeclaration
        || kind === SyntaxKind.EnumDeclaration || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.ImportDeclaration || kind === SyntaxKind.ImportEqualsDeclaration
        || kind === SyntaxKind.ExportDeclaration || kind === SyntaxKind.ExportAssignment
        || kind === SyntaxKind.NamespaceExportDeclaration || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.ClassDeclaration || kind === SyntaxKind.MissingDeclaration
        || kind === SyntaxKind.NotEmittedStatement || kind === SyntaxKind.Block;
}

export function isExpression(node: Node): node is Expression {
    const kind = node.kind;
    return kind === SyntaxKind.ConditionalExpression || kind === SyntaxKind.YieldExpression
        || kind === SyntaxKind.ArrowFunction || kind === SyntaxKind.BinaryExpression
        || kind === SyntaxKind.SpreadElement || kind === SyntaxKind.AsExpression
        || kind === SyntaxKind.OmittedExpression
        || kind === SyntaxKind.SatisfiesExpression
        || kind === SyntaxKind.PrefixUnaryExpression || kind === SyntaxKind.PostfixUnaryExpression
        || kind === SyntaxKind.DeleteExpression || kind === SyntaxKind.TypeOfExpression
        || kind === SyntaxKind.VoidExpression || kind === SyntaxKind.AwaitExpression
        || kind === SyntaxKind.TypeAssertionExpression
        || kind === SyntaxKind.CallExpression || kind === SyntaxKind.NewExpression
        || kind === SyntaxKind.TaggedTemplateExpression || kind === SyntaxKind.NonNullExpression
        || kind === SyntaxKind.MetaProperty || kind === SyntaxKind.JsxExpression
        || kind === SyntaxKind.PropertyAccessExpression || kind === SyntaxKind.ElementAccessExpression
        || kind === SyntaxKind.FunctionExpression || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.ParenthesizedExpression || kind === SyntaxKind.ArrayLiteralExpression
        || kind === SyntaxKind.ObjectLiteralExpression || kind === SyntaxKind.TemplateExpression
        || kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PrivateIdentifier
        || kind === SyntaxKind.NumericLiteral || kind === SyntaxKind.BigIntLiteral
        || kind === SyntaxKind.StringLiteral || kind === SyntaxKind.RegularExpressionLiteral
        || kind === SyntaxKind.NoSubstitutionTemplateLiteral || kind === SyntaxKind.JsxElement
        || kind === SyntaxKind.JsxSelfClosingElement || kind === SyntaxKind.JsxFragment
        || kind === SyntaxKind.NullKeyword || kind === SyntaxKind.TrueKeyword
        || kind === SyntaxKind.FalseKeyword || kind === SyntaxKind.ThisKeyword
        || kind === SyntaxKind.SuperKeyword || kind === SyntaxKind.ImportKeyword
        || kind === SyntaxKind.ExpressionWithTypeArguments;
}

export function isValidTypeOnlyAliasUseSite(useSite: Node): boolean {
    return !!(useSite.flags & NodeFlags.Ambient)
        || isInJSDoc(useSite)
        || isPartOfTypeQuery(useSite)
        || isIdentifierInNonEmittingHeritageClause(useSite)
        || isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(useSite)
        || !(isExpressionNode(useSite) || isShorthandPropertyNameUseSite(useSite));
}

function isInJSDoc(node: Node): boolean {
    return !!(node.flags & NodeFlags.JSDoc);
}

function isPartOfTypeQuery(node: Node): boolean {
    while (node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.Identifier) {
        node = node.parent;
    }
    return node.kind === SyntaxKind.TypeQuery;
}

function isIdentifierInNonEmittingHeritageClause(node: Node): boolean {
    if (!isIdentifier(node)) return false;

    const heritageClause = findAncestor(node.parent, parent => {
        switch (parent.kind) {
            case SyntaxKind.HeritageClause:
                return true;
            case SyntaxKind.PropertyAccessExpression:
            case SyntaxKind.ExpressionWithTypeArguments:
                return false;
            default:
                return "quit";
        }
    });

    return heritageClause !== undefined &&
        isHeritageClause(heritageClause) &&
        (heritageClause.token === SyntaxKind.ImplementsKeyword || heritageClause.parent.kind === SyntaxKind.InterfaceDeclaration);
}

function isPartOfPossiblyValidTypeOrAbstractComputedPropertyName(node: Node): boolean {
    while (node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PropertyAccessExpression) {
        node = node.parent;
    }
    if (!isComputedPropertyName(node)) {
        return false;
    }
    if (hasModifierFlags(node.parent) && node.parent.modifierFlags & ModifierFlags.Abstract) {
        return true;
    }
    const containerKind = node.parent.parent.kind;
    return containerKind === SyntaxKind.InterfaceDeclaration || containerKind === SyntaxKind.TypeLiteral;
}

function isShorthandPropertyNameUseSite(useSite: Node): boolean {
    return isIdentifier(useSite) && isShorthandPropertyAssignment(useSite.parent) && useSite.parent.name === useSite;
}

type AncestorCallbackResult = boolean | "quit";

function findAncestor(node: Node, callback: (node: Node) => AncestorCallbackResult): Node | undefined {
    while (node) {
        const result = callback(node);
        if (result === "quit") {
            return undefined;
        }
        if (result) {
            return node;
        }
        node = node.parent;
    }
}

function hasModifierFlags(node: Node): node is Node & { readonly modifierFlags: ModifierFlags; } {
    return "modifierFlags" in node;
}

function isExpressionNode(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.AsExpression:
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.SatisfiesExpression:
        case SyntaxKind.NonNullExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.SpreadElement:
        case SyntaxKind.TemplateExpression:
        case SyntaxKind.OmittedExpression:
        case SyntaxKind.JsxElement:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxFragment:
        case SyntaxKind.YieldExpression:
        case SyntaxKind.AwaitExpression:
            return true;
        case SyntaxKind.MetaProperty:
            return !isImportCall(node.parent) || node.parent.expression !== node;
        case SyntaxKind.ExpressionWithTypeArguments:
            return !isHeritageClause(node.parent);
        case SyntaxKind.QualifiedName:
            while (node.parent.kind === SyntaxKind.QualifiedName) {
                node = node.parent;
            }
            return node.parent.kind === SyntaxKind.TypeQuery || isInJSDocNameReference(node) || isJSXTagName(node);
        case SyntaxKind.PrivateIdentifier:
            return isBinaryExpression(node.parent) && node.parent.left === node && node.parent.operatorToken.kind === SyntaxKind.InKeyword;
        case SyntaxKind.Identifier:
            if (node.parent.kind === SyntaxKind.TypeQuery || isInJSDocNameReference(node) || isJSXTagName(node)) {
                return true;
            }
        // falls through
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.BigIntLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.ThisKeyword:
            return isInExpressionContext(node);
        default:
            return false;
    }
}

function isImportCall(node: Node): node is Node & { readonly expression: MetaProperty; } {
    if (node.kind !== SyntaxKind.CallExpression || !hasExpression(node) || !node.expression) {
        return false;
    }
    return node.expression.kind === SyntaxKind.MetaProperty
        && (node.expression as MetaProperty).keywordToken === SyntaxKind.ImportKeyword;
}

function isJSDocLinkLike(node: Node): boolean {
    return isJSDocLink(node) || isJSDocLinkCode(node) || isJSDocLinkPlain(node);
}

function isInJSDocNameReference(node: Node): boolean {
    return isJSDocLinkLike(node.parent) || isJSDocNameReference(node.parent);
}

function isInExpressionContext(node: Node): boolean {
    const parent = node.parent;
    switch (parent.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.EnumMember:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.BindingElement:
            return hasInitializer(parent) && parent.initializer === node;
        case SyntaxKind.ExpressionStatement:
        case SyntaxKind.IfStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.WhileStatement:
        case SyntaxKind.ReturnStatement:
        case SyntaxKind.WithStatement:
        case SyntaxKind.SwitchStatement:
        case SyntaxKind.CaseClause:
        case SyntaxKind.DefaultClause:
        case SyntaxKind.ThrowStatement:
            return hasExpression(parent) && parent.expression === node;
        case SyntaxKind.ForStatement:
            return isForStatementExpression(node, parent as ForStatement);
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
            return isForInOrOfStatementExpression(node, parent as ForInOrOfStatement);
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.AsExpression:
            return hasExpression(parent) && parent.expression === node;
        case SyntaxKind.TemplateSpan:
            return hasExpression(parent) && parent.expression === node;
        case SyntaxKind.ComputedPropertyName:
            return (parent as ComputedPropertyName).expression === node;
        case SyntaxKind.Decorator:
        case SyntaxKind.JsxExpression:
        case SyntaxKind.JsxSpreadAttribute:
        case SyntaxKind.SpreadAssignment:
            return true;
        case SyntaxKind.ExpressionWithTypeArguments:
            return (parent as ExpressionWithTypeArguments).expression === node && !isPartOfTypeExpressionWithTypeArguments(parent as ExpressionWithTypeArguments);
        case SyntaxKind.ShorthandPropertyAssignment:
            return hasObjectAssignmentInitializer(parent) && parent.objectAssignmentInitializer === node;
        case SyntaxKind.SatisfiesExpression:
            return hasExpression(parent) && parent.expression === node;
        default:
            return isExpressionNode(parent);
    }
}

function isPartOfTypeExpressionWithTypeArguments(node: ExpressionWithTypeArguments): boolean {
    const parent = node.parent;
    return isHeritageClause(parent) && (!isClassLikeDeclaration(parent.parent) || parent.token === SyntaxKind.ImplementsKeyword) ||
        isJSDocImplementsTag(parent) ||
        isJSDocAugmentsTag(parent);
}

function isForStatementExpression(node: Node, parent: ForStatement): boolean {
    return parent.initializer === node && parent.initializer.kind !== SyntaxKind.VariableDeclarationList ||
        parent.condition === node ||
        parent.incrementor === node;
}

function isForInOrOfStatementExpression(node: Node, parent: ForInOrOfStatement): boolean {
    return parent.initializer === node && parent.initializer.kind !== SyntaxKind.VariableDeclarationList ||
        parent.expression === node;
}

function isJSXTagName(node: Node): boolean {
    const parent = node.parent;
    switch (parent.kind) {
        case SyntaxKind.JsxOpeningElement:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxClosingElement:
            return hasTagName(parent) && parent.tagName === node;
        default:
            return false;
    }
}

function hasTagName(node: Node): node is Node & { readonly tagName: Node; } {
    return "tagName" in node;
}

export function isBlockOrExpression(node: Node): node is BlockOrExpression {
    return node.kind === SyntaxKind.Block || isExpression(node);
}

export function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression {
    return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

export function skipPartiallyEmittedExpressions(node: Expression): Expression;
export function skipPartiallyEmittedExpressions(node: Node): Node;
export function skipPartiallyEmittedExpressions(node: Node) {
    return skipOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions);
}

function isLeftHandSideExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.JsxElement:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxFragment:
        case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier: // technically this is only an Expression if it's in a `#field in expr` BinaryExpression
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.BigIntLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.TemplateExpression:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.NonNullExpression:
        case SyntaxKind.ExpressionWithTypeArguments:
        case SyntaxKind.MetaProperty:
        case SyntaxKind.ImportKeyword: // technically this is only an Expression if it's in a CallExpression
        case SyntaxKind.MissingDeclaration:
            return true;
        default:
            return false;
    }
}

export function isUnaryExpression(node: Node): node is UnaryExpressionBase {
    return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isUnaryExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.AwaitExpression:
        case SyntaxKind.TypeAssertionExpression:
            return true;
        default:
            return isLeftHandSideExpressionKind(kind);
    }
}

/** @internal */
export function isOuterExpression(node: Node, kinds: OuterExpressionKinds = OuterExpressionKinds.All): node is OuterExpression {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedExpression:
            if (kinds & OuterExpressionKinds.ExcludeJSDocTypeAssertion && isJSDocTypeAssertion(node as ParenthesizedExpression)) {
                return false;
            }
            return (kinds & OuterExpressionKinds.Parentheses) !== 0;
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.AsExpression:
            return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
        case SyntaxKind.SatisfiesExpression:
            return (kinds & (OuterExpressionKinds.ExpressionsWithTypeArguments | OuterExpressionKinds.Satisfies)) !== 0;
        case SyntaxKind.ExpressionWithTypeArguments:
            return (kinds & OuterExpressionKinds.ExpressionsWithTypeArguments) !== 0;
        case SyntaxKind.NonNullExpression:
            return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
        case SyntaxKind.PartiallyEmittedExpression:
            return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    }
    return false;
}

/** @internal */
export function skipOuterExpressions<T extends Expression>(node: WrappedExpression<T>): T;
/** @internal */
export function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
/** @internal */
export function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
/** @internal */
export function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
    while (isOuterExpression(node, kinds)) {
        node = node.expression;
    }
    return node;
}

function isJSDocTypeAssertion(node: ParenthesizedExpression): boolean {
    const sourceFile = node.getSourceFile();
    if (sourceFile.scriptKind !== ScriptKind.JS && sourceFile.scriptKind !== ScriptKind.JSX) {
        return false;
    }
    const expression = node.expression;
    if (expression.kind !== SyntaxKind.AsExpression) {
        return false;
    }
    const asExpression = expression as AsExpression;
    return !!asExpression.type
        && (asExpression.type.flags & NodeFlags.Reparsed) !== 0;
}

export function isBindingPattern(node: Node): node is BindingPattern {
    return node.kind === SyntaxKind.ObjectBindingPattern || node.kind === SyntaxKind.ArrayBindingPattern;
}

export function isConciseBody(node: Node): node is ConciseBody {
    return node.kind === SyntaxKind.Block || isExpression(node);
}

export function isForInitializer(node: Node): node is ForInitializer {
    return node.kind === SyntaxKind.VariableDeclarationList || isExpression(node);
}

export function isQuestionOrExclamationToken(node: Node): node is QuestionToken | ExclamationToken {
    return node.kind === SyntaxKind.QuestionToken || node.kind === SyntaxKind.ExclamationToken;
}

export function isIdentifierOrThisTypeNode(node: Node): node is Identifier | ThisTypeNode {
    return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ThisType;
}

export function isReadonlyKeywordOrPlusOrMinusToken(node: Node): node is ReadonlyKeyword | PlusToken | MinusToken {
    return node.kind === SyntaxKind.ReadonlyKeyword || node.kind === SyntaxKind.PlusToken || node.kind === SyntaxKind.MinusToken;
}

export function isQuestionOrPlusOrMinusToken(node: Node): node is QuestionToken | PlusToken | MinusToken {
    return node.kind === SyntaxKind.QuestionToken || node.kind === SyntaxKind.PlusToken || node.kind === SyntaxKind.MinusToken;
}

export function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail {
    return node.kind === SyntaxKind.TemplateMiddle || node.kind === SyntaxKind.TemplateTail;
}

export function isLiteralTypeLiteral(node: Node): node is NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression {
    const kind = node.kind;
    return kind === SyntaxKind.NullKeyword || kind === SyntaxKind.TrueKeyword
        || kind === SyntaxKind.FalseKeyword || kind === SyntaxKind.PrefixUnaryExpression
        || isLiteralExpression(node);
}

export function isIdentifierOrJSDocNamespaceDeclaration(node: Node): node is Identifier | JSDocNamespaceDeclaration {
    return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.ModuleDeclaration;
}

export function isJSDocTypeExpressionOrJSDocTypeLiteral(node: Node): node is JSDocTypeExpression | JSDocTypeLiteral {
    return node.kind === SyntaxKind.JSDocTypeExpression || node.kind === SyntaxKind.JSDocTypeLiteral;
}

export function isJsxTagNameExpression(node: Node): node is JsxTagNameExpression {
    const kind = node.kind;
    return kind === SyntaxKind.ThisKeyword
        || kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.JsxNamespacedName;
}
