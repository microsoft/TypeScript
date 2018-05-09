/* @internal */
namespace ts.OutliningElementsCollector {
    export function collectElements(sourceFile: SourceFile, cancellationToken: CancellationToken): OutliningSpan[] {
        const res: OutliningSpan[] = [];
        addNodeOutliningSpans(sourceFile, cancellationToken, res);
        addRegionOutliningSpans(sourceFile, res);
        return res.sort((span1, span2) => span1.textSpan.start - span2.textSpan.start);
    }

    function addNodeOutliningSpans(sourceFile: SourceFile, cancellationToken: CancellationToken, out: Push<OutliningSpan>): void {
        let depthRemaining = 40;
        let current = 0;
        const statements = sourceFile.statements;
        const n = statements.length;
        while (current < n) {
            while (current < n && !isAnyImportSyntax(statements[current])) {
                visitNonImportNode(statements[current]);
                current++;
            }
            if (current === n) break;
            const firstImport = current;
            while (current < n && isAnyImportSyntax(statements[current])) {
                addOutliningForLeadingCommentsForNode(statements[current], sourceFile, cancellationToken, out);
                current++;
            }
            const lastImport = current - 1;
            if (lastImport !== firstImport) {
                out.push(createOutliningSpanFromBounds(findChildOfKind(statements[firstImport], SyntaxKind.ImportKeyword, sourceFile)!.getStart(sourceFile), statements[lastImport].getEnd(), OutliningSpanKind.Imports));
            }
        }

        function visitNonImportNode(n: Node) {
            if (depthRemaining === 0) return;
            cancellationToken.throwIfCancellationRequested();

            if (isDeclaration(n)) {
                addOutliningForLeadingCommentsForNode(n, sourceFile, cancellationToken, out);
            }

            const span = getOutliningSpanForNode(n, sourceFile);
            if (span) out.push(span);

            depthRemaining--;
            if (isIfStatement(n) && n.elseStatement && isIfStatement(n.elseStatement)) {
                // Consider an 'else if' to be on the same depth as the 'if'.
                visitNonImportNode(n.expression);
                visitNonImportNode(n.thenStatement);
                depthRemaining++;
                visitNonImportNode(n.elseStatement);
                depthRemaining--;
            }
            else {
                n.forEachChild(visitNonImportNode);
            }
            depthRemaining++;
        }
    }

    function addRegionOutliningSpans(sourceFile: SourceFile, out: Push<OutliningSpan>): void {
        const regions: OutliningSpan[] = [];
        const lineStarts = sourceFile.getLineStarts();
        for (let i = 0; i < lineStarts.length; i++) {
            const currentLineStart = lineStarts[i];
            const lineEnd = i + 1 === lineStarts.length ? sourceFile.getEnd() : lineStarts[i + 1] - 1;
            const lineText = sourceFile.text.substring(currentLineStart, lineEnd);
            const result = lineText.match(/^\s*\/\/\s*#(end)?region(?:\s+(.*))?(?:\r)?$/);
            if (!result || isInComment(sourceFile, currentLineStart)) {
                continue;
            }

            if (!result[1]) {
                const span = createTextSpanFromBounds(sourceFile.text.indexOf("//", currentLineStart), lineEnd);
                regions.push(createOutliningSpan(span, OutliningSpanKind.Region, span, /*autoCollapse*/ false, result[2] || "#region"));
            }
            else {
                const region = regions.pop();
                if (region) {
                    region.textSpan.length = lineEnd - region.textSpan.start;
                    region.hintSpan.length = lineEnd - region.textSpan.start;
                    out.push(region);
                }
            }
        }
    }

    function addOutliningForLeadingCommentsForNode(n: Node, sourceFile: SourceFile, cancellationToken: CancellationToken, out: Push<OutliningSpan>): void {
        const comments = getLeadingCommentRangesOfNode(n, sourceFile);
        if (!comments) return;
        let firstSingleLineCommentStart = -1;
        let lastSingleLineCommentEnd = -1;
        let singleLineCommentCount = 0;
        for (const { kind, pos, end } of comments) {
            cancellationToken.throwIfCancellationRequested();
            switch (kind) {
                case SyntaxKind.SingleLineCommentTrivia:
                    // For single line comments, combine consecutive ones (2 or more) into
                    // a single span from the start of the first till the end of the last
                    if (singleLineCommentCount === 0) {
                        firstSingleLineCommentStart = pos;
                    }
                    lastSingleLineCommentEnd = end;
                    singleLineCommentCount++;
                    break;
                case SyntaxKind.MultiLineCommentTrivia:
                    combineAndAddMultipleSingleLineComments();
                    out.push(createOutliningSpanFromBounds(pos, end, OutliningSpanKind.Comment));
                    singleLineCommentCount = 0;
                    break;
                default:
                    Debug.assertNever(kind);
            }
        }
        combineAndAddMultipleSingleLineComments();

        function combineAndAddMultipleSingleLineComments(): void {
            // Only outline spans of two or more consecutive single line comments
            if (singleLineCommentCount > 1) {
                out.push(createOutliningSpanFromBounds(firstSingleLineCommentStart, lastSingleLineCommentEnd, OutliningSpanKind.Comment));
            }
        }
    }

    function createOutliningSpanFromBounds(pos: number, end: number, kind: OutliningSpanKind): OutliningSpan {
        return createOutliningSpan(createTextSpanFromBounds(pos, end), kind);
    }

    function getOutliningSpanForNode(n: Node, sourceFile: SourceFile): OutliningSpan | undefined {
        switch (n.kind) {
            case SyntaxKind.Block:
                if (isFunctionBlock(n)) {
                    return spanForNode(n.parent, /*autoCollapse*/ n.parent.kind !== SyntaxKind.ArrowFunction);
                }
                // Check if the block is standalone, or 'attached' to some parent statement.
                // If the latter, we want to collapse the block, but consider its hint span
                // to be the entire span of the parent.
                switch (n.parent.kind) {
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.ForInStatement:
                    case SyntaxKind.ForOfStatement:
                    case SyntaxKind.ForStatement:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.WithStatement:
                    case SyntaxKind.CatchClause:
                        return spanForNode(n.parent);
                    case SyntaxKind.TryStatement:
                        // Could be the try-block, or the finally-block.
                        const tryStatement = <TryStatement>n.parent;
                        if (tryStatement.tryBlock === n) {
                            return spanForNode(n.parent);
                        }
                        else if (tryStatement.finallyBlock === n) {
                            return spanForNode(findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile)!);
                        }
                        // falls through
                    default:
                        // Block was a standalone block.  In this case we want to only collapse
                        // the span of the block, independent of any parent span.
                        return createOutliningSpan(createTextSpanFromNode(n, sourceFile), OutliningSpanKind.Code);
                }
            case SyntaxKind.ModuleBlock:
                return spanForNode(n.parent);
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.CaseBlock:
                return spanForNode(n);
            case SyntaxKind.ObjectLiteralExpression:
                return spanForObjectOrArrayLiteral(n);
            case SyntaxKind.ArrayLiteralExpression:
                return spanForObjectOrArrayLiteral(n, SyntaxKind.OpenBracketToken);
        }

        function spanForObjectOrArrayLiteral(node: Node, open: SyntaxKind.OpenBraceToken | SyntaxKind.OpenBracketToken = SyntaxKind.OpenBraceToken): OutliningSpan | undefined {
            // If the block has no leading keywords and is inside an array literal,
            // we only want to collapse the span of the block.
            // Otherwise, the collapsed section will include the end of the previous line.
            return spanForNode(node, /*autoCollapse*/ false, /*useFullStart*/ !isArrayLiteralExpression(node.parent), open);
        }

        function spanForNode(hintSpanNode: Node, autoCollapse = false, useFullStart = true, open: SyntaxKind.OpenBraceToken | SyntaxKind.OpenBracketToken = SyntaxKind.OpenBraceToken): OutliningSpan | undefined {
            const openToken = findChildOfKind(n, open, sourceFile);
            const close = open === SyntaxKind.OpenBraceToken ? SyntaxKind.CloseBraceToken : SyntaxKind.CloseBracketToken;
            const closeToken = findChildOfKind(n, close, sourceFile);
            if (!openToken || !closeToken) {
                return undefined;
            }
            const textSpan = createTextSpanFromBounds(useFullStart ? openToken.getFullStart() : openToken.getStart(sourceFile), closeToken.getEnd());
            return createOutliningSpan(textSpan, OutliningSpanKind.Code, createTextSpanFromNode(hintSpanNode, sourceFile), autoCollapse);
        }
    }

    function createOutliningSpan(textSpan: TextSpan, kind: OutliningSpanKind, hintSpan: TextSpan = textSpan, autoCollapse = false, bannerText = "..."): OutliningSpan {
        return { textSpan, kind, hintSpan, bannerText, autoCollapse };
    }
}
