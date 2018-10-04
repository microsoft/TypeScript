import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, ctx => walk(ctx));
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    ts.forEachChild(ctx.sourceFile, function recur(node) {
        if (ts.isCallExpression(node)) {
            checkCall(node);
        }
        ts.forEachChild(node, recur);
    });

    function checkCall(node: ts.CallExpression) {
        if (!isDebugAssert(node.expression) || node.arguments.length < 2) {
            return;
        }

        const message = node.arguments[1];
        if (!ts.isStringLiteral(message)) {
            ctx.addFailureAtNode(message, "Second argument to 'Debug.assert' should be a string literal.");
        }

        if (node.arguments.length < 3) {
            return;
        }

        const message2 = node.arguments[2];
        if (!ts.isStringLiteral(message2) && !ts.isArrowFunction(message2)) {
            ctx.addFailureAtNode(message, "Third argument to 'Debug.assert' should be a string literal or arrow function.");
        }
    }

    function isDebugAssert(expr: ts.Node): boolean {
        return ts.isPropertyAccessExpression(expr) && isName(expr.expression, "Debug") && isName(expr.name, "assert");
    }

    function isName(expr: ts.Node, text: string): boolean {
        return ts.isIdentifier(expr) && expr.text === text;
    }
}
