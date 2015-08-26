/// <reference path="../../lib/typescriptServices.d.ts" />
/// <reference path="../../node_modules/tslint/lib/tslint.d.ts" />

const OPTION_CATCH = "check-catch";
const OPTION_ELSE = "check-else";

export class Rule extends Lint.Rules.AbstractRule {
    public static CATCH_FAILURE_STRING = "'catch' should be on the line following the previous block's ending curly brace";
    public static ELSE_FAILURE_STRING = "'else' should be on the line following the previous block's ending curly brace";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NextLineWalker(sourceFile, this.getOptions()));
    }
}

class NextLineWalker extends Lint.RuleWalker {
    public visitIfStatement(node: ts.IfStatement) {
        const sourceFile = node.getSourceFile();
        const thenStatement = node.thenStatement;

        const elseStatement = node.elseStatement;
        if (!!elseStatement) {
            // find the else keyword
            const elseKeyword = getFirstChildOfKind(node, ts.SyntaxKind.ElseKeyword);
            if (this.hasOption(OPTION_ELSE) && !!elseKeyword) {
                const thenStatementEndLoc = sourceFile.getLineAndCharacterOfPosition(thenStatement.getEnd());
                const elseKeywordLoc = sourceFile.getLineAndCharacterOfPosition(elseKeyword.getStart());
                if (thenStatementEndLoc.line !== (elseKeywordLoc.line - 1)) {
                    const failure = this.createFailure(elseKeyword.getStart(), elseKeyword.getWidth(), Rule.ELSE_FAILURE_STRING);
                    this.addFailure(failure);
                }
            }
        }

        super.visitIfStatement(node);
    }

    public visitTryStatement(node: ts.TryStatement) {
        const sourceFile = node.getSourceFile();
        const catchClause = node.catchClause;

        // "visit" try block
        const tryKeyword = node.getChildAt(0);
        const tryBlock = node.tryBlock;
        const tryOpeningBrace = tryBlock.getChildAt(0);

        if (this.hasOption(OPTION_CATCH) && !!catchClause) {
            const tryClosingBrace = node.tryBlock.getChildAt(node.tryBlock.getChildCount() - 1);
            const catchKeyword = catchClause.getChildAt(0);
            const tryClosingBraceLoc = sourceFile.getLineAndCharacterOfPosition(tryClosingBrace.getEnd());
            const catchKeywordLoc = sourceFile.getLineAndCharacterOfPosition(catchKeyword.getStart());
            if (tryClosingBraceLoc.line !== (catchKeywordLoc.line - 1)) {
                const failure = this.createFailure(catchKeyword.getStart(), catchKeyword.getWidth(), Rule.CATCH_FAILURE_STRING);
                this.addFailure(failure);
            }
        }
        super.visitTryStatement(node);
    }
}

function getFirstChildOfKind(node: ts.Node, kind: ts.SyntaxKind) {
    return node.getChildren().filter((child) => child.kind === kind)[0];
}