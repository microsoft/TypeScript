package lsutil

//go:generate npx hereby generate:preferences

import (
	"maps"
	"strings"

	"github.com/microsoft/TypeScript/tsc/internal/core"
	"github.com/microsoft/TypeScript/tsc/internal/json"
	"github.com/microsoft/TypeScript/tsc/internal/modulespecifiers"
	"github.com/microsoft/TypeScript/tsc/internal/tspath"
	"github.com/microsoft/TypeScript/tsc/internal/vfs/vfsmatch"
)

func NewDefaultUserPreferences() UserPreferences {
	return UserPreferences{
		FormatCodeSettings: GetDefaultFormatCodeSettings(),

		AutoClosingTags:             core.TSTrue,
		CompleteJSDocs:              core.TSTrue,
		GenerateReturnInDocTemplate: core.TSTrue,

		AllowRenameOfImportPath:            core.TSTrue,
		ProvideRefactorNotApplicableReason: core.TSTrue,
		FormatEnabled:                      core.TSTrue,
		ValidateEnabled:                    core.TSTrue,
		DisplayPartsForJSDoc:               core.TSTrue,
		DisableLineTextInReferences:        core.TSTrue,
		ReportStyleChecksAsWarnings:        core.TSTrue,

		ExcludeLibrarySymbolsInNavTo: core.TSTrue,
		WorkspaceSymbolsScope:        WorkspaceSymbolsScopeAllOpenProjects,

		IncludeCompletionsForModuleExports:    core.TSTrue,
		IncludeCompletionsForImportStatements: core.TSTrue,
	}
}

type QuotePreference string

const (
	QuotePreferenceUnknown QuotePreference = ""
	QuotePreferenceAuto    QuotePreference = "auto"
	QuotePreferenceDouble  QuotePreference = "double"
	QuotePreferenceSingle  QuotePreference = "single"
)

type WorkspaceSymbolsScope string

const (
	WorkspaceSymbolsScopeAllOpenProjects WorkspaceSymbolsScope = "allOpenProjects"
	WorkspaceSymbolsScopeCurrentProject  WorkspaceSymbolsScope = "currentProject"
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

type OrganizeImportsSort int

const (
	OrganizeImportsSortAuto OrganizeImportsSort = iota
	OrganizeImportsSortOrdinal
	OrganizeImportsSortOrdinalIgnoreCase
	OrganizeImportsSortNatural
	OrganizeImportsSortNaturalIgnoreCase
)

type OrganizeImportsCollation bool

const (
	OrganizeImportsCollationOrdinal OrganizeImportsCollation = false
	OrganizeImportsCollationUnicode OrganizeImportsCollation = true
)

type OrganizeImportsCaseFirst int

const (
	OrganizeImportsCaseFirstDefault OrganizeImportsCaseFirst = 0
	OrganizeImportsCaseFirstLower   OrganizeImportsCaseFirst = 1
	OrganizeImportsCaseFirstUpper   OrganizeImportsCaseFirst = 2
)

type OrganizeImportsTypeOrder int

const (
	OrganizeImportsTypeOrderAuto   OrganizeImportsTypeOrder = 0
	OrganizeImportsTypeOrderLast   OrganizeImportsTypeOrder = 1
	OrganizeImportsTypeOrderInline OrganizeImportsTypeOrder = 2
	OrganizeImportsTypeOrderFirst  OrganizeImportsTypeOrder = 3
)

func parsePreferenceTristate(value any) core.Tristate {
	if value, ok := value.(bool); ok {
		return core.BoolToTristate(value)
	}
	return core.TSUnknown
}

func parseOrganizeImportsCaseSensitivity(value any) core.Tristate {
	if value, ok := value.(string); ok {
		switch strings.ToLower(value) {
		case "caseinsensitive":
			return core.TSTrue
		case "casesensitive":
			return core.TSFalse
		}
	}
	return parsePreferenceTristate(value)
}

func invertPreferenceValue(value any) any {
	if value, ok := value.(bool); ok {
		return !value
	}
	return value
}

func getPreferenceConfigValue(config map[string]any, paths ...string) (any, bool) {
	for _, tag := range paths {
		path, modifier, _ := strings.Cut(tag, ",")
		value, ok := getNestedValue(config, path)
		if ok {
			if modifier == "invert" {
				value = invertPreferenceValue(value)
			}
			return value, true
		}
	}
	return nil, false
}

func getNestedValue(config map[string]any, path string) (any, bool) {
	current := any(config)
	for part := range strings.SplitSeq(path, ".") {
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

func normalizeCustomConfigFileName(name string) string {
	name = strings.TrimSpace(name)
	if strings.ContainsAny(name, "/\\") || name == ".." || name == "." {
		return ""
	}
	return name
}

func (p *UserPreferences) UnmarshalJSONFrom(dec *json.Decoder) error {
	var config map[string]any
	if err := json.UnmarshalDecode(dec, &config); err != nil {
		return err
	}
	*p = NewDefaultUserPreferences().withConfig(config)
	return nil
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

func (p UserPreferences) ModuleSpecifierPreferences() modulespecifiers.UserPreferences {
	return modulespecifiers.UserPreferences{
		ImportModuleSpecifierPreference:   p.ImportModuleSpecifierPreference,
		ImportModuleSpecifierEnding:       p.ImportModuleSpecifierEnding,
		AutoImportSpecifierExcludeRegexes: p.AutoImportSpecifierExcludeRegexes,
	}
}

func (p UserPreferences) ParsedAutoImportFileExcludePatterns(caseSensitivity tspath.CaseSensitivity) *vfsmatch.SpecMatcher {
	return vfsmatch.NewSpecMatcher(p.AutoImportFileExcludePatterns, "", vfsmatch.UsageExclude, caseSensitivity)
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
			normalizedSettings := make(map[string]any, len(editorSettings)+2)
			maps.Copy(normalizedSettings, editorSettings)
			if tabSize, ok := normalizedSettings["tabSize"]; ok {
				if _, hasIndentSize := normalizedSettings["indentSize"]; !hasIndentSize {
					normalizedSettings["indentSize"] = tabSize
				}
			}
			if insertSpaces, ok := normalizedSettings["insertSpaces"]; ok {
				if _, hasConvertTabsToSpaces := normalizedSettings["convertTabsToSpaces"]; !hasConvertTabsToSpaces {
					normalizedSettings["convertTabsToSpaces"] = insertSpaces
				}
			}
			prefs = prefs.withConfig(map[string]any{"unstable": normalizedSettings})
		}
	}
	// Apply javascript, then typescript, then js/ts (highest precedence).
	for _, section := range []string{"javascript", "typescript", "js/ts"} {
		if item, ok := items[section]; ok && item != nil {
			if settings, ok := item.(map[string]any); ok {
				prefs = prefs.withConfig(settings)
			}
		}
	}
	return prefs
}
