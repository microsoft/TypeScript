import * as Lint from "tslint/lib";
import * as ts from "typescript";


export class Rule extends Lint.Rules.AbstractRule {
    public static TRAILING_FAILURE_STRING = "Excess trailing whitespace found around type assertion.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new TypeAssertionWhitespaceWalker(sourceFile, this.getOptions()));
    }
}

class TypeAssertionWhitespaceWalker extends Lint.RuleWalker {
    public visitNode(node: ts.Node) {
        if (node.kind === ts.SyntaxKind.TypeAssertionExpression) {
            const refined = node as ts.TypeAssertion;
            const leftSideWhitespaceStart = refined.type.getEnd() + 1;
            const rightSideWhitespaceEnd = refined.expression.getStart();
            if (leftSideWhitespaceStart !== rightSideWhitespaceEnd) {
                this.addFailure(this.createFailure(leftSideWhitespaceStart, rightSideWhitespaceEnd, Rule.TRAILING_FAILURE_STRING));
            }
        }
        super.visitNode(node);
    }
}
