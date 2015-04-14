/* @internal */
module ts {
    export module OutliningElementsCollector {
        export function collectElements(sourceFile: SourceFile): OutliningSpan[] {
            let elements: OutliningSpan[] = [];
            let collapseText = "...";

            function addOutliningSpan(hintSpanNode: Node, startElement: Node, endElement: Node, autoCollapse: boolean) {
                if (hintSpanNode && startElement && endElement) {
                    let span: OutliningSpan = {
                        textSpan: createTextSpanFromBounds(startElement.pos, endElement.end),
                        hintSpan: createTextSpanFromBounds(hintSpanNode.getStart(), hintSpanNode.end),
                        bannerText: collapseText,
                        autoCollapse: autoCollapse
                    };
                    elements.push(span);
                }
            }

            function addOutliningSpanComments(commentSpan: CommentRange, autoCollapse: boolean) {
                if (commentSpan) {
                    let span: OutliningSpan = {
                        textSpan: createTextSpanFromBounds(commentSpan.pos, commentSpan.end),
                        hintSpan: createTextSpanFromBounds(commentSpan.pos, commentSpan.end),
                        bannerText: collapseText,
                        autoCollapse: autoCollapse
                    };
                    elements.push(span);
                }
            }

            function addOutliningForLeadingCommentsForNode(n: Node) {
                let comments = ts.getLeadingCommentRangesOfNode(n, sourceFile);

                if (comments) {
                    let firstSingleLineCommentStart = -1;
                    let lastSingleLineCommentEnd = -1;
                    let isFirstSingleLineComment = true;
                    let singleLineCommentCount = 0;

                    for (let currentComment of comments) {

                        // For single line comments, combine consecutive ones (2 or more) into
                        // a single span from the start of the first till the end of the last
                        if (currentComment.kind === SyntaxKind.SingleLineCommentTrivia) {
                            if (isFirstSingleLineComment) {
                                firstSingleLineCommentStart = currentComment.pos;
                            }
                            isFirstSingleLineComment = false;
                            lastSingleLineCommentEnd = currentComment.end;
                            singleLineCommentCount++;
                        }
                        else if (currentComment.kind === SyntaxKind.MultiLineCommentTrivia) {
                            combineAndAddMultipleSingleLineComments(singleLineCommentCount, firstSingleLineCommentStart, lastSingleLineCommentEnd);
                            addOutliningSpanComments(currentComment, /*autoCollapse*/ false);

                            singleLineCommentCount = 0;
                            lastSingleLineCommentEnd = -1;
                            isFirstSingleLineComment = true;
                        }
                    }

                    combineAndAddMultipleSingleLineComments(singleLineCommentCount, firstSingleLineCommentStart, lastSingleLineCommentEnd);
                }
            }

            function combineAndAddMultipleSingleLineComments(count: number, start: number, end: number) {                
                // Only outline spans of two or more consecutive single line comments
                if (count > 1) {
                    let multipleSingleLineComments = {
                        pos: start,
                        end: end,
                        kind: SyntaxKind.SingleLineCommentTrivia
                    }

                    addOutliningSpanComments(multipleSingleLineComments, /*autoCollapse*/ false);
                }
            }

            function autoCollapse(node: Node) {
                return isFunctionBlock(node) && node.parent.kind !== SyntaxKind.ArrowFunction;
            }

            let depth = 0;
            let maxDepth = 20;
            function walk(n: Node): void {
                if (depth > maxDepth) {
                    return;
                }

                if (isDeclaration(n)) {
                    addOutliningForLeadingCommentsForNode(n);
                }

                switch (n.kind) {
                    case SyntaxKind.Block:
                        if (!isFunctionBlock(n)) {
                            let parent = n.parent;
                            let openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                            let closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);

                            // Check if the block is standalone, or 'attached' to some parent statement.
                            // If the latter, we want to collaps the block, but consider its hint span
                            // to be the entire span of the parent.
                            if (parent.kind === SyntaxKind.DoStatement ||
                                parent.kind === SyntaxKind.ForInStatement ||
                                parent.kind === SyntaxKind.ForOfStatement ||
                                parent.kind === SyntaxKind.ForStatement ||
                                parent.kind === SyntaxKind.IfStatement ||
                                parent.kind === SyntaxKind.WhileStatement ||
                                parent.kind === SyntaxKind.WithStatement ||
                                parent.kind === SyntaxKind.CatchClause) {

                                addOutliningSpan(parent, openBrace, closeBrace, autoCollapse(n));
                                break;
                            }

                            if (parent.kind === SyntaxKind.TryStatement) {
                                // Could be the try-block, or the finally-block.
                                let tryStatement = <TryStatement>parent;
                                if (tryStatement.tryBlock === n) {
                                    addOutliningSpan(parent, openBrace, closeBrace, autoCollapse(n));
                                    break;
                                }
                                else if (tryStatement.finallyBlock === n) {
                                    let finallyKeyword = findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile);
                                    if (finallyKeyword) {
                                        addOutliningSpan(finallyKeyword, openBrace, closeBrace, autoCollapse(n));
                                        break;
                                    }
                                }

                                // fall through.
                            }

                            // Block was a standalone block.  In this case we want to only collapse
                            // the span of the block, independent of any parent span.
                            let span = createTextSpanFromBounds(n.getStart(), n.end);
                            elements.push({
                                textSpan: span,
                                hintSpan: span,
                                bannerText: collapseText,
                                autoCollapse: autoCollapse(n)
                            });
                            break;
                        }
                    // Fallthrough.

                    case SyntaxKind.ModuleBlock: {
                        let openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                        let closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);
                        addOutliningSpan(n.parent, openBrace, closeBrace, autoCollapse(n));
                        break;
                    }
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ObjectLiteralExpression:
                    case SyntaxKind.CaseBlock: {
                        let openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                        let closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);
                        addOutliningSpan(n, openBrace, closeBrace, autoCollapse(n));
                        break;
                    }
                    case SyntaxKind.ArrayLiteralExpression:
                        let openBracket = findChildOfKind(n, SyntaxKind.OpenBracketToken, sourceFile);
                        let closeBracket = findChildOfKind(n, SyntaxKind.CloseBracketToken, sourceFile);
                        addOutliningSpan(n, openBracket, closeBracket, autoCollapse(n));
                        break;
                }
                depth++;
                forEachChild(n, walk);
                depth--;
            }

            walk(sourceFile);
            return elements;
        }
    }
}