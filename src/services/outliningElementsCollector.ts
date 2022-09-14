import * as ts from "./_namespaces/ts";

/** @internal */
export function collectElements(sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken): ts.OutliningSpan[] {
    const res: ts.OutliningSpan[] = [];
    addNodeOutliningSpans(sourceFile, cancellationToken, res);
    addRegionOutliningSpans(sourceFile, res);
    return res.sort((span1, span2) => span1.textSpan.start - span2.textSpan.start);
}

function addNodeOutliningSpans(sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken, out: ts.Push<ts.OutliningSpan>): void {
    let depthRemaining = 40;
    let current = 0;
    // Includes the EOF Token so that comments which aren't attached to statements are included
    const statements = [...sourceFile.statements, sourceFile.endOfFileToken];
    const n = statements.length;
    while (current < n) {
        while (current < n && !ts.isAnyImportSyntax(statements[current])) {
            visitNonImportNode(statements[current]);
            current++;
        }
        if (current === n) break;
        const firstImport = current;
        while (current < n && ts.isAnyImportSyntax(statements[current])) {
            addOutliningForLeadingCommentsForNode(statements[current], sourceFile, cancellationToken, out);
            current++;
        }
        const lastImport = current - 1;
        if (lastImport !== firstImport) {
            out.push(createOutliningSpanFromBounds(ts.findChildOfKind(statements[firstImport], ts.SyntaxKind.ImportKeyword, sourceFile)!.getStart(sourceFile), statements[lastImport].getEnd(), ts.OutliningSpanKind.Imports));
        }
    }

    function visitNonImportNode(n: ts.Node) {
        if (depthRemaining === 0) return;
        cancellationToken.throwIfCancellationRequested();

        if (ts.isDeclaration(n) || ts.isVariableStatement(n) || ts.isReturnStatement(n) || ts.isCallOrNewExpression(n) || n.kind === ts.SyntaxKind.EndOfFileToken) {
            addOutliningForLeadingCommentsForNode(n, sourceFile, cancellationToken, out);
        }

        if (ts.isFunctionLike(n) && ts.isBinaryExpression(n.parent) && ts.isPropertyAccessExpression(n.parent.left)) {
            addOutliningForLeadingCommentsForNode(n.parent.left, sourceFile, cancellationToken, out);
        }

        if (ts.isBlock(n) || ts.isModuleBlock(n)) {
            addOutliningForLeadingCommentsForPos(n.statements.end, sourceFile, cancellationToken, out);
        }

        if (ts.isClassLike(n) || ts.isInterfaceDeclaration(n)) {
            addOutliningForLeadingCommentsForPos(n.members.end, sourceFile, cancellationToken, out);
        }

        const span = getOutliningSpanForNode(n, sourceFile);
        if (span) out.push(span);

        depthRemaining--;
        if (ts.isCallExpression(n)) {
            depthRemaining++;
            visitNonImportNode(n.expression);
            depthRemaining--;
            n.arguments.forEach(visitNonImportNode);
            n.typeArguments?.forEach(visitNonImportNode);
        }
        else if (ts.isIfStatement(n) && n.elseStatement && ts.isIfStatement(n.elseStatement)) {
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

function addRegionOutliningSpans(sourceFile: ts.SourceFile, out: ts.Push<ts.OutliningSpan>): void {
    const regions: ts.OutliningSpan[] = [];
    const lineStarts = sourceFile.getLineStarts();
    for (const currentLineStart of lineStarts) {
        const lineEnd = sourceFile.getLineEndOfPosition(currentLineStart);
        const lineText = sourceFile.text.substring(currentLineStart, lineEnd);
        const result = isRegionDelimiter(lineText);
        if (!result || ts.isInComment(sourceFile, currentLineStart)) {
            continue;
        }

        if (!result[1]) {
            const span = ts.createTextSpanFromBounds(sourceFile.text.indexOf("//", currentLineStart), lineEnd);
            regions.push(createOutliningSpan(span, ts.OutliningSpanKind.Region, span, /*autoCollapse*/ false, result[2] || "#region"));
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

const regionDelimiterRegExp = /^#(end)?region(?:\s+(.*))?(?:\r)?$/;
function isRegionDelimiter(lineText: string) {
    // We trim the leading whitespace and // without the regex since the
    // multiple potential whitespace matches can make for some gnarly backtracking behavior
    lineText = ts.trimStringStart(lineText);
    if (!ts.startsWith(lineText, "\/\/")) {
        return null; // eslint-disable-line no-null/no-null
    }
    lineText = ts.trimString(lineText.slice(2));
    return regionDelimiterRegExp.exec(lineText);
}

function addOutliningForLeadingCommentsForPos(pos: number, sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken, out: ts.Push<ts.OutliningSpan>): void {
    const comments = ts.getLeadingCommentRanges(sourceFile.text, pos);
    if (!comments) return;

    let firstSingleLineCommentStart = -1;
    let lastSingleLineCommentEnd = -1;
    let singleLineCommentCount = 0;
    const sourceText = sourceFile.getFullText();
    for (const { kind, pos, end } of comments) {
        cancellationToken.throwIfCancellationRequested();
        switch (kind) {
            case ts.SyntaxKind.SingleLineCommentTrivia:
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
            case ts.SyntaxKind.MultiLineCommentTrivia:
                combineAndAddMultipleSingleLineComments();
                out.push(createOutliningSpanFromBounds(pos, end, ts.OutliningSpanKind.Comment));
                singleLineCommentCount = 0;
                break;
            default:
                ts.Debug.assertNever(kind);
        }
    }
    combineAndAddMultipleSingleLineComments();

    function combineAndAddMultipleSingleLineComments(): void {
        // Only outline spans of two or more consecutive single line comments
        if (singleLineCommentCount > 1) {
            out.push(createOutliningSpanFromBounds(firstSingleLineCommentStart, lastSingleLineCommentEnd, ts.OutliningSpanKind.Comment));
        }
    }
}

function addOutliningForLeadingCommentsForNode(n: ts.Node, sourceFile: ts.SourceFile, cancellationToken: ts.CancellationToken, out: ts.Push<ts.OutliningSpan>): void {
    if (ts.isJsxText(n)) return;
    addOutliningForLeadingCommentsForPos(n.pos, sourceFile, cancellationToken, out);
}

function createOutliningSpanFromBounds(pos: number, end: number, kind: ts.OutliningSpanKind): ts.OutliningSpan {
    return createOutliningSpan(ts.createTextSpanFromBounds(pos, end), kind);
}

function getOutliningSpanForNode(n: ts.Node, sourceFile: ts.SourceFile): ts.OutliningSpan | undefined {
    switch (n.kind) {
        case ts.SyntaxKind.Block:
            if (ts.isFunctionLike(n.parent)) {
                return functionSpan(n.parent, n as ts.Block, sourceFile);
            }
            // Check if the block is standalone, or 'attached' to some parent statement.
            // If the latter, we want to collapse the block, but consider its hint span
            // to be the entire span of the parent.
            switch (n.parent.kind) {
                case ts.SyntaxKind.DoStatement:
                case ts.SyntaxKind.ForInStatement:
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.ForStatement:
                case ts.SyntaxKind.IfStatement:
                case ts.SyntaxKind.WhileStatement:
                case ts.SyntaxKind.WithStatement:
                case ts.SyntaxKind.CatchClause:
                    return spanForNode(n.parent);
                case ts.SyntaxKind.TryStatement:
                    // Could be the try-block, or the finally-block.
                    const tryStatement = n.parent as ts.TryStatement;
                    if (tryStatement.tryBlock === n) {
                        return spanForNode(n.parent);
                    }
                    else if (tryStatement.finallyBlock === n) {
                        const node = ts.findChildOfKind(tryStatement, ts.SyntaxKind.FinallyKeyword, sourceFile);
                        if (node) return spanForNode(node);
                    }
                    // falls through
                default:
                    // Block was a standalone block.  In this case we want to only collapse
                    // the span of the block, independent of any parent span.
                    return createOutliningSpan(ts.createTextSpanFromNode(n, sourceFile), ts.OutliningSpanKind.Code);
            }
        case ts.SyntaxKind.ModuleBlock:
            return spanForNode(n.parent);
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.ClassExpression:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.CaseBlock:
        case ts.SyntaxKind.TypeLiteral:
        case ts.SyntaxKind.ObjectBindingPattern:
            return spanForNode(n);
        case ts.SyntaxKind.TupleType:
            return spanForNode(n, /*autoCollapse*/ false, /*useFullStart*/ !ts.isTupleTypeNode(n.parent), ts.SyntaxKind.OpenBracketToken);
        case ts.SyntaxKind.CaseClause:
        case ts.SyntaxKind.DefaultClause:
            return spanForNodeArray((n as ts.CaseClause | ts.DefaultClause).statements);
        case ts.SyntaxKind.ObjectLiteralExpression:
            return spanForObjectOrArrayLiteral(n);
        case ts.SyntaxKind.ArrayLiteralExpression:
            return spanForObjectOrArrayLiteral(n, ts.SyntaxKind.OpenBracketToken);
        case ts.SyntaxKind.JsxElement:
            return spanForJSXElement(n as ts.JsxElement);
        case ts.SyntaxKind.JsxFragment:
            return spanForJSXFragment(n as ts.JsxFragment);
        case ts.SyntaxKind.JsxSelfClosingElement:
        case ts.SyntaxKind.JsxOpeningElement:
            return spanForJSXAttributes((n as ts.JsxOpeningLikeElement).attributes);
        case ts.SyntaxKind.TemplateExpression:
        case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
            return spanForTemplateLiteral(n as ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral);
        case ts.SyntaxKind.ArrayBindingPattern:
            return spanForNode(n, /*autoCollapse*/ false, /*useFullStart*/ !ts.isBindingElement(n.parent), ts.SyntaxKind.OpenBracketToken);
        case ts.SyntaxKind.ArrowFunction:
            return spanForArrowFunction(n as ts.ArrowFunction);
        case ts.SyntaxKind.CallExpression:
            return spanForCallExpression(n as ts.CallExpression);
        case ts.SyntaxKind.ParenthesizedExpression:
            return spanForParenthesizedExpression(n as ts.ParenthesizedExpression);
    }

    function spanForCallExpression(node: ts.CallExpression): ts.OutliningSpan | undefined {
        if (!node.arguments.length) {
            return undefined;
        }
        const openToken = ts.findChildOfKind(node, ts.SyntaxKind.OpenParenToken, sourceFile);
        const closeToken = ts.findChildOfKind(node, ts.SyntaxKind.CloseParenToken, sourceFile);
        if (!openToken || !closeToken || ts.positionsAreOnSameLine(openToken.pos, closeToken.pos, sourceFile)) {
            return undefined;
        }

        return spanBetweenTokens(openToken, closeToken, node, sourceFile, /*autoCollapse*/ false, /*useFullStart*/ true);
    }

    function spanForArrowFunction(node: ts.ArrowFunction): ts.OutliningSpan | undefined {
        if (ts.isBlock(node.body) || ts.isParenthesizedExpression(node.body) || ts.positionsAreOnSameLine(node.body.getFullStart(), node.body.getEnd(), sourceFile)) {
            return undefined;
        }
        const textSpan = ts.createTextSpanFromBounds(node.body.getFullStart(), node.body.getEnd());
        return createOutliningSpan(textSpan, ts.OutliningSpanKind.Code, ts.createTextSpanFromNode(node));
    }

    function spanForJSXElement(node: ts.JsxElement): ts.OutliningSpan | undefined {
        const textSpan = ts.createTextSpanFromBounds(node.openingElement.getStart(sourceFile), node.closingElement.getEnd());
        const tagName = node.openingElement.tagName.getText(sourceFile);
        const bannerText = "<" + tagName + ">...</" + tagName + ">";
        return createOutliningSpan(textSpan, ts.OutliningSpanKind.Code, textSpan, /*autoCollapse*/ false, bannerText);
    }

    function spanForJSXFragment(node: ts.JsxFragment): ts.OutliningSpan | undefined {
        const textSpan = ts.createTextSpanFromBounds(node.openingFragment.getStart(sourceFile), node.closingFragment.getEnd());
        const bannerText = "<>...</>";
        return createOutliningSpan(textSpan, ts.OutliningSpanKind.Code, textSpan, /*autoCollapse*/ false, bannerText);
    }

    function spanForJSXAttributes(node: ts.JsxAttributes): ts.OutliningSpan | undefined {
        if (node.properties.length === 0) {
            return undefined;
        }

        return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), ts.OutliningSpanKind.Code);
    }

    function spanForTemplateLiteral(node: ts.TemplateExpression | ts.NoSubstitutionTemplateLiteral) {
        if (node.kind === ts.SyntaxKind.NoSubstitutionTemplateLiteral && node.text.length === 0) {
            return undefined;
        }
        return createOutliningSpanFromBounds(node.getStart(sourceFile), node.getEnd(), ts.OutliningSpanKind.Code);
    }

    function spanForObjectOrArrayLiteral(node: ts.Node, open: ts.SyntaxKind.OpenBraceToken | ts.SyntaxKind.OpenBracketToken = ts.SyntaxKind.OpenBraceToken): ts.OutliningSpan | undefined {
        // If the block has no leading keywords and is inside an array literal or call expression,
        // we only want to collapse the span of the block.
        // Otherwise, the collapsed section will include the end of the previous line.
        return spanForNode(node, /*autoCollapse*/ false, /*useFullStart*/ !ts.isArrayLiteralExpression(node.parent) && !ts.isCallExpression(node.parent), open);
    }

    function spanForNode(hintSpanNode: ts.Node, autoCollapse = false, useFullStart = true, open: ts.SyntaxKind.OpenBraceToken | ts.SyntaxKind.OpenBracketToken = ts.SyntaxKind.OpenBraceToken, close: ts.SyntaxKind = open === ts.SyntaxKind.OpenBraceToken ? ts.SyntaxKind.CloseBraceToken : ts.SyntaxKind.CloseBracketToken): ts.OutliningSpan | undefined {
        const openToken = ts.findChildOfKind(n, open, sourceFile);
        const closeToken = ts.findChildOfKind(n, close, sourceFile);
        return openToken && closeToken && spanBetweenTokens(openToken, closeToken, hintSpanNode, sourceFile, autoCollapse, useFullStart);
    }

    function spanForNodeArray(nodeArray: ts.NodeArray<ts.Node>): ts.OutliningSpan | undefined {
        return nodeArray.length ? createOutliningSpan(ts.createTextSpanFromRange(nodeArray), ts.OutliningSpanKind.Code) : undefined;
    }

    function spanForParenthesizedExpression(node: ts.ParenthesizedExpression): ts.OutliningSpan | undefined {
        if (ts.positionsAreOnSameLine(node.getStart(), node.getEnd(), sourceFile)) return undefined;
        const textSpan = ts.createTextSpanFromBounds(node.getStart(), node.getEnd());
        return createOutliningSpan(textSpan, ts.OutliningSpanKind.Code, ts.createTextSpanFromNode(node));
    }
}

function functionSpan(node: ts.SignatureDeclaration, body: ts.Block, sourceFile: ts.SourceFile): ts.OutliningSpan | undefined {
    const openToken = tryGetFunctionOpenToken(node, body, sourceFile);
    const closeToken = ts.findChildOfKind(body, ts.SyntaxKind.CloseBraceToken, sourceFile);
    return openToken && closeToken && spanBetweenTokens(openToken, closeToken, node, sourceFile, /*autoCollapse*/ node.kind !== ts.SyntaxKind.ArrowFunction);
}

function spanBetweenTokens(openToken: ts.Node, closeToken: ts.Node, hintSpanNode: ts.Node, sourceFile: ts.SourceFile, autoCollapse = false, useFullStart = true): ts.OutliningSpan {
    const textSpan = ts.createTextSpanFromBounds(useFullStart ? openToken.getFullStart() : openToken.getStart(sourceFile), closeToken.getEnd());
    return createOutliningSpan(textSpan, ts.OutliningSpanKind.Code, ts.createTextSpanFromNode(hintSpanNode, sourceFile), autoCollapse);
}

function createOutliningSpan(textSpan: ts.TextSpan, kind: ts.OutliningSpanKind, hintSpan: ts.TextSpan = textSpan, autoCollapse = false, bannerText = "..."): ts.OutliningSpan {
    return { textSpan, kind, hintSpan, bannerText, autoCollapse };
}

function tryGetFunctionOpenToken(node: ts.SignatureDeclaration, body: ts.Block, sourceFile: ts.SourceFile): ts.Node | undefined {
    if (ts.isNodeArrayMultiLine(node.parameters, sourceFile)) {
        const openParenToken = ts.findChildOfKind(node, ts.SyntaxKind.OpenParenToken, sourceFile);
        if (openParenToken) {
            return openParenToken;
        }
    }
    return ts.findChildOfKind(body, ts.SyntaxKind.OpenBraceToken, sourceFile);
}
