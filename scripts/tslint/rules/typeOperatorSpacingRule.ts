import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "The '|' and '&' operators must be surrounded by spaces";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    const { sourceFile } = ctx;
    sourceFile.forEachChild(function cb(node: ts.Node): void {
        if (ts.isUnionTypeNode(node) || ts.isIntersectionTypeNode(node)) {
            check(node);
        }
        node.forEachChild(cb);
    });

    function check(node: ts.UnionTypeNode | ts.IntersectionTypeNode): void {
        const list = node.getChildren().find(child => child.kind === ts.SyntaxKind.SyntaxList)!;
        for (const child of list.getChildren()) {
            if ((child.kind === ts.SyntaxKind.BarToken || child.kind === ts.SyntaxKind.AmpersandToken)
                && (/\S/.test(sourceFile.text[child.getStart(sourceFile) - 1]) || /\S/.test(sourceFile.text[child.end]))) {
                ctx.addFailureAtNode(child, Rule.FAILURE_STRING);
            }
        }
    }
}
