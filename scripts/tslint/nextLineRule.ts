import * as Lint from "tslint/lib";
import * as ts from "typescript";

const OPTION_CATCH = "check-catch";
const OPTION_ELSE = "check-else";

export class Rule extends Lint.Rules.AbstractRule {
    public static CATCH_FAILURE_STRING = "'catch' should not be on the same line as the preceeding block's curly brace";
    public static ELSE_FAILURE_STRING = "'else' should not be on the same line as the preceeding block's curly brace";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        const options = this.getOptions().ruleArguments;
        const checkCatch = options.indexOf(OPTION_CATCH) !== -1;
        const checkElse = options.indexOf(OPTION_ELSE) !== -1;
        return this.applyWithFunction(sourceFile, ctx => walk(ctx, checkCatch, checkElse));
    }
}

function walk(ctx: Lint.WalkContext<void>, checkCatch: boolean, checkElse: boolean): void {
    const { sourceFile } = ctx;
    ts.forEachChild(sourceFile, function recur(node) {
        switch (node.kind) {
            case ts.SyntaxKind.IfStatement:
                checkIf(node as ts.IfStatement);
                break;
            case ts.SyntaxKind.TryStatement:
                checkTry(node as ts.TryStatement);
                break;
        }
        ts.forEachChild(node, recur);
    });

    function checkIf(node: ts.IfStatement): void {
        const { thenStatement, elseStatement } = node;
        if (!elseStatement) {
            return;
        }

        // find the else keyword
        const elseKeyword = getFirstChildOfKind(node, ts.SyntaxKind.ElseKeyword);
        if (checkElse && !!elseKeyword) {
            const thenStatementEndLoc = sourceFile.getLineAndCharacterOfPosition(thenStatement.getEnd());
            const elseKeywordLoc = sourceFile.getLineAndCharacterOfPosition(elseKeyword.getStart(sourceFile));
            if (thenStatementEndLoc.line === elseKeywordLoc.line) {
                ctx.addFailureAtNode(elseKeyword, Rule.ELSE_FAILURE_STRING);
            }
        }
    }

    function checkTry({ tryBlock, catchClause }: ts.TryStatement): void {
        if (!checkCatch || !catchClause) {
            return;
        }

        const tryClosingBrace = tryBlock.getLastToken(sourceFile);
        const catchKeyword = catchClause.getFirstToken(sourceFile);
        const tryClosingBraceLoc = sourceFile.getLineAndCharacterOfPosition(tryClosingBrace.getEnd());
        const catchKeywordLoc = sourceFile.getLineAndCharacterOfPosition(catchKeyword.getStart(sourceFile));
        if (tryClosingBraceLoc.line === catchKeywordLoc.line) {
            ctx.addFailureAtNode(catchKeyword, Rule.CATCH_FAILURE_STRING);
        }
    }
}

function getFirstChildOfKind(node: ts.Node, kind: ts.SyntaxKind) {
    return node.getChildren().filter((child) => child.kind === kind)[0];
}
