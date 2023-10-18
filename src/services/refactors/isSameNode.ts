import {
    ArrayLiteralExpression,
    BigIntLiteral,
    BinaryExpression,
    CallExpression,
    ComputedPropertyName,
    ConditionalExpression,
    ElementAccessExpression,
    FalseLiteral,
    Identifier,
    JsxText,
    Node,
    NoSubstitutionTemplateLiteral,
    NullLiteral,
    NumericLiteral,
    ObjectLiteralExpression,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PropertyAccessExpression,
    PropertyAssignment,
    RegularExpressionLiteral,
    ShorthandPropertyAssignment,
    SpreadAssignment,
    SpreadElement,
    StringLiteral,
    SyntaxKind,
    ThisExpression,
    TrueLiteral,
} from "../_namespaces/ts";

export function isSameNode(a: Node, b: Node): boolean {
    if (a === b) return true;

    if (a.kind !== b.kind) return false;

    return isSameNodeTable[a.kind]?.(a, b) ?? false;
}

const isSameNodeTable: Partial<Record<SyntaxKind, (a: any, b: any) => boolean>> = {
    [SyntaxKind.NumericLiteral](a: NumericLiteral, b: NumericLiteral) {
        return a.text === b.text;
    },
    [SyntaxKind.BigIntLiteral](a: BigIntLiteral, b: BigIntLiteral) {
        return a.text === b.text;
    },
    [SyntaxKind.StringLiteral](a: StringLiteral, b: StringLiteral) {
        return a.text === b.text;
    },
    [SyntaxKind.JsxText](a: JsxText, b: JsxText) {
        return a.text === b.text;
    },
    [SyntaxKind.JsxTextAllWhiteSpaces](a: JsxText, b: JsxText) {
        return a.text === b.text;
    },
    [SyntaxKind.RegularExpressionLiteral](a: RegularExpressionLiteral, b: RegularExpressionLiteral) {
        return a.text === b.text;
    },
    [SyntaxKind.NoSubstitutionTemplateLiteral](a: NoSubstitutionTemplateLiteral, b: NoSubstitutionTemplateLiteral) {
        return a.text === b.text;
    },
    [SyntaxKind.TrueKeyword](_a: TrueLiteral, _b: TrueLiteral) {
        return true;
    },
    [SyntaxKind.FalseKeyword](_a: FalseLiteral, _b: FalseLiteral) {
        return true;
    },
    [SyntaxKind.NullKeyword](_a: NullLiteral, _b: NullLiteral) {
        return true;
    },
    [SyntaxKind.ThisKeyword](_a: ThisExpression, _b: ThisExpression) {
        return true; // TODO: figure out why a.symbol doesn't exist
    },
    [SyntaxKind.ArrayLiteralExpression](a: ArrayLiteralExpression, b: ArrayLiteralExpression) {
        if (a.elements.length !== b.elements.length) return false;
        return a.elements.every((a, i) => isSameNode(a, b.elements[i]));
    },
    [SyntaxKind.ObjectLiteralExpression](a: ObjectLiteralExpression, b: ObjectLiteralExpression) {
        if (a.properties.length !== b.properties.length) return false;
        return a.properties.every((a, i) => isSameNode(a, b.properties[i]));
    },
    [SyntaxKind.PropertyAssignment](a: PropertyAssignment, b: PropertyAssignment) {
        return isSameNode(a.name, b.name)
            && isSameNode(a.initializer, b.initializer);
    },
    [SyntaxKind.ShorthandPropertyAssignment](a: ShorthandPropertyAssignment, b: ShorthandPropertyAssignment) {
        return isSameNode(a.name, b.name);
    },
    [SyntaxKind.ComputedPropertyName](a: ComputedPropertyName, b: ComputedPropertyName) {
        return isSameNode(a.expression, b.expression);
    },
    [SyntaxKind.SpreadAssignment](a: SpreadAssignment, b: SpreadAssignment) {
        return isSameNode(a.expression, b.expression);
    },
    [SyntaxKind.SpreadElement](a: SpreadElement, b: SpreadElement) {
        return isSameNode(a.expression, b.expression);
    },
    [SyntaxKind.Identifier](a: Identifier, b: Identifier) {
        return a.symbol
            ? a.symbol === b.symbol
            : a.text === b.text;
    },
    [SyntaxKind.PropertyAccessExpression](a: PropertyAccessExpression, b: PropertyAccessExpression) {
        return isSameNode(a.expression, b.expression)
            && isSameNode(a.name, b.name)
            && a.questionDotToken?.kind === b.questionDotToken?.kind;
    },
    [SyntaxKind.ElementAccessExpression](a: ElementAccessExpression, b: ElementAccessExpression) {
        return isSameNode(a.expression, b.expression)
            && isSameNode(a.argumentExpression, b.argumentExpression)
            && a.questionDotToken?.kind === b.questionDotToken?.kind;
    },
    [SyntaxKind.BinaryExpression](a: BinaryExpression, b: BinaryExpression) {
        return a.operatorToken.kind === b.operatorToken.kind
            && isSameNode(a.left, b.left)
            && isSameNode(a.right, b.right);
    },
    [SyntaxKind.ConditionalExpression](a: ConditionalExpression, b: ConditionalExpression) {
        return isSameNode(a.condition, b.condition)
            && isSameNode(a.whenTrue, b.whenTrue)
            && isSameNode(a.whenFalse, b.whenFalse);
    },
    [SyntaxKind.CallExpression](a: CallExpression, b: CallExpression) {
        return isSameNode(a.expression, b.expression)
            && a.questionDotToken?.kind === b.questionDotToken?.kind
            && a.arguments.length === b.arguments.length
            && a.typeArguments?.length === b.typeArguments?.length
            && a.arguments.every((a, i) => isSameNode(a, b.arguments[i]))
            && (a.typeArguments?.every((a, i) => isSameNode(a, b.typeArguments![i])) ?? true);
    },
    [SyntaxKind.PrefixUnaryExpression](a: PrefixUnaryExpression, b: PrefixUnaryExpression) {
        return a.operator === b.operator && isSameNode(a.operand, b.operand);
    },
    [SyntaxKind.PostfixUnaryExpression](a: PostfixUnaryExpression, b: PostfixUnaryExpression) {
        return a.operator === b.operator && isSameNode(a.operand, b.operand);
    },
};
