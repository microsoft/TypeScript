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
        // Includes the EOF Token so that comments which aren't attached to statements are included
        const statements = [...sourceFile.statements, sourceFile.endOfFileToken];
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

            if (isDeclaration(n) || n.kind === SyntaxKind.EndOfFileToken) {
                addOutliningForLeadingCommentsForNode(n, sourceFile, cancellationToken, out);
            }

            if (isFunctionExpressionAssignedToVariable(n)) {
                addOutliningForLeadingCommentsForNode(n.parent.parent.parent, sourceFile, cancellationToken, out);
            }

            if (isFunctionLike(n) && isBinaryExpression(n.parent) && isPropertyAccessExpression(n.parent.left)) {
                addOutliningForLeadingCommentsForNode(n.parent.left, sourceFile, cancellationToken, out);
            }

            const span = getOutliningSpanForNode(n, sourceFile);
            if (span) out.push(span);

            depthRemaining--;
            if (isCallExpression(n)) {
                depthRemaining++;
                visitNonImportNode(n.expression);
                depthRemaining--;
                n.arguments.forEach(visitNonImportNode);
                n.typeArguments?.forEach(visitNonImportNode);
            }
            else if (isIfStatement(n) && n.elseStatement && isIfStatement(n.elseStatement)) {
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

        function isFunctionExpressionAssignedToVariable(n: Node) {
            if (!isFunctionExpression(n) && !isArrowFunction(n)) {
                return false;
            }
            const ancestor = findAncestor(n, isVariableStatement);
            return !!ancestor && getSingleInitializerOfVariableStatementOrPropertyDeclaration(ancestor) === n;
        }
    }

    function addRegionOutliningSpans(sourceFile: SourceFile, out: Push<OutliningSpan>): void {
        const regions: OutliningSpan[] = [];
        const lineStarts = sourceFile.getLineStarts();
        for (const currentLineStart of lineStarts) {
            const lineEnd = sourceFile.getLineEndOfPosition(currentLineStart);
            const lineText = sourceFile.text.substring(currentLineStart, lineEnd);
            const result = isRegionDelimiter(lineText);
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

    const regionDelimiterRegExp = /^\s*\/\/\s*#(end)?region(?:\s+(.*))?(?:\r)?$/;
    function isRegionDelimiter(lineText: string) {
        return regionDelimiterRegExp.exec(lineText);
    }

    function addOutliningForLeadingCommentsForNode(n: Node, sourceFile: SourceFile, cancellationToken: CancellationToken, out: Push<OutliningSpan>): void {
        const comments = getLeadingCommentRangesOfNode(n, sourceFile);
        if (!comments) return;
        let firstSingleLineCommentStart = -1;
        let lastSingleLineCommentEnd = -1;
        let singleLineCommentCount = 0;
        const sourceText = sourceFile.getFullText();
        for (const { kind, pos, end } of comments) {
            cancellationToken.throwIfCancellationRequested();
            switch (kind) {
                case SyntaxKind.SingleLineCommentTrivia:
                    // never fold region delimiters into single-line comment regions
                    const commentText = sourceText.slice(pos, end);
                    if (isRegionDelimiter(commentText)) {
                        combineAndAddMultipleSingleLineComments();
                        singleLineCommentCount = 0;
                        break;
                    }

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
                if (isFunctionLike(n.parent)) {
                    return functionSpan(n.parent, n as Block, sourceFile);
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
                            const node = findChildOfKind(tryStatement, SyntaxKind.FinallyKeyword, sourceFile);
                            if (node) return spanForNode(node);
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
            case SyntaxKind.ClassExpression:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.CaseBlock:
            case SyntaxKind.TypeLiteral:
            case SyntaxKind.ObjectBindingPattern:
                return spanForNode(n);
            case SyntaxKind.TupleType:
                return spanForNode(n, /*autoCollapse*/ false, /*useFullStart*/ !isTupleTypeNode(n.parent), SyntaxKind.OpenBracketToken);
            case SyntaxKind.CaseClause:
            case SyntaxKind.DefaultClause:
                return spanForNodeArray((n as CaseClause | DefaultClause).statements);
            case SyntaxKind.ObjectLiteralExpression:
                return spanForObjectOrArrayLiteral(n);
            case SyntaxKind.ArrayLiteralExpression:
                return spanForObjectOrArrayLiteral(n, SyntaxKind.OpenBracketToken);
            case SyntaxKind.JsxElement:
                return spanForJSXElement(<JsxElement>n);
            case SyntaxKind.JsxFragment:
                return spanForJSXFragment(<JsxFragment>n);
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxOpeningElement:
                return spanForJSXAttributes((<JsxOpeningLikeElement>n).attributes);
            case SyntaxKind.TemplateExpression:
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return spanForTemplateLiteral(<TemplateExpression | NoSubstitutionTemplateLiteral>n);
            case SyntaxKind.ArrayBindingPattern:
                return spanForNode(n, /*autoCollapse*/ false, /*useFullStart*/ !isBindingElement(n.parent), SyntaxKind.OpenBracketToken);
        }

        function spanForJSXElement(node: JsxElement): OutliningSpan | undefined {
            const textSpan = createTextSpanFromBounds(node.openingElement.getStart(sourceFile), node.closingElement.getEnd());
            const tagName = node.openingElement.tagName.getText(sourceFile);
            const bannerText = "<" + tagName + ">...</" + tagName + ">";
            return createOutliningSpan(textSpan, OutliningSpanKind.Code, textSpan, /*autoCollapse*/ false, bannerText);
        }

        function spanForJSXFragment(node: JsxFragment): OutliningSpan | undefined {
            const textSpan = createTextSpanFromBounds(node.openingFragment.getStart(sourceFile), node.closingFragment.getEnd());
            const bannerText = "<>...</>";
            return createOutliningSpan(textSpan, OutliningSpanKind.Code, textSpan, /*autoCollapse*/ false, bannerText);
        }

        function spanForJSXAttributes(node: JsxAttributes): OutliningSpan | undefined {
            if (node.properties.length === 0) {
                return undefined;
            }

            return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), OutliningSpanKind.Code);
        }

        function spanForTemplateLiteral(node: TemplateExpression | NoSubstitutionTemplateLiteral) {
            if (node.kind === SyntaxKind.NoSubstitutionTemplateLiteral && node.text.length === 0) {
                return undefined;
            }
            return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), OutliningSpanKind.Code);
        }

        function spanForObjectOrArrayLiteral(node: Node, open: SyntaxKind.OpenBraceToken | SyntaxKind.OpenBracketToken = SyntaxKind.OpenBraceToken): OutliningSpan | undefined {
            // If the block has no leading keywords and is inside an array literal or call expression,
            // we only want to collapse the span of the block.
            // Otherwise, the collapsed section will include the end of the previous line.
            return spanForNode(node, /*autoCollapse*/ false, /*useFullStart*/ !isArrayLiteralExpression(node.parent) && !isCallExpression(node.parent), open);
        }

        function spanForNode(hintSpanNode: Node, autoCollapse = false, useFullStart = true, open: SyntaxKind.OpenBraceToken | SyntaxKind.OpenBracketToken = SyntaxKind.OpenBraceToken, close: SyntaxKind = open === SyntaxKind.OpenBraceToken ? SyntaxKind.CloseBraceToken : SyntaxKind.CloseBracketToken): OutliningSpan | undefined {
            const openToken = findChildOfKind(n, open, sourceFile);
            const closeToken = findChildOfKind(n, close, sourceFile);
            return openToken && closeToken && spanBetweenTokens(openToken, closeToken, hintSpanNode, sourceFile, autoCollapse, useFullStart);
        }

        function spanForNodeArray(nodeArray: NodeArray<Node>): OutliningSpan | undefined {
            return nodeArray.length ? createOutliningSpan(createTextSpanFromRange(nodeArray), OutliningSpanKind.Code) : undefined;
        }
    }

    function functionSpan(node: FunctionLike, body: Block, sourceFile: SourceFile): OutliningSpan | undefined {
        const openToken = tryGetFunctionOpenToken(node, body, sourceFile);
        const closeToken = findChildOfKind(body, SyntaxKind.CloseBraceToken, sourceFile);
        return openToken && closeToken && spanBetweenTokens(openToken, closeToken, node, sourceFile, /*autoCollapse*/ node.kind !== SyntaxKind.ArrowFunction);
    }

    function spanBetweenTokens(openToken: Node, closeToken: Node, hintSpanNode: Node, sourceFile: SourceFile, autoCollapse = false, useFullStart = true): OutliningSpan {
        const textSpan = createTextSpanFromBounds(useFullStart ? openToken.getFullStart() : openToken.getStart(sourceFile), closeToken.getEnd());
        return createOutliningSpan(textSpan, OutliningSpanKind.Code, createTextSpanFromNode(hintSpanNode, sourceFile), autoCollapse);
    }

    function createOutliningSpan(textSpan: TextSpan, kind: OutliningSpanKind, hintSpan: TextSpan = textSpan, autoCollapse = false, bannerText = "..."): OutliningSpan {
        return { textSpan, kind, hintSpan, bannerText, autoCollapse };
    }

    function tryGetFunctionOpenToken(node: FunctionLike, body: Block, sourceFile: SourceFile): Node | undefined {
        if (isNodeArrayMultiLine(node.parameters, sourceFile)) {
            const openParenToken = findChildOfKind(node, SyntaxKind.OpenParenToken, sourceFile);
            if (openParenToken) {
                return openParenToken;
            }
        }
        return findChildOfKind(body, SyntaxKind.OpenBraceToken, sourceFile);
    }
}
