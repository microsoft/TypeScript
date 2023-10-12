import {
    BinaryExpression,
    Declaration,
    ElementAccessExpression,
    EntityNameExpression,
    Expression,
    NumericLiteral,
    ParenthesizedExpression,
    PrefixUnaryExpression,
    StringLiteralLike,
    SyntaxKind,
    TemplateExpression,
} from "../../_namespaces/ts";

interface EvaluationResolver {
    evaluateEntityNameExpression(expr: EntityNameExpression, location: Declaration | undefined): string | number | undefined;
    evaluateElementAccessExpression(expr: ElementAccessExpression, location: Declaration | undefined): string | number | undefined;
    onNumericLiteral(expr: NumericLiteral): void;
}
export function makeEvaluator({ evaluateElementAccessExpression, evaluateEntityNameExpression, onNumericLiteral }: EvaluationResolver) {
    function evaluate(expr: Expression, location?: Declaration): string | number | undefined {
        switch (expr.kind) {
            case SyntaxKind.PrefixUnaryExpression:
                const value = evaluate((expr as PrefixUnaryExpression).operand, location);
                if (typeof value === "number") {
                    switch ((expr as PrefixUnaryExpression).operator) {
                        case SyntaxKind.PlusToken:
                            return value;
                        case SyntaxKind.MinusToken:
                            return -value;
                        case SyntaxKind.TildeToken:
                            return ~value;
                    }
                }
                break;
            case SyntaxKind.BinaryExpression:
                const left = evaluate((expr as BinaryExpression).left, location);
                const right = evaluate((expr as BinaryExpression).right, location);
                if (typeof left === "number" && typeof right === "number") {
                    switch ((expr as BinaryExpression).operatorToken.kind) {
                        case SyntaxKind.BarToken:
                            return left | right;
                        case SyntaxKind.AmpersandToken:
                            return left & right;
                        case SyntaxKind.GreaterThanGreaterThanToken:
                            return left >> right;
                        case SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
                            return left >>> right;
                        case SyntaxKind.LessThanLessThanToken:
                            return left << right;
                        case SyntaxKind.CaretToken:
                            return left ^ right;
                        case SyntaxKind.AsteriskToken:
                            return left * right;
                        case SyntaxKind.SlashToken:
                            return left / right;
                        case SyntaxKind.PlusToken:
                            return left + right;
                        case SyntaxKind.MinusToken:
                            return left - right;
                        case SyntaxKind.PercentToken:
                            return left % right;
                        case SyntaxKind.AsteriskAsteriskToken:
                            return left ** right;
                    }
                }
                else if (
                    (typeof left === "string" || typeof left === "number") &&
                    (typeof right === "string" || typeof right === "number") &&
                    (expr as BinaryExpression).operatorToken.kind === SyntaxKind.PlusToken
                ) {
                    return "" + left + right;
                }
                break;
            case SyntaxKind.StringLiteral:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return (expr as StringLiteralLike).text;
            case SyntaxKind.TemplateExpression:
                return evaluateTemplateExpression(expr as TemplateExpression, location);
            case SyntaxKind.NumericLiteral:
                onNumericLiteral(expr as NumericLiteral);
                return +(expr as NumericLiteral).text;
            case SyntaxKind.ParenthesizedExpression:
                return evaluate((expr as ParenthesizedExpression).expression, location);
            case SyntaxKind.Identifier:
            case SyntaxKind.PropertyAccessExpression:
                return evaluateEntityNameExpression(expr as EntityNameExpression, location);
            case SyntaxKind.ElementAccessExpression:
                return evaluateElementAccessExpression(expr as ElementAccessExpression, location);
        }
        return undefined;
    }

    function evaluateTemplateExpression(expr: TemplateExpression, location?: Declaration) {
        let result = expr.head.text;
        for (const span of expr.templateSpans) {
            const value = evaluate(span.expression, location);
            if (value === undefined) {
                return undefined;
            }
            result += value;
            result += span.literal.text;
        }
        return result;
    }

    return evaluate;
}
