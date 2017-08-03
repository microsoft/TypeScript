import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "The '|' and '&' operators must be surrounded by single spaces";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    const { sourceFile } = ctx;
    ts.forEachChild(sourceFile, recur);
    function recur(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.UnionType || node.kind === ts.SyntaxKind.IntersectionType) {
            check((node as ts.UnionOrIntersectionTypeNode).types);
        }
        ts.forEachChild(node, recur);
    }

    function check(types: ReadonlyArray<ts.TypeNode>): void {
        let expectedStart = types[0].end + 2; // space, | or &
        for (let i = 1; i < types.length; i++) {
            const currentType = types[i];
            if (expectedStart !== currentType.pos || currentType.getLeadingTriviaWidth() !== 1) {
                const previousTypeEndPos = sourceFile.getLineAndCharacterOfPosition(types[i - 1].end);
                const currentTypeStartPos = sourceFile.getLineAndCharacterOfPosition(currentType.pos);
                if (previousTypeEndPos.line === currentTypeStartPos.line) {
                    ctx.addFailureAtNode(currentType, Rule.FAILURE_STRING);
                }
            }
            expectedStart = currentType.end + 2;
        }
    }
}
