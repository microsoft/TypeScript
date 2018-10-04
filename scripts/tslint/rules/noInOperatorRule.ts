import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Don't use the 'in' keyword - use 'hasProperty' to check for key presence instead";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    ts.forEachChild(ctx.sourceFile, recur);
    function recur(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.InKeyword && node.parent.kind === ts.SyntaxKind.BinaryExpression) {
            ctx.addFailureAtNode(node, Rule.FAILURE_STRING);
        }
    }
}
