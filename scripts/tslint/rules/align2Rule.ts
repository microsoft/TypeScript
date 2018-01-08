// Based on https://github.com/palantir/tslint/blob/master/src/rules/alignRule.ts
// Has code to count a comment at the beginning of a line as the start of that line

import * as ts from "typescript";

import * as Lint from "tslint";

export class Rule extends Lint.Rules.AbstractRule {
    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new AlignWalker(sourceFile, this.ruleName, undefined));
    }
}

class AlignWalker extends Lint.AbstractWalker<void> {
    public walk(sourceFile: ts.SourceFile) {
        const cb = (node: ts.Node): void => {
            switch (node.kind) {
                case ts.SyntaxKind.SourceFile:
                case ts.SyntaxKind.ModuleBlock:
                case ts.SyntaxKind.Block:
                case ts.SyntaxKind.CaseClause:
                case ts.SyntaxKind.DefaultClause:
                    this.checkAlignment((node as ts.SourceFile | ts.ModuleBlock | ts.Block | ts.CaseClause | ts.DefaultClause).statements.filter((s) => s.kind !== ts.SyntaxKind.EmptyStatement));
                    break;
                case ts.SyntaxKind.ArrayLiteralExpression:
                case ts.SyntaxKind.ArrayBindingPattern:
                    this.checkAlignment((node as ts.ArrayBindingOrAssignmentPattern).elements);
                    break;
                case ts.SyntaxKind.TupleType:
                    this.checkAlignment((node as ts.TupleTypeNode).elementTypes);
                    break;
                case ts.SyntaxKind.ObjectLiteralExpression:
                    this.checkAlignment((node as ts.ObjectLiteralExpression).properties);
                    break;
                case ts.SyntaxKind.ObjectBindingPattern:
                    this.checkAlignment((node as ts.ObjectBindingPattern).elements);
                    break;
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.ClassExpression:
                    this.checkAlignment((node as ts.ClassLikeDeclaration).members.filter((m) => m.kind !== ts.SyntaxKind.SemicolonClassElement));
                    break;
                case ts.SyntaxKind.InterfaceDeclaration:
                case ts.SyntaxKind.TypeLiteral:
                    this.checkAlignment((node as ts.InterfaceDeclaration | ts.TypeLiteralNode).members);
            }
            return ts.forEachChild(node, cb);
        };
        return cb(sourceFile);
    }

    private checkAlignment(nodes: ReadonlyArray<ts.Node>) {
        if (nodes.length <= 1) {
            return;
        }
        const sourceFile = this.sourceFile;

        let pos = this.getStart(nodes[0]).lineAndChar;
        const alignToColumn = pos.character;
        let line = pos.line;

        // skip first node in list
        for (let i = 1; i < nodes.length; ++i) {
            const node = nodes[i];
            const { pos: start, lineAndChar } = this.getStart(node);
            pos = lineAndChar;
            if (line !== pos.line && pos.character !== alignToColumn) {
                const diff = alignToColumn - pos.character;
                let fix: Lint.Fix | undefined;
                if (diff >= 0) {
                    fix = Lint.Replacement.appendText(start, " ".repeat(diff));
                }
                else if (node.pos <= start + diff && /^\s+$/.test(sourceFile.text.substring(start + diff, start))) {
                    // only delete text if there is only whitespace
                    fix = Lint.Replacement.deleteText(start + diff, -diff);
                }
                this.addFailure(start, Math.max(node.end, start), "Lines are not aligned.", fix);
            }
            line = pos.line;
        }
    }

    private getStart(node: ts.Node): { pos: number, lineAndChar: ts.LineAndCharacter } {
        const start = node.getStart(this.sourceFile);
        const lineAndChar = ts.getLineAndCharacterOfPosition(this.sourceFile, start);
        const ranges = ts.getLeadingCommentRanges(this.sourceFile.text, node.pos);
        if (ranges) {
            const last = ranges[ranges.length - 1];
            if (last.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                const commentLc = ts.getLineAndCharacterOfPosition(this.sourceFile, last.pos);
                if (commentLc.line === lineAndChar.line) {
                    return { pos: last.pos, lineAndChar: commentLc };
                }
            }
        }
        return { pos: start, lineAndChar };
    }
}
