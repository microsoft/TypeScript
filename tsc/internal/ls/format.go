package ls

import (
	"context"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/format"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
)

func toFormatCodeSettings(opt *lsproto.FormattingOptions) *format.FormatCodeSettings {
	initial := format.GetDefaultFormatCodeSettings("\n")
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
) ([]*lsproto.TextEdit, error) {
	_, file := l.getProgramAndFile(documentURI)
	return l.toLSProtoTextEdits(file, l.getFormattingEditsForDocument(
		ctx,
		file,
		toFormatCodeSettings(options),
	)), nil
}

func (l *LanguageService) ProvideFormatDocumentRange(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	options *lsproto.FormattingOptions,
	r lsproto.Range,
) ([]*lsproto.TextEdit, error) {
	_, file := l.getProgramAndFile(documentURI)
	return l.toLSProtoTextEdits(file, l.getFormattingEditsForRange(
		ctx,
		file,
		toFormatCodeSettings(options),
		l.converters.FromLSPRange(file, r),
	)), nil
}

func (l *LanguageService) ProvideFormatDocumentOnType(
	ctx context.Context,
	documentURI lsproto.DocumentUri,
	options *lsproto.FormattingOptions,
	position lsproto.Position,
	character string,
) ([]*lsproto.TextEdit, error) {
	_, file := l.getProgramAndFile(documentURI)
	return l.toLSProtoTextEdits(file, l.getFormattingEditsAfterKeystroke(
		ctx,
		file,
		toFormatCodeSettings(options),
		int(l.converters.LineAndCharacterToPosition(file, position)),
		character,
	)), nil
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
