import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static TRAILING_FAILURE_STRING = "Excess trailing whitespace found around type assertion.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    ts.forEachChild(ctx.sourceFile, recur);
    function recur(node: ts.Node) {
        if (node.kind === ts.SyntaxKind.TypeAssertionExpression) {
            const refined = node as ts.TypeAssertion;
            const leftSideWhitespaceStart = refined.type.getEnd() + 1;
            const rightSideWhitespaceEnd = refined.expression.getStart();
            if (leftSideWhitespaceStart !== rightSideWhitespaceEnd) {
                ctx.addFailure(leftSideWhitespaceStart, rightSideWhitespaceEnd, Rule.TRAILING_FAILURE_STRING);
            }
        }
        ts.forEachChild(node, recur);
    }
}
