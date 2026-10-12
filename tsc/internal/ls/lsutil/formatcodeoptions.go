package lsutil

import (
	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/lsp/lsproto"
	"github.com/microsoft/TypeScript/tsc/internal/printer"
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
		IndentSize:                                           printer.GetDefaultIndentSize(),
		TabSize:                                              printer.GetDefaultIndentSize(),
		NewLineCharacter:                                     "\n",
		ConvertTabsToSpaces:                                  core.TSTrue,
		IndentStyle:                                          IndentStyleSmart,
		TrimTrailingWhitespace:                               core.TSTrue,
		InsertSpaceAfterConstructor:                          core.TSFalse,
		InsertSpaceAfterCommaDelimiter:                       core.TSTrue,
		InsertSpaceAfterSemicolonInForStatements:             core.TSTrue,
		InsertSpaceBeforeAndAfterBinaryOperators:             core.TSTrue,
		InsertSpaceAfterKeywordsInControlFlowStatements:      core.TSTrue,
		InsertSpaceAfterFunctionKeywordForAnonymousFunctions: core.TSFalse,
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
