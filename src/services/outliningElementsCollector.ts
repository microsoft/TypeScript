/* @internal */
namespace ts.OutliningElementsCollector {
    const collapseText = "...";
    const maxDepth = 20;

    export function collectElements(sourceFile: SourceFile, cancellationToken: CancellationToken): OutliningSpan[] {
        const elements: OutliningSpan[] = [];
        let depth = 0;
        const regions: RegionRange[] = [];
        const regionText = "#region";
        const regionStart = new RegExp("^\\s*//\\s*#region(\\s+.*)?$", "gm");
        const regionEnd = new RegExp("^\\s*//\\s*#endregion(\\s|$)", "gm");

        walk(sourceFile);
        gatherRegions();
        return elements;

        /** If useFullStart is true, then the collapsing span includes leading whitespace, including linebreaks. */
        function addOutliningSpan(hintSpanNode: Node, startElement: Node, endElement: Node, autoCollapse: boolean, useFullStart: boolean) {
            if (hintSpanNode && startElement && endElement) {
                const span: OutliningSpan = {
                    textSpan: createTextSpanFromBounds(useFullStart ? startElement.getFullStart() : startElement.getStart(), endElement.getEnd()),
                    hintSpan: createTextSpanFromNode(hintSpanNode, sourceFile),
                    bannerText: collapseText,
                    autoCollapse,
                };
                elements.push(span);
            }
        }

        function addOutliningSpanComments(commentSpan: CommentRange, autoCollapse: boolean) {
            if (commentSpan) {
                const span: OutliningSpan = {
                    textSpan: createTextSpanFromBounds(commentSpan.pos, commentSpan.end),
                    hintSpan: createTextSpanFromBounds(commentSpan.pos, commentSpan.end),
                    bannerText: collapseText,
                    autoCollapse,
                };
                elements.push(span);
            }
        }

        function addOutliningSpanRegions(regionSpan: RegionRange) {
            if (regionSpan) {
                const span: OutliningSpan = {
                    textSpan: createTextSpanFromBounds(regionSpan.pos, regionSpan.end),
                    hintSpan: createTextSpanFromBounds(regionSpan.pos, regionSpan.end),
                    bannerText: regionSpan.name,
                    autoCollapse: false,
                };
                elements.push(span);
            }
        }

        function addOutliningForLeadingCommentsForNode(n: Node) {
            const comments = ts.getLeadingCommentRangesOfNode(n, sourceFile);

            if (comments) {
                let firstSingleLineCommentStart = -1;
                let lastSingleLineCommentEnd = -1;
                let isFirstSingleLineComment = true;
                let singleLineCommentCount = 0;

                for (const currentComment of comments) {
                    cancellationToken.throwIfCancellationRequested();

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
                const multipleSingleLineComments: CommentRange = {
                    kind: SyntaxKind.SingleLineCommentTrivia,
                    pos: start,
                    end,
                };

                addOutliningSpanComments(multipleSingleLineComments, /*autoCollapse*/ false);
            }
        }

        function autoCollapse(node: Node) {
            return isFunctionBlock(node) && node.parent.kind !== SyntaxKind.ArrowFunction;
        }

        function isRegionStart(start: number, end: number) {
            const comment = sourceFile.text.substring(start, end);
            const result = comment.match(regionStart);

            if (result && result.length > 0) {
                const sections = result[0].split(" ").filter(function (s) { return s !== ""; });

                if (sections[0] === "//") {
                    if (sections.length > 2) {
                        return result[0].substring(result[0].indexOf(sections[2]));
                    }
                    else {
                        return regionText;
                    }
                }
                else {
                    if (sections.length > 1) {
                        return result[0].substring(result[0].indexOf(sections[1]));
                    }
                    else {
                        return regionText;
                    }
                }
            }
            return "";
        }

        function isRegionEnd(start: number, end: number) {
            const comment = sourceFile.text.substring(start, end);
            return comment.match(regionEnd);
        }

        function gatherRegions(): void {
            const lineStarts = sourceFile.getLineStarts();

            for (const currentLineStart of lineStarts) {
                const lineEnd = sourceFile.getLineEndOfPosition(currentLineStart);

                const name = isRegionStart(currentLineStart, lineEnd);
                if (name) {
                    const region: RegionRange = {
                        pos: currentLineStart,
                        end: lineEnd,
                        name,
                    };
                    regions.push(region);
                }
                else if (isRegionEnd(currentLineStart, lineEnd)) {
                    const region = regions.pop();

                    if (region) {
                        region.end = lineEnd;
                        addOutliningSpanRegions(region);
                    }
                }
            }
        }

        function walk(n: Node): void {
            cancellationToken.throwIfCancellationRequested();
            if (depth > maxDepth) {
                return;
            }

            if (isDeclaration(n)) {
                addOutliningForLeadingCommentsForNode(n);
            }

            switch (n.kind) {
                case SyntaxKind.Block:
                    if (!isFunctionBlock(n)) {
                        const parent = n.parent;
                        const openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                        const closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);

                        // Check if the block is standalone, or 'attached' to some parent statement.
                        // If the latter, we want to collapse the block, but consider its hint span
                        // to be the entire span of the parent.
                        if (parent.kind === SyntaxKind.DoStatement ||
                            parent.kind === SyntaxKind.ForInStatement ||
                            parent.kind === SyntaxKind.ForOfStatement ||
                            parent.kind === SyntaxKind.ForStatement ||
                            parent.kind === SyntaxKind.IfStatement ||
                            parent.kind === SyntaxKind.WhileStatement ||
                            parent.kind === SyntaxKind.WithStatement ||
                            parent.kind === SyntaxKind.CatchClause) {

                            addOutliningSpan(parent, openBrace, closeBrace, autoCollapse(n), /*useFullStart*/ true);
                            break;
                        }

                        if (parent.kind === SyntaxKind.TryStatement) {
                            // Could be the try-block, or the finally-block.
                            const tryStatement = <TryStatement>parent;
                            if (tryStatement.tryBlock === n) {
                                addOutliningSpan(parent, openBrace, closeBrace, autoCollapse(n), /*useFullStart*/ true);
                                break;
                            }
                            else if (tryStatement.finallyBlock === n) {
                                const finallyKeyword = findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile);
                                if (finallyKeyword) {
                                    addOutliningSpan(finallyKeyword, openBrace, closeBrace, autoCollapse(n), /*useFullStart*/ true);
                                    break;
                                }
                            }

                            // fall through.
                        }

                        // Block was a standalone block.  In this case we want to only collapse
                        // the span of the block, independent of any parent span.
                        const span = createTextSpanFromNode(n);
                        elements.push({
                            textSpan: span,
                            hintSpan: span,
                            bannerText: collapseText,
                            autoCollapse: autoCollapse(n)
                        });
                        break;
                    }
                    // falls through

                case SyntaxKind.ModuleBlock: {
                    const openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                    const closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);
                    addOutliningSpan(n.parent, openBrace, closeBrace, autoCollapse(n), /*useFullStart*/ true);
                    break;
                }
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.CaseBlock: {
                    const openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                    const closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);
                    addOutliningSpan(n, openBrace, closeBrace, autoCollapse(n), /*useFullStart*/ true);
                    break;
                }
                // If the block has no leading keywords and is inside an array literal,
                // we only want to collapse the span of the block.
                // Otherwise, the collapsed section will include the end of the previous line.
                case SyntaxKind.ObjectLiteralExpression:
                    const openBrace = findChildOfKind(n, SyntaxKind.OpenBraceToken, sourceFile);
                    const closeBrace = findChildOfKind(n, SyntaxKind.CloseBraceToken, sourceFile);
                    addOutliningSpan(n, openBrace, closeBrace, autoCollapse(n), /*useFullStart*/ !isArrayLiteralExpression(n.parent));
                    break;
                case SyntaxKind.ArrayLiteralExpression:
                    const openBracket = findChildOfKind(n, SyntaxKind.OpenBracketToken, sourceFile);
                    const closeBracket = findChildOfKind(n, SyntaxKind.CloseBracketToken, sourceFile);
                    addOutliningSpan(n, openBracket, closeBracket, autoCollapse(n), /*useFullStart*/ !isArrayLiteralExpression(n.parent));
                    break;
            }
            depth++;
            forEachChild(n, walk);
            depth--;
        }
    }
}