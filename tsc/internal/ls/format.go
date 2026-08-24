package ls

import (
	"cmp"
	"context"
	"iter"
	"slices"

	"github.com/microsoft/TypeScript/tsc/internal/ast"
	"github.com/microsoft/TypeScript/tsc/internal/astnav"
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/format"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsconv"
	"github.com/microsoft/TypeScript/tsc/internal/ls/lsutil"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/scanner"
	"github.com/microsoft/TypeScript/tsc/internal/spanmap"
)

func (l *LanguageService) toLSProtoTextEdits(file *ast.SourceFile, changes []core.TextChange) []*lsproto.TextEdit {
	result := make([]*lsproto.TextEdit, 0, len(changes))
	for _, c := range changes {
		lspRange, fidelity := l.converters.ToLSPRange(file, core.NewTextRange(c.Pos(), c.End()))
		if !fidelity.IsExact() {
			return nil
		}
		result = append(result, &lsproto.TextEdit{
			NewText: c.NewText,
			Range:   lspRange,
		})
	}
	return result
}

func (l *LanguageService) ProvideFormatDocument(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	options *lsproto.FormattingOptions,
) (lsproto.DocumentFormattingResponse, error) {
	if l.UserPreferences().EnableFormatting.IsFalse() {
		return lsproto.TextEditsOrNull{}, nil
	}
	_, file := l.getProgramAndFile(documentURI)
	formatOpts := lsutil.FromLSFormatOptions(l.FormatOptions(), options)
	var edits []*lsproto.TextEdit
	if file.ContentMapper() == "" {
		edits = l.toLSProtoTextEdits(file, l.getFormattingEditsForDocument(ctx, file, formatOpts))
	} else {
		edits = l.getFormattingEditsForMappedRange(ctx, file, formatOpts, core.NewTextRange(0, len(file.OriginalText())))
	}
	return lsproto.TextEditsOrNull{TextEdits: &edits}, nil
}

// getFormattingEditsForMappedRange formats each formatting-enabled verbatim intersection with originalRange.
// Duplicate formatting projections are unsupported. If mappings overlap anyway, each original-text position
// is formatted only once, preferring the earliest and then longest applicable mapping.
func (l *LanguageService) getFormattingEditsForMappedRange(ctx context.Context, file *ast.SourceFile, options lsutil.FormatCodeSettings, originalRange core.TextRange) []*lsproto.TextEdit {
	projections := append([]*ast.SourceFile{file}, file.SupplementalSourceFiles()...)
	var candidates []mappedFormattingRange
	for _, projection := range projections {
		spanMap := projection.SpanMap()
		if spanMap == nil {
			continue
		}
		for _, segment := range spanMap.Segments() {
			if segment.Kind != spanmap.KindVerbatim || segment.Features&spanmap.FeatureFormatting == 0 {
				continue
			}
			originalStart := max(originalRange.Pos(), int(segment.OriginalStart))
			originalEnd := min(originalRange.End(), int(segment.OriginalEnd))
			if originalStart >= originalEnd {
				continue
			}
			candidates = append(candidates, mappedFormattingRange{
				projection:    projection,
				segment:       segment,
				originalRange: core.NewTextRange(originalStart, originalEnd),
			})
		}
	}

	var edits []*lsproto.TextEdit
	for _, candidate := range nonOverlappingFormattingRanges(candidates) {
		virtualRange := core.NewTextRange(
			int(candidate.segment.VirtualStart)+candidate.originalRange.Pos()-int(candidate.segment.OriginalStart),
			int(candidate.segment.VirtualStart)+candidate.originalRange.End()-int(candidate.segment.OriginalStart),
		)
		for _, change := range l.getFormattingEditsForRange(ctx, candidate.projection, options, virtualRange) {
			if change.Pos() < virtualRange.Pos() || change.End() > virtualRange.End() {
				continue
			}
			lspRange, fidelity := l.converters.ToLSPRangeForFeature(candidate.projection, core.NewTextRange(change.Pos(), change.End()), spanmap.FeatureFormatting)
			if !fidelity.IsExact() {
				continue
			}
			edits = append(edits, &lsproto.TextEdit{Range: lspRange, NewText: change.NewText})
		}
	}
	slices.SortStableFunc(edits, func(a, b *lsproto.TextEdit) int {
		if c := lsproto.CompareRanges(a.Range, b.Range); c != 0 {
			return c
		}
		return cmp.Compare(a.NewText, b.NewText)
	})
	return edits
}

type mappedFormattingRange struct {
	projection    *ast.SourceFile
	segment       spanmap.Segment
	originalRange core.TextRange
}

// nonOverlappingFormattingRanges chooses at most one formatting projection for each original-text position.
// Candidates are ordered by original start and then descending end, so a longer mapping wins when several
// mappings start together:
//
//	candidates:  [---------- A ----------)
//	             [---- B ----)
//	result:      [---------- A ----------)
//
// Since starts are ordered, a candidate can only overlap the end of the last accepted range. Its start is
// trimmed to that end, preserving any uncovered suffix:
//
//	candidates:  [------- A -------)
//	                    [------- B ----------)
//	result:      [------- A -------)[-- B' --)
//
// Fully covered candidates have no suffix and are discarded. The segment itself is retained so callers can
// translate a trimmed original range to the corresponding offset in its virtual projection.
func nonOverlappingFormattingRanges(candidates []mappedFormattingRange) []mappedFormattingRange {
	candidates = slices.Clone(candidates)
	slices.SortStableFunc(candidates, func(a, b mappedFormattingRange) int {
		if c := cmp.Compare(a.originalRange.Pos(), b.originalRange.Pos()); c != 0 {
			return c
		}
		return cmp.Compare(b.originalRange.End(), a.originalRange.End())
	})

	result := candidates[:0]
	for _, candidate := range candidates {
		if len(result) > 0 {
			candidate.originalRange = candidate.originalRange.WithPos(max(candidate.originalRange.Pos(), result[len(result)-1].originalRange.End()))
		}
		if candidate.originalRange.Len() > 0 {
			result = append(result, candidate)
		}
	}
	return result
}

func (l *LanguageService) ProvideFormatDocumentRange(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	options *lsproto.FormattingOptions,
	r lsproto.Range,
) (lsproto.DocumentRangeFormattingResponse, error) {
	if l.UserPreferences().EnableFormatting.IsFalse() {
		return lsproto.TextEditsOrNull{}, nil
	}
	_, file := l.getProgramAndFile(documentURI)
	formatOpts := lsutil.FromLSFormatOptions(l.FormatOptions(), options)
	if file.ContentMapper() != "" {
		edits := l.getFormattingEditsForMappedRange(ctx, file, formatOpts, lsconv.FromLSPRangeToOriginal(l.converters, file, r))
		return lsproto.TextEditsOrNull{TextEdits: &edits}, nil
	}
	ranges := lsconv.FromLSPRangeForSourceFile(l.converters, file, r, spanmap.FeatureFormatting)
	if len(ranges) != 1 || !ranges[0].Fidelity.IsExact() {
		return lsproto.TextEditsOrNull{}, nil
	}
	file = ranges[0].Script
	edits := l.toLSProtoTextEdits(file, l.getFormattingEditsForRange(
		ctx,
		file,
		formatOpts,
		ranges[0].Span,
	))
	return lsproto.TextEditsOrNull{TextEdits: &edits}, nil
}

func (l *LanguageService) ProvideFormatDocumentOnType(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	options *lsproto.FormattingOptions,
	position lsproto.Position,
	character string,
) (lsproto.DocumentOnTypeFormattingResponse, error) {
	if l.UserPreferences().EnableFormatting.IsFalse() {
		return lsproto.TextEditsOrNull{}, nil
	}
	_, file := l.getProgramAndFile(documentURI)
	formatOpts := lsutil.FromLSFormatOptions(l.FormatOptions(), options)
	positions := lsconv.FromLSPPositionForSourceFile(l.converters, file, position, spanmap.FeatureFormatting)
	if len(positions) != 1 || !positions[0].Fidelity.IsExact() {
		return lsproto.TextEditsOrNull{}, nil
	}
	file = positions[0].Script
	edits := l.toLSProtoTextEdits(file, l.getFormattingEditsAfterKeystroke(
		ctx,
		file,
		formatOpts,
		int(positions[0].Position),
		character,
	))
	return lsproto.TextEditsOrNull{TextEdits: &edits}, nil
}

func (l *LanguageService) getFormattingEditsForRange(
	ctx context.Context,
	file *ast.SourceFile,
	options lsutil.FormatCodeSettings,
	r core.TextRange,
) []core.TextChange {
	ctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)
	return format.FormatSelection(ctx, file, r.Pos(), r.End())
}

func (l *LanguageService) getFormattingEditsForDocument(
	ctx context.Context,
	file *ast.SourceFile,
	options lsutil.FormatCodeSettings,
) []core.TextChange {
	ctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)
	return format.FormatDocument(ctx, file)
}

func (l *LanguageService) getFormattingEditsAfterKeystroke(
	ctx context.Context,
	file *ast.SourceFile,
	options lsutil.FormatCodeSettings,
	position int,
	key string,
) []core.TextChange {
	ctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)

	tokenAtPosition := astnav.GetTokenAtPosition(file, position)
	if isInComment(file, position, tokenAtPosition) == nil {
		switch key {
		case "{":
			return format.FormatOnOpeningCurly(ctx, file, position)
		case "}":
			return format.FormatOnClosingCurly(ctx, file, position)
		case ";":
			return format.FormatOnSemicolon(ctx, file, position)
		case "\n":
			return format.FormatOnEnter(ctx, file, position)
		default:
			return nil
		}
	}
	return nil
}

// Unlike the TS implementation, this function *will not* compute default values for
// `precedingToken` and `tokenAtPosition`.
// It is the caller's responsibility to call `astnav.GetTokenAtPosition` to compute a default `tokenAtPosition`,
// or `astnav.FindPrecedingToken` to compute a default `precedingToken`.
func getRangeOfEnclosingComment(
	file *ast.SourceFile,
	position int,
	precedingToken *ast.Node,
	tokenAtPosition *ast.Node,
) *ast.CommentRange {
	jsdoc := ast.FindAncestor(tokenAtPosition, (*ast.Node).IsJSDoc)
	if jsdoc != nil {
		tokenAtPosition = jsdoc.Parent
	}
	tokenStart := astnav.GetStartOfNode(tokenAtPosition, file, false /*includeJSDoc*/)
	if tokenStart <= position && position < tokenAtPosition.End() {
		return nil
	}

	// Between two consecutive tokens, all comments are either trailing on the former
	// or leading on the latter (and none are in both lists).
	var trailingRangesOfPreviousToken iter.Seq[ast.CommentRange]
	if precedingToken != nil {
		trailingRangesOfPreviousToken = scanner.GetTrailingCommentRanges(&ast.NodeFactory{}, file.Text(), precedingToken.End())
	}
	leadingRangesOfNextToken := getLeadingCommentRangesOfNode(tokenAtPosition, file)
	commentRanges := core.ConcatenateSeq(trailingRangesOfPreviousToken, leadingRangesOfNextToken)
	for commentRange := range commentRanges {
		// The end marker of a single-line comment does not include the newline character.
		// In the following case where the cursor is at `^`, we are inside a comment:
		//
		//    // asdf   ^\n
		//
		// But for closed multi-line comments, we don't want to be inside the comment in the following case:
		//
		//    /* asdf */^
		//
		// Internally, we represent the end of the comment prior to the newline and at the '/', respectively.
		//
		// However, unterminated multi-line comments lack a `/`, end at the end of the file, and *do* contain their end.
		//
		if commentRange.ContainsExclusive(position) ||
			position == commentRange.End() &&
				(commentRange.Kind == ast.KindSingleLineCommentTrivia || position == len(file.Text())) {
			return &commentRange
		}
	}
	return nil
}
