/// <reference path="../../node_modules/tslint/typings/typescriptServices.d.ts" />
/// <reference path="../../node_modules/tslint/lib/tslint.d.ts" />


export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "Don't use the 'null' keyword - use 'undefined' for missing values instead";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NullWalker(sourceFile, this.getOptions()));
    }
}

class NullWalker extends Lint.RuleWalker {
    visitNode(node: ts.Node) {
        super.visitNode(node);
        if (node.kind === ts.SyntaxKind.NullKeyword) {
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        }
    }
}
