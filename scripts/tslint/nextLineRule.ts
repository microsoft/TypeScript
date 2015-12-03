import * as Lint from "tslint/lib/lint";
import * as ts from "typescript";

const OPTION_CATCH = "check-catch";
const OPTION_ELSE = "check-else";

export class Rule extends Lint.Rules.AbstractRule {
    public static CATCH_FAILURE_STRING = "'catch' should not be on the same line as the preceeding block's curly brace";
    public static ELSE_FAILURE_STRING = "'else' should not be on the same line as the preceeding block's curly brace";

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
                const elseKeywordLoc = sourceFile.getLineAndCharacterOfPosition(elseKeyword.getStart(sourceFile));
                if (thenStatementEndLoc.line === elseKeywordLoc.line) {
                    const failure = this.createFailure(elseKeyword.getStart(sourceFile), elseKeyword.getWidth(sourceFile), Rule.ELSE_FAILURE_STRING);
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
        const tryBlock = node.tryBlock;

        if (this.hasOption(OPTION_CATCH) && !!catchClause) {
            const tryClosingBrace = tryBlock.getLastToken(sourceFile);
            const catchKeyword = catchClause.getFirstToken(sourceFile);
            const tryClosingBraceLoc = sourceFile.getLineAndCharacterOfPosition(tryClosingBrace.getEnd());
            const catchKeywordLoc = sourceFile.getLineAndCharacterOfPosition(catchKeyword.getStart(sourceFile));
            if (tryClosingBraceLoc.line === catchKeywordLoc.line) {
                const failure = this.createFailure(catchKeyword.getStart(sourceFile), catchKeyword.getWidth(sourceFile), Rule.CATCH_FAILURE_STRING);
                this.addFailure(failure);
            }
        }
        super.visitTryStatement(node);
    }
}

function getFirstChildOfKind(node: ts.Node, kind: ts.SyntaxKind) {
    return node.getChildren().filter((child) => child.kind === kind)[0];
}
