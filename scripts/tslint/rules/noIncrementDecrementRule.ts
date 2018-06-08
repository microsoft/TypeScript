import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static POSTFIX_FAILURE_STRING = "Don't use '++' or '--' postfix operators outside statements or for loops.";
    public static PREFIX_FAILURE_STRING = "Don't use '++' or '--' prefix operators.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    ts.forEachChild(ctx.sourceFile, recur);
    function recur(node: ts.Node): void {
        switch (node.kind) {
            case ts.SyntaxKind.PrefixUnaryExpression:
                const { operator } = node as ts.PrefixUnaryExpression;
                if (operator === ts.SyntaxKind.PlusPlusToken || operator === ts.SyntaxKind.MinusMinusToken) {
                    check(node as ts.PrefixUnaryExpression);
                }
                break;

            case ts.SyntaxKind.PostfixUnaryExpression:
                check(node as ts.PostfixUnaryExpression);
                break;
        }
    }

    function check(node: ts.UnaryExpression): void {
        if (!isAllowedLocation(node.parent)) {
            ctx.addFailureAtNode(node, Rule.POSTFIX_FAILURE_STRING);
        }
    }
}

function isAllowedLocation(node: ts.Node): boolean {
    switch (node.kind) {
        // Can be a statement
        case ts.SyntaxKind.ExpressionStatement:
            return true;

        // Can be directly in a for-statement
        case ts.SyntaxKind.ForStatement:
            return true;

        // Can be in a comma operator in a for statement (`for (let a = 0, b = 10; a < b; a++, b--)`)
        case ts.SyntaxKind.BinaryExpression:
            return (node as ts.BinaryExpression).operatorToken.kind === ts.SyntaxKind.CommaToken &&
                node.parent.kind === ts.SyntaxKind.ForStatement;

        default:
            return false;
    }
}
