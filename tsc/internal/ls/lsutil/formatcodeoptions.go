package lsutil

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
)

type IndentStyle int

const (
	IndentStyleNone IndentStyle = iota
	IndentStyleBlock
	IndentStyleSmart
)

func parseIndentStyle(v any) IndentStyle {
	switch s := v.(type) {
	case string:
		switch strings.ToLower(s) {
		case "none":
			return IndentStyleNone
		case "block":
			return IndentStyleBlock
		case "smart":
			return IndentStyleSmart
		}
	case float64:
		return IndentStyle(int(s))
	case int:
		return IndentStyle(s)
	}
	return IndentStyleSmart
}

type SemicolonPreference string

const (
	SemicolonPreferenceIgnore SemicolonPreference = "ignore"
	SemicolonPreferenceInsert SemicolonPreference = "insert"
	SemicolonPreferenceRemove SemicolonPreference = "remove"
)

func parseSemicolonPreference(v any) SemicolonPreference {
	if s, ok := v.(string); ok {
		switch strings.ToLower(s) {
		case "ignore":
			return SemicolonPreferenceIgnore
		case "insert":
			return SemicolonPreferenceInsert
		case "remove":
			return SemicolonPreferenceRemove
		}
	}
	return SemicolonPreferenceIgnore
}

type EditorSettings struct {
	BaseIndentSize         int           `raw:"baseIndentSize" config:"format.baseIndentSize"`
	IndentSize             int           `raw:"indentSize" config:"format.indentSize"`
	TabSize                int           `raw:"tabSize" config:"format.tabSize"`
	NewLineCharacter       string        `raw:"newLineCharacter" config:"format.newLineCharacter"`
	ConvertTabsToSpaces    core.Tristate `raw:"convertTabsToSpaces" config:"format.convertTabsToSpaces"`
	IndentStyle            IndentStyle   `raw:"indentStyle" config:"format.indentStyle"`
	TrimTrailingWhitespace core.Tristate `raw:"trimTrailingWhitespace" config:"format.trimTrailingWhitespace"`
}

type FormatCodeSettings struct {
	EditorSettings
	InsertSpaceAfterCommaDelimiter                              core.Tristate       `raw:"insertSpaceAfterCommaDelimiter" config:"format.insertSpaceAfterCommaDelimiter"`
	InsertSpaceAfterSemicolonInForStatements                    core.Tristate       `raw:"insertSpaceAfterSemicolonInForStatements" config:"format.insertSpaceAfterSemicolonInForStatements"`
	InsertSpaceBeforeAndAfterBinaryOperators                    core.Tristate       `raw:"insertSpaceBeforeAndAfterBinaryOperators" config:"format.insertSpaceBeforeAndAfterBinaryOperators"`
	InsertSpaceAfterConstructor                                 core.Tristate       `raw:"insertSpaceAfterConstructor" config:"format.insertSpaceAfterConstructor"`
	InsertSpaceAfterKeywordsInControlFlowStatements             core.Tristate       `raw:"insertSpaceAfterKeywordsInControlFlowStatements" config:"format.insertSpaceAfterKeywordsInControlFlowStatements"`
	InsertSpaceAfterFunctionKeywordForAnonymousFunctions        core.Tristate       `raw:"insertSpaceAfterFunctionKeywordForAnonymousFunctions" config:"format.insertSpaceAfterFunctionKeywordForAnonymousFunctions"`
	InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis  core.Tristate       `raw:"insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis" config:"format.insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis"`
	InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets     core.Tristate       `raw:"insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets" config:"format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets"`
	InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces       core.Tristate       `raw:"insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces" config:"format.insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces"`
	InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces          core.Tristate       `raw:"insertSpaceAfterOpeningAndBeforeClosingEmptyBraces" config:"format.insertSpaceAfterOpeningAndBeforeClosingEmptyBraces"`
	InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces core.Tristate       `raw:"insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces" config:"format.insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces"`
	InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces  core.Tristate       `raw:"insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces" config:"format.insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces"`
	InsertSpaceAfterTypeAssertion                               core.Tristate       `raw:"insertSpaceAfterTypeAssertion" config:"format.insertSpaceAfterTypeAssertion"`
	InsertSpaceBeforeFunctionParenthesis                        core.Tristate       `raw:"insertSpaceBeforeFunctionParenthesis" config:"format.insertSpaceBeforeFunctionParenthesis"`
	PlaceOpenBraceOnNewLineForFunctions                         core.Tristate       `raw:"placeOpenBraceOnNewLineForFunctions" config:"format.placeOpenBraceOnNewLineForFunctions"`
	PlaceOpenBraceOnNewLineForControlBlocks                     core.Tristate       `raw:"placeOpenBraceOnNewLineForControlBlocks" config:"format.placeOpenBraceOnNewLineForControlBlocks"`
	InsertSpaceBeforeTypeAnnotation                             core.Tristate       `raw:"insertSpaceBeforeTypeAnnotation" config:"format.insertSpaceBeforeTypeAnnotation"`
	IndentMultiLineObjectLiteralBeginningOnBlankLine            core.Tristate       `raw:"indentMultiLineObjectLiteralBeginningOnBlankLine" config:"format.indentMultiLineObjectLiteralBeginningOnBlankLine"`
	Semicolons                                                  SemicolonPreference `raw:"semicolons" config:"format.semicolons"`
	IndentSwitchCase                                            core.Tristate       `raw:"indentSwitchCase" config:"format.indentSwitchCase"`
}

func FromLSFormatOptions(f FormatCodeSettings, opt *lsproto.FormattingOptions) FormatCodeSettings {
	updatedSettings := f
	updatedSettings.TabSize = int(opt.TabSize)
	updatedSettings.IndentSize = int(opt.TabSize)
	updatedSettings.ConvertTabsToSpaces = core.BoolToTristate(opt.InsertSpaces)
	if opt.TrimTrailingWhitespace != nil {
		updatedSettings.TrimTrailingWhitespace = core.BoolToTristate(*opt.TrimTrailingWhitespace)
	}
	return updatedSettings
}

func (settings FormatCodeSettings) ToLSFormatOptions() *lsproto.FormattingOptions {
	trimTrailingWhitespace := settings.TrimTrailingWhitespace.IsTrue()
	return &lsproto.FormattingOptions{
		TabSize:                uint32(settings.TabSize),
		InsertSpaces:           settings.ConvertTabsToSpaces.IsTrue(),
		TrimTrailingWhitespace: &trimTrailingWhitespace,
	}
}

func GetDefaultFormatCodeSettings() FormatCodeSettings {
	return FormatCodeSettings{
		EditorSettings: EditorSettings{
			IndentSize:             printer.GetDefaultIndentSize(),
			TabSize:                printer.GetDefaultIndentSize(),
			NewLineCharacter:       "\n",
			ConvertTabsToSpaces:    core.TSTrue,
			IndentStyle:            IndentStyleSmart,
			TrimTrailingWhitespace: core.TSTrue,
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
