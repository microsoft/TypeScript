package lsutil

import (
	"strings"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/lsp/lsproto"
	"github.com/microsoft/typescript-go/internal/printer"
	"github.com/microsoft/typescript-go/internal/tsoptions"
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

func FromLSFormatOptions(f *FormatCodeSettings, opt *lsproto.FormattingOptions) *FormatCodeSettings {
	updatedSettings := f.Copy()
	updatedSettings.TabSize = int(opt.TabSize)
	updatedSettings.IndentSize = int(opt.TabSize)
	updatedSettings.ConvertTabsToSpaces = opt.InsertSpaces
	if opt.TrimTrailingWhitespace != nil {
		updatedSettings.TrimTrailingWhitespace = *opt.TrimTrailingWhitespace
	}
	return updatedSettings
}

func (settings *FormatCodeSettings) ToLSFormatOptions() *lsproto.FormattingOptions {
	return &lsproto.FormattingOptions{
		TabSize:                uint32(settings.TabSize),
		InsertSpaces:           settings.ConvertTabsToSpaces,
		TrimTrailingWhitespace: &settings.TrimTrailingWhitespace,
	}
}

func (settings *FormatCodeSettings) ParseEditorSettings(editorSettings map[string]any) *FormatCodeSettings {
	if editorSettings == nil {
		return settings
	}
	for name, value := range editorSettings {
		switch strings.ToLower(name) {
		case "baseindentsize", "indentsize", "tabsize", "newlinecharacter", "converttabstospaces", "indentstyle", "trimtrailingwhitespace":
			settings.Set(name, value)
		}
	}
	return settings
}

func (settings *FormatCodeSettings) Parse(prefs any) bool {
	formatSettingsMap, ok := prefs.(map[string]any)
	formatSettingsParsed := false
	if !ok {
		return false
	}
	for name, value := range formatSettingsMap {
		formatSettingsParsed = settings.Set(name, value) || formatSettingsParsed
	}
	return formatSettingsParsed
}

func (settings *FormatCodeSettings) Set(name string, value any) bool {
	switch strings.ToLower(name) {
	case "baseindentsize":
		settings.BaseIndentSize = parseIntWithDefault(value, 0)
	case "indentsize":
		settings.IndentSize = parseIntWithDefault(value, printer.GetDefaultIndentSize())
	case "tabsize":
		settings.TabSize = parseIntWithDefault(value, printer.GetDefaultIndentSize())
	case "newlinecharacter":
		settings.NewLineCharacter = core.GetNewLineKind(tsoptions.ParseString(value)).GetNewLineCharacter()
	case "converttabstospaces":
		settings.ConvertTabsToSpaces = parseBoolWithDefault(value, true)
	case "indentstyle":
		settings.IndentStyle = parseIndentStyle(value)
	case "trimtrailingwhitespace":
		settings.TrimTrailingWhitespace = parseBoolWithDefault(value, true)
	case "insertspaceaftercommadelimiter":
		settings.InsertSpaceAfterCommaDelimiter = tsoptions.ParseTristate(value)
	case "insertspaceaftersemicoloninformstatements":
		settings.InsertSpaceAfterSemicolonInForStatements = tsoptions.ParseTristate(value)
	case "insertspacebeforeandafterbinaryoperators":
		settings.InsertSpaceBeforeAndAfterBinaryOperators = tsoptions.ParseTristate(value)
	case "insertspaceafterconstructor":
		settings.InsertSpaceAfterConstructor = tsoptions.ParseTristate(value)
	case "insertspaceafterkeywordsincontrolflowstatements":
		settings.InsertSpaceAfterKeywordsInControlFlowStatements = tsoptions.ParseTristate(value)
	case "insertspaceafterfunctionkeywordforanonymousfunctions":
		settings.InsertSpaceAfterFunctionKeywordForAnonymousFunctions = tsoptions.ParseTristate(value)
	case "insertspaceafteropeningandbeforeclosingnonemptyparenthesis":
		settings.InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis = tsoptions.ParseTristate(value)
	case "insertspaceafteropeningandbeforeclosingnonemptybrackets":
		settings.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets = tsoptions.ParseTristate(value)
	case "insertspaceafteropeningandbeforeclosingnonemptybraces":
		settings.InsertSpaceAfterOpeningAndBeforeClosingNonemptyBraces = tsoptions.ParseTristate(value)
	case "insertspaceafteropeningandbeforeclosingemptybraces":
		settings.InsertSpaceAfterOpeningAndBeforeClosingEmptyBraces = tsoptions.ParseTristate(value)
	case "insertspaceafteropeningandbeforeclosingtemplatesttringbraces":
		settings.InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces = tsoptions.ParseTristate(value)
	case "insertspaceafteropeningandbeforeclosingjsxexpressionbraces":
		settings.InsertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces = tsoptions.ParseTristate(value)
	case "insertspaceaftertypeassertion":
		settings.InsertSpaceAfterTypeAssertion = tsoptions.ParseTristate(value)
	case "insertspacebeforefunctionparenthesis":
		settings.InsertSpaceBeforeFunctionParenthesis = tsoptions.ParseTristate(value)
	case "placeopenbraceonnewlineforfunctions":
		settings.PlaceOpenBraceOnNewLineForFunctions = tsoptions.ParseTristate(value)
	case "placeopenbraceonnewlineforcontrolblocks":
		settings.PlaceOpenBraceOnNewLineForControlBlocks = tsoptions.ParseTristate(value)
	case "insertspacebeforetypeannotation":
		settings.InsertSpaceBeforeTypeAnnotation = tsoptions.ParseTristate(value)
	case "indentmultilineobjectliteralbeginningonblankline":
		settings.IndentMultiLineObjectLiteralBeginningOnBlankLine = tsoptions.ParseTristate(value)
	case "semicolons":
		settings.Semicolons = parseSemicolonPreference(value)
	case "indentswitchcase":
		settings.IndentSwitchCase = tsoptions.ParseTristate(value)
	default:
		return false
	}
	return true
}

func (settings *FormatCodeSettings) Copy() *FormatCodeSettings {
	if settings == nil {
		return nil
	}
	copied := *settings
	return &copied
}

func GetDefaultFormatCodeSettings() *FormatCodeSettings {
	return &FormatCodeSettings{
		EditorSettings: EditorSettings{
			IndentSize:             printer.GetDefaultIndentSize(),
			TabSize:                printer.GetDefaultIndentSize(),
			NewLineCharacter:       "\n",
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
