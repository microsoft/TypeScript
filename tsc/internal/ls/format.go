package ls

import (
	"context"
	"iter"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/astnav"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/scanner"
)

func toFormatCodeSettings(opt *lsproto.FormattingOptions, newLine string) *format.FormatCodeSettings {
	initial := format.GetDefaultFormatCodeSettings(newLine)
	initial.TabSize = int(opt.TabSize)
	initial.IndentSize = int(opt.TabSize)
	initial.ConvertTabsToSpaces = opt.InsertSpaces
	if opt.TrimTrailingWhitespace != nil {
		initial.TrimTrailingWhitespace = *opt.TrimTrailingWhitespace
	}

	// !!! get format settings
	// TODO: We support a _lot_ more options than this
	return initial
}

func (l *LanguageService) toLSProtoTextEdits(file *ast.SourceFile, changes []core.TextChange) []*lsproto.TextEdit {
	result := make([]*lsproto.TextEdit, 0, len(changes))
	for _, c := range changes {
		result = append(result, &lsproto.TextEdit{
			NewText: c.NewText,
			Range:   *l.createLspRangeFromBounds(c.Pos(), c.End(), file),
		})
	}
	return result
}

func (l *LanguageService) ProvideFormatDocument(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	options *lsproto.FormattingOptions,
) (lsproto.DocumentFormattingResponse, error) {
	_, file := l.getProgramAndFile(documentURI)
	edits := l.toLSProtoTextEdits(file, l.getFormattingEditsForDocument(
		ctx,
		file,
		toFormatCodeSettings(options, l.GetProgram().Options().NewLine.GetNewLineCharacter()),
	))
	return lsproto.TextEditsOrNull{TextEdits: &edits}, nil
}

func (l *LanguageService) ProvideFormatDocumentRange(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	options *lsproto.FormattingOptions,
	r lsproto.Range,
) (lsproto.DocumentRangeFormattingResponse, error) {
	_, file := l.getProgramAndFile(documentURI)
	edits := l.toLSProtoTextEdits(file, l.getFormattingEditsForRange(
		ctx,
		file,
		toFormatCodeSettings(options, l.GetProgram().Options().NewLine.GetNewLineCharacter()),
		l.converters.FromLSPRange(file, r),
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
	_, file := l.getProgramAndFile(documentURI)
	edits := l.toLSProtoTextEdits(file, l.getFormattingEditsAfterKeystroke(
		ctx,
		file,
		toFormatCodeSettings(options, l.GetProgram().Options().NewLine.GetNewLineCharacter()),
		int(l.converters.LineAndCharacterToPosition(file, position)),
		character,
	))
	return lsproto.TextEditsOrNull{TextEdits: &edits}, nil
}

func (l *LanguageService) getFormattingEditsForRange(
	ctx context.Context,
	file *ast.SourceFile,
	options *format.FormatCodeSettings,
	r core.TextRange,
) []core.TextChange {
	ctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)
	return format.FormatSelection(ctx, file, r.Pos(), r.End())
}

func (l *LanguageService) getFormattingEditsForDocument(
	ctx context.Context,
	file *ast.SourceFile,
	options *format.FormatCodeSettings,
) []core.TextChange {
	ctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)
	return format.FormatDocument(ctx, file)
}

func (l *LanguageService) getFormattingEditsAfterKeystroke(
	ctx context.Context,
	file *ast.SourceFile,
	options *format.FormatCodeSettings,
	position int,
	key string,
) []core.TextChange {
	ctx = format.WithFormatCodeSettings(ctx, options, options.NewLineCharacter)

	if isInComment(file, position, nil) == nil {
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
