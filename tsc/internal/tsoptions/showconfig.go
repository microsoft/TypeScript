package tsoptions

import (
	"reflect"

	"github.com/dlclark/regexp2"
	"github.com/microsoft/typescript-go/internal/collections"
	"github.com/microsoft/typescript-go/internal/core"
	"github.com/microsoft/typescript-go/internal/debug"
	"github.com/microsoft/typescript-go/internal/diagnostics"
	"github.com/microsoft/typescript-go/internal/tspath"
	"github.com/microsoft/typescript-go/internal/vfs"
)

// TSConfig represents the output structure for --showConfig
type TSConfig struct {
	CompilerOptions *collections.OrderedMap[string, any] `json:"compilerOptions"`
	References      []any                                `json:"references,omitzero"`
	Files           []string                             `json:"files,omitzero"`
	Include         []string                             `json:"include,omitzero"`
	Exclude         []string                             `json:"exclude,omitzero"`
	CompileOnSave   *bool                                `json:"compileOnSave,omitzero"`
}

// ConvertToTSConfig generates a complete tsconfig representation for --showConfig output,
// matching the behavior of TypeScript's convertToTSConfig function.
func ConvertToTSConfig(configParseResult *ParsedCommandLine, configFileName string) *TSConfig {
	normalizedConfigPath := tspath.GetNormalizedAbsolutePath(configFileName, configParseResult.GetCurrentDirectory())
	comparePathsOptions := tspath.ComparePathsOptions{
		CurrentDirectory:          configParseResult.GetCurrentDirectory(),
		UseCaseSensitiveFileNames: configParseResult.UseCaseSensitiveFileNames(),
	}

	// Build file list, filtering out files that match the include/exclude specs
	var fileFilter func(string) bool
	if configParseResult.ConfigFile != nil && configParseResult.ConfigFile.configFileSpecs != nil &&
		len(configParseResult.ConfigFile.configFileSpecs.validatedIncludeSpecs) > 0 {
		fileFilter = matchesSpecs(
			configFileName,
			configParseResult.ConfigFile.configFileSpecs.validatedIncludeSpecs,
			configParseResult.ConfigFile.configFileSpecs.validatedExcludeSpecs,
			configParseResult.UseCaseSensitiveFileNames(),
			configParseResult.GetCurrentDirectory(),
		)
	}
	var files []string
	for _, f := range configParseResult.FileNames() {
		if fileFilter != nil && !fileFilter(f) {
			continue
		}
		normalizedFilePath := tspath.GetNormalizedAbsolutePath(f, configParseResult.GetCurrentDirectory())
		relativePath := tspath.GetRelativePathFromFile(normalizedConfigPath, normalizedFilePath, comparePathsOptions)
		files = append(files, relativePath)
	}

	// Serialize compiler options
	optionMap := serializeCompilerOptions(configParseResult.CompilerOptions(), normalizedConfigPath, comparePathsOptions)

	// Remove command-line-only options from the output
	for _, name := range []string{
		"showConfig", "configFile", "configFilePath", "help", "init",
		"listFilesOnly", "listEmittedFiles", "project", "build", "version",
	} {
		optionMap.Delete(name)
	}

	config := &TSConfig{
		CompilerOptions: optionMap,
	}

	// Add references
	if refs := configParseResult.ProjectReferences(); len(refs) > 0 {
		var references []any
		for _, r := range refs {
			ref := &collections.OrderedMap[string, any]{}
			ref.Set("path", r.OriginalPath)
			if r.Circular {
				ref.Set("circular", true)
			}
			references = append(references, ref)
		}
		config.References = references
	}

	// Add files
	if len(files) > 0 {
		config.Files = files
	}

	// Add include/exclude from configFileSpecs
	if configParseResult.ConfigFile != nil && configParseResult.ConfigFile.configFileSpecs != nil {
		specs := configParseResult.ConfigFile.configFileSpecs
		include := filterSameAsDefaultInclude(specs.validatedIncludeSpecs)
		if len(include) > 0 {
			config.Include = include
		}
		config.Exclude = specs.validatedExcludeSpecs
	}

	// Add compileOnSave
	if configParseResult.CompileOnSave != nil && *configParseResult.CompileOnSave {
		t := true
		config.CompileOnSave = &t
	}

	return config
}

// filterSameAsDefaultInclude returns nil if specs is the default include spec ["**/*"]
func filterSameAsDefaultInclude(specs []string) []string {
	if len(specs) == 0 {
		return nil
	}
	if len(specs) == 1 && specs[0] == defaultIncludeSpec {
		return nil
	}
	return specs
}

// getNameOfCompilerOptionValue returns the string key for a given enum value by
// searching the option's enum map.
func getNameOfCompilerOptionValue(value any, enumMap *collections.OrderedMap[string, any]) string {
	for k, v := range enumMap.Entries() {
		if v == value {
			return k
		}
	}
	return ""
}

// serializeCompilerOptions converts CompilerOptions to an ordered map with
// string names as keys and serialized values (enums as strings, paths as
// relative paths, etc.) matching the output of tsc --showConfig.
func serializeCompilerOptions(options *core.CompilerOptions, configFilePath string, comparePathsOptions tspath.ComparePathsOptions) *collections.OrderedMap[string, any] {
	result := collections.NewOrderedMapWithSizeHint[string, any](32)
	configDir := tspath.GetDirectoryPath(configFilePath)

	optionsValue := reflect.ValueOf(options).Elem()
	optionsTypeInfo := reflect.TypeFor[core.CompilerOptions]()

	for i := range optionsValue.NumField() {
		field := optionsTypeInfo.Field(i)
		if !field.IsExported() {
			continue
		}

		optionDecl := CommandLineCompilerOptionsMap.Get(field.Name)
		if optionDecl == nil {
			continue
		}

		// Skip command-line-only and output formatting options
		if optionDecl.Category == diagnostics.Command_line_Options || optionDecl.Category == diagnostics.Output_Formatting {
			continue
		}

		fieldValue := optionsValue.Field(i)

		// Skip zero values (unset options)
		if fieldValue.IsZero() {
			continue
		}

		name := optionDecl.Name
		value := fieldValue.Interface()

		enumMap := optionDecl.EnumMap()
		if enumMap != nil {
			// Enum option - convert numeric value to string name
			serialized := serializeEnumValue(value, enumMap)
			if serialized != "" {
				result.Set(name, serialized)
			}
			continue
		}

		switch optionDecl.Kind {
		case CommandLineOptionTypeListOrElement:
			debug.Assert(false, "listOrElement option should not reach serialization")
		case CommandLineOptionTypeList:
			elem := optionDecl.Elements()
			if elem != nil && elem.IsFilePath {
				// List of file paths - make relative
				if strs, ok := value.([]string); ok {
					relPaths := make([]string, len(strs))
					for j, s := range strs {
						absPath := tspath.GetNormalizedAbsolutePath(s, configDir)
						relPaths[j] = tspath.GetRelativePathFromFile(configFilePath, absPath, comparePathsOptions)
					}
					result.Set(name, relPaths)
					continue
				}
			}
			if elem != nil && elem.EnumMap() != nil {
				// List of enum values (e.g., lib)
				elemMap := elem.EnumMap()
				if strs, ok := value.([]string); ok {
					serialized := make([]string, 0, len(strs))
					for _, s := range strs {
						// lib values are already stored as the d.ts filename, need to find original key
						found := getNameOfCompilerOptionValue(s, elemMap)
						if found != "" {
							serialized = append(serialized, found)
						} else {
							serialized = append(serialized, s)
						}
					}
					result.Set(name, serialized)
					continue
				}
			}
			result.Set(name, value)

		case CommandLineOptionTypeString:
			if optionDecl.IsFilePath {
				// File path option - make relative to config
				if s, ok := value.(string); ok && s != "" {
					absPath := tspath.GetNormalizedAbsolutePath(s, configDir)
					result.Set(name, tspath.GetRelativePathFromFile(configFilePath, absPath, comparePathsOptions))
					continue
				}
			}
			result.Set(name, value)

		case CommandLineOptionTypeBoolean:
			if t, ok := value.(core.Tristate); ok {
				if t.IsTrue() {
					result.Set(name, true)
				} else if t.IsFalse() {
					result.Set(name, false)
				}
			} else {
				result.Set(name, value)
			}

		case CommandLineOptionTypeNumber:
			result.Set(name, value)

		default:
			result.Set(name, value)
		}
	}

	return result
}

// serializeEnumValue converts an enum field value to its corresponding string key
// using the option's enum map. It handles int32-based enum types.
func serializeEnumValue(value any, enumMap *collections.OrderedMap[string, any]) string {
	// The enum maps store values as core.ModuleKind, core.ScriptTarget, etc.
	// But those are all int32 underneath. We need to compare by the underlying int32 value.
	rv := reflect.ValueOf(value)
	if rv.CanInt() {
		intVal := rv.Int()
		for k, v := range enumMap.Entries() {
			ev := reflect.ValueOf(v)
			if ev.CanInt() && ev.Int() == intVal {
				return k
			}
		}
	}
	// Fallback: direct comparison
	return getNameOfCompilerOptionValue(value, enumMap)
}

// matchesSpecs returns a filter function that determines whether a file should appear
// in the --showConfig "files" list. It returns true for files to keep, false for files
// to omit. Files that match the include globs (and are not excluded) return false,
// since they're already covered by the "include" field.
func matchesSpecs(configFileName string, includeSpecs []string, excludeSpecs []string, useCaseSensitiveFileNames bool, currentDirectory string) func(string) bool {
	if len(includeSpecs) == 0 {
		return nil
	}
	// Use the directory containing the tsconfig, not the file itself, as the base path
	// for wildcard pattern matching.
	configDir := tspath.GetDirectoryPath(tspath.GetNormalizedAbsolutePath(configFileName, currentDirectory))

	includeFilePattern := vfs.GetRegularExpressionForWildcard(includeSpecs, configDir, vfs.UsageFiles)
	excludePattern := vfs.GetRegularExpressionForWildcard(excludeSpecs, configDir, vfs.UsageExclude)

	var includeRe *regexp2.Regexp
	if includeFilePattern != "" {
		includeRe = vfs.GetRegexFromPattern(includeFilePattern, useCaseSensitiveFileNames)
	}
	var excludeRe *regexp2.Regexp
	if excludePattern != "" {
		excludeRe = vfs.GetRegexFromPattern(excludePattern, useCaseSensitiveFileNames)
	}

	if includeRe != nil {
		if excludeRe != nil {
			return func(path string) bool {
				return !(core.Must(includeRe.MatchString(path)) && !core.Must(excludeRe.MatchString(path)))
			}
		}
		return func(path string) bool {
			return !core.Must(includeRe.MatchString(path))
		}
	}
	if excludeRe != nil {
		return func(path string) bool {
			return core.Must(excludeRe.MatchString(path))
		}
	}
	return nil
}
