import * as Lint from "tslint/lib";
import * as ts from "typescript";


export class Rule extends Lint.Rules.AbstractRule {
    public static LEADING_FAILURE_STRING = "No leading whitespace found on single-line object literal.";
    public static TRAILING_FAILURE_STRING = "No trailing whitespace found on single-line object literal.";
    public static LEADING_EXCESS_FAILURE_STRING = "Excess leading whitespace found on single-line object literal.";
    public static TRAILING_EXCESS_FAILURE_STRING = "Excess trailing whitespace found on single-line object literal.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new ObjectLiteralSpaceWalker(sourceFile, this.getOptions()));
    }
}

class ObjectLiteralSpaceWalker extends Lint.RuleWalker {
    public visitNode(node: ts.Node) {
        if (node.kind === ts.SyntaxKind.ObjectLiteralExpression) {
            const literal = node as ts.ObjectLiteralExpression;
            const text = literal.getText();
            if (text.match(/^{[^\n]+}$/g)) {
                if (text.charAt(1) !== " ") {
                    const failure = this.createFailure(node.pos, node.getWidth(), Rule.LEADING_FAILURE_STRING);
                    this.addFailure(failure);
                }
                if (text.charAt(2) === " ") {
                    const failure = this.createFailure(node.pos + 2, 1, Rule.LEADING_EXCESS_FAILURE_STRING);
                    this.addFailure(failure);
                }
                if (text.charAt(text.length - 2) !== " ") {
                    const failure = this.createFailure(node.pos, node.getWidth(), Rule.TRAILING_FAILURE_STRING);
                    this.addFailure(failure);
                }
                if (text.charAt(text.length - 3) === " ") {
                    const failure = this.createFailure(node.pos + node.getWidth() - 3, 1, Rule.TRAILING_EXCESS_FAILURE_STRING);
                    this.addFailure(failure);
                }
            }
        }
        super.visitNode(node);
    }
}
