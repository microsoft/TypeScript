// @strict: true
// @noEmit: true

const enum SyntaxKind {
  Identifier,
  PropertyAccessExpression,
  ParenthesizedExpression,
  ExpressionWithTypeArguments,
  NullKeyword,
  TrueKeyword,
  FalseKeyword,
  ThisKeyword,
  DeleteExpression,
  TypeOfExpression,
  VoidExpression,
  AwaitExpression,
  TypeAssertionExpression,
  NewExpression,
  NumericLiteral,
  StringLiteral,
  TemplateExpression,
}

interface TypeNodeBase extends BaseNode {
  _typeNodeBrand: any;
}

interface NullLiteral extends PrimaryExpressionBase, TypeNodeBase {
  kind: SyntaxKind.NullKeyword;
}

interface BooleanLiteral extends PrimaryExpressionBase, TypeNodeBase {
  kind: SyntaxKind.TrueKeyword | SyntaxKind.FalseKeyword;
}

interface ThisExpression extends PrimaryExpressionBase, TypeNodeBase {
  kind: SyntaxKind.ThisKeyword;
}

interface NewExpression extends PrimaryExpressionBase {
  kind: SyntaxKind.NewExpression;
  expression: Expression;
}

interface LiteralLikeNodeBase extends BaseNode {
  text: string;
  isUnterminated?: boolean;
  hasExtendedUnicodeEscape?: boolean;
}

interface LiteralExpressionBase
  extends LiteralLikeNodeBase,
    PrimaryExpressionBase {
  _literalExpressionBrand: any;
}

interface StringLiteral extends LiteralExpressionBase {
  kind: SyntaxKind.StringLiteral;
  singleQuote?: boolean;
}

interface NumericLiteral extends LiteralExpressionBase {
  kind: SyntaxKind.NumericLiteral;
}

type LiteralExpression = StringLiteral | NumericLiteral;

interface TemplateExpression extends PrimaryExpressionBase {
  kind: SyntaxKind.TemplateExpression;
}

type PrimaryExpression =
  | Identifier
  | NullLiteral
  | BooleanLiteral
  | ThisExpression
  | LiteralExpression
  | TemplateExpression
  | ParenthesizedExpression
  | NewExpression;

type Expression =
  | PropertyAccessExpression
  | PropertyAccessEntityNameExpression
  | PrimaryExpression;

interface BaseNode {
  kind: SyntaxKind;
}

interface ExpressionBase extends BaseNode {
  _expressionBrand: any;
}

interface UnaryExpressionBase extends ExpressionBase {
  _unaryExpressionBrand: any;
}

interface UpdateExpressionBase extends UnaryExpressionBase {
  _updateExpressionBrand: any;
}

interface LeftHandSideExpressionBase extends UpdateExpressionBase {
  _leftHandSideExpressionBrand: any;
}

interface MemberExpressionBase extends LeftHandSideExpressionBase {
  _memberExpressionBrand: any;
}

interface PrimaryExpressionBase extends MemberExpressionBase {
  _primaryExpressionBrand: any;
}

interface Identifier extends PrimaryExpressionBase {
  kind: SyntaxKind.Identifier;
  escapedText: string;
}

interface PropertyAccessExpression extends MemberExpressionBase {
  kind: SyntaxKind.PropertyAccessExpression;
  expression: Expression;
  name: Identifier;
}

interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
  _propertyAccessExpressionLikeQualifiedNameBrand?: any;
  expression: EntityNameExpression;
}

interface ParenthesizedExpression extends PrimaryExpressionBase {
  kind: SyntaxKind.ParenthesizedExpression;
  expression: Expression;
}

type EntityNameExpression =
  | Identifier
  | PropertyAccessEntityNameExpression
  | ParenthesizedExpression;

interface ExpressionWithTypeArguments extends BaseNode {
  kind: SyntaxKind.ExpressionWithTypeArguments;
  expression: Expression;
}

declare function assert(arg: unknown): asserts arg;

declare function isEntityNameExpression(
  node: Expression,
): node is EntityNameExpression;

declare function emitEntityName(entityName: EntityNameExpression): void;

export function emitExpressionWithTypeArguments(
  node: ExpressionWithTypeArguments,
) {
  if (isEntityNameExpression(node.expression)) {
    assert(
      node.expression.kind === SyntaxKind.Identifier ||
        node.expression.kind === SyntaxKind.PropertyAccessExpression,
    );
    emitEntityName(node.expression);
    // ...
  }
}
