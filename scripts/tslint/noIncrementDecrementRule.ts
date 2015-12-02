import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";


export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Don't use '++' or '--' operators outside for for loops or statements - prefer '+= 1' and '-= 1'.";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new IncrementDecrementWalker(sourceFile, this.getOptions()));
    }
}

class IncrementDecrementWalker extends Lint.RuleWalker {

    visitPostfixUnaryExpression(node: ts.PostfixUnaryExpression) {
        super.visitPostfixUnaryExpression(node);
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator == ts.SyntaxKind.MinusMinusToken) {
            this.visitIncrementDecrement(node);
        }
    }

    visitPrefixUnaryExpression(node: ts.PrefixUnaryExpression) {
        super.visitPrefixUnaryExpression(node);
        if (node.operator === ts.SyntaxKind.PlusPlusToken || node.operator == ts.SyntaxKind.MinusMinusToken) {
            this.visitIncrementDecrement(node);
        }
    }

    visitIncrementDecrement(node: ts.UnaryExpression) {
        if (node.parent && (node.parent.kind === ts.SyntaxKind.ExpressionStatement || node.parent.kind === ts.SyntaxKind.ForStatement)) {
            return;
        }
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
    }
}
