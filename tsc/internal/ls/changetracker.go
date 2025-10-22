package ls

import (
	"context"
	"slices"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type changeNodeOptions struct {
	// Text to be inserted before the new node
	prefix string

	// Text to be inserted after the new node
	suffix string

	// Text of inserted node will be formatted with this indentation, otherwise indentation will be inferred from the old node
	indentation *int

	// Text of inserted node will be formatted with this delta, otherwise delta will be inferred from the new node kind
	delta *int

	leadingTriviaOption
	trailingTriviaOption
	joiner string
}

type leadingTriviaOption int

const (
	leadingTriviaOptionNone       leadingTriviaOption = 0
	leadingTriviaOptionExclude    leadingTriviaOption = 1
	leadingTriviaOptionIncludeAll leadingTriviaOption = 2
	leadingTriviaOptionJSDoc      leadingTriviaOption = 3
	leadingTriviaOptionStartLine  leadingTriviaOption = 4
)

type trailingTriviaOption int

const (
	trailingTriviaOptionNone              trailingTriviaOption = 0
	trailingTriviaOptionExclude           trailingTriviaOption = 1
	trailingTriviaOptionExcludeWhitespace trailingTriviaOption = 2
	trailingTriviaOptionInclude           trailingTriviaOption = 3
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
	options   changeNodeOptions
}

type changeTracker struct {
	// initialized with
	formatSettings *format.FormatCodeSettings
	newLine        string
	ls             *LanguageService
	ctx            context.Context
	*printer.EmitContext

	*ast.NodeFactory
	changes *collections.MultiMap[*ast.SourceFile, *trackerEdit]

	// created during call to getChanges
	writer *printer.ChangeTrackerWriter
	// printer
}

func (ls *LanguageService) newChangeTracker(ctx context.Context) *changeTracker {
	emitContext := printer.NewEmitContext()
	newLine := ls.GetProgram().Options().NewLine.GetNewLineCharacter()
	formatCodeSettings := ls.FormatOptions()
	ctx = format.WithFormatCodeSettings(ctx, formatCodeSettings, newLine) // !!! formatSettings in context?
	return &changeTracker{
		ls:             ls,
		EmitContext:    emitContext,
		NodeFactory:    &emitContext.Factory.NodeFactory,
		changes:        &collections.MultiMap[*ast.SourceFile, *trackerEdit]{},
		ctx:            ctx,
		formatSettings: formatCodeSettings,
		newLine:        newLine,
	}
}

// !!! address strada note
//   - Note: after calling this, the TextChanges object must be discarded!
func (ct *changeTracker) getChanges() map[string][]*lsproto.TextEdit {
	// !!! finishDeleteDeclarations
	// !!! finishClassesWithNodesInsertedAtStart
	changes := ct.getTextChangesFromChanges()
	// !!! changes for new files
	return changes
}

func (ct *changeTracker) replaceNode(sourceFile *ast.SourceFile, oldNode *ast.Node, newNode *ast.Node, options *changeNodeOptions) {
	if options == nil {
		// defaults to `useNonAdjustedPositions`
		options = &changeNodeOptions{
			leadingTriviaOption:  leadingTriviaOptionExclude,
			trailingTriviaOption: trailingTriviaOptionExclude,
		}
	}
	ct.replaceRange(sourceFile, ct.getAdjustedRange(sourceFile, oldNode, oldNode, options.leadingTriviaOption, options.trailingTriviaOption), newNode, *options)
}

func (ct *changeTracker) replaceRange(sourceFile *ast.SourceFile, lsprotoRange lsproto.Range, newNode *ast.Node, options changeNodeOptions) {
	ct.changes.Add(sourceFile, &trackerEdit{kind: trackerEditKindReplaceWithSingleNode, Range: lsprotoRange, options: options, Node: newNode})
}

func (ct *changeTracker) replaceRangeWithText(sourceFile *ast.SourceFile, lsprotoRange lsproto.Range, text string) {
	ct.changes.Add(sourceFile, &trackerEdit{kind: trackerEditKindText, Range: lsprotoRange, NewText: text})
}

func (ct *changeTracker) replaceRangeWithNodes(sourceFile *ast.SourceFile, lsprotoRange lsproto.Range, newNodes []*ast.Node, options changeNodeOptions) {
	if len(newNodes) == 1 {
		ct.replaceRange(sourceFile, lsprotoRange, newNodes[0], options)
		return
	}
	ct.changes.Add(sourceFile, &trackerEdit{kind: trackerEditKindReplaceWithMultipleNodes, Range: lsprotoRange, nodes: newNodes, options: options})
}

func (ct *changeTracker) insertText(sourceFile *ast.SourceFile, pos lsproto.Position, text string) {
	ct.replaceRangeWithText(sourceFile, lsproto.Range{Start: pos, End: pos}, text)
}

func (ct *changeTracker) insertNodeAt(sourceFile *ast.SourceFile, pos core.TextPos, newNode *ast.Node, options changeNodeOptions) {
	lsPos := ct.ls.converters.PositionToLineAndCharacter(sourceFile, pos)
	ct.replaceRange(sourceFile, lsproto.Range{Start: lsPos, End: lsPos}, newNode, options)
}

func (ct *changeTracker) insertNodesAt(sourceFile *ast.SourceFile, pos core.TextPos, newNodes []*ast.Node, options changeNodeOptions) {
	lsPos := ct.ls.converters.PositionToLineAndCharacter(sourceFile, pos)
	ct.replaceRangeWithNodes(sourceFile, lsproto.Range{Start: lsPos, End: lsPos}, newNodes, options)
}

func (ct *changeTracker) insertNodeAfter(sourceFile *ast.SourceFile, after *ast.Node, newNode *ast.Node) {
	endPosition := ct.endPosForInsertNodeAfter(sourceFile, after, newNode)
	ct.insertNodeAt(sourceFile, endPosition, newNode, ct.getInsertNodeAfterOptions(sourceFile, after))
}

func (ct *changeTracker) insertNodesAfter(sourceFile *ast.SourceFile, after *ast.Node, newNodes []*ast.Node) {
	endPosition := ct.endPosForInsertNodeAfter(sourceFile, after, newNodes[0])
	ct.insertNodesAt(sourceFile, endPosition, newNodes, ct.getInsertNodeAfterOptions(sourceFile, after))
}

func (ct *changeTracker) insertNodeBefore(sourceFile *ast.SourceFile, before *ast.Node, newNode *ast.Node, blankLineBetween bool) {
	ct.insertNodeAt(sourceFile, core.TextPos(ct.getAdjustedStartPosition(sourceFile, before, leadingTriviaOptionNone, false)), newNode, ct.getOptionsForInsertNodeBefore(before, newNode, blankLineBetween))
}

func (ct *changeTracker) endPosForInsertNodeAfter(sourceFile *ast.SourceFile, after *ast.Node, newNode *ast.Node) core.TextPos {
	if (needSemicolonBetween(after, newNode)) && (rune(sourceFile.Text()[after.End()-1]) != ';') {
		// check if previous statement ends with semicolon
		// if not - insert semicolon to preserve the code from changing the meaning due to ASI
		endPos := ct.ls.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(after.End()))
		ct.replaceRange(sourceFile,
			lsproto.Range{Start: endPos, End: endPos},
			sourceFile.GetOrCreateToken(ast.KindSemicolonToken, after.End(), after.End(), after.Parent),
			changeNodeOptions{},
		)
	}
	return core.TextPos(ct.getAdjustedEndPosition(sourceFile, after, trailingTriviaOptionNone))
}

/**
* This function should be used to insert nodes in lists when nodes don't carry separators as the part of the node range,
* i.e. arguments in arguments lists, parameters in parameter lists etc.
* Note that separators are part of the node in statements and class elements.
 */
func (ct *changeTracker) insertNodeInListAfter(sourceFile *ast.SourceFile, after *ast.Node, newNode *ast.Node, containingList []*ast.Node) {
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
			ct.insertNodeAt(sourceFile, core.TextPos(startPos), newNode, changeNodeOptions{suffix: suffix})
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
	end := ct.ls.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(after.End()))
	if !multilineList {
		ct.replaceRange(sourceFile, lsproto.Range{Start: end, End: end}, newNode, changeNodeOptions{prefix: separatorString})
		return
	}

	// insert separator immediately following the 'after' node to preserve comments in trailing trivia
	// !!! formatcontext
	ct.replaceRange(sourceFile, lsproto.Range{Start: end, End: end}, sourceFile.GetOrCreateToken(separator, after.End(), after.End()+len(separatorString), after.Parent), changeNodeOptions{})
	// use the same indentation as 'after' item
	indentation := format.FindFirstNonWhitespaceColumn(afterStartLinePosition, afterStart, sourceFile, ct.formatSettings)
	// insert element before the line break on the line that contains 'after' element
	insertPos := scanner.SkipTriviaEx(sourceFile.Text(), after.End(), &scanner.SkipTriviaOptions{StopAfterLineBreak: true, StopAtComments: false})
	// find position before "\n" or "\r\n"
	for insertPos != after.End() && stringutil.IsLineBreak(rune(sourceFile.Text()[insertPos-1])) {
		insertPos--
	}
	insertLSPos := ct.ls.converters.PositionToLineAndCharacter(sourceFile, core.TextPos(insertPos))
	ct.replaceRange(
		sourceFile,
		lsproto.Range{Start: insertLSPos, End: insertLSPos},
		newNode,
		changeNodeOptions{
			indentation: ptrTo(indentation),
			prefix:      ct.newLine,
		},
	)
}

// insertImportSpecifierAtIndex inserts a new import specifier at the specified index in a NamedImports list
func (ct *changeTracker) insertImportSpecifierAtIndex(sourceFile *ast.SourceFile, newSpecifier *ast.Node, namedImports *ast.Node, index int) {
	namedImportsNode := namedImports.AsNamedImports()
	elements := namedImportsNode.Elements.Nodes

	if index > 0 && len(elements) > index {
		ct.insertNodeInListAfter(sourceFile, elements[index-1], newSpecifier, elements)
	} else {
		// Insert before the first element
		firstElement := elements[0]
		multiline := printer.GetLinesBetweenPositions(sourceFile, firstElement.Pos(), namedImports.Parent.Parent.Pos()) != 0
		ct.insertNodeBefore(sourceFile, firstElement, newSpecifier, multiline)
	}
}

func (ct *changeTracker) insertAtTopOfFile(sourceFile *ast.SourceFile, insert []*ast.Statement, blankLineBetween bool) {
	if len(insert) == 0 {
		return
	}

	pos := ct.getInsertionPositionAtSourceFileTop(sourceFile)
	options := changeNodeOptions{}
	if pos != 0 {
		options.prefix = ct.newLine
	}
	if len(sourceFile.Text()) == 0 || !stringutil.IsLineBreak(rune(sourceFile.Text()[pos])) {
		options.suffix = ct.newLine
	}
	if blankLineBetween {
		options.suffix += ct.newLine
	}

	if len(insert) == 1 {
		ct.insertNodeAt(sourceFile, core.TextPos(pos), insert[0], options)
	} else {
		ct.insertNodesAt(sourceFile, core.TextPos(pos), insert, options)
	}
}

func (ct *changeTracker) getInsertNodeAfterOptions(sourceFile *ast.SourceFile, node *ast.Node) changeNodeOptions {
	newLineChar := ct.newLine
	var options changeNodeOptions
	switch node.Kind {
	case ast.KindParameter:
		// default opts
		options = changeNodeOptions{}
	case ast.KindClassDeclaration, ast.KindModuleDeclaration:
		options = changeNodeOptions{prefix: newLineChar, suffix: newLineChar}

	case ast.KindVariableDeclaration, ast.KindStringLiteral, ast.KindIdentifier:
		options = changeNodeOptions{prefix: ", "}

	case ast.KindPropertyAssignment:
		options = changeNodeOptions{suffix: "," + newLineChar}

	case ast.KindExportKeyword:
		options = changeNodeOptions{prefix: " "}

	default:
		if !(ast.IsStatement(node) || ast.IsClassOrTypeElement(node)) {
			// Else we haven't handled this kind of node yet -- add it
			panic("unimplemented node type " + node.Kind.String() + " in changeTracker.getInsertNodeAfterOptions")
		}
		options = changeNodeOptions{suffix: newLineChar}
	}
	if node.End() == sourceFile.End() && ast.IsStatement(node) {
		options.prefix = "\n" + options.prefix
	}

	return options
}

func (ct *changeTracker) getOptionsForInsertNodeBefore(before *ast.Node, inserted *ast.Node, blankLineBetween bool) changeNodeOptions {
	if ast.IsStatement(before) || ast.IsClassOrTypeElement(before) {
		if blankLineBetween {
			return changeNodeOptions{suffix: ct.newLine + ct.newLine}
		}
		return changeNodeOptions{suffix: ct.newLine}
	} else if before.Kind == ast.KindVariableDeclaration {
		// insert `x = 1, ` into `const x = 1, y = 2;
		return changeNodeOptions{suffix: ", "}
	} else if before.Kind == ast.KindParameter {
		if inserted.Kind == ast.KindParameter {
			return changeNodeOptions{suffix: ", "}
		}
		return changeNodeOptions{}
	} else if (before.Kind == ast.KindStringLiteral && before.Parent != nil && before.Parent.Kind == ast.KindImportDeclaration) || before.Kind == ast.KindNamedImports {
		return changeNodeOptions{suffix: ", "}
	} else if before.Kind == ast.KindImportSpecifier {
		suffix := ","
		if blankLineBetween {
			suffix += ct.newLine
		} else {
			suffix += " "
		}
		return changeNodeOptions{suffix: suffix}
	}
	// We haven't handled this kind of node yet -- add it
	panic("unimplemented node type " + before.Kind.String() + " in changeTracker.getOptionsForInsertNodeBefore")
}
