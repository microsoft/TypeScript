package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func (l *LanguageService) ProvideSelectionRanges(ctx context.Context, params *lsproto.SelectionRangeParams) (lsproto.SelectionRangeResponse, error) {
	_, sourceFile := l.getProgramAndFile(params.TextDocument.Uri)
	if sourceFile == nil {
		return lsproto.SelectionRangesOrNull{}, nil
	}

	var results []*lsproto.SelectionRange
	for _, position := range params.Positions {
		pos := l.converters.LineAndCharacterToPosition(sourceFile, position)
		selectionRange := getSmartSelectionRange(l, sourceFile, int(pos))
		if selectionRange != nil {
			results = append(results, selectionRange)
		}
	}

	return lsproto.SelectionRangesOrNull{SelectionRanges: &results}, nil
}

func getSelectionChildren(factory *ast.NodeFactory, node *ast.Node, sourceFile *ast.SourceFile) []*ast.Node {
	if !ast.IsMappedTypeNode(node) {
		return getChildrenFromNonJSDocNode(node, sourceFile)
	}

	children := getChildrenFromNonJSDocNode(node, sourceFile)
	if len(children) < 2 {
		return children
	}

	openBraceToken := children[0]
	closeBraceToken := children[len(children)-1]
	if openBraceToken.Kind != ast.KindOpenBraceToken || closeBraceToken.Kind != ast.KindCloseBraceToken {
		return children
	}

	mappedType := node.AsMappedTypeNode()
	children = children[1 : len(children)-1]

	// Group `-/+readonly` and `-/+?`.
	groupedWithPlusMinusTokens := groupChildren(factory, children, func(child *ast.Node) bool {
		return child == mappedType.ReadonlyToken ||
			child.Kind == ast.KindReadonlyKeyword ||
			child == mappedType.QuestionToken ||
			child.Kind == ast.KindQuestionToken
	})

	// Group the type parameter with its surrounding brackets.
	groupedWithBrackets := groupChildren(factory, groupedWithPlusMinusTokens, func(child *ast.Node) bool {
		return child.Kind == ast.KindOpenBracketToken ||
			child.Kind == ast.KindTypeParameter ||
			child.Kind == ast.KindCloseBracketToken
	})

	// Go exposes the trailing semicolon directly, so keep it in the right-hand
	// group to produce the same effective selection tree as Strada.
	return []*ast.Node{
		openBraceToken,
		createSyntaxList(factory, splitChildren(factory, groupedWithBrackets, func(child *ast.Node) bool {
			return child.Kind == ast.KindColonToken
		}, false)),
		closeBraceToken,
	}
}

func groupChildren(factory *ast.NodeFactory, children []*ast.Node, groupOn func(*ast.Node) bool) []*ast.Node {
	var result []*ast.Node
	var group []*ast.Node
	for _, child := range children {
		if groupOn(child) {
			group = append(group, child)
		} else {
			if len(group) > 0 {
				result = append(result, createSyntaxList(factory, group))
				group = nil
			}
			result = append(result, child)
		}
	}
	if len(group) > 0 {
		result = append(result, createSyntaxList(factory, group))
	}
	return result
}

func splitChildren(
	factory *ast.NodeFactory,
	children []*ast.Node,
	pivotOn func(*ast.Node) bool,
	separateTrailingSemicolon bool,
) []*ast.Node {
	if len(children) < 2 {
		return children
	}

	splitTokenIndex := -1
	for i, child := range children {
		if pivotOn(child) {
			splitTokenIndex = i
			break
		}
	}
	if splitTokenIndex == -1 {
		return children
	}

	leftChildren := children[:splitTokenIndex]
	splitToken := children[splitTokenIndex]
	lastToken := children[len(children)-1]
	separateLastToken := separateTrailingSemicolon && lastToken.Kind == ast.KindSemicolonToken
	rightEnd := len(children)
	if separateLastToken {
		rightEnd--
	}
	rightChildren := children[splitTokenIndex+1 : rightEnd]

	result := make([]*ast.Node, 0, 4)
	if len(leftChildren) > 0 {
		result = append(result, createSyntaxList(factory, leftChildren))
	}
	result = append(result, splitToken)
	if len(rightChildren) > 0 {
		result = append(result, createSyntaxList(factory, rightChildren))
	}
	if separateLastToken {
		result = append(result, lastToken)
	}
	return result
}

func createSyntaxList(factory *ast.NodeFactory, children []*ast.Node) *ast.Node {
	list := factory.NewSyntaxList(children)
	list.Loc = core.NewTextRange(children[0].Pos(), children[len(children)-1].End())
	return list
}

func getSmartSelectionRange(l *LanguageService, sourceFile *ast.SourceFile, pos int) *lsproto.SelectionRange {
	factory := &ast.NodeFactory{}

	nodeContainsPosition := func(node *ast.Node) bool {
		if node == nil {
			return false
		}
		start := scanner.GetTokenPosOfNode(node, sourceFile, true /*includeJSDoc*/)
		end := node.End()
		return start <= pos && pos < end
	}

	positionShouldSnapToNode := func(node *ast.Node) bool {
		if pos < node.End() {
			return true
		}
		if node.End() == pos {
			touchingPropertyName := astnav.GetTouchingPropertyName(sourceFile, pos)
			return touchingPropertyName != nil && touchingPropertyName.Pos() < node.End()
		}
		return false
	}

	pushSelectionRange := func(current *lsproto.SelectionRange, start, end int) *lsproto.SelectionRange {
		if start == end {
			return current
		}

		if !(start <= pos && pos <= end) {
			return current
		}

		lspRange := l.converters.ToLSPRange(sourceFile, core.NewTextRange(start, end))

		if current != nil && current.Range == lspRange {
			return current
		}

		return &lsproto.SelectionRange{
			Range:  lspRange,
			Parent: current,
		}
	}

	pushSelectionCommentRange := func(current *lsproto.SelectionRange, start, end int) *lsproto.SelectionRange {
		current = pushSelectionRange(current, start, end)

		commentPos := start
		text := sourceFile.Text()
		for commentPos < end && commentPos < len(text) && text[commentPos] == '/' {
			commentPos++
		}
		current = pushSelectionRange(current, commentPos, end)

		return current
	}

	positionsAreOnSameLine := func(pos1, pos2 int) bool {
		if pos1 == pos2 {
			return true
		}
		lspPos1 := l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(pos1))
		lspPos2 := l.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(pos2))
		return lspPos1.Line == lspPos2.Line
	}

	shouldSkipNode := func(node *ast.Node, parent *ast.Node) bool {
		if ast.IsBlock(node) {
			return true
		}

		if ast.IsTemplateSpan(node) || ast.IsTemplateHead(node) || ast.IsTemplateTail(node) {
			return true
		}

		if parent != nil && ast.IsVariableDeclarationList(node) && ast.IsVariableStatement(parent) {
			return true
		}

		// Skip lone variable declarations
		if parent != nil && ast.IsVariableDeclaration(node) && ast.IsVariableDeclarationList(parent) {
			decl := parent.AsVariableDeclarationList()
			if decl != nil && len(decl.Declarations.Nodes) == 1 {
				return true
			}
		}

		if ast.IsJSDocTypeExpression(node) || ast.IsJSDocSignature(node) || ast.IsJSDocTypeLiteral(node) {
			return true
		}

		return false
	}

	fullRange := l.converters.ToLSPRange(sourceFile, core.NewTextRange(sourceFile.Pos(), sourceFile.End()))
	result := &lsproto.SelectionRange{
		Range: fullRange,
	}

	var current *ast.Node
	for current = sourceFile.AsNode(); current != nil; {
		var next *ast.Node
		parent := current

		visit := func(node *ast.Node) *ast.Node {
			if node != nil && next == nil {
				var foundComment *ast.CommentRange
				for comment := range scanner.GetTrailingCommentRanges(factory, sourceFile.Text(), node.End()) {
					foundComment = &comment
					break
				}
				if foundComment != nil && foundComment.Kind == ast.KindSingleLineCommentTrivia {
					result = pushSelectionCommentRange(result, foundComment.Pos(), foundComment.End())
				}

				if nodeContainsPosition(node) {
					// Add range for multi-line function bodies before skipping the block
					if ast.IsBlock(node) && ast.IsFunctionLikeDeclaration(parent) {
						if !positionsAreOnSameLine(astnav.GetStartOfNode(node, sourceFile, false), node.End()) {
							start := astnav.GetStartOfNode(node, sourceFile, false)
							end := node.End()
							result = pushSelectionRange(result, start, end)
						}
					}

					// Synthesize a stop for '${ ... }' since '${' and '}' actually belong to siblings.
					if ast.IsTemplateSpan(parent) {
						templateSpan := parent.AsTemplateSpan()
						if templateSpan.Literal != nil {
							// Start from just before the '${' and end after the '}'
							// The '${' is 2 characters before the expression start
							spanStart := node.Pos() - 2
							// The '}' is the first character of the template literal (middle or tail)
							spanEnd := astnav.GetStartOfNode(templateSpan.Literal, sourceFile, false) + 1
							// Validate the positions are reasonable
							text := sourceFile.Text()
							if spanStart >= 0 && spanEnd <= len(text) && spanStart < spanEnd {
								result = pushSelectionRange(result, spanStart, spanEnd)
							}
						}
					}

					if !shouldSkipNode(node, parent) {
						start := astnav.GetStartOfNode(node, sourceFile, false)
						end := node.End()
						result = pushSelectionRange(result, start, end)

						if ast.IsMappedTypeNode(node) {
							for selectionParent := node; ; {
								var selectionChild *ast.Node
								for _, child := range getSelectionChildren(factory, selectionParent, sourceFile) {
									childStart := scanner.GetTokenPosOfNode(child, sourceFile, true /*includeJSDoc*/)
									if childStart > pos {
										break
									}
									if positionShouldSnapToNode(child) {
										result = pushSelectionRange(result, childStart, child.End())
										selectionChild = child
										break
									}
								}
								if selectionChild == nil || !ast.IsSyntaxList(selectionChild) {
									break
								}
								selectionParent = selectionChild
							}
						}

						// String literals should have a stop both inside and outside their quotes.
						if ast.IsStringLiteral(node) || node.Kind == ast.KindTemplateExpression || node.Kind == ast.KindNoSubstitutionTemplateLiteral {
							// Only add inner content range if there's actually content (handles unterminated literals)
							if start+1 < end-1 {
								result = pushSelectionRange(result, start+1, end-1)
							}
						}
					}

					next = node
				}
			}
			return node
		}

		visitNodes := func(nodes *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {
			if nodes != nil && len(nodes.Nodes) > 0 {
				shouldSkipList := parent != nil && (ast.IsVariableDeclarationList(parent) || ast.IsTemplateExpression(parent))

				if !shouldSkipList {
					start := astnav.GetStartOfNode(nodes.Nodes[0], sourceFile, false)
					end := nodes.Nodes[len(nodes.Nodes)-1].End()

					if start <= pos && pos < end {
						result = pushSelectionRange(result, start, end)
					}
				}
			}
			return v.VisitNodes(nodes)
		}

		// Visit JSDoc nodes first if they exist
		for _, jsdoc := range current.JSDoc(sourceFile) {
			visit(jsdoc)
		}

		tempVisitor := ast.NewNodeVisitor(visit, nil, ast.NodeVisitorHooks{
			VisitNodes: visitNodes,
		})

		current.VisitEachChild(tempVisitor)
		current = next
	}
	return result
}
