import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, ctx => walk(ctx));
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    const { sourceFile } = ctx;
    ts.forEachChild(sourceFile, function recur(node: ts.Node): void {
        if (node.kind === ts.SyntaxKind.CallExpression) {
            checkCall(node as ts.CallExpression);
        }
        ts.forEachChild(node, recur);
    });

    function checkCall(node: ts.CallExpression): void {
        if (!shouldIgnoreCalledExpression(node.expression)) {
            for (const arg of node.arguments) {
                checkArg(arg);
            }
        }
    }

    /** Skip certain function/method names whose parameter names are not informative. */
    function shouldIgnoreCalledExpression(expression: ts.Expression): boolean {
        if (expression.kind === ts.SyntaxKind.PropertyAccessExpression) {
            const methodName = (expression as ts.PropertyAccessExpression).name.text;
            if (methodName.startsWith("set") || methodName.startsWith("assert")) {
                return true;
            }
            switch (methodName) {
                case "apply":
                case "call":
                case "equal":
                case "fail":
                case "isTrue":
                case "output":
                case "stringify":
                    return true;
            }
        }
        else if (expression.kind === ts.SyntaxKind.Identifier) {
            const functionName = (expression as ts.Identifier).text;
            if (functionName.startsWith("set") || functionName.startsWith("assert")) {
                return true;
            }
            switch (functionName) {
                case "contains":
                case "createAnonymousType":
                case "createImportSpecifier":
                case "createProperty":
                case "createSignature":
                case "resolveName":
                    return true;
            }
        }
        return false;
    }

    function checkArg(arg: ts.Expression): void {
        if (!isTrivia(arg)) {
            return;
        }

        const ranges = ts.getTrailingCommentRanges(sourceFile.text, arg.pos) || ts.getLeadingCommentRanges(sourceFile.text, arg.pos);
        if (ranges === undefined || ranges.length !== 1 || ranges[0].kind !== ts.SyntaxKind.MultiLineCommentTrivia) {
            ctx.addFailureAtNode(arg, "Tag argument with parameter name");
            return;
        }

        const range = ranges[0];
        const argStart = arg.getStart(sourceFile);
        if (range.end + 1 !== argStart && sourceFile.text.slice(range.end, argStart).indexOf("\n") === -1) {
            ctx.addFailureAtNode(arg, "There should be 1 space between an argument and its comment.");
        }
    }

    function isTrivia(arg: ts.Expression): boolean {
        switch (arg.kind) {
            case ts.SyntaxKind.TrueKeyword:
            case ts.SyntaxKind.FalseKeyword:
            case ts.SyntaxKind.NullKeyword:
                return true;
            case ts.SyntaxKind.Identifier:
                return (arg as ts.Identifier).originalKeywordKind === ts.SyntaxKind.UndefinedKeyword;
            default:
                return false;
        }
    }
}
