package ls

import (
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
)

type UserPreferences struct {
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
	// Allows completions to be formatted with snippet text, indicated by `CompletionItem["isSnippet"]`.
	IncludeCompletionsWithSnippetText core.Tristate // !!!
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

	ImportModuleSpecifierPreference modulespecifiers.ImportModuleSpecifierPreference // !!!
	// Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js"
	ImportModuleSpecifierEnding       modulespecifiers.ImportModuleSpecifierEndingPreference // !!!
	IncludePackageJsonAutoImports     IncludePackageJsonAutoImports                          // !!!
	AutoImportSpecifierExcludeRegexes []string                                               // !!!
	AutoImportFileExcludePatterns     []string                                               // !!!
	PreferTypeOnlyAutoImports         bool                                                   // !!!

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
	OrganizeImportsAccentCollation OrganizeImportsAccentCollation // !!!
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
	// Default: `last`
	OrganizeImportsTypeOrder OrganizeImportsTypeOrder // !!!

	// ------- MoveToFile -------

	AllowTextChangesInNewFiles bool // !!!

	// ------- Rename -------

	// renamed from `providePrefixAndSuffixTextForRename`
	UseAliasesForRename     core.Tristate
	AllowRenameOfImportPath bool // !!!

	// ------- CodeFixes/Refactors -------

	ProvideRefactorNotApplicableReason bool // !!!

	// ------- InlayHints -------

	IncludeInlayParameterNameHints                        IncludeInlayParameterNameHints
	IncludeInlayParameterNameHintsWhenArgumentMatchesName bool
	IncludeInlayFunctionParameterTypeHints                bool
	IncludeInlayVariableTypeHints                         bool
	IncludeInlayVariableTypeHintsWhenTypeMatchesName      bool
	IncludeInlayPropertyDeclarationTypeHints              bool
	IncludeInlayFunctionLikeReturnTypeHints               bool
	IncludeInlayEnumMemberValueHints                      bool
	InteractiveInlayHints                                 bool

	// ------- Misc -------

	ExcludeLibrarySymbolsInNavTo bool // !!!
	DisableSuggestions           bool // !!!
	DisableLineTextInReferences  bool // !!!
	DisplayPartsForJSDoc         bool // !!!
}

type JsxAttributeCompletionStyle string

const (
	JsxAttributeCompletionStyleUnknown JsxAttributeCompletionStyle = ""
	JsxAttributeCompletionStyleAuto    JsxAttributeCompletionStyle = "auto"
	JsxAttributeCompletionStyleBraces  JsxAttributeCompletionStyle = "braces"
	JsxAttributeCompletionStyleNone    JsxAttributeCompletionStyle = "none"
)

type IncludeInlayParameterNameHints string

const (
	IncludeInlayParameterNameHintsNone     IncludeInlayParameterNameHints = ""
	IncludeInlayParameterNameHintsAll      IncludeInlayParameterNameHints = "all"
	IncludeInlayParameterNameHintsLiterals IncludeInlayParameterNameHints = "literals"
)

type IncludePackageJsonAutoImports string

const (
	IncludePackageJsonAutoImportsUnknown IncludePackageJsonAutoImports = ""
	IncludePackageJsonAutoImportsAuto    IncludePackageJsonAutoImports = "auto"
	IncludePackageJsonAutoImportsOn      IncludePackageJsonAutoImports = "on"
	IncludePackageJsonAutoImportsOff     IncludePackageJsonAutoImports = "off"
)

type OrganizeImportsCollation bool

const (
	OrganizeImportsCollationOrdinal OrganizeImportsCollation = false
	OrganizeImportsCollationUnicode OrganizeImportsCollation = true
)

type OrganizeImportsAccentCollation int

const (
	OrganizeImportsAccentCollationTrue  OrganizeImportsAccentCollation = 0
	OrganizeImportsAccentCollationFalse OrganizeImportsAccentCollation = 1
)

type OrganizeImportsCaseFirst int

const (
	OrganizeImportsCaseFirstFalse OrganizeImportsCaseFirst = 0
	OrganizeImportsCaseFirstLower OrganizeImportsCaseFirst = 1
	OrganizeImportsCaseFirstUpper OrganizeImportsCaseFirst = 2
)

type OrganizeImportsTypeOrder int

const (
	OrganizeImportsTypeOrderLast   OrganizeImportsTypeOrder = 0
	OrganizeImportsTypeOrderInline OrganizeImportsTypeOrder = 1
	OrganizeImportsTypeOrderFirst  OrganizeImportsTypeOrder = 2
)

type QuotePreference string

const (
	QuotePreferenceUnknown QuotePreference = ""
	QuotePreferenceAuto    QuotePreference = "auto"
	QuotePreferenceDouble  QuotePreference = "double"
	QuotePreferenceSingle  QuotePreference = "single"
)

func (p *UserPreferences) Parse(config map[string]interface{}) {
}

func (p *UserPreferences) ModuleSpecifierPreferences() modulespecifiers.UserPreferences {
	return modulespecifiers.UserPreferences{
		ImportModuleSpecifierPreference:   p.ImportModuleSpecifierPreference,
		ImportModuleSpecifierEnding:       p.ImportModuleSpecifierEnding,
		AutoImportSpecifierExcludeRegexes: p.AutoImportSpecifierExcludeRegexes,
	}
}
