package format

import (
	"github.com/microsoft/typescript-go/internal/ast"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/scanner"
)

type IndentStyle int

const (
	IndentStyleNone IndentStyle = iota
	IndentStyleBlock
	IndentStyleSmart
)

type SemicolonPreference string

const (
	SemicolonPreferenceIgnore SemicolonPreference = "ignore"
	SemicolonPreferenceInsert SemicolonPreference = "insert"
	SemicolonPreferenceRemove SemicolonPreference = "remove"
)

type EditorSettings struct {
	BaseIndentSize         int
	IndentSize             int
	TabSize                int
	NewLineCharacter       string
	ConvertTabsToSpaces    bool
	IndentStyle            IndentStyle
	TrimTrailingWhitespace bool
}

type FormatCodeSettings struct {
	EditorSettings
	InsertSpaceAfterCommaDelimiter                              core.Tristate
	InsertSpaceAfterSemicolonInForStatements                    core.Tristate
	InsertSpaceBeforeAndAfterBinaryOperators                    core.Tristate
	InsertSpaceAfterConstructor                                 core.Tristate
	InsertSpaceAfterKeywordsInControlFlowStatements             core.Tristate
	InsertSpaceAfterFunctionKeywordForAnonymousFunctions        core.Tristate
	InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis  core.Tristate
	InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets     core.Tristate
	InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces       core.Tristate
	InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces          core.Tristate
	InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces core.Tristate
	InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces  core.Tristate
	InsertSpaceAfterTypeAssertion                               core.Tristate
	InsertSpaceBeforeFunctionParenthesis                        core.Tristate
	PlaceOpenBraceOnNewLineForFunctions                         core.Tristate
	PlaceOpenBraceOnNewLineForControlBlocks                     core.Tristate
	InsertSpaceBeforeTypeAnnotation                             core.Tristate
	IndentMultiLineObjectLiteralBeginningOnBlankLine            core.Tristate
	Semicolons                                                  SemicolonPreference
	IndentSwitchCase                                            core.Tristate
}

func GetDefaultFormatCodeSettings(newLineCharacter string) *FormatCodeSettings {
	return &FormatCodeSettings{
		EditorSettings: EditorSettings{
			IndentSize:             4,
			TabSize:                4,
			NewLineCharacter:       newLineCharacter,
			ConvertTabsToSpaces:    true,
			IndentStyle:            IndentStyleSmart,
			TrimTrailingWhitespace: true,
		},
		InsertSpaceAfterConstructor:                                 core.TSFalse,
		InsertSpaceAfterCommaDelimiter:                              core.TSTrue,
		InsertSpaceAfterSemicolonInForStatements:                    core.TSTrue,
		InsertSpaceBeforeAndAfterBinaryOperators:                    core.TSTrue,
		InsertSpaceAfterKeywordsInControlFlowStatements:             core.TSTrue,
		InsertSpaceAfterFunctionKeywordForAnonymousFunctions:        core.TSFalse,
		InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:  core.TSFalse,
		InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:     core.TSFalse,
		InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces:       core.TSTrue,
		InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: core.TSFalse,
		InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces:  core.TSFalse,
		InsertSpaceBeforeFunctionParenthesis:                        core.TSFalse,
		PlaceOpenBraceOnNewLineForFunctions:                         core.TSFalse,
		PlaceOpenBraceOnNewLineForControlBlocks:                     core.TSFalse,
		Semicolons:                                                  SemicolonPreferenceIgnore,
		IndentSwitchCase:                                            core.TSTrue,
	}
}

type FormattingContext struct {
	currentTokenSpan   TextRangeWithKind
	nextTokenSpan      TextRangeWithKind
	contextNode        *ast.Node
	currentTokenParent *ast.Node
	nextTokenParent    *ast.Node

	contextNodeAllOnSameLine    core.Tristate
	nextNodeAllOnSameLine       core.Tristate
	tokensAreOnSameLine         core.Tristate
	contextNodeBlockIsOnOneLine core.Tristate
	nextNodeBlockIsOnOneLine    core.Tristate

	SourceFile            *ast.SourceFile
	FormattingRequestKind FormatRequestKind
	Options               *FormatCodeSettings

	scanner *scanner.Scanner
}

func NewFormattingContext(file *ast.SourceFile, kind FormatRequestKind, options *FormatCodeSettings) *FormattingContext {
	res := &FormattingContext{
		SourceFile:            file,
		FormattingRequestKind: kind,
		Options:               options,
		scanner:               scanner.NewScanner(),
	}
	res.scanner.SetText(file.Text())
	res.scanner.SetSkipTrivia(true)
	return res
}

func (this *FormattingContext) UpdateContext(cur TextRangeWithKind, curParent *ast.Node, next TextRangeWithKind, nextParent *ast.Node, commonParent *ast.Node) {
	if curParent == nil {
		panic("nil current range node parent in update context")
	}
	if nextParent == nil {
		panic("nil next range node parent in update context")
	}
	if commonParent == nil {
		panic("nil common parent node in update context")
	}
	this.currentTokenSpan = cur
	this.currentTokenParent = curParent
	this.nextTokenSpan = next
	this.nextTokenParent = nextParent
	this.contextNode = commonParent

	// drop cached results
	this.contextNodeAllOnSameLine = core.TSUnknown
	this.nextNodeAllOnSameLine = core.TSUnknown
	this.tokensAreOnSameLine = core.TSUnknown
	this.contextNodeBlockIsOnOneLine = core.TSUnknown
	this.nextNodeBlockIsOnOneLine = core.TSUnknown
}

func (this *FormattingContext) rangeIsOnOneLine(node core.TextRange) core.Tristate {
	if rangeIsOnOneLine(node, this.SourceFile) {
		return core.TSTrue
	}
	return core.TSFalse
}

func (this *FormattingContext) nodeIsOnOneLine(node *ast.Node) core.Tristate {
	return this.rangeIsOnOneLine(withTokenStart(node, this.SourceFile))
}

func withTokenStart(loc *ast.Node, file *ast.SourceFile) core.TextRange {
	startPos := scanner.GetTokenPosOfNode(loc, file, false)
	return core.NewTextRange(startPos, loc.End())
}

func (this *FormattingContext) blockIsOnOneLine(node *ast.Node) core.Tristate {
	// In strada, this relies on token child manifesting - we just use the scanner here,
	// so this will have a differing performance profile. Is this OK? Needs profiling to know.
	this.scanner.ResetPos(node.Pos())
	end := node.End()
	firstOpenBrace := -1
	lastCloseBrace := -1
	for this.scanner.TokenEnd() < end {
		// tokenStart instead of tokenfullstart to skip trivia
		if firstOpenBrace == -1 && this.scanner.Token() == ast.KindOpenBraceToken {
			firstOpenBrace = this.scanner.TokenStart()
		} else if this.scanner.Token() == ast.KindCloseBraceToken {
			lastCloseBrace = this.scanner.TokenStart()
		}
		this.scanner.Scan()
	}
	if firstOpenBrace != -1 && lastCloseBrace != -1 {
		return this.rangeIsOnOneLine(core.NewTextRange(firstOpenBrace, lastCloseBrace))
	}
	return core.TSFalse
}

func (this *FormattingContext) ContextNodeAllOnSameLine() bool {
	if this.contextNodeAllOnSameLine == core.TSUnknown {
		this.contextNodeAllOnSameLine = this.nodeIsOnOneLine(this.contextNode)
	}
	return this.contextNodeAllOnSameLine == core.TSTrue
}

func (this *FormattingContext) NextNodeAllOnSameLine() bool {
	if this.nextNodeAllOnSameLine == core.TSUnknown {
		this.nextNodeAllOnSameLine = this.nodeIsOnOneLine(this.nextTokenParent)
	}
	return this.nextNodeAllOnSameLine == core.TSTrue
}

func (this *FormattingContext) TokensAreOnSameLine() bool {
	if this.tokensAreOnSameLine == core.TSUnknown {
		this.tokensAreOnSameLine = this.rangeIsOnOneLine(core.NewTextRange(this.currentTokenSpan.Loc.Pos(), this.nextTokenSpan.Loc.End()))
	}
	return this.tokensAreOnSameLine == core.TSTrue
}

func (this *FormattingContext) ContextNodeBlockIsOnOneLine() bool {
	if this.contextNodeBlockIsOnOneLine == core.TSUnknown {
		this.contextNodeBlockIsOnOneLine = this.blockIsOnOneLine(this.contextNode)
	}
	return this.contextNodeBlockIsOnOneLine == core.TSTrue
}

func (this *FormattingContext) NextNodeBlockIsOnOneLine() bool {
	if this.nextNodeBlockIsOnOneLine == core.TSUnknown {
		this.nextNodeBlockIsOnOneLine = this.blockIsOnOneLine(this.nextTokenParent)
	}
	return this.nextNodeBlockIsOnOneLine == core.TSTrue
}
