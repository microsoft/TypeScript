import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, ctx => walk(ctx));
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    ts.forEachChild(ctx.sourceFile, function recur(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.CallExpression) {
            checkCall(node as ts.CallExpression);
        }
        ts.forEachChild(node, recur);
    });

    function checkCall(node: ts.CallExpression): void {
        for (const arg of node.arguments) {
            switch (arg.kind) {
                case ts.SyntaxKind.TrueKeyword:
                case ts.SyntaxKind.FalseKeyword:
                case ts.SyntaxKind.NullKeyword:
                    break;
                case ts.SyntaxKind.Identifier:
                    if ((arg as ts.Identifier).originalKeywordKind !== ts.SyntaxKind.UndefinedKeyword) {
                        continue;
                    }
                    break;
                default:
                    continue;
            }

            if (node.expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
                const methodName = (node.expression as ts.PropertyAccessExpression).name.text;
                // Skip certain method names whose parameter names are not informative
                if (methodName.indexOf("set") === 0) {
                    continue;
                }
                switch (methodName) {
                    case "apply":
                    case "assert":
                    case "call":
                    case "equal":
                    case "fail":
                    case "isTrue":
                    case "output":
                    case "stringify":
                        continue;
                }
            }
            else if (node.expression.kind === ts.SyntaxKind.Identifier) {
                const functionName = (node.expression as ts.Identifier).text;
                // Skip certain function names whose parameter names are not informative
                if (functionName.indexOf("set") === 0) {
                    continue;
                }
                switch (functionName) {
                    case "assert":
                    case "contains":
                    case "createAnonymousType":
                    case "createImportSpecifier":
                    case "createProperty":
                    case "createSignature":
                    case "resolveName":
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
