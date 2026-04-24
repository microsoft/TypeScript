package lsutil

import (
	"reflect"
	"slices"
	"strings"
	"sync"

	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/json"
	"github.com/microsoft/typescript-go/internal/modulespecifiers"
	"github.com/microsoft/typescript-go/internal/vfs/vfsmatch"
)

func NewDefaultUserPreferences() UserPreferences {
	return UserPreferences{
		FormatCodeSettings: GetDefaultFormatCodeSettings(),

		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,

		AllowRenameOfImportPath:            core.TSTrue,
		ProvideRefactorNotApplicableReason: core.TSTrue,
		DisplayPartsForJSDoc:               core.TSTrue,
		DisableLineTextInReferences:        core.TSTrue,
		ReportStyleChecksAsWarnings:        core.TSTrue,

		ExcludeLibrarySymbolsInNavTo: core.TSTrue,
	}
}

// UserPreferences represents TypeScript language service preferences.
//
// Fields are populated using two tags:
//   - `raw:"name"` or `raw:"name,invert"` - TypeScript/raw name for unstable section lookup
//   - `config:"path.to.setting"` or `config:"path.to.setting,invert"` - VS Code nested config path
//
// At least one tag must be present on each preference field.
// The `,invert` modifier inverts boolean values (e.g., VS Code's "suppress" -> our "include").
type UserPreferences struct {
	FormatCodeSettings FormatCodeSettings

	QuotePreference                           QuotePreference `raw:"quotePreference" config:"preferences.quoteStyle"`
	LazyConfiguredProjectsFromExternalProject core.Tristate   `raw:"lazyConfiguredProjectsFromExternalProject"` // !!!

	// A positive integer indicating the maximum length of a hover text before it is truncated.
	//
	// Default: `500`
	MaximumHoverLength int `raw:"maximumHoverLength"` // !!!

	// ------- Completions -------

	// If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
	// This affects lone identifier completions but not completions on the right hand side of `obj.`.
	IncludeCompletionsForModuleExports core.Tristate `raw:"includeCompletionsForModuleExports" config:"suggest.autoImports"`
	// Enables auto-import-style completions on partially-typed import statements. E.g., allows
	// `import write|` to be completed to `import { writeFile } from "fs"`.
	IncludeCompletionsForImportStatements core.Tristate `raw:"includeCompletionsForImportStatements" config:"suggest.includeCompletionsForImportStatements"`
	// Unless this option is `false`,  member completion lists triggered with `.` will include entries
	// on potentially-null and potentially-undefined values, with insertion text to replace
	// preceding `.` tokens with `?.`.
	IncludeAutomaticOptionalChainCompletions core.Tristate `raw:"includeAutomaticOptionalChainCompletions" config:"suggest.includeAutomaticOptionalChainCompletions"`
	// If enabled, completions for class members (e.g. methods and properties) will include
	// a whole declaration for the member.
	// E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
	// `class A { foo }`.
	IncludeCompletionsWithClassMemberSnippets core.Tristate `raw:"includeCompletionsWithClassMemberSnippets" config:"suggest.classMemberSnippets.enabled"` // !!!
	// If enabled, object literal methods will have a method declaration completion entry in addition
	// to the regular completion entry containing just the method name.
	// E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
	// in addition to `const objectLiteral: T = { foo }`.
	IncludeCompletionsWithObjectLiteralMethodSnippets core.Tristate               `raw:"includeCompletionsWithObjectLiteralMethodSnippets" config:"suggest.objectLiteralMethodSnippets.enabled"` // !!!
	JsxAttributeCompletionStyle                       JsxAttributeCompletionStyle `raw:"jsxAttributeCompletionStyle" config:"preferences.jsxAttributeCompletionStyle"`

	// ------- AutoImports --------

	ImportModuleSpecifierPreference modulespecifiers.ImportModuleSpecifierPreference `raw:"importModuleSpecifierPreference" config:"preferences.importModuleSpecifier"` // !!!
	// Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js"
	ImportModuleSpecifierEnding       modulespecifiers.ImportModuleSpecifierEndingPreference `raw:"importModuleSpecifierEnding" config:"preferences.importModuleSpecifierEnding"`             // !!!
	AutoImportSpecifierExcludeRegexes []string                                               `raw:"autoImportSpecifierExcludeRegexes" config:"preferences.autoImportSpecifierExcludeRegexes"` // !!!
	IncludePackageJsonAutoImports     IncludePackageJsonAutoImports                          `raw:"includePackageJsonAutoImports" config:"preferences.includePackageJsonAutoImports"`
	AutoImportFileExcludePatterns     []string                                               `raw:"autoImportFileExcludePatterns" config:"preferences.autoImportFileExcludePatterns"`
	PreferTypeOnlyAutoImports         core.Tristate                                          `raw:"preferTypeOnlyAutoImports" config:"preferences.preferTypeOnlyAutoImports"`

	// ------- OrganizeImports -------

	// Indicates whether imports should be organized in a case-insensitive manner.
	//
	// Default: TSUnknown ("auto" in strada), will perform detection
	OrganizeImportsIgnoreCase core.Tristate `raw:"organizeImportsIgnoreCase" config:"preferences.organizeImports.caseSensitivity"` // !!!
	// Indicates whether imports should be organized via an "ordinal" (binary) comparison using the numeric value of their
	// code points, or via "unicode" collation (via the Unicode Collation Algorithm (https://unicode.org/reports/tr10/#Scope))
	//
	// using rules associated with the locale specified in organizeImportsCollationLocale.
	//
	// Default: Ordinal
	OrganizeImportsCollation OrganizeImportsCollation `raw:"organizeImportsCollation" config:"preferences.organizeImports.unicodeCollation"` // !!!
	// Indicates the locale to use for "unicode" collation. If not specified, the locale `"en"` is used as an invariant
	// for the sake of consistent sorting. Use `"auto"` to use the detected UI locale.
	//
	// This preference is ignored if organizeImportsCollation is not `unicode`.
	//
	// Default: `"en"`
	OrganizeImportsLocale string `raw:"organizeImportsLocale" config:"preferences.organizeImports.locale"` // !!!
	// Indicates whether numeric collation should be used for digit sequences in strings. When `true`, will collate
	// strings such that `a1z < a2z < a100z`. When `false`, will collate strings such that `a1z < a100z < a2z`.
	//
	// This preference is ignored if organizeImportsCollation is not `unicode`.
	//
	// Default: `false`
	OrganizeImportsNumericCollation core.Tristate `raw:"organizeImportsNumericCollation" config:"preferences.organizeImports.numericCollation"` // !!!
	// Indicates whether accents and other diacritic marks are considered unequal for the purpose of collation. When
	// `true`, characters with accents and other diacritics will be collated in the order defined by the locale specified
	// in organizeImportsCollationLocale.
	//
	// This preference is ignored if organizeImportsCollation is not `unicode`.
	//
	// Default: `true`
	OrganizeImportsAccentCollation core.Tristate `raw:"organizeImportsAccentCollation" config:"preferences.organizeImports.accentCollation"` // !!!
	// Indicates whether upper case or lower case should sort first. When `false`, the default order for the locale
	// specified in organizeImportsCollationLocale is used.
	//
	// This permission is ignored if:
	//	- organizeImportsCollation is not `unicode`
	//	- organizeImportsIgnoreCase is `true`
	//	- organizeImportsIgnoreCase is `auto` and the auto-detected case sensitivity is case-insensitive.
	//
	// Default: `false`
	OrganizeImportsCaseFirst OrganizeImportsCaseFirst `raw:"organizeImportsCaseFirst" config:"preferences.organizeImports.caseFirst"` // !!!
	// Indicates where named type-only imports should sort. "inline" sorts named imports without regard to if the import is type-only.
	//
	// Default: `auto`, which defaults to `last`
	OrganizeImportsTypeOrder OrganizeImportsTypeOrder `raw:"organizeImportsTypeOrder" config:"preferences.organizeImports.typeOrder"` // !!!

	// ------- MoveToFile -------

	AllowTextChangesInNewFiles core.Tristate `raw:"allowTextChangesInNewFiles"` // !!!

	// ------- Rename -------

	UseAliasesForRename     core.Tristate `raw:"providePrefixAndSuffixTextForRename" config:"preferences.useAliasesForRenames"`
	AllowRenameOfImportPath core.Tristate `raw:"allowRenameOfImportPath"`

	// ------- CodeFixes/Refactors -------

	ProvideRefactorNotApplicableReason core.Tristate `raw:"provideRefactorNotApplicableReason"` // !!!

	// ------- InlayHints -------

	InlayHints InlayHintsPreferences

	// ------- CodeLens -------

	CodeLens CodeLensUserPreferences

	// ------- Definition -------

	PreferGoToSourceDefinition bool `raw:"preferGoToSourceDefinition"`

	// ------- Symbols -------

	ExcludeLibrarySymbolsInNavTo core.Tristate `raw:"excludeLibrarySymbolsInNavTo" config:"workspaceSymbols.excludeLibrarySymbols"`

	// ------- Misc -------

	DisableSuggestions          core.Tristate `raw:"disableSuggestions"`          // !!!
	DisableLineTextInReferences core.Tristate `raw:"disableLineTextInReferences"` // !!!
	DisplayPartsForJSDoc        core.Tristate `raw:"displayPartsForJSDoc"`        // !!!
	ReportStyleChecksAsWarnings core.Tristate `raw:"reportStyleChecksAsWarnings"` // !!! If this changes, we need to ask the client to recompute diagnostics

	// ------- ATA -------

	// DisableAutomaticTypeAcquisition is the deprecated setting from typescript.disableAutomaticTypeAcquisition.
	DisableAutomaticTypeAcquisition core.Tristate `raw:"disableAutomaticTypeAcquisition" config:"disableAutomaticTypeAcquisition"`
	// AutomaticTypeAcquisitionEnabled is the unified setting from tsserver.automaticTypeAcquisition.enabled under the js/ts section.
	// When set, it takes precedence over DisableAutomaticTypeAcquisition.
	AutomaticTypeAcquisitionEnabled core.Tristate `raw:"automaticTypeAcquisitionEnabled" config:"tsserver.automaticTypeAcquisition.enabled"`
	// TODO: add tsserver.web.typeAcquisition.enabled under the js/ts section for the web variant when web support is implemented.

	// ------- Project Configuration -------

	// CustomConfigFileName specifies a custom config file name to use before defaulting to tsconfig.json/jsconfig.json.
	CustomConfigFileName string `raw:"customConfigFileName" config:"native-preview.customConfigFileName"`
}

// IsATADisabled returns whether Automatic Type Acquisition is disabled based on user preferences.
// It checks the unified setting (tsserver.automaticTypeAcquisition.enabled) first,
// then falls back to the deprecated setting (disableAutomaticTypeAcquisition).
func (p UserPreferences) IsATADisabled() bool {
	if !p.AutomaticTypeAcquisitionEnabled.IsUnknown() {
		return !p.AutomaticTypeAcquisitionEnabled.IsTrue()
	}
	return p.DisableAutomaticTypeAcquisition.IsTrue()
}

type InlayHintsPreferences struct {
	IncludeInlayParameterNameHints                        IncludeInlayParameterNameHints `raw:"includeInlayParameterNameHints" config:"inlayHints.parameterNames.enabled"`
	IncludeInlayParameterNameHintsWhenArgumentMatchesName core.Tristate                  `raw:"includeInlayParameterNameHintsWhenArgumentMatchesName" config:"inlayHints.parameterNames.suppressWhenArgumentMatchesName,invert"`
	IncludeInlayFunctionParameterTypeHints                core.Tristate                  `raw:"includeInlayFunctionParameterTypeHints" config:"inlayHints.parameterTypes.enabled"`
	IncludeInlayVariableTypeHints                         core.Tristate                  `raw:"includeInlayVariableTypeHints" config:"inlayHints.variableTypes.enabled"`
	IncludeInlayVariableTypeHintsWhenTypeMatchesName      core.Tristate                  `raw:"includeInlayVariableTypeHintsWhenTypeMatchesName" config:"inlayHints.variableTypes.suppressWhenTypeMatchesName,invert"`
	IncludeInlayPropertyDeclarationTypeHints              core.Tristate                  `raw:"includeInlayPropertyDeclarationTypeHints" config:"inlayHints.propertyDeclarationTypes.enabled"`
	IncludeInlayFunctionLikeReturnTypeHints               core.Tristate                  `raw:"includeInlayFunctionLikeReturnTypeHints" config:"inlayHints.functionLikeReturnTypes.enabled"`
	IncludeInlayEnumMemberValueHints                      core.Tristate                  `raw:"includeInlayEnumMemberValueHints" config:"inlayHints.enumMemberValues.enabled"`
}

type CodeLensUserPreferences struct {
	ReferencesCodeLensEnabled                     core.Tristate `raw:"referencesCodeLensEnabled" config:"referencesCodeLens.enabled"`
	ImplementationsCodeLensEnabled                core.Tristate `raw:"implementationsCodeLensEnabled" config:"implementationsCodeLens.enabled"`
	ReferencesCodeLensShowOnAllFunctions          core.Tristate `raw:"referencesCodeLensShowOnAllFunctions" config:"referencesCodeLens.showOnAllFunctions"`
	ImplementationsCodeLensShowOnInterfaceMethods core.Tristate `raw:"implementationsCodeLensShowOnInterfaceMethods" config:"implementationsCodeLens.showOnInterfaceMethods"`
	ImplementationsCodeLensShowOnAllClassMethods  core.Tristate `raw:"implementationsCodeLensShowOnAllClassMethods" config:"implementationsCodeLens.showOnAllClassMethods"`
}

// --- Enum Types ---

type QuotePreference string

const (
	QuotePreferenceUnknown QuotePreference = ""
	QuotePreferenceAuto    QuotePreference = "auto"
	QuotePreferenceDouble  QuotePreference = "double"
	QuotePreferenceSingle  QuotePreference = "single"
)

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

type OrganizeImportsCaseFirst int

const (
	OrganizeImportsCaseFirstFalse OrganizeImportsCaseFirst = 0
	OrganizeImportsCaseFirstLower OrganizeImportsCaseFirst = 1
	OrganizeImportsCaseFirstUpper OrganizeImportsCaseFirst = 2
)

type OrganizeImportsTypeOrder int

const (
	OrganizeImportsTypeOrderAuto   OrganizeImportsTypeOrder = 0
	OrganizeImportsTypeOrderLast   OrganizeImportsTypeOrder = 1
	OrganizeImportsTypeOrderInline OrganizeImportsTypeOrder = 2
	OrganizeImportsTypeOrderFirst  OrganizeImportsTypeOrder = 3
)

// --- Reflection-based parsing infrastructure ---

// typeParsers maps reflect.Type to a function that parses a value into that type.
var typeParsers = map[reflect.Type]func(any) any{
	reflect.TypeFor[core.Tristate](): func(val any) any {
		if b, ok := val.(bool); ok {
			if b {
				return core.TSTrue
			}
			return core.TSFalse
		}
		return core.TSUnknown
	},
	reflect.TypeFor[IndentStyle](): func(val any) any {
		return parseIndentStyle(val)
	},
	reflect.TypeFor[SemicolonPreference](): func(val any) any {
		return parseSemicolonPreference(val)
	},
	reflect.TypeFor[QuotePreference](): func(val any) any {
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
	},
	reflect.TypeFor[JsxAttributeCompletionStyle](): func(val any) any {
		if s, ok := val.(string); ok {
			switch strings.ToLower(s) {
			case "braces":
				return JsxAttributeCompletionStyleBraces
			case "none":
				return JsxAttributeCompletionStyleNone
			}
		}
		return JsxAttributeCompletionStyleAuto
	},
	reflect.TypeFor[IncludeInlayParameterNameHints](): func(val any) any {
		if s, ok := val.(string); ok {
			switch s {
			case "all":
				return IncludeInlayParameterNameHintsAll
			case "literals":
				return IncludeInlayParameterNameHintsLiterals
			}
		}
		return IncludeInlayParameterNameHintsNone
	},
	reflect.TypeFor[IncludePackageJsonAutoImports](): func(val any) any {
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
	},
	reflect.TypeFor[OrganizeImportsCollation](): func(val any) any {
		if s, ok := val.(string); ok && strings.ToLower(s) == "unicode" {
			return OrganizeImportsCollationUnicode
		}
		return OrganizeImportsCollationOrdinal
	},
	reflect.TypeFor[OrganizeImportsCaseFirst](): func(val any) any {
		if s, ok := val.(string); ok {
			switch s {
			case "lower":
				return OrganizeImportsCaseFirstLower
			case "upper":
				return OrganizeImportsCaseFirstUpper
			}
		}
		return OrganizeImportsCaseFirstFalse
	},
	reflect.TypeFor[OrganizeImportsTypeOrder](): func(val any) any {
		if s, ok := val.(string); ok {
			switch s {
			case "last":
				return OrganizeImportsTypeOrderLast
			case "inline":
				return OrganizeImportsTypeOrderInline
			case "first":
				return OrganizeImportsTypeOrderFirst
			}
		}
		return OrganizeImportsTypeOrderAuto
	},
	reflect.TypeFor[modulespecifiers.ImportModuleSpecifierPreference](): func(val any) any {
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
	},
	reflect.TypeFor[modulespecifiers.ImportModuleSpecifierEndingPreference](): func(val any) any {
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
	},
}

// typeSerializers maps reflect.Type to a function that serializes a value of that type.
// For types which do not serialize as-is (tristate, enums, etc).
var typeSerializers = map[reflect.Type]func(any) any{
	reflect.TypeFor[core.Tristate](): func(val any) any {
		switch val.(core.Tristate) {
		case core.TSTrue:
			return true
		case core.TSFalse:
			return false
		default:
			return nil
		}
	},
	reflect.TypeFor[OrganizeImportsCollation](): func(val any) any {
		if val.(OrganizeImportsCollation) == OrganizeImportsCollationUnicode {
			return "unicode"
		}
		return "ordinal"
	},
	reflect.TypeFor[OrganizeImportsCaseFirst](): func(val any) any {
		switch val.(OrganizeImportsCaseFirst) {
		case OrganizeImportsCaseFirstLower:
			return "lower"
		case OrganizeImportsCaseFirstUpper:
			return "upper"
		default:
			return "default"
		}
	},
	reflect.TypeFor[OrganizeImportsTypeOrder](): func(val any) any {
		switch val.(OrganizeImportsTypeOrder) {
		case OrganizeImportsTypeOrderLast:
			return "last"
		case OrganizeImportsTypeOrderInline:
			return "inline"
		case OrganizeImportsTypeOrderFirst:
			return "first"
		default:
			return "auto"
		}
	},
}

// configPathParsers provides field-specific config value parsers that override the default
// type-based parser when the VS Code config value format differs from the Go field type.
var configPathParsers = map[string]func(any) any{
	// VS Code sends caseSensitivity as a string ("auto"/"caseSensitive"/"caseInsensitive"),
	// but OrganizeImportsIgnoreCase is a core.Tristate.
	"preferences.organizeImports.caseSensitivity": func(val any) any {
		if s, ok := val.(string); ok {
			switch strings.ToLower(s) {
			case "caseinsensitive":
				return core.TSTrue
			case "casesensitive":
				return core.TSFalse
			}
		}
		if b, ok := val.(bool); ok {
			if b {
				return core.TSTrue
			}
			return core.TSFalse
		}
		return core.TSUnknown
	},
}

type fieldInfo struct {
	rawName      string // raw name for unstable section lookup (e.g., "quotePreference")
	configPath   string // dotted path for config (e.g., "preferences.quoteStyle")
	fieldPath    []int  // index path to field in struct
	rawInvert    bool   // whether to invert boolean values for raw name
	configInvert bool   // whether to invert boolean values for config path
}

var fieldInfoCache = sync.OnceValue(func() []fieldInfo {
	return collectFieldInfos(reflect.TypeFor[UserPreferences](), nil)
})

// unstableNameIndex maps raw names to fieldInfo index for unstable section lookup.
var unstableNameIndex = sync.OnceValue(func() map[string]int {
	infos := fieldInfoCache()
	index := make(map[string]int, len(infos))
	for i, info := range infos {
		if info.rawName != "" {
			index[info.rawName] = i
		}
	}
	return index
})

func collectFieldInfos(t reflect.Type, indexPath []int) []fieldInfo {
	var infos []fieldInfo
	for i := range t.NumField() {
		field := t.Field(i)
		currentPath := append(slices.Clone(indexPath), i)

		rawTag := field.Tag.Get("raw")
		configTag := field.Tag.Get("config")

		if rawTag == "" && configTag == "" {
			// Embedded struct without tags - recurse into it
			if field.Type.Kind() == reflect.Struct {
				infos = append(infos, collectFieldInfos(field.Type, currentPath)...)
				continue
			}
			panic("raw or config tag required for field " + field.Name)
		}

		info := fieldInfo{
			fieldPath: currentPath,
		}

		// Parse raw tag: "name" or "name,invert"
		if rawTag != "" {
			parts := strings.Split(rawTag, ",")
			info.rawName = parts[0]
			for _, part := range parts[1:] {
				if part == "invert" {
					info.rawInvert = true
				}
			}
		}

		// Parse config tag: "path.to.setting" or "path.to.setting,invert"
		if configTag != "" {
			parts := strings.Split(configTag, ",")
			info.configPath = parts[0]
			for _, part := range parts[1:] {
				if part == "invert" {
					info.configInvert = true
				}
			}
		}

		infos = append(infos, info)
	}
	return infos
}

func getNestedValue(config map[string]any, path string) (any, bool) {
	parts := strings.Split(path, ".")
	current := any(config)
	for _, part := range parts {
		m, ok := current.(map[string]any)
		if !ok {
			return nil, false
		}
		current, ok = m[part]
		if !ok {
			return nil, false
		}
	}
	return current, true
}

func setNestedValue(config map[string]any, path string, value any) {
	parts := strings.Split(path, ".")
	current := config
	for _, part := range parts[:len(parts)-1] {
		next, ok := current[part].(map[string]any)
		if !ok {
			next = make(map[string]any)
			current[part] = next
		}
		current = next
	}
	current[parts[len(parts)-1]] = value
}

func (p UserPreferences) withConfig(config map[string]any) UserPreferences {
	v := reflect.ValueOf(&p).Elem()
	infos := fieldInfoCache()

	// Process "unstable" section first - allows any field to be set by raw name.
	// This mirrors VS Code's behavior: { ...config.get('unstable'), ...stableOptions }
	// where stable options are spread after and take precedence.
	if unstable, ok := config["unstable"].(map[string]any); ok {
		index := unstableNameIndex()
		for name, value := range unstable {
			if idx, found := index[name]; found {
				info := infos[idx]
				field := getFieldByPath(v, info.fieldPath)
				if info.rawInvert {
					if b, ok := value.(bool); ok {
						value = !b
					}
				}
				setFieldFromValue(field, value)
			}
		}
	}

	// Process path-based config (VS Code style nested paths).
	// These run after unstable, so stable config values take precedence.
	for _, info := range infos {
		if info.configPath == "" {
			continue
		}
		val, ok := getNestedValue(config, info.configPath)
		if !ok {
			continue
		}

		field := getFieldByPath(v, info.fieldPath)
		if info.configInvert {
			if b, ok := val.(bool); ok {
				val = !b
			}
		}
		if parser, ok := configPathParsers[info.configPath]; ok {
			field.Set(reflect.ValueOf(parser(val)))
			continue
		}
		setFieldFromValue(field, val)
	}

	// Validate CustomConfigFileName for path traversal
	if p.CustomConfigFileName != "" {
		name := strings.TrimSpace(p.CustomConfigFileName)
		if strings.ContainsAny(name, "/\\") || name == ".." || name == "." {
			p.CustomConfigFileName = ""
		} else {
			p.CustomConfigFileName = name
		}
	}

	return p
}

func getFieldByPath(v reflect.Value, path []int) reflect.Value {
	for _, idx := range path {
		v = v.Field(idx)
	}
	return v
}

func setFieldFromValue(field reflect.Value, val any) {
	if val == nil {
		return
	}

	// Check custom parsers first (for types like Tristate, OrganizeImportsCollation, etc.)
	if parser, ok := typeParsers[field.Type()]; ok {
		field.Set(reflect.ValueOf(parser(val)))
		return
	}

	switch field.Kind() {
	case reflect.Bool:
		if b, ok := val.(bool); ok {
			field.SetBool(b)
		}
	case reflect.Int:
		switch v := val.(type) {
		case int:
			field.SetInt(int64(v))
		case float64:
			field.SetInt(int64(v))
		}
	case reflect.String:
		if s, ok := val.(string); ok {
			field.SetString(s)
		}
	case reflect.Slice:
		if arr, ok := val.([]any); ok {
			result := reflect.MakeSlice(field.Type(), 0, len(arr))
			for _, item := range arr {
				if s, ok := item.(string); ok {
					result = reflect.Append(result, reflect.ValueOf(s))
				}
			}
			field.Set(result)
		}
	}
}

func (p *UserPreferences) MarshalJSONTo(enc *json.Encoder) error {
	config := make(map[string]any)
	v := reflect.ValueOf(p).Elem()

	for _, info := range fieldInfoCache() {
		field := getFieldByPath(v, info.fieldPath)

		val := serializeField(field)
		if val == nil {
			continue
		}

		// Prefer config path if available, otherwise use unstable section
		if info.configPath != "" {
			if info.configInvert {
				if b, ok := val.(bool); ok {
					val = !b
				}
			}
			setNestedValue(config, info.configPath, val)
		} else if info.rawName != "" {
			if info.rawInvert {
				if b, ok := val.(bool); ok {
					val = !b
				}
			}
			setNestedValue(config, "unstable."+info.rawName, val)
		}
	}

	return json.MarshalEncode(enc, config, json.Deterministic(true))
}

func serializeField(field reflect.Value) any {
	// Check custom serializers first (for types like Tristate, OrganizeImportsCollation, etc.)
	if serializer, ok := typeSerializers[field.Type()]; ok {
		return serializer(field.Interface())
	}

	switch field.Kind() {
	case reflect.Bool:
		return field.Bool()
	case reflect.Int:
		return int(field.Int())
	case reflect.String:
		return field.String()
	case reflect.Slice:
		if field.IsNil() {
			return nil
		}
		result := make([]string, field.Len())
		for i := range field.Len() {
			result[i] = field.Index(i).String()
		}
		return result
	default:
		return field.Interface()
	}
}

func (p *UserPreferences) UnmarshalJSONFrom(dec *json.Decoder) error {
	var config map[string]any
	if err := json.UnmarshalDecode(dec, &config); err != nil {
		return err
	}
	// Start with defaults, then overlay parsed values
	*p = NewDefaultUserPreferences().withConfig(config)
	return nil
}

// --- Helper methods ---

// WithOverrides returns a copy of p with non-zero fields from overrides applied on top.
// This is safe because all preference fields use types where zero = "not set":
// Tristate (TSUnknown=0), int (0), string (""), slice (nil).
func (p UserPreferences) WithOverrides(overrides UserPreferences) UserPreferences {
	mergeNonZeroFields(reflect.ValueOf(&p).Elem(), reflect.ValueOf(&overrides).Elem())
	return p
}

func mergeNonZeroFields(dst, src reflect.Value) {
	for i := range dst.NumField() {
		srcField := src.Field(i)
		dstField := dst.Field(i)
		if srcField.Kind() == reflect.Struct {
			mergeNonZeroFields(dstField, srcField)
			continue
		}
		if !srcField.IsZero() {
			dstField.Set(srcField)
		}
	}
}

func (p UserPreferences) ModuleSpecifierPreferences() modulespecifiers.UserPreferences {
	return modulespecifiers.UserPreferences{
		ImportModuleSpecifierPreference:   p.ImportModuleSpecifierPreference,
		ImportModuleSpecifierEnding:       p.ImportModuleSpecifierEnding,
		AutoImportSpecifierExcludeRegexes: p.AutoImportSpecifierExcludeRegexes,
	}
}

func (p UserPreferences) ParsedAutoImportFileExcludePatterns(useCaseSensitiveFileNames bool) *vfsmatch.SpecMatcher {
	return vfsmatch.NewSpecMatcher(p.AutoImportFileExcludePatterns, "", vfsmatch.UsageExclude, useCaseSensitiveFileNames)
}

func (p UserPreferences) IsModuleSpecifierExcluded(moduleSpecifier string) bool {
	return modulespecifiers.IsExcludedByRegex(moduleSpecifier, p.AutoImportSpecifierExcludeRegexes)
}

func ParseUserPreferences(items map[string]any) UserPreferences {
	prefs := NewDefaultUserPreferences()
	// Apply editor settings first (tabSize, indentSize, etc.) as raw-name defaults,
	// then overlay language-specific settings with increasing precedence:
	// editor < javascript < typescript < js/ts
	if editorItem, ok := items["editor"]; ok && editorItem != nil {
		if editorSettings, ok := editorItem.(map[string]any); ok {
			prefs = prefs.withConfig(map[string]any{"unstable": editorSettings})
		}
	}
	// Apply javascript, then typescript, then js/ts (highest precedence).
	for _, section := range []string{"javascript", "typescript", "js/ts"} {
		if item, ok := items[section]; ok && item != nil {
			switch settings := item.(type) {
			case map[string]any:
				prefs = prefs.withConfig(settings)
			case UserPreferences:
				prefs = prefs.WithOverrides(settings)
			}
		}
	}
	return prefs
}
