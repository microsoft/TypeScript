import assert = require("assert");
import * as Lint from "tslint/lib";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithFunction(sourceFile, ctx => walk(ctx));
    }
}

function walk(ctx: Lint.WalkContext<void>): void {
    const { sourceFile } = ctx;
    const { text } = sourceFile;
    forEachComment(sourceFile, (node, { pos, end, kind }) => {
        if (kind !== ts.SyntaxKind.MultiLineCommentTrivia) {
            return;
        }

        const startLine = sourceFile.getLineAndCharacterOfPosition(pos).line;
        const endLine = sourceFile.getLineAndCharacterOfPosition(end).line;
        if (startLine !== endLine) {
            return;
        }

        assert(text[pos] === "/");
        assert(text[pos + 1] === "*");
        assert(text[end - 2] === "*");
        assert(text[end - 1] === "/");
        const trailingWhitespace = text[end - 3] === " ";
        if (inCallExpressionArgument(node)) {
            const leadingWhitespace = text[pos + 2] === " ";
            if (leadingWhitespace) {
                fail(pos + 2, "/*comment*/ should not start with space");
            }
            if (trailingWhitespace) {
                fail(end - 3, "/*comment*/ should not end with space");
            }
        }
        else {
            // TODO: this causes a lot of errors -- we're not consistent about whether statement comments should have spaces.
            /*
            const startPos = text[pos + 2] === "*" ? pos + 3 : pos + 2;
            const leadingWhitespace = text[startPos] === " ";
            if (!leadingWhitespace) {
                fail(startPos, "/* comment * / should start with space");
            }
            if (!trailingWhitespace) {
                fail(end - 3, "/* comment * / should end in space");
            }
            */
        }
    });

    function fail(pos: number, reason: string): void {
        ctx.addFailure(pos, pos + 1, reason);
    }
}

function inCallExpressionArgument(node: ts.Node): boolean {
    const { parent } = node;
    if (!parent) {
        return false;
    }

    switch (parent.kind) {
        case ts.SyntaxKind.CallExpression:
            return (parent as ts.CallExpression).expression !== node;
        case ts.SyntaxKind.Block:
        case ts.SyntaxKind.ModuleBlock:
        case ts.SyntaxKind.CaseBlock:
            return false;
        default:
            return inCallExpressionArgument(parent);
    }
}

function forEachComment(sourceFile: ts.SourceFile, cb: (node: ts.Node, comment: ts.CommentRange) => void): void {
    const { text } = sourceFile;
    sourceFile.forEachChild(function recur(node) {
        const leading = ts.getLeadingCommentRanges(text, node.pos);
        if (leading) {
            for (const range of leading) {
                cb(node, range);
            }
        }
        const trailing = ts.getTrailingCommentRanges(text, node.pos);
        if (trailing) {
            for (const range of trailing) {
                cb(node, range);
            }
        }
        node.forEachChild(recur);
    });
}




