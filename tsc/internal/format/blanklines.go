package format

import (
	"slices"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/stringutil"
)

// blankLinesToTrim finds complete blank lines that can be deleted, leaving the
// first line break and the next element's indentation to the existing formatter.
// It returns a half-open interval of line numbers, or (-1, -1).
func (w *formatSpanWorker) blankLinesToTrim(previous, current TextRangeWithKind, currentParent *ast.Node) (int, int) {
	options := w.formattingContext.Options
	if w.requestKind != FormatRequestKindFormatDocument && w.requestKind != FormatRequestKindFormatSelection {
		return -1, -1
	}
	limit := options.MaxConsecutiveBlankLines
	zero := 0
	if options.RemoveBlankLinesBeforeClosingBrace.IsTrue() && current.Kind == ast.KindCloseBraceToken &&
		(nodeIsBlockContext(currentParent) || currentParent.Kind == ast.KindMappedType || currentParent.Kind == ast.KindObjectBindingPattern) {
		limit = &zero
	}
	if limit == nil || *limit < 0 || current.Kind == ast.KindEndOfFile || previous.Kind == ast.KindJsxText || current.Kind == ast.KindJsxText {
		return -1, -1
	}
	// Existing rules that replace the gap or protect non-comment content take
	// precedence. Comment rules protect their contents; whitespace outside them
	// can still be normalized.
	for _, rule := range w.currentRules {
		if rule.Action() == ruleActionDeleteSpace ||
			rule.Flags() == ruleFlagsCanDeleteNewLines && rule.Action()&ruleActionModifySpaceAction != 0 ||
			rule.Action()&ruleActionStopProcessingSpaceActions != 0 && !isComment(previous.Kind) && !isComment(current.Kind) {
			return -1, -1
		}
	}
	gap := core.NewTextRange(previous.Loc.End(), current.Loc.Pos())
	if !gap.ContainedBy(w.originalRange) || strings.ContainsFunc(w.sourceFile.Text()[gap.Pos():gap.End()], func(ch rune) bool {
		return !stringutil.IsWhiteSpaceLike(ch)
	}) {
		return -1, -1
	}
	previousEndLine := scanner.GetECMALineOfPosition(w.sourceFile, gap.Pos())
	currentLine := scanner.GetECMALineOfPosition(w.sourceFile, gap.End())
	// Compare before adding one to the limit, which may be the largest int.
	if currentLine-previousEndLine-1 <= *limit {
		return -1, -1
	}
	if slices.ContainsFunc(w.sourceFile.Diagnostics(), func(d *ast.Diagnostic) bool {
		return core.NewTextRange(previous.Loc.Pos(), current.Loc.End()).Intersects(d.Loc())
	}) {
		return -1, -1
	}
	return previousEndLine + 1, currentLine - *limit
}
