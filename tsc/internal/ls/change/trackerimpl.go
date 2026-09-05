package change

import (
	"fmt"
	"slices"
	"strings"
	"unicode"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/format"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/parser"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
)

func (t *Tracker) getTextChangesFromChanges() map[tspath.RootedFilePath][]*lsproto.TextEdit {
	changes := map[tspath.RootedFilePath][]*lsproto.TextEdit{}
	// A content-mapped file can have several projections, each keyed separately in t.changes but
	// all sharing one original file. Their edits are collected together before being ordered and checked,
	// so duplicate edits are emitted once and conflicting edits are rejected regardless of map iteration
	// order.
	projections := map[tspath.RootedFilePath]int{}
	for sourceFile, changesInFile := range t.changes.M {
		fileName := sourceFile.OriginalFileName()
		if t.unmappableFiles.Has(fileName) {
			continue
		}
		// For a content-mapped file, a mapper may reorder source text relative to the original document.
		// Convert first, then sort and check for overlap in the space where edits are actually applied.
		textChanges := core.MapNonNil(changesInFile, func(change *trackerEdit) *lsproto.TextEdit {
			// !!! targetSourceFile

			newText := t.computeNewText(change, sourceFile, sourceFile)
			// span := createTextSpanFromRange(c.Range)
			// !!!
			// Filter out redundant changes.
			// if (span.length == newText.length && stringContainsAt(targetSourceFile.text, newText, span.start)) { return nil }

			return &lsproto.TextEdit{
				NewText: newText,
				Range:   t.toLSPEditRange(sourceFile, change.TextRange),
			}
		})

		if len(textChanges) > 0 {
			changes[fileName] = append(changes[fileName], textChanges...)
			projections[fileName]++
		}
	}

	for fileName, textChanges := range changes {
		// Converting the edits above may have found that this file cannot be represented in its original
		// text. GetChanges drops it, so its order does not matter, and the best-effort ranges left behind
		// may overlap in ways the check below would refuse.
		if t.unmappableFiles.Has(fileName) {
			continue
		}
		// order changes by start position
		// If the start position is the same, put the shorter range first, since an empty range (x, x) may precede (x, y) but not vice-versa.
		slices.SortStableFunc(textChanges, func(a, b *lsproto.TextEdit) int { return lsproto.CompareRanges(a.Range, b.Range) })
		if projections[fileName] > 1 {
			textChanges = dedupeIdenticalEdits(textChanges)
			changes[fileName] = textChanges
		}
		// verify that change intervals do not overlap, except possibly at end points.
		for i := range len(textChanges) - 1 {
			if textEditsConflict(textChanges[i], textChanges[i+1], projections[fileName] > 1) {
				if projections[fileName] > 1 {
					// Projections of one original range disagree about how to edit it. That is a property of
					// the mapper's output rather than a bug here, so drop the file instead of failing.
					t.unmappableFiles.Add(fileName)
					break
				}
				// assert change[i].End <= change[i + 1].Start
				panic(fmt.Sprintf("changes overlap: %v and %v", textChanges[i].Range, textChanges[i+1].Range))
			}
		}
	}
	return changes
}

// dedupeIdenticalEdits drops exact duplicates from a sorted slice of edits. When a mapper copies one span
// of the original into more than one projection, an edit computed against each projection describes the
// same change to the same original range; emitting it once per projection would apply it repeatedly.
func dedupeIdenticalEdits(edits []*lsproto.TextEdit) []*lsproto.TextEdit {
	deduped := edits[:0]
	for _, edit := range edits {
		if n := len(deduped); n > 0 && deduped[n-1].Range == edit.Range && deduped[n-1].NewText == edit.NewText {
			continue
		}
		deduped = append(deduped, edit)
	}
	return deduped
}

func textEditsConflict(a, b *lsproto.TextEdit, multipleProjections bool) bool {
	if lsproto.ComparePositions(a.Range.End, b.Range.Start) > 0 {
		return true
	}
	// Different insertions at the same position are ambiguous when they may come from different projections.
	return multipleProjections &&
		a.Range.Start == a.Range.End &&
		a.Range == b.Range &&
		a.NewText != b.NewText
}

func (t *Tracker) computeNewText(change *trackerEdit, targetSourceFile *ast.SourceFile, sourceFile *ast.SourceFile) string {
	switch change.kind {
	case trackerEditKindRemove:
		return ""
	case trackerEditKindText:
		return change.NewText
	}

	pos := change.TextRange.Pos()
	formatNode := func(n *ast.Node) string {
		return t.getFormattedTextOfNode(n, targetSourceFile, sourceFile, pos, change.options)
	}

	var text string
	switch change.kind {
	case trackerEditKindReplaceWithMultipleNodes:
		joiner := change.options.joiner
		if joiner == "" {
			joiner = t.newLine
		}
		text = strings.Join(core.Map(change.nodes, func(n *ast.Node) string { return strings.TrimSuffix(formatNode(n), t.newLine) }), joiner)
	case trackerEditKindReplaceWithSingleNode:
		text = formatNode(change.Node)
	default:
		panic(fmt.Sprintf("change kind %d should have been handled earlier", change.kind))
	}
	// Strip initial indentation if text will be inserted in the middle of the line.
	noIndent := text
	if !(change.options.indentation != nil || format.GetLineStartPositionForPosition(pos, sourceFile) == pos) {
		noIndent = strings.TrimLeftFunc(text, unicode.IsSpace)
	}
	result := change.options.Prefix + noIndent + core.IfElse(strings.HasSuffix(noIndent, change.options.Suffix), "", change.options.Suffix)
	return t.reindentInsertedLines(sourceFile, change, result)
}

// reindentInsertedLines fixes the indentation of a line an insertion introduces into the document the
// edit is applied to. The inserted text forms its own line when it ends in a newline, and that line has to
// pick up the indentation of the line it is being spliced into. Where the indentation goes depends on
// which side of the insertion point it already sits on:
//
//   - Inserting after a line's indentation (`\t\tfoo` with the point before `foo`) leaves the inserted text
//     indented but pushes the rest of the line down bare, so the indentation is repeated after the text.
//   - Inserting at the very start of a line leaves the existing text indented but puts the inserted text at
//     column zero, so the indentation is emitted before the text.
//
// The indentation is read from the original text at the edit's original position, so it holds for a
// content-mapped file whose projection is indented differently from the document the edit is applied to.
// Edits carrying an explicit indentation option are left alone.
func (t *Tracker) reindentInsertedLines(sourceFile *ast.SourceFile, change *trackerEdit, text string) string {
	if text == "" || change.TextRange.Pos() != change.TextRange.End() || change.options.indentation != nil {
		return text
	}
	if !strings.HasSuffix(text, t.newLine) {
		return text
	}
	original := sourceFile.OriginalText()
	pos := change.TextRange.Pos()
	if spans := sourceFile.SpanMap(); spans != nil {
		mapped, fidelity := spans.VirtualToOriginalPosition(core.TextPos(pos))
		if !fidelity.IsExact() {
			return text
		}
		pos = int(mapped)
	}
	if pos < 0 || pos > len(original) {
		return text
	}
	lineStart := strings.LastIndexAny(original[:pos], "\r\n") + 1
	beforePoint := original[lineStart:pos]
	if beforePoint == "" {
		// At the start of a line: the existing text keeps its indentation, and the inserted line needs it —
		// but only when the formatter left the text at column zero. Where the formatter already indented it
		// (inserting into a multi-line list, say), that indentation is the correct one.
		if leadingIndentation(text) != "" {
			return text
		}
		return leadingIndentation(original[lineStart:]) + text
	}
	if leadingIndentation(beforePoint) != beforePoint {
		return text
	}
	// Just past the indentation: the inserted line already has it, the text pushed down needs it back.
	return text + beforePoint
}

func leadingIndentation(text string) string {
	end := 0
	for end < len(text) && (text[end] == ' ' || text[end] == '\t') {
		end++
	}
	return text[:end]
}

func (t *Tracker) getFormattedTextOfNode(nodeIn *ast.Node, targetSourceFile *ast.SourceFile, sourceFile *ast.SourceFile, pos int, options NodeOptions) string {
	text, sourceFileLike := t.getNonformattedText(nodeIn, targetSourceFile)
	// !!! if (validate) validate(node, text);
	formatOptions := GetFormatCodeSettingsForWriting(t.formatSettings, targetSourceFile)

	var initialIndentation, delta int
	if options.indentation == nil {
		initialIndentation = format.GetIndentation(pos, sourceFile, formatOptions, options.Prefix == t.newLine || format.GetLineStartPositionForPosition(pos, sourceFile) == pos)
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

func GetFormatCodeSettingsForWriting(options lsutil.FormatCodeSettings, sourceFile *ast.SourceFile) lsutil.FormatCodeSettings {
	shouldAutoDetectSemicolonPreference := options.Semicolons == lsutil.SemicolonPreferenceIgnore
	shouldRemoveSemicolons := options.Semicolons == lsutil.SemicolonPreferenceRemove || shouldAutoDetectSemicolonPreference && !lsutil.ProbablyUsesSemicolons(sourceFile)
	if shouldRemoveSemicolons {
		options.Semicolons = lsutil.SemicolonPreferenceRemove
	}

	return options
}

func (t *Tracker) getNonformattedText(node *ast.Node, sourceFile *ast.SourceFile) (string, *ast.Node) {
	text, nodeOut := printer.PrintAndPositionNode(t.NodeFactory, node, sourceFile, t.newLine, t.formatSettings.IndentSize, t.EmitContext)
	sourceFileLike := printer.CreateSyntheticSourceFile(
		t.NodeFactory,
		nodeOut,
		text,
		ast.SourceFileParseOptions{FileName: sourceFile.FileName(), PathKey: sourceFile.PathKey()},
	)
	return text, sourceFileLike.AsNode()
}

// method on the changeTracker because use of converters
// GetAdjustedRange computes the adjusted range for a node in a source file, accounting for trivia.
func (t *Tracker) GetAdjustedRange(sourceFile *ast.SourceFile, startNode *ast.Node, endNode *ast.Node, leadingOption LeadingTriviaOption, trailingOption TrailingTriviaOption) core.TextRange {
	return core.NewTextRange(
		t.getAdjustedStartPosition(sourceFile, startNode, leadingOption, false),
		t.getAdjustedEndPosition(sourceFile, endNode, trailingOption),
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
