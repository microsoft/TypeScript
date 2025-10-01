package format

import (
	"context"
	"math"
	"slices"
	"strings"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

/** find node that fully contains given text range */
func findEnclosingNode(r core.TextRange, sourceFile *ast.SourceFile) *ast.Node {
	var find func(*ast.Node) *ast.Node
	find = func(n *ast.Node) *ast.Node {
		var candidate *ast.Node
		n.ForEachChild(func(c *ast.Node) bool {
			if r.ContainedBy(withTokenStart(c, sourceFile)) {
				candidate = c
				return true
			}
			return false
		})
		if candidate != nil {
			result := find(candidate)
			if result != nil {
				return result
			}
		}

		return n
	}
	return find(sourceFile.AsNode())
}

/**
 * Start of the original range might fall inside the comment - scanner will not yield appropriate results
 * This function will look for token that is located before the start of target range
 * and return its end as start position for the scanner.
 */
func getScanStartPosition(enclosingNode *ast.Node, originalRange core.TextRange, sourceFile *ast.SourceFile) int {
	adjusted := withTokenStart(enclosingNode, sourceFile)
	start := adjusted.Pos()
	if start == originalRange.Pos() && enclosingNode.End() == originalRange.End() {
		return start
	}

	precedingToken := astnav.FindPrecedingToken(sourceFile, originalRange.Pos())
	if precedingToken == nil {
		// no preceding token found - start from the beginning of enclosing node
		return enclosingNode.Pos()
	}

	// preceding token ends after the start of original range (i.e when originalRange.pos falls in the middle of literal)
	// start from the beginning of enclosingNode to handle the entire 'originalRange'
	if precedingToken.End() >= originalRange.Pos() {
		return enclosingNode.Pos()
	}

	return precedingToken.End()
}

/*
 * For cases like
 * if (a ||
 *     b ||$
 *     c) {...}
 * If we hit Enter at $ we want line '    b ||' to be indented.
 * Formatting will be applied to the last two lines.
 * Node that fully encloses these lines is binary expression 'a ||...'.
 * Initial indentation for this node will be 0.
 * Binary expressions don't introduce new indentation scopes, however it is possible
 * that some parent node on the same line does - like if statement in this case.
 * Note that we are considering parents only from the same line with initial node -
 * if parent is on the different line - its delta was already contributed
 * to the initial indentation.
 */
func getOwnOrInheritedDelta(n *ast.Node, options *FormatCodeSettings, sourceFile *ast.SourceFile) int {
	previousLine := -1
	var child *ast.Node
	for n != nil {
		line, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, withTokenStart(n, sourceFile).Pos())
		if previousLine != -1 && line != previousLine {
			break
		}

		if ShouldIndentChildNode(options, n, child, sourceFile) {
			return options.IndentSize // !!! nil check???
		}

		previousLine = line
		child = n
		n = n.Parent
	}
	return 0
}

func rangeHasNoErrors(_ core.TextRange) bool {
	return false
}

func prepareRangeContainsErrorFunction(errors []*ast.Diagnostic, originalRange core.TextRange) func(r core.TextRange) bool {
	if len(errors) == 0 {
		return rangeHasNoErrors
	}

	// pick only errors that fall in range
	sorted := core.Filter(errors, func(d *ast.Diagnostic) bool {
		return originalRange.Overlaps(d.Loc())
	})
	if len(sorted) == 0 {
		return rangeHasNoErrors
	}
	slices.SortStableFunc(sorted, func(a *ast.Diagnostic, b *ast.Diagnostic) int { return a.Pos() - b.Pos() })

	index := 0
	return func(r core.TextRange) bool {
		// in current implementation sequence of arguments [r1, r2...] is monotonically increasing.
		// 'index' tracks the index of the most recent error that was checked.
		for true {
			if index >= len(sorted) {
				// all errors in the range were already checked -> no error in specified range
				return false
			}

			err := sorted[index]

			if r.End() <= err.Pos() {
				// specified range ends before the error referred by 'index' - no error in range
				return false
			}

			if r.Overlaps(err.Loc()) {
				// specified range overlaps with error range
				return true
			}

			index++
		}
		return false // unreachable
	}
}

type formatSpanWorker struct {
	originalRange      core.TextRange
	enclosingNode      *ast.Node
	initialIndentation int
	delta              int
	requestKind        FormatRequestKind
	rangeContainsError func(r core.TextRange) bool
	sourceFile         *ast.SourceFile

	ctx context.Context

	formattingScanner *formattingScanner
	formattingContext *formattingContext

	edits                  []core.TextChange
	previousRange          TextRangeWithKind
	previousRangeTriviaEnd int
	previousParent         *ast.Node
	previousRangeStartLine int

	childContextNode              *ast.Node
	lastIndentedLine              int
	indentationOnLastIndentedLine int

	visitor                          *ast.NodeVisitor
	visitingNode                     *ast.Node
	visitingIndenter                 *dynamicIndenter
	visitingNodeStartLine            int
	visitingUndecoratedNodeStartLine int

	currentRules []*ruleImpl
}

func newFormatSpanWorker(
	ctx context.Context,
	originalRange core.TextRange,
	enclosingNode *ast.Node,
	initialIndentation int,
	delta int,
	requestKind FormatRequestKind,
	rangeContainsError func(r core.TextRange) bool,
	sourceFile *ast.SourceFile,
) *formatSpanWorker {
	return &formatSpanWorker{
		ctx:                ctx,
		originalRange:      originalRange,
		enclosingNode:      enclosingNode,
		initialIndentation: initialIndentation,
		delta:              delta,
		requestKind:        requestKind,
		rangeContainsError: rangeContainsError,
		sourceFile:         sourceFile,
		currentRules:       make([]*ruleImpl, 0, 32), // increaseInsertionIndex should assert there are no more than 32 rules in a given bucket
	}
}

func getNonDecoratorTokenPosOfNode(node *ast.Node, file *ast.SourceFile) int {
	var lastDecorator *ast.Node
	if ast.HasDecorators(node) {
		lastDecorator = core.FindLast(node.Modifiers().Nodes, ast.IsDecorator)
	}
	if file == nil {
		file = ast.GetSourceFileOfNode(node)
	}
	if lastDecorator == nil {
		return withTokenStart(node, file).Pos()
	}
	return scanner.SkipTrivia(file.Text(), lastDecorator.End())
}

func (w *formatSpanWorker) execute(s *formattingScanner) []core.TextChange {
	w.formattingScanner = s
	w.indentationOnLastIndentedLine = -1
	opt := GetFormatCodeSettingsFromContext(w.ctx)
	w.formattingContext = NewFormattingContext(w.sourceFile, w.requestKind, opt)
	// formatting context is used by rules provider
	w.visitor = ast.NewNodeVisitor(func(child *ast.Node) *ast.Node {
		if child == nil {
			return child
		}
		w.processChildNode(w.visitingNode, w.visitingIndenter, w.visitingNodeStartLine, w.visitingUndecoratedNodeStartLine, child, -1, w.visitingNode, w.visitingIndenter, w.visitingNodeStartLine, w.visitingUndecoratedNodeStartLine, false, false)
		return child
	}, &ast.NodeFactory{}, ast.NodeVisitorHooks{
		VisitNodes: func(nodes *ast.NodeList, v *ast.NodeVisitor) *ast.NodeList {
			if nodes == nil {
				return nodes
			}
			w.processChildNodes(w.visitingNode, w.visitingIndenter, w.visitingNodeStartLine, w.visitingUndecoratedNodeStartLine, nodes, w.visitingNode, w.visitingNodeStartLine, w.visitingIndenter)
			return nodes
		},
	})

	w.formattingScanner.advance()

	if w.formattingScanner.isOnToken() {
		startLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, withTokenStart(w.enclosingNode, w.sourceFile).Pos())
		undecoratedStartLine := startLine
		if ast.HasDecorators(w.enclosingNode) {
			undecoratedStartLine, _ = scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, getNonDecoratorTokenPosOfNode(w.enclosingNode, w.sourceFile))
		}

		w.processNode(w.enclosingNode, w.enclosingNode, startLine, undecoratedStartLine, w.initialIndentation, w.delta)
	}

	// Leading trivia items get attached to and processed with the token that proceeds them. If the
	// range ends in the middle of some leading trivia, the token that proceeds them won't be in the
	// range and thus won't get processed. So we process those remaining trivia items here.
	remainingTrivia := w.formattingScanner.getCurrentLeadingTrivia()
	if len(remainingTrivia) > 0 {
		indentation := w.initialIndentation
		if NodeWillIndentChild(w.formattingContext.Options, w.enclosingNode, nil, w.sourceFile, false) {
			indentation += opt.IndentSize // !!! TODO: nil check???
		}

		w.indentTriviaItems(remainingTrivia, indentation, true, func(item TextRangeWithKind) {
			startLine, startChar := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, item.Loc.Pos())
			w.processRange(item, startLine, startChar, w.enclosingNode, w.enclosingNode, nil)
			w.insertIndentation(item.Loc.Pos(), indentation, false)
		})

		if opt.TrimTrailingWhitespace != false {
			w.trimTrailingWhitespacesForRemainingRange(remainingTrivia)
		}
	}

	if w.previousRange != NewTextRangeWithKind(0, 0, 0) && w.formattingScanner.getTokenFullStart() >= w.originalRange.End() {
		// Formatting edits happen by looking at pairs of contiguous tokens (see `processPair`),
		// typically inserting or deleting whitespace between them. The recursive `processNode`
		// logic above bails out as soon as it encounters a token that is beyond the end of the
		// range we're supposed to format (or if we reach the end of the file). But this potentially
		// leaves out an edit that would occur *inside* the requested range but cannot be discovered
		// without looking at one token *beyond* the end of the range: consider the line `x = { }`
		// with a selection from the beginning of the line to the space inside the curly braces,
		// inclusive. We would expect a format-selection would delete the space (if rules apply),
		// but in order to do that, we need to process the pair ["{", "}"], but we stopped processing
		// just before getting there. This block handles this trailing edit.
		var tokenInfo TextRangeWithKind
		if w.formattingScanner.isOnEOF() {
			tokenInfo = w.formattingScanner.readEOFTokenRange()
		} else if w.formattingScanner.isOnToken() {
			tokenInfo = w.formattingScanner.readTokenInfo(w.enclosingNode).token
		}

		if tokenInfo.Loc.Pos() == w.previousRangeTriviaEnd {
			// We need to check that tokenInfo and previousRange are contiguous: the `originalRange`
			// may have ended in the middle of a token, which means we will have stopped formatting
			// on that token, leaving `previousRange` pointing to the token before it, but already
			// having moved the formatting scanner (where we just got `tokenInfo`) to the next token.
			// If this happens, our supposed pair [previousRange, tokenInfo] actually straddles the
			// token that intersects the end of the range we're supposed to format, so the pair will
			// produce bogus edits if we try to `processPair`. Recall that the point of this logic is
			// to perform a trailing edit at the end of the selection range: but there can be no valid
			// edit in the middle of a token where the range ended, so if we have a non-contiguous
			// pair here, we're already done and we can ignore it.
			parent := astnav.FindPrecedingToken(w.sourceFile, tokenInfo.Loc.End())
			if parent == nil {
				parent = w.previousParent
			}
			line, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, tokenInfo.Loc.Pos())
			w.processPair(
				tokenInfo,
				line,
				parent,
				w.previousRange,
				w.previousRangeStartLine,
				w.previousParent,
				parent,
				nil,
			)
		}
	}

	return w.edits
}

func (w *formatSpanWorker) processChildNode(
	node *ast.Node,
	indenter *dynamicIndenter,
	nodeStartLine int,
	undecoratedNodeStartLine int,
	child *ast.Node,
	inheritedIndentation int,
	parent *ast.Node,
	parentDynamicIndentation *dynamicIndenter,
	parentStartLine int,
	undecoratedParentStartLine int,
	isListItem bool,
	isFirstListItem bool,
) int {
	debug.Assert(!ast.NodeIsSynthesized(child))

	if ast.NodeIsMissing(child) || isGrammarError(parent, child) {
		return inheritedIndentation
	}

	childStartPos := scanner.GetTokenPosOfNode(child, w.sourceFile, false)
	childStartLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, childStartPos)

	undecoratedChildStartLine := childStartLine
	if ast.HasDecorators(child) {
		undecoratedChildStartLine, _ = scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, getNonDecoratorTokenPosOfNode(child, w.sourceFile))
	}

	// if child is a list item - try to get its indentation, only if parent is within the original range.
	childIndentationAmount := -1

	if isListItem && parent.Loc.ContainedBy(w.originalRange) {
		childIndentationAmount = w.tryComputeIndentationForListItem(childStartPos, child.End(), parentStartLine, w.originalRange, inheritedIndentation)
		if childIndentationAmount != -1 {
			inheritedIndentation = childIndentationAmount
		}
	}

	// child node is outside the target range - do not dive inside
	if !w.originalRange.Overlaps(child.Loc) {
		if child.End() < w.originalRange.Pos() {
			w.formattingScanner.skipToEndOf(&child.Loc)
		}
		return inheritedIndentation
	}

	if child.Loc.Len() == 0 {
		return inheritedIndentation
	}

	for w.formattingScanner.isOnToken() && w.formattingScanner.getTokenFullStart() < w.originalRange.End() {
		// proceed any parent tokens that are located prior to child.getStart()
		tokenInfo := w.formattingScanner.readTokenInfo(node)
		if tokenInfo.token.Loc.End() > w.originalRange.End() {
			return inheritedIndentation
		}
		if tokenInfo.token.Loc.End() > childStartPos {
			if tokenInfo.token.Loc.Pos() > childStartPos {
				w.formattingScanner.skipToStartOf(&child.Loc)
			}
			// stop when formatting scanner advances past the beginning of the child
			break
		}

		w.consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, node, false)
	}

	if !w.formattingScanner.isOnToken() || w.formattingScanner.getTokenFullStart() >= w.originalRange.End() {
		return inheritedIndentation
	}

	if ast.IsTokenKind(child.Kind) {
		// if child node is a token, it does not impact indentation, proceed it using parent indentation scope rules
		tokenInfo := w.formattingScanner.readTokenInfo(child)
		// JSX text shouldn't affect indenting
		if child.Kind != ast.KindJsxText {
			debug.Assert(tokenInfo.token.Loc.End() == child.Loc.End(), "Token end is child end")
			w.consumeTokenAndAdvanceScanner(tokenInfo, node, parentDynamicIndentation, child, false)
			return inheritedIndentation
		}
	}

	effectiveParentStartLine := undecoratedParentStartLine
	if child.Kind == ast.KindDecorator {
		effectiveParentStartLine = childStartLine
	}
	childIndentation, delta := w.computeIndentation(child, childStartLine, childIndentationAmount, node, parentDynamicIndentation, effectiveParentStartLine)

	w.processNode(child, w.childContextNode, childStartLine, undecoratedChildStartLine, childIndentation, delta)

	w.childContextNode = node

	if isFirstListItem && parent.Kind == ast.KindArrayLiteralExpression && inheritedIndentation == -1 {
		inheritedIndentation = childIndentation
	}

	return inheritedIndentation
}

func (w *formatSpanWorker) processChildNodes(
	node *ast.Node,
	indenter *dynamicIndenter,
	nodeStartLine int,
	undecoratedNodeStartLine int,
	nodes *ast.NodeList,
	parent *ast.Node,
	parentStartLine int,
	parentDynamicIndentation *dynamicIndenter,
) {
	debug.AssertIsDefined(nodes)
	debug.Assert(!ast.PositionIsSynthesized(nodes.Pos()))
	debug.Assert(!ast.PositionIsSynthesized(nodes.End()))

	listStartToken := getOpenTokenForList(parent, nodes)

	listDynamicIndentation := parentDynamicIndentation
	startLine := parentStartLine

	// node range is outside the target range - do not dive inside
	if !w.originalRange.Overlaps(nodes.Loc) {
		if nodes.End() < w.originalRange.Pos() {
			w.formattingScanner.skipToEndOf(&nodes.Loc)
		}
		return
	}

	if listStartToken != -1 {
		// introduce a new indentation scope for lists (including list start and end tokens)
		for w.formattingScanner.isOnToken() && w.formattingScanner.getTokenFullStart() < w.originalRange.End() {
			tokenInfo := w.formattingScanner.readTokenInfo(parent)
			if tokenInfo.token.Loc.End() > nodes.Pos() {
				// stop when formatting scanner moves past the beginning of node list
				break
			} else if tokenInfo.token.Kind == listStartToken {
				// consume list start token
				startLine, _ = scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, tokenInfo.token.Loc.Pos())

				w.consumeTokenAndAdvanceScanner(tokenInfo, parent, parentDynamicIndentation, parent, false)

				indentationOnListStartToken := 0
				if w.indentationOnLastIndentedLine != -1 {
					// scanner just processed list start token so consider last indentation as list indentation
					// function foo(): { // last indentation was 0, list item will be indented based on this value
					//   foo: number;
					// }: {};
					indentationOnListStartToken = w.indentationOnLastIndentedLine
				} else {
					startLinePosition := GetLineStartPositionForPosition(tokenInfo.token.Loc.Pos(), w.sourceFile)
					indentationOnListStartToken = FindFirstNonWhitespaceColumn(startLinePosition, tokenInfo.token.Loc.Pos(), w.sourceFile, w.formattingContext.Options)
				}

				listDynamicIndentation = w.getDynamicIndentation(parent, parentStartLine, indentationOnListStartToken, w.formattingContext.Options.IndentSize)
			} else {
				// consume any tokens that precede the list as child elements of 'node' using its indentation scope
				w.consumeTokenAndAdvanceScanner(tokenInfo, parent, parentDynamicIndentation, parent, false)
			}
		}
	}

	inheritedIndentation := -1
	for i := range len(nodes.Nodes) {
		child := nodes.Nodes[i]
		inheritedIndentation = w.processChildNode(node, indenter, nodeStartLine, undecoratedNodeStartLine, child, inheritedIndentation, node, listDynamicIndentation, startLine, startLine, true, i == 0)
	}

	listEndToken := getCloseTokenForOpenToken(listStartToken)
	if listEndToken != ast.KindUnknown && w.formattingScanner.isOnToken() && w.formattingScanner.getTokenFullStart() < w.originalRange.End() {
		tokenInfo := w.formattingScanner.readTokenInfo(parent)
		if tokenInfo.token.Kind == ast.KindCommaToken {
			// consume the comma
			w.consumeTokenAndAdvanceScanner(tokenInfo, parent, listDynamicIndentation, parent, false)
			if w.formattingScanner.isOnToken() {
				tokenInfo = w.formattingScanner.readTokenInfo(parent)
			} else {
				return
			}
		}

		// consume the list end token only if it is still belong to the parent
		// there might be the case when current token matches end token but does not considered as one
		// function (x: function) <--
		// without this check close paren will be interpreted as list end token for function expression which is wrong
		if tokenInfo.token.Kind == listEndToken && tokenInfo.token.Loc.ContainedBy(parent.Loc) {
			// consume list end token
			w.consumeTokenAndAdvanceScanner(tokenInfo, parent, listDynamicIndentation, parent /*isListEndToken*/, true)
		}
	}
}

func (w *formatSpanWorker) executeProcessNodeVisitor(node *ast.Node, indenter *dynamicIndenter, nodeStartLine int, undecoratedNodeStartLine int) {
	oldNode := w.visitingNode
	oldIndenter := w.visitingIndenter
	oldStart := w.visitingNodeStartLine
	oldUndecoratedStart := w.visitingUndecoratedNodeStartLine
	w.visitingNode = node
	w.visitingIndenter = indenter
	w.visitingNodeStartLine = nodeStartLine
	w.visitingUndecoratedNodeStartLine = undecoratedNodeStartLine
	node.VisitEachChild(w.visitor)
	w.visitingNode = oldNode
	w.visitingIndenter = oldIndenter
	w.visitingNodeStartLine = oldStart
	w.visitingUndecoratedNodeStartLine = oldUndecoratedStart
}

func (w *formatSpanWorker) computeIndentation(node *ast.Node, startLine int, inheritedIndentation int, parent *ast.Node, parentDynamicIndentation *dynamicIndenter, effectiveParentStartLine int) (indentation int, delta int) {
	delta = 0
	if ShouldIndentChildNode(w.formattingContext.Options, node, nil, nil) {
		delta = w.formattingContext.Options.IndentSize
	}

	if effectiveParentStartLine == startLine {
		// if node is located on the same line with the parent
		// - inherit indentation from the parent
		// - push children if either parent of node itself has non-zero delta
		indentation = w.indentationOnLastIndentedLine
		if startLine != w.lastIndentedLine {
			indentation = parentDynamicIndentation.getIndentation()
		}
		delta = min(w.formattingContext.Options.IndentSize, parentDynamicIndentation.getDelta(node)+delta)
		return indentation, delta
	} else if inheritedIndentation == -1 {
		if node.Kind == ast.KindOpenParenToken && startLine == w.lastIndentedLine {
			// the is used for chaining methods formatting
			// - we need to get the indentation on last line and the delta of parent
			return w.indentationOnLastIndentedLine, parentDynamicIndentation.getDelta(node)
		} else if childStartsOnTheSameLineWithElseInIfStatement(parent, node, startLine, w.sourceFile) ||
			childIsUnindentedBranchOfConditionalExpression(parent, node, startLine, w.sourceFile) ||
			argumentStartsOnSameLineAsPreviousArgument(parent, node, startLine, w.sourceFile) {
			return parentDynamicIndentation.getIndentation(), delta
		} else {
			i := parentDynamicIndentation.getIndentation()
			if i == -1 {
				return parentDynamicIndentation.getIndentation(), delta
			}
			return i + parentDynamicIndentation.getDelta(node), delta
		}
	}

	return inheritedIndentation, delta
}

/** Tries to compute the indentation for a list element.
* If list element is not in range then
* function will pick its actual indentation
* so it can be pushed downstream as inherited indentation.
* If list element is in the range - its indentation will be equal
* to inherited indentation from its predecessors.
 */
func (w *formatSpanWorker) tryComputeIndentationForListItem(startPos int, endPos int, parentStartLine int, r core.TextRange, inheritedIndentation int) int {
	r2 := core.NewTextRange(startPos, endPos)
	if r.Overlaps(r2) || r2.ContainedBy(r) { /* Not to miss zero-range nodes e.g. JsxText */
		if inheritedIndentation != -1 {
			return inheritedIndentation
		}
	} else {
		startLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, startPos)
		startLinePosition := GetLineStartPositionForPosition(startPos, w.sourceFile)
		column := FindFirstNonWhitespaceColumn(startLinePosition, startPos, w.sourceFile, w.formattingContext.Options)
		if startLine != parentStartLine || startPos == column {
			// Use the base indent size if it is greater than
			// the indentation of the inherited predecessor.
			baseIndentSize := w.formattingContext.Options.BaseIndentSize
			if baseIndentSize > column {
				return baseIndentSize
			}
			return column
		}
	}
	return -1
}

func (w *formatSpanWorker) processNode(node *ast.Node, contextNode *ast.Node, nodeStartLine int, undecoratedNodeStartLine int, indentation int, delta int) {
	if !w.originalRange.Overlaps(withTokenStart(node, w.sourceFile)) {
		return
	}

	nodeDynamicIndentation := w.getDynamicIndentation(node, nodeStartLine, indentation, delta)

	// a useful observations when tracking context node
	//        /
	//      [a]
	//   /   |   \
	//  [b] [c] [d]
	// node 'a' is a context node for nodes 'b', 'c', 'd'
	// except for the leftmost leaf token in [b] - in this case context node ('e') is located somewhere above 'a'
	// this rule can be applied recursively to child nodes of 'a'.
	//
	// context node is set to parent node value after processing every child node
	// context node is set to parent of the token after processing every token

	w.childContextNode = contextNode

	// if there are any tokens that logically belong to node and interleave child nodes
	// such tokens will be consumed in processChildNode for the child that follows them
	w.executeProcessNodeVisitor(node, nodeDynamicIndentation, nodeStartLine, undecoratedNodeStartLine)

	// proceed any tokens in the node that are located after child nodes
	for w.formattingScanner.isOnToken() && w.formattingScanner.getTokenFullStart() < w.originalRange.End() {
		tokenInfo := w.formattingScanner.readTokenInfo(node)
		if tokenInfo.token.Loc.End() > min(node.End(), w.originalRange.End()) {
			break
		}
		w.consumeTokenAndAdvanceScanner(tokenInfo, node, nodeDynamicIndentation, node, false)
	}
}

func (w *formatSpanWorker) processPair(currentItem TextRangeWithKind, currentStartLine int, currentParent *ast.Node, previousItem TextRangeWithKind, previousStartLine int, previousParent *ast.Node, contextNode *ast.Node, dynamicIndentation *dynamicIndenter) LineAction {
	w.formattingContext.UpdateContext(previousItem, previousParent, currentItem, currentParent, contextNode)

	w.currentRules = w.currentRules[:0]
	w.currentRules = getRules(w.formattingContext, w.currentRules)

	trimTrailingWhitespaces := w.formattingContext.Options.TrimTrailingWhitespace != false
	lineAction := LineActionNone

	if len(w.currentRules) > 0 {
		// Apply rules in reverse order so that higher priority rules (which are first in the array)
		// win in a conflict with lower priority rules.
		for i := len(w.currentRules) - 1; i >= 0; i-- {
			rule := w.currentRules[i]
			lineAction = w.applyRuleEdits(rule, previousItem, previousStartLine, currentItem, currentStartLine)
			if dynamicIndentation != nil {
				switch lineAction {
				case LineActionLineRemoved:
					// Handle the case where the next line is moved to be the end of this line.
					// In this case we don't indent the next line in the next pass.
					if scanner.GetTokenPosOfNode(currentParent, w.sourceFile, false) == currentItem.Loc.Pos() {
						dynamicIndentation.recomputeIndentation( /*lineAddedByFormatting*/ false, contextNode)
					}
				case LineActionLineAdded:
					// Handle the case where token2 is moved to the new line.
					// In this case we indent token2 in the next pass but we set
					// sameLineIndent flag to notify the indenter that the indentation is within the line.
					if scanner.GetTokenPosOfNode(currentParent, w.sourceFile, false) == currentItem.Loc.Pos() {
						dynamicIndentation.recomputeIndentation( /*lineAddedByFormatting*/ true, contextNode)
					}
				default:
					debug.Assert(lineAction == LineActionNone)
				}
			}

			// We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
			trimTrailingWhitespaces = trimTrailingWhitespaces && (rule.Action()&ruleActionDeleteSpace == 0) && rule.Flags() != ruleFlagsCanDeleteNewLines
		}
	} else {
		trimTrailingWhitespaces = trimTrailingWhitespaces && currentItem.Kind != ast.KindEndOfFile
	}

	if currentStartLine != previousStartLine && trimTrailingWhitespaces {
		// We need to trim trailing whitespace between the tokens if they were on different lines, and no rule was applied to put them on the same line
		w.trimTrailingWhitespacesForLines(previousStartLine, currentStartLine, previousItem)
	}

	return lineAction
}

func (w *formatSpanWorker) applyRuleEdits(rule *ruleImpl, previousRange TextRangeWithKind, previousStartLine int, currentRange TextRangeWithKind, currentStartLine int) LineAction {
	onLaterLine := currentStartLine != previousStartLine
	switch rule.Action() {
	case ruleActionStopProcessingSpaceActions:
		// no action required
		return LineActionNone
	case ruleActionDeleteSpace:
		if previousRange.Loc.End() != currentRange.Loc.Pos() {
			// delete characters starting from t1.end up to t2.pos exclusive
			w.recordDelete(previousRange.Loc.End(), currentRange.Loc.Pos()-previousRange.Loc.End())
			if onLaterLine {
				return LineActionLineRemoved
			}
			return LineActionNone
		}
	case ruleActionDeleteToken:
		w.recordDelete(previousRange.Loc.Pos(), previousRange.Loc.Len())
	case ruleActionInsertNewLine:
		// exit early if we on different lines and rule cannot change number of newlines
		// if line1 and line2 are on subsequent lines then no edits are required - ok to exit
		// if line1 and line2 are separated with more than one newline - ok to exit since we cannot delete extra new lines
		if rule.Flags() != ruleFlagsCanDeleteNewLines && previousStartLine != currentStartLine {
			return LineActionNone
		}

		// edit should not be applied if we have one line feed between elements
		lineDelta := currentStartLine - previousStartLine
		if lineDelta != 1 {
			w.recordReplace(previousRange.Loc.End(), currentRange.Loc.Pos()-previousRange.Loc.End(), GetNewLineOrDefaultFromContext(w.ctx))
			if onLaterLine {
				return LineActionNone
			}
			return LineActionLineAdded
		}
	case ruleActionInsertSpace:
		// exit early if we on different lines and rule cannot change number of newlines
		if rule.Flags() != ruleFlagsCanDeleteNewLines && previousStartLine != currentStartLine {
			return LineActionNone
		}

		posDelta := currentRange.Loc.Pos() - previousRange.Loc.End()
		if posDelta != 1 || !strings.HasPrefix(w.sourceFile.Text()[previousRange.Loc.End():], " ") {
			w.recordReplace(previousRange.Loc.End(), posDelta, " ")
			if onLaterLine {
				return LineActionLineRemoved
			}
			return LineActionNone
		}
	case ruleActionInsertTrailingSemicolon:
		w.recordInsert(previousRange.Loc.End(), ";")
	}
	return LineActionNone
}

type LineAction int

const (
	LineActionNone LineAction = iota
	LineActionLineAdded
	LineActionLineRemoved
)

func (w *formatSpanWorker) processRange(r TextRangeWithKind, rangeStartLine int, rangeStartCharacter int, parent *ast.Node, contextNode *ast.Node, dynamicIndentation *dynamicIndenter) LineAction {
	rangeHasError := w.rangeContainsError(r.Loc)
	lineAction := LineActionNone
	if !rangeHasError {
		if w.previousRange == NewTextRangeWithKind(0, 0, 0) {
			// trim whitespaces starting from the beginning of the span up to the current line
			originalStartLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, w.originalRange.Pos())
			w.trimTrailingWhitespacesForLines(originalStartLine, rangeStartLine, NewTextRangeWithKind(0, 0, 0))
		} else {
			lineAction = w.processPair(r, rangeStartLine, parent, w.previousRange, w.previousRangeStartLine, w.previousParent, contextNode, dynamicIndentation)
		}
	}

	w.previousRange = r
	w.previousRangeTriviaEnd = r.Loc.End()
	w.previousParent = parent
	w.previousRangeStartLine = rangeStartLine

	return lineAction
}

func (w *formatSpanWorker) processTrivia(trivia []TextRangeWithKind, parent *ast.Node, contextNode *ast.Node, dynamicIndentation *dynamicIndenter) {
	for _, triviaItem := range trivia {
		if isComment(triviaItem.Kind) && triviaItem.Loc.ContainedBy(w.originalRange) {
			triviaItemStartLine, triviaItemStartCharacter := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, triviaItem.Loc.Pos())
			w.processRange(triviaItem, triviaItemStartLine, triviaItemStartCharacter, parent, contextNode, dynamicIndentation)
		}
	}
}

/**
* Trimming will be done for lines after the previous range.
* Exclude comments as they had been previously processed.
 */
func (w *formatSpanWorker) trimTrailingWhitespacesForRemainingRange(trivias []TextRangeWithKind) {
	startPos := w.originalRange.Pos()
	if w.previousRange != NewTextRangeWithKind(0, 0, 0) {
		startPos = w.previousRange.Loc.End()
	}

	for _, trivia := range trivias {
		if isComment(trivia.Kind) {
			if startPos < trivia.Loc.Pos() {
				w.trimTrailingWitespacesForPositions(startPos, trivia.Loc.Pos()-1, w.previousRange)
			}

			startPos = trivia.Loc.End() + 1
		}
	}

	if startPos < w.originalRange.End() {
		w.trimTrailingWitespacesForPositions(startPos, w.originalRange.End(), w.previousRange)
	}
}

func (w *formatSpanWorker) trimTrailingWitespacesForPositions(startPos int, endPos int, previousRange TextRangeWithKind) {
	startLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, startPos)
	endLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, endPos)

	w.trimTrailingWhitespacesForLines(startLine, endLine+1, previousRange)
}

func (w *formatSpanWorker) trimTrailingWhitespacesForLines(line1 int, line2 int, r TextRangeWithKind) {
	lineStarts := scanner.GetECMALineStarts(w.sourceFile)
	for line := line1; line < line2; line++ {
		lineStartPosition := int(lineStarts[line])
		lineEndPosition := scanner.GetECMAEndLinePosition(w.sourceFile, line)

		// do not trim whitespaces in comments or template expression
		if r != NewTextRangeWithKind(0, 0, 0) && (isComment(r.Kind) || isStringOrRegularExpressionOrTemplateLiteral(r.Kind)) && r.Loc.Pos() <= lineEndPosition && r.Loc.End() > lineEndPosition {
			continue
		}

		whitespaceStart := w.getTrailingWhitespaceStartPosition(lineStartPosition, lineEndPosition)
		if whitespaceStart != -1 {
			r, _ := utf8.DecodeRuneInString(w.sourceFile.Text()[whitespaceStart-1:])
			debug.Assert(whitespaceStart == lineStartPosition || !stringutil.IsWhiteSpaceSingleLine(r))
			w.recordDelete(whitespaceStart, lineEndPosition+1-whitespaceStart)
		}
	}
}

/**
* @param start The position of the first character in range
* @param end The position of the last character in range
 */
func (w *formatSpanWorker) getTrailingWhitespaceStartPosition(start int, end int) int {
	pos := end
	text := w.sourceFile.Text()
	for pos >= start {
		ch, size := utf8.DecodeRuneInString(text[pos:])
		if size == 0 {
			pos-- // multibyte character, rewind more
			continue
		}
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			break
		}
		pos--
	}
	if pos != end {
		return pos + 1
	}
	return -1
}

func isStringOrRegularExpressionOrTemplateLiteral(kind ast.Kind) bool {
	return kind == ast.KindStringLiteral || kind == ast.KindRegularExpressionLiteral || ast.IsTemplateLiteralKind(kind)
}

func isComment(kind ast.Kind) bool {
	return kind == ast.KindSingleLineCommentTrivia || kind == ast.KindMultiLineCommentTrivia
}

func (w *formatSpanWorker) insertIndentation(pos int, indentation int, lineAdded bool) {
	indentationString := getIndentationString(indentation, w.formattingContext.Options)
	if lineAdded {
		// new line is added before the token by the formatting rules
		// insert indentation string at the very beginning of the token
		w.recordReplace(pos, 0, indentationString)
	} else {
		tokenStartLine, tokenStartCharacter := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, pos)
		startLinePosition := int(scanner.GetECMALineStarts(w.sourceFile)[tokenStartLine])
		if indentation != w.characterToColumn(startLinePosition, tokenStartCharacter) || w.indentationIsDifferent(indentationString, startLinePosition) {
			w.recordReplace(startLinePosition, tokenStartCharacter, indentationString)
		}
	}
}

func (w *formatSpanWorker) characterToColumn(startLinePosition int, characterInLine int) int {
	column := 0
	for i := range characterInLine {
		if w.sourceFile.Text()[startLinePosition+i] == '\t' {
			column += w.formattingContext.Options.TabSize - (column % w.formattingContext.Options.TabSize)
		} else {
			column++
		}
	}
	return column
}

func (w *formatSpanWorker) indentationIsDifferent(indentationString string, startLinePosition int) bool {
	return indentationString != w.sourceFile.Text()[startLinePosition:startLinePosition+len(indentationString)]
}

func (w *formatSpanWorker) indentTriviaItems(trivia []TextRangeWithKind, commentIndentation int, indentNextTokenOrTrivia bool, indentSingleLine func(item TextRangeWithKind)) bool {
	for _, triviaItem := range trivia {
		triviaInRange := triviaItem.Loc.ContainedBy(w.originalRange)
		switch triviaItem.Kind {
		case ast.KindMultiLineCommentTrivia:
			if triviaInRange {
				w.indentMultilineComment(triviaItem.Loc, commentIndentation, !indentNextTokenOrTrivia, true)
			}
			indentNextTokenOrTrivia = false
		case ast.KindSingleLineCommentTrivia:
			if indentNextTokenOrTrivia && triviaInRange {
				indentSingleLine(triviaItem)
			}
			indentNextTokenOrTrivia = false
		case ast.KindNewLineTrivia:
			indentNextTokenOrTrivia = true
		}
	}
	return indentNextTokenOrTrivia
}

func (w *formatSpanWorker) indentMultilineComment(commentRange core.TextRange, indentation int, firstLineIsIndented bool, indentFinalLine bool) {
	// split comment in lines
	startLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, commentRange.Pos())
	endLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, commentRange.End())

	if startLine == endLine {
		if !firstLineIsIndented {
			// treat as single line comment
			w.insertIndentation(commentRange.Pos(), indentation, false)
		}
		return
	}

	parts := make([]core.TextRange, 0, strings.Count(w.sourceFile.Text()[commentRange.Pos():commentRange.End()], "\n"))
	startPos := commentRange.Pos()
	for line := startLine; line < endLine; line++ {
		endOfLine := scanner.GetECMAEndLinePosition(w.sourceFile, line)
		parts = append(parts, core.NewTextRange(startPos, endOfLine))
		startPos = int(scanner.GetECMALineStarts(w.sourceFile)[line+1])
	}

	if indentFinalLine {
		parts = append(parts, core.NewTextRange(startPos, commentRange.End()))
	}

	if len(parts) == 0 {
		return
	}

	startLinePos := int(scanner.GetECMALineStarts(w.sourceFile)[startLine])

	nonWhitespaceInFirstPartCharacter, nonWhitespaceInFirstPartColumn := findFirstNonWhitespaceCharacterAndColumn(startLinePos, parts[0].Pos(), w.sourceFile, w.formattingContext.Options)

	startIndex := 0

	if firstLineIsIndented {
		startIndex = 1
		startLine++
	}

	// shift all parts on the delta size
	delta := indentation - nonWhitespaceInFirstPartColumn
	for i := startIndex; i < len(parts); i++ {
		startLinePos := int(scanner.GetECMALineStarts(w.sourceFile)[startLine])
		nonWhitespaceCharacter := nonWhitespaceInFirstPartCharacter
		nonWhitespaceColumn := nonWhitespaceInFirstPartColumn
		if i != 0 {
			nonWhitespaceCharacter, nonWhitespaceColumn = findFirstNonWhitespaceCharacterAndColumn(parts[i].Pos(), parts[i].End(), w.sourceFile, w.formattingContext.Options)
		}
		newIndentation := nonWhitespaceColumn + delta
		if newIndentation > 0 {
			indentationString := getIndentationString(newIndentation, w.formattingContext.Options)
			w.recordReplace(startLinePos, nonWhitespaceCharacter, indentationString)
		} else {
			w.recordDelete(startLinePos, nonWhitespaceCharacter)
		}

		startLine++
	}
}

func getIndentationString(indentation int, options *FormatCodeSettings) string {
	// go's `strings.Repeat` already has static, global caching for repeated tabs and spaces, so there's no need to cache here like in strada
	if !options.ConvertTabsToSpaces {
		tabs := int(math.Floor(float64(indentation) / float64(options.TabSize)))
		spaces := indentation - (tabs * options.TabSize)
		res := strings.Repeat("\t", tabs)
		if spaces > 0 {
			res = strings.Repeat(" ", spaces) + res
		}

		return res
	} else {
		return strings.Repeat(" ", indentation)
	}
}

func createTextChangeFromStartLength(start int, length int, newText string) core.TextChange {
	return core.TextChange{
		NewText:   newText,
		TextRange: core.NewTextRange(start, start+length),
	}
}

func (w *formatSpanWorker) recordDelete(start int, length int) {
	if length != 0 {
		w.edits = append(w.edits, createTextChangeFromStartLength(start, length, ""))
	}
}

func (w *formatSpanWorker) recordReplace(start int, length int, newText string) {
	if length != 0 || newText != "" {
		w.edits = append(w.edits, createTextChangeFromStartLength(start, length, newText))
	}
}

func (w *formatSpanWorker) recordInsert(start int, text string) {
	if text != "" {
		w.edits = append(w.edits, createTextChangeFromStartLength(start, 0, text))
	}
}

func (w *formatSpanWorker) consumeTokenAndAdvanceScanner(currentTokenInfo tokenInfo, parent *ast.Node, dynamicIndenation *dynamicIndenter, container *ast.Node, isListEndToken bool) {
	// assert(currentTokenInfo.token.Loc.ContainedBy(parent.Loc)) // !!!
	lastTriviaWasNewLine := w.formattingScanner.lastTrailingTriviaWasNewLine()
	indentToken := false

	if len(currentTokenInfo.leadingTrivia) > 0 {
		w.processTrivia(currentTokenInfo.leadingTrivia, parent, w.childContextNode, dynamicIndenation)
	}

	lineAction := LineActionNone
	isTokenInRange := currentTokenInfo.token.Loc.ContainedBy(w.originalRange)

	tokenStartLine, tokenStartChar := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, currentTokenInfo.token.Loc.Pos())

	if isTokenInRange {
		rangeHasError := w.rangeContainsError(currentTokenInfo.token.Loc)
		// save previousRange since processRange will overwrite this value with current one
		savePreviousRange := w.previousRange
		lineAction = w.processRange(currentTokenInfo.token, tokenStartLine, tokenStartChar, parent, w.childContextNode, dynamicIndenation)
		// do not indent comments\token if token range overlaps with some error
		if !rangeHasError {
			if lineAction == LineActionNone {
				// indent token only if end line of previous range does not match start line of the token
				if savePreviousRange != NewTextRangeWithKind(0, 0, 0) {
					prevEndLine, _ := scanner.GetECMALineAndCharacterOfPosition(w.sourceFile, savePreviousRange.Loc.End())
					indentToken = lastTriviaWasNewLine && tokenStartLine != prevEndLine
				}
			} else {
				indentToken = lineAction == LineActionLineAdded
			}
		}
	}

	if len(currentTokenInfo.trailingTrivia) > 0 {
		w.previousRangeTriviaEnd = core.LastOrNil(currentTokenInfo.trailingTrivia).Loc.End()
		w.processTrivia(currentTokenInfo.trailingTrivia, parent, w.childContextNode, dynamicIndenation)
	}

	if indentToken {
		tokenIndentation := -1
		if isTokenInRange && !w.rangeContainsError(currentTokenInfo.token.Loc) {
			tokenIndentation = dynamicIndenation.getIndentationForToken(tokenStartLine, currentTokenInfo.token.Kind, container, !!isListEndToken)
		}
		indentNextTokenOrTrivia := true
		if len(currentTokenInfo.leadingTrivia) > 0 {
			commentIndentation := dynamicIndenation.getIndentationForComment(currentTokenInfo.token.Kind, tokenIndentation, container)
			indentNextTokenOrTrivia = w.indentTriviaItems(currentTokenInfo.leadingTrivia, commentIndentation, indentNextTokenOrTrivia, func(item TextRangeWithKind) {
				w.insertIndentation(item.Loc.Pos(), commentIndentation, false)
			})
		}

		// indent token only if is it is in target range and does not overlap with any error ranges
		if tokenIndentation != -1 && indentNextTokenOrTrivia {
			w.insertIndentation(currentTokenInfo.token.Loc.Pos(), tokenIndentation, lineAction == LineActionLineAdded)

			w.lastIndentedLine = tokenStartLine
			w.indentationOnLastIndentedLine = tokenIndentation
		}
	}

	w.formattingScanner.advance()

	w.childContextNode = parent
}

type dynamicIndenter struct {
	node          *ast.Node
	nodeStartLine int
	indentation   int
	delta         int

	options    *FormatCodeSettings
	sourceFile *ast.SourceFile
}

func (i *dynamicIndenter) getIndentationForComment(kind ast.Kind, tokenIndentation int, container *ast.Node) int {
	switch kind {
	// preceding comment to the token that closes the indentation scope inherits the indentation from the scope
	// ..  {
	//     // comment
	// }
	case ast.KindCloseBraceToken, ast.KindCloseBracketToken, ast.KindCloseParenToken:
		return i.indentation + i.getDelta(container)
	}
	return i.indentation
}

// if list end token is LessThanToken '>' then its delta should be explicitly suppressed
// so that LessThanToken as a binary operator can still be indented.
// foo.then
//
//	<
//	    number,
//	    string,
//	>();
//
// vs
// var a = xValue
//
//	> yValue;
func (i *dynamicIndenter) getIndentationForToken(line int, kind ast.Kind, container *ast.Node, suppressDelta bool) int {
	if !suppressDelta && i.shouldAddDelta(line, kind, container) {
		return i.indentation + i.getDelta(container)
	}
	return i.indentation
}

func (i *dynamicIndenter) getIndentation() int {
	return i.indentation
}

func (i *dynamicIndenter) getDelta(child *ast.Node) int {
	// Delta value should be zero when the node explicitly prevents indentation of the child node
	if NodeWillIndentChild(i.options, i.node, child, i.sourceFile, true) {
		return i.delta
	}
	return 0
}

func (i *dynamicIndenter) recomputeIndentation(lineAdded bool, parent *ast.Node) {
	if ShouldIndentChildNode(i.options, parent, i.node, i.sourceFile) {
		if lineAdded {
			i.indentation += i.options.IndentSize // !!! no nil check???
		} else {
			i.indentation -= i.options.IndentSize // !!! no nil check???
		}
		if ShouldIndentChildNode(i.options, i.node, nil, nil) {
			i.delta = i.options.IndentSize
		} else {
			i.delta = 0
		}
	}
}

func (i *dynamicIndenter) shouldAddDelta(line int, kind ast.Kind, container *ast.Node) bool {
	switch kind {
	// open and close brace, 'else' and 'while' (in do statement) tokens has indentation of the parent
	case ast.KindOpenBraceToken, ast.KindCloseBraceToken, ast.KindCloseParenToken, ast.KindElseKeyword, ast.KindWhileKeyword, ast.KindAtToken:
		return false
	case ast.KindSlashToken, ast.KindGreaterThanToken:
		switch container.Kind {
		case ast.KindJsxOpeningElement, ast.KindJsxClosingElement, ast.KindJsxSelfClosingElement:
			return false
		}
		break
	case ast.KindOpenBracketToken, ast.KindCloseBracketToken:
		if container.Kind != ast.KindMappedType {
			return false
		}
		break
	}
	// if token line equals to the line of containing node (this is a first token in the node) - use node indentation
	return i.nodeStartLine != line &&
		// if this token is the first token following the list of decorators, we do not need to indent
		!(ast.HasDecorators(i.node) && kind == getFirstNonDecoratorTokenOfNode(i.node))
}

func getFirstNonDecoratorTokenOfNode(node *ast.Node) ast.Kind {
	if ast.CanHaveModifiers(node) {
		modifier := core.Find(node.Modifiers().Nodes[core.FindIndex(node.Modifiers().Nodes, ast.IsDecorator):], ast.IsModifier)
		if modifier != nil {
			return modifier.Kind
		}
	}

	switch node.Kind {
	case ast.KindClassDeclaration:
		return ast.KindClassKeyword
	case ast.KindInterfaceDeclaration:
		return ast.KindInterfaceKeyword
	case ast.KindFunctionDeclaration:
		return ast.KindFunctionKeyword
	case ast.KindEnumDeclaration:
		return ast.KindEnumDeclaration
	case ast.KindGetAccessor:
		return ast.KindGetKeyword
	case ast.KindSetAccessor:
		return ast.KindSetKeyword
	case ast.KindMethodDeclaration:
		if node.AsMethodDeclaration().AsteriskToken != nil {
			return ast.KindAsteriskToken
		}
		fallthrough

	case ast.KindPropertyDeclaration, ast.KindParameter:
		name := ast.GetNameOfDeclaration(node)
		if name != nil {
			return name.Kind
		}
	}

	return ast.KindUnknown
}

func (w *formatSpanWorker) getDynamicIndentation(node *ast.Node, nodeStartLine int, indentation int, delta int) *dynamicIndenter {
	return &dynamicIndenter{
		node:          node,
		nodeStartLine: nodeStartLine,
		indentation:   indentation,
		delta:         delta,
		options:       w.formattingContext.Options,
		sourceFile:    w.sourceFile,
	}
}
