import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, ctx => walk(ctx));
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    ts.forEachChild(ctx.sourceFile, recur);
    function recur(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.CallExpression) {
            checkCall(node as ts.CallExpression);
        }
        ts.forEachChild(node, recur);
    }

    function checkCall(node: ts.CallExpression): void {
        for (const arg of node.arguments) {
            if (arg.kind !== ts.SyntaxKind.TrueKeyword && arg.kind !== ts.SyntaxKind.FalseKeyword) {
                continue;
            }

            if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
                const methodName = (node.expression as ts.PropertyAccessExpression).name.text
                // Skip certain method names whose parameter names are not informative
                if (methodName === 'set' ||
                    methodName === 'equal' ||
                    methodName === 'fail' ||
                    methodName === 'isTrue' ||
                    methodName === 'assert') {
                    continue;
                }
            }
            else if (node.expression.kind === ts.SyntaxKind.Identifier) {
                const functionName = (node.expression as ts.Identifier).text;
                // Skip certain function names whose parameter names are not informative
                if (functionName === 'assert') {
                    continue;
                }
            }

            const ranges = ts.getLeadingCommentRanges(arg.getFullText(), 0);
            if (!(ranges && ranges.length === 1 && ranges[0].kind === ts.SyntaxKind.MultiLineCommentTrivia)) {
                ctx.addFailureAtNode(arg, 'Tag boolean argument with parameter name');
            }
        }
    }
}
