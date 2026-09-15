package ls

import (
	"cmp"
	"context"
	"slices"
	"strings"
	"unicode"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/collections"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/debug"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

func (l *LanguageService) ProvideFoldingRange(ctx context.Context, documentURI lsproto.DocumentUri) (lsproto.FoldingRangeResponse, error) {
	_, sourceFile := l.getProgramAndFile(documentURI)
	projections := append([]*ast.SourceFile{sourceFile}, sourceFile.SupplementalSourceFiles()...)
	var res []*lsproto.FoldingRange
	for _, projection := range projections {
		ranges := l.addNodeOutliningSpans(ctx, projection)
		ranges = append(ranges, l.addRegionOutliningSpans(ctx, projection)...)
		if lsproto.GetClientCapabilities(ctx).TextDocument.FoldingRange.LineFoldingOnly {
			ranges = l.adjustFoldingEnd(ranges, projection)
		}
		res = append(res, ranges...)
	}
	slices.SortStableFunc(res, func(a, b *lsproto.FoldingRange) int {
		if c := cmp.Compare(a.StartLine, b.StartLine); c != 0 {
			return c
		}
		if c := cmp.Compare(*a.StartCharacter, *b.StartCharacter); c != 0 {
			return c
		}
		if c := cmp.Compare(a.EndLine, b.EndLine); c != 0 {
			return c
		}
		return cmp.Compare(*a.EndCharacter, *b.EndCharacter)
	})
	seen := collections.Set[foldingRangeKey]{}
	res = slices.DeleteFunc(res, func(foldingRange *lsproto.FoldingRange) bool {
		return !seen.AddIfAbsent(keyForFoldingRange(foldingRange))
	})
	return lsproto.FoldingRangesOrNull{FoldingRanges: &res}, nil
}

type foldingRangeKey struct {
	startLine, startCharacter, endLine, endCharacter uint32
	kind                                             lsproto.FoldingRangeKind
	collapsedText                                    string
	hasStartCharacter, hasEndCharacter               bool
	hasKind, hasCollapsedText                        bool
}

func keyForFoldingRange(foldingRange *lsproto.FoldingRange) foldingRangeKey {
	key := foldingRangeKey{startLine: foldingRange.StartLine, endLine: foldingRange.EndLine}
	if foldingRange.StartCharacter != nil {
		key.startCharacter = *foldingRange.StartCharacter
		key.hasStartCharacter = true
	}
	if foldingRange.EndCharacter != nil {
		key.endCharacter = *foldingRange.EndCharacter
		key.hasEndCharacter = true
	}
	if foldingRange.Kind != nil {
		key.kind = *foldingRange.Kind
		key.hasKind = true
	}
	if foldingRange.CollapsedText != nil {
		key.collapsedText = *foldingRange.CollapsedText
		key.hasCollapsedText = true
	}
	return key
}

// adjustFoldingEnd adjusts the end line of folding ranges when the client signals lineFoldingOnly.
// This mirrors the behavior of VS Code's built-in TypeScript extension (workaround for vscode#47240).
// When lineFoldingOnly is true, we hide lines from startLine+1 to endLine. And to keep closing
// brackets/braces visible, we subtract 1 from endLine when the range ends with a closing pair character.
func (l *LanguageService) adjustFoldingEnd(ranges []*lsproto.FoldingRange, sourceFile *ast.SourceFile) []*lsproto.FoldingRange {
	sourceText := sourceFile.Text()
	result := make([]*lsproto.FoldingRange, 0, len(ranges))
	for _, r := range ranges {
		if r.EndCharacter != nil && *r.EndCharacter > 0 {
			positions := lsconv.FromLSPPositionForSourceFile(l.converters, sourceFile, lsproto.Position{
				Line:      r.EndLine,
				Character: *r.EndCharacter,
			}, spanmap.FeatureFoldingRanges)
			var position *lsconv.MappedPosition[*ast.SourceFile]
			for i := range positions {
				if positions[i].Script == sourceFile && !positions[i].Fidelity.IsNone() {
					position = &positions[i]
					break
				}
			}
			if position != nil && position.Position > 0 && int(position.Position) <= len(sourceText) {
				endOffset := position.Position
				foldEndChar := sourceText[int(endOffset)-1]
				if foldEndChar == '}' || foldEndChar == ']' || foldEndChar == ')' || foldEndChar == '`' || foldEndChar == '>' {
					if r.EndLine > r.StartLine {
						r.EndLine--
					}
				}
			}
		}
		result = append(result, r)
	}
	return result
}

func (l *LanguageService) addNodeOutliningSpans(ctx context.Context, sourceFile *ast.SourceFile) []*lsproto.FoldingRange {
	depthRemaining := 40
	current := 0

	statements := sourceFile.Statements
	n := len(statements.Nodes)
	foldingRange := make([]*lsproto.FoldingRange, 0, 40)
	for current < n {
		for current < n && !ast.IsAnyImportSyntax(statements.Nodes[current]) {
			foldingRange = append(foldingRange, visitNode(ctx, statements.Nodes[current], depthRemaining, sourceFile, l)...)
			current++
		}
		if current == n {
			break
		}
		firstImport := current
		for current < n && ast.IsAnyImportSyntax(statements.Nodes[current]) {
			foldingRange = append(foldingRange, visitNode(ctx, statements.Nodes[current], depthRemaining, sourceFile, l)...)
			current++
		}
		lastImport := current - 1
		if lastImport != firstImport {
			foldingRangeKind := lsproto.FoldingRangeKindImports
			imports := createFoldingRangeFromBounds(
				ctx,
				astnav.GetStartOfNode(astnav.FindChildOfKind(statements.Nodes[firstImport],
					ast.KindImportKeyword, sourceFile), sourceFile, false /*includeJSDoc*/),
				statements.Nodes[lastImport].End(),
				foldingRangeKind,
				sourceFile,
				l,
			)
			if imports != nil {
				foldingRange = append(foldingRange, imports)
			}
		}
	}

	// Visit the EOF Token so that comments which aren't attached to statements are included.
	foldingRange = append(foldingRange, visitNode(ctx, sourceFile.EndOfFileToken, depthRemaining, sourceFile, l)...)
	return foldingRange
}

func (l *LanguageService) addRegionOutliningSpans(ctx context.Context, sourceFile *ast.SourceFile) []*lsproto.FoldingRange {
	type regionStart struct {
		position      int
		collapsedText *string
	}
	regions := make([]regionStart, 0, 40)
	out := make([]*lsproto.FoldingRange, 0, 40)
	lineStarts := scanner.GetECMALineStarts(sourceFile)
	for _, currentLineStart := range lineStarts {
		lineEnd := getLineEndOfPosition(sourceFile, int(currentLineStart))
		lineText := sourceFile.Text()[currentLineStart:lineEnd]
		result := parseRegionDelimiter(lineText)
		if result == nil || isInComment(sourceFile, int(currentLineStart), astnav.GetTokenAtPosition(sourceFile, int(currentLineStart))) != nil {
			continue
		}

		if result.isStart {
			region := regionStart{position: strings.Index(sourceFile.Text()[currentLineStart:lineEnd], "//") + int(currentLineStart)}
			if supportsCollapsedText(ctx) {
				collapsedText := "#region"
				if result.name != "" {
					collapsedText = result.name
				}
				region.collapsedText = &collapsedText
			}
			regions = append(regions, region)
		} else {
			if len(regions) > 0 {
				region := regions[len(regions)-1]
				regions = regions[:len(regions)-1]
				textRange, fidelity := l.createFoldingRangeFromBounds(region.position, lineEnd, sourceFile)
				if fidelity.IsNone() {
					continue
				}
				foldingRange := createFoldingRange(ctx, textRange, lsproto.FoldingRangeKindRegion, "")
				foldingRange.CollapsedText = region.collapsedText
				out = append(out, foldingRange)
			}
		}
	}
	return out
}

func visitNode(ctx context.Context, n *ast.Node, depthRemaining int, sourceFile *ast.SourceFile, l *LanguageService) []*lsproto.FoldingRange {
	if n.Flags&ast.NodeFlagsReparsed != 0 || depthRemaining == 0 || ctx.Err() != nil {
		return nil
	}
	foldingRange := make([]*lsproto.FoldingRange, 0, 40)
	if (!ast.IsBinaryExpression(n) && ast.IsDeclaration(n)) || ast.IsVariableStatement(n) || ast.IsReturnStatement(n) || ast.IsCallOrNewExpression(n) || n.Kind == ast.KindEndOfFile {
		foldingRange = append(foldingRange, addOutliningForLeadingCommentsForNode(ctx, n, sourceFile, l)...)
	}
	if ast.IsFunctionLike(n) && n.Parent != nil && ast.IsBinaryExpression(n.Parent) && n.Parent.AsBinaryExpression().Left != nil && ast.IsPropertyAccessExpression(n.Parent.AsBinaryExpression().Left) {
		foldingRange = append(foldingRange, addOutliningForLeadingCommentsForNode(ctx, n.Parent.AsBinaryExpression().Left, sourceFile, l)...)
	}
	if ast.IsBlock(n) {
		statements := n.AsBlock().Statements
		if statements != nil {
			foldingRange = append(foldingRange, addOutliningForLeadingCommentsForPos(ctx, statements.End(), sourceFile, l)...)
		}
	}
	if ast.IsModuleBlock(n) {
		statements := n.AsModuleBlock().Statements
		if statements != nil {
			foldingRange = append(foldingRange, addOutliningForLeadingCommentsForPos(ctx, statements.End(), sourceFile, l)...)
		}
	}
	if ast.IsClassLike(n) || ast.IsInterfaceDeclaration(n) {
		var members *ast.NodeList
		if ast.IsClassDeclaration(n) {
			members = n.AsClassDeclaration().Members
		} else if ast.IsClassExpression(n) {
			members = n.AsClassExpression().Members
		} else {
			members = n.AsInterfaceDeclaration().Members
		}
		if members != nil {
			foldingRange = append(foldingRange, addOutliningForLeadingCommentsForPos(ctx, members.End(), sourceFile, l)...)
		}
	}

	span := getOutliningSpanForNode(ctx, n, sourceFile, l)
	if span != nil {
		foldingRange = append(foldingRange, span)
	}

	depthRemaining--
	if ast.IsCallExpression(n) {
		depthRemaining++
		expressionNodes := visitNode(ctx, n.Expression(), depthRemaining, sourceFile, l)
		if expressionNodes != nil {
			foldingRange = append(foldingRange, expressionNodes...)
		}
		depthRemaining--
		for _, arg := range n.Arguments() {
			if arg != nil {
				foldingRange = append(foldingRange, visitNode(ctx, arg, depthRemaining, sourceFile, l)...)
			}
		}
		typeArguments := n.TypeArguments()
		for _, typeArg := range typeArguments {
			if typeArg != nil {
				foldingRange = append(foldingRange, visitNode(ctx, typeArg, depthRemaining, sourceFile, l)...)
			}
		}
	} else if ast.IsIfStatement(n) && n.AsIfStatement().ElseStatement != nil && ast.IsIfStatement(n.AsIfStatement().ElseStatement) {
		// Consider an 'else if' to be on the same depth as the 'if'.
		ifStatement := n.AsIfStatement()
		expressionNodes := visitNode(ctx, n.Expression(), depthRemaining, sourceFile, l)
		if expressionNodes != nil {
			foldingRange = append(foldingRange, expressionNodes...)
		}
		thenNode := visitNode(ctx, ifStatement.ThenStatement, depthRemaining, sourceFile, l)
		if thenNode != nil {
			foldingRange = append(foldingRange, thenNode...)
		}
		depthRemaining++
		elseNode := visitNode(ctx, ifStatement.ElseStatement, depthRemaining, sourceFile, l)
		if elseNode != nil {
			foldingRange = append(foldingRange, elseNode...)
		}
		depthRemaining--
	} else {
		visit := func(node *ast.Node) bool {
			childNode := visitNode(ctx, node, depthRemaining, sourceFile, l)
			if childNode != nil {
				foldingRange = append(foldingRange, childNode...)
			}
			return false
		}
		n.ForEachChild(visit)
	}
	depthRemaining++
	return foldingRange
}

func addOutliningForLeadingCommentsForNode(ctx context.Context, n *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) []*lsproto.FoldingRange {
	if ast.IsJsxText(n) {
		return nil
	}
	return addOutliningForLeadingCommentsForPos(ctx, n.Pos(), sourceFile, l)
}

func addOutliningForLeadingCommentsForPos(ctx context.Context, pos int, sourceFile *ast.SourceFile, l *LanguageService) []*lsproto.FoldingRange {
	p := &printer.EmitContext{}
	foldingRange := make([]*lsproto.FoldingRange, 0, 40)
	firstSingleLineCommentStart := -1
	lastSingleLineCommentEnd := -1
	singleLineCommentCount := 0
	foldingRangeKindComment := lsproto.FoldingRangeKindComment

	combineAndAddMultipleSingleLineComments := func() *lsproto.FoldingRange {
		// Only outline spans of two or more consecutive single line comments
		if singleLineCommentCount > 1 {
			return createFoldingRangeFromBounds(ctx, firstSingleLineCommentStart, lastSingleLineCommentEnd, foldingRangeKindComment, sourceFile, l)
		}
		return nil
	}

	sourceText := sourceFile.Text()
	for comment := range scanner.GetLeadingCommentRanges(&printer.NewNodeFactory(p).NodeFactory, sourceText, pos) {
		commentPos := comment.Pos()
		commentEnd := comment.End()

		if ctx.Err() != nil {
			return nil
		}
		switch comment.Kind {
		case ast.KindSingleLineCommentTrivia:
			// never fold region delimiters into single-line comment regions
			commentText := sourceText[commentPos:commentEnd]
			if parseRegionDelimiter(commentText) != nil {
				comments := combineAndAddMultipleSingleLineComments()
				if comments != nil {
					foldingRange = append(foldingRange, comments)
				}
				singleLineCommentCount = 0
				break
			}

			// For single line comments, combine consecutive ones (2 or more) into
			// a single span from the start of the first till the end of the last
			if singleLineCommentCount == 0 {
				firstSingleLineCommentStart = commentPos
			}
			lastSingleLineCommentEnd = commentEnd
			singleLineCommentCount++
		case ast.KindMultiLineCommentTrivia:
			comments := combineAndAddMultipleSingleLineComments()
			if comments != nil {
				foldingRange = append(foldingRange, comments)
			}
			comment := createFoldingRangeFromBounds(ctx, commentPos, commentEnd, foldingRangeKindComment, sourceFile, l)
			if comment != nil {
				foldingRange = append(foldingRange, comment)
			}
			singleLineCommentCount = 0
		default:
			debug.AssertNever(comment.Kind)
		}
	}
	addedComments := combineAndAddMultipleSingleLineComments()
	if addedComments != nil {
		foldingRange = append(foldingRange, addedComments)
	}
	return foldingRange
}

type regionDelimiterResult struct {
	isStart bool
	name    string
}

func parseRegionDelimiter(lineText string) *regionDelimiterResult {
	// We trim the leading whitespace and // without the regex since the
	// multiple potential whitespace matches can make for some gnarly backtracking behavior
	lineText = strings.TrimLeftFunc(lineText, unicode.IsSpace)
	if !strings.HasPrefix(lineText, "//") {
		return nil
	}
	lineText = strings.TrimSpace(lineText[2:])
	lineText = strings.TrimSuffix(lineText, "\r")
	if !strings.HasPrefix(lineText, "#") {
		return nil
	}
	lineText = lineText[1:]
	isStart := true
	if strings.HasPrefix(lineText, "end") {
		isStart = false
		lineText = lineText[3:]
	}
	if !strings.HasPrefix(lineText, "region") {
		return nil
	}
	lineText = lineText[6:]
	return &regionDelimiterResult{
		isStart: isStart,
		name:    strings.TrimSpace(lineText),
	}
}

func getOutliningSpanForNode(ctx context.Context, n *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	switch n.Kind {
	case ast.KindBlock:
		if ast.IsFunctionLike(n.Parent) {
			return functionSpan(ctx, n.Parent, n, sourceFile, l)
		}
		// Check if the block is standalone, or 'attached' to some parent statement.
		// If the latter, we want to collapse the block, but consider its hint span
		// to be the entire span of the parent.
		switch n.Parent.Kind {
		case ast.KindDoStatement, ast.KindForInStatement, ast.KindForOfStatement, ast.KindForStatement, ast.KindIfStatement, ast.KindWhileStatement, ast.KindWithStatement, ast.KindCatchClause:
			return spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)
		case ast.KindTryStatement:
			// Could be the try-block, or the finally-block.
			tryStatement := n.Parent.AsTryStatement()
			if tryStatement.TryBlock == n {
				return spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)
			} else if tryStatement.FinallyBlock == n {
				if span := spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l); span != nil {
					return span
				}
			}
			fallthrough
		default:
			// Block was a standalone block.  In this case we want to only collapse
			// the span of the block, independent of any parent span.
			textRange, fidelity := l.createLspRangeFromNodeForFeature(n, sourceFile, spanmap.FeatureFoldingRanges)
			if fidelity.IsNone() {
				return nil
			}
			return createFoldingRange(ctx, textRange, "", "")
		}
	case ast.KindModuleBlock:
		return spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)
	case ast.KindClassDeclaration, ast.KindClassExpression, ast.KindInterfaceDeclaration, ast.KindEnumDeclaration, ast.KindCaseBlock, ast.KindTypeLiteral, ast.KindObjectBindingPattern:
		return spanForNode(ctx, n, ast.KindOpenBraceToken, true /*useFullStart*/, sourceFile, l)
	case ast.KindTupleType:
		return spanForNode(ctx, n, ast.KindOpenBracketToken, !ast.IsTupleTypeNode(n.Parent) /*useFullStart*/, sourceFile, l)
	case ast.KindCaseClause, ast.KindDefaultClause:
		return spanForNodeArray(ctx, n.AsCaseOrDefaultClause().Statements, sourceFile, l)
	case ast.KindObjectLiteralExpression:
		return spanForNode(ctx, n, ast.KindOpenBraceToken, !ast.IsArrayLiteralExpression(n.Parent) && !ast.IsCallExpression(n.Parent) /*useFullStart*/, sourceFile, l)
	case ast.KindArrayLiteralExpression:
		return spanForNode(ctx, n, ast.KindOpenBracketToken, !ast.IsArrayLiteralExpression(n.Parent) && !ast.IsCallExpression(n.Parent) /*useFullStart*/, sourceFile, l)
	case ast.KindJsxElement, ast.KindJsxFragment:
		return spanForJSXElement(ctx, n, sourceFile, l)
	case ast.KindJsxSelfClosingElement, ast.KindJsxOpeningElement:
		return spanForJSXAttributes(ctx, n, sourceFile, l)
	case ast.KindTemplateExpression, ast.KindNoSubstitutionTemplateLiteral:
		return spanForTemplateLiteral(ctx, n, sourceFile, l)
	case ast.KindArrayBindingPattern:
		return spanForNode(ctx, n, ast.KindOpenBracketToken, !ast.IsBindingElement(n.Parent) /*useFullStart*/, sourceFile, l)
	case ast.KindArrowFunction:
		return spanForArrowFunction(ctx, n, sourceFile, l)
	case ast.KindCallExpression:
		return spanForCallExpression(ctx, n, sourceFile, l)
	case ast.KindParenthesizedExpression:
		return spanForParenthesizedExpression(ctx, n, sourceFile, l)
	case ast.KindNamedImports, ast.KindNamedExports, ast.KindImportAttributes:
		return spanForImportExportElements(ctx, n, sourceFile, l)
	}
	return nil
}

func spanForImportExportElements(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	var elements *ast.NodeList
	switch node.Kind {
	case ast.KindNamedImports:
		elements = node.AsNamedImports().Elements
	case ast.KindNamedExports:
		elements = node.AsNamedExports().Elements
	case ast.KindImportAttributes:
		elements = node.AsImportAttributes().Attributes
	}
	if elements == nil || len(elements.Nodes) == 0 {
		return nil
	}
	openToken := astnav.FindChildOfKind(node, ast.KindOpenBraceToken, sourceFile)
	closeToken := astnav.FindChildOfKind(node, ast.KindCloseBraceToken, sourceFile)
	if openToken == nil || closeToken == nil || printer.PositionsAreOnSameLine(openToken.Pos(), closeToken.Pos(), sourceFile) {
		return nil
	}
	return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, false /*useFullStart*/, l)
}

func spanForParenthesizedExpression(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	start := astnav.GetStartOfNode(node, sourceFile, false /*includeJSDoc*/)
	if printer.PositionsAreOnSameLine(start, node.End(), sourceFile) {
		return nil
	}
	textRange, fidelity := l.createFoldingRangeFromBounds(start, node.End(), sourceFile)
	if fidelity.IsNone() {
		return nil
	}
	return createFoldingRange(ctx, textRange, "", "")
}

func spanForCallExpression(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	if node.AsCallExpression().Arguments == nil || len(node.AsCallExpression().Arguments.Nodes) == 0 {
		return nil
	}
	openToken := astnav.FindChildOfKind(node, ast.KindOpenParenToken, sourceFile)
	closeToken := astnav.FindChildOfKind(node, ast.KindCloseParenToken, sourceFile)
	if openToken == nil || closeToken == nil || printer.PositionsAreOnSameLine(openToken.Pos(), closeToken.Pos(), sourceFile) {
		return nil
	}

	return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, true /*useFullStart*/, l)
}

func spanForArrowFunction(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	arrowFunctionNode := node.AsArrowFunction()
	if ast.IsBlock(arrowFunctionNode.Body) || ast.IsParenthesizedExpression(arrowFunctionNode.Body) || printer.PositionsAreOnSameLine(arrowFunctionNode.Body.Pos(), arrowFunctionNode.Body.End(), sourceFile) {
		return nil
	}
	textRange, fidelity := l.createFoldingRangeFromBounds(arrowFunctionNode.Body.Pos(), arrowFunctionNode.Body.End(), sourceFile)
	if fidelity.IsNone() {
		return nil
	}
	return createFoldingRange(ctx, textRange, "", "")
}

func spanForTemplateLiteral(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	if node.Kind == ast.KindNoSubstitutionTemplateLiteral && len(node.Text()) == 0 {
		return nil
	}
	return createFoldingRangeFromBounds(ctx, astnav.GetStartOfNode(node, sourceFile, false /*includeJSDoc*/), node.End(), "", sourceFile, l)
}

func spanForJSXElement(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	if node.Kind == ast.KindJsxElement {
		jsxElement := node.AsJsxElement()
		textRange, fidelity := l.createFoldingRangeFromBounds(astnav.GetStartOfNode(jsxElement.OpeningElement, sourceFile, false /*includeJSDoc*/), jsxElement.ClosingElement.End(), sourceFile)
		if fidelity.IsNone() {
			return nil
		}
		tagName := scanner.GetTextOfNode(jsxElement.OpeningElement.TagName())
		bannerText := "<" + tagName + ">...</" + tagName + ">"
		return createFoldingRange(ctx, textRange, "", bannerText)
	}
	// JsxFragment
	jsxFragment := node.AsJsxFragment()
	textRange, fidelity := l.createFoldingRangeFromBounds(astnav.GetStartOfNode(jsxFragment.OpeningFragment, sourceFile, false /*includeJSDoc*/), jsxFragment.ClosingFragment.End(), sourceFile)
	if fidelity.IsNone() {
		return nil
	}
	return createFoldingRange(ctx, textRange, "", "<>...</>")
}

func spanForJSXAttributes(ctx context.Context, node *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	var attributes *ast.JsxAttributesNode
	if node.Kind == ast.KindJsxSelfClosingElement {
		attributes = node.AsJsxSelfClosingElement().Attributes
	} else {
		attributes = node.AsJsxOpeningElement().Attributes
	}
	if len(attributes.Properties()) == 0 {
		return nil
	}
	return createFoldingRangeFromBounds(ctx, astnav.GetStartOfNode(node, sourceFile, false /*includeJSDoc*/), node.End(), "", sourceFile, l)
}

func spanForNodeArray(ctx context.Context, statements *ast.NodeList, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	if statements != nil && len(statements.Nodes) != 0 {
		textRange, fidelity := l.createFoldingRangeFromBounds(statements.Pos(), statements.End(), sourceFile)
		if fidelity.IsNone() {
			return nil
		}
		return createFoldingRange(ctx, textRange, "", "")
	}
	return nil
}

func spanForNode(ctx context.Context, node *ast.Node, open ast.Kind, useFullStart bool, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	closeBrace := ast.KindCloseBraceToken
	if open != ast.KindOpenBraceToken {
		closeBrace = ast.KindCloseBracketToken
	}
	openToken := astnav.FindChildOfKind(node, open, sourceFile)
	closeToken := astnav.FindChildOfKind(node, closeBrace, sourceFile)
	if openToken != nil && closeToken != nil {
		return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, useFullStart, l)
	}
	return nil
}

func rangeBetweenTokens(ctx context.Context, openToken *ast.Node, closeToken *ast.Node, sourceFile *ast.SourceFile, useFullStart bool, l *LanguageService) *lsproto.FoldingRange {
	var textRange lsproto.Range
	var fidelity spanmap.Fidelity
	if useFullStart {
		textRange, fidelity = l.createFoldingRangeFromBounds(openToken.Pos(), closeToken.End(), sourceFile)
	} else {
		textRange, fidelity = l.createFoldingRangeFromBounds(astnav.GetStartOfNode(openToken, sourceFile, false /*includeJSDoc*/), closeToken.End(), sourceFile)
	}
	if fidelity.IsNone() {
		return nil
	}
	return createFoldingRange(ctx, textRange, "", "")
}

func supportsCollapsedText(ctx context.Context) bool {
	return lsproto.GetClientCapabilities(ctx).TextDocument.FoldingRange.FoldingRange.CollapsedText
}

func createFoldingRange(ctx context.Context, textRange lsproto.Range, foldingRangeKind lsproto.FoldingRangeKind, collapsedText string) *lsproto.FoldingRange {
	var kind *lsproto.FoldingRangeKind
	if foldingRangeKind != "" {
		kind = &foldingRangeKind
	}
	result := &lsproto.FoldingRange{
		StartLine:      textRange.Start.Line,
		StartCharacter: &textRange.Start.Character,
		EndLine:        textRange.End.Line,
		EndCharacter:   &textRange.End.Character,
		Kind:           kind,
	}
	if collapsedText != "" && supportsCollapsedText(ctx) {
		result.CollapsedText = &collapsedText
	}
	return result
}

func createFoldingRangeFromBounds(ctx context.Context, pos int, end int, foldingRangeKind lsproto.FoldingRangeKind, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	textRange, fidelity := l.createFoldingRangeFromBounds(pos, end, sourceFile)
	if fidelity.IsNone() {
		return nil
	}
	return createFoldingRange(ctx, textRange, foldingRangeKind, "")
}

func (l *LanguageService) createFoldingRangeFromBounds(start, end int, sourceFile *ast.SourceFile) (lsproto.Range, spanmap.Fidelity) {
	return l.converters.ToLSPRangeForFeature(sourceFile, core.NewTextRange(start, end), spanmap.FeatureFoldingRanges)
}

func functionSpan(ctx context.Context, node *ast.Node, body *ast.Node, sourceFile *ast.SourceFile, l *LanguageService) *lsproto.FoldingRange {
	openToken := tryGetFunctionOpenToken(node, body, sourceFile)
	closeToken := astnav.FindChildOfKind(body, ast.KindCloseBraceToken, sourceFile)
	if openToken != nil && closeToken != nil {
		return rangeBetweenTokens(ctx, openToken, closeToken, sourceFile, true /*useFullStart*/, l)
	}
	return nil
}

func tryGetFunctionOpenToken(node *ast.SignatureDeclaration, body *ast.Node, sourceFile *ast.SourceFile) *ast.Node {
	if isNodeArrayMultiLine(node.Parameters(), sourceFile) {
		openParenToken := astnav.FindChildOfKind(node, ast.KindOpenParenToken, sourceFile)
		if openParenToken != nil {
			return openParenToken
		}
	}
	return astnav.FindChildOfKind(body, ast.KindOpenBraceToken, sourceFile)
}

func isNodeArrayMultiLine(list []*ast.Node, sourceFile *ast.SourceFile) bool {
	if len(list) == 0 {
		return false
	}
	return !printer.PositionsAreOnSameLine(list[0].Pos(), list[len(list)-1].End(), sourceFile)
}
