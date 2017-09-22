import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static LEADING_FAILURE_STRING = "No leading whitespace found on single-line object literal.";
    public static TRAILING_FAILURE_STRING = "No trailing whitespace found on single-line object literal.";
    public static LEADING_EXCESS_FAILURE_STRING = "Excess leading whitespace found on single-line object literal.";
    public static TRAILING_EXCESS_FAILURE_STRING = "Excess trailing whitespace found on single-line object literal.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    const { sourceFile } = ctx;
    ts.forEachChild(sourceFile, recur);
    function recur(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            check(node as ts.ObjectLiteralExpression);
        }
        ts.forEachChild(node, recur);
    }

    function check(node: ts.ObjectLiteralExpression): void {
        const text = node.getText(sourceFile);
        if (!text.match(/^{[^\n]+}$/g)) {
            return;
        }

        if (text.charAt(1) !== " ") {
            ctx.addFailureAtNode(node, Rule.LEADING_FAILURE_STRING);
        }
        if (text.charAt(2) === " ") {
            ctx.addFailureAt(node.pos + 2, 1, Rule.LEADING_EXCESS_FAILURE_STRING);
        }
        if (text.charAt(text.length - 2) !== " ") {
            ctx.addFailureAtNode(node, Rule.TRAILING_FAILURE_STRING);
        }
        if (text.charAt(text.length - 3) === " ") {
            ctx.addFailureAt(node.pos + node.getWidth() - 3, 1, Rule.TRAILING_EXCESS_FAILURE_STRING);
        }
    }
}
