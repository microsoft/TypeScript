import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";


export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Don't use the 'in' keyword - use 'hasProperty' to check for key presence instead";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new InWalker(sourceFile, this.getOptions()));
    }
}

class InWalker extends Lint.RuleWalker {
    visitNode(node: ts.Node) {
        super.visitNode(node);
        if (node.kind === ts.SyntaxKind.InKeyword && node.parent && node.parent.kind === ts.SyntaxKind.BinaryExpression) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    }
}
