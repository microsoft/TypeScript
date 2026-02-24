package lsutil

import (
	"slices"
	"strings"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/tsoptions"
	"github.com/microsoft/typescript-go/internal/vfs"
)

func NewDefaultUserPreferences() *UserPreferences {
	return &UserPreferences{
		FormatCodeSettings: GetDefaultFormatCodeSettings(),

		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,

		AllowRenameOfImportPath:            core.TSTrue,
		ProvideRefactorNotApplicableReason: true,
		DisplayPartsForJSDoc:               true,
		DisableLineTextInReferences:        true,
		ReportStyleChecksAsWarnings:        true,

		ExcludeLibrarySymbolsInNavTo: true,
	}
}

type UserPreferences struct {
	FormatCodeSettings *FormatCodeSettings

	QuotePreference                           QuotePreference
	LazyConfiguredProjectsFromExternalProject bool // !!!

	// A positive integer indicating the maximum length of a hover text before it is truncated.
	//
	// Default: `500`
	MaximumHoverLength int // !!!

	// ------- Completions -------

	// If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
	// This affects lone identifier completions but not completions on the right hand side of `obj.`.
	IncludeCompletionsForModuleExports core.Tristate
	// Enables auto-import-style completions on partially-typed import statements. E.g., allows
	// `import write|` to be completed to `import { writeFile } from "fs"`.
	IncludeCompletionsForImportStatements core.Tristate
	// Unless this option is `false`,  member completion lists triggered with `.` will include entries
	// on potentially-null and potentially-undefined values, with insertion text to replace
	// preceding `.` tokens with `?.`.
	IncludeAutomaticOptionalChainCompletions core.Tristate
	// If enabled, completions for class members (e.g. methods and properties) will include
	// a whole declaration for the member.
	// E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
	// `class A { foo }`.
	IncludeCompletionsWithClassMemberSnippets core.Tristate // !!!
	// If enabled, object literal methods will have a method declaration completion entry in addition
	// to the regular completion entry containing just the method name.
	// E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
	// in addition to `const objectLiteral: T = { foo }`.
	IncludeCompletionsWithObjectLiteralMethodSnippets core.Tristate // !!!
	JsxAttributeCompletionStyle                       JsxAttributeCompletionStyle

	// ------- AutoImports --------

	ImportModuleSpecifierPreference modulespecifiers.ImportModuleSpecifierPreference
	// Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js"
	ImportModuleSpecifierEnding       modulespecifiers.ImportModuleSpecifierEndingPreference
	IncludePackageJsonAutoImports     IncludePackageJsonAutoImports
	AutoImportSpecifierExcludeRegexes []string
	AutoImportFileExcludePatterns     []string
	PreferTypeOnlyAutoImports         core.Tristate

	// ------- OrganizeImports -------

	// Indicates whether imports should be organized in a case-insensitive manner.
	//
	// Default: TSUnknown ("auto" in strada), will perform detection
	OrganizeImportsIgnoreCase core.Tristate // !!!
	// Indicates whether imports should be organized via an "ordinal" (binary) comparison using the numeric value of their
	// code points, or via "unicode" collation (via the Unicode Collation Algorithm (https://unicode.org/reports/tr10/#Scope))
	//
	// using rules associated with the locale specified in organizeImportsCollationLocale.
	//
	// Default: Ordinal
	OrganizeImportsCollation OrganizeImportsCollation // !!!
	// Indicates the locale to use for "unicode" collation. If not specified, the locale `"en"` is used as an invariant
	// for the sake of consistent sorting. Use `"auto"` to use the detected UI locale.
	//
	// This preference is ignored if organizeImportsCollation is not `unicode`.
	//
	// Default: `"en"`
	OrganizeImportsLocale string // !!!
	// Indicates whether numeric collation should be used for digit sequences in strings. When `true`, will collate
	// strings such that `a1z < a2z < a100z`. When `false`, will collate strings such that `a1z < a100z < a2z`.
	//
	// This preference is ignored if organizeImportsCollation is not `unicode`.
	//
	// Default: `false`
	OrganizeImportsNumericCollation bool // !!!
	// Indicates whether accents and other diacritic marks are considered unequal for the purpose of collation. When
	// `true`, characters with accents and other diacritics will be collated in the order defined by the locale specified
	// in organizeImportsCollationLocale.
	//
	// This preference is ignored if organizeImportsCollation is not `unicode`.
	//
	// Default: `true`
	OrganizeImportsAccentCollation bool // !!!
	// Indicates whether upper case or lower case should sort first. When `false`, the default order for the locale
	// specified in organizeImportsCollationLocale is used.
	//
	// This preference is ignored if:
	// 		- organizeImportsCollation is not `unicode`
	// 		- organizeImportsIgnoreCase is `true`
	// 		- organizeImportsIgnoreCase is `auto` and the auto-detected case sensitivity is case-insensitive.
	//
	// Default: `false`
	OrganizeImportsCaseFirst OrganizeImportsCaseFirst // !!!
	// Indicates where named type-only imports should sort. "inline" sorts named imports without regard to if the import is type-only.
	//
	// Default: `auto`, which defaults to `last`
	OrganizeImportsTypeOrder OrganizeImportsTypeOrder // !!!

	// ------- MoveToFile -------

	AllowTextChangesInNewFiles bool // !!!

	// ------- Rename -------

	// renamed from `providePrefixAndSuffixTextForRename`
	UseAliasesForRename     core.Tristate
	AllowRenameOfImportPath core.Tristate

	// ------- CodeFixes/Refactors -------

	ProvideRefactorNotApplicableReason bool // !!!

	// ------- InlayHints -------

	InlayHints InlayHintsPreferences

	// ------- CodeLens -------

	CodeLens CodeLensUserPreferences

	// ------- Symbols -------

	ExcludeLibrarySymbolsInNavTo bool

	// ------- Misc -------

	DisableSuggestions          bool // !!!
	DisableLineTextInReferences bool // !!!
	DisplayPartsForJSDoc        bool // !!!
	ReportStyleChecksAsWarnings bool // !!! If this changes, we need to ask the client to recompute diagnostics
}

type InlayHintsPreferences struct {
	IncludeInlayParameterNameHints                        IncludeInlayParameterNameHints
	IncludeInlayParameterNameHintsWhenArgumentMatchesName bool
	IncludeInlayFunctionParameterTypeHints                bool
	IncludeInlayVariableTypeHints                         bool
	IncludeInlayVariableTypeHintsWhenTypeMatchesName      bool
	IncludeInlayPropertyDeclarationTypeHints              bool
	IncludeInlayFunctionLikeReturnTypeHints               bool
	IncludeInlayEnumMemberValueHints                      bool
}

type CodeLensUserPreferences struct {
	ReferencesCodeLensEnabled                     bool
	ImplementationsCodeLensEnabled                bool
	ReferencesCodeLensShowOnAllFunctions          bool
	ImplementationsCodeLensShowOnInterfaceMethods bool
	ImplementationsCodeLensShowOnAllClassMethods  bool
}

type JsxAttributeCompletionStyle string

const (
	JsxAttributeCompletionStyleUnknown JsxAttributeCompletionStyle = "" // !!!
	JsxAttributeCompletionStyleAuto    JsxAttributeCompletionStyle = "auto"
	JsxAttributeCompletionStyleBraces  JsxAttributeCompletionStyle = "braces"
	JsxAttributeCompletionStyleNone    JsxAttributeCompletionStyle = "none"
)

func parseJsxAttributeCompletionStyle(val any) JsxAttributeCompletionStyle {
	if s, ok := val.(string); ok {
		switch strings.ToLower(s) {
		case "braces":
			return JsxAttributeCompletionStyleBraces
		case "none":
			return JsxAttributeCompletionStyleNone
		}
	}
	return JsxAttributeCompletionStyleAuto
}

func parseImportModuleSpecifierPreference(val any) modulespecifiers.ImportModuleSpecifierPreference {
	if s, ok := val.(string); ok {
		switch strings.ToLower(s) {
		case "project-relative":
			return modulespecifiers.ImportModuleSpecifierPreferenceProjectRelative
		case "relative":
			return modulespecifiers.ImportModuleSpecifierPreferenceRelative
		case "non-relative":
			return modulespecifiers.ImportModuleSpecifierPreferenceNonRelative
		}
	}
	return modulespecifiers.ImportModuleSpecifierPreferenceShortest
}

func parseImportModuleSpecifierEndingPreference(val any) modulespecifiers.ImportModuleSpecifierEndingPreference {
	if s, ok := val.(string); ok {
		switch strings.ToLower(s) {
		case "minimal":
			return modulespecifiers.ImportModuleSpecifierEndingPreferenceMinimal
		case "index":
			return modulespecifiers.ImportModuleSpecifierEndingPreferenceIndex
		case "js":
			return modulespecifiers.ImportModuleSpecifierEndingPreferenceJs
		}
	}
	return modulespecifiers.ImportModuleSpecifierEndingPreferenceAuto
}

type IncludeInlayParameterNameHints string

const (
	IncludeInlayParameterNameHintsNone     IncludeInlayParameterNameHints = ""
	IncludeInlayParameterNameHintsAll      IncludeInlayParameterNameHints = "all"
	IncludeInlayParameterNameHintsLiterals IncludeInlayParameterNameHints = "literals"
)

func parseInlayParameterNameHints(val any) IncludeInlayParameterNameHints {
	if prefStr, ok := val.(string); ok {
		switch prefStr {
		case "all":
			return IncludeInlayParameterNameHintsAll
		case "literals":
			return IncludeInlayParameterNameHintsLiterals
		}
	}
	return IncludeInlayParameterNameHintsNone
}

type IncludePackageJsonAutoImports string

const (
	IncludePackageJsonAutoImportsUnknown IncludePackageJsonAutoImports = "" // !!!
	IncludePackageJsonAutoImportsAuto    IncludePackageJsonAutoImports = "auto"
	IncludePackageJsonAutoImportsOn      IncludePackageJsonAutoImports = "on"
	IncludePackageJsonAutoImportsOff     IncludePackageJsonAutoImports = "off"
)

func parseIncludePackageJsonAutoImports(val any) IncludePackageJsonAutoImports {
	if s, ok := val.(string); ok {
		switch strings.ToLower(s) {
		case "on":
			return IncludePackageJsonAutoImportsOn
		case "off":
			return IncludePackageJsonAutoImportsOff
		default:
			return IncludePackageJsonAutoImportsAuto
		}
	}
	return IncludePackageJsonAutoImportsUnknown
}

type OrganizeImportsCollation bool

const (
	OrganizeImportsCollationOrdinal OrganizeImportsCollation = false
	OrganizeImportsCollationUnicode OrganizeImportsCollation = true
)

func parseOrganizeImportsCollation(val any) OrganizeImportsCollation {
	if b, ok := val.(string); ok && strings.ToLower(b) == "unicode" {
		return OrganizeImportsCollationUnicode
	}
	return OrganizeImportsCollationOrdinal
}

type OrganizeImportsCaseFirst int

const (
	OrganizeImportsCaseFirstFalse OrganizeImportsCaseFirst = 0
	OrganizeImportsCaseFirstLower OrganizeImportsCaseFirst = 1
	OrganizeImportsCaseFirstUpper OrganizeImportsCaseFirst = 2
)

func parseOrganizeImportsCaseFirst(caseFirst any) OrganizeImportsCaseFirst {
	if caseFirstStr, ok := caseFirst.(string); ok {
		switch caseFirstStr {
		case "lower":
			return OrganizeImportsCaseFirstLower
		case "upper":
			return OrganizeImportsCaseFirstUpper
		}
	}
	return OrganizeImportsCaseFirstFalse
}

type OrganizeImportsTypeOrder int

const (
	OrganizeImportsTypeOrderAuto   OrganizeImportsTypeOrder = 0
	OrganizeImportsTypeOrderLast   OrganizeImportsTypeOrder = 1
	OrganizeImportsTypeOrderInline OrganizeImportsTypeOrder = 2
	OrganizeImportsTypeOrderFirst  OrganizeImportsTypeOrder = 3
)

func parseOrganizeImportsTypeOrder(typeOrder any) OrganizeImportsTypeOrder {
	if typeOrderStr, ok := typeOrder.(string); ok {
		switch typeOrderStr {
		case "last":
			return OrganizeImportsTypeOrderLast
		case "inline":
			return OrganizeImportsTypeOrderInline
		case "first":
			return OrganizeImportsTypeOrderFirst
		}
	}
	return OrganizeImportsTypeOrderAuto
}

type QuotePreference string

const (
	QuotePreferenceUnknown QuotePreference = ""
	QuotePreferenceAuto    QuotePreference = "auto"
	QuotePreferenceDouble  QuotePreference = "double"
	QuotePreferenceSingle  QuotePreference = "single"
)

func parseQuotePreference(val any) QuotePreference {
	if s, ok := val.(string); ok {
		switch strings.ToLower(s) {
		case "auto":
			return QuotePreferenceAuto
		case "double":
			return QuotePreferenceDouble
		case "single":
			return QuotePreferenceSingle
		}
	}
	return QuotePreferenceUnknown
}

func (p *UserPreferences) Copy() *UserPreferences {
	if p == nil {
		return nil
	}
	prefCopy := *p
	prefCopy.AutoImportSpecifierExcludeRegexes = slices.Clone(p.AutoImportSpecifierExcludeRegexes)
	prefCopy.AutoImportFileExcludePatterns = slices.Clone(p.AutoImportFileExcludePatterns)
	return &prefCopy
}

func (p *UserPreferences) CopyOrDefault() *UserPreferences {
	if p == nil {
		return NewDefaultUserPreferences()
	}
	return p.Copy()
}

func (p *UserPreferences) OrDefault() *UserPreferences {
	if p == nil {
		return NewDefaultUserPreferences()
	}
	return p
}

func (p *UserPreferences) ModuleSpecifierPreferences() modulespecifiers.UserPreferences {
	return modulespecifiers.UserPreferences{
		ImportModuleSpecifierPreference:   p.ImportModuleSpecifierPreference,
		ImportModuleSpecifierEnding:       p.ImportModuleSpecifierEnding,
		AutoImportSpecifierExcludeRegexes: p.AutoImportSpecifierExcludeRegexes,
	}
}

// ------ Parsing Config Response -------

func (p *UserPreferences) ParseWorker(config map[string]any) *UserPreferences {
	// Process unstable preferences first so that they do not overwrite stable properties
	if unstable, ok := config["unstable"]; ok {
		// unstable properties must be named the same as userPreferences
		p.parseAll(unstable)
	}
	for name, values := range config {
		switch name {
		case "unstable":
			continue
		case "inlayHints":
			p.parseInlayHints(values)
		case "referencesCodeLens":
			p.parseReferencesCodeLens(values)
		case "implementationsCodeLens":
			p.parseImplementationsCodeLens(values)
		case "suggest":
			p.parseSuggest(values)
		case "preferences":
			p.parsePreferences(values)
		case "workspaceSymbols":
			p.parseWorkspaceSymbols(values)
		case "format":
			p.FormatCodeSettings.Parse(values)
		case "tsserver":
			// !!!
		case "tsc":
			// !!!
		case "experimental":
			// !!!
		default:
			p.Set(name, values)
			p.FormatCodeSettings.Set(name, values)
		}
	}
	return p
}

func (p *UserPreferences) parseAll(prefs any) {
	prefsMap, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	for name, value := range prefsMap {
		p.Set(name, value)
	}
}

func (p *UserPreferences) parseInlayHints(prefs any) {
	inlayHintsPreferences, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	for name, value := range inlayHintsPreferences {
		if v, ok := value.(map[string]any); ok {
			// vscode's inlay hints settings are nested objects with "enabled" and other properties
			switch name {
			case "parameterNames":
				if enabled, ok := v["enabled"]; ok {
					p.Set("includeInlayParameterNameHints", enabled)
				}
				p.InlayHints.IncludeInlayParameterNameHintsWhenArgumentMatchesName = parseSuppress(v, "suppressWhenArgumentMatchesName")
			case "parameterTypes":
				p.InlayHints.IncludeInlayFunctionParameterTypeHints = parseEnabledBool(v)
			case "variableTypes":
				p.InlayHints.IncludeInlayVariableTypeHints = parseEnabledBool(v)
				p.InlayHints.IncludeInlayVariableTypeHintsWhenTypeMatchesName = parseSuppress(v, "suppressWhenTypeMatchesName")
			case "propertyDeclarationTypes":
				p.InlayHints.IncludeInlayPropertyDeclarationTypeHints = parseEnabledBool(v)
			case "functionLikeReturnTypes":
				p.InlayHints.IncludeInlayFunctionLikeReturnTypeHints = parseEnabledBool(v)
			case "enumMemberValues":
				p.InlayHints.IncludeInlayEnumMemberValueHints = parseEnabledBool(v)
			}
		} else {
			// non-vscode case
			p.Set(name, v)
		}
	}
}

func (p *UserPreferences) parseReferencesCodeLens(prefs any) {
	referencesCodeLens, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	for name, value := range referencesCodeLens {
		switch name {
		case "enabled":
			p.Set("referencesCodeLensEnabled", value)
		case "showOnAllFunctions":
			p.Set("referencesCodeLensShowOnAllFunctions", value)
		}
	}
}

func (p *UserPreferences) parseImplementationsCodeLens(prefs any) {
	implementationsCodeLens, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	for name, value := range implementationsCodeLens {
		switch name {
		case "enabled":
			p.Set("implementationsCodeLensEnabled", value)
		case "showOnInterfaceMethods":
			p.Set("implementationsCodeLensShowOnInterfaceMethods", value)
		case "showOnAllClassMethods":
			p.Set("implementationsCodeLensShowOnAllClassMethods", value)
		}
	}
}

func (p *UserPreferences) parseSuggest(prefs any) {
	completionsPreferences, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	for name, value := range completionsPreferences {
		switch name {
		case "autoImports":
			p.Set("includeCompletionsForModuleExports", value)
		case "objectLiteralMethodSnippets":
			if v, ok := value.(map[string]any); ok {
				p.Set("includeCompletionsWithObjectLiteralMethodSnippets", parseEnabledBool(v))
			}
		case "classMemberSnippets":
			if v, ok := value.(map[string]any); ok {
				p.Set("includeCompletionsWithClassMemberSnippets", parseEnabledBool(v))
			}
		case "includeAutomaticOptionalChainCompletions":
			p.Set("includeAutomaticOptionalChainCompletions", value)
		case "includeCompletionsForImportStatements":
			p.Set("includeCompletionsForImportStatements", value)
		}
	}
}

func (p *UserPreferences) parsePreferences(prefs any) {
	prefsMap, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	for name, value := range prefsMap {
		if name == "organizeImports" {
			p.parseOrganizeImportsPreferences(value)
		} else {
			p.Set(name, value)
		}
	}
}

func (p *UserPreferences) parseOrganizeImportsPreferences(prefs any) {
	// !!! this used to be in the typescript-language-features extension
	prefsMap, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	if typeOrder, ok := prefsMap["typeOrder"]; ok {
		p.Set("organizeimportstypeorder", parseOrganizeImportsTypeOrder(typeOrder))
	}
	if caseSensitivity, ok := prefsMap["caseSensitivity"]; ok {
		if caseSensitivityStr, ok := caseSensitivity.(string); ok {
			// default is already "auto"
			switch caseSensitivityStr {
			case "caseInsensitive":
				p.OrganizeImportsIgnoreCase = core.TSTrue
			case "caseSensitive":
				p.OrganizeImportsIgnoreCase = core.TSFalse
			}
		}
	}
	if collation, ok := prefsMap["unicodeCollation"]; ok {
		// The rest of the settings are only applicable when using unicode collation
		if collationStr, ok := collation.(string); ok && collationStr == "unicode" {
			p.Set("organizeimportscollation", OrganizeImportsCollationUnicode)
			if locale, ok := prefsMap["locale"]; ok {
				p.Set("organizeimportslocale", locale)
			}
			if numeric, ok := prefsMap["numericCollation"]; ok {
				p.Set("organizeimportsnumericcollation", numeric)
			}
			if accent, ok := prefsMap["accentCollation"]; ok {
				p.Set("organizeimportsaccentcollation", accent)
			}
			if caseFirst, ok := prefsMap["caseFirst"]; ok && !p.OrganizeImportsIgnoreCase.IsTrue() {
				p.Set("organizeimportscasefirst", caseFirst)
			}
		}
	}
}

func (p *UserPreferences) parseWorkspaceSymbols(prefs any) {
	symbolPreferences, ok := prefs.(map[string]any)
	if !ok {
		return
	}
	for name, value := range symbolPreferences {
		switch name {
		// !!! scope
		case "excludeLibrarySymbols":
			p.ExcludeLibrarySymbolsInNavTo = parseBoolWithDefault(value, true)
		default:
			p.Set(name, value)
		}
	}
}

func parseEnabledBool(v map[string]any) bool {
	// vscode nested option
	if enabled, ok := v["enabled"]; ok {
		if e, ok := enabled.(bool); ok {
			return e
		}
	}
	return false
}

func parseSuppress(v map[string]any, name string) bool {
	// vscode nested option
	if val, ok := v[name]; ok {
		if suppress, ok := val.(bool); ok {
			return !suppress
		}
	}
	return false
}

func parseBoolWithDefault(val any, defaultV bool) bool {
	if v, ok := val.(bool); ok {
		return v
	}
	return defaultV
}

func parseIntWithDefault(val any, defaultV int) int {
	switch v := val.(type) {
	case int:
		return v
	case float64:
		return int(v)
	}
	return defaultV
}

func (p *UserPreferences) Set(name string, value any) bool {
	switch strings.ToLower(name) {
	case "quotepreference":
		p.QuotePreference = parseQuotePreference(value)
	case "lazyconfiguredprojectsfromexternalproject":
		p.LazyConfiguredProjectsFromExternalProject = parseBoolWithDefault(value, false)
	case "maximumhoverlength":
		p.MaximumHoverLength = parseIntWithDefault(value, 500)
	case "includecompletionsformoduleexports":
		p.IncludeCompletionsForModuleExports = tsoptions.ParseTristate(value)
	case "includecompletionsforimportstatements":
		p.IncludeCompletionsForImportStatements = tsoptions.ParseTristate(value)
	case "includeautomaticoptionalchaincompletions":
		p.IncludeAutomaticOptionalChainCompletions = tsoptions.ParseTristate(value)
	case "includecompletionswithclassmembersnippets":
		p.IncludeCompletionsWithClassMemberSnippets = tsoptions.ParseTristate(value)
	case "includecompletionswithobjectliteralmethodsnippets":
		p.IncludeCompletionsWithObjectLiteralMethodSnippets = tsoptions.ParseTristate(value)
	case "jsxattributecompletionstyle":
		p.JsxAttributeCompletionStyle = parseJsxAttributeCompletionStyle(value)
	case "importmodulespecifierpreference":
		p.ImportModuleSpecifierPreference = parseImportModuleSpecifierPreference(value)
	case "importmodulespecifierending":
		p.ImportModuleSpecifierEnding = parseImportModuleSpecifierEndingPreference(value)
	case "includepackagejsonautoimports":
		p.IncludePackageJsonAutoImports = parseIncludePackageJsonAutoImports(value)
	case "autoimportspecifierexcluderegexes":
		p.AutoImportSpecifierExcludeRegexes = tsoptions.ParseStringArray(value)
	case "autoimportfileexcludepatterns":
		p.AutoImportFileExcludePatterns = tsoptions.ParseStringArray(value)
	case "prefertypeonlyautoimports":
		p.PreferTypeOnlyAutoImports = tsoptions.ParseTristate(value)
	case "organizeimportsignorecase":
		p.OrganizeImportsIgnoreCase = tsoptions.ParseTristate(value)
	case "organizeimportscollation":
		p.OrganizeImportsCollation = parseOrganizeImportsCollation(value)
	case "organizeimportslocale":
		p.OrganizeImportsLocale = tsoptions.ParseString(value)
	case "organizeimportsnumericcollation":
		p.OrganizeImportsNumericCollation = parseBoolWithDefault(value, false)
	case "organizeimportsaccentcollation":
		p.OrganizeImportsAccentCollation = parseBoolWithDefault(value, true)
	case "organizeimportscasefirst":
		p.OrganizeImportsCaseFirst = parseOrganizeImportsCaseFirst(value)
	case "organizeimportstypeorder":
		p.OrganizeImportsTypeOrder = parseOrganizeImportsTypeOrder(value)
	case "allowtextchangesinnewfiles":
		p.AllowTextChangesInNewFiles = parseBoolWithDefault(value, true) // !!!
	case "usealiasesforrename", "provideprefixandsuffixtextforrename":
		p.UseAliasesForRename = tsoptions.ParseTristate(value)
	case "allowrenameofimportpath":
		p.AllowRenameOfImportPath = tsoptions.ParseTristate(value)
	case "providerefactornotapplicablereason":
		p.ProvideRefactorNotApplicableReason = parseBoolWithDefault(value, true)
	case "includeinlayparameternamehints":
		p.InlayHints.IncludeInlayParameterNameHints = parseInlayParameterNameHints(value)
	case "includeinlayparameternamehintswhenargumentmatchesname":
		p.InlayHints.IncludeInlayParameterNameHintsWhenArgumentMatchesName = parseBoolWithDefault(value, false)
	case "includeinlayfunctionparametertypehints":
		p.InlayHints.IncludeInlayFunctionParameterTypeHints = parseBoolWithDefault(value, false)
	case "includeinlayvariabletypehints":
		p.InlayHints.IncludeInlayVariableTypeHints = parseBoolWithDefault(value, false)
	case "includeinlayvariabletypehintswhentypematchesname":
		p.InlayHints.IncludeInlayVariableTypeHintsWhenTypeMatchesName = parseBoolWithDefault(value, false)
	case "includeinlaypropertydeclarationtypehints":
		p.InlayHints.IncludeInlayPropertyDeclarationTypeHints = parseBoolWithDefault(value, false)
	case "includeinlayfunctionlikereturntypehints":
		p.InlayHints.IncludeInlayFunctionLikeReturnTypeHints = parseBoolWithDefault(value, false)
	case "includeinlayenummembervaluehints":
		p.InlayHints.IncludeInlayEnumMemberValueHints = parseBoolWithDefault(value, false)
	case "excludelibrarysymbolsinnavto":
		p.ExcludeLibrarySymbolsInNavTo = parseBoolWithDefault(value, false)
	case "disablesuggestions":
		p.DisableSuggestions = parseBoolWithDefault(value, false)
	case "disablelinetextinreferences":
		p.DisableLineTextInReferences = parseBoolWithDefault(value, true)
	case "displaypartsforjsdoc":
		p.DisplayPartsForJSDoc = parseBoolWithDefault(value, true)
	case "reportstylechecksaswarnings":
		p.ReportStyleChecksAsWarnings = parseBoolWithDefault(value, true)
	case "referencescodelensenabled":
		p.CodeLens.ReferencesCodeLensEnabled = parseBoolWithDefault(value, false)
	case "implementationscodelensenabled":
		p.CodeLens.ImplementationsCodeLensEnabled = parseBoolWithDefault(value, false)
	case "referencescodelensshowonallfunctions":
		p.CodeLens.ReferencesCodeLensShowOnAllFunctions = parseBoolWithDefault(value, false)
	case "implementationscodelensshowoninterfacemethods":
		p.CodeLens.ImplementationsCodeLensShowOnInterfaceMethods = parseBoolWithDefault(value, false)
	case "implementationscodelensshowonallclassmethods":
		p.CodeLens.ImplementationsCodeLensShowOnAllClassMethods = parseBoolWithDefault(value, false)
	default:
		if p.FormatCodeSettings == nil {
			p.FormatCodeSettings = GetDefaultFormatCodeSettings()
		}
		return p.FormatCodeSettings.Set(name, value)
	}
	return true
}

func (p *UserPreferences) ParsedAutoImportFileExcludePatterns(useCaseSensitiveFileNames bool) []*regexp2.Regexp {
	if len(p.AutoImportFileExcludePatterns) == 0 {
		return nil
	}
	var patterns []*regexp2.Regexp
	for _, spec := range p.AutoImportFileExcludePatterns {
		pattern := vfs.GetSubPatternFromSpec(spec, "", vfs.UsageExclude, vfs.WildcardMatcher{})
		if pattern != "" {
			if re := vfs.GetRegexFromPattern(pattern, useCaseSensitiveFileNames); re != nil {
				patterns = append(patterns, re)
			}
		}
	}
	return patterns
}

func (p *UserPreferences) IsModuleSpecifierExcluded(moduleSpecifier string) bool {
	if modulespecifiers.IsExcludedByRegex(moduleSpecifier, p.AutoImportSpecifierExcludeRegexes) {
		return true
	}
	return false
}
