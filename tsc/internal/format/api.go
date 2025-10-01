package format

import (
	"context"
	"unicode/utf8"

	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
	"github.com/microsoft/typescript-go/internal/stringutil"
)

type FormatRequestKind int

const (
	FormatRequestKindFormatDocument FormatRequestKind = iota
	FormatRequestKindFormatSelection
	FormatRequestKindFormatOnEnter
	FormatRequestKindFormatOnSemicolon
	FormatRequestKindFormatOnOpeningCurlyBrace
	FormatRequestKindFormatOnClosingCurlyBrace
)

type formatContextKey int

const (
	formatOptionsKey formatContextKey = iota
	formatNewlineKey
)

func WithFormatCodeSettings(ctx context.Context, options *FormatCodeSettings, newLine string) context.Context {
	ctx = context.WithValue(ctx, formatOptionsKey, options)
	ctx = context.WithValue(ctx, formatNewlineKey, newLine)
	// In strada, the rules map was both globally cached *and* cached into the context, for some reason. We skip that here and just use the global one.
	return ctx
}

func GetFormatCodeSettingsFromContext(ctx context.Context) *FormatCodeSettings {
	opt := ctx.Value(formatOptionsKey).(*FormatCodeSettings)
	return opt
}

func GetNewLineOrDefaultFromContext(ctx context.Context) string { // TODO: Move into broader LS - more than just the formatter uses the newline editor setting/host new line
	opt := GetFormatCodeSettingsFromContext(ctx)
	if opt != nil && len(opt.NewLineCharacter) > 0 {
		return opt.NewLineCharacter
	}
	host := ctx.Value(formatNewlineKey).(string)
	if len(host) > 0 {
		return host
	}
	return "\n"
}

func FormatSpan(ctx context.Context, span core.TextRange, file *ast.SourceFile, kind FormatRequestKind) []core.TextChange {
	// find the smallest node that fully wraps the range and compute the initial indentation for the node
	enclosingNode := findEnclosingNode(span, file)
	opts := GetFormatCodeSettingsFromContext(ctx)

	return newFormattingScanner(
		file.Text(),
		file.LanguageVariant,
		getScanStartPosition(enclosingNode, span, file),
		span.End(),
		newFormatSpanWorker(
			ctx,
			span,
			enclosingNode,
			GetIndentationForNode(enclosingNode, &span, file, opts),
			getOwnOrInheritedDelta(enclosingNode, opts, file),
			kind,
			prepareRangeContainsErrorFunction(file.Diagnostics(), span),
			file,
		),
	)
}

func FormatNodeGivenIndentation(ctx context.Context, node *ast.Node, file *ast.SourceFile, languageVariant core.LanguageVariant, initialIndentation int, delta int) []core.TextChange {
	textRange := core.NewTextRange(node.Pos(), node.End())
	return newFormattingScanner(
		file.Text(),
		languageVariant,
		textRange.Pos(),
		textRange.End(),
		newFormatSpanWorker(
			ctx,
			textRange,
			node,
			initialIndentation,
			delta,
			FormatRequestKindFormatSelection,
			func(core.TextRange) bool { return false }, // assume that node does not have any errors
			file,
		))
}

func formatNodeLines(ctx context.Context, sourceFile *ast.SourceFile, node *ast.Node, requestKind FormatRequestKind) []core.TextChange {
	if node == nil {
		return nil
	}
	tokenStart := scanner.GetTokenPosOfNode(node, sourceFile, false)
	lineStart := GetLineStartPositionForPosition(tokenStart, sourceFile)
	span := core.NewTextRange(lineStart, node.End())
	return FormatSpan(ctx, span, sourceFile, requestKind)
}

func FormatDocument(ctx context.Context, sourceFile *ast.SourceFile) []core.TextChange {
	return FormatSpan(ctx, core.NewTextRange(0, sourceFile.End()), sourceFile, FormatRequestKindFormatDocument)
}

func FormatSelection(ctx context.Context, sourceFile *ast.SourceFile, start int, end int) []core.TextChange {
	return FormatSpan(ctx, core.NewTextRange(GetLineStartPositionForPosition(start, sourceFile), end), sourceFile, FormatRequestKindFormatSelection)
}

func FormatOnOpeningCurly(ctx context.Context, sourceFile *ast.SourceFile, position int) []core.TextChange {
	openingCurly := findImmediatelyPrecedingTokenOfKind(position, ast.KindOpenBraceToken, sourceFile)
	if openingCurly == nil {
		return nil
	}
	curlyBraceRange := openingCurly.Parent
	outermostNode := findOutermostNodeWithinListLevel(curlyBraceRange)
	/**
	 * We limit the span to end at the opening curly to handle the case where
	 * the brace matched to that just typed will be incorrect after further edits.
	 * For example, we could type the opening curly for the following method
	 * body without brace-matching activated:
	 * ```
	 * class C {
	 *     foo()
	 * }
	 * ```
	 * and we wouldn't want to move the closing brace.
	 */
	textRange := core.NewTextRange(GetLineStartPositionForPosition(scanner.GetTokenPosOfNode(outermostNode, sourceFile, false), sourceFile), position)
	return FormatSpan(ctx, textRange, sourceFile, FormatRequestKindFormatOnOpeningCurlyBrace)
}

func FormatOnClosingCurly(ctx context.Context, sourceFile *ast.SourceFile, position int) []core.TextChange {
	precedingToken := findImmediatelyPrecedingTokenOfKind(position, ast.KindCloseBraceToken, sourceFile)
	return formatNodeLines(ctx, sourceFile, findOutermostNodeWithinListLevel(precedingToken), FormatRequestKindFormatOnClosingCurlyBrace)
}

func FormatOnSemicolon(ctx context.Context, sourceFile *ast.SourceFile, position int) []core.TextChange {
	semicolon := findImmediatelyPrecedingTokenOfKind(position, ast.KindSemicolonToken, sourceFile)
	return formatNodeLines(ctx, sourceFile, findOutermostNodeWithinListLevel(semicolon), FormatRequestKindFormatOnSemicolon)
}

func FormatOnEnter(ctx context.Context, sourceFile *ast.SourceFile, position int) []core.TextChange {
	line, _ := scanner.GetECMALineAndCharacterOfPosition(sourceFile, position)
	if line == 0 {
		return nil
	}
	// get start position for the previous line
	startPos := int(scanner.GetECMALineStarts(sourceFile)[line-1])
	// After the enter key, the cursor is now at a new line. The new line may or may not contain non-whitespace characters.
	// If the new line has only whitespaces, we won't want to format this line, because that would remove the indentation as
	// trailing whitespaces. So the end of the formatting span should be the later one between:
	//  1. the end of the previous line
	//  2. the last non-whitespace character in the current line
	endOfFormatSpan := scanner.GetECMAEndLinePosition(sourceFile, line)
	for endOfFormatSpan > startPos {
		ch, s := utf8.DecodeRuneInString(sourceFile.Text()[endOfFormatSpan:])
		if s == 0 || stringutil.IsWhiteSpaceSingleLine(ch) { // on multibyte character keep backing up
			endOfFormatSpan--
			continue
		}
		break
	}

	// if the character at the end of the span is a line break, we shouldn't include it, because it indicates we don't want to
	// touch the current line at all. Also, on some OSes the line break consists of two characters (\r\n), we should test if the
	// previous character before the end of format span is line break character as well.
	ch, _ := utf8.DecodeRuneInString(sourceFile.Text()[endOfFormatSpan:])
	if stringutil.IsLineBreak(ch) {
		endOfFormatSpan--
	}

	span := core.NewTextRange(
		startPos,
		// end value is exclusive so add 1 to the result
		endOfFormatSpan+1,
	)

	return FormatSpan(ctx, span, sourceFile, FormatRequestKindFormatOnEnter)
}
