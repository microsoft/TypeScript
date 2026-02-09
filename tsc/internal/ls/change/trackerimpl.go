package change

import (
	"fmt"
	"slices"
	"strings"
	"unicode"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/ls/lsutil"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/parser"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

func (t *Tracker) getTextChangesFromChanges() map[string][]*lsproto.TextEdit {
	changes := map[string][]*lsproto.TextEdit{}
	for sourceFile, changesInFile := range t.changes.M {
		// order changes by start position
		// If the start position is the same, put the shorter range first, since an empty range (x, x) may precede (x, y) but not vice-versa.
		slices.SortStableFunc(changesInFile, func(a, b *trackerEdit) int { return lsproto.CompareRanges(ptrTo(a.Range), ptrTo(b.Range)) })
		// verify that change intervals do not overlap, except possibly at end points.
		for i := range len(changesInFile) - 1 {
			if lsproto.ComparePositions(changesInFile[i].Range.End, changesInFile[i+1].Range.Start) > 0 {
				// assert change[i].End <= change[i + 1].Start
				panic(fmt.Sprintf("changes overlap: %v and %v", changesInFile[i].Range, changesInFile[i+1].Range))
			}
		}

		textChanges := core.MapNonNil(changesInFile, func(change *trackerEdit) *lsproto.TextEdit {
			// !!! targetSourceFile

			newText := t.computeNewText(change, sourceFile, sourceFile)
			// span := createTextSpanFromRange(c.Range)
			// !!!
			// Filter out redundant changes.
			// if (span.length == newText.length && stringContainsAt(targetSourceFile.text, newText, span.start)) { return nil }

			return &lsproto.TextEdit{
				NewText: newText,
				Range:   change.Range,
			}
		})

		if len(textChanges) > 0 {
			changes[sourceFile.FileName()] = textChanges
		}
	}
	return changes
}

func (t *Tracker) computeNewText(change *trackerEdit, targetSourceFile *ast.SourceFile, sourceFile *ast.SourceFile) string {
	switch change.kind {
	case trackerEditKindRemove:
		return ""
	case trackerEditKindText:
		return change.NewText
	}

	pos := int(t.converters.LineAndCharacterToPosition(sourceFile, change.Range.Start))
	formatNode := func(n *ast.Node) string {
		return t.getFormattedTextOfNode(n, targetSourceFile, sourceFile, pos, change.options)
	}

	var text string
	switch change.kind {

	case trackerEditKindReplaceWithMultipleNodes:
		if change.options.joiner == "" {
			change.options.joiner = t.newLine
		}
		text = strings.Join(core.Map(change.nodes, func(n *ast.Node) string { return strings.TrimSuffix(formatNode(n), t.newLine) }), change.options.joiner)
	case trackerEditKindReplaceWithSingleNode:
		text = formatNode(change.Node)
	default:
		panic(fmt.Sprintf("change kind %d should have been handled earlier", change.kind))
	}
	// strip initial indentation (spaces or tabs) if text will be inserted in the middle of the line
	noIndent := text
	if !(change.options.indentation != nil && *change.options.indentation != 0 || format.GetLineStartPositionForPosition(pos, targetSourceFile) == pos) {
		noIndent = strings.TrimLeftFunc(text, unicode.IsSpace)
	}
	return change.options.Prefix + noIndent + core.IfElse(strings.HasSuffix(noIndent, change.options.Suffix), "", change.options.Suffix)
}

/** Note: this may mutate `nodeIn`. */
func (t *Tracker) getFormattedTextOfNode(nodeIn *ast.Node, targetSourceFile *ast.SourceFile, sourceFile *ast.SourceFile, pos int, options NodeOptions) string {
	text, sourceFileLike := t.getNonformattedText(nodeIn, targetSourceFile)
	// !!! if (validate) validate(node, text);
	formatOptions := getFormatCodeSettingsForWriting(t.formatSettings, targetSourceFile)

	var initialIndentation, delta int
	if options.indentation == nil {
		// !!! indentation for position
		// initialIndentation = format.GetIndentationForPos(pos, sourceFile, formatOptions, options.prefix == ct.newLine || scanner.GetLineStartPositionForPosition(pos, targetFileLineMap) == pos);
	} else {
		initialIndentation = *options.indentation
	}

	if options.delta != nil {
		delta = *options.delta
	} else if formatOptions.IndentSize != 0 && format.ShouldIndentChildNode(formatOptions, nodeIn, nil, nil) {
		delta = formatOptions.IndentSize
	}

	changes := format.FormatNodeGivenIndentation(t.ctx, sourceFileLike, sourceFileLike.AsSourceFile(), targetSourceFile.LanguageVariant, initialIndentation, delta)
	return core.ApplyBulkEdits(text, changes)
}

func getFormatCodeSettingsForWriting(options *lsutil.FormatCodeSettings, sourceFile *ast.SourceFile) *lsutil.FormatCodeSettings {
	shouldAutoDetectSemicolonPreference := options.Semicolons == lsutil.SemicolonPreferenceIgnore
	shouldRemoveSemicolons := options.Semicolons == lsutil.SemicolonPreferenceRemove || shouldAutoDetectSemicolonPreference && !lsutil.ProbablyUsesSemicolons(sourceFile)
	if shouldRemoveSemicolons {
		options.Semicolons = lsutil.SemicolonPreferenceRemove
	}

	return options
}

func (t *Tracker) getNonformattedText(node *ast.Node, sourceFile *ast.SourceFile) (string, *ast.Node) {
	nodeIn := node
	eofToken := t.Factory.NewToken(ast.KindEndOfFile)
	if ast.IsStatement(node) {
		text := ""
		// OrganizeImports uses nodes from the old tree for preserving comments when emitting,
		// which causes text to be indexed with the positions of the old nodes.
		// For more details, check PR #2331
		if !ast.NodeIsSynthesized(node) {
			text = sourceFile.Text()
		}
		nodeIn = t.Factory.NewSourceFile(
			ast.SourceFileParseOptions{FileName: sourceFile.FileName(), Path: sourceFile.Path()},
			text,
			t.Factory.NewNodeList([]*ast.Node{node}),
			t.Factory.NewToken(ast.KindEndOfFile),
		)
	}
	writer := printer.NewChangeTrackerWriter(t.newLine, t.formatSettings.IndentSize)
	printer.NewPrinter(
		printer.PrinterOptions{
			NewLine:                       core.GetNewLineKind(t.newLine),
			NeverAsciiEscape:              true,
			PreserveSourceNewlines:        true,
			TerminateUnterminatedLiterals: true,
		},
		writer.GetPrintHandlers(),
		t.EmitContext,
	).Write(nodeIn, sourceFile, writer, nil)

	text := writer.String()
	text = strings.TrimSuffix(text, t.newLine) // Newline artifact from printing a SourceFile instead of a node

	nodeOut := writer.AssignPositionsToNode(nodeIn, t.NodeFactory)
	var sourceFileLike *ast.Node
	if !ast.IsStatement(node) {
		nodeList := t.Factory.NewNodeList([]*ast.Node{nodeOut})
		nodeList.Loc = nodeOut.Loc
		eofToken.Loc = core.NewTextRange(nodeOut.End(), nodeOut.End())
		sourceFileLike = t.Factory.NewSourceFile(
			ast.SourceFileParseOptions{FileName: sourceFile.FileName(), Path: sourceFile.Path()},
			text,
			nodeList,
			eofToken,
		)
		sourceFileLike.ForEachChild(func(child *ast.Node) bool {
			child.Parent = sourceFileLike
			return true
		})
		sourceFileLike.Loc = nodeOut.Loc
	} else {
		sourceFileLike = nodeOut
	}
	return text, sourceFileLike
}

// method on the changeTracker because use of converters
func (t *Tracker) getAdjustedRange(sourceFile *ast.SourceFile, startNode *ast.Node, endNode *ast.Node, leadingOption LeadingTriviaOption, trailingOption TrailingTriviaOption) lsproto.Range {
	return t.converters.ToLSPRange(
		sourceFile,
		core.NewTextRange(
			t.getAdjustedStartPosition(sourceFile, startNode, leadingOption, false),
			t.getAdjustedEndPosition(sourceFile, endNode, trailingOption),
		),
	)
}

// method on the changeTracker because use of converters
func (t *Tracker) getAdjustedStartPosition(sourceFile *ast.SourceFile, node *ast.Node, leadingOption LeadingTriviaOption, hasTrailingComment bool) int {
	if leadingOption == LeadingTriviaOptionJSDoc {
		if JSDocComments := parser.GetJSDocCommentRanges(t.NodeFactory, nil, node, sourceFile.Text()); len(JSDocComments) > 0 {
			return format.GetLineStartPositionForPosition(JSDocComments[0].Pos(), sourceFile)
		}
	}

	start := astnav.GetStartOfNode(node, sourceFile, false)
	startOfLinePos := format.GetLineStartPositionForPosition(start, sourceFile)

	switch leadingOption {
	case LeadingTriviaOptionExclude:
		return start
	case LeadingTriviaOptionStartLine:
		if node.Loc.ContainsInclusive(startOfLinePos) {
			return startOfLinePos
		}
		return start
	}

	fullStart := node.Pos()
	if fullStart == start {
		return start
	}
	lineStarts := sourceFile.ECMALineMap()
	fullStartLineIndex := scanner.ComputeLineOfPosition(lineStarts, fullStart)
	fullStartLinePos := int(lineStarts[fullStartLineIndex])
	if startOfLinePos == fullStartLinePos {
		// full start and start of the node are on the same line
		//   a,     b;
		//    ^     ^
		//    |   start
		// fullstart
		// when b is replaced - we usually want to keep the leading trvia
		// when b is deleted - we delete it
		if leadingOption == LeadingTriviaOptionIncludeAll {
			return fullStart
		}
		return start
	}

	// if node has a trailing comments, use comment end position as the text has already been included.
	if hasTrailingComment {
		// Check first for leading comments as if the node is the first import, we want to exclude the trivia;
		// otherwise we get the trailing comments.
		comments := slices.Collect(scanner.GetLeadingCommentRanges(t.NodeFactory, sourceFile.Text(), fullStart))
		if len(comments) == 0 {
			comments = slices.Collect(scanner.GetTrailingCommentRanges(t.NodeFactory, sourceFile.Text(), fullStart))
		}
		if len(comments) > 0 {
			return scanner.SkipTriviaEx(sourceFile.Text(), comments[0].End(), &scanner.SkipTriviaOptions{StopAfterLineBreak: true, StopAtComments: true})
		}
	}

	// get start position of the line following the line that contains fullstart position
	// (but only if the fullstart isn't the very beginning of the file)
	nextLineStart := core.IfElse(fullStart > 0, 1, 0)
	adjustedStartPosition := int(lineStarts[fullStartLineIndex+nextLineStart])
	// skip whitespaces/newlines
	adjustedStartPosition = scanner.SkipTriviaEx(sourceFile.Text(), adjustedStartPosition, &scanner.SkipTriviaOptions{StopAtComments: true})
	return int(lineStarts[scanner.ComputeLineOfPosition(lineStarts, adjustedStartPosition)])
}

// method on the changeTracker because of converters
// Return the end position of a multiline comment of it is on another line; otherwise returns `undefined`;
func (t *Tracker) getEndPositionOfMultilineTrailingComment(sourceFile *ast.SourceFile, node *ast.Node, trailingOpt TrailingTriviaOption) int {
	if trailingOpt == TrailingTriviaOptionInclude {
		// If the trailing comment is a multiline comment that extends to the next lines,
		// return the end of the comment and track it for the next nodes to adjust.
		lineStarts := sourceFile.ECMALineMap()
		nodeEndLine := scanner.ComputeLineOfPosition(lineStarts, node.End())
		for comment := range scanner.GetTrailingCommentRanges(t.NodeFactory, sourceFile.Text(), node.End()) {
			// Single line can break the loop as trivia will only be this line.
			// Comments on subsequent lines are also ignored.
			if comment.Kind == ast.KindSingleLineCommentTrivia || scanner.ComputeLineOfPosition(lineStarts, comment.Pos()) > nodeEndLine {
				break
			}

			// Get the end line of the comment and compare against the end line of the node.
			// If the comment end line position and the multiline comment extends to multiple lines,
			// then is safe to return the end position.
			if commentEndLine := scanner.ComputeLineOfPosition(lineStarts, comment.End()); commentEndLine > nodeEndLine {
				return scanner.SkipTriviaEx(sourceFile.Text(), comment.End(), &scanner.SkipTriviaOptions{StopAfterLineBreak: true, StopAtComments: true})
			}
		}
	}

	return 0
}

// method on the changeTracker because of converters
func (t *Tracker) getAdjustedEndPosition(sourceFile *ast.SourceFile, node *ast.Node, TrailingTriviaOption TrailingTriviaOption) int {
	if TrailingTriviaOption == TrailingTriviaOptionExclude {
		return node.End()
	}
	if TrailingTriviaOption == TrailingTriviaOptionExcludeWhitespace {
		if comments := slices.AppendSeq(
			slices.Collect(scanner.GetTrailingCommentRanges(t.NodeFactory, sourceFile.Text(), node.End())),
			scanner.GetLeadingCommentRanges(t.NodeFactory, sourceFile.Text(), node.End()),
		); len(comments) > 0 {
			if realEnd := comments[len(comments)-1].End(); realEnd != 0 {
				return realEnd
			}
		}
		return node.End()
	}

	if multilineEndPosition := t.getEndPositionOfMultilineTrailingComment(sourceFile, node, TrailingTriviaOption); multilineEndPosition != 0 {
		return multilineEndPosition
	}

	newEnd := scanner.SkipTriviaEx(sourceFile.Text(), node.End(), &scanner.SkipTriviaOptions{StopAfterLineBreak: true})

	if newEnd != node.End() && (TrailingTriviaOption == TrailingTriviaOptionInclude || stringutil.IsLineBreak(rune(sourceFile.Text()[newEnd-1]))) {
		return newEnd
	}
	return node.End()
}

// ============= utilities =============

func hasCommentsBeforeLineBreak(text string, start int) bool {
	for _, ch := range []rune(text[start:]) {
		if !stringutil.IsWhiteSpaceSingleLine(ch) {
			return ch == '/'
		}
	}
	return false
}

func needSemicolonBetween(a, b *ast.Node) bool {
	return (ast.IsPropertySignatureDeclaration(a) || ast.IsPropertyDeclaration(a)) &&
		ast.IsClassOrTypeElement(b) &&
		b.Name().Kind == ast.KindComputedPropertyName ||
		ast.IsStatementButNotDeclaration(a) &&
			ast.IsStatementButNotDeclaration(b) // TODO: only if b would start with a `(` or `[`
}

func (t *Tracker) getInsertionPositionAtSourceFileTop(sourceFile *ast.SourceFile) int {
	var lastPrologue *ast.Node
	for _, node := range sourceFile.Statements.Nodes {
		if ast.IsPrologueDirective(node) {
			lastPrologue = node
		} else {
			break
		}
	}

	position := 0
	text := sourceFile.Text()
	advancePastLineBreak := func() {
		if position >= len(text) {
			return
		}
		if char := rune(text[position]); stringutil.IsLineBreak(char) {
			position++
			if position < len(text) && char == '\r' && rune(text[position]) == '\n' {
				position++
			}
		}
	}
	if lastPrologue != nil {
		position = lastPrologue.End()
		advancePastLineBreak()
		return position
	}

	shebang := scanner.GetShebang(text)
	if shebang != "" {
		position = len(shebang)
		advancePastLineBreak()
	}

	ranges := slices.Collect(scanner.GetLeadingCommentRanges(t.NodeFactory, text, position))
	if len(ranges) == 0 {
		return position
	}
	// Find the first attached comment to the first node and add before it
	var lastComment *ast.CommentRange
	pinnedOrTripleSlash := false
	firstNodeLine := -1

	lenStatements := len(sourceFile.Statements.Nodes)
	lineMap := sourceFile.ECMALineMap()
	for _, r := range ranges {
		if r.Kind == ast.KindMultiLineCommentTrivia {
			if printer.IsPinnedComment(text, r) {
				lastComment = &r
				pinnedOrTripleSlash = true
				continue
			}
		} else if printer.IsRecognizedTripleSlashComment(text, r) {
			lastComment = &r
			pinnedOrTripleSlash = true
			continue
		}

		if lastComment != nil {
			// Always insert after pinned or triple slash comments
			if pinnedOrTripleSlash {
				break
			}

			// There was a blank line between the last comment and this comment.
			// This comment is not part of the copyright comments
			commentLine := scanner.ComputeLineOfPosition(lineMap, r.Pos())
			lastCommentEndLine := scanner.ComputeLineOfPosition(lineMap, lastComment.End())
			if commentLine >= lastCommentEndLine+2 {
				break
			}
		}

		if lenStatements > 0 {
			if firstNodeLine == -1 {
				firstNodeLine = scanner.ComputeLineOfPosition(lineMap, astnav.GetStartOfNode(sourceFile.Statements.Nodes[0], sourceFile, false))
			}
			commentEndLine := scanner.ComputeLineOfPosition(lineMap, r.End())
			if firstNodeLine < commentEndLine+2 {
				break
			}
		}
		lastComment = &r
		pinnedOrTripleSlash = false
	}

	if lastComment != nil {
		position = lastComment.End()
		advancePastLineBreak()
	}
	return position
}
