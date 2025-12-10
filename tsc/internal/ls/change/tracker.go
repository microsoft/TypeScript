package change

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/ls/lsconv"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type NodeOptions struct {
	// Text to be inserted before the new node
	Prefix string

	// Text to be inserted after the new node
	Suffix string

	// Text of inserted node will be formatted with this indentation, otherwise indentation will be inferred from the old node
	indentation *int

	// Text of inserted node will be formatted with this delta, otherwise delta will be inferred from the new node kind
	delta *int

	LeadingTriviaOption
	TrailingTriviaOption
	joiner string
}

type LeadingTriviaOption int

const (
	LeadingTriviaOptionNone       LeadingTriviaOption = 0
	LeadingTriviaOptionExclude    LeadingTriviaOption = 1
	LeadingTriviaOptionIncludeAll LeadingTriviaOption = 2
	LeadingTriviaOptionJSDoc      LeadingTriviaOption = 3
	LeadingTriviaOptionStartLine  LeadingTriviaOption = 4
)

type TrailingTriviaOption int

const (
	TrailingTriviaOptionNone              TrailingTriviaOption = 0
	TrailingTriviaOptionExclude           TrailingTriviaOption = 1
	TrailingTriviaOptionExcludeWhitespace TrailingTriviaOption = 2
	TrailingTriviaOptionInclude           TrailingTriviaOption = 3
)

type trackerEditKind int

const (
	trackerEditKindText                     trackerEditKind = 1
	trackerEditKindRemove                   trackerEditKind = 2
	trackerEditKindReplaceWithSingleNode    trackerEditKind = 3
	trackerEditKindReplaceWithMultipleNodes trackerEditKind = 4
)

type trackerEdit struct {
	kind trackerEditKind
	lsproto.Range

	NewText string // kind == text

	*ast.Node             // single
	nodes     []*ast.Node // multiple
	options   NodeOptions
}

type Tracker struct {
	// initialized with
	formatSettings *format.FormatCodeSettings
	newLine        string
	converters     *lsconv.Converters
	ctx            context.Context
	*printer.EmitContext

	*ast.NodeFactory
	changes      *collections.MultiMap[*ast.SourceFile, *trackerEdit]
	deletedNodes []deletedNode

	// created during call to getChanges
	writer *printer.ChangeTrackerWriter
	// printer
}

type deletedNode struct {
	sourceFile *ast.SourceFile
	node       *ast.Node
}

func NewTracker(ctx context.Context, compilerOptions *core.CompilerOptions, formatOptions *format.FormatCodeSettings, converters *lsconv.Converters) *Tracker {
	emitContext := printer.NewEmitContext()
	newLine := compilerOptions.NewLine.GetNewLineCharacter()
	ctx = format.WithFormatCodeSettings(ctx, formatOptions, newLine) // !!! formatSettings in context?
	return &Tracker{
		EmitContext:    emitContext,
		NodeFactory:    &emitContext.Factory.NodeFactory,
		changes:        &collections.MultiMap[*ast.SourceFile, *trackerEdit]{},
		ctx:            ctx,
		converters:     converters,
		formatSettings: formatOptions,
		newLine:        newLine,
	}
}

// GetChanges returns the accumulated text edits.
// Note: after calling this, the Tracker object must be discarded!
func (t *Tracker) GetChanges() map[string][]*lsproto.TextEdit {
	t.finishDeleteDeclarations()
	// !!! finishClassesWithNodesInsertedAtStart
	changes := t.getTextChangesFromChanges()
	// !!! changes for new files
	return changes
}

func (t *Tracker) ReplaceNode(sourceFile *ast.SourceFile, oldNode *ast.Node, newNode *ast.Node, options *NodeOptions) {
	if options == nil {
		// defaults to `useNonAdjustedPositions`
		options = &NodeOptions{
			LeadingTriviaOption:  LeadingTriviaOptionExclude,
			TrailingTriviaOption: TrailingTriviaOptionExclude,
		}
	}
	t.ReplaceRange(sourceFile, t.getAdjustedRange(sourceFile, oldNode, oldNode, options.LeadingTriviaOption, options.TrailingTriviaOption), newNode, *options)
}

func (t *Tracker) ReplaceRange(sourceFile *ast.SourceFile, lsprotoRange lsproto.Range, newNode *ast.Node, options NodeOptions) {
	t.changes.Add(sourceFile, &trackerEdit{kind: trackerEditKindReplaceWithSingleNode, Range: lsprotoRange, options: options, Node: newNode})
}

func (t *Tracker) ReplaceRangeWithText(sourceFile *ast.SourceFile, lsprotoRange lsproto.Range, text string) {
	t.changes.Add(sourceFile, &trackerEdit{kind: trackerEditKindText, Range: lsprotoRange, NewText: text})
}

func (t *Tracker) ReplaceRangeWithNodes(sourceFile *ast.SourceFile, lsprotoRange lsproto.Range, newNodes []*ast.Node, options NodeOptions) {
	if len(newNodes) == 1 {
		t.ReplaceRange(sourceFile, lsprotoRange, newNodes[0], options)
		return
	}
	t.changes.Add(sourceFile, &trackerEdit{kind: trackerEditKindReplaceWithMultipleNodes, Range: lsprotoRange, nodes: newNodes, options: options})
}

func (t *Tracker) InsertText(sourceFile *ast.SourceFile, pos lsproto.Position, text string) {
	t.ReplaceRangeWithText(sourceFile, lsproto.Range{Start: pos, End: pos}, text)
}

func (t *Tracker) InsertNodeAt(sourceFile *ast.SourceFile, pos core.TextPos, newNode *ast.Node, options NodeOptions) {
	lsPos := t.converters.PositionToLineAndCharacter(sourceFile, pos)
	t.ReplaceRange(sourceFile, lsproto.Range{Start: lsPos, End: lsPos}, newNode, options)
}

func (t *Tracker) InsertNodesAt(sourceFile *ast.SourceFile, pos core.TextPos, newNodes []*ast.Node, options NodeOptions) {
	lsPos := t.converters.PositionToLineAndCharacter(sourceFile, pos)
	t.ReplaceRangeWithNodes(sourceFile, lsproto.Range{Start: lsPos, End: lsPos}, newNodes, options)
}

func (t *Tracker) InsertNodeAfter(sourceFile *ast.SourceFile, after *ast.Node, newNode *ast.Node) {
	endPosition := t.endPosForInsertNodeAfter(sourceFile, after, newNode)
	t.InsertNodeAt(sourceFile, endPosition, newNode, t.getInsertNodeAfterOptions(sourceFile, after))
}

func (t *Tracker) InsertNodesAfter(sourceFile *ast.SourceFile, after *ast.Node, newNodes []*ast.Node) {
	endPosition := t.endPosForInsertNodeAfter(sourceFile, after, newNodes[0])
	t.InsertNodesAt(sourceFile, endPosition, newNodes, t.getInsertNodeAfterOptions(sourceFile, after))
}

func (t *Tracker) InsertNodeBefore(sourceFile *ast.SourceFile, before *ast.Node, newNode *ast.Node, blankLineBetween bool) {
	t.InsertNodeAt(sourceFile, core.TextPos(t.getAdjustedStartPosition(sourceFile, before, LeadingTriviaOptionNone, false)), newNode, t.getOptionsForInsertNodeBefore(before, newNode, blankLineBetween))
}

// InsertModifierBefore inserts a modifier token (like 'type') before a node with a trailing space.
func (t *Tracker) InsertModifierBefore(sourceFile *ast.SourceFile, modifier ast.Kind, before *ast.Node) {
	pos := astnav.GetStartOfNode(before, sourceFile, false)
	token := sourceFile.GetOrCreateToken(modifier, pos, pos, before.Parent, ast.TokenFlagsNone)
	t.InsertNodeAt(sourceFile, core.TextPos(pos), token, NodeOptions{Suffix: " "})
}

// Delete queues a node for deletion with smart handling of list items, imports, etc.
// The actual deletion happens in finishDeleteDeclarations during GetChanges.
func (t *Tracker) Delete(sourceFile *ast.SourceFile, node *ast.Node) {
	t.deletedNodes = append(t.deletedNodes, deletedNode{sourceFile: sourceFile, node: node})
}

// DeleteRange deletes a text range from the source file.
func (t *Tracker) DeleteRange(sourceFile *ast.SourceFile, textRange core.TextRange) {
	lspRange := t.converters.ToLSPRange(sourceFile, textRange)
	t.ReplaceRangeWithText(sourceFile, lspRange, "")
}

// DeleteNode deletes a node immediately with specified trivia options.
// Stop! Consider using Delete instead, which has logic for deleting nodes from delimited lists.
func (t *Tracker) DeleteNode(sourceFile *ast.SourceFile, node *ast.Node, leadingTrivia LeadingTriviaOption, trailingTrivia TrailingTriviaOption) {
	rng := t.getAdjustedRange(sourceFile, node, node, leadingTrivia, trailingTrivia)
	t.ReplaceRangeWithText(sourceFile, rng, "")
}

// DeleteNodeRange deletes a range of nodes with specified trivia options.
func (t *Tracker) DeleteNodeRange(sourceFile *ast.SourceFile, startNode *ast.Node, endNode *ast.Node, leadingTrivia LeadingTriviaOption, trailingTrivia TrailingTriviaOption) {
	startPosition := t.getAdjustedStartPosition(sourceFile, startNode, leadingTrivia, false)
	endPosition := t.getAdjustedEndPosition(sourceFile, endNode, trailingTrivia)
	startPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(startPosition))
	endPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(endPosition))
	t.ReplaceRangeWithText(sourceFile, lsproto.Range{Start: startPos, End: endPos}, "")
}

// finishDeleteDeclarations processes all queued deletions with smart handling for lists and trailing commas.
func (t *Tracker) finishDeleteDeclarations() {
	deletedNodesInLists := make(map[*ast.Node]bool)

	for _, deleted := range t.deletedNodes {
		// Skip if this node is contained within another deleted node
		isContained := false
		for _, other := range t.deletedNodes {
			if other.sourceFile == deleted.sourceFile && other.node != deleted.node &&
				rangeContainsRangeExclusive(other.node, deleted.node) {
				isContained = true
				break
			}
		}
		if isContained {
			continue
		}

		deleteDeclaration(t, deletedNodesInLists, deleted.sourceFile, deleted.node)
	}

	// Handle trailing commas for last elements in lists
	for node := range deletedNodesInLists {
		sourceFile := ast.GetSourceFileOfNode(node)
		list := format.GetContainingList(node, sourceFile)
		if list == nil || node != list.Nodes[len(list.Nodes)-1] {
			continue
		}

		lastNonDeletedIndex := -1
		for i := len(list.Nodes) - 2; i >= 0; i-- {
			if !deletedNodesInLists[list.Nodes[i]] {
				lastNonDeletedIndex = i
				break
			}
		}

		if lastNonDeletedIndex != -1 {
			startPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(list.Nodes[lastNonDeletedIndex].End()))
			endPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(t.startPositionToDeleteNodeInList(sourceFile, list.Nodes[lastNonDeletedIndex+1])))
			t.ReplaceRangeWithText(sourceFile, lsproto.Range{Start: startPos, End: endPos}, "")
		}
	}
}

func (t *Tracker) endPosForInsertNodeAfter(sourceFile *ast.SourceFile, after *ast.Node, newNode *ast.Node) core.TextPos {
	if (needSemicolonBetween(after, newNode)) && (rune(sourceFile.Text()[after.End()-1]) != ';') {
		// check if previous statement ends with semicolon
		// if not - insert semicolon to preserve the code from changing the meaning due to ASI
		endPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(after.End()))
		t.ReplaceRange(sourceFile,
			lsproto.Range{Start: endPos, End: endPos},
			sourceFile.GetOrCreateToken(ast.KindSemicolonToken, after.End(), after.End(), after.Parent, ast.TokenFlagsNone),
			NodeOptions{},
		)
	}
	return core.TextPos(t.getAdjustedEndPosition(sourceFile, after, TrailingTriviaOptionNone))
}

/**
* This function should be used to insert nodes in lists when nodes don't carry separators as the part of the node range,
* i.e. arguments in arguments lists, parameters in parameter lists etc.
* Note that separators are part of the node in statements and class elements.
 */
func (t *Tracker) InsertNodeInListAfter(sourceFile *ast.SourceFile, after *ast.Node, newNode *ast.Node, containingList []*ast.Node) {
	if len(containingList) == 0 {
		containingList = format.GetContainingList(after, sourceFile).Nodes
	}
	index := slices.Index(containingList, after)
	if index < 0 {
		return
	}
	if index != len(containingList)-1 {
		// any element except the last one
		// use next sibling as an anchor
		if nextToken := astnav.GetTokenAtPosition(sourceFile, after.End()); nextToken != nil && isSeparator(after, nextToken) {
			// for list
			// a, b, c
			// create change for adding 'e' after 'a' as
			// - find start of next element after a (it is b)
			// - use next element start as start and end position in final change
			// - build text of change by formatting the text of node + whitespace trivia of b

			// in multiline case it will work as
			//   a,
			//   b,
			//   c,
			// result - '*' denotes leading trivia that will be inserted after new text (displayed as '#')
			//   a,
			//   insertedtext<separator>#
			// ###b,
			//   c,
			nextNode := containingList[index+1]
			startPos := scanner.SkipTriviaEx(sourceFile.Text(), nextNode.Pos(), &scanner.SkipTriviaOptions{StopAfterLineBreak: false, StopAtComments: true})

			// write separator and leading trivia of the next element as suffix
			suffix := scanner.TokenToString(nextToken.Kind) + sourceFile.Text()[nextToken.End():startPos]
			t.InsertNodeAt(sourceFile, core.TextPos(startPos), newNode, NodeOptions{Suffix: suffix})
		}
		return
	}

	afterStart := astnav.GetStartOfNode(after, sourceFile, false)
	afterStartLinePosition := format.GetLineStartPositionForPosition(afterStart, sourceFile)

	// insert element after the last element in the list that has more than one item
	// pick the element preceding the after element to:
	// - pick the separator
	// - determine if list is a multiline
	multilineList := false

	// if list has only one element then we'll format is as multiline if node has comment in trailing trivia, or as singleline otherwise
	// i.e. var x = 1 // this is x
	//     | new element will be inserted at this position
	separator := ast.KindCommaToken // SyntaxKind.CommaToken | SyntaxKind.SemicolonToken
	if len(containingList) != 1 {
		// otherwise, if list has more than one element, pick separator from the list
		tokenBeforeInsertPosition := astnav.FindPrecedingToken(sourceFile, after.Pos())
		separator = core.IfElse(isSeparator(after, tokenBeforeInsertPosition), tokenBeforeInsertPosition.Kind, ast.KindCommaToken)
		// determine if list is multiline by checking lines of after element and element that precedes it.
		afterMinusOneStartLinePosition := format.GetLineStartPositionForPosition(astnav.GetStartOfNode(containingList[index-1], sourceFile, false), sourceFile)
		multilineList = afterMinusOneStartLinePosition != afterStartLinePosition
	}
	if hasCommentsBeforeLineBreak(sourceFile.Text(), after.End()) || printer.GetLinesBetweenPositions(sourceFile, containingList[0].Pos(), containingList[len(containingList)-1].End()) != 0 {
		// in this case we'll always treat containing list as multiline
		multilineList = true
	}

	separatorString := scanner.TokenToString(separator)
	end := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(after.End()))
	if !multilineList {
		t.ReplaceRange(sourceFile, lsproto.Range{Start: end, End: end}, newNode, NodeOptions{Prefix: separatorString})
		return
	}

	// insert separator immediately following the 'after' node to preserve comments in trailing trivia
	// !!! formatcontext
	t.ReplaceRange(sourceFile, lsproto.Range{Start: end, End: end}, sourceFile.GetOrCreateToken(separator, after.End(), after.End()+len(separatorString), after.Parent, ast.TokenFlagsNone), NodeOptions{})
	// use the same indentation as 'after' item
	indentation := format.FindFirstNonWhitespaceColumn(afterStartLinePosition, afterStart, sourceFile, t.formatSettings)
	// insert element before the line break on the line that contains 'after' element
	insertPos := scanner.SkipTriviaEx(sourceFile.Text(), after.End(), &scanner.SkipTriviaOptions{StopAfterLineBreak: true, StopAtComments: false})
	// find position before "\n" or "\r\n"
	for insertPos != after.End() && stringutil.IsLineBreak(rune(sourceFile.Text()[insertPos-1])) {
		insertPos--
	}
	insertLSPos := t.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(insertPos))
	t.ReplaceRange(
		sourceFile,
		lsproto.Range{Start: insertLSPos, End: insertLSPos},
		newNode,
		NodeOptions{
			indentation: ptrTo(indentation),
			Prefix:      t.newLine,
		},
	)
}

// InsertImportSpecifierAtIndex inserts a new import specifier at the specified index in a NamedImports list
func (t *Tracker) InsertImportSpecifierAtIndex(sourceFile *ast.SourceFile, newSpecifier *ast.Node, namedImports *ast.Node, index int) {
	namedImportsNode := namedImports.AsNamedImports()
	elements := namedImportsNode.Elements.Nodes

	if index >= len(elements) {
		// Insert at the end (after the last element)
		t.InsertNodeInListAfter(sourceFile, elements[len(elements)-1], newSpecifier, elements)
	} else if index > 0 {
		// Insert after the element at index-1
		t.InsertNodeInListAfter(sourceFile, elements[index-1], newSpecifier, elements)
	} else {
		// Insert before the first element
		firstElement := elements[0]
		multiline := printer.GetLinesBetweenPositions(sourceFile, firstElement.Pos(), namedImports.Parent.Parent.Pos()) != 0
		t.InsertNodeBefore(sourceFile, firstElement, newSpecifier, multiline)
	}
}

func (t *Tracker) InsertAtTopOfFile(sourceFile *ast.SourceFile, insert []*ast.Statement, blankLineBetween bool) {
	if len(insert) == 0 {
		return
	}

	pos := t.getInsertionPositionAtSourceFileTop(sourceFile)
	options := NodeOptions{}
	if pos != 0 {
		options.Prefix = t.newLine
	}
	if len(sourceFile.Text()) == 0 || !stringutil.IsLineBreak(rune(sourceFile.Text()[pos])) {
		options.Suffix = t.newLine
	}
	if blankLineBetween {
		options.Suffix += t.newLine
	}

	if len(insert) == 1 {
		t.InsertNodeAt(sourceFile, core.TextPos(pos), insert[0], options)
	} else {
		t.InsertNodesAt(sourceFile, core.TextPos(pos), insert, options)
	}
}

func (t *Tracker) getInsertNodeAfterOptions(sourceFile *ast.SourceFile, node *ast.Node) NodeOptions {
	newLineChar := t.newLine
	var options NodeOptions
	switch node.Kind {
	case ast.KindParameter:
		// default opts
		options = NodeOptions{}
	case ast.KindClassDeclaration, ast.KindModuleDeclaration:
		options = NodeOptions{Prefix: newLineChar, Suffix: newLineChar}

	case ast.KindVariableDeclaration, ast.KindStringLiteral, ast.KindIdentifier:
		options = NodeOptions{Prefix: ", "}

	case ast.KindPropertyAssignment:
		options = NodeOptions{Suffix: "," + newLineChar}

	case ast.KindExportKeyword:
		options = NodeOptions{Prefix: " "}

	default:
		if !(ast.IsStatement(node) || ast.IsClassOrTypeElement(node)) {
			// Else we haven't handled this kind of node yet -- add it
			panic("unimplemented node type " + node.Kind.String() + " in changeTracker.getInsertNodeAfterOptions")
		}
		options = NodeOptions{Suffix: newLineChar}
	}
	if node.End() == sourceFile.End() && ast.IsStatement(node) {
		options.Prefix = "\n" + options.Prefix
	}

	return options
}

func (t *Tracker) getOptionsForInsertNodeBefore(before *ast.Node, inserted *ast.Node, blankLineBetween bool) NodeOptions {
	if ast.IsStatement(before) || ast.IsClassOrTypeElement(before) {
		if blankLineBetween {
			return NodeOptions{Suffix: t.newLine + t.newLine}
		}
		return NodeOptions{Suffix: t.newLine}
	} else if before.Kind == ast.KindVariableDeclaration {
		// insert `x = 1, ` into `const x = 1, y = 2;
		return NodeOptions{Suffix: ", "}
	} else if before.Kind == ast.KindParameter {
		if inserted.Kind == ast.KindParameter {
			return NodeOptions{Suffix: ", "}
		}
		return NodeOptions{}
	} else if (before.Kind == ast.KindStringLiteral && before.Parent != nil && before.Parent.Kind == ast.KindImportDeclaration) || before.Kind == ast.KindNamedImports {
		return NodeOptions{Suffix: ", "}
	} else if before.Kind == ast.KindImportSpecifier {
		suffix := ","
		if blankLineBetween {
			suffix += t.newLine
		} else {
			suffix += " "
		}
		return NodeOptions{Suffix: suffix}
	}
	// We haven't handled this kind of node yet -- add it
	panic("unimplemented node type " + before.Kind.String() + " in changeTracker.getOptionsForInsertNodeBefore")
}

func ptrTo[T any](v T) *T {
	return &v
}

func rangeContainsRangeExclusive(outer *ast.Node, inner *ast.Node) bool {
	return outer.Pos() < inner.Pos() && inner.End() < outer.End()
}

func isSeparator(node *ast.Node, candidate *ast.Node) bool {
	return candidate != nil && node.Parent != nil && (candidate.Kind == ast.KindCommaToken || (candidate.Kind == ast.KindSemicolonToken && node.Parent.Kind == ast.KindObjectLiteralExpression))
}
